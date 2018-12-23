import { NextScreenChoices, ScreenChoice } from 'Game/ScreenDisplay';
import { MainScreen } from 'Page/MainScreen';
import { Player } from 'Game/Character/Player/Player';
import { Time } from 'Game/Utilities/Time';
import { CView } from 'Page/ContentView';
import { InputTextElement } from 'Engine/Display/Elements/InputTextElement';
import { BreastRow, BreastCup } from 'Game/Character/Body/BreastRow';
import { Cock, CockType } from 'Game/Character/Body/Cock';
import { Gender } from 'Game/Character/Body/GenderIdentity';
import { Vagina, VaginaWetness, VaginaLooseness } from 'Game/Character/Body/Vagina';
import { ButtRating } from 'Game/Character/Body/Butt';
import { HipRating } from 'Game/Character/Body/Hips';
import { describeHair } from 'Game/Descriptors/HairDescriptor';
import { EffectType } from 'Game/Effects/EffectType';
import { Character } from 'Game/Character/Character';
import { CharDict } from 'Game/CharDict';
import { playerMenu } from './PlayerMenu';

export function charCreationMenu(): NextScreenChoices {
    MainScreen.statsPanel.hide();
    MainScreen.topButtons.mainMenu.hide();
    MainScreen.topButtons.data.hide();
    MainScreen.topButtons.stats.hide();
    MainScreen.topButtons.perks.hide();

    const newPlayer = new Player();
    CharDict.add(newPlayer);
    CharDict.player = newPlayer;

    Time.day = 0;
    Time.hour = 0;

    return enterName(newPlayer);
}

function enterName(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("You grew up in the small village of Ingnam, a remote village with rich traditions, buried deep in the wilds.  Every year for as long as you can remember, your village has chosen a champion to send to the cursed Demon Realm.  Legend has it that in years Ingnam has failed to produce a champion, chaos has reigned over the countryside.  Children disappear, crops wilt, and disease spreads like wildfire.  This year, <b>you</b> have been selected to be the champion.\n\nWhat is your name?");

    const nameField = new InputTextElement();
    CView.textElement.appendElement(nameField);

    return { choices: [["OK", () => chooseName(player, nameField)]] };
}

function chooseName(player: Character, nameField: InputTextElement): NextScreenChoices {
    if (nameField.text === "") {
        enterName(player);
        CView.text("\n\n\n<b>You must select a name.</b>");
        return enterName(player);
    }
    player.desc.name = nameField.text;
    CView.clear();
    CView.text("\n\n\n\nAre you a man or a woman?");
    return { choices: [["Man", isAMan], ["Woman", isAWoman]] };
}

function isAMan(player: Character): NextScreenChoices {
    player.stats.str += 3;
    player.stats.tou += 2;

    player.body.balls.count = 2;
    player.body.balls.size = 1;
    player.body.fertility = 5;
    player.body.hair.length = 1;
    player.body.tallness = 71;
    player.body.tone = 60;

    player.body.chest.add(new BreastRow());
    const newCock = new Cock();
    newCock.length = 5.5;
    newCock.thickness = 1;
    newCock.type = CockType.HUMAN;
    newCock.knotMultiplier = 1;
    player.body.cocks.add(newCock);
    CView.clear();
    CView.text("You are a man.  Your upbringing has provided you an advantage in strength and toughness.\n\nWhat type of build do you have?");
    return { choices: [["Lean", buildLeanMale], ["Average", buildAverageMale], ["Thick", buildThickMale], ["Girly", buildGirlyMale]] };
}

function isAWoman(player: Character): NextScreenChoices {
    player.stats.spe += 3;
    player.stats.int += 2;

    player.body.balls.count = 0;
    player.body.balls.size = 0;
    player.body.fertility = 10;
    player.body.hair.length = 10;
    player.body.tallness = 67;
    player.body.tone = 30;

    player.body.chest.add(new BreastRow());
    player.body.vaginas.add(new Vagina());
    player.body.clit.length = 0.5;
    CView.clear();
    CView.text("You are a woman.  Your upbringing has provided you an advantage in speed and intellect.\n\nWhat type of build do you have?");
    return { choices: [["Slender", buildSlenderFemale], ["Average", buildAverageFemale], ["Curvy", buildCurvyFemale], ["Tomboyish", buildTomboyishFemale]] };
}

