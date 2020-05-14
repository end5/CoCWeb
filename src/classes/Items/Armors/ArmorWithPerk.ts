import { PerkType } from "../../PerkType";
import { Armor } from "../Armor";

/**
 * Created by aimozg on 18.01.14.
 */

export class ArmorWithPerk extends Armor {
    private playerPerk: PerkType;
    private playerPerkV1: number;
    private playerPerkV2: number;
    private playerPerkV3: number;
    private playerPerkV4: number;

    public constructor(id: string, shortName: string, name: string, longName: string, def: number, value: number, description: string, perk: string, playerPerk: PerkType, playerPerkV1: number, playerPerkV2: number, playerPerkV3: number, playerPerkV4: number, playerPerkDesc: string = "", supportsBulge: boolean = false) {
        super(id, shortName, name, longName, def, value, description, perk, supportsBulge);
        this.playerPerk = playerPerk;
        this.playerPerkV1 = playerPerkV1;
        this.playerPerkV2 = playerPerkV2;
        this.playerPerkV3 = playerPerkV3;
        this.playerPerkV4 = playerPerkV4;
    }

    public playerEquip(): Armor { //This item is being equipped by the player. Add any perks, etc.
        while (this.game.player.findPerk(this.playerPerk) >= 0) this.game.player.removePerk(this.playerPerk);
        this.game.player.createPerk(this.playerPerk, this.playerPerkV1, this.playerPerkV2, this.playerPerkV3, this.playerPerkV4);
        return super.playerEquip();
    }

    public playerRemove() { //This item is being removed by the player. Remove any perks, etc.
        while (this.game.player.findPerk(this.playerPerk) >= 0) this.game.player.removePerk(this.playerPerk);
        return super.playerRemove();
    }

    /*
            public  equipEffect(player:Player, output: boolean): void
            {
                if(player.findPerk(playerPerk) < 0)
                    player.createPerk(playerPerk,playerPerkV1,playerPerkV2,playerPerkV3,playerPerkV4);
            }

            public  unequipEffect(player:Player, output: boolean): void
            {
                while(player.findPerk(playerPerk) >= 0) player.removePerk(playerPerk);
            }
    */
}

