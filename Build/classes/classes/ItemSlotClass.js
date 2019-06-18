define(["require", "exports", "./ItemType", "./CoC_Settings"], function (require, exports, ItemType_1, CoC_Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ItemSlotClass {
        constructor() {
            //constructor
            //data
            this._quantity = 0;
            this._itype = ItemType_1.ItemType.NOTHING;
            this._unlocked = false;
        }
        setItemAndQty(itype, quant) {
            if (itype == undefined)
                itype = ItemType_1.ItemType.NOTHING;
            if (quant == 0 && itype == ItemType_1.ItemType.NOTHING) {
                this.emptySlot();
                return;
            }
            if (quant < 0 || quant == 0 && itype != ItemType_1.ItemType.NOTHING || quant > 0 && itype == ItemType_1.ItemType.NOTHING) {
                CoC_Settings_1.CoC_Settings.error("Inconsistent setItemAndQty call: " + quant + " " + itype);
                quant = 0;
                itype = ItemType_1.ItemType.NOTHING;
            }
            this._quantity = quant;
            this._itype = itype;
        }
        emptySlot() {
            this._quantity = 0;
            this._itype = ItemType_1.ItemType.NOTHING;
        }
        removeOneItem() {
            if (this._quantity == 0)
                CoC_Settings_1.CoC_Settings.error("Tried to remove item from empty slot!");
            if (this._quantity > 0)
                this._quantity -= 1;
            if (this._quantity == 0)
                this._itype = ItemType_1.ItemType.NOTHING;
        }
        get quantity() {
            return this._quantity;
        }
        set quantity(value) {
            if (value > 0 && this._itype == undefined)
                CoC_Settings_1.CoC_Settings.error("ItemSlotClass.quantity set with no item; use setItemAndQty instead!");
            if (value == 0)
                this._itype = ItemType_1.ItemType.NOTHING;
            this._quantity = value;
        }
        get itype() {
            return this._itype;
        }
        get unlocked() {
            return this._unlocked;
        }
        set unlocked(value) {
            if (this._unlocked != value) {
                this.emptySlot();
            }
            this._unlocked = value;
        }
        isEmpty() {
            return this._quantity <= 0;
        }
    }
    exports.ItemSlotClass = ItemSlotClass;
});
//# sourceMappingURL=ItemSlotClass.js.map