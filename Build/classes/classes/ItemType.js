define(["require", "exports", "./CoC_Settings", "../console"], function (require, exports, CoC_Settings_1, console_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 09.01.14.
     */
    class ItemType {
        constructor(_id, _shortName, _longName, _value = 0, _description) {
            this._id = _id;
            this._shortName = _shortName || _id;
            this._longName = _longName || this.shortName;
            this._description = _description || this.longName;
            this._value = _value;
            if (ItemType.ITEM_LIBRARY[_id] != undefined) {
                CoC_Settings_1.CoC_Settings.error("Duplicate itemid " + _id + ", old item is " + ItemType.ITEM_LIBRARY[_id].longName);
            }
            if (ItemType.ITEM_SHORT_LIBRARY[this._shortName] != undefined) {
                console_1.trace("WARNING: Item with duplicate shortname: '" + _id + "' and '" + ItemType.ITEM_SHORT_LIBRARY[this._shortName]._id + "' share " + this._shortName);
            }
            ItemType.ITEM_LIBRARY[_id] = this;
            ItemType.ITEM_SHORT_LIBRARY[this._shortName] = this;
        }
        static lookupItem(id) {
            return ItemType.ITEM_LIBRARY[id];
        }
        static lookupItemByShort(shortName) {
            return ItemType.ITEM_SHORT_LIBRARY[shortName];
        }
        static getItemLibrary() {
            return ItemType.ITEM_LIBRARY;
        }
        /**
         * Short name to be displayed on buttons
         */
        get shortName() {
            return this._shortName;
        }
        /**
         * A full name of the item, to be described in text
         */
        get longName() {
            return this._longName;
        }
        /**
         * Item base price
         */
        get value() {
            return this._value;
        }
        /**
         * Detailed description to use on tooltips
         */
        get description() {
            return this._description;
        }
        /**
         * 7-character unique (across all the versions) string, representing that item type.
         */
        get id() {
            return this._id;
        }
        toString() {
            return "\"" + this._id + "\"";
        }
    }
    ItemType.ITEM_LIBRARY = {};
    ItemType.ITEM_SHORT_LIBRARY = {};
    ItemType.NOTHING = new ItemType("NOTHING!");
    exports.ItemType = ItemType;
});
//# sourceMappingURL=ItemType.js.map