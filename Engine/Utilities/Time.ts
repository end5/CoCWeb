class TimeHandler {
    private hours = 0;
    private days = 0;

    public get hour(): number {
        return this.hours;
    }

    /**
     * Increments the time forward by hours.
     * If hour goes over 24, a day is added.
     */
    public set hour(value: number) {
        this.days += Math.floor(value / 24);
        this.hours = value % 24;
    }

    public get day(): number {
        return this.days;
    }

    public set day(value: number) {
        this.days = value;
    }
}

export const Time = new TimeHandler();
