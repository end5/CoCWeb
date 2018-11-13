import { Character } from '../../Character/Character';
import { Perk } from '../Perk';
import { PerkDesc } from '../PerkDesc';

export class Enlightened extends PerkDesc {
    public description(perk?: Perk, character?: Character): string {
        if (character && character.stats.cor >= 10)
            return "<b>DISABLED</b> - Corruption too high!";
        else
            return super.description();
    }

    public constructor() {
        super("Enlightened", "Enlightened", "Jojo’s tutelage has given you a master’s focus and you can feel the universe in all its glory spread out before you. You’ve finally surpassed your teacher.");
    }
}
