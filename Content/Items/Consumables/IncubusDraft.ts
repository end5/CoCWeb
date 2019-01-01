import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { Cock, CockType } from 'Engine/Body/Cock';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { numToCardinalText } from 'Content/Utilities/NumToText';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { describeCock, describeCocksLight } from 'Content/Descriptors/CockDescriptor';
import { Tail, TailType } from 'Engine/Body/Tail';
import { HornType } from 'Engine/Body/Horns';
import { describeNipple } from 'Content/Descriptors/BreastDescriptor';
import { FaceType } from 'Engine/Body/Face';
import { SkinType } from 'Engine/Body/Skin';
import { TongueType } from 'Engine/Body/Tongue';
import { LegType } from 'Engine/Body/Legs';
import { describeFeet } from 'Content/Descriptors/LegDescriptor';
import { WingType } from 'Engine/Body/Wings';
import { CView } from 'Engine/Display/ContentView';
import { displayModFem, displayModThickness } from 'Content/Modifiers/BodyModifier';
import { growCock, thickenCock, displayLengthChange } from 'Content/Modifiers/CockModifier';
import { shrinkTits } from 'Content/Modifiers/BreastModifier';
import { Settings } from 'Content/Settings';

export class IncubusDraft extends Consumable {
    public readonly tainted: boolean;
    public constructor(tainted: boolean) {
        if (tainted)
            super(ConsumableName.IncubusDraft, new ItemDesc("IncubiD", "an Incubi draft", "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers.  A stylized picture of a humanoid with a huge penis is etched into the glass."));
        else
            super(ConsumableName.IncubusDraftPure, new ItemDesc("P.Draft", "an untainted Incubi draft", "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers.  A stylized picture of a humanoid with a huge penis is etched into the glass. Rathazul has purified this to prevent corruption upon use."), 20);
        this.tainted = tainted;
    }

    public use(character: Character) {
        let changeAmount: number = randInt(100);
        if (character.effects.has(EffectType.HistoryAlchemist))
            changeAmount += 10;
        CView.clear();
        CView.text("The draft is slick and sticky, ");
        if (character.stats.cor <= 33)
            CView.text("just swallowing it makes you feel unclean.");
        if (character.stats.cor > 33 && character.stats.cor <= 66)
            CView.text("reminding you of something you just can't place.");
        if (character.stats.cor > 66)
            CView.text("deliciously sinful in all the right ways.");
        if (character.stats.cor >= 90)
            CView.text("  You're sure it must be distilled from the cum of an incubus.");
        // Lowlevel changes..
        if (changeAmount < 50)
            this.lowLevelChanges(character);
        // Mid-level changes
        if (changeAmount >= 50 && changeAmount < 93)
            this.midLevelChanges(character);
        // High level change
        if (changeAmount >= 93)
            this.highLevelChanges(character);
        // Demonic changes - higher chance with higher corruption.
        if (randInt(40) + character.stats.cor / 3 > 35 && this.tainted)
            demonChanges(character);
        if (randInt(4) === 0 && this.tainted)
            CView.text(displayModFem(character, 5, 2));
        if (randInt(4) === 0 && this.tainted)
            CView.text(displayModThickness(character, 30, 2));
    }

