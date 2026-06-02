import * as ImageReader from "./image-reader.js";
import { ImageDetect } from "@alt1/base";
import * as moment from 'moment';
import { buffRegistry } from './buff-registry.js';

interface ImageBuffer {
    id: number;
    name: string;
    imgBuffer: any;
}

export interface BuffTimer {
    name: string;
    expireTime: any;
    buffTime: number | undefined;
}

let imageBufferMap: Map<string, ImageBuffer[]> = new Map();

export async function loadBuffImages(): Promise<void> {
    imageBufferMap = new Map();
    let id = 1;
    for (const buff of buffRegistry) {
        const entries: ImageBuffer[] = [];
        for (const dataUrl of buff.images as string[]) {
            const base64 = dataUrl.replace(/^data:[^;]+;base64,/, '');
            const imgBuffer = await ImageDetect.imageDataFromBase64(base64);
            entries.push({ id: id++, name: buff.name, imgBuffer });
        }
        imageBufferMap.set(buff.name, entries);
    }
}

export function getBuff(img: any, buffName: string): number | undefined {
    try {
        const foundBuff = imageBufferMap.get(buffName) ?? [];
        let buffPosition: any;

        for (let fb = 0; fb < foundBuff.length; fb++) {
            buffPosition = ImageReader.getPosition(img, foundBuff[fb].imgBuffer, 0, 0, foundBuff[fb].imgBuffer.width, foundBuff[fb].imgBuffer.height);

            if (buffPosition !== undefined) {
                break;
            }
        }

        if (buffPosition !== undefined) {
            const buffer = img.toData(buffPosition.x, buffPosition.y, buffPosition.w, buffPosition.h);
            const buff = ImageReader.readNumbers(buffer, buffName);

            if (localStorage.debugMode === "true") {
                console.log(buffName + ": " + buff?.toString());
                ImageReader.outputImage(buffer);
            }

            if (buff === undefined || buff === "") {
                return undefined;
            }
            return Number(buff);
        }
    } catch (ex) {
        console.log(ex);
    }
    return undefined;
}

export function checkBuff(img: any, selectedBuffs: string[], buffTimers: BuffTimer[]): void {
    for (let b = 0; b < selectedBuffs.length; b++) {
        const buffTime = getBuff(img, selectedBuffs[b]);
        setBuffTime(selectedBuffs[b], buffTime, buffTimers);
    }
}

export function setBuffTime(selectedBuff: string, buffTime: number | undefined, buffTimers: BuffTimer[]): void {
    const expireTime = buffTime !== undefined ? moment.utc(new Date()).add(buffTime, 's') : undefined;
    const foundBuff = buffTimers.find(bt => bt.name === selectedBuff);

    if (!foundBuff) {
        buffTimers.push({ name: selectedBuff, expireTime, buffTime });
    } else if (foundBuff.expireTime !== undefined) {
        if (expireTime !== undefined) {
            const prevTime: number = foundBuff.buffTime ?? 0;
            if (
                (buffTime as number) < 60
                || prevTime - (buffTime as number) === 60
                || (prevTime < (buffTime as number) && selectedBuff !== "vulnBuff" && selectedBuff !== "smokeCloudBuff")
                || foundBuff.expireTime < moment.utc(new Date())
            ) {
                foundBuff.buffTime = buffTime;
                foundBuff.expireTime = expireTime;
            }
        }
    } else {
        foundBuff.expireTime = expireTime;
    }

    if (localStorage.debug === "true") {
        console.log(`${selectedBuff}: ${buffTime}`);
    }
}