function buildLeanMale(player: Character): NextScreenChoices {
    player.stats.str -= 1;
    player.stats.spe += 1;

    player.body.femininity = 34;
    player.body.thickness = 30;
    player.body.tone += 5;

    player.body.chest.firstRow.rating = BreastCup.FLAT;
    player.body.butt.rating = ButtRating.TIGHT;
    player.body.hips.rating = HipRating.SLENDER;
    return chooseComplexion();
}

function buildSlenderFemale(player: Character): NextScreenChoices {
    player.stats.str -= 1;
    player.stats.spe += 1;

    player.body.femininity = 66;
    player.body.thickness = 30;
    player.body.tone += 5;

    player.body.chest.firstRow.rating = BreastCup.B;
    player.body.butt.rating = ButtRating.TIGHT;
    player.body.hips.rating = HipRating.AMPLE;
    return chooseComplexion();
}

function buildAverageMale(player: Character): NextScreenChoices {
    player.body.femininity = 30;
    player.body.thickness = 50;

    player.body.chest.firstRow.rating = BreastCup.FLAT;
    player.body.butt.rating = ButtRating.AVERAGE;
    player.body.hips.rating = HipRating.AVERAGE;
    return chooseComplexion();
}

function buildAverageFemale(player: Character): NextScreenChoices {
    player.body.femininity = 70;
    player.body.thickness = 50;

    player.body.chest.firstRow.rating = BreastCup.C;
    player.body.butt.rating = ButtRating.NOTICEABLE;
    player.body.hips.rating = HipRating.AMPLE;
    return chooseComplexion();
}

function buildThickMale(player: Character): NextScreenChoices {
    player.stats.spe -= 4;
    player.stats.str += 2;
    player.stats.tou += 2;

    player.body.femininity = 29;
    player.body.thickness = 70;
    player.body.tone -= 5;

    player.body.chest.firstRow.rating = BreastCup.FLAT;
    player.body.butt.rating = ButtRating.NOTICEABLE;
    player.body.hips.rating = HipRating.AVERAGE;
    return chooseComplexion();
}

function buildCurvyFemale(player: Character): NextScreenChoices {
    player.stats.spe -= 2;
    player.stats.str += 1;
    player.stats.tou += 1;

    player.body.femininity = 71;
    player.body.thickness = 70;

    player.body.chest.firstRow.rating = BreastCup.D;
    player.body.butt.rating = ButtRating.LARGE;
    player.body.hips.rating = HipRating.CURVY;
    return chooseComplexion();
}

function buildGirlyMale(player: Character): NextScreenChoices {
    player.stats.str -= 2;
    player.stats.spe += 2;

    player.body.femininity = 50;
    player.body.thickness = 50;
    player.body.tone = 26;

    player.body.chest.firstRow.rating = BreastCup.A;
    player.body.butt.rating = ButtRating.NOTICEABLE;
    player.body.hips.rating = HipRating.SLENDER;
    return chooseComplexion();
}

function buildTomboyishFemale(player: Character): NextScreenChoices {
    player.stats.str += 1;
    player.stats.spe -= 1;

    player.body.femininity = 56;
    player.body.thickness = 50;
    player.body.tone = 50;

    player.body.chest.firstRow.rating = BreastCup.A;
    player.body.butt.rating = ButtRating.TIGHT;
    player.body.hips.rating = HipRating.SLENDER;
    return chooseComplexion();
}

function chooseComplexion(): NextScreenChoices {
    CView.clear();
    CView.text("What is your complexion?");
    return {
        choices: [
            ["Light", (player: Character) => setComplexion(player, "light")],
            ["Olive", (player: Character) => setComplexion(player, "olive")],
            ["Dark", (player: Character) => setComplexion(player, "dark")],
            ["Ebony", (player: Character) => setComplexion(player, "ebony")]
        ]
    };
}

function setComplexion(player: Character, choice: string): NextScreenChoices { // And choose hair
    player.body.skin.tone = choice;
    CView.clear();
    CView.text("You selected a " + choice + " complexion.\n\nWhat color is your hair?");
    return {
        choices: [
            ["Blonde", () => setHair(player, "blonde")],
            ["Brown", () => setHair(player, "brown")],
            ["Black", () => setHair(player, "black")],
            ["Red", () => setHair(player, "red")],
            ["Gray", () => setHair(player, "gray")],
            ["White", () => setHair(player, "white")],
            ["Auburn", () => setHair(player, "auburn")]
        ]
    };
}

