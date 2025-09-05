import * as ImageReader from "./image-reader.js";
import { getNexusImages } from "./image-data.js";
import { ImageDetect } from "@alt1/base";

let imageBuffers = [];

const abilities = [
  { id: 1, name: "Lesser Bone Shield", runes: { spiritRune: 5, boneRune: 5, fleshRune: 0, miasmaRune: 0 } },
  { id: 2, name: "Greater Bone Shield", runes: { spiritRune: 10, boneRune: 10, fleshRune: 5, miasmaRune: 0 } },
  { id: 2, name: "Threads of Fate", runes: { spiritRune: 5, boneRune: 2, fleshRune: 1, miasmaRune: 0 } },
  { id: 3, name: "Invoke Death", runes: { spiritRune: 5, boneRune: 2, fleshRune: 2, miasmaRune: 1 } },
  { id: 4, name: "Invoke Lord of Bones", runes: { spiritRune: 8, boneRune: 6, fleshRune: 2, miasmaRune: 1 } },
  { id: 5, name: "Split Soul", runes: { spiritRune: 10, boneRune: 5, fleshRune: 2, miasmaRune: 1 } },
  { id: 6, name: "Life Transfer", runes: { spiritRune: 10, boneRune: 5, fleshRune: 2, miasmaRune: 1 } },
  { id: 7, name: "Darkness", runes: { spiritRune: 40, boneRune: 20, fleshRune: 10, miasmaRune: 5 } },
];

const runes = {
    ectoplasm: { name: "ectoplasm", friendlyName: "Ectoplasm", color: "#108AC7", fontColor: "#FFFFFF" },    // Chartreuse green bg, black text
    spiritRune: { name: "spirit_rune", friendlyName: "Spirit Rune", color: "#10A9AE", fontColor: "#FFFFFF" }, // Soft sky blue bg, black text
    boneRune: { name: "bone_rune", friendlyName: "Bone Rune", color: "#BAAEA0", fontColor: "#000000" },       // Tan bg, black text
    fleshRune: { name: "flesh_rune", friendlyName: "Flesh Rune", color: "#A82B41", fontColor: "#FFFFFF" },   // Light coral bg, black text
    miasmaRune: { name: "miasma_rune", friendlyName: "Miasma Rune", color: "#7DBA10", fontColor: "#000000" }, // Purple bg, white text
}

export async function loadNexusImages() {
    let nexusImages = getNexusImages();

    imageBuffers = [];

    for (let i = 0; i < nexusImages.length; i++) {
        let imgBuffer = await ImageDetect.imageDataFromBase64(nexusImages[i].imgData);

        imageBuffers.push({ id: nexusImages[i].id, name: nexusImages[i].name, imgBuffer: imgBuffer });
    }
};

export function checkNexus(img) {
    let runeCounts = [];
    let abilityCasts = [];
    
    try {

        for (let ib = 0; ib < imageBuffers.length; ib++) {
            let rune = imageBuffers[ib];
            let position = ImageReader.getPosition(img, rune.imgBuffer, -8, -10, 38, 10);

            if (position != undefined) {
                let buffer = img.toData(position.x, position.y, position.w, position.h);

                // ImageReader.outputImage(buffer);
                // Check for white numbers then yellow. Probably better to just check first pixel and determine it that way, but this is easier.
                let count = ImageReader.readNumbers(buffer, "WhiteNexus");
                
                if (count == undefined || count == "") {
                    count = ImageReader.readNumbers(buffer, "YellowNexus");
                }

                runeCounts.push({
                    name: rune.name,
                    count: Number(count) || 0
                });
            }
        }
        
        for (const ability of abilities) {
            let allCasts = [];
            for (const [rune, cost] of Object.entries(ability.runes)) {
                let casts = undefined;
                let runeCount = runeCounts.filter(r => r.name === rune);

                if (runeCount[0]) {
                    if (cost > 0) {
                        casts = runeCount[0].count / cost; // Rune found and cost > 0, so divide
                    } else {
                        casts = undefined;
                    }
                }

                allCasts.push({ name: rune, casts: casts });
            }
            
            const validRunes = allCasts.filter(r => typeof r.casts === 'number');

            const minRune = validRunes.reduce((min, curr) =>
                curr.casts < min.casts ? curr : min, validRunes[0]);

            abilityCasts.push({
                name: ability.name,
                maxCasts: Math.floor(minRune.casts),
                minRune: minRune.name
            })
        }

        const table = document.getElementById("abilitiesTable");
        const rows = table.tBodies[0].rows;

        abilityCasts.forEach((ability, index) => {
            if (rows[index]) {
                rows[index].querySelector(".maxCasts").textContent = ability.maxCasts;
                rows[index].querySelector(".minRune").textContent = ability.minRune;
            }
        });

        abilityCasts.forEach((ability, index) => {
             if (rows[index]) {
                const row = rows[index];
                row.querySelector(".maxCasts").textContent = ability.maxCasts;

                const runeKey = ability.minRune;
                const runeInfo = runes[runeKey];

                const runeCell = row.querySelector(".minRune");
                if (runeCell && runeInfo) {

                    // Set cell background color based on rune color
                    runeCell.style.backgroundColor = runeInfo.color || "transparent";
                    runeCell.style.color = runeInfo.fontColor || "inherit";

                    // Clear the cell and insert the image
                    runeCell.innerHTML = "";
                    const runeImg = document.createElement("img");
                    runeImg.src = `./src/images/nexus/${runeInfo.name}.png`;
                    runeImg.alt = runeInfo.name;
                    runeImg.className = "rune-icon";
                    runeCell.appendChild(runeImg);

                    // Create and append text span
                    const runeSpan = document.createElement("span");
                    runeSpan.className = "rune-name";
                    runeSpan.textContent = runeInfo.friendlyName;
                    runeCell.appendChild(runeSpan);
                }
            }
        });
    }
    catch (ex) {
        console.log(ex);
        return undefined;
    }
};
