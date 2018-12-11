import { BreastRow } from './BreastRow';
import { ObservableList } from 'Game/Utilities/ObservableList';

export class Chest extends ObservableList<BreastRow> {
    public constructor() {
        super();
        this.add(new BreastRow());
    }

    public get firstRow(): BreastRow {
        if (this.list.length <= 0) throw new Error('No breast rows exist');
        return this.list[0];
    }

    public add(newBreastRow: BreastRow) {
        if (this.list.length < 10)
            this.list.push(newBreastRow);
    }

    public remove(index: number) {
        if (this.length - 1 >= 1)
            super.remove(index);
    }

    public clear() {
        while (this.length > 1)
            this.remove(0);
    }

    public lactationSpeed(): number {
        // Lactation * breastSize x 10 (milkPerBreast) determines scene
        return this.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier * this.sort(BreastRow.Largest).get(0)!.rating * 10;
    }
}
