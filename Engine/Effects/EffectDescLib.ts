import { Dictionary } from 'Engine/Utilities/Dictionary';
import { EffectDesc } from 'Engine/Effects/EffectDesc';

class EffectDescDict extends Dictionary<string, EffectDesc> {
    public add(key: string, name: string, desc: string, longDesc?: string) {
        this.set(key, new EffectDesc(key, name, desc, longDesc));
    }

    public get(name: string): EffectDesc {
        if (this.has(name))
            return super.get(name)!;
        else
            return new EffectDesc(name, name, '');
    }
}

export const EffectDescLib = new EffectDescDict();
