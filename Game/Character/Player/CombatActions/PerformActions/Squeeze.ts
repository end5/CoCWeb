import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { Character } from '../../../Character';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Squeeze extends CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Attack;
    public name: string = "Squeeze";
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
        // Squeeze -
        CView.text("Your coils wrap tighter around your prey, leaving " + target.desc.objectivePronoun + " short of breath. You can feel it in your tail as " + target.desc.possessivePronoun + " struggles are briefly intensified.");
        target.stats.HP -= target.stats.maxHP() * (.10 + randInt(15) / 100);
        // Enemy faints -
        if (target.stats.HP < 1) {
            CView.text("You can feel " + target.desc.a + target.desc.short + "'s life signs beginning to fade, and before you crush all the life from " + target.desc.objectivePronoun + ", you let go, dropping " + target.desc.objectivePronoun + " to the floor, unconscious but alive.  In no time, " + target.desc.possessivePronoun + "'s eyelids begin fluttering, and you've no doubt they'll regain consciousness soon.  ");
            if (target.desc.short === "demons")
                CView.text("The others quickly back off, terrified at the idea of what you might do to them.");
            CView.text("\n\n");
        }
        CView.text("\n\n");
    }
}
