import { KeyCombination, IKeyCombination } from './KeyCombination';
import { ISerializable } from '../../Engine/Utilities/ISerializable';

export interface IKeyPair {
    primaryKey?: IKeyCombination;
    secondaryKey?: IKeyCombination;
}

export class KeyPair implements ISerializable<IKeyPair> {
    public primaryKey?: KeyCombination;
    public secondaryKey?: KeyCombination;
    public constructor(primaryKey?: KeyCombination, secondaryKey?: KeyCombination) {
        this.primaryKey = primaryKey;
        this.secondaryKey = secondaryKey;
    }

    public serialize(): IKeyPair {
        return {
            primaryKey: this.primaryKey ? this.primaryKey.serialize() : undefined,
            secondaryKey: this.secondaryKey ? this.secondaryKey.serialize() : undefined
        };
    }

    public deserialize(saveObject: IKeyPair) {
        if (!this.primaryKey)
            this.primaryKey = new KeyCombination();
        if (saveObject.primaryKey)
            this.primaryKey.deserialize(saveObject.primaryKey);

        if (!this.secondaryKey)
            this.secondaryKey = new KeyCombination();
        if (saveObject.secondaryKey)
            this.secondaryKey.deserialize(saveObject.secondaryKey);

    }
}
