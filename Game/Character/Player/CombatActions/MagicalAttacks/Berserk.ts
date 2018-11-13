import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { PerkType } from '../../../../Effects/PerkType';
import { Character } from '../../../Character';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Berserk extends CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "Berzerk";
    public reasonCannotUse: string = "You're already pretty goddamn mad!";
    public subActions: CombatAction[] = [];

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.Berzerker);
    }

    public canUse(character: Character, monster: Character): boolean {
        return !character.combat.effects.has(CombatEffectType.Berzerking);
    }

    public useAction(character: Character, monster: Character): void {
        CView.clear();
        CView.text("You roar and unleash your savage fury, forgetting about defense in order to destroy your foe!\n\n");
        character.combat.effects.add(CombatEffectType.Berzerking, character, {
            attack: {
                value: { flat: 30 }
            },
            defense: {
                value: { multi: 0 }
            }
        });
    }
}
