define(["require", "exports", "./CoC_Settings"], function (require, exports, CoC_Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 31.01.14.
     */
    class StatusAffectType {
        constructor(id) {
            this._id = id;
            if (StatusAffectType.STATUSAFFECT_LIBRARY[id] != undefined) {
                CoC_Settings_1.CoC_Settings.error("Duplicate status affect " + id);
            }
            StatusAffectType.STATUSAFFECT_LIBRARY[id] = this;
        }
        static lookupStatusAffect(id) {
            return StatusAffectType.STATUSAFFECT_LIBRARY[id];
        }
        static getStatusAffectLibrary() {
            return StatusAffectType.STATUSAFFECT_LIBRARY;
        }
        /**
         * Unique perk id, should be kept in future game versions
         */
        get id() {
            return this._id;
        }
        toString() {
            return "\"" + this._id + "\"";
        }
    }
    StatusAffectType.STATUSAFFECT_LIBRARY = {};
    exports.StatusAffectType = StatusAffectType;
});
//# sourceMappingURL=StatusAffectType.js.map