import { CoCButton } from "./CoCButton";

import { trace } from "console";
import { ToolTipView } from "./ToolTipView";
import { GameModel } from "../classes/coc/model/GameModel";
import { kFLAGS } from "../classes/classes/GlobalFlags/kFLAGS";

/****
	coc.view.MainView

	I have no real idea yet what eventTestInput is for,
	but its coordinates get tested for in places, and set in others.
	Perhaps some day I'll ask.

	It's for allowing people to test stuff in the parser. It gets moved into view, and you 
	can enter stuff in the text window, which then gets fed through the parser.

	That's good to know.  Cheers.
****/





export class MainView {
    // Menu button names.
    public static MENU_NEW_MAIN: string = 'newGame';
    public static MENU_DATA: string = 'data';
    public static MENU_STATS: string = 'stats';
    public static MENU_LEVEL: string = 'level';
    public static MENU_PERKS: string = 'perks';
    public static MENU_APPEARANCE: string = 'appearance';

    private static BOTTOM_BUTTON_COUNT: number = 10;
    private static BOTTOM_BUTTON_PER_ROW_COUNT: number = 5;

    private static BUTTON_X_OFFSET: number = 200;
    private static BUTTON_Y_OFFSET: number = 668;
    private static BUTTON_X_DELTA: number = 160;
    private static BUTTON_Y_DELTA: number = 52;
    private static BUTTON_REAL_WIDTH: number = 150;
    private static BUTTON_REAL_HEIGHT: number = 40;

    public aCb: ComboBox;
    // public var nameBox :TextField;

    //// Actual buttons.
    public bottomButtons: any[];
    public newGameButton: CoCButton;
    public dataButton: CoCButton;
    public statsButton: CoCButton;
    public levelButton: CoCButton;
    public perksButton: CoCButton;
    public appearanceButton: CoCButton;

    public bottomButtonTexts: any[]; // <TextField>
    public bottomButtonBGs: any[]; // <MovieClip>
    public menuButtonTexts: any[];
    public menuButtonBGs: any[];
    private currentActiveButtons: any[];

    public toolTipView: ToolTipView;
    public statsView: StatsView;

    protected options: Record<string, any>;
    // protected var allButtonTexts : any[];
    protected allButtons: any[];
    protected callbacks: Record<string, any> = {};

    protected model: GameModel;

    public newGameBG: MovieClip;
    public dataBG: MovieClip;
    public statsBG: MovieClip;
    public levelBG: MovieClip;
    public perksBG: MovieClip;
    public appearanceBG: MovieClip;

    public constructor(model?: GameModel, options?: Record<string, any>): void {
        // Note: Currently we can't touch this on construction
        // due to the code being a mess.  We'll fix that at some point.
        // maybe even get like update events or some shit like real MV*s or something.
        this.model = model;
        this.options = options || {};

        if (!model) {
            trace("MainView/constructor: Game model not passed in.  Don't publish MainView.fla with Ctrl-Enter/Cmd-Enter.  Rather, go to File > Publish to build the SWC.");
            throw new ArgumentError("MainView/constructor: MainView must be constructed with a GameModel as its first argument.");
        }

        // Init subviews.
        this.statsView = new StatsView(this, this.model);
        this.statsView.hide();
        this.addChild(this.statsView);

        this.toolTipView = new ToolTipView(this, this.model);
        this.toolTipView.hide();
        this.addChild(this.toolTipView);

        this.formatMiscItems();

        this.allButtons = [];

        // button texts.  This part will eventually go away...
        this.bottomButtonTexts = [
            b1Text, b2Text, b3Text, b4Text, b5Text,
            b6Text, b7Text, b8Text, b9Text, b0Text // wonky.
        ];

        this.createBottomButtons();
        this.createMenuButtons();

        // disable interaction for any remaining TFs.
        this.disableMouseForMostTextFields();

        // hook!
        this.hookBottomButtons();
        this.hookAllButtons();
    };



    //////// Initialization methods. /////////

    protected formatMiscItems(): void {
        // this.mainText = this.getChildByName( "mainText" );

        this.nameBox.maxChars = 54;

        this.aCb = new ComboBox();
        this.aCb.dropdownWidth = 200;
        this.aCb.width = 200;
        this.aCb.scaleY = 1.1;
        this.aCb.move(-1250, -1550);
        this.aCb.prompt = "Choose a perk";
        this.addChild(this.aCb);

        this.hideSprite();
    };

