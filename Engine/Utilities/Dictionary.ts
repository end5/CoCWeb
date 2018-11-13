import { ISerializable } from "./ISerializable";

export interface IDictionary<T> { [x: string]: T; }

export class Dictionary<T extends string, U> implements Iterable<U>, ISerializable<IDictionary<U>> {
    protected dictionary: IDictionary<U>;

    public constructor() {
        this.dictionary = {};
    }

    public get(key: T): U | undefined {
        return this.dictionary[key as string];
    }

    public set(key: T, entry: U) {
        this.dictionary[key as string] = entry;
    }

    public remove(key: T) {
        delete this.dictionary[key];
    }

    public has(key: T): boolean {
        return !!this.dictionary[key];
    }

    public keys(): T[] {
        return Object.keys(this.dictionary) as T[];
    }

    public entries(): [T, U][] {
        return Object.keys(this.dictionary).map((key) => [key as T, this.dictionary[key] as U]) as [T, U][];
    }

    public values(): U[] {
        return Object.keys(this.dictionary).map((key) => this.dictionary[key] as U);
    }

    public clear() {
        this.dictionary = {};
    }

    public [Symbol.iterator](): Iterator<U> {
        let counter = 0;
        const list = this.dictionary;

        return {
            next(): IteratorResult<U> {
                return {
                    done: counter === Object.keys(list).length,
                    value: list[Object.keys(list)[counter++]]
                };
            }
        };
    }

    public serialize<V = U>(): IDictionary<V> {
        const saveObject: { [x: string]: any } = {};
        const keys = this.keys();
        for (const key of keys) {
            const entry = this.get(key);
            if (entry && 'serialize' in entry && (entry as any).serialize)
                saveObject[key] = (entry as any).serialize() as any;
            else
                saveObject[key] = entry;
        }
        return saveObject;
    }

    public deserialize<V = U>(saveObject: IDictionary<V>, objectConstructor?: new (...args: any[]) => any, ...args: any[]) {
        const keys = Object.keys(saveObject);
        this.clear();
        for (const key of keys) {
            let entry: any = saveObject[key];
            if (objectConstructor) {
                entry = new (Function.prototype.bind.apply(objectConstructor, [args]))();
                if ((entry as any).deserialize)
                    entry.deserialize(saveObject[key]);
            }
            else
                this.set(key as T, entry);
        }
    }
}
