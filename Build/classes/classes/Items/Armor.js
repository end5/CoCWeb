define(["require", "exports", "./Useable", "../PerkLib"], function (require, exports, Useable_1, PerkLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class Armor extends Useable_1.Useable //Equipable
     {
        constructor(id, shortName, name, longName, def, value = 0, description, perk = "", supportsBulge = false) {
            super(id, shortName, longName, value, description);
            this._name = name;
            this._def = def;
            this._perk = perk;
            this._supportsBulge = supportsBulge;
        }
        get def() { return this._def; }
        get perk() { return this._perk; }
        get name() { return this._name; }
        get supportsBulge() { return this._supportsBulge && this.game.player.modArmorName == ""; }
        //For most clothes if the modArmorName is set then it's Exgartuan's doing. The comfortable clothes are the exception, they override this function.
        useText() {
            this.outputText("You equip " + this.longName + ".  ");
        }
        playerEquip() {
            return this;
        }
        playerRemove() {
            while (this.game.player.findPerk(PerkLib_1.PerkLib.BulgeArmor) >= 0)
                this.game.player.removePerk(PerkLib_1.PerkLib.BulgeArmor); //TODO remove this Exgartuan hack
            if (this.game.player.modArmorName.length > 0)
                this.game.player.modArmorName = "";
            return this;
        }
        removeText() { } //Produces any text seen when removing the armor normally
    }
    exports.Armor = Armor;
});
//# sourceMappingURL=Armor.js.map