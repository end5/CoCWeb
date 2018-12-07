import { Dictionary, IDictionary } from '../Engine/Utilities/Dictionary';

class FlagDict extends Dictionary<string, object> {
    private baseValues: IDictionary<object> = {};

    /**
     * Gets the entry at the key. If no entry is found, an empty object is returned.
     * @param key
     */
    public get<F extends object>(key: string): F {
        if (!this.has(key))
            this.dictionary[key] = {};
        return super.get(key) as F;
    }

    /**
     * Sets the key to entry. This is the default entry for the key.
     * @param key
     * @param entry
     */
    public set(key: string, entry: object) {
        this.baseValues[key] = entry;
        super.set(key, JSON.parse(JSON.stringify(entry)));
    }

    /**
     * Clears the dictionary and restores the default values.
     */
    public clear() {
        this.dictionary = JSON.parse(JSON.stringify(this.baseValues));
    }
}

export const Flags = new FlagDict();
