import { Character } from "../../../Character/Character";
import { defeatImpLord, loseToAnImpLord } from "./ImpLordScene";
import { NextScreenChoices } from "../../../ScreenDisplay";
import { CView } from "../../../../Page/ContentView";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { combatDodge } from "../../../Combat/CombatUtils";
import { EndScenes } from "../../../Combat/EndScenes";
import { DefeatType } from "../../../Combat/DefeatEvent";
import { Cock, CockType } from "../../../Body/Cock";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { HipRating } from "../../../Body/Hips";
import { LegType } from "../../../Body/Legs";
import { WeightedDrop } from "../../../Utilities/Drops/WeightedDrop";
import { ConsumableName } from "../../../Items/Consumables/ConsumableName";
import { WingType } from "../../../Body/Wings";
import { CharacterInventory } from "../../../Inventory/CharacterInventory";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { CombatContainer } from "../../../Combat/CombatContainer";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { ItemDesc } from "../../../Items/ItemDesc";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { CharacterType } from "../../../Character/CharacterType";
import { CombatAction } from "../../../Combat/Actions/CombatAction";

// Special Attack 1
class Fire extends CombatAction {
    public name: string = "Imp Fire";
    public useAction(char: Character, enemy: Character) {
        CView.text("The imp mutters something to himself. Before you have time to react the demonic creature's hand is filled with a bright red fire that he hurls at you.  The flames lick at your body leaving a painful burn on you torso, as well as an arousing heat in your groin.");
        // [-HP // +Lust(minor)]
        const damage: number = 40 + randInt(10);
        enemy.combat.stats.loseHP(damage);
        enemy.stats.lust += 20 + enemy.stats.cor / 10;
    }
}

// Heavy Attack
class HeavyAttack extends CombatAction {
    public name: string = "Heavy Attack";
    public useAction(char: Character, enemy: Character) {
        let damage: number = Math.floor((char.stats.str + char.combat.stats.attack() + 20) - randInt(enemy.stats.tou) - enemy.combat.stats.defense());
        CView.text("The demonic creature slashes a clawed hand towards your stomach,");
        if (combatDodge(char, enemy)) CView.text(" but you handily avoid it.");
        else if (damage <= 0) CView.text(" but the attack proves ineffectual.");
        else {
            CView.text("leaving a large gash. The attack leaves you slightly stunned, but you recover. ");
            damage = enemy.combat.stats.loseHP(damage);
            CView.text("(" + damage + ")");
        }
    }
}

// Lust Attack
class LustAttack extends CombatAction {
    public name: string = "Lust Attack";
    public useAction(char: Character, enemy: Character) {
        CView.text("Lowering his loincloth the imp reveals his inhumanly thick shaft.  He smirks and licks his lips as he gives his cock a squeeze, milking a few beads of clear pre from the tip.  You shake your head and try to ignore your growing need.");
        // [+Lust]
        enemy.stats.lust += 5 + enemy.stats.lib / 5 + enemy.stats.cor / 5;
    }
}

// Lust and Light Attack
class LustAttackWithDamage extends CombatAction {
    public name: string = "Lust + Attack";
    public useAction(char: Character, enemy: Character) {
        CView.text("Reaching into his satchel the devilish creature pulls out a leather riding crop.  He quickly rushes forward, but somehow manages to get behind you.  Before you can react the imp lashes out, striking your [butt] twice with the riding crop.  The strikes leave a slight burning feeling, as well as a strange sense of arousal.");
        let damage: number = 3 + randInt(10);
        damage = enemy.combat.stats.loseHP(damage);
        CView.text(" (" + damage + ")");
        // [-HP(minor) // +Lust]
        enemy.stats.lust += 5 + enemy.stats.sens / 4 + enemy.stats.cor / 10;
    }
}

class ImpLordEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        return loseToAnImpLord(enemy, this.char);
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return defeatImpLord(enemy, this.char);
    }
}

export class ImpLord extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.ImpLord);
        this.description = new CharacterDescription(this, "the ", "imp lord", "The greater imp has an angular face, complete with curved nose and burnt red skin typical of imps.  He has no hair on his head, leaving his cold, lust-clouded, black eyes unobstructed.  Just above his long pointed ears are two curved bovine horns.  While still short, he's much taller then the average imp, being nearly four feet tall, and extremely well-muscled.  A pair of powerful wings extends out from his shoulders, however, you suspect he wouldn't be able to fly for long due to his extreme bulk.  A thick coating of fur starts at his well toned hips and works its way down his powerful legs.  His legs end in a pair of oddly jointed, demonic hooves.  His demonic figure is completed by a thin tail that has an arrowhead shaped tip.\n\nThe greater imp, like most imps wear very little clothing; only a simple loincloth and satchel hang from his waist.  You also note that the imp has two barbell piercings in his nipples. The creature doesn't seem to have any weapons, aside from his sharp black finger nails.");

        // Imps now only have demon dicks.
        // Not sure if I agree with this, I can imagine the little fuckers abusing the
        // shit out of any potions they can get their hands on.
        this.body.cocks.add(new Cock(randInt(2) + 11, 2.5, CockType.DEMON));
        this.body.balls.count = 2;
        this.body.balls.size = 1;
        this.body.cumMultiplier = 3;
        this.hoursSinceCum = 20;
        this.body.butt.looseness = ButtLooseness.STRETCHED;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.body.tallness = randInt(14) + 40;
        this.body.hips.rating = HipRating.BOYISH;
        this.body.butt.rating = ButtRating.TIGHT;
        this.body.legs.type = LegType.HOOFED;
        this.body.skin.tone = "red";
        this.body.wings.type = WingType.IMP;

        this.stats.base.str.value = 55;
        this.stats.base.tou.value = 40;
        this.stats.base.spe.value = 75;
        this.stats.base.int.value = 42;
        this.stats.base.lib.value = 55;
        this.stats.base.sens.value = 35;
        this.stats.base.cor.value = 100;
        this.stats.base.lust.value = 30;
        this.stats.base.lustVuln = .65;
        this.stats.base.level.value = 7;
        this.stats.base.HP.max += 100;
        this.stats.base.HP.value += 100;

        this.inventory = new CharacterInventory(this,
            new Weapon("fist" as WeaponName, new ItemDesc("fist"), "fist", "punch", 10),
            new Armor("leathery skin" as ArmorName, new ItemDesc("leathery skin"), "leathery skin", 5)
        );

        this.combatContainer = new CombatContainer(this,
            {
                endScenes: new ImpLordEndScenes(this),
                rewards: {
                    gems: randInt(15) + 25,
                    drop: new WeightedDrop<string>().
                        add(ConsumableName.MinotaurBlood, 1).
                        add(ConsumableName.LaBova, 1).
                        add(ConsumableName.IncubusDraft, 6).
                        add(ConsumableName.SuccubiMilk, 6)
                }
            });
        this.combat.action.subActions.push(new Fire(), new HeavyAttack(), new LustAttack(), new LustAttackWithDamage());
    }
}
