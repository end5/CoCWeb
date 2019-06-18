define(["require", "exports", "./CoC_Settings"], function (require, exports, CoC_Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 26.01.14.
     */
    class PerkType {
        constructor(id, name, desc, longDesc) {
            this._id = id;
            this._name = name;
            this._desc = desc;
            this._longDesc = longDesc || this._desc;
            if (PerkType.PERK_LIBRARY[id] != undefined) {
                CoC_Settings_1.CoC_Settings.error("Duplicate perk id " + id + ", old perk is " + PerkType.PERK_LIBRARY[id]._name);
            }
            PerkType.PERK_LIBRARY[id] = this;
        }
        static lookupPerk(id) {
            return PerkType.PERK_LIBRARY[id];
        }
        static getPerkLibrary() {
            return PerkType.PERK_LIBRARY;
        }
        /**
         * Unique perk id, should be kept in future game versions
         */
        get id() {
            return this._id;
        }
        /**
         * Perk short name, could be changed in future game versions
         */
        get name() {
            return this._name;
        }
        /**
         * Short description used in perk listing
         */
        desc(params) {
            return this._desc;
        }
        /**
         * Long description used when offering perk at levelup
         */
        get longDesc() {
            return this._longDesc;
        }
        toString() {
            return "\"" + this._id + "\"";
        }
    }
    PerkType.PERK_LIBRARY = {};
    exports.PerkType = PerkType;
});
//# sourceMappingURL=PerkType.js.map