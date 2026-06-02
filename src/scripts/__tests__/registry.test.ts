import { buffRegistry } from '../buff-registry.js';

describe('buffRegistry', () => {
    it('contains all expected buffs', () => {
        const names = buffRegistry.map((b: any) => b.name);
        const expected = [
            'overloadBuff', 'animateDeadBuff', 'excaliburBuff', 'prayerRenewalBuff',
            'ritualShardBuff', 'weaponPoisonBuff', 'antifireBuff', 'aggressionBuff',
            'sumRenewBuff', 'bookBuff', 'vulnBuff', 'smokeCloudBuff', 'darknessBuff',
            'penanceBuff', 'quickPrayerBuff', 'crystalMaskBuff', 'lightFormBuff',
            'perfectPlusBuff', 'superheatBuff', 'torstolBuff', 'clanBuff', 'farmJujuBuff',
        ];
        for (const name of expected) {
            expect(names).toContain(name);
        }
    });

    it('has no duplicate entries', () => {
        const names = buffRegistry.map((b: any) => b.name);
        expect(new Set(names).size).toBe(names.length);
    });

    it('every entry has all required fields', () => {
        for (const buff of buffRegistry) {
            const b = buff as any;
            expect(typeof b.name).toBe('string');
            expect(b.name.length).toBeGreaterThan(0);
            expect(typeof b.friendlyName).toBe('string');
            expect(b.friendlyName.length).toBeGreaterThan(0);
            expect(typeof b.timeBuffer).toBe('boolean');
            expect(typeof b.skilling).toBe('boolean');
            expect(Array.isArray(b.images)).toBe(true);
            expect(b.images.length).toBeGreaterThan(0);
        }
    });

    it('every image is a non-empty base64 string', () => {
        for (const buff of buffRegistry) {
            for (const img of (buff as any).images) {
                expect(typeof img).toBe('string');
                expect(img.length).toBeGreaterThan(0);
                // Valid base64 characters only
                expect(/^[A-Za-z0-9+/]+=*$/.test(img)).toBe(true);
            }
        }
    });

    it('marks skilling buffs correctly', () => {
        const skilling = buffRegistry.filter((b: any) => b.skilling).map((b: any) => b.name);
        expect(skilling).toContain('crystalMaskBuff');
        expect(skilling).toContain('farmJujuBuff');
        expect(skilling).toContain('superheatBuff');
        expect(skilling).not.toContain('overloadBuff');
        expect(skilling).not.toContain('excaliburBuff');
        expect(skilling).not.toContain('vulnBuff');
    });

    it('buffs with multiple variants have more than one image', () => {
        const find = (name: string) => (buffRegistry as any[]).find(b => b.name === name);
        expect(find('overloadBuff').images.length).toBeGreaterThan(1);
        expect(find('bookBuff').images.length).toBeGreaterThan(1);
        expect(find('antifireBuff').images.length).toBeGreaterThan(1);
    });
});
