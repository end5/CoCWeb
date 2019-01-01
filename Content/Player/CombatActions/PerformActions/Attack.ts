import { randInt } from 'Engine/Utilities/SMath';
import { fatigueRecovery } from 'Content/Combat/CombatUtils';
import { EffectType } from 'Content/Effects/EffectType';
import { CombatAction, IActionDamage } from 'Engine/Combat/Actions/CombatAction';
import { Character } from 'Engine/Character/Character';
import { PlayerFlags } from 'Content/Player/PlayerFlags';
import { CView } from 'Engine/Display/ContentView';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export class Attack extends CombatAction {
    public name = "Attack";
    public type = CombatActionType.Attack;

    public consumeComponents(character: Character, monster: Character): void {
        if (!character.effects.has(EffectType.FirstAttack)) {
            CView.clear();
            fatigueRecovery(character);
        }
    }

    public useAction(character: Character, target: Character): void {
        if (character.effects.has(EffectType.DoubleAttack) && character.stats.spe >= 50 && PlayerFlags.DOUBLE_ATTACK_STYLE < 2) {
            if (character.effects.has(EffectType.FirstAttack))
                character.effects.removeByName(EffectType.FirstAttack);
            else {
                // Always!
                if (PlayerFlags.DOUBLE_ATTACK_STYLE === 0)
                    character.effects.create(EffectType.FirstAttack);
                // Alternate!
                else if (character.stats.str < 61 && PlayerFlags.DOUBLE_ATTACK_STYLE === 1)
                    character.effects.create(EffectType.FirstAttack);
            }
        }
    }

    public checkMiss(character: Character, monster: Character): boolean {
        return character.effects.has(EffectType.Blind);
    }

    public missed(character: Character, monster: Character): void {
        if (character.effects.has(EffectType.Blind))
            CView.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ");
        if (character.effects.has(EffectType.FirstAttack)) {
            this.use(character, monster);
        }
        else
            CView.text("\n");
    }

    public calcDamage(character: Character, monster: Character): IActionDamage {
        const crit = canCrit(character);
        let damage = determineDamage(character, monster, crit);
        if (character.effects.has(EffectType.HistoryFighter))
            damage *= 1.1;
        return { damage, crit };
    }

    public applyDamage(character: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        CView.text("You hit " + monster.desc.a + monster.desc.short + "! (" + damage + ")");
        if (crit) CView.text(" <b>*CRIT*</b>");
        monster.combat.loseHP(damage);
        if (character.effects.has(EffectType.FirstAttack)) {
            this.use(character, monster);
        }
        else
            CView.text("\n");
    }
}

function canCrit(character: Character): boolean {
    return randInt(100) <= 4 || (character.effects.has(EffectType.Tactician) && character.stats.int >= 50 && (character.stats.int - 50) / 5 > randInt(100));
}

function determineDamage(character: Character, enemy: Character, crit: boolean): number {
    let damage: number = 0;
    // Double Attack Hybrid Reductions
    if (
        character.effects.has(EffectType.DoubleAttack) &&
        character.stats.spe >= 50 &&
        character.stats.str > 61 &&
        PlayerFlags.DOUBLE_ATTACK_STYLE === 0
    ) {
        damage = 60.5;
    }
    else
        damage = character.stats.str;

    // Weapon addition!
    damage += character.inventory.weapon.attack;

    // Determine if critical hit!
    if (crit) {
        damage *= 1.75;
    }

    // Thunderous Strikes
    if (character.effects.has(EffectType.ThunderousStrikes) && character.stats.str >= 80)
        damage *= 1.2;

    damage = Math.round(damage);
    return damage;
}
