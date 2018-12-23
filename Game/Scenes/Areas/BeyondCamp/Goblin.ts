import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { randInt, randomChoice } from 'Engine/Utilities/SMath';
import { CView } from 'Page/ContentView';
import { EffectType } from 'Game/Effects/EffectType';
import { passTime } from 'Game/Menus/InGame/PlayerMenu';
import { CharacterType } from 'Game/Character/CharacterType';
import { Vagina, VaginaWetness, VaginaLooseness } from 'Game/Character/Body/Vagina';
import { BreastCup } from 'Game/Character/Body/BreastRow';
import { ButtLooseness, ButtWetness, ButtRating } from 'Game/Character/Body/Butt';
import { HipRating } from 'Game/Character/Body/Hips';
import { WeightedDrop } from 'Game/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Game/Items/Consumables/ConsumableName';
import { CharacterInventory } from 'Game/Inventory/CharacterInventory';
import { CharacterDescription } from 'Game/Character/CharacterDescription';
import { CombatContainer } from 'Game/Combat/CombatContainer';
import { Weapon } from 'Game/Items/Weapons/Weapon';
import { WeaponName } from 'Game/Items/Weapons/WeaponName';
import { ItemDesc } from 'Game/Items/ItemDesc';
import { Armor } from 'Game/Items/Armors/Armor';
import { ArmorName } from 'Game/Items/Armors/ArmorName';
import { EndScenes } from 'Game/Combat/EndScenes';
import { DefeatType } from 'Game/Combat/DefeatEvent';
import { CombatAction } from 'Game/Combat/Actions/CombatAction';
import { goblinRapesPlayer, gobboRapeIntro } from './GoblinScene';

class DrugAttack extends CombatAction {
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
                char.stats.HP += (char.stats.maxHP() / 4);
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

export class GoblinTeaseAttack extends CombatAction {
    public name: string = "Tease Attack";
    public useAction(char: Character, enemy: Character) {
        const det: number = randInt(3);
        if (det === 0) CView.text(char.desc.capitalA + char.desc.short + " runs her hands along her leather-clad body and blows you a kiss. \"<i>Why not walk on the wild side?</i>\" she asks.");
        if (det === 1) CView.text(char.desc.capitalA + char.desc.short + " grabs her heel and lifts it to her head in an amazing display of flexibility.  She caresses her snatch and gives you a come hither look.");
        if (det === 2) CView.text(char.desc.capitalA + char.desc.short + " bends over, putting on a show and jiggling her heart-shaped ass at you.  She looks over her shoulder and sucks on her finger, batting her eyelashes.");
        enemy.stats.lust += randInt(enemy.stats.lib / 10) + 8;

        CView.text("  The display distracts you long enough to prevent you from taking advantage of her awkward pose, leaving you more than a little flushed.\n\n");
    }
}

class GoblinEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (enemy.gender === 0) {
            CView.text("You collapse in front of the goblin, too wounded to fight.  She giggles and takes out a tube of lipstick smearing it whorishly on your face.  You pass into unconsciousness immediately.  It must have been drugged.");
            return { next: passTime(1) };
        }
        else if (enemy.effects.has(EffectType.CameWorms)) {
            CView.text("\n\nThe goblin's eyes go wide and she turns to leave, no longer interested in you.");
            enemy.orgasm();
            return { next: passTime(1) };
        }
        else {
            return goblinRapesPlayer(enemy, this.char);
        }
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return gobboRapeIntro(enemy, this.char);
    }
}

export class Goblin extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.Goblin);
        this.description = new CharacterDescription(this, "the ", "goblin", "The goblin before you is a typical example of her species, with dark green skin, pointed ears, and purple hair that would look more at home on a punk-rocker.  She's only about three feet tall, but makes up for it with her curvy body, sporting hips and breasts that would entice any of the men in your village were she full-size.  There isn't a single scrap of clothing on her, just lewd leather straps and a few clinking pouches.  She does sport quite a lot of piercings – the most noticeable being large studs hanging from her purple nipples.  Her eyes are fiery red, and practically glow with lust.  This one isn't going to be satisfied until she has her way with you.  It shouldn't be too hard to subdue such a little creature, right?");
        this.body.vaginas.add(new Vagina(VaginaWetness.DROOLING, VaginaLooseness.NORMAL, false));
        this.effects.create(EffectType.BonusVCapacity, { vaginalCapacity: 40 });
        this.body.chest.firstRow.rating = BreastCup.E;
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.DRY;
        this.effects.create(EffectType.BonusACapacity, { analCapacity: 30 });
        this.body.tallness = 35 + randInt(4);
        this.body.hips.rating = HipRating.AMPLE + 2;
        this.body.butt.rating = ButtRating.LARGE;
        this.body.skin.tone = "dark green";
        this.body.hair.color = "purple";
        this.body.hair.length = 4;

        this.stats.core.str.base.raw = 12;
        this.stats.core.tou.base.raw = 13;
        this.stats.core.spe.base.raw = 35;
        this.stats.core.int.base.raw = 42;
        this.stats.core.lib.base.raw = 45;
        this.stats.core.sens.base.raw = 45;
        this.stats.core.cor.base.raw = 60;
        this.stats.core.lust.base.raw = 50;
        this.stats.core.level.raw = 1;

        this.inventory = new CharacterInventory(this,
            new Weapon("fists" as WeaponName, new ItemDesc("fists"), "fists", "tiny punch", 0),
            new Armor("leather straps" as ArmorName, new ItemDesc("leather straps"), "leather straps", 0)
        );

        this.combatContainer = new CombatContainer(this,
            {
                endScenes: new GoblinEndScenes(this),
                rewards: {
                    gems: randInt(5) + 5,
                    drop: new WeightedDrop<string>().
                        add(ConsumableName.GoblinAle, 5).
                        addMany(1, ConsumableName.LustDraft,
                            ConsumableName.HairDyeNeonPink,
                            ConsumableName.HairDyeDarkBlue,
                            ConsumableName.HairDyeBrightOrange,
                            ConsumableName.HairDyePurple)
                }
            });
        this.combat.action.subActions.push(new DrugAttack(), new GoblinTeaseAttack());
    }
}
