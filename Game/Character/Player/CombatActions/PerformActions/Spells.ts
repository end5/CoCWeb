import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { Character } from '../../../Character';
import { Arouse } from '../Spells/Arouse';
import { Blind } from '../Spells/Blind';
import { ChargeWeapon } from '../Spells/ChargeWeapon';
import { CleansingPalm } from '../Spells/CleansingPalm';
import { Heal } from '../Spells/Heal';
import { Might } from '../Spells/Might';
import { Whitefire } from '../Spells/Whitefire';
import { randomChoice } from '../../../../../Engine/Utilities/SMath';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';

export class Spells extends CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Spells;
    public name: string = "Spells";
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [
        new Arouse(),
        new Blind(),
        new ChargeWeapon(),
        new CleansingPalm(),
        new Heal(),
        new Might(),
        new Whitefire(),
    ];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return !!this.subActions.find((action) => action.canUse(character, target));
    }

    public use(character: Character, target: Character): void {
        randomChoice(...this.subActions).use(character, target);
    }
}
