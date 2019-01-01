import { randInt } from 'Engine/Utilities/SMath';
import { LegType } from 'Engine/Body/Legs';
import { Tail, TailType } from 'Engine/Body/Tail';
import { Character } from 'Content/Character/GameCharacter';
import { Player } from '../../Player';
import { PlayerPhysicalAction } from '../PlayerPhysicalAction';
import { CView } from 'Page/ContentView';
import { EffectType } from 'Content/Effects/EffectType';
import { IActionDamage, CanUseResult } from 'Engine/Combat/Actions/CombatAction';

export class Kick extends PlayerPhysicalAction {
    public name = "Kick";
    public readonly baseCost = 15;

    public isPossible(player: Player): boolean {
        return player.body.legs.isTaur() || player.body.legs.type === LegType.HOOFED || player.body.legs.type === LegType.BUNNY || player.body.legs.type === LegType.KANGAROO;
    }

    public canUse(player: Player): CanUseResult {
        if (player.stats.fatigue + this.physicalCost(player) <= 100)
            return { canUse: true };
        return { canUse: false, reasonCannotUse: "You're too fatigued to use a charge attack!" };
    }

    public consumeComponents(player: Character, monster: Character): void {
        player.stats.fatiguePhysical(this.baseCost);
    }

    public useAction(player: Character, monster: Character): void {
        CView.clear();
        // Variant start messages!
        if (player.body.legs.type === LegType.KANGAROO) {
            // (tail)
            if (player.body.tails.find(Tail.FilterType(TailType.KANGAROO)))
                CView.text("You balance on your flexible kangaroo-tail, pulling both legs up before slamming them forward simultaneously in a brutal kick.  ");
            // (no tail)
            else
                CView.text("You balance on one leg and cock your powerful, kangaroo-like leg before you slam it forward in a kick.  ");
        }
        // (bunbun kick)
        else if (player.body.legs.type === LegType.BUNNY)
            CView.text("You leap straight into the air and lash out with both your furred feet simultaneously, slamming forward in a strong kick.  ");
        // (centaur kick)
        else if (player.body.legs.type === LegType.CENTAUR)
            CView.text("You lurch up onto your backlegs, lifting your forelegs from the ground a split-second before you lash them out in a vicious kick.  ");
        // (bipedal hoof-kick)
        else if (player.body.legs.type === LegType.HOOFED)
            CView.text("You twist and lurch as you raise a leg and slam your hoof forward in a kick.  ");

        // Blind
        if (player.effects.has(EffectType.Blind)) {
            CView.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ");
        }
    }

    public checkMiss(player: Character, monster: Character): boolean {
        return (player.effects.has(EffectType.Blind) && randInt(2) === 0) ||
            (monster.stats.spe - player.stats.spe > 0 && randInt(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80);
    }

    public missed(player: Character, monster: Character): void {
        CView.text(monster.desc.capitalA + monster.desc.short + " manage");
        if (!monster.desc.plural)
            CView.text("s");
        CView.text(" to dodge your kick!");
        CView.text("\n\n");
    }

    public calcDamage(player: Character, monster: Character): IActionDamage {
        let damage: number;
        // Determine damage
        // Base:
        damage = player.stats.str;
        // Leg bonus
        // Bunny - 20, Kangaroo - 35, 1 hoof = 30, 2 hooves = 40
        if (player.body.legs.type === LegType.CENTAUR) damage += 40;
        else if (player.body.legs.type === LegType.HOOFED) damage += 30;
        else if (player.body.legs.type === LegType.BUNNY) damage += 20;
        else if (player.body.legs.type === LegType.KANGAROO) damage += 35;
        // Start figuring enemy damage resistance
        let reduction: number = randInt(monster.stats.tou);
        // Add in enemy defense if needed
        reduction += monster.combat.defense();
        // Apply AND DONE!
        damage -= reduction;
        // Damage post processing!
        damage *= player.combat.attack(monster);
        return { damage };
    }

    public applyDamage(player: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        // (None yet!)
        if (damage > 0) damage = monster.combat.loseHP(damage);

        // BLOCKED
        if (damage <= 0) {
            damage = 0;
            CView.text(monster.desc.capitalA + monster.desc.short);
            if (monster.desc.plural) CView.text("'");
            else CView.text("s");
            CView.text(" defenses are too tough for your kick to penetrate!");
        }
        // LAND A HIT!
        else {
            CView.text(monster.desc.capitalA + monster.desc.short);
            if (!monster.desc.plural) CView.text(" reels from the damaging impact! (" + damage + ")");
            else CView.text(" reel from the damaging impact! (" + damage + ")");
        }
        CView.text("\n\n");
    }
}
