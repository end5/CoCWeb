import { Character } from 'Game/Character/Character';
import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class ControlledBreath extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.cor >= 30)
            return "<b>DISABLED</b> - Corruption too high!";
        else
            return super.description();
    }

    public constructor() {
        super("Controlled Breath", "Controlled Breath", "Jojo’s training allows you to recover more quickly. Increases rate of fatigue regeneration by 10%");
    }
}
