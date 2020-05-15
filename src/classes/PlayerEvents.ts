import { BaseContent } from "./BaseContent";
import { TimeAwareInterface } from "./TimeAwareInterface";
import { CoC } from "./CoC";
import { kFLAGS } from "./GlobalFlags/kFLAGS";
import {
    TAIL_TYPE_BEE_ABDOMEN,
    TAIL_TYPE_SPIDER_ADBOMEN,
    TAIL_TYPE_CAT,
    LOWER_BODY_TYPE_CAT,
    EARS_CAT,
    FACE_FOX,
    TAIL_TYPE_FOX,
    EARS_FOX,
    LOWER_BODY_TYPE_FOX,
    SKIN_TYPE_FUR,
    LOWER_BODY_TYPE_HARPY,
    TAIL_TYPE_HARPY,
    LOWER_BODY_TYPE_NAGA,
    TAIL_TYPE_NONE,
    VAGINA_WETNESS_WET,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_LOOSENESS_GAPING,
    VAGINA_LOOSENESS_GAPING_WIDE,
    VAGINA_LOOSENESS_LEVEL_CLOWN_CAR,
    LOWER_BODY_TYPE_GOO,
} from "../includes/appearanceDefs";
import { StatusAffects } from "./StatusAffects";
import { CockTypesEnum } from "./CockTypesEnum";
import { PregnancyStore } from "./PregnancyStore";
import { trace } from "../console";
import { PerkLib } from "./PerkLib";

export class PlayerEvents extends BaseContent implements TimeAwareInterface {
    // Handles all timeChange events for the player. Needed because player is not unique.

    public PlayerEvents(): void {
        CoC.timeAwareClassAdd(this);
    }

    private checkedTurkey = 0; // Make sure we test each of these events just once in timeChangeLarge
    private checkedDream = 0;

