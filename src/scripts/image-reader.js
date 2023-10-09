import { ImageDetect } from "@alt1/base";
import { ImageDataSet } from "@alt1/base/dist/imagedetect";
import { warnings } from "./script.js";

let imgBuffNumbers;
let buffNumbers = new ImageDataSet();
let buffValues = "0123456789m(";

let imgBarNumbers;
let barNumbers = new ImageDataSet();
let barValues = "0123456789/K";

let imgFamiliarNumbers;
let familiarNumbers = new ImageDataSet();
let familiarValues = "0123456789/";


/* Load the images that will be used to search the screen */
export async function loadImages() {
    // The numbers used for buffs
    imgBuffNumbers = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAAEgAAAAJCAMAAACmN5q8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURf///wAAAAAAAH5RqV0AAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC2SURBVChTbZEBEsMgEAKj/3902eVM20xiigjcGe21d96BfV3MhSPUDg7/xT5NOKIvF2uxDGyFYB6NSDHXN4PiEw4y3XXULARf7CIGXq38inh3ZqRbJdsCdpxzrB7EEFJsVz3NWyP3nqMpeQJKmTADZ4vMDkv/G7VPhXOdmgbMAJJsdIYxxwnZx88xGFnOkv115ZY+GrVP76Kf4SUQVIIjT0G55NlI2X8ZZJZXH14ZNlwyIz32/gAfMgM+QtgzCwAAAABJRU5ErkJggg=='
    );
    
    // Split the numbers into a dataset with each individual number
    buffNumbers = ImageDataSet.fromFilmStrip(imgBuffNumbers, 6);

    // The numbers used for action bar
    imgBarNumbers = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAAEgAAAAICAYAAABatbkrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJ8SURBVEhLnVbNbtNAEI7yZwfuwIukVcU1kWLCCxB4AxAHUKXSlnt5hgYJxC3lUn5uOD+201uc2gnHJHa4x+4TLDvr9WbXu44Cn2RldnZmdjzjbzYFHkEQIioy+LO5pAN4/kzSO84Y2Y6jtE9hOTdkP47jnXYzfK5l24KNZTvIxg/ICIMoMSAXiBuEa8Hen//OPSNci7bu9FZYT2892ddoP0VXV18lQ+NJW3nQZbeLXr56Le0tl0ulPcA0+2RvPL5BxWIx1w5QrWpIr91jNppeQzp+IB+zn8SJ4zvyW8G2necvWP5pASpVHZ2dv0eX3Y8sDiBboFUQCGuGbNX5zgD6gyFqtQy1cw583NGDg0OlT78/2CtWVdP2sgvXf1C9Xme2nz5/YXKpVGZyFEU74/EFWq24YkFBypXKTuf/Af+CFqYeFQvDkcVk0zQRFJMuCSCfc9zxkWUhz/OVeYWZpk4mE3T97YegiyKRwhCXikpAUVJQVQKq2OkM1KOihKqmS3uu60o6rXaf6PgCpfThuwv5NBoNsm632yiPruWy2NRnnQ5y3amgWywWeCYmM4++J0F8l9CSx4qbv71eb7tPObx1VgxPAydKxb1xenpGfCAe0BQeGPiRIv7I2g7jbD78iwGy+WUvi81mI6xLuJBHR4/J+VRVuP7+U5p/PK3cqVjoQrPZFBUc4HZoGf9eoDdvj5lPmgwM11+YVkTJIUuZk5N3bG1z9EzBvxzcvA8ePmJrVQP2Af8FAYRCw6cJn77qWoSOTTjKQEehG4PhSLCdz5O/A3A9E0UOUoqls8efyX8XTDzIhzg+P7sAebFTGlq2XEzPF33yCqi61i8uPqC/Q0njy/uQJBYAAAAASUVORK5CYII='
    );
    
    // Split the numbers into a dataset with each individual number
    barNumbers = ImageDataSet.fromFilmStrip(imgBarNumbers, 6);

    // The numbers used for familiars
    imgFamiliarNumbers = await ImageDetect.imageDataFromBase64(
        'iVBORw0KGgoAAAANSUhEUgAAAE0AAAAKCAYAAADxVNNkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKaSURBVEhLjZZdbxJBFIb5372x0QtJ1PaiIaHVmCaaGCRC7adC+SrQaviqgF6xpbTXLP0F477jOePM7Bna52Zm3vOeMws7e3YzzOrhQQGMJBmg09ThevJb58wX92KOD4VScEybLL4cnYo5MV0rwJqmKbQ5odm9IkUpXDPJBgqpkRADiNH0P75or+PVvwukpQHaZva11vP5vJpFUbowsVwugzFdPIHnWlwD/jCaBqlUKqpQKGjfcDxVjc6lk7OMY7P269kxZnA9djXche1c3hG3dnJ6jQ0xPuXHhDzloxNVb7XFGF8w54ZqMI/FGdsn5bAmPVUgv7trdJz2jc0Xri+UGMcro0sb+4Q887v0owtwgmlqcqP57dp9SskNoOlamtbJwo3HyaOlhvfj0SeKbowuekKJth7yMDit5ZOzlAd58WqlPheLTuxmceesuT5GptbqOB7c3P5gqPD4MAen38U9aWrQ5gRc42gyVaXDY+0JHRh4aZqJbhdpj22wsfWQB6B5hhooU6lW1Xm9oT21tttfgFQfp6N6XjM6PL1+3/H1er1UXqPdTWkjajNgMByilFn7/ZZfMpi/ye2pt/sfUvXCj6fw+PjgrSndbQmugTGENlrYmhT3kTyhPPvPwhyMxpOk/16o2WymY4NfE3nPZveHepnNOsGdd/tO85Y2Hk3/JMf9m1xUQKrBhGK23rr8ad6IIRqd9Cl7Sm2byPoKCHk0fvCxNZA05utZRTU7VybeSOZ2c/aRatUuuklfc9+68L3a2jaa/X0o1WD45DB+T2XwDWd/x/n7p+AjisZNkr4QHwqtjYFiqUxq0oCP5Y9UBh6M1Vpd+0Hx4FDMwR/AvP/4yXjsviVBKc7vAyQnutum6klv3Hj2XKiZyfwFMqZvINZgM5oAAAAASUVORK5CYII='
    );
    
    // Split the numbers into a dataset with each individual number
    familiarNumbers = ImageDataSet.fromFilmStrip(imgFamiliarNumbers, 7);
}

