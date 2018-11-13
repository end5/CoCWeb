import { Effect } from './Effect';
import { PerkType } from './PerkType';
import { PerkDescLib } from './PerkDescLib';
import { IEffectValues } from './EffectValues';
import { PerkDesc } from './PerkDesc';

export class Perk extends Effect<PerkType, PerkDesc> {
    public constructor(type: PerkType, values?: IEffectValues) {
        super(type, PerkDescLib.get(type)!, values);
    }
}
