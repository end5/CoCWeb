import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { CockSock } from 'Engine/Items/CockSock';
import { CockSockName } from 'Content/Items/CockSockName';

export class Viridian extends CockSock {
    public constructor() {
        super(CockSockName.Viridian);
    }

    public onEquip(character: Character) {
        if (!character.effects.has(EffectType.LustyRegeneration)) {
            character.effects.create(EffectType.LustyRegeneration);
        }
    }

    public onUnequip(character: Character) {
        if (character.effects.has(EffectType.LustyRegeneration)) {
            character.effects.removeByName(EffectType.LustyRegeneration);
        }
    }
}
