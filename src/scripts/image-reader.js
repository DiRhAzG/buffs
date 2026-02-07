import { ImageDetect } from "@alt1/base";
import { ImageDataSet } from "@alt1/base/dist/imagedetect";
import { warnings } from "./script.js";
import { getNumberImages } from "./image-data.js";

let imgBuffNumbers;
let buffNumbers = new ImageDataSet();
let buffValues = "0123456789/mh";

let imgBarNumbers;
let barNumbers = new ImageDataSet();
let barValues = "0123456789/mh";

let imgFamiliarNumbers;
let familiarNumbers = new ImageDataSet();
let familiarValues = "0123456789/";

let imgWhiteNexusNumbers;
let whiteNexusNumbers = new ImageDataSet();
let whiteNexusValues = "0123456789K";

let imgYellowNexusNumbers;
let yellowNexusNumbers = new ImageDataSet();
let yellowNexusValues = "0123456789K";

/* Load the images that will be used to search the screen */
export async function loadImages() {
    let numberImages = getNumberImages();
    
    // The numbers used for buffs
    imgBuffNumbers = await ImageDetect.imageDataFromBase64(numberImages.find(i => i.name == "buffNumbers").imgData);
    
    // Split the numbers into a dataset with each individual number
    buffNumbers = ImageDataSet.fromFilmStrip(imgBuffNumbers, 6);

    // The numbers used for action bar
    imgBarNumbers = await ImageDetect.imageDataFromBase64(numberImages.find(i => i.name == "barNumbers").imgData);
    
    // Split the numbers into a dataset with each individual number
    barNumbers = ImageDataSet.fromFilmStrip(imgBarNumbers, 6);

    // The numbers used for familiars
    imgFamiliarNumbers = await ImageDetect.imageDataFromBase64(numberImages.find(i => i.name == "familiarNumbers").imgData);
    
    // Split the numbers into a dataset with each individual number
    familiarNumbers = ImageDataSet.fromFilmStrip(imgFamiliarNumbers, 7);

    // The numbers used for Nexus
    imgWhiteNexusNumbers = await ImageDetect.imageDataFromBase64(numberImages.find(i => i.name == "whiteNexusNumbers").imgData);
    
    // Split the numbers into a dataset with each individual number
    whiteNexusNumbers = ImageDataSet.fromFilmStrip(imgWhiteNexusNumbers, 6);

    // The numbers used for Nexus
    imgYellowNexusNumbers = await ImageDetect.imageDataFromBase64(numberImages.find(i => i.name == "yellowNexusNumbers").imgData);
    
    // Split the numbers into a dataset with each individual number
    yellowNexusNumbers = ImageDataSet.fromFilmStrip(imgYellowNexusNumbers, 6);
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
    let foundParentheses = false;

    if (type.includes("Buff")) {
        numbersList = buffNumbers;
        numberValues = buffValues;
    } else if (type.includes("Familiar")) {
        numbersList = familiarNumbers;
        numberValues = familiarValues;
    } else if (type == "WhiteNexus") {
        numbersList = whiteNexusNumbers;
        numberValues = whiteNexusValues;
    } else if (type == "YellowNexus") {
        numbersList = yellowNexusNumbers;
        numberValues = yellowNexusValues;
    } else {
        numbersList = barNumbers;
        numberValues = barValues;
    }

    // Loop through each number in our list
    for (let a = 0; a < numbersList.buffers.length; a++) {

        // Load the current number's buffer
        let numBuffer = numbersList.buffers[a];
        let match = false;
        // console.log(a);
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

    // Create the full number using the array of numbers found
    if (numberMatch.length > 0) {

        // Sort the array of numbers first, so that we go from left to right
        numberMatch.sort((a, b) => a.startWidth - b.startWidth);//.sort((a, b) => a.startHeight - b.startHeight);
        
        for (let m = 0; m < numberMatch.length; m++) {

            if (numberValues[numberMatch[m].num] == "m") {
                str = (str * 60) + 59;
                break;
            } else if (numberValues[numberMatch[m].num] == "h") {
                str = str * 60 * 60;
                break;
            } else if (numberValues[numberMatch[m].num] == "/") {
                break;
            } else {
                str += numberValues[numberMatch[m].num];
            }
        }
    }
    
    if (localStorage.debugMode == "true"){
        console.log(str);
    }
    
    let foundWarning = warnings.find(buff => buff.name == type);

    if (type.includes("Buff")) {
        if (type == "vulnBuff") return 63;
        else if (type == "smokeCloudBuff") return 123;
        else if (type == "quickPrayerBuff") return 5;
        // else if (type == "bookBuff") return 5;
        else if (foundWarning) {
            if (type == "animateDeadBuff") {
                if (foundParentheses) return str;
                else return Number(localStorage.timeBufferSlider) + 5;
            } else {
                // if (foundWarning.timeBuffer) return Number(localStorage.timeBufferSlider) + 5
                // return 5;
                if (str <= Number(localStorage.timeBufferSlider) + 5) return str;
                else if (foundWarning.timeBuffer) return Number(localStorage.timeBufferSlider) + 5
                else return 5;
            }
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
        && buffer.data[bi + 3] > numBuffer.data[i + 3] - variance && buffer.data[bi + 3] < numBuffer.data[i + 3] + variance
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
    try {
        firstImage = firstImage.includes(',')? firstImage.split(',')[1]: firstImage;
        secondImage = secondImage.includes(',')? secondImage.split(',')[1]: secondImage;

        let firstBuffer = await ImageDetect.imageDataFromBase64(firstImage);
        let secondBuffer = await ImageDetect.imageDataFromBase64(secondImage);

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

        return outputImage(firstBuffer);
    }
    catch (ex) {
        console.log(ex);
        return null;
    }

};

// export function imageToBase64(image, callback) {
//     let reader = new FileReader();

//     reader.onloadend = function() {
//       callback(reader.result.replace("data:image/png;base64,", ""));
//     }

//     reader.readAsDataURL(image);
// }

export function imageToBase64(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
        };

        reader.onerror = reject;

        reader.readAsDataURL(image);
    });
}