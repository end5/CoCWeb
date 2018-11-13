import { Character } from '../../Character/Character';
import { Perk } from '../Perk';
import { PerkType } from '../PerkType';
import { PerkDesc } from '../PerkDesc';

export class Berzerker extends PerkDesc {
    public description(perk?: Perk, character?: Character): string {
        if (character && character.stats.str >= 75)
            return "Grants 'Berzerk' ability.";
        else
            return "<b>You aren't strong enough to benefit from this anymore.</b>";
    }

    public constructor() {
        super(PerkType.Berzerker, "Berzerker", "", "You choose the 'Berzerker' perk, which unlocks the 'Berzerk' magical ability.  Berzerking increases attack and lust resistance but reduces physical defenses.");
    }
}
