import { CharDict } from './CharDict';
import { NextScreenChoices } from './ScreenDisplay';
import { Dictionary } from '../Engine/Utilities/Dictionary';
import { Character } from './Character/Character';

export type TimeEventFunc = (player: Character) => void | boolean | NextScreenChoices;

class TimeEventManager extends Dictionary<string, TimeEventFunc>  {
    private currentIndex: number = 0;

    public update(hours: number): void | NextScreenChoices {
    }

    private runEvents(this: TimeEventManager, times: number, index: number = 0) {
        let nextScreen: void | boolean | NextScreenChoices;
        const events = this.entries();
        while (!nextScreen && this.currentIndex < events.length) {
            nextScreen = events[this.currentIndex][1](CharDict.player!);
            this.currentIndex++;
        }

        if (this.currentIndex >= events.length) {
            this.currentIndex = 0;
            return;
        }

        if (nextScreen === true) return { next: ((player: Character) => this.runEvents(times, index)) as void | boolean | NextScreenChoices };

        return nextScreen;
    }
}

export const TimeEvents = new TimeEventManager();