function setHair(player: Character, choice: string): NextScreenChoices {
    player.body.hair.color = choice;
    CView.clear();
    CView.text("You have " + describeHair(player) + ".");
    return { next: chooseEndowment };
}

function chooseEndowment(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("Every person is born with a gift.  What's yours?");
    const choices: ScreenChoice[] = [
        ["Strength", confirmEndowmentStrength],
        ["Toughness", confirmEndowmentThoughness],
        ["Speed", confirmEndowmentSpeed],
        ["Smarts", confirmEndowmentSmarts],
        ["Libido", confirmEndowmentLibido],
        ["Touch", confirmEndowmentTouch]
    ];
    if (player.body.cocks.length > 0) {
        choices.push(["Big Cock", confirmEndowmentBigCock], ["Lots of Jizz", confirmEndowmentMessyOrgasms]);
    }
    else {
        choices.push(
            ["Big Breasts", confirmEndowmentBigBreasts],
            ["Big Clit", confirmEndowmentBigClit],
            ["Fertile", confirmEndowmentFertile],
            ["Wet Vagina", confirmEndowmentWetVagina]
        );
    }
    return { choices };
}

function confirmEndowmentStrength(): NextScreenChoices {
    CView.clear();
    CView.text("Are you stronger than normal? (+5 Strength)\n\nStrength increases your combat damage, and your ability to hold on to an enemy or pull yourself away.");
    return { yes: setEndowmentStrength, no: chooseEndowment };
}

function confirmEndowmentThoughness(): NextScreenChoices {
    CView.clear();
    CView.text("Are you unusually tough? (+5 Toughness)\n\nToughness gives you more HP and increases the chances an attack against you will fail to wound you.");
    return { yes: setEndowmentToughness, no: chooseEndowment };
}

function confirmEndowmentSpeed(): NextScreenChoices {
    CView.clear();
    CView.text("Are you very quick?  (+5 Speed)\n\nSpeed makes it easier to escape combat and grapples.  It also boosts your chances of evading an enemy attack and successfully catching up to enemies who try to run.");
    return { yes: setEndowmentSpeed, no: chooseEndowment };
}

function confirmEndowmentSmarts(): NextScreenChoices {
    CView.clear();
    CView.text("Are you a quick learner?  (+5 Intellect)\n\nIntellect can help you avoid dangerous monsters or work with machinery.  It will also boost the power of any spells you may learn in your travels.");
    return { yes: setEndowmentSmarts, no: chooseEndowment };
}

function confirmEndowmentLibido(): NextScreenChoices {
    CView.clear();
    CView.text("Do you have an unusually high sex-drive?  (+5 Libido)\n\nLibido affects how quickly your lust builds over time.  You may find a high libido to be more trouble than it's worth...");
    return { yes: setEndowmentLibido, no: chooseEndowment };
}

function confirmEndowmentTouch(): NextScreenChoices {
    CView.clear();
    CView.text("Is your skin unusually sensitive?  (+5 Sensitivity)\n\nSensitivity affects how easily touches and certain magics will raise your lust.  Very low sensitivity will make it difficult to orgasm.");
    return { yes: setEndowmentTouch, no: chooseEndowment };
}

function confirmEndowmentBigCock(): NextScreenChoices {
    CView.clear();
    CView.text("Do you have a big cock?  (+2\" Cock Length)\n\nA bigger cock will make it easier to get off any sexual partners, but only if they can take your size.");
    return { yes: setEndowmentBigCock, no: chooseEndowment };
}

function confirmEndowmentMessyOrgasms(): NextScreenChoices {
    CView.clear();
    CView.text("Are your orgasms particularly messy?  (+50% Cum Multiplier)\n\nA higher cum multiplier will cause your orgasms to be messier.");
    return { yes: setEndowmentMessyOrgasms, no: chooseEndowment };
}

function confirmEndowmentBigBreasts(): NextScreenChoices {
    CView.clear();
    CView.text("Are your breasts bigger than average? (DD cups)\n\nLarger breasts will allow you to lactate greater amounts, tit-fuck larger cocks, and generally be a sexy bitch.");
    return { yes: setEndowmentBigBreasts, no: chooseEndowment };
}

