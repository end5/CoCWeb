import { randInt } from 'Engine/Utilities/SMath';
import { FaceType } from 'Engine/Body/Face';
import { Character } from 'Content/Character/GameCharacter';
import { CharacterType } from 'Engine/Character/CharacterType';
import { EffectType } from 'Content/Effects/EffectType';
import { NextScreenChoices } from 'Engine/ScreenDisplay';
import { Player } from '../../Player';
import { PlayerPhysicalAction } from '../PlayerPhysicalAction';
import { CView } from 'Page/ContentView';
import { mf } from 'Content/Descriptors/GenderDescriptor';

export class SpiderBite extends PlayerPhysicalAction {
    public name: string = "Bite";
    public reasonCannotUse: string = "You just don't have the energy to bite something right now...";
    public readonly baseCost: number = 10;

    public isPossible(player: Player): boolean {
        return player.body.face.type === FaceType.SPIDER_FANGS;
    }

    public canUse(player: Player): boolean {
        return player.stats.fatigue + this.physicalCost(player) <= 100;
    }

    public use(player: Player, monster: Character): void | NextScreenChoices {
        CView.clear();
        player.stats.fatiguePhysical(this.baseCost);
        // Amily!
        if (monster.effects.has(EffectType.Concentration)) {
            CView.text("Amily easily glides around your attack thanks to her complete concentration on your movements.");
            return;
        }
        if (monster.charType === CharacterType.LivingStatue) {
            CView.text("Your fangs can't even penetrate the giant's flesh.");
            return;
        }
        // Works similar to bee stinger, must be regenerated over time. Shares the same poison-meter
        if (randInt(player.stats.spe / 2 + 40) + 20 > monster.stats.spe / 1.5) {
            // (if monster = demons)
            if (monster.desc.short === "demons") CView.text("You look at the crowd for a moment, wondering which of their number you should bite. Your glance lands upon the leader of the group, easily spotted due to his snakeskin cloak. You quickly dart through the demon crowd as it closes in around you and lunge towards the broad form of the leader. You catch the demon off guard and sink your needle-like fangs deep into his flesh. You quickly release your venom and retreat before he, or the rest of the group manage to react.");
            // (Otherwise)
            else {
                if (!monster.desc.plural)
                    CView.text("You lunge at the foe headfirst, fangs bared. You manage to catch " + monster.desc.a + monster.desc.short + " off guard, your needle-like fangs penetrating deep into " + monster.desc.possessivePronoun + " body. You quickly release your venom, and retreat before " + monster.desc.a + monster.desc.subjectivePronoun + " manages to react.");
                else
                    CView.text("You lunge at the foes headfirst, fangs bared. You manage to catch one of " + monster.desc.a + monster.desc.short + " off guard, your needle-like fangs penetrating deep into " + monster.desc.possessivePronoun + " body. You quickly release your venom, and retreat before " + monster.desc.a + monster.desc.subjectivePronoun + " manage to react.");
            }
            // React
            if (monster.stats.lustVuln === 0) CView.text("  Your aphrodisiac toxin has no effect!");
            else {
                if (monster.desc.plural)
                    CView.text("  The one you bit flushes hotly, though the entire group seems to become more aroused in sympathy to their now-lusty compatriot.");
                else
                    CView.text("  " + mf(monster, "He", "She") + " flushes hotly and " + mf(monster, "touches his suddenly-stiff member, moaning lewdly for a moment.", "touches a suddenly stiff nipple, moaning lewdly.  You can smell her arousal in the air."));
                monster.stats.lust += 25 * monster.stats.lustVuln;
                if (randInt(5) === 0) monster.stats.lust += 25 * monster.stats.lustVuln;
            }
        }
        else {
            CView.text("You lunge headfirst, fangs bared. Your attempt fails horrendously, as " + monster.desc.a + monster.desc.short + " manages to counter your lunge, pushing you back out of range.");
        }
        CView.text("\n\n");
    }
}
