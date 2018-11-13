import { Perk } from './Perk';
import { PerkType } from './PerkType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { IEffectValues } from './EffectValues';

export class PerkDict extends Dictionary<PerkType, Perk> {
    public add(type: PerkType, values?: IEffectValues) {
        this.set(type, new Perk(type, values));
    }
}
