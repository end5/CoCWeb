import { CombatActionFlags } from './CombatActionFlag';
import { CombatEffect } from './CombatEffect';
import { CombatEffectConstructorLib, AbilityFlagsLib } from './CombatEffectLib';
import { CombatEffectType } from './CombatEffectType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { Character } from '../Character/Character';
import { IEffectValues } from './EffectValues';

export class CombatEffectList extends Dictionary<CombatEffectType, CombatEffect> {
    private character: Character;
    public constructor(character: Character) {
        super();
        this.character = character;
    }

    public add(type: CombatEffectType, inflictedBy: Character, values?: IEffectValues) {
        let newEffect;
        const abilityFlag = AbilityFlagsLib.has(type) ? CombatActionFlags.All : AbilityFlagsLib.get(type);
        const effectConstr = CombatEffectConstructorLib.get(type);
        if (abilityFlag && effectConstr) {
            newEffect = new effectConstr(type, abilityFlag, inflictedBy, values);
        }
        newEffect = new CombatEffect(type, abilityFlag, inflictedBy, values);
        this.set(type, newEffect);
        newEffect.onAdd(this.character);
    }

    public remove(type: CombatEffectType) {
        const effect = this.get(type);
        if (effect) {
            effect.onRemove(this.character);
        }
        super.remove(type);
    }

    public clear() {
        for (const key of this.keys()) {
            this.remove(key);
        }
        super.clear();
    }

    public get combatAbilityFlag(): CombatActionFlags {
        let flag = CombatActionFlags.All;
        let effect;
        for (const key of this.keys()) {
            effect = this.get(key);
            if (effect)
                flag &= effect.abilityFlag;
        }
        return flag;
    }
}
