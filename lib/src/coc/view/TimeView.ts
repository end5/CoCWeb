export class TimeView {
    public element: HTMLElement;
    private day: HTMLElement;
    private hour: HTMLElement;

    public constructor() {
        this.element = document.createElement('div');
        this.element.id = 'timePanel';
        
        this.day = document.createElement('div');
        this.hour = document.createElement('div');

        this.element.appendChild(this.day);
        this.element.appendChild(this.hour);
    }

    public setDay(day: number) {
        this.day.textContent = 'Day #: ' + day;
    }

    public setHour(hour: number) {
        this.hour.textContent = 'Time: ' + hour;
    }
}