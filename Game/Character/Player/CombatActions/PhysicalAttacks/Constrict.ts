import { randInt } from '../../../../../Engine/Utilities/SMath';
import { LegType } from '../../../../Body/Legs';
import { Character } from '../../../../Character/Character';
import { Player } from '../../Player';
import { PlayerPhysicalAction } from '../PlayerPhysicalAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Constrict extends PlayerPhysicalAction {
    public name: string = "Constrict";
    public readonly baseCost: number = 10;

    public isPossible(player: Player): boolean {
        return player.body.legs.type === LegType.NAGA;
    }

    public canUse(player: Player, monster: Character): boolean {
        if (player.stats.fatigue + this.physicalCost(player) <= 100) {
            this.reasonCannotUse = "You just don't have the energy to wrap yourself so tightly around someone right now...";
            return false;
        }
        // Cannot be used on plural enemies
        if (monster.desc.plural) {
            this.reasonCannotUse = "You launch yourself at " + monster.desc.a + monster.desc.short + ", but with multiple enemies, wrapping one up would leave you completely open to attack.  You hastily slither backwards before you expose yourself to danger.";
            return false;
        }
        if (monster.desc.short === "pod") {
            this.reasonCannotUse = "You can't constrict something you're trapped inside of!";
            return false;
        }
        return true;
    }

    public checkMiss(char: Character, enemy: Character): boolean {
        return randInt(char.stats.spe + 40) <= enemy.stats.spe;
    }

    public missed(char: Character, enemy: Character): void {
        // Failure (-10 HPs) -
        CView.clear();
        CView.text("You launch yourself at your opponent and attempt to wrap yourself around " + enemy.desc.objectivePronoun + ". Before you can even get close enough, " + enemy.desc.a + enemy.desc.short + " jumps out of the way, causing you to fall flat on your face. You quickly pick yourself up and jump back.");
        char.combat.stats.loseHP(5);

    }

    public applyDamage(char: Character, enemy: Character, damage: number, lust: number, crit: boolean): void {
        CView.clear();
        CView.text("You launch yourself at " + enemy.desc.a + enemy.desc.short + " and wrap yourself around " + enemy.desc.objectivePronoun + ". You squeeze " + enemy.desc.objectivePronoun + " tightly and hear " + enemy.desc.objectivePronoun + " cry out in pain.");
        enemy.combat.effects.add(CombatEffectType.Constricted, char, {
            duration: 1 + randInt(4)
        });
    }
}
