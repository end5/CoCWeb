import { Character } from "../../../Character/Character";
import { NextScreenChoices, ClickFunction, choiceWrap, ScreenChoice } from "../../../ScreenDisplay";
import { CView } from "../../../../Page/ContentView";
import { StatusEffectType } from "../../../Effects/StatusEffectType";
import { BreastRow } from "../../../Body/BreastRow";
import { passTime, playerMenu } from "../../../Menus/InGame/PlayerMenu";
import { Cock, CockType } from "../../../Body/Cock";
import { describeEachOfYourCocks, describeCock, describeCockShort, describeCocksLight, nounCock } from "../../../Descriptors/CockDescriptor";
import { lustyMaidenPaizuri } from "../../../Items/Armors/LustyMaidensArmor";
import { LegType } from "../../../Body/Legs";
import { describeBreastRow, describeAllBreasts, describeNipple, describeChest, describeBiggestBreastRow } from "../../../Descriptors/BreastDescriptor";
import { describeVagina, describeClit } from "../../../Descriptors/VaginaDescriptor";
import { describeLegs } from "../../../Descriptors/LegDescriptor";
import { displayStretchVagina, attemptKnockUp } from "../../../Modifiers/VaginaModifier";
import { Womb } from "../../../Body/Pregnancy/Womb";
import { PregnancyType, IncubationTime } from "../../../Body/Pregnancy/Pregnancy";
import { describeButthole, describeButt } from "../../../Descriptors/ButtDescriptor";
import { displayStretchButt } from "../../../Modifiers/ButtModifier";
import { describeHips } from "../../../Descriptors/HipDescriptor";
import { describeBalls, describeSack } from "../../../Descriptors/BallsDescriptor";
import { VaginaLooseness } from "../../../Body/Vagina";
import { SpriteName } from "../../../../Page/SpriteName";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { describeHair } from "../../../Descriptors/HairDescriptor";
import { growSmallestBreastRow, boostLactation } from "../../../Modifiers/BreastModifier";
import { PerkType } from "../../../Effects/PerkType";
import { Settings } from "../../../Settings";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { ImpPregEvent } from "../../Pregnancy/Imp";

/**
 * Created by aimozg on 04.01.14.
 */

export function impVictory(player: Character, imp: Character): NextScreenChoices {
    CView.clear();
    const canFeed = (player.effects.has(StatusEffectType.Feeder));
    const canBikiniTits = (player.body.vaginas.length > 0 && player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 4 && player.inventory.armor.name === ArmorName.LustyMaidensArmor);
    CView.text("You smile in satisfaction as " + imp.desc.a + imp.desc.name + " collapses and begins masturbating feverishly.");
    if (canFeed) {
        if (player.stats.lust >= 33)
            CView.text("  Sadly you realize your own needs have not been met.  Of course you could always rape the poor thing, but it might be more fun to force it to guzzle your breast-milk.\n\nWhat do you do?");
        else CView.text("  You're not really turned on enough to rape it, but it might be fun to force it to guzzle your breast-milk.\n\nDo you breastfeed it?");
    }
    else if (player.stats.lust >= 33 || canBikiniTits || player.canOvipositBee()) {
        CView.text("  Sadly you realize your own needs have not been met.  Of course you could always rape the poor thing...\n\nDo you rape him?");
    }
    else {
        return { next: passTime(1) };
    }

    const choices: ScreenChoice[] = [];
    if (player.stats.lust > 33) {
        let maleRape: ClickFunction | undefined;
        if (player.body.cocks.length > 0) {
            if (player.body.cocks.find(Cock.CockThatFits(imp.analCapacity())))
                CView.text("\n\n<b>You're too big to rape an imp with " + describeEachOfYourCocks(player) + ".</b>");
            else maleRape = (player.body.legs.isTaur() ? choiceWrap(centaurOnImpStart, imp) : choiceWrap(rapeImpWithDick, imp));
        }
        if (player.body.vaginas.length > 0) {
            if (player.body.legs.isTaur()) {
                maleRape = choiceWrap(centaurOnImpStart, imp);
                choices[1] = ["Group Vaginal", choiceWrap(centaurGirlOnImps, imp)];
            }
            else choices[1] = ["Female Rape", choiceWrap(rapeImpWithPussy, imp)];
        }
        else if (maleRape === undefined && !player.body.chest.find(BreastRow.FuckableNipples) && !canFeed && !canBikiniTits && !player.canOvipositBee()) {
            return { next: passTime(1) }; // Only happens when there's no way to fuck the imp
        }
        choices[0] = [(player.body.legs.isTaur() ? "Centaur Rape" : "Male Rape"), maleRape];
        if (player.body.chest.find(BreastRow.FuckableNipples)) choices[2] = ["NippleFuck", noogaisNippleRape];
    }
    if (canFeed) choices[3] = ["Breastfeed", areImpsLactoseIntolerant];
    if (canBikiniTits) choices[4] = ["B.Titfuck", choiceWrap(lustyMaidenPaizuri, imp)];
    if (player.canOvipositBee()) choices[8] = ["Oviposit", putBeeEggsInAnImpYouMonster];
    choices[9] = ["Leave", passTime(1)];

    return { choices };
}

function rapeImpWithDick(player: Character, imp: Character): NextScreenChoices {
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(imp.analCapacity()));
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0)!;
    // Single cock
    CView.image("imp-win-male-fuck");
    if (player.body.cocks.length === 1) {
        CView.clear().text("With a demonic smile you grab the insensible imp and lift him from the ground by his neck.  The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.");
        if (player.body.legs.type !== LegType.CENTAUR) {
            CView.text("  You casually unclasp your " + player.inventory.armor.displayName + " and reveal your " + describeCock(player, cockThatFits) + ", ");
            if (player.body.chest.length > 0 && player.body.chest.get(0)!.rating > 2) CView.text("smashing him against your " + describeBreastRow(player.body.chest.get(0)) + " while you jerk hard on your " + describeCock(player, cockThatFits) + ", bringing it to a full, throbbing erection.");
            else CView.text("stroking it to full hardness languidly.");
        }
        CView.text("\n\nWith no foreplay, you press your " + describeCock(player, cockThatFits) + " against his tight little pucker and ram it in to the hilt.  The imp's eyes bulge in surprise even as a thick stream of pre leaks from his " + describeCockShort(imp.body.cocks.get(0)) + ".  You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.");
        if (player.body.cocks.get(0)!.type === CockType.CAT) CView.text("  The tiny creature's claws dig into your sides at the feeling of soft, hooked barbs stroking his sensitive insides.");
        if (player.body.cocks.get(0)!.length >= 7 && player.body.cocks.get(0)!.length <= 12) CView.text("  Each thrust obviously distorts the imp's abdomen.  It amazes you that it doesn't seem to be hurting him.");
        if (player.body.cocks.get(0)!.length > 12) CView.text("  Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest.  Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.");
        CView.text("\n\nThe tight confines of the imp's ass prove too much for you, and you feel your orgasm build.");
        if (player.body.balls.count === 0 && player.body.vaginas.length > 0) CView.text("  The cum seems to boil out from inside you as your " + describeVagina(player, player.body.vaginas.get(0)) + " soaks itself.  With delicious slowness you fire rope after rope of cum deep into the imp's rectum.");
        if (player.body.balls.count === 0 && player.body.vaginas.length === 0) CView.text("  The cum seems to boil out from inside you, flowing up your " + describeCock(player, cockThatFits) + ".  With delicious slowness, you fire rope after rope of cum deep into the imp's rectum.");
        if (player.cumQ() >= 14 && player.cumQ() <= 30) CView.text("  Your orgasm drags on and on, until your slick jism is dripping out around your " + describeCock(player, cockThatFits) + ".");
        if (player.cumQ() > 30 && player.cumQ() <= 100) CView.text("  Your orgasm seems to last forever, jizz dripping out of the imp's asshole around your " + describeCock(player, cockThatFits) + " as you plunder him relentlessly.");
        if (player.cumQ() > 100) CView.text("  Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last.  The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your " + describeCock(player, cockThatFits) + " with each thrust.");
        CView.text("\n\nSatisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.   You drop the imp hard and he passes out, dripping mixed fluids that seem to be absorbed by the dry earth as fast as they leak out.");
    }
    // Multicock
    if (player.body.cocks.length >= 2) {
        CView.clear().text("With a demonic smile you grab the insensible imp and lift him from the ground by his neck.  The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.");
        if (player.body.legs.type !== LegType.CENTAUR) {
            CView.text("  You casually unclasp your " + player.inventory.armor.displayName + " and reveal your " + describeCocksLight(player) + ", ");
            if (player.body.chest.length > 0 && player.body.chest.get(0)!.rating > 2) CView.text("smashing him against your " + describeBreastRow(player.body.chest.get(0)) + " while you jerk hard on one of your " + describeCock(player, cockThatFits) + "s, bringing it to a full, throbbing erection.");
            else CView.text("stroking one of your members to full hardness languidly.");
        }
        CView.text("\n\nWith no foreplay, you press a " + describeCock(player, cockThatFits) + " against his tight little pucker and ram it in to the hilt.  The imp's eyes bulge in surprise even as a thick stream of pre leaks from his " + describeCockShort(imp.body.cocks.get(0)) + ".  You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.");
        if (player.body.cocks.get(0)!.length >= 7 && player.body.cocks.get(0)!.length <= 12) CView.text("  Each thrust obviously distorts the imp's abdomen.  It amazes you that it doesn't seem to be hurting him.");
        if (player.body.cocks.get(0)!.length > 12 && player.body.cocks.get(0)!.length <= 18) CView.text("  Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest.  Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.");
        CView.text("\n\nThe tight confines of the imp's ass prove too much for you, and you feel your orgasm build.");
        if (player.body.balls.count > 0) CView.text("The cum seems to boil in your balls, sending heat spreading through your " + describeCock(player, cockThatFits) + " as your muscles clench reflexively, propelling hot spurts of jism deep into the imp's rectum.  Your other equipment pulses and dripples steady streams of its own cum.");
        if (player.body.balls.count === 0 && player.body.vaginas.length > 0) CView.text("The cum seems to boil out from inside you as your " + describeVagina(player, player.body.vaginas.get(0)) + " soaks itself.  With delicious slowness you fire rope after rope of cum deep into the imp's rectum.  Your other equipment drizzles small streams of jizz in sympathy.");
        if (player.body.balls.count === 0 && player.body.vaginas.length === 0) CView.text("The cum seems to boil out from inside you, flowing up your " + describeCock(player, cockThatFits) + ".  With delicious slowness, you fire rope after rope of cum deep into the imp's rectum.  Your other equipment drizzles small streams of jizz in sympathy.");
        if (player.cumQ() >= 14 && player.cumQ() <= 30) CView.text("  Your orgasm drags on and on, until your slick jism is dripping out around your " + describeCock(player, cockThatFits) + ".");
        if (player.cumQ() > 30 && player.cumQ() <= 100) CView.text("  Your orgasm seems to last forever, jizz dripping out of the imp's asshole around your " + describeCock(player, cockThatFits) + " as you plunder him relentlessly.");
        if (player.cumQ() > 100) CView.text("  Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last.  The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your " + describeCock(player, cockThatFits) + " with each thrust.");
        CView.text("\n\nSatisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.   You drop the imp hard and he passes out, dripping mixed fluids that seem to be absorbed by the dry earth as fast as they leak out.");
    }
    player.orgasm();
    player.stats.cor += 1;

    return { next: passTime(1) };
}

function rapeImpWithPussy(player: Character, imp: Character): NextScreenChoices {
    CView.image("imp-win-female-fuck");
    player.slimeFeed();
    CView.text("You shed your " + player.inventory.armor.displayName + " without a thought and approach the masturbating imp, looming over him menacingly.  Your " + describeVagina(player, player.body.vaginas.get(0)) + " moistens in anticipation as you gaze down upon his splendid rod. With no hesitation, you lower yourself until your lips are spread wide by his demon-head, the hot pre-cum tingling deliciously.");
    // Too small!
    if (player.vaginalCapacity() < imp.body.cocks.get(0)!.area) {
        CView.text("  You frown as you push against him, but his demonic tool is too large for your " + describeVagina(player, player.body.vaginas.get(0)) + ".  With a sigh, you shift position and begin grinding your " + describeVagina(player, player.body.vaginas.get(0)) + " against his " + describeCockShort(imp.body.cocks.get(0)) + ", coating it with fluids of your gender.  Your clit tingles wonderfully as it bumps against every vein on his thick appendage.");
        if (player.body.chest.length > 0 && player.body.chest.get(0)!.rating > 1) {
            CView.text("  You happily tug and pinch on your erect nipples, adding to your pleasure and nearly driving yourself to orgasm.");
        }
        CView.text("\n\nYou lose track of time as you languidly pump against the imp's " + describeCockShort(imp.body.cocks.get(0)) + ".  At long last you feel your " + describeVagina(player, player.body.vaginas.get(0)) + " ripple and quiver.  Your " + describeLegs(player) + " give out as you lose your muscle control and collapse against the small demon.  You gasp as his " + describeCockShort(imp.body.cocks.get(0)) + " erupts against you, splattering your chest with hot demonic cum that rapidly soaks into your skin.  You giggle as you rise up from the exhausted imp, feeling totally satisfied.");
    }
    // Big enough!
    else {
        CView.text("  You sink down his " + describeCockShort(imp.body.cocks.get(0)) + " slowly, delighting in the gradual penetration and the tingling feeling of his dripping hot pre-cum.  At last you bottom out on his balls.");
        displayStretchVagina(player, imp.body.cocks.get(0)!.area, true);
        CView.text("  Your lust and desire spurs you into movement, driving you to bounce yourself up and down on the " + describeCockShort(imp.body.cocks.get(0)) + ".  His exquisite member pushes you to the very height of pleasure, your " + describeVagina(player, player.body.vaginas.get(0)) + " clenching tightly of its own accord each time you bottom out.  The tensing of the little demon's hips is the only warning you get before he cums inside you, hot demonic jizz pouring into your womb.  Your " + describeLegs(player) + " give out, pushing him deeper as he finishes filling you.");
        CView.text("\n\nThe two of you lay there a moment while you recover, at last separating as you rise up off his " + describeCockShort(imp.body.cocks.get(0)) + ".  Spunk drips down your legs, quickly wicking into your skin and disappearing.");
        // Taking it internal is more corruptive!
        player.stats.cor += 1;

        // Preggers chance!
        attemptKnockUp(player, PregnancyType.IMP, IncubationTime.IMP, ImpPregEvent);
        displayStretchVagina(player, imp.body.cocks.get(0)!.area, true, true, false);
    }
    player.orgasm();
    player.stats.cor += 1;

    return { next: passTime(1) };
}

function sprocketImp(player: Character): NextScreenChoices {
    player.slimeFeed();

    const firstCock = player.body.cocks.get(0)!;
    CView.text("You fall to your knees, lost in thoughts of what you want the imp to do to you.  Your body burns with desire, ready for the anal assault to come.  At least that's what you think.  You reach a hand out to the imp, wanting to pull him to you, to make him take you the way you need to be taken.  But he doesn't, not this time.\n\n");
    // New PG
    CView.text("Much to your surprise, the imp flutters upward on his small leathery wings and rushes toward you.  ");
    if (player.body.hair.length > 0) CView.text("His claws dig into your hair ");
    else CView.text("His claws dig into your wrists ");
    CView.text("and you find yourself dragged upward with him, soaring over the tops of the trees.  The cool rush of air does nothing to abate your arousal.  If anything, the cold shock only makes your body more aware of its own need.  After just a few seconds that feel like an eternity to your lust-filled being, the imp hurls you down into a tree.  You flail as you fall, barely catching yourself on the upper branches.  Your hands and " + describeLegs(player) + " are tangled in the smooth wooden spiderweb below you, your mind torn between desire for the imp above and fear of the fall below.  You can see from the gleam in the horned creature's red eyes that he has you right where he wants you.\n\n");
    // New PG
    CView.text("The imp pulls the loincloth from his waist, revealing his red throbbing cock.  It is certainly large, even though it stands smaller than your own erection.  He tosses the cloth aside, and you see him fluttering down toward you just before the rough fabric lands on your face.  His clawed fingers grasp ");
    // Variable cocktext
    if (firstCock.type === CockType.HUMAN || firstCock.type === CockType.DEMON || firstCock.type > 4) CView.text("your " + describeCock(player, firstCock) + ", rubbing the tip of his prick against your own, ");
    else if (firstCock.hasKnot()) CView.text("your " + describeCock(player, firstCock) + ", rubbing the tip of his prick against your point, ");
    else if (firstCock.type === CockType.HORSE) CView.text("your " + describeCock(player, firstCock) + ", rubbing the tip of his prick against your flared head, ");
    else if (firstCock.type === CockType.TENTACLE) CView.text("your huge green dick, rubbing the tip of his prick against your purplish cock-head, ");
    CView.text("smearing your pre-cum together.  You wonder if he is planning on just jerking both of you off as you shake the cloth from your face.  He flashes you an evil smile, making your eyes widen in terror as you realize what he is planning. Before you can even think to make a move to stop him, the imp ");
    if (firstCock.type === CockType.HUMAN || firstCock.type === CockType.DEMON || firstCock.type > 4) CView.text("shoves his shaft deeply into the slit in the head of your dick.  ");
    else if (firstCock.hasKnot()) CView.text("finds the hole in the pointed head of your cock and plunges his shaft deeply into it, literally fucking your urethra.  ");
    else if (firstCock.type === CockType.HORSE) CView.text("seats his dick in the flared head of your prick, and then pushes farther. His shaft plunges into yours, filling your cock more than any cum load ever could.  ");
    else if (firstCock.type === CockType.TENTACLE) CView.text("shoves his dick deeply into the slit in the head of your vine-like cock.  ");
    // New PG
    CView.text("\n\n");
    CView.text("He grips your cock tightly as he fucks you, treating you like a ");
    // Differing cocksleeve texts
    if (player.body.skin.desc === "fur") CView.text("furry cock-sleeve");
    else {
        if (player.body.skin.tone === "purple" || player.body.skin.tone === "blue" || player.body.skin.tone === "shiny black") CView.text("demonic cock-sleeve");
        else CView.text("human cock-sleeve");
    }
    // Bonus boob shake or period if no boobs.
    if (player.body.chest.length > 0 && player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text(", fucking you so hard that your " + describeAllBreasts(player) + " bounce with each thrust.  ");
    else CView.text(".  ");
    CView.text("It briefly crosses your mind that this should be painful, but something about either his lubrication or yours makes it comfortable enough to have you writhing in pleasure.  ");
    CView.text("He thrusts roughly into you for several minutes, your hips bucking upward to meet him, ");
    if (player.body.cocks.length === 2) CView.text("your other cock finding pleasure in rubbing against his body ");
    if (player.body.cocks.length > 2) CView.text("your other cocks finding pleasure in rubbing against his body ");
    // Cum
    CView.text("while copious amounts of sweat runs off of both your exposed forms, before he shivers and sinks deeply into you.  He cums hard, the heat of his demon seed burning your loins. His orgasm lasts longer than you think possible, forcing your own climax. Your seed mixes within your body, becoming more than you can handle and spilling out from your urethra around his intruding member.  ");
    // Extra cum-texts
    if (player.body.cocks.length === 2) CView.text("Your other cock cums at the same time, liberally splattering your spunk up his back.  ");
    if (player.body.cocks.length > 2) CView.text("The rest of your " + describeCocksLight(player) + " twitch and release their seed at the same time, creating a shower of spunk that rains down on both you and the imp, coating both of your bodies.  ");
    if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1) CView.text("At the same time, milk bursts from your " + describeNipple(player, player.body.chest.get(0)) + "s, splattering him in the face.  You feel a sick sort of triumph as you get him back for cumming inside you.  ");
    // Vagoooz
    if (player.body.vaginas.length > 0) CView.text("Your pussy quivers, contracting furiously as your orgasm hits you - like it's trying to milk a phantom dick dry.  ");
    // new PG
    CView.text("Satisfied, his dick slides from you and he flies away as mixed seed continues to spill from your abused body. Your limbs grow weak, and you fall from the tree with a hard thud before losing consciousness.  ");
    // Take some damage
    player.stats.HP -= 10;
    if (player.stats.HP < 1) player.stats.HP = 1;
    return { next: passTime(1) };
}

