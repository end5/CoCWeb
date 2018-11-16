import { randInt } from '../../Engine/Utilities/SMath';
import { Character } from '../Character/Character';
import { PerkType } from '../Effects/PerkType';

/**
 * Performs a combat dodge calculation
 * @param char The current char
 * @param dodgingChar The char performing the dodge
 */
export function combatDodge(char: Character, dodgingChar: Character): boolean {
    return combatMiss(dodgingChar, char) || combatEvade(dodgingChar, char) || combatFlexibility(dodgingChar, char) || combatMisdirect(dodgingChar, char);
}

export function combatMiss(character: Character, monster: Character): boolean {
    return character.stats.spe - monster.stats.spe > 0 && randInt(((character.stats.spe - monster.stats.spe) / 4) + 80) > 80;

}

export function combatEvade(character: Character, monster: Character): boolean {
    return monster.desc.short !== "Kiha" && character.perks.has(PerkType.Evade) && randInt(100) < 10;

}

export function combatFlexibility(character: Character, monster: Character): boolean {
    return character.perks.has(PerkType.Flexibility) && randInt(100) < 6;

}

export function combatMisdirect(character: Character, monster: Character): boolean {
    return character.perks.has(PerkType.Misdirection) && randInt(100) < 10 && character.inventory.equipment.armor.displayName === "red, high-society bodysuit";
}

export function combatRegeneration(character: Character): void {
    let healingPercent: number = 0;
    if (character.perks.has(PerkType.Regeneration)) healingPercent += 1;
    if (character.perks.has(PerkType.Regeneration2)) healingPercent += 2;
    if (character.inventory.equipment.armor.displayName === "skimpy nurse's outfit") healingPercent += 2;
    if (character.inventory.equipment.armor.displayName === "goo armor") healingPercent += 2;
    if (character.perks.has(PerkType.LustyRegeneration)) healingPercent += 1;
    if (healingPercent > 5) healingPercent = 5;
    character.stats.HP += (Math.round(character.stats.maxHP() * healingPercent / 100));
}

export function fatigueRecovery(character: Character): void {
    character.stats.fatigue--;
    if (character.perks.has(PerkType.EnlightenedNinetails) || character.perks.has(PerkType.CorruptedNinetails))
        character.stats.fatigue -= (1 + randInt(3));
}

