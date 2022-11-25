import * as ImageReader from "./image-reader.js";
import { ImageDetect } from "@alt1/base";

let imageData = [
    { id: 1, name: "lowHealthBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAHEAAAAYCAMAAAD6W+JwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIxUExURVZgY2p3fXeEi3WDimZyeVReY0xWWXB+hGNze1Vmb1Jia01cY1Vnb01XWmFwdlRjakhXYDlDSTAuMDMjIklXYGJwd1dlbERRWTE8QScgHi8dHDIfHTgkIT0mIyodHSkcHDE7QURRWFdlbVNgZz1JUDosKWg1H284IFMuHzYeHTsmIz4oJXA4IGo2HzszKTxIT0lWXDtGSppOKvxvMf5wMcddME0vHjciIMVcMDM8PTtHTqBRLf5mK/5YJvdkKzkjGEojGflkK59RLTI8P0JPV1dHPv1JIdw+Hs9gMD9LUqBKK+1FIYpJKzQ9QDpFSqdGI+M+HaZGJDpFSzI8QTtHTIc/IO01GYY+IDtHTTxITUJOUj1ITT4eFv1YJj1JTkJOU0FOVTxITioaGY4/IN8xGP42Fo0/ICsaGTtGTEBNUyseHS4YF603GjtGTlx4hTE8QENQVy4rLjYcGzEaGbE3GjE9Qys4PBsiJERPVTc+QzQgHzQdGbQ4GbM3GURSWSs3PD5LUkdUWTciIT0fHjodHDMcGLY3GLU3GFNsdyoxNDlESTseHjwfHjkdHDEaFrg3GLc3GDYaF0hVWjs7PkEhIDUaFrk4GLk3GD0eHkVTWkldZiYxNCYwNDsdHTQbGs8wGc4wGTUaFzZCSElOUjgbGzUbGzkfGNA7Hs87HjI8QFFbX0ZLTjkwMjAeHD8cGT8dGTE7QCctLzVBR0VRVlFZXlNcYVFZXyctMCozOC02OwAAACmxuuAAAAC7dFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBh8v5oAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACNklEQVRIS7WVB1MTQRiGV1FBUBHsAjYsFAslEsU7K6xi9ETBs4GCcirFCAGJgEqAoBgulsSoBAGlqRQLiMD+Or/dWx1/wO4zc3fffu/OPbNzs7eI/AUtWBixaDEfSIQbl0RGLY2OiYleFhW53OpIwzKuiF0ZF78KiI9bHbuGtaTBjGvXrd+wMSExKSkxYdPmLVu3sUQW1Ji8fcfOXSmpaenpaakpu/fs3ZdsZXIAY0ZmVrbNZtufY7fnHIAiOyszg6cyQORg7iFFUVVVOXzk6DFWKMdzT/BYAojk5VMNhuvkKVpApeTn8VgCiBScVlTscDioCrNCVc4U8FgC6Kx2jgoLQcWAAqvnLxTxXDyouPgiGPXCf+hgvHT5Cs/Fg65eKynF+H8jxqUl12/wXDyorPzmLRXregVHN7B6+055Gc/Fg+5WVlXXwCK5sAKWWFNdVXmPpU7hgPF+bZ2rvgEbXAlLbKh31dU+YMJGt2AanbA7HjY1u1oecSUIH7e4mpueWEJ6F0urExFPW3uHt/OpQZW6YTzr9Ha0t3lo2uVmk4Ti7kLkucfXbfpfvAQlCF+99prdPiaUZiS+QPCN6Q+9NYB3Ib/5PtjjY2m4lz2E8iFMTystEOwz+0MDhvHxU7/ZFwxoVgpK/sGF0RumpxUhgz1D9uGR0c9fRkeG7UOBQaajhIUDu4O9+as2Nj4x+e375MT4mPaDtaRhGcnPoqnpXzMzv6en5P3COdwIzM7Nz8/N8oE0CPkDeEC5NqCQy3gAAAAASUVORK5CYII=" },
    // Poisoned
    { id: 2, name: "lowHealthBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAHEAAAAYCAMAAAD6W+JwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIxUExURVZgY2p3fXeEi3WDimZyeVReY0xWWXB+hGNze1Vmb1Jia01cY1Vnb01XWmFwdlRjakhXYDlDSTAuMDMjIklXYGJwd1dlbERRWTE8QScgHi8dHDIfHTgkIT0mIyodHSkcHDE7QURRWFdlbVNgZz1JUDosKWg1H284IFMuHzYeHTsmIz4oJXA4IGo2HzszKTxIT0lWXDtGSppOKvxvMf5wMcddME0vHjciIMVcMDM8PTtHTqBRLf5mK/5YJvdkKzkjGEojGflkK59RLTI8P0JPV1dHPv1JIdw+Hs9gMD9LUqBKK+1FIYpJKzQ9QDpFSqdGI+M+HaZGJDpFSzI8QTtHTIc/IO01GYY+IDtHTTxITUJOUj1ITT4eFv1YJj1JTkJOU0FOVTxITioaGY4/IN8xGP42Fo0/ICsaGTtGTEBNUyseHS4YF603GjtGTlx4hTE8QENQVy4rLjYcGzEaGbE3GjE9Qys4PBsiJERPVTc+QzQgHzQdGbQ4GbM3GURSWSs3PD5LUkdUWTciIT0fHjodHDMcGLY3GLU3GFNsdyoxNDlESTseHjwfHjkdHDEaFrg3GLc3GDYaF0hVWjs7PkEhIDUaFrk4GLk3GD0eHkVTWkldZiYxNCYwNDsdHTQbGs8wGc4wGTUaFzZCSElOUjgbGzUbGzkfGNA7Hs87HjI8QFFbX0ZLTjkwMjAeHD8cGT8dGTE7QCctLzVBR0VRVlFZXlNcYVFZXyctMCozOC02OwAAACmxuuAAAAC7dFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBh8v5oAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACNklEQVRIS7WVB1MTQRiGV1FBUBHsAjYsFAslEsU7K6xi9ETBs4GCcirFCAGJgEqAoBgulsSoBAGlqRQLiMD+Or/dWx1/wO4zc3fffu/OPbNzs7eI/AUtWBixaDEfSIQbl0RGLY2OiYleFhW53OpIwzKuiF0ZF78KiI9bHbuGtaTBjGvXrd+wMSExKSkxYdPmLVu3sUQW1Ji8fcfOXSmpaenpaakpu/fs3ZdsZXIAY0ZmVrbNZtufY7fnHIAiOyszg6cyQORg7iFFUVVVOXzk6DFWKMdzT/BYAojk5VMNhuvkKVpApeTn8VgCiBScVlTscDioCrNCVc4U8FgC6Kx2jgoLQcWAAqvnLxTxXDyouPgiGPXCf+hgvHT5Cs/Fg65eKynF+H8jxqUl12/wXDyorPzmLRXregVHN7B6+055Gc/Fg+5WVlXXwCK5sAKWWFNdVXmPpU7hgPF+bZ2rvgEbXAlLbKh31dU+YMJGt2AanbA7HjY1u1oecSUIH7e4mpueWEJ6F0urExFPW3uHt/OpQZW6YTzr9Ha0t3lo2uVmk4Ti7kLkucfXbfpfvAQlCF+99prdPiaUZiS+QPCN6Q+9NYB3Ib/5PtjjY2m4lz2E8iFMTystEOwz+0MDhvHxU7/ZFwxoVgpK/sGF0RumpxUhgz1D9uGR0c9fRkeG7UOBQaajhIUDu4O9+as2Nj4x+e375MT4mPaDtaRhGcnPoqnpXzMzv6en5P3COdwIzM7Nz8/N8oE0CPkDeEC5NqCQy3gAAAAASUVORK5CYII=" },
    // Prayer off
    { id: 3, name: "lowPrayerBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAHAAAAAXCAMAAADkzzubAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG2UExURVpnbXB+hXWDiltpb1xqcGx7glxtdVNjbEtWXGBtc0lZYElWXTg+SzQxSzAsR4ulwjpDS0ZPVE9gZzY9Sj0zWkA2YEI3Y0tObqnR8E9faExcYzUyTEg8bE0/dEc7a3WDpanS8Uc7bEo+cVJEfE9BeVVVfpe107fR81NTfUZRVlZHgk9EdniGqbfQ87ze77bQ8lVGgD80YUVTWkY6aVJDfUw/c2NtjbbP8szi+kk9cE1AdUo/b2NtjNzu/DtITj81X0A2Yk9Qd3aEpkQ3ZjtHTkBOVUdWXEdLaXOCopa00kFOVUdUWl9vfIumw1xte0BNVC8tQkhMabfQ8jAsRkBMUlx4hTE5QTowVTowVklLbXSDo7bP8TIwRTM7Qys4PBsiJDM8RDoxVT81Xj83XVxogys3PEFMUzQsTEE2YVtngVNsdzA3QjcuUj41XTozVXKCoHKBoC86PzxJTzMxRjkwVUZJZZWz0ENGY01ZXkldZiYxNCYwNDkwVDIqSXB/nSMrMDEqSENIYiIrLzVBRkRQVlFdY0JGTy0pPoqlwSYvNFVfZGh3hCYwNSMrLykyNyo0OCcwNQAAAPu6xdkAAACSdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AJsmhUgAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAhpJREFUSEu1lX1X0zAUh4OyVp2dlaaABaRuyETYpuVl5WVOUGADEZlOBpusA2wBBypD3JBXYaKIaL6xSRv9BM3zR3vP/fX0OfckOQHoH6DmUs1lWjOECms9HH/l6jWe89Q6DWY4Qg/vvS74bvgE0ct77A4ziPAmVydBub6hsaFehtItzkkYQYSc0iQ3t9xuVVvvtDTLTQpTIxYSnz/Qdrc92H6vLeBnbASog5ew735nVygc6ep8EPA/lPgOmjIAIF6D3YGe3r6oruvRvt6eQDfUeJoyACBFkvsHBodCuh7T9dDQ4EC/LNXRlAHgkSLEHw+P4PliMWyMjgw/iQvKUxq7Dxgd840nkhHbR4yRZGLcNzZBY/cBk8+mVDUYdnzYGA6q6tTzSRq7D5iYfjGTSKb+T5hKJmZeTr+yw7TrYOFrTZjNzM1n6Rpm5+cyszntje1byLvMQhrvUs0oxBeXlsmMeL7lpcV4wdAcH3m6y9s0QKZpQXkls4pn1LOrmRUZWqZJwrW8/Y2r5NcAeqcZRSivb7xPhSMfNtZlWDS0jyRkJUSb3lIRwq1P28Htz1sQFkvlTTus7NgvV/lSIbeF6C1Zhd29fXV/b7dglbyOjxjpWrvGToXcFuhALIuWdXjUeHRoWbj+6viw0XXwsbD/fHxS/ZY7/X6aM6snx3aHGY4Q/TDE6tnPs7JonDsNZlAh5tfF74s/tGYGQn8BSs/wNyit6koAAAAASUVORK5CYII=" },
    // Prayer on
    { id: 4, name: "lowPrayerBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAHAAAAAXCAMAAADkzzubAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIEUExURWtWq4Rn0Y9s54Rn0mxYrW5YsINj5HVS3G1L0V9BtnFeslw/sk84i1tBhllCdJSrzIRi22ZGxHVVl4Fep4JfqHJmmqnS8XNT02FDulxCiH1brI5mupRuyYdjuoiPu4xmvIxnyptz15px2YV0u5y42bfR84NyulU+nHNZsphx4p506Y5r0ImRwrze77fQ84mRw4lo0VM7n1g9q2xPpoFfyI1u35hx7Ixo2X5/uMzi+ks1i3BWvoJh2Itp4IJk0nt9uNzu/EcyilE7kG9SwHJWxnNmwISOw3ZoxHBVv0cyiVI5oFY7plA+iGJcoYGLvpq32mJdoVM5oGZdrZGp0Ew1kk41mEo6emBcmn6JuJm22Es8elx4hTsqdFQ5o0g1gV9JoWFKpGRdpX6Kt7bQ8z0sdis4PBsiJFE4nD8rel1GomlRsGdOr2BNoGxyoV1KmSs3PE01lFRCimJNomZQqWdQrVtGmWlxnbbQ8lNsdzcoa1I8kkQ0clZCkWBLnmNOpVhIj3qHsHqGsFhIkF9LnjcnakQug0c4c2BLnVpHlVtYjpe11VlVjUldZiYxNCYwNFhEkltIk08/gXiFq3iFrEY6aUw9e1RFgU8+glNTgKnR8Uo+cTsoc0k2g1dIhEU5aEA3YI6oySseVFZEi2xpnVRGfzgmbyweVSYbTC4fWzAfXSgdTgAAAABqDagAAACsdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAFlRWxAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACLklEQVRIS7WVeVMTMRiH40FbZEGXY7stiAVZBbSrci9nQcSjCMohYOWWsnLUphzFFjwpIBYBlcOWw1s0X9LdbPwGyfNHNvP+dvJM5k0mAP0HHDt+4iSZM4QIE0xmS+KpRIvZlGAUmGEITZYkLjnldEoyl2Q5gyvMwEIzz6WmpWcIGelpqRxvxgErdKFVtNkzs85mC9nnsjLtNtFqRGzQhFbeZnfk5J7Pk/Iu5OY47DaepRGgizyX7ygovHRZcspXrhYWOPI5/hpJGQAQX1RcUlpWXiEriiJXlJeVlhQX8SRlAEBiZVV1TW2dpCguRZHqamuqqypFkjIA1IsN1xtvNGn7c7k0o9x0s/FWg3ibxPQBd9zNd1taDR82trbca3bfJzF9gLutXRAkp+HTjE5JENrb3CSmD+jofNDV3aN3EPsUqae762FnBw491NGEj3r7+gcGh4ZJD4eHBgf6+3ofY9+IlzIjHu2UjqpPxsYnJskpnZwYH/Opo4ZPH+ny1AOQn4OBqemZ2aB2D4OzM9NTAcj59XDOi/+hincOoGeh8PxC4PmLl7Iz+Or1m8DCfNi/qIeshCgSWoK+5ZW3q9Lqu5VlHwyHIjiMruEPVd5H9dciApfg+sbmB+Hj5sY6DEPDpxtJr6mxFtVfC4RU+Glre2f38+7O9lYMqtimE6WOdi3wyvG9/djB4ZfDg9j+XhxXmGEI0de4Cr99/wHVn7+MAjOIUOP30Z+jv2TODIT+AXKDzVCTyNQkAAAAAElFTkSuQmCC" },
];

