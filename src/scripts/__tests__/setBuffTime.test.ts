import * as moment from 'moment';
import { setBuffTime, BuffTimer } from '../buff';

describe('setBuffTime', () => {
    let buffTimers: BuffTimer[];

    beforeEach(() => {
        buffTimers = [];
    });

    describe('new buff (not yet tracked)', () => {
        it('adds the buff timer with correct name and time', () => {
            setBuffTime('overloadBuff', 450, buffTimers);
            expect(buffTimers).toHaveLength(1);
            expect(buffTimers[0].name).toBe('overloadBuff');
            expect(buffTimers[0].buffTime).toBe(450);
        });

        it('sets expireTime approximately buffTime seconds from now', () => {
            const before = moment.utc(new Date());
            setBuffTime('overloadBuff', 450, buffTimers);
            const after = moment.utc(new Date());
            const expire = buffTimers[0].expireTime;
            expect(expire.isSameOrAfter(before.clone().add(449, 's'))).toBe(true);
            expect(expire.isSameOrBefore(after.clone().add(451, 's'))).toBe(true);
        });

        it('stores undefined expireTime when buffTime is undefined', () => {
            setBuffTime('overloadBuff', undefined, buffTimers);
            expect(buffTimers[0].expireTime).toBeUndefined();
            expect(buffTimers[0].buffTime).toBeUndefined();
        });
    });

    describe('update conditions', () => {
        it('updates when new reading is under 60 seconds (most accurate)', () => {
            setBuffTime('overloadBuff', 450, buffTimers);
            setBuffTime('overloadBuff', 45, buffTimers);
            expect(buffTimers[0].buffTime).toBe(45);
        });

        it('updates when the minute boundary changes (prev - new === 60)', () => {
            setBuffTime('overloadBuff', 420, buffTimers);
            setBuffTime('overloadBuff', 360, buffTimers);
            expect(buffTimers[0].buffTime).toBe(360);
        });

        it('updates when buff is renewed (new time > old time)', () => {
            setBuffTime('overloadBuff', 300, buffTimers);
            setBuffTime('overloadBuff', 720, buffTimers);
            expect(buffTimers[0].buffTime).toBe(720);
        });

        it('updates when the stored timer has already expired', () => {
            buffTimers.push({
                name: 'overloadBuff',
                expireTime: moment.utc(new Date()).subtract(10, 'seconds'),
                buffTime: 100,
            });
            setBuffTime('overloadBuff', 90, buffTimers);
            expect(buffTimers[0].buffTime).toBe(90);
        });

        it('sets expireTime when it was previously undefined', () => {
            buffTimers.push({ name: 'overloadBuff', expireTime: undefined, buffTime: undefined });
            setBuffTime('overloadBuff', 300, buffTimers);
            expect(buffTimers[0].expireTime).toBeDefined();
        });
    });

    describe('no-update zone', () => {
        it('does not update in stable range (minor tick, no condition met)', () => {
            setBuffTime('overloadBuff', 400, buffTimers);
            setBuffTime('overloadBuff', 399, buffTimers);
            expect(buffTimers[0].buffTime).toBe(400);
        });

        it('does not add a duplicate entry for the same buff', () => {
            setBuffTime('overloadBuff', 400, buffTimers);
            setBuffTime('overloadBuff', 399, buffTimers);
            expect(buffTimers).toHaveLength(1);
        });
    });

    describe('vulnBuff and smokeCloudBuff exceptions', () => {
        it('does not update vulnBuff when new time is higher (not a renewal)', () => {
            // Use values > 60 so only the "renewal" condition could fire
            setBuffTime('vulnBuff', 300, buffTimers);
            setBuffTime('vulnBuff', 400, buffTimers);
            expect(buffTimers[0].buffTime).toBe(300);
        });

        it('does not update smokeCloudBuff when new time is higher', () => {
            setBuffTime('smokeCloudBuff', 300, buffTimers);
            setBuffTime('smokeCloudBuff', 400, buffTimers);
            expect(buffTimers[0].buffTime).toBe(300);
        });

        it('still updates vulnBuff when under 60 seconds', () => {
            setBuffTime('vulnBuff', 400, buffTimers);
            setBuffTime('vulnBuff', 45, buffTimers);
            expect(buffTimers[0].buffTime).toBe(45);
        });
    });

    describe('multiple buffs', () => {
        it('tracks different buffs independently', () => {
            setBuffTime('overloadBuff', 450, buffTimers);
            setBuffTime('antifireBuff', 200, buffTimers);
            expect(buffTimers).toHaveLength(2);
            expect(buffTimers[0].name).toBe('overloadBuff');
            expect(buffTimers[1].name).toBe('antifireBuff');
        });

        it('updates only the matching buff', () => {
            setBuffTime('overloadBuff', 450, buffTimers);
            setBuffTime('antifireBuff', 200, buffTimers);
            setBuffTime('overloadBuff', 45, buffTimers);
            expect(buffTimers[0].buffTime).toBe(45);
            expect(buffTimers[1].buffTime).toBe(200);
        });
    });
});