function centaurGirlOnImps(player: Character, imp: Character): NextScreenChoices {
    CView.text("You stand over the thoroughly defeated demon and get an amusing idea. The tiny creatures are far from a threat, but their features seem like they might be useful. You pick the imp up and place him in a tree with explicit orders to him to stay, much to his confusion. Once you're sure he won't move, you wolf whistle and wait.\n\n");
    CView.text("A goblin appears from the underbrush behind you, but a swift kick sends her flying; she's not what you're after. You're soon rewarded with a trio of imps, who fly up to you, cocks at the ready.  Grabbing the defeated imp by the head, you explain your need to the group and waft a bit of your scent over to them with your tail. They confer among themselves only briefly, clear on the decision, as you toss their weaker fellow underneath them. The larger of the three, evidently the leader, smiles lewdly at you and agrees to your 'demands'.\n\n");
    // [Female:
    if (player.body.vaginas.length > 0) {
        CView.text("The imps approach you, their various genitalia glistening in the sun and drawing your attention. Their cocks swing lewdly with every flap of their wings, but you turn around, wanting their ministrations to be a surprise.\n\n");

        CView.text("Hands slide over you, stroking and patting your equine form. The roving fingers find their way to your rear quickly, and begin teasing around your " + describeVagina(player, player.body.vaginas.get(0)) + " and " + describeButthole(player.body.butt) + ". They probe around but don't penetrate and you stamp your hoof in frustration. There's a chuckle from behind you and all but a handful of the hands disappear.\n\n");

        CView.text("A slightly larger hand smacks your " + describeButt(player) + " then slides up and pops a thick finger inside. Your " + describeButthole(player.body.butt) + " tries to suck it in deeper, but loses the opportunity as it's extracted before doing anything. Instead, the hand returns to your flank and slides slowly forward to your torso.\n\n");

        CView.text("The 'head' imp comes around into your vision, hovering in front of you and letting you get a good look at his long member. He pulls on it, extracting a large bead of pre onto his other hand. Opening your mouth, he wipes the salty substance onto your tongue. You swallow it happily and feel your mouth watering and your " + describeVagina(player, player.body.vaginas.get(0)) + " pumping out fluid.\n\n");

        CView.text("The leader looks past you and gives a signal to someone you can't see, but you don't have time to turn as a huge dog cock is slipped into your slavering cunt and an even larger spined prick is inserted into your " + describeButthole(player.body.butt) + ". They begin pumping into you hard, and you whinny in satisfaction while the demon before you watches, jerking on himself.");
        displayStretchVagina(player, imp.body.cocks.get(0)!.area, true, true, false);
        displayStretchButt(player, imp.body.cocks.get(0)!.area, true, true, false);
        CView.text("\n\n");

        CView.text("He disappears behind you and gives you a slap on the haunches, yelling, \"<i>Giddyup!</i>\" and laughing heartily. Whether he expected you to or not, you decide to go for it and push off the ground with your forelegs, kicking them about in the air and feeling the demons aboard you scrabble to stay attached, before setting off at as fast a run as you can. You tear about in the dirt, clumps of mud and weeds flung behind you.\n\n");

        CView.text("At the edge of the clearing is the leader, laughing as he watches you and still jerking himself. As if realizing that there's a better option available, he grabs the defeated imp and inserts himself into him, using him like a living cock sleeve who appears to not mind the position and cries out repeatedly as his ass is abused.\n\n");

        CView.text("Your unexpected running momentarily paused the cocks inside you as their owners groped for holds on your " + describeHips(player) + " and " + describeButt(player) + ". With their positions relatively well established, they begin pounding at you again, causing you to nearly stumble in pleasure.\n\n");

        CView.text("Managing to steady yourself, you run faster, feeling the frenetic cocks inside you explode. The hot spunk sprays about inside and you scream in ecstasy.");
        // [Has breasts:
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 1) CView.text("  Your hands reflexively grab your " + describeChest(player) + " and mash them about.");
        CView.text("\n\n");

        CView.text("The owner of the dog-cock in your " + describeVagina(player, player.body.vaginas.get(0)) + " manages to insert his knot as his balls empty inside you, but the cat-cock's body has no such luck and his grip on you falters. He slides out of your " + describeButthole(player.body.butt) + " but manages to grasp the fur of your back and straddle you, all while his cock continues to spray you down with jism.\n\n");

        // [Has breasts:
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 1) {
            CView.text("He slides up to your torso and grasps your wildly flailing " + describeAllBreasts(player) + ", massaging them harshly. His ministrations are surprisingly crude, and you wonder how many times he's attempted to pleasure a woman.");
            // [Has fuckable nipples:
            if (player.body.chest.find(BreastRow.FuckableNipples)) CView.text("  His fingers slide inside your " + describeNipple(player, player.body.chest.get(0)) + "s and start spreading and squishing them. Your femcum leaks out over his hands and soon your front is slick and shiny.");
            // All other nipples:
            else CView.text("  His fingers grope and grab at your nipples, stretching them uncomfortably. Before you can complain he seems to realize his mistake and releases them.");
            // [Is lactating normally:
            if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1 && player.lactationQ() < 50) CView.text("  Milk dribbles and squirts from you as his desperate squishing continues, forming small puddles on the ground.");
            else if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1) CView.text("  Milk sprays from you as his desperate squishing continues, creating massive puddles of milk that you splash through as you continue moving.");
            CView.text("\n\n");
        }

        CView.text("You stop running, spraying dirt in a massive fan and sending the imp on your back flying into a tree, where he crumples to the ground unceremoniously. The doggy-dicked imp collapses out of you and is sprayed down with your orgasm, coating him in femcum and his own semen.\n\n");

        CView.text("You trot over to the leader, still using the nearly unconscious imp as a cock sleeve, and pull the abused creature off of him. He looks shocked as you grab his cock and squeeze his balls, causing him to orgasm hard and spray you down in white hot seed. He collapses onto the ground, spent, as you wipe yourself down as best you can.");

        CView.text("  Collecting your things, you give the assorted bodies one last look and stumble back to camp.");
        player.orgasm();
        player.stats.cor += 1;

    }
    return { next: passTime(1) };
}
function centaurOnImpStart(player: Character, imp: Character): NextScreenChoices {

    // Event: Centaur-Imp: Player Raping
    CView.text("As the imp collapses in front of you, ");
    if (imp.stats.HP === 0) CView.text("panting in exhaustion");
    else CView.text("masturbating furiously");
    CView.text(", you advance toward the poor creature.  The demon's eyes run over your powerful equine muscles as you tower above it.  It is difficult to hide your smile as you look at the tiny creature's engorged cock and the perpetual lust filling its beady eyes.");
    // OPTIONAL THOUGHTS
    // [if previously gave birth to imps and Cor >50] A part of you wonders idly if this is one the offspring that you added to this world
    // [corruption is under 80] but the you quickly banish the thought. [corruption is over 80]  and the thought fills you with excitement. ))
    // << Cor <50 >>
    if (player.stats.cor < 50) CView.text("  You lick your lips slightly as you begin to approach the small figure.");
    else CView.text("You lick your lips obscenely as you approach the small figure.\n\n");
    // [Even chance of any of the following happening if the player has the correct equipment, distribute chances between what equipment is available]
    const cockThatFits = player.body.cocks.find(Cock.CockThatFits(imp.analCapacity()));
    if (cockThatFits && player.body.vaginas.length <= 0) return centaurOnImpMale(player, imp);
    else if (player.body.vaginas.length > 0 && !cockThatFits) return centaurOnImpFemale(player, imp);
    else {
        CView.text("Do you focus on your maleness or girl-parts?");
        return { choices: [["Male", choiceWrap(centaurOnImpMale, imp, true)], ["Female", choiceWrap(centaurOnImpFemale, imp, true)]] };
    }
}

// Player has a cock}}
function centaurOnImpMale(player: Character, imp: Character, vape: boolean = false): NextScreenChoices {
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(imp.analCapacity()));
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0)!;
    if (vape)
        CView.text("As your shadow falls over the imp, it looks between your " + describeLegs(player) + " with a hint of fear.  ");
    if (player.body.cocks.length === 1) {
        if (cockThatFits.area <= 15) {
            CView.text("Relief washes over it followed by intense lust as is throws itself onto a mossy rock and eagerly presents its " + describeButthole(imp.body.butt) + ".   The sound of your hooves moving on either side of its body seems to send the creature into a frenzy as it begins humping the air while small mewling sounds escape its lips.  ");
            // <<Cor <50>>
            if (player.stats.cor < 50) CView.text("You slowly rub your " + describeCock(player, cockThatFits) + " between the creature's cheeks, letting your pre-cum oil the small hole, before slowly beginning the insertion.  Before you can get half-way the creatures drives its self back against you, impaling its " + describeButthole(imp.body.butt) + " around your " + describeCock(player, cockThatFits) + " and making inhuman sounds of ecstasy. The " + describeButthole(imp.body.butt) + " relaxes around your " + describeCock(player, cockThatFits) + ", taking it all in while its practiced muscles grip and jerk you off internally.\n\n");
            // <<Cor 50+>>
            else CView.text("You position your " + describeCock(player, cockThatFits) + " against its dry anus and drive yourself inside of it using your powerful equine legs.  The creatures gives a loud shriek as its insides are forced open, and you feel the raw tightness trying to resist your intrusion.  Giving the creature no chance to relax you begin pistoning into it, grinning as the sounds of pain give way to grunts and yelps of pleasure. You cannot last long in the creature's hole, and soon spurts of cum begin shooting out and filling its bowels.\n\n");
            // <<GoTo I1>>
            centaurOnImpResults(player, 1, imp);
            // <<End>>
            player.orgasm();
            return { next: passTime(1) };
        }
        else {
            // <<Cock: large, Cor <50>>
            if (player.stats.cor < 50) {
                CView.text("The imp's eyes widen and you see its apprehension as it attempts to turn and flee.  You make soothing sounds as you approach the skittish creature, while easily keeping pace with it.  Seeing little chance for escape, the creature turns toward you again and carefully begins making its way between your " + describeLegs(player) + ", eyes wide in supplication.  Your smile seems to relax it, and lust fills its eyes again as it slowly starts massaging your " + describeCock(player, cockThatFits) + ".  Getting more and more confident, the creature is soon using both of its hands on your " + describeCock(player, cockThatFits) + ", and its wet and serpentine tongue is moving all over the length of your erection.  There is little chance of your " + describeCock(player, cockThatFits) + " fitting into its small mouth, but it does its best to pleasure you as it goes more and more wild.  ");
                // <<Thick large>>
                if (player.body.cocks.get(0)!.thickness > 3) {
                    CView.text("It is not long before you feel its tongue slipping into your urethra, and cum rushes from your ");
                    if (player.body.balls.count > 0) CView.text(describeBalls(true, true, player));
                    else CView.text("prostate");
                    CView.text(" as you feel the foreign invader wiggling inside.  ");
                    // <</Thick>>
                }
                CView.text("You cannot take the attention for long before your hooves are scraping at the ground and jets of sperm shoot out of your " + describeCock(player, cockThatFits) + " and down its waiting throat.\n\n");
                // <<GoTo I2>>
                centaurOnImpResults(player, 2, imp);
                // <<End>>
                player.orgasm();
                return { next: passTime(1) };
            }
            // <<Cock: large, Cor 50+>>
            else {
                CView.text("The imp's eyes widen and you see apprehension as it tries to turn around and get away.  It does not make it far before you run it down, knocking it over with your muscled flank.  Before it can try to run again you pin it down and position your " + describeCock(player, cockThatFits) + " against its " + describeButthole(imp.body.butt) + ".  It feels far too small to handle your girth but a push of your powerful legs gets you in with the first inches.  The imp squeals out in pain and you wince slightly in the vice-like grip.  Gritting your teeth you push in the remaining length, the sounds of pain only serving to drive you forward all the harder.  Soon your " + describeCock(player, cockThatFits) + " is moving in and out with more ease, though the imp's tender asshole is distending abnormally to accommodate the invading member.  As much as you long to extend your pleasure, the sensation and the unnatural sounds of the penetration prove too much for you to last long.\n\n");
                // <<GoTo I1>>
                centaurOnImpResults(player, 1, imp);
                // <<End>>
                player.orgasm();
                return { next: passTime(1) };
            }
        }
    }
    // Tentacledicks!
    // {{Player has 1+ very long (smallest 2+ feet) tentacle cocks}}
    if (player.body.cocks.length > 1 && player.body.cocks.sort(Cock.Largest).get(0)!.length >= 24) {
        CView.text("As your shadow falls over it, it looks with a hint of fear between your legs, and then its eyes widen in a mixture of apprehension and lust.  Before you can even more the little creatures scrambles forward between your hooves and wraps its hands around your " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(0)) + ".  Its tongue begins to trail all along the length of it as its small hands stroke it intensely.\n\n");
        // << Cor <50>>
        if (player.stats.cor < 50) {
            CView.text("You slowly undulate your " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(0)) + " against the creature's mouth, delighting in its eager tongue.  ");
            // <<GoTo I3 then return>>
            centaurOnImpResults(player, 3, imp);
            CView.text("The sounds beneath you quickly take on a more intense note and you feel massive amounts of cum splashing liberally over your hooves, belly, and " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(0)) + ".  The hot sensation sends you over the edge as you begin spilling yourself into the creature's eager mouth.\n\n");
            // <<GoTo I2>>
            centaurOnImpResults(player, 2, imp);
            // <<End>>
            player.orgasm();
            return { next: passTime(1) };
        }
        // << 1 or 2 cocks, Cor 50+>>
        else if (player.body.cocks.length === 2) {
            CView.text("With an evil smile you wait for your " + describeCock(player, player.body.cocks.sort(Cock.Smallest).get(0)) + " to be at its lips before you slide it forward into its waiting mouth.  Giving it little more than a moment to catch its breath you slide your " + describeCock(player, player.body.cocks.sort(Cock.Smallest).get(0)) + " further and down the creature's throat.  Though you cannot see the obscene bulge it is making in the creature's mouth-pussy you delight in the intense tightness beneath you.  The throat muscles are massaging your " + describeCock(player, player.body.cocks.sort(Cock.Smallest).get(0)) + " as the imp desperately scrambles for air, pulling at the tentacles you have forced into it.  It cannot even begin to close its jaw as you thrust deeper and deeper, as you try to intensify the sensations.\n\n");
            CView.text("As the imp is focused on the tentacles cutting off its air, you position your " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(0)) + " against its " + describeButthole(imp.body.butt) + ".  Pausing only for a second for the pleasure of anticipation, you shove yourself deep inside the imp's " + describeButthole(imp.body.butt) + ", only making it a few inches before having to pull back and try again.  The creature's throat seems to be working overtime now as it tries to divide its attention between the two invaders.  Each thrust of your " + describeCock(player, player.body.cocks.sort(Cock.Smallest).get(0)) + " makes it a little bit deeper inside of the creature, and you wonder passionately if you can get the two to meet in the middle.\n\n");
            CView.text("It is not long before you begin to feel the creature's struggles slowing down.  ");
            // <<Cor <80 >>
            if (player.stats.cor < 80) {
                CView.text("Feeling merciful you extract yourself from the creature, flipping it unto a nearby rock as it begins to regain consciousness.  Before it realizes what you are doing your " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(0)) + " is prodding at its " + describeButthole(imp.body.butt) + ", then sliding quickly between its cheeks.  The amount of slobber over you is more than enough lubricant.  You groan in pleasure as it gives a slight squeal, then proceed to finish yourself off in the once-tight orifice.\n\n");
                // <<Goto I1>>
                centaurOnImpResults(player, 1, imp);
                player.orgasm();
                return { next: passTime(1) };
            }
            // <<Cor 80+>>
            else {
                CView.text("You groan in pleasure and slide your " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(0)) + " even deeper down the creature's throat, until you can feel its head against your ");
                // <<if balls>>
                if (player.body.balls.count > 0) CView.text(describeBalls(true, true, player) + ".\n\n");
                else CView.text("groin.\n\n");
                // <<GoTo I3 then return>>
                centaurOnImpResults(player, 3, imp);
                CView.text("A guttural moan escapes your mouth as you realize the creature has completely passed out underneath you.  ");
                if (player.body.chest.find(BreastRow.FuckableNipples)) CView.text("Shoving your fingers deep into your " + describeNipple(player, player.body.chest.get(0)) + "s");
                else CView.text("With a fierce tug on your " + describeNipple(player, player.body.chest.get(0)) + "s");
                CView.text("you begin to cum deep and directly into the imp's stomach and " + describeButthole(imp.body.butt) + ".  ");
                // <<cum multiplier: lots>>
                if (player.cumQ() > 250) CView.text("Beneath you the creature's belly is distending more and more, and you can feel some of the overflowing cum filling back out until it is pouring out of the creature's unconscious mouth and overstretched ass, forming a spermy pool beneath it.");
                CView.text("With on last grunt you begin extracting the tentacles back out, almost cumming again from the tightness around them.  You give your " + describeCock(player, player.body.cocks.sort(Cock.Smallest).get(0)) + " one last shake over the creature's face before trotting away satisfied and already thinking about the next creature you might abuse.");
                player.orgasm();
                return { next: passTime(1) };
            }
        }
        // << 3+ cocks, Cor 80+>>
        else {
            CView.text("With an evil smile you wait for the creature's mouth to touch one of your tentacles before the other two snake their way down and wrap themselves around the imp's thighs.  With a tug the creatures is pulled off of it's feet and upside down, its eyes widening in a mixture of fear and debased lust as it sees your " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(0)) + " undulating in front of it.  You slowly move the tentacle up as your other cocks forcefully tug its legs apart, and then playfully begin sliding yourself over the imp's small cheeks.\n\n");
            // <<Cor 80+, has given birth to an imp>>Part of you wonders idly if this is one of the creatures that you spawned, and that left its spermy surprise on you after it came out of the womb<</Cor>>
            CView.text("Licking your lips in anticipation you begin pushing your " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(0)) + " into the imp's " + describeButthole(imp.body.butt) + " while listening to the mewling sounds coming from beneath you.  You take your time as you push in, seeing no need to rush yourself as you feel the creature gaping more and more.  Once you bottom out you reach down and grab the creature's arms, securing it firmly against your belly as you break into a trot.  The sensation of the imp's " + describeButthole(imp.body.butt) + " bouncing around your " + describeCock(player, player.body.cocks.sort(Cock.Largest).get(0)) + " is intense and you ride harder until you know you are close to the bring.  Quickly you slow down and drape the creature over a nearby boulder, using your hands and tentacles to pin it to the harsh surface, and then your mighty legs push you forward even deeper into the creature's bowels.  The shriek should be audible pretty far in this area, and you groan in debased pleasure thinking it might draw someone else for you to rape or be raped by.  Grunting slightly you begin pushing into the imp even harder just to generate more loud sex-noise.  ");
            // <<Breasts>>
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 0) {
                CView.text("One of your hands releases it and begins playing with your " + describeAllBreasts(player));
                // <<nips have pussies>>
                if (player.body.chest.find(BreastRow.FuckableNipples)) CView.text(" and fingering your " + describeNipple(player, player.body.chest.get(0)) + "s");
                CView.text(" as you drool slightly in absolute pleasure.  ");
            }
            CView.text("When the creature's noises lessen and all you can hear is the sloppy sounds of its ass being fucked you push yourself in a single mighty heave, grinding the creature into the rock and eliciting one last scream that pushes you over.\n\n");
            // <<GoTo I1>>
            centaurOnImpResults(player, 1, imp);
            // <<End>>
            player.orgasm();
            return { next: passTime(1) };
        }
    }
    player.orgasm();
    return { next: passTime(1) };
}
// CUNTS
function centaurOnImpFemale(player: Character, imp: Character, vape: boolean = false): NextScreenChoices {
    if (vape) {
        // PREGGERS CHANCE HERE - unfinished
        // {{Player has a cunt}}
        player.slimeFeed();
    }
    attemptKnockUp(player, PregnancyType.IMP, IncubationTime.IMP, ImpPregEvent);
    CView.text("As the imp lays beaten its hands stroke its " + describeCockShort(imp.body.cocks.get(0)) + " as its eyes look over you in the hope that you might abuse it in some manner.  You lick your lips as you stare at the large member and you turn around to display your " + describeVagina(player, player.body.vaginas.get(0)) + ".  ");
    // Not gaping?
    if (player.body.vaginas.get(0)!.looseness <= VaginaLooseness.GAPING) {
        // Penetration for non-gape cases
        CView.text("With a lascivious grin the imp hops forward, gripping your flanks as it drives its member forward into your " + describeVagina(player, player.body.vaginas.get(0)) + ".  ");
        // <<If Pussy Virgin>>
        if (player.body.vaginas.get(0)!.virgin) {
            CView.text("You cry out as your virginal pussy is torn open by the massive member and the creature cries out in pleasure as it realizes what it has taken from you.  ");
            // [Lose Virginity] <</Virgin>>
        }
        // Not virgin fucking flavors
        else {
            if (player.vaginalCapacity() < imp.body.cocks.get(0)!.area) CView.text("It groans in delight at your incredible tightness and shoves itself forward even harder.  ");
            // [Increase size as needed]
            // <<At Dicksize>>
            if (player.vaginalCapacity() >= imp.body.cocks.get(0)!.area && player.vaginalCapacity() <= imp.body.cocks.get(0)!.area * 1.25) CView.text("It makes a pleased sound as it slides deeply into your " + describeVagina(player, player.body.vaginas.get(0)) + ".  ");
            // <<Bigger than dicksize>>
            if (player.vaginalCapacity() >= imp.body.cocks.get(0)!.area * 1.25) CView.text("Its dick slides easily and slopping noises start sounding from your backside.  Part of you wishes that its large member was larger still, as your mind drifts to some of the monstrous cocks that have penetrated you in the past.  ");
        }
        // Ride around with him till he cums and falls off
        CView.text("When the creature completely bottoms out inside of you, you begin trotting forward with a wicked grin.  The creature's hands grasp your flanks desperately, and its " + describeCockShort(imp.body.cocks.get(0)) + " bounces inside your " + describeVagina(player, player.body.vaginas.get(0)) + ", adding to your sensation.  The movement is causing the imp to push himself even harder against you as it tries to not fall off, and it is all you can do to keep an eye on where you are going.  Soon you can feel the imp's sperm filling your " + describeVagina(player, player.body.vaginas.get(0)) + " and overflowing even as your cunt-muscles try to milk it of all of its seed. Unsatisfied you begin to speed up as you use its " + describeCockShort(imp.body.cocks.get(0)) + " to bring about your own orgasm.  The small creature is unable to let go without hurting itself.  It hangs on desperately while you increase the pace and begin making short jumps to force it deeper into you.  The feeling of sperm dripping out and over your " + describeClit(player) + " pushes you over and cry out in intense pleasure.  When you finally slow down and clear your head the imp is nowhere to be seen.  Trotting back along the trail of sperm you left behind you find only its small satchel.");
        displayStretchVagina(player, imp.body.cocks.get(0)!.area, true, true, false);
        player.orgasm();
        return { next: passTime(1) };
        // END OF NON GAPE CASE
    }
    // <<Gaping>>
    else {
        CView.text("With a lascivious grin the imp hops forward, gripping your flanks as it drives its member forward into your " + describeVagina(player, player.body.vaginas.get(0)) + ".  While you might have considered him large before you came to this place, the sensation is now merely pleasant, and you can't help but groan in slight disappointment.  ");
        // <<Cor 50+>>
        if (player.stats.cor >= 50) CView.text("You take comfort in knowing that at least there is a cock inside of you, and that soon it will be filling you with its seed.  Perhaps it might even impregnate you!  ");
        CView.text("The imp seems to have shared your initial annoyance, and suddenly you feel strange and harsh objects prodding your " + describeVagina(player, player.body.vaginas.get(0)) + " near where you are being penetrated.  Suddenly you feel yourself being forced open even wider, and you feel almost as if you are getting kicked inside of your pussy.  A second object touches near where the first had entered and you quickly brace yourself against a nearby tree.  The second jolt is even harder, feeling as if your cervix is getting stomped.  You howl out in pain as your pussy is virtually torn open, the imp using your tail to leverage not only his " + describeCockShort(imp.body.cocks.get(0)) + " but also his legs inside your " + describeVagina(player, player.body.vaginas.get(0)) + ".  ");
        // <<Cor <80>>
        if (player.stats.cor < 80) CView.text("Tears pour out of your eyes and you are sure you must be bleeding slightly, ");
        // <<Cor <50>>
        if (player.stats.cor < 50) CView.text("and you hang on to the tree, afraid of the pain from even the slightest movement.  ");
        // <<Cor 50+>>
        else CView.text("and you hang on to the tree, grunting like a rutting animal as you delight in the intense pain.  ");
        // <<Cor 80+>>
        if (player.stats.cor >= 80) CView.text("You howl out in pain and pleasure, bucking and hoping to intensify the sensation, hurling enticements and insults at the imp like a slut.  ");
        // <<Cor 50+, Breasts>>
        if (player.stats.cor >= 50 && player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 2) {
            CView.text("You release the tree as you begin playing with your " + describeAllBreasts(player));
            // <<w/ nip-pussies>>
            if (player.body.chest.find(BreastRow.FuckableNipples)) CView.text(" and shoving your fingers into your " + describeNipple(player, player.body.chest.get(0)) + ".  ");
            else CView.text(".  ");
            // <</Breasts>>
        }
        CView.text("The imp is pushing deeper and deeper and in moments you cry out again as you feel first its hooves and then its " + describeCockShort(imp.body.cocks.get(0)) + " tearing open your cervix and bottoming out in your womb.  ");
        // <<Asshole large+>>
        if (player.analCapacity() >= 35) {
            CView.text("When the imp realizes it cannot go any further you feel its hands against your asshole, and your eyes go wide in realization of what it is planning on doing.  Lubed up by your now drooling juices, the fist pushes hard into your " + describeButthole(player.body.butt) + ", shoving past your ring-muscles.  ");
            // <<Assole <gaping, Cor <80>>
            if (player.body.butt.looseness < 4 && player.stats.cor < 80) CView.text("Your howl of pain leaves your throat raw.  ");
            else CView.text("Your howl of perverse pleasure leaves your throat raw.  ");
        }
        CView.text("\n\nIt is a relief when you feel the creature's sperm filling your womb and lubricating your raw cervix, your own body is wrecked by an intense orgasm while it breeds you.  You pass out, waking up to find that the imp has slipped out of you and is lying unconscious and coated completely in a mixture of your juices and his own. After looking for anything you might be able to take away from him you limp away, you ");
        if (player.stats.cor < 80) CView.text("promise to yourself that you will not do that again.");
        else CView.text("find your cunt juices already dripping down your legs in anticipation of doing this again.");
        player.orgasm();
        return { next: passTime(1) };
    }
}

