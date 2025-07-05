import * as ImageReader from "./image-reader.js";
import { getBuffImages } from "./image-data.js";
import { ImageDetect } from "@alt1/base";
import * as moment from 'moment';

let imageBuffers = [];

export async function loadBuffImages() {
    let buffImages = getBuffImages();

    imageBuffers = [];

    // Top left corner of Buff box
    for (let i = 0; i < buffImages.length; i++) {
        let imgBuffer = await ImageDetect.imageDataFromBase64(buffImages[i].imgData);

        imageBuffers.push({ id: buffImages[i].id, name: buffImages[i].name, imgBuffer: imgBuffer });
    }
};

export function getBuff(img, buffName) {
    try {
        // Get starting pixel for Buff image, to be used to grab the buff
        let foundBuff = imageBuffers.filter(b => b.name == buffName);
        let buffPosition;

        for (let fb = 0; fb < foundBuff.length; fb++) {
            buffPosition = ImageReader.getPosition(img, foundBuff[fb].imgBuffer, 0, 0, foundBuff[fb].imgBuffer.width, foundBuff[fb].imgBuffer.height);
 
             if (buffPosition != undefined) {
                 break;
             }
        }

        if (buffPosition != undefined) {
            let buffer = img.toData(buffPosition.x, buffPosition.y, buffPosition.w, buffPosition.h);

            // ImageReader.outputImage(buffer);
            let buff = ImageReader.readNumbers(buffer, buffName);
            
            if (buff == undefined || buff == "") {
                if (localStorage.debugMode == "true"){
                    console.log(buffName);
                    ImageReader.outputImage(buffer);
                }
                
                return undefined;
            } else {
                return Number(buff);
            }
        }
        
        // throw 'Buff not found.'
    }
    catch (ex) {
        console.log(ex);
        return undefined;
    }
};

/* Get the buff timers */
export function checkBuff(img, selectedBuffs, buffTimers) {

    for (let b = 0; b < selectedBuffs.length; b++) {
        let buffTime = getBuff(img, selectedBuffs[b]);
        
        setBuffTime(selectedBuffs[b], buffTime, buffTimers);
    }

    // if (localStorage.debug == "true") {
    //     console.log(buffTimers);
    // }
};

export function setBuffTime(selectedBuff, buffTime, buffTimers) {
    let expireTime = buffTime != undefined? moment.utc(new Date()).add(buffTime, 's') : undefined;
     
    let foundBuff = buffTimers.find(bt => bt.name === selectedBuff);
    
    if (!foundBuff) {
        // Buff timer doesn't exist, so add it.
        buffTimers.push({ name: selectedBuff, expireTime: expireTime, buffTime: buffTime})
    } else if (foundBuff.expireTime != undefined) {
        // Buff time does exist

        if (expireTime != undefined) {
            if (
                buffTime < 60 // Time is less than a minute, most accurate
                || (foundBuff.buffTime - buffTime) == 60 // Minute just changed, more accurate
                || (foundBuff.buffTime < buffTime && selectedBuff != "vulnBuff" && selectedBuff != "smokeCloudBuff") // New time is higher, buff could've been renewed
                || foundBuff.expireTime < moment.utc(new Date()) // Time has expired, but there's still a buff on screen
                // || foundBuff.buffTime == 720 || // Fuzzy logic for Animate Dead. Overwrite it if an actual value is found
                // || (selectedBuff == "bookBuff" || selectedBuff == "excaliburBuff" || selectedBuff == "ritualShardBuff" || selectedBuff == "darknessBuff" || selectedBuff == "auraBuff") // Want to just keep tracking if these are found or not
            ) {
                // console.log(`${moment.utc(new Date()).toString()} - ${selectedBuff}: ${buffTime}`);

                foundBuff.buffTime = buffTime;
                foundBuff.expireTime = expireTime;
            }
        }
    } else {
        // No expire time set yet, so use the new time.
        foundBuff.expireTime = expireTime;
    }

    if (localStorage.debug == "true") {
        console.log(`${selectedBuff}: ${buffTime}`);
    }
}