import * as ImageReader from "./image-reader.js";
import { ImageDetect } from "@alt1/base";
import * as moment from 'moment';

let imageData = [
    { id: 1, name: "overloadBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAQCAMAAADQzfSkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA8UExURVqWGTBWDkBlCkp2DFmEDAAAAWRDB5ByNGheN2mTEqqLN46IWEhXW0BHTUxCN2RkXDM+NmNwbi8uMA8ODDmabGMAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB4SURBVChTnc7BEoMgDEVRUWIbKrXW//9X30uIZdVxvCvImTAMf0sjm/pskmAhOQvLc6iZAeiBnoKTazOSSikvmKqpG0mRgMwadiYLqvUdSDvXVrTUDw0YxpvKttG+ZorvdqayMycu0vzJ2+YUpr01+i1es5MC8zQciooLfHgKMhsAAAAASUVORK5CYII=" },
    { id: 2, name: "animateDeadBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAGCAYAAAAynOUQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACCSURBVChTY4yaJvmfgV6AXpaB7GGCsukCqGJZ54RFRIUOC5RGAbfO1P//85eZQcu8jhEqhAJqGif95+HjZ2BiZmJgYmRi+PH9B1QGP8BqWX/fHoaKqgCGx9d6wS6+e/8Tw4GLogxsbJwMTCwsQAsYGRiBGAz+/2eoKUvG6ihUwMAAAH5rIrjERxiMAAAAAElFTkSuQmCC" },
    { id: 3, name: "prayerRenewalBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAANCAMAAABvheXhAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABmUExURVqWGZzF44q63JLD5Ov4/+L0/o3D5d3y/oW63I610HOkxZvB3FmGqZO82prK6rXa9HeYtMnn+oa/4m6buJG10Ljc9PP7//3+/6fQ7Zi82YGfuWKXt5bJ6c3o+r3h+Hyy11N+mAAAAK721FgAAAAidFJOU////////////////////////////////////////////wAN0MNxAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAZklEQVQoU32MWQ6AIAwFQUBccd9X7n9JIxQDITgfzeubtOgXGcJzOILgO0JZDNF3jCcQ/Z8k/NPGuFRNF3BZXqjVQbtSVKTWhYVymeC0aTuoPl7X42Gc+Lys0BnU3bYf/LxuqAwSPW0bI1NZHQ5WAAAAAElFTkSuQmCC" },
    { id: 4, name: "antifireBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAANCAIAAADXOYKEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAN5SURBVDhPrdNJbxtlHAbwd5n3nd0z48SeeImzODRJrVSEEtI2KmI7UFUCVUVUqqpyKQcunLn1W3DgihCIA5dKlSjlguDCVjUkIXXbLLXdOInHHtvjmfFsL7WUfgOeD/CTnr/+D7z+ZQ78rxmJv3xxwFMwjEDPA2MaECBwAqIhcsEwK+P6FFQVRBCEAYxDBp463X8d++Gg+cwNMQsVETAAhiFQKGSMnbmdw0uX1d37ThQDPwQRA26ETSp/XJz+dPL0xZSZJbITBU3mtFngsJhHcEFKr6iZ1/WJNCEH4XAAYwJYzMChAwQK8m+pI3HrjoMwQBBIlKzp5q3CwptG4dDzn4idB+rh3cY+m/KHY/066f4U2Vvdo+dBfwJLF/TcKVm3w9AKfZEmCgWDEJTeUdGoOQZuCFhC3tbzn5cWZkTle6t6u/r3s2Jn7g3ajBw7gstF/tYKOXua29H8Tdr8ylr/zqpmqXAze+qsnOu5ZBgDDEd3HIlpCcQRWFb1m4U5iOHXre177k4k+/VWsPPIlgXSj7j1UIM8/9ksWC1nMoZ8RHo/27Wa7+SpeDU7syhkLAe5wUvRi8FCWrkxOcdx6Jtm9UHQMERcNmURs43tXtYQM6bAGwpO0DiJlyalIeCKaf1GZrFElX+8jkTItfx0VpCS5KWIAL1qzswr+p2j/Xvt5yrPISJf/2jsvWWe1+RCwdDGJs4pvSnOSkzR5gc8x94PZ1elzGZgfTvYvO/sL6aMK7liEnMn4nQKz0t6wxv8Zh9JMur7ZLmifbgc/rohn5ktzJvZ1Tn7fGqXm8SPFXVri1zulacjpWe425MHQdqrJq1dz15JZSRETsRFOlESlb+8phXbCgayRkplFfHOB2te/lUzBwcruIFEEhn6+mN4rqZwe8TVwpl39y5VRJ0rWJ7ze//AJNKl3GgsIzEvCsMkedjpvnhWksAsD5weH4fa+flj0qixxiBuR1Eeb7cA/BGl62K7bBeu1IuzDq8BDoLuEP7Z6QxZsqBoJ2JZ0ve9fsN3JYoEikMmHPbF3UD3rWDsSS+ruKFC9hp67YdxeU/lltzKJ9ZrpbYf44YvZUUwLqEERMf+wKTiiahSWg/dw6GvyjSXT11cQ5V51N7H9T9S+hQQc+zYTT29m7I3WFJ2XrlWWzJaScge9TIIi1oqEiQkUs/yB/jFHgH4D/6Ng7gJaXbcAAAAAElFTkSuQmCC" },
    { id: 5, name: "excaliburBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAANCAYAAABYWxXTAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACtSURBVDhPYzzDwPCfgV6AXpaB7GGCsqkKopOT/7v7+WF4giaWff70mWHnpk2MUC4CUDsYIxISsJoHtodalkWnJP8Pj4/HaRZV4+z3z18MKxcuxAw6ZEANn0XiCDpkQBWfRSUm/r926TKUhx9QZBnIoru3bzNcPHcWf/BBAdmWhQETAxAwfP3yBSpCBCAnziKTkv6HExFPyICsOItKTvr/798/hpfPn0NFiAUMDAAO2EmensYEVgAAAABJRU5ErkJggg==" },
    { id: 6, name: "ritualShardBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAANCAYAAABYWxXTAAABg0lEQVQ4T+2SS0sCURiG37k399EZJy85LSILRAtqE/Qr/Am1aNGyZXsFt7nxD7jqp7QJWkS0EDdGYaIUBIb2nQEnTIkxqFUfHOZyDt9z3vf9uCtggj8qjsH2Ae63eYzzDwtdrlROY+XL8zwuLy9mooltY6l0OHHdNNia6bDgw/NyGA6f0WrVl4cxkCQK8JI2trfKEEU5miVBEKJ3TTMwhoL+4BWj0RuazfP4MAZhnRRZgmNqMA0dmUweupGcG1xdN5DyMnh46hPsBY3G2dx0f2sjgymSCItAPMdBliQkSF02W5iBaaoO309j9D7Gfbsb7i0FYyCBQk7YOthzWhLBg/w6LHs1/OUkfFikWBSlMMubuw6YnfX6STxlU/v8pAWOFH2tIL8G1wuQywaQZSU6I9Klrm/bME0HtdpxPBhrzoAihe86xhxMVTXs7uyRnRvRHruUQOtHsGLxgCaQBsMii4RPG1XVxGahjJRrk10mKVNDoL6i4LE3QKfbg2FYqFaPFir7AH8oeF0tJ8aQAAAAAElFTkSuQmCC" },
    { id: 7, name: "weaponPoisonBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAANCAIAAADXOYKEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOpSURBVDhPrZPvT1tVGMef095b+uuWtrSU2wqsRWpbSnQd2wwZZiwZCyO+UJYt2RtdFk30BS9mYswWjCYasmTOvVBhM2ZZ/EF0b2BQJmJWkYIorJ1bUSch6oDaH9CW3t7b3tv7w3uz7T/w5OTJOTnf53O+5znnoJOfkPC/NoU499a/OA7FChQ5aDIjU40kSfBnBqwO1+GD+4/19FpbdsnSVKa4ufHgq9GvY7FYwM1TSRA1olYDVR4qVdDWgCRAxzskyMRmCzTWglkHBg04jNBqh10WaHJZxsfGK9Q6X0kLbPZh55g0Xdw6/dIxIw67Xchjg3YX+EmotwKhgydtCk0lb75ThjIHehxcMtegjFMUvHnm5c69LfnUClfaENm8xDNyrFAb5VLq4vlzHg+ZoSQTrhjEVeA0QZMVaE45tUIUJWCqyrzEgSACwwJpsxztOfx7fB7TGNWaWkWG1HJUYcb05lqZzh3v7ylUQK6VCgdWgkwJZJoWe0x0EPKCps7pFnUkXgMIgz3P+EGsSHzeQNThOhvLsaX8uizCsBqjXrOVzXZ3darUiOVUahyxOKk1uXO0huEfE/MM+ANtVy4P9/UeyVJI9mslm63OdofTOTT03tuDZ1cSf6g0ps+/HB0YeCW+fLuBbLLXW+T60CX5uqC7+4ic62lpY6sKUTGqw4EubEcmpro85rVgW/TnBKqWJL7w2huXYvEVCVRFSjhK0Zc/vXr33urUdGzkA63X18TzUoaRnvb59tkMS5PhbHqrCuiRR6cJ0dvrF4aHw7N3zrxwItTq/Wv9PivUzS3EKZpluTKo2caGBpPeyHJiMr39Y+wfi705W4QOv/fcqZO34ol3h0cKVLIql/ohMcdIGJJ8dn5m4YdrkelgsF0os3o9NjH+jdlM9Pf3HerqCoevn3719VCow/eUZ3DwbDIx2VhfP3Di+PVI9EZ0VmcQag1iwC49IiZ5xArAI8lmReHvowtL8ywHsamLB/YF1u4nPjz//r34Tx9/dkONid9Ojt5evFXMrAxduOoym76YnR5b/M7WgCx6yW5BSFA8qtv7COpOiWeBq4KJQJyACgwWDPbOz0Vzf0+IIK0m7j7YTLtbvd5mYie9+Nty5KORa0XBFzzw3M2ZGZejajUiTn5BAGUaXAcJhZhdKAk42tkB+ScYa8nQsz17d3tshzxjkdTqL8uhDr/P37Z/T0CNIP7r0qUr8zp35/OnXhSZMoYT+dyWCmitHrgKyLae6Cb+A6eYpzFFjVVwAAAAAElFTkSuQmCC" },
];

