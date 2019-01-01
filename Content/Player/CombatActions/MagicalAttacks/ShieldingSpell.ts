import { EffectType } from 'Content/Effects/EffectType';
import { NextScreenChoices } from 'Engine/ScreenDisplay';
import { Character } from 'Content/Character/GameCharacter';
import { Player } from '../../Player';
import { ICombatAction } from 'Engine/Combat/Actions/ICombatAction';
import { CView } from 'Engine/Display/ContentView';
import { CombatAbilityFlag } from 'Engine/Effects/CombatAbilityFlag';

export class ShieldingSpell implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MagicSpec;
    public name: string = "Shielding";
    public reasonCannotUse: string = "";
    public actions: ICombatAction[] = [];

    public isPossible(player: Player): boolean {
        return player.effects.has(EffectType.ShieldingSpell);
    }

    public canUse(player: Player): boolean {
        return player.effects.has(EffectType.ShieldingSpell);
    }

    public use(player: Player, monster: Character): void | NextScreenChoices {
        CView.clear();
        CView.text("You gather energy in your Talisman and unleash the spell contained within.  A barrier of light engulfs you, before turning completely transparent.  Your defense has been increased.\n\n");
        player.effects.add(EffectType.Shielding, 0, 0, 0, 0);
        player.effects.remove(EffectType.ShieldingSpell);
        // Scenes.arianScene.clearTalisman();
    }
}