// public packAttack(player: Character, monster: Character): void {
//     // Determine if dodged!
//     if (player.stats.spe - monster.stats.spe > 0 && randInt((player.stats.spe - monster.stats.spe) / 4) + 80) > 80) {
//         DisplayText("You duck, weave, and dodge.  Despite their best efforts, the throng of demons only hit the air and each other.");
//     }
//     // Determine if evaded
//     else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
//         DisplayText("Using your skills at evading attacks, you anticipate and sidestep " + monster.desc.a + monster.desc.short + "' attacks.");
//     }
//     // ("Misdirection"
//     else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 15 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
//         DisplayText("Using Raphael's teachings, you anticipate and sidestep " + monster.desc.a + monster.desc.short + "' attacks.");
//     }
//     // Determine if cat'ed
//     else if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
//         DisplayText("With your incredible flexibility, you squeeze out of the way of " + monster.desc.a + monster.desc.short + "' attacks.");
//     }
//     else {
//         let temp = Math.floor((monster.stats.str + monster.combat.stats.weaponAttack()) - randInt(player.stats.tou) - player.combat.stats.defense()); // Determine damage - str modified by enemy toughness!
//         if (temp <= 0) {
//             temp = 0;
//             if (!monster.desc.plural)
//                 DisplayText("You deflect and block every " + monster.inventory.equipment.weapon.displayname + " " + monster.desc.a + monster.desc.short + " throw at you.");
//             else DisplayText("You deflect " + monster.desc.a + monster.desc.short + " " + monster.weaponVerb + ".");
//         }
//         else {
//             temp = takeDamage(temp);
//             if (temp <= 5)
//                 DisplayText("You are struck a glancing blow by " + monster.desc.a + monster.desc.short + "! (" + temp + ")");
//             else if (temp <= 10)
//                 DisplayText(monster.desc.capitalA + monster.desc.short + " wound you! (" + temp + ")");
//             else if (temp <= 20)
//                 DisplayText(monster.desc.capitalA + monster.desc.short + " stagger you with the force of " + monster.desc.possessivePronoun + " " + monster.weaponVerb + "s! (" + temp + ")");
//             else DisplayText(monster.desc.capitalA + monster.desc.short + " <b>mutilates</b> you with powerful fists and " + monster.weaponVerb + "s! (" + temp + ")");
//         }
//         DisplayText("\n");
//     }
// }

    // Just text should force the function to purely emit the test text to the output display, and not have any other side effects
    // public teaseXP(XP: number = 0): void {
    //     while (XP > 0) {
    //         XP--;
    //         player.teaseXP++;
    //         // Level dat shit up!
    //         if (player.teaseLevel < 5 && player.teaseXP >= 10 + (player.teaseLevel + 1) * 5 * (player.teaseLevel + 1)) {
    //             DisplayText("\n<b>Tease skill leveled up to " + (player.teaseLevel + 1) + "!</b>");
    //             player.teaseLevel++;
    //             player.teaseXP = 0;
    //         }
    //     }
    // }

    // VICTORY OR DEATH?

    // public runAway(callHook: boolean = true): void {
    //     if (callHook && monster.onPcRunAttempt != undefined) {
    //         monster.onPcRunAttempt();
    //         return;
    //     }
    //     DisplayText.clear();
    //     if (inCombat && player.statusAffects.has(StatusAffectType.Sealed) && player.statusAffects.get(StatusAffectType.Sealed).value2 === 4) {
    //         DisplayText.clear();
    //         DisplayText("You try to run, but you just can't seem to escape.  <b>Your ability to run was sealed, and now you've wasted a chance to attack!</b>\n\n");
    //         enemyAI();
    //         return;
    //     }
    //     // Rut doesnt let you run from dicks.
    //     if (player.inRut && monster.totalCocks() > 0) {
    //         DisplayText().clear();
    //         DisplayText("The thought of another male in your area competing for all the pussy infuriates you!  No way will you run!");
    //         // Pass false to combatMenu instead:		menuLoc = 3;
    //         // 		return { next: combatMenu };
    //         return { next: Combat };
    //         return;
    //     }
    //     if (monster.statusAffects.has(StatusAffectType.Level) && player.canFly()) {
    //         DisplayText.clear();
    //         DisplayText("You flex the muscles in your back and, shaking clear of the sand, burst into the air!  Wasting no time you fly free of the sandtrap and its treacherous pit.  \"One day your wings will fall off, little ant,\" the snarling voice of the thwarted androgyne carries up to you as you make your escape.  \"And I will be waiting for you when they do!\"");
    //         inCombat = false;
    //         clearStatuses(false);
    //         return { next: Scenes.camp.returnToCampUseOneHour };
    //         return;
    //     }
    //     if (monster.statusAffects.has(StatusAffectType.GenericRunDisabled) || urtaQuest.isUrta()) {
    //         DisplayText("You can't escape from this fight!");
    //         // Pass false to combatMenu instead:		menuLoc = 3;
    //         // 		return { next: combatMenu };
    //         return { next: Combat };
    //         return;
    //     }
    //     if (monster.statusAffects.has(StatusAffectType.Level) && monster.statusAffects.get(StatusAffectType.Level).value1 < 4) {
    //         DisplayText("You're too deeply mired to escape!  You'll have to <b>climb</b> some first!");
    //         // Pass false to combatMenu instead:		menuLoc = 3;
    //         // 		return { next: combatMenu };
    //         return { next: Combat };
    //         return;
    //     }
    //     if (monster.statusAffects.has(StatusAffectType.RunDisabled)) {
    //         DisplayText("You'd like to run, but you can't scale the walls of the pit with so many demonic hands pulling you down!");
    //         // Pass false to combatMenu instead:		menuLoc = 3;
    //         // 		return { next: combatMenu };
    //         return { next: Combat };
    //         return;
    //     }
    //     if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00329] === 1 && (monster.desc.short === "minotaur gang" || monster.desc.short === "minotaur tribe")) {
    //         Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00329] = 0;
    //         // (Free run away)
    //         DisplayText().clear();
    //         DisplayText("You slink away while the pack of brutes is arguing.  Once they finish that argument, they'll be sorely disappointed!");
    //         inCombat = false;
    //         clearStatuses(false);
    //         return { next: Scenes.camp.returnToCampUseOneHour };
    //         return;
    //     }
    //     else if (monster.desc.short === "minotaur tribe" && monster.stats.HPRatio() >= 0.75) {
    //         DisplayText().clear();
    //         DisplayText("There's too many of them surrounding you to run!");
    //         // Pass false to combatMenu instead:		menuLoc = 3;
    //         // 		return { next: combatMenu };
    //         return { next: Combat };
    //         return;
    //     }
    //     if (inDungeon || inRoomedDungeon) {
    //         DisplayText().clear();
    //         DisplayText("You're trapped in your foe's home turf - there is nowhere to run!\n\n");
    //         enemyAI();
    //         return;
    //     }
    //     // Attempt texts!
    //     if (monster.desc.short === "Ember") {
    //         DisplayText("You take off");
    //         if (!player.canFly()) DisplayText(" running");
    //         else DisplayText(", flapping as hard as you can");
    //         DisplayText(", and Ember, caught up in the moment, gives chase.  ");
    //     }
    //     else if (player.canFly()) DisplayText("Gritting your teeth with effort, you beat your wings quickly and lift off!  ");
    //     // Nonflying PCs
    //     else {
    //         // Stuck!
    //         if (player.statusAffects.has(StatusAffectType.NoFlee)) {
    //             DisplayText().clear();
    //             if (monster.desc.short === "goblin") DisplayText("You try to flee but get stuck in the sticky white goop surrounding you.\n\n");
    //             else DisplayText("You put all your skills at running to work and make a supreme effort to escape, but are unable to get away!\n\n");
    //             enemyAI();
    //             return;
    //         }
    //         // Nonstuck!
    //         else DisplayText("You turn tail and attempt to flee!  ");
    //     }

    //     // Calculations
    //     let escapeMod: number = 20 + monster.level * 3;
    //     if (debug) escapeMod -= 300;
    //     if (player.canFly()) escapeMod -= 20;
    //     if (player.torso.tailType === TailType.RACCOON && player.torso.neck.head.earType === EarType.RACCOON && player.perks.has(PerkType.Runner)) escapeMod -= 25;

    //     // Big tits doesn't matter as much if ya can fly!
    //     else {
    //         if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 35) escapeMod += 5;
    //         if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 66) escapeMod += 10;
    //         if (player.torso.hipRating >= 20) escapeMod += 5;
    //         if (player.torso.butt.rating >= 20) escapeMod += 5;
    //         if (player.torso.balls.size >= 24 && player.torso.balls.quantity > 0) escapeMod += 5;
    //         if (player.torso.balls.size >= 48 && player.torso.balls.quantity > 0) escapeMod += 10;
    //         if (player.torso.balls.size >= 120 && player.torso.balls.quantity > 0) escapeMod += 10;
    //     }
    //     // ANEMONE OVERRULES NORMAL RUN
    //     if (monster.desc.short === "anemone") {
    //         // Autosuccess - less than 60 lust
    //         if (player.stats.lust < 60) {
    //             DisplayText().clear();
    //             DisplayText("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.");
    //             inCombat = false;
    //             clearStatuses(false);
    //             return { next: Scenes.camp.returnToCampUseOneHour };
    //             return;
    //         }
    //         // Speed dependent
    //         else {
    //             // Success
    //             if (player.stats.spe > randInt(monster.stats.spe + escapeMod)) {
    //                 inCombat = false;
    //                 clearStatuses(false);
    //                 DisplayText().clear();
    //                 DisplayText("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.");
    //                 return { next: Scenes.camp.returnToCampUseOneHour };
    //                 return;
    //             }
    //             // Run failed:
    //             else {
    //                 DisplayText("You try to shake off the fog and run but the anemone slinks over to you and her tentacles wrap around your waist.  <i>\"Stay?\"</i> she asks, pressing her small breasts into you as a tentacle slides inside your " + player.inventory.equipment.armor.displayName + " and down to your nethers.  The combined stimulation of the rubbing and the tingling venom causes your knees to buckle, hampering your resolve and ending your escape attempt.");
    //                 // (gain lust, temp lose spd/str)
    //                 (monster as Anemone).applyVenom((4 + player.stats.sens / 20));
    //                 combatRoundOver();
    //                 return;
    //             }
    //         }
    //     }
    //     // Ember is SPUCIAL
    //     if (monster.desc.short === "Ember") {
    //         // GET AWAY
    //         if (player.stats.spe > randInt(monster.stats.spe + escapeMod) || (player.perks.has(PerkType.Runner) && randInt(100) < 50)) {
    //             if (player.perks.has(PerkType.Runner)) DisplayText("Using your skill at running, y");
    //             else DisplayText("Y");
    //             DisplayText("ou easily outpace the dragon, who begins hurling imprecations at you.  \"What the hell, [name], you weenie; are you so scared that you can't even stick out your punishment?\"");
    //             DisplayText("\n\nNot to be outdone, you call back, \"Sucks to you!  If even the mighty Last Ember of Hope can't catch me, why do I need to train?  Later, little bird!\"");
    //             inCombat = false;
    //             clearStatuses(false);
    //             return { next: Scenes.camp.returnToCampUseOneHour };
    //         }
    //         // Fail:
    //         else {
    //             DisplayText("Despite some impressive jinking, " + emberScene.emberMF("he", "she") + " catches you, tackling you to the ground.\n\n");
    //             enemyAI();
    //         }
    //         return;
    //     }
    //     // SUCCESSFUL FLEE
    //     if (player.stats.spe > randInt(monster.stats.spe + escapeMod)) {
    //         // Fliers flee!
    //         if (player.canFly()) DisplayText(monster.desc.capitalA + monster.desc.short + " can't catch you.");
    //         // sekrit benefit: if you have coon ears, coon tail, and Runner perk, change normal Runner escape to flight-type escape
    //         else if (player.torso.tailType === TailType.RACCOON && player.torso.neck.head.earType === EarType.RACCOON && player.perks.has(PerkType.Runner)) {
    //             DisplayText("Using your running skill, you build up a head of steam and jump, then spread your arms and flail your tail wildly; your opponent dogs you as best " + monster.desc.subjectivePronoun + " can, but stops and stares dumbly as your spastic tail slowly propels you several meters into the air!  You leave " + monster.desc.objectivePronoun + " behind with your clumsy, jerky, short-range flight.");
    //         }
    //         // Non-fliers flee
    //         else DisplayText(monster.desc.capitalA + monster.desc.short + " rapidly disappears into the shifting landscape behind you.");
    //         if (monster.desc.short === "Izma") {
    //             DisplayText("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.");
    //         }
    //         inCombat = false;
    //         clearStatuses(false);
    //         return { next: Scenes.camp.returnToCampUseOneHour };
    //         return;
    //     }
    //     // Runner perk chance
    //     else if (player.perks.has(PerkType.Runner) && randInt(100) < 50) {
    //         inCombat = false;
    //         DisplayText("Thanks to your talent for running, you manage to escape.");
    //         if (monster.desc.short === "Izma") {
    //             DisplayText("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.");
    //         }
    //         clearStatuses(false);
    //         return { next: Scenes.camp.returnToCampUseOneHour };
    //         return;
    //     }
    //     // FAIL FLEE
    //     else {
    //         if (monster.desc.short === "Holli") {
    //             (monster as Holli).escapeFailWithHolli();
    //             return;
    //         }
    //         // Flyers get special failure message.
    //         if (player.canFly()) {
    //             if (monster.desc.plural) DisplayText(monster.desc.capitalA + monster.desc.short + " manage to grab your " + describeLegs(player) + " and drag you back to the ground before you can fly away!");
    //             else DisplayText(monster.desc.capitalA + monster.desc.short + " manages to grab your " + describeLegs(player) + " and drag you back to the ground before you can fly away!");
    //         }
    //         // fail
    //         else if (player.torso.tailType === TailType.RACCOON && player.torso.neck.head.earType === EarType.RACCOON && player.perks.has(PerkType.Runner)) DisplayText("Using your running skill, you build up a head of steam and jump, but before you can clear the ground more than a foot, your opponent latches onto you and drags you back down with a thud!");
    //         // Nonflyer messages
    //         else {
    //             // Huge balls messages
    //             if (player.torso.balls.quantity > 0 && player.torso.balls.size >= 24) {
    //                 if (player.torso.balls.size < 48) DisplayText("With your " + describeBalls(true, true, player) + " swinging ponderously beneath you, getting away is far harder than it should be.  ");
    //                 else DisplayText("With your " + describeBalls(true, true, player) + " dragging along the ground, getting away is far harder than it should be.  ");
    //             }
    //             // FATASS BODY MESSAGES
    //             if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 35 || player.torso.butt.rating >= 20 || player.torso.hipRating >= 20) {
    //                 // FOR PLAYERS WITH GIANT BREASTS
    //                 if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 35 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating < 66) {
    //                     if (player.torso.hipRating >= 20) {
    //                         DisplayText("Your " + describeHips(player) + " forces your gait to lurch slightly side to side, which causes the fat of your " + player.skin.tone + " ");
    //                         if (player.torso.butt.rating >= 20) DisplayText(describeButt(player) + " and ");
    //                         DisplayText(describeChest(player) + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.");
    //                     }
    //                     else if (player.torso.butt.rating >= 20) DisplayText("Your " + player.skin.tone + describeButt(player) + " and " + describeChest(player) + " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape.");
    //                     else DisplayText("Your " + describeChest(player) + " jiggle and wobble side to side like the " + player.skin.tone + " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape.");
    //                 }
    //                 // FOR PLAYERS WITH MASSIVE BREASTS
    //                 else if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 66) {
    //                     if (player.torso.hipRating >= 20) {
    //                         DisplayText("Your " + describeChest(player) + " nearly drag along the ground while your " + describeHips(player) + " swing side to side ");
    //                         if (player.torso.butt.rating >= 20) DisplayText("causing the fat of your " + player.skin.tone + describeButt(player) + " to wobble heavily, ");
    //                         DisplayText("forcing your body off balance and preventing you from moving quick enough to get escape.");
    //                     }
    //                     else if (player.torso.butt.rating >= 20) DisplayText("Your " + describeChest(player) + " nearly drag along the ground while the fat of your " + player.skin.tone + describeButt(player) + " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape.");
    //                     else DisplayText("Your " + describeChest(player) + " nearly drag along the ground, preventing you from moving quick enough to get escape.");
    //                 }
    //                 // FOR PLAYERS WITH EITHER GIANT HIPS OR BUTT BUT NOT THE BREASTS
    //                 else if (player.torso.hipRating >= 20) {
    //                     DisplayText("Your " + describeHips(player) + " swing heavily from side to side ");
    //                     if (player.torso.butt.rating >= 20) DisplayText("causing your " + player.skin.tone + describeButt(player) + " to wobble obscenely ");
    //                     DisplayText("and forcing your body into an awkward gait that slows you down, preventing you from escaping.");
    //                 }
    //                 // JUST DA BOOTAH
    //                 else if (player.torso.butt.rating >= 20) DisplayText("Your " + player.skin.tone + describeButt(player) + " wobbles so heavily that you're unable to move quick enough to escape.");
    //             }
    //             // NORMAL RUN FAIL MESSAGES
    //             else if (monster.desc.plural) DisplayText(monster.desc.capitalA + monster.desc.short + " stay hot on your heels, denying you a chance at escape!");
    //             else DisplayText(monster.desc.capitalA + monster.desc.short + " stays hot on your heels, denying you a chance at escape!");
    //         }
    //     }
    //     DisplayText("\n\n");
    //     enemyAI();
    // }

