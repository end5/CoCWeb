import { Character } from "../../../Character/Character";
import { NextScreenChoices } from "../../../ScreenDisplay";
import { CView } from "../../../../Page/ContentView";
import { describeLeg, describeLegs } from "../../../Descriptors/LegDescriptor";
import { StatusEffectType } from "../../../Effects/StatusEffectType";
import { randInt, randomChoice } from "../../../../Engine/Utilities/SMath";
import { Settings } from "../../../Settings";
import { PerkType } from "../../../Effects/PerkType";
import { CharacterType } from "../../../Character/CharacterType";
import { Cock, CockType } from "../../../Body/Cock";
import { Vagina, VaginaWetness, VaginaLooseness } from "../../../Body/Vagina";
import { BreastRow, BreastCup } from "../../../Body/BreastRow";
import { breastCupInverse } from "../../../Descriptors/BreastDescriptor";
import { ButtLooseness, ButtWetness, ButtRating } from "../../../Body/Butt";
import { HipRating } from "../../../Body/Hips";
import { WeightedDrop } from "../../../Utilities/Drops/WeightedDrop";
import { ConsumableName } from "../../../Items/Consumables/ConsumableName";
import { TailType, Tail } from "../../../Body/Tail";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { CharacterInventory } from "../../../Inventory/CharacterInventory";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { ItemDesc } from "../../../Items/ItemDesc";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { CombatContainer } from "../../../Combat/CombatContainer";
import { Dictionary } from "../../../../Engine/Utilities/Dictionary";
import { EndScenes } from "../../../Combat/EndScenes";
import { DefeatType } from "../../../Combat/DefeatEvent";
import { defeatTheKitsunes, loseToKitsunes, KitsuneFlags } from "./KitsuneScene";
import { CombatEffectType } from "../../../Effects/CombatEffectType";
import { CombatAction } from "../../../Combat/Actions/CombatAction";
import { IReaction } from "../../../Combat/Actions/IReaction";
import { BasicAttack } from "../../../Combat/Actions/BasicAttack";
import { CombatActionType } from "../../../Combat/Actions/CombatActionType";

// Combat Abilities:
// the kitsune are an almost purely magical mob, relying mainly on tease attacks and spells that raise lust.
// Entwine:
class Entwine extends CombatAction {
    public name: string = "Entwine";
    public useAction(char: Character, enemy: Character) {
        CView.text("The kitsune closes in on you with a mischievous glint in her eyes.  You raise your guard, keeping your eyes trained on her to ensure that she doesn't try to pull anything.  Suddenly, you feel something coiling around your " + describeLeg(enemy) + ", and let out a yelp as you are suddenly lifted into the air, entangled in the kitsune's tails!");
        CView.text("\n\nYour limbs are bound tightly while coils of delightfully soft fur caress you on all sides.  You can do little besides struggle against your furry bonds as the constant writhing of her tails sends shudders flying up and down your spine.");
        char.combat.effects.add(CombatEffectType.PCTailTangle, enemy, { other: { counter: 0 } });
        enemy.stats.lust += 10 + enemy.stats.sens / 8;
    }
}

// Fox Fire: - Low piercing damage, +10-15 LUST
class FoxFire extends CombatAction {
    public name: string = "FoxFire";
    public useAction(char: Character, enemy: Character) {
        CView.text("The kitsune makes a small circle in the air with her fingers, conjuring up a pale blue flame into her palm with the sound of flint striking against steel.  Pursing her lips, she blows it toward you with a kiss.");
        CView.text("\n\nThe flames burn furiously, but leave you with an incredibly pleasant tingling sensation all over your body.  Your skin flushes with excitement, and you can feel blood rushing to your extremities, making you shudder with pleasure.");
        let damage: number = 5 + randInt(20);
        damage = enemy.combat.stats.loseHP(damage);
        CView.text(" (" + damage + ")");
        enemy.stats.lust += 15 + enemy.stats.sens / 10;
    }
}

