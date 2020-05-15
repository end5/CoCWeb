import { Useable } from "./Useable";

/**
 * Created by aimozg on 09.01.14.
 */

export class Weapon extends Useable {
    // Equipable
    private _verb: string;
    private _attack: number;
    private _perk: string;
    private _name: string;

    public constructor(
        id: string,
        shortName: string,
        name: string,
        longName: string,
        verb: string,
        attack: number,
        value = 0,
        description?: string,
        perk = ""
    ) {
        super(id, shortName, longName, value, description);
        this._name = name;
        this._verb = verb;
        this._attack = attack;
        this._perk = perk;
    }

    public get verb(): string {
        return this._verb;
    }

    public get attack(): number {
        return this._attack;
    }

    public get perk(): string {
        return this._perk;
    }

    public get name(): string {
        return this._name;
    }

    public useText(): void {
        this.outx(`You equip ${this.longName}.  `);
    }

    public playerEquip(): Weapon {
        // This item is being equipped by the player. Add any perks, etc. - This function should only handle mechanics, not text output
        return this;
    }

    public playerRemove(): Weapon | undefined {
        // This item is being removed by the player. Remove any perks, etc. - This function should only handle mechanics, not text output
        return this;
    }

    public removeText(): void {} // Produces any text seen when removing the armor normally

    /*
            protected  equip(player:Player, returnOldItem: boolean, output: boolean): void
            {
                if (output) clearOutput();
                if (canUse(player,output)){
                var  oldWeapon:Weapon = player.weapon;
                    if (output) {
                        outx("You equip your " + longName + ".  ");
                    }
                    oldWeapon.unequip(player, returnOldItem, output);
                    player.setWeaponHiddenField(this);
                    equipped(player,output);
                }
            }


            public  unequip(player:Player, returnToInventory: boolean, output: boolean = false): void
            {
                if (returnToInventory) {
                var  itype:ItemType = unequipReturnItem(player, output);
                    if (itype != undefined) {
                        if (output && itype == this)
                            outx("You still have " + itype.longName + " left over.  ");
                        game.itemSwapping = true;
                        game.inventory.takeItem(this, false);
                    }
                }
                player.setWeaponHiddenField(WeaponLib.FISTS);
                unequipped(player,output);
            }
    */
}
