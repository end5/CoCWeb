define(["require", "exports", "./internals/Utils", "./Appearance", "./GlobalFlags/kGAMECLASS"], function (require, exports, Utils_1, Appearance_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Quick hacky method to wrap new content in a class-based structure
     * BaseContent acts as an access wrapper around CoC, enabling children of BaseContent to interact with
     * function instances/properties of CoC in the same manner older content does with the minimal amount
     * of modification.
     * Also this means we might start being able to get IDE autocomplete shit working again! Huzzah!
     * @author Gedan
     */
    class BaseContent extends Utils_1.Utils {
        // TODO remove when we have proper enums for this
        // include "../../includes/appearanceDefs.as";
        getGame() {
            return kGAMECLASS_1.kGAMECLASS;
        }
        cheatTime(time) {
            kGAMECLASS_1.kGAMECLASS.cheatTime(time);
        }
        get timeQ() {
            return kGAMECLASS_1.kGAMECLASS.timeQ;
        }
        get camp() {
            return kGAMECLASS_1.kGAMECLASS.camp;
        }
        get d3() {
            return kGAMECLASS_1.kGAMECLASS.d3;
        }
        goNext(time, defNext) {
            return kGAMECLASS_1.kGAMECLASS.goNext(time, defNext);
        }
        isHalloween() {
            return kGAMECLASS_1.kGAMECLASS.isHalloween();
        }
        isValentine() {
            return kGAMECLASS_1.kGAMECLASS.isValentine();
        }
        isHolidays() {
            return kGAMECLASS_1.kGAMECLASS.isHolidays();
        }
        isEaster() {
            return kGAMECLASS_1.kGAMECLASS.isEaster();
        }
        isThanksgiving() {
            return kGAMECLASS_1.kGAMECLASS.isThanksgiving();
        }
        get date() {
            return kGAMECLASS_1.kGAMECLASS.date;
        }
        /*
                protected  inCombat(): boolean
                {
                    return kGAMECLASS.inCombat();
                }
        */
        get inDungeon() {
            return kGAMECLASS_1.kGAMECLASS.inDungeon;
        }
        /* inDungeon is now read only
                protected  set inDungeon(v: boolean): void
                {
                    kGAMECLASS.inDungeon = v;
                }
        */
        get inRoomedDungeon() {
            return kGAMECLASS_1.kGAMECLASS.inRoomedDungeon;
        }
        set inRoomedDungeon(v) {
            kGAMECLASS_1.kGAMECLASS.inRoomedDungeon = v;
        }
        get inRoomedDungeonResume() {
            return kGAMECLASS_1.kGAMECLASS.inRoomedDungeonResume;
        }
        set inRoomedDungeonResume(v) {
            kGAMECLASS_1.kGAMECLASS.inRoomedDungeonResume = v;
        }
        /*
                protected  get itemSubMenu(): boolean
                {
                    return kGAMECLASS.itemSubMenu;
                }
                protected  set itemSubMenu(value: boolean): void
                {
                    kGAMECLASS.itemSubMenu = value;
                }
        */
        showStats() {
            kGAMECLASS_1.kGAMECLASS.showStats();
        }
        statScreenRefresh() {
            kGAMECLASS_1.kGAMECLASS.statScreenRefresh();
        }
        cleanupAfterCombat(nextFunc) {
            kGAMECLASS_1.kGAMECLASS.cleanupAfterCombat(nextFunc);
        }
        combatRoundOver() {
            return kGAMECLASS_1.kGAMECLASS.combatRoundOver();
        }
        enemyAI() {
            kGAMECLASS_1.kGAMECLASS.enemyAI();
        }
        spriteSelect(choice = 0) {
            kGAMECLASS_1.kGAMECLASS.spriteSelect(choice);
        }
        hideStats() {
            kGAMECLASS_1.kGAMECLASS.hideStats();
        }
        hideUpDown() {
            kGAMECLASS_1.kGAMECLASS.hideUpDown();
        }
        /* This class extends Utils, no need for a non-static version of this function
        protected  curry(func,...args)
        {
            return Utils.curry.apply(undefined,[func].concat(args));
        }
        */
        /* None of these functions are called anymore
        protected  lazyIndex(obj: any,...args)
        {
            return Utils.lazyIndex.apply(undefined,[obj].concat(args));
        }
        protected  lazyCallIndex(func,...args)
        {
            return Utils.lazyCallIndex.apply(undefined,[func].concat(args));
        }
        protected  lazyCallIndexCall(func,...args)
        {
            return Utils.lazyCallIndexCall.apply(undefined,[func].concat(args));
        }
        */
        createCallBackFunction(func, arg) {
            return kGAMECLASS_1.kGAMECLASS.createCallBackFunction(func, arg);
        }
        createCallBackFunction2(func, ...args) {
            return kGAMECLASS_1.kGAMECLASS.createCallBackFunction2.apply(undefined, [func].concat(args));
        }
        startCombat(monster_, plotFight_ = false) {
            kGAMECLASS_1.kGAMECLASS.startCombat(monster_, plotFight_);
        }
        startCombatImmediate(monster, _plotFight = false) {
            kGAMECLASS_1.kGAMECLASS.startCombatImmediate(monster, _plotFight);
        }
        // Needed in a few rare cases for dumping text coming from a source that can't properly escape it's brackets
        // (Mostly traceback printing, etc...)
        rawOutputText(output, purgeText = false) {
            kGAMECLASS_1.kGAMECLASS.rawOutputText(output, purgeText);
        }
        outputText(output, purgeText = false, parseAsMarkdown = false) {
            kGAMECLASS_1.kGAMECLASS.outputText(output, purgeText, parseAsMarkdown);
        }
        clearOutput() {
            kGAMECLASS_1.kGAMECLASS.currentText = "";
            kGAMECLASS_1.kGAMECLASS.mainView.clearOutputText();
        }
        doNext(eventNo) {
            kGAMECLASS_1.kGAMECLASS.doNext(eventNo);
        }
        menu() {
            kGAMECLASS_1.kGAMECLASS.menu();
        }
        hideMenus() {
            kGAMECLASS_1.kGAMECLASS.hideMenus();
        }
        choices(text1, butt1, text2, butt2, text3, butt3, text4, butt4, text5, butt5, text6, butt6, text7, butt7, text8, butt8, text9, butt9, text0, butt0) {
            kGAMECLASS_1.kGAMECLASS.choices(text1, butt1, text2, butt2, text3, butt3, text4, butt4, text5, butt5, text6, butt6, text7, butt7, text8, butt8, text9, butt9, text0, butt0);
        }
        simpleChoices(text1, butt1, text2, butt2, text3, butt3, text4, butt4, text5, butt5) {
            kGAMECLASS_1.kGAMECLASS.simpleChoices(text1, butt1, text2, butt2, text3, butt3, text4, butt4, text5, butt5);
        }
        doYesNo(eventYes, eventNo) {
            kGAMECLASS_1.kGAMECLASS.doYesNo(eventYes, eventNo);
        }
        addButton(pos, text = "", func1, arg1 = -9000) {
            kGAMECLASS_1.kGAMECLASS.addButton(pos, text, func1, arg1);
        }
        // protected hasButton(arg: any): boolean {
        //     return kGAMECLASS.hasButton(arg);
        // }
        /* Replaced by Utils.formatStringArray, which does almost the same thing in one function
                protected  clearList(): void{
                    kGAMECLASS.clearList();
                }
        
                protected  addToList(arg: any): void{
                    kGAMECLASS.addToList(arg);
                }
        
                protected  outputList(): string{
                    return kGAMECLASS.outputList();
                }
        */
        sackDescript() {
            return Appearance_1.Appearance.sackDescript(this.player);
        }
        cockClit(value = 0) {
            return kGAMECLASS_1.kGAMECLASS.cockClit(value);
        }
        /* Was only used in Scylla's code. Replaced with conditionals
                protected  balls(balls: any, noBalls: any): string
                {
                    return kGAMECLASS.balls(balls, noBalls);
                }
        */
        sheathDesc() {
            return kGAMECLASS_1.kGAMECLASS.player.sheathDescription();
        }
        chestDesc() {
            return this.player.chestDesc();
            //return Appearance.chestDesc(player);
        }
        allChestDesc() {
            return this.player.allChestDesc();
        }
        allBreastsDescript() {
            return kGAMECLASS_1.kGAMECLASS.allBreastsDescript();
        }
        sMultiCockDesc() {
            return kGAMECLASS_1.kGAMECLASS.player.sMultiCockDesc();
        }
        SMultiCockDesc() {
            return kGAMECLASS_1.kGAMECLASS.player.SMultiCockDesc();
        }
        oMultiCockDesc() {
            return kGAMECLASS_1.kGAMECLASS.player.oMultiCockDesc();
        }
        OMultiCockDesc() {
            return kGAMECLASS_1.kGAMECLASS.player.OMultiCockDesc();
        }
        tongueDescript() {
            return kGAMECLASS_1.kGAMECLASS.tongueDescript();
        }
        ballsDescriptLight(forcedSize = true) {
            return kGAMECLASS_1.kGAMECLASS.ballsDescriptLight(forcedSize);
        }
        ballDescript() {
            return kGAMECLASS_1.kGAMECLASS.ballDescript();
        }
        /* All calls changed to monster.ballsDescriptLight
        protected  eBallsDescriptLight(): string {
            return kGAMECLASS.eBallsDescriptLight();
        }
        */
        /* Was never called
        protected  eBallsDescript(): string {
            return kGAMECLASS.eBallsDescript();
        }
        */
        ballsDescript() {
            return kGAMECLASS_1.kGAMECLASS.ballsDescript();
        }
        simpleBallsDescript() {
            return kGAMECLASS_1.kGAMECLASS.simpleBallsDescript();
        }
        assholeDescript() {
            return kGAMECLASS_1.kGAMECLASS.assholeDescript();
        }
        eAssholeDescript() {
            return Appearance_1.Appearance.assholeDescript(this.monster);
        }
        hipDescript() {
            return kGAMECLASS_1.kGAMECLASS.hipDescript();
        }
        assDescript() {
            return kGAMECLASS_1.kGAMECLASS.assDescript();
        }
        buttDescript() {
            return kGAMECLASS_1.kGAMECLASS.buttDescript();
        }
        assholeOrPussy() {
            return Appearance_1.Appearance.assholeOrPussy(this.player);
        }
        /* Replaced by calls to Appearance.breastDescript
                protected  npcBreastDescript(size: number): string {
                    return kGAMECLASS.npcBreastDescript(size);
                }
        */
        /* Was never used
                protected  eButtDescript(): string {
                    return Appearance.buttDescriptionShort(monster);
                }
        */
        /* Now in Utils.as
                protected  num2TextBest(number: number, capitalised: boolean = false, positional: boolean = false): string
                {
                    return kGAMECLASS.num2TextBest(number, capitalised, positional);
                }
                
                protected  num2Text(number: number): string
                {
                    return kGAMECLASS.num2Text(number);
                }
                protected  Num2Text(number: number): string
                {
                    return kGAMECLASS.Num2Text(number);
                }
                protected  num2Text2(number: number): string
                {
                    return kGAMECLASS.num2Text2(number);
                }
        */
        nippleDescript(rowNum) {
            return kGAMECLASS_1.kGAMECLASS.nippleDescript(rowNum);
        }
        cockDescript(cockNum = 0) {
            return kGAMECLASS_1.kGAMECLASS.player.cockDescript(cockNum);
        }
        /*
                protected  cockAdjective(cockNum: number = -1): string
                {
                    return kGAMECLASS.cockAdjective(cockNum);
                }
        */
        multiCockDescript() {
            return kGAMECLASS_1.kGAMECLASS.player.multiCockDescript();
        }
        multiCockDescriptLight() {
            return kGAMECLASS_1.kGAMECLASS.player.multiCockDescriptLight();
        }
        /*
                protected  eMultiCockDescriptLight(): string
                {
                    return kGAMECLASS.eMultiCockDescriptLight();
                }
                
                protected  eCockHead(cockNum: number = 0): string
                {
                    return kGAMECLASS.eCockHead(cockNum);
                }
                
                protected  eCockDescript(cockIndex: number = 0): string
                {
                    return kGAMECLASS.eCockDescript(cockIndex);
                }
        */
        breastDescript(rowNum) {
            return this.player.breastDescript(rowNum);
        }
        /*
                protected  cockHead(cockNum: number = 0): string
                {
                    return kGAMECLASS.cockHead(cockNum);
                }
        */
        breastSize(val) {
            return Appearance_1.Appearance.breastSize(val);
        }
        biggestBreastSizeDescript() {
            return Appearance_1.Appearance.biggestBreastSizeDescript(this.player);
        }
        hairDescript() {
            return kGAMECLASS_1.kGAMECLASS.hairDescript();
        }
        hairOrFur() {
            return kGAMECLASS_1.kGAMECLASS.hairOrFur();
        }
        clitDescript() {
            return kGAMECLASS_1.kGAMECLASS.clitDescript();
        }
        vaginaDescript(vaginaNum = 0) {
            return kGAMECLASS_1.kGAMECLASS.vaginaDescript(vaginaNum);
        }
        allVaginaDescript() {
            return kGAMECLASS_1.kGAMECLASS.allVaginaDescript();
        }
        /* Now called directly
                protected  breastCup(val: number): string
                {
                    return Appearance.breastCup(val);
                }
        */
        /* Replaced with calls to Appearance.cockDescription
                protected  NPCCockDescript(cockType: any,cockLength: number=0,lust: number=50): string
                {
                    return kGAMECLASS.NPCCockDescript(cockType,cockLength,lust);
                }
        */
        /**
         * Apply statmods to the player. dynStats wraps the regular stats call, but supports "named" arguments of the form: any 		"statname", value.
         * Exclusively supports either long or short stat names with a single call.
         * "str", "lib" "lus", "cor" etc
         * "strength, "libido", lust", "corruption"
         * Specify the stat you wish to modify and follow it with the value.
         * Separate each stat and value with a comma, and each stat/value pair, again, with a comma.
         * eg: dynStats("str", 10, "lust" -100); will add 10 to str and subtract 100 from lust
         * Also support operators could be appended with + - * /=
         * eg: dynStats("str+", 1, "tou-", 2, "spe*", 1.1, "int/", 2, "cor=", 0)
         *     will add 1 to str, subtract 2 from tou, increase spe by 10%, decrease int by 50%, and set cor to 0
         *
         * @param	... args
         */
        dynStats(...args) {
            // Bullshit to unroll the incoming array
            kGAMECLASS_1.kGAMECLASS.dynStats.apply(undefined, args);
        }
        silly() {
            return kGAMECLASS_1.kGAMECLASS.silly();
        }
        HPChange(changeNum, display) {
            kGAMECLASS_1.kGAMECLASS.HPChange(changeNum, display);
        }
        fatigue(mod, type = 0) {
            kGAMECLASS_1.kGAMECLASS.fatigue(mod, type);
        }
        /*
                protected  get eventParser()
                {
                    return kGAMECLASS.eventParser;
                }
        */
        playerMenu() { kGAMECLASS_1.kGAMECLASS.playerMenu(); }
        get player() {
            return kGAMECLASS_1.kGAMECLASS.player;
        }
        set player(val) {
            kGAMECLASS_1.kGAMECLASS.player = val;
        }
        get player2() {
            return kGAMECLASS_1.kGAMECLASS.player2;
        }
        set player2(val) {
            kGAMECLASS_1.kGAMECLASS.player2 = val;
        }
        get debug() {
            return kGAMECLASS_1.kGAMECLASS.debug;
        }
        set debug(val) {
            kGAMECLASS_1.kGAMECLASS.debug = val;
        }
        get ver() {
            return kGAMECLASS_1.kGAMECLASS.ver;
        }
        set ver(val) {
            kGAMECLASS_1.kGAMECLASS.ver = val;
        }
        get images() {
            return kGAMECLASS_1.kGAMECLASS.images;
        }
        set images(val) {
            kGAMECLASS_1.kGAMECLASS.images = val;
        }
        get monster() {
            return kGAMECLASS_1.kGAMECLASS.monster;
        }
        set monster(val) {
            kGAMECLASS_1.kGAMECLASS.monster = val;
        }
        get consumables() {
            return kGAMECLASS_1.kGAMECLASS.consumables;
        }
        get useables() {
            return kGAMECLASS_1.kGAMECLASS.useables;
        }
        get weapons() {
            return kGAMECLASS_1.kGAMECLASS.weapons;
        }
        get armors() {
            return kGAMECLASS_1.kGAMECLASS.armors;
        }
        get inventory() {
            return kGAMECLASS_1.kGAMECLASS.inventory;
        }
        /* No longer used
                protected  get itemSwapping(): boolean
                {
                    return kGAMECLASS.itemSwapping;
                }
                
                protected  set itemSwapping(val: boolean): void
                {
                    kGAMECLASS.itemSwapping = val;
                }
        */
        get time() {
            return kGAMECLASS_1.kGAMECLASS.time;
        }
        set time(val) {
            kGAMECLASS_1.kGAMECLASS.time = val;
        }
        /* Finally got rid of this var
                protected  get menuLoc(): number
                {
                    return kGAMECLASS.menuLoc;
                }
                
                protected  set menuLoc(val: number): void
                {
                    kGAMECLASS.menuLoc = val;
                }
        */
        /* Classes should now use inCombat instead of setting gameState directly
                protected  get gameState(): number
                {
                    return kGAMECLASS.gameState;
                }
                
                protected  set gameState(val: number): void
                {
                    kGAMECLASS.gameState = val;
                }
        */
        /*
                protected  get itemSlots(): any[]
                {
                    return kGAMECLASS.player.itemSlots;
                }
        */
        /*
                protected  get itemStorage(): any[]
                {
                    return kGAMECLASS.itemStorage;
                }
        
                protected  set itemStorage(val: any[]): void
                {
                    kGAMECLASS.itemStorage = val;
                }
                
                protected  get gearStorage(): any[]
                {
                    return kGAMECLASS.gearStorage;
                }
                
                protected  set gearStorage(val: any[]): void
                {
                    kGAMECLASS.gearStorage = val;
                }
        */
        get temp() {
            return kGAMECLASS_1.kGAMECLASS.temp;
        }
        set temp(val) {
            kGAMECLASS_1.kGAMECLASS.temp = val;
        }
        get args() {
            return kGAMECLASS_1.kGAMECLASS.args;
        }
        set args(val) {
            kGAMECLASS_1.kGAMECLASS.args = val;
        }
        get funcs() {
            return kGAMECLASS_1.kGAMECLASS.funcs;
        }
        set funcs(val) {
            kGAMECLASS_1.kGAMECLASS.funcs = val;
        }
        get mainView() {
            return kGAMECLASS_1.kGAMECLASS.mainView;
        }
        set mainView(val) {
            kGAMECLASS_1.kGAMECLASS.mainView = val;
        }
        get model() {
            return kGAMECLASS_1.kGAMECLASS.model;
        }
        set model(val) {
            kGAMECLASS_1.kGAMECLASS.model = val;
        }
        get flags() {
            return kGAMECLASS_1.kGAMECLASS.flags;
        }
        set flags(val) {
            kGAMECLASS_1.kGAMECLASS.flags = val;
        }
        showStatDown(arg) {
            kGAMECLASS_1.kGAMECLASS.mainView.statsView.showStatDown(arg);
        }
        showStatUp(arg) {
            kGAMECLASS_1.kGAMECLASS.mainView.statsView.showStatUp(arg);
        }
    }
    exports.BaseContent = BaseContent;
});
//# sourceMappingURL=BaseContent.js.map