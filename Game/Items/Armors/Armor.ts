import { ArmorName } from './ArmorName';
import { Character } from '../../Character/Character';
import { EquipableItem } from '../EquipableItem';
import { ItemDesc } from '../ItemDesc';
import { ItemType } from '../ItemType';
import { CView } from '../../../Page/ContentView';

export type ArmorClass = "Light" | "Medium" | "Heavy" | "";

export class Armor extends EquipableItem {
    private defenseValue: number;
    public readonly armorClass: ArmorClass;
    public readonly displayName: string;
    private readonly canBulge: boolean;

    constructor(name: ArmorName, desc: ItemDesc, displayname: string, defense: number, value?: number, armorClass: ArmorClass = "Light", supportsBulge: boolean = false) {
        super(name, ItemType.Armor, desc, value);
        this.displayName = displayname;
        this.defenseValue = defense;
        this.armorClass = armorClass;
        this.canBulge = supportsBulge;
    }

    public get defense(): number {
        return this.defenseValue;
    }

    public supportsBulge(character: Character): boolean { return this.canBulge && character.inventory.armorDescMod === ""; }
    // For most clothes if the armorDescMod is set then it's Exgartuan's doing. The comfortable clothes are the exception, they override this function.

    public canUse(_character: Character): boolean {
        return true;
    }

    public useText(_character: Character): void {
        CView.text("You equip " + this.desc.longName + ".  ");
    }

    public describe(): string {
        return super.describe() + " (DEF: +" + this.defenseValue + ")";
    }

    public use(_character: Character) { }

    public equipText(): void { }
    public unequipText(): void { }
    public onEquip(_character: Character) { }

    /**
     * This item is being unequiped by the character. Remove any perks, etc. - This should only handle mechanics, not text output
     * @param character
     */
    public onUnequip(character: Character) {
    }
}
