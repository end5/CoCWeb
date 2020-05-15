import { GameModel } from "../model/GameModel";
import { TimeModel } from "../model/TimeModel";
import { MainView } from "../view/MainView";
import { OtherKeys, StatKeys } from "../view/StatsView";
import { Appearance } from "./Appearance";
import { ASDate } from "./ASDate";
import { CoC } from "./CoC";
import { kGAMECLASS } from "./GlobalFlags/kGAMECLASS";
import { ImageManager } from "./ImageManager";
import { Utils } from "./internals/Utils";
import { ArmorLib } from "./Items/ArmorLib";
import { ConsumableLib } from "./Items/ConsumableLib";
import { UseableLib } from "./Items/UseableLib";
import { WeaponLib } from "./Items/WeaponLib";
import { Monster } from "./Monster";
import { Player } from "./Player";
import { Camp } from "./Scenes/Camp";
import { D3 } from "./Scenes/Dungeons/D3/D3";
import { Inventory } from "./Scenes/Inventory";

/**
 * Quick hacky method to wrap new content in a class-based structure
 * BaseContent acts as an access wrapper around CoC, enabling children of BaseContent to interact with
 * function instances/properties of CoC in the same manner older content does with the minimal amount
 * of modification.
 * Also this means we might start being able to get IDE autocomplete shit working again! Huzzah!
 *
 * @author Gedan
 */
export class BaseContent extends Utils {
    // TODO remove when we have proper enums for this
    // include "../../includes/appearanceDefs.as";

    protected getGame(): CoC {
        return kGAMECLASS;
    }

    protected cheatTime(time: number): void {
        kGAMECLASS.cheatTime(time);
    }
    protected get timeQ(): number {
        return kGAMECLASS.timeQ;
    }

    protected get camp(): Camp {
        return kGAMECLASS.camp;
    }

    protected get d3(): D3 {
        return kGAMECLASS.d3;
    }

    public goNext(time: number, defNext: boolean): boolean {
        return kGAMECLASS.goNext(time, defNext);
    }

    protected isHalloween(): boolean {
        return kGAMECLASS.isHalloween();
    }

    protected isValentine(): boolean {
        return kGAMECLASS.isValentine();
    }

    protected isHolidays(): boolean {
        return kGAMECLASS.isHolidays();
    }

    public isEaster(): boolean {
        return kGAMECLASS.isEaster();
    }

    protected isThanksgiving(): boolean {
        return kGAMECLASS.isThanksgiving();
    }

    protected get date(): ASDate {
        return kGAMECLASS.date;
    }

    /*
            protected  inCombat(): boolean
            {
                return kGAMECLASS.inCombat();
            }
    */

    protected get inDungeon(): boolean {
        return kGAMECLASS.inDungeon;
    }
    /* inDungeon is now read only
            protected  set inDungeon(v: boolean): void
            {
                kGAMECLASS.inDungeon = v;
            }
    */

    protected get inRoomedDungeon(): boolean {
        return kGAMECLASS.inRoomedDungeon;
    }
    protected set inRoomedDungeon(v: boolean) {
        kGAMECLASS.inRoomedDungeon = v;
    }

