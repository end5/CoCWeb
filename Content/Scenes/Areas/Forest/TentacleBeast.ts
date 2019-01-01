import { Character } from 'Engine/Character/Character';
import { CharacterType } from 'Content/Character/CharacterType';
import { NextScreenChoices, choiceWrap } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { EffectType } from 'Content/Effects/EffectType';
import { describeFoot } from 'Content/Descriptors/LegDescriptor';
import { describeCock } from 'Content/Descriptors/CockDescriptor';
import { describeClit } from 'Content/Descriptors/VaginaDescriptor';
import { describeButthole } from 'Content/Descriptors/ButtDescriptor';
import { passTime } from 'Content/Scenes/PassTime';
import { randInt } from 'Engine/Utilities/SMath';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { Cock } from 'Engine/Body/Cock';
import { ButtLooseness, ButtWetness, ButtRating } from 'Engine/Body/Butt';
import { HipRating } from 'Engine/Body/Hips';
import { SkinType } from 'Engine/Body/Skin';
import { WeightedDrop } from 'Engine/Utilities/Drops/WeightedDrop';
import { TailType, Tail } from 'Engine/Body/Tail';
import { Gender } from 'Engine/Body/GenderIdentity';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { DefeatType } from 'Engine/Combat/DefeatEvent';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { tentacleVictoryRape, tentacleLossRape } from './TentacleBeastScene';

class Attack extends CombatAction {
    public name: string = "Attack";
    public useAction(char: Character, enemy: Character) {
        CView.text("The shambling horror throws its tentacles at you with a murderous force.\n");
        let temp: number = Math.floor((char.stats.str + char.combat.attack()) - Math.random() * (enemy.stats.tou) - enemy.combat.defense());
        if (temp < 0) temp = 0;
        // Miss
        if (temp === 0 || (enemy.stats.spe - char.stats.spe > 0 && Math.floor(Math.random() * (((enemy.stats.spe - char.stats.spe) / 4) + 80)) > 80)) {
            CView.text("However, you quickly evade the clumsy efforts of the abomination to strike you.");
        }
        // Hit
        else {
            temp = enemy.combat.loseHP(temp);
            CView.text("The tentacles crash upon your body mercilessly for " + temp + " damage.");
        }
    }
}

class Entwine extends CombatAction {
    public name: string = "Entwine";
    public useAction(char: Character, enemy: Character) {
        CView.text("The beast lunges its tentacles at you from all directions in an attempt to immobilize you.\n");
        // Not Trapped yet
        if (!enemy.effects.has(EffectType.TentacleBind)) {
            // Success
            if (Math.floor(Math.random() * (((enemy.stats.spe) / 2))) > 15 || (enemy.effects.has(EffectType.Evade) && Math.floor(Math.random() * (((enemy.stats.spe) / 2))) > 15)) {
                CView.text("In an impressive display of gymnastics, you dodge, duck, dip, dive, and roll away from the shower of grab-happy arms trying to hold you. Your instincts tell you that this was a GOOD thing.\n");
            }
            // Fail
            else {
                CView.text("While you attempt to avoid the onslaught of pseudopods, one catches you around your " + describeFoot(enemy) + " and drags you to the ground. You attempt to reach for it to pull it off only to have all of the other tentacles grab you in various places and immobilize you in the air. You are trapped and helpless!!!\n\n");
                // Male/Herm Version:
                if (enemy.body.cocks.length > 0) CView.text("The creature, having immobilized you, coils a long tendril about your penis. You shudder as the creature begins stroking your cock like a maid at a dairy farm in an attempt to provoke a response from you. Unable to resist, your " + describeCock(enemy, enemy.body.cocks.get(0)) + " easily becomes erect, signaling to the creature that you are responsive to harsher stimulation.\n");
                // Female Version:
                else if (enemy.body.vaginas.length > 0) CView.text("The creature quickly positions a long tentacle with a single sucker over your clitoris. You feel the power of the suction on you, and your body quickly heats up.  Your clit engorges, prompting the beast to latch the sucker onto your " + describeClit(enemy) + ".\n");
                // Genderless
                else CView.text("The creature quickly positions a long tentacle against your " + describeButthole(enemy.body.butt) + ". It circles your pucker with slow, delicate strokes that bring unexpected warmth to your body.\n");
                enemy.stats.lust += (8 + enemy.stats.sens / 20);

                enemy.effects.create(EffectType.TentacleBind);
            }
        }
    }
}

