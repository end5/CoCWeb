import { CombatAction, CanUseResult } from 'Engine/Combat/Actions/CombatAction';
import { EffectType } from 'Content/Effects/EffectType';
import { Character } from 'Content/Character/GameCharacter';
import { CView } from 'Page/ContentView';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export class Berserk extends CombatAction {
    public name = "Berzerk";
    public type = CombatActionType.MagicSpec;

    public isPossible(character: Character): boolean {
        return character.effects.has(EffectType.Berzerker);
    }

    public canUse(character: Character, monster: Character): CanUseResult {
        if (!character.effects.has(EffectType.Berzerking))
            return { canUse: true };
        else
            return { canUse: false, reasonCannotUse: "You're already pretty goddamn mad!" };
    }

    public useAction(character: Character, monster: Character): void {
        CView.clear();
        CView.text("You roar and unleash your savage fury, forgetting about defense in order to destroy your foe!\n\n");
        character.effects.create(EffectType.Berzerking, {
            attack: {
                value: { flat: 30 }
            },
            defense: {
                value: { multi: 0 }
            }
        });
    }
}