/*
{{Any player: Oral Give}}
<<Cor <30>>You look furtively at the imp's [imp cock desc] as the creature masturbates shamelessly on the ground in front of you.  Unable to help yourself, you trot closer and closer, leaning in to get a better look at its giant member.  A lustful part of you wonders what the dripping pre-cum would taste like against your tongue.<<else if Cor <50>>You look lustfully at the imp's [imp cock desc] as the creature masturbates shamelessly on the ground in front of you.  Licking your lips in anticipation you walk closer, lowering your head to better inspect it.  <<else>>Your grin betrays your lust as you watch the imp masturbate its [imp cock desc] shamelessly on the ground.  Your hands already drift over your body as you trot over and grab a hold of its [imp cock desc], bringing it to your eager lips.<</Cor>>  The Imp's eyes shoot open as its hands grab a hold of your [hair desc - if no hair, then ears] and it pulls its member against your lips.  With your guard down, images of fellating the [imp cock desc] fill your mind with overwhelming intensity.  The visions cause your jaw to fly open without any trace of your own volition, and suddenly the [imp cock desc] is forcing its way to the back of your throat.  <<Cor <40>>Your gag reflexes are trying desperately to kick in, serving only to massage the [imp cock desc] as the creature makes guttural noises and pushes its self even deeper. <<else if Cor <70>> Though it takes you a moment to get adjusted to the intrusion, soon you are able to relax your throat like an expert cock-swallower, taking it even deeper. <<else>>You moan around the creature's [imp cock desc], opening your throat as your eyes plead with it to fuck your mouth-hole even deeper.<</Cor>>

The creature's pre-cum tastes more like brimstone than salt, and yet something about it inflames you as it pools in your mouth and pours down your throat.  <<Cor <30>>It is disgusting to let this substance inside your body, but the images keep you from resisting. <<else Cor <60>>The corrupt fluids seem unusual, but something about the lewd act makes them more than worthwhile and you take some delight in knowing they are filling your body. <<else>><<If Pussy>>Your [pussies desc] start drooling juices, <</Pussy>><<If cock and pussy>>and your<<else If Cock>>Your cock grows rock hard<</If>>as you feel the corrupt fluids flowing throughout your body.<</Cor>> Without even having to think about it you reach out and <<Str <80>>stroke its [imp cock desc], trying to milk more of it into you <<else>>pick up the imp with one hand, your other hand stroking its [imp cock desc] and trying to milk more of it into you<</Str>><<Cor 80+, Str <80>> as you shove a finger into its [imp anus desc]<<else Cor 80+, Str 80+>> then shoving a finger into its [imp anus desc] and using the new form of grip to move the creature into and out of your mouth-hole<</Cor>>.<<Goto I3 then return>>  In only a few minutes the creature begins to lose its ability to resist your <<Cor <30>>tight<<else Cor <60>> skilled <<else>> eager <</Cor>> throat and begins to pour massive amounts of corrupt cum into your stomach. <<Cor 60-79>>As much as you love having your stomach filled with sperm, you quickly pull the imp back so that some of it might land on your tongue for you to savor.  The excessive cum is soon dripping down your lips, no matter how fast you try to swallow.<<else Cor 80+>>As much as you love having your stomach filled with sperm, a perverse thought fills you and you pull the creature out, <<Str 80+>>holding the creature over your head as <</Str>>you guide its [imp cock desc] to liberally coat your face <<Breasts>>and [breasts desc]<</Breasts>>.<</Cor>>You lick your lips clean of the creamy mess as you put down the now unconscious Imp and give it a look-over for valuables.  <<Cor 80+>>As you trot back the way you have come you idly trace a finger through the dangling sperm, hoping someone might see what a [slur] you have become becomes too uncomfortable to wear.  Though if you have to clean it off, you can always get more.. perhaps from an even more copious source.<<end>>

{{Any player: Anal Receive}}
As you watch the imp stroking its [imp cock desc] you find it difficult to resist the urge to feel that massive member sliding into your body.  Slowly you trot closer, turning around to display your rear to the creature.  <<Pussy, Cor <30>>Your [largest pussy desc] is already drooling in anticipation of the cum it is about to receive, though to your surprise you feel the imp's [imp cock desc] bumping slightly above it.  You try to turn and stop it, but the creature pushes deep past your anal muscles before you have a chance.<<else>><<Pussy, Cor <50>>>>Your [largest pussy desc] is already drooling in anticipation of the cum it is about to receive, though to your surprise you feel the imp's [imp cock desc] bumping slightly above it. You brace yourself in anticipation and slight trepidation, delighting in the perversion you are about to take part in. <<else Pussy, Cor 50+>>Though your [largest pussy desc] is dripping at the chance at being bred, you feel like you would like somehing a lot more raw.  Breathlessly you beg it to fuck your [anus desc], debasing yourself and lowering yourself to the ground so you can be as accessile as possible. You moan like a [slur] in anticipation of feeling a cock shoved deep into your [anus desc] <<Breasts>>gripping your nipples hard<<else>>raking your body with your nails<</Breasts>>as you try to keep from biting through your lips.  <</Pussy,/Cor>><<no Pussy>><<Cock>>Your [cocks desc] harden in anticipation<<else>>You rake your nails over your sides in anticipation<</Cock>> as you feel the creature prepare to mount you, its [imp cock desc] pressing up against your [anus desc].  <</no pussy>>
<<Cor 30+, Cor <50>> As the imp slowly pushes into your [anus desc] you moan in animalistic pleasure.<<else>>When you begin to feel your [anus desc] being distended you cry out and beg it to shove it harder, faster, to take your asshole as roughly as it can!<</Cor>><<anus smaller than dick>>The sheer size of the [imp cock desc] tears your anus open, sending streams of pain into you as you cry out in agony.[if anus smaller than dick, increase size]<</anus>>
[if anal virgin, lose anal virginity]

The Imp grunts as it ruts your [anus desc], and you can feel it bumping deeply against your bowels.  After a few minutes the initial pain is gone and you find yourself making bestial sounds along-side the overly-endowed creature.  You long to feel its cum filling you to overflowing, and break into a slight trot that causes the small imp to bounce around inside of your tightening asshole.  The combination of movement, grip, and its own furious thrusting seems to push it over the edge and you can feel jets of sperm shooting deeply into you, sending you into your own anal orgasm.  Used to the limit, the imp slides out of you and drops to the ground, barely conscious. <<Cor 80+>>Grinning at the perversity, you lower yourself down and take its dirty [imp cock desc] into your mouth, cleaning it thoroughly as you enjoy the mixture of your juices.  Your intense sucking and stroking causes a few last spurts of cum to fly out, and you pull the imp out lock enough to shoot the gouy mess over your face and hair while you swallow what was already in your mouth.<<end>>

{{Player has breast-pussies and is E+ sized breasts}}
As the imp falls to the ground, furiously masturbating its [imp cock desc] you smile in delight, your [nip-pussy desc] already beginning to grow wet <<lots of milk>>with the massive flow of milk pouring out of them<</milk>>.  You approach the little Imp at an eager trot, lowering yourself down and encasing its [imp cock desc] in your [breasts desc].  Its eyes fly open and stare in wicked delight at what it sees, quickly reaching out and beginning to fondle and finger your [nip-pussy desc].  Unable to resist any more, you press the opening of one of your [breasts desc] against the tip of the [imp cock desc].  If the creature is confused it does not show it, shoving its self hard quickly and hard into your tit.  [if virgin-nip, lose virginity]<<nip-size smaller than dick size>>Pain shoots through you as you feel the [nip-pussy desc] being forced to widen by the imp's massive tool, and you let out a slight scream [increase nip-pussy size]<</smaller>>  Without missing a beat the creature wraps its hands around your [breast desc] and begins thrusting liberally into it as if your tit was nothing more than a giant and perverted fuck-toy.  Seeing no point in arguing with the perception, you reach over and start shoving your own finger into your other [nip-pussy desc], crying out as you urge the imp to use your [breast desc].  Part of you longs to feel the imp's thick and corrupted cream filling your tit-hole, <<Cor <80>> and you begin moving your breast in circles around the thrusting member. <<else>>and you lower your breast against a rock, letting the imp squish your breast under its weight, grinding it into the rough stone as it continues to fuck it<</Cor>>.  The Imp seems to really enjoy this and after a few more minutes of intense pleasure it begins pouring its cum inside of your chest.  Without anywhere to go the cum pours back out, mixed with torrents of milk that are being stimulated out of you.  Exhausted the imp falls to the ground <<Cor <30>>leaving you frustrated. [no lust reduction] <<Cor <50>>before it can see you bringing your nipples to your mouth and sucking on the spermy mixture until you bring yourself to orgasm. <<Cor 80+>>before it can see you bringing your nipples to your mouth.  You suck hard to get to as much of its sperm as you can, shoving your tongue deep into yourself and digging around wih your fingers.  When this is not enough to bring you to orgasm you slap and bite your [nip-pussy desc], crying out as the intensity and perversion finally proves enough to push you over the edge.<</Cor>><<end>>
*/

function centaurOnImpResults(player: Character, iNum: number, imp: Character) {
    let cockThatFits = player.body.cocks.find(Cock.CockThatFits(imp.analCapacity()));
    if (!cockThatFits) cockThatFits = player.body.cocks.get(0)!;
    // {{ GoTo results }}
    // <<I1>>
    if (iNum === 1) {
        // <<cum multiplier: lots>>
        if (player.cumQ() >= 250) {
            // <<no knot>>
            if (cockThatFits.type !== CockType.DOG) CView.text("Soon the amount is overflowing from the abused " + describeButthole(imp.body.butt) + ", dripping between you with no sign of stopping as you continue thrusting yourself into the imp.  ");
            // <<knot>>
            else CView.text("Soon the abused " + describeButthole(imp.body.butt) + " is full to the brim, though your knot keeps any from escaping while more and more pumps in.  Soon the creature's belly is distending and the imp is gasping wordlessly. ");
            CView.text("When your " + describeCock(player, cockThatFits) + " finally emerges a torrent of cum follows out of the distended hole and covering the back of the creature's legs.  ");
            // <<I1_1>>
            // <<2 cocks>>
            if (player.body.cocks.length === 2) CView.text("Your other cock drenches the imp's back with its own secretions that immediately start dripping down its sides.  ");
            // <<3+ cocks>>
            if (player.body.cocks.length > 2) CView.text("Your other cocks release their cum all over the creature's back and sides, leaving it a glazed mess.  ");
            // <</I1_1>>
            CView.text("You leave him panting and lapping at a pool of your semen.");
        }// <</multiplier>>
        // <<cum multiplier: little-normal>>
        else {
            CView.text("With a last thrust into the cum receptacle you begin slowing down, even as its own " + describeCockShort(imp.body.cocks.get(0)) + " spills its seed over the ground.  ");
            // <<I1_1>>
            // <<2 cocks>>
            if (player.body.cocks.length === 2) CView.text("Your other cock drenches the imp's back with its own secretions that immediately start dripping down its sides.  ");
            // <<3+ cocks>>
            if (player.body.cocks.length > 2) CView.text("Your other cocks release their cum all over the creature's back and sides, leaving it a glazed mess.  ");
            // <</I1_1>>
            CView.text("You leave him panting and draped over the mossy boulder in a pool of your joint cum.");
        }
        return;
    }
    if (iNum === 2) {
        // <<cum multiplier: lots>>
        if (player.cumQ() >= 250) {
            CView.text("The imp's eyes widen in at the amount pouring in, and gobs of sperm begin overflowing down its chin.  ");
            // <<(lots cont.)  cum multiplier: excessive>>
            if (player.cumQ() >= 500) CView.text("No matter how fast it is swallowing it does not seem to be enough, and soon its belly is distended and its skin is covered in a thick coating of cum.  ");
            // <</multiplier>>
        }
        CView.text("Sated you trot away and leave the creature licking its lips and fingers, its eyes following you with lustful cunning.");
        // <</I2>>
        return;
    }
    // <<I3>>
    if (iNum === 3) {
        // <<Has Breasts>>
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 2) {
            CView.text("As the sensations intensify you reach up and begin massaging your " + describeBreastRow(player.body.chest.get(0)) + " and playing with your " + describeNipple(player, player.body.chest.get(0)) + "s.  ");
            // <<(breasts cont.) nips have pussies>>
            if (player.body.chest.find(BreastRow.FuckableNipples)) {
                // <<nip-pussies and milk>>
                if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1) CView.text("Milk streams out from your " + describeNipple(player, player.body.chest.get(0)) + "s as if they had been recently filled with dripping cum.  ");
                else CView.text("Your fingers slide faster and faster into your " + describeNipple(player, player.body.chest.get(0)) + "s even as the imp begins to stroke itself under you.  ");
            }
            // No pussies
            else {
                // <<else no pussies, has milk>>
                if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier > 0) {
                    // <<little milk>>
                    if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier <= 1) CView.text("Beads of milk begin to drip down your chest and occasionally spurt outward.  ");
                    // <<else>>
                    else CView.text("Milk pours out of your " + describeBreastRow(player.body.chest.get(0)) + " and streams down your body.  ");
                }// <</milk>>
            }
        }// <</Breasts>>
        return;
    }
}

