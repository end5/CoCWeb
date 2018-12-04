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
    }

    public get day(): number {
        return this.date.getDay();
    }

    public set day(value: number) {
        this.date.setDate(value);
    }
}

export const Time = new TimeHandler();
