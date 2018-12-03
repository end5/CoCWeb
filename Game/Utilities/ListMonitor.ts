import { IListObserver } from './IListObserver';
import { List } from 'Engine/Utilities/List';

export interface ObjectObserver<T> {
    observedObject: T;
}

/**
 * An IObserverList that reflects event changes from the observed List to the provided List.
 */
export class ListMonitor<ObservedType, U extends ObjectObserver<ObservedType>, ProvidedList extends List<U>> implements IListObserver<ObservedType> {
    protected list: ProvidedList;
    protected objectConstructor: new (item: ObservedType, ...args: any[]) => U;
    protected args: any[];
    public constructor(list: ProvidedList, objectConstructor: new (item: ObservedType, ...args: any[]) => U, ...args: any[]) {
        this.list = list;
        this.objectConstructor = objectConstructor;
        this.args = args;
    }

    public onAdd(item: ObservedType): void {
        this.list.add(new this.objectConstructor(item, ...this.args));
    }

    public onRemove(index: number): void {
        this.list.remove(index);
    }

    public onClear(): void {
        this.list.clear();
    }

    public update(message: string): void { }
}