//     public magicalSpecials(): void {
//         if (inCombat && player.statusAffects.has(StatusAffectType.Sealed) && player.statusAffects.get(StatusAffectType.Sealed).value2 === 6) {
//             DisplayText().clear();
//             DisplayText("You try to ready a special ability, but wind up stumbling dizzily instead.  <b>Your ability to use magical special attacks was sealed, and now you've wasted a chance to attack!</b>\n\n");
//             enemyAI();
//             return;
//         }
//         // Pass false to combatMenu instead:	menuLoc = 3;
//         menu();

//         // Berserk
//         if (player.perks.has(PerkType.Berzerker)) {
//             DisplayText.addButton(0, "Berzerk", berzerk);
//         }
//         if (player.perks.has(PerkType.Dragonfire)) {
//             DisplayText.addButton(1, "DragonFire", dragonBreath);
//         }
//         if (player.perks.has(PerkType.FireLord)) {
//             DisplayText.addButton(2, "Fire Breath", fireballuuuuu);
//         }
//         if (player.perks.has(PerkType.Hellfire)) {
//             DisplayText.addButton(3, "Hellfire", hellFire);
//         }
//         // Possess ability.
//         if (player.perks.has(PerkType.Incorporeality)) {
//             DisplayText.addButton(4, "Possess", possess);
//         }
//         if (player.perks.has(PerkType.Whispered)) {
//             DisplayText.addButton(5, "Whisper", superWhisperAttack);
//         }
//         if (player.perks.has(PerkType.CorruptedNinetails)) {
//             DisplayText.addButton(6, "C.FoxFire", corruptedFoxFire);
//             DisplayText.addButton(7, "Terror", kitsuneTerror);
//         }
//         if (player.perks.has(PerkType.EnlightenedNinetails)) {
//             DisplayText.addButton(6, "FoxFire", foxFire);
//             DisplayText.addButton(7, "Illusion", kitsuneIllusion);
//         }
//         if (player.statusAffects.has(StatusAffectType.ShieldingSpell)) DisplayText.addButton(8, "Shielding", shieldingSpell);
//         if (player.statusAffects.has(StatusAffectType.ImmolationSpell)) DisplayText.addButton(8, "Immolation", immolationSpell);
//         DisplayText.addButton(9, "Back", combatMenu);
//     }

