import { Character } from 'Game/Character/Character';
import { NextScreenChoices, ClickFunction, choiceWrap } from 'Game/ScreenDisplay';
import { randInt, randomChoice } from 'Engine/Utilities/SMath';
import { CView } from 'Page/ContentView';
import { describeCocksLight } from 'Game/Descriptors/CockDescriptor';
import { Cock } from 'Game/Character/Body/Cock';
import { passTime } from "Game/Scenes/PassTime";
import { Vagina, VaginaWetness, VaginaLooseness } from 'Game/Character/Body/Vagina';
import { EffectType } from 'Game/Effects/EffectType';
import { BreastCup } from 'Game/Character/Body/BreastRow';
import { ButtLooseness, ButtWetness, ButtRating } from 'Game/Character/Body/Butt';
import { HipRating } from 'Game/Character/Body/Hips';
import { WeightedDrop } from 'Game/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Game/Items/Consumables/ConsumableName';
import { TamaniFlags, tamaniChest, tamaniSexLost, tamaniSexLetHer, getRapedByTamaniYouHypnoSlut, tamaniAnalShits, tamaniBeaten, tamaniSexWon } from './TamaniScene';
import { CharacterInventory } from 'Game/Inventory/CharacterInventory';
import { CharacterDescription } from 'Game/Character/CharacterDescription';
import { CombatContainer } from 'Game/Combat/CombatContainer';
import { CharacterType } from 'Game/Character/CharacterType';
import { Weapon } from 'Game/Items/Weapons/Weapon';
import { WeaponName } from 'Game/Items/Weapons/WeaponName';
import { ItemDesc } from 'Game/Items/ItemDesc';
import { Armor } from 'Game/Items/Armors/Armor';
import { ArmorName } from 'Game/Items/Armors/ArmorName';
import { EndScenes } from 'Game/Combat/EndScenes';
import { DefeatType } from 'Game/Combat/DefeatEvent';
import { CombatAction } from 'Game/Combat/Actions/CombatAction';
import { GoblinTeaseAttack } from '../BeyondCamp/Goblin';

// New Tease option:
class TamaniTease extends CombatAction {
    public name: string = "Tease";
    public useAction(char: Character, enemy: Character) {
        if (TamaniFlags.TAMANI_TIMES_HYPNOTISED <= 0)
            return new GoblinTeaseAttack().use(char, enemy);

        let selector: number = randInt(3);
        // Choose 1 of 3 variations
        if (selector === 0) CView.text("Tamani smiles and shifts her leather straps, pulling one into the puffy gash that is her vagina.  She groans out loud, sliding the studded leather band into her outer lips and sawing it along her clit.  Her whole body blushes as she pulls it free, running a fingertip up the now wet strip of leather, \"<i>Mmm, can't you see how much my pussy needs a man inside it?  Be a good husband and fuck Tamani full!  You know you want to.</i>\"\n\n");
        if (selector === 1) CView.text("Tamani saunters up to you, sliding her fingers down to each side of her pussy and spreading them.  Your eyes are drawn to her honeyed tunnel, unable to look away she gets closer.  She whispers, \"<i>Your cock knows what it needs.  Just be a good husband and obey your dick, it KNOWS how badly you need mistress's pussy.</i>\"\n\n");
        if (selector === 2) CView.text("Tamani turns around and bends down, pressing her hands into the dirt as she kicks her legs apart.  Your stare open-mouthed at her bouncy ass-cheeks and the tantalizingly wet entrance of her slit.  She smirks and offers, \"<i>You've cum so many times inside me, why resist when you can give in and feel that pleasure again today?  Come on husband, don't make Tamani beg...</i>\"\n\n");

        // REACTIONS
        // LOW HYPNO VALUE:
        if (TamaniFlags.TAMANI_TIMES_HYPNOTISED < 5) {
            selector = randInt(3);
            if (selector === 0) CView.text("You reluctantly pull your stare away from the heavenly entrance between her legs.  There's an urge to walk over to her and plunge yourself inside her over and over, but you dismiss it.");
            if (selector === 1) CView.text("You find it hard to pull your gaze from her inviting twat, but you manage.  You shake your head, clearing away thoughts of fertilizing your wife.  Her rhetoric must be getting to you.");
            if (selector === 2) CView.text("No matter the case, her actions shifted a fair bit of your blood-flow to your groin.");
        }
        // MEDIUM HYPNO VALUE:
        else if (TamaniFlags.TAMANI_TIMES_HYPNOTISED < 10) {
            selector = randInt(2);
            if (selector === 0) {
                CView.text("With effort you manage to wrench your eyes away from the inviting folds of Tamani's vagina.  ");
                if (enemy.body.cocks.length > 1) CView.text("Each of y");
                else CView.text("Y");
                CView.text("our " + describeCocksLight(enemy));
                if (enemy.stats.lust > 80) CView.text(" drips pre-cum");
                else if (enemy.stats.lust > 40) CView.text(" grows harder");
                else CView.text(" hardens");
                CView.text(" from the sexual sight, and you feel a compulsion to rush to your wife and take her on the spot.  Obviously she's not really your wife, but after so many fuckings it kind of makes sense to think of her that way.");
                if (enemy.stats.lust < 70) CView.text("  Still, you don't want to fuck her right now!");
            }
            else {
                CView.text("Struggling, you pull your eyes back into your head and away from Tamani's gorgeous slit.  You shudder, feeling ");
                if (enemy.body.cocks.length > 1) CView.text("each of ");
                CView.text("your " + describeCocksLight(enemy));
                if (enemy.stats.lust <= 41) CView.text(" thicken perceptibly");
                else if (enemy.stats.lust <= 81) CView.text(" twitch eagerly");
                else CView.text("drip pre-cum");
                CView.text(", responding to the overly sensual goblin's body.  You start to approach her, but stop yourself, realizing you were about to pick up your wife and fuck her on the spot.  You know she's not really your wife, but you have a hard time thinking of her as anything else, save for maybe your mistress.");
                if (enemy.stats.lust < 70) CView.text("  Regardless, you're resolute in your desire not to fuck her right now!");
            }
        }
        // HIGH HYPNO VALUE
        else {
            selector = randInt(2);
            if (selector === 0) {
                CView.text("You barely manage to step yourself from lunging forward to bury your mouth between your mistress's legs.  Hard and trembling between your legs, ");
                if (enemy.body.cocks.length > 1) CView.text("each of ");
                CView.text("your " + describeCocksLight(enemy) + " aches with need.  You battle with the compulsion to kneel before your short, stacked mistress and perform your duties as her breeder husband.");
            }
            else {
                CView.text("You wrench your gaze from the juicy mound before you with great difficulty.  The desire to submit to your wife and fuck her on the spot rages through your body, melting your resistance into liquid lust and pooling it in your groin.  ");
                if (enemy.body.cocks.length > 1) CView.text("Each of y");
                else CView.text("Y");
                CView.text("our " + describeCocksLight(enemy) + " pulses and dribbles pre-cum, aching to do its duty and fire load after load into Tamani's perfect pussy.");
            }
        }
        enemy.stats.lust += (randInt(enemy.stats.lib / 5) + 3 + (TamaniFlags.TAMANI_TIMES_HYPNOTISED));
    }
}

