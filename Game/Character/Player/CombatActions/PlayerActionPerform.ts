import { CombatAction } from '../../../Combat/Actions/CombatAction';
import { CombatActionFlags } from '../../../Effects/CombatActionFlag';
import { MainAction } from './PerformActions/MainAction';
import { Tease } from './PerformActions/Tease';
import { Spells } from './PerformActions/Spells';
import { Items } from './PerformActions/Items';
import { MoveAway } from './PerformActions/MoveAway';
import { PhysicalSpecials } from './PerformActions/PhysicalSpecials';
import { MagicalSpecials } from './PerformActions/MagicalSpecials';
import { Wait } from './PerformActions/Wait';
import { Fantasize } from './PerformActions/Fantasize';
import { Character } from '../../Character';
import { randomChoice } from '../../../../Engine/Utilities/SMath';

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

export class PlayerAction implements CombatAction {
    public name: string = 'Plauer Action';
    public flag: CombatActionFlags = CombatActionFlags.None;
    public reasonCannotUse: string = '';
    public subActions: CombatAction[] = [
        new MainAction(),
        new Tease(),
        new Spells(),
        new Items(),
        new MoveAway(),
        new PhysicalSpecials(),
        new MagicalSpecials(),
        new Wait(),
        new Fantasize(),
    ];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return true;
    }

    public use(character: Character, target: Character): void {
        randomChoice(...this.subActions).use(character, target);
    }
}
