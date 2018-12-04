import { Effect } from "./Effect";
import { Character } from "Game/Character/Character";

export class EffectDesc {
    public readonly key: string;
    public readonly name: string;
    private readonly desc: string;
    public readonly longDesc: string;
    constructor(key: string, name: string, desc: string, longDesc?: string) {
        this.key = key;
        this.name = name;
        this.desc = desc || this.name;
        this.longDesc = longDesc || this.desc;
    }

    public description(effect?: Effect, char?: Character): string {
        return this.desc;
    }
}
