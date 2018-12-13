import { CombatParty } from './CombatParty';
import { DefeatType } from './DefeatEvent';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices, choiceWrapWithChar, ScreenChoice } from 'Game/ScreenDisplay';
import { awardPlayer } from './CombatDrops';
import { CharDict } from 'Game/CharDict';
import { randomChoice } from 'Engine/Utilities/SMath';
import { CombatManager } from './CombatManager';
import { playerMenu } from 'Game/Menus/InGame/PlayerMenu';
import { combatMenu } from 'Game/Menus/InGame/PlayerCombatMenu';

export class Encounter {
    private mainCharacter: Character;
    public allyParty: CombatParty;
    public enemyParty: CombatParty;
    private allyPartyTurn: boolean;
    public performTurnEnd?: (() => NextScreenChoices);

    public constructor(mainCharacter: Character, allyParty: Character[], enemyParty: Character[]) {
        this.mainCharacter = mainCharacter;
        this.allyParty = new CombatParty([mainCharacter].concat(allyParty));
        this.enemyParty = new CombatParty(enemyParty);

        this.effectsCombatStart(this.allyParty);
        this.effectsCombatStart(this.enemyParty);

        this.allyPartyTurn = true;
    }

    private effectsCombatStart(party: CombatParty) {
        for (const member of party.ableMembers)
            for (const effect of member.effects)
                effect.combatStart(member);
    }

    public performRound(): NextScreenChoices {
        if (this.performTurnEnd)
            return this.performTurnEnd();
        return this.performPartyTurn();
    }

    private performPartyTurn(): NextScreenChoices {
        const enemyParty = this.allyPartyTurn ? this.enemyParty : this.allyParty;
        const activeParty = this.allyPartyTurn ? this.allyParty : this.enemyParty;
        const activeMember = activeParty.activePartyMember();
        this.performTurnEnd = () => {
            const encounter = this;
            encounter.performTurnEnd = undefined;
            if (encounter.allyPartyTurn)
                encounter.enemyParty.resolveAttacker(activeMember);
            else
                encounter.allyParty.resolveAttacker(activeMember);
            encounter.resolveEndTurn(activeMember);
            return encounter.endCombatOrNextRound();
        };

        this.effectsTurnStart(activeMember, activeParty.ableMembers);

        if (!activeMember) {
            return { next: playerMenu };
        }
        else if (!activeMember.combat.useAI) {
            return { next: choiceWrapWithChar(combatMenu, activeMember, enemyParty.ableMembers) };
        }
        else {
            if (this.allyPartyTurn)
                activeMember.combat.action.use(activeMember, randomChoice(this.enemyParty.ableMembers));
            else
                activeMember.combat.action.use(activeMember, randomChoice(this.allyParty.ableMembers));
            return this.performTurnEnd();
        }
    }

    private effectsTurnStart(selectedChar: Character, enemyParty: Character[]): void {
        for (const effect of selectedChar.effects)
            effect.combatTurnStart(selectedChar, ...enemyParty);
    }

    private resolveEndTurn(character: Character): void {
        if (this.allyPartyTurn) {
            this.effectsTurnEnd(character, this.enemyParty.ableMembers);
            this.allyParty.selectNextPartyMember();
        }
        else {
            this.effectsTurnEnd(character, this.allyParty.ableMembers);
            this.enemyParty.selectNextPartyMember();
        }
        this.allyPartyTurn = !this.allyPartyTurn;
    }

    private effectsTurnEnd(selectedChar: Character, enemyParty: Character[]): void {
        for (const effect of selectedChar.effects)
            effect.combatTurnEnd(selectedChar, ...enemyParty);
    }

    private endCombatOrNextRound(): NextScreenChoices {
        if (this.allyParty.ableMembers.length === 0 || this.enemyParty.ableMembers.length === 0) {
            this.combatCleanup();
            return this.displayDefeatEvent();
        }
        return this.performRound();
    }

    private combatCleanup() {
        this.effectsCombatEnd(this.mainCharacter);
        for (const member of this.allyParty.allMembers) {
            this.effectsCombatEnd(member);
        }
        for (const member of this.enemyParty.allMembers) {
            this.effectsCombatEnd(member);
        }
    }

    private effectsCombatEnd(char: Character) {
        for (const effect of char.effects)
            effect.combatEnd(char);
    }

    private displayDefeatEvent(): NextScreenChoices {
        if (this.allyParty.ableMembers.length === 0) {
            if (this.enemyParty.partyEndScenes) {
                return this.enemyParty.partyEndScenes.victory(this.allyParty, this.enemyParty);
            }
            else {
                if (this.allyParty.allMembers.length > 1) {
                    // Whoever defeated the player, that is the scene that is displayed
                    for (const defeatEvent of this.enemyParty.defeatLog) {
                        if (defeatEvent.loser.uuid === CharDict.player!.uuid) {
                            return defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                        }
                    }
                    /*
                    // If multiple enemies survive, random scene
                    let defeatEvent = Utils.randomChoice(this.allyParty.defeatLog);
                    defeatEvent.victor.combat.end.victory(defeatEvent.how, defeatEvent.loser);
                    */
                }
                else {
                    const defeatEvent = this.allyParty.defeatLog[0];
                    return defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                }
            }
        }
        else if (this.enemyParty.ableMembers.length === 0) {
            if (this.allyParty.partyEndScenes) {
                return this.allyParty.partyEndScenes.victory(this.enemyParty, this.allyParty);
            }
            else {
                if (this.enemyParty.allMembers.length > 1) {
                    // If multiple enemies lose, player picks one for end scene
                    const choices: ScreenChoice[] = [];
                    for (const defeatEvent of this.enemyParty.defeatLog) {
                        if (defeatEvent.how !== DefeatType.Escape) {
                            choices.push([
                                defeatEvent.loser.desc.name,
                                () => defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser)
                            ]);
                        }
                    }
                    // Should be replaced with separate menu
                    return { choices };
                }
                else {
                    const defeatEvent = this.enemyParty.defeatLog[0];
                    if (defeatEvent.how !== DefeatType.Escape) {
                        this.performTurnEnd = () => {
                            CombatManager.encounter = undefined;
                            return awardPlayer(this.mainCharacter, defeatEvent.loser);
                        };
                    }
                    return defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                }
            }
        }
        throw new Error('Both parties have able members');
    }
}
