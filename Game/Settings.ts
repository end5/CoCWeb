import { ISerializable } from '../Engine/Utilities/ISerializable';

export interface ISettings {
    customFontSize: number;
    lowStandards: boolean;
    hyperHappy: boolean;
    debug: boolean;
    easyMode: boolean;
    showSprites: boolean;
    sillyMode: boolean;
}

class Settings implements ISerializable<ISettings> {
    public customFontSize: number = 16;
    public lowStandards: boolean = false;
    public hyperHappy: boolean = false;
    public debug: boolean = false;
    public easyMode: boolean = false;
    public showSprites: boolean = false;
    public sillyMode: boolean = false;

    public silly(): boolean {
        return this.sillyMode;
    }

    public serialize(): ISettings {
        return {
            customFontSize: this.customFontSize,
            lowStandards: this.lowStandards,
            hyperHappy: this.hyperHappy,
            debug: this.debug,
            easyMode: this.easyMode,
            showSprites: this.showSprites,
            sillyMode: this.sillyMode
        };
    }

    public deserialize(saveObject: ISettings) {
        this.customFontSize = saveObject.customFontSize;
        this.lowStandards = saveObject.lowStandards;
        this.hyperHappy = saveObject.hyperHappy;
        this.debug = saveObject.debug;
        this.easyMode = saveObject.easyMode;
        this.showSprites = saveObject.showSprites;
        this.sillyMode = saveObject.sillyMode;
    }
}

const settings = new Settings();
export { settings as Settings };
