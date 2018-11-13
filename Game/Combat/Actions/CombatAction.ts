import { Character } from '../../Character/Character';
import { CombatActionFlags } from '../../Effects/CombatActionFlag';

export interface IActionDamage {
    damage?: number;
    lust?: number;
    crit?: boolean;
}

export abstract class CombatAction {
    public abstract name: string;
    public abstract flag: CombatActionFlags;
    public abstract reasonCannotUse: string;
    public abstract subActions: CombatAction[];
    public abstract isPossible(character: Character): boolean;
    public abstract canUse(character: Character, target: Character): boolean;

    protected consumeComponents?(char: Character, enemy: Character): void;
    protected useAction?(char: Character, enemy: Character): void;
    protected checkMiss?(char: Character, enemy: Character): boolean;
    protected missed?(char: Character, enemy: Character): void;
    protected calcDamage?(char: Character, enemy: Character): void | IActionDamage;
    protected applyDamage?(char: Character, enemy: Character, damage: number, lust: number, crit: boolean): void;
    public use(char: Character, enemy: Character): void {
        const reaction = enemy.combat.reactions.get(this.name);
        let miss = false;
        if (reaction && reaction.beforeConsumeComponents)
            if (!reaction.beforeConsumeComponents(enemy, char)) return;

        if (this.consumeComponents)
            this.consumeComponents(char, enemy);

        if (reaction && reaction.beforeUseAction)
            if (!reaction.beforeUseAction(enemy, char)) return;

        if (this.useAction)
            this.useAction(char, enemy);
        if (this.checkMiss)
            miss = this.checkMiss(char, enemy);

        if (miss) {
            if (reaction && reaction.beforeMissed)
                if (!reaction.beforeMissed(enemy, char)) return;

            if (this.missed)
                this.missed(char, enemy);
        }
        else {
            if (this.calcDamage) {
                const initialDamage = this.calcDamage(char, enemy) as (IActionDamage | undefined);

                let modifiedDamage: IActionDamage & { continue?: boolean } | undefined;
                if (reaction && reaction.beforeApplyDamage) {
                    modifiedDamage = reaction.beforeApplyDamage(enemy, char, initialDamage);
                }

                if (modifiedDamage && !modifiedDamage.continue) return;

                if (this.applyDamage) {
                    const damage = modifiedDamage && modifiedDamage.damage !== undefined ? modifiedDamage.damage : (initialDamage && initialDamage.damage !== undefined ? initialDamage.damage : 0);
                    const lust = modifiedDamage && modifiedDamage.lust !== undefined ? modifiedDamage.lust : (initialDamage && initialDamage.lust !== undefined ? initialDamage.lust : 0);

                    const crit = modifiedDamage && modifiedDamage.crit !== undefined ? modifiedDamage.crit : (initialDamage && initialDamage.crit !== undefined ? initialDamage.crit : false);

                    this.applyDamage(char, enemy, damage, lust, crit);
                }
            }
        }
    }
}

    // public consumeComponents(player: Character, monster: Character): void {
    // }

    // public useAction(player: Character, monster: Character): void {
    // }

    // public checkMiss(player: Character, monster: Character): boolean {
    // }

    // public missed(player: Character, monster: Character): void {
    // }

    // public calcDamage(player: Character, monster: Character): void | IActionDamage {
    // }

    // public applyDamage(player: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
    // }

/*
</ = can break order

call use
</ enemy reaction - usually instant counter
consume required components
</ enemy reaction - usually instant counter
use action
</ enemy reaction - usually instant counter
if miss
    </ enemy reaction to miss
    apply miss
else hit
    calc damage
    </ enemy reaction
    apply damage
*/
