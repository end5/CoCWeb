import { IDrop } from './IDrop';

export class WeightedDrop<T> implements IDrop<T> {
    private items: [T, number][] = [];
    private sum: number = 0;

    public constructor(first?: T, firstWeight: number = 0) {
        if (first) {
            this.items.push([first, firstWeight]);
            this.sum += firstWeight;
        }
    }

    public add(item: T, weight: number = 1): WeightedDrop<T> {
        this.items.push([item, weight]);
        this.sum += weight;
        return this;
    }

    public addMany(weight: number, ...items: T[]): WeightedDrop<T> {
        for (const item of items) {
            this.items.push([item, weight]);
            this.sum += weight;
        }
        return this;
    }

    // you can pass your own random value from 0 to 1 (so you can use your own RNG)
    public roll(): T | undefined {
        let random = Math.random() * this.sum;
        let item: T | undefined;
        while (random > 0 && this.items.length > 0) {
            const pair = this.items.shift();
            if (pair) {
                item = pair[0];
                random -= pair[1];
            }
        }
        return item;
    }

    /*
    public clone():WeightedDrop
    {
        let other:WeightedDrop = new WeightedDrop();
        other.items = this.items.slice();
        other.sum = this.sum;
        return other;
    }*/
}
