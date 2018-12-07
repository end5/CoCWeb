import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { EffectType } from 'Game/Effects/EffectType';
import { randInt } from 'Engine/Utilities/SMath';
import { CharacterType } from 'Game/Character/CharacterType';
import { Cock, CockType } from 'Game/Character/Body/Cock';
import { BreastRow } from 'Game/Character/Body/BreastRow';
import { ButtLooseness, ButtWetness, ButtRating } from 'Game/Character/Body/Butt';
import { HipRating } from 'Game/Character/Body/Hips';
import { SkinType } from 'Game/Character/Body/Skin';
import { WeightedDrop } from 'Game/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Game/Items/Consumables/ConsumableName';
import { TailType, Tail } from 'Game/Character/Body/Tail';
import { CharacterDescription } from 'Game/Character/CharacterDescription';
import { CharacterInventory } from 'Game/Inventory/CharacterInventory';
import { Weapon } from 'Game/Items/Weapons/Weapon';
import { Armor } from 'Game/Items/Armors/Armor';
import { WeaponName } from 'Game/Items/Weapons/WeaponName';
import { ItemDesc } from 'Game/Items/ItemDesc';
import { ArmorName } from 'Game/Items/Armors/ArmorName';
import { CombatContainer } from 'Game/Combat/CombatContainer';
import { CombatAction } from 'Game/Combat/Actions/CombatAction';
import { EndScenes } from 'Game/Combat/EndScenes';
import { DefeatType } from 'Game/Combat/DefeatEvent';
import { akbalWon, akbalDefeated } from './AkbalScenes';

class Attack extends CombatAction {
    public name: string = "Attack";
    public useAction(char: Character, enemy: Character) {
        // Chances to miss:
        let damage: number = 0;
        // Blind dodge change
        if (char.effects.has(EffectType.Blind)) {
            CView.text(char.desc.capitalA + char.desc.short + " seems to have no problem guiding his attacks towards you, despite his blindness.\n");
        }
        // Determine if dodged!
        if (enemy.stats.spe - char.stats.spe > 0 && Math.floor(Math.random() * (((enemy.stats.spe - char.stats.spe) / 4) + 80)) > 80) {
            if (enemy.stats.spe - char.stats.spe < 8)
                CView.text("You narrowly avoid " + char.desc.a + char.desc.short + "'s " + char.inventory.weapon.verb + "!");
            if (enemy.stats.spe - char.stats.spe >= 8 && enemy.stats.spe - char.stats.spe < 20)
                CView.text("You dodge " + char.desc.a + char.desc.short + "'s " + char.inventory.weapon.verb + " with superior quickness!");
            if (enemy.stats.spe - char.stats.spe >= 20)
                CView.text("You deftly avoid " + char.desc.a + char.desc.short + "'s slow " + char.inventory.weapon.verb + ".");
            return;
        }
        // Determine if evaded
        if (enemy.effects.has(EffectType.Evade) && randInt(100) < 10) {
            CView.text("Using your skills at evading attacks, you anticipate and sidestep " + char.desc.a + char.desc.short + "'s attack.");
            return;
        }
        // Determine if flexibilitied
        if (enemy.effects.has(EffectType.Flexibility) && randInt(100) < 10) {
            CView.text("Using your cat-like agility, you twist out of the way of " + char.desc.a + char.desc.short + "'s attack.");
            return;
        }
        // Determine damage - str modified by enemy toughness!
        // *Normal Attack A -
        if (randInt(2) === 0) {
            // (medium HP damage)
            damage = Math.floor((char.stats.str + char.combat.attack()) - Math.random() * (enemy.stats.tou) - enemy.combat.defense());
            if (damage <= 0) {
                CView.text("Akbal lunges forwards but with your toughness");
                if (enemy.combat.defense() > 0)
                    CView.text(" and " + enemy.inventory.armor.displayName + ", he fails to deal any damage.");
                else
                    CView.text(" he fails to deal any damage.");
            }
            else {
                CView.text("Akbal rushes at you, his claws like lightning as they leave four red-hot lines of pain across your stomach.");
                enemy.combat.loseHP(damage);
            }
        } else { // *Normal Attack B
            // (high HP damage)
            damage = Math.floor((char.stats.str + 25 + char.combat.attack()) - Math.random() * (enemy.stats.tou) - enemy.combat.defense());
            if (damage === 0) {
                CView.text("Akbal lunges forwards but between your toughness ");
                if (enemy.combat.defense() > 0)
                    CView.text("and " + enemy.inventory.armor.displayName + ", he fails to deal any damage.");
            }
            else {
                CView.text("Akbal snarls as he flies towards you, snapping his ivory teeth on your arm. You scream out in pain as you throw him off.");
                enemy.combat.loseHP(damage);
            }
        }
    }
}

class Lust extends CombatAction {
    public name: string = "Special";
    public useAction(char: Character, enemy: Character) {
        // *Lust Attack -
        if (!enemy.effects.has(EffectType.Whispered)) {
            CView.text("You hear whispering in your head. Akbal begins speaking to you as he circles you, telling all the ways he'll dominate you once he beats the fight out of you.");
            // (Lust increase)
            enemy.stats.lust += 7 + (100 - enemy.stats.int) / 10;

            enemy.effects.create(EffectType.Whispered);
        }
        // Continuous Lust Attack -
        else {
            CView.text("The whispering in your head grows, many voices of undetermined sex telling you all the things the demon wishes to do to you. You can only blush.");
            // (Lust increase)
            enemy.stats.lust += 12 + (100 - enemy.stats.int) / 10;

        }
    }
}

