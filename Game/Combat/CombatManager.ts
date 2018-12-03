import { CombatParty } from './CombatParty';
import { Encounter } from './Encounter';
import { MainScreen } from 'Page/MainScreen';
import { List } from 'Engine/Utilities/List';
import { Character } from 'Game/Character/Character';
import { CombatEffectType } from 'Game/Effects/CombatEffectType';
import { Item } from 'Game/Items/Item';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { PartyDict } from 'Game/PartyDict';

export function getEnemies(encounter: Encounter, character: Character) {
    return encounter.allyParty.allMembers.find((char) => char === character) ? encounter.enemyParty : encounter.allyParty;
}

class CombatManager {
    public readonly itemsOnFloor: List<Item> = new List();
    public encounter?: Encounter;
    public beginBattle(mainCharacter: Character, ...enemies: Character[]): NextScreenChoices {
        this.encounter = new Encounter(mainCharacter, PartyDict.getMembers(mainCharacter), enemies);

        MainScreen.topButtons.data.hide();
        MainScreen.topButtons.appearance.hide();
        MainScreen.topButtons.levelUp.hide();
        MainScreen.topButtons.perks.hide();

        this.loadPartyCombatEffects(this.encounter.allyParty);
        this.loadPartyCombatEffects(this.encounter.enemyParty);

        return this.encounter.performRound();
    }

    public get inCombat(): boolean {
        return !!this.encounter && !!this.encounter.performTurnEnd;
    }

    private loadPartyCombatEffects(party: CombatParty) {
        for (const member of party.ableMembers) {
            this.loadCombatEffects(member);
        }
    }

    private loadCombatEffects(character: Character) {
        let effectType: CombatEffectType;
        for (const type of character.effects.keys()) {
            effectType = CombatEffectType[type as keyof typeof CombatEffectType];
            if (effectType)
                character.combat.effects.add(effectType, character);
        }
        for (const type of character.perks.keys()) {
            effectType = CombatEffectType[type as keyof typeof CombatEffectType];
            if (effectType)
                character.combat.effects.add(effectType, character);
        }
    }
}

const combatManager = new CombatManager();
export { combatManager as CombatManager };
