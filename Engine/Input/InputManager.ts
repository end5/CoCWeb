import { BindableAction } from './BindableAction';
import { DefaultKeyBinds } from './DefaultKeyBinds';
import { KeyPair } from './KeyPair';
import { List } from '../Utilities/List';
import { ISerializable } from 'Engine/Utilities/ISerializable';

export interface IInputManager {
    keyBinds: KeyPair[];
}

class InputManager implements ISerializable<IInputManager> {
    private keyBinds: List<KeyPair>;

    public reset(bindableAction: BindableAction) {
        const keyPair = this.keyBinds.get(bindableAction);
        if (keyPair) {
            const primaryKey = DefaultKeyBinds[bindableAction].primaryKey;
            if (primaryKey)
                keyPair.primaryKey = primaryKey.clone();
            else
                keyPair.primaryKey = undefined;

            const secondaryKey = DefaultKeyBinds[bindableAction].secondaryKey;
            if (secondaryKey)
                keyPair.secondaryKey = secondaryKey.clone();
            else
                keyPair.secondaryKey = undefined;
        }
    }

    public resetAll() {
        for (let index = 0; index < this.keyBinds.length; index++) {
            this.reset(index);
        }
    }

    public clear(bindableAction: BindableAction) {
        const keyPair = this.keyBinds.get(bindableAction);
        if (keyPair) {
            keyPair.primaryKey = undefined;
            keyPair.secondaryKey = undefined;
        }
    }

    public clearAll() {
        for (let index = 0; index < this.keyBinds.length; index++) {
            this.clear(index);
        }
    }

    public get(bindableAction: BindableAction): KeyPair | undefined {
        return this.keyBinds.get(bindableAction);
    }

    public constructor() {
        this.keyBinds = new List();
        this.initDefaultKeyBind(BindableAction.Stats);
        this.initDefaultKeyBind(BindableAction.LevelUp);
        this.initDefaultKeyBind(BindableAction.Quicksave1);
        this.initDefaultKeyBind(BindableAction.Quicksave2);
        this.initDefaultKeyBind(BindableAction.Quicksave3);
        this.initDefaultKeyBind(BindableAction.Quicksave4);
        this.initDefaultKeyBind(BindableAction.Quicksave5);
        this.initDefaultKeyBind(BindableAction.Quickload1);
        this.initDefaultKeyBind(BindableAction.Quickload2);
        this.initDefaultKeyBind(BindableAction.Quickload3);
        this.initDefaultKeyBind(BindableAction.Quickload4);
        this.initDefaultKeyBind(BindableAction.Quickload5);
        this.initDefaultKeyBind(BindableAction.MainMenu);
        this.initDefaultKeyBind(BindableAction.SaveLoad);
        this.initDefaultKeyBind(BindableAction.Appearance);
        this.initDefaultKeyBind(BindableAction.No);
        this.initDefaultKeyBind(BindableAction.Yes);
        this.initDefaultKeyBind(BindableAction.Perks);
        this.initDefaultKeyBind(BindableAction.Back);
        this.initDefaultKeyBind(BindableAction.CycleBackground);
        this.initDefaultKeyBind(BindableAction.Button0);
        this.initDefaultKeyBind(BindableAction.Button1);
        this.initDefaultKeyBind(BindableAction.Button2);
        this.initDefaultKeyBind(BindableAction.Button3);
        this.initDefaultKeyBind(BindableAction.Button4);
        this.initDefaultKeyBind(BindableAction.Button5);
        this.initDefaultKeyBind(BindableAction.Button6);
        this.initDefaultKeyBind(BindableAction.Button7);
        this.initDefaultKeyBind(BindableAction.Button8);
        this.initDefaultKeyBind(BindableAction.Button9);
    }

    private initDefaultKeyBind(bindableAction: BindableAction) {
        const keyPair = DefaultKeyBinds[bindableAction];
        if (keyPair) {
            let primaryKey = keyPair.primaryKey;
            if (primaryKey)
                primaryKey = primaryKey.clone();
            let secondaryKey = keyPair.secondaryKey;
            if (secondaryKey)
                secondaryKey = secondaryKey.clone();
            this.keyBinds.add(new KeyPair(primaryKey, secondaryKey));
        }
    }

    public serialize(): IInputManager {
        return { keyBinds: this.keyBinds.serialize() };
    }

    public deserialize(saveObject: IInputManager) {
        // tslint:disable-next-line:no-string-literal
        this.keyBinds.deserialize(saveObject.keyBinds, KeyPair);
    }
}

const inputManager = new InputManager();
export { inputManager as InputManager };
