
/****
    coc.view.CoCButton

    note that although this stores its current tool tip text,
    it does not display the text.  That is taken care of
    by whoever owns this.

    The mouse event handlers are public to facilitate reaction to
    keyboard events.
****/



export class CoCButton extends HTMLElement {
    // How far down from the top of our registration point the TF is.
    public static LABEL_FIELD_Y_OFFSET: number = 9;
    public static LABEL_FIELD_HEIGHT: number = 25;

    protected _labelField: TextField,
    protected _backgroundGraphic: MovieClip,
    protected _callback: any;

    public toolTipText: string;

    public constructor(labelField?: TextField, backgroundGraphic?: MovieClip): void {
        super();
        if (backgroundGraphic) {
            this.x = backgroundGraphic.x;
            this.y = backgroundGraphic.y;
        }

        this.labelField = labelField;
        this.backgroundGraphic = backgroundGraphic;

        this.mouseChildren = false;

        this.addEventListener(MouseEvent.ROLL_OVER, this.hover);
        this.addEventListener(MouseEvent.ROLL_OUT, this.dim);
        this.addEventListener(MouseEvent.CLICK, this.click);
    };



    //////// Mouse Events... ////////

    public hover(event: MouseEvent = undefined): void {
        if (this.backgroundGraphic)
            this.backgroundGraphic.alpha = 0.5;
    };

    public dim(event: MouseEvent = undefined): void {
        if (this.backgroundGraphic)
            this.backgroundGraphic.alpha = 1;
    };

    public click(event: MouseEvent = undefined): void {
        if (this._callback)
            this._callback();
    };



    //////// Getters and Setters ////////

    public get labelField(): TextField {
        return this._labelField;
    };

    public set labelField(value: TextField): void {
        // TODO: Remove previous labelField?

        this._labelField = value;

        if (!this._labelField) return;

        this.addChild(this._labelField);

        this._labelField.mouseEnabled = false;

        this._labelField.x = 0;
        this._labelField.y = LABEL_FIELD_Y_OFFSET;
        this._labelField.width = this.width;
        this._labelField.height = LABEL_FIELD_HEIGHT;
    };

    public get backgroundGraphic(): MovieClip {
        return this._backgroundGraphic;
    };

    public set backgroundGraphic(value: MovieClip): void {
        // TODO: Remove previous background graphic?

        this._backgroundGraphic = value;

        if (!this._backgroundGraphic) return;

        this.addChildAt(this._backgroundGraphic, 0);

        this._backgroundGraphic.mouseEnabled = true;

        this._backgroundGraphic.x = 0;
        this._backgroundGraphic.y = 0;

        this.width = this._backgroundGraphic.width;
    };

    public get labelText(): string {
        return this.labelField.text;
    };

    public set labelText(value: string): void {
        this.labelField.text = value;
    };

    public get callback() {
        return this._callback;
    };

    public set callback(value): void {
        this._callback = value;
    };

    //// Overrides. ////
    public get width(): number {
        return this.backgroundGraphic ? this.backgroundGraphic.width : 0;
    };

    public set width(value: number): void {
        if (this.backgroundGraphic)
            this.backgroundGraphic.width = value;

        if (this.labelField)
            this.labelField.width = value;
    };

    public get height(): number {
        return this.backgroundGraphic ? this.backgroundGraphic.height : 0;
    };

    public set height(value: number): void {
        if (this.backgroundGraphic)
            this.backgroundGraphic.height = value;
        // TODO: Do anything to the text field?
    };
}
