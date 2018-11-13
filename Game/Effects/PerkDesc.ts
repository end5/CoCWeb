import { EffectDesc } from "./EffectDescription";
import { Perk } from "./Perk";
import { Character } from "../Character/Character";

export class PerkDesc extends EffectDesc {
    public description(perk?: Perk, character?: Character): string {
        return super.description();
    }
}
