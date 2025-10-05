import * as ImageReader from "./image-reader.js";
import { getBarImages } from "./image-data.js";
import { ImageDetect } from "@alt1/base";

let imageBuffers = [];

export async function loadBarImages() {
    let barImages = getBarImages();

    imageBuffers = [];

    // Top left corner of Bar box
    for (let i = 0; i < barImages.length; i++) {
        let imgBuffer = await ImageDetect.imageDataFromBase64(barImages[i].imgData);

        imageBuffers.push({ id: barImages[i].id, name: barImages[i].name, imgBuffer: imgBuffer });
    }
};

export function getBar(img, barName) {
    try {

        // Get starting pixel for Bar image, to be used to grab the bar
        let foundBar = imageBuffers.filter(b => b.name == barName);
        let barPosition;

        for (let fb = 0; fb < foundBar.length; fb++) {
           barPosition = ImageReader.getPosition(img, foundBar[fb].imgBuffer, 20, -5, 90, 27);

            if (barPosition != undefined) {
                break;
            }
        }

        if (barPosition != undefined) {
            let buffer = img.toData(barPosition.x, barPosition.y, barPosition.w, barPosition.h);

            // ImageReader.outputImage(buffer);
            let barValue = ImageReader.readNumbers(buffer, barName);
            
            if (localStorage.debugMode == "true"){
                console.log(barName + ": " + barValue.toString());
                ImageReader.outputImage(buffer);
            }

            if (barValue == undefined || barValue == "") {
                return undefined;
            } else {
                return Number(barValue);
            }
        }
        
        // throw 'Bar not found.'
    }
    catch (ex) {
        console.log(ex);
        return undefined;
    }
};

/* Get the bar stats */
export function checkBar(img, selectedBar, barStats) {

    // Changing to read health and prayer at all times, for buffs like excalibur and ritual shard.
    let checkStats = ["lowHealthBar", "lowPrayerBar", "lowFamiliarBar"];

    for (let b = 0; b < checkStats.length; b++) {
        let barValue = getBar(img, checkStats[b]);
        let foundBar = barStats.find(bt => bt.name === checkStats[b]);

        if (!foundBar) {
            // Bar stat doesn't exist, so add it.
            barStats.push({ name: checkStats[b], value: barValue })
        } else if (barValue != undefined && barValue != "") {
            foundBar.value = barValue;
        }

        // console.log(barValue);
    }

};