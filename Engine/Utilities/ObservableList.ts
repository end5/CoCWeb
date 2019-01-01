import { List } from 'Engine/Utilities/List';

interface ListEventListenerObject<T> {
    key: 'add' | 'remove';
    listener: ListEventListener<T>;
    beforeChange: boolean;
}

export type ListEventListener<T> = (value: T, index: number, list: ObservableList<T>) => void;

export class ObservableList<T> extends List<T> {
    public readonly listeners: ListEventListenerObject<T>[] = [];

    public add(item: T) {
        this.dispatch('add', item, this.length - 1, true);
        this.list.push(item);
        this.dispatch('add', item, this.length - 1, false);
    }

    public remove(index: number) {
        if (index < 0 || index >= this.list.length)
            throw new RangeError('List index out of bounds');

        this.dispatch('remove', this.get(index)!, index, true);
        const values = this.list.splice(index, 1);
        this.dispatch('remove', values[0], index, false);
    }

    public clear() {
        while (this.length > 0)
            this.remove(0);
    }

    public on(key: 'add' | 'remove', listener: ListEventListener<T>, beforeChange?: boolean) {
        this.listeners.push({ key, beforeChange: !!beforeChange, listener });
    }

    public dispatch(key: 'add' | 'remove', value: T, index: number, beforeChange?: boolean) {
        for (const entry of this.listeners)
            if (entry.key === key && entry.beforeChange === !!beforeChange)
                entry.listener(value, index, this);
    }

    public off(key: 'add' | 'remove', listener: ListEventListener<T>, beforeChange?: boolean) {
        const index = this.listeners.findIndex((entry) =>
            entry.key === key &&
            entry.listener === listener &&
            entry.beforeChange === !!beforeChange
        );
        if (index !== -1)
            this.listeners.splice(index, 1);
    }
}