export class TamaniDrugAttack extends CombatAction {
    public name: string = "Drug Attack";
    public useAction(char: Character, enemy: Character) {
        const color = randomChoice("red", "green", "blue", "white", "black");
        // Throw offensive potions at the player
        if (color !== "blue") {
            CView.text(char.desc.capitalA + char.desc.short + " uncorks a glass bottle full of " + color + " fluid and swings her arm, flinging a wave of fluid at you.");
        }
        // Drink blue pots
        else {
            CView.text(char.desc.capitalA + char.desc.short + " pulls out a blue vial and uncaps it, swiftly downing its contents.");
            if (char.combat.HPRatio() < 1) {
                CView.text("  She looks to have recovered from some of her wounds!\n");
                char.stats.HP += (char.stats.maxHP() / 2);
            }
            else CView.text("  There doesn't seem to be any effect.\n");
            return;
        }
        // Dodge chance!
        if ((enemy.effects.has(EffectType.Evade) && randInt(10) <= 3) || (randInt(100) < enemy.stats.spe / 5)) {
            CView.text("\nYou narrowly avoid the gush of alchemic fluids!\n");
        }
        else {
            // Get hit!
            if (color === "red") {
                // Temporary heat
                CView.text("\nThe red fluids hit you and instantly soak into your skin, disappearing.  Your skin flushes and you feel warm.  Oh no...\n");
                if (!enemy.effects.has(EffectType.TemporaryHeat)) enemy.effects.create(EffectType.TemporaryHeat);
            }
            else if (color === "green") {
                // Green poison
                CView.text("\nThe greenish fluids splash over you, making you feel slimy and gross.  Nausea plagues you immediately - you have been poisoned!\n");
                if (!enemy.effects.has(EffectType.Poison)) enemy.effects.create(EffectType.Poison);
            }
            else if (color === "white") {
                // sticky flee prevention
                CView.text("\nYou try to avoid it, but it splatters the ground around you with very sticky white fluid, making it difficult to run.  You'll have a hard time escaping now!\n");
                if (!enemy.effects.has(EffectType.NoFlee)) enemy.effects.create(EffectType.NoFlee);
            }
            else if (color === "black") {
                // Increase fatigue
                CView.text("\nThe black fluid splashes all over you and wicks into your skin near-instantly.  It makes you feel tired and drowsy.\n");
                enemy.stats.fatigue += 10 + randInt(25);
            }
        }
        CView.text("\n");
    }
}

class TamaniEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (howYouWon === DefeatType.HP) {
            if (enemy.body.cocks.length > 0) {
                if (randInt(2) === 0) return tamaniSexLost(enemy);
                else return tamaniSexLetHer(enemy);
            }
            else {
                CView.clear().text("Tamani sighs as you begin to lose conscious, \"<i>You dummy, why'd you get rid of the fun parts?</i>\"");
                return { next: passTime(1) };
            }
        }
        else {
            if (enemy.body.cocks.length > 0) {
                // hypnoslut loss scene
                if (TamaniFlags.TAMANI_TIMES_HYPNOTISED > 19 && randInt(2) === 0) {
                    return getRapedByTamaniYouHypnoSlut(enemy);
                } else if (randInt(2) === 0) return tamaniSexLost(enemy);
                else return tamaniSexLetHer(enemy);
            } else {
                CView.clear().text("You give into your lusts and masturbate, but Tamani doesn't seem to care.  She kicks and punches you over and over, screaming, \"<i>You dummy, why'd you get rid of the fun parts?</i>\"");
                // $> Unsure about this
                // takeDamage(10000);
                return { next: passTime(1) };
            }
        }
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        if (howYouLost === DefeatType.HP) {
            CView.clear().text("Tamani is defeated!");
        } else {
            CView.clear().text("Tamani gives up on defeating you and starts masturbating!");
        }
        if (enemy.stats.lust >= 33 && enemy.body.cocks.length > 0) {
            CView.text("  You could fuck her, but if that's the case why did you bother fighting her?\n\nWhat do you do to her?");
            let buttFuck: ClickFunction | undefined;
            let layEggs: ClickFunction | undefined;
            if (enemy.body.cocks.length > 0 && enemy.body.cocks.find(Cock.CockThatFits(this.char.analCapacity())))
                buttFuck = choiceWrap(tamaniAnalShits, this.char);
            // NOT PREGGERS
            if (!TamaniFlags.TAMANI_WOMB.isPregnant() && enemy.canOvipositSpider()) {
                layEggs = tamaniBeaten;
            }
            return { choices: [["Fuck", tamaniSexWon], ["Buttfuck", buttFuck], ["", undefined], ["Lay Eggs", layEggs], ["Leave", passTime(1)]] };
        }
        else return { next: passTime(1) };
    }
}

export class Tamani extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.Tamani);
        this.description = new CharacterDescription(this, "", "Tamani", "She keeps her arms folded across her " + tamaniChest() + " and glares at you.  The little thing is only about four feet tall, with pink and black dyed hair cut into a cute little 'do.  The greenish-gray skin of her breasts bulges out around her arms, supported by a few leather straps, amplifying her cleavage.  Her cunt lips are pierced multiple times, inflamed, and slightly parted.  There really isn't any clothing on her to hide them, just more of the ever-present straps wrapping around her thighs.");
        this.body.vaginas.add(new Vagina(VaginaWetness.DROOLING, VaginaLooseness.NORMAL, false));
        this.effects.create(EffectType.BonusVCapacity, { vaginalCapacity: 55 });
        this.body.chest.firstRow.rating = BreastCup.E;
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.DRY;
        this.effects.create(EffectType.BonusACapacity, { analCapacity: 40 });
        this.body.tallness = 40;
        this.body.hips.rating = HipRating.AMPLE + 2;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.skin.tone = "greenish gray";
        this.body.hair.color = "pink and black";
        this.body.hair.length = 16;

        this.stats.core.str.base.raw = 32;
        this.stats.core.tou.base.raw = 43;
        this.stats.core.spe.base.raw = 55;
        this.stats.core.int.base.raw = 62;
        this.stats.core.lib.base.raw = 65;
        this.stats.core.sens.base.raw = 65;
        this.stats.core.cor.base.raw = 50;
        this.stats.core.HP.max.raw += 40;
        this.stats.core.HP.base.raw += 40;
        this.stats.core.lust.base.raw = 40;
        this.stats.core.lustVuln = 0.9;
        this.stats.core.level.raw = 4;

        this.inventory = new CharacterInventory(this,
            new Weapon("fists" as WeaponName, new ItemDesc("fists"), "fists", "tiny punch", 0),
            new Armor("leather straps" as ArmorName, new ItemDesc("leather straps"), "leather straps", 0)
        );

        this.combatContainer = new CombatContainer(this, {
            endScenes: new TamaniEndScenes(this),
            rewards: {
                gems: randInt(25) + 5,
                drop: new WeightedDrop<string>()
                    .add(ConsumableName.GoblinAle, 4)
                    .addMany(1,
                        ConsumableName.LustDraft,
                        ConsumableName.HairDyeNeonPink,
                        ConsumableName.HairDyeDarkBlue,
                        ConsumableName.HairDyeBrightOrange,
                        ConsumableName.HairDyePurple,
                        ConsumableName.IncubusDraft,
                        ConsumableName.Reducto,
                        ConsumableName.LargeEggBlue
                    )
            }
        });
        this.combat.action.subActions.push(new TamaniTease(), new TamaniDrugAttack());
    }
}
