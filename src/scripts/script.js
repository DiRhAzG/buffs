import * as a1lib from "@alt1/base";
import * as ChatBox from "./chatbox.js";
import * as ImageReader from "./image-reader.js";
import { loadBuffImages, getBuff } from "./buff.js";
import * as moment from 'moment';

let foundChat = false;
let chatLines;
let selectedBuffs = [];
let buffTimers = [];
let expiredBuffs = [];
let lowStats = [];

let warnings = [
    { id: 1, name: "lowHealthBar", friendlyName: "Low Health", timeBuffer: false },
    { id: 2, name: "animateDeadBuff", friendlyName: "Animate Dead", timeBuffer: true },
    { id: 3, name: "antifireBuff", friendlyName: "Antifire", timeBuffer: true },
    { id: 4, name: "lowPrayerBar", friendlyName: "Low Prayer", timeBuffer: false },
    { id: 5, name: "overloadBuff", friendlyName: "Overload", timeBuffer: true },
    { id: 6, name: "prayerRenewalBuff", friendlyName: "Prayer Renewal", timeBuffer: true },
    { id: 7, name: "excaliburBuff", friendlyName: "Excalibur", timeBuffer: false },
    { id: 8, name: "ritualShardBuff", friendlyName: "Ritual Shard", timeBuffer: false },
    { id: 9, name: "weaponPoisonBuff", friendlyName: "Weapon Poison", timeBuffer: true }
];

export function startCountdown() {
    setInterval(countdown, 1000);
};

let countdown = () => {
    for (let bt = 0; bt < buffTimers.length; bt++) {
        if (buffTimers[bt].timeLeft > 0) {
            buffTimers[bt].timeLeft -= 1;
        }
    }

    console.log(buffTimers[1]);
};

/* Main function to run everything else */
export async function start() {
    try {
        await loadImages();
        await updateBuffSettings();

        // Main timer that will repeatedly run the other checks
        setTimeout(loopChecks, localStorage.refreshRate);
    } catch (ex) {
        console.log(ex);
    }
};

function loopChecks() {
    let img = a1lib.captureHoldFullRs();

    if (!foundChat) {
        findChatBox(img);
    } else {
        readChatBox(img);
    }

    checkBuff(img);
    checkWarnings();

    setTimeout(loopChecks, localStorage.refreshRate);
}

/* Used for testing, using pasted screenshots */
export async function test(img) {
    try {
        await loadImages();
        await updateBuffSettings();

        findChatBox(img);
        readChatBox(img);
        checkBuff(img);
        setInterval(checkWarnings, 1000);
    } catch (ex) {
        console.log(ex);
    }
}

// export function reset() {
//     z.currentPhase = 1;
//     z.currentEnrage = -1;
//     attack = { currentAttack: 'N/A', nextAttack: 'Tendrils' };
//     atk.setAttacks(z.currentEnrage);
//     atk.resetAttacks();
// };

export async function updateBuffSettings() {
    selectedBuffs = [];
    // buffTimers = [];

    for (let i = 0, len = localStorage.length; i < len; i++) {
		let key = localStorage.key(i);
		let value = localStorage[key];

		if (key.includes("Buff") && value == "true") {
		  	selectedBuffs.push(key);
		}
	}

    buffTimers = buffTimers.filter(bt => selectedBuffs.includes(bt.name));

    // console.log(selectedBuffs);
    // console.log(buffTimers);
}

/* Load the images that will be used to read the screen */
let loadImages = async () => {
    await ImageReader.loadImages();
    await loadBuffImages();
};

/* Get the buff timers */
let checkBuff = (img) => {

    for (let b = 0; b < selectedBuffs.length; b++) {
        let buffTime = getBuff(img, selectedBuffs[b]);
        let expireTime = buffTime != undefined? moment.utc(new Date()).add(buffTime, 's') : undefined;
         
        let foundBuff = buffTimers.find(bt => bt.name === selectedBuffs[b]);
        
        if (!foundBuff) {
            // Buff timer doesn't exist, so add it.
            buffTimers.push({ name: selectedBuffs[b], expireTime: expireTime, buffTime: buffTime})
        } else if (foundBuff.expireTime != undefined) {
            // Buff time does exist

            if (expireTime != undefined) {
                if (
                    buffTime < 60 || // Time is less than a minute, most accurate
                    (foundBuff.buffTime - buffTime) == 60 || // Minute just changed, more accurate
                    (buffTime > 60 && foundBuff.buffTime < buffTime) // New time is higher, buff could've been renewed
                ) {
                    // console.log(`${selectedBuffs[b]}: ${buffTime}`);

                    foundBuff.buffTime = buffTime;
                    foundBuff.expireTime = expireTime;
                }
            }
        } else {
            // No expire time set yet, so use the new time.
            foundBuff.expireTime = expireTime;
        }

        // console.log(`${selectedBuffs[b]}: ${buffTime}`);
    }

    console.log(buffTimers);
};

let checkWarnings = () => {
    checkBuffTime();
    checkLowStats();
};

let checkBuffTime = () => {

    expiredBuffs = buffTimers.filter((bt) => {
        let timeBuffer = warnings.find(w => w.name == bt.name).timeBuffer;
        let currentTime = timeBuffer? moment.utc(new Date()).add(localStorage.timeBufferSlider, 'seconds') : moment.utc(new Date());

        if (bt.expireTime == undefined || bt.expireTime < currentTime) {
            return true;
        } else {
            return false;
        }
    });

    // console.log(expiredBuffs);
    displayWarnings();
};

let checkLowStats = () => {

};

let displayWarnings = () => {

    if (expiredBuffs.length > 0) {
        let expired = warnings.filter(w => {
            return expiredBuffs.some((e) => {
                return w.name == e.name;
            });
        });

        let topWarning = expired.reduce(function(res, obj) {
            return (obj.id < res.id) ? obj : res;
        });

        if (window.alt1 && localStorage.mouseTooltip != "true") alt1.setTooltip("");
        else if (window.alt1 && localStorage.mouseTooltip == "true") alt1.setTooltip(topWarning.friendlyName);

        // console.log(topWarning.friendlyName);
    } else {
        if (window.alt1) alt1.setTooltip("");
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

	// if (chatLines?.length > 0) {
    //     debug();
	// 	// console.log(chatLines);
	// }
};

let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// let debug = () => {
//     for (let l = 0; l < chatLines.length; l++) {
//         let line = chatLines[l].toLowerCase();

//         if (line.includes("zhi")) {
//             if (line.includes("enrage")) {
//                 setEnrage(Number(line.slice(10).replace(/\D/g, "")));
//             } else if (line.includes("clear")) {
//                 reset();
//             } else if (line.includes("smp")) {
//                 setSpecPercent(0);
//             }
//         }

//     }
// }
