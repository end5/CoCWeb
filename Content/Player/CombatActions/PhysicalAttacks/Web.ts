import { randInt } from 'Engine/Utilities/SMath';
import { Tail, TailType } from 'Engine/Body/Tail';
import { Character } from 'Content/Character/GameCharacter';
import { EffectType } from 'Content/Effects/EffectType';
import { NextScreenChoices } from 'Engine/ScreenDisplay';
import { Player } from '../../Player';
import { ICombatAction } from 'Engine/Combat/Actions/ICombatAction';
import { CView } from 'Engine/Display/ContentView';
import { CombatAbilityFlag } from 'Engine/Effects/CombatAbilityFlag';

export class Web implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.PhysSpec;
    public name: string = "Web";
    public reasonCannotUse: string = "You do not have enough webbing to shoot right now!";
    public actions: ICombatAction[] = [];

    public isPossible(player: Player): boolean {
        return player.body.tails.reduce(Tail.HasType(TailType.SPIDER_ABDOMEN), false);
    }

    public canUse(player: Player): boolean {
        return player.body.tails.filter(Tail.FilterType(TailType.SPIDER_ABDOMEN))[0].venom >= 33;
    }

    public use(player: Player, monster: Character): void | NextScreenChoices {
        CView.clear();
        player.body.tails.filter(Tail.FilterType(TailType.SPIDER_ABDOMEN))[0].venom -= 33;
        // Amily!
        if (monster.effects.has(EffectType.Concentration)) {
            CView.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        // Blind
        if (player.effects.has(EffectType.Blind)) {
            CView.text("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ");
        }
        else CView.text("Turning and clenching muscles that no human should have, you expel a spray of sticky webs at " + monster.desc.a + monster.desc.short + "!  ");
        // Determine if dodged!
        if ((player.effects.has(EffectType.Blind) && randInt(2) === 0) ||
            (monster.stats.spe - player.stats.spe > 0 && randInt(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80)) {
            CView.text("You miss " + monster.desc.a + monster.desc.short + " completely - ");
            CView.text(monster.desc.subjectivePronoun + " moved out of the way!\n\n");
            return;
        }
        // Over-webbed
        if (monster.stats.spe < 1) {
            if (!monster.desc.plural) CView.text(monster.desc.capitalA + monster.desc.short + " is completely covered in webbing, but you hose " + monster.desc.objectivePronoun + " down again anyway.");
            else CView.text(monster.desc.capitalA + monster.desc.short + " are completely covered in webbing, but you hose them down again anyway.");
        }
        // LAND A HIT!
        else {
            if (!monster.desc.plural) CView.text("The adhesive strand(s cover " + monster.desc.a + monster.desc.short + " with restrictive webbing, greatly slowing " + monster.desc.objectivePronoun + ".");
            else CView.text("The adhesive strand(s cover " + monster.desc.a + monster.desc.short + " with restrictive webbing, greatly slowing " + monster.desc.objectivePronoun + ".");
            monster.stats.spe -= 45;
            if (monster.stats.spe < 0) monster.stats.spe = 0;
        }
        CView.text("\n\n");
    }
}