function confirmEndowmentBigClit(): NextScreenChoices {
    CView.clear();
    CView.text("Do you have a big clit?  (1\" Long)\n\nA large enough clit may eventually become as large as a cock.  It also makes you gain lust much faster during oral or manual stimulation.");
    return { yes: setEndowmentBigClit, no: chooseEndowment };
}

function confirmEndowmentFertile(): NextScreenChoices {
    CView.clear();
    CView.text("Is your family particularly fertile?  (+15% Fertility)\n\nA high fertility will cause you to become pregnant much more easily.  Pregnancy may result in: Strange children, larger bust, larger hips, a bigger ass, and other weirdness.");
    return { yes: setEndowmentFertile, no: chooseEndowment };
}

function confirmEndowmentWetVagina(): NextScreenChoices {
    CView.clear();
    CView.text("Does your pussy get particularly wet?  (+1 Vaginal Wetness)\n\nVaginal wetness will make it easier to take larger cocks, in turn helping you bring the well-endowed to orgasm quicker.");
    return { yes: setEndowmentWetVagina, no: chooseEndowment };
}

function setEndowmentStrength(player: Character): NextScreenChoices {
    player.stats.core.str.base.raw += 5;
    player.body.tone += 7;
    player.body.thickness += 3;
    // Add bonus +25% strength gain
    player.effects.create(EffectType.Strong, { str: { delta: { multi: 0.25 } } });
    return chooseHistory();
}

function setEndowmentToughness(player: Character): NextScreenChoices {
    player.stats.core.tou.base.raw += 5;
    player.body.tone += 5;
    player.body.thickness += 5;
    player.effects.create(EffectType.Tough, { tou: { delta: { multi: 0.25 } } });
    player.stats.HP = player.stats.maxHP();
    return chooseHistory();
}

function setEndowmentSpeed(player: Character): NextScreenChoices {
    player.stats.core.spe.base.raw += 5;
    player.body.tone += 10;
    player.effects.create(EffectType.Fast, { spe: { delta: { multi: 0.25 } } });
    return chooseHistory();
}

function setEndowmentSmarts(player: Character): NextScreenChoices {
    player.stats.core.int.base.raw += 5;
    player.body.thickness -= 5;
    player.effects.create(EffectType.Smart, { int: { delta: { multi: 0.25 } } });
    return chooseHistory();
}

function setEndowmentLibido(player: Character): NextScreenChoices {
    player.stats.core.lib.base.raw += 5;
    player.effects.create(EffectType.Lusty, { lib: { delta: { multi: 0.25 } } });
    return chooseHistory();
}

function setEndowmentTouch(player: Character): NextScreenChoices {
    player.stats.core.sens.base.raw += 5;
    player.effects.create(EffectType.Sensitive, { sens: { delta: { multi: 0.25 } } });
    return chooseHistory();
}

function setEndowmentBigCock(player: Character): NextScreenChoices {
    player.body.femininity -= 5;
    player.body.cocks.get(0)!.length = 8;
    player.body.cocks.get(0)!.thickness = 1.5;
    player.effects.create(EffectType.BigCock);
    return chooseHistory();
}

function setEndowmentMessyOrgasms(player: Character): NextScreenChoices {
    player.body.femininity -= 2;
    player.body.cumMultiplier = 1.5;
    player.effects.create(EffectType.MessyOrgasms);
    return chooseHistory();
}

function setEndowmentBigBreasts(player: Character): NextScreenChoices {
    player.body.femininity += 5;
    player.body.chest.firstRow.rating += 2;
    player.effects.create(EffectType.BigTits);
    return chooseHistory();
}

function setEndowmentBigClit(player: Character): NextScreenChoices {
    player.body.femininity -= 5;
    player.body.clit.length = 1;
    player.effects.create(EffectType.BigClit);
    return chooseHistory();
}

function setEndowmentFertile(player: Character): NextScreenChoices {
    player.body.femininity += 5;
    player.body.fertility += 25;
    player.body.hips.rating += 2;
    player.effects.create(EffectType.Fertile);
    return chooseHistory();
}

function setEndowmentWetVagina(player: Character): NextScreenChoices {
    player.body.femininity += 7;
    player.body.vaginas.get(0)!.wetness = VaginaWetness.WET;
    player.effects.create(EffectType.WetPussy);
    return chooseHistory();
}

