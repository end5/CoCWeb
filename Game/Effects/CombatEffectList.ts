import { CombatActionType } from '../Combat/Actions/CombatActionType';
import { CombatEffect } from './CombatEffect';
import { CombatEffectConstructorLib } from './CombatEffectConstructorLib';
import { CombatEffectType } from './CombatEffectType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { Character } from '../Character/Character';
import { ICombatEffectValues } from './CombatEffectValues';

export class CombatEffectList extends Dictionary<CombatEffectType, CombatEffect> {
    private character: Character;
    public constructor(character: Character) {
        super();
        this.character = character;
    }

    public add(type: CombatEffectType, inflictedBy: Character, values?: ICombatEffectValues) {
        let newEffect;

        const effectConstr = CombatEffectConstructorLib.get(type);
        if (effectConstr) {
            newEffect = new effectConstr(type, inflictedBy, values);
        }
        newEffect = new CombatEffect(type, inflictedBy, values);

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

    public get combatAbilityFlag(): CombatActionType {
        let flag = CombatActionType.None;
        let effect;
        for (const key of this.keys()) {
            effect = this.get(key);
            if (effect)
                flag &= effect.values.blockedTypes;
        }
        return flag;
    }
}
