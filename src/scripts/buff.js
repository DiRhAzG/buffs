import * as ImageReader from "./image-reader.js";
import { ImageDetect } from "@alt1/base";
import * as moment from 'moment';

let imageData = [
    // Overload
    { id: 1, name: "overloadBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA/UExURVqWGTBWDkBlCkp2DFmEDAAAAWRDB5ByNGheN2mTEqqLN46IWEhXW0BHTUxCN2RkXDM+NmNwbi8uMA8ODAAAAGxC8qMAAAAVdFJOU///////////////////////////ACvZfeoAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACASURBVChT5c7BEoIwDEXRoo0QoCro/3+r7yUNdgPjuOWu2pxJp+mw7sKubTbpYCE5C8u3UDMDUI8Gwcm1GkllHCeYqqkbSZGAzCo2JjMq5R5I29YeaC5PGjCMN5Vloa1miu82pvJiTlyk+ZN/m1OYtlbpu/ibbRRo9t7r5LZXSh8ujx8ERRrlEwAAAABJRU5ErkJggg==" },
    // Elder Overload
    { id: 2, name: "overloadBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAABPklEQVRIS2OMmib5n4FOgBFk2bKs54zE2ueal/5/96SZRKuHmQuyh2TLpjea/Z+17QPD+ZO3SLKQLMucE0P/nz5+l+HTjXO0t0wmMOX/p+vnaG+ZesmE/1/vXmZgYGRleLJuBm19JhuU/v/nm2cMzNx8DMxcPAxP1hKfUEiOM0mf+P/PtywE+0gmIOn/kw3ziPYdSZYppVT///X6GcOTjfPBFkj6xAEtXkQby8C+8Yn9z8jJxcDMwcXwct9Ghu9P79HOMuXUuv8MTAwMbw5vZfh47SzRFoEcSlIwgjTIRxf+//v9M8PnW5cZPl45STvLZCNy/v96/5bh3YldDGKOAQxPN8ylnWXSgUn/f758DsrMDJIekQwPl02gnWXEFtS41JEcZ5RYOGoZJaEH1zsajKPBiDcERkACoUoKIMIQACK+AQN7f9x/AAAAAElFTkSuQmCC" },
    // Supreme Overload
    // { id: 3, name: "overloadBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE3SURBVEhLY4yaJvmfgV6AVMuyp3eS5TiQPUxQNtEgS/EMg7uvGVkWkmxZz2UVhnNveKE80gBJlll3TP5/8qUQkEWyG8GANF2yCkCCkUHI1hfCJxGQZNm783cYvj59yPDv03sG7fKJJMcbSZb9+fGD4cX6uQy3Z9Qz/v39GypKPCDaMqPeef+ZWJgYWPj4wfx/f34zCImKk+Q7oi07V5zE+P/vbwaZlDIGnZbZ/5/vXMXw7vVLRqg0UYCkYORS1WPgllJmeLljLcPnm+dJsggESLLs98f3DF8f3mFgYGaFipAGiLZMq3ba/++P7zM8WNjLIGBsDxUlDRBlmV7Xyv9/v39n+P3uJQMTCwsDm4Agg0pmM2lJH6SaXqV+1FQyCmJKwKhlVAGjllEFjFpGFUBXy+jYImZgAAD+P2BYz1a/0wAAAABJRU5ErkJggg==" },
    { id: 4, name: "animateDeadBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACiSURBVEhLY4yaJvmfgV6AXpaB7GGCsukCqGJZ54RFRIUOC5RGAbfO1P//85eZQcu8jhEqhAJqGif95+HjZ2BiZmJgYmRi+PH9B1QGP8BqWX/fHoaKqgCGx9d6wS6+e/8Tw4GLogxsbJwMTCwsQAsYGRiBGAz+/2eoKUvG6igMMJpAqAFGLaMKGLWMKmDUMqqAUcuoAkYtowoYvpbRsUXMwAAAAD8o94sPe5QAAAAASUVORK5CYII=" },
    { id: 5, name: "prayerRenewalBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABmUExURVqWGZzF44q63JLD5Ov4/+L0/o3D5d3y/oW63I610HOkxZvB3FmGqZO82prK6rXa9HeYtMnn+oa/4m6buJG10Ljc9PP7//3+/6fQ7Zi82YGfuWKXt5bJ6c3o+r3h+Hyy11N+mAAAAK721FgAAAAidFJOU////////////////////////////////////////////wAN0MNxAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAcklEQVQoU+2OSQ6AIBAEQUTc9333/580wkA0gBev1oE0XZnJoFcOG5rDDgTdEZd6EHVHmQ9R30nsO+9IF/D3Cbgwivn3gXBJmpFcFDe4C1PmFmUFleJyNW7ajvXDCJ2Ez03zwtZth0oBtxj5nZkPzgZCJ+c1TTik3u3qAAAAAElFTkSuQmCC" },
    { id: 6, name: "antifireBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQVSURBVEhL7ZbJbxt1GIaf2T322B4nsR3bWZo4bRKiVIRSugESlANVEagqUqWqKpdeuHDm1v4VHLgiBOLApVIFBSSEyoWtamlDmm5JE7fZHE+8jMfbDL84ov0HqhxQ39PMaOZ75vvm/V6NdPazTMAuqQv75dMnGDo02lCuQ28cQhJUmxpxWeNoIs1Un82wFMUS57Ik0ZQ6tMRr3q9u8U/V4UZthUduCyVoYZmw3UGjBZYuEQQB+y9mdmA/C9i2tmGNjjhQFPaKJ97LDPB6PEevpONJAWtejRJ1fEkWQJkeRaNfsdACibWOx7XNx3xXLOBILqGggyfqbbqQisKrlzIo0yejl2YvV5EVRAEI6xrH7DQXchO8mcixWve4Z5a4Hl3lSmGRYNij0VthWdvih7bD7NYaj5sVAQ1z1M6wL2LjtFoUWx6m7ovOoCY6HHo7irzdkSRAYgIEvsZbdpZPhiYYMS2+Kc5zcf4vHg2UGHtNZ6VdxWlLzAwYXDioceAllQdxj9v6Cp8Xb/K1uD+lhzif2seBSIayq3UnpYgmttWF9YShI1qeidqcz40JuMQXG3NcdR/QjngsbzR5cMchEtKotFVutuJIhsHHo3AonySZiLCmlfnJWWLJq5LVTU6nRpgMJSlWZdxml7UDqwv6RI/FucExVFXmy5V5rjcLJEyFfDqCqQTcmiuTSpgk0yGMhIXiy/RpHaYHwzRQGeixOZecZEi3+LteIqxpnMnuIRUK4/td1g5MRud0eoRxy+by2iJXxYeOGiqyFuHsh728M2NgxCPkcgnivf0ctsoMq0X8tIlj1DDUgHdboxwKJ7ndLPJV7TY/VheZjCU4JUzmd9RnsD0xhfGwTaFe41dnjXBEpuJpzEzF+WCmxbVbEfaP5hhPpzg05nAk9hB1UOGuFWV2VuNkOc+etkU54TI3+IRmT515f4OHdYeDsSRhsS5PYZN6P0PCEH/WVyh2HCxhmEhcYygvHGRUef9YnezLaTJSjYNKAdnUaCdsbt6VOLxkoS5ouPEWI8cXODFlYqs5ivUqv1WekNbCnMhknsGyZoiGGOyN0lZ3GzVfImWIpS4bdIQZjoyvoxWWCAo1Optt2lmFuQ3h4u/Fri2bbOYdcqeWGRitinGDKty31ZD4o1SiEfhMWOLif7C8GOFivULBc8WeyYR0RaRDiNWKycOmjVds0ntPGMRyaVkaCwWbpW/7iCxEUaddpj4q8srQJl5HETXCpESC9IVlfNqsiyBIC3c+hUV1neWWy2rDIxrRyWRjvHFMZmpcZnNRYfn3GPYwmCJG190Y96/EcG4F+Pkqe88sMZ3YwBfZdaecFOFgEo+1CQmYqdcpCpgw8452K4i3Od3OdksvYM9FL2DPRS9gz0X/X9gu/hHDv+Dyi7aPCGimAAAAAElFTkSuQmCC" },
    { id: 7, name: "excaliburBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA5UExURcwAAFtjY0dOTk5VVlhgYFtkY1dfX1ZdXVlgYFphYS8yMzc8PFZfXywwMFliYldgYFpjYkBHRwAAAFzDBgAAAAATdFJOU////////////////////////wCyfdwIAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAWUlEQVQoU+3OOw6AMAwD0ED5tPwKvf9hIWAJoTgsrHhwLL0l8prixbGqPsqxoMWtOZtZ212XWY9LLOISSwOGtTRiWJvijGVsyRiap615w9LYX+78xvPBvIjsZtorRM0c3R8AAAAASUVORK5CYII=" },
    { id: 8, name: "ritualShardBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGISURBVEhL7ZZNTsJAGIbfdkp/aLGApUaN7vzZYGLi0gVnIN7CI3gMV9yBY7h0xymMpFr8QWhpnZlOkyIVuqhdGJ7ky3wdoE/m/doE6RGIURVVyZhHFn0lVCrjM7uiq7heS79/WyhyWZYxHN4v3bNwjN3uddzr3cSSJEHOlpwtmZfrHkFVDfHLZTaejIlqCoHTtnF+dgFFUcUnACFEdEC9biGChhf/A0HwhcHgrvjJmISVptbQti2Yho4wmHJBWimmacHt7NMuuf9PUcraGLWagh0riWQ2m8OfjHmfpW6Y6Dh7CMKQnupd7OaTK2MnIjT/BhWx2TDmQQDPe8XEf+LXjGbLheO4dFYEOk2AweL8jRUZE7F1t2mBCbMEQUhrxvvDg2O0bJvOMJGk3yVE4WseK7LR6IEfxaODzuN57EHXCDRNB3s6Gem6idwYo2iBOI4RLiKxk2AYDZycXtKoGpjPp2KXRqep8N8+eZxrxeyRFO2fUvilLoutrBS2slLYykrh/8oq/EcMfANNjWUzO8yjwAAAAABJRU5ErkJggg==" },
    { id: 9, name: "weaponPoisonBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARDSURBVEhL7Zbbb1RVFMZ/p3Ohnc5MZ4bpZTrS0kHq9Bal3AyhhpJQAsQHhUDCixKiiT7wgIkxEgwmGkKCyINawBhCvBDlBShFEUNF2ooCMwitioSoFGqnU3qZa6edme06B8NfQPpg+JKdnb3POd+3vrXW3jna5o98ihmCIXbhjX+wWCA2KWMKqlwazlkKJWH8MQyecj+rVixlQ9saPPPmGh8ODce4e+c2Xxz9klAoRH1Nlvgg5K15Cq0wnYXJaSicBSoHi3b5QBerdqPmlKBcRahiK6rcjppfipor+1V+tzpx/ISajA+o7GRE5TLRB2MqFVHJ2Ija+sIGZbegFvg1FfCimvyoOh+qzINyCOfjsqfrFOhRTqQhLY5s4s5fAq7i++uhOLy+/UWWLZ7H2FA/U4k75DNjqGzKmCfjd0gnhti3ZweBgI/huMIpHLorizBXOiVLHkgKlw5DLC/pSollfTMhI5eXdQZ8Xjdr21bxW7gHs9WOySqR6J9oJmMuMNuJ3L1FOjnKxvVtjEsZ9HIUyMgI53ACdJ1Cs67yn1i5Q3/ByuzKGvJFPiySZ01eWPhUnUQyKU7GKHbMxlLkJTOVITE2YDCazbOw26yMRKO0tiyjwKTJ8wJMFpktPgqdNYwmraTEqQ5DbCwFdfUNHDrYzro1q4nGNcOpx1eNp7KJ8spKdu9+h7d2vkl/3+8UWJ18+vlRtm17ifDlK1T4qigtcxvpT4qbIWmq1tbVBl9gXgMZ4dJhGCwS28nxe3R1nKYl4OJWYwPdP/WhTSfE1TivvLafULgfJbHF4jnWxpMc/Pgw167f5PSZEAfeK6Q2WEU2qxhOKZ4MBlniLebSqU6ikRGm0Qwxw1mlUyN5b4C97e10nr/K9uc20Ty/lj8HbpDJzeZCb5h4MiMpkk4yZZhTUYHTZpd1nsHIPX4I/Y27tJpoTFq8rpYdWzZzLtzH2+0HGJfzMK2XWGCIjUo0Zk0RLM1ytvd7jnSdobGxiVw6g81mpuPEV7hcDtavX8fKlhY6O4+x9eVXaW5eRPCJADslvYN9p5hTVsa2TRs51tXNye7zFBXnKCnOU196/94wxAazUlA5eFkR9Ho0Or/rpvdSj0QOodP7WL6knls3+nh/z7tcD//Ih5+cxGTO882po1y5eI7YcD+79x7G73Ly2fkzHL/4Ld4KDbdNUerW0IRbh6lpnWNX/GqCrLT6lBTS6dCYymmMp8zibg09F7oZ/auDvFTsZt81bt+NUCMprq12MBG5yK+Xu/jgwBFiuSCNy5/h67Nn8ZdP47ELj97/gnRSzu8Kx32xaG+CnLTrxATITYC9xEfz020sXhDAuzLA8a4hbv58meZFdQTrGli6sB7pcsK/XGL/oR6Kapbx7JbnyafSmC0OxkZHJGVJCm1iQM6ebuSxVjlfM3URP7iuZgqPxB4KHok9FDwSeyj4/4rN4B8x/AtJ7MtF/0yh6AAAAABJRU5ErkJggg==" },
    { id: 10, name: "aggressionBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFxSURBVEhL7ZY9S8NAGMf/d0kUWmldHBx8w1nUxcUPYBHE3cnZLyCiq34EP4LfwsnBd6wuQkEHhbboUIXW5JJ78ZIe4iK5k9Cpv/CQu+dJ+PFcwiVk63hSYUBkspOdFjHzPzncXVERE+j2Elw8RDi/bOTe85vUQ804l9mpCuZnqpibrmB1uWSybljLlFLgQoBzASGkybphLUsFnKdCIBITJuuGlWz/4Eg9dWposw28szXIYMFU3LCSUUr7y8g5kiQGY8xU3LCTEQrf9+F5HgglekkTU3HDSqb0QamXdZie0/l/sJJl3UiuQ0Dq0Jl+wRErmdCv/E9ImXVYq206t2cnizlkwhGHTI9jBP4IxsplU7XHSjaeeCgzglKkUFEBqmQU1cB9F8mV7S1tq7DehHz5RHj1ivimieSuDfLYMVfYkyv7qrfwcfaMzmkDXS3rXb8ivNXC+zesY9HtuQ3qE+O06xfBUFYIQ1khDGWFMMA/YuAbp42cxpumWUMAAAAASUVORK5CYII=" },
    { id: 11, name: "kalgerBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAACVklEQVRIS+2UzWsTURTFz5uZtAhuEhURslCstY2lae1CV0IWCiL2DxDBVTduBAVbimjRLuo/0L1aahcupCKCChFdKC78hupOS2itBIc2psl8vdt7E6q1TTKJFTfmhZBh3pvzu+fcO1GnxncR/tFSAps8O6/W8i7s3U8R04SCAY0ASgOeTyC+0HwNvhdoglYKFp+TZRgKOcdBNl/EXfvrb3qyL5yKsIttCdrS0gJ+HmKbSPMXUCwuv5oC+D6DeddQUhCDeWPZc/Etl8ed7w3Azu3eR1tbWxGxTK5YKmdXLKZYWErWbM/3gxKES2CXDOeCip6HLMOmGoGJ7fN7OthdBBKnYRolGHF0qysIOEr+iFNxV/S9EiznuLi5kKk/xlXB4c4kWeKuVH95EUeoPYmQO8dAwZuGnACWikVMzM/C9tz6YQO9h2hH4QeMaAyjz5+py4kkGdyvMkxiLDsa/fT+p+hwexfltIeJ2c+wXad+WKU3YeRADwmPW8PDwN3iSK+tgy3yNE7OfWnMWUVYdx9ZsSguPXmsriT7iFwXV2d+ORtsT9BSvoCphQxs39uks9RRGkk/2iCytrBUdDul7WzFM1Xfs0rOwu4NneynsXvTVYupGzaUOk5j6QfqNOLEU45beuNoSzGHOzrpxceZP3M2eCRF15+mSw+fseJ0w8+ogW1xchb57ysC3C6Uof3dvTT97nXNiEOdnejqofsf3tQUEdix5EF6+PbV5mAi1LYzTrFljZe5uVBorb6GOgsbikb2m7BG0qp6thljM8aaCfwHA/JXJqAOkRWFVZ0DkME3MwAAAABJRU5ErkJggg==" },
    { id: 12, name: "grimBuff", imgData: "iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHkSURBVEhL7ZbLbtNAFIY/2yRp0jiXmiQtJRKVKIh20QVCsOKyhEfgEXggXgAJeAOeAAmqCiHERTTqgiZNS66mjp3ElzETFHVDnAWKvED5pJHGi3M+zz9HlpWnzzdC4iIu2cSjTvexsJQthFhlf0b/5bNTZfp8wZ3dSmhsXuHw2EXYJuvFBIWEirqSZHerROqShmmNOG1bNLsWqWQSM2Hwcf/9X70mzJ1GESo0bZ2cYaBk17AVHXvs4/iCg7pHR4pUWV0urCIIaZuWjGmm54JI2Y8Tk4Rnk87qDJ0BpYxKsPeQz/0S337CQSNg5AZo8rSZdIrAG9M7OZ5WzyZSVsnKBp0G1vd9DM3lqCd49/YTxUf38a/donbUot4wsewR8rBsGHmMjNzMIVKmyow0GVAuf5lcpQo7dynfe0KnepNUQWfvRpFQCDo9B88TDKTUdb1p9WwiZZl0kp3tq+RXNTkcgrVNnVari/bqBXathi2b255H65eDFvq4foDp/KNsJZHirC/fduzRb7a5nunyoHDG423YKmsE4SSyENsZcj5wcIOAQK55RMpcX06kosj5Egh5KYev3zD88oF2o8567yv+eRdFVUjKDp7vM3Rl5NXb0+oIll/9RbCULYSlbCH8v7IY/4jhN5pezedm7gv3AAAAAElFTkSuQmCC" },
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
            buffPosition = ImageReader.getPosition(img, foundBuff[fb].imgBuffer, 0, 0, 27, 27);
 
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
                buffTime < 60 || // Time is less than a minute, most accurate
                (foundBuff.buffTime - buffTime) == 60 || // Minute just changed, more accurate
                (buffTime > 60 && foundBuff.buffTime < buffTime && buffTime != 720) || // New time is higher, buff could've been renewed
                foundBuff.expireTime < moment.utc(new Date()) || // Time has expired, but there's still a buff on screen
                foundBuff.buffTime == 720 || // Fuzzy logic for Animate Dead. Overwrite it if an actual value is found
                selectedBuff == "grimBuff" // Want to just keep tracking if grim is on or not
            ) {
                // console.log(`${selectedBuff}: ${buffTime}`);

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