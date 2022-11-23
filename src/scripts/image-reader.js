import { ImageDetect } from "@alt1/base";
import { ImageDataSet } from "@alt1/base/dist/imagedetect";

let imgBuffNumbers;
let buffNumbers = new ImageDataSet();

let imgBarNumbers;
let barNumbers = new ImageDataSet();

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
        'iVBORw0KGgoAAAANSUhEUgAAAEIAAAAICAYAAABNlyniAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJKSURBVEhLlVXNbtNAELbyYzvlDrxIiqpeEynGvACBN6DiAEIqbXmSphKIY7mUnxt2EtvpLS52wjFRnN5j9wmWnc16u+tdB/eTLM/Ofjs7O7Mzq/FYrRJERYZ4Npd0gCieSfogmCA/CJT8HF5wTeazLNvJm+F9Pd8XOJ4fIB9/ICMMosQAX8DuKlkL/Hj+t3SPZC1yBVj2C3R5+U0g3PyJkPXcVi46HwzQm6O30txyuSzdxHFcMjeZXKNarVbKA+i6gczWHuMYZguZ+AN/HHdrJ8vuyL+Juf1Xr5n/+UGbuolOzz6h88EFswOQAlGMIh9pgDscoV7PEhf9BzHO0P7+M+Ua1x1WsqUbRiVesr5F7XabcT9/+crker3B5DRNd9uDgzeazUqbPgT8QTxcMlTURmOPyY7jIAgaHRKAP2c4g2PPQ1EUK/1KCsmbTqfo6vtPQZemYumBXSqqQQk7SVAyVJSgG6Y0F4ahpDNaj4iOD0R+7flsgT+dToeMbdtGZWXWaIjJe9nvozC8EXSLxQL3rG1PouckyO625SSA1tg9SdHELOwQFSvj5OSUrAF7UF7wQeNNFfbH3n1TLPrDHwBQ9K/YtDebjTCu44AdHByS/alKu/rxS92fut2urKSAbtyzHh6Id+8/sDX5ptDkfuNyIEoOxat+fPyRjX2urHLwh4CX7vGTp2ysCnRlwJWCK6t6biADU+6qQ4YgusPRWODO59tnFp49oihBXhp5b4hn8jPs4IY6wvb53gIos52Xj+fLQYticY06UJr2D34Kq2+ZZMeaAAAAAElFTkSuQmCC'
    );
    
    // Split the numbers into a dataset with each individual number
    barNumbers = ImageDataSet.fromFilmStrip(imgBarNumbers, 6);
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
    // console.log(buffer.data.toString());
}