function chooseHistory(): NextScreenChoices {
    CView.clear();
    CView.text("Before you became a champion, you had other plans for your life.  What were you doing before?");
    return {
        choices: [
            ["Alchemy", () => confirmHistory(EffectType.HistoryAlchemist)],
            ["Fighting", () => confirmHistory(EffectType.HistoryFighter)],
            ["Healing", () => confirmHistory(EffectType.HistoryHealer)],
            ["Religion", () => confirmHistory(EffectType.HistoryReligious)],
            ["Schooling", () => confirmHistory(EffectType.HistoryScholar)],
            ["Slacking", () => confirmHistory(EffectType.HistorySlacker)],
            ["Slutting", () => confirmHistory(EffectType.HistorySlut)],
            ["Smithing", () => confirmHistory(EffectType.HistorySmith)],
            ["Whoring", () => confirmHistory(EffectType.HistoryWhore)],
        ]
    };
}

function confirmHistory(choice: EffectType): NextScreenChoices {
    CView.clear();
    switch (choice) {
        case EffectType.HistoryAlchemist:
            CView.text("You spent some time as an alchemist's assistant, and alchemical items always seem to be more reactive in your hands.  Is this your history?");
            break;
        case EffectType.HistoryFighter:
            CView.text("You spent much of your time fighting other children, and you had plans to find work as a guard when you grew up.  You do 10% more damage with physical attacks.  Is this your history?");
            break;
        case EffectType.HistoryHealer:
            CView.text("You often spent your free time with the village healer, learning how to tend to wounds.  Healing items and effects are 20% more effective.  Is this your history?");
            break;
        case EffectType.HistoryReligious:
            CView.text("You spent a lot of time at the village temple, and learned how to meditate.  The 'masturbation' option is replaced with 'meditate' when corruption is at or below 66.  Is this your history?");
            break;
        case EffectType.HistoryScholar:
            CView.text("You spent much of your time in school, and even begged the richest man in town, Mr. Savin, to let you read some of his books.  You are much better at focusing, and spellcasting uses 20% less fatigue.  Is this your history?");
            break;
        case EffectType.HistorySlacker:
            CView.text("You spent a lot of time slacking, avoiding work, and otherwise making a nuisance of yourself.  Your efforts at slacking have made you quite adept at resting, and your fatigue comes back 20% faster.  Is this your history?");
            break;
        case EffectType.HistorySlut:
            CView.text("You managed to spend most of your time having sex.  Quite simply, when it came to sex, you were the village bicycle - everyone got a ride.  Because of this, your body is a bit more resistant to penetrative stretching, and has a higher upper limit on what exactly can be inserted.  Is this your history?");
            break;
        case EffectType.HistorySmith:
            CView.text("You managed to get an apprenticeship with the local blacksmith.  Because of your time spent at the blacksmith's side, you've learned how to fit armor for maximum protection.  Is this your history?");
            break;
        default:
            CView.text("You managed to find work as a whore.  Because of your time spent trading seduction for profit, you're more effective at teasing (+15% tease damage).  Is this your history?");
    }
    return { yes: (player: Character) => setHistory(player, choice), no: chooseHistory };
}

function setHistory(player: Character, choice: EffectType): NextScreenChoices {
    player.effects.create(choice);
    if (choice === EffectType.HistorySlut || choice === EffectType.HistoryWhore) {
        if (player.body.vaginas.length > 0) {
            player.body.vaginas.get(0)!.virgin = false;
            player.body.vaginas.get(0)!.looseness = VaginaLooseness.LOOSE;
        }
        player.body.butt.looseness = 1;
    }
    return completeCharacterCreation(player);
}

function completeCharacterCreation(player: Character, customProile?: (player: Character) => void): NextScreenChoices {
    if (customProile) {
        customProile(player);
        return { next: arrival };
    }
    return arrival(player);
}