let imageBuffers = [];

export async function loadBarImages() {
    imageBuffers = [];

    // Top left corner of Bar box
    for (let i = 0; i < imageData.length; i++) {
        let imgBuffer = await ImageDetect.imageDataFromBase64(imageData[i].imgData);

        imageBuffers.push({ id: imageData[i].id, name: imageData[i].name, imgBuffer: imgBuffer });
    }
};

export function getBar(img, barName) {
    try {
        // Get starting pixel for Bar image, to be used to grab the bar
        let foundBar = imageBuffers.filter(b => b.name == barName);
        let barPosition;
        let numberType = barName == "lowHealthBar"? "health" : "prayer";

        for (let fb = 0; fb < foundBar.length; fb++) {
           barPosition = ImageReader.getPosition(img, foundBar[fb].imgBuffer, 20, -5, 90, 27);

            if (barPosition != undefined) {
                break;
            }
        }

        if (barPosition != undefined) {
            let buffer = img.toData(barPosition.x, barPosition.y, barPosition.w, barPosition.h);

            // ImageReader.outputImage(buffer);
            let bar = ImageReader.readNumbers(buffer, numberType);
            
            console.log(bar);
            if (bar == undefined || bar == "") {
                return undefined;
            } else {
                return Number(bar);
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

    for (let b = 0; b < selectedBar.length; b++) {
        let barValue = getBar(img, selectedBar[b]);
        let foundBar = barStats.find(bt => bt.name === selectedBar[b]);

        if (!foundBar) {
            // Bar stat doesn't exist, so add it.
            barStats.push({ name: selectedBar[b], value: barValue })
        } else if (barValue != undefined && barValue != "") {
            foundBar.value = barValue;
        }
        // console.log(barValue);
    }

};