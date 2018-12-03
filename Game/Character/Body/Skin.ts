import { ISerializable } from 'Engine/Utilities/ISerializable';

export enum SkinType {
    PLAIN, FUR, SCALES, GOO, UNDEFINED
}

export interface ISkin {
    type: SkinType;
    tone: string;
    desc: string;
    adj: string;
}

export class Skin implements ISkin, ISerializable<ISkin> {
    public type: SkinType = SkinType.PLAIN;
    public tone: string = "albino";
    public desc: string = "skin";
    public adj: string = "";

    public serialize(): ISkin {
        return {
            type: this.type,
            tone: this.tone,
            desc: this.desc,
            adj: this.adj
        };
    }

    public deserialize(saveObject: ISkin) {
        this.type = saveObject.type;
        this.tone = saveObject.tone;
        this.desc = saveObject.desc;
        this.adj = saveObject.adj;
    }
}