    // Removes the need for some code in input.as and InitializeUI.as.
    protected disableMouseForMostTextFields(): void {
        var ci: number, t: TextField;

        for (ci = 0; ci < this.numChildren; ++ci) {
            t = this.getChildAt(ci) as TextField;

            if (!t) {
                continue;
            }

            switch (t) {
                case this.mainText:
                case this.nameBox:
                case this.eventTestInput:
                    t.mouseEnabled = true;
                    break;

                default:
                    t.mouseEnabled = false;
                    break;
            }
        }
    };

    // This creates the bottom buttons,
    // positions them,
    // and also assigns their index to a bottomIndex property on them.
    protected createBottomButtons(): void {
        var b: MovieClip, bgClasses: any[],
            bi: number, r: number, c: number,
            backgroundChildIndex: number,
            button: CoCButton;

        this.bottomButtonBGs = [];
        this.bottomButtons = [];

        bgClasses = [
            buttonBackground0,
            buttonBackground1,
            buttonBackground2,
            buttonBackground3,
            buttonBackground4,
            buttonBackground5,
            buttonBackground6,
            buttonBackground7,
            buttonBackground8,
            buttonBackground9];

        backgroundChildIndex = this.getChildIndex(background);

        for (bi = 0; bi < MainView.BOTTOM_BUTTON_COUNT; ++bi) {
            b = new (bgClasses[bi])();
            b.name = 'b' + String((bi + 1) % 10) + 'BG';

            r = (bi / MainView.BOTTOM_BUTTON_PER_ROW_COUNT) << 0;
            c = bi % MainView.BOTTOM_BUTTON_PER_ROW_COUNT;

            b.x = MainView.BUTTON_X_OFFSET + c * MainView.BUTTON_X_DELTA;
            b.y = MainView.BUTTON_Y_OFFSET + r * MainView.BUTTON_Y_DELTA;
            b.width = MainView.BUTTON_REAL_WIDTH;   //The button symbols are actually 135 wide
            b.height = MainView.BUTTON_REAL_HEIGHT; //and 38 high. Not sure why the difference here.

            button = new CoCButton(this.bottomButtonTexts[bi], b);

            this.bottomButtonBGs.push(b);
            this.bottomButtons.push(button);
            this.addChildAt(button, backgroundChildIndex + 1);
        }

        this.allButtons = this.allButtons.concat(this.bottomButtons);
    };

    protected createMenuButtons(): void {
        var btf: TextField, bbg: MovieClip,
            bn: string,
            backgroundChildIndex: number,
            buttonNames: any[],
            button: CoCButton;

        buttonNames = [
            MainView.MENU_NEW_MAIN,
            MainView.MENU_DATA,
            MainView.MENU_STATS,
            MainView.MENU_LEVEL,
            MainView.MENU_PERKS,
            MainView.MENU_APPEARANCE
        ];

        backgroundChildIndex = this.getChildIndex(background);

        for (bn of buttonNames) {
            button =
                new CoCButton(
                    // second case is for levelBG.
                    (this.getChildByName(bn + 'Text2') || this.getChildByName(bn + 'Text')) as TextField,
                    (this.getChildByName(bn + 'BG2') || this.getChildByName(bn + 'BG')) as MovieClip
                );

            this[bn + "Button"] = button
            this.allButtons.push(button);
            this.addChildAt(button, backgroundChildIndex + 1);
        }
    };

    protected hookBottomButtons(): void {
        var bi: MovieClip;
        for (bi of this.bottomButtons) {
            bi.addEventListener(MouseEvent.CLICK, this.executeBottomButtonClick);
        }
    };

    protected hookAllButtons() {
        var b: MovieClip;

        for (b of this.allButtons) {
            b.mouseChildren = false;
            b.addEventListener(MouseEvent.ROLL_OVER, this.hoverButton);
            b.addEventListener(MouseEvent.ROLL_OUT, this.dimButton);
        }
    };



    //////// Internal(?) view update methods ////////

    public showBottomButton(index: number, label: string, callback = undefined, toolTipViewText: string = ''): void {
        // var buttonTF :TextField = this.bottomButtonTexts[ index ] as TextField,
        // 	buttonBG :MovieClip = this.bottomButtonBGs[ index ] as MovieClip;
        var button: CoCButton = this.bottomButtons[index] as CoCButton;

        // Should error.
        if (!button) return;

        button.labelText = label;
        button.callback = callback;
        button.toolTipText = toolTipViewText;
        button.visible = true;
    };

