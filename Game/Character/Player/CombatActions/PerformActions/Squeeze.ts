import { CombatAction, CanUseResult } from 'Game/Combat/Actions/CombatAction';
import { Character } from 'Game/Character/Character';
import { randInt } from 'Engine/Utilities/SMath';
import { CView } from 'Page/ContentView';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';
import { EffectType } from 'Game/Effects/EffectType';

export class Squeeze extends CombatAction {
    public name = "Squeeze";
    public type = CombatActionType.Attack;

    public canUse(character: Character, target: Character): CanUseResult {
        return { canUse: !!target && target.effects.has(EffectType.Constricted) };
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
