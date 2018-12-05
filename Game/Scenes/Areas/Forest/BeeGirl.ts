import { Flags } from 'Game/Flags';
import { Character } from 'Game/Character/Character';
import { CView } from 'Page/ContentView';
import { NextScreenChoices, choiceWrap } from 'Game/ScreenDisplay';
import { EffectType } from 'Game/Effects/EffectType';
import { passTime } from 'Game/Menus/InGame/PlayerMenu';
import { randInt, randomChoice } from 'Engine/Utilities/SMath';
import { CharacterType } from 'Game/Character/CharacterType';
import { Vagina, VaginaWetness, VaginaLooseness } from 'Game/Character/Body/Vagina';
import { BreastCup } from 'Game/Character/Body/BreastRow';
import { ButtLooseness, ButtWetness, ButtRating } from 'Game/Character/Body/Butt';
import { HipRating } from 'Game/Character/Body/Hips';
import { LegType } from 'Game/Character/Body/Legs';
import { WeightedDrop } from 'Game/Utilities/Drops/WeightedDrop';
import { ConsumableName } from 'Game/Items/Consumables/ConsumableName';
import { MaterialName } from 'Game/Items/Materials/MaterialName';
import { AntennaeType } from 'Game/Character/Body/Antennae';
import { WingType } from 'Game/Character/Body/Wings';
import { TailType, Tail } from 'Game/Character/Body/Tail';
import { EndScenes } from 'Game/Combat/EndScenes';
import { beeRapesYou, beeGirlsGetsDildoed, milkAndHoneyAreKindaFunny, rapeTheBeeGirl } from './BeeGirlScene';
import { DefeatType } from 'Game/Combat/DefeatEvent';
import { CharacterDescription } from 'Game/Character/CharacterDescription';
import { CharacterInventory } from 'Game/Inventory/CharacterInventory';
import { Weapon } from 'Game/Items/Weapons/Weapon';
import { WeaponName } from 'Game/Items/Weapons/WeaponName';
import { ItemDesc } from 'Game/Items/ItemDesc';
import { Armor } from 'Game/Items/Armors/Armor';
import { ArmorName } from 'Game/Items/Armors/ArmorName';
import { CombatContainer } from 'Game/Combat/CombatContainer';
import { CombatAction } from 'Game/Combat/Actions/CombatAction';

export const BeeGirlFlags = {
    BEE_GIRL_STATUS: 0,
    BEE_GIRL_COMBAT_LOSSES: 0,
    BEE_GIRL_COMBAT_WINS_WITH_RAPE: 0,
    BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE: 0,
    FORCE_BEE_TO_PRODUCE_HONEY: 0,
};

Flags.set("BeeGirl", BeeGirlFlags);
class BeeGirlEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (pcCameWorms) {
            CView.text("\n\nThe bee-girl goes white and backs away with a disgusted look on her face.\n\n");
            return { next: passTime(1) };
        }
        else {
            return beeRapesYou(enemy);
        }
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        CView.clear();
        if (enemy.gender > 0) {
            if (howYouLost === DefeatType.HP) {
                CView.text("You smile in satisfaction as the " + this.char.desc.short + " collapses, unable to continue fighting.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully, and you see an easy way to relieve it..\n\nWhat do you do to her?");
            }
            else {
                CView.text("You smile in satisfaction as the " + this.char.desc.short + " spreads her legs and starts frigging her honey-soaked cunt.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully, and you see an easy way to relieve it..\n\nWhat do you do to her?");
            }
            enemy.stats.lust = 98;
            enemy.stats.lust += 1;

            const dildoRape = (enemy.inventory.keyItems.has("Deluxe Dildo") ? choiceWrap(beeGirlsGetsDildoed, this.char) : undefined);
            const milkAndHoney = (enemy.effects.has(EffectType.Feeder) ? choiceWrap(milkAndHoneyAreKindaFunny, this.char) : undefined);
            return { choices: [["Rape", choiceWrap(rapeTheBeeGirl, this.char)], ["Dildo Rape", dildoRape], ["", undefined], ["B. Feed", milkAndHoney], ["Leave", leaveAfterDefeating]] };
        }
        else if (enemy.effects.has(EffectType.Feeder)) { // Genderless can still breastfeed
            if (howYouLost === DefeatType.HP) {
                CView.text("You smile in satisfaction as the " + this.char.desc.short + " collapses, unable to continue fighting.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully.\n\nWhat do you do?");
            }
            else {
                CView.text("You smile in satisfaction as the " + this.char.desc.short + " spreads her legs and starts frigging her honey-soaked cunt.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully.\n\nWhat do you do?");
            }
            return { choices: [["B. Feed", milkAndHoneyAreKindaFunny], ["", undefined], ["", undefined], ["", undefined], ["Leave", leaveAfterDefeating]] };
        }
        return { next: passTime(1) };
    }
}

