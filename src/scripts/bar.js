import * as ImageReader from "./image-reader.js";
import { ImageDetect } from "@alt1/base";

let imageData = [
    { id: 1, name: "lowHealthBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAHEAAAAYCAMAAAD6W+JwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIxUExURVZgY2p3fXeEi3WDimZyeVReY0xWWXB+hGNze1Vmb1Jia01cY1Vnb01XWmFwdlRjakhXYDlDSTAuMDMjIklXYGJwd1dlbERRWTE8QScgHi8dHDIfHTgkIT0mIyodHSkcHDE7QURRWFdlbVNgZz1JUDosKWg1H284IFMuHzYeHTsmIz4oJXA4IGo2HzszKTxIT0lWXDtGSppOKvxvMf5wMcddME0vHjciIMVcMDM8PTtHTqBRLf5mK/5YJvdkKzkjGEojGflkK59RLTI8P0JPV1dHPv1JIdw+Hs9gMD9LUqBKK+1FIYpJKzQ9QDpFSqdGI+M+HaZGJDpFSzI8QTtHTIc/IO01GYY+IDtHTTxITUJOUj1ITT4eFv1YJj1JTkJOU0FOVTxITioaGY4/IN8xGP42Fo0/ICsaGTtGTEBNUyseHS4YF603GjtGTlx4hTE8QENQVy4rLjYcGzEaGbE3GjE9Qys4PBsiJERPVTc+QzQgHzQdGbQ4GbM3GURSWSs3PD5LUkdUWTciIT0fHjodHDMcGLY3GLU3GFNsdyoxNDlESTseHjwfHjkdHDEaFrg3GLc3GDYaF0hVWjs7PkEhIDUaFrk4GLk3GD0eHkVTWkldZiYxNCYwNDsdHTQbGs8wGc4wGTUaFzZCSElOUjgbGzUbGzkfGNA7Hs87HjI8QFFbX0ZLTjkwMjAeHD8cGT8dGTE7QCctLzVBR0VRVlFZXlNcYVFZXyctMCozOC02OwAAACmxuuAAAAC7dFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBh8v5oAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACNklEQVRIS7WVB1MTQRiGV1FBUBHsAjYsFAslEsU7K6xi9ETBs4GCcirFCAGJgEqAoBgulsSoBAGlqRQLiMD+Or/dWx1/wO4zc3fffu/OPbNzs7eI/AUtWBixaDEfSIQbl0RGLY2OiYleFhW53OpIwzKuiF0ZF78KiI9bHbuGtaTBjGvXrd+wMSExKSkxYdPmLVu3sUQW1Ji8fcfOXSmpaenpaakpu/fs3ZdsZXIAY0ZmVrbNZtufY7fnHIAiOyszg6cyQORg7iFFUVVVOXzk6DFWKMdzT/BYAojk5VMNhuvkKVpApeTn8VgCiBScVlTscDioCrNCVc4U8FgC6Kx2jgoLQcWAAqvnLxTxXDyouPgiGPXCf+hgvHT5Cs/Fg65eKynF+H8jxqUl12/wXDyorPzmLRXregVHN7B6+055Gc/Fg+5WVlXXwCK5sAKWWFNdVXmPpU7hgPF+bZ2rvgEbXAlLbKh31dU+YMJGt2AanbA7HjY1u1oecSUIH7e4mpueWEJ6F0urExFPW3uHt/OpQZW6YTzr9Ha0t3lo2uVmk4Ti7kLkucfXbfpfvAQlCF+99prdPiaUZiS+QPCN6Q+9NYB3Ib/5PtjjY2m4lz2E8iFMTystEOwz+0MDhvHxU7/ZFwxoVgpK/sGF0RumpxUhgz1D9uGR0c9fRkeG7UOBQaajhIUDu4O9+as2Nj4x+e375MT4mPaDtaRhGcnPoqnpXzMzv6en5P3COdwIzM7Nz8/N8oE0CPkDeEC5NqCQy3gAAAAASUVORK5CYII=" },
    // Poisoned
    { id: 2, name: "lowHealthBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAHEAAAAYCAMAAAD6W+JwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIxUExURVZgY2p3fXeEi3WDimZyeVReY0xWWXB+hGNze1Vmb1Jia01cY1Vnb01XWmFwdlRjakhXYDlDSTAuMDMjIklXYGJwd1dlbERRWTE8QScgHi8dHDIfHTgkIT0mIyodHSkcHDE7QURRWFdlbVNgZz1JUDosKWg1H284IFMuHzYeHTsmIz4oJXA4IGo2HzszKTxIT0lWXDtGSppOKvxvMf5wMcddME0vHjciIMVcMDM8PTtHTqBRLf5mK/5YJvdkKzkjGEojGflkK59RLTI8P0JPV1dHPv1JIdw+Hs9gMD9LUqBKK+1FIYpJKzQ9QDpFSqdGI+M+HaZGJDpFSzI8QTtHTIc/IO01GYY+IDtHTTxITUJOUj1ITT4eFv1YJj1JTkJOU0FOVTxITioaGY4/IN8xGP42Fo0/ICsaGTtGTEBNUyseHS4YF603GjtGTlx4hTE8QENQVy4rLjYcGzEaGbE3GjE9Qys4PBsiJERPVTc+QzQgHzQdGbQ4GbM3GURSWSs3PD5LUkdUWTciIT0fHjodHDMcGLY3GLU3GFNsdyoxNDlESTseHjwfHjkdHDEaFrg3GLc3GDYaF0hVWjs7PkEhIDUaFrk4GLk3GD0eHkVTWkldZiYxNCYwNDsdHTQbGs8wGc4wGTUaFzZCSElOUjgbGzUbGzkfGNA7Hs87HjI8QFFbX0ZLTjkwMjAeHD8cGT8dGTE7QCctLzVBR0VRVlFZXlNcYVFZXyctMCozOC02OwAAACmxuuAAAAC7dFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBh8v5oAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACNklEQVRIS7WVB1MTQRiGV1FBUBHsAjYsFAslEsU7K6xi9ETBs4GCcirFCAGJgEqAoBgulsSoBAGlqRQLiMD+Or/dWx1/wO4zc3fffu/OPbNzs7eI/AUtWBixaDEfSIQbl0RGLY2OiYleFhW53OpIwzKuiF0ZF78KiI9bHbuGtaTBjGvXrd+wMSExKSkxYdPmLVu3sUQW1Ji8fcfOXSmpaenpaakpu/fs3ZdsZXIAY0ZmVrbNZtufY7fnHIAiOyszg6cyQORg7iFFUVVVOXzk6DFWKMdzT/BYAojk5VMNhuvkKVpApeTn8VgCiBScVlTscDioCrNCVc4U8FgC6Kx2jgoLQcWAAqvnLxTxXDyouPgiGPXCf+hgvHT5Cs/Fg65eKynF+H8jxqUl12/wXDyorPzmLRXregVHN7B6+055Gc/Fg+5WVlXXwCK5sAKWWFNdVXmPpU7hgPF+bZ2rvgEbXAlLbKh31dU+YMJGt2AanbA7HjY1u1oecSUIH7e4mpueWEJ6F0urExFPW3uHt/OpQZW6YTzr9Ha0t3lo2uVmk4Ti7kLkucfXbfpfvAQlCF+99prdPiaUZiS+QPCN6Q+9NYB3Ib/5PtjjY2m4lz2E8iFMTystEOwz+0MDhvHxU7/ZFwxoVgpK/sGF0RumpxUhgz1D9uGR0c9fRkeG7UOBQaajhIUDu4O9+as2Nj4x+e375MT4mPaDtaRhGcnPoqnpXzMzv6en5P3COdwIzM7Nz8/N8oE0CPkDeEC5NqCQy3gAAAAASUVORK5CYII=" },
    // Prayer off
    { id: 3, name: "lowPrayerBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQKSURBVDhPbZRrTFtlGMf/59orbYFS2mLhcBlDNqEyNpkJOrY4r4kmMzq8JMbF7KP7qPGD2QfDB7+gnzQmxks2xWSRDI1ZtghxMgKZDliVAINyp1zaldLLOT03z3souGX7J+2bPs//+fV53/c5h8JD9Pxrbwt3Y4n3lW2EFVk59uaHH+FC1ydgOXaAL8Gou7Tks99++n6uYN8TU1hNvfzOWY+7qLxLW7f8yGuuNivrEkpCATx1+jSio7fBiBaBlmxtUlw5568LeVo7TgxPjt0UC+X/w15664wnFlntd+hlr9itbth4lxk/+PRRBBv2Q97OYnM2BrvFBYbhQOW5tkQs9lzLifaeqfFbJpAmXwS09u9av4P1hu3WYtitHtA0B1ewFDUtTXDptLk6/cVmnOSJj/hJHaknHLMzjzvQtdNRMay8AyzDQ4WE+iebET50GJxLQZGlGOlMCpvzy+BoCxiaBUUZ5Qrj38rErMsL01eoZ069IYhziNosbjjtpYBOIa9kUd4UxKl334Ov1Er+z9R6XMSlr7/C2vgKeNYOUDrS2Thy0hasAqoZrzf0scU4bJ5zGnYdspaFv6kCr545uwfyOGmIeR0OOwvh0TAWViaRXN2ArpMsBVWTkZbiYAKl9R9wtF1QVBm2Mica2w/hhdc77wMRWXlqB2hjUdXQjKyaRSKxDnFrG6quIC/mRMbnrfnGU+FD+Hg7Dr94EuHWIw+AdrUHNDosC9XAW1cJvohHIrmG7URcoD69eF2vPNhkmsmtcUUKPKzjAdC9SqY1JJWMMS4sUpRmxhYi46CaHzuuB6r248CRo6htCaP6EQFlJQ/vjIiAiDYSIqJLc5j5exT/jAwhNjcDJlTReExJycLSxDTmJyeN20nDF6o1tsKZWyJb29UuaD2ew++/XMafvX24M3ILUioLlRYHmEBdVZiVbW0cZ4ecEbEyPYOF5TuoPdBqHvYu8N6OLn75OSb+GIGclsynQdNlqM5cL9PQ9PhkLiGeY40gbQwibczx5vwSFldndoCFDolIRxe+6EZ0OAKOMY6CoqAZYyHlM3D5HZ3M3NREMlBf6dFzTBttJCmaMT40EssryFMq/JX7IHMSUkkN1y7/jEj/IFjWanCM+VLzyMsiNHem+8a1X3vME/YFA+cVJj1KEsSgayp0FYgMDWJ2cda8taixjg1eN+MkvwsidcFQ8DzhmDDj3ZT07SvvIImclDInmjwNZLvTN/8yr5+sd5dWzDjJEx/xk7q+H75LEs7e3RNgsMHfwZfr3Xk5B1kRjTIdt4cHjfqdlfwmcZInPuIndQXE/S/HqciYuBidvvLEs+3fghYhiXlxO74hVDU0YqjvEhgLPeCqdPSWV3s7r/b29BB/odQQ8B/Nz+FyG3G+lwAAAABJRU5ErkJggg==" },
    // Prayer on
    { id: 4, name: "lowPrayerBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPzSURBVDhPbZRLbBtlEMf/+/Jz19kktmySNNgtTRpEkdVDaZWiJiqqOEUgDi0SFy5IlRAtF05IpQiJI4mEVIkLD3EgKmqlIhUISgkioVCpZYG2VgqJ46Su4yR21rvrx2a9u3zfEudROof95Jn//L7xzuwweIy9dvxqUjdnz4pBK+0w5aHBM6cxc/ErsG7HlFEXFMnfP/blTyMLm/It2wV74+S0XNRunO/bI54TgzIYhoHq1/Dcm6fw28fjkM0IXNeFUVdxf8kYjUeOXvhk4pi6mb4Ne/3EhGy5t39MPfFUuj0cgS/QBr1aAfMMg9SJw8hO3gSfYRAISNhoVLBe1ZAt/KMIzKHhTydPekCWPmhFLVCb2AtJ2gMfJ8NpZxAd6EXEZb2zLjqen8apjuppHs2nHI4+emIDH/b2DLwUlbohhhIQWAmauQ7stbH/YB8EqYmw0IY1tYRGgYPoj4Hjg2AZDq4QTCwVlcDsgx++Z04/fykZ7bCyMXkvxLY4wpxE3kkJWjyLoy8PItbhp/d5tlo2cePKDCLFFMRgJ6q2DqNSxKo6j7WykOKejB8+H4v2HQmR23hWQKW+BiO+hMFXtkGyyKKx4SIc5NGR6sL93J8wSwCPAJo2D9NxUVjLgPX5hLTbZKFWy1i2F8A+XcExCmrfBu08qZ/GqW7VfeDlwWVAOdyB1NBnXNRG/FAYyePdOPDs/l0V7bSAj9mqsC1B/km3C0soY6W0hLqmJpmxccVNDKQ8Me0afdkyH/4faKephgO1WYWl89AYx/MtZ7Lg2Icd7xXu5bGh6XCDHCS/7N1MK6CVPGoURE2vuFjM5zE3cwe3rvyCvyZmwO1LvDAUZqJJPddAYa6Air6K9q7uxwJboBXS1V8npjE7OQ81U4NbY6HrxhRbr5mKY5PJ9ovgKiEs/lzEtS8uY3Xd9BJbgNZJ/TROdVRP8xymAcrh0vtGZh3OOMfzAliOIeMRhJbXsPAwg57+/q0Kqa2UG/jm80uo3N1AyN9OmmjBsmuokrn0scFXOTK5alfnQZlj/UdYloELG4IQgFYsQ7dURHt6ScdMaKqD6WvXUbi1Ah8f8nRN20S1Rr5TLT/67c33x72WRQLJC5XaomKQgbXsOmy7QdaND7k/5rGQX/S6lssvIfv7HPELZDuQkSA6qi9rOYXmU44Huzz9liqF4sN6rajUyUZomFWyfhwYBR055Z7X/pySQW3F8Pw0TnWqtqzIkcQwzd+CUfv6+jseUGtkRw2zCNP+b7L/vn2XnCDnHe839dN4rVkYpSCat4nYvRxbdurFD5J6rXTWsuppy2kMjbx9Blc/uki2SWBKEIKKFOocG//u3Uc2LfAvqIvt+unighIAAAAASUVORK5CYII=" },
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
            
            // console.log(bar);
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