// Illusion: - Raises enemy evasion, but can be resisted.
// Factors affecting resist: INT (1% per point, max 70%), "Whispered" perk (20% flat bonus), "Religious" background and < 20 corruption (20% bonus at 0, losing 1% per point of corruption.)
// Success:
class Illusion extends CombatAction {
    public name: string = "Illusion";
    public useAction(char: Character, enemy: Character) {
        CView.text("You struggle to keep your eyes on the kitsune, ghostly laughter echoing all around you as you turn to and fro, trying to track her movements.  It almost seems like the edges of reality are blurring around her, severely distorting your perceptions and making it hard to follow her.  It's going to be much harder to hit her if she keeps this up!");
        // Resist: - successfully resisting deals small health & lust damage to kitsune
        let resist: number = 0;
        if (enemy.stats.int < 30) resist = Math.round(enemy.stats.int);
        else resist = 30;
        if (enemy.perks.has(PerkType.Whispered)) resist += 20;
        if (enemy.perks.has(PerkType.HistoryReligious) && enemy.stats.cor < 20) resist += 20 - enemy.stats.cor;
        if (randInt(100) < resist) {
            CView.text("\n\nThe kitsune seems to melt away before your eyes for a moment, as though the edges of reality are blurring around her.  You tighten your focus, keeping your eyes trained on her, and she suddenly reels in pain, clutching her forehead as she is thrust back into view.  She lets out a frustrated huff of disappointment, realizing that you have resisted her illusions.");
        }
        else {
            char.combat.effects.add(CombatEffectType.Illusion, char, { spe: { value: { flat: 20 } } });
        }
    }
}

