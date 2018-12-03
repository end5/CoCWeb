import { Pregnancy, IPregnancy } from './Pregnancy';
import { ISerializable } from 'Engine/Utilities/ISerializable';

export interface IFlagWomb {
    pregnancy?: IPregnancy;
    events: number[];
    lastEvent: number;
}

export class FlagWomb implements ISerializable<IFlagWomb> {
    protected currentPregnancy?: Pregnancy;
    protected events: number[] = [];
    protected lastEvent: number = 0;

    public get pregnancy(): Pregnancy | undefined {
        return this.currentPregnancy;
    }

    public get event(): number {
        if (this.currentPregnancy && this.currentPregnancy.incubation <= 0) return 0;
        for (let index = 0; index < this.events.length; index++) {
            if (this.currentPregnancy && this.currentPregnancy.incubation > this.events[index]) return index;
        }
        return 1;
    }

    public eventTriggered(): number {
        if (this.lastEvent === this.event) return 0;
        this.lastEvent = this.event;
        return this.lastEvent;
    }

    public isPregnant(): boolean {
        return !!this.pregnancy;
    }

    public knockUp(pregnancy: Pregnancy, events: number[]): void {
        this.currentPregnancy = pregnancy;
        this.events = events;
        this.lastEvent = 0;
    }

    public clear() {
        this.currentPregnancy = undefined;
        this.events = [];
        this.lastEvent = 0;
    }

    public update() {
        if (this.currentPregnancy) {
            this.currentPregnancy.incubation -= this.currentPregnancy.incubation === 0 ? 0 : 1;
            if (this.currentPregnancy.incubation === 0) {
                this.clear();
            }
        }
    }

    public serialize(): IFlagWomb | void {
        if (this.currentPregnancy)
            return {
                pregnancy: this.currentPregnancy.serialize(),
                events: this.events,
                lastEvent: this.lastEvent,
            };
    }

    public deserialize(saveObject: IFlagWomb) {
        if (saveObject) {
            if (saveObject.pregnancy) {
                this.currentPregnancy = new Pregnancy();
                this.currentPregnancy.deserialize(saveObject.pregnancy);
            }
            this.events = saveObject.events;
            this.lastEvent = saveObject.lastEvent;
        }
    }
}
