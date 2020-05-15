import { PerkLib } from "../PerkLib";
import { Useable } from "./Useable";

/**
 * Created by aimozg on 10.01.14.
 */

export class Armor extends Useable {
    // Equipable
    private _def: number;
    private _perk: string;
    private _name: string;
    private _supportsBulge: boolean;

    public constructor(
        id: string,
        shortName: string,
        name: string,
        longName: string,
        def: number,
        value = 0,
        description?: string,
        perk = "",
        supportsBulge = false
    ) {
        super(id, shortName, longName, value, description);
        this._name = name;
        this._def = def;
        this._perk = perk;
        this._supportsBulge = supportsBulge;
    }

    public get def(): number {
        return this._def;
    }

    public get perk(): string {
        return this._perk;
    }

    public get name(): string {
        return this._name;
    }

    public get supportsBulge(): boolean {
        return this._supportsBulge && this.game.player.modArmorName == "";
    }
    // For most clothes if the modArmorName is set then it's Exgartuan's doing. The comfortable clothes are the exception, they override this function.

    public useText(): void {
        this.outx(`You equip ${this.longName}.  `);
    }

    public playerEquip(): Armor {
        // This item is being equipped by the player. Add any perks, etc. - This function should only handle mechanics, not text output
        return this;
    }

    public playerRemove(): Armor | undefined {
        // This item is being removed by the player. Remove any perks, etc. - This function should only handle mechanics, not text output
        while (this.game.player.findPerk(PerkLib.BulgeArmor) >= 0)
            this.game.player.removePerk(PerkLib.BulgeArmor); // TODO remove this Exgartuan hack
        if (this.game.player.modArmorName.length > 0) this.game.player.modArmorName = "";
        return this;
    }

    public removeText(): void {} // Produces any text seen when removing the armor normally

    /*
            protected  equip(player:Player, returnOldItem: boolean,output: boolean): void
            {
                if (output) clearOutput();
                if (canUse(player, true)) {
                    if(output) outx("You equip your " + _name + ".  ");
                var  oldArmor:Armor = player.armor;
                    oldArmor.unequip(player, returnOldItem, output);
                    player.setArmorHiddenField(this);
                    equipped(player,output);
                }
            }

            public  unequip(player:Player, returnToInventory: boolean, output: boolean = false): void
            {
                while(player.findPerk(PerkLib.BulgeArmor) >= 0) player.removePerk(PerkLib.BulgeArmor);// TODO remove this Exgartuan hack
                if (returnToInventory) {
                var  itype:ItemType = unequipReturnItem(player, output);
                    if (itype != undefined) {
                        game.itemSwapping = true;
                        if (output && itype == this)
                            outx("You have your old set of " + longName + " left over.  ");
                        game.inventory.takeItem(this, false);
                    }
                }
                player.setArmorHiddenField(ArmorLib.COMFORTABLE_UNDERCLOTHES);
                if (player.modArmorName.length > 0) player.modArmorName = "";
                unequipped(player,output);
            }
    */
}