function leaveAfterDefeating(beeGirl: Character): NextScreenChoices {
    if (beeGirl.stats.HP < 1) {
        BeeGirlFlags.BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE++; // This only happens if you beat her up and then don't rape her
    }
    else {
        BeeGirlFlags.BEE_GIRL_COMBAT_WINS_WITH_RAPE++; // All wins by lust count towards the desire option, even when you leave
    }
    return { next: passTime(1) };
}

class BeeSting extends CombatAction {
    public name: string = "Bee Sting";
    public useAction(beeGirl: Character, player: Character) {
        // Blind dodge change
        if (beeGirl.effects.has(EffectType.Blind)) {
            CView.text(beeGirl.desc.capitalA + beeGirl.desc.short + " completely misses you with a blind sting!!");
            return;
        }
        // Determine if dodged!
        if (player.stats.spe - beeGirl.stats.spe > 0 && Math.floor(Math.random() * (((player.stats.spe - beeGirl.stats.spe) / 4) + 80)) > 80) {
            if (player.stats.spe - beeGirl.stats.spe < 8) CView.text("You narrowly avoid " + beeGirl.desc.a + beeGirl.desc.short + "'s stinger!");
            if (player.stats.spe - beeGirl.stats.spe >= 8 && player.stats.spe - beeGirl.stats.spe < 20) CView.text("You dodge " + beeGirl.desc.a + beeGirl.desc.short + "'s stinger with superior quickness!");
            if (player.stats.spe - beeGirl.stats.spe >= 20) CView.text("You deftly avoid " + beeGirl.desc.a + beeGirl.desc.short + "'s slow attempts to sting you.");
            return;
        }
        // determine if avoided with armor.
        if (player.combat.defense() >= 10 && randInt(4) > 0) {
            CView.text("Despite her best efforts, " + beeGirl.desc.a + beeGirl.desc.short + "'s sting attack can't penetrate your armor.");
            return;
        }
        // Sting successful!  Paralize or lust?
        // Lust 50% of the time
        if (randInt(2) === 0) {
            CView.text("Searing pain lances through you as " + beeGirl.desc.a + beeGirl.desc.short + " manages to sting you!  You stagger back a step and nearly trip, flushing hotly.  ");
            CView.text("Oh no!  You've been injected with some kind of aphrodisiac.  You've got to keep focused, you can't think about... fucking... ");
            if (player.gender === 1) CView.text("or dripping honey-slicked cunts beckoning you. ");
            if (player.gender === 2) CView.text("planting your aching sex over her face while you lick her sweet honeypot. ");
            if (player.gender === 3) CView.text("or cocks, tits, and puffy nipples. ");
            player.stats.lust += 25;

            if (player.stats.lust > 60) {
                CView.text(" You shake your head and struggle to stay focused,");
                if (player.gender === 1 || player.gender === 3) CView.text(" but it's difficult with the sensitive bulge in your groin.");
                if (player.gender === 2) CView.text(" but can't ignore the soaking wetness in your groin.");
                if (player.stats.sens > 50) CView.text("  The sensitive nubs of your nipples rub tightly under your " + player.inventory.armor.displayName + ".");
            }
            else CView.text(" You shake your head and clear the thoughts from your head, focusing on the task at hand.");
            if (!player.effects.has(EffectType.lustvenom))
                player.effects.create(EffectType.lustvenom);
        }
        // Paralise the other 50%!
        else {
            CView.text("Searing pain lances through you as " + beeGirl.desc.a + beeGirl.desc.short + " manages to sting you!  You stagger back a step and nearly trip, finding it hard to move yourself.");
            const paralyzeEffect = player.effects.getByName(EffectType.ParalyzeVenom);
            if (paralyzeEffect) {
                paralyzeEffect.values.str.value.flat -= 3; // v1 - strenght penalty, v2 speed penalty
                paralyzeEffect.values.spe.value.flat -= 3; // v1 - strenght penalty, v2 speed penalty
                // paralyzeEffect.value1 += 2.9;
                // paralyzeEffect.value2 += 2.9;

                CView.text("  It's getting much harder to move, you're not sure how many more stings like that you can take!");
            }
            else {
                player.effects.create(EffectType.ParalyzeVenom, { str: { value: { flat: -2 } }, spe: { value: { flat: -2 } } });

                CView.text("  You've fallen prey to paralyzation venom!  Better end this quick!");
            }
        }
    }
}

