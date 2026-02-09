import * as a1lib from "@alt1/base";
import * as ChatBox from "./chatbox.js";
import * as ImageReader from "./image-reader.js";
import * as Buff from "./buff.js";
import * as Bar from "./bar.js";
import * as Nexus from "./nexus.js";
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

/*
    name: Name used in code to find the warning and handle various logic for it
    friendlyName: Display name on the mouse when the warning is triggered
    timeBuffer: Determines if there needs to be a buffer time for the warning to be displayed, length of time controlled by user
*/
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
    { id: 15, name: "darknessBuff", friendlyName: "Darkness", timeBuffer: true },
    { id: 16, name: "auraBuff", friendlyName: "Aura", timeBuffer: false },
    { id: 17, name: "lowFamiliarBar", friendlyName: "Low Familiar Health", timeBuffer: false },
    { id: 18, name: "quickPrayerBuff", friendlyName: "Quick Prayer", timeBuffer: false },
    { id: 19, name: "crystalMaskBuff", friendlyName: "Crystal Mask", timeBuffer: true },
    { id: 20, name: "lightFormBuff", friendlyName: "Light Form", timeBuffer: false },
    { id: 21, name: "perfectPlusBuff", friendlyName: "Perfect Plus", timeBuffer: true },
    { id: 22, name: "superheatBuff", friendlyName: "Superheat", timeBuffer: false },
    { id: 23, name: "torstolBuff", friendlyName: "Torstol Sticks", timeBuffer: false },
    { id: 24, name: "clanBuff", friendlyName: "Clan Boost", timeBuffer: false },
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
                checkNexus(img);
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
        checkNexus(img);
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
    await Nexus.loadNexusImages();
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

    if (localStorage.debugMode == "true") {
        console.log(buffTimers);
    }
};

/* Get the bar stats */
let checkBar = (img) => {
    Bar.checkBar(img, selectedBar, barStats);

    if (localStorage.debugMode == "true") {
        console.log(barStats);
    } 
};

/* Check Nexus counts */
let checkNexus = (img) => {
    Nexus.checkNexus(img);
};

let checkWarnings = () => {
    if (localStorage.onOffSwitch == "true") {
        checkBuffTime();
        checkLowStats();

        displayWarnings();
    }
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

    // if (localStorage.debugMode == "true"){
    //     console.log("Expired Buffs: ");
    //     console.log(expiredBuffs);
    // }
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
                if (bs.value <= 3000) warnings.find(w => w.name == "lowFamiliarBar").friendlyName = "LOW FAMILIAR HEALTH!"
                else warnings.find(w => w.name == "lowFamiliarBar").friendlyName = "Low Familiar Health"
            }
            
            return true;
        };

        return false;
    });

    // if (localStorage.debugMode == "true"){
    //     console.log("Low Stats: ");
    //     console.log(lowStats);
    // }
};

let displayWarnings = () => {

    try {
        if (localStorage.onOffSwitch == "true" && (expiredBuffs.length > 0 || lowStats.length > 0)) {
            // console.log(expiredBuffs);
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

                    // Play sound alert for new warnings
                    if (!priorWarnings.includes(topWarning[w].name)) {
                        priorWarnings.push(topWarning[w].name);
                        alertPlayed = false;
                    }
                }

                alt1.setTooltip(warningText);
            }
            
            for (let w = 0; w < needsWarning.length; w++) {
                const $label = $("#" + needsWarning[w].name).closest("label");

                if (localStorage.buffColor !== "true") {
                    $label.removeClass("warning");
                } else {
                    $label.addClass("warning");
                }
            }
    
            for (let nw = 0; nw < noWarning.length; nw++) {4
                const $label = $("#" + noWarning[nw].name).closest("label");
                $label.removeClass("warning");

                // Remove warnings that are resolved, so that they can alert again next time (for sounds)
                const index = priorWarnings.indexOf(noWarning[nw].name);

                if (index > -1) {
                    priorWarnings.splice(index, 1);
                }
            }

            if (!alertPlayed && localStorage.soundsOn == "true") {
                console.log(localStorage.soundVolumeSlider);
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
