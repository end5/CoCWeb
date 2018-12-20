import { CombatAction } from 'Game/Combat/Actions/CombatAction';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';
import { SubAction } from 'Game/Combat/Actions/SubAction';
// import { Arouse } from '../Spells/Arouse';
// import { Blind } from '../Spells/Blind';
// import { ChargeWeapon } from '../Spells/ChargeWeapon';
// import { CleansingPalm } from '../Spells/CleansingPalm';
// import { Heal } from '../Spells/Heal';
// import { Might } from '../Spells/Might';
// import { Whitefire } from '../Spells/Whitefire';

export class Spells extends SubAction {
    public name = "Spells";
    public type = CombatActionType.Spells;

    public subActions: CombatAction[] = [
        // new Arouse(),
        // new Blind(),
        // new ChargeWeapon(),
        // new CleansingPalm(),
        // new Heal(),
        // new Might(),
        // new Whitefire(),
    ];
}
