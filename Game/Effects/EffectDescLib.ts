import { Dictionary } from "../../Engine/Utilities/Dictionary";
import { EffectDesc } from "./EffectDesc";

class EffectDescDict extends Dictionary<string, EffectDesc> {
    public get(name: string): EffectDesc {
        if (this.has(name))
            return super.get(name)!;
        else
            return new EffectDesc(name, name, '');
    }
}

export const EffectDescLib = new EffectDescDict();
