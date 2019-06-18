define(["require", "exports", "../../../BaseContent", "../../../GlobalFlags/kGAMECLASS"], function (require, exports, BaseContent_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 06.01.14.
     */
    class AbstractLakeContent extends BaseContent_1.BaseContent {
        get lake() {
            return kGAMECLASS_1.kGAMECLASS.lake;
        }
    }
    exports.AbstractLakeContent = AbstractLakeContent;
});
//# sourceMappingURL=AbstractLakeContent.js.map