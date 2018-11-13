import { FlagType } from './FlagType';
import { Dictionary } from '../Engine/Utilities/Dictionary';

class FlagDict extends Dictionary<FlagType, object> {
    public get<F extends object>(key: FlagType): F {
        if (!this.has(key))
            this.dictionary[key] = {};
        return super.get(key) as F;
    }
}

export const Flags = new FlagDict();