    public hideBottomButton(index: number) {
        var button: CoCButton = this.bottomButtons[index] as CoCButton;

        // Should error.
        if (!button) return;

        button.visible = false;
    };

    public hideCurrentBottomButtons(): void {
        this.currentActiveButtons = new Array();

        for (var i: number = 0; i < MainView.BOTTOM_BUTTON_COUNT; i++) {
            var button: CoCButton = this.bottomButtons[i] as CoCButton;

            if (button.visible == true) {
                this.currentActiveButtons.push(i);
                button.visible = false;
            }
        }
    }

    public showCurrentBottomButtons(): void {
        if (!this.currentActiveButtons) return;
        if (this.currentActiveButtons.length == 0) return;

        for (var i: number = 0; i < this.currentActiveButtons.length; i++) {
            var btnIdx = this.currentActiveButtons[i];
            var button: CoCButton = this.bottomButtons[btnIdx] as CoCButton;

            button.visible = true;
        }
    }

    //////// Internal event handlers ////////

    protected textForBG(bg: DisplayObject): TextField {
        var textName: string;

        if (!bg) {
            throw new ArgumentError("MainView.textForBG() must be called with a DisplayObject as its argument.");
        }

        textName = bg.name.replace(/BG$/, 'Text');

        if (bg.name == 'levelBG')
            textName += '2';

        return this[textName] as TextField;
    };

    protected executeBottomButtonClick(event: Event) {
        this.toolTipView.hide();
    };

    protected hoverButton(event: MouseEvent) {
        var button: CoCButton;

        button = event.target as CoCButton;

        if (button && button.visible && button.toolTipText) {
            this.toolTipView.text = button.toolTipText;
            this.toolTipView.showForButton(button);
        }
        else {
            this.toolTipView.hide();
        }
    };

    protected dimButton(event: MouseEvent) {
        this.toolTipView.hide();
    };



    //////// Bottom Button Methods ////////

    // TODO: Refactor button set-up code to use callback and toolTipViewText here.
    public setButton(index: number, label: string = '', callback = undefined, toolTipViewText: string = '') {
        if (index < 0 || index >= MainView.BOTTOM_BUTTON_COUNT) {
            trace("MainView.setButton called with out of range index:", index);
            // throw new RangeError();
            return;
        }

        if (label) {
            this.showBottomButton(index, label, callback, toolTipViewText);
        }
        else {
            this.hideBottomButton(index);
        }
    };

    // There was one case where the label needed to be set but I could not determine from context whether the button should be shown or not...
    public setButtonText(index: number, label: string): void {
        this.bottomButtons[index].labelText = label;
    };

    public hasButton(labelText: string): boolean {
        return this.indexOfButtonWithLabel(labelText) !== -1;
    };

    public indexOfButtonWithLabel(labelText: string): number {
        var i: number;

        for (i = 0; i < this.bottomButtons.length; ++i) {
            if (this.getButtonText(i) === labelText)
                return i;
        }

        return -1;
    };

    public clearBottomButtons(): void {
        var i: number;

        for (i = 0; i < MainView.BOTTOM_BUTTON_COUNT; ++i) {
            this.setButton(i);
        }
    };

    public getButtonText(index: number): string {
        //			var matches : any;

        if (index < 0 || index > MainView.BOTTOM_BUTTON_COUNT) {
            return '';
        }
        else {
            return this.bottomButtons[index].labelText;
        }
    };

    public clickButton(index: number): void {
        this.bottomButtons[index].click();
    };

    // This function checks if the button at index has text
    // that matches at least one of the possible texts passed as an argument.
    public buttonTextIsOneOf(index: number, possibleLabels: any[]): boolean {
        var label: string,
            buttonText: string;

        buttonText = this.getButtonText(index);

        return (possibleLabels.indexOf(buttonText) != -1);
    };

    public buttonIsVisible(index: number): boolean | undefined {
        if (index < 0 || index > MainView.BOTTOM_BUTTON_COUNT) {
            return undefined;
        }
        else {
            return this.bottomButtons[index].visible;
        }
    };



    //////// Menu Button Methods ////////

    protected getMenuButtonByName(name: string): CoCButton {
        return this[name + 'Button'] as CoCButton;
    };

    ////////

