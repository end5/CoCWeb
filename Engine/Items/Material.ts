import { Character } from 'Engine/Character/Character';
import { Item } from './Item';
import { ItemDesc } from './ItemDesc';
import { ItemType } from './ItemType';
import { CView } from 'Engine/Display/ContentView';

export class Material extends Item {
    private readonly useDesc: string = '';
    constructor(name: string, desc: ItemDesc, useText?: string, value?: number) {
        super(name, ItemType.Material, desc, value);
        if (useText)
            this.useDesc = useText;
    }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character): void { }

    public useText(character: Character): void {
        CView.text(this.useDesc);
    }
}
