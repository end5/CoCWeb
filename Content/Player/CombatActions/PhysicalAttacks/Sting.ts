import { randInt } from 'Engine/Utilities/SMath';
import { Tail, TailType } from 'Engine/Body/Tail';
import { Character } from 'Content/Character/GameCharacter';
import { EffectType } from 'Content/Effects/EffectType';
import { NextScreenChoices } from 'Engine/ScreenDisplay';
import { Player } from '../../Player';
import { ICombatAction } from 'Engine/Combat/Actions/ICombatAction';
import { CView } from 'Engine/Display/ContentView';
import { CombatAbilityFlag } from 'Engine/Effects/CombatAbilityFlag';

export class Sting implements ICombatAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.PhysSpec;
    public name: string = "Sting";
    public reasonCannotUse: string = "You do not have enough venom to sting right now!";
    public actions: ICombatAction[] = [];

    public isPossible(player: Player): boolean {
        return player.body.tails.reduce(Tail.HasType(TailType.BEE_ABDOMEN), false);
    }

    public canUse(player: Player): boolean {
        return player.body.tails.filter(Tail.FilterType(TailType.BEE_ABDOMEN))[0].venom >= 33;
    }

    public use(player: Player, monster: Character): void | NextScreenChoices {
        CView.clear();
        // Worms are immune!
        if (monster.desc.short === "worms") {
            CView.text("Taking advantage of your new natural weapons, you quickly thrust your stinger at the freak of nature. Sensing impending danger, the creature willingly drops its cohesion, causing the mass of worms to fall to the ground with a sick, wet 'thud', leaving you to stab only at air.\n\n");
            return;
        }
        // Determine if dodged!
        // Amily!
        if (monster.effects.has(EffectType.Concentration)) {
            CView.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        if (monster.stats.spe - player.stats.spe > 0 && randInt(((monster.stats.spe - player.stats.spe) / 4) + 80) > 80) {
            if (monster.stats.spe - player.stats.spe < 8)
                CView.text(monster.desc.capitalA + monster.desc.short + " narrowly avoids your stinger!\n\n");
            if (monster.stats.spe - player.stats.spe >= 8 && monster.stats.spe - player.stats.spe < 20)
                CView.text(monster.desc.capitalA + monster.desc.short + " dodges your stinger with superior quickness!\n\n");
            if (monster.stats.spe - player.stats.spe >= 20)
                CView.text(monster.desc.capitalA + monster.desc.short + " deftly avoids your slow attempts to sting " + monster.desc.objectivePronoun + ".\n\n");
            return;
        }
        // determine if avoided with defense.
        if (monster.combat.defense() - player.stats.level >= 10 && randInt(4) > 0) {
            CView.text("Despite your best efforts, your sting attack can't penetrate " + monster.desc.a + monster.desc.short + "'s defenses.\n\n");
            return;
        }
        // Sting successful!
        CView.text("Searing pain lances through " + monster.desc.a + monster.desc.short + " as you manage to sting " + monster.desc.objectivePronoun + "!  ");
        if (monster.desc.plural) CView.text("You watch as " + monster.desc.subjectivePronoun + " stagger back a step and nearly trip, flushing hotly.");
        else CView.text("You watch as " + monster.desc.subjectivePronoun + " staggers back a step and nearly trips, flushing hotly.");
        // Tabulate damage!
        let damage: number = 35 + randInt(player.stats.lib / 10);
        // Level adds more damage up to a point (level 20)
        if (player.stats.level < 10) damage += player.stats.level * 3;
        else if (player.stats.level < 20) damage += 30 + (player.stats.level - 10) * 2;
        else damage += 50;
        monster.stats.lust += monster.stats.lustVuln * damage;
        if (!monster.effects.has(EffectType.lustvenom))
            monster.effects.add(EffectType.lustvenom, 0, 0, 0, 0);
        /* IT used to paralyze 50% of the time, this is no longer the case!
        Paralise the other 50%!
        else {
            CView.text("Searing pain lances through " + monster.desc.a+ monster.desc.short + " as you manage to sting " + monster.desc.objectivePronoun + "!  ");
            if(monster.desc.short === "demons") CView.text("You watch as " + monster.desc.subjectivePronoun + " stagger back a step and nearly trip, finding it hard to move as " + monster.desc.subjectivePronoun + " are afflicted with your paralytic venom.  ");
            else CView.text("You watch as " + monster.desc.subjectivePronoun + " staggers back a step and nearly trips, finding it hard to move as " + monster.desc.subjectivePronoun + " is afflicted with your paralytic venom.  ");
            if(monster.desc.short === "demons") CView.text("It appears that " + monster.desc.a+ monster.desc.short + " are weaker and slower.");
            else CView.text("It appears that " + monster.desc.a+ monster.desc.short + " is weaker and slower.");
            monster.str -= (5+randInt(player.lib/5))
            monster.stats.spe -= (5+randInt(player.lib/5))
            if(monster.str < 1) monster.str = 1;
            if(monster.stats.spe < 1) monster.stats.spe = 1;
        }*/
        // New line before monster attack
        CView.text("\n\n");
        // Use tail mp
        player.body.tails.filter(Tail.FilterType(TailType.BEE_ABDOMEN))[0].venom -= 25;
    }
}
