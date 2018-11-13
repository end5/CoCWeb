import { ITimeAware } from './ITimeAware';
import { IUpdate } from './IUpdate';
import { CharDict } from './CharDict';

class TimeManager implements IUpdate {
    private timeAwareObjects: ITimeAware[];
    private currentIndex: number = 0;

    public constructor() {
        this.timeAwareObjects = [];
    }

    public add(timeAwareObject: ITimeAware) {
        this.timeAwareObjects.push(timeAwareObject);
    }

    public update(hours: number) {
        this.currentIndex = 0;
        while (this.currentIndex < this.timeAwareObjects.length) {
            this.timeAwareObjects[this.currentIndex].timeChange(CharDict.player!);
            this.currentIndex++;
        }
    }
}

const time = new TimeManager();
export { time as TimeManager };