    protected get inRoomedDungeonResume(): any {
        return kGAMECLASS.inRoomedDungeonResume;
    }
    protected set inRoomedDungeonResume(v: any) {
        kGAMECLASS.inRoomedDungeonResume = v;
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

    protected showStats(): void {
        kGAMECLASS.showStats();
    }

    protected statScreenRefresh(): void {
        kGAMECLASS.statScreenRefresh();
    }

    protected cleanupAfterCombat(nextFunc?: any): void {
        kGAMECLASS.cleanupAfterCombat(nextFunc);
    }

    protected combatRoundOver() {
        return kGAMECLASS.combatRoundOver();
    }

    protected enemyAI(): void {
        kGAMECLASS.enemyAI();
    }

    protected spriteSelect(choice = 0): void {
        kGAMECLASS.spriteSelect(choice);
    }

    protected hideStats(): void {
        kGAMECLASS.hideStats();
    }
    protected hideUpDown(): void {
        kGAMECLASS.hideUpDown();
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

    protected createCallBackFunction(func: any, arg: any) {
        return kGAMECLASS.createCallBackFunction(func, arg);
    }

    protected createCallBackFunction2(func: any, ...args: any[]) {
        return kGAMECLASS.createCallBackFunction2.apply(
            undefined,
            [func].concat(args) as [any, ...any[]]
        );
    }

    protected startCombat(monster_: Monster, plotFight_ = false): void {
        kGAMECLASS.startCombat(monster_, plotFight_);
    }
    protected startCombatImmediate(monster: Monster, _plotFight = false): void {
        kGAMECLASS.startCombatImmediate(monster, _plotFight);
    }

    // Needed in a few rare cases for dumping text coming from a source that can't properly escape it's brackets
    // (Mostly traceback printing, etc...)
    protected rawOutputText(output: string, purgeText = false): void {
        kGAMECLASS.rawOutputText(output, purgeText);
    }

    protected outx(output: string, purgeText = false, parseAsMarkdown = false): void {
        kGAMECLASS.outx(output, purgeText, parseAsMarkdown);
    }

    protected clearOutput(): void {
        kGAMECLASS.currentText = "";
        kGAMECLASS.mainView.clearOutputText();
    }

    protected doNext(eventNo: any): void {
        // Now typesafe
        kGAMECLASS.doNext(eventNo);
    }

    protected menu(): void {
        kGAMECLASS.menu();
    }

    protected hideMenus(): void {
        kGAMECLASS.hideMenus();
    }
    protected choices(
        text1: string,
        butt1: any,
        text2: string,
        butt2: any,
        text3: string,
        butt3: any,
        text4: string,
        butt4: any,
        text5: string,
        butt5: any,
        text6: string,
        butt6: any,
        text7: string,
        butt7: any,
        text8: string,
        butt8: any,
        text9: string,
        butt9: any,
        text0: string,
        butt0: any
    ): void {
        // Now typesafe
        kGAMECLASS.choices(
            text1,
            butt1,
            text2,
            butt2,
            text3,
            butt3,
            text4,
            butt4,
            text5,
            butt5,
            text6,
            butt6,
            text7,
            butt7,
            text8,
            butt8,
            text9,
            butt9,
            text0,
            butt0
        );
    }

    protected simpleChoices(
        text1: string,
        butt1: any,
        text2: string,
        butt2: any,
        text3: string,
        butt3: any,
        text4: string,
        butt4: any,
        text5: string,
        butt5: any
    ): void {
        // Now typesafe
        kGAMECLASS.simpleChoices(
            text1,
            butt1,
            text2,
            butt2,
            text3,
            butt3,
            text4,
            butt4,
            text5,
            butt5
        );
    }

    protected doYesNo(eventYes: any, eventNo: any): void {
        // Now typesafe
        kGAMECLASS.doYesNo(eventYes, eventNo);
    }

    protected addButton(pos: number, text = "", func1?: any, arg1: any = -9000): void {
        kGAMECLASS.addButton(pos, text, func1, arg1);
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

    protected sackDescript(): string {
        return Appearance.sackDescript(this.player);
    }

    protected cockClit(value = 0): string {
        return kGAMECLASS.cockClit(value);
    }

    /* Was only used in Scylla's code. Replaced with conditionals
            protected  balls(balls: any, noBalls: any): string
            {
                return kGAMECLASS.balls(balls, noBalls);
            }
    */

    protected sheathDesc(): string {
        return kGAMECLASS.player.sheathDescription();
    }

    protected chestDesc(): string {
        return this.player.chestDesc();
        // return Appearance.chestDesc(player);
    }

    protected allChestDesc(): string {
        return this.player.allChestDesc();
    }

    protected allBreastsDescript(): string {
        return kGAMECLASS.allBreastsDescript();
    }

    protected sMultiCockDesc(): string {
        return kGAMECLASS.player.sMultiCockDesc();
    }

    protected SMultiCockDesc(): string {
        return kGAMECLASS.player.SMultiCockDesc();
    }

    protected oMultiCockDesc(): string {
        return kGAMECLASS.player.oMultiCockDesc();
    }

    protected OMultiCockDesc(): string {
        return kGAMECLASS.player.OMultiCockDesc();
    }

    protected tongueDescript(): string {
        return kGAMECLASS.tongueDescript();
    }

    protected ballsDescriptLight(forcedSize = true): string {
        return kGAMECLASS.ballsDescriptLight(forcedSize);
    }

    protected ballDescript(): string {
        return kGAMECLASS.ballDescript();
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

    protected ballsDescript(): string {
        return kGAMECLASS.ballsDescript();
    }

    protected simpleBallsDescript(): string {
        return kGAMECLASS.simpleBallsDescript();
    }

    protected assholeDescript(): string {
        return kGAMECLASS.assholeDescript();
    }

    protected eAssholeDescript(): string {
        return Appearance.assholeDescript(this.monster);
    }

    protected hipDescript(): string {
        return kGAMECLASS.hipDescript();
    }

    protected assDescript(): string {
        return kGAMECLASS.assDescript();
    }

    protected buttDescript(): string {
        return kGAMECLASS.buttDescript();
    }

    protected assholeOrPussy(): string {
        return Appearance.assholeOrPussy(this.player);
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

    protected nippleDescript(rowNum: number): string {
        return kGAMECLASS.nippleDescript(rowNum);
    }

    protected cockDescript(cockNum = 0): string {
        return kGAMECLASS.player.cockDescript(cockNum);
    }

    /*
            protected  cockAdjective(cockNum: number = -1): string
            {
                return kGAMECLASS.cockAdjective(cockNum);
            }
    */

    protected multiCockDescript(): string {
        return kGAMECLASS.player.multiCockDescript();
    }

    protected multiCockDescriptLight(): string {
        return kGAMECLASS.player.multiCockDescriptLight();
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

    protected breastDescript(rowNum: number): string {
        return this.player.breastDescript(rowNum);
    }

    /*
            protected  cockHead(cockNum: number = 0): string
            {
                return kGAMECLASS.cockHead(cockNum);
            }
    */

    protected breastSize(val: number): string {
        return Appearance.breastSize(val);
    }

    protected biggestBreastSizeDescript(): string {
        return Appearance.biggestBreastSizeDescript(this.player);
    }

    protected hairDescript(): string {
        return kGAMECLASS.hairDescript();
    }

    protected hairOrFur(): string {
        return kGAMECLASS.hairOrFur();
    }

    protected clitDescript(): string {
        return kGAMECLASS.clitDescript();
    }

    protected vaginaDescript(vaginaNum = 0): string {
        return kGAMECLASS.vaginaDescript(vaginaNum);
    }

    protected allVaginaDescript(): string {
        return kGAMECLASS.allVaginaDescript();
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
     * Apply statmods to the player. dynStats wraps the regular stats call, but supports "named" arguments of the form: any
// "statname", value.
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
     * @param ... args
     */
    protected dynStats(...args: any[]): void {
        // Bullshit to unroll the incoming array
        kGAMECLASS.dynStats.apply(undefined, args);
    }

    protected silly(): boolean {
        return kGAMECLASS.silly();
    }

    protected HPChange(changeNum: number, display: boolean): void {
        kGAMECLASS.HPChange(changeNum, display);
    }

    protected fatigue(mod: number, type = 0): void {
        kGAMECLASS.fatigue(mod, type);
    }

    /*
            protected  get eventParser()
            {
                return kGAMECLASS.eventParser;
            }
    */

    protected playerMenu(): void {
        kGAMECLASS.playerMenu();
    }

    protected get player(): Player {
        return kGAMECLASS.player;
    }

    protected set player(val: Player) {
        kGAMECLASS.player = val;
    }

    protected get player2(): Player {
        return kGAMECLASS.player2;
    }

    protected set player2(val: Player) {
        kGAMECLASS.player2 = val;
    }

    protected get debug(): boolean {
        return kGAMECLASS.debug;
    }

    protected set debug(val: boolean) {
        kGAMECLASS.debug = val;
    }

    protected get ver(): string {
        return kGAMECLASS.ver;
    }

    protected set ver(val: string) {
        kGAMECLASS.ver = val;
    }

    protected get images(): ImageManager {
        return kGAMECLASS.images;
    }

    protected set images(val: ImageManager) {
        kGAMECLASS.images = val;
    }

    protected get monster(): Monster {
        return kGAMECLASS.monster;
    }

    protected set monster(val: Monster) {
        kGAMECLASS.monster = val;
    }

    protected get consumables(): ConsumableLib {
        return kGAMECLASS.consumables;
    }
    protected get useables(): UseableLib {
        return kGAMECLASS.useables;
    }
    protected get weapons(): WeaponLib {
        return kGAMECLASS.weapons;
    }
    protected get armors(): ArmorLib {
        return kGAMECLASS.armors;
    }
    protected get inventory(): Inventory {
        return kGAMECLASS.inventory;
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

    protected get time(): TimeModel {
        return kGAMECLASS.time;
    }

    protected set time(val: TimeModel) {
        kGAMECLASS.time = val;
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

    protected get temp(): number {
        return kGAMECLASS.temp;
    }

    protected set temp(val: number) {
        kGAMECLASS.temp = val;
    }

    protected get args(): any[] {
        return kGAMECLASS.args;
    }

    protected set args(val: any[]) {
        kGAMECLASS.args = val;
    }

    protected get funcs(): any[] {
        return kGAMECLASS.funcs;
    }

    protected set funcs(val: any[]) {
        kGAMECLASS.funcs = val;
    }

    protected get mainView(): MainView {
        return kGAMECLASS.mainView;
    }

    protected set mainView(val: MainView) {
        kGAMECLASS.mainView = val;
    }

    protected get model(): GameModel {
        return kGAMECLASS.model;
    }

    protected set model(val: GameModel) {
        kGAMECLASS.model = val;
    }

    protected get flags() {
        return kGAMECLASS.flags;
    }

    protected set flags(val) {
        kGAMECLASS.flags = val;
    }

    protected showStatDown(arg: StatKeys | OtherKeys): void {
        kGAMECLASS.mainView.statsView.showStatDown(arg);
    }

    protected showStatUp(arg: StatKeys | OtherKeys): void {
        kGAMECLASS.mainView.statsView.showStatUp(arg);
    }

    /**
     * PRIMO BULLSHIT FUNCTION ACCESS
     */
    // Need to work out a better way of doing this -- I THINK maybe treating external functions as a string and calling
    // addButton like "addButton(0, "thing", "thisFunc");" might be a way to do it -- check if Func var is a Func type in this.addbutton args
    // if it is, pass it into kGAMECLASS, if it isn't, check if string. If it is, use the string to pull the func from kGAMECLASS
    // before passing it into addbutton etc.
    // Going the string route also makes it... not awful to call into other content classes too - split string on . and chain
    // lookups into objects ie "umasShop.firstVisitPart1" -> kGAMECLASS["umasShop"].["firstVisitPart1"]()
    // @aimozg: but kGAMECLASS.umasShop.firstVisistPart1 instead of String is compile-time safe.
    // Clearly this isn't going to fly long term, but it's... functional for now.

    /* @aimozg commented this out because telAdre
    protected  get armorShops()
    {
        return kGAMECLASS.armorShops;
    }

    protected  get telAdreMenu()
    {
        return kGAMECLASS.telAdreMenu;
    }*/
}
