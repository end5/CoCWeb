import { Character } from '../Character/Character';

export function combatCleanup(mainCharacter: Character, allyParty: Character[], enemyParty: Character[]) {
    mainCharacter.combat.effects.clear();
    for (const member of allyParty) {
        member.combat.effects.clear();
    }
    for (const member of enemyParty) {
        member.combat.effects.clear();
    }
}
