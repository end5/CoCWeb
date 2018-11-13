import { Character } from '../../Character/Character';
import { Perk } from '../Perk';
import { PerkType } from '../PerkType';
import { PerkDesc } from '../PerkDesc';

export class BrutalBlows extends PerkDesc {
    public description(perk?: Perk, character?: Character): string {
        if (character && character.stats.str >= 75)
            return "Reduces enemy armor with each hit.";
        else
            return "<b>You aren't strong enough to benefit from this anymore.</b>";
    }

    public constructor() {
        super(PerkType.BrutalBlows, "Brutal Blows", "", "You choose the 'Brutal Blows' perk, which reduces enemy armor with each hit.");
    }
}
