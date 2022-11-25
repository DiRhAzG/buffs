import * as ImageReader from "./image-reader.js";
import { ImageDetect } from "@alt1/base";

let imageData = [
    { id: 1, name: "lowHealthBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAFoAAAAUCAYAAAAN+ioeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQKSURBVFhH7ZjfT1tVHMC/5572tkBWSjcazSi74I84y4AZkzm3LJlLjKiB4rOa4gNL9sbbEqOOGE18mj6Z8CD1HxBGVHQLWVyChgcVcagPSO+g2wysXYFRbnt/HL/n3NuuHW2Dr3I/yUnv+d7vPQ+fe/q95xwCNTh5ri++s353gG5v9mJXsaOgmk2B+YbWx6/8NDOdcGIue2CX6OOnz8Zyqb8v+01LoRIB2esBrySJe7plQUE3QLMAGGOq/8hTI7/OXp8UN13qUiH6xa6j490NubiPEkjlGKxmLfD6ZaCOaBNF61oBIkEJIo0EChaD38zGxOzPfw6JBJealESP9T87/k6HL46TuMRcmsHHCxlY27JFhw9YcPFYCE4eepiEruGLZD4xPPWHK7sOwlhi8Fjs7VZrQkQ2dfEjCHghj2XipetpaMHUibMhLCMYfySH8+W6NDg08btbRmogRFvD0STKK37wgG3oQJptgZzlOxpsdYagR8s5ETuHU8oLeFVpbLHD7rg8Ck28Go33BCDOpy6Xl922xMdO27HAr+MFxkOtPnjM0G252C/lYOM5xE8BfDTYFA7fura0Pu+M7VKG5DO0AV4KhGTDDuby9gXv83Y/rYtW7HPKc8QLwDHazPyACLrsQlLzJl8nPySriR8usl4TOLlFVM2oHMulhDSdzCm4cBAEPc7Ff6D4DB/jOzVXqvMulUj3DAqf3S1UfPwadwwwtvS6jee0EFPk82c/xTHSOJZLdUi0PZKkhYLywREKsZBPBLP3NNg0ivO8OgEPgeAhv7iezORh9JYJpiyriyurNVceb178qP6g/2NId7R7wr+RjvHt9aUIgddRNklvw31Ga8rmkvlsZgeb4GuUfGmViW261nxwcmFxYdBJ20X0hdMsu/aP09tfkBNnzsXNlaVxyTDAIij7MEBfi7+m7HLJ32Y0GL2D9YdJYHk8QNufHJq7MeMeNlVBbFhOdHYkZdNU+FlGnhnwIcp+heEiGSmXXZTMmSYSvH8bl88EBeNsLlCqzi0n3Q1LDcQhhtT5zAg/s5BQmIzi3l214CqK5HCxXHC55O/x3iiWCy6ZPyOexTHETZeqiGVCannpr/auHkV+sNnL5y5FkTO4E1GCEjzBGDQQu3Gu4b338EV4qH2qx8MsoiR+/GHmE5HgUpWyszqAU6fOjMNKMk4kAhrWbIJlZCxMoUe2Z/J8gcL5NdyqEwp+rMmMT+X2jsTs7I09ndw9ffx5tr2RdXr7iwrRnL7+N2KZm79cJnld4Xo9HhM+b5PFhuRCqgAGrpX534D5vGqo67mR6amv9nxi1/fWsP232IfsEl3k5df641u3UwM7mbXeZstUeOYGoWpDKDx/4HDblavfTLmriz0D8C9CWtsBi6eacwAAAABJRU5ErkJggg==" },
    // Poisoned
    { id: 2, name: "lowHealthBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAFoAAAAUCAYAAAAN+ioeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQKSURBVFhH7ZjfT1tVHMC/5572tkBWSjcazSi74I84y4AZkzm3LJlLjKiB4rOa4gNL9sbbEqOOGE18mj6Z8CD1HxBGVHQLWVyChgcVcagPSO+g2wysXYFRbnt/HL/n3NuuHW2Dr3I/yUnv+d7vPQ+fe/q95xwCNTh5ri++s353gG5v9mJXsaOgmk2B+YbWx6/8NDOdcGIue2CX6OOnz8Zyqb8v+01LoRIB2esBrySJe7plQUE3QLMAGGOq/8hTI7/OXp8UN13qUiH6xa6j490NubiPEkjlGKxmLfD6ZaCOaBNF61oBIkEJIo0EChaD38zGxOzPfw6JBJealESP9T87/k6HL46TuMRcmsHHCxlY27JFhw9YcPFYCE4eepiEruGLZD4xPPWHK7sOwlhi8Fjs7VZrQkQ2dfEjCHghj2XipetpaMHUibMhLCMYfySH8+W6NDg08btbRmogRFvD0STKK37wgG3oQJptgZzlOxpsdYagR8s5ETuHU8oLeFVpbLHD7rg8Ck28Go33BCDOpy6Xl922xMdO27HAr+MFxkOtPnjM0G252C/lYOM5xE8BfDTYFA7fura0Pu+M7VKG5DO0AV4KhGTDDuby9gXv83Y/rYtW7HPKc8QLwDHazPyACLrsQlLzJl8nPySriR8usl4TOLlFVM2oHMulhDSdzCm4cBAEPc7Ff6D4DB/jOzVXqvMulUj3DAqf3S1UfPwadwwwtvS6jee0EFPk82c/xTHSOJZLdUi0PZKkhYLywREKsZBPBLP3NNg0ivO8OgEPgeAhv7iezORh9JYJpiyriyurNVceb178qP6g/2NId7R7wr+RjvHt9aUIgddRNklvw31Ga8rmkvlsZgeb4GuUfGmViW261nxwcmFxYdBJ20X0hdMsu/aP09tfkBNnzsXNlaVxyTDAIij7MEBfi7+m7HLJ32Y0GL2D9YdJYHk8QNufHJq7MeMeNlVBbFhOdHYkZdNU+FlGnhnwIcp+heEiGSmXXZTMmSYSvH8bl88EBeNsLlCqzi0n3Q1LDcQhhtT5zAg/s5BQmIzi3l214CqK5HCxXHC55O/x3iiWCy6ZPyOexTHETZeqiGVCannpr/auHkV+sNnL5y5FkTO4E1GCEjzBGDQQu3Gu4b338EV4qH2qx8MsoiR+/GHmE5HgUpWyszqAU6fOjMNKMk4kAhrWbIJlZCxMoUe2Z/J8gcL5NdyqEwp+rMmMT+X2jsTs7I09ndw9ffx5tr2RdXr7iwrRnL7+N2KZm79cJnld4Xo9HhM+b5PFhuRCqgAGrpX534D5vGqo67mR6amv9nxi1/fWsP232IfsEl3k5df641u3UwM7mbXeZstUeOYGoWpDKDx/4HDblavfTLmriz0D8C9CWtsBi6eacwAAAABJRU5ErkJggg==" },
    // Prayer off
    { id: 3, name: "lowPrayerBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAFoAAAATCAYAAAAQ/xqmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAASTSURBVFhH7ZlrbJNVGMf/77Vdu7Vvu2sHGwVl06yMAhM6AriBRIl4CxMRmDEuGX7bNDFq0JBFyTQmsn3SkPhBBwqIIUENQYkjIg6IQmFDwpDuAhttYaMb69b76zmHbg7sZN/3/pL27JzzPM+Hf/455zkdhxSs21htv+0drIvdgTMWjVVseXc79jbuhCiJx2Ur3OZMa/ORAy3dyXCNaSAkR8Zzr25TzBm5jQm/bp+cMLn0osluLbBh1aZN6HK3Qwjp7Hw4zRUeiNXnPVyglFWuOX35/B+hZLrG/zAh9PqtNYq340arUc1+3qA3I002sXXH4+XIf6QY0TujuOXxwqAzQRAkcBHJNej1PrV4zcr9nRfOaWI/AJ5+UZF9f/lajWKW06C3wKBXwPMSTPmZmLe4FCaVZ2N6noWt030aR+NpHs1n1TSmhDlaMdsa7zrZAr1shCjIiCOMouUL4VzyGCRTDBk6C0aCw7jV0weJ10HgRXAcSY8JeUNBr76v98pRVlEjJcLaDZvtuKnfp5fTiUvNgMohFBlBjsNGLsWXkJOph56XYUwTkTVrLnquX0agf4AILUMUJSQSUaghzlW8fMGXnkvtgWRdjfsQsrIKdujIxSdL6WSqIpoYRV7pLFTVbGMiU5R0noivwmgQYX/Uid5+IvaNm1BVusshTsQeCQ9Ac/XU8IkRzqkSxcbCw+AVHo61y7DhtVpkW3UsgIo8eaTrdJ/G0fhoZJQIroLWYQEaKeGcjifV3Dnz4FhWjocWO2GfbUeO9V8n309gJMFG/2AI3de7cfWsGx2n2+Dr8cDdcTRlX65BhP7k6xNqoaOUTWh3IWXEoIjGlCKPQ8UOxIKk5RMxzN0VvrfjAt7avFITegq4hQtWq7Y5xShZetfRc4mjs6fh6JvE0V1JR1880wZv91Xi6J+mFHrrOzvZiT4T2fPRdo4rW/R0q6waKuilZp6VixLXUqxe/yy5CNNY0GSxJ46NgTH88sNhXDx1BkN9PrKiIoTA8bPunytZQApKXCvUgN+bnM0s+jx/c9ySFU/s0gUt9ZJoIEvEdLyKgkVF2PJ63T3OnuzkvZ8349q5TiBBDcwhGhtF2Hi76c/fjr3BgjT+A29SzM2R6BjrhzmOJzqL8Jxqx57PdjHnUiY7ma7TfRpH42kezad1WJBGSoTuzksBW1Ghoo4JLp7jwPEC+fAY7OtHhIsjr3A+olIYw4EEjh0+hI7Wk+Shoicik/45HiEih5AwB5t+P/bj/mRNjRSwAzgn39YQE0bcVDQqnpqIQ40DHW0n4bnmYd1FFxnPnzzB1un+uMg0L78gv4FV05iSiS5h3cZqxX/F18pFZacspbFHSDgSxKoXq1C+oQpt3x3Er98ehE42MjfT40KVIu6c+bmVRw60PPDpXbSoTA0OzcwXOrsMk38znnn5FWXAP7Aj4uPq6TyeiMFamI/ajz/F7rffxGBvP/sxiSLnqk2ZOZkN33/z1bTUW1ddO2PbuyMtu+8VepwXqmvsQ75bdQH/qDMaDldUv/cBWj58H5JOd9w82+RWLErzoZYvtP+wTBvgH7U52Md6auvBAAAAAElFTkSuQmCC" },
    // Prayer on
    { id: 4, name: "lowPrayerBar", imgData: "iVBORw0KGgoAAAANSUhEUgAAAFkAAAATCAYAAAD7yKGlAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAQjSURBVFhH7ZhfaFtVHMe/59zc3iS9SdrYpO2yhSVudV2ptNOwuhUHe4i6ocMJqw8T34SCMEoVZA+KgkPYtAjCXtUn0wfBSevYxkCpbFLBP3UUFdq0Xbus7ZKbNGlumuQe7zlLZ2dSrc+9n4fcnHO+v9/D9/7yO+eEYBNO9JwPqY5ixCDJ2OH+l/H9xS9Ambcvm5fHv7r55nRFZrEFqkzm5rbtUqdURwMIIdCUDA6+3ocfPomhoeAGYwzZvIY/5rJhy+ytIVWegtNHPxjcF3x0xOduhUttRalMoXY0ojEcQHFlFUqqHm61BU7ZCY/qPBP0Hcj+On3tRiXcYhMemMwNDrXuueBRg3C7fJCIAzlnBv6DQfhUN8p2itScBg9pgWJ3mxEOOBQpahn93wiTeYsI7mwfaXIFoDpbIFMXMoUUEC5jb2cbZFcJ9bIHy9o96HckqIr5EmwOUCKByY6oXz3w+e+3r2oio0UVlH/sag5Muev8IKZ5gBPJrAatKYHHj3TD16igwVYPn1cxx13INd8R61zH9TyOx/M8FrWhxyPnQzalBYQ2wCgSLK4sIOWbxlMnDwtjOQ2qeBdizOf5OtdxPY/j8TyPEFlUQevq5AgrUWi5JBLlOOj+NHpfMg02K5izbvADo815vs51S+y2iAMj4HmEwKIKyiQ9tuKcgSei47EXd+CJo11VFbzOxormuj0n/CIuY58FzyMWLaogH8d+Zi3t93/pbkbFJsd78D8N3oiWNaCVcuaxzoYMMcRcYnIaZ/q6Nr3cbGfIsUNnmT+8G8HOIAKd5jMQqGoVG+EGc5ZSBczOz2N+Io7ZiVksxeMYGTu3qcmn33qfVb5uO8izkXdPNTftjvHjmPQIwY5OL3qivfDXaBnrBi8mC7h5ZQwLE0mU7zEYrIy7y/G+y+PvDAtBDTp6epm2mKiMthfkSMfZUDCwb0qtd8MoMxRYGupeguOvnnyoojdW8MhnXyL7J4NCPKASQbZwF7MzM+Fvb52zrtk1oNyYfCmBQikDRtegSC6kftNx6dNhs2J1Ifq7gu/P83Wu43oel9fTsAzeHNELtEwinM2lsFY0N7NyDna7itRkBmPfXMeS2Rr4JscNHhu9bs6vwCbLQsf1PI7Hi2wWNRHX6qmFG9rO5o4sITRKJXOKGTAMhnR6Ge6QeauzN2Jmfg6/XB4HLSiwURtKxhpW9RRSmfk3rv340ajIZlGTh04Dz/QMDrqczRds1A7JZvbafBLt0f3ofj6Kn76+iskrt6A6vCiXmGmyziuYG/xhJfxfaet+kuXS2/PvjaojV/RQf6hO8k7Z7XUoFghsPgOn3h7A8HtDKC2Z52iFQdfXYJDV8Oh3Q1vuw8+98tr2PcJVnlUce3ogVCzmI0VDj70w0I9LQxchU3ufLDvG/4+5FsBfp5WsPuCZsY4AAAAASUVORK5CYII=" },
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