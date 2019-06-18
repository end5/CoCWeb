define(["require", "exports", "./Useable"], function (require, exports, Useable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 09.01.14.
     */
    class Weapon extends Useable_1.Useable //Equipable
     {
        constructor(id, shortName, name, longName, verb, attack, value = 0, description, perk = "") {
            super(id, shortName, longName, value, description);
            this._name = name;
            this._verb = verb;
            this._attack = attack;
            this._perk = perk;
        }
        get verb() { return this._verb; }
        get attack() { return this._attack; }
        get perk() { return this._perk; }
        get name() { return this._name; }
        useText() {
            this.outputText("You equip " + this.longName + ".  ");
        }
        playerEquip() {
            return this;
        }
        playerRemove() {
            return this;
        }
        removeText() { } //Produces any text seen when removing the armor normally
    }
    exports.Weapon = Weapon;
});
//# sourceMappingURL=Weapon.js.map