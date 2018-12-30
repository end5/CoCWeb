import { EndScenes } from 'Game/Combat/EndScenes';
import { CharacterType } from 'Game/Character/CharacterType';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices, choiceWrap } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { describeCocksLight, describeCock } from 'Game/Descriptors/CockDescriptor';
import { VaginaWetness } from 'Game/Character/Body/Vagina';
import { DefeatType } from 'Game/Combat/DefeatEvent';
import { CharacterInventory } from 'Game/Inventory/CharacterInventory';
import { CharacterDescription } from 'Game/Character/CharacterDescription';
import { CombatContainer } from 'Game/Combat/CombatContainer';
import { Cock, CockType } from 'Game/Character/Body/Cock';
import { randInt } from 'Engine/Utilities/SMath';
import { ButtLooseness, ButtWetness, ButtRating } from 'Game/Character/Body/Butt';
import { HipRating } from 'Game/Character/Body/Hips';
import { WeightedDrop } from 'Game/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Game/Items/Consumables/ConsumableName';
import { WingType } from 'Game/Character/Body/Wings';
import { Weapon } from 'Game/Items/Weapons/Weapon';
import { WeaponName } from 'Game/Items/Weapons/WeaponName';
import { ItemDesc } from 'Game/Items/ItemDesc';
import { Armor } from 'Game/Items/Armors/Armor';
import { ArmorName } from 'Game/Items/Armors/ArmorName';
import { CombatAction } from 'Game/Combat/Actions/CombatAction';
import { impRapesYou, impVictory } from './ImpScene';
import { describeAllVagina } from 'Game/Descriptors/VaginaDescriptor';
import { EffectType } from 'Game/Effects/EffectType';

export class ImpMagicLustAttack extends CombatAction {
    public name: string = "Magic Lust Attack";
    public useAction(char: Character, enemy: Character) {
        CView.text("You see " + char.desc.a + char.desc.short + " make sudden arcane gestures at you!\n\n");
        char.stats.lust += char.stats.lib / 10 + char.stats.cor / 10 + 10;

        if (char.stats.lust < 30) CView.text("You feel strangely warm.  ");
        if (char.stats.lust >= 30 && char.stats.lust < 60) CView.text("Blood rushes to your groin as a surge of arousal hits you, making your knees weak.  ");
        if (char.stats.lust >= 60) CView.text("Images of yourself fellating and fucking the imp assault your mind, unnaturally arousing you.  ");
        if (char.body.cocks.length > 0) {
            if (char.stats.lust >= 60)
                CView.text("You feel your " + describeCocksLight(char) + " dribble pre-cum.");
            else if (char.stats.lust >= 30 && char.body.cocks.length === 1)
                CView.text("Your " + describeCock(char, char.body.cocks.get(0)) + " hardens, distracting you further.");
            else if (char.stats.lust >= 30 && char.body.cocks.length > 1)
                CView.text("Your " + describeCocksLight(char) + " harden uncomfortably.");
            if (char.body.vaginas.length > 0) CView.text("  ");
        }
        if (char.stats.lust >= 60 && char.body.vaginas.length > 0) {
            switch (char.body.vaginas.get(0)!.wetness) {
                case VaginaWetness.NORMAL:
                    CView.text("Your " + describeAllVagina(char) + " dampen" + (char.body.vaginas.length > 1 ? "" : "s") + " perceptibly.");
                    break;
                case VaginaWetness.WET:
                    CView.text("Your crotch becomes sticky with girl-lust.");
                    break;
                case VaginaWetness.SLICK:
                    CView.text("Your " + describeAllVagina(char) + " become" + (char.body.vaginas.length > 1 ? "" : "s") + " sloppy and wet.");
                    break;
                case VaginaWetness.DROOLING:
                    CView.text("Thick runners of girl-lube stream down the insides of your thighs.");
                    break;
                case VaginaWetness.SLAVERING:
                    CView.text("Your " + describeAllVagina(char) + " instantly soak" + (char.body.vaginas.length > 1 ? "" : "s") + " your groin.");
                default: // Dry vaginas are unaffected

            }
        }
        CView.text("\n");
    }
}

class ImpEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (enemy.effects.has(EffectType.CameWorms)) {
            CView.text("\n\nThe imp grins at your already corrupted state...");
            enemy.stats.lust = 100;
            return { next: choiceWrap(impRapesYou, this.char) };
        }
        else {
            return impRapesYou(enemy, this.char);
        }
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return impVictory(enemy, this.char);
    }
}

export class Imp extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.Imp);
        this.description = new CharacterDescription(this, "the ", "imp", "An imp is short, only a few feet tall.  An unkempt mane of shaggy black hair hangs from his head, parted by two short curved horns.  His eyes are solid black, save for tiny red irises which glow with evil intent.  His skin is bright red, and unencumbered by clothing or armor, save for a small loincloth at his belt.  His feet are covered by tiny wooden sandals, and his hands tipped with sharp claws.  A pair of tiny but functional wings occasionally flap from his back.");
        this.body.cocks.add(new Cock(randInt(2) + 11, 2.5, CockType.DEMON));
        this.body.balls.count = 2;
        this.body.balls.size = 1;
        this.body.butt.looseness = ButtLooseness.STRETCHED;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.body.tallness = randInt(24) + 25;
        this.body.hips.rating = HipRating.BOYISH;
        this.body.butt.rating = ButtRating.TIGHT;
        this.body.skin.tone = "red";
        this.body.hair.color = "black";
        this.body.hair.length = 5;
        this.body.wings.type = WingType.IMP;

        this.stats.base.str.raw = 20;
        this.stats.base.tou.raw = 10;
        this.stats.base.spe.raw = 25;
        this.stats.base.int.raw = 12;
        this.stats.base.lib.raw = 45;
        this.stats.base.sens.raw = 45;
        this.stats.base.cor.raw = 100;
        this.stats.lust = 40;
        this.stats.level = 1;

        this.inventory = new CharacterInventory(this,
            new Weapon("claws" as WeaponName, new ItemDesc("claws"), "claws", "claw-slash", 0),
            new Armor("leathery skin" as ArmorName, new ItemDesc("leathery skin"), "leathery skin", 0)
        );

        this.combatContainer = new CombatContainer(this,
            {
                endScenes: new ImpEndScenes(this),
                rewards: {
                    gems: randInt(5) + 5,
                    drop: new WeightedDrop<string>().
                        add(ConsumableName.SuccubiMilk, 3).
                        add(ConsumableName.IncubusDraft, 3).
                        add(ConsumableName.ImpFood, 4)
                }
            });
        this.combat.action.subActions.push(new ImpMagicLustAttack());
    }
}