function areImpsLactoseIntolerant(player: Character): NextScreenChoices {

    CView.text("You advance on the masturbating imp, baring your " + describeAllBreasts(player) + " and swinging them from side to side. The little creature watches them, mesmerized as he masturbates his foot-long erection.\n\n");

    CView.text("You sit down in front of the little creature and grab ahold of his hair. The imp squeals slightly in pain before his cries are silenced with a " + describeNipple(player, player.body.chest.get(0)) + ".  It fills his mouth as he yields, defeated. At once he starts to drink down as much of your milk as he can.\n\n");

    CView.text("After a moment, he takes one of his hands off his large member and puts it against your " + describeBiggestBreastRow(player) + " to steady himself as he continues to nurse. You give a pleased sigh and simply bask in the sensations of pleasure that being nursed gives you.  You ruffle the little imp's hair affectionately. \"<i>These creatures are so much nicer to be around when they just take their minds off their cocks,</i>\" you think as you see his other hand relax and stop rubbing his swollen, demonic member.\n\n");

    CView.text("You feel the imp's mighty gulps start to slow down until he lets out a sigh of relief. While imps may be small, they're very hungry creatures. Your " + describeNipple(player, player.body.chest.get(0)) + " slips out of the imp's mouth, and you gently lay it down on the ground. It gives a few gentle burps before dozing off; you can see that the imp's erection has retracted, and its belly has expanded significantly. You smile to yourself and, feeling fully satisfied, you stand up.");
    // set lust to 0, increase sensitivity slightly
    player.stats.lib += .2;
    player.stats.lust += -50;

    player.milked();
    return { next: passTime(1) };
}

