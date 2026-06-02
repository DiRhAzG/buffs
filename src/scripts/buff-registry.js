import { buffImagesData } from './buff-images-data.js';

export const buffRegistry = [
    // Combat buffs
    { name: "overloadBuff",      friendlyName: "Overload",           timeBuffer: true,  skilling: false, images: buffImagesData["overloadBuff"] },
    { name: "animateDeadBuff",   friendlyName: "Animate Dead",       timeBuffer: true,  skilling: false, images: buffImagesData["animateDeadBuff"] },
    { name: "excaliburBuff",     friendlyName: "Excalibur",          timeBuffer: false, skilling: false, images: buffImagesData["excaliburBuff"] },
    { name: "prayerRenewalBuff", friendlyName: "Prayer Renewal",     timeBuffer: true,  skilling: false, images: buffImagesData["prayerRenewalBuff"] },
    { name: "ritualShardBuff",   friendlyName: "Ritual Shard",       timeBuffer: false, skilling: false, images: buffImagesData["ritualShardBuff"] },
    { name: "weaponPoisonBuff",  friendlyName: "Weapon Poison",      timeBuffer: true,  skilling: false, images: buffImagesData["weaponPoisonBuff"] },
    { name: "antifireBuff",      friendlyName: "Antifire",           timeBuffer: true,  skilling: false, images: buffImagesData["antifireBuff"] },
    { name: "aggressionBuff",    friendlyName: "Aggression",         timeBuffer: true,  skilling: false, images: buffImagesData["aggressionBuff"] },
    { name: "sumRenewBuff",      friendlyName: "Summon Renew",       timeBuffer: true,  skilling: false, images: buffImagesData["sumRenewBuff"] },
    { name: "bookBuff",          friendlyName: "Book",               timeBuffer: false, skilling: false, images: buffImagesData["bookBuff"] },
    { name: "vulnBuff",          friendlyName: "Vulnerability",      timeBuffer: false, skilling: false, images: buffImagesData["vulnBuff"] },
    { name: "smokeCloudBuff",    friendlyName: "Smoke Cloud",        timeBuffer: false, skilling: false, images: buffImagesData["smokeCloudBuff"] },
    { name: "darknessBuff",      friendlyName: "Darkness",           timeBuffer: true,  skilling: false, images: buffImagesData["darknessBuff"] },
    { name: "penanceBuff",       friendlyName: "Penance",            timeBuffer: false, skilling: false, images: buffImagesData["penanceBuff"] },
    { name: "quickPrayerBuff",   friendlyName: "Quick Prayer",       timeBuffer: false, skilling: false, images: buffImagesData["quickPrayerBuff"] },
    // Skilling buffs
    { name: "crystalMaskBuff",   friendlyName: "Crystal Mask",       timeBuffer: true,  skilling: true,  images: buffImagesData["crystalMaskBuff"] },
    { name: "lightFormBuff",     friendlyName: "Light Form",         timeBuffer: false, skilling: true,  images: buffImagesData["lightFormBuff"] },
    { name: "perfectPlusBuff",   friendlyName: "Perfect Plus",       timeBuffer: true,  skilling: true,  images: buffImagesData["perfectPlusBuff"] },
    { name: "superheatBuff",     friendlyName: "Superheat",          timeBuffer: false, skilling: true,  images: buffImagesData["superheatBuff"] },
    { name: "torstolBuff",       friendlyName: "Torstol Sticks",     timeBuffer: false, skilling: true,  images: buffImagesData["torstolBuff"] },
    { name: "clanBuff",          friendlyName: "Clan Boost",         timeBuffer: false, skilling: true,  images: buffImagesData["clanBuff"] },
    { name: "farmJujuBuff",      friendlyName: "Farm Juju",          timeBuffer: true,  skilling: true,  images: buffImagesData["farmJujuBuff"] },
];
