import { Character } from '../../Character/Character';
import { Perk } from '../Perk';
import { PerkType } from '../PerkType';
import { PerkDesc } from '../PerkDesc';

export class LightningStrikes extends PerkDesc {
    public description(perk?: Perk, character?: Character): string {
        if (character && character.stats.spe >= 60)
            return "Increases the attack damage for non-heavy weapons.</b>";
        else
            return "<b>You are too slow to benefit from this perk.</b>";
    }

    public constructor() {
        super(PerkType.LightningStrikes, "Lightning Strikes", "", "You choose the 'Lightning Strikes' perk, increasing the attack damage for non-heavy weapons.</b>");
    }
}