function arrival(player: Character): NextScreenChoices {
    Time.hour = 11;
    CView.clear();
    CView.text("You are prepared for what is to come.  Most of the last year has been spent honing your body and mind to prepare for the challenges ahead.  You are the Champion of Ingnam.  The one who will journey to the demon realm and guarantee the safety of your friends and family, even though you'll never see them again.  You wipe away a tear as you enter the courtyard and see Elder Nomur waiting for you.  You are ready.\n\n");
    CView.text("The walk to the tainted cave is long and silent.  Elder Nomur does not speak.  There is nothing left to say.  The two of you journey in companionable silence.  Slowly the black rock of Mount Ilgast looms closer and closer, and the temperature of the air drops.   You shiver and glance at the Elder, noticing he doesn't betray any sign of the cold.  Despite his age of nearly 80, he maintains the vigor of a man half his age.  You're glad for his strength, as assisting him across this distance would be draining, and you must save your energy for the trials ahead.\n\n");
    CView.text("The entrance of the cave gapes open, sharp stalactites hanging over the entrance, giving it the appearance of a monstrous mouth.  Elder Nomur stops and nods to you, gesturing for you to proceed alone.\n\n");
    CView.text("The cave is unusually warm and damp, ");
    if (player.gender === Gender.FEMALE)
        CView.text("and your body seems to feel the same way, flushing as you feel a warmth and dampness between your thighs. ");
    else CView.text("and your body reacts with a sense of growing warmth focusing in your groin, your manhood hardening for no apparent reason. ");
    CView.text("You were warned of this and press forward, ignoring your body's growing needs.  A glowing purple-pink portal swirls and flares with demonic light along the back wall.  Cringing, you press forward, keenly aware that your body seems to be anticipating coming in contact with the tainted magical construct.  Closing your eyes, you gather your resolve and leap forwards.  Vertigo overwhelms you and you black out...");
    MainScreen.statsPanel.show();
    player.stats.lust += 15;
    return { next: arrivalPartTwo };
}

function arrivalPartTwo(player: Character): NextScreenChoices {
    CView.clear();
    player.stats.lust += 40;
    player.stats.cor += 2;
    Time.hour = 18;
    CView.text("You wake with a splitting headache and a body full of burning desire.  A shadow darkens your view momentarily and your training kicks in.  You roll to the side across the bare ground and leap to your feet.  A surprised looking imp stands a few feet away, holding an empty vial.  He's completely naked, an improbably sized pulsing red cock hanging between his spindly legs.  You flush with desire as a wave of lust washes over you, your mind reeling as you fight ");
    if (player.gender === Gender.FEMALE)
        CView.text("the urge to chase down his rod and impale yourself on it.\n\n");
    else
        CView.text("the urge to ram your cock down his throat.  The strangeness of the thought surprises you.\n\n");
    CView.text("The imp says, \"<i>I'm amazed you aren't already chasing down my cock, human.  The last Champion was an eager whore for me by the time she woke up.  This lust draft made sure of it.</i>\"");
    return { next: arrivalPartThree };
}

function arrivalPartThree(player: Character): NextScreenChoices {
    CView.clear();
    player.stats.lust += -30;
    CView.text("The imp shakes the empty vial to emphasize his point.  You reel in shock at this revelation - you've just entered the demon realm and you've already been drugged!  You tremble with the aching need in your groin, but resist, righteous anger lending you strength.\n\nIn desperation you leap towards the imp, watching with glee as his cocky smile changes to an expression of sheer terror.  The smaller creature is no match for your brute strength as you pummel him mercilessly.  You pick up the diminutive demon and punt him into the air, frowning grimly as he spreads his wings and begins speeding into the distance.\n\n");
    CView.text("The imp says, \"<i>FOOL!  You could have had pleasure unending... but should we ever cross paths again you will regret humiliating me!  Remember the name Zetaz, as you'll soon face the wrath of my master!</i>\"\n\n");
    CView.text("Your pleasure at defeating the demon ebbs as you consider how you've already been defiled.  You swear to yourself you will find the demon responsible for doing this to you and the other Champions, and destroy him AND his pet imp.");
    return { next: arrivalPartFour };
}

function arrivalPartFour(): NextScreenChoices {
    CView.clear();
    CView.text("You look around, surveying the hellish landscape as you plot your next move.  The portal is a few yards away, nestled between a formation of rocks.  It does not seem to exude the arousing influence it had on the other side.  The ground and sky are both tinted different shades of red, though the earth beneath your feet feels as normal as any other lifeless patch of dirt.   You settle on the idea of making a camp here and fortifying this side of the portal.  No demons will ravage your beloved hometown on your watch.\n\nIt does not take long to set up your tent and a few simple traps.  You'll need to explore and gather more supplies to fortify it any further.  Perhaps you will even manage to track down the demons who have been abducting the other champions!");
    return { next: playerMenu };
}
