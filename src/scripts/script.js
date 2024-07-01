import * as a1lib from "@alt1/base";
import * as ChatBox from "./chatbox.js";
import * as ImageReader from "./image-reader.js";
import * as Buff from "./buff.js";
import * as Bar from "./bar.js";
import * as moment from 'moment';
import * as $ from "../js/jquery.js";

let foundChat = false;
let chatLines;
let selectedBuffs = [];
let selectedBar = [];
let buffTimers = [];
let barStats = [];
let expiredBuffs = [];
let lowStats = [];
let alert = new Audio("src/sounds/alert_1.mp3");
let alertPlayed = false;
let priorWarnings = [];

let warnings = [
    { id: 1, name: "lowHealthBar", friendlyName: "Low Health", timeBuffer: false },
    { id: 2, name: "animateDeadBuff", friendlyName: "Animate Dead", timeBuffer: true },
    { id: 3, name: "antifireBuff", friendlyName: "Antifire", timeBuffer: true },
    { id: 4, name: "ritualShardBuff", friendlyName: "Ritual Shard", timeBuffer: false },
    { id: 5, name: "lowPrayerBar", friendlyName: "Low Prayer", timeBuffer: false },
    { id: 6, name: "overloadBuff", friendlyName: "Overload", timeBuffer: true },
    { id: 7, name: "aggressionBuff", friendlyName: "Aggression", timeBuffer: true },
    { id: 8, name: "prayerRenewalBuff", friendlyName: "Prayer Renewal", timeBuffer: true },
    { id: 9, name: "excaliburBuff", friendlyName: "Excalibur", timeBuffer: false },
    { id: 10, name: "weaponPoisonBuff", friendlyName: "Weapon Poison", timeBuffer: true },
    { id: 11, name: "sumRenewBuff", friendlyName: "Summoning Renewal", timeBuffer: true },
    { id: 12, name: "bookBuff", friendlyName: "Book", timeBuffer: false },
    { id: 13, name: "vulnBuff", friendlyName: "Vulnerability", timeBuffer: false },
    { id: 14, name: "smokeCloudBuff", friendlyName: "Smoke Cloud", timeBuffer: false },
    { id: 15, name: "darknessBuff", friendlyName: "Darkness", timeBuffer: false },
    { id: 16, name: "auraBuff", friendlyName: "Aura", timeBuffer: false },
    { id: 17, name: "lowFamiliarBar", friendlyName: "Low Familiar Health", timeBuffer: false }
];

export { warnings };

/* Main function to run everything else */
export async function start() {
    try {
        await loadImages();
        await updateSelections();

        // Main timer that will repeatedly run the other checks
        setTimeout(loopChecks, localStorage.refreshRateSlider);

    } catch (ex) {
        console.log(ex);
    }
};

function loopChecks() {
    try {
        if (localStorage.onOffSwitch == "true") {
            try {
                let img = a1lib.captureHoldFullRs();
    
                if (!foundChat) {
                    findChatBox(img);
                } else {
                    readChatBox(img);
                }
        
                checkBuff(img);
                checkBar(img);
            } catch (ex) {
                console.log(ex);
            }

            checkWarnings();
        } else {
            clearWarnings();
        }
    } catch (ex) {
        console.log(ex);
    }

    setTimeout(loopChecks, localStorage.refreshRateSlider);
}

/* Used for testing, using pasted screenshots */
export async function test(img) {
    try {
        await loadImages();
        await updateSelections();

        findChatBox(img);
        readChatBox(img);
        checkBuff(img);
        checkBar(img);
        setInterval(checkWarnings, 1000);
    } catch (ex) {
        console.log(ex);
    }
}

/* Load the images that will be used to read the screen */
export async function loadImages() {
    await ImageReader.loadImages();
    await Buff.loadBuffImages();
    await Bar.loadBarImages();
};

export async function updateSelections() {
    await updateBuffSettings();
    await updateBarSettings();
};

let updateBuffSettings = async () => {
    selectedBuffs = [];
    // buffTimers = [];

    for (let i = 0, len = localStorage.length; i < len; i++) {
		let key = localStorage.key(i);
		let value = localStorage[key];

		if (key.includes("Buff") && value == "true") {
		  	selectedBuffs.push(key);
		}
	}

    // Remove options that are no longer selected
    buffTimers = buffTimers.filter(bt => selectedBuffs.includes(bt.name));

    // console.log(selectedBuffs);
    // console.log(buffTimers);
};

let updateBarSettings = async () => {
    selectedBar = [];

    for (let i = 0, len = localStorage.length; i < len; i++) {
		let key = localStorage.key(i);
		let value = localStorage[key];

		if (key.includes("Bar") && value == "true") {
            selectedBar.push(key);
		}
	}

    // Remove options that are no longer selected
    barStats = barStats.filter(bs => selectedBar.includes(bs.name));
};

/* Get the buff timers */
let checkBuff = (img) => {
    Buff.checkBuff(img, selectedBuffs, buffTimers);

    if (localStorage.debug == "true") {
        console.log(buffTimers);
    }
};

/* Get the bar stats */
let checkBar = (img) => {
    Bar.checkBar(img, selectedBar, barStats);

    if (localStorage.debug == "true") {
        console.log(barStats);
    } 
};

let checkWarnings = () => {
    checkBuffTime();
    checkLowStats();

    displayWarnings();
};

