import { ISerializable } from 'Engine/Utilities/ISerializable';
import { IDictionary } from 'Engine/Utilities/Dictionary';

export interface IKeyItem {
    name: string;
    values?: IDictionary<any>;
}

export class KeyItem implements ISerializable<IKeyItem> {
    public constructor(public name: string = "Generic KeyItem", public values?: IDictionary<any>) {  }

    public serialize(): IKeyItem {
        if (this.values)
            return {
                name: this.name,
                values: this.values
            };
        return {
            name: this.name,
        };
    }

    public deserialize(saveObject: IKeyItem) {
        this.name = saveObject.name;
        if (saveObject.values)
            this.values = saveObject.values;
    }
}
