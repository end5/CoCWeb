import { Character } from 'Engine/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { randInt, randomChoice } from 'Engine/Utilities/SMath';
import { CView } from 'Engine/Display/ContentView';
import { describeCocksLight } from 'Content/Descriptors/CockDescriptor';
import { describeLegs } from 'Content/Descriptors/LegDescriptor';
import { EffectType } from 'Content/Effects/EffectType';
import { Vagina, VaginaWetness, VaginaLooseness } from 'Engine/Body/Vagina';
import { BreastCup } from 'Engine/Body/BreastRow';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { HipRating } from 'Engine/Body/Hips';
import { WeightedDrop } from 'Engine/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { CharacterType } from 'Content/Character/CharacterType';
import { loseToDaughters, combatWinAgainstDaughters, TamanisDaughtersFlags } from './TamanisDaughtersScene';
import { TamaniFlags } from './TamaniScene';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { DefeatType } from 'Engine/Combat/DefeatEvent';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { describeBalls } from 'Content/Descriptors/BallsDescriptor';
import { BasicAttack } from 'Content/Combat/Actions/BasicAttack';
import { TamaniDrugAttack } from './Tamani';
import { GoblinTeaseAttack } from '../BeyondCamp/Goblin';

function midRoundMadness(player: Character) {
    const selector: number = randInt(4);
    if (selector === 0) {
        CView.text("A slender hand reaches inside your " + player.inventory.armor.displayName + " and gives your ");
        if (player.body.balls.count > 0) {
            if (randInt(2) === 0) CView.text(describeCocksLight(player));
            else CView.text(describeBalls(true, true, player));
        }
        else CView.text(describeCocksLight(player));
        CView.text(" a gentle squeeze.  You twist away but your breathing gets a little heavier.\n\n");
    }
    else if (selector === 1) {
        CView.text("A girl latches onto your " + describeLegs(player) + " and begins caressing your body lovingly, humming happily.  You quickly shake her loose but the attention makes you blush a little more.\n\n");
    }
    else if (selector === 2) {
        CView.text("One of your daughters launches onto your back and presses her hard, pierced nipples against your neck.  She whispers in your ear, \"<i>Twist my nipples dad!</i>\"\n\n");
        CView.text("You reach back and throw her off, but her perverted taunts still leave you feeling a little hot under the collar.\n\n");
    }
    else CView.text("A daughter lays down in front of you and starts jilling herself on the spot.  It's impossible to not glance down and see her or hear her pleasured moans.  You step away to remove the distraction but it definitely causes some discomfort in your " + player.inventory.armor.displayName + ".\n\n");
    player.stats.lust += 1 + player.stats.lib / 15 + randInt(player.stats.cor / 30);

}

const tamaniDrugAttack = new TamaniDrugAttack();

function tamaniShowsUp(daughters: Character, enemy: Character) {
    if (TamanisDaughtersFlags.TAMANI_PRESENT) {
        if (randInt(4) === 0) tamaniDrugAttack.use(daughters, enemy); // Tamani already there - chance of potion
    }
    else if (randInt(6) === 0) {
        TamanisDaughtersFlags.TAMANI_PRESENT = true;
        CView.text("A high-pitched yet familiar voice calls out, \"<i><b>So this is where you skanks ran off to---wait a second.  Are you trying to poach Tamani's man!?</b></i>\"\n\n");
        CView.text("You can see Tamani lurking around the rear of the goblin pack, visibly berating her daughters.  On one hand it sounds like she might help you, but knowing goblins, she'll probably forget about her anger and help them subdue you for more cum...\n\n");
        // (+5 mob strength)
        daughters.stats.str += 5;
        // (+5 mob toughness)
        daughters.stats.tou += 5;
        daughters.stats.HP += 10;
        // (-20 mob lust)
        daughters.stats.lust -= 20;
        // append combat desc
        daughters.desc.long += " <b>Tamani lurks in the back of the crowd, curvier than her brood and watching with a mixture of amusement and irritation.  She runs a hand through her pink and black hair, waiting for an opportunity to get involved...</b>";
    }
}