let checkBuffTime = () => {

    expiredBuffs = buffTimers.filter((bt) => {
        let timeBuffer = warnings.find(w => w.name == bt.name)?.timeBuffer;

        if (timeBuffer == undefined) {
            return false;
        }
        
        let currentTime = timeBuffer? moment.utc(new Date()).add(localStorage.timeBufferSlider, 'seconds') : moment.utc(new Date());

        if (bt.expireTime == undefined || bt.expireTime < currentTime) {
            if (bt.name == "excaliburBuff") {
                let health = barStats.find(bs => bs.name == "lowHealthBar");
                let excaliburThreshold = localStorage["excaliburSlider"];
        
                if (health.value <= excaliburThreshold) {
                    return true;
                } else {
                    return false;
                }
            } else if (bt.name == "ritualShardBuff") {
                let prayer = barStats.find(bs => bs.name == "lowPrayerBar");
                let ritualShardThreshold = localStorage["ritualShardSlider"];

                if (prayer.value <= ritualShardThreshold) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    });

    // console.log(expiredBuffs);
};

let checkLowStats = () => {
    lowStats = barStats.filter((bs) => {
        let foundSetting = localStorage[bs.name.replace("Bar", "Slider")];
        let selected = selectedBar.find(s => s == bs.name);

        if (foundSetting && bs.value <= foundSetting && selected) {

            // Adding these for now, because I'm bad and need extra help
            if (bs.name == "lowPrayerBar") {
                if (bs.value <= 100) warnings.find(w => w.name == "lowPrayerBar").friendlyName = "LOW PRAYER!"
                else warnings.find(w => w.name == "lowPrayerBar").friendlyName = "Low Prayer"
            }
            
            if (bs.name == "lowFamiliarBar") {
                if (bs.value <= 2000) warnings.find(w => w.name == "lowFamiliarBar").friendlyName = "LOW FAMILIAR HEALTH!"
                else warnings.find(w => w.name == "lowFamiliarBar").friendlyName = "Low Familiar Health"
            }
            
            return true;
        };

        return false;
    });

    // console.log(lowStats);
};

let displayWarnings = () => {

    try {
        if (localStorage.onOffSwitch == "true" && (expiredBuffs.length > 0 || lowStats.length > 0)) {
            let needsWarning = warnings.filter(w => {
                let allWarnings = expiredBuffs.concat(lowStats);
    
                return allWarnings.some((aw) => {
                    return w.name == aw.name;
                });
            });
            
            // console.log(needsWarning);
    
            let noWarning = warnings.filter(w => {
                return !needsWarning.some((nw) => {
                    return w.name == nw.name;
                });
            });
            
            if (window.alt1 && localStorage.mouseTooltip != "true") {
                alt1.setTooltip("");
            } else if (window.alt1 && localStorage.mouseTooltip == "true") {
                let topWarning = needsWarning.sort((a, b) => a.id - b.id);
                let warningText = "";

                for (let w = 0; w < topWarning.length; w++) {
                    if (w > 0) {
                        warningText += "\n";
                    }

                    warningText += topWarning[w].friendlyName;

                    // Play alert for new warnings
                    if (!priorWarnings.includes(topWarning[w].friendlyName)) {
                        priorWarnings.push(topWarning[w].friendlyName);
                        alertPlayed = false;
                    }
                }

                alt1.setTooltip(warningText);
            }
    
            for (let w = 0; w < needsWarning.length; w++) {
                if (localStorage.buffColor != "true") $("label#" + needsWarning[w].name).removeClass("warning");
                else if (localStorage.buffColor == "true") $("label#" + needsWarning[w].name).addClass("warning");
            }
    
            for (let nw = 0; nw < noWarning.length; nw++) {
                $("label#" + noWarning[nw].name).removeClass("warning");
            }

            if (!alertPlayed && localStorage.soundsOn == "true") {
                alert.volume = localStorage.soundVolumeSlider;
                alert.play();

                alertPlayed = true;
            }

            // console.log(topWarning.friendlyName);
        } else {
            clearWarnings();
        }
    } catch (ex) {
        console.log(ex);
    }
    
}

let clearWarnings = () => {
    try {
        if (window.alt1) alt1.setTooltip("");
        
        for (let w = 0; w < warnings.length; w++) {
            $("label#" + warnings[w].name).removeClass("warning");
        }

        alertPlayed = false;
        priorWarnings = [];
    } catch (ex) {
        console.log(ex);
    }
}

/* Find the Chat Box */
let findChatBox = (img) => {
    foundChat = ChatBox.findChatBox(img);

    if (foundChat) {
        if (!window.alt1) {
            readChatBox(img);
        }
    }
};

/* Read the Chat Box */
let readChatBox = (img) => {
	chatLines = ChatBox.readChatBox(img);

    // console.log(chatLines);

	if (chatLines?.length > 0) {
        // debug();
        handleChatLines();
		// console.log(chatLines);
	}
};

let handleChatLines = () => {
    // for (let l = 0; l < chatLines.length; l++) {
    //     let trackAnimate = selectedBuffs.find(sb => sb.name == "animateDeadBuff");

    //     // Not accurate, because the built-in alt1 chat reader is not accurate
    //     if (trackAnimate) {
    //         // Buffer in an extra second for buff icon to go away
    //         if (chatLines[l].includes('Your control of the dead is wavering')) {
    //             Buff.setBuffTime('animateDeadBuff', 31, buffTimers);
    //         }
            
    //         if (chatLines[l].includes('Your control of the dead fades')) {
    //             Buff.setBuffTime('animateDeadBuff', 1, buffTimers);
    //         }
    //     }
    // }
};

let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
