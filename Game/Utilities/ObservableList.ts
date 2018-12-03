import { IListObserver } from './IListObserver';
import { List } from 'Engine/Utilities/List';

export class ObservableList<T> extends List<T> {
    public readonly observers: List<IListObserver<T>> = new List();

    public add(item: T) {
        for (const observer of this.observers) {
            observer.onAdd(item);
        }
        super.add(item);
    }

    public remove(item: T) {
        for (const observer of this.observers) {
            observer.onRemove(item);
        }
        super.remove(item);
    }

    public clear() {
        for (const observer of this.observers) {
            observer.onClear();
        }
        super.clear();
    }
}
