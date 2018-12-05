import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { BreastRow } from 'Game/Character/Body/BreastRow';
import { EarType } from 'Game/Character/Body/Ears';
import { FaceType } from 'Game/Character/Body/Face';
import { LegType } from 'Game/Character/Body/Legs';
import { PregnancyType } from 'Game/Character/Body/Pregnancy/Pregnancy';
import { SkinType } from 'Game/Character/Body/Skin';
import { Tail, TailType } from 'Game/Character/Body/Tail';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { ItemDesc } from '../ItemDesc';
import { Gender } from 'Game/Character/Body/GenderIdentity';
import { assholeOrPussy } from 'Game/Descriptors/BodyDescriptor';
import { describeOneOfYourCocks } from 'Game/Descriptors/CockDescriptor';
import { describeButthole, describeButt } from 'Game/Descriptors/ButtDescriptor';
import { describeNipple } from 'Game/Descriptors/BreastDescriptor';
import { describeBalls, describeSack } from 'Game/Descriptors/BallsDescriptor';
import { describeVagina, describeClit } from 'Game/Descriptors/VaginaDescriptor';
import { describeLegs, describeLeg } from 'Game/Descriptors/LegDescriptor';
import { mf } from 'Game/Descriptors/GenderDescriptor';
import { describeFaceShort } from 'Game/Descriptors/FaceDescriptor';
import { CView } from 'Page/ContentView';
import { Womb } from 'Game/Character/Body/Pregnancy/Womb';
import { displayModFem } from 'Game/Modifiers/BodyModifier';
import { bunnyRaceScore } from 'Game/Character/RaceScore';

export class NeonPinkEgg extends Consumable {
    public constructor(pregnantChange: boolean) {
        if (pregnantChange)
            super(ConsumableName.NeonPinkEggPreg, new ItemDesc("NPnkEggPreg", "a neon pink egg", "This is an oblong egg with an unnatural neon pink coloration.  It tingles in your hand with odd energies that make you feel as if you could jump straight into the sky."));
        else
            super(ConsumableName.NeonPinkEgg, new ItemDesc("NPnkEgg", "a neon pink egg", "This is an oblong egg with an unnatural neon pink coloration.  It tingles in your hand with odd energies that make you feel as if you could jump straight into the sky."));
    }

