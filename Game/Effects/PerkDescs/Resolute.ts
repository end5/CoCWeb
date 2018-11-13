import { Character } from '../../Character/Character';
import { Perk } from '../Perk';
import { PerkType } from '../PerkType';
import { PerkDesc } from '../PerkDesc';

export class Resolute extends PerkDesc {
    public description(perk?: Perk, character?: Character): string {
        if (character && character.stats.tou >= 75)
            return "Grants immunity to stuns and some statuses.</b>";
        else
            return "<b>You aren't tough enough to benefit from this anymore.</b>";
    }

    public constructor() {
        super(PerkType.Resolute, "Resolute", "", "You choose the 'Resolute' perk, granting immunity to stuns and some statuses.</b>");
    }
}
