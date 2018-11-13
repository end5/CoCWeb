import { DefeatEvent, DefeatType } from './DefeatEvent';
import { PartyEndScenes } from './PartyEndScenes';
import { Character } from '../Character/Character';

export class CombatParty {
    public readonly allMembers: Character[];
    public ableMembers: Character[];
    public defeatLog: DefeatEvent[];
    public readonly partyEndScenes?: PartyEndScenes;

    public constructor(party: Character[]) {
        this.allMembers = party;
        this.ableMembers = party.slice();
        this.defeatLog = [];
    }

    public activePartyMember(): Character {
        return this.ableMembers[0];
    }

    public lostFight(combatEndType: DefeatType, victor: Character) {
        this.defeatLog.push(new DefeatEvent(victor, this.ableMembers[0], combatEndType));
    }

    public selectNextPartyMember() {
        if (this.ableMembers.length > 0) {
            const member = this.ableMembers.shift();
            if (member)
                this.ableMembers.push(member);
        }
    }

    public resolveAttacker(attacker: Character) {
        for (const defender of this.ableMembers) {
            if (defender.stats.HP < 1) {
                if (attacker.combat.endScenes.claimsVictory)
                    attacker.combat.endScenes.claimsVictory(DefeatType.HP, defender);
                this.defeatLog.push(new DefeatEvent(attacker, defender, DefeatType.HP));
                this.ableMembers.shift();
            }
            else if (defender.stats.lust > 99) {
                if (attacker.combat.endScenes.claimsVictory)
                    attacker.combat.endScenes.claimsVictory(DefeatType.Lust, defender);
                this.defeatLog.push(new DefeatEvent(attacker, defender, DefeatType.Lust));
                this.ableMembers.shift();
            }
            else if (attacker.combat.endScenes.hasEscaped && attacker.combat.endScenes.hasEscaped(defender)) {
                if (attacker.combat.endScenes.claimsVictory)
                    attacker.combat.endScenes.claimsVictory(DefeatType.Escape, defender);
                this.defeatLog.push(new DefeatEvent(attacker, defender, DefeatType.Escape));
                this.ableMembers.shift();
            }
            else if (attacker.combat.endScenes.hasDefeated && attacker.combat.endScenes.hasDefeated(defender)) {
                if (attacker.combat.endScenes.claimsVictory)
                    attacker.combat.endScenes.claimsVictory(DefeatType.Special, defender);
                this.defeatLog.push(new DefeatEvent(attacker, defender, DefeatType.Special));
                this.ableMembers.shift();
            }
        }
    }
}