    public use(character: Character) {
        let changes: number = 0;
        let changeLimit: number = 1;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(2) === 0) changeLimit++;
        if (character.effects.has(EffectType.HistoryAlchemist)) changeLimit++;
        // If this is a pregnancy change, only 1 change per proc.
        if (this.name === ConsumableName.NeonPinkEggPreg) changeLimit = 1;
        else CView.clear();
        // If not pregnancy, mention eating it.
        if (this.name !== ConsumableName.NeonPinkEggPreg) CView.text("You eat the neon pink egg, and to your delight it tastes sweet, like candy.  In seconds you've gobbled down the entire thing, and you lick your fingers clean before you realize you ate the shell - and it still tasted like candy.");
        // If pregnancy, warning!
        if (this.name === ConsumableName.NeonPinkEggPreg) {
            CView.text("\n<b>Your egg-stuffed ");
            const hasEggFilledVagina = character.body.wombs.find(Womb.PregnantWithType(PregnancyType.BUNNY));
            const hasEggFilledButt = character.body.buttWomb.pregnancy && character.body.buttWomb.pregnancy.type === PregnancyType.BUNNY;
            if (hasEggFilledVagina) {
                CView.text("womb ");
                if (hasEggFilledButt)
                    CView.text("and ");
            }

            if (hasEggFilledButt) CView.text("backdoor ");
            if (hasEggFilledButt && hasEggFilledVagina) CView.text("rumble");
            else CView.text("rumbles");
            CView.text(" oddly, and you have a hunch that something's about to change</b>.");
        }
        // STATS CHANGURYUUUUU
        // Boost speed (max 80!)
        if (changes < changeLimit && randInt(3) === 0 && character.stats.spe < 80) {
            if (character.stats.spe < 30) CView.text("\n\nTingles run through your muscles, and your next few movements seem unexpectedly fast.  The egg somehow made you faster!");
            else if (character.stats.spe < 50) CView.text("\n\nYou feel tingles running through your body, and after a moment, it's clear that you're getting faster.");
            else if (character.stats.spe < 65) CView.text("\n\nThe tight, ready feeling you've grown accustomed to seems to intensify, and you know in the back of your mind that you've become even faster.");
            else CView.text("\n\nSomething changes in your physique, and you grunt, chopping an arm through the air experimentally.  You seem to move even faster than before, confirming your suspicions.");
            changes++;
            if (character.stats.spe < 35) character.stats.spe += 1;
            character.stats.spe += 1;
        }
        // Boost libido
        if (changes < changeLimit && randInt(5) === 0) {
            changes++;
            character.stats.lib += 1;
            character.stats.lust += 5 + character.stats.lib / 7;
            if (character.stats.lib < 30) character.stats.lib += 1;
            if (character.stats.lib < 40) character.stats.lib += 1;
            if (character.stats.lib < 60) character.stats.lib += 1;
            // Lower ones are gender specific for some reason
            if (character.stats.lib < 60) {
                // (Cunts or assholes!
                if (character.body.cocks.length <= 0 || (character.gender === Gender.HERM && randInt(2) === 0)) {
                    if (character.stats.lib < 30) {
                        CView.text("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to breed until you're swollen and pregnant.  ");
                        if (character.stats.cor < 25) CView.text("You're repulsed by such shameful thoughts.");
                        else if (character.stats.cor < 60) CView.text("You worry that this place is really getting to you.");
                        else if (character.stats.cor < 90) CView.text("You pant a little and wonder where the nearest fertile male is.");
                        else CView.text("You grunt and groan with desire and disappointment.  You should get bred soon!");
                    }
                    else CView.text("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to your " + assholeOrPussy(character) + ", and you're struck by just how empty it feels.  The desire to be filled, not by a hand or a finger but by a virile male, rolls through you like a wave, steadily increasing your desire for sex.");
                }
                // WANGS!
                if (character.body.cocks.length > 0) {
                    if (character.stats.lib < 30) {
                        CView.text("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to fuck a ");
                        if (randInt(2) === 0) CView.text("female hare until she's immobilized by all her eggs");
                        else CView.text("herm rabbit until her sack is so swollen that she's forced to masturbate over and over again just to regain mobility");
                        CView.text(". ");
                        if (character.stats.cor < 25) CView.text("You're repulsed by such shameful thoughts.");
                        else if (character.stats.cor < 50) CView.text("You worry that this place is really getting to you.");
                        else if (character.stats.cor < 75) CView.text("You pant a little and wonder where the nearest fertile female is.");
                        else CView.text("You grunt and groan with desire and disappointment.  Gods you need to fuck!");
                    }
                    else CView.text("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to " + describeOneOfYourCocks(character) + ", and you groan from how tight and hard it feels.  The desire to squeeze it, not with your hand but with a tight pussy or puckered asshole, runs through you like a wave, steadily increasing your desire for sex.");
                }
            }
            // Libido over 60? FUCK YEAH!
            else if (character.stats.lib < 80) {
                CView.text("\n\nYou fan your neck and start to pant as your " + character.body.skin.tone + " skin begins to flush red with heat");
                if (character.body.skin.type > SkinType.PLAIN) CView.text(" through your " + character.body.skin.desc);
                CView.text(".  ");
                if (character.gender === Gender.MALE) CView.text("Compression tightens down on " + describeOneOfYourCocks(character) + " as it strains against your " + character.inventory.armor.displayName + ".  You struggle to fight down your heightened libido, but it's hard - so very hard.");
                else if (character.gender === Gender.NONE) CView.text("Sexual hunger seems to gnaw at your " + describeButthole(character.body.butt) + ", demanding it be filled, but you try to resist your heightened libido.  It's so very, very hard.");
                else if (character.gender === Gender.FEMALE) CView.text("Moisture grows between your rapidly-engorging vulva, making you squish and squirm as you try to fight down your heightened libido, but it's hard - so very hard.");
                else CView.text("Steamy moisture and tight compression war for your awareness in your groin as " + describeOneOfYourCocks(character) + " starts to strain against your " + character.inventory.armor.displayName + ".  Your vulva engorges with blood, growing slicker and wetter.  You try so hard to fight down your heightened libido, but it's so very, very hard.  The urge to breed lingers in your mind, threatening to rear its ugly head.");
            }
            // MEGALIBIDO
            else {
                CView.text("\n\nDelicious, unquenchable desire rises higher and higher inside you, until you're having trouble tamping it down all the time.  A little, nagging voice questions why you would ever want to tamp it down.  It feels so good to give in and breed that you nearly cave to the delicious idea on the spot.  Life is beginning to look increasingly like constant fucking or masturbating in a lust-induced haze, and you're having a harder and harder time finding fault with it.  ");
                if (character.stats.cor < 33) CView.text("You sigh, trying not to give in completely.");
                else if (character.stats.cor < 66) CView.text("You pant and groan, not sure how long you'll even want to resist.");
                else {
                    CView.text("You smile and wonder if you can ");
                    if (character.stats.lib < 100) CView.text("get your libido even higher.");
                    else CView.text("find someone to fuck right now.");
                }
            }
        }
        // BIG sensitivity gains to 60.
        if (character.stats.sens < 60 && changes < changeLimit && randInt(3) === 0) {
            changes++;
            CView.text("\n\n");
            // (low)
            if (randInt(3) !== 2) {
                CView.text("The feeling of small breezes blowing over your " + character.body.skin.desc + " gets a little bit stronger.  How strange.  You pinch yourself and nearly jump when it hurts a tad more than you'd think. You've gotten more sensitive!");
                character.stats.sens += 5;
            }
            // (BIG boost 1/3 chance)
            else {
                character.stats.sens += 15;
                CView.text("Every movement of your body seems to bring heightened waves of sensation that make you woozy.  Your " + character.inventory.armor.displayName + " rubs your " + describeNipple(character, character.body.chest.firstRow) + "s deliciously");
                if (character.body.chest.find(BreastRow.FuckableNipples)) {
                    CView.text(", sticking to the ");
                    if (character.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier > 2) CView.text("milk-leaking nipple-twats");
                    else CView.text("slippery nipple-twats");
                }
                else if (character.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier > 2) CView.text(", sliding over the milk-leaking teats with ease");
                else CView.text(" catching on each of the hard nubs repeatedly");
                CView.text(".  Meanwhile, your crotch... your crotch is filled with such heavenly sensations from ");
                if (character.gender === Gender.MALE) {
                    CView.text(describeOneOfYourCocks(character) + " and your ");
                    if (character.body.balls.count > 0) CView.text(describeBalls(true, true, character));
                    else CView.text(describeButthole(character.body.butt));
                }
                else if (character.gender === Gender.FEMALE) CView.text("your " + describeVagina(character, character.body.vaginas.get(0)) + " and " + describeClit(character));
                else if (character.gender === Gender.HERM) {
                    CView.text(describeOneOfYourCocks(character) + ", ");
                    if (character.body.balls.count > 0) CView.text(describeBalls(true, true, character) + ", ");
                    CView.text(describeVagina(character, character.body.vaginas.get(0)) + ", and " + describeClit(character));
                }
                // oh god genderless
                else CView.text("you " + describeButthole(character.body.butt));
                CView.text(" that you have to stay stock-still to keep yourself from falling down and masturbating on the spot.  Thankfully the orgy of tactile bliss fades after a minute, but you still feel way more sensitive than your previous norm.  This will take some getting used to!");
            }
        }
        // Makes girls very girl(90), guys somewhat girly (61).
        if (changes < changeLimit && randInt(2) === 0) {
            let buffer: string = "";
            if (character.gender < 2) buffer += displayModFem(character, 61, 4);
            else buffer += displayModFem(character, 90, 4);
            if (buffer !== "") {
                CView.text(buffer);
                changes++;
            }
        }