let imageBuffers = [];

export async function loadBuffImages() {
    imageBuffers = [];

    // Top left corner of Buff box
    for (let i = 0; i < imageData.length; i++) {
        let imgBuffer = await ImageDetect.imageDataFromBase64(imageData[i].imgData);

        imageBuffers.push({ id: imageData[i].id, name: imageData[i].name, imgBuffer: imgBuffer });
    }
};

export function getBuff(img, buffName) {
    try {
        // Get starting pixel for Buff image, to be used to grab the buff
        let foundBuff = imageBuffers.filter(b => b.name == buffName);
        let buffPosition;
        let numberType = buffName == "animateDeadBuff"? "animate" : "buff";

        for (let fb = 0; fb < foundBuff.length; fb++) {
            buffPosition = ImageReader.getPosition(img, foundBuff[0].imgBuffer, 0, 0, 27, 27);
 
             if (buffPosition != undefined) {
                 break;
             }
         }

        if (buffPosition != undefined) {
            let buffer = img.toData(buffPosition.x, buffPosition.y, buffPosition.w, buffPosition.h);

            // ImageReader.outputImage(buffer);
            let buff = ImageReader.readNumbers(buffer, numberType);
            
            if (buff == undefined || buff == "") {
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
        let expireTime = buffTime != undefined? moment.utc(new Date()).add(buffTime, 's') : undefined;
         
        let foundBuff = buffTimers.find(bt => bt.name === selectedBuffs[b]);
        
        if (!foundBuff) {
            // Buff timer doesn't exist, so add it.
            buffTimers.push({ name: selectedBuffs[b], expireTime: expireTime, buffTime: buffTime})
        } else if (foundBuff.expireTime != undefined) {
            // Buff time does exist

            if (expireTime != undefined) {
                if (
                    buffTime < 60 || // Time is less than a minute, most accurate
                    (foundBuff.buffTime - buffTime) == 60 || // Minute just changed, more accurate
                    (buffTime > 60 && foundBuff.buffTime < buffTime) || // New time is higher, buff could've been renewed
                    foundBuff.expireTime < moment.utc(new Date()) // Time has expired, but there's still a time being read
                ) {
                    // console.log(`${selectedBuffs[b]}: ${buffTime}`);

                    foundBuff.buffTime = buffTime;
                    foundBuff.expireTime = expireTime;
                }
            }
        } else {
            // No expire time set yet, so use the new time.
            foundBuff.expireTime = expireTime;
        }

        // console.log(`${selectedBuffs[b]}: ${buffTime}`);
    }

    // console.log(buffTimers);
};