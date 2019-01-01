import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from '../ArmorName';
import { Character } from 'Engine/Character/Character';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { CView } from 'Engine/Display/ContentView';

export class LeatherArmorSegments extends Armor {
    public constructor() {
        super(ArmorName.LeatherArmorSegments, new ItemDesc("UrtaLta", "leather armor segments"), "leather armor segments", 5, 76, "Light", true);
    }

    public unequipText(): void {
        CView.text("You have your old set of " + this.desc.longName + " left over.  ");
    }

    public onUnequip(character: Character): void {
        // return Game.libraries.armor.get("LeathrA");
        super.onUnequip(character);
    }
}
