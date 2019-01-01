import { List } from 'Engine/Utilities/List';
import { Item } from 'Engine/Items/Item';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { IEncounter } from 'Engine/Combat/IEncounter';

class CombatManager {
    public readonly itemsOnFloor: List<Item> = new List();
    public encounter?: IEncounter;
    public beginBattle(encounter: IEncounter): NextScreenChoices {
        // this.encounter = new Encounter(combatMenu, mainCharacter, PartyDict.getMembers(mainCharacter), enemies);
        this.encounter = encounter;
        return this.encounter.performRound();
    }

    public get inCombat(): boolean {
        return !!this.encounter && !!this.encounter.performTurnEnd;
    }
}

const combatManager = new CombatManager();
export { combatManager as CombatManager };
