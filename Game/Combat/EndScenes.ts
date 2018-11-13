import { CharacterHolder } from './CharacterHolder';
import { DefeatType } from './DefeatEvent';
import { randInt } from '../../Engine/Utilities/SMath';
import { Character } from '../Character/Character';
import { NextScreenChoices } from '../ScreenDisplay';

export abstract class EndScenes extends CharacterHolder {
    /**
     * The default number of hours that pass when losing a fight.
     */
    public static defaultLostFightHours = 8;

    /**
     * Used to determine if enemy has escaped.
     * @param enemy The enemy character.
     */
    public hasEscaped?(enemy: Character): boolean;

    /**
     * Used to handle special kinds of victory conditions. (ie Basilisk, Sandtrap)
     * @param enemy The enemy character.
     */
    public hasDefeated?(enemy: Character): boolean;

    /**
     * Calls when this cahracter defeats an enemy in battle.
     * @param howYouWon How this character defeated to the enemy.
     * @param enemy The enemy character.
     */
    public claimsVictory?(howYouWon: DefeatType, enemy: Character): void;

    /**
     * Calls when this character is defeated in battle.
     * @param howYouLost How this character lost to the enemy.
     * @param enemy The enemy character.
     */
    public criesInDefeat?(howYouLost: DefeatType, enemy: Character): void;

    /**
     * Triggered before the enemy's victory scene or this character's defeat scene.
     * Used for any logic that needs to be done before the enemy's victory scene or this character's defeat scene. (ie. worm infest)
     * @param howYouLost How this character lost to the enemy.
     * @param enemy The enemy character.
     */
    protected beforeEndingScene?(howYouLost: DefeatType, enemy: Character): void;

    /**
     * Calls after combat is over. Displays this character's victory scene.
     * @param howYouWon How this character defeated the enemy.
     * @param enemy The enemy character.
     */
    protected victoryScene?(howYouWon: DefeatType, enemy: Character): NextScreenChoices;

    /**
     * Calls after combat is over. Displays this character's defeat scene.
     * @param howYouLost How this character lost to the enemy.
     * @param enemy The enemy character.
     */
    protected defeatScene?(howYouLost: DefeatType, enemy: Character): NextScreenChoices;

    /**
     * Displays victory scene.
     * If this character has a victory scene and the enemy has a defeat scene, it will random between the scenes.
     * @param howYouWon How this character defeated the enemy.
     * @param enemy The enemy character.
     */
    public victory(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        if (enemy.combat.endScenes.beforeEndingScene)
            enemy.combat.endScenes.beforeEndingScene(howYouWon, this.char);
        if (this.victoryScene && enemy.combat.endScenes.defeatScene) {
            if (randInt(2) === 0) {
                return this.victoryScene(howYouWon, enemy);
            }
            else {
                return enemy.combat.endScenes.defeatScene(howYouWon, this.char);
            }
        }
        else if (this.victoryScene) {
            return this.victoryScene(howYouWon, enemy);
        }
        else if (enemy.combat.endScenes.defeatScene) {
            return enemy.combat.endScenes.defeatScene(howYouWon, this.char);
        }
        throw new Error('No ending scene was found');
    }

    protected defeatAwardScene?(): NextScreenChoices;
    protected victoryAwardScene?(): NextScreenChoices;

    public rewardItem?(enemy: Character, itemName: string): void;
    public rewardGems?(enemy: Character, gems: number): void;
}
