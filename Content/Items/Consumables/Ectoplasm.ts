import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { CockType } from 'Engine/Body/Cock';
import { SkinType } from 'Engine/Body/Skin';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { describeSkin } from 'Content/Descriptors/SkinDescriptor';
import { describeCock } from 'Content/Descriptors/CockDescriptor';
import { describeHips } from 'Content/Descriptors/HipDescriptor';
import { describeLegs } from 'Content/Descriptors/LegDescriptor';
import { CView } from 'Engine/Display/ContentView';
import { displayCharacterHPChange } from 'Content/Modifiers/StatModifier';

// Miscellaneous
// ITEM GAINED FROM LUST WINS
// bottle of ectoplasm. Regular stat-stuff include higher speed, (reduced libido?), reduced sensitivity, and higher intelligence. First-tier effects include 50/50 chance of sable skin with bone-white veins or ivory skin with onyx veins. Second tier, \"wisp-like legs that flit back and forth between worlds,\" or \"wisp-like legs\" for short. Third tier gives an \"Ephemeral\" perk, makes you (10%, perhaps?) tougher to hit, and gives you a skill that replaces tease/seduce�allowing the PC to possess the creature and force it to masturbate to gain lust. Around the same effectiveness as seduce.
// Mouseover script: \"The green-tinted, hardly corporeal substance flows like a liquid inside its container. It makes you feel...uncomfortable, as you observe it.\"

// Bottle of Ectoplasm Text
export class Ectoplasm extends Consumable {
    public constructor() {
        super(ConsumableName.Ectoplasm, new ItemDesc("EctoPls", "a bottle of ectoplasm", "The green-tinted, hardly corporeal substance flows like a liquid inside its container. It makes you feel... uncomfortable, as you observe it."));
    }

