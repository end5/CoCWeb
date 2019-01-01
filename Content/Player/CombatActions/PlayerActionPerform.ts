import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';
import { StandardAction } from './PerformActions/StandardAction';
import { Tease } from './PerformActions/Tease';
import { Spells } from './PerformActions/Spells';
import { ItemInventoryAction } from 'Content/Combat/Actions/ItemInventoryAction';
import { MoveAway } from './PerformActions/MoveAway';
import { PhysicalSpecials } from './PerformActions/PhysicalSpecials';
import { MagicalSpecials } from './PerformActions/MagicalSpecials';
import { Wait } from './PerformActions/Wait';
import { Fantasize } from './PerformActions/Fantasize';
import { Character } from 'Engine/Character/Character';
import { randomChoice } from 'Engine/Utilities/SMath';

/*
    Old Menu Choice Locations
    0 - Approach, Recover, Struggle, Squeeze, Attack
    1 - Tease
    2 - Spells
    3 - Items
    4 - Run, Release
    5 - Bow, Wait, P. Specials
    6 - M. Specials
    7 - Climb, Wait
    8 - Fantasize
    9 - Inspect
*/

/*
    New Menu Choice Locations
    0 - Main Action
    1 - Tease
    2 - Spells
    3 - Items
    4 - Move Away - Climb, Run, Release
    5 - P. Specials - Bow here
    6 - M. Specials
    7 - Wait
    8 - Fantasize
    9 - Inspect
*/

export class PlayerAction extends CombatAction {
    public name = 'Player Action';
    public type = CombatActionType.None;

    public constructor(player: Character) {
        super();
        this.subActions = [
            new StandardAction(),
            new Tease(),
            new Spells(),
            new ItemInventoryAction(player),
            new MoveAway(),
            new PhysicalSpecials(),
            new MagicalSpecials(),
            new Wait(),
            new Fantasize(),
        ];
    }

    public use(character: Character, target: Character): void {
        randomChoice(this.subActions).use(character, target);
    }
}
