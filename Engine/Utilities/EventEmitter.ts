interface EventListenerInfo<T> {
    key: string;
    listener: EventListener<T>;
}

export type EventListener<T> = (target: T) => void;

export class EventEmitter<K extends string, T> {
    public readonly listeners: EventListenerInfo<T>[] = [];

    public on(key: K, listener: EventListener<T>) {
        this.listeners.push({ key, listener });
    }

    public dispatch(key: K, value: T) {
        for (const entry of this.listeners)
            if (entry.key === key)
                entry.listener(value);
    }

    public off(key: K, listener: EventListener<T>) {
        const index = this.listeners.findIndex((entry) =>
            entry.key === key && entry.listener === listener
        );
        if (index !== -1)
            this.listeners.splice(index, 1);
    }
}