class Special extends CombatAction {
    public name: string = "Special";
    public useAction(char: Character, enemy: Character) {
        // *Special Attack A -
        if (randInt(2) === 0 && enemy.stats.spe > 20) {
            const speedChange: number = enemy.stats.spe / 5 * -1;
            CView.text("Akbal's eyes fill with light, and a strange sense of fear begins to paralyze your limbs.");
            // (Speed decrease)
            enemy.stats.spe += speedChange;

            const akbalSpeed = enemy.effects.getByName(EffectType.AkbalSpeed);
            if (akbalSpeed)
                akbalSpeed.values.spe.value.flat += speedChange;
            else
                enemy.effects.create(EffectType.AkbalSpeed, { spe: { value: { flat: speedChange } } });
        }
        // *Special Attack B -
        else {
            CView.text("Akbal releases an ear-splitting roar, hurling a torrent of emerald green flames towards you.\n");
            // (high HP damage)
            // Determine if dodged!
            if (enemy.stats.spe - char.stats.spe > 0 && Math.floor(Math.random() * (((enemy.stats.spe - char.stats.spe) / 4) + 80)) > 80) {
                if (enemy.stats.spe - char.stats.spe < 8)
                    CView.text("You narrowly avoid " + char.desc.a + char.desc.short + "'s fire!");
                if (enemy.stats.spe - char.stats.spe >= 8 && enemy.stats.spe - char.stats.spe < 20)
                    CView.text("You dodge " + char.desc.a + char.desc.short + "'s fire with superior quickness!");
                if (enemy.stats.spe - char.stats.spe >= 20)
                    CView.text("You deftly avoid " + char.desc.a + char.desc.short + "'s slow fire-breath.");
                return;
            }
            // Determine if evaded
            if (enemy.effects.has(EffectType.Evade) && randInt(100) < 20) {
                CView.text("Using your skills at evading attacks, you anticipate and sidestep " + char.desc.a + char.desc.short + "'s fire-breath.");
                return;
            }
            // Determine if flexibilitied
            if (enemy.effects.has(EffectType.Flexibility) && randInt(100) < 10) {
                CView.text("Using your cat-like agility, you contort your body to avoid " + char.desc.a + char.desc.short + "'s fire-breath.");
                return;
            }
            CView.text("You are burned badly by the flames! (" + enemy.combat.loseHP(40) + ")");

        }
    }
}

// *Support ability -
class Heal extends CombatAction {
    public name: string = "Heal";
    public useAction(char: Character, enemy: Character) {
        if (char.combat.HPRatio() >= 1)
            CView.text("Akbal licks himself, ignoring you for now.");
        else
            CView.text("Akbal licks one of his wounds, and you scowl as the injury quickly heals itself.");
        char.stats.HP += 30;
        char.stats.lust += 10;
    }
}

class AkbalEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        // $> Need Fix for pcCameWorms
        return akbalWon(enemy, this.char, howYouWon === DefeatType.HP, enemy.effects.has(EffectType.CameWorms));
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return akbalDefeated(enemy, this.char, howYouLost === DefeatType.HP);
    }
}

export class Akbal extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.Akbal);
        this.description = new CharacterDescription(this, "", "Akbal", "Akbal, 'God of the Terrestrial Fire', circles around you. His sleek yet muscular body is covered in tan fur, with dark spots that seem to dance around as you look upon them.  His mouth holds two ivory incisors that glint in the sparse sunlight as his lips tremble to the sound of an unending growl.  Each paw conceals lethal claws capable of shredding men and demons to ribbons.  His large and sickeningly alluring bright green eyes promise unbearable agony as you look upon them.");
        this.body.cocks.add(new Cock(15, 2.5, CockType.DOG));
        this.body.balls.count = 2;
        this.body.balls.size = 4;
        this.body.cumMultiplier = 6;
        this.body.chest.add(new BreastRow());
        this.body.chest.add(new BreastRow());
        this.body.chest.add(new BreastRow());
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.body.tallness = 4 * 12;
        this.body.hips.rating = HipRating.SLENDER;
        this.body.butt.rating = ButtRating.TIGHT;
        this.body.skin.tone = "spotted";
        this.body.skin.type = SkinType.FUR;
        this.body.hair.color = "black";
        this.body.hair.length = 5;
        this.body.tails.add(new Tail(TailType.DOG));
        this.hoursSinceCum = 400;

        this.stats.base.str.value = 55;
        this.stats.base.tou.value = 53;
        this.stats.base.spe.value = 50;
        this.stats.base.int.value = 75;
        this.stats.base.lib.value = 50;
        this.stats.base.sens.value = 50;
        this.stats.base.cor.value = 100;
        this.stats.base.lust.value = 30;
        this.stats.base.lustVuln = 0.8;
        this.stats.base.HP.max += 20;
        this.stats.base.HP.value += 20;
        this.stats.base.level.value = 6;

        this.inventory = new CharacterInventory(this,
            new Weapon("claws" as WeaponName, new ItemDesc("claws"), "claws", "claw-slash", 5),
            new Armor("shimmering pelt" as ArmorName, new ItemDesc("shimmering pelt"), "shimmering pelt", 5)
        );

        this.combatContainer = new CombatContainer(this,
            {
                endScenes: new AkbalEndScenes(this),
                rewards: {
                    gems: 15,
                    drop: new WeightedDrop<string>().
                        add(ConsumableName.IncubusDraft, 6).
                        add(ConsumableName.WhiskerFruit, 3).
                        add(WeaponName.Pipe, 1),
                }
            });
        this.combat.action.subActions = [new Attack(), new Lust(), new Special(), new Heal()];
    }
}
