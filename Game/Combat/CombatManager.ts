import { Encounter } from './Encounter';
import { MainScreen } from 'Page/MainScreen';
import { List } from 'Engine/Utilities/List';
import { Character } from 'Game/Character/Character';
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

        return this.encounter.performRound();
    }

    public get inCombat(): boolean {
        return !!this.encounter && !!this.encounter.performTurnEnd;
    }
}

const combatManager = new CombatManager();
export { combatManager as CombatManager };
