import { bindToClass } from "../ClassBinder";
import { kFLAGS } from "../classes/GlobalFlags/kFLAGS";
import { trace } from "../console";
import { GameModel } from "../model/GameModel";
import { Sprites } from "../Sprites";
import { CoCButton } from "./CoCButton";
import { loadId } from "./LoadUtils";
import { StatsView } from "./StatsView";

/* ***
 coc.view.MainView

 I have no real idea yet what eventTestInput is for,
 but its coordinates get tested for in places, and set in others.
 Perhaps some day I'll ask.

 It's for allowing people to test stuff in the parser. It gets moved into view, and you
 can enter stuff in the text window, which then gets fed through the parser.

 That's good to know.  Cheers.
 *** */

export class MainView {
    // Menu button names.
    public static MENU_NEW_MAIN = "newGame";
    public static MENU_DATA = "data";
    public static MENU_STATS = "stats";
    public static MENU_LEVEL = "level";
    public static MENU_PERKS = "perks";
    public static MENU_APPEARANCE = "appearance";

    private static BOTTOM_BUTTON_COUNT = 10;
    private static TOP_BUTTON_COUNT = 6;
    // private static BOTTOM_BUTTON_PER_ROW_COUNT: number = 5;

    /// / Actual buttons.
    public bottomButtons: CoCButton[] = [];
    public newGameButton: CoCButton;
    public dataButton: CoCButton;
    public statsButton: CoCButton;
    public levelButton: CoCButton;
    public perksButton: CoCButton;
    public appearanceButton: CoCButton;

    public mainText: HTMLElement;
    private sprite: HTMLImageElement;

    public statsView: StatsView;

    protected allButtons: CoCButton[];

    protected model: GameModel;

    public constructor(model: GameModel) {
        bindToClass(this);

        this.model = model;

        // Init subviews.
        this.statsView = new StatsView(this.model);
        this.statsView.hide();

        // this.hideSprite();

        this.allButtons = [];

        this.mainText = loadId("mainTextDisplay");
        this.sprite = loadId("mainSpriteDisplay") as HTMLImageElement;

        // Top button init
        this.newGameButton = new CoCButton(loadId("buttontop0"));
        this.dataButton = new CoCButton(loadId("buttontop1"));
        this.statsButton = new CoCButton(loadId("buttontop2"));
        this.levelButton = new CoCButton(loadId("buttontop3"));
        this.perksButton = new CoCButton(loadId("buttontop4"));
        this.appearanceButton = new CoCButton(loadId("buttontop5"));

        // Bottom button init
        for (let index = 0; index < MainView.BOTTOM_BUTTON_COUNT; index++) {
            this.bottomButtons.push(new CoCButton(loadId(`button${index}`)));
        }
    }

    /// ///// Internal(?) view update methods ////////

    public showBottomButton(
        index: number,
        label: string,
        callback?: any,
        toolTipViewText = ""
    ): void {
        // var buttonTF :TextField = this.bottomButtonTexts[ index ] as TextField,
        //  buttonBG :MovieClip = this.bottomButtonBGs[ index ] as MovieClip;
        const button = this.bottomButtons[index];

        // Should error.
        if (!button) return;

        button.labelText = label;
        button.callback = callback;
        button.toolTipText = toolTipViewText;
        button.visible = true;
    }

    public hideBottomButton(index: number) {
        const button = this.bottomButtons[index];

        // Should error.
        if (!button) return;

        button.visible = false;
    }

    /// ///// Bottom Button Methods ////////

    // TODO: Refactor button set-up code to use callback and toolTipViewText here.
    public setButton(index: number, label = "", callback?: any, toolTipViewText = "") {
        if (index < 0 || index >= MainView.BOTTOM_BUTTON_COUNT) {
            trace("MainView.setButton called with out of range index:", index);
            // throw new RangeError();
            return;
        }

        if (label) {
            this.showBottomButton(index, label, callback, toolTipViewText);
        } else {
            this.hideBottomButton(index);
        }
    }

    public clearBottomButtons(): void {
        let i: number;

        for (i = 0; i < MainView.BOTTOM_BUTTON_COUNT; ++i) {
            this.setButton(i);
        }
    }

    /// ///// Menu Button Methods ////////

    protected getMenuButtonByName(name: string): CoCButton {
        switch (name) {
            case "newGame":
                return this.newGameButton;
            case "data":
                return this.dataButton;
            case "stats":
                return this.statsButton;
            case "level":
                return this.levelButton;
            case "perks":
                return this.perksButton;
            case "appearance":
                return this.appearanceButton;
        }
        throw new Error(`MainView.getMenuButtonByName: Invalid menu button name: ${name}`);
    }

    /// /////

    public setMenuButton(name: string, label = "", callback?: any): void {
        const button = this.getMenuButtonByName(name);

        if (label) {
            button.labelText = label;
        }

        if (callback) {
            button.callback = callback;
        }
    }

    public set onNewGameClick(callback: any) {
        this.newGameButton.callback = callback;
    }

    public set onDataClick(callback: any) {
        this.dataButton.callback = callback;
    }

    public set onStatsClick(callback: any) {
        this.statsButton.callback = callback;
    }

    public set onLevelClick(callback: any) {
        this.levelButton.callback = callback;
    }

    public set onPerksClick(callback: any) {
        this.perksButton.callback = callback;
    }

    public set onAppearanceClick(callback: any) {
        this.appearanceButton.callback = callback;
    }

    public showMenuButton(name: string): void {
        const button: CoCButton = this.getMenuButtonByName(name);
        button.visible = true;
    }

    public hideMenuButton(name: string): void {
        const button: CoCButton = this.getMenuButtonByName(name);
        button.visible = false;
    }

    public showAllMenuButtons() {
        this.showMenuButton(MainView.MENU_NEW_MAIN);
        this.showMenuButton(MainView.MENU_DATA);
        this.showMenuButton(MainView.MENU_STATS);
        this.showMenuButton(MainView.MENU_LEVEL);
        this.showMenuButton(MainView.MENU_PERKS);
        this.showMenuButton(MainView.MENU_APPEARANCE);
    }

    public hideAllMenuButtons() {
        this.hideMenuButton(MainView.MENU_NEW_MAIN);
        this.hideMenuButton(MainView.MENU_DATA);
        this.hideMenuButton(MainView.MENU_STATS);
        this.hideMenuButton(MainView.MENU_LEVEL);
        this.hideMenuButton(MainView.MENU_PERKS);
        this.hideMenuButton(MainView.MENU_APPEARANCE);
    }

    public hideCurrentBottomButtons() {
        for (const button of this.bottomButtons) button.visible = false;
    }

    public showCurrentBottomButtons() {
        for (const button of this.bottomButtons) button.visible = true;
    }

    /// ///// misc... ////////

    public clearOutputText(): void {
        this.mainText.innerHTML = "";
    }

    public appendOutputText(text: string): void {
        this.mainText.innerHTML += text;
    }

    public setOutputText(text: string): void {
        this.mainText.innerHTML = text;
    }

    public selectSprite(index = 0): void {
        // TODO: When flags goes away, if it goes away, replace this with the appropriate settings thing.
        if (index < 0 || this.model.flags[kFLAGS.SHOW_SPRITES_FLAG])
            // = SHOW_SPRITES_FLAG from flagDefs...
            this.sprite.classList.add("hidden");
        else {
            this.sprite.src = `./asset/sprites/${Sprites[index]}.png`;
            this.sprite.classList.remove("hidden");
        }
    }

    public hideSprite(): void {
        this.selectSprite(-1);
    }
}
