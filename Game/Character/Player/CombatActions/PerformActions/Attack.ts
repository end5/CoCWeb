import { randInt } from '../../../../../Engine/Utilities/SMath';
import { fatigueRecovery } from '../../../../Combat/CombatUtils';
import { PerkType } from '../../../../Effects/PerkType';
import { CombatAction, IActionDamage } from '../../../../Combat/Actions/CombatAction';
import { Character } from '../../../Character';
import { CView } from '../../../../../Page/ContentView';
import { PlayerFlags } from '../../PlayerFlags';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Attack extends CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Attack;
    public name: string = "Attack";
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return true;
    }

    public consumeComponents(character: Character, monster: Character): void {
        if (!character.combat.effects.has(CombatEffectType.FirstAttack)) {
            CView.clear();
            fatigueRecovery(character);
        }
    }

    public useAction(character: Character, target: Character): void {
        if (character.perks.has(PerkType.DoubleAttack) && character.stats.spe >= 50 && PlayerFlags.DOUBLE_ATTACK_STYLE < 2) {
            if (character.combat.effects.has(CombatEffectType.FirstAttack))
                character.combat.effects.remove(CombatEffectType.FirstAttack);
            else {
                // Always!
                if (PlayerFlags.DOUBLE_ATTACK_STYLE === 0)
                    character.combat.effects.add(CombatEffectType.FirstAttack, character);
                // Alternate!
                else if (character.stats.str < 61 && PlayerFlags.DOUBLE_ATTACK_STYLE === 1)
                    character.combat.effects.add(CombatEffectType.FirstAttack, character);
            }
        }
    }

    public checkMiss(character: Character, monster: Character): boolean {
        return character.combat.effects.has(CombatEffectType.Blind);
    }

    public missed(character: Character, monster: Character): void {
        if (character.combat.effects.has(CombatEffectType.Blind))
            CView.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ");
        if (character.combat.effects.has(CombatEffectType.FirstAttack)) {
            this.use(character, monster);
        }
        else
            CView.text("\n");
    }

    public calcDamage(character: Character, monster: Character): IActionDamage {
        const crit = canCrit(character);
        let damage = determineDamage(character, monster, crit);
        if (character.perks.has(PerkType.HistoryFighter))
            damage *= 1.1;
        return { damage, crit };
    }

    public applyDamage(character: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        CView.text("You hit " + monster.desc.a + monster.desc.short + "! (" + damage + ")");
        if (crit) CView.text(" <b>*CRIT*</b>");
        monster.combat.stats.loseHP(damage);
        if (character.combat.effects.has(CombatEffectType.FirstAttack)) {
            this.use(character, monster);
        }
        else
            CView.text("\n");
    }
}

function canCrit(character: Character): boolean {
    return randInt(100) <= 4 || (character.perks.has(PerkType.Tactician) && character.stats.int >= 50 && (character.stats.int - 50) / 5 > randInt(100));
}

function determineDamage(character: Character, enemy: Character, crit: boolean): number {
    let damage: number = 0;
    // Double Attack Hybrid Reductions
    if (
        character.perks.has(PerkType.DoubleAttack) &&
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
    if (character.perks.has(PerkType.ThunderousStrikes) && character.stats.str >= 80)
        damage *= 1.2;

    damage = Math.round(damage);
    return damage;
}
