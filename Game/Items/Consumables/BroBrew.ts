import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { Cock } from 'Game/Character/Body/Cock';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { ItemDesc } from '../ItemDesc';
import { describeLegs } from 'Game/Descriptors/LegDescriptor';
import { describeNipple, describeAllBreasts } from 'Game/Descriptors/BreastDescriptor';
import { describeCock } from 'Game/Descriptors/CockDescriptor';
import { describeSack } from 'Game/Descriptors/BallsDescriptor';
import { describeHips } from 'Game/Descriptors/HipDescriptor';
import { describeVagina } from 'Game/Descriptors/VaginaDescriptor';
import { CView } from 'Page/ContentView';
import { displayCharacterHPChange } from 'Game/Modifiers/StatModifier';
import { displayModFem, displayModTone, displayModThickness } from 'Game/Modifiers/BodyModifier';

export class BroBrew extends Consumable {
    public constructor() {
        super(ConsumableName.BroBrew, new ItemDesc("BroBrew", "a can of Bro Brew", "This aluminum can is labelled as 'Bro Brew'.  It even has a picture of a muscly, bare-chested man flexing on it.  A small label in the corner displays: \"Demon General's Warning: Bro Brew's effects are as potent (and irreversible) as they are refreshing.\""));
    }

    public use(character: Character) {
        CView.clear();
        // no drink for bimbos!
        if (character.effects.has(EffectType.BimboBody)) {
            CView.text("The stuff hits you like a giant cube, nearly staggering you as it begins to settle.");
            if (character.body.tallness < 77) {
                character.body.tallness = 77;
                CView.text(".. Did the ground just get farther away?  You glance down and realize, you're growing!  Like a sped-up flower sprout, you keep on getting taller until finally stopping around... six and a half feet, you assume.  Huh.  You didn't expect that to happen!");
            }
            if (character.body.tone < 100) {
                CView.text("  A tingling in your arm draws your attention just in time to see your biceps and triceps swell with new-found energy, skin tightening until thick cords of muscle run across the whole appendage.  Your other arm surges forward with identical results.  To compensate, your shoulders and neck widen to bodybuilder-like proportions while your chest and abs tighten to a firm, statuesque physique.  Your " + describeLegs(character) + " and glutes are the last to go, bulking up to proportions that would make any female martial artist proud.  You feel like you could kick forever with legs this powerful.");
                character.body.tone = 100;
            }
            CView.text("\n\n");

            // female
            if (character.body.cocks.length <= 0) {
                CView.text("The beverage isn't done yet, however, and it makes it perfectly clear with a building pleasure in your groin.  You can only cry in ecstasy and loosen the bottoms of your " + character.inventory.armor.displayName + " just in time for a little penis to spring forth.  You watch, enthralled, as blood quickly stiffens the shaft to its full length � then keeps on going!  Before long, you have a quivering 10-inch maleness, just ready to stuff into a welcoming box.");
                character.body.cocks.add(new Cock(10, 2));
                if (character.body.balls.count === 0) {
                    CView.text("  Right on cue, two cum-laden testicles drop in behind it, their contents swirling and churning.");
                    character.body.balls.count = 2;
                    character.body.balls.size = 3;
                }
                CView.text("\n\n");
            }
            else if (character.body.balls.count === 0) {
                CView.text("A swelling begins behind your man-meat, and you're assailed with an incredibly peculiar sensation as two sperm-filled balls drop into a newly-formed scrotum.  Frikkin' sweet!\n\n");
                character.body.balls.count = 2;
                character.body.balls.size = 3;
            }
            CView.text("Finally, you feel the transformation skittering to a halt, leaving you to openly roam your new chiseled and sex-ready body.  So what if you can barely form coherent sentences anymore?  A body like this does all the talking you need, you figure!");
            if (character.stats.int > 35) {
                character.stats.int = 35;
                character.stats.int -= 0.1;

            }
            if (character.stats.lib < 50) {
                character.stats.lib = 50;
                character.stats.lib += 0.1;
            }
            CView.text("\n\n");
            if (character.effects.has(EffectType.BimboBrains))
                CView.text("<b>(Lost Perks - Bimbo Brains, Bimbo Body)\n");
            else
                CView.text("<b>(Lost Perk - Bimbo Body)\n");
            character.effects.removeByName(EffectType.BimboBrains);
            character.effects.removeByName(EffectType.BimboBody);
            character.effects.create(EffectType.FutaForm);
            character.effects.create(EffectType.FutaFaculties);
            CView.text("(Gained Perks - Futa Form, Futa Faculties)</b>");
            return;
        }
        // HP restore for bros!
        if (character.effects.has(EffectType.BroBody) || character.effects.has(EffectType.FutaForm)) {
            CView.text("You crack open the can and guzzle it in a hurry.  Goddamn, this shit is the best.  As you crush the can against your forehead, you wonder if you can find a six-pack of it somewhere?\n\n");
            character.stats.fatigue -= 33;
            displayCharacterHPChange(character, 100);
            return;
        }
        CView.text("Well, maybe this will give you the musculature that you need to accomplish your goals.  You pull on the tab at the top and hear the distinctive snap-hiss of venting, carbonating pressure.  A smoky haze wafts from the opened container, smelling of hops and alcohol.  You lift it to your lips, the cold, metallic taste of the can coming to your tongue before the first amber drops of beer roll into your waiting mouth.  It tingles, but it's very, very good.  You feel compelled to finish it as rapidly as possible, and you begin to chug it.  You finish the entire container in seconds.\n\n");

        CView.text("A churning, full sensation wells up in your gut, and without thinking, you open wide to release a massive burp. It rumbles through your chest, startling birds into flight in the distance.  Awesome!  You slam the can into your forehead hard enough to smash the fragile aluminum into a flat, crushed disc.  Damn, you feel stronger already");
        if (character.stats.int > 50)
            CView.text(", though you're a bit worried by how much you enjoyed the simple, brutish act");
        CView.text(".\n\n");

        // (Tits b' gone)
        if (character.body.chest.length > 0) {
            const topBreastRow = character.body.chest.firstRow;
            if (topBreastRow.rating >= 1) {
                CView.text("A tingle starts in your " + describeNipple(character, topBreastRow) + "s before the tight buds grow warm, hot even.  ");
                if (topBreastRow.lactationMultiplier >= 1)
                    CView.text("Somehow, you know that the milk you had been producing is gone, reabsorbed by your body.  ");
                CView.text("They pinch in towards your core, shrinking along with your flattening " + describeAllBreasts(character) + ".  You shudder and flex in response.  Your chest isn't just shrinking, it's reforming, sculping itself into a massive pair of chiseled pecs.  ");
                if (character.body.chest.length > 1) {
                    CView.text("The breasts below vanish entirely.  ");
                    let chestCount: number = character.body.chest.length;
                    while (chestCount > 1) {
                        character.body.chest.remove(chestCount - 1);
                        chestCount--;
                    }
                }
                topBreastRow.rating = 0;
                if (topBreastRow.nipples.count > 1)
                    topBreastRow.nipples.count = 1;
                topBreastRow.nipples.fuckable = false;
                if (topBreastRow.nipples.length > .5)
                    topBreastRow.nipples.length = .25;
                topBreastRow.lactationMultiplier = 0;
                character.effects.removeByName(EffectType.Feeder);
                CView.text("All too soon, your boobs are gone.  Whoa!\n\n");
            }
        }

        CView.text("Starting at your hands, your muscles begin to contract and release, each time getting tighter, stronger, and more importantly - larger.  The oddness travels up your arms, thickens your biceps, and broadens your shoulders.  Soon, your neck and chest are as built as your arms.  You give a few experimental flexes as your abs ");
        if (character.body.tone >= 70) CView.text("further define themselves");
        else CView.text("become extraordinarily visible");
        CView.text(".  The strange, muscle-building changes flow down your " + describeLegs(character) + ", making them just as fit and strong as the rest of you.  You curl your arm and kiss your massive, flexing bicep.  You're awesome!\n\n");

        CView.text("Whoah, you're fucking ripped and strong, not at all like the puny weakling you were before.  Yet, you feel oddly wool-headed.  Your thoughts seem to be coming slower and slower, like they're plodding through a marsh.  You grunt in frustration at the realization.  Sure, you're a muscle-bound hunk now, but what good is it if you're as dumb as a box of rocks?  Your muscles flex in the most beautiful way, so you stop and strike a pose, mesmerized by your own appearance.  Fuck thinking, that shit's for losers!\n\n");

        // (has dick less than 10 inches)
        if (character.body.cocks.length > 0) {
            const cock = character.body.cocks.get(0)!;
            if (cock.length < 10) {
                CView.text("As if on cue, the familiar tingling gathers in your groin, and you dimly remember you have one muscle left to enlarge.  If only you had the intelligence left to realize that your penis is not a muscle.  In any event, your " + describeCock(character, cock) + " swells in size, ");
                if (cock.thickness < 2.75) {
                    CView.text("thickening and ");
                    cock.thickness = 2.75;
                }
                CView.text("lengthening until it's ten inches long and almost three inches wide.  Fuck, you're hung!  ");
                cock.length = 10;
            }
            // Dick already big enough! BALL CHECK!
            if (character.body.balls.count > 0) {
                CView.text("Churning audibly, your " + describeSack(character) + " sways, but doesn't show any outward sign of change.  Oh well, it's probably just like, getting more endurance or something.");
            }
            else {
                CView.text("Two rounded orbs drop down below, filling out a new, fleshy sac above your " + describeLegs(character) + ".  Sweet!  You can probably cum buckets with balls like these.");
                character.body.balls.count = 2;
                character.body.balls.size = 3;
            }
            CView.text("\n\n");
        }
        // (No dick)
        else {
            CView.text("You hear a straining, tearing noise before you realize it's coming from your underwear.  Pulling open your " + character.inventory.armor.displayName + ", you gasp in surprise at the huge, throbbing manhood that now lies between your " + describeHips(character) + ".  It rapidly stiffens to a full, ten inches, and goddamn, it feels fucking good.  You should totally find a warm hole to fuck!");
            if (character.body.balls.count === 0)
                CView.text("  Two rounded orbs drop down below, filling out a new, fleshy sac above your " + describeLegs(character) + ".  Sweet!  You can probably cum buckets with balls like these.");
            CView.text("\n\n");
            character.body.cocks.add(new Cock(12, 2.75));
            if (character.body.balls.count === 0) {
                character.body.balls.count = 2;
                character.body.balls.size = 3;
            }
        }
        // (Pussy b gone)
        if (character.body.vaginas.length > 0) {
            CView.text("At the same time, your " + describeVagina(character, character.body.vaginas.get(0)!) + " burns hot, nearly feeling on fire.  You cuss in a decidedly masculine way for a moment before the pain fades to a dull itch.  Scratching it, you discover your lady-parts are gone.  Only a sensitive patch of skin remains.\n\n");
            while (character.body.vaginas.length > 0) {
                character.body.vaginas.remove(0);
            }
        }
        // (below max masculinity)
        if (character.body.femininity > 0) {
            CView.text("Lastly, the change hits your face.  You can feel your jawbones shifting and sliding around, your skin changing to accommodate your face's new shape.  Once it's finished, you feel your impeccable square jaw and give a wide, easy-going grin.  You look awesome!\n\n");
            displayModFem(character, 0, 100);
        }
        CView.text("You finish admiring yourself and adjust your " + character.inventory.armor.displayName + " to better fit your new physique.  Maybe there's some bitches around you can fuck.  Hell, as good as you look, you might have other dudes wanting you to fuck them too, no homo.\n\n");
        // max tone.  Thickness + 50
        displayModTone(character, 100, 100);
        displayModThickness(character, 100, 50);
        // Bonus cum production!
        character.effects.create(EffectType.BroBrains);
        character.effects.create(EffectType.BroBody);
        CView.text("<b>(Bro Body - Perk Gained!)\n");
        CView.text("(Bro Brains - Perk Gained!)</b>\n"); // int to 20.  max int 50
        if (character.effects.has(EffectType.Feeder)) {
            CView.text("<b>(Perk Lost - Feeder!)</b>\n");
            character.effects.removeByName(EffectType.Feeder);
        }
        if (character.stats.int > 21)
            character.stats.int = 21;
        character.stats.str += 33;
        character.stats.tou += 33;
        character.stats.int -= 1;
        character.stats.lib += 4;
        character.stats.lust += 40;
    }
}
