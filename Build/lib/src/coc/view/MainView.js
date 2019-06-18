define(["require", "exports", "./StatsView", "../../../../classes/console", "./CoCButton", "../../../../classes/classes/GlobalFlags/kFLAGS", "./LoadUtils", "../../../../classes/Sprites", "../../../../classes/ClassBinder"], function (require, exports, StatsView_1, console_1, CoCButton_1, kFLAGS_1, LoadUtils_1, Sprites_1, ClassBinder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /****
        coc.view.MainView
    
        I have no real idea yet what eventTestInput is for,
        but its coordinates get tested for in places, and set in others.
        Perhaps some day I'll ask.
    
        It's for allowing people to test stuff in the parser. It gets moved into view, and you
        can enter stuff in the text window, which then gets fed through the parser.
    
        That's good to know.  Cheers.
    ****/
    class MainView {
        constructor(model) {
            // private static BOTTOM_BUTTON_PER_ROW_COUNT: number = 5;
            //// Actual buttons.
            this.bottomButtons = [];
            ClassBinder_1.bindToClass(this);
            this.model = model;
            // Init subviews.
            this.statsView = new StatsView_1.StatsView(this.model);
            this.statsView.hide();
            // this.hideSprite();
            this.allButtons = [];
            this.mainText = LoadUtils_1.loadId('mainTextDisplay');
            this.sprite = LoadUtils_1.loadId('mainSpriteDisplay');
            // Top button init
            this.newGameButton = new CoCButton_1.CoCButton(LoadUtils_1.loadId('buttontop0'));
            this.dataButton = new CoCButton_1.CoCButton(LoadUtils_1.loadId('buttontop1'));
            this.statsButton = new CoCButton_1.CoCButton(LoadUtils_1.loadId('buttontop2'));
            this.levelButton = new CoCButton_1.CoCButton(LoadUtils_1.loadId('buttontop3'));
            this.perksButton = new CoCButton_1.CoCButton(LoadUtils_1.loadId('buttontop4'));
            this.appearanceButton = new CoCButton_1.CoCButton(LoadUtils_1.loadId('buttontop5'));
            // Bottom button init
            for (let index = 0; index < MainView.BOTTOM_BUTTON_COUNT; index++) {
                this.bottomButtons.push(new CoCButton_1.CoCButton(LoadUtils_1.loadId('button' + index)));
            }
        }
        ;
        //////// Internal(?) view update methods ////////
        showBottomButton(index, label, callback, toolTipViewText = '') {
            // var buttonTF :TextField = this.bottomButtonTexts[ index ] as TextField,
            // 	buttonBG :MovieClip = this.bottomButtonBGs[ index ] as MovieClip;
            const button = this.bottomButtons[index];
            // Should error.
            if (!button)
                return;
            button.labelText = label;
            button.callback = callback;
            button.toolTipText = toolTipViewText;
            button.visible = true;
        }
        ;
        hideBottomButton(index) {
            const button = this.bottomButtons[index];
            // Should error.
            if (!button)
                return;
            button.visible = false;
        }
        ;
        //////// Bottom Button Methods ////////
        // TODO: Refactor button set-up code to use callback and toolTipViewText here.
        setButton(index, label = '', callback, toolTipViewText = '') {
            if (index < 0 || index >= MainView.BOTTOM_BUTTON_COUNT) {
                console_1.trace("MainView.setButton called with out of range index:", index);
                // throw new RangeError();
                return;
            }
            if (label) {
                this.showBottomButton(index, label, callback, toolTipViewText);
            }
            else {
                this.hideBottomButton(index);
            }
        }
        ;
        clearBottomButtons() {
            var i;
            for (i = 0; i < MainView.BOTTOM_BUTTON_COUNT; ++i) {
                this.setButton(i);
            }
        }
        ;
        //////// Menu Button Methods ////////
        getMenuButtonByName(name) {
            switch (name) {
                case 'newGame': return this.newGameButton;
                case 'data': return this.dataButton;
                case 'stats': return this.statsButton;
                case 'level': return this.levelButton;
                case 'perks': return this.perksButton;
                case 'appearance': return this.appearanceButton;
            }
            throw new Error("MainView.getMenuButtonByName: Invalid menu button name: " + name);
        }
        ;
        ////////
        setMenuButton(name, label = '', callback) {
            const button = this.getMenuButtonByName(name);
            if (label) {
                button.labelText = label;
            }
            if (callback) {
                button.callback = callback;
            }
        }
        ;
        set onNewGameClick(callback) {
            this.newGameButton.callback = callback;
        }
        ;
        set onDataClick(callback) {
            this.dataButton.callback = callback;
        }
        ;
        set onStatsClick(callback) {
            this.statsButton.callback = callback;
        }
        ;
        set onLevelClick(callback) {
            this.levelButton.callback = callback;
        }
        ;
        set onPerksClick(callback) {
            this.perksButton.callback = callback;
        }
        ;
        set onAppearanceClick(callback) {
            this.appearanceButton.callback = callback;
        }
        ;
        showMenuButton(name) {
            var button = this.getMenuButtonByName(name);
            button.visible = true;
        }
        ;
        hideMenuButton(name) {
            var button = this.getMenuButtonByName(name);
            button.visible = false;
        }
        ;
        showAllMenuButtons() {
            this.showMenuButton(MainView.MENU_NEW_MAIN);
            this.showMenuButton(MainView.MENU_DATA);
            this.showMenuButton(MainView.MENU_STATS);
            this.showMenuButton(MainView.MENU_LEVEL);
            this.showMenuButton(MainView.MENU_PERKS);
            this.showMenuButton(MainView.MENU_APPEARANCE);
        }
        ;
        hideAllMenuButtons() {
            this.hideMenuButton(MainView.MENU_NEW_MAIN);
            this.hideMenuButton(MainView.MENU_DATA);
            this.hideMenuButton(MainView.MENU_STATS);
            this.hideMenuButton(MainView.MENU_LEVEL);
            this.hideMenuButton(MainView.MENU_PERKS);
            this.hideMenuButton(MainView.MENU_APPEARANCE);
        }
        ;
        hideCurrentBottomButtons() {
            for (const button of this.bottomButtons)
                button.visible = false;
        }
        showCurrentBottomButtons() {
            for (const button of this.bottomButtons)
                button.visible = true;
        }
        //////// misc... ////////
        clearOutputText() {
            this.mainText.innerHTML = '';
        }
        ;
        appendOutputText(text) {
            this.mainText.innerHTML += text;
        }
        ;
        setOutputText(text) {
            this.mainText.innerHTML = text;
        }
        ;
        selectSprite(index = 0) {
            // TODO: When flags goes away, if it goes away, replace this with the appropriate settings thing.
            if (index < 0 || this.model.flags[kFLAGS_1.kFLAGS.SHOW_SPRITES_FLAG]) // = SHOW_SPRITES_FLAG from flagDefs...
                this.sprite.classList.add('hidden');
            else {
                this.sprite.src = './res/sprites/' + Sprites_1.Sprites[index] + '.png';
                this.sprite.classList.remove('hidden');
            }
        }
        ;
        hideSprite() {
            this.selectSprite(-1);
        }
        ;
    }
    // Menu button names.
    MainView.MENU_NEW_MAIN = 'newGame';
    MainView.MENU_DATA = 'data';
    MainView.MENU_STATS = 'stats';
    MainView.MENU_LEVEL = 'level';
    MainView.MENU_PERKS = 'perks';
    MainView.MENU_APPEARANCE = 'appearance';
    MainView.BOTTOM_BUTTON_COUNT = 10;
    MainView.TOP_BUTTON_COUNT = 6;
    exports.MainView = MainView;
});
//# sourceMappingURL=MainView.js.map