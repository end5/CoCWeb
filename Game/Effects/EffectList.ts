import { IEffectValues } from "./EffectValues";
import { Effect } from "./Effect";
import { ObservableList } from 'Game/Utilities/ObservableList';

export class EffectList extends ObservableList<Effect> {
    public create(key: string, values?: IEffectValues) {
        this.add(new Effect(key, values));
    }

    public findByName(name: string): Effect | undefined {
        return this.list.find((effect) => effect.type === name);
    }
}
