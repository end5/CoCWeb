import { IDrop } from 'Game/Utilities/Drops/IDrop';

export interface ICombatRewards {
    drop?: IDrop<string>;
    gems?: number | (() => number);
}
