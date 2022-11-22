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

    if (type == "") {
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
                str = (str * 60) + 59;
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
export function checkPixelMatch(buffer, numBuffer, bi, i) {
    let variance = 15;

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
}

/* Show the pixel being compared on the actual image, for easier debugging */
function showPixel(buffer, i) {
    let newBuffer = structuredClone(buffer);

    newBuffer.data[i] = 255;
    newBuffer.data[i + 1] = 0;
    newBuffer.data[i + 2] = 0;
    newBuffer.data[i + 3] = 255;

    outputImage(newBuffer);
}