        // De-wettification of cunt (down to 3?)!
        if (character.body.vaginas.length > 0) {
            if (character.body.vaginas.get(0)!.wetness > 3 && changes < changeLimit && randInt(3) === 0) {
                // Just to be safe
                CView.text("\n\nThe constant flow of fluids that sluice from your " + describeVagina(character, character.body.vaginas.get(0)) + " slow down, leaving you feeling a bit less like a sexual slip-'n-slide.");
                character.body.vaginas.get(0)!.wetness--;
                changes++;
            }
        }
        // Fertility boost!
        if (changes < changeLimit && randInt(4) === 0 && character.body.fertility < 50 && character.body.vaginas.length > 0) {
            character.body.fertility += 2 + randInt(5);
            changes++;
            CView.text("\n\nYou feel strange.  Fertile... somehow.  You don't know how else to think of it, but you know your body is just aching to be pregnant and give birth.");
        }
        // -VAGs
        if (character.body.vaginas.length > 0 && !character.effects.has(EffectType.BunnyEggs) && changes < changeLimit && randInt(4) === 0 && bunnyRaceScore(character) > 3) {
            CView.text("\n\nDeep inside yourself there is a change.  It makes you feel a little woozy, but passes quickly.  Beyond that, you aren't sure exactly what just happened, but you are sure it originated from your womb.\n\n");
            CView.text("(<b>Perk Gained: Bunny Eggs</b>)");
            character.effects.create(EffectType.BunnyEggs);
            changes++;
        }
        // Shrink Balls!
        if (character.body.balls.count > 0 && character.body.balls.size > 5 && randInt(3) === 0 && changes < changeLimit) {
            if (character.body.balls.size < 10) {
                CView.text("\n\nRelief washes through your groin as your " + describeBalls(false, true, character, true) + " lose about an inch of their diameter.");
                character.body.balls.size--;
            }
            else if (character.body.balls.size < 25) {
                CView.text("\n\nRelief washes through your groin as your " + describeBalls(false, true, character, true) + " lose a few inches of their diameter.  Wow, it feels so much easier to move!");
                character.body.balls.size -= (2 + randInt(3));
            }
            else {
                CView.text("\n\nRelief washes through your groin as your " + describeBalls(false, true, character, true) + " lose at least six inches of diameter.  Wow, it feels SOOOO much easier to move!");
                character.body.balls.size -= (6 + randInt(3));
            }
            changes++;
        }
        // Get rid of extra balls
        if (character.body.balls.count > 2 && changes < changeLimit && randInt(3) === 0) {
            changes++;
            CView.text("\n\nThere's a tightening in your " + describeSack(character) + " that only gets higher and higher until you're doubled over and wheezing.  When it passes, you reach down and discover that <b>two of your testicles are gone.</b>");
            character.body.balls.count -= 2;
        }
        // Boost cum production
        if ((character.body.balls.count > 0 || character.body.cocks.length > 0) && character.cumQ() < 3000 && randInt(3) === 0 && changeLimit > 1) {
            changes++;
            character.body.cumMultiplier += 3 + randInt(7);
            if (character.cumQ() >= 250) character.stats.lust += 3;
            if (character.cumQ() >= 750) character.stats.lust += 4;
            if (character.cumQ() >= 2000) character.stats.lust += 5;
            // Balls
            if (character.body.balls.count > 0) {
                // (Small cum quantity) < 50
                if (character.cumQ() < 50) CView.text("\n\nA twinge of discomfort runs through your " + describeBalls(true, true, character) + ", but quickly vanishes.  You heft your orbs but they haven't changed in size - they just feel a little bit denser.");
                // (medium cum quantity) < 250
                else if (character.cumQ() < 250) {
                    CView.text("\n\nA ripple of discomfort runs through your " + describeBalls(true, true, character) + ", but it fades into a pleasant tingling.  You reach down to heft the orbs experimentally but they don't seem any larger.");
                    if (character.body.cocks.length > 0) CView.text("  In the process, you brush " + describeOneOfYourCocks(character) + " and discover a bead of pre leaking at the tip.");
                }
                // (large cum quantity) < 750
                else if (character.cumQ() < 750) {
                    CView.text("\n\nA strong contraction passes through your " + describeSack(character) + ", almost painful in its intensity.  ");
                    if (character.body.cocks.length > 0) CView.text(describeOneOfYourCocks(character, true) + " leaks and dribbles pre-cum down your " + describeLegs(character) + " as your body's cum production kicks up even higher.");
                    else CView.text("You wince, feeling pent up and yet unable to release.  You really wish you had a cock right about now.");
                }
                // (XL cum quantity) < 2000
                else if (character.cumQ() < 2000) {
                    CView.text("\n\nAn orgasmic contraction wracks your " + describeBalls(true, true, character) + ", shivering through the potent orbs and passing as quickly as it came.  ");
                    if (character.body.cocks.length > 0) CView.text("A thick trail of slime leaks from " + describeOneOfYourCocks(character) + " down your " + describeLeg(character) + ", pooling below you.");
                    else CView.text("You grunt, feeling terribly pent-up and needing to release.  Maybe you should get a penis to go with these balls...");
                    CView.text("  It's quite obvious that your cum production has gone up again.");
                }
                // (XXL cum quantity)
                else {
                    CView.text("\n\nA body-wrenching contraction thrums through your " + describeBalls(true, true, character) + ", bringing with it the orgasmic feeling of your body kicking into cum-production overdrive.  ");
                    if (character.body.cocks.length > 0) CView.text("pre-cum explodes from " + describeOneOfYourCocks(character) + ", running down your " + describeLeg(character) + " and splattering into puddles that would shame the orgasms of lesser " + mf(character, "males", "persons") + ".  You rub yourself a few times, nearly starting to masturbate on the spot, but you control yourself and refrain for now.");
                    else CView.text("You pant and groan but the pleasure just turns to pain.  You're so backed up - if only you had some way to vent all your seed!");
                }
            }
            // NO BALLZ (guaranteed cock tho)
            else {
                // (Small cum quantity) < 50
                if (character.cumQ() < 50) CView.text("\n\nA twinge of discomfort runs through your body, but passes before you have any chance to figure out exactly what it did.");
                // (Medium cum quantity) < 250)
                else if (character.cumQ() < 250) CView.text("\n\nA ripple of discomfort runs through your body, but it fades into a pleasant tingling that rushes down to " + describeOneOfYourCocks(character) + ".  You reach down to heft yourself experimentally and smile when you see pre-beading from your maleness.  Your cum production has increased!");
                // (large cum quantity) < 750
                else if (character.cumQ() < 750) CView.text("\n\nA strong contraction passes through your body, almost painful in its intensity.  " + describeOneOfYourCocks(character, true) + " leaks and dribbles pre-cum down your " + describeLegs(character) + " as your body's cum production kicks up even higher!  Wow, it feels kind of... good.");
                // (XL cum quantity) < 2000
                else if (character.cumQ() < 2000) CView.text("\n\nAn orgasmic contraction wracks your abdomen, shivering through your midsection and down towards your groin.  A thick trail of slime leaks from " + describeOneOfYourCocks(character) + "  and trails down your " + describeLeg(character) + ", pooling below you.  It's quite obvious that your body is producing even more cum now.");
                // (XXL cum quantity)
                else CView.text("\n\nA body-wrenching contraction thrums through your gut, bringing with it the orgasmic feeling of your body kicking into cum-production overdrive.  pre-cum explodes from " + describeOneOfYourCocks(character) + ", running down your " + describeLegs(character) + " and splattering into puddles that would shame the orgasms of lesser " + mf(character, "males", "persons") + ".  You rub yourself a few times, nearly starting to masturbate on the spot, but you control yourself and refrain for now.");
            }
        }
        // Bunny feet! - requirez earz
        if (character.body.legs.type !== LegType.BUNNY && changes < changeLimit && randInt(5) === 0 && character.body.ears.type === EarType.BUNNY) {
            // Taurs
            if (character.body.legs.isTaur()) CView.text("\n\nYour quadrupedal hind-quarters seizes, overbalancing your surprised front-end and causing you to stagger and fall to your side.  Pain lances throughout, contorting your body into a tightly clenched ball of pain while tendons melt and bones break, melt, and regrow.  When it finally stops, <b>you look down to behold your new pair of fur-covered rabbit feet</b>!");
            // Non-taurs
            else {
                CView.text("\n\nNumbness envelops your " + describeLegs(character) + " as they pull tighter and tighter.  You overbalance and drop on your " + describeButt(character));
                if (character.body.tails.length > 0) CView.text(", nearly smashing your tail flat");
                else CView.text(" hard enough to sting");
                CView.text(" while the change works its way through you.  Once it finishes, <b>you discover that you now have fuzzy bunny feet and legs</b>!");
            }
            changes++;
            character.body.legs.type = LegType.BUNNY;
        }
        // BUN FaceType!  REQUIREZ EARZ
        if (character.body.ears.type === EarType.BUNNY && character.body.face.type !== FaceType.BUNNY && randInt(3) === 0 && changes < changeLimit) {
            CView.text("\n\n");
            changes++;
            // Human(ish) face
            if (character.body.face.type === FaceType.HUMAN || character.body.face.type === FaceType.SHARK_TEETH) CView.text("You catch your nose twitching on its own at the bottom of your vision, but as soon as you focus on it, it stops.  A moment later, some of your teeth tingle and brush past your lips, exposing a white pair of buckteeth!  <b>Your face has taken on some rabbit-like characteristics!</b>");
            // Crazy furry TF shit
            else CView.text("You grunt as your " + describeFaceShort(character) + " twists and reforms.  Even your teeth ache as their positions are rearranged to match some new, undetermined order.  When the process finishes, <b>you're left with a perfectly human looking face, save for your constantly twitching nose and prominent buck-teeth.</b>");
            character.body.face.type = FaceType.BUNNY;
        }
        // DAH BUNBUN EARZ - requires poofbutt!
        if (character.body.ears.type !== EarType.BUNNY && changes < changeLimit && randInt(3) === 0 && character.body.tails.reduce(Tail.HasType(TailType.BUNNY), false)) {
            CView.text("\n\nYour ears twitch and curl in on themselves, sliding around on the flesh of your head.  They grow warmer and warmer before they finally settle on the top of your head and unfurl into long, fluffy bunny-ears.  <b>You now have a pair of bunny ears.</b>");
            character.body.ears.type = EarType.BUNNY;
            changes++;
        }
        // DAH BUNBUNTAILZ
        if (!character.body.tails.reduce(Tail.HasType(TailType.BUNNY), false) && randInt(2) === 0 && changes < changeLimit) {
            if (character.body.tails.length > 0) CView.text("\n\nYour tail burns as it shrinks, pulling tighter and tighter to your backside until it's the barest hint of a stub.  At once, white, poofy fur explodes out from it.  <b>You've got a white bunny-tail!  It even twitches when you aren't thinking about it.</b>");
            else CView.text("\n\nA burning pressure builds at your spine before dissipating in a rush of relief. You reach back and discover a small, fleshy tail that's rapidly growing long, poofy fur.  <b>You have a rabbit tail!</b>");
            character.body.tails.clear();
            character.body.tails.add(new Tail(TailType.BUNNY));
            changes++;
        }
        if (randInt(4) === 0 && character.body.neck.gills && changes < changeLimit) {
            CView.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.body.neck.gills = false;
            changes++;
        }
        // Bunny Breeder Perk?
        // FAILSAAAAFE
        if (changes === 0) {
            if (character.stats.lib < 100) changes++;
            character.stats.lib += 1;
            character.stats.lust += 5 + character.stats.lib / 7;
            if (character.stats.lib < 30) character.stats.lib += 1;
            if (character.stats.lib < 40) character.stats.lib += 1;
            if (character.stats.lib < 60) character.stats.lib += 1;
            // Lower ones are gender specific for some reason
            if (character.stats.lib < 60) {
                // (Cunts or assholes!
                if (character.body.cocks.length <= 0 || (character.gender === Gender.HERM && randInt(2) === 0)) {
                    if (character.stats.lib < 30) {
                        CView.text("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to breed until you're swollen and pregnant.  ");
                        if (character.stats.cor < 25) CView.text("You're repulsed by such shameful thoughts.");
                        else if (character.stats.cor < 60) CView.text("You worry that this place is really getting to you.");
                        else if (character.stats.cor < 90) CView.text("You pant a little and wonder where the nearest fertile male is.");
                        else CView.text("You grunt and groan with desire and disappointment.  You should get bred soon!");
                    }
                    else CView.text("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to your " + assholeOrPussy(character) + ", and you're struck by just how empty it feels.  The desire to be filled, not by a hand or a finger but by a virile male, rolls through you like a wave, steadily increasing your desire for sex.");
                }
                // WANGS!
                if (character.body.cocks.length > 0) {
                    if (character.stats.lib < 30) {
                        CView.text("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to fuck a ");
                        if (randInt(2) === 0) CView.text("female hare until she's immobilized by all her eggs");
                        else CView.text("herm rabbit until her sack is so swollen that she's forced to masturbate over and over again just to regain mobility");
                        CView.text(". ");
                        if (character.stats.cor < 25) CView.text("You're repulsed by such shameful thoughts.");
                        else if (character.stats.cor < 50) CView.text("You worry that this place is really getting to you.");
                        else if (character.stats.cor < 75) CView.text("You pant a little and wonder where the nearest fertile female is.");
                        else CView.text("You grunt and groan with desire and disappointment.  Gods you need to fuck!");
                    }
                    else CView.text("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to " + describeOneOfYourCocks(character) + ", and you groan from how tight and hard it feels.  The desire to have it squeezed, not with your hand but with a tight pussy or puckered asshole, runs through you like a wave, steadily increasing your desire for sex.");
                }
            }
            // Libido over 60? FUCK YEAH!
            else if (character.stats.lib < 80) {
                CView.text("\n\nYou fan your neck and start to pant as your " + character.body.skin.tone + " skin begins to flush red with heat");
                if (character.body.skin.type > SkinType.PLAIN) CView.text(" through your " + character.body.skin.desc);
                CView.text(".  ");
                if (character.gender === Gender.MALE) CView.text("Compression tightens down on " + describeOneOfYourCocks(character) + " as it strains against your " + character.inventory.armor.displayName + ".  You struggle to fight down your heightened libido, but it's hard - so very hard.");
                else if (character.gender === Gender.NONE) CView.text("Sexual hunger seems to gnaw at your " + describeButthole(character.body.butt) + ", demanding it be filled, but you try to resist your heightened libido.  It's so very, very hard.");
                else if (character.gender === Gender.FEMALE) CView.text("Moisture grows between your rapidly-engorging vulva, making you squish and squirm as you try to fight down your heightened libido, but it's hard - so very hard.");
                else CView.text("Steamy moisture and tight compression war for your awareness in your groin as " + describeOneOfYourCocks(character) + " starts to strain against your " + character.inventory.armor.displayName + ".  Your vulva engorges with blood, growing slicker and wetter.  You try so hard to fight down your heightened libido, but it's so very, very hard.  The urge to breed lingers in your mind, threatening to rear its ugly head.");
            }
            // MEGALIBIDO
            else {
                CView.text("\n\nDelicious, unquenchable desire rises higher and higher inside you, until you're having trouble tamping it down all the time.  A little, nagging voice questions why you would ever want to tamp it down.  It feels so good to give in and breed that you nearly cave to the delicious idea on the spot.  Life is beginning to look increasingly like constant fucking or masturbating in a lust-induced haze, and you're having a harder and harder time finding fault with it.  ");
                if (character.stats.cor < 33) CView.text("You sigh, trying not to give in completely.");
                else if (character.stats.cor < 66) CView.text("You pant and groan, not sure how long you'll even want to resist.");
                else {
                    CView.text("You smile and wonder if you can ");
                    if (character.stats.lib < 100) CView.text("get your libido even higher.");
                    else CView.text("find someone to fuck right now.");
                }
            }
        }
    }
}
