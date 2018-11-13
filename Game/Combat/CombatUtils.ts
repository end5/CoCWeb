import { randInt } from '../../Engine/Utilities/SMath';
import { Character } from '../Character/Character';
import { PerkType } from '../Effects/PerkType';

/**
 * Performs a combat dodge calculation
 * @param char The current char
 * @param dodgingChar The char performing the dodge
 */
export function combatDodge(char: Character, dodgingChar: Character): boolean {
    return combatMiss(dodgingChar, char) || combatEvade(dodgingChar, char) || combatFlexibility(dodgingChar, char) || combatMisdirect(dodgingChar, char);
}

export function combatMiss(character: Character, monster: Character): boolean {
    return character.stats.spe - monster.stats.spe > 0 && randInt(((character.stats.spe - monster.stats.spe) / 4) + 80) > 80;

}

export function combatEvade(character: Character, monster: Character): boolean {
    return monster.desc.short !== "Kiha" && character.perks.has(PerkType.Evade) && randInt(100) < 10;

}

export function combatFlexibility(character: Character, monster: Character): boolean {
    return character.perks.has(PerkType.Flexibility) && randInt(100) < 6;

}

export function combatMisdirect(character: Character, monster: Character): boolean {
    return character.perks.has(PerkType.Misdirection) && randInt(100) < 10 && character.inventory.armor.displayName === "red, high-society bodysuit";
}

export function combatRegeneration(character: Character): void {
    let healingPercent: number = 0;
    if (character.perks.has(PerkType.Regeneration)) healingPercent += 1;
    if (character.perks.has(PerkType.Regeneration2)) healingPercent += 2;
    if (character.inventory.armor.displayName === "skimpy nurse's outfit") healingPercent += 2;
    if (character.inventory.armor.displayName === "goo armor") healingPercent += 2;
    if (character.perks.has(PerkType.LustyRegeneration)) healingPercent += 1;
    if (healingPercent > 5) healingPercent = 5;
    character.stats.HP += (Math.round(character.stats.maxHP() * healingPercent / 100));
}

export function fatigueRecovery(character: Character): void {
    character.stats.fatigue--;
    if (character.perks.has(PerkType.EnlightenedNinetails) || character.perks.has(PerkType.CorruptedNinetails))
        character.stats.fatigue -= (1 + randInt(3));
}
