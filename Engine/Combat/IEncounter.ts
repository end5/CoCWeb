import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CombatParty } from 'Engine/Combat/CombatParty';

export interface IEncounter {
    allyParty: CombatParty;
    enemyParty: CombatParty;
    performTurnEnd?: (() => NextScreenChoices);
    performRound(): NextScreenChoices;
}
