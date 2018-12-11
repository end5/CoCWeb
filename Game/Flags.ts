import { IDictionary } from '../Engine/Utilities/Dictionary';
import { ISerializable } from 'Engine/Utilities/ISerializable';

class FlagDict implements ISerializable<object> {
    private defaultFlags: IDictionary<object> = {};
    private flags: IDictionary<object> = {};

    /**
     * Registers a new flag object. This is the default entry for the key.
     * @param key
     * @param entry
     */
    public register<T extends object>(key: string, entry: T): T {
        this.flags[key] = entry;
        this.defaultFlags[key] = JSON.parse(JSON.stringify(entry));
        return entry;
    }

    /**
     * Resets the flags.
     */
    public reset() {
        this.overwriteFlags(JSON.parse(JSON.stringify(this.defaultFlags)));
    }

    private overwriteFlags(otherFlags: IDictionary<object>) {
        for (const key of Object.keys(this.flags)) {
            for (const valueKey of Object.keys(this.flags[key])) {
                (this.flags[key] as any)[valueKey] = (otherFlags[key] as any)[valueKey];
            }
        }
    }

    public serialize(): IDictionary<object> {
        return this.flags;
    }

    public deserialize(saveObject: IDictionary<object>) {
        this.overwriteFlags(saveObject);
    }
}

export const Flags = new FlagDict();
