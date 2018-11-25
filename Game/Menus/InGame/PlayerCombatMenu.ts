import { Character } from '../../Character/Character';
import { CombatAction } from '../../Combat/Actions/CombatAction';
import { CombatManager, getEnemies } from '../../Combat/CombatManager';
import { NextScreenChoices, ScreenChoice, ClickOption } from '../../ScreenDisplay';
import { describeVagina } from '../../Descriptors/VaginaDescriptor';
import { CView } from '../../../Page/ContentView';
import { CombatEffectType } from '../../Effects/CombatEffectType';
import { playerMenu } from './PlayerMenu';

export function combatMenu(character: Character): NextScreenChoices {
    if (CombatManager.encounter) {
        CView.clear();
        const enemies = getEnemies(CombatManager.encounter, character);
        for (const enemy of enemies.ableMembers) {
            enemyDescription(character, enemy);
        }

        return showMenu(character, character.combat.action);
    }
    throw new Error('Combat menu displayed when no combat encounter has been created');
}

function showMenu(char: Character, mainAction?: CombatAction, prevMenu?: ClickOption): NextScreenChoices {
    if (CombatManager.encounter) {

        const choices: ScreenChoice[] = [];

        // Main Action          Tease               Spells  Items       Move Away
        // Physical Specials    Magical Specials    Wait    Fantasize   Inspect

        if (!mainAction)
            mainAction = char.combat.action;

        const enemies = getEnemies(CombatManager.encounter!, char);
        const curMenu = () => showMenu(char, mainAction, prevMenu);
        for (const action of mainAction.subActions) {
            if (char.combat.effects.combatAbilityFlag & action.type && action.isPossible(char)) {
                if (action.subActions.length > 0) {
                    choices.push([action.name, () => showMenu(char, action, curMenu)]);
                }
                else if (enemies.ableMembers.find((enemy) => action.isPossible(char) && action.canUse(char, enemy).canUse)) {
                    choices.push([action.name, () => selectTarget(char, action, curMenu)]);
                }
                else {
                    choices.push([action.name, undefined]);
                }
            }
        }
        if (prevMenu && mainAction.subActions.length > 0)
            return { choices, persistantChoices: [["Back", prevMenu]] };
        else
            return { choices };
    }
    throw new Error('Combat menu displayed when no combat encounter has been created');
}

function selectTarget(character: Character, action: CombatAction, prevMenu?: ClickOption): NextScreenChoices {
    if (CombatManager.encounter) {
        const enemies = getEnemies(CombatManager.encounter, character);
        if (enemies.ableMembers.length === 1) {
            action.use(character, enemies.ableMembers[0]);
            return CombatManager.encounter.performRound();
        }
        else {
            const choices: ScreenChoice[] = [];
            for (const enemy of enemies.ableMembers) {
                choices.push([enemy.desc.name, () => {
                    action.use(character, enemy);
                    return { next: playerMenu };
                }]);
            }
            if (prevMenu && action.subActions.length > 0)
                return { choices, persistantChoices: [["Back", prevMenu]] };
            else
                return { choices };
        }
    }
    throw new Error('Unable to select target because their is no encounter');
}

function enemyDescription(character: Character, enemy: Character): void {
    let percent: string = "";
    const hpRatio: number = enemy.combat.stats.HPRatio();
    percent = "(<b>" + String(Math.floor(hpRatio * 1000) / 10) + "% HP</b>)";

    CView.text("<b>You are fighting " + enemy.desc.a + enemy.desc.short + ":</b> (Level: " + enemy.stats.level + ")\n");
    if (character.combat.effects.has(CombatEffectType.Blind)) CView.text("It's impossible to see anything!\n");
    else {
        CView.text(enemy.desc.long + "\n");
        if (enemy.desc.plural) {
            if (hpRatio >= 1) CView.text("You see " + enemy.desc.subjectivePronoun + " are in perfect health.");
            else if (hpRatio > .75) CView.text("You see " + enemy.desc.subjectivePronoun + " aren't very hurt.");
            else if (hpRatio > .5) CView.text("You see " + enemy.desc.subjectivePronoun + " are slightly wounded.");
            else if (hpRatio > .25) CView.text("You see " + enemy.desc.subjectivePronoun + " are seriously hurt.");
            else CView.text("You see " + enemy.desc.subjectivePronoun + " are unsteady and close to death.");
        }
        else {
            if (hpRatio >= 1) CView.text("You see " + enemy.desc.subjectivePronoun + " is in perfect health.");
            else if (hpRatio > .75) CView.text("You see " + enemy.desc.subjectivePronoun + " isn't very hurt.");
            else if (hpRatio > .5) CView.text("You see " + enemy.desc.subjectivePronoun + " is slightly wounded.");
            else if (hpRatio > .25) CView.text("You see " + enemy.desc.subjectivePronoun + " is seriously hurt.");
            else CView.text("You see " + enemy.desc.subjectivePronoun + " is unsteady and close to death.");
        }
        CView.text("  " + percent + "\n");
        showMonsterLust(enemy);
    }
}

