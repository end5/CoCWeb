import { ICombatRewards } from './ICombatRewards';
import { CombatStats } from './CombatStats';
import { EndScenes } from './EndScenes';
import { Character } from 'Game/Character/Character';
import { CombatEffectDict } from 'Game/Effects/CombatEffectDict';
import { StatusEffectType } from '../Effects/StatusEffectType';
import { Dictionary } from 'Engine/Utilities/Dictionary';
import { IReaction } from './Actions/IReaction';
import { CombatAction } from './Actions/CombatAction';
import { MainAction } from './Actions/MainAction';

export class CombatContainer {
    private character: Character;
    public useAI: boolean = true;
    public readonly action: CombatAction;
    public readonly endScenes: EndScenes;
    public readonly rewards: ICombatRewards;
    public readonly reactions: Dictionary<string, IReaction>;

    public readonly stats: CombatStats;
    public readonly effects: CombatEffectList;

    public constructor(character: Character, values: { mainAction?: CombatAction, endScenes: EndScenes, rewards: ICombatRewards, reactions?: Dictionary<string, IReaction> }) {
        this.character = character;
        this.stats = new CombatStats(character);
        this.effects = new CombatEffectList(character);

        if (values.mainAction)
            this.action = values.mainAction;
        else
            this.action = new MainAction();

        if (values.reactions)
            this.reactions = values.reactions;
        else
            this.reactions = new Dictionary();

        this.endScenes = values.endScenes;
        this.rewards = values.rewards;
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
