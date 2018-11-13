import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import { Character } from '../../../Character';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';

export class Release extends CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.MoveAway;
    public name: string = "Release";
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return !!target && target.combat.effects.has(CombatEffectType.Constricted);
    }

    public use(character: Character, target: Character): void {
        CView.clear();
        CView.text("You release " + target.desc.a + target.desc.short + " from " + target.desc.possessivePronoun + " bonds, and " + target.desc.subjectivePronoun + " drops to the ground, catching " + target.desc.possessivePronoun + " breath before " + target.desc.subjectivePronoun + " stands back up, apparently prepared to fight some more.");
        CView.text("\n\n");
        target.combat.effects.remove(CombatEffectType.Constricted);
    }
}
