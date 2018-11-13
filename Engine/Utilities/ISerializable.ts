export interface ISerializable<T extends object> {
    serialize(): T | void;
    deserialize(saveObject: T): void;
}
