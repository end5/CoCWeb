import { randInt } from 'Engine/Utilities/SMath';
import { HornType } from 'Engine/Body/Horns';
import { Character } from 'Content/Character/GameCharacter';
import { EffectType } from 'Content/Effects/EffectType';
import { Player } from '../../Player';
import { PlayerPhysicalAction } from '../PlayerPhysicalAction';
import { CView } from 'Page/ContentView';
import { IActionDamage, CanUseResult } from 'Engine/Combat/Actions/CombatAction';

export class Gore extends PlayerPhysicalAction {
    public name = "Gore";
    public readonly baseCost = 15;

    public isPossible(player: Player): boolean {
        return player.body.horns.type === HornType.COW_MINOTAUR && player.body.horns.count >= 6;
    }

    public canUse(player: Player): CanUseResult {
        if (player.stats.fatigue + this.physicalCost(player) <= 100)
            return { canUse: true };
        return { canUse: false, reasonCannotUse: "You're too fatigued to use a charge attack!" };
    }

    public consumeComponents(char: Character, enemy: Character): void {
        char.stats.fatiguePhysical(this.baseCost);
    }

    public checkMiss(player: Character, monster: Character): boolean {
        // Bigger horns = better success chance.
        // Small horns - 60% hit
        let hitChance: number = 0;
        if (player.body.horns.count >= 6 && player.body.horns.count < 12) {
            hitChance = 60;
        }
        // bigger horns - 75% hit
        if (player.body.horns.count >= 12 && player.body.horns.count < 20) {
            hitChance = 75;
        }
        // huge horns - 90% hit
        if (player.body.horns.count >= 20) {
            hitChance = 80;
        }
        // Vala dodgy bitch!
        if (monster.desc.short === "Vala") {
            hitChance = 20;
        }
        // Account for monster speed - up to -50%.
        hitChance -= monster.stats.spe / 2;
        // Account for player speed - up to +50%
        hitChance += player.stats.spe / 2;
        return hitChance < randInt(100);
    }

    public missed(player: Character, monster: Character): void {
        // Special vala changes
        CView.text("You lower your head and charge " + monster.desc.a + monster.desc.short + ", only to be sidestepped at the last moment!");
        CView.text("\n\n");
    }

    public calcDamage(player: Character, monster: Character): IActionDamage {
        const horns = player.body.horns;
        let damage: number = 0;
        let crit = false;
        if (horns.count > 40) horns.count = 40;
        // normal
        if (randInt(4) > 0) {
            // As normal attack + horn length bonus
            damage = Math.floor(player.stats.str + horns.count * 2 - randInt(monster.stats.tou) - monster.combat.defense());
        }
        // CRIT
        else {
            // doubles horn bonus damage
            damage = Math.floor(player.stats.str + horns.count * 4 - randInt(monster.stats.tou) - monster.combat.defense());
            crit = true;
        }
        // Bonus damage for rut!
        if (player.effects.has(EffectType.Rut) && monster.body.cocks.length > 0) {
            damage += 5;
        }
        // Bonus per level damage
        damage += player.stats.level * 2;
        // Reduced by defense
        damage -= monster.combat.defense();
        if (damage < 0) damage = 5;
        // CAP 'DAT SHIT
        if (damage > player.stats.level * 10 + 100) damage = player.stats.level * 10 + 100;
        return { damage, crit };
    }

    public applyDamage(player: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        if (!crit) {
            CView.text("You lower your head and charge, skewering " + monster.desc.a + monster.desc.short + " on one of your bullhorns!  ");
        }
        // CRIT
        else {
            CView.text("You lower your head and charge, slamming into " + monster.desc.a + monster.desc.short + " and burying both your horns into " + monster.desc.objectivePronoun + "!  ");
        }
        // Bonus damage for rut!
        if (player.effects.has(EffectType.Rut) && monster.body.cocks.length > 0) {
            CView.text("The fury of your rut lent you strength, increasing the damage!  ");
        }
        if (damage > 0) {
            damage *= player.combat.attack(monster);
            damage = monster.combat.loseHP(damage);
        }
        // Different horn damage messages
        if (damage < 20) CView.text("You pull yourself free, dealing " + damage + " damage.");
        if (damage >= 20 && damage < 40) CView.text("You struggle to pull your horns free, dealing " + damage + " damage.");
        if (damage >= 40) CView.text("With great difficulty you rip your horns free, dealing " + damage + " damage.");
        CView.text("\n\n");
    }
}
