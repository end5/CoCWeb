

export class ToolTipView {
    public bg: Sprite;
    public tf: TextField;

    protected model: GameModel;

    public constructor(mainView: MovieClip, model: GameModel): void {
        this.model = model;

        this.bg = mainView.getChildByName("popUpBG") as Sprite;
        this.tf = mainView.getChildByName("mouseOverText") as TextField;

        this.bg.x = 0;
        this.bg.y = 0;

        this.tf.x = 22;
        this.tf.y = 22;

        this.tf.type = TextFieldType.DYNAMIC;

        this.addChild(this.bg);
        this.addChild(this.tf);
    };

    public showForButton(button: DisplayObject) {
        var bx = button.x,
            by = button.y;

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
    };

    public hide() {
        this.visible = false;
    };

    public set text(newText: string): void {
        this.tf.htmlText = newText || '';
    };

    public get text(): string {
        return this.tf.htmlText;
    };
}
