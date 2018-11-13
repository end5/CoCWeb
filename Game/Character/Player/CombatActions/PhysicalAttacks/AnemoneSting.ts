import { randInt } from '../../../../../Engine/Utilities/SMath';
import { Character } from '../../../../Character/Character';
import { Player } from '../../Player';
import { CombatAction, IActionDamage } from '../../../../Combat/Actions/CombatAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';

export class AnemoneSting extends CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.PhysSpec;
    public name: string = "AnemoneSting";
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];

    public isPossible(player: Player): boolean {
        return player.body.hair.type === 4;
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public checkMiss(char: Character, enemy: Character): boolean {
        // -sting with hair (combines both bee-sting effects, but weaker than either one separately):
        // Fail!
        // 25% base fail chance
        // Increased by 1% for every point over PC's speed
        // Decreased by 1% for every inch of hair the PC has
        const hairLength: number = char.body.hair.length;
        let prob: number = 70;
        if (enemy.stats.spe > char.stats.spe)
            prob -= enemy.stats.spe - char.stats.spe;
        prob += hairLength;
        return prob <= randInt(101);
    }

    public missed(char: Character, enemy: Character): void {
        CView.clear();
        // -miss a sting
        if (enemy.desc.plural)
            CView.text("You rush " + enemy.desc.a + enemy.desc.short + ", whipping your hair around to catch them with your tentacles, but " + enemy.desc.subjectivePronoun + " easily dodge.  Oy, you hope you didn't just give yourself whiplash.");
        else
            CView.text("You rush " + enemy.desc.a + enemy.desc.short + ", whipping your hair around to catch it with your tentacles, but " + enemy.desc.subjectivePronoun + " easily dodges.  Oy, you hope you didn't just give yourself whiplash.");
        CView.text("\n\n");
    }

    public calcDamage(char: Character, enemy: Character): IActionDamage {
        const hairLength: number = char.body.hair.length;
        let damage: number = 0;
        let damageMultiplier: number = 1 + randInt(2);
        if (hairLength >= 12) damageMultiplier += 1 + randInt(2);
        if (hairLength >= 24) damageMultiplier += 1 + randInt(2);
        if (hairLength >= 36) damageMultiplier += 1;
        while (damageMultiplier > 0) {
            damageMultiplier--;
            damage += 5 + randInt(6);
        }
        damage += char.stats.level * 1.5;
        return { damage, lust: enemy.stats.lustVuln * damage };
    }

    public applyDamage(char: Character, enemy: Character, damage: number, lust: number, crit: boolean): void {
        CView.text("You rush " + enemy.desc.a + enemy.desc.short + ", whipping your hair around like a genie");
        CView.text(", and manage to land a few swipes with your tentacles.  ");
        if (enemy.desc.plural)
            CView.text("As the venom infiltrates " + enemy.desc.possessivePronoun + " bodies, " + enemy.desc.subjectivePronoun + " twitch and begin to move more slowly, hampered half by paralysis and half by arousal.");
        else
            CView.text("As the venom infiltrates " + enemy.desc.possessivePronoun + " body, " + enemy.desc.subjectivePronoun + " twitches and begins to move more slowly, hampered half by paralysis and half by arousal.");
        // (decrease speed/str, increase lust))
        // -venom capacity determined by hair length, 2-3 stings per level of lengthh
        // Each sting does 5-10 lust damage and 2.5-5 speed damagee
        enemy.stats.spe -= damage / 2;
        enemy.stats.lust += lust;
        // Clean up down to 1 decimal pointt
        damage = Math.round(damage * 10) / 10;
        CView.text(" (" + damage + ")");
        CView.text("\n\n");
    }
}
