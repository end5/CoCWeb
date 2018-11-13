import { ISerializable } from '../../Engine/Utilities/ISerializable';

export interface INeck {
    gills: boolean;
}

export class Neck implements INeck, ISerializable<INeck> {
    public gills: boolean = false;

    public serialize(): INeck {
        return {
            gills: this.gills,
        };
    }

    public deserialize(saveObject: INeck) {
        this.gills = saveObject.gills;
    }
}
