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
    { id: 1, name: "lowHealthBar", friendlyName: "Low Health" },
    { id: 2, name: "animateDeadBuff", friendlyName: "Animate Dead" },
    { id: 3, name: "antifireBuff", friendlyName: "Antifire" },
    { id: 4, name: "lowPrayerBar", friendlyName: "Low Prayer" },
    { id: 5, name: "overloadBuff", friendlyName: "Overload" },
    { id: 6, name: "prayerRenewalBuff", friendlyName: "Prayer Renewal" },
    { id: 7, name: "excaliburBuff", friendlyName: "Excalibur" },
    { id: 8, name: "ritualShardBuff", friendlyName: "Ritual Shard" },
    { id: 9, name: "weaponPoisonBuff", friendlyName: "Weapon Poison" }
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
            buffTimers.push({ name: selectedBuffs[b], expireTime: expireTime})
        } else if (foundBuff.expireTime != undefined) {
            if (expireTime != undefined) {
                let diff = Math.abs(foundBuff.expireTime.diff(expireTime, 'seconds'));
            
                if (diff > 2) {
                    foundBuff.expireTime = expireTime;
                }
            }
        } else {
            foundBuff.expireTime = expireTime;
        }

        // console.log(`${selectedBuffs[b]}: ${buffTime}`);
    }

    // console.log(buffTimers);
};

let checkWarnings = () => {
    checkBuffTime();
    checkLowStats();
};

let checkBuffTime = () => {
    expiredBuffs = buffTimers.filter(bt => (bt.expireTime < moment.utc(new Date()).add(localStorage.timeBufferSlider, 'seconds')) || bt.expireTime == undefined);

    console.log(expiredBuffs);
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

        if (window.alt1 && localStorage.mouseTooltip == "true") alt1.setTooltip(topWarning.friendlyName);

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