/*
    Find the position on the screen with the provided image, and returns object with the starting pixel.
    The x and y here are to shift the starting pixel. The w and h are used to determine the area from
    the starting pixel that will be grabbed.
*/
export function getPosition(img, imgToFind, xOffset, yOffset, w, h) {

    let foundImage = ImageDetect.findSubimage(img, imgToFind);

    if (foundImage.length > 0) {
        return {
            x: foundImage[0].x + xOffset, // The first possible start position of the first digit
            y: foundImage[0].y + yOffset,
            w: w,
            h: h
        }
    }

};

/* Write the image to console, for debugging purposes */
export function outputImage(buffer) {
    // create off-screen canvas element
    let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

    canvas.width = buffer.width;
    canvas.height = buffer.height;

    // create imageData object
    let idata = ctx.createImageData(buffer.width, buffer.height);

    // set our buffer as source
    idata.data.set(buffer.data);

    // update canvas with new data
    ctx.putImageData(idata, 0, 0);
    let dataUri = canvas.toDataURL(); // produces a PNG file

    console.log(dataUri);
    return dataUri;
    // console.log(buffer.data.toString());
}

/* Read the numbers in an image */
export function readNumbers(buffer, type = "") {
    let str = "";
    let numberMatch = [];
    let numbersList;
    let numberValues = "";
    let foundPixel = false;

    if (type.includes("Buff")) {
        numbersList = buffNumbers;
        numberValues = buffValues;
    } else if (type.includes("Familiar")) {
        numbersList = familiarNumbers;
        numberValues = familiarValues;
    } else {
        numbersList = barNumbers;
        numberValues = barValues;
    }

    // Loop through each number in our list
    for (let a = 0; a < numbersList.buffers.length; a++) {

        // Load the current number's buffer
        let numBuffer = numbersList.buffers[a];
        let match = false;
        // outputImage(numBuffer);

        for (let nbh = 0; nbh < numBuffer.height; nbh++) {

            // Loop through the current number's width, which will be the row of the pixel
            for (let nbw = 0; nbw < numBuffer.width; nbw++) {

                // The current pixel we're looking at will be "4 * w + 4 * numBuffer.width * h". This is because each pixel consists of 4 digits (rgba values).
                // "4 * numBuffer.width" will give you the total number of digits used for pixels on each column. Multiplying it by h will give you how many rows
                // have already been checked. Adding "4 * w" will give you the current column on the current row. We are testing from top to bottom, then left to right.
                // console.log(numBuffer.data[4 * w + 4 * numBuffer.width * h]);

                let i = 4 * nbw + 4 * numBuffer.width * nbh;

                // Find first non-transparent pixel for this number
                if (numBuffer.data[i + 3] == 0) continue;

                foundPixel = true;

                for (let bh = 0; bh < buffer.height; bh++) {
                    for (let bw = 0; bw < buffer.width; bw++) {
                        let bi = 4 * bw + 4 * buffer.width * bh;
                        
                        // We found the first non-transparent pixel for the number. Now find the first match for that pixel in the image
                        if (checkPixelMatch(buffer, numBuffer, bi, i)) {
                            // console.log(bi + ' ' + i);
                            // console.log(bw + ' ' + nbw);
                            // console.log(bh + ' ' + nbh);

                            // Found a match for the first pixel. Now determine if the rest also match
                            match = checkMatch(buffer, numBuffer, bw, bh, nbw, nbh)
                            
                            // Not a match, so continue to the next match attempt
                            if (!match) continue;
                
                            // All pixels in number match, so add it to our number array
                            numberMatch.push({ startWidth: bw, startHeight: bh, num: a });
                        }
                    }
                    
                    if (match) break;
                }

                break;
            }

            // If we already found all matches for the number, or we found the first non-transparent pixel and there were no matches,
            // then this number doesn't exist in the image.
            if (match || foundPixel) break;
        }
        
        foundPixel = false;
        match = false;
    }

    // console.log(numberMatch);

    if (numberMatch.length > 0) {
        numberMatch.sort((a, b) => a.startWidth - b.startWidth).sort((a, b) => a.startHeight - b.startHeight);
        
        for (let m = 0; m < numberMatch.length; m++) {
            if (numberMatch[m].num == 10) {
                // Th
                if (type.includes("Buff")) {
                    str = (str * 60) + 59;
                } else if (type.includes("Health")) {
                    // Legacy has less HP, so scale by 10
                    let isLegacy = checkLegacy(numberMatch, m + 1);

                    if (isLegacy) {
                        str *= 10;
                    } else if (str.includes("K")) {
                        str = str.replace("K", "");

                        // Can't track the dot, because it's only two pixels. Assume if 3 digits, then has dot. If 2 digits, then no dot.
                        if (str >= 100) {
                            str *= 100;
                        } else {
                            str *= 1000;
                        }
                    }
                }

                break;
            } else if (numberMatch[m].num == 11 && type.includes("animate")) {
                break;
            } else {
                str += numberValues[numberMatch[m].num];
            }
        }
    }
    
    let foundWarning = warnings.find(buff => buff.name == type);
    
    if (type.includes("Buff")) {
        if (type == "vulnBuff") return 63;
        else if (type == "smokeCloudBuff") return 123;
        else if (foundWarning) {
            if (str <= Number(localStorage.timeBufferSlider) + 15) return str;
            else if (foundWarning.timeBuffer) return Number(localStorage.timeBufferSlider) + 15
            else return 15
        }
    } else if (type.includes("Bar")) {
        let foundSlash = numberMatch.filter(m => m.num == 10);

        if (foundSlash.length == 0) {
            return undefined;
        }
    }

    return str;
}