    // Implementation of TimeAwareInterface
    public timeChange(): boolean {
        let needNext = false;
        this.checkedTurkey = 0;
        this.checkedDream = 0;
        if (this.player.cumMultiplier > 19999) this.player.cumMultiplier = 19999;
        if (this.player.ballSize > 400) this.player.ballSize = 400;
        if (this.player.findPerk(PerkLib.StrongBack) >= 0 && !this.player.itemSlot4.unlocked)
            this.player.itemSlot4.unlocked = true;
        if (this.player.findPerk(PerkLib.StrongBack2) >= 0 && !this.player.itemSlot5.unlocked)
            this.player.itemSlot5.unlocked = true;
        if (this.flags[kFLAGS.SOCK_COUNTER] > 0) {
            this.flags[kFLAGS.SOCK_COUNTER]--;
            if (this.flags[kFLAGS.SOCK_COUNTER] < 0) this.flags[kFLAGS.SOCK_COUNTER] = 0;
            if (this.flags[kFLAGS.SOCK_COUNTER] > 24) this.flags[kFLAGS.SOCK_COUNTER] = 24;
        }
        this.player.hoursSinceCum++;
        // Super cumbuilding activate!
        if (this.player.findPerk(PerkLib.MaraesGiftProfractory) >= 0)
            this.player.hoursSinceCum += 2;
        if (this.player.findPerk(PerkLib.FerasBoonAlpha) >= 0) this.player.hoursSinceCum += 2;
        // Normal
        if (this.player.findPerk(PerkLib.WellAdjusted) < 0) {
            this.getGame().dynStats("lus", this.player.lib * 0.04, "resisted", false); // Raise lust
            if (this.player.findPerk(PerkLib.Lusty) >= 0)
                this.getGame().dynStats("lus", this.player.lib * 0.02, "resisted", false); // Double lust rise if lusty.
        } else {
            // Well adjusted perk
            this.getGame().dynStats("lus", this.player.lib * 0.02); // Raise lust
            if (this.player.findPerk(PerkLib.Lusty) >= 0)
                this.getGame().dynStats("lus", this.player.lib * 0.01, "resisted", false); // Double lust rise if lusty.
        }
        if (
            this.player.tailType == TAIL_TYPE_BEE_ABDOMEN ||
            this.player.tailType == TAIL_TYPE_SPIDER_ADBOMEN
        ) {
            // Spider and Bee Sting Recharge
            if (this.player.tailRecharge < 5) this.player.tailRecharge = 5;
            this.player.tailVenom += this.player.tailRecharge;
            if (this.player.tailVenom > 100) this.player.tailVenom = 100;
        }
        if (
            this.player.tailType == TAIL_TYPE_CAT &&
            this.player.lowerBody == LOWER_BODY_TYPE_CAT &&
            this.player.earType == EARS_CAT
        ) {
            // Check for gain of cat agility - requires legs, tail, and ears
            if (this.player.findPerk(PerkLib.Flexibility) < 0) {
                this.outx(
                    "\nWhile stretching, you notice that you're much more flexible than you were before.  Perhaps this will make it a bit easier to dodge attacks in battle?\n\n(<b>Gained Perk: Flexibility</b>)\n"
                );
                this.player.createPerk(PerkLib.Flexibility, 0, 0, 0, 0);
                needNext = true;
            }
        } else if (this.player.findPerk(PerkLib.Flexibility) >= 0) {
            // Remove flexibility perk if not meeting requirements
            this.outx(
                "\nYou notice that you aren't as flexible as you were when you had a more feline body.  It'll probably be harder to avoid your enemies' attacks now.\n\n(<b>Lost Perk: Flexibility</b>)\n"
            );
            this.player.removePerk(PerkLib.Flexibility);
            needNext = true;
        }
        if (this.flags[kFLAGS.FOX_BAD_END_WARNING] == 1) {
            if (
                this.player.faceType != FACE_FOX ||
                this.player.tailType != TAIL_TYPE_FOX ||
                this.player.earType != EARS_FOX ||
                this.player.lowerBody != LOWER_BODY_TYPE_FOX ||
                this.player.skinType != SKIN_TYPE_FUR
            ) {
                this.flags[kFLAGS.FOX_BAD_END_WARNING] = 0;
            }
        }
        if (
            this.player.findPerk(PerkLib.EnlightenedNinetails) >= 0 ||
            this.player.findPerk(PerkLib.CorruptedNinetails) >= 0
        ) {
            // Check ninetails perks!
            if (this.player.tailType != TAIL_TYPE_FOX || this.player.tailVenom < 9) {
                this.outx(
                    "\n<b>Without your tails, the magic power they once granted withers and dies, vanishing completely.</b>\n"
                );
                this.player.removePerk(PerkLib.EnlightenedNinetails);
                this.player.removePerk(PerkLib.CorruptedNinetails);
                needNext = true;
            }
        }
        if (
            this.player.lowerBody == LOWER_BODY_TYPE_HARPY &&
            this.player.tailType == TAIL_TYPE_HARPY &&
            this.player.findPerk(PerkLib.HarpyWomb) >= 0
        ) {
            // Make eggs big if harpied!
            if (
                this.player.findStatusAffect(StatusAffects.Eggs) >= 0 &&
                this.player.statusAffectv2(StatusAffects.Eggs) == 0
            ) {
                this.player.changeStatusValue(StatusAffects.Eggs, 2, 1);
                this.outx(
                    "\n<b>A familiar, motherly rumble lets you know that your harpy-like womb is growing your eggs nice and large.</b>\n"
                );
                needNext = true;
            }
        }
        if (this.player.hasCock() && this.player.cocks[0].cockType == CockTypesEnum.BEE) {
            // All the hourly bee cock checks except the 'seek out the bee girl' check. That's in timeChangeLarge
            this.outx("\n");
            if (this.player.cocks.length > 1) {
                this.outx(
                    "You feel a stickiness and some stinging from your cocks.  It seems your bee cock has absorbed your new addition, leaving no trace of it.\n"
                );
                while (this.player.cocks.length > 1) this.player.removeCock(1, 1);
            }
            if (this.player.cocks[0].cockLength < 25 || this.player.cocks[0].cockThickness < 4) {
                this.outx(
                    `Your ${this.player.cockDescript(
                        0
                    )} quivers for a moment before growing slightly `
                );
                if (this.player.cocks[0].cockLength < 25 && this.player.cocks[0].cockThickness < 4)
                    this.outx("longer and thicker");
                else
                    this.outx(
                        this.player.cocks[0].cockLength < 25 ? "longer again" : "wider again"
                    );
                this.outx(
                    ", a bit of pain passing through you at the same time.  It looks like your bee cock won’t get any smaller.\n"
                );
                this.player.cocks[0].cockLength = Math.max(this.player.cocks[0].cockLength, 25);
                this.player.cocks[0].cockThickness = Math.max(
                    this.player.cocks[0].cockThickness,
                    4
                );
            }
            this.outx(
                `The desire to find the bee girl that gave you this cursed ${this.player.cockDescript(
                    0
                )} and have her spread honey all over it grows with each passing minute\n`
            );
            this.dynStats("lust", 10); // Always gain 10 lust each hour
            needNext = true;
        }
        if (!this.player.hasVagina() && this.player.findPerk(PerkLib.Diapause) >= 0) {
            // Lose diapause
            this.outx(
                "\n<b>With the loss of your womb, you lose your kangaroo-like diapause ability.</b>\n"
            );
            this.player.removePerk(PerkLib.Diapause);
            needNext = true;
        }
        if (this.player.lowerBody == LOWER_BODY_TYPE_NAGA) {
            if (this.player.tailType > TAIL_TYPE_NONE) {
                this.outx(
                    "\nYour tail squirms, wriggling against your larger naga tail as the scales part around it, absorbing it.  <b>Your form is completely scaly and smooth from the waist down.</b>\n"
                );
                this.player.tailType = TAIL_TYPE_NONE;
                needNext = true;
            }
        }
        if (this.player.findPerk(PerkLib.WetPussy) >= 0 && this.player.hasVagina()) {
            if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_WET) {
                this.outx(
                    `\n<b>Your ${this.player.vaginaDescript(
                        0
                    )} returns to its normal, wet state.</b>\n`
                );
                this.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_WET;
                needNext = true;
            }
        }
        if (
            this.player.findPerk(PerkLib.MaraesGiftButtslut) >= 0 &&
            this.player.ass.analWetness < 2
        ) {
            // Prevent Buttsluts from getting dry backdoors
            this.outx(
                `\n<b>Your ${this.getGame().assholeDescript()} quickly re-moistens.  It looks like Marae's 'gift' can't be removed.</b>\n`
            );
            this.player.ass.analWetness = 2;
            needNext = true;
        }
        if (
            this.player.pregnancyIncubation <= 0 &&
            this.player.pregnancyType == PregnancyStore.PREGNANCY_OVIELIXIR_EGGS
        ) {
            // Fixing Egg Preg Preglocked Glitch
            this.player.knockUpForce(); // Clear Pregnancy
        }
        if (
            this.player.findStatusAffect(StatusAffects.Uniball) >= 0 &&
            this.player.ballSize > 1 &&
            this.player.balls > 0
        ) {
            // Testicles Normalise:
            this.outx(
                "\nYou feel a deep sensation of release around your genitals.  You sigh with relief and contentment as your testicles drop downwards and bloom outwards, heat throbbing within them as they split and form a proper ballsack.\n"
            );
            this.player.removeStatusAffect(StatusAffects.Uniball);
            needNext = true;
        }
        if (this.player.findPerk(PerkLib.Androgyny) < 0) {
            // Fix femininity ratings if out of whack!
            const textHolder: string = this.player.fixFemininity();
            if (textHolder != "") {
                this.outx(textHolder, false);
                needNext = true;
            }
        }
        if (this.player.findStatusAffect(StatusAffects.LustStickApplied) >= 0) {
            // Lust stick!
            this.player.addStatusValue(StatusAffects.LustStickApplied, 1, -1); // Decrement!
            if (this.player.statusAffectv1(StatusAffects.LustStickApplied) <= 0) {
                this.player.removeStatusAffect(StatusAffects.LustStickApplied);
                this.outx(
                    "<b>\nYour drugged lipstick fades away, leaving only the faintest residue on your lips.  You'll have to put on more if you want to be able to kiss your foes into submission!</b>\n"
                );
            }
        }
        if (this.player.findStatusAffect(StatusAffects.Luststick) >= 0) {
            // Luststic countdown
            this.player.addStatusValue(StatusAffects.Luststick, 1, -1);
            if (PlayerEvents.rand(2) == 0 && this.player.hasCock()) {
                // 50% chance to lust spike
                // Display if haven't displayed
                if (this.player.flags[kFLAGS.PC_CURRENTLY_LUSTSTICK_AFFECTED] == 0) {
                    this.outx(
                        `\nYour body tingles, practically a slave to the effects of harpy lipstick.  Blood surges to ${this.player.sMultiCockDesc()}, making you groan out loud with forced pleasure.  Unasked-for fantasies assault you, and you spend a few moments fantasizing about fucking feathery women before you come to your senses.\n`
                    );
                    this.flags[kFLAGS.PC_CURRENTLY_LUSTSTICK_AFFECTED]++;
                    needNext = true;
                }
                this.getGame().dynStats("lus", 0.1);
                this.player.lust += 20;
                if (this.player.lust > 100) this.player.lust = 100;
            }
            if (this.player.statusAffectv1(StatusAffects.Luststick) <= 0) {
                this.player.removeStatusAffect(StatusAffects.Luststick);
                this.outx(
                    "\n<b>The lust-increasing effects of harpy lipstick have worn off!\n</b>"
                );
                needNext = true;
            }
        }
        if (
            this.player.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00285] >= 50 &&
            this.player.findPerk(PerkLib.LuststickAdapted) < 0
        ) {
            // Luststick resistance unlock
            this.getGame().sophieBimbo.unlockResistance();
            if (this.player.findStatusAffect(StatusAffects.Luststick) >= 0)
                this.player.removeStatusAffect(StatusAffects.Luststick);
            needNext = true;
        }
        if (this.flags[kFLAGS.DICK_EGG_INCUBATION] > 0) {
            this.flags[kFLAGS.DICK_EGG_INCUBATION]--;
            trace(`DICK BIRTH TIMER: ${this.flags[kFLAGS.DICK_EGG_INCUBATION]}`);
            if (this.flags[kFLAGS.DICK_EGG_INCUBATION] == 1) {
                this.getGame().masturbation.birthBeeEggsOutYourWang();
                needNext = true;
            }
        }
        if (this.player.findStatusAffect(StatusAffects.Eggchest) >= 0) {
            // Eggs in tits!
            this.player.addStatusValue(StatusAffects.Eggchest, 1, -1);
            if (this.player.statusAffectv1(StatusAffects.Eggchest) <= 0) {
                this.outx(
                    "\n<b>You feel the rounded eggs within your [fullChest] vanishing, absorbed into your body.  </b>"
                );
                this.player.growTits(
                    this.player.statusAffectv2(StatusAffects.Eggchest),
                    this.player.bRows(),
                    true,
                    2
                );
                this.outx("\n");
                this.player.removeStatusAffect(StatusAffects.Eggchest);
                needNext = true;
            }
        }
        if (
            this.player.findPerk(PerkLib.SpiderOvipositor) >= 0 ||
            this.player.findPerk(PerkLib.BeeOvipositor) >= 0
        ) {
            // Spider and Bee ovipositor updates
            if (
                this.player.findPerk(PerkLib.SpiderOvipositor) >= 0 &&
                (!this.player.isDrider() || this.player.tailType != TAIL_TYPE_SPIDER_ADBOMEN)
            ) {
                // Remove dat shit!
                this.outx(
                    "\nYour ovipositor (and eggs) vanish since your body has become less spider-like.</b>\n"
                );
                this.player.removePerk(PerkLib.SpiderOvipositor);
                needNext = true;
            } else if (
                this.player.findPerk(PerkLib.BeeOvipositor) >= 0 &&
                this.player.tailType != TAIL_TYPE_BEE_ABDOMEN
            ) {
                // Remove dat shit!
                this.outx(
                    "\nYour ovipositor (and eggs) vanish since your body has become less bee-like.</b>\n"
                );
                this.player.removePerk(PerkLib.BeeOvipositor);
                needNext = true;
            } else {
                // Update stuff!
                const prevEggs: number = this.player.eggs();
                if (prevEggs < 10) {
                    this.player.addEggs(2);
                } else if (prevEggs < 20 && this.getGame().model.time.hours % 2 == 0) {
                    this.player.addEggs(1);
                } else if (this.getGame().model.time.hours % 4 == 0) {
                    this.player.addEggs(1);
                }
                if (prevEggs < 10 && this.player.eggs() >= 10) {
                    // Stage 1 egg message
                    if (this.player.findPerk(PerkLib.SpiderOvipositor) >= 0) {
                        this.outx(
                            "\nYou feel a certain fullness building in your spider-half's abdomen."
                        );
                    } else {
                        this.outx(
                            "\nYou feel a certain fullness building in your insectile abdomen.  You have some eggs ready... and you feel a strange urge to have them fertilized."
                        );
                        if (!this.player.hasVagina())
                            this.outx("  Wait, how would you even go about that?");
                    }
                    this.outx("  <b>You have enough eggs to lay!</b>\n");
                    needNext = true;
                } else if (prevEggs < 20 && this.player.eggs() >= 20) {
                    // Stage 2 egg message
                    if (this.player.findPerk(PerkLib.SpiderOvipositor) >= 0) {
                        this.outx(
                            "\nYour spider body feels like it's stretched taut, and a heavy warmth has spread throughout it.  The sensation of eggs piling up inside you is enough to drive you to distraction.  It would be a good idea to find somewhere to deposit them - but, oh, how great it would feel to get them fertilized by a nice hard cock first!"
                        );
                        if (!this.player.hasVagina()) this.outx("  Wait, that's not right...");
                    } else {
                        this.outx(
                            "\nYour abdomen feels like it's stretched taut, and a heavy warmth has spread throughout it.  It swings pendulously with every movement you make, and the sensation of eggs piling up inside you is enough to drive you to distraction."
                        );
                    }
                    this.outx("\n\n<b>Minimum Lust raised!</b>\n");
                    needNext = true;
                } else if (prevEggs < 40 && this.player.eggs() >= 40) {
                    // Stage 3 egg message
                    if (this.player.findPerk(PerkLib.SpiderOvipositor) >= 0) {
                        this.outx(
                            "\nYour lower half has become so heavy that it's difficult to move now, the weight of your eggs bearing down on your lust-addled frame.  Your ovipositor pokes from its hiding place, dripping its slick lubrication in anticipation of filling something, anything with its burden.  You're going to have to find someone to help relieve you of your load, and soon...\n\n<b>Minimum Lust raised!</b>\n"
                        );
                    } else {
                        this.outx(
                            "\nYour bee half has become so heavy that it's difficult to move now, the weight of your eggs bearing down on your lust-addled frame.  Your ovipositor pokes from its hiding place, dripping its sweet, slick lubrication in anticipation of filling something, anything with its burden.  You're going to have to find someone to help relieve you of your load, and soon...\n"
                        );
                    }
                    this.getGame().dynStats("spe", -1);
                    needNext = true;
                }
            }
        }
        if (
            this.player.findPerk(PerkLib.Oviposition) >= 0 ||
            this.player.findPerk(PerkLib.BunnyEggs) >= 0
        ) {
            // Oviposition perk for lizard and bunny folks
            if (
                this.player.nagaScore() + this.player.lizardScore() < 3 &&
                this.player.findPerk(PerkLib.Oviposition) >= 0 &&
                this.player.findPerk(PerkLib.BasiliskWomb) < 0
            ) {
                // --Lose Oviposition perk if lizard score gets below 3.
                this.outx(
                    "\nAnother change in your uterus ripples through your reproductive systems.  Somehow you know you've lost a little bit of reptilian reproductive ability.\n(<b>Perk Lost: Oviposition</b>)\n"
                );
                this.player.removePerk(PerkLib.Oviposition);
                needNext = true;
            } else if (
                this.player.bunnyScore() < 3 &&
                this.player.findPerk(PerkLib.BunnyEggs) >= 0
            ) {
                // --Lose Oviposition perk if bunny score gets below 3.
                this.outx(
                    "\nAnother change in your uterus ripples through your reproductive systems.  Somehow you know you've lost your ability to spontaneously lay eggs.\n(<b>Perk Lost: Bunny Eggs</b>)\n"
                );
                this.player.removePerk(PerkLib.BunnyEggs);
                needNext = true;
            } else if (
                this.player.pregnancyIncubation < 1 &&
                this.player.hasVagina() &&
                this.getGame().model.time.hours == 1
            ) {
                // Otherwise pregger check, once every morning
                if (
                    (this.player.totalFertility() > 50 &&
                        this.getGame().model.time.days % 15 == 0) ||
                    this.getGame().model.time.days % 30 == 0
                ) {
                    // every 15 days if high fertility get egg preg
                    this.outx(
                        "\n<b>Somehow you know that eggs have begun to form inside you.  You wonder how long it will be before they start to show?</b>\n"
                    );
                    this.player.knockUp(
                        PregnancyStore.PREGNANCY_OVIELIXIR_EGGS,
                        PregnancyStore.INCUBATION_OVIELIXIR_EGGS,
                        1,
                        1
                    );
                    this.player.createStatusAffect(
                        StatusAffects.Eggs,
                        PlayerEvents.rand(6),
                        PlayerEvents.rand(2),
                        5 + PlayerEvents.rand(3),
                        0
                    ); // v1 is type, v2 is size (1 == large) and v3 is quantity
                    this.player.addPerkValue(PerkLib.Oviposition, 1, 1); // Count times eggpregged this way in perk.
                    needNext = true;
                }
            }
        }
        if (this.player.inHeat) {
            // Heats v1 is bonus fertility, v2 is bonus libido, v3 is hours till it's gone
            if (
                this.player.statusAffectv3(StatusAffects.Heat) <= 1 ||
                this.player.vaginas.length == 0
            ) {
                // Remove bonus libido from heat
                this.getGame().dynStats(
                    "lib",
                    -this.player.statusAffect(this.player.findStatusAffect(StatusAffects.Heat))
                        .value2,
                    "resisted",
                    false,
                    "noBimbo",
                    true
                );
                this.player.removeStatusAffect(StatusAffects.Heat); // remove heat
                if (this.player.lib < 1) this.player.lib = 1;
                this.getGame().statScreenRefresh();
                this.outx("\n<b>Your body calms down, at last getting over your heat.</b>\n");
                needNext = true;
            } else this.player.addStatusValue(StatusAffects.Heat, 3, -1);
        }

        if (this.player.inRut) {
            // Rut v1 is bonus cum, v2 is bonus libido, v3 is hours till it's gone
            trace(`RUT:${this.player.statusAffectv3(StatusAffects.Rut)}`);
            if (
                this.player.statusAffectv3(StatusAffects.Rut) <= 1 ||
                this.player.totalCocks() == 0
            ) {
                // Remove bonus libido from rut
                this.getGame().dynStats(
                    "lib",
                    -this.player.statusAffectv2(StatusAffects.Rut),
                    "resisted",
                    false,
                    "noBimbo",
                    true
                );
                this.player.removeStatusAffect(StatusAffects.Rut); // remove heat
                if (this.player.lib < 10) this.player.lib = 10;
                this.getGame().statScreenRefresh();
                this.outx("\n<b>Your body calms down, at last getting over your rut.</b>\n");
                needNext = true;
            } else this.player.addStatusValue(StatusAffects.Rut, 3, -1);
        }
        if (this.player.findStatusAffect(StatusAffects.LustyTongue) >= 0) {
            // Lusty Tongue Check!
            if (PlayerEvents.rand(5) == 0) {
                this.outx(
                    "\nYou keep licking your lips, blushing with the sexual pleasure it brings you."
                );
                this.getGame().dynStats("lus", 2 + PlayerEvents.rand(15));
                if (this.player.lust >= 100) {
                    this.outx(
                        "  Your knees lock from the pleasure, and you fall back in pleasure, twisting and moaning like a whore as you somehow orgasm from your mouth.  When it finishes, you realize your mouth feels even more sensitive than before."
                    );
                    this.player.orgasm();
                    this.getGame().dynStats("sen", 2);
                    this.player.changeStatusValue(
                        StatusAffects.LustyTongue,
                        1,
                        this.player.statusAffectv1(StatusAffects.LustyTongue) + 10
                    ); // Tongue orgasming makes it last longer.
                }
                this.outx("\n");
                needNext = true;
            }
            this.player.changeStatusValue(
                StatusAffects.LustyTongue,
                1,
                this.player.statusAffectv1(StatusAffects.LustyTongue) - 1
            ); // Decrement
            if (this.player.statusAffectv1(StatusAffects.LustyTongue) <= 0) {
                this.player.removeStatusAffect(StatusAffects.LustyTongue);
                this.outx("\nYour mouth and tongue return to normal.\n");
                needNext = true;
            }
        }
        if (this.player.statusAffectv2(StatusAffects.Kelt) > 0)
            this.player.addStatusValue(StatusAffects.Kelt, 2, -0.15); // Reduce kelt submissiveness by 1 every 5 hours
        // Mino cum update.
        if (this.getGame().mountain.minotaurScene.minoCumUpdate()) {
            needNext = true;
        } else if (
            this.flags[kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] >= 2 &&
            this.getGame().model.time.hours % 13 == 0 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00330] == 0
        ) {
            // Repeated warnings!
            if (this.flags[kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] == 2)
                this.outx(
                    "\n<b>You shiver, feeling a little cold.  Maybe you ought to get some more minotaur cum?  You just don't feel right without that pleasant buzz in the back of your mind.</b>\n"
                );
            else if (this.flags[kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] == 3)
                this.outx(
                    "\n<b>The steady fire of lust within you burns hot, making you shiver and grab at your head.  You're STILL in withdrawal after having gone so long without a dose of minotaur love.  You just know you're going to be horny and achy until you get some.</b>\n"
                );
            needNext = true;
        }
        // Decrement mino withdrawal symptoms display cooldown
        // flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00330] prevents PC getting two of the same notices overnite
        else if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00330] > 0)
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00330]--;
        if (this.player.findPerk(PerkLib.FutaForm) >= 0) {
            // Futa checks
            if (!this.player.hasCock()) {
                // (Dick regrowth)
                this.player.createCock();
                this.player.cocks[0].cockLength = 10;
                this.player.cocks[0].cockThickness = 2.75;
                this.outx(
                    "\n<b>As time passes, your loins grow itchy for a moment.  A split-second later, a column of flesh erupts from your crotch.  Your new, 10-inch cock pulses happily."
                );
                if (this.player.balls == 0) {
                    this.outx(
                        "  A pair of heavy balls drop into place below it, churning to produce cum."
                    );
                    this.player.balls = 2;
                    this.player.ballSize = 3;
                }
                this.getGame().dynStats("int", -1, "sen", 5, "lus", 15);
                this.outx("</b>\n");
                needNext = true;
            }
            if (this.player.cocks[0].cockLength < 8) {
                // (Dick rebiggening)
                this.outx(
                    "\n<b>As time passes, your cock engorges, flooding with blood and growing until it's at 8 inches long.  You really have no control over your dick.</b>\n"
                );
                this.player.cocks[0].cockLength = 8;
                if (this.player.cocks[0].cockThickness < 2) this.player.cocks[0].cockThickness = 2;
                needNext = true;
            }
            if (this.player.balls == 0) {
                // (Balls regrowth)
                this.outx(
                    `\n<b>As time passes, a pressure in your loins intensifies to near painful levels.  The skin beneath ${this.player.sMultiCockDesc()} grows loose and floppy, and then two testicles roll down to fill your scrotum.</b>\n`
                );
                this.player.balls = 2;
                this.player.ballSize = 3;
                needNext = true;
            }
            if (this.player.breastRows[0].breastRating < 5) {
                // Tits!
                this.player.breastRows[0].breastRating = 5;
                if (this.player.findPerk(PerkLib.FutaFaculties) >= 0)
                    this.outx(
                        "\n<b>Your tits get nice and full again.  You'll have lots of fun now that your breasts are back to being big, swollen knockers!</b>\n"
                    );
                else
                    this.outx(
                        `\n<b>Your ${this.getGame().breastDescript(
                            0
                        )} have regained their former bimbo-like size.  It looks like you'll be stuck with large, sensitive breasts forever, but at least it'll help you tease your enemies into submission!</b>\n`
                    );
                this.getGame().dynStats("int", -1, "lus", 15);
                needNext = true;
            }
            if (!this.player.hasVagina()) {
                // Vagoo
                this.player.createVagina();
                if (this.player.findPerk(PerkLib.FutaFaculties) >= 0)
                    this.outx(
                        "\n<b>Your crotch is like, all itchy an' stuff.  Damn!  There's a wet little slit opening up, and it's all tingly!  It feels so good, why would you have ever gotten rid of it?</b>\n"
                    );
                else
                    this.outx(
                        `\n<b>Your crotch tingles for a second, and when you reach down to feel, your ${this.player.legs()} fold underneath you, limp.  You've got a vagina - the damned thing won't go away and it feels twice as sensitive this time.  Fucking bimbo liquer.</b>\n`
                    );
                this.getGame().dynStats("int", -1, "sen", 10, "lus", 15);
                needNext = true;
            }
        }
        if (
            this.player.findPerk(PerkLib.BimboBody) >= 0 ||
            this.player.findStatusAffect(StatusAffects.BimboChampagne) >= 0
        ) {
            // Bimbo checks
            if (this.player.breastRows[0].breastRating < 5) {
                // Tits!
                this.player.breastRows[0].breastRating = 5;
                if (
                    this.player.findPerk(PerkLib.BimboBrains) >= 0 ||
                    this.player.findStatusAffect(StatusAffects.BimboChampagne) >= 0
                )
                    this.outx(
                        "\n<b>Your boobies like, get all big an' wobbly again!  You'll have lots of fun now that your tits are back to being big, yummy knockers!</b>\n"
                    );
                else
                    this.outx(
                        `\n<b>Your ${this.getGame().breastDescript(
                            0
                        )} have regained their former bimbo-like size.  It looks like you'll be stuck with large, sensitive breasts forever, but at least it'll help you tease your enemies into submission!</b>\n`
                    );
                this.getGame().dynStats("int", -1, "lus", 15);
                needNext = true;
            }
            if (!this.player.hasVagina()) {
                // Vagoo
                this.player.createVagina();
                if (
                    this.player.findPerk(PerkLib.BimboBrains) >= 0 ||
                    this.player.findStatusAffect(StatusAffects.BimboChampagne) >= 0
                )
                    this.outx(
                        "\n<b>Your crotch is like, all itchy an' stuff.  Omigawsh!  There's a wet little slit opening up, and it's all tingly!  It feels so good, maybe like, someone could put something inside there!</b>\n"
                    );
                else
                    this.outx(
                        `\n<b>Your crotch tingles for a second, and when you reach down to feel, your ${this.player.legs()} fold underneath you, limp.  You've got a vagina - the damned thing won't go away and it feels twice as sensitive this time.  Fucking bimbo liquer.</b>\n`
                    );
                needNext = true;
            }
            if (this.player.hipRating < 12) {
                if (
                    this.player.findPerk(PerkLib.BimboBrains) >= 0 ||
                    this.player.findPerk(PerkLib.FutaFaculties) >= 0
                )
                    this.outx(
                        "\nWhoah!  As you move, your [hips] sway farther and farther to each side, expanding with every step, soft new flesh filling in as your hips spread into something more appropriate on a tittering bimbo.  You giggle when you realize you can't walk any other way.  At least it makes you look, like, super sexy!\n"
                    );
                else
                    this.outx(
                        "\nOh, no!  As you move, your [hips] sway farther and farther to each side, expanding with every step, soft new flesh filling in as your hips spread into something more appropriate for a bimbo.  Once you realize that you can't walk any other way, you sigh heavily, your only consolation the fact that your widened hips can be used to tease more effectively.\n"
                    );
                this.getGame().dynStats("int", -1);
                this.player.hipRating = 12;
                needNext = true;
            }
            if (this.player.buttRating < 12) {
                if (
                    this.player.findPerk(PerkLib.BimboBrains) >= 0 ||
                    this.player.findPerk(PerkLib.FutaFaculties) >= 0
                )
                    this.outx(
                        "\nGradually warming, you find that your [butt] is practically sizzling with erotic energy.  You smile to yourself, imagining how much you wish you had a nice, plump, bimbo-butt again, your hands finding their way to the flesh on their own.  Like, how did they get down there?  You bite your lip when you realize how good your tush feels in your hands, particularly when it starts to get bigger.  Are butts supposed to do that?  Happy pink thoughts wash that concern away - it feels good, and you want a big, sexy butt!  The growth stops eventually, and you pout disconsolately when the lusty warmth's last lingering touches dissipate.  Still, you smile when you move and feel your new booty jiggling along behind you.  This will be fun!\n"
                    );
                else
                    this.outx(
                        "\nGradually warming, you find that your [butt] is practically sizzling with erotic energy.  Oh, no!  You thought that having a big, bloated bimbo-butt was a thing of the past, but with how it's tingling under your groping fingertips, you have no doubt that you're about to see the second coming of your sexy ass.  Wait, how did your fingers get down there?  You pull your hands away somewhat guiltily as you feel your buttcheeks expanding.  Each time you bounce and shake your new derriere, you moan softly in enjoyment.  Damnit!  You force yourself to stop just as your ass does, but when you set off again, you can feel it bouncing behind you with every step.  At least it'll help you tease your foes a little more effectively...\n"
                    );
                this.getGame().dynStats("int", -1, "lus", 10);
                this.player.buttRating = 12;
                needNext = true;
            }
        }
        if (this.player.findPerk(PerkLib.BroBody) >= 0) {
            // Bro checks
            this.player.removeStatusAffect(StatusAffects.Feeder);
            this.player.removePerk(PerkLib.Feeder);
            if (!this.player.hasCock()) {
                // (Dick regrowth)
                this.player.createCock();
                this.player.cocks[0].cockLength = 10;
                this.player.cocks[0].cockThickness = 2.75;
                this.outx(
                    "\n<b>As time passes, your loins grow itchy for a moment.  A split-second later, a column of flesh erupts from your crotch.  Your new, 10-inch cock pulses happily."
                );
                if (this.player.balls == 0) {
                    this.outx(
                        "  A pair of heavy balls drop into place below it, churning to produce cum."
                    );
                    this.player.balls = 2;
                    this.player.ballSize = 3;
                }
                this.outx("</b>\n");
                needNext = true;
            }
            if (this.player.cocks[0].cockLength < 10) {
                // (Dick rebiggening)
                this.outx(
                    "\n<b>As time passes, your cock engorges, flooding with blood and growing until it's at 10 inches long.  "
                );
                if (this.player.findPerk(PerkLib.BroBrains) >= 0)
                    this.outx("Goddamn, that thing is almost as tough as you!  ");
                this.outx("You really have no control over your dick.</b>\n");
                this.player.cocks[0].cockLength = 10;
                if (this.player.cocks[0].cockThickness < 2) this.player.cocks[0].cockThickness = 2;
                needNext = true;
            }
            if (this.player.balls == 0) {
                // (Balls regrowth)
                this.outx(
                    `\n<b>As time passes, a pressure in your loins intensifies to near painful levels.  The skin beneath ${this.player.sMultiCockDesc()} grows loose and floppy, and then two testicles roll down to fill your scrotum.</b>\n`
                );
                this.player.balls = 2;
                this.player.ballSize = 3;
                needNext = true;
            }
        }
        if (this.player.findStatusAffect(StatusAffects.Feeder) >= 0) {
            // Feeder checks
            if (this.player.cor <= 20) {
                // Go away if pure
                this.outx(
                    "\nThe desire to breastfeed fades into the background.  It must have been associated with the corruption inside you.\n\n(<b>You have lost the 'Feeder' perk.</b>)\n"
                );
                this.player.removeStatusAffect(StatusAffects.Feeder);
                this.player.removePerk(PerkLib.Feeder);
                needNext = true;
            } else {
                // Bigga titayz
                if (this.player.breastRows[0].breastRating < 5) {
                    this.outx(
                        `\nYour ${this.getGame().breastDescript(
                            0
                        )} start to jiggle and wobble as time passes, seeming to refill with your inexhaustible supply of milk.  It doesn't look like you'll be able to keep them below a DD cup so long as you're so focused on breast-feeding.\n`
                    );
                    this.player.breastRows[0].breastRating = 5;
                    needNext = true;
                }
                this.player.addStatusValue(StatusAffects.Feeder, 2, 1); // Increase 'time since breastfed'
                // trace("Feeder status: " + player.statusAffectv2(StatusAffects.Feeder) + " (modded " + ((player.statusAffectv2(StatusAffects.Feeder)) - 70) + ")");
                // After 3 days without feeding someone sensitivity jumps.
                if (
                    this.player.statusAffectv2(StatusAffects.Feeder) >= 72 &&
                    this.getGame().model.time.hours == 14
                ) {
                    this.outx(
                        "\n<b>After having gone so long without feeding your milk to someone, you're starting to feel strange.  Every inch of your skin practically thrums with sensitivity, particularly your sore, dripping nipples.</b>\n"
                    );
                    this.getGame().dynStats(
                        "sen",
                        2 + (this.player.statusAffectv2(StatusAffects.Feeder) - 70) / 20
                    );
                    needNext = true;
                }
            }
        }
        if (
            this.player.findStatusAffect(StatusAffects.WormPlugged) >= 0 &&
            this.flags[kFLAGS.PLAYER_PREGGO_WITH_WORMS] == 0
        ) {
            // Update worm drippy-cooch
            if (this.player.hasVagina()) {
                if (PlayerEvents.rand(5) == 0) {
                    this.flags[kFLAGS.PLAYER_PREGGO_WITH_WORMS] = 1;
                    this.outx(
                        "\nA sudden gush of semen-coated worms noisily slurps out of your womb.  It runs down your legs as the worms do their damnedest to escape.  The feeling of so many squiggling forms squirting through your cunt-lips turns you on more than you'd like to admit.  You wonder why they stayed as long as they did, and some part of you worries that their stay may have reduced your capacity to bear children, though in a place like this that might be a blessing.\n"
                    );
                    this.getGame().dynStats("lus", 2 + this.player.sens / 10);
                    if (this.player.fertility > 5)
                        this.player.fertility -= 1 + Math.round(this.player.fertility / 4);
                    this.player.addStatusValue(StatusAffects.WormPlugged, 1, -1); // Lower chances
                    if (this.player.statusAffectv1(StatusAffects.WormPlugged) <= 0) {
                        // Remove if too low
                        this.player.removeStatusAffect(StatusAffects.WormPlugged);
                        this.player.knockUpForce(); // Clear worm 'pregnancy'
                    }
                    needNext = true;
                }
            } else {
                // Non cunts lose worm plugged
                this.player.removeStatusAffect(StatusAffects.WormPlugged);
                this.player.knockUpForce(); // Clear worm 'pregnancy'
            }
        }
        if (this.player.findStatusAffect(StatusAffects.Milked) >= 0) {
            // "Milked"
            this.player.addStatusValue(StatusAffects.Milked, 1, -1);
            if (this.player.statusAffectv1(StatusAffects.Milked) <= 0) {
                this.outx(
                    `\n<b>Your ${this.getGame().nippleDescript(
                        0
                    )}s are no longer sore from the milking.</b>\n`
                );
                this.player.removeStatusAffect(StatusAffects.Milked);
                needNext = true;
            }
        }
        if (this.player.findStatusAffect(StatusAffects.Jizzpants) >= 0) {
            this.outx(
                `\nYour ${this.player.armorName} squishes wetly with all the semen you unloaded into them, arousing you more and more with every movement.\n`
            );
            this.getGame().dynStats("lus", 10 + this.player.sens / 5);
            this.player.removeStatusAffect(StatusAffects.Jizzpants);
            needNext = true;
        }
        if (this.player.findStatusAffect(StatusAffects.Dysfunction) >= 0) {
            if (this.player.statusAffectv1(StatusAffects.Dysfunction) <= 1) {
                this.player.removeStatusAffect(StatusAffects.Dysfunction);
                this.outx(
                    "\nYou feel a tingling in your nethers... at last full sensation has returned to your groin.  <b>You can masturbate again!</b>\n"
                );
                needNext = true;
            } else this.player.addStatusValue(StatusAffects.Dysfunction, 1, -1);
        }
        if (this.player.findStatusAffect(StatusAffects.LactationReduction) < 0) {
            // Lactation reduction
            if (this.player.biggestLactation() > 0)
                this.player.createStatusAffect(StatusAffects.LactationReduction, 0, 0, 0, 0);
        } else if (
            this.player.biggestLactation() > 0 &&
            this.player.findStatusAffect(StatusAffects.Feeder) < 0 &&
            this.player.pregnancyIncubation == 0
        ) {
            this.player.addStatusValue(StatusAffects.LactationReduction, 1, 1);
            if (this.player.statusAffectv1(StatusAffects.LactationReduction) >= 48) {
                if (this.player.findStatusAffect(StatusAffects.LactationReduc0) < 0) {
                    this.player.createStatusAffect(StatusAffects.LactationReduc0, 0, 0, 0, 0);
                    if (this.player.biggestLactation() >= 1)
                        this.outx(
                            `\n<b>Your ${this.getGame().nippleDescript(
                                0
                            )}s feel swollen and bloated, needing to be milked.</b>\n`
                        );
                    if (this.player.biggestLactation() <= 2)
                        this.player.createStatusAffect(StatusAffects.LactationReduc1, 0, 0, 0, 0);
                    if (this.player.biggestLactation() <= 1)
                        this.player.createStatusAffect(StatusAffects.LactationReduc2, 0, 0, 0, 0);
                    needNext = true;
                }
                this.player.boostLactation((-0.5 * this.player.breastRows.length) / 24);
                if (
                    this.player.biggestLactation() <= 2.5 &&
                    this.player.findStatusAffect(StatusAffects.LactationReduc1) < 0
                ) {
                    this.outx(
                        "\n<b>Your breasts feel lighter as your body's milk production winds down.</b>\n"
                    );
                    this.player.createStatusAffect(StatusAffects.LactationReduc1, 0, 0, 0, 0);
                    needNext = true;
                } else if (
                    this.player.biggestLactation() <= 1.5 &&
                    this.player.findStatusAffect(StatusAffects.LactationReduc2) < 0
                ) {
                    this.outx(
                        "\n<b>Your body's milk output drops down to what would be considered 'normal' for a pregnant woman.</b>\n"
                    );
                    this.player.createStatusAffect(StatusAffects.LactationReduc2, 0, 0, 0, 0);
                    needNext = true;
                }
                if (
                    this.player.biggestLactation() < 1 &&
                    this.player.findStatusAffect(StatusAffects.LactationReduc3) < 0
                ) {
                    this.player.createStatusAffect(StatusAffects.LactationReduc3, 0, 0, 0, 0);
                    this.outx("\n<b>Your body no longer produces any milk.</b>\n");
                    this.player.removeStatusAffect(StatusAffects.LactationReduction);
                    needNext = true;
                }
            }
        }
        if (this.player.findStatusAffect(StatusAffects.CuntStretched) >= 0) {
            // Cunt stretching stuff
            this.player.addStatusValue(StatusAffects.CuntStretched, 1, 1);
            if (this.player.vaginas.length > 0) {
                if (this.player.findPerk(PerkLib.FerasBoonWideOpen) < 0) {
                    if (
                        this.player.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_LOOSE &&
                        this.player.statusAffectv1(StatusAffects.CuntStretched) >= 200
                    ) {
                        this.outx(
                            `\nYour ${this.getGame().vaginaDescript(
                                0
                            )} recovers from your ordeals, tightening up a bit.\n`
                        );
                        this.player.vaginas[0].vaginalLooseness--;
                        this.player.changeStatusValue(StatusAffects.CuntStretched, 1, 0);
                        needNext = true;
                    }
                    if (
                        this.player.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_GAPING &&
                        this.player.statusAffectv1(StatusAffects.CuntStretched) >= 100
                    ) {
                        this.outx(
                            `\nYour ${this.getGame().vaginaDescript(
                                0
                            )} recovers from your ordeals, tightening up a bit.\n`
                        );
                        this.player.vaginas[0].vaginalLooseness--;
                        this.player.changeStatusValue(StatusAffects.CuntStretched, 1, 0);
                        needNext = true;
                    }
                    if (
                        this.player.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_GAPING_WIDE &&
                        this.player.statusAffectv1(StatusAffects.CuntStretched) >= 70
                    ) {
                        this.outx(
                            `\nYour ${this.getGame().vaginaDescript(
                                0
                            )} recovers from your ordeals and becomes tighter.\n`
                        );
                        this.player.vaginas[0].vaginalLooseness--;
                        this.player.changeStatusValue(StatusAffects.CuntStretched, 1, 0);
                        needNext = true;
                    }
                }
                if (
                    this.player.vaginas[0].vaginalLooseness == VAGINA_LOOSENESS_LEVEL_CLOWN_CAR &&
                    this.player.statusAffectv1(StatusAffects.CuntStretched) >= 50
                ) {
                    this.outx(
                        `\nYour ${this.getGame().vaginaDescript(
                            0
                        )} recovers from the brutal stretching it has received and tightens up a little bit, but not much.\n`
                    );
                    this.player.vaginas[0].vaginalLooseness--;
                    this.player.changeStatusValue(StatusAffects.CuntStretched, 1, 0);
                    needNext = true;
                }
            }
        }
        if (this.player.findStatusAffect(StatusAffects.ButtStretched) >= 0) {
            // Butt stretching stuff
            this.player.addStatusValue(StatusAffects.ButtStretched, 1, 1);
            if (
                this.player.ass.analLooseness == 2 &&
                this.player.statusAffectv1(StatusAffects.ButtStretched) >= 72
            ) {
                this.outx(
                    `\n<b>Your ${this.getGame().assholeDescript()} recovers from your ordeals, tightening up a bit.</b>\n`
                );
                this.player.ass.analLooseness--;
                this.player.changeStatusValue(StatusAffects.ButtStretched, 1, 0);
                needNext = true;
            }
            if (
                this.player.ass.analLooseness == 3 &&
                this.player.statusAffectv1(StatusAffects.ButtStretched) >= 48
            ) {
                this.outx(
                    `\n<b>Your ${this.getGame().assholeDescript()} recovers from your ordeals, tightening up a bit.</b>\n`
                );
                this.player.ass.analLooseness--;
                this.player.changeStatusValue(StatusAffects.ButtStretched, 1, 0);
                needNext = true;
            }
            if (
                this.player.ass.analLooseness == 4 &&
                this.player.statusAffectv1(StatusAffects.ButtStretched) >= 24
            ) {
                this.outx(
                    `\n<b>Your ${this.getGame().assholeDescript()} recovers from your ordeals and becomes tighter.</b>\n`
                );
                this.player.ass.analLooseness--;
                this.player.changeStatusValue(StatusAffects.ButtStretched, 1, 0);
                needNext = true;
            }
            if (
                this.player.ass.analLooseness == 5 &&
                this.player.statusAffectv1(StatusAffects.ButtStretched) >= 12
            ) {
                this.outx(
                    `\n<b>Your ${this.getGame().assholeDescript()} recovers from the brutal stretching it has received and tightens up.</b>\n`
                );
                this.player.ass.analLooseness--;
                this.player.changeStatusValue(StatusAffects.ButtStretched, 1, 0);
                needNext = true;
            }
        }
        if (this.player.findPerk(PerkLib.SlimeCore) >= 0) {
            // Lose slime core perk
            if (
                this.player.vaginalCapacity() < 9000 ||
                this.player.skinAdj != "slimy" ||
                this.player.skinDesc != "skin" ||
                this.player.lowerBody != LOWER_BODY_TYPE_GOO
            ) {
                this.outx(
                    `\nYour form ripples, as if uncertain at the changes your body is undergoing.  The goo of your flesh cools, its sensitive, responsive membrane thickening into ${this.player.skin()} while bones and muscles knit themselves into a cohesive torso, chest and hips gaining definition.  Translucent ooze clouds and the gushing puddle at your feet melts together, splitting into solid trunks as you regain your legs.  Before long, you can no longer see through your own body and, with an unsteady shiver, you pat yourself down, readjusting to solidity.  A lurching heat in your chest suddenly reminds you of the slime core that used to float inside you.  Gingerly touching your ${this.getGame().chestDesc()}, you can feel a small, second heartbeat under your ribs that gradually seems to be sinking, past your belly. A lurching wave of warmth sparks through you, knocking you off your fresh legs and onto your ${this.getGame().buttDescript()}.  A delicious pressure pulses in your abdomen and you loosen your ${
                        this.player.armorName
                    } as sweat beads down your neck.  You clench your eyes, tongue lolling in your mouth, and the pressure builds and builds until, in ecstatic release, your body arches in an orgasmic release.\n\n`
                );

                this.outx(
                    "\nPanting, you open your eyes and see that, for once, the source of your climax wasn't your loins.  Feeling a warm, wetness on your abs, you investigate and find the small, heart-shaped nucleus that used to be inside your body has somehow managed to pass through your belly button. Exposed to the open air, the crimson organ slowly crystallizes, shrinking and hardening into a tiny ruby.  Rubbing the stone with your thumb, you're surprised to find that you can still feel a pulse within its glittering facets.  You stow the ruby heart, in case you need it again.\n"
                );
                this.player.createKeyItem("Ruby Heart", 0, 0, 0, 0); // [Add 'Ruby Heart' to key items. Player regains slime core if returning to goo body]
                this.player.removePerk(PerkLib.SlimeCore);
                needNext = true;
            }
        }
        if (this.player.hasKeyItem("Ruby Heart") >= 0) {
            // Regain slime core
            if (
                this.player.findStatusAffect(StatusAffects.SlimeCraving) >= 0 &&
                this.player.findPerk(PerkLib.SlimeCore) < 0 &&
                this.player.isGoo() &&
                this.player.gooScore() >= 4 &&
                this.player.vaginalCapacity() >= 9000 &&
                this.player.skinAdj == "slimy" &&
                this.player.skinDesc == "skin" &&
                this.player.lowerBody == LOWER_BODY_TYPE_GOO
            ) {
                this.outx(
                    "\nAs you adjust to your new, goo-like body, you remember the ruby heart you expelled so long ago.  As you reach to pick it up, it quivers and pulses with a warm, cheerful light.  Your fingers close on it and the nucleus slides through your palm, into your body!\n\n"
                );

                this.outx(
                    "There is a momentary pressure in your chest and a few memories that are not your own flicker before your eyes.  The dizzying sight passes and the slime core settles within your body, imprinted with your personality and experiences.  There is a comforting calmness from your new nucleus and you feel as though, with your new memories, you will be better able to manage your body's fluid requirements.\n"
                );
                // (Reduces Fluid Addiction to a 24 hour intake requirement).
                this.outx(
                    "(<b>Gained New Perk: Slime Core - Moisture craving builds at a greatly reduced rate.</b>\n)"
                );
                this.player.createPerk(PerkLib.SlimeCore, 0, 0, 0, 0);
                this.player.removeKeyItem("Ruby Heart");
                needNext = true;
            }
        }
        if (this.player.findStatusAffect(StatusAffects.SlimeCraving) >= 0) {
            // Slime craving stuff
            if (
                this.player.vaginalCapacity() < 9000 ||
                this.player.skinAdj != "slimy" ||
                this.player.skinDesc != "skin" ||
                this.player.lowerBody != LOWER_BODY_TYPE_GOO
            ) {
                this.outx("\n<b>You realize you no longer crave fluids like you once did.</b>\n");
                this.player.removeStatusAffect(StatusAffects.SlimeCraving);
                this.player.removeStatusAffect(StatusAffects.SlimeCravingFeed);
                needNext = true;
            } else {
                // Slime core reduces fluid need rate
                if (this.player.findPerk(PerkLib.SlimeCore) >= 0)
                    this.player.addStatusValue(StatusAffects.SlimeCraving, 1, 0.5);
                else this.player.addStatusValue(StatusAffects.SlimeCraving, 1, 1);
                if (this.player.statusAffectv1(StatusAffects.SlimeCraving) >= 18) {
                    if (this.player.findStatusAffect(StatusAffects.SlimeCravingOutput) < 0) {
                        // Protects against this warning appearing multiple times in the output
                        this.player.createStatusAffect(
                            StatusAffects.SlimeCravingOutput,
                            0,
                            0,
                            0,
                            0
                        );
                        this.outx(
                            "\n<b>Your craving for the 'fluids' of others grows strong, and you feel yourself getting weaker and slower with every passing hour.</b>\n"
                        );
                        needNext = true;
                    }
                    if (this.player.spe > 1)
                        this.player.addStatusValue(StatusAffects.SlimeCraving, 3, 0.1); // Keep track of how much has been taken from speed
                    this.getGame().dynStats("str", -0.1, "spe", -0.1, "lus", 2);
                    this.player.addStatusValue(StatusAffects.SlimeCraving, 2, 0.1); // Keep track of how much has been taken from strength
                }
            }
        }
        if (this.player.findStatusAffect(StatusAffects.SlimeCravingFeed) >= 0) {
            // Slime feeding stuff
            this.outx(
                "\n<b>You feel revitalized from your recent intake, but soon you'll need more...</b>\n"
            );
            this.getGame().dynStats(
                "str",
                this.player.statusAffectv2(StatusAffects.SlimeCraving) * 0.5,
                "spe",
                this.player.statusAffectv3(StatusAffects.SlimeCraving)
            ); // Boost speed and restore half the player's lost strength
            this.player.removeStatusAffect(StatusAffects.SlimeCravingFeed); // Remove feed succuss status so it can be reset
            this.player.changeStatusValue(StatusAffects.SlimeCraving, 2, 0); // Reset stored hp/toughness values
            needNext = true;
        }
        if (
            this.getGame().model.time.hours == 6 &&
            this.player.armorName == "bimbo skirt" &&
            PlayerEvents.rand(10) == 0
        ) {
            this.outx(
                "\n<b>As you wake up, you feel a strange tingling starting in your nipples that extends down into your breasts.  After a minute, the tingling dissipates in a soothing wave.  As you cup your tits, you realize they've gotten larger!</b>"
            );
            this.player.growTits(1, this.player.bRows(), false, 2);
            this.getGame().dynStats("lus", 10);
            needNext = true;
        }
        if (this.flags[kFLAGS.BIKINI_ARMOR_BONUS] > 0) {
            if (this.player.armorName == "lusty maiden's armor") {
                if (this.getGame().model.time.hours == 0) this.flags[kFLAGS.BIKINI_ARMOR_BONUS]--; // Adjust for inflation
                if (this.flags[kFLAGS.BIKINI_ARMOR_BONUS] < 0)
                    this.flags[kFLAGS.BIKINI_ARMOR_BONUS] = 0; // Keep in bounds.
                if (this.flags[kFLAGS.BIKINI_ARMOR_BONUS] > 8)
                    this.flags[kFLAGS.BIKINI_ARMOR_BONUS] = 8;
            } else this.flags[kFLAGS.BIKINI_ARMOR_BONUS] = 0;
        }

        // No better place for these since the code for the event is part of CoC.as or one of its included files
        if (this.flags[kFLAGS.TIME_SINCE_VALA_ATTEMPTED_RAPE_PC] > 0)
            this.flags[kFLAGS.TIME_SINCE_VALA_ATTEMPTED_RAPE_PC]--; // Vala post-rape countdown
        if (
            this.flags[kFLAGS.GATS_ANGEL_TIME_TO_FIND_KEY] > 0 &&
            this.flags[kFLAGS.GATS_ANGEL_TIME_TO_FIND_KEY] < 500
        )
            this.flags[kFLAGS.GATS_ANGEL_TIME_TO_FIND_KEY]++;

        if (this.getGame().model.time.hours > 23) {
            // Once per day
            this.flags[kFLAGS.BROOKE_MET_TODAY] = 0;
            if (
                this.getGame().model.time.days % 2 == 0 &&
                this.flags[kFLAGS.KAIJU_BAD_END_COUNTER] > 0
            ) {
                this.flags[kFLAGS.KAIJU_BAD_END_COUNTER]--;
                if (this.flags[kFLAGS.KAIJU_BAD_END_COUNTER] < 0)
                    this.flags[kFLAGS.KAIJU_BAD_END_COUNTER] = 0;
            }
            if (this.flags[kFLAGS.GILDED_JERKED] > 0) this.flags[kFLAGS.GILDED_JERKED] = 0;
            if (this.flags[kFLAGS.FED_SCYLLA_TODAY] == 1) this.flags[kFLAGS.FED_SCYLLA_TODAY] = 0;
            if (this.flags[kFLAGS.NOT_HELPED_ARIAN_TODAY] != 0)
                this.flags[kFLAGS.NOT_HELPED_ARIAN_TODAY] = 0;
            if (this.flags[kFLAGS.RUBI_PROSTITUTION] > 0)
                this.flags[kFLAGS.RUBI_PROFIT] += 2 + PlayerEvents.rand(4);
            this.flags[kFLAGS.BENOIT_TALKED_TODAY] = 0;
            this.getGame().bazaar.benoit.updateBenoitInventory();
            this.flags[kFLAGS.ROGAR_FUCKED_TODAY] = 0;
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00285] > 0)
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00285]--; // Reduce lust-stick resistance building
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00155] > 0) {
                // Dominika fellatrix countdown
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00155]--;
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00155] < 0)
                    this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00155] = 0;
            }
            if (this.flags[kFLAGS.LOPPE_DENIAL_COUNTER] > 0) {
                // Loppe denial counter
                this.flags[kFLAGS.LOPPE_DENIAL_COUNTER]--;
                if (this.flags[kFLAGS.LOPPE_DENIAL_COUNTER] < 0)
                    this.flags[kFLAGS.LOPPE_DENIAL_COUNTER] = 0;
            }
            if (this.flags[kFLAGS.WEEKLY_FAIRY_ORGY_COUNTDOWN] > 0) {
                // Countdown to next faerie orgy
                this.flags[kFLAGS.WEEKLY_FAIRY_ORGY_COUNTDOWN]--;
                if (this.flags[kFLAGS.WEEKLY_FAIRY_ORGY_COUNTDOWN] < 0)
                    this.flags[kFLAGS.WEEKLY_FAIRY_ORGY_COUNTDOWN] = 0;
            }
            if (this.getGame().model.time.days % 7 == 0)
                this.flags[kFLAGS.WHITNEY_GEMS_PAID_THIS_WEEK] = 0; // Clear Whitney's Weekly limit
            if (this.flags[kFLAGS.USED_MILKER_TODAY] > 0) this.flags[kFLAGS.USED_MILKER_TODAY] = 0; // Clear 'has fucked milker today'
            if (this.getGame().latexGirl.latexGooFollower()) {
                // Latex goo follower daily updates
                this.getGame().latexGirl.gooFluid(-2, false);
                if (this.getGame().latexGirl.gooFluid() < 50)
                    this.getGame().latexGirl.gooHappiness(-1, false);
                if (this.getGame().latexGirl.gooFluid() < 25)
                    this.getGame().latexGirl.gooHappiness(-1, false);
                if (this.getGame().latexGirl.gooHappiness() < 75)
                    this.getGame().latexGirl.gooObedience(-1, false);
                if (this.getGame().latexGirl.gooHappiness() >= 90)
                    this.getGame().latexGirl.gooObedience(1, false);
            }
            this.getGame().farm.farmCorruption.updateFarmCorruption(); // Farm Corruption updating
            if (this.player.findStatusAffect(StatusAffects.Contraceptives) >= 0) {
                // Herbal contraceptives countdown
                if (this.player.statusAffectv1(StatusAffects.Contraceptives) == 1) {
                    this.player.addStatusValue(StatusAffects.Contraceptives, 2, -1);
                    if (this.player.statusAffectv1(StatusAffects.Contraceptives) < 0)
                        this.player.removeStatusAffect(StatusAffects.Contraceptives);
                }
            }
            if (this.player.statusAffectv1(StatusAffects.SharkGirl) > 0)
                this.player.addStatusValue(StatusAffects.SharkGirl, 1, -1); // Lower shark girl counter
            if (this.flags[kFLAGS.INCREASED_HAIR_GROWTH_TIME_REMAINING] > 0) {
                switch (this.flags[kFLAGS.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED]) {
                    case 1:
                        if (!needNext) needNext = this.getGame().growHair(0.2);
                        else this.getGame().growHair(0.2);
                        break;
                    case 2:
                        if (!needNext) needNext = this.getGame().growHair(0.5);
                        else this.getGame().growHair(0.5);
                        break;
                    case 3:
                        if (!needNext) needNext = this.getGame().growHair(1.1);
                        else this.getGame().growHair(1.1);
                    default:
                }
                this.flags[kFLAGS.INCREASED_HAIR_GROWTH_TIME_REMAINING]--;
                // reset hair growth multiplier and timer when
                // expired.
                if (this.flags[kFLAGS.INCREASED_HAIR_GROWTH_TIME_REMAINING] <= 0) {
                    this.flags[kFLAGS.INCREASED_HAIR_GROWTH_TIME_REMAINING] = 0;
                    this.flags[kFLAGS.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED] = 0;
                    this.outx(
                        "<b>\nThe tingling on your scalp slowly fades away as the hair extension serum wears off.  Maybe it's time to go back to the salon for more?</b>"
                    );
                    // Restart hair growth if wuz lizard-stopped
                    if (this.flags[kFLAGS.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] > 0) {
                        this.flags[kFLAGS.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] = 0;
                        this.outx("  <b>You hair is now growing normally again.</b>");
                    }
                    this.outx("\n");
                    needNext = true;
                }
            }
            // Hair grows if not disabled by lizardness
            if (this.flags[kFLAGS.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] == 0) {
                if (!needNext) needNext = this.getGame().growHair(0.1);
                else this.getGame().growHair(0.1);
            }
            // Clear dragon breath cooldown!
            if (this.player.findStatusAffect(StatusAffects.DragonBreathCooldown) >= 0)
                this.player.removeStatusAffect(StatusAffects.DragonBreathCooldown);
        }
        return needNext;
    }

    public timeChangeLarge(): boolean {
        if (
            PlayerEvents.rand(4) == 0 &&
            this.getGame().isHolidays() &&
            this.player.gender > 0 &&
            this.getGame().model.time.hours == 6 &&
            this.flags[kFLAGS.XMAS_CHICKEN_YEAR] < this.getGame().date.fullYear
        ) {
            this.getGame().getAChristmasChicken();
            return true;
        }
        if (
            this.getGame().model.time.hours == 1 &&
            this.getGame().isHolidays() &&
            this.getGame().date.fullYear > this.flags[kFLAGS.PC_ENCOUNTERED_CHRISTMAS_ELF_BEFORE]
        ) {
            // XMAS ELF
            this.getGame().xmasBitchEncounter(); // Set it to remember the last year encountered
            return true;
        }
        if (
            this.checkedTurkey++ == 0 &&
            PlayerEvents.rand(5) == 0 &&
            (this.getGame().model.time.hours == 18 || this.getGame().model.time.hours == 19) &&
            (this.getGame().date.fullYear > this.flags[kFLAGS.TURKEY_FUCK_YEAR_DONE] ||
                this.flags[kFLAGS.MORE_TURKEY] > 0) &&
            this.getGame().isThanksgiving() &&
            this.player.gender > 0
        ) {
            this.getGame().datTurkeyRumpMeeting(); // TURKEY SURPRISE
            return true;
        }
        if (this.checkedDream++ == 0 && this.getGame().model.time.hours == 3) {
            // You can only have one dream each night
            if (this.player.gender > 0 && this.getGame().model.time.days == 10) {
                // Day 10 dream - since this can happen only once it takes priority over all other dreams
                this.getGame().dayTenDreams();
                return true;
            }
            if (
                this.player.hasCock() &&
                this.player.findPerk(PerkLib.BeeOvipositor) >= 0 &&
                this.player.eggs() >= 20 &&
                PlayerEvents.rand(6) == 0
            ) {
                // Bee dreams proc
                // happens at first sleep after hitting stage 3 unfertilized
                // To Wong Foo, Thanks for Everything, Julie Newmar
                this.outx(
                    "\nYou sit atop your favorite flower, enjoying the smell of verdure and the sounds of the forest.  The sun is shining brightly and it feels wonderful on your chitin.  Your wings twitch happily in the soft breeze, and it feels good to be alive and doing the colony's work... the only sour note is your heavy, bloated abdomen, so full of unfertilized eggs that it droops, so full it strains your back and pinches your nerves.  Still, it's too nice a day to let that depress you, and you take up your customary song, humming tunelessly but mellifluously as you wait for passers-by."
                );

                this.outx(
                    `\n\nYour antennae bob - was that someone?  Peering between the trees from the corner of your eye, you can see the figure of another person, and you intensify your hypnotic buzz, trying to draw it closer.  The figure steps into your clearing and out of the shadow; clad in ${
                        this.player.armorName
                    }, ${this.player.mf(
                        "he",
                        "she"
                    )} is yourself!  Confused, you stop humming and stare into your own face, and the other you takes the opportunity to open ${this.player.mf(
                        "his",
                        "her"
                    )} garments, exposing ${this.player.mf("his", "her")} [cock]!`
                );

                this.outx(
                    `\n\nStartled, you slip down from your seat and try to run, but the other you has already crossed the clearing and seizes you by the fuzz on your hefty, swollen abdomen; your leg slips, propelling you face-first to the ground.  ${this.player.mf(
                        "He",
                        "She"
                    )} pulls you back toward ${this.player.mf(
                        "his",
                        "her"
                    )}self and, grabbing one of your chitinous legs, turns you over.  The other you spreads your fuzzed thighs, revealing your soft, wet pussy, and the sweet smell of honey hits your noses.  ${this.player.mf(
                        "His",
                        "Her"
                    )} prick hardens intensely and immediately at the aroma of your pheromone-laden nectar, and ${this.player.mf(
                        "he",
                        "she"
                    )} pushes it into you without so much as a word of apology, groaning as ${this.player.mf(
                        "he",
                        "she"
                    )} begins to rut you mercilessly.  You can feel the sensations of ${this.player.mf(
                        "his",
                        "her"
                    )} burning cock as if it were your own, and your legs wrap around your other self instinctively even as your mind recoils in confusion.`
                );

                this.outx(
                    `\n\nThe other you grunts and locks up as ${this.player.mf(
                        "his",
                        "her"
                    )}... your [cock] begins to spurt inside your honey-drooling cunt, and ${this.player.mf(
                        "he",
                        "she"
                    )} falls onto you, bottoming out inside; your vagina likewise clenches and squirts your sweet juices.  As ${this.player.mf(
                        "he",
                        "she"
                    )} ejaculates, thrusting weakly, you can feel something shifting in you, filling you with pins and needles... it feels like the warm cum ${this.player.mf(
                        "he",
                        "she"
                    )}'s filling you with is permeating your entire groin, working its way back toward your abdomen.  It edges up to your massive buildup of eggs, and your body tightens in a second climax at the thought of having your children fertilized-`
                );

                this.outx(
                    `\n\nYou snap awake, sitting bolt upright.  What in the name of... your ${this.player.multiCockDescriptLight()} is softening rapidly, and as you shift, you can feel your cum sloshing in your [armor].  For fuck's sake.`
                );
                if (this.player.cumQ() >= 1000)
                    this.outx(
                        "  It's completely soaked your bedroll, too... you won't be sleeping on this again until you wash it out.  Grumbling, you roll the soggy, white-stained fabric up and stow it."
                    );
                this.outx(
                    "  The sensation of wetness inside your own clothes torments you as you try to return to sleep, driving up your lust and making you half-hard once again... the rumbling of eggs in your abdomen, as if they're ready to be laid, doesn't help either."
                );
                this.player.fertilizeEggs(); // convert eggs to fertilized based on player cum output, reduce lust by 100 and then add 20 lust
                this.player.orgasm(); // reduce lust by 100 and add 20, convert eggs to fertilized depending on cum output
                this.getGame().dynStats("lus", 20);
                this.getGame().doNext(this.playerMenu);
                // Hey Fenoxo - maybe the unsexed characters get a few \"cock up the ovipositor\" scenes for fertilization with some characters (probably only willing ones)?
                // Hey whoever, maybe you write them? -Z
                return true;
            }
            if (
                this.player.hasCock() &&
                this.player.findPerk(PerkLib.SpiderOvipositor) >= 0 &&
                this.player.eggs() >= 20 &&
                PlayerEvents.rand(6) == 0
            ) {
                // Drider dreams proc
                this.outx(
                    `\nIn a moonlit forest, you hang upside down from a thick tree branch suspended by only a string of webbing.  You watch with rising lust as a hapless traveler strolls along below, utterly unaware of the trap you've set.  Your breath catches as ${this.player.mf(
                        "he",
                        "she"
                    )} finally encounters your web, flailing against the sticky strands in a futile attempt to free ${this.player.mf(
                        "him",
                        "her"
                    )}self.  Once the traveller's struggles slow in fatigue, you descend easily to the forest floor, wrapping ${this.player.mf(
                        "him",
                        "her"
                    )} in an elegant silk cocoon before pulling ${this.player.mf(
                        "him",
                        "her"
                    )} up into the canopy.  Positioning your catch against the tree's trunk, you sink your fangs through the web and into flesh, feeling ${this.player.mf(
                        "his",
                        "her"
                    )} body heat with every drop of venom.  Cutting ${this.player.mf(
                        "his",
                        "her"
                    )} crotch free of your webbing, you open ${this.player.mf(
                        "his",
                        "her"
                    )} [armor] and release the `
                );
                if (this.player.hasVagina()) this.outx(`${this.getGame().vaginaDescript(0)} and `);
                this.outx(
                    `${this.getGame().cockDescript(
                        0
                    )} therein; you lower yourself onto ${this.player.mf(
                        "him",
                        "her"
                    )} over and over again, spearing your eager pussy with ${this.player.mf(
                        "him",
                        "her"
                    )} prick`
                );
                if (this.player.hasVagina())
                    this.outx(" while you bend and force your own into her cunt");
                this.outx(".  It's not long until you feel ");
                if (this.player.hasVagina())
                    this.outx(
                        "her pussy clenching around you as you orgasm explosively inside, followed by "
                    );
                this.outx(
                    `the sensation of warm wetness in your own vagina.  Your prisoner groans as ${this.player.mf(
                        "his",
                        "her"
                    )} cock twitches and spasms inside you, spraying your insides with seed; warm, delicious, sticky seed for your eggs.  You can feel it drawing closer to your unfertilized clutch, and as the gooey heat pushes toward them, your head swims, and you finally look into your prey's [face]...`
                );

                this.outx(
                    "\n\nYour eyes flutter open.  What a strange dream... aw, dammit.  You can feel your [armor] rubbing against your crotch, sodden with cum.  "
                );
                if (this.player.cumQ() > 1000) this.outx("It's all over your bedroll, too...");
                this.outx(
                    "  Turning over and trying to find a dry spot, you attempt to return to sleep... the wet pressure against your crotch doesn't make it easy, nor do the rumbles in your abdomen, and you're already partway erect by the time you drift off into another erotic dream.  Another traveler passes under you, and you prepare to snare her with your web; your ovipositor peeks out eagerly and a bead of slime drips from it, running just ahead of the first fertilized egg you'll push into your poor victim..."
                );
                this.player.fertilizeEggs(); // reduce lust by 100 and add 20, convert eggs to fertilized depending on cum output
                this.player.orgasm();
                this.getGame().dynStats("lus", 20);
                this.getGame().doNext(this.playerMenu);
                // Hey Fenoxo - maybe the unsexed characters get a few \"cock up the ovipositor\" scenes for fertilization with some characters (probably only willing ones)?
                // Hey whoever, maybe you write them? -Z
                return true;
            }
            let ceraph: number; // Ceraph's dreams - overlaps normal night-time dreams.
            switch (
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00218] +
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00219] +
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00220]
            ) {
                case 0:
                    ceraph = 0;
                    break; // If you've given her no body parts then Ceraph will not cause any dreams
                case 1:
                    ceraph = 10;
                    break; // Once every 10 days if 1, once every 7 days if 2, once every 5 days if 3
                case 2:
                    ceraph = 7;
                    break;
                case 3:
                    ceraph = 5;
                    break;
                case 4:
                    ceraph = 4;
                    break;
                default:
                    ceraph = 3;
            }
            if (ceraph > 0 && this.getGame().model.time.days % ceraph == 0) {
                this.getGame().ceraphScene.ceraphBodyPartDreams();
                return true;
            }
            if (
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00157] > 0 &&
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00157] < 4
            ) {
                // Dominika Dream
                this.outx("\n<b>Your rest is somewhat troubled with odd dreams...</b>\n");
                this.getGame().telAdre.dominika.fellatrixDream();
                return true;
            }
            if (
                this.getGame().anemoneScene.kidAXP() >= 40 &&
                this.flags[kFLAGS.HAD_KID_A_DREAM] == 0 &&
                this.player.gender > 0
            ) {
                this.getGame().anemoneScene.kidADreams();
                this.flags[kFLAGS.HAD_KID_A_DREAM] = 1;
                return true;
            }
            if (this.player.viridianChange()) {
                this.getGame().fuckedUpCockDreamChange();
                return true;
            }
            if (this.player.lib > 50 || this.player.lust > 40) {
                // Randomly generated dreams here
                if (this.getGame().dreamSelect()) return true;
            }
        }
        if (this.player.statusAffectv1(StatusAffects.SlimeCraving) >= 18 && this.player.str <= 1) {
            // Bad end!
            this.getGame().lake.gooGirlScene.slimeBadEnd();
            return true;
        }
        if (
            this.player.hasCock() &&
            this.player.cocks[0].cockType == CockTypesEnum.BEE &&
            this.player.lust >= 100
        ) {
            this.outx(
                "\nYou can’t help it anymore, you need to find the bee girl right now.  You rush off to the forest to find the release that you absolutely must have.  Going on instinct you soon find the bee girl's clearing and her in it.\n\n"
            );
            this.getGame().forest.beeGirlScene.beeSexForCocks(false);
            return true;
        }
        return false;
    }
    // End of Interface Implementation
}
