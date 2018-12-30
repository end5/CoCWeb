import { Flags } from 'Game/Flags';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { passTime } from '../PassTime';
import { Cock } from 'Game/Character/Body/Cock';
import { describeCock, nounCock, describeCocksLight, describeOneOfYourCocks } from 'Game/Descriptors/CockDescriptor';
import { numToCardinalText } from 'Game/Utilities/NumToText';
import { describeHips } from 'Game/Descriptors/HipDescriptor';
import { BreastRow } from 'Game/Character/Body/BreastRow';
import { describeAllBreasts, describeNipple } from 'Game/Descriptors/BreastDescriptor';
import { describeSack, describeBalls } from 'Game/Descriptors/BallsDescriptor';
import { describeButt } from 'Game/Descriptors/ButtDescriptor';
import { describeVagina, describeClit } from 'Game/Descriptors/VaginaDescriptor';
import { VaginaWetness } from 'Game/Character/Body/Vagina';
import { describeFeet, describeLegs } from 'Game/Descriptors/LegDescriptor';
import { randInt } from 'Engine/Utilities/SMath';
import { sceneNotImplimented } from 'Game/Scenes/NotImplemented';

export const DesertFlags = Flags.register("Desert", {
    TIMES_EXPLORED: 0,
});

export function exploreDesert(player: Character): NextScreenChoices {
    return sceneNotImplimented();
}