let checkLegacy = (numberMatch, m) => {
    let str = "";

    for (m; m < numberMatch.length; m++) {
        str += "0123456789"[numberMatch[m].num];
    }

    if (str < 2000) {
        return true;
    }

    return false;
};

/* Check if two pixels match, within reasonable bounds */
export function checkPixelMatch(buffer, numBuffer, bi, i, variance = 15) {
    if (
        buffer.data[bi] > numBuffer.data[i] - variance && buffer.data[bi] < numBuffer.data[i] + variance
        && buffer.data[bi + 1] > numBuffer.data[i + 1] - variance && buffer.data[bi + 1] < numBuffer.data[i + 1] + variance
        && buffer.data[bi + 2] > numBuffer.data[i + 2] - variance && buffer.data[bi + 2] < numBuffer.data[i + 2] + variance
    ) {
        return true;
    }
    else {
        return false;
    }
}

/* Check if there's a match between all pixels on a Number */
function checkMatch(buffer, numBuffer, bw, bh, nbw, nbh) {

    let w = bw - nbw;
    let dw = nbw;

    // We already know the row the first non-transparent pixel is, so start there
    for (let h = nbh; h < numBuffer.height; h++) {

        // We know the width of the first non-transparent pixel, so start there, but reset to 0 for the next pixel
        for (dw; dw < numBuffer.width; dw++) {
            let i = 4 * dw + 4 * numBuffer.width * h;
            let bi = 4 * bw + 4 * buffer.width * bh; // Start with the row where a match was found

            // Ignore transparent pixels
            if (numBuffer.data[i + 3] == 0) {
                bw++;
                
                continue;
            }

            // Pixel matched
            if (checkPixelMatch(buffer, numBuffer, bi, i)) {
                
                // Check next pixel
                bw++;
            }
            else {
                // console.log(`${buffer.data[bi]}, ${buffer.data[bi + 1]}, ${buffer.data[bi + 2]}`);
                // console.log(`${numBuffer.data[i]}, ${numBuffer.data[i + 1]}, ${numBuffer.data[i + 2]}`);

                // showPixel(buffer, bi);
                // showPixel(numBuffer, i);

                return false;
            }
        }
        
        dw = 0;
        bh++;
        bw = w;
    }

    return true;
};