    private lowLevelChanges(character: Character) {
        const cockCount: number = character.body.cocks.length;
        let selectedCock: Cock;
        let cockGrowth: number;
        if (cockCount === 1) {
            cockGrowth = 0;
            selectedCock = character.body.cocks.get(0)!;
            if (selectedCock.type !== CockType.DEMON)
                CView.text("\n\nYour " + describeCock(character, selectedCock) + " becomes shockingly hard.  It turns a shiny inhuman purple and spasms, dribbling hot demon-like cum as it begins to grow.");
            else
                CView.text("\n\nYour " + describeCock(character, selectedCock) + " becomes shockingly hard.  It dribbles hot demon-like cum as it begins to grow.");
            if (randInt(4) === 0)
                cockGrowth = growCock(character, selectedCock, 3);
            else
                cockGrowth = growCock(character, selectedCock, 3);

            character.stats.int += 1;
            character.stats.lib += 2;
            character.stats.sens += 1;
            character.stats.lust += 5 + cockGrowth * 3;
            character.stats.cor += this.tainted ? 1 : 0;

            if (cockGrowth < .5)
                CView.text("  It stops almost as soon as it starts, growing only a tiny bit longer.");
            if (cockGrowth >= .5 && cockGrowth < 1)
                CView.text("  It grows slowly, stopping after roughly half an inch of growth.");
            if (cockGrowth >= 1 && cockGrowth <= 2)
                CView.text("  The sensation is incredible as more than an inch of lengthened dick-flesh grows in.");
            if (cockGrowth > 2)
                CView.text("  You smile and idly stroke your lengthening " + describeCock(character, selectedCock) + " as a few more inches sprout.");
            if (selectedCock.type !== CockType.DEMON)
                CView.text("  With the transformation complete, your " + describeCock(character, selectedCock) + " returns to its normal coloration.");
            else
                CView.text("  With the transformation complete, your " + describeCock(character, selectedCock) + " throbs in an almost happy way as it goes flaccid once more.");
        }
        if (cockCount > 1) {
            selectedCock = character.body.cocks.sort(Cock.Shortest).get(0)!;
            cockGrowth = 0;
            if (randInt(4) === 0)
                cockGrowth = growCock(character, selectedCock, 3);
            else
                cockGrowth = growCock(character, selectedCock, 1);

            character.stats.int += 1;
            character.stats.lib += 2;
            character.stats.sens += 1;
            character.stats.lust += 5 + cockGrowth * 3;
            character.stats.cor += this.tainted ? 1 : 0;

            if (character.body.cocks.length === 2)
                CView.text("\n\nBoth of your " + describeCocksLight(character) + " become shockingly hard, swollen and twitching as they turn a shiny inhuman purple in color.  They spasm, dripping thick ropes of hot demon-like pre-cum along their lengths as your shortest " + describeCock(character, selectedCock) + " begins to grow.");
            else
                CView.text("\n\nAll of your " + describeCocksLight(character) + " become shockingly hard, swollen and twitching as they turn a shiny inhuman purple in color.  They spasm, dripping thick ropes of hot demon-like pre-cum along their lengths as your shortest " + describeCock(character, selectedCock) + " begins to grow.");

            if (cockGrowth < .5)
                CView.text("  It stops almost as soon as it starts, growing only a tiny bit longer.");
            if (cockGrowth >= .5 && cockGrowth < 1)
                CView.text("  It grows slowly, stopping after roughly half an inch of growth.");
            if (cockGrowth >= 1 && cockGrowth <= 2)
                CView.text("  The sensation is incredible as more than an inch of lengthened dick-flesh grows in.");
            if (cockGrowth > 2)
                CView.text("  You smile and idly stroke your lengthening " + describeCock(character, selectedCock) + " as a few more inches sprout.");
            CView.text("  With the transformation complete, your " + describeCocksLight(character) + " return to their normal coloration.");
        }
        // NO CAWKS?
        if (cockCount === 0) {
            selectedCock = new Cock();
            selectedCock.length = randInt(3) + 4;
            selectedCock.thickness = 1;
            character.body.cocks.add(selectedCock);

            CView.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ");
            CView.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  Eventually the orgasm ends as your " + describeCock(character, selectedCock) + " fades to a more normal " + character.body.skin.tone + " tone.");

            character.stats.lib += 3;
            character.stats.sens += 5;
            character.stats.lust += 10;
            character.stats.cor += this.tainted ? 1 : 0;
        }
        // TIT CHANGE 25% chance of shrinkage
        if (randInt(4) === 0) {
            if (!Settings.hyperHappy) {
                shrinkTits(character);
            }
        }
    }

