import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { Character } from 'Engine/Character/Character';
import { CView } from 'Engine/Display/ContentView';
import { randInt } from 'Engine/Utilities/SMath';
import { CharacterType } from 'Content/Character/CharacterType';
import { EffectType } from 'Content/Effects/EffectType';

export class BasicAttack extends CombatAction {
    public name: string = "Attack";
    protected useAction(char: Character, enemy: Character): void {
        if (attackSucceeded(char, enemy)) {
            const damage = eOneAttack(char, enemy);
            outputAttack(char, enemy, damage);
            postAttack(char, enemy, damage);
            CView.text("\n");
        }
    }
}

function eOneAttack(char: Character, enemy: Character): number {
    // Determine damage - str modified by enemy toughness!
    return enemy.combat.loseHP(char.stats.str + char.combat.attack());
}

function attackSucceeded(char: Character, enemy: Character): boolean {
    let attack: boolean = true;
    // Blind dodge change
    if (char.effects.has(EffectType.Blind)) {
        attack = handleBlind(char);
    }
    attack = !enemyDodged(enemy, char);
    return attack;
}

function handleBlind(char: Character): boolean {
    if (randInt(3) < 2) {
        if (char.inventory.weapon.name === "tongue-slap") CView.text(char.desc.capitalA + char.desc.short + " completely misses you with a thrust from " + char.desc.possessivePronoun + " tongue!\n");
        else CView.text(char.desc.capitalA + char.desc.short + " completely misses you with a blind attack!\n");
        return false;
    }
    return true;
}

function speedDodge(player: Character, enemy: Character): number {
    const diff = player.stats.spe - enemy.stats.spe;
    const rnd = Math.floor(Math.random() * ((diff / 4) + 80));
    if (rnd <= 80) return 0;
    else if (diff < 8) return 1;
    else if (diff < 20) return 2;
    else return 3;
}

function enemyDodged(char: Character, enemy: Character): boolean {
    // Determine if dodged!
    const dodge = speedDodge(char, enemy);
    if (dodge > 0) {
        outputEnemyDodged(char, dodge);
        return true;
    }
    // Determine if evaded
    if (!(enemy.charType === CharacterType.Kiha) && char.effects.has(EffectType.Evade) && randInt(100) < 10) {
        CView.text("Using your skills at evading attacks, you anticipate and sidestep " + enemy.desc.a + enemy.desc.short + "'");
        if (!enemy.desc.plural) CView.text("s");
        CView.text(" attack.\n");
        return true;
    }
    // ("Misdirection"
    if (char.effects.has(EffectType.Misdirection) && randInt(100) < 10 && char.inventory.armor.name === "red, high-society bodysuit") {
        CView.text("Using Raphael's teachings, you anticipate and sidestep " + enemy.desc.a + enemy.desc.short + "' attacks.\n");
        return true;
    }
    // Determine if cat'ed
    if (char.effects.has(EffectType.Flexibility) && randInt(100) < 6) {
        CView.text("With your incredible flexibility, you squeeze out of the way of " + enemy.desc.a + enemy.desc.short + "");
        if (enemy.desc.plural) CView.text("' attacks.\n");
        else CView.text("'s attack.\n");
        return true;
    }
    return false;
}

function outputEnemyDodged(char: Character, dodge: number) {
    if (dodge === 1) CView.text("You narrowly avoid " + char.desc.a + char.desc.short + "'s " + char.inventory.weapon.verb + "!\n");
    else if (dodge === 2) CView.text("You dodge " + char.desc.a + char.desc.short + "'s " + char.inventory.weapon.verb + " with superior quickness!\n");
    else {
        CView.text("You deftly avoid " + char.desc.a + char.desc.short);
        if (char.desc.plural) CView.text("'");
        else CView.text("'s");
        CView.text(" slow " + char.inventory.weapon.verb + ".\n");
    }
}

function outputAttack(char: Character, enemy: Character, damage: number) {
    if (damage <= 0) {
        // Due to toughness or amor...
        if (randInt(enemy.combat.defense() + enemy.stats.tou) < enemy.combat.defense())
            CView.text("You absorb and deflect every " + char.inventory.weapon.verb + " with your " + enemy.inventory.armor.displayName + ".");
        else {
            if (char.desc.plural) CView.text("You deflect and block every " + char.inventory.weapon.verb + " " + char.desc.a + char.desc.short + " throw at you.");
            else CView.text("You deflect and block every " + char.inventory.weapon.verb + " " + char.desc.a + char.desc.short + " throws at you.");
        }
    }
    else if (damage < 6) CView.text("You are struck a glancing blow by " + char.desc.a + char.desc.short + "! (" + damage + ")");
    else if (damage < 11) {
        CView.text(char.desc.capitalA + char.desc.short + " wound");
        if (!char.desc.plural) CView.text("s");
        CView.text(" you! (" + damage + ")");
    }
    else if (damage < 21) {
        CView.text(char.desc.capitalA + char.desc.short + " stagger");
        if (!char.desc.plural) CView.text("s");
        CView.text(" you with the force of " + char.desc.possessivePronoun + " " + char.inventory.weapon.verb + "! (" + damage + ")");
    }
    else if (damage > 20) {
        CView.text(char.desc.capitalA + char.desc.short + " <b>mutilate");
        if (!char.desc.plural) CView.text("s");
        CView.text("</b> you with " + char.desc.possessivePronoun + " powerful " + char.inventory.weapon.verb + "! (" + damage + ")");
    }
}

function postAttack(char: Character, enemy: Character, damage: number) {
    if (damage > 0) {
        if (char.stats.lustVuln > 0 && enemy.inventory.armor.displayName === "barely-decent bondage straps") {
            if (!char.desc.plural) CView.text("\n" + char.desc.capitalA + char.desc.short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.");
            else CView.text("\n" + char.desc.capitalA + char.desc.short + " brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.");
            char.stats.lust += 5 * char.stats.lustVuln;
        }
    }
}
