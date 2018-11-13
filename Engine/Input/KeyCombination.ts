import { ISerializable } from '../../Engine/Utilities/ISerializable';

export interface IKeyCombination {
    keyCode: number;
    shiftKey: boolean;
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
}

export class KeyCombination implements ISerializable<IKeyCombination> {
    public keyCode: number = 0;
    public shiftKey: boolean = false;
    public altKey: boolean = false;
    public ctrlKey: boolean = false;
    public metaKey: boolean = false;

    public constructor(keyCode?: number) {
        if (keyCode)
            this.keyCode = keyCode;
    }

    public clone(): KeyCombination {
        const newKeyComb = new KeyCombination();
        newKeyComb.keyCode = this.keyCode;
        newKeyComb.shiftKey = this.shiftKey;
        newKeyComb.altKey = this.altKey;
        newKeyComb.ctrlKey = this.ctrlKey;
        newKeyComb.metaKey = this.metaKey;
        return newKeyComb;
    }

    public toString(): string {
        return (this.shiftKey ? "Shift + " : "") +
            (this.ctrlKey ? "Ctrl + " : "") +
            (this.altKey ? "Alt + " : "") +
            (this.metaKey ? "Meta + " : "") +
            String.fromCharCode(this.keyCode);
    }

    public serialize(): IKeyCombination {
        return {
            keyCode: this.keyCode,
            shiftKey: this.shiftKey,
            altKey: this.altKey,
            ctrlKey: this.ctrlKey,
            metaKey: this.metaKey
        };
    }

    public deserialize(saveObject: IKeyCombination) {
        if (saveObject.keyCode) {
            this.keyCode = saveObject.keyCode;
        }

        if (saveObject.shiftKey) {
            this.shiftKey = saveObject.shiftKey;
        }

        if (saveObject.altKey) {
            this.altKey = saveObject.altKey;
        }

        if (saveObject.ctrlKey) {
            this.ctrlKey = saveObject.ctrlKey;
        }

        if (saveObject.metaKey) {
            this.metaKey = saveObject.metaKey;
        }
    }
}