    public use(character: Character) {
        CView.clear();
        CView.text("You grimace and uncork the bottle, doing your best to ignore the unearthly smell drifting up to your nostrils. Steeling yourself, you raise the container to your lips and chug the contents, shivering at the feel of the stuff sliding down your throat.  Its taste, at least, is unexpectedly pleasant.  Almost tastes like oranges.");
        let changes: number = 0;
        let changeLimit: number = 1;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (character.effects.has(EffectType.HistoryAlchemist)) changeLimit++;
        // Effect script 1:  (higher intelligence)
        if (character.stats.int < 100 && randInt(3) === 0 && changes < changeLimit) {
            CView.text("\n\nYou groan softly as your head begins pounding something fierce.  Wincing in pain, you massage your temples as the throbbing continues, and soon, the pain begins to fade; in its place comes a strange sense of sureness and wit.");
            character.stats.int += 1;
            if (character.stats.int < 50)
                character.stats.int += 1;

            changes++;
        }
        // Effect script 2:  (lower sensitivity)
        if (character.stats.sens >= 20 && randInt(3) === 0 && changes < changeLimit) {
            CView.text("\n\nWoah, what the... you pinch your " + describeSkin(character) + " to confirm your suspicions; the ghostly snack has definitely lowered your sensitivity.");
            character.stats.sens -= 2;
            if (character.stats.sens >= 75)
                character.stats.sens -= 2;
            changes++;
        }
        // Effect script 3:  (higher libido)
        if (character.stats.lib < 100 && randInt(3) === 0 && changes < changeLimit) {
            // ([if libido >49]
            if (character.stats.lib < 50) CView.text("\n\nIdly, you drop a hand to your crotch as");
            else CView.text("\n\nWith a substantial amount of effort, you resist the urge to stroke yourself as");
            CView.text(" a trace amount of the ghost girl's lust is transferred into you.  How horny IS she, you have to wonder...");
            character.stats.lib += 1;
            if (character.stats.lib < 50)
                character.stats.lib += 1;
            changes++;
        }
        // Effect script a:  (human wang)
        if (character.body.cocks.length > 0 && changes < changeLimit) {
            if (randInt(3) === 0 && character.body.cocks.get(0)!.type !== CockType.HUMAN) {
                CView.text("\n\nA strange tingling begins behind your " + describeCock(character, character.body.cocks.get(0)) + ", slowly crawling up across its entire length.  While neither particularly arousing nor uncomfortable, you do shift nervously as the feeling intensifies.  You resist the urge to undo your " + character.inventory.armor.displayName + " to check, but by the feel of it, your penis is shifting form.  Eventually the transformative sensation fades, <b>leaving you with a completely human penis.</b>");
                character.body.cocks.get(0)!.type = CockType.HUMAN;
                changes++;
            }
        }
        // Appearnace Change
        // Hair
        if (randInt(4) === 0 && changes < changeLimit && character.body.hair.type !== 2) {
            CView.text("\n\nA sensation of weightlessness assaults your scalp. You reach up and grab a handful of hair, confused. Your perplexion only heightens when you actually feel the follicles becoming lighter in your grasp, before you can hardly tell you're holding anything.  Plucking a strand, you hold it up before you, surprised to see... it's completely transparent!  You have transparent hair!");
            character.body.hair.type = 2;
            changes++;
        }
        // Skin
        if (randInt(4) === 0 && changes < changeLimit && (character.body.skin.tone !== "sable" && character.body.skin.tone !== "white")) {
            if (randInt(2) === 0) {
                CView.text("\n\nA warmth begins in your belly, slowly spreading through your torso and appendages. The heat builds, becoming uncomfortable, then painful, then nearly unbearable. Your eyes unfocus from the pain, and by the time the burning sensation fades, you can already tell something's changed. You raise a hand, staring at the milky-white flesh. Your eyes are drawn to the veins in the back of your hand, darkening to a jet black as you watch. <b>You have white skin, with black veins!</b>");
                character.body.skin.tone = "white";
                character.body.skin.adj = "milky";
                character.body.skin.desc = "skin";
                character.body.skin.type = SkinType.PLAIN;
            }
            else {
                CView.text("\n\nA warmth begins in your belly, slowly spreading through your torso and appendages. The heat builds, becoming uncomfortable, then painful, then nearly unbearable. Your eyes unfocus from the pain, and by the time the burning sensation fades, you can already tell something's changed. You raise a hand, staring at the sable flesh. Your eyes are drawn to the veins in the back of your hand, brightening to an ashen tone as you watch.  <b>You have black skin, with white veins!</b>");
                character.body.skin.tone = "sable";
                character.body.skin.adj = "ashen";
                character.body.skin.desc = "skin";
                character.body.skin.type = SkinType.PLAIN;
            }
            changes++;
        }
        // Legs
        if (changes < changeLimit && !character.effects.has(EffectType.Incorporeality) && (character.body.skin.tone === "white" || character.body.skin.tone === "sable") && character.body.hair.type === 2) {
            // (ghost-legs!  Absolutely no problem with regular encounters, though! [if you somehow got this with a centaur it'd probably do nothing cuz you're not supposed to be a centaur with ectoplasm ya dingus])
            CView.text("\n\nAn otherworldly sensation begins in your belly, working its way to your " + describeHips(character) + ". Before you can react, your " + describeLegs(character) + " begin to tingle, and you fall on your rump as a large shudder runs through them. As you watch, your lower body shimmers, becoming ethereal, wisps rising from the newly ghost-like " + describeLegs(character) + ". You manage to rise, surprised to find your new, ghostly form to be as sturdy as its former corporeal version. Suddenly, like a dam breaking, fleeting visions and images flow into your head, never lasting long enough for you to concentrate on one. You don't even realize it, but your arms fly up to your head, grasping your temples as you groan in pain. As fast as the mental bombardment came, it disappears, leaving you with a surprising sense of spiritual superiority.  <b>You have ghost legs!</b>\n\n");
            CView.text("<b>(Gained Perk:  Incorporeality</b>)");
            character.effects.create(EffectType.Incorporeality);
        }
        // Effect Script 8: 100% chance of healing
        if (changes === 0) {
            CView.text("You feel strangely refreshed, as if you just gobbled down a bottle of sunshine.  A smile graces your lips as vitality fills you.  ");
            displayCharacterHPChange(character, character.stats.level * 5 + 10);
            changes++;
        }
        // Incorporeality Perk Text:  You seem to have inherited some of the spiritual powers of the residents of the afterlife!  While you wouldn't consider doing it for long due to its instability, you can temporarily become incorporeal for the sake of taking over enemies and giving them a taste of ghostly libido.

        // Sample possession text (>79 int, perhaps?):  With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into your opponent's frame. Before they can regain the initiative, you take control of one of their arms, vigorously masturbating for several seconds before you're finally thrown out. Recorporealizing, you notice your enemy's blush, and know your efforts were somewhat successful.
        // Failure:  With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into the opponent's frame. Unfortunately, it seems they were more mentally prepared than you hoped, and you're summarily thrown out of their body before you're even able to have fun with them. Darn, you muse. Gotta get smarter.
    }
}