export function impGangabangaEXPLOSIONS(player: Character): NextScreenChoices {
    player.slimeFeed();
    CView.sprite(SpriteName.Imp); // 18;
    // Set imp monster values
    // Clear arrays in preparation
    const monster = new ImpGang();
    CView.text("\n");
    CView.text("<b>You sleep uneasily. A small sound near the edge of your camp breaks into your rest and you awaken suddenly to find yourself surrounded by " + monster.desc.a + "</b>!\n\n");
    // CENTAUR
    if (player.body.legs.type === LegType.CENTAUR) {
        if (randInt(2) === 0 && (player.body.cocks.length === 0 || player.gender === 3)) {
            // (First encounter)
            if (!player.effects.has(StatusEffectType.ImpGangBang)) {
                CView.text("The imps stand anywhere from two to four feet tall, with scrawny builds and tiny demonic wings. Their red and orange skin is dirty, and their dark hair looks greasy. Some are naked, but most are dressed in ragged loincloths that do little to hide their groins. They all have a " + describeCockShort(monster.body.cocks.get(0)) + " as long and thick as a man's arm, far oversized for their bodies. Watching an imp trip over its " + describeCockShort(monster.body.cocks.get(0)) + " would be funny, if you weren't surrounded by a horde of leering imps closing in from all sides...\n\n");
                player.effects.add(StatusEffectType.ImpGangBang);
                CView.text("The imps leap forward just as you start to ready your " + player.inventory.weapon.displayName + ", one sweaty imp clinging to your arm");
                // (If the player has a weapon)
                if (player.inventory.weapon.displayName !== "fists") CView.text(" while another kicks your weapon out of reach");
                CView.text(".  The " + monster.desc.name + " surges forward and grapples you. Imps grope your body and hump their " + describeCockShort(monster.body.cocks.get(0)) + " against your horse legs, smearing their sweat and pre-cum into your " + player.body.skin.desc + ". The rest of the " + monster.desc.name + ", a dozen or more imps, all leer at you and laugh as they slap and pinch your body. The imps have sharp claws, tiny sharp teeth, and short horns on their heads. They scratch, claw, and bite at you with all of these weapons as they try to pull you down to the ground. One bold imp leaps forward and grabs your ");
                // (If the player has a cock)"
                if (player.body.cocks.length > 0) CView.text(describeCock(player, player.body.cocks.get(0)));
                // (If the player has breasts)
                else CView.text(describeNipple(player, player.body.chest.get(0)));
                CView.text(", twisting and pinching hard enough to make you yelp in pain. An imp leaps up and mounts you, grabbing your " + describeHair(player) + " like reins. The long flesh of his " + describeCockShort(monster.body.cocks.get(0)) + " rubs against the small of your back. The " + monster.desc.name + " stinks of sweat and pre-cum, its moist grip and obscene smirk leaves you with no doubt as to what they will do to you if you lose this fight.\n\n");
            }
            CView.text("The horde drags you to your knees, grappling your legs and crawling over your horse-body to pin you down. You try to buck them off but there are too many to fight. The imps drag your arms behind your back, wrapping them around your rider. Another imp whips off his loincloth to reveal his pre-cum drooling " + describeCockShort(monster.body.cocks.get(0)) + " and tosses the cloth to the imps holding your arms. They quickly tie your arms back with the sweat-damp loincloth.  ");
            // (If the player has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 1) CView.text("Having your arms tied behind your back forces your chest out, making your " + describeAllBreasts(player) + " stand out. They bounce as you struggle.  ");
            CView.text("The " + monster.desc.name + " stroke themselves and rub their hands over your outstretched chest, smearing their pre-cum into your skin. The imp riding you bounces up and down, rubbing his sweaty " + describeBalls(true, true, monster) + " against your " + player.body.skin.desc + " while he yanks your hair.  ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("Your face flushes with humiliation. Your imp rider twists your " + describeHair(player) + " hard and you whimper in pain. Imps rub their cocks along your " + describeHips(player) + " while others stroke themselves and jeer at your helplessness.  ");
            // (High Corruption)
            else CView.text(monster.desc.capitalA + " swarms over your body, some stroking themselves as they watch you squirm while others rub their cocks over your flanks. Your imp rider twists your hair, pulling your head back, and you moan in pleasure at the rough handling. Your " + player.body.skin.desc + " tingles as you start to flush with desire.  ");
            CView.text("You yelp in shock as you feel a sharp slap on your ass. You look back to see an imp pulling your tail up. He grins at you and slaps your " + describeHips(player) + " again. He yanks your tail and slaps your ass one last time, then dives down to plant his face in your " + describeVagina(player, player.body.vaginas.get(0)) + ". His inhumanly nimble tongue teases the folds of your pussy and flicks at your " + describeClit(player) + ".  ");
            // (If the player has balls)
            if (player.body.balls.count > 0) CView.text("The tongue slides over your " + describeSack(player) + ", coating it with warm drool.  ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You shake your hips, trying to escape the demonic tongue. The imp grips your " + describeHips(player) + " and pulls his face further into your cunt, sliding his nimble tongue over your lips. You grit your teeth, trying to ignore the warmth spreading from your " + describeVagina(player, player.body.vaginas.get(0)) + ".");
            // (High Corruption)
            else CView.text("You let out a shuddering sigh as the heat from your cunt spreads into the rest of your body. Your " + describeHips(player) + " tremble as the tongue slides over the folds of your " + describeVagina(player, player.body.vaginas.get(0)) + ". The imp grips your flanks harder and dives his nimble tongue into your fuck-hole.");
            CView.text("\n\n");

            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 1) {
                CView.text("Hands slide over your " + describeAllBreasts(player) + ", dragging your attention back to the front of the mob. Two imps grope your " + describeBiggestBreastRow(player) + ", mauling your flesh as they drag your tits around your chest. They lick your tit-flesh, slowly working their way up towards your " + describeNipple(player, player.body.chest.get(0)) + ". The imp rider drops your hair and reaches around you, shoving his cock against your back as he squeezes your " + describeBiggestBreastRow(player) + ". Finally the imps reach your nipples, their tongues wrapping around and pulling at the tingling flesh.  ");
                // (Low Corruption)
                if (player.stats.cor < 50) CView.text("You can't escape the tongues lapping and pulling at your " + describeNipple(player, player.body.chest.get(0)) + ", matching the one in your cunt. You shake your head to deny the pleasure, but your breathing comes faster and faster as lust invades your body.");
                // (High Corruption)
                else CView.text("The tongues squeezing and tugging your nipples match the tongue working your " + describeVagina(player, player.body.vaginas.get(0)) + ", flooding your body with lust. You moan and arch your back, offering your tits to the imps. You can hear your pulse pounding in your ears as you pant with desire.");
                CView.text("  Suddenly you feel tiny needle-sharp teeth pierce your " + describeNipple(player, player.body.chest.get(0)) + ". You scream as venom pumps into your tits, red-hot poison that makes your " + describeAllBreasts(player) + " feel as though they were being stung by bees. You moan in pain as your breasts start to swell, the imps continuing to pump demon-taint into them.\n\n");
                // Grow tits!
                growSmallestBreastRow(player, 2, player.body.chest.length);
                boostLactation(player, .3);
            }
            CView.text("Dimly through your haze of lust and pain you see a large imp step forward from the mob. Four feet tall and broader and stronger looking than any imp you've seen before, with a face as much bull as imp, this new imp has mottled grey skin, broad purple demon wings, two curving bull-horns on his head, and a " + nounCock(CockType.HORSE) + " big enough to choke a minotaur. The mushroom-like head of it bobs just below his mouth, and his snake-tongue darts out to flick a bit of pre-cum off the head and onto your face. You shudder as the hot fluid stings the sensitive skin of your lips. His " + describeBalls(true, true, monster) + " are each the size of your fist and slick with sweat. He slaps his sweaty cock-head against your cheek, nearly scalding you with the heat.  ");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("You yelp and twist your head to escape the heat.  ");
            // (End low corruption)
            CView.text("He slowly rubs his shaft over your cheeks and along your lips, each ridge of his demonically-hot " + nounCock(CockType.HORSE) + " tugging at your lips. The hot pre-cum dribbles over your sensitive flesh and the musk makes your sinuses tingle. The big imp sneers as you whimper, and whips his bull-shaft back to slap your face. The other imps watch and stroke themselves as their master cock-whips you.\n\n");

            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text("The big imp grabs one of your painfully distended breasts in each hand, mauling and bouncing the flesh as if weighing them. You gasp in pain as your " + describeAllBreasts(player) + " swell further at his touch. ");
            CView.text("Hot pre-cum dribbles through your lips and onto your tongue. The steaming salty goo is almost too hot to stand, and you stick your tongue out to cool it. The imps jerk their cocks harder as you pant, tongue hanging out of your mouth. The master imp steps back and looks you up and down, admiring his handiwork. His snake-tongue darts out to an incredible length and wraps itself around your tongue. He licks his pre-cum from you, then forces his tongue into your mouth. The master imp's tongue curves back into your mouth, pressing the glob of pre-cum into your throat. ");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("It's either swallow or have that demon-tongue forced all the way down your throat. Against your will you gulp back the glob.");
            // (High Corruption)
            else CView.text("You swallow the glob of pre-cum eagerly, trying to suck the demon's tongue into your throat.");
            CView.text("\n\n");

            CView.text("The big imp walks around you, casting his gaze over your pinned body.  ");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text("The other imps reclaim your aching breasts, sucking your " + describeNipple(player, player.body.chest.get(0)) + " and mauling your " + describeAllBreasts(player) + " so hard their fingers disappear into your swelling flesh. ");
            CView.text("The imp rubs his hands over your sides and flanks, his " + nounCock(CockType.HORSE) + " bobbing as he walks. The other imps watch their master as he moves around you. Only the imp sucking your " + describeVagina(player, player.body.vaginas.get(0)) + " doesn't notice, his tongue thrusting deeply into your folds. The big imp grabs him by the neck and easily tosses him aside, his tongue dragging through your cunt as he's pulled away from you. The master imp takes position behind you and grabs his " + nounCock(CockType.HORSE) + ", bringing the mushroom-head of it down to your pussy. You shake, knowing what's coming next. The other imps watch and stroke themselves as their master readies his hips to push into you.\n\n");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("You scream for help");
            // (High corruption)
            else CView.text("You moan with lust");
            CView.text(" as the inhumanly hot cock-head stretches your pussy lips, your cries vanishing into the dark skies above. Your rider grabs your hair to pull your head back, and you cry out as his master pushes his corrupted cock into you.  ");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 1) CView.text("The imps working your breasts suck harder, kneading your tit-flesh as though trying to milk you. ");
            CView.text("You squirm and twist against the imps holding you down as the hot " + nounCock(CockType.HORSE) + " almost burns your sensitive cunt. You can smell the sweat steaming off his shaft, and your pussy-fluids start to steam as well as he forces his cock-head into your " + describeVagina(player, player.body.vaginas.get(0)) + ". His huge cock-head bulges your groin, and you moan");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text(" in helpless terror as you feel the bulge work up from the base of your groin towards your stomach. You let out a shuddering moan of pain as inch after inch of monstrous " + nounCock(CockType.HORSE) + " stretches your belly");
            // (High corruption)
            else CView.text(", panting in lust as the monstrous " + nounCock(CockType.HORSE) + " pushes your flesh aside to make room for itself");
            CView.text(". ");
            // (This is a good place for the virginity-loss message, if needed)
            displayStretchVagina(player, monster.body.cocks.get(1).area, true);
            CView.text("You can feel every ridge and pulsing vein of his cock pulling on the lining of your stretched cunt. You tremble helplessly around the huge shaft, fully impaled on the imp's mutated bull-cock.\n\n");

            CView.text("Every pulse of his heart makes his cock twitch, making you shake in time to the shaft pulsing in your cunt. The imps jeer at you, masturbating over your shaking body. The big imp flexes his thighs, and his cock-head throbs deep in your belly. The other imps laugh as you ");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("whimper, spasming as the hot shaft presses against new areas");
            // (High corruption)
            else CView.text("moan in pleasure, rotating your hips around this incredible cock");
            CView.text(" in your stuffed " + describeVagina(player, player.body.vaginas.get(0)) + ". The big imp sneers and flexes his cock again, watching ");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 2) CView.text("your " + describeAllBreasts(player) + " roll on your chest as you squirm");
            // (If the character doesn't have breasts)
            else CView.text("your eyes roll back as you squirm");
            CView.text(".\n\n");

            CView.text("Finally the big imp pulls back his " + nounCock(CockType.HORSE) + ", each ridge pulling on your pussy flesh as he slides out. You yelp and buck as the mushroom-head catches on your folds. ");
            // (If the character has a cock)
            if (player.body.cocks.length > 0) CView.text("Your " + describeCocksLight(player) + " bounces as the bulge passes over it.  ");
            CView.text("You moan as the mushroom-head reaches the entrance of your " + describeVagina(player, player.body.vaginas.get(0)) + ", your stretched pussy-flesh slowly returning to normal. The master imp pushes forward again, reclaiming your pussy for his monstrous cock. ");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("You try to buck your " + describeHips(player) + ", fighting to break free as the bulge of his cock-head works its way high up into your belly. You're held down by too many imps. You can only writhe around the hot shaft stretching out your " + describeVagina(player, player.body.vaginas.get(0)) + ". The big imp grunts as his cock-head pops past your cervix, and you moan and shake in pain.  ");
            // (High corruption)
            else CView.text("You moan in ecstasy as the hot " + nounCock(CockType.HORSE) + " pushes deep into your " + describeVagina(player, player.body.vaginas.get(0)) + ", turning every inch of your pussy into a pleasure-sheath for the big imp. You know you're nothing but a fuck-toy for this corrupt creature, just a wet pussy for him to fill with cum, and the thought almost makes you orgasm as he forces his huge cock-head past your cervix.  ");
            CView.text("Finally the corrupt cock bottoms out against your womb. The imp pulls back again, and starts to fuck you slowly.\n\n");

            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 2) CView.text("The slow fucking shakes your breasts, and the imps sucking at your nipples cling tightly to your monstrously swollen " + describeAllBreasts(player) + ". Your " + describeBiggestBreastRow(player) + " have grown three cup sizes since the imps pumped their venom into you. An ache starts deep in the base of your tits and works its way to your sore " + describeNipple(player, player.body.chest.get(0)) + ". Your already bloated nipples swell as the imps suckle and you gasp as the first rush of milk spills into their mouths. Your rider reaches around and starts to milk your udders, moving his hands between your " + describeAllBreasts(player) + " and forcing out more milk for his gangmates.\n\n");

            CView.text("The big imp grinds his hips as he thrusts and pulls, rubbing his cock-ridges against every part of your " + describeVagina(player, player.body.vaginas.get(0)) + ". While sliding his mutated " + nounCock(CockType.HORSE) + " in and out of you, the imp rubs his hands along your mound, pulling it open or forcing it tight as he takes you. Your pussy juices steam off his cock as he pumps, and hot pre-cum dribbles down your crack and ");
            // (If the character has a cock)
            if (player.body.cocks.length > 0) CView.text("over your " + describeCocksLight(player) + " where it ");
            CView.text("drips onto the ground. ");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("The pain as this huge cock stretches you is overwhelming, but every thrust rubs more corrupt pre-cum into your pussy walls. You start to pant as the imp rapes you, using your body for his own pleasure. You tremble as the heat of his pre-cum soaks through your body. The huge shaft forces your " + describeClit(player) + " out, and the steaming fluids splashing on it make it tingle almost painfully. Your whimpers and moans of pain start to take on a different tone, and the master imp starts to fuck you faster.");
            // (High corruption)
            else CView.text("Pain and pleasure blend into one as the huge " + nounCock(CockType.HORSE) + " stretches you, rubbing pre-cum into your steaming pussy. You moan as the big imp fucks you, turning you into a mindless fuck-puppet. Your " + describeClit(player) + " swells painfully as hot juices splash over it. Your shaking body only adds to the master imp's pleasure.");
            CView.text("\n\n");

            CView.text("The other imps continue to jerk-off over you as the big imp impales you again and again on his shaft. Their pre-cum starts to splatter down on your body, and they pant as they watch your orgasm build. ");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 1) CView.text("Imps gulp milk from your bloated " + describeBiggestBreastRow(player) + ". As one imp drinks his fill and staggers away with a sloshing belly, another steps up to pump your milk-spewing udders.  ");
            // (If the character has a dick)
            if (player.body.cocks.length > 0) CView.text("Your " + describeCocksLight(player) + " swell painfully as the rough fucking pumps blood into your groin.  ");
            CView.text("The big imp's snake tongue flicks out and slides around your " + describeVagina(player, player.body.vaginas.get(0)) + ", pulling at your pussy lips. He moves his tongue back and forth along the sides of your steaming cunt, alternating between stretching and flicking the lips. ");
            // (If the character has a dick)
            if (player.body.cocks.length > 0) CView.text("He draws his tongue back and wraps it around your " + describeCock(player, player.body.cocks.get(0)) + ", sliding its length along your shaft and flicking his tongue over your cock-head.  ");
            CView.text("You gasp in time to the big imp's thrusts, whimpering when his cock or tongue hit a sensitive point. ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You're being raped by a demon, milked like a cow, and you're about to cum hard. This corrupted land has left its mark on you.");
            // (High corruption)
            else CView.text("This corrupted land has left its mark on you. You could never have taken a cock this big before you arrived here.");
            CView.text(" You moan as you rise towards your orgasm.\n\n");

            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 3) CView.text("Your udders shake back and forth under your chest in time to the rough fucking. You arch your back to press your " + describeNipple(player, player.body.chest.get(0)) + " into eager mouths, moaning as your rider milks your distended " + describeAllBreasts(player) + ". ");
            // (Low Corruption).
            if (player.stats.cor < 50) CView.text("Some part of you can still feel shame, and you whine and clench your teeth as the urge to <i>moo</i> rises in you.");
            // (High corruption)
            else CView.text("You moan shamelessly as you're fucked and milked, and the moans turn to long <i>mooos</i> of ecstasy.");
            CView.text("\n\n");

            CView.text("The master imp pounds into you as hard as he can, driving his " + describeCockShort(monster.body.cocks.get(1)) + " deeper into your cunt. His grunts come closer and closer together. Your rider grinds his cock into your back, rubbing his cock-head in your hair. He nips at your neck and shoulder as he pants. The master imp pounds into you and you can feel his " + describeBalls(true, true, monster) + " swell as they slap against you. Through the haze of your approaching orgasm you realize what's about to happen. Those oversized balls are about to pump more cum into you than any normal man could ever produce. They're going to pump demonic cum right into your womb. ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You scream as the base of his " + nounCock(CockType.HORSE) + " bloats with corrupted jism, the thick bulge stretching your pussy even more as it pumps along the imp's shaft. The bulge swells your belly and you can feel it move through your stretched cunt towards your womb. Another thick bulge forms at the base of the master imp's cock and you thrash wildly, yelling in protest. \"<i>NOO - O - O - OOOOHhh!</i>\" The hot cum floods into your womb and you reach your own orgasm, shaking as your " + describeVagina(player, player.body.vaginas.get(0)) + " clamps down on his cock and milks it of waves of cum. Another orgasm hits on the heels of the first one, and you buck as more demon-cum floods your womb. Gasping for air, you continue to come as your belly swells. Even as he pumps more corrupt cum into you the big imp keeps raping you, forcing you to another peak before you've come down from the last one.");
            // (High corruption)
            else CView.text("The thought of all that demon-jism in your womb pushes you over the edge. You cum hard, bucking your hips against the " + nounCock(CockType.HORSE) + " pumping hot cum into your belly. Your eyes roll back in your head and you scream out in ecstasy as thick jets of cum fill your pussy. The imp keeps thrusting into his fuck-toy even as he fills your womb with his cum, forcing you to another peak before you've come down from the last one. The big imp is your master now.");
            CView.text("  You nearly black out as the orgasm blasts through you,  shrieking yourself hoarse as the orgasm wracks your body, eyes rolling back in your head as your womb swells.\n\n");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text("As orgasms wrack your body your breasts pump out even more milk, too much for the imps below to handle. Milk pours down your chest in great streams, soaking the imps and splashing onto the ground below you. The milk gushing through your tender " + describeNipple(player, player.body.chest.get(0)) + " pushes you to another orgasm. You shake your tits as you cum, mooing in mindless pleasure, spraying jets of milk everywhere. Your rider cums, soaking your " + describeHair(player) + " with jets of imp-jism that run down your scalp and over your cheeks. ");
            // (High corruption)
            if (player.stats.cor >= 50) CView.text("You lap eagerly at the salty cum, licking up and drinking as much as you can.");
            CView.text("\n\n");
            CView.text("Imp-jism rains down on your helpless spasming body. The imps spew cum into your hair, across your back and " + describeHips(player) + ", over your face");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text(", and bouncing " + describeAllBreasts(player));
            CView.text(". The " + monster.desc.name + " is no longer holding you down. They masturbate over you as you claw at the ground with your hands, hooves scraping the earth as you clamp your thighs tight around the big imp. Another pulse of demonic cum hits your womb. You push back against your master, forcing as much of his cock into you as possible. Arching your back, your eyes roll back in your head and you moo as your womb stretches painfully, a final orgasm crashing through your cum-bloated body. You spasm around the cock that impales you, thrashing as ");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text("milk spurts from your " + describeNipple(player, player.body.chest.get(0)) + " and ");
            CView.text("steaming fluids spew from your over-filled pussy. Unconsciousness follows closely on the heels of this last orgasm, your mind shutting down even as your body still shudders.\n\n");
            CView.text("You wake up later, body still twitching as tiny orgasms spark in your " + describeVagina(player, player.body.vaginas.get(0)) + ". It's still dark out. You lie on your side in a pool of cooling cum, milk, and pussy juice. Your body is covered in long ropes of drying imp-cum, and your hair is plastered to the ground. There's no sign of the horde of imps or their big master. Your skin is stretched and shiny over your still milk-bloated tits. Your belly is as tight and distended as a mare on the verge of giving birth. It quivers as the flesh of your " + describeVagina(player, player.body.vaginas.get(0)) + " spasms. Over the swollen curve of your belly you can see steam rising from between your legs. You start to slip back into unconsciousness. ");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("Your last coherent thought is to find a way to better hide your camp, so this never happens again.");
            // (High corruption)
            else CView.text("Your last coherent thought is to find a way to make your own mutated master imp, maybe even a stable full of them...");
            player.orgasm();
            player.stats.lib += 2;
            player.stats.cor += 3;

            attemptKnockUp(player, PregnancyType.IMP, IncubationTime.IMP - 14, ImpPregEvent); // Bigger imp means faster pregnancy
        }
        // Scene number 2 - male possible.
        else {
            // Scene 2 (Centaur, vaginal)
            if (player.effects.has(StatusEffectType.ImpGangBang)) {
                // (Subsequent encounters - Low Corruption)
                if (player.stats.cor < 50) CView.text("You can't tell if this is the same " + monster.desc.name + " as last time or not. You're not racist, but all imps look alike to you. " + monster.desc.capitalA + " surges forward, grabbing at your legs and arms and running their hands over your body. You struggle, but there are just too many to fight. The result is the same as last time...\n\n");
                // (Subsequent encounters - High Corruption)
                else CView.text("It's about time they showed up. It's not like there's a lot to do in these rocks, and you were getting bored. You grab an imp dick in either hand and spread your legs as other imps grope your thighs...\n\n");
            }
            CView.text("The imp mob tackles you, grabbing at your arms as you ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("swing your " + player.inventory.weapon.displayName + " wildly, determined not to let them take you");
            // (High Corruption)
            else CView.text("twist and struggle in their grips, determined to make them work for their fun");
            CView.text("! You kick back and feel your hooves smash into an imp's chest, sending him flying. But the " + monster.desc.name + " has your legs and more imps grab your arms. The pack drags you thrashing and bucking over to an old log lying on the ground.\n\n");

            CView.text("Your human torso is dragged down to the log by " + monster.desc.a + " while two more leap onto your back. The " + monster.desc.name + " makes short work of your " + player.inventory.armor.displayName + ", unbuckling straps and stripping you quickly. ");
            // (If the player has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0) CView.text("Your unbound " + describeBiggestBreastRow(player) + " bounce out over the weathered log. ");
            CView.text("The imps spread your arms wide, forcing your chest out, and tie them to the log with sweaty loincloths. Your " + describeHips(player) + " are stuck high in the air. Imps rub their sweaty cocks and " + describeBalls(true, true, monster) + " over your legs and grope your crotch. The two imps riding your back start stroking and licking each other. ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("Your face flushes with humiliation as they turn their attentions on each other, each working their hands and tongue over the other's dick. How dare these demons use you as a bed to sate their lusts?!");
            // (High Corruption)
            else CView.text("Your face flushes with anger as they turn their attentions on each other, each working their hands and tongue over the other's dick. You worked hard for this magnificent body, and now they're not using it?!");
            CView.text("\n\n");

            CView.text("An imp quickly climbs up your body, planting his feet on your shoulders and grabbing your " + describeHair(player) + " with one hand for support. He rubs his " + describeBalls(true, true, monster) + " over your mouth, smearing your lips with musky sweat, while he pries at your jaw with his other hand. ");
            // (If the player has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text("An imp mounts the log and slaps his " + describeCockShort(monster.body.cocks.get(0)) + " between your " + describeAllBreasts(player) + ", squeezing them tight over his cock as he rubs back and forth. He mauls your breasts cruelly, squeezing his fingers deep into your soft flesh.  ");
            // (If the player has a SINGLE cock)
            if (player.body.cocks.length === 1) CView.text("An imp ducks under your body and grabs your " + describeCock(player, player.body.cocks.get(0)) + ". His nimble tongue flicks over your cock-head while he pricks the shaft with his tiny claws.  ");
            // (If the player has a MULTI cock)
            if (player.body.cocks.length > 1) CView.text("Two imps duck under your body and seize your " + describeCocksLight(player) + ", licking the tips with their inhumanly flexible tongues while they stroke the shafts.  ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You fight to free your hind legs and buck the imps off your back, while sweaty hands slide over your crotch. You whine through clenched teeth as sharp claws jab at your sensitive flesh.\n\n");
            // (High Corruption)
            else CView.text("You writhe in the grasp of the imps, reveling in the sensations as tiny claws and teeth nip at your sensitive crotch. You lick salty musk off the swollen balls dangling above your mouth.\n\n");
            CView.text("\n\n");

            // (If the player has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text("The imp fucking your " + describeBiggestBreastRow(player) + " handles your soft flesh roughly, pressing and pulling your tits into a fuck-canal for his demon cock. Other imps slap your " + describeAllBreasts(player) + " and laugh as you cry out.  ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You whimper as your mistreated flesh stings with dozens of pin-prick scratches and bites, and the " + monster.desc.name + " slaps your chest and flanks. The abuse falls on you from all sides, leaving you with no escape. The imp on your shoulders pries your jaws open, and you gag on his " + describeBalls(true, true, monster) + ".");
            // (High Corruption)
            else CView.text("You suckle eagerly at the musky balls in your mouth. Abuse falls on you from all sides, imps leaving tiny marks on your skin as they nip and scratch at you. You whimper in delight as tiny hands slap your chest and flanks.");
            CView.text("\n\n");

            CView.text("With a loud sucking sound, the imp pulls his balls out of your mouth. Spit and ball-sweat drip over your cheeks as he repositions himself, bending almost completely over on your shoulders to rub his cock-head against your lips. You nearly choke as pre-cum dribbles into your mouth and runs down the back of your throat. The " + describeCockShort(monster.body.cocks.get(0)) + " blocks most of your vision, but in the corners of your eyes you see the master of this imp horde step forward. Four feet tall and broader and stronger than any imp in the pack, with a face as much dog as imp, this new imp has black fur, broad red demon wings, two long demon-horns on his head, and a " + nounCock(CockType.DOG) + " big enough to choke a minotaur. He leers at your helpless body and grabs ");
            // (If the player has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text("one of your sore " + describeBiggestBreastRow(player) + " in his calloused hand, brutally pressing his fingers into your flesh");
            // (If the player doesn't have breasts)
            else CView.text("your tail and yanks, brutally pulling on it");
            CView.text(" until you shriek. The imp riding your shoulders plunges his " + describeCockShort(monster.body.cocks.get(0)) + " into your mouth, pounding at the top of your throat.\n\n");

            CView.text("The master imp walks back to your hips, lightly dragging his sharp claws over your flanks. He kicks another imp out of the way and takes position behind your " + describeHips(player) + ". He pulls his monstrously long " + nounCock(CockType.DOG) + " down and rubs the tip over your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(".  ");
            // (If the player has a cock)
            if (player.body.cocks.length > 0) CView.text("Pre-cum drips from the broad tip of it, dripping down to the base of your " + describeCocksLight(player) + ".  ");
            CView.text("The big imp's hot pre-cum stings your flesh. The imps licking your crotch lap up the hot fluid, cooling you with their saliva. The big imp sneers as you whimper, and presses the head of his " + nounCock(CockType.DOG) + " against your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(". ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You try to pull away from the hot cock-head rubbing against your hole, but the " + monster.desc.name + " holds you tight.");
            // (High Corruption)
            else CView.text("The scent of musk steaming off the" + nounCock(CockType.DOG) + " drives you wild, and you push back to try and capture the cock-tip.");
            CView.text("\n\n");

            CView.text("The pointed tip of the master imp's " + nounCock(CockType.DOG) + " plunges into your hole, splitting your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(" wide open. You moan around the cock fucking your throat as the corrupted wolf-cock pushes deeper into your hole. The painfully hot shaft claims inch after inch of your flesh, forcing its way deeper into you than any normal human could bear. Bound to the log you can only shake in agony as the big imp's thick dog-knot hits your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(".");
            // (If the player has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text("  The imp fucking your aching " + describeBiggestBreastRow(player) + " paints your tits with a massive load of cum. He falls off the log and another imp jumps up to take his place.");
            CView.text("\n\n");

            CView.text("The big imp fucks you roughly, clenching your " + describeHips(player) + " in his clawed hands as he hammers his " + nounCock(CockType.DOG) + " into you. The head of his mutated shaft pounds ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text("the entrance of your womb");
            // (If the player doesn't have a vagina)
            else CView.text("depths of your bowels");
            CView.text(" as the knot slams against your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(". Each hard thrust pounds you against the log, and you grunt in time to the shaft pistoning in your hole.\n\n");

            CView.text("The master imp fucks you for what seems like hours, beating his dog-knot against your sore ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(" and slapping your ass every few thrusts to remind you who is in charge. Imp after imp stretches your throat with their cocks and your belly with demon-seed as the pack rapes your face. ");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text("The rough fucking shakes your cum-stained breasts, and the imp fucking your " + describeAllBreasts(player) + " clings tightly to your red and swollen tit flesh. Your " + describeBiggestBreastRow(player) + " burn with agony as the " + monster.desc.name + " slaps your tits like drums.  ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You're being raped again by demons, impaled on cocks like a roast pig on a spit, and you can feel your lust rising. This corrupted land has left its mark on you.");
            // (High corruption)
            else CView.text("This corrupted land has left its mark on you. You could never have taken a cock this big before you arrived here.");
            CView.text("\n\n");

            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You gurgle helplessly as the cock raping your throat pours thick wads of");
            // (High Corruption)
            else CView.text("You eagerly chug thick wads of cum from the cock stretching your throat, working your throat to force more");
            CView.text(" cum into your swelling belly. The imp slams his cock as deep into your throat as it will go, slapping his " + describeBalls(true, true, monster) + " against your face. He cums for an impossibly long time, streams of jism pouring into you. You can feel your stomach stretching, but you're more worried about breathing. The edge of your vision starts to go red and your chest heaves as you fight for air. Finally the imp draws his cock out of your throat, spraying his last gobs of cum over your face as you gasp in huge lungfuls of air. The sudden rush of oxygen pushes you over the edge and you cum hard. Your hands clench at the air and your eyes roll back in your head as you twist around the demonic " + nounCock(CockType.DOG) + " pounding into you. You shriek as your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(" spasms on the steaming pole that impales it. Another imp shoves his cock in your mouth as you scream, throat convulsing around his cock-head.");
            // (If the player has a cock)
            if (player.body.cocks.length > 0) CView.text("  Your " + describeCocksLight(player) + " shoots cum across the ground and into the waiting mouths of the imps licking your crotch.");
            CView.text("\n\n");

            CView.text("Another imp-cock spasms in your throat as its owner rams deep into you. He floods your already swollen stomach with inhuman amounts of cum. Again you feel yourself about to black out as the demon pumps jism into you. He pulls out and again you orgasm as you wheeze for air. Another imp forces his cock down your throat as you moan and gasp. Your body shakes in pleasure on the big imp's " + nounCock(CockType.DOG) + ".  Tightening his grip on your " + describeHips(player) + " the master imp howls and slams his shaft into your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(". His unnaturally huge knot stretches the entrance of your hole, and he hammers into you again. ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You howl around the imp-cock stretching your throat. The bloated knot opens your hole far beyond anything you've endured before. Your violent thrashing throws the imps off your back and you buck uselessly, thrashing as the swollen " + nounCock(CockType.DOG) + " plunges deeper into you.");
            // (High corruption)
            else CView.text("The master imp's bloated knot stretches your entrance and plunges into your hole with a loud <i>pop</i>. Another orgasm hits you as the " + nounCock(CockType.DOG) + " rams even deeper into you. You howl around the imp-cock stretching your throat, bucking as your orgasm shakes you. Your violent thrashing throws the imps off your back and slams your hips against the big imp, pushing him further into your hole.");
            CView.text("  The big imp howls again as he cums, each wave of steaming demon-cum stretching his knot and shaft even more. His cum-pumping " + nounCock(CockType.DOG) + " is bottomed out deep in your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text("womb");
            // (If the player doesn't have a vagina)
            else CView.text("guts");
            CView.text(" and he pumps more jism into you than his balls could possibly hold. Your belly stretches with every blast of cum and you shriek around yet another cock in your throat.\n\n");

            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text("The imp riding your " + describeBiggestBreastRow(player) + " cums, his load lost in the flood of jism dripping off your abused fuck-udders. ");
            CView.text("Your master isn't done with you yet, churning his " + nounCock(CockType.DOG) + " knot in your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(" as he continues to cum. You're pumped full of demon-cum from both ends as one imp shoots his load in your throat and another steps up to take his place. You shake and tremble in your own endless orgasm as the pleasure in your stretched hole blends with the pain of your swollen belly. Your fingers claw at the log as the master imp shifts his massive knot within your monstrously stretched ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(". Your legs give out as you feel more pulses of demon-cum work their way up his shaft and into your already-huge belly.\n\n");

            CView.text("You pass out as another tidal wave of corrupted jism spews into your hole, another load of imp-cum pours down your throat, to meet somewhere in the middle...\n\n");

            CView.text("You wake up later, still trembling with small orgasms. Cum burbles in your mouth as you breathe, and your " + describeHair(player) + " is soaked with jism. You haven't moved since you passed out. Your arms are still tied to the log, ");
            // (If the player has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0) CView.text("your bruised and throbbing tits pressed against the rough wood, ");
            CView.text("and your body rests in a cooling pool of cum. You couldn't move even if your " + describeLegs(player) + " felt stronger. Your hideously bloated belly weighs you down, quivering with every orgasmic twitch that passes through you. The skin of your distended belly is drum-tight and shiny. As you slip back into unconsciousness, one last thought flits across your mind. ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("How long can you last in this corrupted land, when your body can be so horribly twisted by the sick pleasures of its denizens?");
            // (High corruption)
            else CView.text("Why bother with your silly quest, when you've only scratched the surface of the pleasures this land offers you?\n");
            player.orgasm();
            player.stats.lib += 2;
            player.stats.cor += 3;

            attemptKnockUp(player, PregnancyType.IMP, IncubationTime.IMP - 14, ImpPregEvent); // Bigger imp means faster pregnancy
            // Stretch!
            if (player.body.vaginas.length > 0) {
                if (displayStretchVagina(player, monster.body.cocks.get(2).area, true)) CView.text("\n");
            }
            else {
                if (displayStretchButt(player, monster.body.cocks.get(2).area, true)) CView.text("\n");
            }
        }
    }
    // NOT CENTAUR
    else {
        if (randInt(2) === 0 && (player.body.cocks.length === 0 || player.gender === 3)) {
            // (First encounter)
            if (!player.effects.has(StatusEffectType.ImpGangBang)) {
                CView.text("The imps stand anywhere from two to four feet tall, with scrawny builds and tiny demonic wings. Their red and orange skin is dirty, and their dark hair looks greasy. Some are naked, but most are dressed in ragged loincloths that do little to hide their groins. They all have a " + describeCockShort(monster.body.cocks.get(0)) + " as long and thick as a man's arm, far oversized for their bodies. Watching an imp trip over its " + describeCockShort(monster.body.cocks.get(0)) + " would be funny, if you weren't surrounded by a horde of leering imps closing in from all sides...\n\n");
                player.effects.add(StatusEffectType.ImpGangBang);
            }
            CView.text("The imps leap forward just as you start to ready your " + player.inventory.weapon.displayName + ", one sweaty imp clinging to your arm");
            if (player.inventory.weapon.displayName !== "fists") CView.text(" while another kicks your weapon out of reach");
            CView.text(". The " + monster.desc.name + " surges forward and grapples you. Imps grope your body and hump their " + describeCockShort(monster.body.cocks.get(0)) + " against your legs, smearing their sweat and pre-cum into your " + player.body.skin.desc + ". The rest of the " + monster.desc.name + ", a dozen or more imps, all leer at you and laugh as they slap and pinch your body. The imps have sharp claws, tiny sharp teeth, and short horns on their heads. They scratch, claw, and bite at you with all of these weapons as they try to pull you down to the ground. One bold imp leaps forward and grabs your ");
            // (If the player has a cock)
            if (player.body.cocks.length > 0) CView.text(describeCock(player, player.body.cocks.get(0)));
            else CView.text(describeNipple(player, player.body.chest.get(0)));
            CView.text(", twisting and pinching hard enough to make you yelp in pain. The " + monster.desc.name + " stinks of sweat and pre-cum, and their moist grips and obscene smirks leave you with no doubts about what they will do to you if you lose this fight.\n\n");
            // (Bipedal, vaginal)
            CView.text("The " + monster.desc.capitalA + " overwhelms you, dragging you to the ground with sheer numbers. There are at least two imps on each limb, holding you spread-eagled on the cold ground while other imps stroke your body. ");
            // (If the player has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0) CView.text("Imps surround your chest, slapping their " + describeCockShort(monster.body.cocks.get(0)) + "s on your " + describeAllBreasts(player) + " and rubbing their slippery pre-cum into your " + describeNipple(player, player.body.chest.get(0)) + ".  ");
            CView.text("Others stand over your head, their cocks bobbing inches from your face as they jack off. A thick musk wafts off their cocks, and the smell of it makes your sinuses tingle. Two more imps take position between your legs, sliding their cocks along your thighs while stroking your " + describeVagina(player, player.body.vaginas.get(0)) + " and flicking your " + describeClit(player) + ".");
            // (If the player has a cock)
            if (player.body.cocks.length > 0) CView.text("An imp rubs his hand across his cock-head, smearing it with his pre-cum. He rubs his hand over your " + describeCocksLight(player) + ", making your cock-skin tingle as his fluid soaks into you.");
            CView.text("\n\n");
            CView.text("The " + monster.desc.name + " snickers lewdly as your nipples harden and your pussy moistens. One of the imps between your legs slides his shaft along your pussy lips, teasing your " + describeClit(player) + " with the tip of his cock.  ");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("You renew your struggles, trying to break free of your captors. They only laugh and bear down harder on you.  ");
            // (High corruption)
            else CView.text("You buck your hips, trying to capture his " + describeCockShort(monster.body.cocks.get(0)) + " with your " + describeVagina(player, player.body.vaginas.get(0)) + ".  ");
            CView.text("Before he can thrust into you, the imp is shoved aside by the biggest imp you've ever seen.\n\n");

            CView.text("Four feet tall and broader and healthier looking than any imp you've seen before, with a face as much bull as imp, this new imp has mottled grey skin, broad purple demon wings, two curving bull-horns on his head, and a " + nounCock(CockType.HORSE) + " big enough to choke a minotaur. The mushroom-like head of it bobs just below his mouth, and his snake-tongue darts out to flick a bit of pre-cum off the head and onto your groin. You shudder as the hot fluid stings the sensitive skin of your " + describeVagina(player, player.body.vaginas.get(0)));
            // (If the player has a dick)
            if (player.body.cocks.length > 0) CView.text(" and " + describeCocksLight(player));
            CView.text(". His " + describeBalls(true, true, monster) + " are each the size of your fist and slick with sweat. He slaps his sweaty balls against your " + describeVagina(player, player.body.vaginas.get(0)) + " nearly scalding you with the heat.  ");
            // (Low corruption)
            if (player.stats.cor < 33) CView.text("You yelp and buck your hips to escape the heat.  ");
            CView.text("He grabs your hips and slowly drags his shaft down your pussy, each ridge of his demonically-hot " + nounCock(CockType.HORSE) + " hitting your clit and pulling at your lips. Finally the broad horse-like head of his shaft catches on your " + describeClit(player) + ", and the hot pre-cum dribbles over your sensitive flesh. The big imp sneers as you whimper, and drags his cock-head down to the opening of your " + describeVagina(player, player.body.vaginas.get(0)) + ". The other imps watch and stroke themselves as their master pulls his hips back to push into you.\n\n");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("You scream for help");
            // (High corruption)
            if (player.stats.cor >= 50) CView.text("You moan with lust");
            CView.text(" as the inhumanly hot cock-head stretches your pussy lips, your cries vanishing into the dark skies above. Two imps grab your hair and pull your head up, forcing you to watch as their master pushes his corrupted cock into you. Other imps spread your [legs] even wider, leaving you helpless as the big imp slides his swollen meat into your " + describeVagina(player, player.body.vaginas.get(0)) + ". You squirm and twist against the imps holding you down as the hot flesh almost burns your sensitive cunt. You can smell the hot sweat steaming off his shaft, and your pussy-fluids start to steam as well as he forces his cock-head into your " + describeVagina(player, player.body.vaginas.get(0)) + ". His huge cock-head bulges your groin, and you watch ");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("in helpless terror as the bulge inches up from the base of your groin towards your stomach. You let out a shuddering moan of pain as inch after inch of monstrous " + nounCock(CockType.HORSE) + " stretches your belly");
            // (High corruption)
            else CView.text("panting in lust as the monstrous " + nounCock(CockType.HORSE) + " pushes your flesh aside to make room for itself");
            CView.text(". ");
            // (This is a good place for the virginity-loss message, if needed)
            displayStretchVagina(player, monster.body.cocks.get(1).area, true);
            CView.text("\n\n");
            CView.text("You can feel every ridge and pulsing vein of his cock pulling on the lining of your stretched cunt. You tremble helplessly around the huge shaft, fully impaled on the imp's mutated bull-cock.\n\n");
            CView.text("Every pulse of his heart makes his cock twitch, making you shake in time to the shaft pulsing in your cunt. The imps jeer at you, masturbating over your shaking body. The big imp flexes his thighs, and the bulge of his cock-head bounces high in your belly. The other imps laugh as you ");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("whimper, spasming as the hot shaft presses against new areas");
            // High corruption)
            else CView.text("moan in pleasure, rotating your hips around this incredible cock");
            CView.text(" in your stuffed " + describeVagina(player, player.body.vaginas.get(0)) + ". The big imp sneers and bounces his cock again, watching ");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 3) CView.text("your " + describeAllBreasts(player) + " roll on your chest as you squirm");
            // (If the character doesn't have breasts)
            else CView.text("your eyes roll back as you squirm");
            CView.text(".  ");
            // (If the character has a cock)
            if (player.body.cocks.length > 0) CView.text("Your " + describeCocksLight(player) + " slaps against your distended belly as you shake.");
            CView.text("\n\n");
            CView.text("Finally the big imp pulls back his " + nounCock(CockType.HORSE) + ", each ridge pulling on your pussy flesh as he slides out. An imp reaches out and slaps the bulge as it withdraws, making you yelp and buck.  ");
            // (If the character has a cock)
            if (player.body.cocks.length > 0) CView.text("Your " + describeCocksLight(player) + " bounces as the bulge passes under it.  ");
            CView.text("You moan as the mushroom-head reaches the entrance of your " + describeVagina(player, player.body.vaginas.get(0)) + ", your stretched pussy-flesh slowly returning to normal. The master imp pushes forward again, reclaiming your pussy for his monstrous cock. ");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("You try to pull your hips back, fighting to break free as the bulge of his cock-head works its way high up into your belly. You're held down by too many imps. You can only writhe around the hot shaft stretching out your " + describeVagina(player, player.body.vaginas.get(0)) + ". Your head is held steady by two imps, you can't even look away as their master rapes you. The big imp grunts as his cock-head pops past your cervix, and you moan and shake in pain.");
            // (High corruption)
            else CView.text("You moan in ecstasy as the hot " + nounCock(CockType.HORSE) + " pushes deep into your " + describeVagina(player, player.body.vaginas.get(0)) + ", turning every inch of your pussy into a pleasure-sheath for the big imp. You know you're nothing but a fuck-toy for this corrupt creature, just a wet pussy for him to fill with cum, and the thought almost makes you orgasm as he forces his huge cock-head past your cervix.");
            CView.text("Finally the corrupt cock bottoms out against your womb. The imp pulls back again, and starts to fuck you slowly.\n\n");

            CView.text("The big imp grinds his hips as he thrusts and pulls, rubbing his cock-ridges against every part of your " + describeVagina(player, player.body.vaginas.get(0)) + ".  While sliding his mutated " + nounCock(CockType.HORSE) + " in and out of you the imp rubs his hands along your mound, pulling it open or forcing it tight as he takes you. Your pussy juices steam off his cock as he pumps, and hot pre-cum dribbles down your crack to your " + describeButthole(player.body.butt) + ". ");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("The pain as this huge cock stretches you is overwhelming, but every thrust rubs more corrupted pre-cum into your pussy walls. You start to pant as the imp rapes you, using your body for his own pleasure. Your nipples swell as the heat of his pre-cum soaks through your body. The huge shaft forces your " + describeClit(player) + " out, and the steaming fluids splashing on it make it tingle almost painfully. Your whimpers and moans of pain start to take on a different tone, and the master imp starts to fuck you faster.");
            // (High corruption)
            else CView.text("Pain and pleasure blend into one as the huge " + nounCock(CockType.HORSE) + " stretches you, rubbing pre-cum into steaming pussy. You moan as the big imp fucks you, turning you into a mindless fuck-puppet. Your " + describeClit(player) + " swells painfully as hot juices splash over it. Your " + describeNipple(player, player.body.chest.get(0)) + " tingle almost painfully as the heat of his pre-cum spreads through your body.");
            CView.text("\n\n");
            CView.text("The other imps continue to jerk-off over you as the big imp impales you again and again on his shaft. Their pre-cum starts to splatter down on your body, and they pant as they watch you build towards your orgasm.  ");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 3) CView.text("Your " + describeAllBreasts(player) + " bounce and jiggle back and forth as the master imp roughly fucks you.  ");
            // (If the character has a dick)
            if (player.body.cocks.length > 0) CView.text("Your " + describeCocksLight(player) + " swell painfully as the rough fucking pumps blood into your groin.  ");
            CView.text("The big imp's snake tongue lashes out to incredible length and wraps around one of your " + describeNipple(player, player.body.chest.get(0)) + "s, pulling at it and stretching the flesh under it. He moves his tongue back and forth between your nipples, alternating between stretching and flicking them. ");
            // (If the character has a dick)
            if (player.body.cocks.length > 0) CView.text("He draws his tongue back and wraps it around your " + describeCock(player, player.body.cocks.get(0)) + ", sliding its length along your shaft and flicking his tongue over your cock-head.");
            // (If the character doesn't have a dick)
            else CView.text("His tongue flicks down to your " + describeClit(player) + ", the split ends of it teasing your clit.");
            CView.text("  You gasp in time to the big imp's thrusts, whimpering when his cock or tongue hit a sensitive point.  ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You're being raped by a demon, forced to take an inhuman cock, and you're about to cum hard. This corrupted land has left its mark on you.");
            // (High corruption)
            else CView.text("This corrupted land has left its mark on you. You could never have taken a cock this big before you arrived here.");
            CView.text("  You moan as you rise towards your orgasm.\n\n");

            CView.text("The master imp pounds at you as hard as he can, driving his " + describeCockShort(monster.body.cocks.get(1)) + " deeper into you. His grunts come closer and closer together. Your head still held up, you watch as the imps around you start to cum. They spray your body with thick globs of cum, splattering it across your belly");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 3) CView.text(" and " + describeAllBreasts(player));
            CView.text(". The master imp pounds into you and you can see his " + describeBalls(true, true, monster) + " swell. Through the haze of your approaching orgasm you realize what's about to happen. Those oversized balls are about to pump more cum into you than any normal man could ever produce. They're going to pump demonic cum right into your womb.  ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You scream as the base of his " + nounCock(CockType.HORSE) + " bloats with corrupted jism, the thick bulge stretching your pussy even more as it pumps along the imp's shaft. The bulge swells your belly and you watch as it moves towards your womb. Another thick bulge forms at the base of the master imp's cock and you thrash wildly, yelling in protest. \"<i>NOO - O - O - OOOOHhh!</i>\" The hot cum floods into your womb and you hit your own orgasm, shaking as your " + describeVagina(player, player.body.vaginas.get(0)) + " clamps down on his cock and milks it of waves of cum. Another orgasm hits on the heels of the first one, and you buck as more demon-cum floods your womb. Gasping for air, you continue to come as your belly swells. Even as he pumps more corrupt cum into you the big imp keeps raping you, forcing you to another peak before you've come down from the last one.");
            // (High corruption)
            else CView.text("The thought of all that demon-jism in your womb pushes you over the edge. You cum hard, bucking your hips against the " + nounCock(CockType.HORSE) + " pumping hot cum into your belly. Your eyes roll back in your head and you scream out your ecstasy as thick jets of cum fill your pussy. The imp keeps thrusting into his fuck-toy even as he fills your womb with his cum, forcing you to another peak before you've come down from the last one. The big imp is your master now.");
            CView.text("  You nearly black out as the orgasm blasts through you,  arching your back off the ground as the orgasm wracks your body, eyes rolling back in your head as your womb swells.\n\n");

            CView.text("Imp-jism rains down on your helpless spasming body. The imps spew cum into your hair, across your swollen belly, over your face");
            // (If the character has a cock)
            if (player.body.cocks.length > 0) CView.text(", and cum-dripping " + describeCock(player, player.body.cocks.get(0)));
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 3) CView.text(", and bouncing " + describeAllBreasts(player));
            CView.text(". The " + monster.desc.name + " is no longer holding you down. They masturbate over you as you claw at the ground with your hands, toes curling as you clamp your thighs tight around the big imp. Another pulse of demonic cum hits your womb. You wrap your legs around your master, forcing as much of his cock into you as possible. Arching your back, your eyes roll back in your head and you shriek as your womb stretches painfully, a final orgasm crashing through your cum-bloated body. You spasm around the cock that impales you, thrashing against the ground as ");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 3 && player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier > 1) CView.text("milk spurts from your " + describeNipple(player, player.body.chest.get(0)) + " and ");
            CView.text("steaming fluids spew from your over-filled pussy. Unconsciousness follows close on the heels of this last orgasm, your mind shutting down even as your body still shudders.\n\n");
            CView.text("You wake up later, body still twitching as tiny orgasms spark in your " + describeVagina(player, player.body.vaginas.get(0)) + ". It's still dark out. You lie in a pool of cooling cum and pussy juice. Your body is covered in long ropes of drying imp-cum, and your hair is plastered to the ground. There's no sign of the horde of imps or their big master. Your belly is as tight and distended as a woman on the verge of giving birth. It quivers as the flesh of your " + describeVagina(player, player.body.vaginas.get(0)) + " spasms. Over the swollen curve of your belly you can see steam rising from between your legs. You start to slip back into unconsciousness. ");
            // (Low corruption)
            if (player.stats.cor < 50) CView.text("Your last coherent thought is to find a way to better hide your camp, so this never happens again.");
            // (High corruption)
            else CView.text("Your last coherent thought is to find a way to make your own mutated master imp, one you can keep as a fuck-toy...");
            player.orgasm();
            player.stats.lib += 2;
            player.stats.cor += 3;

            attemptKnockUp(player, PregnancyType.IMP, IncubationTime.IMP - 14, ImpPregEvent); // Bigger imp means faster pregnancy
        }
        else {
            // Imp Scene 2 (Bipedal, vaginal)
            // Tag-team
            // Include milking alt text in separate blocks.
            // Work cock and multicock alt text directly into main text blocks.
            if (player.effects.has(StatusEffectType.ImpGangBang)) {
                // (Subsequent encounters - Low Corruption)
                if (player.stats.cor < 50) CView.text("You can't tell if this is the same " + monster.desc.name + " as last time or not - all imps look alike to you.  The " + monster.desc.capitalA + " surges forward, grabbing at your " + describeLegs(player) + " and arms and running their hands over your body. You struggle, but there are just too many to fight. The result is the same as last time...\n\n");
                // (Subsequent encounters - High Corruption)
                else CView.text("It's about time they showed up. It's not like there's a lot to do in these rocks, and you were getting bored. You grab an imp dick in either hand and spread your legs as other imps grope your thighs...\n\n");
            }
            CView.text("The " + monster.desc.capitalA + " swarms over you, dragging you to the ground as ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("you punch and kick wildly, determined not to let them take you");
            // (High Corruption)
            else CView.text("you twist and struggle in their grips, determined to make them work for their fun");
            CView.text("! They pull you down over a fallen log, ass resting above your head. Two imps sit on your arms, their gonads rubbing against your biceps, and rub their hands over your shoulders and chest. Others stretch your ");
            if (player.body.legs.isNaga()) CView.text("coils out, twisting them around a log to hold you still.\n\n");
            else CView.text(describeLegs(player) + " wide apart, holding them against the log.\n\n");

            CView.text("The " + monster.desc.name + " makes short work of your " + player.inventory.armor.displayName + ", unbuckling straps and stripping you quickly. ");
            // (If the player has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0) CView.text("An imp mounts your chest and slaps his " + describeCockShort(monster.body.cocks.get(0)) + " between your " + describeAllBreasts(player) + ", squeezing them tight over his cock as he rubs back and forth.  ");
            // (If the player has a SINGLE cock)
            if (player.body.cocks.length === 1) CView.text("Your " + describeCock(player, player.body.cocks.get(0)) + " is seized by an imp, who licks the tip with his inhumanly nimble tongue while he strokes the shaft.  ");
            // (If the player has a MULTI cock)
            if (player.body.cocks.length > 1) CView.text("Two imps seize your " + describeCocksLight(player) + ", licking the tips with their inhumanly nimble tongues while they stroke the shafts.  ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You fight to free your arms and shake the imp off your chest while tiny hands slide over your face. They tug at your lips and try to pry your jaws open");
            // High Corruption)
            else CView.text("You writhe in the grasp of the imps, reveling in the sensations of being spread open and completely at the mercy of these demons. Tiny hands slide over your face and you lick and suck at the fingers");
            CView.text(".\n\n");

            // (If the player has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0) {
                CView.text("Hands slide over your " + describeAllBreasts(player) + ", pinching and pulling at your nipples. The imp riding your " + describeBiggestBreastRow(player) + " licks your tit-flesh, slowly working his tongue up towards your " + describeNipple(player, player.body.chest.get(0)) + ". Finally the imp's tongue reaches your nipple, wrapping around and pulling at the tingling flesh. ");
                // (Low Corruption)
                if (player.stats.cor < 50) CView.text("You can't escape the tongue lapping and pulling at your " + describeNipple(player, player.body.chest.get(0)) + ". You shake your head to deny the pleasure, but your breathing comes faster and faster as lust invades your body.");
                // (High Corruption)
                else CView.text("The tongue squeezing and tugging your nipple floods your body with lust. You moan and arch your back, offering your tits to the imp riding your chest. You can hear your pulse pounding in your ears as you pant in desire.");
                CView.text("  Suddenly you feel tiny needle-sharp teeth pierce your nipple. You scream as venom pumps into your tits, red-hot poison that makes your " + describeAllBreasts(player) + " feel as though they were being stung by bees. You moan in pain as your breasts start to swell, the imp rider biting into your other nipple to pump demon-taint into it.");
                if (player.body.chest.find(BreastRow.FuckableNipples)) CView.text("With the imp's taint seeping into your " + describeNipple(player, player.body.chest.get(0)) + ", each one's cunt-like shape begins swelling. The fuckable orifices engorge into larger and fatter looking labia, becoming fuller cunts each with an engorged clitoral nub the size of a golf ball. Their color deepens as the skin of your nipple-cunts becomes tighter and smoother.  The imp giggles and continues nibbling the newly swollen sensitive flesh, injecting further doses of venom.");
                CView.text("\n\n");
                // Grow tits!
                growSmallestBreastRow(player, 2, player.body.chest.length);
                boostLactation(player, .5);
            }
            CView.text("The master of this " + monster.desc.name + " steps up ");
            if (player.body.legs.isNaga()) CView.text("alongside your taut tail");
            else CView.text("between your " + describeLegs(player));
            CView.text(", leering down at your trapped body. Four feet tall and broader and stronger than any imp in the pack, with a face as much dog as imp, this new imp has grey fur, broad black demon wings, two long demon-horns on his head, and a " + nounCock(CockType.DOG) + " big enough to choke a minotaur. Pre-cum drips from the broad tip of it, dripping down onto your ");
            // (If the player has a cock)
            if (player.body.cocks.length > 0) CView.text(describeCocksLight(player));
            // (If the player doesn't have a cock)
            else CView.text(describeVagina(player, player.body.vaginas.get(0)));
            CView.text(".  ");
            CView.text("The heat stings your flesh. The imps licking your groin lap up the hot fluid, cooling you with their saliva. The big imp sneers as you whimper, and drags the head of his " + nounCock(CockType.DOG) + " down to your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(".  He thrusts brutally, shoving the head of his " + describeCockShort(monster.body.cocks.get(2)) + " into your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)" +
            else CView.text(describeButthole(player.body.butt));
            CView.text(". ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You screech in agony as the big imp forces his mutated wolf-cock into your hole, brutally shoving thick inch after inch of painfully hot " + nounCock(CockType.DOG) + " deeper into you than anything should ever go.  ");
            // (High Corruption)
            else CView.text("The master imp's painfully hot " + nounCock(CockType.DOG) + " stretches your hole wider than it ever should be, and you moan in perverse ecstasy.  ");
            CView.text("His huge dick-knot bumps against the entrance of your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(".\n\n");

            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0) CView.text("The big imp reaches past your tit-rider and grabs one of your painfully distended breasts in each hand, mauling and bouncing the flesh as if weighing them. You gasp in pain as your " + describeAllBreasts(player) + " swell further at his touch.  ");
            CView.text("Your mouth gapes open and an imp takes the chance to stuff it full of cock.  ");
            CView.text("The master imp grabs your hips and starts to fuck you hard, pistoning his steaming cock in and out of your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(". ");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 1) CView.text("The rough fucking shakes your breasts, and the imp sucking your nipples clings tightly to your monstrously swollen " + describeAllBreasts(player) + ". Your " + describeBiggestBreastRow(player) + " have grown three cup sizes since the imp pumped his venom into you.  ");
            CView.text("The imp fucking your face grabs your " + describeHair(player) + " and jaw, forcing your head back so he can ram his cock into your throat. The obscene bulge sliding in your throat matches the bulge in your belly. The smaller imp pulls back just enough to let you gasp for air, then thrusts into your throat again. The big imp pounds the knot of his " + nounCock(CockType.DOG) + " against your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(", not caring that he's stretching you beyond normal human endurance. ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You're being raped again by demons, impaled on cocks like a roast pig on a spit, and you can feel your lust rising.  This corrupted land has left its mark on you.");
            // (High corruption)
            else CView.text("This corrupted land has left its mark on you. You could never have taken a cock this big before you arrived here.");
            CView.text("\n\n");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0) CView.text("An ache starts deep in the base of your tits and works its way to your sore " + describeNipple(player, player.body.chest.get(0)) + ". Your already bloated nipples swell as your rider suckles and you gasp as the first rush of milk spills into his mouth. Your rider milks your udders, moving his hands between your " + describeAllBreasts(player) + " and forcing out more milk than he could ever drink. Other imps lick the milk from the shiny skin of your swollen breasts.\n\n");

            CView.text("The smaller imp slams his cock as deep into your throat as it will go, slapping his " + describeBalls(true, true, monster) + " against your face. He cums, balls twitching as they pump spunk down your throat. You can feel your stomach stretching, but you're more worried about breathing. The imp cums for an impossibly long time, streams of jism pouring into you. The edge of your vision starts to go red and your chest heaves as you fight for air. Finally the imp draws his cock out of your throat, spraying his last gobs of cum over your face as you gasp in huge lungfuls of air. The sudden rush of oxygen pushes you over the edge and you cum hard. Your body arches and your eyes roll back in your head as you twist around the demonic " + nounCock(CockType.DOG) + " pounding into you. You shriek as your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(" spasms on the steaming pole that impales it. Another imp shoves his cock in your mouth as you scream, throat convulsing around his cock-head.");
            // (If the player has a cock)
            if (player.body.cocks.length > 0) CView.text("  Your " + describeCocksLight(player) + " shoots cum across your belly and into the waiting mouths of the imps licking your crotch.");
            CView.text("\n\n");
            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0) {
                CView.text("Imps lick milk from your bloated " + describeBiggestBreastRow(player) + " as your rider milks you.  As one imp drinks his fill, staggering away with a sloshing belly, another steps up to guzzle from your milk-spewing udders.\n\n");
                // Additional nipplefucking scene by Xodin
                if (player.body.chest.find(BreastRow.FuckableNipples)) {
                    CView.text("The imp rider grabs the fat folds of one of your nipplecunt's 'labia' and grins mischeviously. He rubs his obscene erection all over the milk stained surface of your nipple-cunt's clit and begins to press the head of his bulbous imp cock into the swollen orifice against the flow of milk. You know no woman in your village could have handled an aroused cock this big, and yet now this imp on your " + describeAllBreasts(player) + " is about to ram just such an erection into one of your " + describeNipple(player, player.body.chest.get(0)) + "s. He tugs and pulls and pulls again on your nipple-cunt's sensitive labia, forcing his cock to push into the flesh of your " + describeBiggestBreastRow(player) + ". Your taut flesh burns with his venom already, and is now violated by the presence of his demonic flesh rod.  ");
                    // [START BREAST SIZE SPECIFIC TEXT]
                    // [IF breastSize <= DD]
                    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating <= 5) CView.text("You feel the bulbous head of his cock squeeze further and deeper until it pushes up against your ribs.");
                    // [ELSE IF breastSize > DD]
                    else CView.text("You feel the unnaturally large erection spear the fat filled depths of your " + describeBiggestBreastRow(player) + " until at last the imp has shoved himself in to his hilt. He smiles at the sensation of having his manhood completely engulfed in your " + describeBiggestBreastRow(player) + ".");
                    // [END BREAST SIZE SPECIFIC TEXT]
                    CView.text("  Back and forth he begins fucking your tit as if it were a regular pussy, and it occurs to you that such a description isn't far from the truth. You gasp in pleasure as a strange kind of minor orgasm ripples through your tit and the taut skin of your mammary feels tighter as the " + describeBiggestBreastRow(player) + " momentarily spasms around the imp's manhood. The horny little demon slaps your nipplecunt's clit in gleeful victory and jumps to the next breast to repeat his lewd fucking on a fresh hole.");
                    CView.text("\n\n");
                }

            }
            CView.text("The imp-cock in your throat spasms and its owner rams as deep into you as he can get. He floods your already swollen stomach with inhuman amounts of cum. Again you feel yourself about to black out as the demon pumps jism into you. He pulls out and again you orgasm as you wheeze for air. Another imp forces his cock down your throat as you moan and gasp. Your body shakes in pleasure on the big imp's " + nounCock(CockType.DOG) + ".  Tightening his grip on your " + describeHips(player) + " the master imp howls and slams his shaft into your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(". His unnaturally huge knot stretches the entrance of your hole, and he hammers into you again. ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("You howl around the imp-cock stretching your throat. The bloated knot opens your hole far beyond anything you've endured before. Your violent thrashing throws the imps off your " + describeLegs(player) + " and you kick uselessly, thrashing and bucking as the swollen " + nounCock(CockType.DOG) + " plunges deeper into you.");
            // (High corruption)
            else CView.text("The master imp's bloated knot stretches your entrance and plunges into your hole with a loud <i>pop</i>. Another orgasm hits you as the " + nounCock(CockType.DOG) + " rams even deeper into you. You howl around the imp-cock stretching your throat, thrashing and bucking as your orgasm shakes you. Your violent thrashing throws the imps off your legs and you wrap your legs around the big imp, pulling him further into your hole.");
            CView.text(" The big imp howls again as he cums, each wave of steaming demon-cum stretching his knot and shaft even more. His cum-pumping " + nounCock(CockType.DOG) + " is bottomed out deep in your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text("womb");
            // (If the player doesn't have a vagina)
            else CView.text("guts");
            CView.text(" and he pumps more jism into you than his balls could possibly hold. Your belly stretches with every blast of cum and you shriek around yet another cock in your throat.\n\n");

            // (If the character has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0) CView.text("The imp riding your " + describeBiggestBreastRow(player) + " finally cums, painting your distended fuck-udders with his massive load.  ");
            CView.text("Your master isn't done with you yet, churning his " + nounCock(CockType.DOG) + " knot in your ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(" as he continues to cum. You're pumped full of demon-cum from both ends as one imp shoots his load in your throat and another steps up to take his place. You shake and tremble in your own endless orgasm as the pleasure in your stretched hole blends with the pain of your swollen belly. Your " + describeLegs(player) + " thrash as the master imp shifts his massive knot within your monstrously stretched ");
            // (If the player has a vagina)
            if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
            // (If the player doesn't have a vagina)
            else CView.text(describeButthole(player.body.butt));
            CView.text(". Your toes curl as you feel more pulses of demon-cum work their way up his shaft and into your already-huge belly.\n\n");

            CView.text("You pass out as another load of imp-cum pours down your throat, another tidal wave of corrupted jism spews into your hole, to meet somewhere in the middle...\n\n");
            CView.text("You wake up later, still trembling with small orgasms. Cum burbles in your mouth as you breathe. You haven't moved since you passed out. Your hips are still propped up over the log, and you rest in a cooling pool of cum, your " + describeHair(player) + " plastered to the ground with drying jism. You couldn't move even if your " + describeLegs(player) + " felt stronger. Your hideously bloated belly weighs you down, ");
            // (If the player has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0) CView.text("and your milk-filled udders are still swollen with imp-venom, ");
            CView.text("quivering with every orgasmic twitch that passes through you. The skin of your distended belly ");
            // (If the player has breasts)
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 3) CView.text("and massive tits ");
            CView.text("is drum-tight and shiny, and your belly-button has popped out into an outie. As you slip back into unconsciousness, one last thought flits across your mind. ");
            // (Low Corruption)
            if (player.stats.cor < 50) CView.text("How long can you last in this corrupted land, when your body can be so horribly twisted for the sick pleasures of its denizens?\n\n");
            // (High corruption)
            else CView.text("Why bother with your silly quest, when you've only scratched the surface of the pleasures this land offers you?\n\n");
            player.orgasm();
            player.stats.lib += 2;
            player.stats.cor += 3;

            attemptKnockUp(player, PregnancyType.IMP, IncubationTime.IMP - 14, ImpPregEvent); // Bigger imp means faster pregnancy
            // Stretch!
            if (player.body.vaginas.length > 0) {
                if (displayStretchVagina(player, monster.body.cocks.get(2).area, true)) CView.text("\n");
            }
            else {
                if (displayStretchButt(player, monster.body.cocks.get(2).area, true)) CView.text("\n");
            }
        }
    }
    return { next: playerMenu };
}

export function impRapesYou(player: Character, imp: Character): NextScreenChoices {

    if ((player.perks.has(PerkType.BimboBrains) || player.perks.has(PerkType.FutaFaculties)) && !player.body.legs.isTaur() && player.body.vaginas.length > 0) {
        CView.image("imp-loss-female-fuck");
        CView.text("You sink to the ground, assuming a position that feels all too natural to you now, leaning forward to let your " + describeAllBreasts(player) + " hang down slightly. The imp looks you up and down, wickedly eyeing your ready, slightly open lips. He drops his loin-cloth to reveal a hardening cock. Your eyes bulge as it grows larger... and larger... and larger! The imp's cock finally bulges to a full twelve inches... and it's moving closer. You struggle to think... but you just can't! You want that in your mouth, like, so bad!\n\n");
        CView.text("Your " + describeVagina(player, player.body.vaginas.get(0)) + " drips in anticipation, and you find yourself involuntarily moving your knees farther apart to prepare yourself to be filled. He smiles and presses his cock against your " + describeVagina(player, player.body.vaginas.get(0)) + ", pushing you back to get a better angle. You try to make words, but your brain can only think of so much at once! Right now, it's thinking of cock, which, naturally, makes you open your mouth and let out a slutty moan.\n\n");

        CView.text("The imp pushes into you violently, ramming his cock in to the hilt, leaving you gasping in pain and surprise. He leaves it in your slutty pussy, giving you a second to... oh who is he kidding... he can tell by your air-headed look that you've done nothing but take cocks your whole life. He fucks you hard, slapping your " + describeButt(player) + " to remind you who is in charge. You can't help but think about, like, how you just love it when a man takes charge. Less thinking!");
        displayStretchVagina(player, 12, true, true, false);
        CView.text("\n\n");

        CView.text("The rough fucking becomes more and more pleasurable as time goes on. You moan air-headedly with each thrust, hips squeezing around the demon-cock- loving the feeling of his fullness. Before long you can't help but cum all over him, your vagina locking around his cock like a vice, muscles rippling, milking him for his cum. The imp's prick explodes inside you, pumping huge loads of hot demon-seed inside you with each eruption. You swoon, feeling it fill your womb and distend your belly as the imp's orgasm fills you with insane amounts of cum.\n\n");

        CView.text("With a sigh, he pulls his dick free, and you flop down, cum leaking out onto the ground from your well-fucked hole. If you could, like, focus at all, you'd totally be worrying about being, like, pregnant or whatever. But you lose consciousness.");
        attemptKnockUp(player, PregnancyType.IMP, IncubationTime.IMP - 14, ImpPregEvent); // Bigger imp means faster pregnancy

        player.orgasm();
        player.stats.lib += 1;
        player.stats.sens += 1;
        player.stats.cor += 1;

        return { next: passTime(1) };
    }
    // Lust loss
    if (player.stats.lust >= 100) {
        // 50% chance of sprocket rape for super-thick people.
        if (player.body.cocks.length >= 1 && randInt(2) === 0) {
            if (player.body.cocks.get(0)!.thickness >= 4) {
                return sprocketImp(player);
            }
        }
        // Female or Futa
        if (player.gender === 2 || player.gender === 3) {
            player.slimeFeed();
            CView.image("imp-loss-female-fuck");
            CView.text("You sink to the ground, too overcome by lust and desire to fight.  The imp smiles, a wicked look glinting in his eyes.  He drops his loincloth to reveal a hardening cock.  Your eyes bulge a bit as it grows...and grows...and grows!  That imp has a twelve inch cock..and he's walking towards you.   Your " + describeVagina(player, player.body.vaginas.get(0)) + " practically juices itself in anticipation, and you find yourself spreading your " + describeLegs(player) + " in preparation.");
            CView.text("\n\nHe smiles and presses his cock against your " + describeVagina(player, player.body.vaginas.get(0)) + ".  Your lust-driven mind is speechless, leaving you panting and moaning like a whore.");
            // If too big, only partly penetrate.
            if (player.vaginalCapacity() < imp.body.cocks.get(0)!.area) {
                if (player.body.vaginas.get(0)!.virgin) {
                    CView.text("  He plunges in hard, breaking your hymen and stealing your virginity.  A look of surprise crosses his face, chased away by ecstasy.  If you had a rational bit left in your mind, you'd notice he looks... stronger somehow, but you're too horny to care.");
                    player.body.vaginas.get(0)!.virgin = false;
                }
                else {
                    CView.text("  He pushes against your tight little pussy, struggling to penetrate you.");
                }
                CView.text("  His cock only sinks a few inches in, but he begins fucking you hard, each time claiming a bit more of your pussy for his demonic tool.  You feel a painful stretching as he gets half of it inside you, ruining your " + describeVagina(player, player.body.vaginas.get(0)) + " for most humans.  He fucks you like this for what seems like forever, never getting much further. ");
                displayStretchVagina(player, imp.body.cocks.get(0)!.area, true);
            }
            else {
                CView.text("  He plunges in violently, ramming his " + describeCockShort(imp.body.cocks.get(0)) + " in to the hilt, leaving you gasping in pain and surprise.  He leaves it there, giving you a second to get used to him, and then begins fucking you hard, slapping your ass every few thrusts to remind you who is in charge.");
                displayStretchVagina(player, 12, true, true, false);
            }
            if (player.gender === 3) CView.text("\n\nThe rough fucking becomes more and more pleasurable as time passes, until you cannot help but stroke your " + describeCock(player, player.body.cocks.get(0)) + " along with each plunge he takes in your " + describeVagina(player, player.body.vaginas.get(0)) + ".  You feel yourself clench around him as your sexual organs release, erupting spurts of cum and milking the demon's cock like your life depended on it.");
            if (player.gender === 2) CView.text("\n\nThe rough fucking becomes more and more pleasurable as time passes.  You moan loudly and lewdly with each thrust, hips squeezing around the demon-cock, relishing the feeling of fullness.  Before long you cannot help but cum all over him, " + describeVagina(player, player.body.vaginas.get(0)) + " locking around his cock like a vice, muscles rippling, milking him for his cum.");
            CView.text("  The imp's " + describeCockShort(imp.body.cocks.get(0)) + " explodes inside you, pumping huge loads of hot demon-seed inside you with each eruption.  You swoon, feeling it fill your womb and distend your belly as the imp's orgasm fills you with an unnatural quantity of corrupted semen.\n\nWith a sigh, he pulls his dick free, and you flop back on your back, cum surging out onto the ground from your well-fucked hole.  ");
            if (player.body.wombs.find(Womb.Pregnant)) {
                CView.text("You wonder what this will do to whatever is growing in your womb...  ");
            }
            else {
                if (player.effects.has(StatusEffectType.Heat)) CView.text("You find yourself hoping you're pregnant as you swiftly lose consciousness.");
                else if (player.body.wombs.find(Womb.NotPregnant)) {
                    if (player.stats.cor > 75) CView.text("With an appreciative moan, you bury your fingers in its slimy warmth, hoping you are pregnant with some fiendish offspring, and lose consciousness.");
                    else CView.text("You hope you don't become pregnant, but promptly lose consciousness before you can contemplate the prospect any further.");
                }
            }
            attemptKnockUp(player, PregnancyType.IMP, IncubationTime.IMP - 14, ImpPregEvent); // Bigger imp means faster pregnancy
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 1;
            player.stats.cor += 1;

            player.orgasm();
        }
        // Male or genderless
        if (player.gender === 0 || player.gender === 1) {
            // Alternate male-only case
            if (player.gender === 1 && randInt(2) === 0) {
                CView.image("imp-loss-male-fuck");
                CView.clear().text("Your eyes glaze over with lust as the imp's dark magic destroys your will to continue fighting. You sink to your ");
                if (player.body.legs.type === LegType.CENTAUR) CView.text("hocks and knees, your " + describeCock(player, player.body.cocks.get(0)) + " hurting from the massive blood pressure caused by your unbridled lust. He approaches you and stops about two feet in front of you, watching with delight your helpless state");
                else CView.text("knees, pull out your " + describeCock(player, player.body.cocks.get(0)) + " and begin mindlessly stroking yourself as the imp approaches you, a wicked grin on his face. Your mind races with thoughts and images of sucking the imp's cock. He approaches you and stops about two feet in front of you, watching with delight as you succumb to your own lust");
                CView.text(". Your eyes glance down to his waist and see a massive bulge form under his loincloth, the sight of which causes your " + describeCock(player, player.body.cocks.get(0)) + " to twitch and begin leaking pre-cum.\n\n");
                CView.text("The imp drops his loincloth, revealing his huge 12-inch penis, and then forcefully grabs your head and pulls you down on to his hard throbbing demon dick. He shoves his cock past your lips and deep down your throat in one slow, forceful push. You can barely accommodate his huge cock, and yet your lust makes you hunger for more. You cough and gag while the imp proceeds to fuck your mouth hard, slapping his hot balls against your chin, disregarding your need to breathe.  ");
                if (player.body.legs.type === LegType.CENTAUR) CView.text("Dropping down to the ground, your " + describeCock(player, player.body.cocks.get(0)) + " trembles against your body to the rhythm of the imp's thrusts, leaving your underbelly smeared with its own pre-cum.\n\n");
                else CView.text("On all fours now, your " + describeCock(player, player.body.cocks.get(0)) + " bounces up and down against you to the rhythm of the imp's thrusts, leaving your belly smeared in your own pre-cum.\n\n");
                if (player.body.balls.size >= 5) CView.text("Your huge " + describeBalls(true, true, player) + " swing heavily against you as well, responding to the force of the imp's thrusts, slapping your own ass and driving your " + describeCock(player, player.body.cocks.get(0)) + " even stiffer with lust, the pre-cum pulsing out of your cock in time with the slapping.\n\n");
                CView.text("You begin to feel light-headed from lack of air just as the imp grips your head firmly and begins making rapid, shallow thrusts down your throat, nearing his orgasm. Suddenly he clenches tight, his claws digging into your head and thrusts down your throat as far as he can, holding his massive cock deep in your stomach. Your eyes go wide as you feel the imp's balls on your chin spasm violently.  His cock pulses in your mouth as the thick demon cum is pumped violently down your throat. It feels like an eternity as the imp continues to fill your guts with his hot cum, his orgasm lasting far longer than any human's. He slowly withdraws his still-pumping cock from you, coating your throat and then mouth with an almost continual spray of his unnaturally hot and sticky demon seed. The imp pulls out of your mouth just in time to splatter your face with his cum before his orgasm stops, coating your lips, nose, eyes, and hair with his incredibly thick and sticky cum.\n\n");
                CView.text("You fall to the ground gasping, exhausted and unable to move, the demon cum on your face and inside you still burning with intense heat and corruption. You lose consciousness, your " + describeCock(player, player.body.cocks.get(0)) + " still firmly erect, your lust not sated.");
                player.stats.lust += 20;
                player.stats.cor += 2;

                player.slimeFeed();
                return { next: passTime(1) };
            }
            else {
                player.slimeFeed();
                CView.text("You sink to the ground, too overcome by lust and desire to fight.  The imp smiles and circles you, dropping his loincloth as he goes.  You are roughly shoved to the ground, your backside slapped hard.  You're too horny to do anything but moan from the pain ");
                if (player.body.legs.type !== LegType.CENTAUR) CView.text("as you are disrobed");
                CView.text(".  As the imp presses a large bulk against your backside, you realize he has a massive penis!\n\nThe imp pushes his " + describeCockShort(imp.body.cocks.get(0)) + " into your ass and fucks you hard, with little regard to your pleasure.  After a rough fucking, he cums, stuffing your ass full of hot demon cum.  His orgasm lasts far longer than any human's, leaving your belly slightly distended.");
                displayStretchButt(player, imp.body.cocks.get(0)!.area, true, true, false);
                player.stats.lib += 1;
                player.stats.sens += 1;
                player.stats.lust += 1;
                player.stats.cor += 1;

                if (player.stats.sens > 40) {
                    CView.text("  You manage to orgasm from the feeling of being filled by hot cum.");
                    if (player.gender === 1) CView.text("  You jizz all over the ground in front of you, spraying cum in huge squirts in time with the demon's thrusts.");

                    player.orgasm();
                    player.stats.cor += 1;

                }
                CView.text("\n\nYou drop to the ground when he's done with you, cum spilling from your abused ass all over the ground, too exhausted to move.  Consciousness fades.  ");
            }
        }
    }
    // HP or insta-loss
    else {
        CView.text("\n<b>You fall, defeated by the imp!</b>\nThe last thing you see before losing consciousness is the creature undoing its crude loincloth to reveal a rather disproportionately-sized member.");
    }
    return { next: passTime(1) };
}

// noogai McNipple-holes
function noogaisNippleRape(player: Character): NextScreenChoices {

    CView.text("You slowly walk over to the masturbating imp, your " + describeHips(player) + " and " + describeButt(player) + " swaying suggestively with every step.\n\n");

    CView.text("Shedding your clothes you push the imp to the ground and straddle him, keeping his hands away from his twitching pecker while you quickly tie him up with his own loincloth.  The lust-addled demon utterly incapacitated, you start to use both of your hands to toy freely with your slimy nipple-holes, as well as your ");
    if (player.body.cocks.length > 0) CView.text(describeCock(player, player.body.cocks.get(0)));
    if (player.body.cocks.length > 0 && player.body.vaginas.length > 0) CView.text(" and ");
    if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
    else if (player.gender === 0) CView.text(describeButthole(player.body.butt));
    CView.text(".\n\n");

    CView.text("You gently insert a single digit into one of your nipple-cunts, ");
    if (player.lactationQ() >= 1000) CView.text("unleashing a torrent of thick, creamy milk and ");
    // (if regular milky;
    else if (player.lactationQ() >= 50 && player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1) CView.text("releasing a steady trickle of warm milk and ");
    CView.text("lust-induced sex juice onto the imp's lap; your other hand instinctively moves down to stroke your ");
    // ((if male/herm;
    if (player.body.cocks.length > 0) {
        CView.text("rock-hard cock");
        if (player.body.vaginas.length > 0) CView.text(" and ");
    }
    if (player.body.vaginas.length > 0) CView.text("dripping wet pussy");
    if (player.gender === 0) CView.text(describeButthole(player.body.butt));
    CView.text(", teasing him with a lewd moan as your head rolls back in sexual ecstasy.");
    if (Settings.silly()) CView.text("  The imp is sickened, but curious.");
    CView.text("\n\n");

    CView.text("You continue finger-fucking your nipple, becoming more and more aroused as the imp gets harder and harder from watching the exotic display before him.  You soon tire of watching the imp squirm beneath you, desperate for sexual relief; you slowly move your hand away from your groin, reaching down towards his crotch, and start to toy with his apple-sized balls, fondling and squeezing them roughly.  You casually slip a second finger into your wet nipple-hole, stretch it out teasingly, and hold the gaping orifice in front of the imp's face, giving him a good view of the inside of your freakish, wet nipple-cunt.\n\n");

    // (If corrupt:
    if (player.stats.cor >= 66) {
        CView.text("\"<i>Mmm, wouldn't you just love to stick your fat cock into this sopping wet hole, and cum deep inside my " + describeChest(player) + "?</i>\"  You whisper huskily into his ear, sliding your fingers away from his balls and up along the underside of his aching dick, teasing every inch of it until you reach his swollen head and start rubbing your finger around his glans in small circles.  The imp is panting heavily, his eyes firmly locked on your ");
        // (if normal)
        if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier < 1) CView.text("wet");
        // (if lactating)
        else CView.text("milky");
        CView.text(", bucking his hips upwards in desperation.\n\n");
    }
    CView.text("Deciding that the poor bastard has suffered enough, you guide your stretched " + describeNipple(player, player.body.chest.get(0)) + " down to his quivering member and hold it over the tip for a moment.  The imp groans in frustration, feeling the heat of your slutty juices dripping down onto his aching rod and overfull testes, making him even more desperate to drive deep into your waiting breast.  Without warning, you forcefully shove your breast onto his swollen fuckstick, ");
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating <= 4) CView.text("bottoming out halfway on his immense dick.");
    else CView.text("only stopping when the flesh of your immense mammary bumps into his quaking ballsack.");
    CView.text("\n\n");

    CView.text("You shudder in ecstasy as you rise off of his drenched girth; your nipple-hole is slick with arousal, making it easier for you to slide back down until ");
    // ((if breast size below D)
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating <= 4) CView.text("you feel his swollen cock bottom out, your petite breast unable to swallow any more of his throbbing maleness");
    // ((over D)
    else CView.text("his swollen cock and desperately filled balls are entirely engulfed in tit-flesh");
    CView.text(".  Eventually the imp starts timing his thrusts with your movements, and soon the two of you are working in a steady rhythm - thrust, retract, thrust, retract.  Minutes go by as the rhythm slowly builds towards a crescendo, with the only sounds being the lewd schlicking noise of your breast servicing the imp's rod, and the odd moan escaping your lips.  While one hand is furiously jilling off your vacant nipple-slit, the other one is furiously");
    // [(if male)
    if (player.body.cocks.length > 0) CView.text(" pumping your " + describeCock(player, player.body.cocks.get(0)));
    // (if female)
    else if (player.body.vaginas.length > 0) CView.text(" fingering your hungry baby tunnel");
    else CView.text(" fingering your tingling anus");
    CView.text(".\n\n");

    CView.text("Eventually the rhythm becomes more sporadic as you and the imp approach climax; your tongue rolls out of your open mouth and your toes curl as you feel the imp spasm violently inside you, letting an endless stream of his searing spunk pour directly into your " + describeChest(player) + ".  The intense heat pushes you over the edge and ");
    // (if dick)
    if (player.body.cocks.length > 0) {
        CView.text("a ");
        // [(cum production < 500ml)
        if (player.cumQ() < 500) CView.text("jet ");
        // (cum production 500-1000ml)
        else if (player.cumQ() < 1000) CView.text("geyser ");
        // (cum production > 1000ml)
        else CView.text("volcano ");
        CView.text("of cum sprays from your " + describeCock(player, player.body.cocks.get(0)) + " and splatters over both you and the hapless imp");
        if (player.body.vaginas.length > 0) CView.text(", while ");
    }
    if (player.body.vaginas.length > 0) {
        CView.text("your pussy juices spurt out as your " + describeVagina(player, player.body.vaginas.get(0)) + " twitches in orgasm");
    }
    if (player.gender === 0) CView.text("your asshole clenches tight on your finger");
    CView.text(".\n\n");

    CView.text("You collapse heavily on top of the imp, once again impaling your breast on his still-erect cock.  You lie like this for a few moments until you notice that the imp has dozed off, exhausted by the whole ordeal.  You stand up woozily as a mixture of ");
    // (if lactating)
    if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1 && player.lactationQ() < 40) CView.text("milk, ");
    CView.text("fem-spunk and hot demon cum leaks out from your gaping nipple-cunt.\n\n");

    // (if corruption > 60)
    if (player.stats.cor > 60) CView.text("You thrust your digits into your " + describeNipple(player, player.body.chest.get(0)) + " once more, scooping out as much imp jizz as you can reach.  You happily drink up the thick goo, savoring the cloying taste before quickly getting dressed and leaving the imp to slumber.");
    // (continue to non-corrupt text)
    // (if not)
    else CView.text("You quickly get dressed and leave the imp to his slumbering, his hands still tied together by his loincloth.");
    // Gain xp and gems here
    player.orgasm();
    player.stats.sens += -3;
    player.stats.cor += 1;

    return { next: passTime(1) };
}

export function putBeeEggsInAnImpYouMonster(player: Character): NextScreenChoices {
    CView.clear();
    // IMP EGGS
    // (functions for bipedal bee morphs.  At time of writing, unsure as to whether bee abdomen worked for centaur/naga/goo forms)
    CView.image("imp-egg");
    CView.text("You glance down at the masturbating imp, feeling a twitch in your swollen, insectile abdomen.  As the red-skinned homunculus writhes on the ground, beating his meat, you smile, feeling a globule of sweet nectar oozing out of your ovipositor.");

    CView.text("\n\nHe’s too busy humping the air and stroking himself to notice you hooking the tip of one of your [feet] under him.  You kick up one of your [legs], flipping the fapping imp over.  He gasps as he lands face-down on the ground, startled enough to stop jerking his tool.");
    CView.text("\n\nYou grin, straddling his surprisingly perky ass, resting your [hips] on his small, round cheeks.  With your arms pinning down his shoulders, he can’t stroke himself, and he whimpers at the restraint.");

    CView.text("\n\n\"<i>Wait - what’s going on?</i>\" he gasps.");

    CView.text("\n\nYou deign not to answer him, lost in the unique sensation of your abdomen curling behind you.  You toss your head back, luxuriating in the pleasure of your black ovipositor emerging against smooth, glossy skin of the imp’s ass.");

    CView.text("\n\n\"<i>No, nooooooo...</i>\" whimpers the imp as you bite your lip, pushing the tip of your organ into his surprisingly pliant hole.");

    CView.text("\n\nYou and the imp shudder in tandem as your sweet honey smears between his cheeks, oozing down his crack as you squeeze your throbbing ovipositor further and further into him.  Buried deep in his bowels, you feel the first of your eggs push through your rubbery organ, stretching out your tube along with his asshole.");

    CView.text("\n\nAs you lay your first egg inside the imp, he gurgles, face-down against the ground, and you feel him tighten around your ovipositor.  The imp wriggles beneath your body and by the slowly-spreading pool of steaming cum; you guess that he just climaxed.");

    CView.text("\n\nThe imp pants, trying to catch his breath as you twitch your abdomen, adjusting your ovipositor inside him.  Before he can recover, you push another egg down your tube, implanting it deep in the imp alongside the first egg.");

    CView.text("\n\n\"<i>Suh-stop...</i>\" groans the imp even as you push a third egg into his tiny body.  But you’re beyond stopping.  Egg after egg, you fill his twitching body.  The pool of cum grows, and it oozes around your ");
    if (player.body.legs.isGoo()) CView.text("rippled goo edges");
    else if (player.body.legs.isNaga()) CView.text("trembling coils");
    else CView.text("straddling knees");
    CView.text(" as you turn the imp into your own, private incubator.");

    CView.text("\n\nAfter a handful of eggs, you grunt, realizing that you’ve run out of room inside the imp.  Tilting your head to one side, you consider that the imp is face-down, and that his stomach might need more room to stretch.  You rise halfway up and flip him over beneath you, careful to leave your ovipositor still buried inside him.");

    CView.text("\n\nThe imp’s eyes are almost completely rolled back in his head, his flat chest smothered with his own spunk.  His breathing is ragged, and his hard, massive cock is slathered with thick, white cum.  His belly already bulges slightly with your eggs and his small hands move to clutch at his stomach, giving him the look of a debased, pregnant mother.");

    CView.text("\n\nThat realization is enough to stimulate your ovipositor again.  With a groan, you plant your hands on the ground to either side of his head, on your knees as your ovipositor pumps another egg into the imp’s bowels.  The imp shudders as his belly swells, filling with your brood.");

    CView.text("\n\n\"<i>More... more!</i>\" moans the imp beneath you.  You oblige, and ");
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 1) {
        CView.text("his tiny claws grab your ");
        if (player.body.chest.length > 1) CView.text("first row of ");
        CView.text(describeBreastRow(player.body.chest.get(0)) + ", squeezing your tits as you fuck him full.");
        if (player.lactationQ() >= 500) CView.text("  Rivulets of your milk run down his forearms as he inexpertly milks you.");
    }
    // [If cock:
    else if (player.body.cocks.length > 0) CView.text("the rise of his swollen belly soon presses against [oneCock] and the rhythm of your thrusts strokes his shiny red stomach against your sensitive organ.");
    else if (player.body.vaginas.length > 0) CView.text("the imp’s tiny, clawed feet scrabble against you as he flails in pleasure.  By mistake, one slips between the lips of your pussy, small toes wriggling against your inner walls, and you instinctively push down against the small limb, fucking yourself with his foot.");
    else CView.text("you feel a firm pressure at your [asshole] as the tip of the imp’s lashing tail prods frantically against you, manically shoving in and out of your [asshole].");

    CView.text("\n\nYou groan, climaxing against the imp, just as he lets out another gout of hot seed from his cum-smeared dick.  He spatters your front, his spunk mingling with your fluids, shuddering as he takes the last of your eggs inside him, his belly swollen to the size of a beach ball.");

    CView.text("\n\nYou pant heavily, and with a messy squelching, you pull yourself out of the imp, pushing yourself up from your crouched position.  A gush of honey pours from the imp’s ass, cutting off quickly as an egg rolls into place from the inside, stopping up your imp-cubator.");

    CView.text("\n\nYou hear a strange noise from the imp, one that sounds strangely like a giggle.  You glance down at him, instinctively evaluating him as a bearer of your eggs.  The imp is still panting, looking up at you from under his messy, black hair.  With a flushed, submissive expression and swollen, pregnant belly, the imp seems almost... cute?  He cradles his massive, egg-filled belly, caressing it, then looks back to you, blushing.");

    CView.text("\n\nYou blink then stand up.  You shake your head as you walk away, chalking the odd thoughts up to your egg-laying instincts.  Some of these mutations have some weird effects, after all...");
    player.orgasm();
    player.stats.sens += -1;

    player.body.ovipositor.dumpEggs();
    return { next: passTime(1) };
}
