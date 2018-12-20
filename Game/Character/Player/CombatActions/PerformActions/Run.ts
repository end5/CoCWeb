import { randInt } from 'Engine/Utilities/SMath';
import { BreastRow } from 'Game/Character/Body/BreastRow';
import { EarType } from 'Game/Character/Body/Ears';
import { Tail, TailType } from 'Game/Character/Body/Tail';
import { EffectType } from 'Game/Effects/EffectType';
import { Character } from 'Game/Character/Character';
import { CombatAction } from 'Game/Combat/Actions/CombatAction';
import { CView } from 'Page/ContentView';
import { describeLegs } from 'Game/Descriptors/LegDescriptor';
import { describeBalls } from 'Game/Descriptors/BallsDescriptor';
import { describeHips } from 'Game/Descriptors/HipDescriptor';
import { describeButt } from 'Game/Descriptors/ButtDescriptor';
import { describeChest } from 'Game/Descriptors/BreastDescriptor';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';

export class Run extends CombatAction {
    public name = "Run";
    public type = CombatActionType.MoveAway;

    public use(character: Character, target: Character): void {
        CView.clear();
        // Rut doesnt let you run from dicks.
        if (character.effects.has(EffectType.Rut) && target.body.cocks.length > 0) {
            CView.text("The thought of another male in your area competing for all the pussy infuriates you!  No way will you run!");
            return;
        }
        if (character.canFly()) CView.text("Gritting your teeth with effort, you beat your wings quickly and lift off!  ");
        // Nonflying PCs
        else {
            // Stuck!
            if (character.effects.has(EffectType.NoFlee)) {
                if (target.desc.short === "goblin")
                    CView.text("You try to flee but get stuck in the sticky white goop surrounding you.\n\n");
                else
                    CView.text("You put all your skills at running to work and make a supreme effort to escape, but are unable to get away!\n\n");
                return;
            }
            // Nonstuck!
            else CView.text("You turn tail and attempt to flee!  ");
        }

        // Calculations
        let escapeMod: number = 20 + target.stats.level * 3;
        // if(debug) escapeMod -= 300;
        if (character.canFly()) escapeMod -= 20;
        if (
            character.body.tails.reduce(Tail.HasType(TailType.RACCOON), false) &&
            character.body.ears.type === EarType.RACCOON &&
            character.effects.has(EffectType.Runner)
        )
            escapeMod -= 25;

        // Big tits doesn't matter as much if ya can fly!
        else {
            if (character.body.chest.length > 0) {
                const largestBreastSize: number = character.body.chest.sort(BreastRow.Largest).get(0)!.rating;
                if (largestBreastSize >= 35) escapeMod += 5;
                if (largestBreastSize >= 66) escapeMod += 10;
            }
            if (character.body.hips.rating >= 20) escapeMod += 5;
            if (character.body.butt.rating >= 20) escapeMod += 5;
            if (character.body.balls.count > 0) {
                if (character.body.balls.size >= 24) escapeMod += 5;
                if (character.body.balls.size >= 48) escapeMod += 10;
                if (character.body.balls.size >= 120) escapeMod += 10;
            }
        }

        // SUCCESSFUL FLEE
        if (character.stats.spe > randInt(target.stats.spe + escapeMod)) {
            // Fliers flee!
            if (character.canFly())
                CView.text(target.desc.capitalA + target.desc.short + " can't catch you.");
            // sekrit benefit: if you have coon ears, coon tail, and Runner perk, change normal Runner escape to flight-type escape
            else if (character.body.tails.reduce(Tail.HasType(TailType.RACCOON), false) && character.body.ears.type === EarType.RACCOON && character.effects.has(EffectType.Runner)) {
                CView.text("Using your running skill, you build up a head of steam and jump, then spread your arms and flail your tail wildly; your opponent dogs you as best " + target.desc.subjectivePronoun + " can, but stops and stares dumbly as your spastic tail slowly propels you several meters into the air!  You leave " + target.desc.objectivePronoun + " behind with your clumsy, jerky, short-range flight.");
            }
            // Non-fliers flee
            else
                CView.text(target.desc.capitalA + target.desc.short + " rapidly disappears into the shifting landscape behind you.");
            return;
        }
        // Runner perk chance
        else if (character.effects.has(EffectType.Runner) && randInt(100) < 50) {
            CView.text("Thanks to your talent for running, you manage to escape.");
            return;
        }
        // FAIL FLEE
        else {
            // Flyers get special failure message.
            if (character.canFly()) {
                if (target.desc.plural)
                    CView.text(target.desc.capitalA + target.desc.short + " manage to grab your " + describeLegs(character) + " and drag you back to the ground before you can fly away!");
                else
                    CView.text(target.desc.capitalA + target.desc.short + " manages to grab your " + describeLegs(character) + " and drag you back to the ground before you can fly away!");
            }
            // fail
            else if (character.body.tails.reduce(Tail.HasType(TailType.RACCOON), false) && character.body.ears.type === EarType.RACCOON && character.effects.has(EffectType.Runner))
                CView.text("Using your running skill, you build up a head of steam and jump, but before you can clear the ground more than a foot, your opponent latches onto you and drags you back down with a thud!");
            // Nonflyer messages
            else {
                // Huge balls messages
                if (character.body.balls.count > 0 && character.body.balls.size >= 24) {
                    if (character.body.balls.size < 48)
                        CView.text("With your " + describeBalls(true, true, character) + " swinging ponderously beneath you, getting away is far harder than it should be.  ");
                    else
                        CView.text("With your " + describeBalls(true, true, character) + " dragging along the ground, getting away is far harder than it should be.  ");
                }
                // FATASS BODY MESSAGES
                const largestBreastRating: number = character.body.chest.sort(BreastRow.Largest).get(0)!.rating;
                if (largestBreastRating >= 35 || character.body.butt.rating >= 20 || character.body.hips.rating >= 20) {
                    // FOR PLAYERS WITH GIANT BREASTS
                    if (largestBreastRating >= 35 && largestBreastRating < 66) {
                        if (character.body.hips.rating >= 20) {
                            CView.text("Your " + describeHips(character) + " forces your gait to lurch slightly side to side, which causes the fat of your " + character.body.skin.tone + " ");
                            if (character.body.butt.rating >= 20)
                                CView.text(describeButt(character) + " and ");
                            CView.text(describeChest(character) + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.");
                        }
                        else if (character.body.butt.rating >= 20)
                            CView.text("Your " + character.body.skin.tone + describeButt(character) + " and " + describeChest(character) + " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape.");
                        else
                            CView.text("Your " + describeChest(character) + " jiggle and wobble side to side like the " + character.body.skin.tone + " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape.");
                    }
                    // FOR PLAYERS WITH MASSIVE BREASTS
                    else if (largestBreastRating >= 66) {
                        if (character.body.hips.rating >= 20) {
                            CView.text("Your " + describeChest(character) + " nearly drag along the ground while your " + describeHips(character) + " swing side to side ");
                            if (character.body.butt.rating >= 20)
                                CView.text("causing the fat of your " + character.body.skin.tone + describeButt(character) + " to wobble heavily, ");
                            CView.text("forcing your body off balance and preventing you from moving quick enough to get escape.");
                        }
                        else if (character.body.butt.rating >= 20)
                            CView.text("Your " + describeChest(character) + " nearly drag along the ground while the fat of your " + character.body.skin.tone + describeButt(character) + " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape.");
                        else
                            CView.text("Your " + describeChest(character) + " nearly drag along the ground, preventing you from moving quick enough to get escape.");
                    }
                    // FOR PLAYERS WITH EITHER GIANT HIPS OR BUTT BUT NOT THE BREASTS
                    else if (character.body.hips.rating >= 20) {
                        CView.text("Your " + describeHips(character) + " swing heavily from side to side ");
                        if (character.body.butt.rating >= 20)
                            CView.text("causing your " + character.body.skin.tone + describeButt(character) + " to wobble obscenely ");
                        CView.text("and forcing your body into an awkward gait that slows you down, preventing you from escaping.");
                    }
                    // JUST DA BOOTAH
                    else if (character.body.butt.rating >= 20)
                        CView.text("Your " + character.body.skin.tone + describeButt(character) + " wobbles so heavily that you're unable to move quick enough to escape.");
                }
                // NORMAL RUN FAIL MESSAGES
                else if (target.desc.plural)
                    CView.text(target.desc.capitalA + target.desc.short + " stay hot on your heels, denying you a chance at escape!");
                else
                    CView.text(target.desc.capitalA + target.desc.short + " stays hot on your heels, denying you a chance at escape!");
            }
        }
    }
}
