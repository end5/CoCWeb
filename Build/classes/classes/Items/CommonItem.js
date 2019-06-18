define(["require", "exports", "../ItemType", "../GlobalFlags/kGAMECLASS"], function (require, exports, ItemType_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 09.01.14.
     */
    class CommonItem extends ItemType_1.ItemType {
        get game() {
            return kGAMECLASS_1.kGAMECLASS;
        }
        getGame() {
            return kGAMECLASS_1.kGAMECLASS;
        }
        clearOutput() {
            kGAMECLASS_1.kGAMECLASS.clearOutput();
        }
        outputText(text) {
            kGAMECLASS_1.kGAMECLASS.outputText(text);
        }
    }
    exports.CommonItem = CommonItem;
});
//# sourceMappingURL=CommonItem.js.map