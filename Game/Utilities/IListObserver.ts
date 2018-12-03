/**
 * All notification take place after the event has happened.
 */
export interface IListObserver<EntryType> {
    onAdd(item: EntryType): void;
    onRemove(item: EntryType): void;
    onClear(): void;
}
