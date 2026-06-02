import * as a1lib from "@alt1/base";
import * as ImageReader from "./image-reader.js";
import * as Buff from "./buff.ts";
import * as Bar from "./bar.js";
import * as Nexus from "./nexus.js";
import * as moment from 'moment';
import * as $ from "../js/jquery.js";
import { buffRegistry } from './buff-registry.js';

interface Warning {
    id: number;
    name: string;
    friendlyName: string;
    timeBuffer: boolean;
}

interface BarStat {
    name: string;
    value: number;
}

declare global {
    interface Window { alt1: any; }
}

let selectedBuffs: string[] = [];
let selectedBar: string[] = [];
let buffTimers: Buff.BuffTimer[] = [];
let barStats: BarStat[] = [];
let expiredBuffs: Buff.BuffTimer[] = [];
let lowStats: BarStat[] = [];
let alertSound: HTMLAudioElement | null = null;
const getAlertSound = (): HTMLAudioElement => {
    if (!alertSound) alertSound = new Audio("src/sounds/alert_1.mp3");
    return alertSound;
};
let alertPlayed = false;
let priorWarnings = new Set<string>();
let hasActiveWarnings = false;

const barWarnings: Warning[] = [
    { id: 1, name: "lowHealthBar",   friendlyName: "Low Health",          timeBuffer: false },
    { id: 2, name: "lowPrayerBar",   friendlyName: "Low Prayer",          timeBuffer: false },
    { id: 3, name: "lowFamiliarBar", friendlyName: "Low Familiar Health", timeBuffer: false },
];

let warnings: Warning[] = [...barWarnings, ...buffRegistry]
    .map((w, i) => ({ id: i + 1, name: w.name, friendlyName: w.friendlyName, timeBuffer: w.timeBuffer }));

const warningsMap = new Map<string, Warning>(warnings.map(w => [w.name, w]));

// Pre-built set for O(1) skilling/combat classification
const skillingBuffNames = new Set<string>(
    (buffRegistry as any[]).filter(b => b.skilling).map(b => b.name)
);

export { warnings };

export async function start(): Promise<void> {
    try {
        await loadImages();
        await updateSelections();
        setTimeout(loopChecks, Number(localStorage.refreshRateSlider));
    } catch (ex) {
        console.log(ex);
    }
}

function loopChecks(): void {
    try {
        const buffOn    = localStorage.buffOnOffSwitch    === "true";
        const skillingOn = localStorage.skillingOnOffSwitch === "true";
        const nexusOn   = localStorage.nexusOnOffSwitch   === "true";
        if (buffOn || skillingOn || nexusOn) {
            try {
                const img = a1lib.captureHoldFullRs();

                checkBuff(img, buffOn, skillingOn);
                if (buffOn) checkBar(img);
                if (nexusOn) checkNexus(img);
            } catch (ex) {
                console.log(ex);
            }

            checkWarnings();
        } else {
            if (hasActiveWarnings) clearWarnings();
        }
    } catch (ex) {
        console.log(ex);
    }

    setTimeout(loopChecks, Number(localStorage.refreshRateSlider));
}

export async function test(img: any): Promise<void> {
    try {
        await loadImages();
        await updateSelections();

        checkBuff(img, true, true);
        checkBar(img);
        checkNexus(img);
        setInterval(checkWarnings, 1000);
    } catch (ex) {
        console.log(ex);
    }
}

export async function loadImages(): Promise<void> {
    await ImageReader.loadImages();
    await Buff.loadBuffImages();
    await Bar.loadBarImages();
    await Nexus.loadNexusImages();
}

export async function updateSelections(): Promise<void> {
    await updateBuffSettings();
    await updateBarSettings();
}

const updateBuffSettings = async (): Promise<void> => {
    selectedBuffs = [];

    for (let i = 0, len = localStorage.length; i < len; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        const value = localStorage[key];

        if (key.includes("Buff") && value === "true") {
            selectedBuffs.push(key);
        }
    }

    // Remove timers for buffs that are no longer selected
    buffTimers = buffTimers.filter(bt => selectedBuffs.includes(bt.name));
};

const updateBarSettings = async (): Promise<void> => {
    selectedBar = [];

    for (let i = 0, len = localStorage.length; i < len; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        const value = localStorage[key];

        if (key.includes("Bar") && value === "true") {
            selectedBar.push(key);
        }
    }

    barStats = barStats.filter(bs => selectedBar.includes(bs.name));
};

const checkBuff = (img: any, buffOn: boolean, skillingOn: boolean): void => {
    const activeBuffs = selectedBuffs.filter(name =>
        skillingBuffNames.has(name) ? skillingOn : buffOn
    );
    Buff.checkBuff(img, activeBuffs, buffTimers);

    if (localStorage.debugMode === "true") {
        console.log(buffTimers);
    }
};

const checkBar = (img: any): void => {
    Bar.checkBar(img, selectedBar, barStats);

    if (localStorage.debugMode === "true") {
        console.log(barStats);
    }
};

