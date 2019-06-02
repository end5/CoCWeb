export class ASDate {
    private _date: Date;
    public constructor() {
        this._date = new Date(Date.now());
    }

    public get fullYear() { return this._date.getFullYear(); }
    public get month() { return this._date.getMonth(); }
    public get date() { return this._date.getDate(); }
}
