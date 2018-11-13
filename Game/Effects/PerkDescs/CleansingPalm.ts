import { Character } from '../../Character/Character';
import { Perk } from '../Perk';
import { PerkDesc } from '../PerkDesc';

export class CleansingPalm extends PerkDesc {
    public description(perk?: Perk, character?: Character): string {
        if (character && character.stats.cor >= 10)
            return "<b>DISABLED</b> - Corruption too high!";
        else
            return super.description();
    }

    public constructor() {
        super("Cleansing Palm", "Cleansing Palm", "A ranged fighting technique of Jojo’s order, allows you to blast your enemies with waves of pure spiritual energy, weakening them and hurting the corrupt.");
    }
}