// Seal: - cancels and disables whatever command the player uses this round. Lasts 3 rounds, cannot seal more than one command at a time.
// PCs with "Religious" background and < 20 corruption have up to 20% resistance to sealing at 0 corruption, losing 1% per corruption.
class Seal extends CombatAction {
    public name: string = "Seal";
    public useAction(char: Character, enemy: Character) {
        let resist: number = 0;
        if (enemy.stats.int < 30) resist = Math.round(enemy.stats.int);
        else resist = 30;
        if (enemy.perks.has(PerkType.Whispered)) resist += 20;
        if (enemy.perks.has(PerkType.HistoryReligious) && enemy.stats.cor < 20) resist += 20 - enemy.stats.cor;
        const select: number = randInt(7);
        // Attack:
        if (select === 0) {
            CView.text("The kitsune playfully darts around you, grinning coyly.  She somehow slips in under your reach, and before you can react, draws a small circle on your chest with her fingertip.  As you move to strike again, the flaming runic symbol she left on you glows brightly, and your movements are halted mid-swing.");
            CView.text("\n\n\"<i>Naughty naughty, you should be careful with that.</i>\"");

            CView.text("\n\nDespite your best efforts, every time you attempt to attack her, your muscles recoil involuntarily and prevent you from going through with it.  <b>The kitsune's spell has sealed your attack!</b>  You'll have to wait for it to wear off before you can use your basic attacks.");
            enemy.combat.effects.add(CombatEffectType.Sealed, char, { expireCountdown: 4, blockedTypes: CombatActionType.Attack });
        }
        else if (select === 1) {
            // Tease:
            CView.text("You are taken by surprise when the kitsune appears in front of you out of nowhere, trailing a fingertip down your chest.  She draws a small circle, leaving behind a glowing, sparking rune made of flames.  You suddenly find that all your knowledge of seduction and titillation escapes you.  <b>The kitsune's spell has sealed your ability to tease!</b>  Seems you won't be getting anyone hot and bothered until it wears off.");
            enemy.combat.effects.add(CombatEffectType.Sealed, char, { expireCountdown: 4, blockedTypes: CombatActionType.Tease });
        }
        // Spells:
        else if (select === 2) {
            CView.text("\"<i>Oh silly, trying to beat me at my own game are you?</i>\"  the kitsune says with a smirk, surprising you as she appears right in front of you.  She traces a small circle around your mouth, and you find yourself stricken mute!  You try to remember the arcane gestures to cast your spell and find that you've forgotten them too.  <b>The kitsune's spell has sealed your magic!</b>  You won't be able to cast any spells until it wears off.");
            enemy.combat.effects.add(CombatEffectType.Sealed, char, { expireCountdown: 4, blockedTypes: CombatActionType.Spells });
        }
        // Items:
        else if (select === 3) {
            CView.text("\"<i>Tsk tsk, using items?  That's cheating!</i>\"  the kitsune says as she appears right in front of you, taking you off guard.  Her finger traces a small circle on your pouch, leaving behind a glowing rune made of crackling flames.  No matter how hard you try, you can't seem to pry it open.  <b>The kitsune's spell has sealed your item pouch!</b>  Looks like you won't be using any items until the spell wears off.");
            enemy.combat.effects.add(CombatEffectType.Sealed, char, { expireCountdown: 4, blockedTypes: CombatActionType.Items });
        }
        // Run:
        else if (select === 4) {
            CView.text("\"<i>Tsk tsk, leaving so soon?</i>\"  the kitsune says, popping up in front of you suddenly as you attempt to make your escape.  Before you can react, she draws a small circle on your chest with her fingertip, leaving behind a glowing rune made of crackling blue flames.  You try to run the other way, but your " + describeLegs(enemy) + " won't budge!\n\n\"<i>Sorry baby, you'll just have to stay and play~.</i>\" she says in a singsong tone, appearing in front of you again.  <b>The kitsune's spell prevents your escape!</b>  You'll have to tough it out until the spell wears off.");
            enemy.combat.effects.add(CombatEffectType.Sealed, char, { expireCountdown: 4, blockedTypes: CombatActionType.MoveAway });
        }
        // P.Special:
        else if (select === 5) {
            CView.text("You jump with surprise as the kitsune appears in front of you, grinning coyly.  As she draws a small circle on your forehead with her fingertip, you find that you suddenly can't remember how to use any of your physical skills!");
            CView.text("\n\n\"<i>Oh no darling, </i>I'm<i> the one with all the tricks here.</i>\"");
            CView.text("\n\n<b>The kitsune's spell has sealed your physical skills!</b>  You won't be able to use any of them until the spell wears off.");
            enemy.combat.effects.add(CombatEffectType.Sealed, char, { expireCountdown: 4, blockedTypes: CombatActionType.PhysSpec });
        }
        // M.Special:
        else {
            CView.text("You jump with surprise as the kitsune appears in front of you, grinning coyly.  As she draws a small circle on your forehead with her fingertip, you find that you suddenly can't remember how to use any of your magical skills!");
            CView.text("\n\n\"<i>Oh no darling, </i>I'm<i> the one with all the tricks here.</i>\"");
            CView.text("\n\n<b>The kitsune's spell has sealed your magical skills!</b>  You won't be able to use any of them until the spell wears off.");
            enemy.combat.effects.add(CombatEffectType.Sealed, char, { expireCountdown: 4, blockedTypes: CombatActionType.MagicSpec });
        }
        if (resist >= randInt(100)) {
            CView.text("\n\nUpon your touch, the seal dissipates, and you are free of the kitsune's magic!  She pouts in disappointment, looking thoroughly irritated, but quickly resumes her coy trickster facade.");
            enemy.combat.effects.remove(CombatEffectType.Sealed);
        }
    }
}