class TentacleBeastMainAction extends CombatAction {
    public name: string = "Action";
    public subActions: CombatAction[] = [new Attack(), new Entwine()];
    public use(char: Character, enemy: Character) {
        // tentacle beasts have special AI
        if (randInt(2) === 0 || char.effects.has(EffectType.TentacleCoolDown))
            this.subActions[0].use(char, enemy);
        else this.subActions[1].use(char, enemy);
    }
}

class TentacleBeastEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (howYouWon === DefeatType.HP) {
            CView.text("Overcome by your wounds, you turn to make a last desperate attempt to run...\n\n");
            return tentacleLossRape(enemy, true);
        }
        else {
            CView.text("You give up on fighting, too aroused to resist any longer.  Shrugging, you walk into the writhing mass...\n\n");
            return { next: choiceWrap(tentacleLossRape, true) };
        }
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        if (howYouLost === DefeatType.HP) {
            CView.clear().text("The creature lets out an ear-piercing screech as it collapses upon itself. Its green coloring quickly fades to brown as the life drains from it, leaving you victorious.");
        }
        else {
            CView.text("The tentacle beast's mass begins quivering and sighing, the tentacles wrapping around each other and feverishly caressing each other.  It seems the beast has given up on fighting.");
        }
        if (howYouLost !== DefeatType.HP && enemy.gender > 0) {
            CView.clear().text("  Perhaps you could use it to sate yourself?");
            return { yes: tentacleVictoryRape, no: passTime(1) };
        }
        else {
            return { next: passTime(1) };
        }
    }
}

export class TentacleBeast extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.TentacleBeast);
        this.description = new CharacterDescription(this, "the ", "tentacle beast", "You see the massive, shambling form of the tentacle beast before you.  Appearing as a large shrub, it shifts its bulbous mass and reveals a collection of thorny tendrils and cephalopodic limbs.");
        this.genderPref = Gender.NONE;

        this.body.cocks.add(new Cock(40, 1.5));
        this.body.cocks.add(new Cock(60, 1.5));
        this.body.cocks.add(new Cock(50, 1.5));
        this.body.cocks.add(new Cock(20, 1.5));
        this.body.balls.count = 0;
        this.body.balls.size = 0;
        this.body.cumMultiplier = 3;
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.SLIME_DROOLING;
        this.body.tallness = randInt(9) + 70;
        this.body.hips.rating = HipRating.BOYISH;
        this.body.butt.rating = ButtRating.BUTTLESS;
        this.body.skin.tone = "green";
        this.body.skin.type = SkinType.PLAIN;
        this.body.skin.desc = "bark";
        this.body.hair.color = "green";
        this.body.hair.length = 1;
        this.body.tails.add(new Tail(TailType.DEMONIC));

        this.stats.base.str.raw = 58;
        this.stats.base.tou.raw = 25;
        this.stats.base.spe.raw = 45;
        this.stats.base.int.raw = 45;
        this.stats.base.lib.raw = 90;
        this.stats.base.sens.raw = 20;
        this.stats.base.cor.raw = 100;
        this.stats.base.HP.max += 350;
        this.stats.base.HP.raw += 350;
        this.stats.base.lust.raw = 10;
        this.stats.base.lustVuln = 0.8;
        this.stats.base.level.raw = 6;

        this.inventory = new CharacterInventory(this,
            new Weapon("whip-tendril" as WeaponName, new ItemDesc("whip-tendril"), "whip-tendril", "thorny tendril", 1),
            new Armor("rubbery skin" as ArmorName, new ItemDesc("rubbery skin"), "rubbery skin", 1)
        );

        this.combatContainer = new CombatContainer(this,
            {
                mainAction: new TentacleBeastMainAction(),
                endScenes: new TentacleBeastEndScenes(this),
                rewards: {
                    gems: randInt(15) + 5,
                    drop: new WeightedDrop(undefined, 1)
                }
            });
    }
}