// Massive bodyparts scene
// [DESERT]
// [RANDOM SCENE IF CHARACTER HAS AT LEAST ONE COCK LARGER THAN THEIR HEIGHT,
// AND THE TOTAL COMBINED WIDTH OF ALL THEIR COCKS IS TWELVE INCHES OR GREATER]
export function bigJunkDesertScene(player: Character): NextScreenChoices {

    const longestCock = player.body.cocks.sort(Cock.Longest).get(0)!;
    // PARAGRAPH 1
    CView.text("Walking along the sandy dunes of the desert you find yourself increasingly impeded by the bulk of your " + describeCock(player, longestCock) + " dragging along the sandscape behind you.  The incredibly hot surface of the desert causes your loins to sweat heavily and fills them with relentless heat.");

    if (player.body.cocks.length === 1) CView.text("  As it drags along the dunes, the sensation forces you to imagine the rough textured tongue of a monstrous animal sliding along the head of your " + nounCock(longestCock.type) + ".");
    else if (player.body.cocks.length >= 2) CView.text("  With all of your " + describeCocksLight(player) + " dragging through the sands they begin feeling as if the rough textured tongues of " + numToCardinalText(player.body.cocks.length) + " different monstrous animals were slobbering over each one.");
    CView.text("\n\n");

    // PARAGRAPH 2

    // FOR NON-CENTAURS]
    if (!player.body.legs.isTaur()) {
        CView.text("The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + describeCocksLight(player) + ", which forces your torso to the ground.  Normally your erection would merely raise itself skyward but your genitals have grown too large and heavy for your " + describeHips(player) + " to hold them aloft.  Instead you feel your body forcibly pivoting at the hips until your torso is compelled to rest face down on top of your obscene " + describeCocksLight(player) + ".");

        // IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 35) CView.text("  Your " + describeAllBreasts(player) + " hang lewdly off your torso to rest on the desert sands, seeming to bury the dunes on either side of you.  Their immense weight anchors your body, further preventing your torso from lifting itself up.  The burning heat of the desert teases your " + describeNipple(player, player.body.chest.get(0)) + "s mercilessly as they grind in the sand.");
        // IF CHARACTER HAS A BALLS ADD SENTENCE
        if (player.body.balls.count > 0) CView.text("  Your " + player.body.skin.tone + describeSack(player) + " rests beneath your raised " + describeButt(player) + ".  The fiery warmth of the desert caresses it, causing your " + describeBalls(true, true, player) + " to pulse with the need to release their sperm through your " + describeCocksLight(player) + ".");
        // IF CHARACTER HAS A VAGINA ADD SENTENCE
        if (player.body.vaginas.length >= 1) {
            CView.text("  Your " + describeVagina(player, player.body.vaginas.get(0)) + " and " + describeClit(player) + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + describeButt(player) + " above.");
            // IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
            if (player.body.vaginas.get(0)!.wetness >= VaginaWetness.DROOLING) CView.text("  Juices stream from your womanhood and begin pooling on the hot sand beneath you.  Wisps of steam rise up into the air only to tease your genitals further.  ");
        }
    }
    // FOR CENTAURS
    else {
        CView.text("The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + describeCocksLight(player) + ", which forces the barrel of your horse-like torso to the ground.  Normally your erection would merely hover above the ground in between your centaurian legs, but your genitals have grown too large and heavy for your " + describeHips(player) + " to hold them aloft.  Instead, you feel your body being forcibly pulled down at your hindquarters until you rest atop your " + describeCocksLight(player) + ".");
        // IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 35) CView.text("  Your " + describeAllBreasts(player) + " pull your human torso forward until it also is forced to rest facedown, just like your horse half.  Your tits rest, pinned on the desert sand to either side of you.  Their immense weight anchors you, further preventing any part of your equine body from lifting itself up.  The burning heat of the desert teases your " + describeNipple(player, player.body.chest.get(0)) + "s incessantly.");
        // IF CHARACTER HAS A BALLS ADD SENTENCE
        if (player.body.balls.count > 0) CView.text("  Your " + player.body.skin.tone + describeSack(player) + " rests beneath your raised " + describeButt(player) + ".  The airy warmth of the desert teases it, causing your " + describeBalls(true, true, player) + " pulse with the need to release their sperm through your " + describeCocksLight(player) + ".");
        // IF CHARACTER HAS A VAGINA ADD SENTENCE
        if (player.body.vaginas.length >= 1) {
            CView.text("  Your " + describeVagina(player, player.body.vaginas.get(0)) + " and " + describeClit(player) + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + describeButt(player) + " above.");
            // IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
            if (player.body.vaginas.get(0)!.wetness >= VaginaWetness.DROOLING) CView.text("  The desert sun beats down on your body, its fiery heat inflaming the senses of your vaginal lips.  Juices stream from your womanhood and begin pooling on the hot sand beneath you.");
        }
    }
    CView.text("\n\n");
    // PARAGRAPH 3
    CView.text("You realize you are effectively trapped here by your own body.");
    // CORRUPTION BASED CHARACTER'S VIEW OF SITUATION
    if (player.stats.cor < 33) CView.text("  Panic slips into your heart as you realize that if any dangerous predator were to find you in this state, you'd be completely defenseless.  You must find a way to regain your mobility immediately!");
    else if (player.stats.cor < 66) CView.text("  You realize that if any dangerous predator were to find you in this state you'd be completely defenseless.  You must find a way to regain your mobility... yet there is a certain appeal to imagining how pleasurable it would be for a sexual predator to take advantage of your obscene body.");
    else CView.text("  Your endowments have rendered you completely helpless should any predators find you.  Somewhere in your heart, you're exhilarated at the prospect.  The idea of being a helpless fucktoy for a wandering beast is unusually inviting to you.  Were it not for the thought that you might die of thirst in the desert, you'd be incredibly tempted to remain right where you are.");

    // SCENE END = IF CHARACTER HAS FULL WINGS ADD SENTENCE
    if (player.canFly()) CView.text("  You extend your wings and flap as hard as you can, until at last you manage to lighten the bulk of your body somewhat - enough to allow yourself to drag your genitals across the hot sands and back to camp.  The ordeal takes nearly an hour.");
    // SCENE END IF CHARACTER HAS CENTAUR BODY
    else if (player.body.legs.isTaur()) CView.text("  You struggle and work your equine legs against the surface of the dune you are trapped on.  Your " + describeFeet(player) + " have consistent trouble finding footing, the soft sand failing to provide enough leverage to lift your bulk.  You breath in deeply and lean from side to side, trying to find some easier vertical leverage.  Eventually, with a crude crawl, your legs manage to push the bulk of your body onto more solid ground.  With great difficulty, you spend the next hour shuffling your genitals across the sandscape and back to camp.");
    // SCENE END = FOR ALL OTHER CHARACTERS
    else CView.text("  You struggle and push with your " + describeLegs(player) + " as hard as you can, but it's no use.  You do the only thing you can and begin stroking your " + describeCocksLight(player) + " with as much vigor as you can muster.  Eventually your body tenses and a light load of jizz erupts from your body, but the orgasm is truly mild compared to what you need.  You're simply too weary from struggling to give yourself the masturbation you truly need, but you continue to try.  Nearly an hour later " + describeOneOfYourCocks(player) + " softens enough to allow you to stand again, and you make your way back to camp, still dragging your genitals across the warm sand.");
    player.stats.lustNoResist += 25 + randInt(player.stats.cor / 5);

    player.stats.fatigue += 5;
    return { next: passTime(1) };
}
