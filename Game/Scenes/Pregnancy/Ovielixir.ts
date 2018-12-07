import { IPregnancyEvent } from 'Game/Character/Body/Pregnancy/IPregnancyEvent';
import { Character } from 'Game/Character/Character';
import { Womb } from 'Game/Character/Body/Pregnancy/Womb';
import { PregnancyType } from 'Game/Character/Body/Pregnancy/Pregnancy';
import { CView } from 'Page/ContentView';
import { Vagina, VaginaLooseness } from 'Game/Character/Body/Vagina';
import { describeVagina } from 'Game/Descriptors/VaginaDescriptor';
import { displayStretchVagina } from 'Game/Modifiers/VaginaModifier';
import { EggPregnancy } from 'Game/Character/Body/Pregnancy/EggPregnancy';
import { EffectType } from 'Game/Effects/EffectType';
import { numToCardinalText } from 'Game/Utilities/NumToText';
import { EggType } from 'Game/Items/Consumables/Eggs';

class OvielixirPregnancyEvents implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy && womb.pregnancy.type === PregnancyType.OVIELIXIR_EGGS) {
            if (player.body.vaginas.length === 0) {
                CView.text("\n<b>Your pregnant belly suddenly begins shrinking, until it disappears.</b>\n");
                womb.clear(); // Clear Pregnancy
            }
            // Birth scenes
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy!.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        if (womb.pregnancy && womb.pregnancy.incubation === 1) {
            const eggPreg = womb.pregnancy as EggPregnancy;
            CView.text("\n");
            if (player.body.vaginas.length === 0) {
                CView.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.\n\n");
                player.body.vaginas.add(new Vagina());
            }
            // Small egg scenes
            if (!eggPreg.large) {
                // light quantity
                if (eggPreg.amount < 10) {
                    CView.text("You are interrupted as you find yourself overtaken by an uncontrollable urge to undress and squat.   You berate yourself for giving in to the urge for a moment before feeling something shift.  You hear the splash of fluid on the ground and look down to see a thick greenish fluid puddling underneath you.  There is no time to ponder this development as a rounded object passes down your birth canal, spreading your feminine lips apart and forcing a blush to your cheeks.  It plops into the puddle with a splash, and you find yourself feeling visibly delighted to be laying such healthy eggs.   Another egg works its way down and you realize the process is turning you on more and more.   In total you lay ");
                    CView.text(eggDescript(eggPreg));
                    CView.text(", driving yourself to the very edge of orgasm.");
                    player.stats.lustNoResist = 100;

                }
                // High quantity
                else {
                    CView.text("A strange desire overwhelms your sensibilities, forcing you to shed your " + player.inventory.armor.displayName + " and drop to your hands and knees.   You manage to roll over and prop yourself up against a smooth rock, looking down over your pregnant-looking belly as green fluids leak from you, soaking into the ground.   A powerful contraction rips through you and your legs spread instinctively, opening your " + describeVagina(player, player.body.vaginas.get(0)) + " to better deposit your precious cargo.   You see the rounded surface of an egg peek through your lips, mottled with strange colors.   You push hard and it drops free with an abrupt violent motion.  The friction and slimy fluids begin to arouse you, flooding your groin with heat as you feel the second egg pushing down.  It slips free with greater ease than the first, arousing you further as you bleat out a moan from the unexpected pleasure.  Before it stops rolling on the ground, you feel the next egg sliding down your slime-slicked passage, rubbing you perfectly as it slides free.  You lose count of the eggs and begin to masturbate, ");
                    if (player.body.clit.length > 5) CView.text("jerking on your huge clitty as if it were a cock, moaning and panting as each egg slides free of your diminishing belly.  You lubricate it with a mix of your juices and the slime until ");
                    if (player.body.clit.length > 2 && player.body.clit.length <= 5) CView.text("playing with your over-large clit as if it were a small cock, moaning and panting as the eggs slide free of your diminishing belly.  You spread the slime and cunt juice over it as you tease and stroke until ");
                    if (player.body.clit.length <= 2) CView.text("pulling your folds wide and playing with your clit as another egg pops free from your diminishing belly.  You make wet 'schlick'ing sounds as you spread the slime around, vigorously frigging yourself until ");
                    CView.text("you quiver in orgasm, popping out the last of your eggs as your body twitches nervelessly on the ground.   In total you lay " + eggDescript(eggPreg) + ".");
                    player.orgasm();
                }
            }
            // Large egg scene
            else {
                CView.text("A sudden shift in the weight of your pregnant belly staggers you, dropping you to your knees.  You realize something is about to be birthed, and you shed your " + player.inventory.armor.displayName + " before it can be ruined by what's coming.  A contraction pushes violently through your midsection, ");
                if (player.body.vaginas.get(0)!.looseness < VaginaLooseness.LOOSE) CView.text("stretching your tight cunt painfully, the lips opening wide ");
                if (player.body.vaginas.get(0)!.looseness >= VaginaLooseness.LOOSE && player.body.vaginas.get(0)!.looseness <= VaginaLooseness.GAPING_WIDE) CView.text("temporarily stretching your cunt-lips wide-open ");
                if (player.body.vaginas.get(0)!.looseness > VaginaLooseness.GAPING_WIDE) CView.text("parting your already gaping lips wide ");
                CView.text("as something begins sliding down your passage.  A burst of green slime soaks the ground below as the birthing begins in earnest, and the rounded surface of a strangely colored egg peaks between your lips.  You push hard and the large egg pops free at last, making you sigh with relief as it drops into the pool of slime.  The experience definitely turns you on, and you feel your clit growing free of its hood as another big egg starts working its way down your birth canal, rubbing your sensitive vaginal walls pleasurably.   You pant and moan as the contractions stretch you tightly around the next, slowly forcing it out between your nether-lips.  The sound of a gasp startles you as it pops free, until you realize it was your own voice responding to the sudden pressure and pleasure.  Aroused beyond reasonable measure, you begin to masturbate ");
                if (player.body.clit.length > 5) CView.text("your massive cock-like clit, jacking it off with the slimy birthing fluids as lube.   It pulses and twitches in time with your heartbeats, its sensitive surface overloading your fragile mind with pleasure.  ");
                if (player.body.clit.length > 2 && player.body.clit.length <= 5) CView.text("your large clit like a tiny cock, stroking it up and down between your slime-lubed thumb and fore-finger.  It twitches and pulses with your heartbeats, the incredible sensitivity of it overloading your fragile mind with waves of pleasure.  ");
                if (player.body.clit.length <= 2) CView.text("your " + describeVagina(player, player.body.vaginas.get(0)) + " by pulling your folds wide and playing with your clit.  Another egg pops free from your diminishing belly, accompanied by an audible burst of relief.  You make wet 'schlick'ing sounds as you spread the slime around, vigorously frigging yourself.  ");
                CView.text("You cum hard, the big eggs each making your cunt gape wide just before popping free.  You slump down, exhausted and barely conscious from the force of the orgasm.  ");
                if (eggPreg.amount >= 11) CView.text("Your swollen belly doesn't seem to be done with you, as yet another egg pushes its way to freedom.   The stimulation so soon after orgasm pushes you into a pleasure-stupor.  If anyone or anything discovered you now, they would see you collapsed next to a pile of eggs, your fingers tracing the outline of your " + describeVagina(player, player.body.vaginas.get(0)) + " as more and more eggs pop free.  In time your wits return, leaving you with the realization that you are no longer pregnant.  ");
                CView.text("\n\nYou gaze down at the mess, counting " + eggDescript(eggPreg) + ".");
                player.orgasm();
            }
            CView.text("\n\n<b>You feel compelled to leave the eggs behind, ");
            if (player.effects.has(EffectType.AteEgg)) CView.text("but you remember the effects of the last one you ate.\n</b>");
            else CView.text("but your body's intuition reminds you they shouldn't be fertile, and your belly rumbles with barely contained hunger.\n</b>");
            displayStretchVagina(player, 20, true);
            player.effects.create(EffectType.LootEgg);
            womb.clear(); // Clear Pregnancy
        }
    }
}

export const OvielixirPregEvent = new OvielixirPregnancyEvents();

function eggDescript(eggPreg: EggPregnancy, plural: boolean = true): string {
    let descript = "";
    descript += numToCardinalText(eggPreg.amount) + " ";
    // size descriptor
    if (eggPreg.large) descript += "large ";
    /*color descriptor
    0 - brown - ass expansion
    1 - purple - hip expansion
    2 - blue - vaginal removal and/or growth of existing maleness
    3 - pink - dick removal and/or fertility increase.
    4 - white - breast growth.  If lactating increases lactation.
    5 - rubbery black -
    */
    if (eggPreg.eggType === EggType.Brown) descript += "brown ";
    if (eggPreg.eggType === EggType.Purple) descript += "purple ";
    if (eggPreg.eggType === EggType.Blue) descript += "blue ";
    if (eggPreg.eggType === EggType.Pink) descript += "pink ";
    if (eggPreg.eggType === EggType.White) descript += "white ";
    if (eggPreg.eggType === EggType.Black) descript += "rubbery black ";
    // EGGS
    if (plural) descript += "eggs";
    else descript += "egg";
    return descript;
}
