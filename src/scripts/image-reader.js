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

    if (type == "buff" || type == "animate") {
        numbersList = buffNumbers;
    } else if (type == "health" || type == "prayer") {
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
                if (type == "buff" || type == "animate") {
                    str = (str * 60) + 59;
                } else if (type == "health") {
                    let isLegacy = checkLegacy(numberMatch, m + 1);

                    if (isLegacy) {
                        str *= 10;
                    }
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

    // Need to make sure the bar has the '/' showing, to make sure it's not blocked by anything.
    if (type == "bar") {
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
    // imageToBase64(firstImage, function(dataUrl) {
    //     console.log('RESULT:', dataUrl)
    // })
    // let firstBuffer = await ImageDetect.imageDataFromBase64("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");
    // let secondBuffer = await ImageDetect.imageDataFromBase64("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");

    // for (let bh = 0; bh < firstBuffer.height; bh++) {
    //     for (let bw = 0; bw < firstBuffer.width; bw++) {
    //         let bi = 4 * bw + 4 * firstBuffer.width * bh;

    //         if (!checkPixelMatch(firstBuffer, secondBuffer, bi, bi, 10)) {
    //             firstBuffer.data[bi] = 0;
    //             firstBuffer.data[bi + 1] = 0;
    //             firstBuffer.data[bi + 2] = 0;
    //             firstBuffer.data[bi + 3] = 0;
    //         }
    //     }
    // }

    // outputImage(firstBuffer);
};

// function imageToBase64(url, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//       var reader = new FileReader();
//       reader.onloadend = function() {
//         callback(reader.result);
//       }
//       reader.readAsDataURL(xhr.response);
//     };

//     xhr.open('GET', url);
//     xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

//     xhr.responseType = 'blob';
//     xhr.send();
//   }
  