/* Show the pixel being compared on the actual image, for easier debugging */
function showPixel(buffer, i) {
    let newBuffer = structuredClone(buffer);

    newBuffer.data[i] = 255;
    newBuffer.data[i + 1] = 0;
    newBuffer.data[i + 2] = 0;
    newBuffer.data[i + 3] = 255;

    outputImage(newBuffer);
};

/* Generate a new image based off two images, with only the matching pixels */
export async function generateMatchingImage(firstImage, secondImage) {

    let firstBuffer = await ImageDetect.imageDataFromBase64(firstImage);
    let secondBuffer = await ImageDetect.imageDataFromBase64(secondImage);

    for (let bh = 0; bh < firstBuffer.height; bh++) {
        for (let bw = 0; bw < firstBuffer.width; bw++) {
            let bi = 4 * bw + 4 * firstBuffer.width * bh;

            if (!checkPixelMatch(firstBuffer, secondBuffer, bi, bi, 3)) {
                firstBuffer.data[bi] = 0;
                firstBuffer.data[bi + 1] = 0;
                firstBuffer.data[bi + 2] = 0;
                firstBuffer.data[bi + 3] = 0;
            }
        }
    }

    return outputImage(firstBuffer);
};

export function imageToBase64(image, callback) {
    let reader = new FileReader();

    reader.onloadend = function() {
      callback(reader.result.replace("data:image/png;base64,", ""));
    }

    reader.readAsDataURL(image);
}