class Tease extends CombatAction {
    public name: string = "Tease";
    public useAction(char: Character, enemy: Character) {
        let select: number = randInt(3);
        if (char.body.hair.color === "red" && randInt(2) === 0) select = 3;
        if (select === 0) CView.text("You rub your eyes, suddenly seeing triple as you find yourself in the midst of a crowd of kitsune doppelgangers.  They run their hands all over you, teasing and doting on you as their tails caress every inch of your body.  Taken by surprise, you forget to fight back until they have already dispersed, blending back into a single fox-woman.");
        else if (select === 1) CView.text("Bending forward, the kitsune runs her hands down over her breasts, jiggling them enticingly and squeezing them together.  Hooking a finger in her robes, she slides it down, tugging them aside until her nipples are just barely covered, and with a teasing smirk, pulls them back up, leaving you wanting.");
        else if (select === 2) CView.text("Turning her back to you, the kitsune fans out her tails, peering back as she lifts the hem of her robe to expose her plump hindquarters.  Her tails continually shift and twist, blocking your view, but it only serves to make you want it even <i>more</i>, licking your lips in anticipation.");
        // Redhead only:
        else CView.text("The kitsune sways her hips enticingly as she appears in front of you abruptly, rubbing up against your side.  Her teasing caresses make you shiver with arousal, and you can feel something thick and warm pressing against your [hips].  She gives you a wry grin as she breaks away from you, sporting an obvious tent in her robes.  \"<i>Just you wait...</i>\"");
        enemy.stats.lust += 5 + enemy.stats.sens / 7;
    }
}

class KitsuneMainAction extends CombatAction {
    public name: string = "Action";
    public subActions: CombatAction[] = [new BasicAttack(), new FoxFire(), new Tease(), new Seal(), new Entwine(), new Illusion()];
    public use(char: Character, enemy: Character) {
        const moves = [new FoxFire(), new FoxFire(), new Tease(), new Tease()];
        if (!enemy.combat.effects.has(CombatEffectType.Sealed)) moves.push(new Seal());
        if (!enemy.combat.effects.has(CombatEffectType.Sealed)) moves.push(new Seal());
        if (!char.combat.effects.has(CombatEffectType.PCTailTangle)) moves.push(new Entwine());
        if (!char.combat.effects.has(CombatEffectType.Illusion)) moves.push(new Illusion());
        return randomChoice(...moves);
    }
}

const KitsuneReactions = new Dictionary<string, IReaction>();
KitsuneReactions.set("Wait", {
    beforeUseAction: (kitsune: Character, enemy: Character) => {
        if (!kitsune.combat.effects.has(CombatEffectType.PCTailTangle)) return false;
        CView.clear();
        CView.text("Happily, you slump deeper into the fluffy tails, eliciting an amused giggle from the kitsune.");
        if (Settings.silly()) CView.text("  You're so glad you got to touch fluffy tail.");
        CView.text("\n\nShe licks her lips, running her hands along you wherever she can find exposed flesh.  Her fingertips leave small trails of dazzling blue that make you flush with lust - you must escape her grasp soon or else you will be like putty in her hands!");
        enemy.stats.lust += 5 + enemy.stats.sens / 10;
        return true;
    }
});
KitsuneReactions.set("Struggle", {
    beforeUseAction: (kitsune: Character, enemy: Character) => {
        if (!kitsune.combat.effects.has(CombatEffectType.PCTailTangle)) return false;
        CView.clear();
        // Struggle:
        CView.text("You struggle against the kitsune's tails with all your might, desperately trying to free yourself before she has her way with you.");
        // Success
        if (randInt(20) + enemy.stats.str / 20 + kitsune.combat.effects.get(CombatEffectType.PCTailTangle)!.values.other!.counter >= 12) {
            CView.text("  Summoning up reserves of strength you didn't know you had, you wrench yourself free of her tails, pushing her away.\n\n");
            kitsune.combat.effects.remove(CombatEffectType.PCTailTangle);
            kitsune.combat.action.use(kitsune, enemy);
        }
        // Failure - +5-10 LUST
        else {
            CView.text("  Despite your valiant efforts, your wriggling only serves to get you deeper entangled in the fluffy tails, eliciting an amused giggle from the kitsune.");
            CView.text("\n\nShe licks her lips, running her hands along you wherever she can find exposed flesh.  Her fingertips leave small trails of dazzling blue that make you flush with lust - you must escape her grasp soon or else you will be like putty in her hands!");
            enemy.stats.lust += 5 + enemy.stats.sens / 10;

            kitsune.combat.effects.get(CombatEffectType.PCTailTangle)!.values.other!.counter += 3;
        }
        return true;
    }
});

