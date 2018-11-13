import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum WingType {
    NONE, BEE_LIKE_SMALL, BEE_LIKE_LARGE, HARPY, IMP, BAT_LIKE_TINY, BAT_LIKE_LARGE, SHARK_FIN, FEATHERED_LARGE, DRACONIC_SMALL, DRACONIC_LARGE, GIANT_DRAGONFLY
}

export interface IWings {
    type: WingType;
    desc: string;
}

export class Wings implements IWings, ISerializable<IWings> {
    public type: WingType = WingType.NONE;
    public desc: string = "non-existant";

    public serialize(): IWings {
        return {
            type: this.type,
            desc: this.desc
        };
    }

    public deserialize(saveObject: IWings) {
        this.type = saveObject.type;
        this.desc = saveObject.desc;
    }
}
