define(["require", "exports", "../Armor"], function (require, exports, Armor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 18.01.14.
     */
    class ArmorWithPerk extends Armor_1.Armor {
        constructor(id, shortName, name, longName, def, value, description, perk, playerPerk, playerPerkV1, playerPerkV2, playerPerkV3, playerPerkV4, playerPerkDesc = "", supportsBulge = false) {
            super(id, shortName, name, longName, def, value, description, perk, supportsBulge);
            this.playerPerk = playerPerk;
            this.playerPerkV1 = playerPerkV1;
            this.playerPerkV2 = playerPerkV2;
            this.playerPerkV3 = playerPerkV3;
            this.playerPerkV4 = playerPerkV4;
        }
        playerEquip() {
            while (this.game.player.findPerk(this.playerPerk) >= 0)
                this.game.player.removePerk(this.playerPerk);
            this.game.player.createPerk(this.playerPerk, this.playerPerkV1, this.playerPerkV2, this.playerPerkV3, this.playerPerkV4);
            return super.playerEquip();
        }
        playerRemove() {
            while (this.game.player.findPerk(this.playerPerk) >= 0)
                this.game.player.removePerk(this.playerPerk);
            return super.playerRemove();
        }
    }
    exports.ArmorWithPerk = ArmorWithPerk;
});
//# sourceMappingURL=ArmorWithPerk.js.map