import { Character } from 'Content/Character/GameCharacter';
import { EffectType } from 'Content/Effects/EffectType';
import { NextScreenChoices } from 'Engine/ScreenDisplay';
import { Player } from '../../Player';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export class Infest extends CombatAction {
    public name = "Infest";
    public flags = CombatActionType.PhysSpec;

    public isPossible(player: Player): boolean {
        return player.effects.has(EffectType.Infested) && player.effects.get(EffectType.Infested).value1 === 5 && player.body.cocks.length > 0;
    }

    public use(player: Player, monster: Character): void | NextScreenChoices {
        // this.playerInfest();
        return;
    }
}