/* Read the numbers in an image */
export function readNumbers(buffer, type = "") {
    let str = "";
    let numberMatch = [];
    let numbersList;
    let foundPixel = false;

    if (type == "buff") {
        numbersList = buffNumbers;
    } else if (type == "animate") {
        numbersList = buffNumbers;
    }else if (type == "bar") {
        numbersList = barNumbers;
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

    if (numberMatch.length > 0) {
        numberMatch.sort((a, b) => a.startWidth - b.startWidth).sort((a, b) => a.startHeight - b.startHeight);
        
        // console.log(numberMatch);
        // All number images must be in this format, 0123456789
        for (let m = 0; m < numberMatch.length; m++) {
            if (numberMatch[m].num == 10) {
                if (type != "bar") {
                    str = (str * 60) + 59;
                }

                break;
            } else if (numberMatch[m].num == 11) {
                break;
            } else {
                str += "0123456789"[numberMatch[m].num];
            }
        }
    }

    // Animate Dead has two timers, so we have to make sure both are showing.
    if (type == "animate") {
        let foundParentheses = numberMatch.filter(m => m.num == 11);

        if (foundParentheses.length == 0) {
            return undefined;
        }
    }

    return str;
}

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

/* Generate a new image based off two images, with only the matching pixels */
export async function generateMatchingImage() {
    let firstBuffer = await ImageDetect.imageDataFromBase64("iVBORw0KGgoAAAANSUhEUgAAAEIAAAAICAYAAABNlyniAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMdSURBVEhLjVXNa1NBEA9tkpc0IAj2u9ZaPNVbbStF0UuLjRERb231L6gfxQ/6LagHrQgiRRCsoFbxUA/2Ew++NHl56S2teYnHlqbem9e/YNyZ7Nu83TzBH4TszPx2dnZ2Zp7PgWGmYW+vAFwkPBibAiuXJ11j6ylhSxomZK2cxB0bmwCT+UiZpqRXYZibZLdtm3HTYKS8+Tl2rpFKSTbkpjgfGEjJgLGg373CvsS38r9JxnhJ4UJhX+YKBLUwRGNXYHHxm0TY/pWF6OVYxSYtVAPv5udh5NYdYTtWWw8dHadhd3cX+vsveR6k63HSp9ObUFVVBZoW8uQhgkENQuEaYddCYQixH8ajx0t+bPuQ/gOMOzR8Q8TvXDQQDMHU9AyL9b3wg6hIhJpFd6YR8Y0EDAxE5U0uTM88IltLaxs0Hz9Ba4u9UE/P2Yo9V69dh3h8Q+jdl1QR1LR/2two7P+B7u5uwf3wcYHWWAXV1X6hLxaLkr+5N29l/3hxfyAglNgifElAeSBaWREqzl+4CLMvXlJrPHs+C+6LuH0mkoZY67oOmDQuEjCeafaCScOAbNbyPLegPF4mk4Gl5VVJVyza0NDYJHToly+9wQmC5NVP2DJHa8tOEQtfvpIcdJX24PBNuDs6CltbW9DZ2SXxtXCEZHcisCIaWbDu18J4+vr6SI7FYtRmZFDg95cf7/vSCgwODbFzt2Fk5LbQ7+zssIcpzSR+T4J9eAjY2lwsgfdYmcSGGF8SMDFRFhAXJYQjRyR9c0srtcfjJ09hcnKKbOgP2wt/OHiLin9E0igPRTUe9wUQanzq0D44OJDkapaw3t5zdD5X+ZZW1mg+cbGE5dV1Ntj6hXJl7YdEwGn8P63R1XkG2k+2E291bR3u3X8o9jiH4pD7ydqBlC6opT4+PiFk/LLwpYD7Evilq6tvELKa6Lqmtor9/wSWFJas87lxA18gw0r91es5suELYXY3EknWx+U2yufz7PNpAn72UI5ESq2gwmkNZzZYOflFETobqAnmX51Xjm8V2D4Yi5Eq8z99LrVu1pL3eFWkz+fz/QUIGSjsbhNNZgAAAABJRU5ErkJggg==");
    let secondBuffer = await ImageDetect.imageDataFromBase64("iVBORw0KGgoAAAANSUhEUgAAAEIAAAAICAYAAABNlyniAAAEL0lEQVRIS5VVXUybVRh+v7a0oElpgZm5CFTEzUhbYo2Q2R+gWBPspkxXnSRGonhjjDMDdtGBXhWKRmdEr0Sj0cx44082LAktP4WiQCil1Au07QB/5kykpYxtOMbrOYd+/WeZ5+LL+c77nvP+Ps/LAVkTnh9Rrz3MLS+voEJRztEzfvkXA6hWKdPOqGzBv4hXNq+C9nBtliz1fubePTmFBt2jXDQaRZlMlvPume638MSzFohEI2DQ65nO5KQHdxCB/ZCPTqsFjizel/XYBpSV3gOK8rLEm/7Az6hWVuW0sbK6iuVlSd00pSbzEXyptRUsluOJ83nfAlqtVnD8MJj14McDA+jz+eGjDz9Ik4XDYayoqMjpgMs1go2NRs7jmUK9Xgc7Oztpeq++9jq2nHgOdDotJxZLUCAUwvVrV5mOJL8A6abBaISOjnZoNBpJQtdJQgu5PKJrsVjgWHMz858PNE+cj6dPd4JCoYBX2l5O2MpKxPLKKqZmEcniM02Nj4yO4dt9fTA05LjtyvtJt7S1tcHMzHTWnZGRUTQaG/Z86/yFQTx79n3SAW7Yf6AUVi8Gme7991agQJQHS78ucee++hqdzmH49JMBEvBvePyZp2F2dpbpffb5F9j64gtsLxSK8ObNbbaPRCIol8v3tMvRwPPEYti+ceO2A03ChrSeKnfriSUS/Hdri73pJm1tIBU+8mQzdrSfgvo6Azt3uVy4b99doFarErapP93db4LpcRPICmVQXa3O8muFFO/BqirYvLLBZHNzc/j7H5eAds9Rc1M88CgJPAm9zAJnQpYlIg61nIlwT3iw194LjsELOeViST4J+HqazOv1okajSTuTFNyJW9c2ubFxN/KJyC+4A2nbp1aL+mMymcDpdHJmsxn7+/uBh1kl6YrgxTBnt/dhV1cXbG8ni/d8Swt2dnSCRvNQwm4oFMI/L10GPeGk1ERE1wmcCgvT/OMxFqcggFwk1kQccgxmc8StSNFqPYM9PTZGit55H1MtKSmBUkJo8gySHHdPYJ1hlxTjmE/4kxrAAwcP4U8z00BJtlguw38iUY6SdnVKR62trWFRUVEiSKEoD2seqQFbjw2MDfXs/Pvzg3jsqaNp/MQEpAI4PDycuyMIy/fYbDDk+H+JONXeie+9+w57UyAQICXFpifM2E6g8VhjY5ot2urlcbb/kuA/sOADu72X6UwQWOkJrCoqD2E4uJR4j3QH/BIKsklXU1sLf1/+axcSJPGZib5VwXgZu+z1zmNsYwOKioshddxQbJN/CIXD8HC81WmFRsfG6eiChvq6RECBQACVSiW3SMatKse45Q3y0KCEGovFQFooBbUqyRGMOwihCgUCEIhEQLmFnt1XeRC/+/YbOPnGSZiZnoH9dx+AICFOKuOnFIWxQb+rv5vEKZRKpVCtTo7/vRL1Hz6j/BhAjO0LAAAAAElFTkSuQmCC");

    for (let bh = 0; bh < firstBuffer.height; bh++) {
        for (let bw = 0; bw < firstBuffer.width; bw++) {
            let bi = 4 * bw + 4 * firstBuffer.width * bh;

            if (!checkPixelMatch(firstBuffer, secondBuffer, bi, bi, 10)) {
                firstBuffer.data[bi] = 0;
                firstBuffer.data[bi + 1] = 0;
                firstBuffer.data[bi + 2] = 0;
                firstBuffer.data[bi + 3] = 0;
            }
        }
    }

    outputImage(firstBuffer);
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