import { Character } from './Character/Character';
import { NextScreenChoices } from './Display/ScreenDisplay';

export interface ITimeEvent {
    /**
     * Called once per hour. If NextScreenChoices is returned, the loop for updating is broken
     * and will resume when TimeEvents.update() is called.
     * @param player
     */
    update(player: Character): void | boolean | NextScreenChoices;
}