class TamaniDaughtersDrugAttack extends CombatAction {
    public name: string = "Drug Attack";
    public useAction(char: Character, enemy: Character) {
        const color = randomChoice("red", "green", "blue", "white", "black");
        // Throw offensive potions at the player
        if (color !== "blue") {
            CView.text("Tamani uncorks a glass bottle full of " + color + " fluid and swings her arm, flinging a wave of fluid at you.");
        }
        // Drink blue pots
        else {
            CView.text("Tamani pulls out a blue vial and uncaps it, then douses the mob with the contents.");
            if (char.combat.HPRatio() < 1) {
                CView.text("  Though less effective than ingesting it, the potion looks to have helped the goblins recover from their wounds!\n");
                char.stats.HP += 80;
            }
            else CView.text("  There doesn't seem to be any effect.\n");
            CView.text("\n");
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

class TamanisDaughtersMainAction extends CombatAction {
    public name = "Action";
    public subActions: CombatAction[] = [new BasicAttack(), new GoblinTeaseAttack(), new TamaniDaughtersDrugAttack()];
    public use(char: Character, enemy: Character) {
        // mid-round madness!
        midRoundMadness(enemy);
        tamaniShowsUp(char, enemy);

        const selected = randInt(this.subActions.length);
        if (selected === 0) {
            const attacks = Math.floor(TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS / 20);
            while (attacks > 0)
                this.subActions[0].use(char, enemy);
        }
        else {
            this.subActions[selected].use(char, enemy);
        }
    }
}

class TamanisDaughtersEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        // $> Need to fix worms
        // if (pcCameWorms) {
        //     CView.text("\n\nYour foes seem visibly disgusted and leave, telling you to, \"<i>quit being so fucking gross...</i>\"");
        //     return { next: passTime(1) };
        // } else {
        return loseToDaughters(enemy);
        // }
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return combatWinAgainstDaughters(enemy, this.char);
    }
}

export class TamanisDaughters extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.TamanisDaughters);
        this.description = new CharacterDescription(this, "the group of ", "Tamani's daughters", "A large grouping of goblin girls has gathered around you, surrounding you on all sides.  Most have varying shades of green skin, though a few have yellowish or light blue casts to their skin.  All are barely clothed, exposing as much of their flesh as possible in order to excite a potential mate.  Their hairstyles are as varied as their clothing and skin-tones, and the only things they seem to have in common are cute faces and curvy forms.  It looks like they want something from you.", true);
        this.body.vaginas.add(new Vagina(VaginaWetness.DROOLING, VaginaLooseness.TIGHT, false));
        this.effects.create(EffectType.BonusVCapacity, { vaginalCapacity: 40 });
        this.body.chest.firstRow.rating = BreastCup.D;
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.DRY;
        this.effects.create(EffectType.BonusACapacity, { analCapacity: 25 });
        this.body.tallness = 40;
        this.body.hips.rating = HipRating.AMPLE + 1;
        this.body.butt.rating = ButtRating.NOTICEABLE + 1;
        this.body.skin.tone = "greenish gray";
        this.body.hair.color = "pink";
        this.body.hair.length = 16;

        this.stats.base.str.raw = 55;
        this.stats.base.tou.raw = 30;
        this.stats.base.spe.raw = 45;
        this.stats.base.int.raw = 50;
        this.stats.base.lib.raw = 70;
        this.stats.base.sens.raw = 70;
        this.stats.base.cor.raw = 50;
        this.stats.base.HP.max += 50 + (Math.floor(TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS / 2) * 15);
        this.stats.base.HP.raw = this.stats.base.HP.max;
        this.stats.base.lust.raw = 30;
        this.stats.base.lustVuln = .65;
        this.stats.base.level.raw = 8 + (Math.floor(TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS / 20));

        this.inventory = new CharacterInventory(this,
            new Weapon("fists" as WeaponName, new ItemDesc("fists"), "fists", "tiny punch", 0),
            new Armor("leather straps" as ArmorName, new ItemDesc("leather straps"), "leather straps", 0)
        );

        this.combatContainer = new CombatContainer(this,
            {
                mainAction: new TamanisDaughtersMainAction(),
                endScenes: new TamanisDaughtersEndScenes(this),
                rewards: {
                    gems: randInt(15) + 5,
                    drop: new WeightedDrop<string>().
                        add(ConsumableName.GoblinAle, 5).
                        addMany(1, ConsumableName.LustDraft,
                            ConsumableName.HairDyeNeonPink,
                            ConsumableName.HairDyeDarkBlue,
                            ConsumableName.HairDyeBrightOrange,
                            ConsumableName.HairDyePurple)
                }
            });
    }
}
