import { ITimeEvent } from './ITimeEvent';
import { CharDict } from './CharDict';
import { NextScreenChoices } from './ScreenDisplay';

class TimeEventManager {
    private timeEvents: ITimeEvent[];
    private currentIndex: number = 0;

    public constructor() {
        this.timeEvents = [];
    }

    public add(timeEvent: ITimeEvent) {
        this.timeEvents.push(timeEvent);
    }

    public update(hours: number): void | NextScreenChoices {
        let nextScreen: void | NextScreenChoices;
        while (nextScreen !== undefined && this.currentIndex < this.timeEvents.length) {
            nextScreen = this.timeEvents[this.currentIndex].update(CharDict.player!);
            this.currentIndex++;
        }

        if (this.currentIndex >= this.timeEvents.length) {
            this.currentIndex = 0;
            return;
        }

        return nextScreen;
    }
}

export const TimeEvents = new TimeEventManager();
