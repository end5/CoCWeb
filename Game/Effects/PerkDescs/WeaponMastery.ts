import { Character } from '../../Character/Character';
import { Perk } from '../Perk';
import { PerkType } from '../PerkType';
import { PerkDesc } from '../PerkDesc';

export class WeaponMastery extends PerkDesc {
    public description(perk?: Perk, character?: Character): string {
        if (character && character.stats.str > 60)
            return "Doubles damage bonus of weapons classified as 'Large'.";
        else
            return "<b>You aren't strong enough to benefit from this anymore.</b>";
    }

    public constructor() {
        super(PerkType.WeaponMastery, "Weapon Mastery", "", "You choose the 'Weapon Mastery' perk, doubling the effectiveness of large weapons.");
    }
}