class KitsuneEndScenes extends EndScenes {
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        // $> Need Fix for pcCameWorms
        // if (pcCameWorms) {
        //     CView.text("\n\nThe kitsune recoils before running off, no longer interested in you...");
        //     return { next: passTime(1) };
        // }
        // else {
        return loseToKitsunes(enemy, this.char);
        // }
    }

    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        return defeatTheKitsunes(enemy, this.char);
    }
}

export class Kitsune extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor(hairColor: "red" | "blonde" | "black") {
        super(CharacterType.Kitsune);

        if (randInt(3) !== 2) KitsuneFlags.redheadIsFuta = 1;
        this.description = new CharacterDescription(this, "a ", "kitsune", "A kitsune stands in front of you, about five and a half feet tall.  She has a head of " +
            ({
                blonde: "long flaxen",
                black: "lustrous, ass-length black",
                red: "unkempt, shoulder-length reddish"
            }[hairColor]) +
            " hair.  She appears mostly human, except for a pair of large, furry ears poking through her hair and six luxurious silky tails swaying in the air behind her.  Her robes are revealing but comfortable-looking, hugging her voluptuous curves and exposing large swaths of tattooed skin.  A layer of ornate tattoos covers patches of her exposed flesh, accentuating her feminine curves nicely, and each movement brings a pleasant jiggle from her plump backside and large breasts.");
        // this.plural = false;
        if (hairColor === "red" && KitsuneFlags.redheadIsFuta === 1) {
            this.body.cocks.add(new Cock(randInt(13) + 14, 1.5 + randInt(20) / 2, CockType.HUMAN));
            this.body.balls.count = 2;
            this.body.balls.size = 2 + randInt(13);
            this.body.cumMultiplier = 1.5;
            this.hoursSinceCum = this.body.balls.size * 10;
        }
        this.body.vaginas.add(new Vagina(VaginaWetness.SLICK, VaginaLooseness.NORMAL, false));
        this.effects.add(StatusEffectType.BonusVCapacity, { vaginalCapacity: 20 });
        this.body.chest.add(new BreastRow(breastCupInverse("D")));
        this.body.chest.firstRow.rating = BreastCup.D;
        this.body.butt.looseness = ButtLooseness.TIGHT;
        this.body.butt.wetness = ButtWetness.NORMAL;
        this.effects.add(StatusEffectType.BonusACapacity, { analCapacity: 20 });
        this.body.tallness = randInt(24) + 60;
        this.body.hips.rating = HipRating.AMPLE;
        this.body.butt.rating = ButtRating.AVERAGE + 1;
        this.body.skin.tone = "pale";
        this.body.hair.color = hairColor;
        this.body.hair.length = 13 + randInt(20);
        this.body.tails.add(new Tail(TailType.FOX));

        this.stats.base.str.value = 35;
        this.stats.base.tou.value = 45;
        this.stats.base.spe.value = 90;
        this.stats.base.int.value = 95;
        this.stats.base.lib.value = 60;
        this.stats.base.sens.value = 65;
        this.stats.base.cor.value = 45;
        this.stats.base.HP.max += 120;
        this.stats.base.HP.value += 120;
        this.stats.base.lust.value = 20;
        this.stats.base.lustVuln = 0.9;
        this.stats.base.level.value = 6;

        this.inventory = new CharacterInventory(this,
            new Weapon("claws" as WeaponName, new ItemDesc("claws"), "claws", "punch", 1),
            new Armor("skin" as ArmorName, new ItemDesc("skin"), "skin", 1),
        );

        this.combatContainer = new CombatContainer(this,
            {
                mainAction: new KitsuneMainAction(),
                reactions: KitsuneReactions,
                endScenes: new KitsuneEndScenes(this),
                rewards: {
                    gems: randInt(10) + 10,
                    drop: new WeightedDrop(ConsumableName.FoxJewel, 1)
                }
            });
    }
}