const checkNexus = (img: any): void => {
    Nexus.checkNexus(img);
};

const checkWarnings = (): void => {
    checkBuffTime();
    checkLowStats();
    displayWarnings();
};

const checkBuffTime = (): void => {
    const buffOn     = localStorage.buffOnOffSwitch    === "true";
    const skillingOn = localStorage.skillingOnOffSwitch === "true";

    expiredBuffs = buffTimers.filter((bt) => {
        // Skip if this buff's switch is currently off
        if (skillingBuffNames.has(bt.name) ? !skillingOn : !buffOn) return false;

        const warning = warningsMap.get(bt.name);
        const timeBuffer = warning?.timeBuffer;

        if (timeBuffer === undefined) {
            return false;
        }

        const currentTime = timeBuffer
            ? moment.utc(new Date()).add(localStorage.timeBufferSlider, 'seconds')
            : moment.utc(new Date());

        if (bt.expireTime === undefined || bt.expireTime < currentTime) {
            if (bt.name === "excaliburBuff") {
                const health = barStats.find(bs => bs.name === "lowHealthBar");
                const excaliburThreshold = localStorage["excaliburSlider"];

                return health !== undefined && health.value <= excaliburThreshold;
            } else if (bt.name === "ritualShardBuff") {
                const prayer = barStats.find(bs => bs.name === "lowPrayerBar");
                const ritualShardThreshold = localStorage["ritualShardSlider"];

                return prayer !== undefined && prayer.value <= ritualShardThreshold;
            } else {
                return true;
            }
        }
        return false;
    });
};

const checkLowStats = (): void => {
    if (localStorage.buffOnOffSwitch !== "true") {
        lowStats = [];
        return;
    }

    lowStats = barStats.filter((bs) => {
        const foundSetting = localStorage[bs.name.replace("Bar", "Slider")];
        const selected = selectedBar.find(s => s === bs.name);

        if (foundSetting && bs.value <= foundSetting && selected) {
            if (bs.name === "lowPrayerBar") {
                const w = warningsMap.get("lowPrayerBar");
                if (w) w.friendlyName = bs.value <= 100 ? "LOW PRAYER!" : "Low Prayer";
            }

            if (bs.name === "lowFamiliarBar") {
                const w = warningsMap.get("lowFamiliarBar");
                if (w) w.friendlyName = bs.value <= 3000 ? "LOW FAMILIAR HEALTH!" : "Low Familiar Health";
            }

            return true;
        }
        return false;
    });
};

const displayWarnings = (): void => {
    try {
        if (expiredBuffs.length > 0 || lowStats.length > 0) {
            hasActiveWarnings = true;

            // Build active-name set once — O(1) lookup below instead of O(n) .some()
            const activeNames = new Set<string>([
                ...expiredBuffs.map(b => b.name),
                ...lowStats.map(b => b.name),
            ]);

            // Single pass: partition warnings into needs/no-warning buckets
            const needsWarning: Warning[] = [];
            const noWarning: Warning[] = [];
            for (const w of warnings) {
                (activeNames.has(w.name) ? needsWarning : noWarning).push(w);
            }

            if (window.alt1 && localStorage.mouseTooltip !== "true") {
                window.alt1.setTooltip("");
            } else if (window.alt1 && localStorage.mouseTooltip === "true") {
                const topWarning = needsWarning.slice().sort((a, b) => a.id - b.id);
                let warningText = "";

                for (let w = 0; w < topWarning.length; w++) {
                    if (w > 0) warningText += "\n";
                    warningText += topWarning[w].friendlyName;

                    if (!priorWarnings.has(topWarning[w].name)) {
                        priorWarnings.add(topWarning[w].name);
                        alertPlayed = false;
                    }
                }

                window.alt1.setTooltip(warningText);
            }

            for (const w of needsWarning) {
                const $label = $("#" + w.name).closest("label");
                if (localStorage.buffColor !== "true") {
                    $label.removeClass("warning");
                } else {
                    $label.addClass("warning");
                }
            }

            for (const nw of noWarning) {
                const $label = $("#" + nw.name).closest("label");
                $label.removeClass("warning");

                priorWarnings.delete(nw.name);
            }

            if (!alertPlayed && localStorage.soundsOn === "true") {
                const sound = getAlertSound();
                sound.volume = Number(localStorage.soundVolumeSlider);
                sound.play();
                alertPlayed = true;
            }
        } else {
            if (hasActiveWarnings) clearWarnings();
        }
    } catch (ex) {
        console.log(ex);
    }
};

const clearWarnings = (): void => {
    try {
        if (window.alt1) window.alt1.setTooltip("");

        for (const w of warnings) {
            const $label = $("#" + w.name).closest("label");
            $label.removeClass("warning");
        }

        alertPlayed = false;
        priorWarnings = new Set();
        hasActiveWarnings = false;
    } catch (ex) {
        console.log(ex);
    }
};

