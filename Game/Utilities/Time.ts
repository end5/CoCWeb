import { MainScreen } from '../../Page/MainScreen';

class TimeHandler {
    private date: Date;
    public constructor() {
        this.date = new Date(0);
    }

    public get hour(): number {
        return this.date.getHours();
    }

    public set hour(value: number) {
        this.date.setHours(value);
        this.updateDisplay();
    }

    public get day(): number {
        return this.date.getDay();
    }

    public set day(value: number) {
        this.date.setDate(value);
        this.updateDisplay();
    }

    private updateDisplay() {
        MainScreen.timeHourElement.clear();
        MainScreen.timeHourElement.text(this.hour + ":00");
        MainScreen.timeDayElement.clear();
        MainScreen.timeDayElement.text(this.day.toString());
    }
}

export const Time = new TimeHandler();
