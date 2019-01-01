import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { Cock } from 'Engine/Body/Cock';
import { EyeType } from 'Engine/Body/Eyes';
import { FaceType } from 'Engine/Body/Face';
import { SkinType } from 'Engine/Body/Skin';
import { Tail, TailType } from 'Engine/Body/Tail';
import { Vagina } from 'Engine/Body/Vagina';
import { WingType } from 'Engine/Body/Wings';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Gender } from 'Engine/Body/GenderIdentity';
import { describeBalls, describeSack } from 'Content/Descriptors/BallsDescriptor';
import { describeCocksLight } from 'Content/Descriptors/CockDescriptor';
import { describeVagina } from 'Content/Descriptors/VaginaDescriptor';
import { describeFaceShort } from 'Content/Descriptors/FaceDescriptor';
import { describeFeet } from 'Content/Descriptors/LegDescriptor';
import { CView } from 'Engine/Display/ContentView';

export class SharkTooth extends Consumable {
    private enhanced: boolean;

    public constructor(enhanced: boolean) {
        if (!enhanced)
            super(ConsumableName.SharkTooth, new ItemDesc("Shark.T", "a sharp shark tooth", "A glinting white tooth, very sharp and intimidating."));
        else
            super(ConsumableName.SharkToothEnhanced, new ItemDesc("TSTooth", "a glowing tiger shark tooth", "This looks like a normal shark tooth, though with an odd purple glow."));
        this.enhanced = enhanced;
    }