    private midLevelChanges(character: Character) {
        const cockCount: number = character.body.cocks.length;
        let selectedCock: Cock;
        let cockGrowth: number = 0;
        let thickness: number = 0;
        if (cockCount > 1) {
            CView.text("\n\nYour cocks fill to full-size... and begin growing obscenely.  ");
            for (const cock of character.body.cocks) {
                cockGrowth = growCock(character, cock, randInt(3) + 2);
                thickness = thickenCock(cock, 1);
                if (thickness < .1)
                    cock.thickness += .05;
            }
            displayLengthChange(character, cockGrowth, cockCount);

            // Display the degree of thickness change.
            if (thickness >= 1) {
                if (cockCount === 1) CView.text("\n\nYour cock spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                else CView.text("\n\nYour cocks spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
            }
            if (thickness <= .5) {
                if (cockCount > 1) CView.text("\n\nYour cocks feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                else CView.text("\n\nYour cock feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
            }
            if (thickness > .5 && cockGrowth < 1) {
                if (cockCount === 1) CView.text("\n\nYour cock seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                if (cockCount > 1) CView.text("\n\nYour cocks seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
            }
            character.stats.lib += 3;
            character.stats.sens += 5;
            character.stats.lust += 10;
            character.stats.cor += this.tainted ? 3 : 0;
        }
        if (cockCount === 1) {
            CView.text("\n\nYour cock fills to its normal size and begins growing... ");
            selectedCock = character.body.cocks.get(0)!;
            thickness = thickenCock(selectedCock, 1);
            cockGrowth = growCock(character, selectedCock, randInt(3) + 2);
            displayLengthChange(character, cockGrowth, cockCount);
            // Display the degree of thickness change.
            if (thickness >= 1) {
                if (character.body.cocks.length === 1) CView.text("  Your cock spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                else CView.text("  Your cocks spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
            }
            if (thickness <= .5) {
                if (character.body.cocks.length > 1) CView.text("  Your cocks feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                else CView.text("  Your cock feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
            }
            if (thickness > .5 && cockGrowth < 1) {
                if (character.body.cocks.length === 1) CView.text("  Your cock seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                if (character.body.cocks.length > 1) CView.text("  Your cocks seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
            }
            character.stats.lib += 3;
            character.stats.sens += 5;
            character.stats.lust += 10;
            character.stats.cor += this.tainted ? 3 : 0;
        }
        if (cockCount === 0) {
            selectedCock = new Cock();
            selectedCock.length = randInt(3) + 4;
            selectedCock.thickness = 1;
            character.body.cocks.add(selectedCock);

            CView.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ");
            CView.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  Eventually the orgasm ends as your " + describeCock(character, selectedCock) + " fades to a more normal " + character.body.skin.tone + " tone.");

            character.stats.lib += 3;
            character.stats.sens += 5;
            character.stats.lust += 10;
            character.stats.cor += this.tainted ? 3 : 0;
        }
        // Shrink breasts a more
        // TIT CHANGE 50% chance of shrinkage
        if (randInt(2) === 0) {
            if (!Settings.hyperHappy) {
                shrinkTits(character);
            }
        }
    }

    private highLevelChanges(character: Character) {
        if (character.body.cocks.length < 10) {
            if (randInt(10) < Math.floor(character.stats.cor / 25)) {
                CView.text("\n\n");
                this.growDemonCock(character, randInt(2) + 2);
                character.stats.lib += 3;
                character.stats.sens += 5;
                character.stats.lust += 10;
                character.stats.cor += this.tainted ? 5 : 0;
            }
            else {
                this.growDemonCock(character, 1);
            }
        }
        if (!Settings.hyperHappy) {
            shrinkTits(character);
            shrinkTits(character);
        }
    }

    public growDemonCock(character: Character, growCocks: number): void {
        let numOfCockGrown: number = 0;
        while (growCocks > 0) {
            character.body.cocks.add(new Cock(randInt(3) + 4, 0.75));
            growCocks--;
            numOfCockGrown++;
        }
        CView.text("\n\nYou shudder as a pressure builds in your crotch, peaking painfully as a large bulge begins to push out from your body.  ");
        if (numOfCockGrown === 1)
            CView.text("The skin seems to fold back as a fully formed demon-cock bursts forth from your loins, drizzling hot cum everywhere as it orgasms.  In time it fades to a more normal coloration and human-like texture.  ");
        else
            CView.text("The skin bulges obscenely, darkening and splitting around " + numToCardinalText(numOfCockGrown) + " of your new dicks.  For an instant they turn a demonic purple and dribble in thick spasms of scalding demon-cum.  After, they return to a more humanoid coloration.  ");
        if (numOfCockGrown > 4)
            CView.text("Your tender bundle of new cocks feels deliciously sensitive, and you cannot stop yourself from wrapping your hands around the slick demonic bundle and pleasuring them.\n\nNearly an hour later, you finally pull your slick body away from the puddle you left on the ground.  When you look back, you notice it has already been devoured by the hungry earth.");
        character.orgasm();
    }
}

export function demonChanges(character: Character): void {
    // Change tail if already horned.
    if (!character.body.tails.reduce(Tail.HasType(TailType.DEMONIC), false) && character.body.horns.count > 0) {
        if (character.body.tails.length === 0) {
            CView.text("\n\n");
            if (character.body.tails.reduce(Tail.HasType(TailType.SPIDER_ABDOMEN), false) || character.body.tails.reduce(Tail.HasType(TailType.BEE_ABDOMEN), false))
                CView.text("You feel a tingling in your insectile abdomen as it stretches, narrowing, the exoskeleton flaking off as it transforms into a flexible demon-tail, complete with a round spaded tip.  ");
            else
                CView.text("You feel a tingling in your tail.  You are amazed to discover it has shifted into a flexible demon-tail, complete with a round spaded tip.  ");
            CView.text("<b>Your tail is now demonic in appearance.</b>");
        }
        else
            CView.text("\n\nA pain builds in your backside... growing more and more pronounced.  The pressure suddenly disappears with a loud ripping and tearing noise.  <b>You realize you now have a demon tail</b>... complete with a cute little spade.");
        character.stats.cor += 4;
        const newTail = new Tail();
        newTail.type = TailType.DEMONIC;
        character.body.tails.add(newTail);
    }
    // grow horns!
    if (character.body.horns.count === 0 || (randInt(character.body.horns.count + 3) === 0)) {
        if (character.body.horns.count < 12 && (character.body.horns.type === HornType.NONE || character.body.horns.type === HornType.DEMON)) {
            CView.text("\n\n");
            if (character.body.horns.count === 0) {
                CView.text("A small pair of demon horns.amount erupts from your forehead.  They actually look kind of cute.  <b>You have horns!</b>");
            }
            else CView.text("Another pair of demon horns, larger than the last, forms behind the first row.");
            if (character.body.horns.type === HornType.NONE) character.body.horns.type = HornType.DEMON;
            character.body.horns.count++;
            character.body.horns.count++;
            character.stats.cor += 3;
        }
        // Text for shifting horns
        else if (character.body.horns.type > HornType.DEMON) {
            CView.text("\n\n");
            CView.text("Your horns.amount shift, shrinking into two small demonic-looking horns.");
            character.body.horns.count = 2;
            character.body.horns.type = HornType.DEMON;
            character.stats.cor += 3;
        }
    }
    // Nipples Turn Back:
    if (character.effects.has(EffectType.BlackNipples) && randInt(3) === 0) {
        CView.text("\n\nSomething invisible brushes against your " + describeNipple(character, character.body.chest.firstRow) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
        character.effects.removeByName(EffectType.BlackNipples);
    }
    // remove fur
    if ((character.body.face.type !== FaceType.HUMAN || character.body.skin.type !== SkinType.PLAIN) && randInt(3) === 0) {
        // Remove face before fur!
        if (character.body.face.type !== FaceType.HUMAN) {
            CView.text("\n\n");
            CView.text("Your visage twists painfully, returning to a more normal human shape, albeit with flawless skin.  <b>Your face is human again!</b>");
            character.body.face.type = FaceType.HUMAN;
        }
        // De-fur
        else if (character.body.skin.type !== SkinType.PLAIN) {
            CView.text("\n\n");
            if (character.body.skin.type === SkinType.FUR) CView.text("Your skin suddenly feels itchy as your fur begins falling out in clumps, <b>revealing inhumanly smooth skin</b> underneath.");
            if (character.body.skin.type === SkinType.SCALES) CView.text("Your scales begin to itch as they begin falling out in droves, <b>revealing your inhumanly smooth " + character.body.skin.tone + " skin</b> underneath.");
            character.body.skin.type = SkinType.PLAIN;
            character.body.skin.desc = "skin";
        }
    }
    // Demon tongue
    if (character.body.tongue.type === TongueType.SNAKE && randInt(3) === 0) {
        CView.text("\n\nYour snake-like tongue tingles, thickening in your mouth until it feels more like your old human tongue, at least for the first few inches.  It bunches up inside you, and when you open up your mouth to release it, roughly two feet of tongue dangles out.  You find it easy to move and control, as natural as walking.  <b>You now have a long demon-tongue.</b>");
        character.body.tongue.type = TongueType.DEMONIC;
    }
    // foot changes - requires furless
    if (character.body.skin.type === SkinType.PLAIN && randInt(4) === 0) {
        // Males/genderless get clawed feet
        if (character.gender <= 1) {
            if (character.body.legs.type !== LegType.DEMONIC_CLAWS) {
                CView.text("\n\n");
                CView.text("Every muscle and sinew below your hip tingles and you begin to stagger. Seconds after you sit down, pain explodes in your " + describeFeet(character) + ". Something hard breaks through your sole from the inside out as your toes splinter and curve cruelly. The pain slowly diminishes and your eyes look along a human leg that splinters at the foot into a claw with sharp black nails. When you relax, your feet grip the ground easily. <b>Your feet are now formed into demonic claws.</b>");
                character.body.legs.type = LegType.DEMONIC_CLAWS;
            }
        }
        // Females/futa get high heels
        else if (character.body.legs.type !== LegType.DEMONIC_HIGH_HEELS) {
            CView.text("\n\n");
            CView.text("Every muscle and sinew below your hip tingles and you begin to stagger. Seconds after you sit down, pain explodes in your " + describeFeet(character) + ". Something hard breaks through your sole from the inside out. The pain slowly diminishes and your eyes look along a human leg to a thin and sharp horn protruding from the heel. When you relax, your feet are pointing down and their old posture is only possible with an enormous effort. <b>Your feet are now formed into demonic high-heels.</b> Tentatively you stand up and try to take a few steps. To your surprise you feel as if you were born with this and stride vigorously forward, hips swaying.");
            character.body.legs.type = LegType.DEMONIC_HIGH_HEELS;
        }
    }
    // Grow demon wings
    if (character.body.wings.type !== WingType.BAT_LIKE_LARGE && randInt(8) === 0 && character.stats.cor >= 50) {
        // grow smalls to large
        if (character.body.wings.type === WingType.BAT_LIKE_TINY && character.stats.cor >= 75) {
            CView.text("\n\n");
            CView.text("Your small demonic wings stretch and grow, tingling with the pleasure of being attached to such a tainted body.  You stretch over your shoulder to stroke them as they unfurl, turning into full-sized demon-wings.  <b>Your demonic wings have grown!</b>");
            character.body.wings.type = WingType.BAT_LIKE_LARGE;
            character.body.wings.desc = "large, bat-like";
        }
        else if (character.body.wings.type === WingType.SHARK_FIN) {
            CView.text("\n\n");
            CView.text("The muscles around your shoulders bunch up uncomfortably, changing to support the new bat-like wings growing from your back.  You twist your head as far as you can for a look and realize your fin has changed into ");
            CView.text("small ");
            character.body.wings.type = WingType.BAT_LIKE_TINY;
            character.body.wings.desc = "tiny, bat-like";
            CView.text("bat-like demon-wings!");
        }
        else if (character.body.wings.type === WingType.BEE_LIKE_SMALL || character.body.wings.type === WingType.BEE_LIKE_LARGE) {
            CView.text("\n\n");
            CView.text("The muscles around your shoulders bunch up uncomfortably, changing to support your wings as you feel their weight increasing.  You twist your head as far as you can for a look and realize they've changed into ");
            if (character.body.wings.type === WingType.BEE_LIKE_SMALL) {
                CView.text("small ");
                character.body.wings.type = WingType.BAT_LIKE_TINY;
                character.body.wings.desc = "tiny, bat-like";
            }
            else {
                CView.text("large ");
                character.body.wings.type = WingType.BAT_LIKE_LARGE;
                character.body.wings.desc = "large, bat-like";
            }
            CView.text("<b>bat-like demon-wings!</b>");
        }
        // No wings
        else if (character.body.wings.type === WingType.NONE) {
            CView.text("\n\n");
            CView.text("A knot of pain forms in your shoulders as they tense up.  With a surprising force, a pair of small demonic wings sprout from your back, ripping a pair of holes in the back of your " + character.inventory.armor.displayName + ".  <b>You now have tiny demonic wings</b>.");
            character.body.wings.type = WingType.BAT_LIKE_TINY;
            character.body.wings.desc = "tiny, bat-like";
        }
    }
}