//     public physicalSpecials(): void {
//         if (urtaQuest.isUrta()) {
//             urtaQuest.urtaSpecials();
//             return;
//         }
//         // Pass false to combatMenu instead:	menuLoc = 3;
//         if (inCombat && player.statusAffects.has(StatusAffectType.Sealed) && player.statusAffects.get(StatusAffectType.Sealed).value2 === 5) {
//             DisplayText.clear();
//             DisplayText("You try to ready a special attack, but wind up stumbling dizzily instead.  <b>Your ability to use physical special attacks was sealed, and now you've wasted a chance to attack!</b>\n\n");
//             enemyAI();
//             return;
//         }
//         menu();
//         if (player.torso.neck.head.hairType === 4) {
//             DisplayText.addButton(0, "AnemoneSting", anemoneSting);
//         }
//         // Bitez
//         if (player.torso.neck.head.face.type === FaceType.SHARK_TEETH) {
//             DisplayText.addButton(1, "Bite", bite);
//         }
//         else if (player.torso.neck.head.face.type === FaceType.SNAKE_FANGS) {
//             DisplayText.addButton(1, "Bite", nagaBiteAttack);
//         }
//         else if (player.torso.neck.head.face.type === FaceType.SPIDER_FANGS) {
//             DisplayText.addButton(1, "Bite", spiderBiteAttack);
//         }
//         // Bow attack
//         if (player.hasKeyItem("Bow") >= 0) {
//             DisplayText.addButton(2, "Bow", fireBow);
//         }
//         // Constrict
//         if (player.hips.legs.type === LegType.NAGA) {
//             DisplayText.addButton(3, "Constrict", desert.nagaScene.nagaPlayerConstrict);
//         }
//         // Kick attackuuuu
//         else if (player.torso.hips.legs.isTaur() || player.hips.legs.type === LegType.HOOFED || player.hips.legs.type === LegType.BUNNY || player.hips.legs.type === LegType.KANGAROO) {
//             DisplayText.addButton(3, "Kick", kick);
//         }
//         // Gore if mino horns
//         if (player.torso.neck.head.hornType === HornType.COW_MINOTAUR && player.torso.neck.head.horns >= 6) {
//             DisplayText.addButton(4, "Gore", goreAttack);
//         }
//         // Infest if infested
//         if (player.statusAffects.has(StatusAffectType.Infested) && player.statusAffects.get(StatusAffectType.Infested).value1 === 5 && player.torso.cocks.count > 0) {
//             DisplayText.addButton(5, "Infest", playerInfest);
//         }
//         // Kiss supercedes bite.
//         if (player.statusAffects.has(StatusAffectType.LustStickApplied)) {
//             DisplayText.addButton(6, "Kiss", kissAttack);
//         }
//         switch (player.torso.tailType) {
//             case TailType.BEE_ABDOMEN:
//                 DisplayText.addButton(7, "Sting", playerStinger);
//                 break;
//             case TailType.SPIDER_ABDOMEN:
//                 DisplayText.addButton(7, "Web", PCWebAttack);
//                 break;
//             case TailType.SHARK:
//             case TailType.LIZARD:
//             case TailType.KANGAROO:
//             case TailType.DRACONIC:
//             case TailType.RACCOON:
//                 DisplayText.addButton(7, "Tail Whip", tailWhipAttack);
//             default:
//         }

//         DisplayText.addButton(9, "Back", combatMenu);
//     }
// }
