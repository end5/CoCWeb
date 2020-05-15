import { loadId } from "./LoadUtils";

export class TimeView {
    public element: HTMLElement;
    private day: HTMLElement;
    private hour: HTMLElement;

    public constructor() {
        this.element = loadId("timePanel");

        this.day = loadId("timeDay");
        this.hour = loadId("timeHour");
    }

    public setDay(day: number) {
        this.day.textContent = `Day #: ${day}`;
    }

    public setHour(hour: number) {
        this.hour.textContent = `Time: ${hour}`;
    }
}
