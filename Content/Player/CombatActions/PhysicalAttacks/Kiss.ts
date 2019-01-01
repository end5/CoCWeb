import { randInt } from 'Engine/Utilities/SMath';
import { Character } from 'Content/Character/GameCharacter';
import { EffectType } from 'Content/Effects/EffectType';
import { NextScreenChoices } from 'Engine/ScreenDisplay';
import { Player } from '../../Player';
import { CanUseResult, CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { CView } from 'Page/ContentView';
import { mf } from 'Content/Descriptors/GenderDescriptor';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export class Kiss extends CombatAction {
    public name = "Kiss";
    public flags = CombatActionType.PhysSpec;

    public isPossible(player: Player): boolean {
        return player.effects.has(EffectType.LustStickApplied);
    }

    public canUse(player: Player): CanUseResult {
        if (!player.effects.has(EffectType.Blind))
            return { canUse: true };
        return { canUse: false, reasonCannotUse: "There's no way you'd be able to find their lips while you're blind!" };
    }

    public use(player: Player, monster: Character): void | NextScreenChoices {
        CView.clear();
        switch (randInt(6)) {
            case 1:
                // Attack text 1:
                CView.text("You hop up to " + monster.desc.a + monster.desc.short + " and attempt to plant a kiss on " + monster.desc.possessivePronoun + ".");
                break;
            // Attack text 2:
            case 2:
                CView.text("You saunter up and dart forward, puckering your golden lips into a perfect kiss.");
                break;
            // Attack text 3:
            case 3:
                CView.text("Swaying sensually, you wiggle up to " + monster.desc.a + monster.desc.short + " and attempt to plant a nice wet kiss on " + monster.desc.objectivePronoun + ".");
                break;
            // Attack text 4:
            case 4:
                CView.text("Lunging forward, you fly through the air at " + monster.desc.a + monster.desc.short + " with your lips puckered and ready to smear drugs all over " + monster.desc.objectivePronoun + ".");
                break;
            // Attack text 5:
            case 5:
                CView.text("You lean over, your lips swollen with lust, wet with your wanting slobber as you close in on " + monster.desc.a + monster.desc.short + ".");
                break;
            // Attack text 6:
            default:
                CView.text("Pursing your drug-laced lips, you close on " + monster.desc.a + monster.desc.short + " and try to plant a nice, wet kiss on " + monster.desc.objectivePronoun + ".");
                break;
        }
        // Dodged!
        if (monster.stats.spe - player.stats.spe > 0 && randInt(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80) {
            switch (randInt(3)) {
                // Dodge 1:
                case 1:
                    if (monster.desc.plural)
                        CView.text("  " + monster.desc.capitalA + monster.desc.short + " sees it coming and moves out of the way in the nick of time!\n\n");
                    break;
                // Dodge 2:
                case 2:
                    if (monster.desc.plural) CView.text("  Unfortunately, you're too slow, and " + monster.desc.a + monster.desc.short + " slips out of the way before you can lay a wet one on one of them.\n\n");
                    else CView.text("  Unfortunately, you're too slow, and " + monster.desc.a + monster.desc.short + " slips out of the way before you can lay a wet one on " + monster.desc.objectivePronoun + ".\n\n");
                    break;
                // Dodge 3:
                default:
                    if (monster.desc.plural) CView.text("  Sadly, " + monster.desc.a + monster.desc.short + " moves aside, denying you the chance to give one of them a smooch.\n\n");
                    else CView.text("  Sadly, " + monster.desc.a + monster.desc.short + " moves aside, denying you the chance to give " + monster.desc.objectivePronoun + " a smooch.\n\n");
                    break;
            }
            return;
        }
        // Success but no effect:
        if (monster.stats.lustVuln <= 0 || monster.body.cocks.length <= 0) {
            if (monster.desc.plural) CView.text("  Mouth presses against mouth, and you allow your tongue to stick out to taste the saliva of one of their number, making sure to give them a big dose.  Pulling back, you look at " + monster.desc.a + monster.desc.short + " and immediately regret wasting the time on the kiss.  It had no effect!\n\n");
            else CView.text("  Mouth presses against mouth, and you allow your tongue to stick to taste " + monster.desc.possessivePronoun + "'s saliva as you make sure to give them a big dose.  Pulling back, you look at " + monster.desc.a + monster.desc.short + " and immediately regret wasting the time on the kiss.  It had no effect!\n\n");
            return;
        }
        let damage: number = 0;
        switch (randInt(4)) {
            // Success 1:
            case 1:
                if (monster.desc.plural) CView.text("  Success!  A spit-soaked kiss lands right on one of their mouths.  The victim quickly melts into your embrace, allowing you to give them a nice, heavy dose of sloppy oral aphrodisiacs.\n\n");
                else CView.text("  Success!  A spit-soaked kiss lands right on " + monster.desc.a + monster.desc.short + "'s mouth.  " + mf(monster, "He", "She") + " quickly melts into your embrace, allowing you to give them a nice, heavy dose of sloppy oral aphrodisiacs.\n\n");
                damage = 15;
                break;
            // Success 2:
            case 2:
                if (monster.desc.plural) CView.text("  Gold-gilt lips press into one of their mouths, the victim's lips melding with yours.  You take your time with your suddenly cooperative captive and make sure to cover every bit of their mouth with your lipstick before you let them go.\n\n");
                else CView.text("  Gold-gilt lips press into " + monster.desc.a + monster.desc.short + ", " + monster.desc.possessivePronoun + " mouth melding with yours.  You take your time with your suddenly cooperative captive and make sure to cover every inch of " + monster.desc.possessivePronoun + " with your lipstick before you let " + monster.desc.objectivePronoun + " go.\n\n");
                damage = 20;
                break;
            // CRITICAL SUCCESS (3)
            case 3:
                if (monster.desc.plural)
                    CView.text("  You slip past " + monster.desc.a + monster.desc.short + "'s guard and press your lips against one of them.  " + mf(monster, "He", "She") + " melts against you, " + mf(monster, "his", "her") + " tongue sliding into your mouth as " + mf(monster, "he", "she") + " quickly succumbs to the fiery, cock-swelling kiss.  It goes on for quite some time.  Once you're sure you've given a full dose to " + mf(monster, "his", "her") + " mouth, you break back and observe your handwork.  One of " + monster.desc.a + monster.desc.short + " is still standing there, licking " + mf(monster, "his", "her") + " his lips while " + mf(monster, "his", "her") + " dick is standing out, iron hard.  You feel a little daring and give the swollen meat another moist peck, glossing the tip in gold.  There's no way " + mf(monster, "he", "she") + " will go soft now.  Though you didn't drug the rest, they're probably a little 'heated up' from the show.\n\n");
                else
                    CView.text("  You slip past " + monster.desc.a + monster.desc.short + "'s guard and press your lips against " + monster.desc.possessivePronoun + ".  " + mf(monster, "He", "She") + " melts against you, " + monster.desc.possessivePronoun + " tongue sliding into your mouth as " + monster.desc.subjectivePronoun + " quickly succumbs to the fiery, cock-swelling kiss.  It goes on for quite some time.  Once you're sure you've given a full dose to " + monster.desc.possessivePronoun + " mouth, you break back and observe your handwork.  " + monster.desc.capitalA + monster.desc.short + " is still standing there, licking " + monster.desc.possessivePronoun + " lips while " + monster.desc.possessivePronoun + " dick is standing out, iron hard.  You feel a little daring and give the swollen meat another moist peck, glossing the tip in gold.  There's no way " + monster.desc.subjectivePronoun + " will go soft now.\n\n");
                damage = 30;
                break;
            // Success 4:
            default:
                CView.text("  With great effort, you slip through an opening and compress their lips against your own, lust seeping through the oral embrace along with a heavy dose of drugs.\n\n");
                damage = 12;
                break;
        }
        // Add status if not already drugged
        if (!monster.effects.has(EffectType.LustStick))
            monster.effects.create(EffectType.LustStick);
        // Else add bonus to round damage
        else monster.effects.get(EffectType.LustStick).value2 = Math.round(damage / 10);
        // Deal damage
        monster.stats.lust += Math.round(monster.stats.lustVuln * damage);
        // Sets up for end of combat, and if not, goes to AI.
    }
}
