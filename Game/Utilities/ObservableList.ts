import { IListObserver } from './IListObserver';
import { List } from '../../Engine/Utilities/List';

export class ObservableList<T> extends List<T> {
    public readonly observers: List<IListObserver<T>> = new List();

    public add(item: T) {
        super.add(item);
        for (const observer of this.observers) {
            observer.onAdd(item);
        }
    }

    public remove(index: number) {
        super.remove(index);
        for (const observer of this.observers) {
            observer.onRemove(index);
        }
    }

    public clear() {
        super.clear();
        for (const observer of this.observers) {
            observer.onClear();
        }
    }
}
