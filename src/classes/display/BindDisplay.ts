import { CoCButton } from "../../view/CoCButton";

/**
 * Defines a composite display object of all the seperate components required to display a
 * single BoundControlMethod, its associated primary and secondary bindings with the buttons
 * used to bind methods to new keys.
 *
 * @author Gedan
 */
export class BindDisplay {
    public element: HTMLTableRowElement;

    // Object components and settings
    // private _maxWidth: number;
    private _nameLabel: HTMLParagraphElement;
    private _buttons: CoCButton[];
    // private _buttonBgs: any[];

    // Shared formatting information
    // TODO: this should probably be statically initialized. Global static formatting class?
    // private _textFormatLabel: TextFormat;
    // private _textFormatButton: TextFormat;
    // private _textFont: Font;

    // Storage attributes for the button text, so we can wrap it seperately in HTML tags
    // and store the raw value here, for return on demand.
    // private _button1Text: string;
    // private _button2Text: string;

    // Values for the contained button sizing/offsets
    // private static BUTTON_X_OFFSET: number = 200;
    // private static BUTTON_Y_OFFSET: number = 668;
    // private static BUTTON_X_DELTA: number = 160;
    // public static BUTTON_Y_DELTA: number = 52;
    // private static BUTTON_REAL_WIDTH: number = 150;
    // private static BUTTON_REAL_HEIGHT: number = 40;

    /**
     * Create a new composite object, initilizing the label to be used for display, as well as the two
     * buttons used for user interface.
     *
     * @param maxWidth Defines the maximum available width that the control can consume for positining math
     */
    public constructor() {
        this.element = document.createElement("tr");

        // this._maxWidth = maxWidth;

        // TODO: This is also the kind of thing that would be handy to stuff into a global static class
        // to init global formatting objects in a central location
        // this.InitFormatting();
        // this._textFont = new ButtonLabelFont();

        // this._textFormatLabel = new TextFormat();
        // this._textFormatLabel.font = this._textFont.fontName; // Pulls in our embedded fonts from the swc to use dynamically!
        // this._textFormatLabel.size = 18;
        // this._textFormatLabel.align = TextFormatAlign.RIGHT;

        // this._textFormatButton = new TextFormat();
        // this._textFormatButton.font = this._textFont.fontName;
        // this._textFormatButton.size = 18;
        // this._textFormatButton.align = TextFormatAlign.CENTER;

        // this.InitButtons();
        // this.InitLabel();

        const labelCell = document.createElement("td");
        this.element.appendChild(labelCell);

        this._nameLabel = document.createElement("p");
        labelCell.appendChild(this._nameLabel);

        const button1 = document.createElement("td");
        button1.className = "controlButton";
        button1.innerHTML = '<a class="button"></a>';

        const button2 = document.createElement("td");
        button2.className = "controlButton";
        button2.innerHTML = '<a class="button"></a>';

        this._buttons = [new CoCButton(button1), new CoCButton(button2)];
        this.element.appendChild(button1);
        this.element.appendChild(button2);
    }

    /**
     * Init the shared formatting objects.
     */
    // private InitFormatting(): void {
    //     this._textFont = new ButtonLabelFont();

    //     this._textFormatLabel = new TextFormat();
    //     this._textFormatLabel.font = this._textFont.fontName; // Pulls in our embedded fonts from the swc to use dynamically!
    //     this._textFormatLabel.size = 18;
    //     this._textFormatLabel.align = TextFormatAlign.RIGHT;

    //     this._textFormatButton = new TextFormat();
    //     this._textFormatButton.font = this._textFont.fontName;
    //     this._textFormatButton.size = 18;
    //     this._textFormatButton.align = TextFormatAlign.CENTER;
    // }

    /**
     * Create the button pair used for user input.
     *
     * TODO: This code does a lot of things that should realistically be rolled into the underlying
     * CoCButton class, or at least, some kind of wrapper around it. The approach, combined with the
     * shared text formatting, would probably allow us to move to having a properly contained button class
     * without the need for seperate labels.
     */
    // private InitButtons(): void {
    //     this._buttons = new Array();
    //     this._buttonBgs = new Array();

    //     var b: MovieClip;
    //     var button: CoCButton;
    //     var tf: TextField;

    //     var xPos: number;
    //     xPos = (this._maxWidth - 15) - (2 * BindDisplay.BUTTON_X_DELTA);

    //     for (var i: number = 0; i < 2; i++) {
    //         b = new buttonBackground0();
    //         b.name = "ctrlBtn" + String(i);
    //         b.x = xPos;
    //         xPos += BindDisplay.BUTTON_X_DELTA;
    //         b.y = 0;
    //         b.width = BindDisplay.BUTTON_REAL_WIDTH;
    //         b.height = BindDisplay.BUTTON_REAL_HEIGHT;

    //         tf = new TextField();
    //         tf.defaultTextFormat = this._textFormatButton;
    //         tf.embedFonts = true;
    //         tf.antiAliasType = AntiAliasType.ADVANCED;
    //         tf.htmlText = "<b>Unbound</b>";

    //         button = new CoCButton(tf, b);

    //         this._buttons.push(button);
    //         this._buttonBgs.push(b);
    //         this.addChild(button);
    //     }
    // }

    /**
     * Create the primary label field used for text display outside of the buttons.
     */
    // private InitLabel(): void {
    // this._nameLabel = document.createElement('p');
    // this._nameLabel.defaultTextFormat = this._textFormatLabel;
    // this._nameLabel.embedFonts = true;
    // this._nameLabel.antiAliasType = AntiAliasType.ADVANCED;
    // this._nameLabel.text = "THIS IS SOME KINDA CRAZY LABEL";
    // this._nameLabel.width = this._maxWidth - (2 * BindDisplay.BUTTON_X_DELTA) - 20;
    // this._nameLabel.y = this._buttons[0].labelField.y;
    // this.addChild(this._nameLabel);
    // this.element.appendChild(this._nameLabel);
    // }

    // public get text(): string {
    //     return this._nameLabel.text;
    // }

    // public set text(value: string) {
    //     this._nameLabel.text = value;
    // }

    public get htmlText() {
        return this._nameLabel.innerHTML;
    }

    public set htmlText(value) {
        this._nameLabel.innerHTML = value;
    }

    public get button1Text() {
        return this._buttons[0].labelText;
    }

    public get button2Text() {
        return this._buttons[1].labelText;
    }

    public set button1Text(value) {
        // if (value != this._button1Text) {
        //     this._button1Text = value;
        this._buttons[0].labelText = `<b>${value}</b>`;
        // }
    }

    public set button2Text(value) {
        // if (value != this._button2Text) {
        //     this._button2Text = value;
        this._buttons[1].labelText = `<b>${value}</b>`;
        // }
    }

    public set button1Callback(callback: () => void) {
        this._buttons[0].callback = callback;
    }

    public set button2Callback(callback: () => void) {
        this._buttons[1].callback = callback;
    }
}
