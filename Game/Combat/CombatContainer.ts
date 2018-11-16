import { ICombatRewards } from './ICombatRewards';
import { CombatStats } from './CombatStats';
import { EndScenes } from './EndScenes';
import { Character } from '../Character/Character';
import { CombatEffectList } from '../Effects/CombatEffectList';
import { StatusEffectType } from '../Effects/StatusEffectType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { IReaction } from './Actions/IReaction';
import { CombatAction } from './Actions/CombatAction';

export type ActionResponse = (self: Character, enemy: Character, damage: number, crit?: boolean) => void;

export class CombatContainer {
    private character: Character;
    public useAI: boolean = true;
    public readonly action: CombatAction;
    public readonly endScenes: EndScenes;
    public readonly rewards: ICombatRewards;
    public readonly reactions: Dictionary<string, IReaction>;

    public readonly stats: CombatStats;
    public readonly effects: CombatEffectList;

    public grappledEnemy?: Character;

    public constructor(character: Character, mainAction: CombatAction, reactions: Dictionary<string, IReaction>, endScenes: EndScenes, rewards: ICombatRewards) {
        this.character = character;
        this.stats = new CombatStats(character);
        this.effects = new CombatEffectList(character);

        this.action = mainAction;
        this.endScenes = endScenes;
        this.rewards = rewards;
        this.reactions = reactions;
    }

    public hasSpells(): boolean {
        return this.spellCount() > 0;
    }

    public spellCount(): number {
        return []
            .filter((name: StatusEffectType) => {
                return this.character.effects.has(name);
            })
            .length;
    }
}