export class BeeGirl extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.BeeGirl);
        this.description = new CharacterDescription(this, "a ", "bee-girl", "A bee-girl buzzes around you, filling the air with intoxicatingly sweet scents and a buzz that gets inside your head.  She has a humanoid face with small antennae, black chitin on her arms and legs that looks like shiny gloves and boots, sizable breasts, and a swollen abdomen tipped with a gleaming stinger.");
        this.body.vaginas.add(new Vagina(VaginaWetness.SLAVERING, VaginaLooseness.GAPING, false));
        this.body.chest.firstRow.rating = BreastCup.DD;
        this.body.butt.looseness = ButtLooseness.STRETCHED;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.body.tallness = randInt(14) + 59;
        this.body.hips.rating = HipRating.CURVY + 3;
        this.body.butt.rating = ButtRating.EXPANSIVE;
        this.body.legs.type = LegType.BEE;
        this.body.skin.tone = "yellow";
        this.body.hair.color = randomChoice("black", "black and yellow");
        this.body.hair.length = 6;
        this.body.antennae.type = AntennaeType.BEE;
        this.body.wings.type = WingType.BEE_LIKE_SMALL;
        this.body.tails.add(new Tail(TailType.BEE_ABDOMEN, 100));

        this.stats.base.str.value = 30;
        this.stats.base.tou.value = 30;
        this.stats.base.spe.value = 30;
        this.stats.base.int.value = 20;
        this.stats.base.lib.value = 60;
        this.stats.base.sens.value = 55;
        this.stats.base.cor.value = 0;
        this.stats.base.lust.value = 20 + randInt(40);
        this.stats.base.lustVuln = 0.9;
        this.stats.base.level.value = 4;

        this.inventory = new CharacterInventory(this,
            new Weapon("chitin-plated fist" as WeaponName, new ItemDesc("chitin-plated fist"), "chitin-plated fist", "armored punch", 1),
            new Armor("chitin" as ArmorName, new ItemDesc("chitin"), "chitin", 9)
        );

        this.combatContainer = new CombatContainer(this, {
            endScenes: new BeeGirlEndScenes(this),
            rewards: {
                gems: randInt(15) + 1,
                drop: new WeightedDrop<string>()
                    .add(ConsumableName.BeeHoney, 4)
                    .addMany(1, ConsumableName.OvipositionElixir, ConsumableName.WhiteSpellbook, MaterialName.BlackChitin)
            }
        });
        this.combat.action.subActions.push(new BeeSting());
    }
}
