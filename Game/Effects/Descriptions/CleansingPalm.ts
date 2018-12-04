import { Character } from 'Game/Character/Character';
import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class CleansingPalm extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.cor >= 10)
            return "<b>DISABLED</b> - Corruption too high!";
        else
            return super.description();
    }

    public constructor() {
        super("Cleansing Palm", "Cleansing Palm", "A ranged fighting technique of Jojo’s order, allows you to blast your enemies with waves of pure spiritual energy, weakening them and hurting the corrupt.");
    }
}
