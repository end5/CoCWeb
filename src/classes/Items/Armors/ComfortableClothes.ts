import { Armor } from "../Armor";

/**
 * Created by aimozg on 18.01.14.
 */

export class ComfortableClothes extends Armor {
    public constructor() {
        super(
            "C.Cloth",
            "C.Cloth",
            "comfortable clothes",
            "a set of comfortable clothes",
            0,
            0,
            "These loose fitting and comfortable clothes allow you to move freely while protecting you from the elements.  (DEF: +0) (Cost: 0)",
            "Light",
            true
        );
    }

    public get supportsBulge(): boolean {
        return this.game.player.modArmorName != "crotch-hugging clothes";
    }
    // Comfortable clothes can't be changed by Exgartuan if he's already changed them

    /*
            protected  unequipReturnItem(player:Player,output: boolean):ItemType
            {
                if (output && player.armorName != player.armor.name){
                    outx("The " + player.armorName + " revert into a pair of comfortable clothes, as if by magic.  ");
                }
                return this;
            }
    */
}
