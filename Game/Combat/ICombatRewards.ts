import { IDrop } from '../Utilities/Drops/IDrop';

export interface ICombatRewards {
    drop?: IDrop<string>;
    gems?: number | (() => number);
}
