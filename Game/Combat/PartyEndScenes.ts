import { CharacterHolder } from './CharacterHolder';
import { CombatParty } from './CombatParty';
import { NextScreenChoices } from '../ScreenDisplay';

export abstract class PartyEndScenes extends CharacterHolder {
    /**
     * The default number of hours that pass when losing a fight.
     */
    public static defaultLostFightHours = 8;

    /**
     * Called before the victorious party scene function call. Used for any logic that needs to be done before
     * victorious party scene. (ie. worm infest)
     * @param defeatedParty
     * @param victoriousParty
     */
    protected abstract beforeVictoriousPartyScene(defeatedParty: CombatParty, victoriousParty: CombatParty): void;

    /**
     * Calls after combat is over. Used for displaying victory text.
     * @param defeatedParty
     * @param victoriousParty
     */
    protected abstract victoryScene(defeatedParty: CombatParty, victoriousParty: CombatParty): NextScreenChoices;

    public victory(defeatedParty: CombatParty, victoriousParty: CombatParty): NextScreenChoices {
        this.beforeVictoriousPartyScene(defeatedParty, victoriousParty);
        return this.victoryScene(defeatedParty, victoriousParty);
    }

    /**
     * Used if you want to describe something happening after victorious party scene.
     * @param loseType
     * @param enemy
     */
    public abstract defeatAftermath(defeatedParty: CombatParty, victoriousParty: CombatParty): void;

    public abstract victoryAftermath(defeatedParty: CombatParty, victoriousParty: CombatParty): void;
}
