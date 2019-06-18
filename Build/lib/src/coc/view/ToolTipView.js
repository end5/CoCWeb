"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ToolTipView {
    constructor(mainView, model) {
        this.model = model;
        this.bg = mainView.getChildByName("popUpBG");
        this.tf = mainView.getChildByName("mouseOverText");
        this.bg.x = 0;
        this.bg.y = 0;
        this.tf.x = 22;
        this.tf.y = 22;
        this.tf.type = TextFieldType.DYNAMIC;
        this.addChild(this.bg);
        this.addChild(this.tf);
    }
    ;
    showForButton(button) {
        var bx = button.x, by = button.y;
        // TODO: Should we try to remove some of these numbers?
        if (this.model.mobile) {
            bx = (bx >= 410 ? 405 : bx);
            this.x = bx + 98;
            this.y = by - 347;
        }
        else {
            bx = (bx >= 708 ? 700 : bx);
            this.x = bx - 13;
            this.y = by - 232;
        }
        this.visible = true;
    }
    ;
    hide() {
        this.visible = false;
    }
    ;
    set text(newText) {
        this.tf.htmlText = newText || '';
    }
    ;
    get text() {
        return this.tf.htmlText;
    }
    ;
}
exports.ToolTipView = ToolTipView;
//# sourceMappingURL=ToolTipView.js.map