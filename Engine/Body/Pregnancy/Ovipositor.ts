import { ISerializable } from 'Engine/Utilities/ISerializable';

export interface IOvipositor {
    unfertileEggs: number;
    fertileEggs: number;
}

export class Ovipositor implements ISerializable<IOvipositor> {
    private unfertileEggs: number = 0;
    private fertileEggs: number = 0;

    public get eggs(): number {
        return this.unfertileEggs;
    }

    public set eggs(value: number) {
        this.unfertileEggs = this.unfertileEggs > 50 ? 50 : value;
    }

    public get fertilizedEggs(): number {
        return this.fertileEggs;
    }

    public set fertilizedEggs(value: number) {
        this.fertileEggs = this.fertileEggs > 50 ? 50 : value;
    }

    public canOviposit(): boolean {
        return this.unfertileEggs >= 10 ? true : false;
    }

    public dumpEggs(): void {
        this.unfertileEggs = 0;
        this.fertilizeEggs();
    }

    public fertilizeEggs(): number {
        this.fertileEggs = this.unfertileEggs;
        return this.fertileEggs;
    }

    public serialize(): IOvipositor {
        return {
            unfertileEggs: this.unfertileEggs,
            fertileEggs: this.fertileEggs
        };
    }

    public deserialize(saveObject: IOvipositor) {
        this.unfertileEggs = saveObject.unfertileEggs;
        this.fertileEggs = saveObject.fertileEggs;
    }
}
