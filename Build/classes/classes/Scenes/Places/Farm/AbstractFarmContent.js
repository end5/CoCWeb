define(["require", "exports", "../../../BaseContent", "../../../GlobalFlags/kGAMECLASS"], function (require, exports, BaseContent_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 08.01.14.
     */
    class AbstractFarmContent extends BaseContent_1.BaseContent {
        get farm() {
            return kGAMECLASS_1.kGAMECLASS.farm;
        }
    }
    exports.AbstractFarmContent = AbstractFarmContent;
});
//# sourceMappingURL=AbstractFarmContent.js.map