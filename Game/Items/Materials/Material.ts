import { MaterialName } from './MaterialName';
import { Character } from '../../Character/Character';
import { Item } from '../Item';
import { ItemDesc } from '../ItemDesc';
import { ItemType } from '../ItemType';
import { CView } from '../../../Page/ContentView';

export class Material extends Item {
    private readonly useDesc: string = '';
    constructor(name: MaterialName, desc: ItemDesc, useText?: string, value?: number) {
        super(name, ItemType.Material, desc, value);
        if (useText)
            this.useDesc = useText;
    }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character) { }

    public useText(character: Character) {
        CView.text(this.useDesc);
    }
}
