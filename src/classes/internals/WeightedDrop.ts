import { RandomDrop } from "./RandomDrop";

/**
 * Created by aimozg on 11.01.14.
 */
export class WeightedDrop implements RandomDrop {
    private items: any[] = [];
    private sum = 0;
    public constructor(first?: any, firstWeight = 0) {
        if (first != undefined) {
            this.items.push([first, firstWeight]);
            this.sum += firstWeight;
        }
    }
    public add(item: any, weight = 1): WeightedDrop {
        this.items.push([item, weight]);
        this.sum += weight;
        return this;
    }
    public addMany(weight: number, ..._items: any[]): WeightedDrop {
        for (const item of _items) {
            this.items.push([item, weight]);
            this.sum += weight;
        }
        return this;
    }
    // you can pass your own random value from 0 to 1 (so you can use your own RNG)
    public roll(): any {
        let random: number = Math.random() * this.sum;
        let item: any;
        while (random > 0 && this.items.length > 0) {
            const pair: any[] = this.items.shift();
            item = pair[0];
            random -= pair[1];
        }
        return item;
    }

    public clone(): WeightedDrop {
        const other: WeightedDrop = new WeightedDrop();
        other.items = this.items.slice();
        other.sum = this.sum;
        return other;
    }
}