    public setMenuButton(name: string, label: string = '', callback = undefined): void {
        var button: CoCButton = this.getMenuButtonByName(name);

        if (!button) {
            throw new Error("MainView.setMenuButton: Invalid menu button name: " + String(name));
        }

        if (label) {
            button.labelText = label;
        }

        if (callback) {
            button.callback = callback;
        }
    };

    public set onNewGameClick(callback: any) {
        this.newGameButton.callback = callback;
    };

    public set onDataClick(callback: any) {
        this.dataButton.callback = callback;
    };

    public set onStatsClick(callback: any) {
        this.statsButton.callback = callback;
    };

    public set onLevelClick(callback: any) {
        this.levelButton.callback = callback;
    };

    public set onPerksClick(callback: any) {
        this.perksButton.callback = callback;
    };

    public set onAppearanceClick(callback: any) {
        this.appearanceButton.callback = callback;
    };

    public showMenuButton(name: string): void {
        var button: CoCButton = this.getMenuButtonByName(name);
        button.visible = true;
    };

    public hideMenuButton(name: string): void {
        var button: CoCButton = this.getMenuButtonByName(name);
        button.visible = false;
    };

    public showAllMenuButtons() {
        this.showMenuButton(MainView.MENU_NEW_MAIN);
        this.showMenuButton(MainView.MENU_DATA);
        this.showMenuButton(MainView.MENU_STATS);
        this.showMenuButton(MainView.MENU_LEVEL);
        this.showMenuButton(MainView.MENU_PERKS);
        this.showMenuButton(MainView.MENU_APPEARANCE);
    };

    public hideAllMenuButtons() {
        this.hideMenuButton(MainView.MENU_NEW_MAIN);
        this.hideMenuButton(MainView.MENU_DATA);
        this.hideMenuButton(MainView.MENU_STATS);
        this.hideMenuButton(MainView.MENU_LEVEL);
        this.hideMenuButton(MainView.MENU_PERKS);
        this.hideMenuButton(MainView.MENU_APPEARANCE);
    };

    public menuButtonIsVisible(name: string): boolean {
        return this.getMenuButtonByName(name).visible;
    };

    public menuButtonHasLabel(name: string, label: string): boolean {
        return this.getMenuButtonByName(name).labelText == label;
    };



    //////// misc... ////////

    public invert(): void {
        if (!this.blackBackground.visible) {
            this.blackBackground.visible = true;
        }
        else {
            this.blackBackground.visible = false;
        }
    };

    public clearOutputText(): void {
        this.mainText.htmlText = '';
        this.scrollBar.update();
    };

    public appendOutputText(text: string): void {
        this.mainText.htmlText += text;
        this.scrollBar.update();
    };

    public setOutputText(text: string): void {
        // Commenting out for now, because this is annoying to see flooding the trace.
        // trace( "MainView#setOutputText(): This is never called in the main outputText() function.  Possible bugs that were patched over by updating text manually?" );
        this.mainText.htmlText = text;
        this.scrollBar.update();
    };

    public selectSprite(index: number = 0): void {
        var scale: number;

        // TODO: When flags goes away, if it goes away, replace this with the appropriate settings thing.
        if (index < 0 || this.model.flags[kFLAGS.SHOW_SPRITES_FLAG]) // = SHOW_SPRITES_FLAG from flagDefs...
            this.sprite.visible = false;
        else {
            this.sprite.visible = true;
            this.sprite.gotoAndStop(index);

            this.sprite.scaleX = 1;
            this.sprite.scaleY = 1;
            scale = 80 / this.sprite.height;
            this.sprite.scaleX = scale;
            this.sprite.scaleY = scale;
        }
    };

    public hideSprite(): void {
        this.selectSprite(-1);
    };

    public showTestInputPanel(): void {
        this.eventTestInput.x = 207.5;
        this.eventTestInput.y = 55.1;

        this.mainText.visible = false;

        this.eventTestInput.selectable = true;
        this.eventTestInput.type = TextFieldType.INPUT;
        this.eventTestInput.visible = true;

        this.scrollBar.scrollTarget = this.eventTestInput;

    };

    public hideTestInputPanel(): void {

        this.eventTestInput.x = -10207.5;
        this.eventTestInput.y = -1055.1;

        this.mainText.visible = true;


        this.eventTestInput.selectable = false;
        this.eventTestInput.type = TextFieldType.DYNAMIC;
        this.eventTestInput.visible = false;

        this.scrollBar.scrollTarget = this.mainText;

    };
}
