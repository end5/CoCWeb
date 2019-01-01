import { IDrop } from './IDrop';

export class ChainedDrop<T> implements IDrop<T> {
    private items: T[] = [];
    private probs: number[] = [];
    private defaultItem: T;

    constructor(defaultItem: T) {
        this.defaultItem = defaultItem;
    }

    public add(item: T, prob: number): ChainedDrop<T> {
        if (prob < 0 || prob > 1) {
            console.error("Invalid probability value " + prob);
        }
        this.items.push(item);
        this.probs.push(prob);
        return this;
    }

    public elseDrop(item: T): ChainedDrop<T> {
        this.defaultItem = item;
        return this;
    }

    public roll(): T {
        for (let i = 0; i < this.items.length; i++) {
            if (Math.random() < this.probs[i]) return this.items[i];
        }
        return this.defaultItem;
    }
}
