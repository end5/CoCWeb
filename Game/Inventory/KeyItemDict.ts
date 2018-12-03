import { Dictionary, IDictionary } from 'Engine/Utilities/Dictionary';
import { KeyItem } from 'Game/Items/KeyItem';

export class KeyItemDict extends Dictionary<string, KeyItem> {
    public add(name: string, values?: IDictionary<any>) {
        super.set(name, new KeyItem(name, values));
    }
}