    public use(character: Character) {
        let changes: number = 0;
        let changeLimit: number = 2;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(2) === 0) changeLimit++;
        if (character.effects.has(EffectType.HistoryAlchemist)) changeLimit++;
        CView.clear();
        if (!this.enhanced)
            CView.text("You have no idea why, but you decide to eat the pointed tooth. To your surprise, it's actually quite brittle, turning into a fishy-tasting dust. You figure it must just be a tablet made to look like a shark's tooth.");
        else
            CView.text("You have no idea why, but you decide to eat the pointed, glowing tooth. To your surprise, it's actually quite brittle, crumbling into a fishy-tasting dust. Maybe it's just a tablet made to look like a shark's tooth.");
        // STATS
        // Increase strength 1-2 points (Up to 50) (60 for tiger)
        if (((character.stats.str < 60 && this.enhanced) || character.stats.str < 50) && randInt(3) === 0) {
            character.stats.str += 1 + randInt(2);
            CView.text("\n\nA painful ripple passes through the muscles of your body.  It takes you a few moments, but you quickly realize you're a little bit stronger now.");
            changes++;
        }
        // Increase Speed 1-3 points (Up to 75) (100 for tigers)
        if (((character.stats.spe < 100 && this.enhanced) || character.stats.spe < 75) && randInt(3) === 0) {
            character.stats.spe += 1 + randInt(3);
            changes++;
            CView.text("\n\nShivering without warning, you nearly trip over yourself as you walk.  A few tries later you realize your muscles have become faster.");
        }
        // Reduce sensitivity 1-3 Points (Down to 25 points)
        if (character.stats.sens > 25 && randInt(1.5) === 0 && changes < changeLimit) {
            character.stats.sens += -1 - randInt(3);
            changes++;
            CView.text("\n\nIt takes a while, but you eventually realize your body has become less sensitive.");
        }
        // Increase Libido 2-4 points (Up to 75 points) (100 for tigers)
        if (((character.stats.lib < 100 && this.enhanced) || character.stats.lib < 75) && randInt(3) === 0 && changes < changeLimit) {
            character.stats.lib += 1 + randInt(3);
            changes++;
            CView.text("\n\nA blush of red works its way across your skin as your sex drive kicks up a notch.");
        }
        // Decrease intellect 1-3 points (Down to 40 points)
        if (character.stats.int > 40 && randInt(3) === 0 && changes < changeLimit) {
            character.stats.int += -1 - randInt(3);
            changes++;
            CView.text("\n\nYou shake your head and struggle to gather your thoughts, feeling a bit slow.");
        }
        // Smexual stuff!
        // -TIGGERSHARK ONLY: Grow a cunt (guaranteed if no gender)
        if (this.enhanced && (character.gender === Gender.NONE || (character.body.vaginas.length <= 0 && changes < changeLimit && randInt(3) === 0))) {
            changes++;
            // (balls)
            if (character.body.balls.count > 0)
                CView.text("\n\nAn itch starts behind your " + describeBalls(true, true, character) + ", but before you can reach under to scratch it, the discomfort fades. A moment later a warm, wet feeling brushes your " + describeSack(character) + ", and curious about the sensation, <b>you lift up your balls to reveal your new vagina.</b>");
            // (dick)
            else if (character.body.cocks.length > 0)
                CView.text("\n\nAn itch starts on your groin, just below your " + describeCocksLight(character) + ". You pull the manhood aside to give you a better view, and you're able to watch as <b>your skin splits to give you a new vagina, complete with a tiny clit.</b>");
            // (neither)
            else CView.text("\n\nAn itch starts on your groin and fades before you can take action. Curious about the intermittent sensation, <b>you peek under your " + character.inventory.armor.displayName + " to discover your brand new vagina, complete with pussy lips and a tiny clit.</b>");
            const newVagina: Vagina = new Vagina();
            character.body.vaginas.add(newVagina);
            character.stats.sens += 10;
        }
        // WANG GROWTH - TIGGERSHARK ONLY
        if (this.enhanced && (character.body.cocks.length <= 0) && changes < changeLimit && randInt(3) === 0) {
            // Genderless:
            if (character.body.vaginas.length <= 0) CView.text("\n\nYou feel a sudden stabbing pain in your featureless crotch and bend over, moaning in agony. Your hands clasp protectively over the surface - which is swelling in an alarming fashion under your fingers! Stripping off your clothes, you are presented with the shocking site of once-smooth flesh swelling and flowing like self-animate clay, resculpting itself into the form of male genitalia! When the pain dies down, you are the proud owner of a new human-shaped penis");
            // Female:
            else CView.text("\n\nYou feel a sudden stabbing pain just above your " + describeVagina(character, character.body.vaginas.get(0)) + " and bend over, moaning in agony. Your hands clasp protectively over the surface - which is swelling in an alarming fashion under your fingers! Stripping off your clothes, you are presented with the shocking site of once-smooth flesh swelling and flowing like self-animate clay, resculpting itself into the form of male genitalia! When the pain dies down, you are the proud owner of not only a " + describeVagina(character, character.body.vaginas.get(0)) + ", but a new human-shaped penis");
            if (character.body.balls.count === 0) {
                CView.text(" and a pair of balls");
                character.body.balls.count = 2;
                character.body.balls.size = 2;
            }
            CView.text("!");
            const newCock: Cock = new Cock(7, 1.4);
            character.body.cocks.add(newCock);
            character.stats.lib += 4;
            character.stats.sens += 5;
            character.stats.lust += 20;
            changes++;
        }
        // (Requires the character having two testicles)
        if (this.enhanced && (character.body.balls.count === 0 || character.body.balls.count === 2) && character.body.cocks.length > 0 && changes < changeLimit && randInt(3) === 0) {
            if (character.body.balls.count === 2) {
                CView.text("\n\nYou gasp in shock as a sudden pain racks your abdomen. Within seconds, two more testes drop down into your " + describeSack(character) + ", your skin stretching out to accommodate them. Once the pain clears, you examine <b>your new quartet of testes.</b>");
                character.body.balls.count = 4;
            }
            else if (character.body.balls.count === 0) {
                CView.text("\n\nYou gasp in shock as a sudden pain racks your abdomen. Within seconds, two balls drop down into a new sack, your skin stretching out to accommodate them. Once the pain clears, you examine <b>your new pair of testes.</b>");
                character.body.balls.count = 2;
                character.body.balls.size = 2;
            }
            character.stats.lib += 2;
            character.stats.sens += 3;
            character.stats.lust += 10;
            changes++;
        }
        // Transformations:
        // Mouth TF
        if (character.body.face.type !== FaceType.SHARK_TEETH && randInt(3) === 0 && changes < changeLimit) {
            CView.text("\n\n");
            if (character.body.face.type > FaceType.HUMAN && character.body.face.type < FaceType.SHARK_TEETH) CView.text("Your " + describeFaceShort(character) + " explodes with agony, reshaping into a more human-like visage.  ");
            character.body.face.type = FaceType.SHARK_TEETH;
            CView.text("You firmly grasp your mouth, an intense pain racking your oral cavity. Your gums shift around and the bones in your jaw reset. You blink a few times wondering what just happened. You move over to a puddle to catch sight of your reflection, and you are thoroughly surprised by what you see. A set of retractable shark fangs have grown in front of your normal teeth, and your face has elongated slightly to accommodate them!  They even scare you a little.\n(Gain: 'Bite' special attack)");
            changes++;
        }
        // Remove odd eyes
        if (changes < changeLimit && randInt(5) === 0 && character.body.eyes.type > EyeType.HUMAN) {
            if (character.body.eyes.type === EyeType.BLACK_EYES_SAND_TRAP) {
                CView.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                CView.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + describeFeet(character) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.");
                if (character.body.eyes.type === EyeType.FOUR_SPIDER_EYES) CView.text("  Your multiple, arachnid eyes are gone!</b>");
                CView.text("  <b>You have normal, humanoid eyes again.</b>");
            }
            character.body.eyes.type = EyeType.HUMAN;
            changes++;
        }
        // Tail TF
        if (character.body.tails.reduce(Tail.HasType(TailType.SHARK), false) && randInt(3) === 0 && changes < changeLimit) {
            changes++;
            if (character.body.tails.length >= 1) CView.text("\n\nJets of pain shoot down your spine, causing you to gasp in surprise and fall to your hands and knees. Feeling a bulging at the end of your back, you lower your " + character.inventory.armor.displayName + " down just in time for a fully formed shark tail to burst through. You swish it around a few times, surprised by how flexible it is. After some modifications to your clothing, you're ready to go with your brand new shark tail.");
            else CView.text("\n\nJets of pain shoot down your spine into your tail.  You feel the tail bulging out until it explodes into a large and flexible shark-tail.  You swish it about experimentally, and find it quite easy to control.");
            character.body.tails.clear();
            character.body.tails.add(new Tail(TailType.SHARK));
        }
        // Hair
        if (character.body.hair.color !== "silver" && randInt(4) === 0 && changes < changeLimit) {
            changes++;
            CView.text("\n\nYou feel a tingling in your scalp and reach up to your head to investigate. To your surprise, your hair color has changed into a silvery color, just like that of a shark girl!");
            character.body.hair.color = "silver";
        }
        // Skin
        if (((character.body.skin.tone !== "rough gray" && character.body.skin.tone !== "orange and black striped") || character.body.skin.type !== SkinType.PLAIN) && randInt(7) === 0 && changes < changeLimit) {
            CView.text("\n\n");
            if (character.body.skin.type === SkinType.FUR || character.body.skin.type === SkinType.SCALES) CView.text("Your " + character.body.skin.desc + " falls out, collecting on the floor and exposing your supple skin underneath.  ");
            else if (character.body.skin.type === SkinType.GOO) CView.text("Your gooey skin solidifies, thickening up as your body starts to solidy into a more normal form. ");
            else if (!this.enhanced) CView.text("Your skin itches and tingles becoming slightly rougher and turning gray.  ");
            if (!this.enhanced) {
                CView.text("You abruptly stop moving and gasp sharply as a shudder goes up your entire frame. Your skin begins to shift and morph, growing slightly thicker and changing into a shiny grey color. Your skin now feels oddly rough too, comparable to that of a marine mammal. You smile and run your hands across your new shark skin.");
                character.body.skin.type = SkinType.PLAIN;
                character.body.skin.desc = "skin";
                character.body.skin.tone = "rough gray";
                changes++;
            }
            else {
                CView.text("Your skin begins to tingle and itch, before rapidly shifting to a shiny orange color, marked by randIntom black stripes. You take a quick look in a nearby pool of water, to see your skin has morphed in appearance and texture to become more like a tigershark!");
                character.body.skin.type = SkinType.PLAIN;
                character.body.skin.desc = "skin";
                character.body.skin.tone = "orange and black striped";
                changes++;
            }
        }
        // FINZ R WINGS
        if (character.body.wings.type !== WingType.SHARK_FIN && changes < changeLimit && randInt(3) === 0) {
            CView.text("\n\n");
            if (character.body.wings.type > WingType.NONE) CView.text("Your wings fold into themselves, merging together with your back.  ");
            CView.text("You groan and slump down in pain, almost instantly regretting eating the tooth. You start sweating profusely and panting loudly, feeling the space between your shoulder blades shifting about. You hastily remove your " + character.inventory.armor.displayName + " just in time before a strange fin-like structure bursts from in-between your shoulders. You examine it carefully and make a few modifications to your " + character.inventory.armor.displayName + " to accommodate your new fin.");
            character.body.wings.type = WingType.SHARK_FIN;
            character.body.wings.desc = "";
            changes++;
        }
        if (changes === 0) {
            CView.text("\n\nNothing happened.  Weird.");
        }
    }
}