function showMonsterLust(enemy: Character): void {
    // Entrapped
    if (enemy.combat.effects.has(CombatEffectType.Constricted)) {
        CView.text(enemy.desc.capitalA + enemy.desc.short + " is currently wrapped up in your tail-coils!  ");
    }
    // Venom stuff!
    if (enemy.combat.effects.has(CombatEffectType.NagaVenom)) {
        if (enemy.desc.plural) {
            if (enemy.combat.effects.get(CombatEffectType.NagaVenom)!.values.expireCountdown <= 1) {
                CView.text("You notice " + enemy.desc.subjectivePronoun + " are beginning to show signs of weakening, but there still appears to be plenty of fight left in " + enemy.desc.objectivePronoun + ".  ");
            }
            else {
                CView.text("You notice " + enemy.desc.subjectivePronoun + " are obviously affected by your venom, " + enemy.desc.possessivePronoun + " movements become unsure, and " + enemy.desc.possessivePronoun + " balance begins to fade. Sweat begins to roll on " + enemy.desc.possessivePronoun + " skin. You wager " + enemy.desc.subjectivePronoun + " are probably beginning to regret provoking you.  ");
            }
        }
        // Not plural
        else {
            if (enemy.combat.effects.get(CombatEffectType.NagaVenom)!.values.expireCountdown <= 1) {
                CView.text("You notice " + enemy.desc.subjectivePronoun + " is beginning to show signs of weakening, but there still appears to be plenty of fight left in " + enemy.desc.objectivePronoun + ".  ");
            }
            else {
                CView.text("You notice " + enemy.desc.subjectivePronoun + " is obviously affected by your venom, " + enemy.desc.possessivePronoun + " movements become unsure, and " + enemy.desc.possessivePronoun + " balance begins to fade. Sweat is beginning to roll on " + enemy.desc.possessivePronoun + " skin. You wager " + enemy.desc.subjectivePronoun + " is probably beginning to regret provoking you.  ");
            }
        }
    }
    if (enemy.desc.short === "harpy") {
        // (Enemy slightly aroused)
        if (enemy.stats.lust >= 45 && enemy.stats.lust < 70) CView.text("The harpy's actions are becoming more and more erratic as she runs her mad-looking eyes over your body, her chest jiggling, clearly aroused.  ");
        // (Enemy moderately aroused)
        if (enemy.stats.lust >= 70 && enemy.stats.lust < 90) CView.text("She stops flapping quite so frantically and instead gently sways from side to side, showing her soft, feathery body to you, even twirling and raising her tail feathers, giving you a glimpse of her plush pussy, glistening with fluids.");
        // (Enemy dangerously aroused)
        if (enemy.stats.lust >= 90) CView.text("You can see her thighs coated with clear fluids, the feathers matted and sticky as she struggles to contain her lust.");
    }
    // {Bonus Lust Descripts}
    else if (enemy.desc.short === "Minerva") {
        if (enemy.stats.lust < 40) { }
        // (40)
        else if (enemy.stats.lust < 60) CView.text("Letting out a groan Minerva shakes her head, focusing on the fight at hand.  The bulge in her short is getting larger, but the siren ignores her growing hard-on and continues fighting.  ");
        // (60)
        else if (enemy.stats.lust < 80) CView.text("Tentacles are squirming out from the crotch of her shorts as the throbbing bulge grows bigger and bigger, becoming harder and harder... for Minerva to ignore.  A damp spot has formed just below the bulge.  ");
        // (80)
        else CView.text("She's holding onto her weapon for support as her face is flushed and pain-stricken.  Her tiny, short shorts are painfully holding back her quaking bulge, making the back of the fabric act like a thong as they ride up her ass and struggle against her cock.  Her cock-tentacles are lashing out in every direction.  The dampness has grown and is leaking down her leg.");
    }
    else if (enemy.desc.short === "Cum Witch") {
        // {Bonus Lust Desc (40+)}
        if (enemy.stats.lust < 40) { }
        else if (enemy.stats.lust < 50) CView.text("Her nipples are hard, and poke two visible tents into the robe draped across her mountainous melons.  ");
        // {Bonus Lust Desc (50-75)}
        else if (enemy.stats.lust < 75) CView.text("Wobbling dangerously, you can see her semi-hard shaft rustling the fabric as she moves, evidence of her growing needs.  ");
        // {75+}
        if (enemy.stats.lust >= 75) CView.text("Swelling obscenely, the Cum Witch's thick cock stands out hard and proud, its bulbous tip rustling through the folds of her fabric as she moves and leaving dark smears in its wake.  ");
        // (85+}
        if (enemy.stats.lust >= 85) CView.text("Every time she takes a step, those dark patches seem to double in size.  ");
        // {93+}
        if (enemy.stats.lust >= 93) CView.text("There's no doubt about it, the Cum Witch is dripping with pre-cum and so close to caving in.  Hell, the lower half of her robes are slowly becoming a seed-stained mess.  ");
        // {Bonus Lust Desc (60+)}
        if (enemy.stats.lust >= 70) CView.text("She keeps licking her lips whenever she has a moment, and she seems to be breathing awfully hard.  ");
    }
    else if (enemy.desc.short === "Kelt") {
        // Kelt Lust Levels
        // (sub 50)
        if (enemy.stats.lust < 50) CView.text("Kelt actually seems to be turned off for once in his miserable life.  His maleness is fairly flaccid and droopy.  ");
        // (sub 60)
        else if (enemy.stats.lust < 60) CView.text("Kelt's gotten a little stiff down below, but he still seems focused on taking you down.  ");
        // (sub 70)
        else if (enemy.stats.lust < 70) CView.text("Kelt's member has grown to its full size and even flared a little at the tip.  It bobs and sways with every movement he makes, reminding him how aroused you get him.  ");
        // (sub 80)
        else if (enemy.stats.lust < 80) CView.text("Kelt is unabashedly aroused at this point.  His skin is flushed, his manhood is erect, and a thin bead of pre has begun to bead underneath.  ");
        // (sub 90)
        else if (enemy.stats.lust < 90) CView.text("Kelt seems to be having trouble focusing.  He keeps pausing and flexing his muscles, slapping his cock against his belly and moaning when it smears his pre-cum over his equine underside.  ");
        // (sub 100)
        else CView.text("There can be no doubt that you're having quite the effect on Kelt.  He keeps fidgeting, dripping pre-cum everywhere as he tries to keep up the facade of fighting you.  His maleness is continually twitching and bobbing, dripping messily.  He's so close to giving in...");
    }
    else if (enemy.desc.short === "green slime") {
        if (enemy.stats.lust >= 45 && enemy.stats.lust < 65) CView.text("A lump begins to form at the base of the figure's torso, where its crotch would be.  ");
        if (enemy.stats.lust >= 65 && enemy.stats.lust < 85) CView.text("A distinct lump pulses at the base of the slime's torso, as if something inside the creature were trying to escape.  ");
        if (enemy.stats.lust >= 85 && enemy.stats.lust < 93) CView.text("A long, thick pillar like a small arm protrudes from the base of the slime's torso.  ");
        if (enemy.stats.lust >= 93) CView.text("A long, thick pillar like a small arm protrudes from the base of the slime's torso.  Its entire body pulses, and it is clearly beginning to lose its cohesion.  ");
    }
    else if (enemy.desc.short === "Sirius, a naga hypnotist") {
        if (enemy.stats.lust < 40) { }
        else if (enemy.stats.lust >= 40) CView.text("You can see the tip of his reptilian member poking out of its protective slit. ");
        else if (enemy.stats.lust >= 60) CView.text("His cock is now completely exposed and half-erect, yet somehow he still stays focused on your eyes and his face is inexpressive.  ");
        else CView.text("His cock is throbbing hard, you don't think it will take much longer for him to pop.   Yet his face still looks inexpressive... despite the beads of sweat forming on his brow.  ");

    }
    else if (enemy.desc.short === "kitsune") {
        // Kitsune Lust states:
        // Low
        if (enemy.stats.lust > 30 && enemy.stats.lust < 50) CView.text("The kitsune's face is slightly flushed.  She fans herself with her hand, watching you closely.");
        // Med
        else if (enemy.stats.lust > 30 && enemy.stats.lust < 75) CView.text("The kitsune's cheeks are bright pink, and you can see her rubbing her thighs together and squirming with lust.");
        // High
        else if (enemy.stats.lust > 30) {
            // High (redhead only)
            if (enemy.body.hair.color === "red") CView.text("The kitsune is openly aroused, unable to hide the obvious bulge in her robes as she seems to be struggling not to stroke it right here and now.");
            else CView.text("The kitsune is openly aroused, licking her lips frequently and desperately trying to hide the trail of fluids dripping down her leg.");
        }
    }
    else if (enemy.desc.short === "demons") {
        if (enemy.stats.lust > 30 && enemy.stats.lust < 60) CView.text("The demons lessen somewhat in the intensity of their attack, and some even eye up your assets as they strike at you.");
        if (enemy.stats.lust >= 60 && enemy.stats.lust < 80) CView.text("The demons are obviously steering clear from damaging anything you might use to fuck and they're starting to leave their hands on you just a little longer after each blow. Some are starting to cop quick feels with their other hands and you can smell the demonic lust of a dozen bodies on the air.");
        if (enemy.stats.lust >= 80) CView.text(" The demons are less and less willing to hit you and more and more willing to just stroke their hands sensuously over you. The smell of demonic lust is thick on the air and part of the group just stands there stroking themselves openly.");
    }
    else {
        if (enemy.desc.plural) {
            if (enemy.stats.lust > 50 && enemy.stats.lust < 60) CView.text(enemy.desc.capitalA + enemy.desc.short + "' skin remains flushed with the beginnings of arousal.  ");
            if (enemy.stats.lust >= 60 && enemy.stats.lust < 70) CView.text(enemy.desc.capitalA + enemy.desc.short + "' eyes constantly dart over your most sexual parts, betraying " + enemy.desc.possessivePronoun + " lust.  ");
            if (enemy.body.cocks.length > 0) {
                if (enemy.stats.lust >= 70 && enemy.stats.lust < 85) CView.text(enemy.desc.capitalA + enemy.desc.short + " are having trouble moving due to the rigid protrusion in " + enemy.desc.possessivePronoun + " groins.  ");
                if (enemy.stats.lust >= 85) CView.text(enemy.desc.capitalA + enemy.desc.short + " are panting and softly whining, each movement seeming to make " + enemy.desc.possessivePronoun + " bulges more pronounced.  You don't think " + enemy.desc.subjectivePronoun + " can hold out much longer.  ");
            }
            if (enemy.body.vaginas.length > 0) {
                if (enemy.stats.lust >= 70 && enemy.stats.lust < 85) CView.text(enemy.desc.capitalA + enemy.desc.short + " are obviously turned on, you can smell " + enemy.desc.possessivePronoun + " arousal in the air.  ");
                if (enemy.stats.lust >= 85) CView.text(enemy.desc.capitalA + enemy.desc.short + "' " + describeVagina(enemy, enemy.body.vaginas.get(0)) + "s are practically soaked with their lustful secretions.  ");
            }
        }
        else {
            if (enemy.stats.lust > 50 && enemy.stats.lust < 60) CView.text(enemy.desc.capitalA + enemy.desc.short + "'s skin remains flushed with the beginnings of arousal.  ");
            if (enemy.stats.lust >= 60 && enemy.stats.lust < 70) CView.text(enemy.desc.capitalA + enemy.desc.short + "'s eyes constantly dart over your most sexual parts, betraying " + enemy.desc.possessivePronoun + " lust.  ");
            if (enemy.body.cocks.length > 0) {
                if (enemy.stats.lust >= 70 && enemy.stats.lust < 85) CView.text(enemy.desc.capitalA + enemy.desc.short + " is having trouble moving due to the rigid protrusion in " + enemy.desc.possessivePronoun + " groin.  ");
                if (enemy.stats.lust >= 85) CView.text(enemy.desc.capitalA + enemy.desc.short + " is panting and softly whining, each movement seeming to make " + enemy.desc.possessivePronoun + " bulge more pronounced.  You don't think " + enemy.desc.subjectivePronoun + " can hold out much longer.  ");
            }
            if (enemy.body.vaginas.length > 0) {
                if (enemy.stats.lust >= 70 && enemy.stats.lust < 85) CView.text(enemy.desc.capitalA + enemy.desc.short + " is obviously turned on, you can smell " + enemy.desc.possessivePronoun + " arousal in the air.  ");
                if (enemy.stats.lust >= 85) CView.text(enemy.desc.capitalA + enemy.desc.short + "'s " + describeVagina(enemy, enemy.body.vaginas.get(0)) + " is practically soaked with her lustful secretions.  ");
            }
        }
    }
}
