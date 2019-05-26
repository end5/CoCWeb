import { SaveAwareInterface } from "./SaveAwareInterface";
import { PlayerEvents } from "./PlayerEvents";
import { StatusAffects } from "./StatusAffects";
import { CharCreation } from "./CharCreation";
import { Saves } from "./Saves";
import { Mutations } from "./Items/Mutations";
import { ConsumableLib } from "./Items/ConsumableLib";
import { UseableLib } from "./Items/UseableLib";
import { WeaponLib } from "./Items/WeaponLib";
import { ArmorLib } from "./Items/ArmorLib";
import { MiscItemLib } from "./Items/MiscItemLib";
import { Camp } from "./Scenes/Camp";
import { Exploration } from "./Scenes/Exploration";
import { FollowerInteractions } from "./Scenes/FollowerInteractions";
import { Inventory } from "./Scenes/Inventory";
import { Masturbation } from "./Scenes/Masturbation";
import { Bog } from "./Scenes/Areas/Bog";
import { Desert } from "./Scenes/Areas/Desert";
import { Forest } from "./Scenes/Areas/Forest";
import { HighMountains } from "./Scenes/Areas/HighMountains";
import { Lake } from "./Scenes/Areas/Lake";
import { Mountain } from "./Scenes/Areas/Mountain";
import { Plains } from "./Scenes/Areas/Plains";
import { Swamp } from "./Scenes/Areas/Swamp";
import { BrigidScene } from "./Scenes/Dungeons/HelDungeon/BrigidScene";
import { D3 } from "./Scenes/Dungeons/D3/D3";
import { Gargoyle } from "./Scenes/Explore/Gargoyle";
import { Lumi } from "./Scenes/Explore/Lumi";
import { GoblinScene } from "./Scenes/Monsters/GoblinScene";
import { ImpScene } from "./Scenes/Monsters/ImpScene";
import { GoblinAssassinScene } from "./Scenes/Monsters/GoblinAssassinScene";
import { AmilyScene } from "./Scenes/NPCs/AmilyScene";
import { AnemoneScene } from "./Scenes/NPCs/AnemoneScene";
import { ArianScene } from "./Scenes/NPCs/ArianScene";
import { CeraphScene } from "./Scenes/NPCs/CeraphScene";
import { CeraphFollowerScene } from "./Scenes/NPCs/CeraphFollowerScene";
import { EmberScene } from "./Scenes/NPCs/EmberScene";
import { Exgartuan } from "./Scenes/NPCs/Exgartuan";
import { HelFollower } from "./Scenes/NPCs/HelFollower";
import { HelScene } from "./Scenes/NPCs/HelScene";
import { HelSpawnScene } from "./Scenes/NPCs/HelSpawnScene";
import { HolliScene } from "./Scenes/NPCs/HolliScene";
import { IsabellaScene } from "./Scenes/NPCs/IsabellaScene";
import { IsabellaFollowerScene } from "./Scenes/NPCs/IsabellaFollowerScene";
import { IzmaScene } from "./Scenes/NPCs/IzmaScene";
import { JojoScene } from "./Scenes/NPCs/JojoScene";
import { KihaFollower } from "./Scenes/NPCs/KihaFollower";
import { KihaScene } from "./Scenes/NPCs/KihaScene";
import { LatexGirl } from "./Scenes/NPCs/LatexGirl";
import { MarbleScene } from "./Scenes/NPCs/MarbleScene";
import { MarblePurification } from "./Scenes/NPCs/MarblePurification";
import { MilkWaifu } from "./Scenes/NPCs/MilkWaifu";
import { Raphael } from "./Scenes/NPCs/Raphael";
import { Rathazul } from "./Scenes/NPCs/Rathazul";
import { SheilaScene } from "./Scenes/NPCs/SheilaScene";
import { ShouldraFollower } from "./Scenes/NPCs/ShouldraFollower";
import { ShouldraScene } from "./Scenes/NPCs/ShouldraScene";
import { SophieBimbo } from "./Scenes/NPCs/SophieBimbo";
import { SophieFollowerScene } from "./Scenes/NPCs/SophieFollowerScene";
import { SophieScene } from "./Scenes/NPCs/SophieScene";
import { Urta } from "./Scenes/NPCs/Urta";
import { UrtaHeatRut } from "./Scenes/NPCs/UrtaHeatRut";
import { UrtaPregs } from "./Scenes/NPCs/UrtaPregs";
import { Valeria } from "./Scenes/NPCs/Valeria";
import { Vapula } from "./Scenes/NPCs/Vapula";
import { Bazaar } from "./Scenes/Places/Bazaar";
import { Boat } from "./Scenes/Places/Boat";
import { Farm } from "./Scenes/Places/Farm";
import { Owca } from "./Scenes/Places/Owca";
import { UrtaQuest } from "./Scenes/Quests/UrtaQuest";
import { GameModel } from "../coc/model/GameModel";
import { Parser } from "./Parser/Parser";
import { ImageManager } from "./ImageManager";
import { Player } from "./Player";
import { Monster } from "./Monster";
import { TimeModel } from "../coc/model/TimeModel";
import { InputManager } from "./InputManager";
import { ChaosMonkey } from "./ChaosMonkey";
import { Utils } from "./internals/Utils";
import { kFLAGS } from "./GlobalFlags/kFLAGS";
import { CoC_Settings } from "./CoC_Settings";
import { CockTypesEnum } from "./CockTypesEnum";
import { TimeAwareInterface } from "./TimeAwareInterface";
import { PerkLib } from "./PerkLib";
import { TelAdre } from "./Scenes/Places/TelAdre";
import { PerkClass } from "./PerkClass";
import { Appearance } from "./Appearance";
import { PregnancyStore } from "./PregnancyStore";
import { trace } from "console";
import { ItemType } from "./ItemType";
import { Ceraph } from "./Scenes/NPCs/Ceraph";
import { Izumi } from "./Scenes/Areas/HighMountains/Izumi";
import { SuccubusGardener } from "./Scenes/Dungeons/D3/SuccubusGardener";
import { Kitsune } from "./Scenes/Areas/Forest/Kitsune";
import { SandTrap } from "./Scenes/Areas/Desert/SandTrap";
import { Holli } from "./Scenes/NPCs/Holli";
import { Doppleganger } from "./Scenes/Dungeons/D3/Doppleganger";
import { Basilisk } from "./Scenes/Areas/HighMountains/Basilisk";
import { UmasShop } from "./Scenes/Places/TelAdre/UmasShop";
import { Anemone } from "./Scenes/NPCs/Anemone";
import { LivingStatue } from "./Scenes/Dungeons/D3/LivingStatue";
import { JeanClaude } from "./Scenes/Dungeons/D3/JeanClaude";
import { Minotaur } from "./Scenes/Areas/Mountain/Minotaur";
import { BeeGirl } from "./Scenes/Areas/Forest/BeeGirl";
import { Jojo } from "./Scenes/NPCs/Jojo";
import { Harpy } from "./Scenes/Areas/HighMountains/Harpy";
import { Sophie } from "./Scenes/NPCs/Sophie";
import { Ember } from "./Scenes/NPCs/Ember";
import { Kiha } from "./Scenes/NPCs/Kiha";
import { Hel } from "./Scenes/NPCs/Hel";
import { Isabella } from "./Scenes/NPCs/Isabella";
import { Clara } from "./Scenes/NPCs/Clara";

// BREAKING ALL THE RULES.

// This line not necessary, but added because I'm pedantic like that.

// Class based content? In my CoC?! It's more likely than you think!

/****
    classes.CoC: The Document class of Corruption of the Champions.
****/

// [SWF( width="1000", height="800", pageTitle="Corruption of Champions" )]

export class CoC {

    // Include the functions. ALL THE FUNCTIONS
    //No longer needed. Added into CharCreation.as:		include "../../includes/customCharCreation.as";

    // include "../../includes/descriptors.as";
    // include "../../includes/appearance.as";

    //No longer needed:		include "../../includes/InitialiseUI.as";
    // include "../../includes/input.as";
    // include "../../includes/OnLoadVariables.as";
    // include "../../includes/startUp.as";
    // include "../../includes/debug.as";

    // include "../../includes/combat.as";
    //No longer needed. This file has been chopped up and spread throughout the codebase:		include "../../includes/doEvent.as";
    // include "../../includes/eventParser.as";


    // include "../../includes/eventTest.as";


    // include "../../includes/transform.as";

    // include "../../includes/engineCore.as";

    // Lots of constants
    //include "../../includes/flagDefs.as";
    // include "../../includes/appearanceDefs.as";

    //Any classes that need to be made aware when the game is saved or loaded can add themselves to this array using saveAwareAdd.
    //	Once in the array they will be notified by Saves.as whenever the game needs them to write or read their data to the flags array.
    private static _saveAwareClassList: SaveAwareInterface[] = [];
    static SKIN_TYPE_GOO: number;

    //Called by the saveGameObject function in Saves
    public static saveAllAwareClasses(game: CoC): void { for (var sac: number = 0; sac < CoC._saveAwareClassList.length; sac++) CoC._saveAwareClassList[sac].updateBeforeSave(game); }

    //Called by the loadGameObject function in Saves
    public static loadAllAwareClasses(game: CoC): void { for (var sac: number = 0; sac < CoC._saveAwareClassList.length; sac++) CoC._saveAwareClassList[sac].updateAfterLoad(game); }

    public static saveAwareClassAdd(newEntry: SaveAwareInterface): void { CoC._saveAwareClassList.push(newEntry); }

    //Any classes that need to be aware of the passage of time can add themselves to this array using timeAwareAdd.
    //	Once in the array they will be notified as each hour passes, allowing them to update actions, lactation, pregnancy, etc.
    private static _timeAwareClassList: TimeAwareInterface[] = []; //Accessed by goNext function in eventParser
    private static timeAwareLargeLastEntry: number = -1; //Used by the eventParser in calling timeAwareLarge
    private playerEvent: PlayerEvents;

    public static timeAwareClassAdd(newEntry: TimeAwareInterface): void { CoC._timeAwareClassList.push(newEntry); }

    private static doCamp: any; //Set by campInitialize, should only be called by playerMenu
    private static campInitialize(passDoCamp: any): void { CoC.doCamp = passDoCamp; }

    // /
    private _perkLib: PerkLib = new PerkLib();// to init the static
    private _statusAffects: StatusAffects = new StatusAffects();// to init the static
    public charCreation: CharCreation = new CharCreation();
    public saves: Saves = new Saves(this.gameStateDirectGet, this.gameStateDirectSet);
    // Items/
    public mutations: Mutations = new Mutations();
    public consumables: ConsumableLib = new ConsumableLib();
    public useables: UseableLib;
    public weapons: WeaponLib = new WeaponLib();
    public armors: ArmorLib = new ArmorLib();
    public miscItems: MiscItemLib = new MiscItemLib();
    // Scenes/
    public camp: Camp = new Camp(CoC.campInitialize);
    public exploration: Exploration = new Exploration();
    public followerInteractions: FollowerInteractions = new FollowerInteractions();
    public inventory: Inventory = new Inventory(this.saves);
    public masturbation: Masturbation = new Masturbation();
    // Scenes/Areas/
    public bog: Bog = new Bog();
    public desert: Desert = new Desert();
    public forest: Forest = new Forest();
    public highMountains: HighMountains = new HighMountains();
    public lake: Lake = new Lake();
    public mountain: Mountain = new Mountain();
    public plains: Plains = new Plains();
    public swamp: Swamp = new Swamp();
    // Scenes/Dungeons
    public brigidScene: BrigidScene = new BrigidScene();
    public d3: D3 = new D3();
    // Scenes/Explore/
    public gargoyle: Gargoyle = new Gargoyle();
    public lumi: Lumi = new Lumi();
    // Scenes/Monsters/
    public goblinScene: GoblinScene = new GoblinScene();
    public impScene: ImpScene = new ImpScene();
    public goblinAssassinScene: GoblinAssassinScene = new GoblinAssassinScene();
    // Scenes/NPC/
    public amilyScene: AmilyScene = new AmilyScene();
    public anemoneScene: AnemoneScene = new AnemoneScene();
    public arianScene: ArianScene = new ArianScene();
    public ceraphScene: CeraphScene = new CeraphScene();
    public ceraphFollowerScene: CeraphFollowerScene = new CeraphFollowerScene();
    public emberScene: EmberScene = new EmberScene();
    public exgartuan: Exgartuan = new Exgartuan();
    public helFollower: HelFollower = new HelFollower();
    public helScene: HelScene = new HelScene();
    public helSpawnScene: HelSpawnScene = new HelSpawnScene();
    public holliScene: HolliScene = new HolliScene();
    public isabellaScene: IsabellaScene = new IsabellaScene();
    public isabellaFollowerScene: IsabellaFollowerScene = new IsabellaFollowerScene();
    public izmaScene: IzmaScene = new IzmaScene();
    public jojoScene: JojoScene = new JojoScene();
    public kihaFollower: KihaFollower = new KihaFollower();
    public kihaScene: KihaScene = new KihaScene();
    public latexGirl: LatexGirl = new LatexGirl();
    public marbleScene: MarbleScene = new MarbleScene();
    public marblePurification: MarblePurification = new MarblePurification();
    public milkWaifu: MilkWaifu = new MilkWaifu();
    public raphael: Raphael = new Raphael();
    public rathazul: Rathazul = new Rathazul();
    public sheilaScene: SheilaScene = new SheilaScene();
    public shouldraFollower: ShouldraFollower = new ShouldraFollower();
    public shouldraScene: ShouldraScene = new ShouldraScene();
    public sophieBimbo: SophieBimbo = new SophieBimbo();
    public sophieFollowerScene: SophieFollowerScene = new SophieFollowerScene();
    public sophieScene: SophieScene = new SophieScene();
    public urta: Urta = new Urta();
    public urtaHeatRut: UrtaHeatRut = new UrtaHeatRut();
    public urtaPregs: UrtaPregs = new UrtaPregs();
    public valeria: Valeria = new Valeria();
    public vapula: Vapula = new Vapula();
    // Scenes/Places/
    public bazaar: Bazaar = new Bazaar();
    public boat: Boat = new Boat();
    public farm: Farm = new Farm();
    public owca: Owca = new Owca();
    public telAdre: TelAdre = new TelAdre();
    // Scenes/Quests/
    public urtaQuest: UrtaQuest = new UrtaQuest();

    // Force updates in Pepper Flash ahuehue
    private _updateHack: Sprite = new Sprite();

    // Other scenes

    // include "../../includes/april_fools.as";

    // include "../../includes/dreams.as";
    // include "../../includes/dungeon2Supplimental.as";
    // include "../../includes/dungeonCore.as";
    //No longer needed. This file has been chopped up and spread throughout the codebase:		include "../../includes/dungeonEvents.as";
    // include "../../includes/dungeonHelSupplimental.as";
    // include "../../includes/dungeonSandwitch.as";
    // include "../../includes/fera.as";
    //Moved to Scenes/Masturbation.as		include "../../includes/masturbation.as";
    // include "../../includes/pregnancy.as";
    // include "../../includes/runa.as";
    // include "../../includes/symGear.as";
    // include "../../includes/tamaniDildo.as";
    // include "../../includes/thanksgiving.as";
    // include "../../includes/valentines.as";
    // include "../../includes/worms.as";
    // include "../../includes/xmas_bitch.as";
    // include "../../includes/xmas_gats_not_an_angel.as";
    // include "../../includes/xmas_jack_frost.as";
    // include "../../includes/xmas_misc.as";


    /****
        This is used purely for bodges while we get things cleaned up.
        Hopefully, anything you stick to this object can be removed eventually.
        I only used it because for some reason the Flash compiler wasn't seeing
        certain functions, even though they were in the same scope as the
    function  calling them.
    ****/
    //Looks like this dangerous little var is no longer used anywhere, huzzah.		public var semiglobalReferencer : any = {};

    public mainView: MainView;

    public model: GameModel;

    public parser: Parser;

    // ALL THE VARIABLES:
    // Declare the various global variables as class variables.
    // Note that they're set up in the constructor, not here.
    public debug: boolean;
    public ver: string;
    public version: string;
    public mobile: boolean;
    public images: ImageManager;
    public player: Player;
    public player2: Player;
    //No longer used:		public var tempPerk:PerkClass;
    public monster: Monster;
    //No longer used:		public var itemSwapping: boolean;
    public flags: Record<string, any>;
    private gameState: number;
    //Gone, last use replaced by newRound arg for combatMenu:		public var menuLoc: number;
    //No longer used:		public var itemSubMenu: boolean;
    //No longer used:		public var supressGoNext: boolean = false;
    public time: TimeModel;
    public currentText: string;

    public explored: boolean;
    public foundForest: boolean;
    public foundDesert: boolean;
    public foundMountain: boolean;
    public foundLake: boolean;
    public whitney: number;
    public monk: number;
    public sand: number;
    public giacomo: number;
    //Replaced by flag		public var beeProgress: number;
    //Now in Inventory.as		public var itemStorage: any[];
    //Now in Inventory.as		public var gearStorage: any[];
    public temp: number;
    public args: any[];
    public funcs: any[];
    public oldStats: any; // I *think* this is a generic object
    public inputManager: InputManager;

    public monkey: ChaosMonkey;
    public testingBlockExiting: boolean;

    public kFLAGS_REF: any;

    public get inCombat(): boolean { return this.gameState == 1; }

    public set inCombat(value: boolean) { this.gameState = (value ? 1 : 0); }

    private gameStateDirectGet(): number { return this.gameState; }

    private gameStateDirectSet(value: number): void { this.gameState = value; }

    public rand(max: number): number {
        return Utils.rand(max);
    }

    // holidayz
    public isEaster(): boolean {
        return this.plains.bunnyGirl.isItEaster();
    }

    public constructor() {
        // Cheatmode.
        kGAMECLASS = this;

        this.useables = new UseableLib();

        this.kFLAGS_REF = kFLAGS;
        // cheat for the parser to be able to find kFLAGS
        // If you're not the parser, DON'T USE THIS

        // This is a flag used to prevent the game from exiting when running under the automated tester
        // (the chaos monkey)
        this.testingBlockExiting = false;

        // Used for stopping chaos monkey on syntax errors. Separate flag so we can make stopping optional
        CoC_Settings.haltOnErrors = false;

        this.parser = new Parser(this, CoC_Settings);

        this.model = new GameModel();
        this.mainView = new MainView(this.model);
        this.mainView.name = "mainView";
        this.stage.addChild(this.mainView);

        // Hooking things to MainView.
        this.mainView.onNewGameClick = this.charCreation.newGameGo;
        this.mainView.onAppearanceClick = this.appearance;
        this.mainView.onDataClick = this.saves.saveLoad;
        this.mainView.onLevelClick = this.levelUpGo;
        this.mainView.onPerksClick = this.displayPerks;
        this.mainView.onStatsClick = this.displayStats;

        // Set up all the messy global stuff:

        // ******************************************************************************************

        var mainView: MainView = this.mainView;
        var model: GameModel = this.model;


        /**
         * Global Variables used across the whole game. I hope to whittle it down slowly.
         */

        /**
         * System Variables
         * Debug, Version, etc
         */
        //{ region SystemVariables

        //DEBUG, used all over the place
        this.debug = false;
        //model.debug = debug; // TODO: Set on model?

        //Version NUMBER
        this.ver = "0.9.4";
        this.version = this.ver + " (<b>Moar Bugfixan</b>)";

        //Indicates if building for mobile?
        this.mobile = false;
        model.mobile = this.mobile;

        this.images = new ImageManager(stage);
        this.inputManager = new InputManager(stage, false);
        // include "../../includes/ControlBindings.as";

        this.monkey = new ChaosMonkey(this);

        //} endregion

        /**
         * Player specific variables
         * The player object and variables associated with the player
         */
        //{ region PlayerVariables

        //The Player object, used everywhere
        this.player = new Player();
        model.player = this.player;
        this.player2 = new Player();
        this.playerEvent = new PlayerEvents();

        //Used in perk selection, mainly eventParser, input and engineCore
        //tempPerk = undefined;

        //Create monster, used all over the place
        this.monster = new Monster();
        //} endregion

        /**
         * State Variables
         * They hold all the information about item states, menu states, game states, etc
         */
        //{ region StateVariables

        //User all over the place whenever items come up
        //No longer used:			itemSwapping = false;

        //The extreme flag state array. This needs to go. Holds information about everything, whether it be certain attacks for NPCs 
        //or state information to do with the game. 
        this.flags = {};
        model.flags = this.flags;


        ///Used everywhere to establish what the current game state is
        // Key system variables
        //0 = normal
        //1 = in combat
        //2 = in combat in grapple
        //3 = at start or game over screen
        //GameState 4 eliminated			//4 = at giacomo
        //GameState 5 eliminated			//5 = getting succubi potion
        //GameState 6 eliminated			//6 = at alchemist choices.
        //GameState 7 eliminated			//7 = item duuuuump
        //GameState 8 eliminated			//8 = worked at farm
        this.gameState = 0;

        //Gone, last use replaced by newRound arg for combatMenu
        //Another state variable used for menu display used everywhere
        //menuLoc
        //0 - normal
        //1 - items menu - no heat statuses when leaving it in combat
        //2 - needs to add an hour after grabbing item
        //3 - In tease menu - no heat statuses when leaving it.
        //MenuLoc 8 eliminated			//8 - Find Farm Pepper - 2 hours wait
        //MenuLoc 9 eliminated			//9 - Armor shop
        //MenuLoc 10 eliminated			//10- Tailor shop
        //MenuLoc 11 eliminated			//11- Midsleep loot
        //MenuLoc 12 eliminated			//12 - lumi potions
        //MenuLoc 13 eliminated			//13 - lumi enhancements
        //MenuLoc 14 eliminated			//14 - late night receive item
        //MenuLoc 15 eliminated			//15 - Weapon shop in TelAdra
        //MenuLoc 16 eliminated			//16 - Incubus Shop
        //MenuLoc 17 eliminated			//17 - 4 hours wait
        //MenuLoc 18 eliminated			//18 - 8 hours wait
        //MenuLoc 19 eliminated			//19 - Bakery!
        //MenuLoc 20 eliminated			//20 - weapon rack stuffing
        //MenuLoc 21 eliminated			//21 - weapon rack taking
        //MenuLoc 24 eliminated			//24 - Niamh booze
        //MenuLoc 25 eliminated			//25 - Owca Shop
        //MenuLoc 26 eliminated			//26 - Benoit Shop
        //MenuLoc 27 eliminated			//27 - Chicken Harpy Shop
        //MenuLoc 28 eliminated			//28 - Items menu
        //			menuLoc = 0;

        //State variable used to indicate whether inside an item submenu
        //The item sub menu
        //			itemSubMenu = false;
        //} endregion 

        /**
         * Display Variables
         * Variables that hold display information like number of days and all the current displayed text
         */
        //{ region DisplayVariables

        //Holds the date and time display in the bottom left
        this.time = new TimeModel();
        model.time = this.time;

        //The string holds all the "story" text, mainly used in engineCore
        this.currentText = "";
        //}endregion 

        /**
         * Item variables
         * Holds all the information about items in your inventory and stashes away
         */
        //{region ItemVariables

        /**
         * Plot Variables
         * Booleans and numbers about whether you've found certain places
         */
        //{ region PlotVariables

        //Plot variables
        this.explored = false;
        this.foundForest = false;
        this.foundDesert = false;
        this.foundMountain = false;
        this.foundLake = false;
        this.whitney = 0;
        this.monk = 0;
        this.sand = 0;
        this.giacomo = 0;
        //Replaced by flag			beeProgress = 0;

        //			itemStorage = [];
        //			gearStorage = [];
        //}endregion


        // These are toggled between by the [home] key.
        mainView.textBGWhite.visible = false;
        mainView.textBGTan.visible = false;

        // *************************************************************************************

        // import flash.events.MouseEvent;

        //const DOUBLE_ATTACK_STYLE: number = 867;
        //const SPELLS_CAST: number = 868;

        //Fenoxo loves his temps
        temp = 0;

        //Used to set what each action buttons displays and does.
        this.args = [];
        this.funcs = [];

        //Used for stat tracking to keep up/down arrows correct.
        this.oldStats = {};
        model.oldStats = this.oldStats;
        this.oldStats.oldStr = 0;
        this.oldStats.oldTou = 0;
        this.oldStats.oldSpe = 0;
        this.oldStats.oldInte = 0;
        this.oldStats.oldSens = 0;
        this.oldStats.oldLib = 0;
        this.oldStats.oldCor = 0;
        this.oldStats.oldHP = 0;
        this.oldStats.oldLust = 0;

        model.maxHP = this.maxHP;

        // ******************************************************************************************

        mainView.aCb.dataProvider = new DataProvider([{ label: "TEMP", perk: new PerkClass(PerkLib.Acclimation) }]);
        mainView.aCb.addEventListener(Event.CHANGE, this.changeHandler);

        //mainView._getButtonToolTipText = getButtonToolTipText;


        //Register the classes we need to be able to serialize and reconstitute so
        // they'll get reconstituted into the correct class when deserialized
        // registerClassAlias("AssClass", AssClass);
        // registerClassAlias("Character", Character);
        // registerClassAlias("Cock", Cock);
        // registerClassAlias("CockTypesEnum", CockTypesEnum);
        // registerClassAlias("Enum", Enum);
        // registerClassAlias("Creature", Creature);
        // registerClassAlias("ItemSlotClass", ItemSlotClass);
        // registerClassAlias("KeyItemClass", KeyItemClass);
        // registerClassAlias("Monster", Monster);
        // registerClassAlias("Player", Player);
        // registerClassAlias("StatusAffectClass", StatusAffectClass);
        // registerClassAlias("VaginaClass", VaginaClass);
        //registerClassAlias("Enum", Enum);

        //Hide sprites
        mainView.hideSprite();
        //Hide up/down arrows
        mainView.statsView.hideUpDown();

        this.addFrameScript(0, this.run);
    }

    public run(): void {
        this.mainMenu();
        this.stop();

        this._updateHack.name = "wtf";
        this._updateHack.graphics.beginFill(0xFF0000, 1);
        this._updateHack.graphics.drawRect(0, 0, 2, 2);
        this._updateHack.graphics.endFill();

        stage.addChild(this._updateHack);
        this._updateHack.x = 999;
        this._updateHack.y = 799;
    }

    public forceUpdate(): void {
        this._updateHack.x = 999;
        this._updateHack.addEventListener(Event.ENTER_FRAME, this.moveHackUpdate);
    }

    public moveHackUpdate(e: Event): void {
        this._updateHack.x -= 84;

        if (this._updateHack.x < 0) {
            this._updateHack.x = 0;
            this._updateHack.removeEventListener(Event.ENTER_FRAME, this.moveHackUpdate);
        }
    }

    // include "../../includes/descriptors.as";

    public sackDescript(): string {
        return Appearance.sackDescript(this.player);
    }

    public cockClit(number: number = 0): string {
        if (this.player.hasCock() && number >= 0 && number < this.player.cockTotal()) return this.player.cockDescript(number);
        else return this.clitDescript();
    }

    public chestDesc(): string {
        return this.player.chestDesc();
    }

    public tongueDescript(): string {
        return Appearance.tongueDescription(this.player);
    }
    public wingsDescript(): string {
        return Appearance.wingsDescript(this.player);
    }
    public tailDescript(): string {
        return Appearance.tailDescript(this.player);
    }
    public oneTailDescript(): string {
        return Appearance.oneTailDescript(this.player);
    }

    public ballsDescriptLight(forcedSize: boolean = true): string {
        return Appearance.ballsDescription(forcedSize, true, this.player);
    }

    public ballDescript(): string {
        return Appearance.ballsDescription(false, false, this.player);
    }

    public ballsDescript(): string {
        return Appearance.ballsDescription(false, true, this.player, true);
    }
    public simpleBallsDescript(): string {
        return Appearance.ballsDescription(false, true, this.player);
    }

    public assholeDescript(): string {
        return Appearance.assholeDescript(this.player);
    }

    public hipDescript(): string {
        return Appearance.hipDescription(this.player);
    }
    public assDescript(): string {
        return this.buttDescript();
    }
    public buttDescript(): string {
        return Appearance.buttDescription(this.player);
    }

    public nippleDescript(rowNum: number): string {
        return Appearance.nippleDescription(this.player, rowNum);
    }

    public hairDescript(): string {
        return Appearance.hairDescription(this.player);
    }

    public hairOrFur(): string {
        return Appearance.hairOrFur(this.player);
    }

    public clitDescript(): string {
        return Appearance.clitDescription(this.player);
    }

    //Vaginas + Descript
    public vaginaDescript(vaginaNum: number = 0): string {
        return Appearance.vaginaDescript(this.player, vaginaNum);
    }

    //Allvagina descript
    public allVaginaDescript(): string {
        if (this.player.vaginas.length == 1) return this.vaginaDescript(this.rand(this.player.vaginas.length - 1));
        if (this.player.vaginas.length > 1) return (this.vaginaDescript(this.rand(this.player.vaginas.length - 1)) + "s");

        CoC_Settings.error("ERROR: allVaginaDescript called with no vaginas.");
        return "ERROR: allVaginaDescript called with no vaginas.";
    }

    public cockDescript(cockNum: number = 0): string {
        return this.player.cockDescript(cockNum);
    }

    public allBreastsDescript(): string {
        return Appearance.allBreastsDescript(this.player);
    }

    public breastDescript(rowNum: number): string {
        return this.player.breastDescript(rowNum);
    }

    public num2Text(number: number): string {
        return Utils.num2Text(number);
    }

    public num2Text2(number: number): string {
        return Utils.num2Text2(number);
    }

    public Num2Text(number: number): string {
        return Utils.Num2Text(number);
    }

    // include "../../includes/appearance.as";


    public appearance(e?: MouseEvent): void {
        this.funcs = new Array();
        this.args = new Array();
        //Temp vars
        var temp: number = 0;
        var rando: number = 0;
        //Determine race type:
        var race: string = "human";
        /*if(player.lowerBody == LOWER_BODY_TYPE_CENTAUR) race = "centaur";
        if(player.lowerBody == LOWER_BODY_TYPE_PONY) race = "pony-kin";
        //determine sheath
    var  sheath: boolean = false;
        if(player.catScore() >= 4) race = "cat-" + player.mf("boy","girl");
        if(player.lizardScore() >= 4) 
        {
            if(player.gender == 0) race = "lizan";
            else if(player.gender == 1) race = "male lizan";
            else if(player.gender == 2) race = "female lizan";
            else race = "hermaphrodite lizan";
        }
        if(player.dogScore() >= 4) race = "dog-morph";
        if(player.horseScore() >= 3) 
        {
            if(player.lowerBody == LOWER_BODY_TYPE_CENTAUR) race = "centaur-morph";
            else race = "equine-morph";
        }
        if(player.mutantScore() >= 5) race = "corrupted mutant";
        if(player.minoScore() >= 4) race = "minotaur-morph";
        if(player.cowScore() > 5) 
        {
            race = "cow-";
            if(player.gender <= 1) race += "boi";
            else race += "girl";
        }
        if(player.beeScore() >= 4) race = "bee-morph";
        if(player.goblinScore() >= 5) race = "goblin";
        if(player.humanScore() >= 5 && race == "corrupted mutant") race = "somewhat human mutant";
        if(player.demonScore() > 4) race = "demon-morph";
        if(player.lowerBody == LOWER_BODY_TYPE_NAGA) race = "naga";
        if(player.lowerBody == LOWER_BODY_TYPE_CENTAUR) race = "centaur";
        if(player.sharkScore() >= 3) race = "shark-morph";
        if(player.bunnyScore() >= 4) race = "bunny-" + player.mf("boy","girl");
        if(player.gooScore() >= 3) 
        {
            race = "goo-";
            if(player.gender <= 1) race += "boi";
            else race += "girl";
        }*/



        race = this.player.race();
        //Discuss race
        this.outputText("", true);
        if (race != "human") this.outputText("You began your journey as a human, but gave that up as you explored the dangers of this realm.  ", false);
        //Height and race.
        this.outputText("You are a " + Math.floor(this.player.tallness / 12) + " foot " + this.player.tallness % 12 + " inch tall " + race + ", with " + this.player.bodyType() + ".", false);
        if (this.player.armorName == "comfortable clothes")
            this.outputText("  <b>You are currently wearing " + this.player.armorName + " and using your " + this.player.weaponName + " as a weapon.</b>", false);
        else this.outputText("  <b>You are currently wearing your " + this.player.armorName + " and using your " + this.player.weaponName + " as a weapon.</b>", false);
        //Face
        if (this.player.faceType == CoC.FACE_HUMAN || this.player.faceType == CoC.FACE_SHARK_TEETH || this.player.faceType == CoC.FACE_BUNNY || this.player.faceType == CoC.FACE_SPIDER_FANGS || this.player.faceType == CoC.FACE_FERRET_MASK) {
            if (this.player.skinType == CoC.SKIN_TYPE_PLAIN || this.player.skinType == CoC.SKIN_TYPE_GOO)
                this.outputText("  Your face is human in shape and structure, with " + this.player.skin() + ".", false);
            if (this.player.skinType == CoC.SKIN_TYPE_FUR)
                this.outputText("  Under your " + this.player.skinFurScales() + " you have a human-shaped head with " + this.player.skin(true, false) + ".", false);
            if (this.player.skinType == CoC.SKIN_TYPE_SCALES)
                this.outputText("  Your face is fairly human in shape, but is covered in " + this.player.skin() + ".", false);
            if (this.player.faceType == CoC.FACE_SHARK_TEETH)
                this.outputText("  A set of razor-sharp, retractable shark-teeth fill your mouth and gives your visage a slightly angular appearance.", false);
            else if (this.player.faceType == CoC.FACE_BUNNY)
                this.outputText("  The constant twitches of your nose and the length of your incisors gives your visage a hint of bunny-like cuteness.", false);
            else if (this.player.faceType == CoC.FACE_SPIDER_FANGS)
                this.outputText("  A set of retractable, needle-like fangs sit in place of your canines and are ready to dispense their venom.", false);
            else if (this.player.faceType == CoC.FACE_FERRET_MASK)
                this.outputText("  The [skinFurScales] around your eyes is significantly darker than the rest of your face, giving you a cute little ferret mask.", false);
        }
        else if (this.player.faceType == CoC.FACE_FERRET) {
            if (this.player.skinType == CoC.SKIN_TYPE_PLAIN) this.outputText("  Your face is an adorable cross between human and ferret features, complete with a wet nose and whiskers.  The only oddity is your lack of fur, leaving only [skin] visible on your ferret-like face.", false);
            else this.outputText("  Your face is coated in " + this.player.hairColor + " fur with [skin] underneath, an adorable cross between human and ferret features.  It is complete with a wet nose and whiskers.");
        }
        else if (this.player.faceType == CoC.FACE_RACCOON_MASK) {
            //appearance for skinheads
            if (this.player.skinType != CoC.SKIN_TYPE_FUR && this.player.skinType != CoC.SKIN_TYPE_SCALES) {
                this.outputText("  Your face is human in shape and structure, with " + this.player.skin());
                if ((this.player.skinTone == "ebony" || this.player.skinTone == "black") && (this.player.skinType == CoC.SKIN_TYPE_PLAIN || this.player.skinType == CoC.SKIN_TYPE_GOO))
                    this.outputText(", though with your dusky hue, the black raccoon mask you sport isn't properly visible.");
                else this.outputText(", though it is decorated with a sly-looking raccoon mask over your eyes.");
            }
            //appearance furscales
            else {
                //(black/midnight furscales)
                if (((this.player.hairColor == "black" || this.player.hairColor == "midnight") && (this.player.skinType == CoC.SKIN_TYPE_FUR || this.player.skinType == CoC.SKIN_TYPE_SCALES)))
                    this.outputText("  Under your " + this.player.skinFurScales() + " hides a black raccoon mask, barely visible due to your inky hue, and");
                else this.outputText("  Your " + this.player.skinFurScales() + " are decorated with a sly-looking raccoon mask, and under them");
                this.outputText(" you have a human-shaped head with " + this.player.skin(true, false) + ".");
            }
        }
        else if (this.player.faceType == CoC.FACE_RACCOON) {
            this.outputText("  You have a triangular raccoon face, replete with sensitive whiskers and a little black nose; a mask shades the space around your eyes, set apart from your " + this.player.skinFurScales() + " by a band of white.");
            //(if skin)
            if (this.player.skinType == CoC.SKIN_TYPE_PLAIN)
                this.outputText("  It looks a bit strange with only the skin and no fur.");
            else if (this.player.skinType == CoC.SKIN_TYPE_SCALES)
                this.outputText("  The presence of said scales gives your visage an eerie look, more reptile than mammal.");
        }
        else if (this.player.faceType == CoC.FACE_FOX) {
            this.outputText("  You have a tapered, shrewd-looking vulpine face with a speckling of downward-curved whiskers just behind the nose.");
            if (this.player.skinType == CoC.SKIN_TYPE_PLAIN)
                this.outputText("  Oddly enough, there's no fur on your animalistic muzzle, just " + this.player.skinFurScales() + ".");
            else if (this.player.skinType == CoC.SKIN_TYPE_FUR)
                this.outputText("  A coat of " + this.player.skinFurScales() + " decorates your muzzle.");
            else if (this.player.skinType == CoC.SKIN_TYPE_SCALES)
                this.outputText("  Strangely, " + this.player.skinFurScales() + " adorn every inch of your animalistic visage.");
        }
        else if (this.player.faceType == CoC.FACE_BUCKTEETH) {
            //appearance
            this.outputText("  Your face is generally human in shape and structure, with " + this.player.skin());
            if (this.player.skinType == CoC.SKIN_TYPE_FUR || this.player.skinType == CoC.SKIN_TYPE_SCALES)
                this.outputText(" under your " + this.player.skinFurScales());
            this.outputText(" and mousey buckteeth.");
        }
        else if (this.player.faceType == CoC.FACE_MOUSE) {
            //appearance
            this.outputText("  You have a snubby, tapered mouse's face, with whiskers, a little pink nose, and ");
            if (this.player.skinType != CoC.SKIN_TYPE_FUR && this.player.skinType != CoC.SKIN_TYPE_SCALES)
                this.outputText(this.player.skin());
            else this.outputText(this.player.skin() + " under your " + this.player.skinFurScales());
            this.outputText(".  Two large incisors complete it.");
        }
        //Naga
        if (this.player.faceType == CoC.FACE_SNAKE_FANGS) {
            if (this.player.skinType == CoC.SKIN_TYPE_PLAIN || this.player.skinType == CoC.SKIN_TYPE_GOO)
                this.outputText("  You have a fairly normal face, with " + this.player.skin() + ".  The only oddity is your pair of dripping fangs which often hang over your lower lip.", false);
            if (this.player.skinType == CoC.SKIN_TYPE_FUR)
                this.outputText("  Under your " + this.player.skinFurScales() + " you have a human-shaped head with " + this.player.skin(true, false) + ".  In addition, a pair of fangs hang over your lower lip, dripping with venom.", false);
            if (this.player.skinType == CoC.SKIN_TYPE_SCALES)
                this.outputText("  Your face is fairly human in shape, but is covered in " + this.player.skinFurScales() + ".  In addition, a pair of fangs hang over your lower lip, dripping with venom.", false);
        }
        //horse-face
        if (this.player.faceType == CoC.FACE_HORSE) {
            if (this.player.skinType == CoC.SKIN_TYPE_PLAIN || this.player.skinType == CoC.SKIN_TYPE_GOO)
                this.outputText("  Your face is equine in shape and structure.  The odd visage is hairless and covered with " + this.player.skinFurScales() + ".", false);
            if (this.player.skinType == CoC.SKIN_TYPE_FUR)
                this.outputText("  Your face is almost entirely equine in appearance, even having " + this.player.skinFurScales() + ".  Underneath the fur, you believe you have " + this.player.skin(true, false) + ".", false);
            if (this.player.skinType == CoC.SKIN_TYPE_SCALES)
                this.outputText("  You have the face and head structure of a horse, overlaid with glittering " + this.player.skinFurScales() + ".", false);
        }
        //dog-face
        if (this.player.faceType == CoC.FACE_DOG) {
            if (this.player.skinType == CoC.SKIN_TYPE_PLAIN || this.player.skinType == CoC.SKIN_TYPE_GOO)
                this.outputText("  You have a dog-like face, complete with a wet nose.  The odd visage is hairless and covered with " + this.player.skinFurScales() + ".", false);
            if (this.player.skinType == CoC.SKIN_TYPE_FUR)
                this.outputText("  You have a dog's face, complete with wet nose and panting tongue.  You've got " + this.player.skinFurScales() + ", hiding your " + this.player.skin(true, false) + " underneath your furry visage.", false);
            if (this.player.skinType == CoC.SKIN_TYPE_SCALES)
                this.outputText("  You have the facial structure of a dog, wet nose and all, but overlaid with glittering " + this.player.skinFurScales() + ".", false);
        }
        //cat-face
        if (this.player.faceType == CoC.FACE_CAT) {
            if (this.player.skinType == CoC.SKIN_TYPE_PLAIN || this.player.skinType == CoC.SKIN_TYPE_GOO)
                this.outputText("  You have a cat-like face, complete with a cute, moist nose and whiskers.  The " + this.player.skin() + " that is revealed by your lack of fur looks quite unusual on so feline a face.", false);
            if (this.player.skinType == CoC.SKIN_TYPE_FUR)
                this.outputText("  You have a cat-like face, complete with moist nose and whiskers.  Your " + this.player.skinDesc + " is " + this.player.hairColor + ", hiding your " + this.player.skin(true, false) + " underneath.", false);
            if (this.player.skinType == CoC.SKIN_TYPE_SCALES)
                this.outputText("  Your facial structure blends humanoid features with those of a cat.  A moist nose and whiskers are included, but overlaid with glittering " + this.player.skinFurScales() + ".", false);
            if (this.player.eyeType != CoC.EYES_BLACK_EYES_SAND_TRAP)
                this.outputText("  Of course, no feline face would be complete without vertically slit eyes.");
        }
        //Minotaaaauuuur-face
        if (this.player.faceType == CoC.FACE_COW_MINOTAUR) {
            if (this.player.skinType == CoC.SKIN_TYPE_PLAIN || this.player.skinType == CoC.SKIN_TYPE_GOO)
                this.outputText("  You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose.  Despite your lack of fur elsewhere, your visage does have a short layer of " + this.player.hairColor + " fuzz.", false);
            if (this.player.skinType == CoC.SKIN_TYPE_FUR)
                this.outputText("  You have a face resembling that of a minotaur, with cow-like features, particularly a squared off wet nose.  Your " + this.player.skinFurScales() + " thickens noticably on your head, looking shaggy and more than a little monstrous once laid over your visage.", false);
            if (this.player.skinType == CoC.SKIN_TYPE_SCALES)
                this.outputText("  Your face resembles a minotaur's, though strangely it is covered in shimmering scales, right up to the flat cow-like nose that protrudes from your face.", false);
        }
        //Lizard-face
        if (this.player.faceType == CoC.FACE_LIZARD) {
            if (this.player.skinType == CoC.SKIN_TYPE_PLAIN || this.player.skinType == CoC.SKIN_TYPE_GOO)
                this.outputText("  You have a face resembling that of a lizard, and with your toothy maw, you have quite a fearsome visage.  The reptilian visage does look a little odd with just " + this.player.skin() + ".", false);
            if (this.player.skinType == CoC.SKIN_TYPE_FUR)
                this.outputText("  You have a face resembling that of a lizard.  Between the toothy maw, pointed snout, and the layer of " + this.player.skinFurScales() + " covering your face, you have quite the fearsome visage.", false);
            if (this.player.skinType == CoC.SKIN_TYPE_SCALES)
                this.outputText("  Your face is that of a lizard, complete with a toothy maw and pointed snout.  Reflective " + this.player.skinFurScales() + " complete the look, making you look quite fearsome.", false);
        }
        if (this.player.faceType == CoC.FACE_DRAGON) {
            this.outputText("  Your face is a narrow, reptilian muzzle.  It looks like a predatory lizard's, at first glance, but with an unusual array of spikes along the under-jaw.  It gives you a regal but fierce visage.  Opening your mouth reveals several rows of dagger-like sharp teeth.  The fearsome visage is decorated by " + this.player.skinFurScales() + ".");
        }
        if (this.player.faceType == CoC.FACE_KANGAROO) {
            this.outputText("  Your face is ", false);
            if (this.player.skinType == CoC.SKIN_TYPE_PLAIN)
                this.outputText("bald", false);
            else this.outputText("covered with " + this.player.skinFurScales(), false);
            this.outputText(" and shaped like that of a kangaroo, somewhat rabbit-like except for the extreme length of your odd visage.", false);
        }
        //M/F stuff!
        this.outputText("  It has " + this.player.faceDesc() + ".", false);
        //Eyes
        if (this.player.eyeType == CoC.EYES_FOUR_SPIDER_EYES)
            this.outputText("  In addition to your primary two eyes, you have a second, smaller pair on your forehead.", false);
        else if (this.player.eyeType == CoC.EYES_BLACK_EYES_SAND_TRAP)
            this.outputText("  Your eyes are solid spheres of inky, alien darkness.");

        //Hair
        //if bald
        if (this.player.hairLength == 0) {
            if (this.player.skinType == CoC.SKIN_TYPE_FUR)
                this.outputText("  You have no hair, only a thin layer of fur atop of your head.  ", false);
            else this.outputText("  You are totally bald, showing only shiny " + this.player.skinTone + " " + this.player.skinDesc + " where your hair should be.", false);
            if (this.player.earType == CoC.EARS_HORSE)
                this.outputText("  A pair of horse-like ears rise up from the top of your head.", false);
            else if (this.player.earType == CoC.EARS_FERRET)
                this.outputText("  A pair of small, rounded ferret ears sit on top of your head.", false);
            else if (this.player.earType == CoC.EARS_DOG)
                this.outputText("  A pair of dog ears protrude from your skull, flopping down adorably.", false);
            else if (this.player.earType == CoC.EARS_COW)
                this.outputText("  A pair of round, floppy cow ears protrude from the sides of your skull.", false);
            else if (this.player.earType == CoC.EARS_ELFIN)
                this.outputText("  A pair of large pointy ears stick out from your skull.", false);
            else if (this.player.earType == CoC.EARS_CAT)
                this.outputText("  A pair of cute, fuzzy cat ears have sprouted from the top of your head.", false);
            else if (this.player.earType == CoC.EARS_LIZARD)
                this.outputText("  A pair of rounded protrusions with small holes on the sides of your head serve as your ears.", false);
            else if (this.player.earType == CoC.EARS_BUNNY)
                this.outputText("  A pair of floppy rabbit ears stick up from the top of your head, flopping around as you walk.", false);
            else if (this.player.earType == CoC.EARS_FOX)
                this.outputText("  A pair of large, adept fox ears sit high on your head, always listening.");
            else if (this.player.earType == CoC.EARS_DRAGON)
                this.outputText("  A pair of rounded protrusions with small holes on the sides of your head serve as your ears.  Bony fins sprout behind them.", false);
            else if (this.player.earType == CoC.EARS_RACCOON)
                this.outputText("  A pair of vaguely egg-shaped, furry raccoon ears adorns your head.");
            else if (this.player.earType == CoC.EARS_MOUSE)
                this.outputText("  A pair of large, dish-shaped mouse ears tops your head.");
            if (this.player.antennae == CoC.ANTENNAE_BEE)
                this.outputText("  Floppy antennae also appear on your skull, bouncing and swaying in the breeze.", false);
        }
        //not bald
        else {
            if (this.player.earType == CoC.EARS_HUMAN)
                this.outputText("  Your " + this.hairDescript() + " looks good on you, accentuating your features well.", false);
            else if (this.player.earType == CoC.EARS_FERRET)
                this.outputText("  A pair of small, rounded ferret ears burst through the top of your " + this.hairDescript() + ".", false);
            else if (this.player.earType == CoC.EARS_HORSE)
                this.outputText("  The " + this.hairDescript() + " on your head parts around a pair of very horse-like ears that grow up from your head.", false);
            else if (this.player.earType == CoC.EARS_DOG)
                this.outputText("  The " + this.hairDescript() + " on your head is overlapped by a pair of pointed dog ears.", false);
            else if (this.player.earType == CoC.EARS_COW)
                this.outputText("  The " + this.hairDescript() + " on your head is parted by a pair of rounded cow ears that stick out sideways.", false);
            else if (this.player.earType == CoC.EARS_ELFIN)
                this.outputText("  The " + this.hairDescript() + " on your head is parted by a pair of cute pointed ears, bigger than your old human ones.", false);
            else if (this.player.earType == CoC.EARS_CAT)
                this.outputText("  The " + this.hairDescript() + " on your head is parted by a pair of cute, fuzzy cat ears, sprouting from atop your head and pivoting towards any sudden noises.", false);
            else if (this.player.earType == CoC.EARS_LIZARD)
                this.outputText("  The " + this.hairDescript() + " atop your head makes it nigh-impossible to notice the two small rounded openings that are your ears.", false);
            else if (this.player.earType == CoC.EARS_BUNNY)
                this.outputText("  A pair of floppy rabbit ears stick up out of your " + this.hairDescript() + ", bouncing around as you walk.", false);
            else if (this.player.earType == CoC.EARS_KANGAROO)
                this.outputText("  The " + this.hairDescript() + " atop your head is parted by a pair of long, furred kangaroo ears that stick out at an angle.", false);
            else if (this.player.earType == CoC.EARS_FOX)
                this.outputText("  The " + this.hairDescript() + " atop your head is parted by a pair of large, adept fox ears that always seem to be listening.");
            else if (this.player.earType == CoC.EARS_DRAGON)
                this.outputText("  The " + this.hairDescript() + " atop your head is parted by a pair of rounded protrusions with small holes on the sides of your head serve as your ears.  Bony fins sprout behind them.", false);
            else if (this.player.earType == CoC.EARS_RACCOON)
                this.outputText("  The " + this.hairDescript() + " on your head parts around a pair of egg-shaped, furry raccoon ears.");
            else if (this.player.earType == CoC.EARS_MOUSE)
                this.outputText("  The " + this.hairDescript() + " atop your head is funneled between and around a pair of large, dish-shaped mouse ears that stick up prominently.");
            if (this.player.antennae == CoC.ANTENNAE_BEE) {
                if (this.player.earType == CoC.EARS_BUNNY)
                    this.outputText("  Limp antennae also grow from just behind your hairline, waving and swaying in the breeze with your ears.", false);
                else this.outputText("  Floppy antennae also grow from just behind your hairline, bouncing and swaying in the breeze.", false);
            }
        }
        //Tongue
        if (this.player.tongueType == CoC.TONUGE_SNAKE)
            this.outputText("  A snake-like tongue occasionally flits between your lips, tasting the air.", false);
        else if (this.player.tongueType == CoC.TONUGE_DEMONIC)
            this.outputText("  A slowly undulating tongue occasionally slips from between your lips.  It hangs nearly two feet long when you let the whole thing slide out, though you can retract it to appear normal.", false);
        else if (this.player.tongueType == CoC.TONUGE_DRACONIC)
            this.outputText("  Your mouth contains a thick, fleshy tongue that, if you so desire, can telescope to a distance of about four feet.  It has sufficient manual dexterity that you can use it almost like a third arm.");

        //Horns
        //Demonic horns
        if (this.player.hornType == CoC.HORNS_DEMON) {
            if (this.player.horns == 2)
                this.outputText("  A small pair of pointed horns has broken through the " + this.player.skinDesc + " on your forehead, proclaiming some demonic taint to any who see them.", false);
            if (this.player.horns == 4)
                this.outputText("  A quartet of prominent horns has broken through your " + this.player.skinDesc + ".  The back pair are longer, and curve back along your head.  The front pair protrude forward demonically.", false);
            if (this.player.horns == 6)
                this.outputText("  Six horns have sprouted through your " + this.player.skinDesc + ", the back two pairs curve backwards over your head and down towards your neck, while the front two horns stand almost eight inches long upwards and a little forward.", false);
            if (this.player.horns >= 8)
                this.outputText("  A large number of thick demonic horns sprout through your " + this.player.skinDesc + ", each pair sprouting behind the ones before.  The front jut forwards nearly ten inches while the rest curve back over your head, some of the points ending just below your ears.  You estimate you have a total of " + this.num2Text(this.player.horns) + " horns.", false);
        }
        //Minotaur horns
        if (this.player.hornType == CoC.HORNS_COW_MINOTAUR) {
            if (this.player.horns < 3)
                this.outputText("  Two tiny horn-like nubs protrude from your forehead, resembling the horns of the young livestock kept by your village.", false);
            if (this.player.horns >= 3 && this.player.horns < 6)
                this.outputText("  Two moderately sized horns grow from your forehead, similar in size to those on a young bovine.", false);
            if (this.player.horns >= 6 && this.player.horns < 12)
                this.outputText("  Two large horns sprout from your forehead, curving forwards like those of a bull.", false);
            if (this.player.horns >= 12 && this.player.horns < 20)
                this.outputText("  Two very large and dangerous looking horns sprout from your head, curving forward and over a foot long.  They have dangerous looking points.", false);
            if (this.player.horns >= 20)
                this.outputText("  Two huge horns erupt from your forehead, curving outward at first, then forwards.  The weight of them is heavy, and they end in dangerous looking points.", false);
        }
        //Lizard horns
        if (this.player.hornType == CoC.HORNS_DRACONIC_X2) {
            this.outputText("  A pair of " + this.num2Text(Math.floor(this.player.horns)) + " inch horns grow from the sides of your head, sweeping backwards and adding to your imposing visage.", false);
        }
        //Super lizard horns
        if (this.player.hornType == CoC.HORNS_DRACONIC_X4_12_INCH_LONG)
            this.outputText("  Two pairs of horns, roughly a foot long, sprout from the sides of your head.  They sweep back and give you a fearsome look, almost like the dragons from your village's legends.", false);
        //Antlers!
        if (this.player.hornType == CoC.HORNS_ANTLERS) {
            if (this.player.horns > 0)
                this.outputText("  Two antlers, forking into " + this.num2Text(this.player.horns) + " points, have sprouted from the top of your head, forming a spiky, regal crown of bone.");
        }
        //BODY PG HERE
        this.outputText("\n\nYou have a humanoid shape with the usual torso, arms, hands, and fingers.", false);
        //WINGS!
        if (this.player.wingType == CoC.WING_TYPE_BEE_LIKE_SMALL)
            this.outputText("  A pair of tiny-yet-beautiful bee-wings sprout from your back, too small to allow you to fly.", false);
        if (this.player.wingType == CoC.WING_TYPE_BEE_LIKE_LARGE)
            this.outputText("  A pair of large bee-wings sprout from your back, reflecting the light through their clear membranes beautifully.  They flap quickly, allowing you to easily hover in place or fly.", false);
        if (this.player.wingType == CoC.WING_TYPE_BAT_LIKE_TINY)
            this.outputText("  A pair of tiny bat-like demon-wings sprout from your back, flapping cutely, but otherwise being of little use.", false);
        if (this.player.wingType == CoC.WING_TYPE_BAT_LIKE_LARGE)
            this.outputText("  A pair of large bat-like demon-wings fold behind your shoulders.  With a muscle-twitch, you can extend them, and use them to soar gracefully through the air.", false);
        if (this.player.wingType == CoC.WING_TYPE_SHARK_FIN)
            this.outputText("  A large shark-like fin has sprouted between your shoulder blades.  With it you have far more control over swimming underwater.", false);
        if (this.player.wingType == CoC.WING_TYPE_FEATHERED_LARGE)
            this.outputText("  A pair of large, feathery wings sprout from your back.  Though you usually keep the " + this.player.hairColor + "-colored wings folded close, they can unfurl to allow you to soar as gracefully as a harpy.", false);
        if (this.player.wingType == CoC.WING_TYPE_DRACONIC_SMALL)
            this.outputText("  Small, vestigial wings sprout from your shoulders.  They might look like bat's wings, but the membranes are covered in fine, delicate scales.");
        else if (this.player.wingType == CoC.WING_TYPE_DRACONIC_LARGE)
            this.outputText("  Magnificent wings sprout from your shoulders.  When unfurled they stretch further than your arm span, and a single beat of them is all you need to set out toward the sky.  They look a bit like bat's wings, but the membranes are covered in fine, delicate scales and a wicked talon juts from the end of each bone.");
        else if (this.player.wingType == CoC.WING_TYPE_GIANT_DRAGONFLY)
            this.outputText("  Giant dragonfly wings hang from your shoulders.  At a whim, you could twist them into a whirring rhythm fast enough to lift you off the ground and allow you to fly.");

        //Wing arms
        if (this.player.armType == CoC.ARM_TYPE_HARPY)
            this.outputText("  Feathers hang off your arms from shoulder to wrist, giving them a slightly wing-like look.", false);
        else if (this.player.armType == CoC.ARM_TYPE_SPIDER)
            this.outputText("  Shining black exoskeleton  covers your arms from the biceps down, resembling a pair of long black gloves from a distance.", false);
        //Done with head bits. Move on to body stuff
        //Horse lowerbody, other lowerbody texts appear lower
        if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_PONY)
            this.outputText("  From the waist down you have an incredibly cute and cartoonish parody of a horse's body, with all four legs ending in flat, rounded feet.", false);
        else if (this.player.isTaur())
            this.outputText("  From the waist down you have the body of a horse, with all four legs capped by hooves.", false);
        //Hip info only displays if you aren't a centaur. 
        if (!this.player.isTaur()) {
            if (this.player.thickness > 70) {
                this.outputText("  You have " + this.hipDescript(), false);
                if (this.player.hipRating < 6) {
                    if (this.player.tone < 65)
                        this.outputText(" buried under a noticeable muffin-top, and", false);
                    else this.outputText(" that blend into your pillar-like waist, and", false);
                }
                if (this.player.hipRating >= 6 && this.player.hipRating < 10)
                    this.outputText(" that blend into the rest of your thick form, and", false);
                if (this.player.hipRating >= 10 && this.player.hipRating < 15)
                    this.outputText(" that would be much more noticeable if you weren't so wide-bodied, and", false);
                if (this.player.hipRating >= 15 && this.player.hipRating < 20)
                    this.outputText(" that sway and emphasize your thick, curvy shape, and", false);
                if (this.player.hipRating >= 20)
                    this.outputText(" that sway hypnotically on your extra-curvy frame, and", false);
            }
            else if (this.player.thickness < 30) {
                this.outputText("  You have " + this.hipDescript(), false);
                if (this.player.hipRating < 6)
                    this.outputText(" that match your trim, lithe body, and", false);
                if (this.player.hipRating >= 6 && this.player.hipRating < 10)
                    this.outputText(" that sway to and fro, emphasized by your trim body, and", false);
                if (this.player.hipRating >= 10 && this.player.hipRating < 15)
                    this.outputText(" that swell out under your trim waistline, and", false);
                if (this.player.hipRating >= 15 && this.player.hipRating < 20)
                    this.outputText(", emphasized by your narrow waist, and", false);
                if (this.player.hipRating >= 20)
                    this.outputText(" that swell disproportionately wide on your lithe frame, and", false);
            }
            //STANDARD
            else {
                this.outputText("  You have " + this.hipDescript(), false);
                if (this.player.hipRating < 6)
                    this.outputText(", and", false);
                if (this.player.femininity > 50) {
                    if (this.player.hipRating >= 6 && this.player.hipRating < 10)
                        this.outputText(" that draw the attention of those around you, and", false);
                    if (this.player.hipRating >= 10 && this.player.hipRating < 15)
                        this.outputText(" that make you walk with a sexy, swinging gait, and", false);
                    if (this.player.hipRating >= 15 && this.player.hipRating < 20)
                        this.outputText(" that make it look like you've birthed many children, and", false);
                    if (this.player.hipRating >= 20)
                        this.outputText(" that make you look more like an animal waiting to be bred than any kind of human, and", false);
                }
                else {
                    if (this.player.hipRating >= 6 && this.player.hipRating < 10)
                        this.outputText(" that give you a graceful stride, and", false);
                    if (this.player.hipRating >= 10 && this.player.hipRating < 15)
                        this.outputText(" that add a little feminine swing to your gait, and", false);
                    if (this.player.hipRating >= 15 && this.player.hipRating < 20)
                        this.outputText(" that force you to sway and wiggle as you move, and", false);
                    if (this.player.hipRating >= 20) {
                        this.outputText(" that give your ", false);
                        if (this.player.balls > 0)
                            this.outputText("balls plenty of room to breathe", false);
                        else if (this.player.hasCock())
                            this.outputText(this.player.multiCockDescript() + " plenty of room to swing", false);
                        else if (this.player.hasVagina())
                            this.outputText(this.vaginaDescript() + " a nice, wide berth", false);
                        else this.outputText("vacant groin plenty of room", false);
                        this.outputText(", and", false);
                    }
                }
            }
        }
        //ASS
        //Horse version
        if (this.player.isTaur()) {
            //FATBUTT
            if (this.player.tone < 65) {
                this.outputText("  Your " + this.buttDescript(), false);
                if (this.player.buttRating < 4)
                    this.outputText(" is lean, from what you can see of it.", false);
                if (this.player.buttRating >= 4 && this.player.buttRating < 6)
                    this.outputText(" looks fairly average.", false);
                if (this.player.buttRating >= 6 && this.player.buttRating < 10)
                    this.outputText(" is fairly plump and healthy.", false);
                if (this.player.buttRating >= 10 && this.player.buttRating < 15)
                    this.outputText(" jiggles a bit as you trot around.", false);
                if (this.player.buttRating >= 15 && this.player.buttRating < 20)
                    this.outputText(" jiggles and wobbles as you trot about.", false);
                if (this.player.buttRating >= 20)
                    this.outputText(" is obscenely large, bordering freakish, even for a horse.", false);
            }
            //GIRL LOOK AT DAT BOOTY
            else {
                this.outputText("  Your " + this.buttDescript(), false);
                if (this.player.buttRating < 4)
                    this.outputText(" is barely noticable, showing off the muscles of your haunches.", false);
                if (this.player.buttRating >= 4 && this.player.buttRating < 6)
                    this.outputText(" matches your toned equine frame quite well.", false);
                if (this.player.buttRating >= 6 && this.player.buttRating < 10)
                    this.outputText(" gives hints of just how much muscle you could put into a kick.", false);
                if (this.player.buttRating >= 10 && this.player.buttRating < 15)
                    this.outputText(" surges with muscle whenever you trot about.", false);
                if (this.player.buttRating >= 15 && this.player.buttRating < 20)
                    this.outputText(" flexes its considerable mass as you move.", false);
                if (this.player.buttRating >= 20)
                    this.outputText(" is stacked with layers of muscle, huge even for a horse.", false);
            }
        }
        //Non-horse PCs
        else {
            //TUBBY ASS
            if (this.player.tone < 60) {
                this.outputText(" your " + this.buttDescript(), false);
                if (this.player.buttRating < 4)
                    this.outputText(" looks great under your gear.", false);
                if (this.player.buttRating >= 4 && this.player.buttRating < 6)
                    this.outputText(" has the barest amount of sexy jiggle.", false);
                if (this.player.buttRating >= 6 && this.player.buttRating < 10)
                    this.outputText(" fills out your clothing nicely.", false);
                if (this.player.buttRating >= 10 && this.player.buttRating < 15)
                    this.outputText(" wobbles enticingly with every step.", false);
                if (this.player.buttRating >= 15 && this.player.buttRating < 20)
                    this.outputText(" wobbles like a bowl full of jello as you walk.", false);
                if (this.player.buttRating >= 20)
                    this.outputText(" is obscenely large, bordering freakish, and makes it difficult to run.", false);
            }
            //FITBUTT
            else {
                this.outputText(" your " + this.buttDescript(), false);
                if (this.player.buttRating < 4)
                    this.outputText(" molds closely against your form.", false);
                if (this.player.buttRating >= 4 && this.player.buttRating < 6)
                    this.outputText(" contracts with every motion, displaying the detailed curves of its lean musculature.", false);
                if (this.player.buttRating >= 6 && this.player.buttRating < 10)
                    this.outputText(" fills out your clothing nicely.", false);
                if (this.player.buttRating >= 10 && this.player.buttRating < 15)
                    this.outputText(" stretches your gear, flexing it with each step.", false);
                if (this.player.buttRating >= 15 && this.player.buttRating < 20)
                    this.outputText(" threatens to bust out from under your kit each time you clench it.", false);
                if (this.player.buttRating >= 20)
                    this.outputText(" is marvelously large, but completely stacked with muscle.", false);
            }
        }
        //TAILS
        if (this.player.tailType == CoC.TAIL_TYPE_HORSE)
            this.outputText("  A long " + this.player.hairColor + " horsetail hangs from your " + this.buttDescript() + ", smooth and shiny.", false);
        if (this.player.tailType == CoC.TAIL_TYPE_FERRET)
            this.outputText("  A long ferret tail sprouts from above your [butt].  It is thin, tapered, and covered in shaggy " + this.player.hairColor + " fur.", false);
        if (this.player.tailType == CoC.TAIL_TYPE_DOG)
            this.outputText("  A fuzzy " + this.player.hairColor + " dogtail sprouts just above your " + this.buttDescript() + ", wagging to and fro whenever you are happy.", false);
        if (this.player.tailType == CoC.TAIL_TYPE_DEMONIC)
            this.outputText("  A narrow tail ending in a spaded tip curls down from your " + this.buttDescript() + ", wrapping around your " + this.player.leg() + " sensually at every opportunity.", false);
        if (this.player.tailType == CoC.TAIL_TYPE_COW)
            this.outputText("  A long cowtail with a puffy tip swishes back and forth as if swatting at flies.", false);
        if (this.player.tailType == CoC.TAIL_TYPE_SPIDER_ADBOMEN) {
            this.outputText("  A large, spherical spider-abdomen has grown out from your backside, covered in shiny black chitin.  Though it's heavy and bobs with every motion, it doesn't seem to slow you down.", false);
            if (this.player.tailVenom > 50 && this.player.tailVenom < 80)
                this.outputText("  Your bulging arachnid posterior feels fairly full of webbing.", false);
            if (this.player.tailVenom >= 80 && this.player.tailVenom < 100)
                this.outputText("  Your arachnid rear bulges and feels very full of webbing.", false);
            if (this.player.tailVenom == 100)
                this.outputText("  Your swollen spider-butt is distended with the sheer amount of webbing it's holding.", false);
        }
        if (this.player.tailType == CoC.TAIL_TYPE_BEE_ABDOMEN) {
            this.outputText("  A large insectile bee-abdomen dangles from just above your backside, bobbing with its own weight as you shift.  It is covered in hard chitin with black and yellow stripes, and tipped with a dagger-like stinger.", false);
            if (this.player.tailVenom > 50 && this.player.tailVenom < 80)
                this.outputText("  A single drop of poison hangs from your exposed stinger.", false);
            if (this.player.tailVenom >= 80 && this.player.tailVenom < 100)
                this.outputText("  Poisonous bee venom coats your stinger completely.", false);
            if (this.player.tailVenom == 100)
                this.outputText("  Venom drips from your poisoned stinger regularly.", false);
        }
        if (this.player.tailType == CoC.TAIL_TYPE_SHARK) {
            this.outputText("  A long shark-tail trails down from your backside, swaying to and fro while giving you a dangerous air.", false);
        }
        if (this.player.tailType == CoC.TAIL_TYPE_CAT) {
            this.outputText("  A soft " + this.player.hairColor + " cat-tail sprouts just above your " + this.buttDescript() + ", curling and twisting with every step to maintain perfect balance.", false);
        }
        if (this.player.tailType == CoC.TAIL_TYPE_LIZARD) {
            this.outputText("  A tapered tail hangs down from just above your " + this.assDescript() + ".  It sways back and forth, assisting you with keeping your balance.", false);
        }
        if (this.player.tailType == CoC.TAIL_TYPE_RABBIT)
            this.outputText("  A short, soft bunny tail sprouts just above your " + this.assDescript() + ", twitching constantly whenever you don't think about it.", false);
        else if (this.player.tailType == CoC.TAIL_TYPE_HARPY)
            this.outputText("  A tail of feathers fans out from just above your " + this.assDescript() + ", twitching instinctively to help guide you if you were to take flight.", false);
        else if (this.player.tailType == CoC.TAIL_TYPE_KANGAROO) {
            this.outputText("  A conical, ", false);
            if (this.player.skinType == CoC.SKIN_TYPE_GOO)
                this.outputText("gooey, " + this.player.skinTone, false);
            else this.outputText("furry, " + this.player.hairColor, false);
            this.outputText(", tail extends from your " + this.assDescript() + ", bouncing up and down as you move and helping to counterbalance you.", false);
        }
        else if (this.player.tailType == CoC.TAIL_TYPE_FOX) {
            if (this.player.tailVenom == 1)
                this.outputText("  A swishing " + this.player.hairColor + " fox's brush extends from your " + this.assDescript() + ", curling around your body - the soft fur feels lovely.");
            else this.outputText("  " + this.Num2Text(this.player.tailVenom) + " swishing " + this.player.hairColor + " fox's tails extend from your " + this.assDescript() + ", curling around your body - the soft fur feels lovely.");
        }
        else if (this.player.tailType == CoC.TAIL_TYPE_DRACONIC) {
            this.outputText("  A thin, scaly, prehensile reptilian tail, almost as long as you are tall, swings behind you like a living bullwhip.  Its tip menaces with spikes of bone, meant to deliver painful blows.");
        }
        //appearance
        else if (this.player.tailType == CoC.TAIL_TYPE_RACCOON) {
            this.outputText("  A black-and-" + this.player.hairColor + "-ringed raccoon tail waves behind you.");
        }
        else if (this.player.tailType == CoC.TAIL_TYPE_MOUSE) {
            //appearance
            this.outputText("  A naked, " + this.player.skinTone + " mouse tail pokes from your butt, dragging on the ground and twitching occasionally.");
        }
        //LOWERBODY SPECIAL
        if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_HUMAN)
            this.outputText("  Two normal human legs grow down from your waist, ending in normal human feet.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_FERRET) this.outputText("  Two furry, digitigrade legs form below your [hips].  The fur is thinner on the feet, and your toes are tipped with claws.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_HOOFED)
            this.outputText("  Your legs are muscled and jointed oddly, covered in fur, and end in a pair of bestial hooves.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_DOG)
            this.outputText("  Two digitigrade legs grow downwards from your waist, ending in dog-like hind-paws.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_NAGA)
            this.outputText("  Below your waist your flesh is fused together into a very long snake-like tail.", false);
        //Horse body is placed higher for readability purposes
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS)
            this.outputText("  Your perfect lissome legs end in mostly human feet, apart from the horn protruding straight down from the heel that forces you to walk with a sexy, swaying gait.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_DEMONIC_CLAWS)
            this.outputText("  Your lithe legs are capped with flexible clawed feet.  Sharp black nails grow where once you had toe-nails, giving you fantastic grip.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_BEE)
            this.outputText("  Your legs are covered in a shimmering insectile carapace up to mid-thigh, looking more like a pair of 'fuck-me-boots' than exoskeleton.  A bit of downy yellow and black fur fuzzes your upper thighs, just like a bee.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_GOO)
            this.outputText("  In place of legs you have a shifting amorphous blob.  Thankfully it's quite easy to propel yourself around on.  The lowest portions of your " + this.player.armorName + " float around inside you, bringing you no discomfort.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_CAT)
            this.outputText("  Two digitigrade legs grow downwards from your waist, ending in soft, padded cat-paws.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_LIZARD)
            this.outputText("  Two digitigrade legs grow down from your " + this.hipDescript() + ", ending in clawed feet.  There are three long toes on the front, and a small hind-claw on the back.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_BUNNY)
            this.outputText("  Your legs thicken below the waist as they turn into soft-furred rabbit-like legs.  You even have large bunny feet that make hopping around a little easier than walking.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_HARPY)
            this.outputText("  Your legs are covered with " + this.player.hairColor + " plumage.  Thankfully the thick, powerful thighs are perfect for launching you into the air, and your feet remain mostly human, even if they are two-toed and tipped with talons.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_KANGAROO)
            this.outputText("  Your furry legs have short thighs and long calves, with even longer feet ending in prominently-nailed toes.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS)
            this.outputText("  Your legs are covered in a reflective black, insectile carapace up to your mid-thigh, looking more like a pair of 'fuck-me-boots' than exoskeleton.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_DRIDER_LOWER_BODY)
            this.outputText("  Where your legs would normally start you have grown the body of a spider, with eight spindly legs that sprout from its sides.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_FOX)
            this.outputText("  Your legs are crooked into high knees with hocks and long feet, like those of a fox; cute bulbous toes decorate the ends.");
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_DRAGON)
            this.outputText("  Two human-like legs grow down from your " + this.hipDescript() + ", sheathed in scales and ending in clawed feet.  There are three long toes on the front, and a small hind-claw on the back.", false);
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_RACCOON)
            this.outputText("  Your legs, though covered in fur, are humanlike.  Long feet on the ends bear equally long toes, and the pads on the bottoms are quite sensitive to the touch.");
        if (this.player.findPerk(PerkLib.Incorporeality) >= 0)
            this.outputText("  Of course, your " + this.player.legs() + " are partially transparent due to their ghostly nature.", false);

        this.outputText("\n", false);
        if (this.player.findStatusAffect(StatusAffects.GooStuffed) >= 0) {
            this.outputText("\n<b>Your gravid-looking belly is absolutely stuffed full of goo. There's no way you can get pregnant like this, but at the same time, you look like some fat-bellied breeder.</b>\n");
        }
        //Pregnancy Shiiiiiitz
        if ((this.player.buttPregnancyType == PregnancyStore.PREGNANCY_FROG_GIRL) || (this.player.buttPregnancyType == PregnancyStore.PREGNANCY_SATYR) || this.player.isPregnant()) {
            if (this.player.pregnancyType == PregnancyStore.PREGNANCY_OVIELIXIR_EGGS) {
                this.outputText("<b>", false);
                //Compute size
                temp = this.player.statusAffectv3(StatusAffects.Eggs) + this.player.statusAffectv2(StatusAffects.Eggs) * 10;
                if (this.player.pregnancyIncubation <= 50 && this.player.pregnancyIncubation > 20) {
                    this.outputText("Your swollen pregnant belly is as large as a ", false);
                    if (temp < 10)
                        this.outputText("basketball.", false);
                    if (temp >= 10 && temp < 20)
                        this.outputText("watermelon.", false);
                    if (temp >= 20)
                        this.outputText("beach ball.", false);
                }
                if (this.player.pregnancyIncubation <= 20) {
                    this.outputText("Your swollen pregnant belly is as large as a ", false);
                    if (temp < 10)
                        this.outputText("watermelon.", false);
                    if (temp >= 10 && temp < 20)
                        this.outputText("beach ball.", false);
                    if (temp >= 20)
                        this.outputText("large medicine ball.", false);
                }
                this.outputText("</b>", false);
                temp = 0;
            }
            //Satur preggos - only shows if bigger than regular pregnancy or not pregnancy
            else if (this.player.buttPregnancyType == PregnancyStore.PREGNANCY_SATYR && this.player.buttPregnancyIncubation > this.player.pregnancyIncubation) {
                if (this.player.buttPregnancyIncubation < 125 && this.player.buttPregnancyIncubation >= 75) {
                    this.outputText("<b>You've got the begginings of a small pot-belly.</b>", false);
                }
                else if (this.player.buttPregnancyIncubation >= 50) {
                    this.outputText("<b>The unmistakable bulge of pregnancy is visible in your tummy, yet it feels odd inside you - wrong somehow.</b>", false);
                }
                else if (this.player.buttPregnancyIncubation >= 30) {
                    this.outputText("<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>", false);
                }
                else { //Surely Benoit and Cotton deserve their place in this list
                    if (this.player.pregnancyType == PregnancyStore.PREGNANCY_IZMA || this.player.pregnancyType == PregnancyStore.PREGNANCY_MOUSE || this.player.pregnancyType == PregnancyStore.PREGNANCY_AMILY || this.player.pregnancyType == PregnancyStore.PREGNANCY_EMBER || this.player.pregnancyType == PregnancyStore.PREGNANCY_BENOIT || this.player.pregnancyType == PregnancyStore.PREGNANCY_COTTON || this.player.pregnancyType == PregnancyStore.PREGNANCY_URTA)
                        this.outputText("\n<b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>", false);
                    else if (this.player.pregnancyType != PregnancyStore.PREGNANCY_MARBLE)
                        this.outputText("\n<b>Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.</b>", false);
                    else this.outputText("\n<b>Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.</b>", false);
                }
            }
            //URTA PREG
            else if (this.player.pregnancyType == PregnancyStore.PREGNANCY_URTA) {
                if (this.player.pregnancyIncubation <= 432 && this.player.pregnancyIncubation > 360) {
                    this.outputText("<b>Your belly is larger than it used to be.</b>\n", false);
                }
                if (this.player.pregnancyIncubation <= 360 && this.player.pregnancyIncubation > 288) {
                    this.outputText("<b>Your belly is more noticably distended.   You're pretty sure it's Urta's.</b>", false);
                }
                if (this.player.pregnancyIncubation <= 288 && this.player.pregnancyIncubation > 216) {
                    this.outputText("<b>The unmistakable bulge of pregnancy is visible in your tummy, and the baby within is kicking nowadays.</b>", false);
                }
                if (this.player.pregnancyIncubation <= 216 && this.player.pregnancyIncubation > 144) {
                    this.outputText("<b>Your belly is large and very obviously pregnant to anyone who looks at you.  It's gotten heavy enough to be a pain to carry around all the time.</b>", false);
                }
                if (this.player.pregnancyIncubation <= 144 && this.player.pregnancyIncubation > 72) {
                    this.outputText("<b>It would be impossible to conceal your growing pregnancy from anyone who glanced your way.  It's large and round, frequently moving.</b>", false);
                }
                if (this.player.pregnancyIncubation <= 72 && this.player.pregnancyIncubation > 48) {
                    this.outputText("<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>", false);
                }
                if (this.player.pregnancyIncubation <= 48) {
                    this.outputText("\n<b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>", false);
                }
            }
            else if (this.player.buttPregnancyType == PregnancyStore.PREGNANCY_FROG_GIRL) {
                if (this.player.buttPregnancyIncubation >= 8)
                    this.outputText("<b>Your stomach is so full of frog eggs that you look about to birth at any moment, your belly wobbling and shaking with every step you take, packed with frog ovum.</b>");
                else this.outputText("<b>You're stuffed so full with eggs that your belly looks obscenely distended, huge and weighted with the gargantuan eggs crowding your gut. They make your gait a waddle and your gravid tummy wobble obscenely.</b>");
            }
            else if (this.player.pregnancyType == PregnancyStore.PREGNANCY_FAERIE) { //Belly size remains constant throughout the pregnancy
                this.outputText("<b>Your belly remains swollen like a watermelon. ");
                if (this.player.pregnancyIncubation <= 100)
                    this.outputText("It's full of liquid, though unlike a normal pregnancy the passenger you’re carrying is tiny.</b>");
                else if (this.player.pregnancyIncubation <= 140)
                    this.outputText("It feels like it’s full of thick syrup or jelly.</b>");
                else this.outputText("It still feels like there’s a solid ball inside your womb.</b>");
            }
            else {
                if (this.player.pregnancyIncubation <= 336 && this.player.pregnancyIncubation > 280) {
                    this.outputText("<b>Your belly is larger than it used to be.</b>", false);
                }
                if (this.player.pregnancyIncubation <= 280 && this.player.pregnancyIncubation > 216) {
                    this.outputText("<b>Your belly is more noticably distended.   You are probably pregnant.</b>", false);
                }
                if (this.player.pregnancyIncubation <= 216 && this.player.pregnancyIncubation > 180) {
                    this.outputText("<b>The unmistakable bulge of pregnancy is visible in your tummy.</b>", false);
                }
                if (this.player.pregnancyIncubation <= 180 && this.player.pregnancyIncubation > 120) {
                    this.outputText("<b>Your belly is very obviously pregnant to anyone who looks at you.</b>", false);
                }
                if (this.player.pregnancyIncubation <= 120 && this.player.pregnancyIncubation > 72) {
                    this.outputText("<b>It would be impossible to conceal your growing pregnancy from anyone who glanced your way.</b>", false);
                }
                if (this.player.pregnancyIncubation <= 72 && this.player.pregnancyIncubation > 48) {
                    this.outputText("<b>Your stomach is painfully distended by your pregnancy, making it difficult to walk normally.</b>", false);
                }
                if (this.player.pregnancyIncubation <= 48) { //Surely Benoit and Cotton deserve their place in this list
                    if (this.player.pregnancyType == PregnancyStore.PREGNANCY_IZMA || this.player.pregnancyType == PregnancyStore.PREGNANCY_MOUSE || this.player.pregnancyType == PregnancyStore.PREGNANCY_AMILY || this.player.pregnancyType == PregnancyStore.PREGNANCY_EMBER || this.player.pregnancyType == PregnancyStore.PREGNANCY_BENOIT || this.player.pregnancyType == PregnancyStore.PREGNANCY_COTTON || this.player.pregnancyType == PregnancyStore.PREGNANCY_URTA)
                        this.outputText("\n<b>Your belly protrudes unnaturally far forward, bulging with the spawn of one of this land's natives.</b>", false);
                    else if (this.player.pregnancyType != PregnancyStore.PREGNANCY_MARBLE)
                        this.outputText("\n<b>Your belly protrudes unnaturally far forward, bulging with the unclean spawn of some monster or beast.</b>", false);
                    else this.outputText("\n<b>Your belly protrudes unnaturally far forward, bulging outwards with Marble's precious child.</b>", false);
                }
            }
            this.outputText("\n", false);
        }
        this.outputText("\n", false);
        if (this.player.gills)
            this.outputText("A pair of feathery gills are growing out just below your neck, spreading out horizontally and draping down your chest.  They allow you to stay in the water for quite a long time.  ", false);
        //Chesticles..I mean bewbz.
        if (this.player.breastRows.length == 1) {
            this.outputText("You have " + this.num2Text(this.player.breastRows[temp].breasts) + " " + this.breastDescript(temp) + ", each supporting ", false);
            if (this.player.breastRows[0].nipplesPerBreast == 1)
                this.outputText(this.num2Text(this.player.breastRows[temp].nipplesPerBreast) + " " + Math.floor(this.player.nippleLength * 10) / 10 + "-inch " + this.nippleDescript(temp) + ".", false);
            else this.outputText(this.num2Text(this.player.breastRows[temp].nipplesPerBreast) + " " + Math.floor(this.player.nippleLength * 10) / 10 + "-inch " + this.nippleDescript(temp) + "s.", false);
            if (this.player.breastRows[0].milkFullness > 75)
                this.outputText("  Your " + this.breastDescript(temp) + " are painful and sensitive from being so stuffed with milk.  You should release the pressure soon.", false);
            if (this.player.breastRows[0].breastRating >= 1)
                this.outputText("  You could easily fill a " + this.player.breastCup(temp) + " bra.", false);
            //Done with tits.  Move on.
            this.outputText("\n", false);
        }
        //many rows
        else {
            this.outputText("You have " + this.num2Text(this.player.breastRows.length) + " rows of breasts, the topmost pair starting at your chest.\n", false);
            while (temp < this.player.breastRows.length) {
                if (temp == 0)
                    this.outputText("--Your uppermost rack houses ", false);
                if (temp == 1)
                    this.outputText("\n--The second row holds ", false);
                if (temp == 2)
                    this.outputText("\n--Your third row of breasts contains ", false);
                if (temp == 3)
                    this.outputText("\n--Your fourth set of tits cradles ", false);
                if (temp == 4)
                    this.outputText("\n--Your fifth and final mammory grouping swells with ", false);
                this.outputText(this.num2Text(this.player.breastRows[temp].breasts) + " " + this.breastDescript(temp) + " with ", false);
                if (this.player.breastRows[temp].nipplesPerBreast == 1)
                    this.outputText(this.num2Text(this.player.breastRows[temp].nipplesPerBreast) + " " + Math.floor(this.player.nippleLength * 10) / 10 + "-inch " + this.nippleDescript(temp) + " each.", false);
                else this.outputText(this.num2Text(this.player.breastRows[temp].nipplesPerBreast) + " " + Math.floor(this.player.nippleLength * 10) / 10 + "-inch " + this.nippleDescript(temp) + "s each.", false);
                if (this.player.breastRows[temp].breastRating >= 1)
                    this.outputText("  They could easily fill a " + this.player.breastCup(temp) + " bra.", false);
                if (this.player.breastRows[temp].milkFullness > 75)
                    this.outputText("  Your " + this.breastDescript(temp) + " are painful and sensitive from being so stuffed with milk.  You should release the pressure soon.", false);
                temp++;
            }
            //Done with tits.  Move on.
            this.outputText("\n", false);
        }
        //Crotchial stuff - mention snake
        if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_NAGA && this.player.gender > 0) {
            this.outputText("\nYour sex", false);
            if (this.player.gender == 3 || this.player.totalCocks() > 1)
                this.outputText("es are ", false);
            else this.outputText(" is ", false);
            this.outputText("concealed within a cavity in your tail when not in use, though when the need arises, you can part your concealing slit and reveal your true self.\n", false);
        }
        //Cock stuff!
        temp = 0;
        if (this.player.cocks.length == 1) {
            if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_CENTAUR)
                this.outputText("\nEver since becoming a centaur, your equipment has shifted to lie between your rear legs, like a horse.", false);
            this.outputText("\nYour " + this.player.cockDescript(temp) + " is " + Math.floor(10 * this.player.cocks[temp].cockLength) / 10 + " inches long and ", false);
            if (Math.round(10 * this.player.cocks[temp].cockThickness) / 10 < 2) {
                if (Math.round(10 * this.player.cocks[temp].cockThickness) / 10 == 1)
                    this.outputText(Math.floor(10 * this.player.cocks[temp].cockThickness) / 10 + " inch thick.", false);
                else this.outputText(Math.round(10 * this.player.cocks[temp].cockThickness) / 10 + " inches thick.", false);
            }
            else this.outputText(this.num2Text(Math.round(10 * this.player.cocks[temp].cockThickness) / 10) + " inches wide.", false);
            //Horsecock flavor
            if (this.player.cocks[temp].cockType == CockTypesEnum.HORSE) {
                this.outputText("  It's mottled black and brown in a very animalistic pattern.  The 'head' of your shaft flares proudly, just like a horse's.", false);
            }
            //dog cock flavor
            if (((this.player.cocks[temp].cockType == CockTypesEnum.DOG) || (this.player.cocks[temp].cockType == CockTypesEnum.FOX)) || (this.player.cocks[temp].cockType == CockTypesEnum.FOX)) {
                if (this.player.cocks[temp].knotMultiplier >= 1.8)
                    this.outputText("  The obscenely swollen lump of flesh near the base of your " + this.player.cockDescript(temp) + " looks almost too big for your cock.", false);
                else if (this.player.cocks[temp].knotMultiplier >= 1.4)
                    this.outputText("  A large bulge of flesh nestles just above the bottom of your " + this.player.cockDescript(temp) + ", to ensure it stays where it belongs during mating.", false);
                else if (this.player.cocks[temp].knotMultiplier > 1)
                    this.outputText("  A small knot of thicker flesh is near the base of your " + this.player.cockDescript(temp) + ", ready to expand to help you lodge it inside a female.", false);
                //List thickness
                this.outputText("  The knot is " + Math.round(this.player.cocks[temp].cockThickness * this.player.cocks[temp].knotMultiplier * 10) / 10 + " inches wide when at full size.", false);
            }
            //Demon cock flavor
            if (this.player.cocks[temp].cockType == CockTypesEnum.DEMON) {
                this.outputText("  The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused.  The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.", false);
            }
            //Tentacle cock flavor
            if (this.player.cocks[temp].cockType == CockTypesEnum.TENTACLE) {
                this.outputText("  The entirety of its green surface is covered in perspiring beads of slick moisture.  It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.", false);
            }
            //Cat cock flavor
            if (this.player.cocks[temp].cockType == CockTypesEnum.CAT) {
                this.outputText("  It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip.  Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.", false);
            }
            //Snake cock flavor
            if (this.player.cocks[temp].cockType == CockTypesEnum.LIZARD) {
                this.outputText("  It's a deep, iridescent purple in color.  Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.", false);
            }
            //Anemone cock flavor
            if (this.player.cocks[temp].cockType == CockTypesEnum.ANEMONE) {
                this.outputText("  The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload.  At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.", false);
            }
            //Kangawang flavor
            if (this.player.cocks[temp].cockType == CockTypesEnum.KANGAROO) {
                this.outputText("  It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.", false);
            }
            //Draconic Cawk Flava flav
            if (this.player.cocks[temp].cockType == CockTypesEnum.DRAGON) {
                this.outputText("  With its tapered tip, there are few holes you wouldn't be able to get into.  It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.");
            }
            if (this.player.cocks[temp].cockType == CockTypesEnum.BEE) {
                this.outputText("  It's a long, smooth black shaft that's rigid to the touch.  Its base is ringed with a layer of four inch long soft bee hair.  The tip has a much finer layer of short yellow hairs.  The tip is very sensitive, and it hurts constantly if you don’t have bee honey on it.");
            }
            //Worm flavor
            if (this.player.findStatusAffect(StatusAffects.Infested) >= 0)
                this.outputText("  Every now and again a slimy worm coated in spunk slips partway out of your " + this.player.cockDescript(0) + ", tasting the air like a snake's tongue.", false);
            if (this.player.cocks[temp].sock)
                this.sockDescript(temp);
            //DONE WITH COCKS, moving on!
            this.outputText("\n", false);
        }
        if (this.player.cocks.length > 1) {
            temp = 0;
            rando = this.rand(4);
            if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_CENTAUR)
                this.outputText("\nWhere a horse's penis would usually be located, you have instead grown " + this.player.multiCockDescript() + "!\n", false);
            else this.outputText("\nWhere a penis would normally be located, you have instead grown " + this.player.multiCockDescript() + "!\n", false);
            while (temp < this.player.cocks.length) {

                //middle cock description
                if (rando == 0) {
                    if (temp == 0) this.outputText("--Your first ", false);
                    else this.outputText("--Your next ", false);
                    this.outputText(this.player.cockDescript(temp), false);
                    this.outputText(" is ", false);
                    this.outputText(Math.floor(10 * this.player.cocks[temp].cockLength) / 10 + " inches long and ", false);
                    if (Math.floor(this.player.cocks[temp].cockThickness) >= 2)
                        this.outputText(this.num2Text(Math.round(this.player.cocks[temp].cockThickness * 10) / 10) + " inches wide.", false);
                    else {
                        if (this.player.cocks[temp].cockThickness == 1)
                            this.outputText("one inch wide.", false);
                        else this.outputText(Math.round(this.player.cocks[temp].cockThickness * 10) / 10 + " inches wide.", false);
                    }
                }
                if (rando == 1) {
                    this.outputText("--One of your ", false);
                    this.outputText(this.player.cockDescript(temp) + "s is " + Math.round(10 * this.player.cocks[temp].cockLength) / 10 + " inches long and ", false);
                    if (Math.floor(this.player.cocks[temp].cockThickness) >= 2)
                        this.outputText(this.num2Text(Math.round(this.player.cocks[temp].cockThickness * 10) / 10) + " inches thick.", false);
                    else {
                        if (this.player.cocks[temp].cockThickness == 1)
                            this.outputText("one inch thick.", false);
                        else this.outputText(Math.round(this.player.cocks[temp].cockThickness * 10) / 10 + " inches thick.", false);
                    }
                }
                if (rando == 2) {
                    if (temp > 0)
                        this.outputText("--Another of your ", false);
                    else this.outputText("--One of your ", false);
                    this.outputText(this.player.cockDescript(temp) + "s is " + Math.round(10 * this.player.cocks[temp].cockLength) / 10 + " inches long and ", false);
                    if (Math.floor(this.player.cocks[temp].cockThickness) >= 2)
                        this.outputText(this.num2Text(Math.round(this.player.cocks[temp].cockThickness * 10) / 10) + " inches thick.", false);
                    else {
                        if (this.player.cocks[temp].cockThickness == 1)
                            this.outputText("one inch thick.", false);
                        else this.outputText(Math.round(this.player.cocks[temp].cockThickness * 10) / 10 + " inches thick.", false);
                    }
                }
                if (rando == 3) {
                    if (temp > 0)
                        this.outputText("--Your next ", false);
                    else this.outputText("--Your first ", false);
                    this.outputText(this.player.cockDescript(temp) + " is " + Math.round(10 * this.player.cocks[temp].cockLength) / 10 + " inches long and ", false);
                    if (Math.floor(this.player.cocks[temp].cockThickness) >= 2)
                        this.outputText(this.num2Text(Math.round(this.player.cocks[temp].cockThickness * 10) / 10) + " inches in diameter.", false);
                    else {
                        if (Math.round(this.player.cocks[temp].cockThickness * 10) / 10 == 1)
                            this.outputText("one inch in diameter.", false);
                        else this.outputText(Math.round(this.player.cocks[temp].cockThickness * 10) / 10 + " inches in diameter.", false);
                    }
                }
                //horse cock flavor
                if (this.player.cocks[temp].cockType == CockTypesEnum.HORSE) {
                    this.outputText("  It's mottled black and brown in a very animalistic pattern.  The 'head' of your " + this.player.cockDescript(temp) + " flares proudly, just like a horse's.", false);
                }
                //dog cock flavor
                if ((this.player.cocks[temp].cockType == CockTypesEnum.DOG) || (this.player.cocks[temp].cockType == CockTypesEnum.FOX)) {
                    this.outputText("  It is shiny, pointed, and covered in veins, just like a large ");
                    if (this.player.cocks[temp].cockType == CockTypesEnum.DOG)
                        this.outputText("dog's cock.");
                    else
                        this.outputText("fox's cock.");

                    if (this.player.cocks[temp].knotMultiplier >= 1.8)
                        this.outputText("  The obscenely swollen lump of flesh near the base of your " + this.player.cockDescript(temp) + " looks almost comically mismatched for your " + this.player.cockDescript(temp) + ".", false);
                    else if (this.player.cocks[temp].knotMultiplier >= 1.4)
                        this.outputText("  A large bulge of flesh nestles just above the bottom of your " + this.player.cockDescript(temp) + ", to ensure it stays where it belongs during mating.", false);
                    else if (this.player.cocks[temp].knotMultiplier > 1)
                        this.outputText("  A small knot of thicker flesh is near the base of your " + this.player.cockDescript(temp) + ", ready to expand to help you lodge your " + this.player.cockDescript(temp) + " inside a female.", false);
                    //List knot thickness
                    this.outputText("  The knot is " + Math.floor(this.player.cocks[temp].cockThickness * this.player.cocks[temp].knotMultiplier * 10) / 10 + " inches thick when at full size.", false);
                }
                //Demon cock flavor
                if (this.player.cocks[temp].cockType == CockTypesEnum.DEMON) {
                    this.outputText("  The crown is ringed with a circle of rubbery protrusions that grow larger as you get more aroused.  The entire thing is shiny and covered with tiny, sensitive nodules that leave no doubt about its demonic origins.", false);
                }
                //Tentacle cock flavor
                if (this.player.cocks[temp].cockType == CockTypesEnum.TENTACLE) {
                    this.outputText("  The entirety of its green surface is covered in perspiring beads of slick moisture.  It frequently shifts and moves of its own volition, the slightly oversized and mushroom-like head shifting in coloration to purplish-red whenever you become aroused.", false);
                }
                //Cat cock flavor
                if (this.player.cocks[temp].cockType == CockTypesEnum.CAT) {
                    this.outputText("  It ends in a single point, much like a spike, and is covered in small, fleshy barbs. The barbs are larger at the base and shrink in size as they get closer to the tip.  Each of the spines is soft and flexible, and shouldn't be painful for any of your partners.", false);
                }
                //Snake cock flavor
                if (this.player.cocks[temp].cockType == CockTypesEnum.LIZARD) {
                    this.outputText("  It's a deep, iridescent purple in color.  Unlike a human penis, the shaft is not smooth, and is instead patterned with multiple bulbous bumps.", false);
                }
                //Anemone cock flavor
                if (this.player.cocks[temp].cockType == CockTypesEnum.ANEMONE) {
                    this.outputText("  The crown is surrounded by tiny tentacles with a venomous, aphrodisiac payload.  At its base a number of similar, longer tentacles have formed, guaranteeing that pleasure will be forced upon your partners.", false);
                }
                //Kangwang flavor
                if (this.player.cocks[temp].cockType == CockTypesEnum.KANGAROO) {
                    this.outputText("  It usually lies coiled inside a sheath, but undulates gently and tapers to a point when erect, somewhat like a taproot.", false);
                }
                //Draconic Cawk Flava flav
                if (this.player.cocks[temp].cockType == CockTypesEnum.DRAGON) {
                    this.outputText("  With its tapered tip, there are few holes you wouldn't be able to get into.  It has a strange, knot-like bulb at its base, but doesn't usually flare during arousal as a dog's knot would.");
                }
                if (this.player.cocks[temp].sock != "" && this.player.cocks[temp].sock != undefined)	// I dunno what was happening, but it looks like .sock is undefined, as it doesn't exist. I guess this is probably more left over from some of the restucturing.
                {																		// Anyways, check against undefined values, and stuff works again.
                    trace("Found a sock description (WTF even is a sock?)", this.player.cocks[temp].sock);
                    this.sockDescript(temp);
                }
                temp++;
                rando++;
                this.outputText("\n", false);
                if (rando > 3) rando = 0;
            }
            //Worm flavor
            if (this.player.findStatusAffect(StatusAffects.Infested) >= 0)
                this.outputText("Every now and again slimy worms coated in spunk slip partway out of your " + this.player.multiCockDescriptLight() + ", tasting the air like tongues of snakes.\n", false);
            //DONE WITH COCKS, moving on!
        }
        //Of Balls and Sacks!
        if (this.player.balls > 0) {
            if (this.player.findStatusAffect(StatusAffects.Uniball) >= 0) {
                if (this.player.skinType != CoC.SKIN_TYPE_GOO)
                    this.outputText("Your [sack] clings tightly to your groin, holding " + this.ballsDescript() + " snugly against you.");
                else if (this.player.skinType == CoC.SKIN_TYPE_GOO)
                    this.outputText("Your [sack] clings tightly to your groin, dripping and holding " + this.ballsDescript() + " snugly against you.");
            }
            else if (this.player.cockTotal() == 0) {
                if (this.player.skinType == CoC.SKIN_TYPE_PLAIN)
                    this.outputText("A " + this.sackDescript() + " with " + this.ballsDescript() + " swings heavily under where a penis would normally grow.", false);
                if (this.player.skinType == CoC.SKIN_TYPE_FUR)
                    this.outputText("A fuzzy " + this.sackDescript() + " filled with " + this.ballsDescript() + " swings low under where a penis would normally grow.", false);
                if (this.player.skinType == CoC.SKIN_TYPE_SCALES)
                    this.outputText("A scaley " + this.sackDescript() + " hugs your " + this.ballsDescript() + " tightly against your body.", false);
                if (this.player.skinType == CoC.SKIN_TYPE_GOO)
                    this.outputText("An oozing, semi-solid sack with " + this.ballsDescript() + " swings heavily under where a penis would normally grow.", false);
            }
            else {
                if (this.player.skinType == CoC.SKIN_TYPE_PLAIN)
                    this.outputText("A " + this.sackDescript() + " with " + this.ballsDescript() + " swings heavily beneath your " + this.player.multiCockDescriptLight() + ".", false);
                if (this.player.skinType == CoC.SKIN_TYPE_FUR)
                    this.outputText("A fuzzy " + this.sackDescript() + " filled with " + this.ballsDescript() + " swings low under your " + this.player.multiCockDescriptLight() + ".", false);
                if (this.player.skinType == CoC.SKIN_TYPE_SCALES)
                    this.outputText("A scaley " + this.sackDescript() + " hugs your " + this.ballsDescript() + " tightly against your body.", false);
                if (this.player.skinType == CoC.SKIN_TYPE_GOO)
                    this.outputText("An oozing, semi-solid sack with " + this.ballsDescript() + " swings heavily beneath your " + this.player.multiCockDescriptLight() + ".", false);
            }
            this.outputText("  You estimate each of them to be about " + this.num2Text(Math.round(this.player.ballSize)) + " ", false);
            if (Math.round(this.player.ballSize) == 1)
                this.outputText("inch", false);
            else this.outputText("inches", false);
            this.outputText(" across.\n", false);
        }
        //VAGOOZ
        if (this.player.vaginas.length > 0) {
            if (this.player.gender == 2 && this.player.lowerBody == CoC.LOWER_BODY_TYPE_CENTAUR)
                this.outputText("\nEver since becoming a centaur, your womanly parts have shifted to lie between your rear legs, in a rather equine fashion.", false);
            this.outputText("\n", false);
            if (this.player.vaginas.length == 1)
                this.outputText("You have a " + this.vaginaDescript(0) + ", with a " + Math.floor(this.player.clitLength * 10) / 10 + "-inch clit", false);
            if (this.player.vaginas[0].virgin)
                this.outputText(" and an intact hymen", false);
            this.outputText(".  ", false);
            if (this.player.vaginas.length > 1)
                this.outputText("You have " + this.player.vaginas.length + " " + this.vaginaDescript(0) + "s, with " + Math.floor(this.player.clitLength * 10) / 10 + "-inch clits each.  ", false);
            if (this.player.lib < 50 && this.player.lust < 50) //not particularly horny

            {
                //Wetness
                if (this.player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_WET && this.player.vaginas[0].vaginalWetness < CoC.VAGINA_WETNESS_DROOLING)
                    this.outputText("Moisture gleams in ", false);
                if (this.player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_DROOLING) {
                    this.outputText("Occasional beads of ", false);
                    this.outputText("lubricant drip from ", false);
                }
                //Different description based on vag looseness
                if (this.player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_WET) {
                    if (this.player.vaginas[0].vaginalLooseness < CoC.VAGINA_LOOSENESS_LOOSE)
                        this.outputText("your " + this.vaginaDescript(0) + ". ", false);
                    if (this.player.vaginas[0].vaginalLooseness >= CoC.VAGINA_LOOSENESS_LOOSE && this.player.vaginas[0].vaginalLooseness < CoC.VAGINA_LOOSENESS_GAPING_WIDE)
                        this.outputText("your " + this.vaginaDescript(0) + ", its lips slightly parted. ", false);
                    if (this.player.vaginas[0].vaginalLooseness >= CoC.VAGINA_LOOSENESS_GAPING_WIDE)
                        this.outputText("the massive hole that is your " + this.vaginaDescript(0) + ".  ", false);
                }
            }
            if ((this.player.lib >= 50 || this.player.lust >= 50) && (this.player.lib < 80 && this.player.lust < 80)) //kinda horny

            {
                //Wetness
                if (this.player.vaginas[0].vaginalWetness < CoC.VAGINA_WETNESS_WET)
                    this.outputText("Moisture gleams in ", false);
                if (this.player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_WET && this.player.vaginas[0].vaginalWetness < CoC.VAGINA_WETNESS_DROOLING) {
                    this.outputText("Occasional beads of ", false);
                    this.outputText("lubricant drip from ", false);
                }
                if (this.player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_DROOLING) {
                    this.outputText("Thin streams of ", false);
                    this.outputText("lubricant occasionally dribble from ", false);
                }
                //Different description based on vag looseness
                if (this.player.vaginas[0].vaginalLooseness < CoC.VAGINA_LOOSENESS_LOOSE)
                    this.outputText("your " + this.vaginaDescript(0) + ". ", false);
                if (this.player.vaginas[0].vaginalLooseness >= CoC.VAGINA_LOOSENESS_LOOSE && this.player.vaginas[0].vaginalLooseness < CoC.VAGINA_LOOSENESS_GAPING_WIDE)
                    this.outputText("your " + this.vaginaDescript(0) + ", its lips slightly parted. ", false);
                if (this.player.vaginas[0].vaginalLooseness >= CoC.VAGINA_LOOSENESS_GAPING_WIDE)
                    this.outputText("the massive hole that is your " + this.vaginaDescript(0) + ".  ", false);
            }
            if ((this.player.lib > 80 || this.player.lust > 80)) //WTF horny!

            {
                //Wetness
                if (this.player.vaginas[0].vaginalWetness < CoC.VAGINA_WETNESS_WET) {
                    this.outputText("Occasional beads of ", false);
                    this.outputText("lubricant drip from ", false);
                }
                if (this.player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_WET && this.player.vaginas[0].vaginalWetness < CoC.VAGINA_WETNESS_DROOLING) {
                    this.outputText("Thin streams of ", false);
                    this.outputText("lubricant occasionally dribble from ", false);
                }
                if (this.player.vaginas[0].vaginalWetness >= CoC.VAGINA_WETNESS_DROOLING) {
                    this.outputText("Thick streams of ", false);
                    this.outputText("lubricant drool constantly from ", false);
                }
                //Different description based on vag looseness
                if (this.player.vaginas[0].vaginalLooseness < CoC.VAGINA_LOOSENESS_LOOSE)
                    this.outputText("your " + this.vaginaDescript(0) + ". ", false);
                if (this.player.vaginas[0].vaginalLooseness >= CoC.VAGINA_LOOSENESS_LOOSE && this.player.vaginas[0].vaginalLooseness < CoC.VAGINA_LOOSENESS_GAPING_WIDE)
                    this.outputText("your " + this.vaginaDescript(0) + ", its lips slightly parted. ", false);
                if (this.player.vaginas[0].vaginalLooseness >= CoC.VAGINA_LOOSENESS_GAPING_WIDE)
                    this.outputText("the massive hole that is your cunt.  ", false);
            }
            //Line Drop for next descript!
            this.outputText("\n", false);
        }
        //Genderless lovun'
        if (this.player.cockTotal() == 0 && this.player.vaginas.length == 0)
            this.outputText("\nYou have a curious lack of any sexual endowments.\n", false);


        //BUNGHOLIO
        if (this.player.ass) {
            this.outputText("\n", false);
            this.outputText("You have one " + this.assholeDescript() + ", placed between your butt-cheeks where it belongs.\n", false);
        }
        //Piercings!
        if (this.player.eyebrowPierced > 0)
            this.outputText("\nA solitary " + this.player.eyebrowPShort + " adorns your eyebrow, looking very stylish.", false);
        if (this.player.earsPierced > 0)
            this.outputText("\nYour ears are pierced with " + this.player.earsPShort + ".", false);
        if (this.player.nosePierced > 0)
            this.outputText("\nA " + this.player.nosePShort + " dangles from your nose.", false);
        if (this.player.lipPierced > 0)
            this.outputText("\nShining on your lip, a " + this.player.lipPShort + " is plainly visible.", false);
        if (this.player.tonguePierced > 0)
            this.outputText("\nThough not visible, you can plainly feel your " + this.player.tonguePShort + " secured in your tongue.", false);
        if (this.player.nipplesPierced == 3)
            this.outputText("\nYour " + this.nippleDescript(0) + "s ache and tingle with every step, as your heavy " + this.player.nipplesPShort + " swings back and forth.", false);
        else if (this.player.nipplesPierced > 0)
            this.outputText("\nYour " + this.nippleDescript(0) + "s are pierced with " + this.player.nipplesPShort + ".", false);
        if (this.player.totalCocks() > 0) {
            if (this.player.cocks[0].pierced > 0) {
                this.outputText("\nLooking positively perverse, a " + this.player.cocks[0].pShortDesc + " adorns your " + this.player.cockDescript(0) + ".", false);
            }
        }
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00286] == 1)
            this.outputText("\nA magical, ruby-studded bar pierces your belly button, allowing you to summon Ceraph on a whim.", false);
        if (this.player.hasVagina()) {
            if (this.player.vaginas[0].labiaPierced > 0)
                this.outputText("\nYour " + this.vaginaDescript(0) + " glitters with the " + this.player.vaginas[0].labiaPShort + " hanging from your lips.", false);
            if (this.player.vaginas[0].clitPierced > 0)
                this.outputText("\nImpossible to ignore, your " + this.clitDescript() + " glitters with its " + this.player.vaginas[0].clitPShort + ".", false);
        }
        //MONEY!
        if (this.player.gems == 0)
            this.outputText("\n\n<b>Your money-purse is devoid of any currency.", false);
        if (this.player.gems > 1)
            this.outputText("\n\n<b>You have " + this.player.gems + " shining gems, collected in your travels.", false);
        if (this.player.gems == 1)
            this.outputText("\n\n<b>You have " + this.player.gems + " shining gem, collected in your travels.", false);
        this.mainView.setOutputText(this.currentText);
        //menu();
        //addButton(0,"Next",camp);
        this.flushOutputTextToGUI();
    }

    public sockDescript(index: number): void {
        this.outputText("  ");
        if (this.player.cocks[index].sock == "wool")
            this.outputText("It's covered by a wooly white cock-sock, keeping it snug and warm despite how cold it might get.");
        else if (this.player.cocks[index].sock == "alabaster")
            this.outputText("It's covered by a white, lacey cock-sock, snugly wrapping around it like a bridal dress around a bride.");
        else if (this.player.cocks[index].sock == "cockring")
            this.outputText("It's covered by a black latex cock-sock with two attached metal rings, keeping your cock just a little harder and [balls] aching for release.");
        else if (this.player.cocks[index].sock == "viridian")
            this.outputText("It's covered by a lacey dark green cock-sock accented with red rose-like patterns.  Just wearing it makes your body, especially your cock, tingle.");
        else if (this.player.cocks[index].sock == "scarlet")
            this.outputText("It's covered by a lacey red cock-sock that clings tightly to your member.  Just wearing it makes your cock throb, as if it yearns to be larger...");
        else if (this.player.cocks[index].sock == "cobalt")
            this.outputText("It's covered by a lacey blue cock-sock that clings tightly to your member... really tightly.  It's so tight it's almost uncomfortable, and you wonder if any growth might be inhibited.");
        else if (this.player.cocks[index].sock == "gilded")
            this.outputText("It's covered by a metallic gold cock-sock that clings tightly to you, its surface covered in glittering gems.  Despite the warmth of your body, the cock-sock remains cool.");
        else if (this.player.cocks[index].sock == "amaranthine") {
            this.outputText("It's covered by a lacey purple cock-sock");
            if (this.player.cocks[index].cockType != CockTypesEnum.DISPLACER)
                this.outputText(" that fits somewhat awkwardly on your member");
            else
                this.outputText(" that fits your coeurl cock perfectly");
            this.outputText(".  Just wearing it makes you feel stronger and more powerful.");
        }
        else this.outputText("<b>Yo, this is an error.</b>");
    }


    // include "../../includes/input.as";

    public executeButtonClick(button: number = 0): void {
        this.mainView.clickButton(button);
    }

    //DROPDOWN BOX STUFF
    // import fl.controls.ComboBox; 
    // import fl.data.DataProvider; 
    // import flash.net.navigateToURL; 

    //Change handler is only used for selecting perks. Moved to engineCore with the other perk selection code


    /*HOLY SHIT THIS HOW TO DO URL LINKS!
   public  changeHandler(event:Event): void { 
      var  request:URLRequest = new URLRequest(); 
       request.url = ComboBox(event.target).selectedItem.data; 
       navigateToURL(request); 
       mainView.aCb.selectedIndex = -1; 
   }*/

    public displayControls(): void {
        this.mainView.hideAllMenuButtons();
        this.inputManager.DisplayBindingPane();

        choices("Reset Ctrls", this.resetControls,
            "Clear Ctrls", this.clearControls,
            "Null", undefined,
            "Null", undefined,
            "Null", undefined,
            "Null", undefined,
            "Null", undefined,
            "Null", undefined,
            "Null", undefined,
            "Back", this.hideControls);
    }

    public hideControls(): void {
        this.inputManager.HideBindingPane();

        this.settingsScreen();
    }

    public resetControls(): void {
        this.inputManager.HideBindingPane();

        this.outputText("Are you sure you want to reset all of the currently bound controls to their defaults?", true);

        this.doYesNo(this.resetControlsYes, this.displayControls);
    }

    public resetControlsYes(): void {
        this.inputManager.ResetToDefaults();

        this.outputText("Controls have been reset to defaults!\n\n", true);

        this.doNext(this.displayControls);
    }

    public clearControls(): void {
        this.inputManager.HideBindingPane();

        this.outputText("Are you sure you want to clear all of the currently bound controls?", true);

        this.doYesNo(this.clearControlsYes, this.displayControls);
    }

    public clearControlsYes(): void {
        this.inputManager.ClearAllBinds();

        this.outputText("Controls have been cleared!", true);

        this.doNext(this.displayControls);
    }

    // include "../../includes/OnLoadVariables.as";

    /**
     * All the variables that have been left around but don't fit into the GlobalVariables file
     */

    // import classes.creature;

    //Used when save/loading
    public notes: string = "";
    // nameBox.maxChars = 54;

    //Images for image pack!
    //NO! Images now work through ImageManager in GlobalVariables
    //var images = new Array();

    //System time
    public date: Date = new Date();

    //Used to set what each action buttons displays and does. I don't know why it is initialized here.
    //var args: any[] = new Array();
    //var funcs: any[] = new Array();

    //Loeri stuff
    //import flash.system.*

    //if ( ApplicationDomain.currentDomain.hasDefinition("Creature")) trace("Class exists");

    //dungeoneering variables
    //Setting dungeonLoc = 0 handles this:	public var inDungeon: boolean = false;
    public dungeonLoc: number = 0;

    // To save shitting up a lot of code...
    public inRoomedDungeon: boolean = false;
    public inRoomedDungeonResume = undefined;

    //Used to restrict random drops from overlapping uniques
    public plotFight: boolean = false;
    public timeQ: number = 0;
    public campQ: boolean = false;

    //Possibly redundant, not used anywhere else.
    //Input vars
    /* Yup, not used at all
    public  button0Choice: number = 0;
    public  button1Choice: number = 0;
    public  button2Choice: number = 0;
    public  button3Choice: number = 0;
    public  button4Choice: number = 0;
    public  button5Choice: number = 0;
    public  button6Choice: number = 0;
    public  button7Choice: number = 0;
    public  button8Choice: number = 0;
    public  button9Choice: number = 0;
    */

    // include "../../includes/startUp.as";




    //MainMenu - kicks player out to the main menu
    public mainMenu(e: MouseEvent = undefined): void {
        stage.focus = (this.mainView as MainView).mainText;

        //     if (CONFIG:: debug) {
        //         CoC_Settings.debugBuild = true;
        //     }
        // else
        // {
        CoC_Settings.debugBuild = false;
        // }

        if (this.mainView.aCb.parent != undefined) {
            this.mainView.removeChild(this.mainView.aCb);
        }

        this.mainView.eventTestInput.x = -10207.5;
        this.mainView.eventTestInput.y = -1055.1;
        this.hideStats();
        //Reset newgame buttons
        this.mainView.setMenuButton(MainView.MENU_NEW_MAIN, "New Game", this.charCreation.newGameGo);
        this.mainView.hideAllMenuButtons();
        this.mainView.showMenuButton(MainView.MENU_NEW_MAIN);
        this.mainView.showMenuButton(MainView.MENU_DATA);
        //Sets game state to 3, used for determining back functionality of save/load menu.
        this.gameState = 3;


        this.outputText("<b>Corruption of Champions (" + this.version + ")</b>", true);

        if (CoC_Settings.debugBuild)
            this.outputText(" Debug Build.");
        else
            this.outputText(" Release Build");

        //doThatTestingThang();

        this.startupScreenBody();

        var resume = undefined;
        if (this.player.str > 0)  //we're in a game, allow resume.
            resume = this.playerMenu;


        // I really wanted to only have the "imageCreditsScreen" button if images were found, but it turns out
        // that if you check if any images were found immediately when this screen is shown, you get 0
        // since the images haven't loaded yet.
        // Therefore, the imageCreditScreen will just have to say "No image pack" if you don't have any images

        choices("", undefined,
            "Image Credits", this.imageCreditsScreen,
            "Credits", this.creditsScreen,
            "", undefined,
            "Instructions", this.howToPlay,
            "Debug Info", this.debugPane,
            "", undefined,
            "", undefined,
            "Settings", this.settingsScreen,
            "Resume", resume);

        if (false)  // Conditionally jump into chaosmonkey IMMEDIATELY
        {
            this.monkey.throwOnSyntaxError = true;
            this.monkey.excludeMenuKeys = true;			// Syntax checking monkey should ignore the menu keys (they're irrelevant to it's functions)
            this.initiateTheMonkey()
        }
    }

    public startupScreenBody(): void {

        // NO FUCKING DECENT MULTI-LINE STRING LITERALS BECAUSE FUCKING STUPID
        // WTF ACTIONSCRIPT YOUR DEV'S ARE ON CRACK

        this.outputText(`<![CDATA[
<br> (Formerly Unnamed Text Game)
<u>Created by: Fenoxo < /u>

Edited By: <br>
& nbsp; & nbsp; & nbsp; Ashi, SoS, Prisoner416, Zeikfried, et al

Open - source contributions by: <br>
& nbsp; & nbsp; & nbsp; aimozg, Amygdala, Cmacleod42, Enterprise2001, Fake - Name, Gedan, Yoffy, et al

Source Code: <u><a href='https://github.com/herp-a-derp/Corruption-of-Champions' > https://github.com/herp-a-derp/Corruption-of-Champions</a></u>

Bug Tracker: <u><a href='https://github.com/herp-a-derp/Corruption-of-Champions/issues' > https://github.com/herp-a-derp/Corruption-of-Champions/issues</a></u>  
(requires an account, unfortunately)

** <u>DISCLAIMER < /u>**
    < br >- ** There are many strange and odd fetishes contained in this flash.Peruse at own risk.**
<br>- ** Please be 18 or the legal age to view porn before playing.**
<br>- ** Try to keep your keyboard clean.Think of the children! **


    For more information see Fenoxo's Blog at <b><u><a href='http://www.fenoxo.com/'>fenoxo.com</a></u></b>.

Also go play < u > <a href='http://www.furaffinity.net/view/9830293/' > Nimin < /a></u > by Xadera on furaffinity.

	]]>`, false, true);

        if (this.debug)
            this.outputText("\n\n<b>DEBUG MODE ENABLED:  ITEMS WILL NOT BE CONSUMED BY USE.</b>");
        if (this.flags[kFLAGS.SHOW_SPRITES_FLAG])
            this.outputText("\n\n<b>Sprites disabled.</b>");
        if (this.flags[kFLAGS.EASY_MODE_ENABLE_FLAG])
            this.outputText("\n\n<b>Easy Mode On:  Bad-ends can be ignored.</b>");
        if (this.flags[kFLAGS.SILLY_MODE_ENABLE_FLAG])
            this.outputText("\n\n<b>SILLY MODE ENGAGED: Crazy, nonsensical, and possibly hilarious things may occur.</b>");
        if (this.isEaster())
            this.outputText("\n\n<b>It's Easter!  Enjoy the eggs!</b>");
        if (isValentine())
            this.outputText("\n\n<b>It's Valentine's!</b>");
        if (this.helFollower.isHeliaBirthday())
            this.outputText("\n\n<b>It's Helia's Birthday Month!</b>");


    }

    public settingsScreen(): void {
        this.mainView.showMenuButton(MainView.MENU_NEW_MAIN);
        this.mainView.showMenuButton(MainView.MENU_DATA);

        this.outputText("<b>Settings toggles:</b>\n", true);

        if (this.debug)
            this.outputText("Debug mode enabled: <b>Yes</b>\n	Items will not be consumed by use, fleeing always succeeds, and bad-ends can be ignored.");
        else
            this.outputText("Debug mode enabled: <b>No</b>\n	Items consumption will occur as normal.");

        this.outputText("\n\n");

        if (this.flags[kFLAGS.SHOW_SPRITES_FLAG] == 0)
            this.outputText("Sprites enabled: <b>Yes</b>.\n	You like to look at pretty pictures.");
        else
            this.outputText("Sprites enabled: <b>No</b>.\n	There are only words. Nothing else.");

        this.outputText("\n\n");

        if (this.flags[kFLAGS.EASY_MODE_ENABLE_FLAG])
            this.outputText("Easy Mode <b>On</b>\n	Bad-ends can be ignored and combat is easier.");
        else
            this.outputText("Easy Mode <b>Off</b>\n	Bad-ends can ruin your game and combat is challenging.");

        this.outputText("\n\n");

        if (this.flags[kFLAGS.SILLY_MODE_ENABLE_FLAG])
            this.outputText("Silly Mode <b>On</b>\n	Crazy, nonsensical, and possibly hilarious things may occur.");
        else
            this.outputText("Silly Mode <b>Off</b>\n	You're an incorrigable stick-in-the-mud with no sense of humor.");

        this.outputText("\n\n");
        this.outputText("<b>The following flags are not fully implemented yet (e.g. they don't apply in <i>all</i> cases where they could be relevant).</b>\n");
        this.outputText("Additional note: You <b>must</b> be <i>in a game session</i> (e.g. load your save, hit \"Main Menu\", change the flag settings, and then hit \"Resume\") to change these flags. They're saved into the saveGame file, so if you load a save, it will clear them to the state in that save.");
        this.outputText("\n\n");

        if (this.flags[kFLAGS.LOW_STANDARDS_FOR_ALL]) {
            this.outputText("Low standards Mode <b>On</b>\n	NPCs ignore body type preferences.");
            this.outputText("\n	(Not gender preferences though. You still need the right hole.)");
        }
        else
            this.outputText("Low standards Mode <b>Off</b>\n	NPCs have body-type preferences.");


        this.outputText("\n\n");

        if (this.flags[kFLAGS.HYPER_HAPPY]) {
            this.outputText("Hyper Happy mode <b>On</b>\n	Only reducto and humus shrink endowments.");
            this.outputText("\n	Incubus draft doesn't affect breasts, and succubi milk doesn't affect cocks.")
        }
        else
            this.outputText("Hyper Happy mode <b>Off</b>\n	Male enhancement potions shrink female endowments, and vice versa.");

        choices("Toggle Debug", this.toggleDebug,
            "Sprite Toggle", this.toggleSpritesFlag,
            "EZ Mode", this.toggleEasyModeFlag,
            "Larger Font", this.incFontSize,
            "Controls", this.displayControls,
            "Hyper Happy", this.toggleHyperHappy,
            "Low Standards", this.toggleStandards,
            "Silly Toggle", this.toggleSillyFlag,
            "Smaller Font", this.decFontSize,
            "Back", this.mainMenu);
    }

    public incFontSize(): void {
        var fmt: TextFormat = this.mainView.mainText.getTextFormat();

        if (fmt.size == undefined) fmt.size = 20;

        fmt.size = (fmt.size as Number) + 1;

        if ((fmt.size as Number) > 32) fmt.size = 32;

        trace("Font size set to: " + (fmt.size as Number));
        this.mainView.mainText.setTextFormat(fmt);
        this.flags[kFLAGS.CUSTOM_FONT_SIZE] = fmt.size;
    }

    public decFontSize(): void {
        var fmt: TextFormat = this.mainView.mainText.getTextFormat();

        if (fmt.size == undefined) fmt.size = 20;

        fmt.size = (fmt.size as Number) - 1;

        if ((fmt.size as Number) < 14) fmt.size = 14;

        trace("Font size set to: " + (fmt.size as Number));
        this.mainView.mainText.setTextFormat(fmt);
        this.flags[kFLAGS.CUSTOM_FONT_SIZE] = fmt.size;
    }

    public toggleStandards(): void {
        //toggle debug
        if (this.flags[kFLAGS.LOW_STANDARDS_FOR_ALL])
            this.flags[kFLAGS.LOW_STANDARDS_FOR_ALL] = false;
        else
            this.flags[kFLAGS.LOW_STANDARDS_FOR_ALL] = true;
        this.settingsScreen();
        return;
    }

    public toggleHyperHappy(): void {
        //toggle debug
        if (this.flags[kFLAGS.HYPER_HAPPY])
            this.flags[kFLAGS.HYPER_HAPPY] = false;
        else
            this.flags[kFLAGS.HYPER_HAPPY] = true;
        this.settingsScreen();
        return;
    }

    public toggleDebug(): void {
        //toggle debug
        if (this.debug)
            this.debug = false;
        else
            this.debug = true;

        this.mainView.showMenuButton(MainView.MENU_DATA);
        this.settingsScreen();
        return;
    }

    public toggleEasyModeFlag(): void {
        if (this.flags[kFLAGS.EASY_MODE_ENABLE_FLAG] == 0)
            this.flags[kFLAGS.EASY_MODE_ENABLE_FLAG] = 1;
        else
            this.flags[kFLAGS.EASY_MODE_ENABLE_FLAG] = 0;
        this.settingsScreen();
        this.mainView.showMenuButton(MainView.MENU_DATA);
        this.settingsScreen();
        return;
    }

    public toggleSpritesFlag(): void {
        if (this.flags[kFLAGS.SHOW_SPRITES_FLAG])
            this.flags[kFLAGS.SHOW_SPRITES_FLAG] = false;
        else
            this.flags[kFLAGS.SHOW_SPRITES_FLAG] = true;
        this.settingsScreen();
        return;
    }

    public toggleSillyFlag(): void {

        if (this.flags[kFLAGS.SILLY_MODE_ENABLE_FLAG])
            this.flags[kFLAGS.SILLY_MODE_ENABLE_FLAG] = false;
        else
            this.flags[kFLAGS.SILLY_MODE_ENABLE_FLAG] = true;
        this.settingsScreen();
        return;

    }


    public creditsScreen(): void {
        this.outputText("<b>Coding and Main Events:</b>\n", true);
        this.outputText("<ul>");
        this.outputText("<li> Fenoxo</li>\n");
        this.outputText("</ul>");
        this.outputText("<b>Typo Reporting</b>\n");
        this.outputText("<ul>");
        this.outputText("<li> SoS</li>");
        this.outputText("<li> Prisoner416</li>");
        this.outputText("<li> Chibodee</li>");
        this.outputText("</ul>");
        this.outputText("");
        this.outputText("<b>Graphical Prettiness:</b>")
        this.outputText("<ul>");;
        this.outputText("<li> Dasutin (Background Images)</li>");
        this.outputText("<li> Invader (Button Graphics, Font, and Other Hawtness)</li>");
        this.outputText("</ul>");
        this.outputText("<b>Supplementary Events:</b>");
        this.outputText("<ul>");
        this.outputText("<li> Dxasmodeus (Tentacles, Worms, Giacomo)</li>");
        this.outputText("<li> Kirbster (Christmas Bunny Trap)</li>");
        this.outputText("<li> nRage (Kami the Christmas Roo)</li>");
        this.outputText("<li> Abraxas (Alternate Naga Scenes w/Various Monsters, Tamani Anal, Female Shouldra Tongue Licking, Chameleon Girl, Christmas Harpy)</li>");
        this.outputText("<li> Astronomy (Fetish Cultist Centaur Footjob Scene)</li>");
        this.outputText("<li> Adjatha (Scylla the Cum Addicted Nun, Vala, Goo-girls, Bimbo Sophie Eggs, Ceraph Urta Roleplay, Gnoll with Balls Scene, Kiha futa scene, Goblin Web Fuck Scene, and 69 Bunny Scene)</li>");
        this.outputText("<li> ComfyCushion (Muff Wrangler)</li>");
        this.outputText("<li> B (Brooke)</li>");
        this.outputText("<li> Quiet Browser (Half of Niamh, Ember, Amily The Mouse-girl Breeder, Katherine, Part of Katherine Employment Expansion, Urta's in-bar Dialogue Trees, some of Izma, Loppe)</li>");
        this.outputText("<li> Indirect (Alternate Non-Scylla Katherine Recruitment, Part of Katherine Employment Expansion, Phouka, Coding of Bee Girl Expansion)</li>");
        this.outputText("<li> Schpadoinkle (Victoria Sex)</li>");
        this.outputText("<li> Donto (Ro'gar the Orc, Polar Pete)</li>");
        this.outputText("<li> Angel (Additional Amily Scenes)</li>");
        this.outputText("<li> Firedragon (Additional Amily Scenes)</li>");
        this.outputText("<li> Danaume (Jojo masturbation texts)</li>");
        this.outputText("<li> LimitLax (Sand-Witch Bad-End)</li>");
        this.outputText("<li> KLN (Equinum Bad-End)</li>");
        this.outputText("<li> TheDarkTemplar11111 (Canine Pepper Bad End)</li>");
        this.outputText("<li> Silmarion (Canine Pepper Bad End)</li>");
        this.outputText("<li> Soretu (Original Minotaur Rape)</li>");
        this.outputText("<li> NinjArt (Small Male on Goblin Rape Variant)</li>");
        this.outputText("<li> DoubleRedd (\"Too Big\" Corrupt Goblin Fuck)</li>");
        this.outputText("<li> Nightshade (Additional Minotaur Rape)</li>");
        this.outputText("<li> JCM (Imp Night Gangbang, Addition Minotaur Loss Rape - Oral)</li>");
        this.outputText("<li> Xodin (Nipplefucking paragraph of Imp GangBang, Encumbered by Big Genitals Exploration Scene, Big Bits Run Encumbrance, Player Getting Beer Tits, Sand Witch Dungeon Misc Scenes)</li>");
        this.outputText("<li> Blusox6 (Original Queen Bee Rape)</li>");
        this.outputText("<li> Thrext (Additional Masturbation Code, Faerie, Ivory Succubus)</li>");
        this.outputText("<li> XDumort (Genderless Anal Masturbation)</li>");
        this.outputText("<li> Uldego (Slime Monster)</li>");
        this.outputText("<li> Noogai, Reaper, and Numbers (Nipple-Fucking Victory vs Imp Rape)</li>");
        this.outputText("<li> Verse and IAMurow (Bee-Girl MultiCock Rapes)</li>");
        this.outputText("<li> Sombrero (Additional Imp Lust Loss Scene (Dick insertion ahoy!)</li>");
        this.outputText("<li> The Dark Master (Marble, Fetish Cultist, Fetish Zealot, Hellhound, Lumi, Some Cat Transformations, LaBova, Ceraph's Cat-Slaves, a Cum Witch Scene, Mouse Dreams, Forced Nursing:Imps&Goblins, Bee Girl Expansion)</li>");
        this.outputText("<li> Mr. Fleshcage (Cat Transformation/Masturbation)</li>");
        this.outputText("<li> Spy (Cat Masturbation, Forced Nursing: Minotaur, Bee, & Cultist)</li>");
        this.outputText("<li> PostNuclearMan (Some Cat TF)</li>");
        this.outputText("<li> MiscChaos (Forced Nursing: Slime Monster)</li>");
        this.outputText("<li> Ourakun (Kelt the Centaur)</li>");
        this.outputText("<li> Rika_star25 (Desert Tribe Bad End)</li>");
        this.outputText("<li> Versesai (Additional Bee Rape)</li>");
        this.outputText("<li> Mallowman (Additional Bee Rape)</li>");
        this.outputText("<li> HypnoKitten (Additional Centaur x Imp Rape)</li>");
        this.outputText("<li> Ari (Minotaur Gloryhole Scene)</li>");
        this.outputText("<li> SpectralTime (Aunt Nancy)</li>");
        this.outputText("<li> Foxxling (Akbal)</li>");
        this.outputText("<li> Elfensyne (Phylla)</li>");
        this.outputText("<li> Radar (Dominating Sand Witches, Some Phylla)</li>");
        this.outputText("<li> Jokester (Sharkgirls, Izma, & Additional Amily Scenes)</li>");
        this.outputText("<li> Lukadoc (Additional Izma, Ceraph Followers Corrupting Gangbang, Satyrs, Ember)</li>");
        this.outputText("<li> IxFa (Dildo Scene, Virgin Scene for Deluxe Dildo, Naga Tail Masturbation)</li>");
        this.outputText("<li> Bob (Additional Izma)</li>");
        this.outputText("<li> lh84 (Various Typos and Code-Suggestions)</li>");
        this.outputText("<li> Dextersinister (Gnoll girl in the plains)</li>");
        this.outputText("<li> ElAcechador, Bandichar, TheParanoidOne, Xoeleox (All Things Naga)</li>");
        this.outputText("<li> Symphonie (Dominika the Fellatrix, Ceraph RPing as Dominika, Tel'Adre Library)</li>");
        this.outputText("<li> Soulsemmer (Ifris)</li>");
        this.outputText("<li> WedgeSkyrocket (Zetsuko, Pure Amily Anal, Kitsunes)</li>");
        this.outputText("<li> Zeikfried (Anemone, Male Milker Bad End, Kanga TF, Raccoon TF, Minotaur Chef Dialogues, Sheila, and More)</li>");
        this.outputText("<li> User21 (Additional Centaur/Naga Scenes)</li>");
        this.outputText("<li> ~M~ (Bimbo + Imp loss scene)</li>");
        this.outputText("<li> Grype (Raping Hellhounds)</li>");
        this.outputText("<li> B-Side (Fentendo Entertainment Center Silly-Mode Scene)</li>");
        this.outputText("<li> Not Important (Face-fucking a defeated minotaur)</li>");
        this.outputText("<li> Third (Cotton, Rubi, Nieve, Urta Pet-play)</li>");
        this.outputText("<li> Gurumash (Parts of Nieve)</li>");
        this.outputText("<li> Kinathis (A Nieve Scene, Sophie Daughter Incest, Minerva)</li>");
        this.outputText("<li> Jibajabroar (Jasun)</li>");
        this.outputText("<li> Merauder (Raphael)</li>");
        this.outputText("<li> EdgeofReality (Gym fucking machine)</li>");
        this.outputText("<li> Bronycray (Heckel the Hyena)</li>");
        this.outputText("<li> Sablegryphon (Gnoll spear-thrower)</li>");
        this.outputText("<li> Nonesuch (Basilisk, Sandtraps, assisted with Owca/Vapula, Whitney Farm Corruption)</li>");
        this.outputText("<li> Anonymous Individual (Lilium, PC Birthing Driders)</li>");
        this.outputText("<li> PKD (Owca, Vapula, Fap Arena, Isabella Tentacle Sex, Lottie Tentacle Sex)</li>");
        this.outputText("<li> Shamblesworth (Half of Niamh, Shouldra the Ghost-Girl, Ceraph Roleplaying As Marble, Yara Sex, Shouldra Follow Expansion)</li>");
        this.outputText("<li> Kirbu (Exgartuan Expansion, Yara Sex, Shambles's Handler, Shouldra Follow Expansion)</li>");
        this.outputText("<li> 05095 (Shouldra Expansion, Tons of Editing)</li>");
        this.outputText("<li> Smidgeums (Shouldra + Vala threesome)</li>");
        this.outputText("<li> FC (Generic Shouldra talk scene)</li>");
        this.outputText("<li> Oak (Bro + Bimbo TF, Isabella's ProBova Burps)</li>");
        this.outputText("<li> Space (Victory Anal Sex vs Kiha)</li>");
        this.outputText("<li> Venithil (LippleLock w/Scylla & Additional Urta Scenes)</li>");
        this.outputText("<li> Butts McGee (Minotaur Hot-dogging PC loss, Tamani Lesbo Face-ride, Bimbo Sophie Mean/Nice Fucks)</li>");
        this.outputText("<li> Savin (Hel the Salamander, Valeria, Spanking Drunk Urta, Tower of the Phoenix, Drider Anal Victory, Hel x Isabella 3Some, Centaur Sextoys, Thanksgiving Turkey, Uncorrupt Latexy Recruitment, Assert Path for Direct Feeding Latexy, Sanura the Sphinx)</li>");
        this.outputText("<li> Gats (Lottie, Spirit & Soldier Xmas Event, Kiha forced masturbation, Goblin Doggystyle, Chicken Harpy Egg Vendor)</li>");
        this.outputText("<li> Aeron the Demoness (Generic Goblin Anal, Disciplining the Eldest Minotaur)</li>");
        this.outputText("<li> Gats, Shamblesworth, Symphonie, and Fenoxo (Corrupted Drider)</li>");
        this.outputText("<li> Bagpuss (Female Thanksgiving Event, Harpy Scissoring, Drider Bondage Fuck)</li>");
        this.outputText("<li> Frogapus (The Wild Hunt)</li>");
        this.outputText("<li> Fenoxo (Everything Else)</li>");
        this.outputText("</ul>");
        this.outputText("<b>Oviposition Update Credits - Names in Order Appearance in Oviposition Document</b>");
        this.outputText("<ul>");
        this.outputText("<li> DCR (Idea, Drider Transformation, and Drider Impreg of: Goblins, Beegirls, Nagas, Harpies, and Basilisks)</li>");
        this.outputText("<li> Fenoxo (Bee Ovipositor Transformation, Bee Oviposition of Nagas and Jojo, Drider Oviposition of Tamani)</li>");
        this.outputText("<li> Smokescreen (Bee Oviposition of Basilisks)</li>");
        this.outputText("<li> Radar (Oviposition of Sand Witches)</li>");
        this.outputText("<li> OutlawVee (Bee Oviposition of Goo-Girls)</li>");
        this.outputText("<li> Zeikfried (Editing this mess, Oviposition of Anemones)</li>");
        this.outputText("<li> Woodrobin (Oviposition of Minotaurs)</li>");
        this.outputText("<li> Posthuman (Oviposition of Ceraph Follower)</li>");
        this.outputText("<li> Slywyn (Bee Oviposition of Gigantic PC Dick)</li>");
        this.outputText("<li> Shaxarok (Drider Oviposition of Large Breasted Nipplecunts)</li>");
        this.outputText("<li> Quiet Browser (Bee Oviposition of Urta)</li>");
        this.outputText("<li> Bagpuss (Laying Eggs In Pure Amily)</li>");
        this.outputText("<li> Eliria (Bee Laying Eggs in Bunny-Girls)</li>");
        this.outputText("<li> Gardeford (Helia x Bimbo Sophie Threesomes)</li>");
        this.outputText("</ul>");
        this.outputText("\nIf I'm missing anyone, please contact me ASAP!  I have done a terrible job keeping the credits up to date!");
        this.doNext(this.mainMenu);
    }

    public imageCreditsScreen(): void {

        if (this.images.getLoadedImageCount() > 0) {
            this.outputText(`<![CDATA[

** Bundled Image Credits: any *

** Yoh - SL **

* Bee - Girl Monster Image
        * Goo - Girl Monster Image
        * Ceraph Monster Image
        * Sand - Witch(and sandwich)

		]]>`, true, true);
        }
        else {
            this.outputText("<b>No Image-Pack Found!</b>\n", true);
        }
        this.doNext(this.mainMenu);
    }

    public howToPlay(): void {
        this.outputText("", true);
        this.outputText("<b><u>How To Play:</u></b>\nClick the buttons corresponding to the actions you want to take.  Your 'goal' is to obviously put an end to the demonic corruption around you, but do whatever the hell you want.  There is a story but sometimes it's fun to ignore it.\n\n", false);
        this.outputText("<b>Exploration:</b>\nThe lake is a safe zone when you start the game.  It's a good place to explore, and Whitney's farm can offer some nice stat boosts to help get you on your feet. Once you feel comfortable, the forest is probably the next safest area, but beware of tentacle monsters.  The desert is the next toughest area, and the mountains offer further challenges.  There are more areas beyond that, but that's a good way to get started.  You'll uncover plenty of new 'places' exploring, which can be accessed from the <b>Places</b> menu.  You'll also find some interesting characters when you try to discover new explorable locations by choosing <b>Explore</b> twice.\n\n", false);
        this.outputText("<b>Combat:</b>\nCombat is won by raising an opponent's lust to 100 or taking their HP to 0.  You lose if your enemy does the same to you.  Loss isn't game over, but some losses will make it harder in the future by lowering your stats.  Beware.  Don't be afraid to spam the <b>Run</b> option when you're in over your head.\n\n", false);
        this.outputText("<b>Controls:</b>\nThe game features numerous hot-keys to make playing quicker and easier.\nP key - Perks Menu\nD key - Data Menu\nA key - Appearance Screen\n1 Through 5 - The top row of 'choice' buttons.\n6 Through 0 - The bottom row of 'choice' buttons.\nQ through T - Alternative bottom 'choice' hotkeys.\nSpace Bar - Next/Back/Leave\nHome Key - Toggle text field background.\nS key - Stats Screen\n(Save Hotkeys - May not work in all players)\nF1-F5 - Quicksave to slot 1 through 5.  Only works when Data is visible.\nF6-F0 - Quick Load from slots 1-5.\n\n", false);
        this.outputText("<b>Save often using the Data Menu</b> - you never know when your journey will come to an end!", false);
        this.doNext(this.mainMenu);
    }



    // include "../../includes/debug.as";


    /*
    
    Debug pane and related functions
    
    Author: Fake-Name
    
    */
    public monkeyStartConfirm(): void {
        this.outputText(`<![CDATA[

Chaos Monkah!

This is a testing tool intended to generate random button presses.

**THIS CAN (and probably will) OVERWRITE YOUR SAVE FILES AS A CONSEQUENCE OF HOW IT WORKS**

** SERIOUSLY.YOU NEED TO BE SURE YOU WANT TO DO THIS, AND DO NOT COMPLAIN IF YOU TRIED IT JUST "BECAUSE YOU WERE CURIOUS" **

    If you have an open - game, it ** WILL ** cause your PC to take actions which you
probably do not intend.

** CAUTION.THE ONLY WAY TO STOP THE CHAOS MONKEY IS TO CLOSE THE GAME **
    (Yeah, I want to fix that)
	]]>`, true, true);

        this.monkey.throwOnSyntaxError = false;
        this.monkey.excludeMenuKeys = false;
        this.menu();
        this.addButton(0, "ChaosMonkey", this.monkeyStartReallyConfirm);
        this.addButton(1, "NoMenuMonkey", this.noSaveMonkey);
        this.addButton(5, "SyntaxMonkey", this.syntaxMonkey);
        this.addButton(9, "No", this.debugPane)
    }


    public syntaxMonkey(): void {
        this.monkey.throwOnSyntaxError = true;
        this.monkey.excludeMenuKeys = true;			// Syntax checking monkey should ignore the menu keys (they're irrelevant to it's functions)
        this.monkeyStartReallyConfirm()
    }

    public noSaveMonkey(): void {
        this.monkey.excludeMenuKeys = true;
        this.monkeyStartReallyConfirm()
    }


    public monkeyStartReallyConfirm(): void {
        this.outputText(`<![CDATA[

** NO REALLY, THIS WILL PROBABLY OVERWRITE YOUR SAVES.**

** ARE YOU REALLY, * REALLY * SURE ?**

	]]>`, true, true);

        this.doYesNo(this.initiateTheMonkey, this.debugPane)
    }


    public initiateTheMonkey(): void {
        // I swear, half the fun of this is just the function names I can write.
        this.outputText(`<![CDATA[
            INITIATING MONKEY
        ]]>`, true, true);

        this.monkey.createChaos();

        if (this.player.str) // we're in a game
            this.doNext(this.camp.returnToCampUseOneHour);      // so dump out to the camp scene
        else
            this.doNext(this.charCreation.newGameGo);   // not in a game, create a char randomly
    }



    public debugPane(): void {
        this.outputText("<b>Debug information!</b>\n", true);

        this.outputText("\nPossible flash sandboxing contexts:");
        this.outputText("<ul>");
        this.outputText("<li><b>\"localWithNetwork\"</b> means images <b><u>will not work</u></b>!</li>");
        this.outputText("<li><b>\"localWithFile\"</b> means images can work.</li>");
        this.outputText("<li><b>\"localTrusted\"</b> means images can work, and you've somehow managed to install this swf into a flash trusted directory. How did you manage that?</li>");
        this.outputText("</ul>");
        this.outputText("\nNote that you still need the proper folder structure to have functional images.");

        this.outputText("\n\nCurrent Sandbox mode: <b>" + Security.sandboxType + "</b>");
        this.outputText("\n<hr /> --------"); // HR Tag! WHY U NO WORK?

        this.outputText("\nCurrently have " + this.images.getLoadedImageCount() + " images loaded into cache.");



        if (CoC_Settings.haltOnErrors)  // Using a static class so I can grab it from anywhere.
            this.outputText("\nCurrently set to halt on all errors.");
        else
            this.outputText("\nParsing or description errors only generate warning message");

        this.outputText("\n<hr /> --------"); // HR Tag! WHY U NO WORK?

        this.outputText("\n\n<b>FUNCTIONALITY ON THIS PAGE IS IN ALPHA-RELEASE STATUS</b>\n");
        this.outputText("<b>IF YOU DON'T KNOW WHAT YOU ARE DOING AND/OR HAVE UNSAVED GAME PROGRESS, DO NOT CLICK ANY BUTTON EXCEPT \"BACK\"</b>\n");


        this.outputText(this.images.showImage("monster-ceraph"));

        this.menu();
        this.addButton(0, "Event Tester", this.eventTestingPane);
        this.addButton(1, "Test Input", this.eventTester);
        this.addButton(5, "Parser Tests", this.doThatTestingThang);
        this.addButton(6, "Halt on Errors", this.toggleHaltSettings);
        this.addButton(3, "ChaosMonkey", this.monkeyStartConfirm)
        this.addButton(9, "Back", this.mainMenu);
    }

    public toggleHaltSettings(): void {
        //toggle debug
        if (CoC_Settings.haltOnErrors)
            CoC_Settings.haltOnErrors = false;
        else
            CoC_Settings.haltOnErrors = true;
        this.debugPane();
        return;
    }





    public doThatTestingThang(): void {

        // Excercise the parser. This should catch parser regressions, I think.
        //
        //

        this.outputText(`<![CDATA[

** Parser Tests! **

##Bracket escaping!##

* \\\[cock\\\]
    * [cock]

    ** Single word nouns **

* \\\[armor\\\] - [armor]
    * \\\[armorname\\\] - [armorname]
        * \\\[weapon\\\] - [weapon]
            * \\\[weaponname\\\] - [weaponname]
                * \\\[name\\\] - [name]
                    * \\\[asshole\\\] - [asshole]
                        * \\\[butthole\\\] - [butthole]
                            * \\\[hair\\\] - [hair]
                                * \\\[face\\\] - [face]
                                    * \\\[legs\\\] - [legs]
                                        * \\\[leg\\\] - [leg]
                                            * \\\[feet\\\] - [feet]
                                                * \\\[foot\\\] - [foot]
                                                    * \\\[sack\\\] - [sack]
                                                        * \\\[balls\\\] - [balls]
                                                            * \\\[sheath\\\] - [sheath]
                                                                * \\\[chest\\\] - [chest]
                                                                    * \\\[fullchest\\\] - [fullchest]
                                                                        * \\\[hips\\\] - [hips]
                                                                            * \\\[butt\\\] - [butt]
                                                                                * \\\[ass\\\] - [ass]
                                                                                    * \\\[nipple\\\] - [nipple]
                                                                                        * \\\[nipples\\\] - [nipples]
                                                                                            * \\\[tongue\\\] - [tongue]
                                                                                                * \\\[evade\\\] - [evade]
                                                                                                    * \\\[misdirection\\\] - [misdirection]
                                                                                                        * \\\[agility\\\] - [agility]
                                                                                                            * \\\[master\\\] - [master]
                                                                                                                * \\\[master\\\] - [master]
                                                                                                                    * \\\[he\\\] - [he]
                                                                                                                        * \\\[him\\\] - [him]
                                                                                                                            * \\\[his\\\] - [his]
                                                                                                                                * \\\[pussy\\\] - [pussy]
                                                                                                                                    * \\\[vagina\\\] - [vagina]
                                                                                                                                        * \\\[vag\\\] - [vag]
                                                                                                                                            * \\\[clit\\\] - [clit]
                                                                                                                                                * \\\[cock\\\] - [cock]
                                                                                                                                                    * \\\[cocks\\\] - [cocks]
                                                                                                                                                        * \\\[eachcock\\\] - [eachcock]
                                                                                                                                                            * \\\[onecock\\\] - [onecock]
                                                                                                                                                                * \\\[cockhead\\\] - [cockhead]
                                                                                                                                                                    * \\\[vagorass\\\] - [vagorass]
                                                                                                                                                                        * \\\[hairorfur\\\] - [hairorfur]
                                                                                                                                                                            * \\\[pg\\\] - [pg](This is a shortcut to two newlines.This should be two lines below the \\\[pg\\\])


                                                                                                                                                                                ** Single - word function calls and parameter lookups **

* \\\[player.face\\\] - [player.face]
    * \\\[allChestDesc\\\] - [allChestDesc]
        * \\\[player.armorName\\\] - [player.armorName]
            * \\\[player.skinFurScales\\\] - [player.skinFurScales]
                * \\\[chestDesc\\\] - [chestDesc]


                    ** Two word nouns **

* \\\[cock all\\\] - [cock all]
    * \\\[cock each\\\] - [cock each]
        * \\\[cock one\\\] - [cock one]
            * \\\[cock largest\\\] - [cock largest]
                * \\\[cock biggest\\\] - [cock biggest]
                    * \\\[cock smallest\\\] - [cock smallest]
                        * \\\[cock longest\\\] - [cock longest]
                            * \\\[cock shortest\\\] - [cock shortest]
                                * \\\[cock 0\\\] - [cock 0](This should always error)
                                    * \\\[cock 1\\\] - [cock 1]
                                        * \\\[cock 2\\\] - [cock 2]
                                            * \\\[cockHead biggest\\\] - [cockHead biggest]
                                                * \\\[cockHead largest\\\] - [cockHead largest]
                                                    * \\\[cockHead smallest\\\] - [cockHead smallest]
                                                        * \\\[cockHead longest\\\] - [cockHead longest]
                                                            * \\\[cockHead shortest\\\] - [cockHead shortest]
                                                                * \\\[cockHead 0\\\] - [cockHead 0](This should always error)
                                                                    * \\\[cockHead 1\\\] - [cockHead 1]
                                                                        * \\\[cockHead 2\\\] - [cockHead 2]

                                                                            ** Boolean tests **

* 1 \\\[if (4 == 4) HERP | DERP\\\]
* 1[if (4 == 4) HERP | DERP]
* 2 \\\[if (4 == 7) HERP | DERP\\\]
* 2[if (4 == 7) HERP | DERP]
* 3 \\\[if (4 == (2 + 2)) HERP | DERP\\\]
* 3[if (4 == (2 + 2)) HERP | DERP]
* 4 \\\[if (4 == 4) HERP | DERP\\\]
* 4[if (4 == 4) HERP | DERP]
* 5 \\\[if (4 == 7) [if (4 == 7) HERP]\\\]
* 5[if (4 == 7) [if (4 == 7) HERP]]
* 6 \\\[if (4 == 7) [if (4 == 7) HERP | DERP]\\\]
* 6[if (4 == 7) [if (4 == 7) HERP | DERP]]
* 7 \\\[if (4 = 4) [if (4 = 4) HERP]\\\]
* 7[if (4 = 4) [if (4 = 4) HERP]]
* 8 \\\[if (4 == 4) [if (4 == 4) HERP]\\\]
* 8[if (4 == 4) [if (4 == 4) HERP]]
* 9 \\\[if (4 == biggesttitsize) \\\]
* 9[if (4 == biggesttitsize) ]
* 10 \\\[if (4 == biggesttitsize) HERP | DERP\\\]
* 10[if (4 == biggesttitsize) HERP | DERP]
* 11 \\\[if (analcapacity > 3) HERP | DERP\\\]
* 11[if (analcapacity > 3) HERP | DERP]
* 12 \\\[if (analcapacity > 3) HERP | DERP\\\]
* 12[if (analcapacity > 3) HERP | DERP]
* 13 \\\[if (analcapacity = 0) HERP | DERP\\\]
* 13[if (analcapacity = 0) HERP | DERP]
* 14 \\\[if (analcapacity = 0) HERP | DERP\\\]
* 14[if (analcapacity = 0) HERP | DERP]
* 15 \\\[if (analcapacity > 0) HERP | DERP\\\]
* 15[if (analcapacity > 0) HERP | DERP]
* 16 \\\[if (analcapacity > 0) HERP | DERP\\\]
* 16[if (analcapacity > 0) HERP | DERP]
* 17 \\\[if (hasCock == True) HERP | DERP\\\]
* 17[if (hasCock == True) HERP | DERP]
* 18 \\\[if (hasVagina == True) HERP | DERP\\\]
* 18[if (hasVagina == True) HERP | DERP]

** Member Accessors **

* 19 \\\[if (player.biggestLactation > 0) HERP | DERP\\\]
* 19[if (player.biggestLactation > 0) HERP | DERP]
* 20 \\\[if (player.biggestLactation > 0) \\\[if (hasVagina == True) LOL | WAT\\\]| DERP\\\]
* 20[if (player.biggestLactation > 0) [if (hasVagina == True) LOL | WAT]| DERP]
* 21 \\\[if (player.str > 0) HERP | DERP\\\]
* 21[if (player.str > 0) HERP | DERP]
* 22 \\\[if (player.inte > 0) HERP | DERP\\\]
* 22[if (player.inte > 0) HERP | DERP]
* 23 \\\[if (player.biggestTitSize > 0) HERP | DERP\\\]
* 23[if (player.biggestTitSize > 0) HERP | DERP]
* 24 \\\[if (player.biggestLactation > 0) HERP | DERP\\\]
* 24[if (player.biggestLactation > 0) HERP | DERP]
* 25 \\\[if (player.isBiped == true) IS A BIPEDDDDD | not a biped.Wat ?\\\]
* 25[if (player.isBiped == true) IS A BIPEDDDDD | not a biped.Wat ?]
* 26 \\\[if (player.isBiped) IS A BIPEDDDDD | not a biped.Wat ?\\\]
* 26[if (player.isBiped) IS A BIPEDDDDD | not a biped.Wat ?]
* 27 \\\[if (player.isBipd) IS A BIPEDDDDD | not a biped.Wat ?\\\]
* 27[if (player.isBipd) IS A BIPEDDDDD | not a biped.Wat ?]



** Arbitrary function calls**


* \\\[eCockDescript 0\\\] - [eCockDescript 0]
    * \\\[eCockDescript\\\] - [eCockDescript]

        * \\\[cockDescript 0\\\] - [cockDescript 0]
            * \\\[cockDescript\\\] - [cockDescript]
                * Generic function calls will be cast to string
                    * \\\[player.cumQ\\\] - [player.cumQ]
                        * \`\[kFLAGS_REF.ARIAN_COCK_SIZE\]\` - [kFLAGS_REF.ARIAN_COCK_SIZE]
                        * \`\[flags kFLAGS_REF.ARIAN_COCK_SIZE\]\` - [flags kFLAGS_REF.ARIAN_COCK_SIZE]


                        ** Gender tests **

** PC **

* \\\[He\\\] - [He]
    * \\\[he\\\] - [he]
        * \\\[His\\\] - [His]
            * \\\[his\\\] - [his]
                * \\\[Him\\\] - [Him]
                    * \\\[him\\\] - [him]
                        * \\\[his\\\] - [his]
                            * \\\[His\\\] - [His]

                                ** NPC **

** Rubi **

* \\\[rubi ey\\\] - [rubi ey]
    * \\\[rubi eir\\\] - [rubi eir]
        * \\\[rubi eirs\\\] - [rubi eirs]
            * \\\[rubi emself\\\] - [rubi emself]
                * \\\[rubi Ey\\\] - [rubi Ey]
                    * \\\[rubi Eir\\\] - [rubi Eir]
                        * \\\[rubi Eirs\\\] - [rubi Eirs]
                            * \\\[rubi Emself\\\] - [rubi Emself]

                                ** Arian **

* \\\[arian ey\\\] - [arian ey]
    * \\\[arian eir\\\] - [arian eir]
        * \\\[arian eirs\\\] - [arian eirs]
            * \\\[arian emself\\\] - [arian emself]
                * \\\[arian Ey\\\] - [arian Ey]
                    * \\\[arian Eir\\\] - [arian Eir]
                        * \\\[arian Eirs\\\] - [arian Eirs]
                            * \\\[arian Emself\\\] - [arian Emself]

                                ** NPC Aspect tests **

* \\\[arian chest\\\] - [arian chest]
    * \\\[arian chestAdj\\\] - [arian chestAdj]
        * \\\[rubi breasts\\\] - [rubi breasts]
            * \\\[rubi cock\\\] - [rubi cock]

                ** Typical Noun usages **

* [cock] stiffening[cock biggest]and[vagina] starting to burn with need
* [cock all] stiffening[cock each]and[cock 1]starting to burn with need
* [cockhead biggest] stiffening[cockhead smallest]and[cockhead longest]and[cockhead 1]starting to burn with need

** Complex IF Statement thing **

\\\[if (hasCock = true) \\\[cock\\\] stiffening IFSTUFF \\\[if (hasVagina = true) \\\[vagina\\\] starting to burn with need\\\]IFSTUFFDONE\\\]\\\[if (isHerm = true) and \\\]\\\[if (hasVagina = true) \\\[vagina\\\] starting to burn with need\\\]
[if (hasCock = true) [cock] stiffening IFSTUFF[if (hasVagina = true) [vagina] starting to burn with need]IFSTUFFDONE][if (isHerm = true) and ][if (hasVagina = true) [vagina] starting to burn with need]

** FancyQuotes! **

    Convert Apostrophes '
It's a herm!

convert "
"derp a herp"


	]]>`, true, true);


        this.menu();
        this.addButton(4, "Back", this.debugPane)

    }

    // include "../../includes/combat.as";

    public endHpVictory(): void {
        this.monster.defeated_(true);
    }

    public endLustVictory(): void {
        this.monster.defeated_(false);
    }

    public endHpLoss(): void {
        this.monster.won_(true, false);
    }

    public endLustLoss(): void {
        if (this.player.findStatusAffect(StatusAffects.Infested) >= 0 && this.flags[kFLAGS.CAME_WORMS_AFTER_COMBAT] == 0) {
            this.flags[kFLAGS.CAME_WORMS_AFTER_COMBAT] = 1;
            infestOrgasm();
            this.monster.won_(false, true);
        } else {
            this.monster.won_(false, false);
        }
    }

    //combat is over. Clear shit out and go to main
    public cleanupAfterCombat(nextFunc = undefined): void {
        if (nextFunc == undefined) nextFunc = this.camp.returnToCampUseOneHour;
        if (this.inCombat) {
            //clear status
            this.clearStatuses(false);
            //Clear itemswapping in case it hung somehow
            //No longer used:		itemSwapping = false;
            //Player won
            if (this.monster.HP < 1 || this.monster.lust > 99) {
                this.awardPlayer();
            }
            //Player lost
            else {
                if (this.monster.statusAffectv1(StatusAffects.Sparring) == 2) {
                    this.outputText("The cow-girl has defeated you in a practice fight!", true);
                    this.outputText("\n\nYou have to lean on Isabella's shoulder while the two of your hike back to camp.  She clearly won.", false);
                    this.inCombat = false;
                    this.player.HP = 1;
                    this.statScreenRefresh();
                    this.doNext(nextFunc);
                    return;
                }
                //Next button is handled within the minerva loss function
                if (this.monster.findStatusAffect(StatusAffects.PeachLootLoss) >= 0) {
                    this.inCombat = false;
                    this.player.HP = 1;
                    this.statScreenRefresh();
                    return;
                }
                if (this.monster.short == "Ember") {
                    this.inCombat = false;
                    this.player.HP = 1;
                    this.statScreenRefresh();
                    this.doNext(nextFunc);
                    return;
                }
                temp = this.rand(10) + 1 + Math.round(this.monster.level / 2);
                if (inDungeon) temp += 20 + this.monster.level * 2;
                if (temp > this.player.gems) temp = this.player.gems;
                var timePasses: number = this.monster.handleCombatLossText(inDungeon, temp); //Allows monsters to customize the loss text and the amount of time lost
                this.player.gems -= temp;
                this.inCombat = false;
                //BUNUS XPZ
                if (this.flags[kFLAGS.COMBAT_BONUS_XP_VALUE] > 0) {
                    this.player.XP += this.flags[kFLAGS.COMBAT_BONUS_XP_VALUE];
                    this.outputText("  Somehow you managed to gain " + this.flags[kFLAGS.COMBAT_BONUS_XP_VALUE] + " XP from the situation.");
                    this.flags[kFLAGS.COMBAT_BONUS_XP_VALUE] = 0;
                }
                //Bonus lewts
                if (this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] != "") {
                    this.outputText("  Somehow you came away from the encounter with " + ItemType.lookupItem(this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID]).longName + ".\n\n");
                    this.inventory.takeItem(ItemType.lookupItem(this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID]), this.createCallBackFunction(this.camp.returnToCamp, timePasses));
                }
                else this.doNext(this.createCallBackFunction(this.camp.returnToCamp, timePasses));
            }
        }
        //Not actually in combat
        else this.doNext(nextFunc);
    }

    public approachAfterKnockback(): void {
        this.clearOutput();
        this.outputText("You close the distance between you and " + this.monster.a + this.monster.short + " as quickly as possible.\n\n");
        this.player.removeStatusAffect(StatusAffects.KnockedBack);
        this.enemyAI();
        return;
    }

    private canUseMagic(): boolean {
        if (this.player.findStatusAffect(StatusAffects.ThroatPunch) >= 0) return false;
        if (this.player.findStatusAffect(StatusAffects.WebSilence) >= 0) return false;
        if (this.player.findStatusAffect(StatusAffects.GooArmorSilence) >= 0) return false;
        return true;
    }

    public combatMenu(newRound: boolean = true): void { //If returning from a sub menu set newRound to false
        this.clearOutput();
        this.flags[kFLAGS.IN_COMBAT_USE_PLAYER_WAITED_FLAG] = 0;
        this.mainView.hideMenuButton(MainView.MENU_DATA);
        this.mainView.hideMenuButton(MainView.MENU_APPEARANCE);
        this.mainView.hideMenuButton(MainView.MENU_PERKS);
        this.hideUpDown();
        if (newRound) this.combatStatusesUpdate(); //Update Combat Statuses
        this.display();
        this.statScreenRefresh();
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        if (this.combatRoundOver()) return;
        this.menu();
        var attacks = this.normalAttack;
        var magic = (this.canUseMagic() ? this.magicMenu : undefined);
        var pSpecials = this.physicalSpecials;

        if (this.monster.findStatusAffect(StatusAffects.AttackDisabled) >= 0) {
            this.outputText("\n<b>Chained up as you are, you can't manage any real physical attacks!</b>");
            attacks = undefined;
        }
        if (this.monster.findStatusAffect(StatusAffects.PhysicalDisabled) >= 0) {
            this.outputText("<b>  Even physical special attacks are out of the question.</b>");
            pSpecials = undefined;
        }
        if (this.player.findStatusAffect(StatusAffects.KnockedBack) >= 0) {
            this.outputText("\n<b>You'll need to close some distance before you can use any physical attacks!</b>");
            this.addButton(0, "Approach", this.approachAfterKnockback);
            this.addButton(1, "Tease", this.teaseAttack);
            this.addButton(2, "Spells", magic);
            this.addButton(3, "Items", this.inventory.inventoryMenu);
            this.addButton(4, "Run", this.runAway);
            if (this.player.hasKeyItem("Bow") >= 0) this.addButton(5, "Bow", this.fireBow);
            this.addButton(6, "M. Specials", this.magicalSpecials);
            this.addButton(7, "Wait", this.wait);
            this.addButton(8, "Fantasize", this.fantasize);
        }
        else if (this.player.findStatusAffect(StatusAffects.IsabellaStunned) >= 0 || this.player.findStatusAffect(StatusAffects.Stunned) >= 0) {
            this.outputText("\n<b>You're too stunned to attack!</b>  All you can do is wait and try to recover!");
            this.addButton(0, "Recover", this.wait);
        }
        else if (this.player.findStatusAffect(StatusAffects.Whispered) >= 0) {
            this.outputText("\n<b>Your mind is too addled to focus on combat!</b>  All you can do is try and recover!");
            this.addButton(0, "Recover", this.wait);
        }
        else if (this.player.findStatusAffect(StatusAffects.Confusion) >= 0) {
            this.outputText("\nYou're too confused about who you are to try to attack!");
            this.addButton(0, "Recover", this.wait);
        }
        else if (this.player.findStatusAffect(StatusAffects.HarpyBind) >= 0 || this.player.findStatusAffect(StatusAffects.GooBind) >= 0 || this.player.findStatusAffect(StatusAffects.TentacleBind) >= 0 || this.player.findStatusAffect(StatusAffects.NagaBind) >= 0 || this.monster.findStatusAffect(StatusAffects.QueenBind) >= 0 || this.monster.findStatusAffect(StatusAffects.PCTailTangle) >= 0 || this.player.findStatusAffect(StatusAffects.HolliConstrict) >= 0 || this.player.findStatusAffect(StatusAffects.GooArmorBind) >= 0) {
            this.addButton(0, "Struggle", this.struggle);
            this.addButton(5, "Wait", this.wait);
        }
        else if (this.monster.findStatusAffect(StatusAffects.Constricted) >= 0) {
            this.addButton(0, "Squeeze", this.desert.nagaScene.naggaSqueeze);
            this.addButton(1, "Tease", this.desert.nagaScene.naggaTease);
            this.addButton(4, "Release", this.desert.nagaScene.nagaLeggoMyEggo);
        }
        else if (this.player.findStatusAffect(StatusAffects.Bound) >= 0) {
            this.addButton(0, "Struggle", (this.monster as Ceraph).ceraphBindingStruggle);
            this.addButton(5, "Wait", (this.monster as Ceraph).ceraphBoundWait);
        }
        else if (this.monster.findStatusAffect(StatusAffects.MinotaurEntangled) >= 0) {
            this.outputText("\n<b>You're bound up in the minotaur lord's chains!  All you can do is try to struggle free!</b>");
            this.addButton(0, "Struggle", this.struggle);
            this.addButton(5, "Wait", this.wait);
        }
        else if (this.player.findStatusAffect(StatusAffects.UBERWEB) >= 0) {
            this.addButton(0, "Struggle", this.struggle);
            this.addButton(6, "M. Specials", this.magicalSpecials);
        }
        else if (this.player.findStatusAffect(StatusAffects.Chokeslam) >= 0) {
            this.addButton(0, "Struggle", (this.monster as Izumi).chokeSlamStruggle);
            this.addButton(5, "Wait", (this.monster as Izumi).chokeSlamWait);
        }
        else if (this.player.findStatusAffect(StatusAffects.Titsmother) >= 0) {
            this.addButton(0, "Struggle", (this.monster as Izumi).titSmotherStruggle);
            this.addButton(5, "Wait", (this.monster as Izumi).titSmotherWait);
        }
        else if (this.player.findStatusAffect(StatusAffects.Tentagrappled) >= 0) {
            this.outputText("\n<b>The demonesses tentacles are constricting your limbs!</b>");
            this.addButton(0, "Struggle", (this.monster as SuccubusGardener).grappleStruggle);
            this.addButton(5, "Wait", (this.monster as SuccubusGardener).grappleWait);
        }
        else { //REGULAR MENU
            this.addButton(0, "Attack", attacks);
            this.addButton(1, "Tease", this.teaseAttack);
            this.addButton(2, "Spells", magic);
            this.addButton(3, "Items", this.inventory.inventoryMenu);
            this.addButton(4, "Run", this.runAway);
            this.addButton(5, "P. Specials", pSpecials);
            this.addButton(6, "M. Specials", this.magicalSpecials);
            this.addButton(7, (this.monster.findStatusAffect(StatusAffects.Level) >= 0 ? "Climb" : "Wait"), this.wait);
            this.addButton(8, "Fantasize", this.fantasize);
            if (CoC_Settings.debugBuild && !this.debug) this.addButton(9, "Inspect", this.debugInspect);
        }
    }

    private teaseAttack(): void {
        if (this.monster.lustVuln == 0) {
            this.clearOutput();
            this.outputText("You try to tease " + this.monster.a + this.monster.short + " with your body, but it doesn't have any effect on " + this.monster.pronoun2 + ".\n\n");
            this.enemyAI();
        }
        //Worms are immune!
        else if (this.monster.short == "worms") {
            this.clearOutput();
            this.outputText("Thinking to take advantage of its humanoid form, you wave your cock and slap your ass in a rather lewd manner. However, the creature fails to react to your suggestive actions.\n\n");
            this.enemyAI();
        }
        else {
            this.tease();
            if (!this.combatRoundOver()) this.enemyAI();
        }
    }

    private normalAttack(): void {
        this.clearOutput();
        this.attack();
    }

    public packAttack(): void {
        //Determine if dodged!
        if (this.player.spe - this.monster.spe > 0 && Math.floor(Math.random() * (((this.player.spe - this.monster.spe) / 4) + 80)) > 80) {
            this.outputText("You duck, weave, and dodge.  Despite their best efforts, the throng of demons only hit the air and each other.");
        }
        //Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && this.rand(100) < 10) {
            this.outputText("Using your skills at evading attacks, you anticipate and sidestep " + this.monster.a + this.monster.short + "' attacks.");
        }
        //("Misdirection"
        else if (this.player.findPerk(PerkLib.Misdirection) >= 0 && this.rand(100) < 15 && this.player.armorName == "red, high-society bodysuit") {
            this.outputText("Using Raphael's teachings, you anticipate and sidestep " + this.monster.a + this.monster.short + "' attacks.");
        }
        //Determine if cat'ed
        else if (this.player.findPerk(PerkLib.Flexibility) >= 0 && this.rand(100) < 6) {
            this.outputText("With your incredible flexibility, you squeeze out of the way of " + this.monster.a + this.monster.short + "' attacks.");
        }
        else {
            temp = Math.floor((this.monster.str + this.monster.weaponAttack) - this.rand(this.player.tou) - this.player.armorDef); //Determine damage - str modified by enemy toughness!
            if (temp <= 0) {
                temp = 0;
                if (!this.monster.plural)
                    this.outputText("You deflect and block every " + this.monster.weaponVerb + " " + this.monster.a + this.monster.short + " throw at you.");
                else this.outputText("You deflect " + this.monster.a + this.monster.short + " " + this.monster.weaponVerb + ".");
            }
            else {
                temp = this.takeDamage(temp);
                if (temp <= 5)
                    this.outputText("You are struck a glancing blow by " + this.monster.a + this.monster.short + "! (" + temp + ")");
                else if (temp <= 10)
                    this.outputText(this.monster.capitalA + this.monster.short + " wound you! (" + temp + ")");
                else if (temp <= 20)
                    this.outputText(this.monster.capitalA + this.monster.short + " stagger you with the force of " + this.monster.pronoun3 + " " + this.monster.weaponVerb + "s! (" + temp + ")");
                else this.outputText(this.monster.capitalA + this.monster.short + " <b>mutilates</b> you with powerful fists and " + this.monster.weaponVerb + "s! (" + temp + ")");
            }
            this.statScreenRefresh();
            this.outputText("\n");
        }
        this.combatRoundOver();
    }

    public lustAttack(): void {
        if (this.player.lust < 35) {
            this.outputText("The " + this.monster.short + " press in close against you and although they fail to hit you with an attack, the sensation of their skin rubbing against yours feels highly erotic.");
        }
        else if (this.player.lust < 65) {
            this.outputText("The push of the " + this.monster.short + "' sweaty, seductive bodies sliding over yours is deliciously arousing and you feel your ");
            if (this.player.cocks.length > 0)
                this.outputText(this.player.multiCockDescriptLight() + " hardening ");
            else if (this.player.vaginas.length > 0) this.outputText(this.vaginaDescript(0) + " get wetter ");
            this.outputText("in response to all the friction.");
        }
        else {
            this.outputText("As the " + this.monster.short + " mill around you, their bodies rub constantly over yours, and it becomes harder and harder to keep your thoughts on the fight or resist reaching out to touch a well lubricated cock or pussy as it slips past.  You keep subconsciously moving your ");
            if (this.player.gender == 1) this.outputText(this.player.multiCockDescriptLight() + " towards the nearest inviting hole.");
            if (this.player.gender == 2) this.outputText(this.vaginaDescript(0) + " towards the nearest swinging cock.");
            if (this.player.gender == 3) this.outputText("aching cock and thirsty pussy towards the nearest thing willing to fuck it.");
            if (this.player.gender == 0) this.outputText("groin, before remember there is nothing there to caress.");
        }
        this.dynStats("lus", 10 + this.player.sens / 10);
        this.combatRoundOver();
    }

    private wait(): void {
        //Gain fatigue if not fighting sand tarps
        if (this.monster.findStatusAffect(StatusAffects.Level) < 0) this.fatigue(- 5);
        this.flags[kFLAGS.IN_COMBAT_USE_PLAYER_WAITED_FLAG] = 1;
        if (this.monster.findStatusAffect(StatusAffects.PCTailTangle) >= 0) {
            (this.monster as Kitsune).kitsuneWait();
        }
        else if (this.monster.findStatusAffect(StatusAffects.Level) >= 0) {
            (this.monster as SandTrap).sandTrapWait();
        }
        else if (this.monster.findStatusAffect(StatusAffects.MinotaurEntangled) >= 0) {
            this.clearOutput();
            this.outputText("You sigh and relax in the chains, eying the well-endowed minotaur as you await whatever rough treatment he desires to give.  His musky, utterly male scent wafts your way on the wind, and you feel droplets of your lust dripping down your thighs.  You lick your lips as you watch the pre-cum drip from his balls, eager to get down there and worship them.  Why did you ever try to struggle against this fate?\n\n");
            this.dynStats("lus", 30 + this.rand(5), "resisted", false);
            this.enemyAI();
        }
        else if (this.player.findStatusAffect(StatusAffects.Whispered) >= 0) {
            this.clearOutput();
            this.outputText("You shake off the mental compulsions and ready yourself to fight!\n\n");
            this.player.removeStatusAffect(StatusAffects.Whispered);
            this.enemyAI();
        }
        else if (this.player.findStatusAffect(StatusAffects.HarpyBind) >= 0) {
            this.clearOutput();
            temp = 80 + this.rand(40);
            temp = this.takeDamage(temp);
            this.outputText("The brood continues to hammer away at your defenseless self. (" + temp + ")");
            this.combatRoundOver();
        }
        else if (this.monster.findStatusAffect(StatusAffects.QueenBind) >= 0) {
            ropeStruggles(true);
        }
        else if (this.player.findStatusAffect(StatusAffects.GooBind) >= 0) {
            this.clearOutput();
            this.outputText("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours.");
            temp = this.takeDamage(.35 * this.maxHP());
            this.outputText(" (" + temp + ")");
            this.combatRoundOver();
        }
        else if (this.player.findStatusAffect(StatusAffects.GooArmorBind) >= 0) {
            this.clearOutput();
            this.outputText("Suddenly, the goo-girl leaks half-way out of her heavy armor and lunges at you. You attempt to dodge her attack, but she doesn't try and hit you - instead, she wraps around you, pinning your arms to your chest. More and more goo latches onto you - you'll have to fight to get out of this.");
            this.player.addStatusValue(StatusAffects.GooArmorBind, 1, 1);
            if (this.player.statusAffectv1(StatusAffects.GooArmorBind) >= 5) {
                if (this.monster.findStatusAffect(StatusAffects.Spar) >= 0)
                    this.valeria.pcWinsValeriaSparDefeat();
                else gooArmorBeatsUpPC();
                return;
            }
            this.combatRoundOver();
        }
        else if (this.player.findStatusAffect(StatusAffects.NagaBind) >= 0) {
            this.clearOutput();
            this.outputText("The naga's grip on you tightens as you relax into the stimulating pressure.");
            this.dynStats("lus", this.player.sens / 5 + 5);
            this.takeDamage(5 + this.rand(5));
            this.combatRoundOver();
        }
        else if (this.player.findStatusAffect(StatusAffects.HolliConstrict) >= 0) {
            (this.monster as Holli).waitForHolliConstrict(true);
        }
        else if (this.player.findStatusAffect(StatusAffects.TentacleBind) >= 0) {
            this.clearOutput();
            if (this.player.cocks.length > 0)
                this.outputText("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you!");
            else if (this.player.hasVagina())
                this.outputText("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing!");
            else this.outputText("The creature continues probing at your asshole and has now latched " + this.num2Text(this.player.totalNipples()) + " more suckers onto your nipples, amplifying your growing lust.  You must escape or you will become a mere toy to this thing!");
            this.dynStats("lus", (8 + this.player.sens / 10));
            this.combatRoundOver();
        }
        else if (this.player.findStatusAffect(StatusAffects.IsabellaStunned) >= 0) {
            this.clearOutput();
            this.outputText("You wobble about for some time but manage to recover. Isabella capitalizes on your wasted time to act again.\n\n");
            this.player.removeStatusAffect(StatusAffects.IsabellaStunned);
            this.enemyAI();
        }
        else if (this.player.findStatusAffect(StatusAffects.Stunned) >= 0) {
            this.clearOutput();
            this.outputText("You wobble about, stunned for a moment.  After shaking your head, you clear the stars from your vision, but by then you've squandered your chance to act.\n\n");
            this.player.removeStatusAffect(StatusAffects.Stunned);
            this.enemyAI();
        }
        else if (this.player.findStatusAffect(StatusAffects.Confusion) >= 0) {
            this.clearOutput();
            this.outputText("You shake your head and file your memories in the past, where they belong.  It's time to fight!\n\n");
            this.player.removeStatusAffect(StatusAffects.Confusion);
            this.enemyAI();
        }
        else if (this.monster instanceof Doppleganger) {
            this.clearOutput();
            this.outputText("You decide not to take any action this round.\n\n");
            (this.monster as Doppleganger).handlePlayerWait();
            this.enemyAI();
        }
        else {
            this.clearOutput();
            this.outputText("You decide not to take any action this round.\n\n");
            this.enemyAI();
        }
    }

    private struggle(): void {
        if (this.monster.findStatusAffect(StatusAffects.MinotaurEntangled) >= 0) {
            this.clearOutput();
            if (this.player.str / 9 + this.rand(20) + 1 >= 15) {
                this.outputText("Utilizing every ounce of your strength and cunning, you squirm wildly, shrugging through weak spots in the chain's grip to free yourself!  Success!");
                this.monster.removeStatusAffect(StatusAffects.MinotaurEntangled);
                this.outputText("\n\n\"<i>No!  You fool!  You let her get away!  Hurry up and finish her up!  I need my serving!</i>\"  The succubus spits out angrily.\n\n");
                this.combatRoundOver();
            }
            //Struggle Free Fail*
            else {
                this.outputText("You wiggle and struggle with all your might, but the chains remain stubbornly tight, binding you in place.  Damnit!  You can't lose like this!\n\n");
                this.enemyAI();
            }
        }
        else if (this.monster.findStatusAffect(StatusAffects.PCTailTangle) >= 0) {
            (this.monster as Kitsune).kitsuneStruggle();
        }
        else if (this.player.findStatusAffect(StatusAffects.HolliConstrict) >= 0) {
            (this.monster as Holli).struggleOutOfHolli();
        }
        else if (this.monster.findStatusAffect(StatusAffects.QueenBind) >= 0) {
            ropeStruggles();
        }
        else if (this.player.findStatusAffect(StatusAffects.GooBind) >= 0) {
            this.clearOutput();
            //[Struggle](successful) :
            if (this.rand(3) == 0 || this.rand(80) < this.player.str) {
                this.outputText("You claw your fingers wildly within the slime and manage to brush against her heart-shaped nucleus. The girl silently gasps and loses cohesion, allowing you to pull yourself free while she attempts to solidify.");
                this.player.removeStatusAffect(StatusAffects.GooBind);
            }
            //Failed struggle
            else {
                this.outputText("You writhe uselessly, trapped inside the goo girl's warm, seething body. Darkness creeps at the edge of your vision as you are lulled into surrendering by the rippling vibrations of the girl's pulsing body around yours.");
                temp = this.takeDamage(.15 * this.maxHP());
                this.outputText(" (" + temp + ")", false);
            }
            this.combatRoundOver();
        }
        else if (this.player.findStatusAffect(StatusAffects.HarpyBind) >= 0) {
            harpyHordeGangBangStruggle();
        }
        else if (this.player.findStatusAffect(StatusAffects.GooArmorBind) >= 0) {
            struggleAtGooBind();
        }
        else if (this.player.findStatusAffect(StatusAffects.UBERWEB) >= 0) {
            this.clearOutput();
            this.outputText("You claw your way out of the webbing while Kiha does her best to handle the spiders single-handedly!\n\n");
            this.player.removeStatusAffect(StatusAffects.UBERWEB);
            this.enemyAI();
        }
        else if (this.player.findStatusAffect(StatusAffects.NagaBind) >= 0) {
            this.clearOutput();
            if (this.rand(3) == 0 || this.rand(80) < this.player.str / 1.5) {
                this.outputText("You wriggle and squirm violently, tearing yourself out from within the naga's coils.");
                this.player.removeStatusAffect(StatusAffects.NagaBind);
            }
            else {
                this.outputText("The naga's grip on you tightens as you struggle to break free from the stimulating pressure.");
                this.dynStats("lus", this.player.sens / 10 + 2);
                this.takeDamage(7 + this.rand(5));
            }
            this.combatRoundOver();
        }
        else {
            this.clearOutput();
            this.outputText("You struggle with all of your might to free yourself from the tentacles before the creature can fulfill whatever unholy desire it has for you.\n");
            //33% chance to break free + up to 50% chance for strength
            if (this.rand(3) == 0 || this.rand(80) < this.player.str / 2) {
                this.outputText("As the creature attempts to adjust your position in its grip, you free one of your " + this.player.legs() + " and hit the beast in its beak, causing it to let out an inhuman cry and drop you to the ground smartly.\n\n");
                this.player.removeStatusAffect(StatusAffects.TentacleBind);
                this.monster.createStatusAffect(StatusAffects.TentacleCoolDown, 3, 0, 0, 0);
                this.enemyAI();
            }
            //Fail to break free
            else {
                this.outputText("Despite trying to escape, the creature only tightens its grip, making it difficult to breathe.\n\n");
                this.takeDamage(5);
                if (this.player.cocks.length > 0)
                    this.outputText("The creature continues spiraling around your cock, sending shivers up and down your body. You must escape or this creature will overwhelm you!");
                else if (this.player.hasVagina())
                    this.outputText("The creature continues sucking your clit and now has latched two more suckers on your nipples, amplifying your growing lust. You must escape or you will become a mere toy to this thing!");
                else this.outputText("The creature continues probing at your asshole and has now latched " + this.num2Text(this.player.totalNipples()) + " more suckers onto your nipples, amplifying your growing lust.  You must escape or you will become a mere toy to this thing!");
                this.dynStats("lus", (3 + this.player.sens / 10 + this.player.lib / 20));
                this.combatRoundOver();
            }
        }
    }

    private fireBow(): void {
        this.clearOutput();
        if (this.player.fatigue + this.physicalCost(25) > 100) {
            this.outputText("You're too fatigued to fire the bow!");
            this.menu();
            this.addButton(0, "Next", this.combatMenu, false);
            return;
        }
        if (this.monster.findStatusAffect(StatusAffects.BowDisabled) >= 0) {
            this.outputText("You can't use your bow right now!");
            this.menu();
            this.addButton(0, "Next", this.combatMenu, false);
            return;
        }
        this.fatigue(25, 2);
        //Keep logic sane if this attack brings victory
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        //Amily!
        if (this.monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            this.outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            this.enemyAI();
            return;
        }
        //Prep messages vary by skill.
        if (this.player.statusAffectv1(StatusAffects.Kelt) < 30) {
            this.outputText("Fumbling a bit, you nock an arrow and fire!\n");
        }
        else if (this.player.statusAffectv1(StatusAffects.Kelt) < 50) {
            this.outputText("You pull an arrow and fire it at " + this.monster.a + this.monster.short + "!\n");
        }
        else if (this.player.statusAffectv1(StatusAffects.Kelt) < 80) {
            this.outputText("With one smooth motion you draw, nock, and fire your deadly arrow at your opponent!\n");
        }
        else if (this.player.statusAffectv1(StatusAffects.Kelt) <= 99) {
            this.outputText("In the blink of an eye you draw and fire your bow directly at " + this.monster.a + this.monster.short + ".\n");
        }
        else {
            this.outputText("You casually fire an arrow at " + this.monster.a + this.monster.short + " with supreme skill.\n");
            //Keep it from going over 100
            this.player.changeStatusValue(StatusAffects.Kelt, 1, 100);
        }
        if (this.monster.findStatusAffect(StatusAffects.Sandstorm) >= 0 && this.rand(10) > 1) {
            this.outputText("Your shot is blown off target by the tornado of sand and wind.  Damn!\n\n");
            this.enemyAI();
            return;
        }
        //[Bow Response]
        if (this.monster.short == "Isabella") {
            if (this.monster.findStatusAffect(StatusAffects.Blind) >= 0)
                this.outputText("Isabella hears the shot and turns her shield towards it, completely blocking it with her wall of steel.\n\n");
            else this.outputText("You arrow thunks into Isabella's shield, completely blocked by the wall of steel.\n\n");
            if (this.isabellaFollowerScene.isabellaAccent())
                this.outputText("\"<i>You remind me of ze horse-people.  They cannot deal vith mein shield either!</i>\" cheers Isabella.\n\n");
            else this.outputText("\"<i>You remind me of the horse-people.  They cannot deal with my shield either!</i>\" cheers Isabella.\n\n");
            this.enemyAI();
            return;
        }
        //worms are immune
        if (this.monster.short == "worms") {
            this.outputText("The arrow slips between the worms, sticking into the ground.\n\n");
            this.enemyAI();
            return;
        }
        //Vala miss chance!
        if (this.monster.short == "Vala" && this.rand(10) < 7) {
            this.outputText("Vala flaps her wings and twists her body. Between the sudden gust of wind and her shifting of position, the arrow goes wide.\n\n");
            this.enemyAI();
            return;
        }
        //Blind miss chance
        if (this.player.findStatusAffect(StatusAffects.Blind) >= 0) {
            this.outputText("The arrow hits something, but blind as you are, you don't have a chance in hell of hitting anything with a bow.\n\n");
            this.enemyAI();
            return;
        }
        //Miss chance 10% based on speed + 10% based on int + 20% based on skill
        if (this.monster.short != "pod" && this.player.spe / 10 + this.player.inte / 10 + this.player.statusAffectv1(StatusAffects.Kelt) / 5 + 60 < this.rand(101)) {
            this.outputText("The arrow goes wide, disappearing behind your foe.\n\n");
            this.enemyAI();
            return;
        }
        //Hit!  Damage calc! 20 +
        var damage: number = 0;
        damage = Math.floor((20 + this.player.str / 3 + this.player.statusAffectv1(StatusAffects.Kelt) / 1.2) + this.player.spe / 3 - this.rand(this.monster.tou) - this.monster.armorDef);
        if (damage < 0) damage = 0;
        if (damage == 0) {
            if (this.monster.inte > 0)
                this.outputText(this.monster.capitalA + this.monster.short + " shrugs as the arrow bounces off them harmlessly.\n\n");
            else this.outputText("The arrow bounces harmlessly off " + this.monster.a + this.monster.short + ".\n\n");
            this.enemyAI();
            return;
        }
        if (this.monster.short == "pod")
            this.outputText("The arrow lodges deep into the pod's fleshy wall");
        else if (this.monster.plural)
            this.outputText(this.monster.capitalA + this.monster.short + " look down at the arrow that now protrudes from one of " + this.monster.pronoun3 + " bodies");
        else this.outputText(this.monster.capitalA + this.monster.short + " looks down at the arrow that now protrudes from " + this.monster.pronoun3 + " body");
        if (this.player.findPerk(PerkLib.HistoryFighter) >= 0) damage *= 1.1;
        damage = this.doDamage(damage);
        this.monster.lust -= 20;
        if (this.monster.lust < 0) this.monster.lust = 0;
        if (this.monster.HP <= 0) {
            if (this.monster.short == "pod")
                this.outputText(". (" + String(damage) + ")\n\n");
            else if (this.monster.plural)
                this.outputText(" and stagger, collapsing onto each other from the wounds you've inflicted on " + this.monster.pronoun2 + ".  (" + String(damage) + ")\n\n");
            else this.outputText(" and staggers, collapsing from the wounds you've inflicted on " + this.monster.pronoun2 + ".  (" + String(damage) + ")\n\n");
            this.doNext(this.endHpVictory);
            return;
        }
        else this.outputText(".  It's clearly very painful. (" + String(damage) + ")\n\n");
        this.enemyAI();
    }

    private fireBreathMenu(): void {
        this.clearOutput();
        this.outputText("Which of your special fire-breath attacks would you like to use?");
        this.simpleChoices("Akbal's", this.fireballuuuuu, "Hellfire", this.hellFire, "Dragonfire", this.dragonBreath, "", undefined, "Back", this.playerMenu);
    }

    private debugInspect(): void {
        this.outputText(this.monster.generateDebugDescription());
        this.doNext(this.playerMenu);
    }

    //Fantasize
    public fantasize(): void {
        var temp2: number = 0;
        this.doNext(this.combatMenu);
        this.outputText("", true);
        if (this.player.armorName == "goo armor") {
            this.outputText("As you fantasize, you feel Valeria rubbing her gooey body all across your sensitive skin");
            if (this.player.gender > 0) this.outputText(" and genitals");
            this.outputText(", arousing you even further.\n");
            temp2 = 25 + this.rand(this.player.lib / 8 + this.player.cor / 8)
        }
        else if (this.player.balls > 0 && this.player.ballSize >= 10 && this.rand(2) == 0) {
            this.outputText("You daydream about fucking " + this.monster.a + this.monster.short + ", feeling your balls swell with seed as you prepare to fuck " + this.monster.pronoun2 + " full of cum.\n", false);
            temp2 = 5 + this.rand(this.player.lib / 8 + this.player.cor / 8);
            this.outputText("You aren't sure if it's just the fantasy, but your " + this.ballsDescriptLight() + " do feel fuller than before...\n", false);
            this.player.hoursSinceCum += 50;
        }
        else if (this.player.biggestTitSize() >= 6 && this.rand(2) == 0) {
            this.outputText("You fantasize about grabbing " + this.monster.a + this.monster.short + " and shoving " + this.monster.pronoun2 + " in between your jiggling mammaries, nearly suffocating " + this.monster.pronoun2 + " as you have your way.\n", false);
            temp2 = 5 + this.rand(this.player.lib / 8 + this.player.cor / 8)
        }
        else if (this.player.biggestLactation() >= 6 && this.rand(2) == 0) {
            this.outputText("You fantasize about grabbing " + this.monster.a + this.monster.short + " and forcing " + this.monster.pronoun2 + " against a " + this.nippleDescript(0) + ", and feeling your milk let down.  The desire to forcefeed SOMETHING makes your nipples hard and moist with milk.\n", false);
            temp2 = 5 + this.rand(this.player.lib / 8 + this.player.cor / 8)
        }
        else {
            this.outputText("You fill your mind with perverted thoughts about " + this.monster.a + this.monster.short + ", picturing " + this.monster.pronoun2 + " in all kinds of perverse situations with you.\n", true);
            temp2 = 10 + this.rand(this.player.lib / 5 + this.player.cor / 8);
        }
        if (temp2 >= 20) this.outputText("The fantasy is so vivid and pleasurable you wish it was happening now.  You wonder if " + this.monster.a + this.monster.short + " can tell what you were thinking.\n\n", false);
        else this.outputText("\n", false);
        this.dynStats("lus", temp2, "resisted", false);
        if (this.player.lust > 99) {
            if (this.monster.short == "pod") {
                this.outputText("<b>You nearly orgasm, but the terror of the situation reasserts itself, muting your body's need for release.  If you don't escape soon, you have no doubt you'll be too fucked up to ever try again!</b>\n\n", false);
                this.player.lust = 99;
                this.dynStats("lus", -25);
            }
            else {
                this.doNext(this.endLustLoss);
                return;
            }
        }
        this.enemyAI();
    }
    //Mouf Attack
    // (Similar to the bow attack, high damage but it raises your fatigue).
    public bite(): void {
        if (this.player.fatigue + this.physicalCost(25) > 100) {
            this.outputText("You're too fatigued to use your shark-like jaws!", true);
            this.menu();
            this.addButton(0, "Next", this.combatMenu, false);
            return;
        }
        //Worms are special
        if (this.monster.short == "worms") {
            this.outputText("There is no way those are going anywhere near your mouth!\n\n", true);
            this.menu();
            this.addButton(0, "Next", this.combatMenu, false);
            return;
        }
        this.fatigue(25, 2);
        //Amily!
        if (this.monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            this.outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            this.enemyAI();
            return;
        }
        this.outputText("You open your mouth wide, your shark teeth extending out. Snarling with hunger, you lunge at your opponent, set to bite right into them!  ", true);
        if (this.player.findStatusAffect(StatusAffects.Blind) >= 0) this.outputText("In hindsight, trying to bite someone while blind was probably a bad idea... ", false);
        var damage: number = 0;
        //Determine if dodged!
        if ((this.player.findStatusAffect(StatusAffects.Blind) >= 0 && this.rand(3) != 0) || (this.monster.spe - this.player.spe > 0 && Math.floor(Math.random() * (((this.monster.spe - this.player.spe) / 4) + 80)) > 80)) {
            if (this.monster.spe - this.player.spe < 8) this.outputText(this.monster.capitalA + this.monster.short + " narrowly avoids your attack!", false);
            if (this.monster.spe - this.player.spe >= 8 && this.monster.spe - this.player.spe < 20) this.outputText(this.monster.capitalA + this.monster.short + " dodges your attack with superior quickness!", false);
            if (this.monster.spe - this.player.spe >= 20) this.outputText(this.monster.capitalA + this.monster.short + " deftly avoids your slow attack.", false);
            this.outputText("\n\n", false);
            this.enemyAI();
            return;
        }
        //Determine damage - str modified by enemy toughness!
        damage = Math.floor((this.player.str + 45) - this.rand(this.monster.tou) - this.monster.armorDef);

        //Deal damage and update based on perks
        if (damage > 0) {
            if (this.player.findPerk(PerkLib.HistoryFighter) >= 0) damage *= 1.1;
            damage = this.doDamage(damage);
        }

        if (damage <= 0) {
            damage = 0;
            this.outputText("Your bite is deflected or blocked by " + this.monster.a + this.monster.short + ".", false);
        }
        if (damage > 0 && damage < 10) {
            this.outputText("You bite doesn't do much damage to " + this.monster.a + this.monster.short + "! (" + damage + ")", false);
        }
        if (damage >= 10 && damage < 20) {
            this.outputText("You seriously wound " + this.monster.a + this.monster.short + " with your bite! (" + damage + ")", false);
        }
        if (damage >= 20 && damage < 30) {
            this.outputText("Your bite staggers " + this.monster.a + this.monster.short + " with its force. (" + damage + ")", false);
        }
        if (damage >= 30) {
            this.outputText("Your powerful bite <b>mutilates</b> " + this.monster.a + this.monster.short + "! (" + damage + ")", false);
        }
        this.outputText("\n\n", false);
        //Kick back to main if no damage occured!
        if (this.monster.HP > 0 && this.monster.lust < 100) {
            this.enemyAI();
        }
        else {
            if (this.monster.HP <= 0) this.doNext(this.endHpVictory);
            else this.doNext(this.endLustVictory);
        }
    }

    public fatigueRecovery(): void {
        this.fatigue(- 1);
        if (this.player.findPerk(PerkLib.EnlightenedNinetails) >= 0 || this.player.findPerk(PerkLib.CorruptedNinetails) >= 0) this.fatigue(-(1 + this.rand(3)));
    }

    //ATTACK
    public attack(): void {
        if (this.player.findStatusAffect(StatusAffects.FirstAttack) < 0) {
            this.outputText("", true);
            this.fatigueRecovery();
        }
        if (this.player.findStatusAffect(StatusAffects.Sealed) >= 0 && this.player.statusAffectv2(StatusAffects.Sealed) == 0) {
            this.outputText("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  The kitsune's seals have made normal attack impossible!  Maybe you could try something else?\n\n", false);
            this.enemyAI();
            return;
        }
        if (this.flags[kFLAGS.PC_FETISH] >= 3 && !this.urtaQuest.isUrta()) {
            this.outputText("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  Ceraph's piercings have made normal attack impossible!  Maybe you could try something else?\n\n", false);
            this.enemyAI();
            return;
        }
        //Amily!
        if (this.monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            this.outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            this.enemyAI();
            return;
        }
        if (this.monster.findStatusAffect(StatusAffects.Level) >= 0 && this.player.findStatusAffect(StatusAffects.FirstAttack) < 0) {
            this.outputText("It's all or nothing!  With a bellowing cry you charge down the treacherous slope and smite the sandtrap as hard as you can!  ");
            (this.monster as SandTrap).trapLevel(-4);
        }
        if (this.player.findPerk(PerkLib.DoubleAttack) >= 0 && this.player.spe >= 50 && this.flags[kFLAGS.DOUBLE_ATTACK_STYLE] < 2) {
            if (this.player.findStatusAffect(StatusAffects.FirstAttack) >= 0) this.player.removeStatusAffect(StatusAffects.FirstAttack);
            else {
                //Always!
                if (this.flags[kFLAGS.DOUBLE_ATTACK_STYLE] == 0) this.player.createStatusAffect(StatusAffects.FirstAttack, 0, 0, 0, 0);
                //Alternate!
                else if (this.player.str < 61 && this.flags[kFLAGS.DOUBLE_ATTACK_STYLE] == 1) this.player.createStatusAffect(StatusAffects.FirstAttack, 0, 0, 0, 0);
            }
        }
        //"Brawler perk". Urta only. Thanks to Fenoxo for pointing this out... Even though that should have been obvious :<
        //Urta has fists and the Brawler perk. Don't check for that because Urta can't drop her fists or lose the perk!
        else if (this.urtaQuest.isUrta()) {
            if (this.player.findStatusAffect(StatusAffects.FirstAttack) >= 0) {
                this.player.removeStatusAffect(StatusAffects.FirstAttack);
            }
            else {
                this.player.createStatusAffect(StatusAffects.FirstAttack, 0, 0, 0, 0);
                this.outputText("Utilizing your skills as a bareknuckle brawler, you make two attacks!\n");
            }
        }
        //Blind
        if (this.player.findStatusAffect(StatusAffects.Blind) >= 0) {
            this.outputText("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ", false);
        }
        if (this.monster instanceof Basilisk) {
            //basilisk counter attack (block attack, significant speed loss): 
            if (this.player.inte / 5 + this.rand(20) < 25) {
                this.outputText("Holding the basilisk in your peripheral vision, you charge forward to strike it.  Before the moment of impact, the reptile shifts its posture, dodging and flowing backward skillfully with your movements, trying to make eye contact with you. You find yourself staring directly into the basilisk's face!  Quickly you snap your eyes shut and recoil backwards, swinging madly at the lizard to force it back, but the damage has been done; you can see the terrible grey eyes behind your closed lids, and you feel a great weight settle on your bones as it becomes harder to move.", false);
                Basilisk.basiliskSpeed(this.player, 20);
                this.player.removeStatusAffect(StatusAffects.FirstAttack);
                this.combatRoundOver();
                return;
            }
            //Counter attack fails: (random chance if PC int > 50 spd > 60; PC takes small physical damage but no block or spd penalty)
            else {
                this.outputText("Holding the basilisk in your peripheral vision, you charge forward to strike it.  Before the moment of impact, the reptile shifts its posture, dodging and flowing backward skillfully with your movements, trying to make eye contact with you. You twist unexpectedly, bringing your " + this.player.weaponName + " up at an oblique angle; the basilisk doesn't anticipate this attack!  ", false);
            }
        }
        //Worms are special
        if (this.monster.short == "worms") {
            //50% chance of hit (int boost)
            if (this.rand(100) + this.player.inte / 3 >= 50) {
                temp = Math.floor(this.player.str / 5 - this.rand(5));
                if (temp == 0) temp = 1;
                this.outputText("You strike at the amalgamation, crushing countless worms into goo, dealing " + temp + " damage.\n\n", false);
                this.monster.HP -= temp;
                if (this.monster.HP <= 0) {
                    this.doNext(this.endHpVictory);
                    return;
                }
            }
            //Fail
            else {
                this.outputText("You attempt to crush the worms with your reprisal, only to have the collective move its individual members, creating a void at the point of impact, leaving you to attack only empty air.\n\n", false);
            }
            if (this.player.findStatusAffect(StatusAffects.FirstAttack) >= 0) {
                this.attack();
                return;
            }
            this.enemyAI();
            return;
        }

        var damage: number = 0;
        //Determine if dodged!
        if ((this.player.findStatusAffect(StatusAffects.Blind) >= 0 && this.rand(2) == 0) || (this.monster.spe - this.player.spe > 0 && Math.floor(Math.random() * (((this.monster.spe - this.player.spe) / 4) + 80)) > 80)) {
            //Akbal dodges special education
            if (this.monster.short == "Akbal") this.outputText("Akbal moves like lightning, weaving in and out of your furious strikes with the speed and grace befitting his jaguar body.\n", false);
            else if (this.monster.short == "plain girl") this.outputText("You wait patiently for your opponent to drop her guard. She ducks in and throws a right cross, which you roll away from before smacking your " + this.player.weaponName + " against her side. Astonishingly, the attack appears to phase right through her, not affecting her in the slightest. You glance down to your " + this.player.weaponName + " as if betrayed.\n", false);
            else if (this.monster.short == "kitsune") {
                //Player Miss:
                this.outputText("You swing your [weapon] ferociously, confident that you can strike a crushing blow.  To your surprise, you stumble awkwardly as the attack passes straight through her - a mirage!  You curse as you hear a giggle behind you, turning to face her once again.\n\n");
            }
            else {
                if (this.monster.spe - this.player.spe < 8) this.outputText(this.monster.capitalA + this.monster.short + " narrowly avoids your attack!", false);
                if (this.monster.spe - this.player.spe >= 8 && this.monster.spe - this.player.spe < 20) this.outputText(this.monster.capitalA + this.monster.short + " dodges your attack with superior quickness!", false);
                if (this.monster.spe - this.player.spe >= 20) this.outputText(this.monster.capitalA + this.monster.short + " deftly avoids your slow attack.", false);
                this.outputText("\n", false);
                if (this.player.findStatusAffect(StatusAffects.FirstAttack) >= 0) {
                    this.attack();
                    return;
                }
                else this.outputText("\n", false);
            }
            this.enemyAI();
            return;
        }
        //BLOCKED ATTACK:
        if (this.monster.findStatusAffect(StatusAffects.Earthshield) >= 0 && this.rand(4) == 0) {
            this.outputText("Your strike is deflected by the wall of sand, dirt, and rock!  Damn!\n");
            if (this.player.findStatusAffect(StatusAffects.FirstAttack) >= 0) {
                this.attack();
                return;
            }
            else this.outputText("\n", false);
            this.enemyAI();
            return;
        }
        //Determine damage
        /*Determine damage - str modified by enemy toughness!
        if(player.hasPerk("Double Attack") >= 0 && player.str <= 60) {
            if(player.weaponName == "deadly spear") damage = int((player.str + player.weaponAttack) - Math.random()*(monster.tou));
            else if(player.weaponName == "jeweled rapier") damage = int((player.str + player.weaponAttack) - Math.random()*(monster.tou));
            else if(player.weaponName == "katana") damage = int((player.str + player.weaponAttack) - Math.random()*(monster.tou + monster.armorDef - 5));
            else damage = int((player.str + player.weaponAttack) - Math.random()*(monster.tou + monster.armorDef));
        }*/
        //BASIC DAMAGE STUFF
        //Double Attack Hybrid Reductions
        if (this.player.findPerk(PerkLib.DoubleAttack) >= 0 && this.player.spe >= 50 && this.player.str > 61 && this.flags[kFLAGS.DOUBLE_ATTACK_STYLE] == 0) {
            damage = 60.5;
        }
        else damage = this.player.str;
        //Weapon addition!
        damage += this.player.weaponAttack;
        //Bonus sand trap damage!
        if (this.monster.findStatusAffect(StatusAffects.Level) >= 0) damage = Math.round(damage * 1.75);
        //Determine if critical hit!
        var crit: boolean = false;
        if (this.rand(100) <= 4 || (this.player.findPerk(PerkLib.Tactician) >= 0 && this.player.inte >= 50 && (this.player.inte - 50) / 5 > this.rand(100))) {
            crit = true;
            damage *= 1.75;
        }
        //Start figuring enemy damage resistance
        var reduction: number = this.rand(this.monster.tou);
        //Add in enemy armor if needed
        if (this.player.weaponName != "jeweled rapier" && this.player.weaponName != "deadly spear") {
            reduction += this.monster.armorDef;
            //Remove half armor for lunging strikes
            if (this.player.findPerk(PerkLib.LungingAttacks) >= 0)
                reduction -= this.monster.armorDef / 2;
        }
        //Take 5 off enemy armor for katana
        if (this.player.weaponName == "katana") {
            //Knock off 5
            if (this.monster.armorDef >= 5) reduction -= 5;
            //Less than 5 armor?  TAKE IT ALL!
            else reduction -= this.monster.armorDef;
        }
        //Apply AND DONE!
        damage -= reduction;
        //Damage post processing!
        //Thunderous Strikes
        if (this.player.findPerk(PerkLib.ThunderousStrikes) >= 0 && this.player.str >= 80)
            damage *= 1.2;

        if (this.player.findPerk(PerkLib.ChiReflowMagic) >= 0) damage *= UmasShop.NEEDLEWORK_MAGIC_REGULAR_MULTI;
        if (this.player.findPerk(PerkLib.ChiReflowAttack) >= 0) damage *= UmasShop.NEEDLEWORK_ATTACK_REGULAR_MULTI;

        //One final round
        damage = Math.round(damage);

        //ANEMONE SHIT
        if (this.monster.short == "anemone") {
            //hit successful:
            //special event, block (no more than 10-20% of turns, also fails if PC has >75 corruption):
            if (this.rand(10) <= 1) {
                this.outputText("Seeing your " + this.player.weaponName + " raised, the anemone looks down at the water, angles her eyes up at you, and puts out a trembling lip.  ", false);
                if (this.player.cor < 75) {
                    this.outputText("You stare into her hangdog expression and lose most of the killing intensity you had summoned up for your attack, stopping a few feet short of hitting her.\n", false);
                    damage = 0;
                    //Kick back to main if no damage occured!
                    if (this.monster.HP > 0 && this.monster.lust < 100) {
                        if (this.player.findStatusAffect(StatusAffects.FirstAttack) >= 0) {
                            this.attack();
                            return;
                        }
                        this.enemyAI();
                    }
                    else {
                        if (this.monster.HP <= 0) this.doNext(this.endHpVictory);
                        else this.doNext(this.endLustVictory);
                    }
                    return;
                }
                else this.outputText("Though you lose a bit of steam to the display, the drive for dominance still motivates you to follow through on your swing.", false);
            }
        }

        // Have to put it before doDamage, because doDamage applies the change, as well as status effects and shit.
        if (this.monster instanceof Doppleganger) {
            if (this.monster.findStatusAffect(StatusAffects.Stunned) < 0) {
                if (damage > 0 && this.player.findPerk(PerkLib.HistoryFighter) >= 0) damage *= 1.1;
                if (damage > 0) damage = this.doDamage(damage, false);

                (this.monster as Doppleganger).mirrorAttack(damage);
                return;
            }

            // Stunning the doppleganger should now "buy" you another round.
        }

        if (damage > 0) {
            if (this.player.findPerk(PerkLib.HistoryFighter) >= 0) damage *= 1.1;
            damage = this.doDamage(damage);
        }

        if (damage <= 0) {
            damage = 0;
            this.outputText("Your attacks are deflected or blocked by " + this.monster.a + this.monster.short + ".", false);
        }
        else {
            this.outputText("You hit " + this.monster.a + this.monster.short + "! (" + damage + ")", false);
            if (crit) this.outputText(" <b>*CRIT*</b>");
        }
        if (this.player.findPerk(PerkLib.BrutalBlows) >= 0 && this.player.str > 75) {
            if (this.monster.armorDef > 0) this.outputText("\nYour hits are so brutal that you damage " + this.monster.a + this.monster.short + "'s defenses!");
            if (this.monster.armorDef - 10 > 0) this.monster.armorDef -= 10;
            else this.monster.armorDef = 0;
        }
        if (damage > 0) {
            //Lust raised by anemone contact!
            if (this.monster.short == "anemone") {
                this.outputText("\nThough you managed to hit the anemone, several of the tentacles surrounding her body sent home jolts of venom when your swing brushed past them.", false);
                //(gain lust, temp lose str/spd)
                (this.monster as Anemone).applyVenom((1 + this.rand(2)));
            }

            //Lust raising weapon bonuses
            if (this.monster.lustVuln > 0) {
                if (this.player.weaponPerk == "Aphrodisiac Weapon") {
                    this.monster.lust += this.monster.lustVuln * (5 + this.player.cor / 10);
                    this.outputText("\n" + this.monster.capitalA + this.monster.short + " shivers as your weapon's 'poison' goes to work.", false);
                }
                if (this.player.weaponName == "coiled whip" && this.rand(2) == 0) {
                    this.monster.lust += this.monster.lustVuln * (5 + this.player.cor / 12);
                    if (!this.monster.plural) this.outputText("\n" + this.monster.capitalA + this.monster.short + " shivers and gets turned on from the whipping.", false);
                    else this.outputText("\n" + this.monster.capitalA + this.monster.short + " shiver and get turned on from the whipping.", false);
                }
                if (this.player.weaponName == "succubi whip") {
                    this.monster.lust += this.monster.lustVuln * (20 + this.player.cor / 15);
                    if (this.player.cor < 90) this.dynStats("cor", .3);
                    if (!this.monster.plural) this.outputText("\n" + this.monster.capitalA + this.monster.short + " shivers and moans involuntarily from the whip's touches.", false);
                    else this.outputText("\n" + this.monster.capitalA + this.monster.short + " shiver and moan involuntarily from the whip's touches.", false);
                    if (this.rand(2) == 0) {
                        this.outputText("  You get a sexual thrill from it.", false);
                        this.dynStats("lus", 1);
                    }
                }
            }
            //Weapon Procs!
            if (this.player.weaponName == "huge warhammer" || this.player.weaponName == "spiked gauntlet" || this.player.weaponName == "hooked gauntlets") {
                //10% chance
                if (this.rand(10) == 0 && this.monster.findPerk(PerkLib.Resolute) < 0) {
                    this.outputText("\n" + this.monster.capitalA + this.monster.short + " reels from the brutal blow, stunned.", false);
                    this.monster.createStatusAffect(StatusAffects.Stunned, 0, 0, 0, 0);
                }
                //50% Bleed chance
                if (this.player.weaponName == "hooked gauntlets" && this.rand(2) == 0 && this.monster.armorDef < 10 && this.monster.findStatusAffect(StatusAffects.IzmaBleed) < 0) {
                    if (this.monster instanceof LivingStatue) {
                        this.outputText("Despite the rents you've torn in its stony exterior, the statue does not bleed.");
                    }
                    else {
                        this.monster.createStatusAffect(StatusAffects.IzmaBleed, 3, 0, 0, 0);
                        if (this.monster.plural) this.outputText("\n" + this.monster.capitalA + this.monster.short + " bleed profusely from the many bloody gashes your hooked gauntlets leave behind.", false);
                        else this.outputText("\n" + this.monster.capitalA + this.monster.short + " bleeds profusely from the many bloody gashes your hooked gauntlets leave behind.", false);
                    }
                }
            }

        }

        if (this.monster instanceof JeanClaude && this.player.findStatusAffect(StatusAffects.FirstAttack) < 0) {
            if (this.monster.HP < 1 || this.monster.lust > 99) {
                // noop
            }
            if (this.player.lust <= 30) {
                this.outputText("\n\nJean-Claude doesn’t even budge when you wade into him with your [weapon].");

                this.outputText("\n\n“<i>Why are you attacking me, slave?</i>” he says. The basilisk rex sounds genuinely confused. His eyes pulse with hot, yellow light, reaching into you as he opens his arms, staring around as if begging the crowd for an explanation. “<i>You seem lost, unable to understand, lashing out at those who take care of you. Don’t you know who you are? Where you are?</i>” That compulsion in his eyes, that never-ending heat, it’s... it’s changing things. You need to finish this as fast as you can.");
            }
            else if (this.player.lust <= 50) {
                this.outputText("\n\nAgain your [weapon] thumps into Jean-Claude. Again it feels wrong. Again it sends an aching chime through you, that you are doing something that revolts your nature.");

                this.outputText("\n\n“<i>Why are you fighting your master, slave?</i>” he says. He is bigger than he was before. Or maybe you are smaller. “<i>You are confused. Put your weapon down- you are no warrior, you only hurt yourself when you flail around with it. You have forgotten what you were trained to be. Put it down, and let me help you.</i>” He’s right. It does hurt. Your body murmurs that it would feel so much better to open up and bask in the golden eyes fully, let it move you and penetrate you as it may. You grit your teeth and grip your [weapon] harder, but you can’t stop the warmth the hypnotic compulsion is building within you.");
            }
            else if (this.player.lust <= 80) {
                this.outputText("\n\n“<i>Do you think I will be angry at you?</i>” growls Jean-Claude lowly. Your senses feel intensified, his wild, musky scent rich in your nose. It’s hard to concentrate... or rather it’s hard not to concentrate on the sweat which runs down his hard, defined frame, the thickness of his bulging cocks, the assured movement of his powerful legs and tail, and the glow, that tantalizing, golden glow, which pulls you in and pushes so much delicious thought and sensation into your head…  “<i>I am not angry. You will have to be punished, yes, but you know that is only right, that in the end you will accept and enjoy being corrected. Come now, slave. You only increase the size of the punishment with this silliness.</i>”");
            }
            else {
                this.outputText("\n\nYou can’t... there is a reason why you keep raising your weapon against your master, but what was it? It can’t be that you think you can defeat such a powerful, godly alpha male as him. And it would feel so much better to supplicate yourself before the glow, lose yourself in it forever, serve it with your horny slut body, the only thing someone as low and helpless as you could possibly offer him. Master’s mouth is moving but you can no longer tell where his voice ends and the one in your head begins... only there is a reason you cling to like you cling onto your [weapon], whatever it is, however stupid and distant it now seems, a reason to keep fighting...");
            }

            this.dynStats("lus", 25);
        }

        this.outputText("\n", false);
        //Kick back to main if no damage occured!
        if (this.monster.HP >= 1 && this.monster.lust <= 99) {
            if (this.player.findStatusAffect(StatusAffects.FirstAttack) >= 0) {
                this.attack();
                return;
            }
            this.outputText("\n", false);
            this.enemyAI();
        }
        else {
            if (this.monster.HP <= 0) this.doNext(this.endHpVictory);
            else this.doNext(this.endLustVictory);
        }
    }
    //Gore Attack - uses 15 fatigue!
    public goreAttack(): void {
        this.clearOutput();
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        if (this.monster.short == "worms") {
            this.outputText("Taking advantage of your new natural weapons, you quickly charge at the freak of nature. Sensing impending danger, the creature willingly drops its cohesion, causing the mass of worms to fall to the ground with a sick, wet 'thud', leaving your horns to stab only at air.\n\n");
            this.enemyAI();
            return;
        }
        if (this.player.fatigue + this.physicalCost(15) > 100) {
            this.outputText("You're too fatigued to use a charge attack!");
            this.menu();
            this.addButton(0, "Next", this.combatMenu, false);
            return;
        }
        this.fatigue(15, 2);
        var damage: number = 0;
        //Amily!
        if (this.monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            this.outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            this.enemyAI();
            return;
        }
        //Bigger horns = better success chance.
        //Small horns - 60% hit
        if (this.player.horns >= 6 && this.player.horns < 12) {
            temp = 60;
        }
        //bigger horns - 75% hit
        if (this.player.horns >= 12 && this.player.horns < 20) {
            temp = 75;
        }
        //huge horns - 90% hit
        if (this.player.horns >= 20) {
            temp = 80;
        }
        //Vala dodgy bitch!
        if (this.monster.short == "Vala") {
            temp = 20;
        }
        //Account for monster speed - up to -50%.
        temp -= this.monster.spe / 2;
        //Account for player speed - up to +50%
        temp += this.player.spe / 2;
        //Hit & calculation
        if (temp >= this.rand(100)) {
            var horns: number = this.player.horns;
            if (this.player.horns > 40) this.player.horns = 40;
            //normal
            if (this.rand(4) > 0) {
                this.outputText("You lower your head and charge, skewering " + this.monster.a + this.monster.short + " on one of your bullhorns!  ");
                //As normal attack + horn length bonus
                damage = Math.floor(this.player.str + horns * 2 - this.rand(this.monster.tou) - this.monster.armorDef);
            }
            //CRIT
            else {
                //doubles horn bonus damage
                damage = Math.floor(this.player.str + horns * 4 - this.rand(this.monster.tou) - this.monster.armorDef);
                this.outputText("You lower your head and charge, slamming into " + this.monster.a + this.monster.short + " and burying both your horns into " + this.monster.pronoun2 + "!  ");
            }
            //Bonus damage for rut!
            if (this.player.inRut && this.monster.cockTotal() > 0) {
                this.outputText("The fury of your rut lent you strength, increasing the damage!  ");
                damage += 5;
            }
            //Bonus per level damage
            damage += this.player.level * 2;
            //Reduced by armor
            damage -= this.monster.armorDef;
            if (damage < 0) damage = 5;
            //CAP 'DAT SHIT
            if (damage > this.player.level * 10 + 100) damage = this.player.level * 10 + 100;
            if (damage > 0) {
                if (this.player.findPerk(PerkLib.HistoryFighter) >= 0) damage *= 1.1;
                damage = this.doDamage(damage);
            }
            //Different horn damage messages
            if (damage < 20) this.outputText("You pull yourself free, dealing " + damage + " damage.");
            if (damage >= 20 && damage < 40) this.outputText("You struggle to pull your horns free, dealing " + damage + " damage.");
            if (damage >= 40) this.outputText("With great difficulty you rip your horns free, dealing " + damage + " damage.");
        }
        //Miss
        else {
            //Special vala changes
            if (this.monster.short == "Vala") {
                this.outputText("You lower your head and charge Vala, but she just flutters up higher, grabs hold of your horns as you close the distance, and smears her juicy, fragrant cunt against your nose.  The sensual smell and her excited moans stun you for a second, allowing her to continue to use you as a masturbation aid, but she quickly tires of such foreplay and flutters back with a wink.\n\n");
                this.dynStats("lus", 5);
            }
            else this.outputText("You lower your head and charge " + this.monster.a + this.monster.short + ", only to be sidestepped at the last moment!");
        }
        //New line before monster attack
        this.outputText("\n\n");
        //Victory ORRRRR enemy turn.
        if (this.monster.HP > 0 && this.monster.lust < 100) this.enemyAI();
        else {
            if (this.monster.HP <= 0) this.doNext(this.endHpVictory);
            if (this.monster.lust >= 100) this.doNext(this.endLustVictory);
        }
    }
    //Player sting attack
    public playerStinger(): void {
        this.clearOutput();
        //Keep logic sane if this attack brings victory
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        if (this.player.tailVenom < 33) {
            this.outputText("You do not have enough venom to sting right now!");
            this.doNext(this.physicalSpecials);
            return;
        }
        //Worms are immune!
        if (this.monster.short == "worms") {
            this.outputText("Taking advantage of your new natural weapons, you quickly thrust your stinger at the freak of nature. Sensing impending danger, the creature willingly drops its cohesion, causing the mass of worms to fall to the ground with a sick, wet 'thud', leaving you to stab only at air.\n\n");
            this.enemyAI();
            return;
        }
        //Determine if dodged!
        //Amily!
        if (this.monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            this.outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            this.enemyAI();
            return;
        }
        if (this.monster.spe - this.player.spe > 0 && Math.floor(Math.random() * (((this.monster.spe - this.player.spe) / 4) + 80)) > 80) {
            if (this.monster.spe - this.player.spe < 8) this.outputText(this.monster.capitalA + this.monster.short + " narrowly avoids your stinger!\n\n");
            if (this.monster.spe - this.player.spe >= 8 && this.monster.spe - this.player.spe < 20) this.outputText(this.monster.capitalA + this.monster.short + " dodges your stinger with superior quickness!\n\n");
            if (this.monster.spe - this.player.spe >= 20) this.outputText(this.monster.capitalA + this.monster.short + " deftly avoids your slow attempts to sting " + this.monster.pronoun2 + ".\n\n");
            this.enemyAI();
            return;
        }
        //determine if avoided with armor.
        if (this.monster.armorDef - this.player.level >= 10 && this.rand(4) > 0) {
            this.outputText("Despite your best efforts, your sting attack can't penetrate " + this.monster.a + this.monster.short + "'s defenses.\n\n");
            this.enemyAI();
            return;
        }
        //Sting successful!
        this.outputText("Searing pain lances through " + this.monster.a + this.monster.short + " as you manage to sting " + this.monster.pronoun2 + "!  ");
        if (this.monster.plural) this.outputText("You watch as " + this.monster.pronoun1 + " stagger back a step and nearly trip, flushing hotly.");
        else this.outputText("You watch as " + this.monster.pronoun1 + " staggers back a step and nearly trips, flushing hotly.");
        //Tabulate damage!
        var damage: number = 35 + this.rand(this.player.lib / 10);
        //Level adds more damage up to a point (level 20)
        if (this.player.level < 10) damage += this.player.level * 3;
        else if (this.player.level < 20) damage += 30 + (this.player.level - 10) * 2;
        else damage += 50;
        this.monster.lust += this.monster.lustVuln * damage;
        if (this.monster.findStatusAffect(StatusAffects.lustvenom) < 0) this.monster.createStatusAffect(StatusAffects.lustvenom, 0, 0, 0, 0);
        /* IT used to paralyze 50% of the time, this is no longer the case!
        Paralise the other 50%!
        else {
            outputText("Searing pain lances through " + monster.a + monster.short + " as you manage to sting " + monster.pronoun2 + "!  ", false);
            if(monster.short == "demons") outputText("You watch as " + monster.pronoun1 + " stagger back a step and nearly trip, finding it hard to move as " + monster.pronoun1 + " are afflicted with your paralytic venom.  ", false);
            else outputText("You watch as " + monster.pronoun1 + " staggers back a step and nearly trips, finding it hard to move as " + monster.pronoun1 + " is afflicted with your paralytic venom.  ", false);
            if(monster.short == "demons") outputText("It appears that " + monster.a + monster.short + " are weaker and slower.", false);
            else outputText("It appears that " + monster.a + monster.short + " is weaker and slower.", false);
            monster.str -= (5+rand(player.lib/5))
            monster.spe -= (5+rand(player.lib/5))
            if(monster.str < 1) monster.str = 1;
            if(monster.spe < 1) monster.spe = 1;
        }*/
        //New line before monster attack
        this.outputText("\n\n");
        //Use tail mp
        this.player.tailVenom -= 25;
        //Kick back to main if no damage occured!
        if (this.monster.HP > 0 && this.monster.lust < 100) this.enemyAI();
        else this.doNext(this.endLustVictory);
    }

    public combatMiss(): boolean {
        return this.player.spe - this.monster.spe > 0 && Math.floor(Math.random() * (((this.player.spe - this.monster.spe) / 4) + 80)) > 80;

    }
    public combatEvade(): boolean {
        return this.monster.short != "Kiha" && this.player.findPerk(PerkLib.Evade) >= 0 && this.rand(100) < 10;

    }
    public combatFlexibility(): boolean {
        return this.player.findPerk(PerkLib.Flexibility) >= 0 && this.rand(100) < 6;

    }
    public combatMisdirect(): boolean {
        return this.player.findPerk(PerkLib.Misdirection) >= 0 && this.rand(100) < 10 && this.player.armorName == "red, high-society bodysuit";
    }

    //DEAL DAMAGE
    public doDamage(damage: number, apply: boolean = true): number {
        if (this.player.findPerk(PerkLib.Sadist) >= 0) {
            damage *= 1.2;
            this.dynStats("lus", 3);
        }
        if (this.monster.HP - damage <= 0) {
            /* No monsters use this perk, so it's been removed for now
            if(monster.findPerk(PerkLib.LastStrike) >= 0) doNext(monster.perk(monster.findPerk(PerkLib.LastStrike)).value1);
            else doNext(endHpVictory);
            */
            this.doNext(this.endHpVictory);
        }

        // Uma's Massage Bonuses
        var statIndex: number = this.player.findStatusAffect(StatusAffects.UmasMassage);
        if (statIndex >= 0) {
            if (this.player.statusAffect(statIndex).value1 == UmasShop.MASSAGE_POWER) {
                damage *= this.player.statusAffect(statIndex).value2;
            }
        }

        damage = Math.round(damage);

        if (damage < 0) damage = 1;
        if (apply) this.monster.HP -= damage;
        //Isabella gets mad
        if (this.monster.short == "Isabella") {
            this.flags[kFLAGS.ISABELLA_AFFECTION]--;
            //Keep in bounds
            if (this.flags[kFLAGS.ISABELLA_AFFECTION] < 0) this.flags[kFLAGS.ISABELLA_AFFECTION] = 0;
        }
        //Interrupt gigaflare if necessary.
        if (this.monster.findStatusAffect(StatusAffects.Gigafire) >= 0) this.monster.addStatusValue(StatusAffects.Gigafire, 1, damage);
        //Keep shit in bounds.
        if (this.monster.HP < 0) this.monster.HP = 0;
        return damage;
    }

    public takeDamage(damage: number): number {
        return this.player.takeDamage(damage);
    }
    //ENEMYAI!
    public enemyAI(): void {
        this.monster.doAI();
    }
    public finishCombat(): void {
        var hpVictory: boolean = this.monster.HP < 1;
        if (hpVictory) {
            this.outputText("You defeat " + this.monster.a + this.monster.short + ".\n", true);
        } else {
            this.outputText("You smile as " + this.monster.a + this.monster.short + " collapses and begins masturbating feverishly.", true);
        }
        this.awardPlayer();
    }
    public dropItem(monster: Monster): void {
        if (monster.findStatusAffect(StatusAffects.NoLoot) >= 0) {
            return;
        }
        var itype: ItemType = monster.dropLoot();
        if (monster.short == "tit-fucked Minotaur") {
            itype = this.consumables.MINOCUM;
        }
        if (monster instanceof Minotaur) {
            if (monster.weaponName == "axe") {
                if (this.rand(2) == 0) {
                    //50% breakage!
                    if (this.rand(2) == 0) {
                        itype = this.weapons.L__AXE;
                        if (this.player.tallness < 78) {
                            this.outputText("\nYou find a large axe on the minotaur, but it is too big for a person of your stature to comfortably carry.  ", false);
                            if (this.rand(2) == 0) itype = undefined;
                            else itype = this.consumables.SDELITE;
                        }
                        //Not too tall, dont rob of axe!
                        else this.plotFight = true;
                    }
                    else this.outputText("\nThe minotaur's axe appears to have been broken during the fight, rendering it useless.  ", false);
                }
                else itype = this.consumables.MINOBLO;
            }
        }
        if (monster instanceof BeeGirl) {
            //force honey drop if milked
            if (this.flags[kFLAGS.FORCE_BEE_TO_PRODUCE_HONEY] == 1) {
                if (this.rand(2) == 0) itype = this.consumables.BEEHONY;
                else itype = this.consumables.PURHONY;
                this.flags[kFLAGS.FORCE_BEE_TO_PRODUCE_HONEY] = 0;
            }
        }
        if (monster instanceof Jojo && this.monk > 4) {
            if (this.rand(2) == 0) itype = this.consumables.INCUBID;
            else {
                if (this.rand(2) == 0) itype = this.consumables.B__BOOK;
                else itype = this.consumables.SUCMILK;
            }
        }
        if (monster instanceof Harpy || monster instanceof Sophie) {
            if (this.rand(10) == 0) itype = this.armors.W_ROBES;
            else if (this.rand(3) == 0 && this.player.findPerk(PerkLib.LuststickAdapted) >= 0) itype = this.consumables.LUSTSTK;
            else itype = this.consumables.GLDSEED;
        }
        //Chance of armor if at level 1 pierce fetish
        if (!this.plotFight && !(monster instanceof Ember) && !(monster instanceof Kiha) && !(monster instanceof Hel) && !(monster instanceof Isabella)
            && this.flags[kFLAGS.PC_FETISH] == 1 && this.rand(10) == 0 && !this.player.hasItem(this.armors.SEDUCTA, 1) && !this.ceraphFollowerScene.ceraphIsFollower()) {
            itype = this.armors.SEDUCTA;
        }

        if (!this.plotFight && this.rand(200) == 0 && this.player.level >= 7) itype = this.consumables.BROBREW;
        if (!this.plotFight && this.rand(200) == 0 && this.player.level >= 7) itype = this.consumables.BIMBOLQ;
        //Chance of eggs if Easter!
        if (!this.plotFight && this.rand(6) == 0 && this.isEaster()) {
            temp = this.rand(13);
            if (temp == 0) itype = this.consumables.BROWNEG;
            if (temp == 1) itype = this.consumables.L_BRNEG;
            if (temp == 2) itype = this.consumables.PURPLEG;
            if (temp == 3) itype = this.consumables.L_PRPEG;
            if (temp == 4) itype = this.consumables.BLUEEGG;
            if (temp == 5) itype = this.consumables.L_BLUEG;
            if (temp == 6) itype = this.consumables.PINKEGG;
            if (temp == 7) itype = this.consumables.NPNKEGG;
            if (temp == 8) itype = this.consumables.L_PNKEG;
            if (temp == 9) itype = this.consumables.L_WHTEG;
            if (temp == 10) itype = this.consumables.WHITEEG;
            if (temp == 11) itype = this.consumables.BLACKEG;
            if (temp == 12) itype = this.consumables.L_BLKEG;
        }
        //Bonus loot overrides others
        if (this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] != "") {
            itype = ItemType.lookupItem(this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID]);
        }
        monster.handleAwardItemText(itype); //Each monster can now override the default award text
        if (itype != undefined) {
            if (inDungeon)
                this.inventory.takeItem(itype, this.playerMenu);
            else this.inventory.takeItem(itype, this.camp.returnToCampUseOneHour);
        }
    }
    public awardPlayer(): void {
        if (this.player.countCockSocks("gilded") > 0) {
            //trace( "awardPlayer found MidasCock. Gems bumped from: " + monster.gems );

            var bonusGems: number = this.monster.gems * 0.15 + 5 * this.player.countCockSocks("gilded"); // int so AS rounds to whole numbers
            this.monster.gems += bonusGems;
            //trace( "to: " + monster.gems )
        }
        this.monster.handleAwardText(); //Each monster can now override the default award text
        if (!inDungeon && !this.inRoomedDungeon)
            this.doNext(this.camp.returnToCampUseOneHour);
        else this.doNext(this.playerMenu);
        this.dropItem(this.monster);
        this.inCombat = false;
        this.player.gems += this.monster.gems;
        this.player.XP += this.monster.XP;
    }

    //Clear statuses
    public clearStatuses(visibility: boolean): void {
        this.player.clearStatuses(visibility);
    }
    //Update combat status effects
    private combatStatusesUpdate(): void {
        //old outfit used for fetish cultists
        var oldOutfit: string = "";
        var changed: boolean = false;
        //Reset menuloc
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.hideUpDown();
        if (this.player.findStatusAffect(StatusAffects.Sealed) >= 0) {
            //Countdown and remove as necessary
            if (this.player.statusAffectv1(StatusAffects.Sealed) > 0) {
                this.player.addStatusValue(StatusAffects.Sealed, 1, -1);
                if (this.player.statusAffectv1(StatusAffects.Sealed) <= 0) this.player.removeStatusAffect(StatusAffects.Sealed);
                else this.outputText("<b>One of your combat abilities is currently sealed by magic!</b>\n\n");
            }
        }
        this.monster.combatRoundUpdate();
        //[Silence warning]
        if (this.player.findStatusAffect(StatusAffects.ThroatPunch) >= 0) {
            this.player.addStatusValue(StatusAffects.ThroatPunch, 1, -1);
            if (this.player.statusAffectv1(StatusAffects.ThroatPunch) >= 0) this.outputText("Thanks to Isabella's wind-pipe crushing hit, you're having trouble breathing and are <b>unable to cast spells as a consequence.</b>\n\n", false);
            else {
                this.outputText("Your wind-pipe recovers from Isabella's brutal hit.  You'll be able to focus to cast spells again!\n\n", false);
                this.player.removeStatusAffect(StatusAffects.ThroatPunch);
            }
        }
        if (this.player.findStatusAffect(StatusAffects.GooArmorSilence) >= 0) {
            if (this.player.statusAffectv1(StatusAffects.GooArmorSilence) >= 2 || this.rand(20) + 1 + this.player.str / 10 >= 15) {
                //if passing str check, output at beginning of turn
                this.outputText("<b>The sticky slop covering your mouth pulls away reluctantly, taking more force than you would expect, but you've managed to free your mouth enough to speak!</b>\n\n");
                this.player.removeStatusAffect(StatusAffects.GooArmorSilence);
            }
            else {
                this.outputText("<b>Your mouth is obstructed by sticky goo!  You are silenced!</b>\n\n", false);
                this.player.addStatusValue(StatusAffects.GooArmorSilence, 1, 1);
            }
        }
        if (this.player.findStatusAffect(StatusAffects.LustStones) >= 0) {
            //[When witches activate the stones for goo bodies]
            if (this.player.isGoo()) {
                this.outputText("<b>The stones start vibrating again, making your liquid body ripple with pleasure.  The witches snicker at the odd sight you are right now.\n\n</b>");
            }
            //[When witches activate the stones for solid bodies]
            else {
                this.outputText("<b>The smooth stones start vibrating again, sending another wave of teasing bliss throughout your body.  The witches snicker at you as you try to withstand their attack.\n\n</b>");
            }
            this.dynStats("lus", this.player.statusAffectv1(StatusAffects.LustStones) + 4);
        }
        if (this.player.findStatusAffect(StatusAffects.WebSilence) >= 0) {
            if (this.player.statusAffectv1(StatusAffects.WebSilence) >= 2 || this.rand(20) + 1 + this.player.str / 10 >= 15) {
                this.outputText("You rip off the webbing that covers your mouth with a cry of pain, finally able to breathe normally again!  Now you can cast spells!\n\n", false);
                this.player.removeStatusAffect(StatusAffects.WebSilence);
            }
            else {
                this.outputText("<b>Your mouth and nose are obstructed by sticky webbing, making it difficult to breathe and impossible to focus on casting spells.  You try to pull it off, but it just won't work!</b>\n\n", false);
                this.player.addStatusValue(StatusAffects.WebSilence, 1, 1);
            }
        }
        if (this.player.findStatusAffect(StatusAffects.HolliConstrict) >= 0) {
            this.outputText("<b>You're tangled up in Holli's verdant limbs!  All you can do is try to struggle free...</b>\n\n");
        }
        if (this.player.findStatusAffect(StatusAffects.UBERWEB) >= 0)
            this.outputText("<b>You're pinned under a pile of webbing!  You should probably struggle out of it and get back in the fight!</b>\n\n", false);
        if (this.player.findStatusAffect(StatusAffects.Blind) >= 0 && this.monster.findStatusAffect(StatusAffects.Sandstorm) < 0) {
            if (this.player.findStatusAffect(StatusAffects.SheilaOil) >= 0) {
                if (this.player.statusAffectv1(StatusAffects.Blind) <= 0) {
                    this.outputText("<b>You finish wiping the demon's tainted oils away from your eyes; though the smell lingers, you can at least see.  Sheila actually seems happy to once again be under your gaze.</b>\n\n", false);
                    this.player.removeStatusAffect(StatusAffects.Blind);
                }
                else {
                    this.outputText("<b>You scrub at the oily secretion with the back of your hand and wipe some of it away, but only smear the remainder out more thinly.  You can hear the demon giggling at your discomfort.</b>\n\n", false);
                    this.player.addStatusValue(StatusAffects.Blind, 1, -1);
                }
            }
            else {
                //Remove blind if countdown to 0
                if (this.player.statusAffectv1(StatusAffects.Blind) == 0) {
                    this.player.removeStatusAffect(StatusAffects.Blind);
                    //Alert PC that blind is gone if no more stacks are there.
                    if (this.player.findStatusAffect(StatusAffects.Blind) < 0) {
                        this.outputText("<b>Your eyes have cleared and you are no longer blind!</b>\n\n", false);
                    }
                    else this.outputText("<b>You are blind, and many physical attacks will miss much more often.</b>\n\n", false);
                }
                else {
                    this.player.addStatusValue(StatusAffects.Blind, 1, -1);
                    this.outputText("<b>You are blind, and many physical attacks will miss much more often.</b>\n\n", false);
                }
            }
        }
        //Basilisk compulsion
        if (this.player.findStatusAffect(StatusAffects.BasiliskCompulsion) >= 0) {
            Basilisk.basiliskSpeed(this.player, 15);
            //Continuing effect text: 
            this.outputText("<b>You still feel the spell of those grey eyes, making your movements slow and difficult, the remembered words tempting you to look into its eyes again. You need to finish this fight as fast as your heavy limbs will allow.</b>\n\n", false);
        }
        if (this.player.findStatusAffect(StatusAffects.IzmaBleed) >= 0) {
            if (this.player.statusAffectv1(StatusAffects.IzmaBleed) <= 0) {
                this.player.removeStatusAffect(StatusAffects.IzmaBleed);
                this.outputText("<b>You sigh with relief; your bleeding has slowed considerably.</b>\n\n", false);
            }
            //Bleed effect:
            else {
                var bleed: number = (2 + this.rand(4)) / 100;
                bleed *= this.player.HP;
                bleed = this.takeDamage(bleed);
                this.outputText("<b>You gasp and wince in pain, feeling fresh blood pump from your wounds. (" + bleed + ")</b>\n\n", false);
            }
        }
        if (this.player.findStatusAffect(StatusAffects.AcidSlap) >= 0) {
            var slap: number = 3 + (this.maxHP() * 0.02);
            this.outputText("<b>Your muscles twitch in agony as the acid keeps burning you. (" + slap + ")</b>\n\n", false);
        }
        if (this.player.findPerk(PerkLib.ArousingAura) >= 0 && this.monster.lustVuln > 0 && this.player.cor >= 70) {
            if (this.monster.lust < 50) this.outputText("Your aura seeps into " + this.monster.a + this.monster.short + " but does not have any visible effects just yet.\n\n", false);
            else if (this.monster.lust < 60) {
                if (!this.monster.plural) this.outputText(this.monster.capitalA + this.monster.short + " starts to squirm a little from your unholy presence.\n\n", false);
                else this.outputText(this.monster.capitalA + this.monster.short + " start to squirm a little from your unholy presence.\n\n", false);
            }
            else if (this.monster.lust < 75) this.outputText("Your arousing aura seems to be visibly affecting " + this.monster.a + this.monster.short + ", making " + this.monster.pronoun2 + " squirm uncomfortably.\n\n", false);
            else if (this.monster.lust < 85) {
                if (!this.monster.plural) this.outputText(this.monster.capitalA + this.monster.short + "'s skin colors red as " + this.monster.pronoun1 + " inadvertantly basks in your presence.\n\n", false);
                else this.outputText(this.monster.capitalA + this.monster.short + "' skin colors red as " + this.monster.pronoun1 + " inadvertantly bask in your presence.\n\n", false);
            }
            else {
                if (!this.monster.plural) this.outputText("The effects of your aura are quite pronounced on " + this.monster.a + this.monster.short + " as " + this.monster.pronoun1 + " begins to shake and steal glances at your body.\n\n", false);
                else this.outputText("The effects of your aura are quite pronounced on " + this.monster.a + this.monster.short + " as " + this.monster.pronoun1 + " begin to shake and steal glances at your body.\n\n", false);
            }
            this.monster.lust += this.monster.lustVuln * (2 + this.rand(4));
        }
        if (this.player.findStatusAffect(StatusAffects.Bound) >= 0 && this.flags[kFLAGS.PC_FETISH] >= 2) {
            this.outputText("The feel of tight leather completely immobilizing you turns you on more and more.  Would it be so bad to just wait and let her play with you like this?\n\n", false);
            this.dynStats("lus", 3);
        }
        if (this.player.findStatusAffect(StatusAffects.GooArmorBind) >= 0) {
            if (this.flags[kFLAGS.PC_FETISH] >= 2) {
                this.outputText("The feel of the all-encapsulating goo immobilizing your helpless body turns you on more and more.  Maybe you should just wait for it to completely immobilize you and have you at its mercy.\n\n");
                this.dynStats("lus", 3);
            }
            else this.outputText("You're utterly immobilized by the goo flowing around you.  You'll have to struggle free!\n\n");
        }
        if (this.player.findStatusAffect(StatusAffects.HarpyBind) >= 0) {
            if (this.flags[kFLAGS.PC_FETISH] >= 2) {
                this.outputText("The harpies are holding you down and restraining you, making the struggle all the sweeter!\n\n");
                this.dynStats("lus", 3);
            }
            else this.outputText("You're restrained by the harpies so that they can beat on you with impunity.  You'll need to struggle to break free!\n\n");
        }
        if (this.player.findStatusAffect(StatusAffects.NagaBind) >= 0 && this.flags[kFLAGS.PC_FETISH] >= 2) {
            this.outputText("Coiled tightly by the naga and utterly immobilized, you can't help but become aroused thanks to your bondage fetish.\n\n", false);
            this.dynStats("lus", 5);
        }
        if (this.player.findStatusAffect(StatusAffects.TentacleBind) >= 0) {
            this.outputText("You are firmly trapped in the tentacle's coils.  <b>The only thing you can try to do is struggle free!</b>\n\n", false);
            if (this.flags[kFLAGS.PC_FETISH] >= 2) {
                this.outputText("Wrapped tightly in the tentacles, you find it hard to resist becoming more and more aroused...\n\n", false);
                this.dynStats("lus", 3);
            }
        }
        if (this.player.findStatusAffect(StatusAffects.DriderKiss) >= 0) {
            //(VENOM OVER TIME: WEAK)
            if (this.player.statusAffectv1(StatusAffects.DriderKiss) == 0) {
                this.outputText("Your heart hammers a little faster as a vision of the drider's nude, exotic body on top of you assails you.  It'll only get worse if she kisses you again...\n\n", false);
                this.dynStats("lus", 8);
            }
            //(VENOM OVER TIME: MEDIUM)
            else if (this.player.statusAffectv1(StatusAffects.DriderKiss) == 1) {
                this.outputText("You shudder and moan, nearly touching yourself as your ", false);
                if (this.player.gender > 0) this.outputText("loins tingle and leak, hungry for the drider's every touch.", false);
                else this.outputText("asshole tingles and twitches, aching to be penetrated.", false);
                this.outputText("  Gods, her venom is getting you so hot.  You've got to end this quickly!\n\n", false);
                this.dynStats("lus", 15);
            }
            //(VENOM OVER TIME: MAX)
            else {
                this.outputText("You have to keep pulling your hands away from your crotch - it's too tempting to masturbate here on the spot and beg the drider for more of her sloppy kisses.  Every second that passes, your arousal grows higher.  If you don't end this fast, you don't think you'll be able to resist much longer.  You're too turned on... too horny... too weak-willed to resist much longer...\n\n", false);
                this.dynStats("lus", 25);
            }
        }
        //Harpy lip gloss
        if (this.player.hasCock() && this.player.findStatusAffect(StatusAffects.Luststick) >= 0 && (this.monster.short == "harpy" || this.monster.short == "Sophie")) {
            //Chance to cleanse!
            if (this.player.findPerk(PerkLib.Medicine) >= 0 && this.rand(100) <= 14) {
                this.outputText("You manage to cleanse the harpy lip-gloss from your system with your knowledge of medicine!\n\n", false);
                this.player.removeStatusAffect(StatusAffects.Luststick);
            }
            else if (this.rand(5) == 0) {
                if (this.rand(2) == 0) this.outputText("A fantasy springs up from nowhere, dominating your thoughts for a few moments.  In it, you're lying down in a soft nest.  Gold-rimmed lips are noisily slurping around your " + this.player.cockDescript(0) + ", smearing it with her messy aphrodisiac until you're completely coated in it.  She looks up at you knowingly as the two of you get ready to breed the night away...\n\n", false);
                else this.outputText("An idle daydream flutters into your mind.  In it, you're fucking a harpy's asshole, clutching tightly to her wide, feathery flanks as the tight ring of her pucker massages your " + this.player.cockDescript(0) + ".  She moans and turns around to kiss you on the lips, ensuring your hardness.  Before long her feverish grunts of pleasure intensify, and you feel the egg she's birthing squeezing against you through her internal walls...\n\n", false);
                this.dynStats("lus", 20);
            }
        }
        if (this.player.findStatusAffect(StatusAffects.StoneLust) >= 0) {
            if (this.player.vaginas.length > 0) {
                if (this.player.lust < 40) this.outputText("You squirm as the smooth stone orb vibrates within you.\n\n", false);
                if (this.player.lust >= 40 && this.player.lust < 70) this.outputText("You involuntarily clench around the magical stone in your twat, in response to the constant erotic vibrations.\n\n", false);
                if (this.player.lust >= 70 && this.player.lust < 85) this.outputText("You stagger in surprise as a particularly pleasant burst of vibrations erupt from the smooth stone sphere in your " + this.vaginaDescript(0) + ".\n\n", false);
                if (this.player.lust >= 85) this.outputText("The magical orb inside of you is making it VERY difficult to keep your focus on combat, white-hot lust suffusing your body with each new motion.\n\n", false);
            }
            else {
                this.outputText("The orb continues vibrating in your ass, doing its best to arouse you.\n\n", false);
            }
            this.dynStats("lus", 7 + Math.floor(this.player.sens) / 10);
        }
        if (this.player.findStatusAffect(StatusAffects.KissOfDeath) >= 0) {
            //Effect 
            this.outputText("Your lips burn with an unexpected flash of heat.  They sting and burn with unholy energies as a puff of ectoplasmic gas escapes your lips.  That puff must be a part of your soul!  It darts through the air to the succubus, who slurps it down like a delicious snack.  You feel feverishly hot and exhausted...\n\n", false);
            this.dynStats("lus", 5);
            this.takeDamage(15);
        }
        if (this.player.findStatusAffect(StatusAffects.DemonSeed) >= 0) {
            this.outputText("You feel something shift inside you, making you feel warm.  Finding the desire to fight this... hunk gets harder and harder.\n\n", false);
            this.dynStats("lus", (this.player.statusAffectv1(StatusAffects.DemonSeed) + Math.floor(this.player.sens / 30) + Math.floor(this.player.lib / 30) + Math.floor(this.player.cor / 30)));
        }
        if (this.player.inHeat && this.player.vaginas.length > 0 && this.monster.totalCocks() > 0) {
            this.dynStats("lus", (this.rand(this.player.lib / 5) + 3 + this.rand(5)));
            this.outputText("Your " + this.vaginaDescript(0) + " clenches with an instinctual desire to be touched and filled.  ", false);
            this.outputText("If you don't end this quickly you'll give in to your heat.\n\n", false);
        }
        if (this.player.inRut && this.player.totalCocks() > 0 && this.monster.hasVagina()) {
            this.dynStats("lus", (this.rand(this.player.lib / 5) + 3 + this.rand(5)));
            if (this.player.totalCocks() > 1) this.outputText("Each of y", false);
            else this.outputText("Y", false);
            if (this.monster.plural) this.outputText("our " + this.player.multiCockDescriptLight() + " dribbles pre-cum as you think about plowing " + this.monster.a + this.monster.short + " right here and now, fucking " + this.monster.pronoun3 + " " + this.monster.vaginaDescript() + "s until they're totally fertilized and pregnant.\n\n", false);
            else this.outputText("our " + this.player.multiCockDescriptLight() + " dribbles pre-cum as you think about plowing " + this.monster.a + this.monster.short + " right here and now, fucking " + this.monster.pronoun3 + " " + this.monster.vaginaDescript() + " until it's totally fertilized and pregnant.\n\n", false);
        }
        if (this.player.findStatusAffect(StatusAffects.NagaVenom) >= 0) {
            //Chance to cleanse!
            if (this.player.findPerk(PerkLib.Medicine) >= 0 && this.rand(100) <= 14) {
                this.outputText("You manage to cleanse the naga venom from your system with your knowledge of medicine!\n\n", false);
                this.player.spe += this.player.statusAffectv1(StatusAffects.NagaVenom);
                this.mainView.statsView.showStatUp('spe');
                // speUp.visible = true;
                // speDown.visible = false;
                this.player.removeStatusAffect(StatusAffects.NagaVenom);
            }
            else if (this.player.spe > 3) {
                this.player.addStatusValue(StatusAffects.NagaVenom, 1, 2);
                //stats(0,0,-2,0,0,0,0,0);
                this.player.spe -= 2;
            }
            else this.takeDamage(5);
            this.outputText("You wince in pain and try to collect yourself, the naga's venom still plaguing you.\n\n", false);
            this.takeDamage(2);
        }
        else if (this.player.findStatusAffect(StatusAffects.TemporaryHeat) >= 0) {
            //Chance to cleanse!
            if (this.player.findPerk(PerkLib.Medicine) >= 0 && this.rand(100) <= 14) {
                this.outputText("You manage to cleanse the heat and rut drug from your system with your knowledge of medicine!\n\n", false);
                this.player.removeStatusAffect(StatusAffects.TemporaryHeat);
            }
            else {
                this.dynStats("lus", (this.player.lib / 12 + 5 + this.rand(5)));
                if (this.player.hasVagina()) {
                    this.outputText("Your " + this.vaginaDescript(0) + " clenches with an instinctual desire to be touched and filled.  ", false);
                }
                else if (this.player.totalCocks() > 0) {
                    this.outputText("Your " + this.player.cockDescript(0) + " pulses and twitches, overwhelmed with the desire to breed.  ", false);
                }
                if (this.player.gender == 0) {
                    this.outputText("You feel a tingle in your " + this.assholeDescript() + ", and the need to touch and fill it nearly overwhelms you.  ", false);
                }
                this.outputText("If you don't finish this soon you'll give in to this potent drug!\n\n", false);
            }
        }
        //Poison
        if (this.player.findStatusAffect(StatusAffects.Poison) >= 0) {
            //Chance to cleanse!
            if (this.player.findPerk(PerkLib.Medicine) >= 0 && this.rand(100) <= 14) {
                this.outputText("You manage to cleanse the poison from your system with your knowledge of medicine!\n\n", false);
                this.player.removeStatusAffect(StatusAffects.Poison);
            }
            else {
                this.outputText("The poison continues to work on your body, wracking you with pain!\n\n", false);
                this.takeDamage(8 + this.rand(this.maxHP() / 20));
            }
        }
        //Bondage straps + bondage fetish
        if (this.flags[kFLAGS.PC_FETISH] >= 2 && this.player.armorName == "barely-decent bondage straps") {
            this.outputText("The feeling of the tight, leather straps holding tightly to your body while exposing so much of it turns you on a little bit more.\n\n", false);
            this.dynStats("lus", 2);
        }
        this.regeneration(true);
        if (this.player.lust >= 100) this.doNext(this.endLustLoss);
        if (this.player.HP <= 0) this.doNext(this.endHpLoss);
    }

    public regeneration(combat: boolean = true): void {
        var healingPercent: number = 0;
        if (combat) {
            //Regeneration
            healingPercent = 0;
            if (this.player.findPerk(PerkLib.Regeneration) >= 0) healingPercent += 1;
            if (this.player.findPerk(PerkLib.Regeneration2) >= 0) healingPercent += 2;
            if (this.player.armorName == "skimpy nurse's outfit") healingPercent += 2;
            if (this.player.armorName == "goo armor") healingPercent += 2;
            if (this.player.findPerk(PerkLib.LustyRegeneration) >= 0) healingPercent += 1;
            if (healingPercent > 5) healingPercent = 5;
            this.HPChange(Math.round(this.maxHP() * healingPercent / 100), false);
        }
        else {
            //Regeneration
            healingPercent = 0;
            if (this.player.findPerk(PerkLib.Regeneration) >= 0) healingPercent += 2;
            if (this.player.findPerk(PerkLib.Regeneration2) >= 0) healingPercent += 4;
            if (this.player.armorName == "skimpy nurse's outfit") healingPercent += 2;
            if (this.player.armorName == "goo armor") healingPercent += 3;
            if (this.player.findPerk(PerkLib.LustyRegeneration) >= 0) healingPercent += 2;
            if (healingPercent > 10) healingPercent = 10;
            this.HPChange(Math.round(this.maxHP() * healingPercent / 100), false);
        }
    }
    public startCombat(monster_: Monster, plotFight_: boolean = false): void {
        this.plotFight = plotFight_;
        this.mainView.hideMenuButton(MainView.MENU_DATA);
        this.mainView.hideMenuButton(MainView.MENU_APPEARANCE);
        this.mainView.hideMenuButton(MainView.MENU_LEVEL);
        this.mainView.hideMenuButton(MainView.MENU_PERKS);
        //Flag the game as being "in combat"
        this.inCombat = true;
        this.monster = monster_;
        if (this.monster.short == "Ember") {
            this.monster.pronoun1 = this.emberScene.emberMF("he", "she");
            this.monster.pronoun2 = this.emberScene.emberMF("him", "her");
            this.monster.pronoun3 = this.emberScene.emberMF("his", "her");
        }
        //Reduce enemy def if player has precision!
        if (this.player.findPerk(PerkLib.Precision) >= 0 && this.player.inte >= 25) {
            if (this.monster.armorDef <= 10) this.monster.armorDef = 0;
            else this.monster.armorDef -= 10;
        }
        this.doNext(this.playerMenu);
    }
    public startCombatImmediate(monster: Monster, _plotFight: boolean): void {
        this.startCombat(monster, _plotFight);
    }
    public display(): void {
        if (!this.monster.checkCalled) {
            this.outputText("<B>/!\\BUG! Monster.checkMonster() is not called! Calling it now...</B>\n");
            this.monster.checkMonster();
        }
        if (this.monster.checkError != "") {
            this.outputText("<B>/!\\BUG! Monster is not correctly initialized! <u>" +
                this.monster.checkError + "</u></b>\n");
        }
        var percent: string = "";
        var math: number = this.monster.HPRatio();
        percent = "(<b>" + String(Math.floor(math * 1000) / 10) + "% HP</b>)";

        //trace("trying to show monster image!");
        if (this.monster.imageName != "") {
            var monsterName: string = "monster-" + this.monster.imageName;
            //trace("Monster name = ", monsterName);
            this.outputText(this.images.showImage(monsterName), false, false);
        }
        //	if(gameState == 2) outputText("<b>You are grappling with:\n</b>", false);
        //	else
        this.outputText("<b>You are fighting ", false);
        this.outputText(this.monster.a + this.monster.short + ":</b> (Level: " + this.monster.level + ")\n");
        if (this.player.findStatusAffect(StatusAffects.Blind) >= 0) this.outputText("It's impossible to see anything!\n");
        else {
            this.outputText(this.monster.long + "\n", false);
            //Bonus sand trap stuff
            if (this.monster.findStatusAffect(StatusAffects.Level) >= 0) {
                temp = this.monster.statusAffectv1(StatusAffects.Level);
                //[(new PG for PC height levels)PC level 4: 
                this.outputText("\n");
                if (temp == 4) this.outputText("You are right at the edge of its pit.  If you can just manage to keep your footing here, you'll be safe.");
                else if (temp == 3) this.outputText("The sand sinking beneath your feet has carried you almost halfway into the creature's pit.");
                else this.outputText("The dunes tower above you and the hissing of sand fills your ears.  <b>The leering sandtrap is almost on top of you!</b>");
                //no new PG)
                this.outputText("  You could try attacking it with your " + this.player.weaponName + ", but that will carry you straight to the bottom.  Alternately, you could try to tease it or hit it at range, or wait and maintain your footing until you can clamber up higher.");
                this.outputText("\n");
            }
            if (this.monster.plural) {
                if (math >= 1) this.outputText("You see " + this.monster.pronoun1 + " are in perfect health.", false);
                else if (math > .75) this.outputText("You see " + this.monster.pronoun1 + " aren't very hurt.", false);
                else if (math > .5) this.outputText("You see " + this.monster.pronoun1 + " are slightly wounded.", false);
                else if (math > .25) this.outputText("You see " + this.monster.pronoun1 + " are seriously hurt.", false);
                else this.outputText("You see " + this.monster.pronoun1 + " are unsteady and close to death.", false);
            }
            else {
                if (math >= 1) this.outputText("You see " + this.monster.pronoun1 + " is in perfect health.", false);
                else if (math > .75) this.outputText("You see " + this.monster.pronoun1 + " isn't very hurt.", false);
                else if (math > .5) this.outputText("You see " + this.monster.pronoun1 + " is slightly wounded.", false);
                else if (math > .25) this.outputText("You see " + this.monster.pronoun1 + " is seriously hurt.", false);
                else this.outputText("You see " + this.monster.pronoun1 + " is unsteady and close to death.", false);
            }
            this.outputText("  " + percent + "\n", false);
            this.showMonsterLust();
        }
        if (this.debug) {
            this.outputText("\n----------------------------\n");
            this.outputText(this.monster.generateDebugDescription(), false);
        }
    }
    public showMonsterLust(): void {
        //Entrapped
        if (this.monster.findStatusAffect(StatusAffects.Constricted) >= 0) {
            this.outputText(this.monster.capitalA + this.monster.short + " is currently wrapped up in your tail-coils!  ", false);
        }
        //Venom stuff!
        if (this.monster.findStatusAffect(StatusAffects.NagaVenom) >= 0) {
            if (this.monster.plural) {
                if (this.monster.statusAffectv1(StatusAffects.NagaVenom) <= 1) {
                    this.outputText("You notice " + this.monster.pronoun1 + " are beginning to show signs of weakening, but there still appears to be plenty of fight left in " + this.monster.pronoun2 + ".  ", false);
                }
                else {
                    this.outputText("You notice " + this.monster.pronoun1 + " are obviously affected by your venom, " + this.monster.pronoun3 + " movements become unsure, and " + this.monster.pronoun3 + " balance begins to fade. Sweat begins to roll on " + this.monster.pronoun3 + " skin. You wager " + this.monster.pronoun1 + " are probably beginning to regret provoking you.  ", false);
                }
            }
            //Not plural
            else {
                if (this.monster.statusAffectv1(StatusAffects.NagaVenom) <= 1) {
                    this.outputText("You notice " + this.monster.pronoun1 + " is beginning to show signs of weakening, but there still appears to be plenty of fight left in " + this.monster.pronoun2 + ".  ", false);
                }
                else {
                    this.outputText("You notice " + this.monster.pronoun1 + " is obviously affected by your venom, " + this.monster.pronoun3 + " movements become unsure, and " + this.monster.pronoun3 + " balance begins to fade. Sweat is beginning to roll on " + this.monster.pronoun3 + " skin. You wager " + this.monster.pronoun1 + " is probably beginning to regret provoking you.  ", false);
                }
            }

            this.monster.spe -= this.monster.statusAffectv1(StatusAffects.NagaVenom);
            this.monster.str -= this.monster.statusAffectv1(StatusAffects.NagaVenom);
            if (this.monster.spe < 1) this.monster.spe = 1;
            if (this.monster.str < 1) this.monster.str = 1;
        }
        if (this.monster.short == "harpy") {
            //(Enemy slightly aroused) 
            if (this.monster.lust >= 45 && this.monster.lust < 70) this.outputText("The harpy's actions are becoming more and more erratic as she runs her mad-looking eyes over your body, her chest jiggling, clearly aroused.  ", false);
            //(Enemy moderately aroused) 
            if (this.monster.lust >= 70 && this.monster.lust < 90) this.outputText("She stops flapping quite so frantically and instead gently sways from side to side, showing her soft, feathery body to you, even twirling and raising her tail feathers, giving you a glimpse of her plush pussy, glistening with fluids.", false);
            //(Enemy dangerously aroused) 
            if (this.monster.lust >= 90) this.outputText("You can see her thighs coated with clear fluids, the feathers matted and sticky as she struggles to contain her lust.", false);
        }
        else if (this.monster instanceof Clara) {
            //Clara is becoming aroused
            if (this.monster.lust <= 40) { }
            else if (this.monster.lust <= 65) this.outputText("The anger in her motions is weakening.");
            //Clara is somewhat aroused
            else if (this.monster.lust <= 75) this.outputText("Clara seems to be becoming more aroused than angry now.");
            //Clara is very aroused
            else if (this.monster.lust <= 85) this.outputText("Clara is breathing heavily now, the signs of her arousal becoming quite visible now.");
            //Clara is about to give in
            else this.outputText("It looks like Clara is on the verge of having her anger overwhelmed by her lusts.");
        }
        //{Bonus Lust Descripts}
        else if (this.monster.short == "Minerva") {
            if (this.monster.lust < 40) { }
            //(40)
            else if (this.monster.lust < 60) this.outputText("Letting out a groan Minerva shakes her head, focusing on the fight at hand.  The bulge in her short is getting larger, but the siren ignores her growing hard-on and continues fighting.  ");
            //(60) 
            else if (this.monster.lust < 80) this.outputText("Tentacles are squirming out from the crotch of her shorts as the throbbing bulge grows bigger and bigger, becoming harder and harder... for Minerva to ignore.  A damp spot has formed just below the bulge.  ");
            //(80)
            else this.outputText("She's holding onto her weapon for support as her face is flushed and pain-stricken.  Her tiny, short shorts are painfully holding back her quaking bulge, making the back of the fabric act like a thong as they ride up her ass and struggle against her cock.  Her cock-tentacles are lashing out in every direction.  The dampness has grown and is leaking down her leg.");
        }
        else if (this.monster.short == "Cum Witch") {
            //{Bonus Lust Desc (40+)}
            if (this.monster.lust < 40) { }
            else if (this.monster.lust < 50) this.outputText("Her nipples are hard, and poke two visible tents into the robe draped across her mountainous melons.  ");
            //{Bonus Lust Desc (50-75)}
            else if (this.monster.lust < 75) this.outputText("Wobbling dangerously, you can see her semi-hard shaft rustling the fabric as she moves, evidence of her growing needs.  ");
            //{75+}
            if (this.monster.lust >= 75) this.outputText("Swelling obscenely, the Cum Witch's thick cock stands out hard and proud, its bulbous tip rustling through the folds of her fabric as she moves and leaving dark smears in its wake.  ");
            //(85+}
            if (this.monster.lust >= 85) this.outputText("Every time she takes a step, those dark patches seem to double in size.  ");
            //{93+}
            if (this.monster.lust >= 93) this.outputText("There's no doubt about it, the Cum Witch is dripping with pre-cum and so close to caving in.  Hell, the lower half of her robes are slowly becoming a seed-stained mess.  ");
            //{Bonus Lust Desc (60+)}
            if (this.monster.lust >= 70) this.outputText("She keeps licking her lips whenever she has a moment, and she seems to be breathing awfully hard.  ");
        }
        else if (this.monster.short == "Kelt") {
            //Kelt Lust Levels
            //(sub 50)
            if (this.monster.lust < 50) this.outputText("Kelt actually seems to be turned off for once in his miserable life.  His maleness is fairly flaccid and droopy.  ");
            //(sub 60)
            else if (this.monster.lust < 60) this.outputText("Kelt's gotten a little stiff down below, but he still seems focused on taking you down.  ");
            //(sub 70)
            else if (this.monster.lust < 70) this.outputText("Kelt's member has grown to its full size and even flared a little at the tip.  It bobs and sways with every movement he makes, reminding him how aroused you get him.  ");
            //(sub 80)
            else if (this.monster.lust < 80) this.outputText("Kelt is unabashedly aroused at this point.  His skin is flushed, his manhood is erect, and a thin bead of pre has begun to bead underneath.  ");
            //(sub 90)
            else if (this.monster.lust < 90) this.outputText("Kelt seems to be having trouble focusing.  He keeps pausing and flexing his muscles, slapping his cock against his belly and moaning when it smears his pre-cum over his equine underside.  ");
            //(sub 100) 
            else this.outputText("There can be no doubt that you're having quite the effect on Kelt.  He keeps fidgeting, dripping pre-cum everywhere as he tries to keep up the facade of fighting you.  His maleness is continually twitching and bobbing, dripping messily.  He's so close to giving in...");
        }
        else if (this.monster.short == "green slime") {
            if (this.monster.lust >= 45 && this.monster.lust < 65) this.outputText("A lump begins to form at the base of the figure's torso, where its crotch would be.  ", false);
            if (this.monster.lust >= 65 && this.monster.lust < 85) this.outputText("A distinct lump pulses at the base of the slime's torso, as if something inside the creature were trying to escape.  ", false);
            if (this.monster.lust >= 85 && this.monster.lust < 93) this.outputText("A long, thick pillar like a small arm protrudes from the base of the slime's torso.  ", false);
            if (this.monster.lust >= 93) this.outputText("A long, thick pillar like a small arm protrudes from the base of the slime's torso.  Its entire body pulses, and it is clearly beginning to lose its cohesion.  ", false);
        }
        else if (this.monster.short == "Sirius, a naga hypnotist") {
            if (this.monster.lust < 40) { }
            else if (this.monster.lust >= 40) this.outputText("You can see the tip of his reptilian member poking out of its protective slit. ");
            else if (this.monster.lust >= 60) this.outputText("His cock is now completely exposed and half-erect, yet somehow he still stays focused on your eyes and his face is inexpressive.  ");
            else this.outputText("His cock is throbbing hard, you don't think it will take much longer for him to pop.   Yet his face still looks inexpressive... despite the beads of sweat forming on his brow.  ");

        }
        else if (this.monster.short == "kitsune") {
            //Kitsune Lust states:
            //Low
            if (this.monster.lust > 30 && this.monster.lust < 50) this.outputText("The kitsune's face is slightly flushed.  She fans herself with her hand, watching you closely.");
            //Med
            else if (this.monster.lust > 30 && this.monster.lust < 75) this.outputText("The kitsune's cheeks are bright pink, and you can see her rubbing her thighs together and squirming with lust.");
            //High
            else if (this.monster.lust > 30) {
                //High (redhead only)
                if (this.monster.hairColor == "red") this.outputText("The kitsune is openly aroused, unable to hide the obvious bulge in her robes as she seems to be struggling not to stroke it right here and now.");
                else this.outputText("The kitsune is openly aroused, licking her lips frequently and desperately trying to hide the trail of fluids dripping down her leg.");
            }
        }
        else if (this.monster.short == "demons") {
            if (this.monster.lust > 30 && this.monster.lust < 60) this.outputText("The demons lessen somewhat in the intensity of their attack, and some even eye up your assets as they strike at you.", false);
            if (this.monster.lust >= 60 && this.monster.lust < 80) this.outputText("The demons are obviously steering clear from damaging anything you might use to fuck and they're starting to leave their hands on you just a little longer after each blow. Some are starting to cop quick feels with their other hands and you can smell the demonic lust of a dozen bodies on the air.", false);
            if (this.monster.lust >= 80) this.outputText(" The demons are less and less willing to hit you and more and more willing to just stroke their hands sensuously over you. The smell of demonic lust is thick on the air and part of the group just stands there stroking themselves openly.", false);
        }
        else {
            if (this.monster.plural) {
                if (this.monster.lust > 50 && this.monster.lust < 60) this.outputText(this.monster.capitalA + this.monster.short + "' skin remains flushed with the beginnings of arousal.  ", false);
                if (this.monster.lust >= 60 && this.monster.lust < 70) this.outputText(this.monster.capitalA + this.monster.short + "' eyes constantly dart over your most sexual parts, betraying " + this.monster.pronoun3 + " lust.  ", false);
                if (this.monster.cocks.length > 0) {
                    if (this.monster.lust >= 70 && this.monster.lust < 85) this.outputText(this.monster.capitalA + this.monster.short + " are having trouble moving due to the rigid protrusion in " + this.monster.pronoun3 + " groins.  ", false);
                    if (this.monster.lust >= 85) this.outputText(this.monster.capitalA + this.monster.short + " are panting and softly whining, each movement seeming to make " + this.monster.pronoun3 + " bulges more pronounced.  You don't think " + this.monster.pronoun1 + " can hold out much longer.  ", false);
                }
                if (this.monster.vaginas.length > 0) {
                    if (this.monster.lust >= 70 && this.monster.lust < 85) this.outputText(this.monster.capitalA + this.monster.short + " are obviously turned on, you can smell " + this.monster.pronoun3 + " arousal in the air.  ", false);
                    if (this.monster.lust >= 85) this.outputText(this.monster.capitalA + this.monster.short + "' " + this.monster.vaginaDescript() + "s are practically soaked with their lustful secretions.  ", false);
                }
            }
            else {
                if (this.monster.lust > 50 && this.monster.lust < 60) this.outputText(this.monster.capitalA + this.monster.short + "'s skin remains flushed with the beginnings of arousal.  ", false);
                if (this.monster.lust >= 60 && this.monster.lust < 70) this.outputText(this.monster.capitalA + this.monster.short + "'s eyes constantly dart over your most sexual parts, betraying " + this.monster.pronoun3 + " lust.  ", false);
                if (this.monster.cocks.length > 0) {
                    if (this.monster.lust >= 70 && this.monster.lust < 85) this.outputText(this.monster.capitalA + this.monster.short + " is having trouble moving due to the rigid protrusion in " + this.monster.pronoun3 + " groin.  ", false);
                    if (this.monster.lust >= 85) this.outputText(this.monster.capitalA + this.monster.short + " is panting and softly whining, each movement seeming to make " + this.monster.pronoun3 + " bulge more pronounced.  You don't think " + this.monster.pronoun1 + " can hold out much longer.  ", false);
                }
                if (this.monster.vaginas.length > 0) {
                    if (this.monster.lust >= 70 && this.monster.lust < 85) this.outputText(this.monster.capitalA + this.monster.short + " is obviously turned on, you can smell " + this.monster.pronoun3 + " arousal in the air.  ", false);
                    if (this.monster.lust >= 85) this.outputText(this.monster.capitalA + this.monster.short + "'s " + this.monster.vaginaDescript() + " is practically soaked with her lustful secretions.  ", false);
                }
            }
        }
    }

    // This is a bullshit work around to get the parser to do what I want without having to fuck around in it's code.
    public teaseText(): string {
        this.tease(true);
        return "";
    }

    // Just text should force the function to purely emit the test text to the output display, and not have any other side effects
    public tease(justText: boolean = false): void {
        if (!justText) this.outputText("", true);
        //You cant tease a blind guy!
        if (this.monster.findStatusAffect(StatusAffects.Blind) >= 0) {
            this.outputText("You do your best to tease " + this.monster.a + this.monster.short + " with your body.  It doesn't work - you blinded " + this.monster.pronoun2 + ", remember?\n\n", true);
            return;
        }
        if (this.player.findStatusAffect(StatusAffects.Sealed) >= 0 && this.player.statusAffectv2(StatusAffects.Sealed) == 1) {
            this.outputText("You do your best to tease " + this.monster.a + this.monster.short + " with your body.  Your artless twirls have no effect, as <b>your ability to tease is sealed.</b>\n\n", true);
            return;
        }
        if (this.monster.short == "Sirius, a naga hypnotist") {
            this.outputText("He is too focused on your eyes to pay any attention to your teasing moves, <b>looks like you'll have to beat him up.</b>\n\n");
            return;
        }
        this.fatigueRecovery();
        var damage: number;
        var chance: number;
        var bimbo: boolean = false;
        var bro: boolean = false;
        var futa: boolean = false;
        var choices: any[] = [];
        var select: number;
        //Tags used for bonus damage and chance later on
        var breasts: boolean = false;
        var penis: boolean = false;
        var balls: boolean = false;
        var vagina: boolean = false;
        var anus: boolean = false;
        var ass: boolean = false;
        //If auto = true, set up bonuses using above flags
        var auto: boolean = true;
        //==============================
        //Determine basic success chance.
        //==============================
        chance = 60;
        //5% chance for each tease level.
        chance += this.player.teaseLevel * 5;
        //10% for seduction perk
        if (this.player.findPerk(PerkLib.Seduction) >= 0) chance += 10;
        //10% for sexy armor types
        if (this.player.findPerk(PerkLib.SluttySeduction) >= 0) chance += 10;
        //10% for bimbo shits
        if (this.player.findPerk(PerkLib.BimboBody) >= 0) {
            chance += 10;
            bimbo = true;
        }
        if (this.player.findPerk(PerkLib.BroBody) >= 0) {
            chance += 10;
            bro = true;
        }
        if (this.player.findPerk(PerkLib.FutaForm) >= 0) {
            chance += 10;
            futa = true;
        }
        //2 & 2 for seductive valentines!
        if (this.player.findPerk(PerkLib.SensualLover) >= 0) {
            chance += 2;
        }
        if (this.player.findPerk(PerkLib.ChiReflowLust) >= 0) chance += UmasShop.NEEDLEWORK_LUST_TEASE_MULTI;
        //==============================
        //Determine basic damage.
        //==============================
        damage = 6 + this.rand(3);
        if (this.player.findPerk(PerkLib.SensualLover) >= 0) {
            damage += 2;
        }
        if (this.player.findPerk(PerkLib.Seduction) >= 0) damage += 5;
        //+ slutty armor bonus
        if (this.player.findPerk(PerkLib.SluttySeduction) >= 0) damage += this.player.perkv1(PerkLib.SluttySeduction);
        //10% for bimbo shits
        if (bimbo || bro || futa) {
            damage += 5;
            bimbo = true;
        }
        damage += this.player.level;
        damage += this.player.teaseLevel * 2;
        //==============================
        //TEASE SELECT CHOICES
        //==BASICS========
        //0 butt shake
        //1 breast jiggle
        //2 pussy flash
        //3 cock flash
        //==BIMBO STUFF===
        //4 butt shake
        //5 breast jiggle
        //6 pussy flash
        //7 special Adjatha-crafted bend over bimbo times
        //==BRO STUFF=====
        //8 Pec Dance
        //9 Heroic Pose
        //10 Bulgy groin thrust
        //11 Show off dick
        //==EXTRAS========
        //12 Cat flexibility.
        //13 Pregnant
        //14 Brood Mother
        //15 Nipplecunts
        //16 Anal gape
        //17 Bee abdomen tease
        //18 DOG TEASE
        //19 Maximum Femininity:
        //20 Maximum MAN:
        //21 Perfect Androgyny:
        //22 SPOIDAH SILK
        //23 RUT
        //24 Poledance - req's staff! - Req's gender!  Req's TITS!
        //25 Tall Tease! - Reqs 2+ feet & PC Cunt!
        //26 SMART PEEPS! 70+ int, arouse spell!
        //27 - FEEDER
        //28 FEMALE TEACHER COSTUME TEASE
        //29 Male Teacher Outfit Tease
        //30 Naga Fetish Clothes
        //31 Centaur harness clothes
        //32 Genderless servant clothes
        //33 Crotch Revealing Clothes (herm only?)
        //34 Maid Costume (female only):
        //35 Servant Boy Clothes (male only)
        //36 Bondage Patient Clothes 
        //37 Kitsune Tease
        //38 Kitsune Tease
        //39 Kitsune Tease
        //40 Kitsune Tease
        //41 Kitsune Gendered Tease
        //42 Urta teases
        //43 Cowgirl teases
        //44 Bikini Mail Tease
        //==============================
        //BUILD UP LIST OF TEASE CHOICES!
        //==============================
        //Futas!
        if ((futa || bimbo) && this.player.gender == 3) {
            //Once chance of butt.
            choices[choices.length] = 4;
            //Big butts get more butt
            if (this.player.buttRating >= 7) choices[choices.length] = 4;
            if (this.player.buttRating >= 10) choices[choices.length] = 4;
            if (this.player.buttRating >= 14) choices[choices.length] = 4;
            if (this.player.buttRating >= 20) choices[choices.length] = 4;
            if (this.player.buttRating >= 25) choices[choices.length] = 4;
            //Breast jiggle!
            if (this.player.biggestTitSize() >= 2) choices[choices.length] = 5;
            if (this.player.biggestTitSize() >= 4) choices[choices.length] = 5;
            if (this.player.biggestTitSize() >= 8) choices[choices.length] = 5;
            if (this.player.biggestTitSize() >= 15) choices[choices.length] = 5;
            if (this.player.biggestTitSize() >= 30) choices[choices.length] = 5;
            if (this.player.biggestTitSize() >= 50) choices[choices.length] = 5;
            if (this.player.biggestTitSize() >= 75) choices[choices.length] = 5;
            if (this.player.biggestTitSize() >= 100) choices[choices.length] = 5;
            //Pussy Flash!
            if (this.player.hasVagina()) {
                choices[choices.length] = 2;
                if (this.player.wetness() >= 3) choices[choices.length] = 6;
                if (this.player.wetness() >= 5) choices[choices.length] = 6;
                if (this.player.vaginalCapacity() >= 30) choices[choices.length] = 6;
                if (this.player.vaginalCapacity() >= 60) choices[choices.length] = 6;
                if (this.player.vaginalCapacity() >= 75) choices[choices.length] = 6;
            }
            //Adj special!
            if (this.player.hasVagina() && this.player.buttRating >= 8 && this.player.hipRating >= 6 && this.player.biggestTitSize() >= 4) {
                choices[choices.length] = 7;
                choices[choices.length] = 7;
                choices[choices.length] = 7;
                choices[choices.length] = 7;
            }
            //Cock flash!
            if (futa && this.player.hasCock()) {
                choices[choices.length] = 10;
                choices[choices.length] = 11;
                if (this.player.cockTotal() > 1) choices[choices.length] = 10;
                if (this.player.cockTotal() >= 2) choices[choices.length] = 11;
                if (this.player.biggestCockArea() >= 10) choices[choices.length] = 10;
                if (this.player.biggestCockArea() >= 25) choices[choices.length] = 11;
                if (this.player.biggestCockArea() >= 50) choices[choices.length] = 11;
                if (this.player.biggestCockArea() >= 75) choices[choices.length] = 10;
                if (this.player.biggestCockArea() >= 100) choices[choices.length] = 11;
                if (this.player.biggestCockArea() >= 300) choices[choices.length] = 10;
            }
        }
        else if (bro) {
            //8 Pec Dance
            if (this.player.biggestTitSize() < 1 && this.player.tone >= 60) {
                choices[choices.length] = 8;
                if (this.player.tone >= 70) choices[choices.length] = 8;
                if (this.player.tone >= 80) choices[choices.length] = 8;
                if (this.player.tone >= 90) choices[choices.length] = 8;
                if (this.player.tone == 100) choices[choices.length] = 8;
            }
            //9 Heroic Pose
            if (this.player.tone >= 60 && this.player.str >= 50) {
                choices[choices.length] = 9;
                if (this.player.tone >= 80) choices[choices.length] = 9;
                if (this.player.str >= 70) choices[choices.length] = 9;
                if (this.player.tone >= 90) choices[choices.length] = 9;
                if (this.player.str >= 80) choices[choices.length] = 9;
            }
            //Cock flash!
            if (this.player.hasCock()) {
                choices[choices.length] = 10;
                choices[choices.length] = 11;
                if (this.player.cockTotal() > 1) choices[choices.length] = 10;
                if (this.player.cockTotal() >= 2) choices[choices.length] = 11;
                if (this.player.biggestCockArea() >= 10) choices[choices.length] = 10;
                if (this.player.biggestCockArea() >= 25) choices[choices.length] = 11;
                if (this.player.biggestCockArea() >= 50) choices[choices.length] = 11;
                if (this.player.biggestCockArea() >= 75) choices[choices.length] = 10;
                if (this.player.biggestCockArea() >= 100) choices[choices.length] = 11;
                if (this.player.biggestCockArea() >= 300) choices[choices.length] = 10;
            }
        }
        //VANILLA FOLKS
        else {
            //Once chance of butt.
            choices[choices.length] = 0;
            //Big butts get more butt
            if (this.player.buttRating >= 7) choices[choices.length] = 0;
            if (this.player.buttRating >= 10) choices[choices.length] = 0;
            if (this.player.buttRating >= 14) choices[choices.length] = 0;
            if (this.player.buttRating >= 20) choices[choices.length] = 0;
            if (this.player.buttRating >= 25) choices[choices.length] = 0;
            //Breast jiggle!
            if (this.player.biggestTitSize() >= 2) choices[choices.length] = 1;
            if (this.player.biggestTitSize() >= 4) choices[choices.length] = 1;
            if (this.player.biggestTitSize() >= 8) choices[choices.length] = 1;
            if (this.player.biggestTitSize() >= 15) choices[choices.length] = 1;
            if (this.player.biggestTitSize() >= 30) choices[choices.length] = 1;
            if (this.player.biggestTitSize() >= 50) choices[choices.length] = 1;
            if (this.player.biggestTitSize() >= 75) choices[choices.length] = 1;
            if (this.player.biggestTitSize() >= 100) choices[choices.length] = 1;
            //Pussy Flash!
            if (this.player.hasVagina()) {
                choices[choices.length] = 2;
                if (this.player.wetness() >= 3) choices[choices.length] = 2;
                if (this.player.wetness() >= 5) choices[choices.length] = 2;
                if (this.player.vaginalCapacity() >= 30) choices[choices.length] = 2;
                if (this.player.vaginalCapacity() >= 60) choices[choices.length] = 2;
                if (this.player.vaginalCapacity() >= 75) choices[choices.length] = 2;
            }
            //Cock flash!
            if (this.player.hasCock()) {
                choices[choices.length] = 3;
                if (this.player.cockTotal() > 1) choices[choices.length] = 3;
                if (this.player.cockTotal() >= 2) choices[choices.length] = 3;
                if (this.player.biggestCockArea() >= 10) choices[choices.length] = 3;
                if (this.player.biggestCockArea() >= 25) choices[choices.length] = 3;
                if (this.player.biggestCockArea() >= 50) choices[choices.length] = 3;
                if (this.player.biggestCockArea() >= 75) choices[choices.length] = 3;
                if (this.player.biggestCockArea() >= 100) choices[choices.length] = 3;
                if (this.player.biggestCockArea() >= 300) choices[choices.length] = 3;
            }
        }
        //==EXTRAS========
        //12 Cat flexibility.
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && this.player.isBiped() && this.player.hasVagina()) {
            choices[choices.length] = 12;
            choices[choices.length] = 12;
            if (this.player.wetness() >= 3) choices[choices.length] = 12;
            if (this.player.wetness() >= 5) choices[choices.length] = 12;
            if (this.player.vaginalCapacity() >= 30) choices[choices.length] = 12;
        }
        //13 Pregnant
        if (this.player.pregnancyIncubation <= 216 && this.player.pregnancyIncubation > 0) {
            choices[choices.length] = 13;
            if (this.player.biggestLactation() >= 1) choices[choices.length] = 13;
            if (this.player.pregnancyIncubation <= 180) choices[choices.length] = 13;
            if (this.player.pregnancyIncubation <= 120) choices[choices.length] = 13;
            if (this.player.pregnancyIncubation <= 100) choices[choices.length] = 13;
            if (this.player.pregnancyIncubation <= 50) choices[choices.length] = 13;
            if (this.player.pregnancyIncubation <= 24) choices[choices.length] = 13;
            if (this.player.pregnancyIncubation <= 24) choices[choices.length] = 13;
            if (this.player.pregnancyIncubation <= 24) choices[choices.length] = 13;
            if (this.player.pregnancyIncubation <= 24) choices[choices.length] = 13;
        }
        //14 Brood Mother
        if (this.monster.hasCock() && this.player.hasVagina() && this.player.findPerk(PerkLib.BroodMother) >= 0 && (this.player.pregnancyIncubation <= 0 || this.player.pregnancyIncubation > 216)) {
            choices[choices.length] = 14;
            choices[choices.length] = 14;
            choices[choices.length] = 14;
            if (this.player.inHeat) choices[choices.length] = 14;
            if (this.player.inHeat) choices[choices.length] = 14;
            if (this.player.inHeat) choices[choices.length] = 14;
            if (this.player.inHeat) choices[choices.length] = 14;
            if (this.player.inHeat) choices[choices.length] = 14;
            if (this.player.inHeat) choices[choices.length] = 14;
            if (this.player.inHeat) choices[choices.length] = 14;
        }
        //15 Nipplecunts
        if (this.player.hasFuckableNipples()) {
            choices[choices.length] = 15;
            choices[choices.length] = 15;
            if (this.player.hasVagina()) choices[choices.length] = 15;
            if (this.player.hasVagina()) choices[choices.length] = 15;
            if (this.player.hasVagina()) choices[choices.length] = 15;
            if (this.player.wetness() >= 3) choices[choices.length] = 15;
            if (this.player.wetness() >= 5) choices[choices.length] = 15;
            if (this.player.biggestTitSize() >= 3) choices[choices.length] = 15;
            if (this.player.nippleLength >= 3) choices[choices.length] = 15;
        }
        //16 Anal gape
        if (this.player.ass.analLooseness >= 4) {
            choices[choices.length] = 16;
            if (this.player.ass.analLooseness >= 5) choices[choices.length] = 16;
        }
        //17 Bee abdomen tease
        if (this.player.tailType == CoC.TAIL_TYPE_BEE_ABDOMEN) {
            choices[choices.length] = 17;
            choices[choices.length] = 17;
        }
        //18 DOG TEASE
        if (this.player.dogScore() >= 4 && this.player.hasVagina() && this.player.isBiped()) {
            choices[choices.length] = 18;
            choices[choices.length] = 18;
        }
        //19 Maximum Femininity:
        if (this.player.femininity >= 100) {
            choices[choices.length] = 19;
            choices[choices.length] = 19;
            choices[choices.length] = 19;
        }
        //20 Maximum MAN:
        if (this.player.femininity <= 0) {
            choices[choices.length] = 20;
            choices[choices.length] = 20;
            choices[choices.length] = 20;
        }
        //21 Perfect Androgyny:
        if (this.player.femininity == 50) {
            choices[choices.length] = 21;
            choices[choices.length] = 21;
            choices[choices.length] = 21;
        }
        //22 SPOIDAH SILK
        if (this.player.tailType == CoC.TAIL_TYPE_SPIDER_ADBOMEN) {
            choices[choices.length] = 22;
            choices[choices.length] = 22;
            choices[choices.length] = 22;
            if (this.player.spiderScore() >= 4) {
                choices[choices.length] = 22;
                choices[choices.length] = 22;
                choices[choices.length] = 22;
            }
        }
        //23 RUT
        if (this.player.inRut && this.monster.hasVagina() && this.player.hasCock()) {
            choices[choices.length] = 23;
            choices[choices.length] = 23;
            choices[choices.length] = 23;
            choices[choices.length] = 23;
            choices[choices.length] = 23;
        }
        //24 Poledance - req's staff! - Req's gender!  Req's TITS!
        if (this.player.weaponName == "wizard's staff" && this.player.biggestTitSize() >= 1 && this.player.gender > 0) {
            choices[choices.length] = 24;
            choices[choices.length] = 24;
            choices[choices.length] = 24;
            choices[choices.length] = 24;
            choices[choices.length] = 24;
        }
        //25 Tall Tease! - Reqs 2+ feet & PC Cunt!
        if (this.player.tallness - this.monster.tallness >= 24 && this.player.biggestTitSize() >= 4) {
            choices[choices.length] = 25;
            choices[choices.length] = 25;
            choices[choices.length] = 25;
            choices[choices.length] = 25;
            choices[choices.length] = 25;
        }
        //26 SMART PEEPS! 70+ int, arouse spell!
        if (this.player.inte >= 70 && this.player.findStatusAffect(StatusAffects.KnowsArouse) >= 0) {
            choices[choices.length] = 26;
            choices[choices.length] = 26;
            choices[choices.length] = 26;
        }
        //27 FEEDER
        if (this.player.findPerk(PerkLib.Feeder) >= 0 && this.player.biggestTitSize() >= 4) {
            choices[choices.length] = 27;
            choices[choices.length] = 27;
            choices[choices.length] = 27;
            if (this.player.biggestTitSize() >= 10) choices[choices.length] = 27;
            if (this.player.biggestTitSize() >= 15) choices[choices.length] = 27;
            if (this.player.biggestTitSize() >= 25) choices[choices.length] = 27;
            if (this.player.biggestTitSize() >= 40) choices[choices.length] = 27;
            if (this.player.biggestTitSize() >= 60) choices[choices.length] = 27;
            if (this.player.biggestTitSize() >= 80) choices[choices.length] = 27;
        }
        //28 FEMALE TEACHER COSTUME TEASE
        if (this.player.armorName == "backless female teacher's clothes" && this.player.gender == 2) {
            choices[choices.length] = 28;
            choices[choices.length] = 28;
            choices[choices.length] = 28;
            choices[choices.length] = 28;
        }
        //29 Male Teacher Outfit Tease
        if (this.player.armorName == "formal vest, tie, and crotchless pants" && this.player.gender == 1) {
            choices[choices.length] = 29;
            choices[choices.length] = 29;
            choices[choices.length] = 29;
            choices[choices.length] = 29;
        }
        //30 Naga Fetish Clothes
        if (this.player.armorName == "headdress, necklaces, and many body-chains") {
            choices[choices.length] = 30;
            choices[choices.length] = 30;
            choices[choices.length] = 30;
            choices[choices.length] = 30;
        }
        //31 Centaur harness clothes
        if (this.player.armorName == "bridle bit and saddle set") {
            choices[choices.length] = 31;
            choices[choices.length] = 31;
            choices[choices.length] = 31;
            choices[choices.length] = 31;
        }
        //32 Genderless servant clothes
        if (this.player.armorName == "servant's clothes" && this.player.gender == 0) {
            choices[choices.length] = 32;
            choices[choices.length] = 32;
            choices[choices.length] = 32;
            choices[choices.length] = 32;
        }
        //33 Crotch Revealing Clothes (herm only?)
        if (this.player.armorName == "crotch-revealing clothes" && this.player.gender == 3) {
            choices[choices.length] = 33;
            choices[choices.length] = 33;
            choices[choices.length] = 33;
            choices[choices.length] = 33;
        }
        //34 Maid Costume (female only):
        if (this.player.armorName == "maid's clothes" && this.player.hasVagina()) {
            choices[choices.length] = 34;
            choices[choices.length] = 34;
            choices[choices.length] = 34;
            choices[choices.length] = 34;
        }
        //35 Servant Boy Clothes (male only)
        if (this.player.armorName == "cute servant's clothes" && this.player.hasCock()) {
            choices[choices.length] = 35;
            choices[choices.length] = 35;
            choices[choices.length] = 35;
            choices[choices.length] = 35;
        }
        //36 Bondage Patient Clothes 
        if (this.player.armorName == "bondage patient clothes") {
            choices[choices.length] = 36;
            choices[choices.length] = 36;
            choices[choices.length] = 36;
            choices[choices.length] = 36;
        }
        //37 Kitsune Tease
        //38 Kitsune Tease
        //39 Kitsune Tease
        //40 Kitsune Tease
        if (this.player.kitsuneScore() >= 2 && this.player.tailType == CoC.TAIL_TYPE_FOX) {
            choices[choices.length] = 37;
            choices[choices.length] = 37;
            choices[choices.length] = 37;
            choices[choices.length] = 37;
            choices[choices.length] = 38;
            choices[choices.length] = 38;
            choices[choices.length] = 38;
            choices[choices.length] = 38;
            choices[choices.length] = 39;
            choices[choices.length] = 39;
            choices[choices.length] = 39;
            choices[choices.length] = 39;
            choices[choices.length] = 40;
            choices[choices.length] = 40;
            choices[choices.length] = 40;
            choices[choices.length] = 40;
        }
        //41 Kitsune Gendered Tease
        if (this.player.kitsuneScore() >= 2 && this.player.tailType == CoC.TAIL_TYPE_FOX) {
            choices[choices.length] = 41;
            choices[choices.length] = 41;
            choices[choices.length] = 41;
            choices[choices.length] = 41;
        }
        //42 Urta teases!
        if (this.urtaQuest.isUrta()) {
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
            choices[choices.length] = 42;
        }
        //43 - special mino + cowgirls
        if (this.player.hasVagina() && this.player.lactationQ() >= 500 && this.player.biggestTitSize() >= 6 && this.player.cowScore() >= 3 && this.player.tailType == CoC.TAIL_TYPE_COW) {
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
            choices[choices.length] = 43;
        }
        //44 - Bikini Mail Teases!
        if (this.player.hasVagina() && this.player.biggestTitSize() >= 4 && this.player.armorName == "lusty maiden's armor") {
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
            choices[choices.length] = 44;
        }
        //=======================================================
        //    CHOOSE YOUR TEASE AND DISPLAY IT!
        //=======================================================
        select = choices[this.rand(choices.length)];
        if (this.monster.short.indexOf("minotaur") != -1) {
            if (this.player.hasVagina() && this.player.lactationQ() >= 500 && this.player.biggestTitSize() >= 6 && this.player.cowScore() >= 3 && this.player.tailType == CoC.TAIL_TYPE_COW)
                select = 43;
        }
        //Lets do zis!
        switch (select) {
            //0 butt shake
            case 0:
                //Display
                this.outputText("You slap your " + this.buttDescript(), false);
                if (this.player.buttRating >= 10 && this.player.tone < 60) this.outputText(", making it jiggle delightfully.", false);
                else this.outputText(".", false);
                //Mod success
                ass = true;
                break;
            //1 BREAST JIGGLIN'
            case 1:
                //Single breast row
                if (this.player.breastRows.length == 1) {
                    //50+ breastsize% success rate
                    this.outputText("Your lift your top, exposing your " + this.breastDescript(0) + " to " + this.monster.a + this.monster.short + ".  You shake them from side to side enticingly.", false);
                    if (this.player.lust >= 50) this.outputText("  Your " + this.nippleDescript(0) + "s seem to demand " + this.monster.pronoun3 + " attention.", false);
                }
                //Multirow
                if (this.player.breastRows.length > 1) {
                    //50 + 10% per breastRow + breastSize%
                    this.outputText("You lift your top, freeing your rows of " + this.breastDescript(0) + " to jiggle freely.  You shake them from side to side enticingly", false);
                    if (this.player.lust >= 50) this.outputText(", your " + this.nippleDescript(0) + "s painfully visible.", false);
                    else this.outputText(".", false);
                    chance++;
                }
                breasts = true;
                break;
            //2 PUSSAH FLASHIN'
            case 2:
                if (this.player.isTaur()) {
                    this.outputText("You gallop toward your unsuspecting enemy, dodging their defenses and knocking them to the ground.  Before they can recover, you slam your massive centaur ass down upon them, stopping just short of using crushing force to pin them underneath you.  In this position, your opponent's face is buried right in your girthy horsecunt.  You grind your cunt into " + this.monster.pronoun3 + " face for a moment before standing.  When you do, you're gratified to see your enemy covered in your lubricant and smelling powerfully of horsecunt.", false);
                    chance += 2;
                    damage += 4;
                }
                else {
                    this.outputText("You open your " + this.player.armorName + ", revealing your ", false);
                    if (this.player.cocks.length > 0) {
                        chance++;
                        damage++;
                        if (this.player.cocks.length == 1) this.outputText(this.player.cockDescript(0), false);
                        if (this.player.cocks.length > 1) this.outputText(this.player.multiCockDescriptLight(), false);
                        this.outputText(" and ", false);
                        if (this.player.findPerk(PerkLib.BulgeArmor) >= 0) {
                            damage += 5;
                        }
                        penis = true;
                    }
                    this.outputText(this.vaginaDescript(0), false);
                    this.outputText(".", false);
                }
                vagina = true;
                break;
            //3 cock flash
            case 3:
                if (this.player.isTaur() && this.player.horseCocks() > 0) {
                    this.outputText("You let out a bestial whinny and stomp your hooves at your enemy.  They prepare for an attack, but instead you kick your front hooves off the ground, revealing the hefty horsecock hanging beneath your belly.  You let it flop around, quickly getting rigid and to its full erect length.  You buck your hips as if you were fucking a mare in heat, letting your opponent know just what's in store for them if they surrender to pleasure...", false);
                    if (this.player.findPerk(PerkLib.BulgeArmor) >= 0) damage += 5;
                }
                else {
                    this.outputText("You open your " + this.player.armorName + ", revealing your ", false);
                    if (this.player.cocks.length == 1) this.outputText(this.player.cockDescript(0), false);
                    if (this.player.cocks.length > 1) this.outputText(this.player.multiCockDescriptLight(), false);
                    if (this.player.hasVagina()) this.outputText(" and ", false);
                    //Bulgy bonus!
                    if (this.player.findPerk(PerkLib.BulgeArmor) >= 0) {
                        damage += 5;
                        chance++;
                    }
                    if (this.player.vaginas.length > 0) {
                        this.outputText(this.vaginaDescript(0), false);
                        vagina = true;
                    }
                    this.outputText(".", false);
                }
                penis = true;
                break;
            //BIMBO
            //4 butt shake
            case 4:
                this.outputText("You turn away and bounce your " + this.buttDescript() + " up and down hypnotically", false);
                //Big butts = extra text + higher success
                if (this.player.buttRating >= 10) {
                    this.outputText(", making it jiggle delightfully.  " + this.monster.capitalA + this.monster.short + " even gets a few glimpses of the " + this.assholeDescript() + " between your cheeks.", false);
                    chance += 3;
                }
                //Small butts = less damage, still high success
                else {
                    this.outputText(", letting " + this.monster.a + this.monster.short + " get a good look at your " + this.assholeDescript() + " and " + this.vaginaDescript(0) + ".", false);
                    chance += 1;
                    vagina = true;
                }
                ass = true;
                anus = true;
                break;
            //5 breast jiggle
            case 5:
                this.outputText("You lean forward, letting the well-rounded curves of your " + this.allBreastsDescript() + " show to " + this.monster.a + this.monster.short + ".", false);
                this.outputText("  You cup them in your palms and lewdly bounce them, putting on a show and giggling the entire time.  An inch at a time, your " + this.player.armorName + " starts to come down, dropping tantalizingly slowly until your " + this.nippleDescript(0) + "s pop free.", false);
                if (this.player.lust >= 50) {
                    if (this.player.hasFuckableNipples()) {
                        chance++;
                        this.outputText("  Clear slime leaks from them, making it quite clear that they're more than just nipples.", false);
                    }
                    else this.outputText("  Your hard nipples seem to demand " + this.monster.pronoun3 + " attention.", false);
                    chance += 1;
                    damage += 2;
                }
                //Damage boosts!
                breasts = true;
                break;
            //6 pussy flash
            case 6:
                if (this.player.findPerk(PerkLib.BimboBrains) >= 0 || this.player.findPerk(PerkLib.FutaFaculties) >= 0) {
                    this.outputText("You coyly open your " + this.player.armorName + " and giggle, \"<i>Is this, like, what you wanted to see?</i>\"  ", false);
                }
                else {
                    this.outputText("You coyly open your " + this.player.armorName + " and purr, \"<i>Does the thought of a hot, ", false);
                    if (futa) this.outputText("futanari ", false);
                    else if (this.player.findPerk(PerkLib.BimboBody) >= 0) this.outputText("bimbo ", false);
                    else this.outputText("sexy ");
                    this.outputText("body turn you on?</i>\"  ", false);
                }
                if (this.monster.plural) this.outputText(this.monster.capitalA + this.monster.short + "' gazes are riveted on your groin as you run your fingers up and down your folds seductively.", false);
                else this.outputText(this.monster.capitalA + this.monster.short + "'s gaze is riveted on your groin as you run your fingers up and down your folds seductively.", false);
                if (this.player.clitLength > 3) this.outputText("  You smile as your " + this.clitDescript() + " swells out from the folds and stands proudly, begging to be touched.", false);
                else this.outputText("  You smile and pull apart your lower-lips to expose your " + this.clitDescript() + ", giving the perfect view.", false);
                if (this.player.cockTotal() > 0) this.outputText("  Meanwhile, " + this.player.sMultiCockDesc() + " bobs back and forth with your gyrating hips, adding to the display.", false);
                //BONUSES!
                if (this.player.hasCock()) {
                    if (this.player.findPerk(PerkLib.BulgeArmor) >= 0) damage += 5;
                    penis = true;
                }
                vagina = true;
                break;
            //7 special Adjatha-crafted bend over bimbo times
            case 7:
                this.outputText("The glinting of light catches your eye and you whip around to inspect the glittering object, turning your back on " + this.monster.a + this.monster.short + ".  Locking your knees, you bend waaaaay over, " + this.chestDesc() + " swinging in the open air while your " + this.buttDescript() + " juts out at the " + this.monster.a + this.monster.short + ".  Your plump cheeks and " + this.hipDescript() + " form a jiggling heart-shape as you eagerly rub your thighs together.\n\n", false);
                this.outputText("The clear, warm fluid of your happy excitement trickles down from your loins, polishing your " + this.player.skin() + " to a glossy, inviting shine.  Retrieving the useless, though shiny, bauble, you hold your pose for just a moment longer, a sly little smile playing across your lips as you wiggle your cheeks one more time before straightening up and turning back around.", false);
                vagina = true;
                chance++;
                damage += 2;
                break;
            //==BRO STUFF=====
            //8 Pec Dance
            case 8:
                this.outputText("You place your hands on your hips and flex repeatedly, skillfully making your pecs alternatively bounce in a muscular dance.  ", false);
                if (this.player.findPerk(PerkLib.BroBrains) >= 0) this.outputText("Damn, " + this.monster.a + this.monster.short + " has got to love this!", false);
                else this.outputText(this.monster.capitalA + this.monster.short + " will probably enjoy the show, but you feel a bit silly doing this.", false);
                chance += (this.player.tone - 75) / 5;
                damage += (this.player.tone - 70) / 5;
                auto = false;
                break;
            //9 Heroic Pose
            case 9:
                this.outputText("You lift your arms and flex your incredibly muscular arms while flashing your most disarming smile.  ", false);
                if (this.player.findPerk(PerkLib.BroBrains) >= 0) this.outputText(this.monster.capitalA + this.monster.short + " can't resist such a heroic pose!", false);
                else this.outputText("At least the physical changes to your body are proving useful!", false);
                chance += (this.player.tone - 75) / 5;
                damage += (this.player.tone - 70) / 5;
                auto = false;
                break;
            //10 Bulgy groin thrust
            case 10:
                this.outputText("You lean back and pump your hips at " + this.monster.a + this.monster.short + " in an incredibly vulgar display.  The bulging, barely-contained outline of your " + this.player.cockDescript(0) + " presses hard into your gear.  ", false);
                if (this.player.findPerk(PerkLib.BroBrains) >= 0) this.outputText("No way could " + this.monster.pronoun1 + " resist your huge cock!", false);
                else this.outputText("This is so crude, but at the same time, you know it'll likely be effective.", false);
                this.outputText("  You go on like that, humping the air for your foe", false);
                this.outputText("'s", false);
                this.outputText(" benefit, trying to entice them with your man-meat.", false);
                if (this.player.findPerk(PerkLib.BulgeArmor) >= 0) damage += 5;
                penis = true;
                break;
            //11 Show off dick
            case 11:
                if (this.silly() && this.rand(2) == 0) this.outputText("You strike a herculean pose and flex, whispering, \"<i>Do you even lift?</i>\" to " + this.monster.a + this.monster.short + ".", false);
                else {
                    this.outputText("You open your " + this.player.armorName + " just enough to let your " + this.player.cockDescript(0) + " and " + this.ballsDescriptLight() + " dangle free.  A shiny rope of pre-cum dangles from your cock, showing that your reproductive system is every bit as fit as the rest of you.  ", false);
                    if (this.player.findPerk(PerkLib.BroBrains) >= 0) this.outputText("Bitches love a cum-leaking cock.", false);
                    else this.outputText("You've got to admit, you look pretty good down there.", false);
                }
                if (this.player.findPerk(PerkLib.BulgeArmor) >= 0) damage += 5;
                penis = true;
                break;
            //==EXTRAS========
            //12 Cat flexibility.
            case 12:
                //CAT TEASE MOTHERFUCK (requires flexibility and legs [maybe can't do it with armor?])
                this.outputText("Reaching down, you grab an ankle and pull it backwards, looping it up and over to touch the foot to your " + this.hairDescript() + ".  You bring the leg out to the side, showing off your " + this.vaginaDescript(0) + " through your " + this.player.armorName + ".  The combination of the lack of discomfort on your face and the ease of which you're able to pose shows " + this.monster.a + this.monster.short + " how good of a time they're in for with you.", false);
                vagina = true;
                if (this.player.thickness < 33) chance++;
                else if (this.player.thickness >= 66) chance--;
                damage += (this.player.thickness - 50) / 10;
                break;
            //13 Pregnant
            case 13:
                //PREG
                this.outputText("You lean back, feigning a swoon while pressing a hand on the small of your back.  The pose juts your huge, pregnant belly forward and makes the shiny spherical stomach look even bigger.  With a teasing groan, you rub the protruding tummy gently, biting your lip gently as you stare at " + this.monster.a + this.monster.short + " through heavily lidded eyes.  \"<i>All of this estrogen is making me frisky,</i>\" you moan, stroking hand gradually shifting to the southern hemisphere of your big baby-bump.", false);
                //if lactating] 
                if (this.player.biggestLactation() >= 1) {
                    this.outputText("  Your other hand moves to expose your " + this.chestDesc() + ", cupping and squeezing a stream of milk to leak down the front of your " + this.player.armorName + ".  \"<i>Help a mommy out.</i>\"\n\n", false);
                    chance += 2;
                    damage += 4;
                }
                if (this.player.pregnancyIncubation < 100) {
                    chance++;
                    damage += 2;
                }
                if (this.player.pregnancyIncubation < 50) {
                    chance++;
                    damage += 2;
                }
                break;
            //14 Brood Mother
            case 14:
                if (this.rand(2) == 0) this.outputText("You tear open your " + this.player.armorName + " and slip a few fingers into your well-used birth canal, giving your opponent a good look at what they're missing.  \"<i>C'mon stud,</i>\" you say, voice dripping with lust and desire, \"<i>Come to mama " + this.player.short + " and fuck my pussy 'til your baby batter just POURS out.  I want your children inside of me, I want your spawn crawling out of this cunt and begging for my milk.  Come on, FUCK ME PREGNANT!</i>\"", false);
                else this.outputText("You wiggle your " + this.hipDescript() + " at your enemy, giving them a long, tantalizing look at the hips that have passed so very many offspring.  \"<i>Oh, like what you see, bad boy?  Well why don't you just come on over and stuff that cock inside me?  Give me your seed, and I'll give you suuuuch beautiful offspring.  Oh?  Does that turn you on?  It does!  Come on, just let loose and fuck me full of your babies!</i>\"", false);
                chance += 2;
                damage += 4;
                if (this.player.inHeat) {
                    chance += 2;
                    damage += 4;
                }
                vagina = true;
                break;
            //15 Nipplecunts
            case 15:
                //Req's tits & Pussy
                if (this.player.biggestTitSize() > 1 && this.player.hasVagina() && this.rand(2) == 0) {
                    this.outputText("Closing your eyes, you lean forward and slip a hand under your " + this.player.armorName + ".  You let out the slightest of gasps as your fingers find your drooling honeypot, warm tips poking, one after another between your engorged lips.  When you withdraw your hand, your fingers have been soaked in the dripping passion of your cunny, translucent beads rolling down to wet your palm.  With your other hand, you pull down the top of your " + this.player.armorName + " and bare your " + this.chestDesc() + " to " + this.monster.a + this.monster.short + ".\n\n", false);
                    this.outputText("Drawing your lust-slick hand to your " + this.nippleDescript(0) + "s, the yielding flesh of your cunt-like nipples parts before the teasing digits.  Using your own girl cum as added lubrication, you pump your fingers in and out of your nipples, moaning as you add progressively more digits until only your thumb remains to stroke the inflamed flesh of your over-stimulated chest.  Your throat releases the faintest squeak of your near-orgasmic delight and you pant, withdrawing your hands and readjusting your armor.\n\n", false);
                    this.outputText("Despite how quiet you were, it's clear that every lewd, desperate noise you made was heard by " + this.monster.a + this.monster.short + ".", false);
                    chance += 2;
                    damage += 4;
                }
                else if (this.player.biggestTitSize() > 1 && this.rand(2) == 0) {
                    this.outputText("You yank off the top of your " + this.player.armorName + ", revealing your " + this.chestDesc() + " and the gaping nipplecunts on each.  With a lusty smirk, you slip a pair of fingers into the nipples of your " + this.chestDesc() + ", pulling the nipplecunt lips wide, revealing the lengthy, tight passage within.  You fingerfuck your nipplecunts, giving your enemy a good show before pulling your armor back on, leaving the tantalizing image of your gaping titpussies to linger in your foe's mind.", false);
                    chance += 1;
                    damage += 2;
                }
                else this.outputText("You remove the front of your " + this.player.armorName + " exposing your " + this.chestDesc() + ".  Using both of your hands, you thrust two fingers into your nipple cunts, milky girl cum soaking your hands and fingers.  \"<i>Wouldn't you like to try out these holes too?</i>\"", false);
                breasts = true;
                break;
            //16 Anal gape
            case 16:
                this.outputText("You quickly strip out of your " + this.player.armorName + " and turn around, giving your " + this.buttDescript() + " a hard slap and showing your enemy the real prize: your " + this.assholeDescript() + ".  With a smirk, you easily plunge your hand inside, burying yourself up to the wrist inside your anus.  You give yourself a quick fisting, watching the enemy over your shoulder while you moan lustily, sure to give them a good show.  You withdraw your hand and give your ass another sexy spank before readying for combat again.", false);
                anus = true;
                ass = true;
                break;
            //17 Bee abdomen tease
            case 17:
                this.outputText("You swing around, shedding the " + this.player.armorName + " around your waist to expose your " + this.buttDescript() + " to " + this.monster.a + this.monster.short + ".  Taking up your oversized bee abdomen in both hands, you heft the thing and wave it about teasingly.  Drops of venom drip to and fro, a few coming dangerously close to " + this.monster.pronoun2 + ".  \"<i>Maybe if you behave well enough, I'll even drop a few eggs into your belly,</i>\" you say softly, dropping the abdomen back to dangle above your butt and redressing.", false);
                ass = true;
                chance += .5;
                damage += .5;
                break;
            //18 DOG TEASE
            case 18:
                this.outputText("You sit down like a dog, your [legs] are spread apart, showing your ", false);
                if (this.player.hasVagina()) this.outputText("parted cunt-lips", false);
                else this.outputText("puckered asshole, hanging, erect maleness,", false);
                this.outputText(" and your hands on the ground in front of you.  You pant heavily with your tongue out and promise, \"<i>I'll be a good little bitch for you</i>.\"", false);
                vagina = true;
                chance += 1;
                damage += 2;
                break;
            //19 MAX FEM TEASE - SYMPHONIE
            case 19:
                this.outputText("You make sure to capture your foe's attention, then slowly and methodically allow your tongue to slide along your lush, full lips.  The glistening moisture that remains on their plump beauty speaks of deep lust and deeper throats.  Batting your long lashes a few times, you pucker them into a playful blown kiss, punctuating the act with a small moan. Your gorgeous feminine features hint at exciting, passionate moments together, able to excite others with just your face alone.", false);
                chance += 2;
                damage += 4;
                break;
            //20 MAX MASC TEASE
            case 20:
                this.outputText("As your foe regards you, you recognize their attention is fixated on your upper body.  Thrusting your strong jaw forward you show off your chiseled chin, handsome features marking you as a flawless specimen.  Rolling your broad shoulders, you nod your head at your enemy.  The strong, commanding presence you give off could melt the heart of an icy nun.  Your perfect masculinity speaks to your confidence, allowing you to excite others with just your face alone.", false);
                chance += 2;
                damage += 4;
                break;
            //21 MAX ADROGYN
            case 21:
                this.outputText("You reach up and run your hands down your delicate, androgynous features.  With the power of a man but the delicacy of a woman, looking into your eyes invites an air of enticing mystery.  You blow a brief kiss to your enemy while at the same time radiating a sexually exciting confidence.  No one could identify your gender by looking at your features, and the burning curiosity they encourage could excite others with just your face alone.", false);
                damage -= 3;
                break;
            //22 SPOIDAH SILK
            case 22:
                this.outputText("Reaching back, you milk some wet silk from your spider-y abdomen and present it to " + this.monster.a + this.monster.short + ", molding the sticky substance as " + this.monster.pronoun1 + " looks on curiously.  Within moments, you hold up a silken heart scuplture, and with a wink, you toss it at " + this.monster.pronoun2 + ". It sticks to " + this.monster.pronoun3 + " body, the sensation causing " + this.monster.pronoun2 + " to hastily slap the heart off.  " + this.monster.mf("He", "She") + " returns " + this.monster.pronoun3 + " gaze to you to find you turned around, " + this.buttDescript() + " bared and abdomen bouncing lazily.  \"<i>I wonder what would happen if I webbed up your hole after I dropped some eggs inside?</i>\" you hiss mischievously.  " + this.monster.mf("He", "She") + " gulps.", false);
                ass = true;
                break;
            //23 RUT TEASE
            case 23:
                if (this.player.horseCocks() > 0 && this.player.longestHorseCockLength() >= 12) {
                    this.outputText("You whip out your massive horsecock, and are immediately surrounded by a massive, heady musk.  Your enemy swoons, nearly falling to her knees under your oderous assault.  Grinning, you grab her shoulders and force her to her knees.  Before she can defend herself, you slam your horsecock onto her head, running it up and down on her face, her nose acting like a sexy bump in an onahole.  You fuck her face -- literally -- for a moment before throwing her back and sheathing your cock.", false);
                }
                else {
                    this.outputText("Panting with your unstoppable lust for the delicious, impregnable cunt before you, you yank off your " + this.player.armorName + " with strength born of your inhuman rut, and quickly wave your fully erect cock at your enemy.  She flashes with lust, quickly feeling the heady effect of your man-musk.  You rush up, taking advantage of her aroused state and grab her shoulders.  ", false);
                    this.outputText("Before she can react, you push her down until she's level with your cock, and start to spin it in a circle, slapping her right in the face with your musky man-meat.  Her eyes swim, trying to follow your meatspin as you swat her in the face with your cock!  Satisfied, you release her and prepare to fight!", false);
                }
                penis = true;
                break;
            //24 STAFF POLEDANCE
            case 24:
                this.outputText("You run your tongue across your lips as you plant your staff into the ground.  Before your enemy can react, you spin onto the long, wooden shaft, using it like an impromptu pole.  You lean back against the planted staff, giving your enemy a good look at your body.  You stretch backwards like a cat, nearly touching your fingertips to the ground beneath you, now holding onto the staff with only one leg.  You pull yourself upright and give your " + this.buttDescript() + " a little slap and your " + this.chestDesc() + " a wiggle before pulling open your " + this.player.armorName + " and sliding the pole between your tits.  You drop down to a low crouch, only just covering your genitals with your hand as you shake your " + this.buttDescript() + " playfully.  You give the enemy a little smirk as you slip your " + this.player.armorName + " back on and pick up your staff.", false);
                ass = true;
                breasts = true;
                break;
            //TALL WOMAN TEASE
            case 25:
                this.outputText("You move close to your enemy, handily stepping over " + this.monster.pronoun3 + " defensive strike before leaning right down in " + this.monster.pronoun3 + " face, giving " + this.monster.pronoun2 + " a good long view at your cleavage.  \"<i>Hey, there, little " + this.monster.mf("guy", "girl") + ",</i>\" you smile.  Before " + this.monster.pronoun1 + " can react, you grab " + this.monster.pronoun2 + " and smoosh " + this.monster.pronoun3 + " face into your " + this.player.allChestDesc() + ", nearly choking " + this.monster.pronoun2 + " in the canyon of your cleavage.  " + this.monster.mf("He", "She") + " struggles for a moment.  You give " + this.monster.pronoun2 + " a little kiss on the head and step back, ready for combat.", false);
                breasts = true;
                chance += 2;
                damage += 4;
                break;
            //Magic Tease
            case 26:
                this.outputText("Seeing a lull in the battle, you plant your " + this.player.weaponName + " on the ground and let your magic flow through you.  You summon a trickle of magic into a thick, slowly growing black ball of lust.  You wave the ball in front of you, making a little dance and striptease out of the affair as you slowly saturate the area with latent sexual magics.", false);
                chance++;
                damage += 2;
                break;
            //Feeder
            case 27:
                this.outputText("You present your swollen breasts full of milk to " + this.monster.a + this.monster.short + " and say \"<i>Wouldn't you just love to lie back in my arms and enjoy what I have to offer you?</i>\"", false);
                breasts = true;
                chance++;
                damage++;
                break;
            //28 FEMALE TEACHER COSTUME TEASE
            case 28:
                this.outputText("You turn to the side and give " + this.monster.a + this.monster.short + " a full view of your body.  You ask them if they're in need of a private lesson in lovemaking after class.", false);
                ass = true;
                break;
            //29 Male Teacher Outfit Tease
            case 29:
                this.outputText("You play with the strings on your outfit a bit and ask " + this.monster.a + this.monster.short + " just how much do they want to see their teacher pull them off?", false);
                chance++;
                damage += 3;
                break;
            //30 Naga Fetish Clothes
            case 30:
                this.outputText("You sway your body back and forth, and do an erotic dance for " + this.monster.a + this.monster.short + ".", false);
                chance += 2;
                damage += 4;
                break;
            //31 Centaur harness clothes
            case 31:
                this.outputText("You rear back, and declare that, \"<i>This horse is ready to ride, all night long!</i>\"", false);
                chance += 2;
                damage += 4;
                break;
            //32 Genderless servant clothes
            case 32:
                this.outputText("You turn your back to your foe, and flip up your butt flap for a moment.   Your " + this.buttDescript() + " really is all you have to offer downstairs.", false);
                ass = true;
                chance++;
                damage += 2;
                break;
            //33 Crotch Revealing Clothes (herm only?)
            case 33:
                this.outputText("You do a series of poses to accentuate what you've got on display with your crotch revealing clothes, while asking if your " + this.player.mf("master", "mistress") + " is looking to sample what is on display.", false);
                chance += 2;
                damage += 4;
                break;
            //34 Maid Costume (female only)
            case 34:
                this.outputText("You give a rather explicit curtsey towards " + this.monster.a + this.monster.short + " and ask them if your " + this.player.mf("master", "mistress") + " is interested in other services today.", false);
                chance++;
                damage += 2;
                breasts = true;
                break;
            //35 Servant Boy Clothes (male only)
            case 35:
                this.outputText("You brush aside your crotch flap for a moment, then ask " + this.monster.a + this.monster.short + " if, " + this.player.mf("Master", "Mistress") + " would like you to use your " + this.player.multiCockDescriptLight() + " on them?", false);
                penis = true;
                chance++;
                damage += 2;
                break;
            //36 Bondage Patient Clothes (done):
            case 36:
                this.outputText("You pull back one of the straps on your bondage cloths and let it snap back.  \"<i>I need some medical care, feeling up for it?</i>\" you tease.", false);
                damage += 2;
                chance++;
                break;
            default:
                this.outputText("You shimmy and shake sensually. (An error occurred.)", false);
                break;
            case 37:
                this.outputText("You purse your lips coyly, narrowing your eyes mischievously and beckoning to " + this.monster.a + this.monster.short + " with a burning come-hither glare.  Sauntering forward, you pop your hip to the side and strike a coquettish pose, running " + ((this.player.tailVenom > 1) ? "one of your tails" : "your tail") + " up and down " + this.monster.pronoun3 + " body sensually.");
                chance += 6;
                damage += 3;
                break;
            case 38:
                this.outputText("You wet your lips, narrowing your eyes into a smoldering, hungry gaze.  Licking the tip of your index finger, you trail it slowly and sensually down the front of your " + this.player.armorName + ", following the line of your " + this.chestDesc() + " teasingly.  You hook your thumbs into your top and shimmy it downward at an agonizingly slow pace.  The very instant that your [nipples] pop free, your tail crosses in front, obscuring " + this.monster.a + this.monster.short + "'s view.");
                breasts = true;
                chance++;
                damage++;
                break;
            case 39:
                this.outputText("Leaning forward, you bow down low, raising a hand up to your lips and blowing " + this.monster.a + this.monster.short + " a kiss.  You stand straight, wiggling your " + this.hipDescript() + " back and forth seductively while trailing your fingers down your front slowly, pouting demurely.  The tip of ");
                if (this.player.tailVenom == 1) this.outputText("your");
                else this.outputText("a");
                this.outputText(" bushy tail curls up around your " + this.player.leg() + ", uncoiling with a whipping motion that makes an audible crack in the air.");
                ass = true;
                chance++;
                damage += 1;
                break;
            case 40:
                this.outputText("Turning around, you stare demurely over your shoulder at " + this.monster.a + this.monster.short + ", batting your eyelashes amorously.");
                if (this.player.tailVenom == 1) this.outputText("  Your tail twists and whips about, sliding around your " + this.hipDescript() + " in a slow arc and framing your rear nicely as you slowly lift your " + this.player.armorName + ".");
                else this.outputText("  Your tails fan out, twisting and whipping sensually, sliding up and down your " + this.player.legs() + " and framing your rear nicely as you slowly lift your " + this.player.armorName + ".");
                this.outputText("  As your [butt] comes into view, you brush your tail" + ((this.player.tailVenom > 1) ? "s" : "") + " across it, partially obscuring the view in a tantalizingly teasing display.");
                ass = true;
                anus = true;
                chance++;
                damage += 2;
                break;
            case 41:
                this.outputText("Smirking coyly, you sway from side to side, running your tongue along your upper teeth seductively.  You hook your thumbs into your " + this.player.armorName + " and pull them away to partially reveal ");
                if (this.player.cockTotal() > 0) this.outputText(this.player.sMultiCockDesc());
                if (this.player.gender == 3) this.outputText(" and ");
                if (this.player.gender >= 2) this.outputText("your " + this.vaginaDescript(0));
                this.outputText(".  Your bushy tail" + ((this.player.tailVenom > 1) ? "s" : "") + " cross" + ((this.player.tailVenom > 1) ? "" : "es") + " in front, wrapping around your genitals and obscuring the view teasingly.");
                vagina = true;
                penis = true;
                damage += 2;
                chance++;
                break;
            case 42:
                //Tease #1:
                if (this.rand(2) == 0) {
                    this.outputText("You lift your skirt and flash your king-sized stallionhood, already unsheathing itself and drooling pre, at your opponent.  \"<i>Come on, then; I got plenty of girlcock for you if that's what you want!</i>\" you cry.");
                    penis = true;
                    damage += 3;
                    chance--;
                }
                //Tease #2:
                else {
                    this.outputText("You turn partially around and then bend over, swaying your tail from side to side in your most flirtatious manner and wiggling your hips seductively, your skirt fluttering with the motions.  \"<i>Come on then, what are you waiting for?  This is a fine piece of ass here,</i>\" you grin, spanking yourself with an audible slap.");
                    ass = true;
                    chance += 2;
                    damage += 3;
                }
                break;
            case 43:
                var cows: number = this.rand(7);
                if (cows == 0) {
                    this.outputText("You tuck your hands under your chin and use your arms to squeeze your massive, heavy breasts together.  Milk squirts from your erect nipples, filling the air with a rich, sweet scent.");
                    breasts = true;
                    chance += 2;
                    damage++;
                }
                else if (cows == 1) {
                    this.outputText("Moaning, you bend forward, your full breasts nearly touching the ground as you sway your [hips] from side to side.  Looking up from under heavily-lidded eyes, you part your lips and lick them, letting out a low, lustful \"<i>Mooooo...</i>\"");
                    breasts = true;
                    chance += 2;
                    damage += 2;
                }
                else if (cows == 2) {
                    this.outputText("You tuck a finger to your lips, blinking innocently, then flick your tail, wafting the scent of your ");
                    if (this.player.wetness() >= 3) this.outputText("dripping ");
                    this.outputText("sex through the air.");
                    vagina = true;
                    chance++;
                    damage++;
                }
                else if (cows == 3) {
                    this.outputText("You heft your breasts, fingers splayed across your [nipples] as you SQUEEZE.  Milk runs in rivulets over your hands and down the massive curves of your breasts, soaking your front with sweet, sticky milk.");
                    breasts = true;
                    chance += 3;
                    damage++;
                }
                else if (cows == 4) {
                    this.outputText("You lift a massive breast to your mouth, suckling loudly at yourself, finally letting go of your nipple with a POP and a loud, satisfied gasp, milk running down your chin.");
                    breasts = true;
                    chance++;
                    damage += 3;
                }
                else if (cows == 5) {
                    this.outputText("You crouch low, letting your breasts dangle in front of you.  Each hand caresses one in turn as you slowly milk yourself onto your thighs, splashing white, creamy milk over your hips and sex.");
                    vagina = true;
                    breasts = true;
                    chance++;
                }
                else {
                    this.outputText("You lift a breast to your mouth, taking a deep draught of your own milk, then tilt your head back.  With a low moan, you let it run down your front, winding a path between your breasts until it drips sweetly from your crotch.");
                    vagina = true;
                    breasts = true;
                    damage += 2;
                }
                if (this.monster.short.indexOf("minotaur") != -1) {
                    damage += 6;
                    chance += 3;
                }
                break;
            //lusty maiden's armor teases
            case 44:
                var maiden: number = this.rand(5);
                damage += 5;
                chance += 3;
                if (maiden == 0) {
                    this.outputText("Confidently sauntering forward, you thrust your chest out with your back arched in order to enhance your [chest].  You slowly begin to shake your torso back and forth, slapping your chain-clad breasts against each other again and again.  One of your hands finds its way to one of the pillowy expanses and grabs hold, fingers sinking into the soft tit through the fine, mail covering.  You stop your shaking to trace a finger down through the exposed center of your cleavage, asking, \"<i>Don't you just want to snuggle inside?</i>\"");
                    breasts = true;
                }
                else if (maiden == 1) {
                    this.outputText("You skip up to " + this.monster.a + this.monster.short + " and spin around to rub your barely-covered butt up against " + this.monster.pronoun2 + ".  Before " + this.monster.pronoun1 + " can react, you're slowly bouncing your [butt] up and down against " + this.monster.pronoun3 + " groin.  When " + this.monster.pronoun1 + " reaches down, you grab " + this.monster.pronoun3 + " hand and press it up, under your skirt, right against the steamy seal on your sex.  The simmering heat of your overwhelming lust burns hot enough for " + this.monster.pronoun2 + " to feel even through the contoured leather, and you let " + this.monster.pronoun2 + " trace the inside of your [leg] for a moment before moving away, laughing playfully.");
                    ass = true;
                    vagina = true;
                }
                else if (maiden == 2) {
                    this.outputText("You flip up the barely-modest chain you call a skirt and expose your g-string to " + this.monster.a + this.monster.short + ".  Slowly swaying your [hips], you press a finger down on the creased crotch plate and exaggerate a lascivious moan into a throaty purr of enticing, sexual bliss.  Your eyes meet " + this.monster.pronoun3 + ", and you throatily whisper, \"<i>");
                    if (this.player.hasVirginVagina()) this.outputText("Think you can handle a virgin's infinite lust?");
                    else this.outputText("Think you have what it takes to satisfy this perfect pussy?");
                    this.outputText("</i>\"");
                    vagina = true;
                    damage += 3;
                }
                else if (maiden == 3) {
                    this.outputText("You seductively wiggle your way up to " + this.monster.a + this.monster.short + ", and before " + this.monster.pronoun1 + " can react to your salacious advance, you snap a [leg] up in what would be a vicious kick, if you weren't simply raising it to rest your [foot] on " + this.monster.pronoun3 + " shoulder.  With your thighs so perfectly spready, your skirt is lifted, and " + this.monster.a + this.monster.short + " is given a perfect view of your thong-enhanced cameltoe and the moisture that beads at the edges of your not-so-modest covering.");
                    vagina = true;
                }
                else {
                    this.outputText("Bending over, you lift your [butt] high in the air.  Most of your barely-covered tush is exposed, but the hem of your chainmail skirt still protects some of your anal modesty.  That doesn't last long.  You start shaking your [butt] up, down, back, and forth to an unheard rhythm, flipping the pointless covering out of the way so that " + this.monster.a + this.monster.short + " can gaze upon your curvy behind in it all its splendid detail.  A part of you hopes that " + this.monster.pronoun1 + " takes in the intricate filigree on the back of your thong, though to " + this.monster.pronoun2 + " it looks like a bunch of glittering arrows on an alabaster background, all pointing squarely at your [asshole].");
                    ass = true;
                    chance += 2;
                }
                break;
        }
        //===========================
        //BUILD BONUSES IF APPLICABLE
        //===========================	
        var bonusChance: number = 0;
        var bonusDamage: number = 0;
        if (auto) {
            //TIT BONUSES
            if (breasts) {
                if (this.player.bRows() > 1) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.bRows() > 2) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.bRows() > 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.biggestLactation() >= 2) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (this.player.biggestLactation() >= 3) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (this.player.biggestTitSize() >= 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.biggestTitSize() >= 7) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.biggestTitSize() >= 12) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.biggestTitSize() >= 25) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.biggestTitSize() >= 50) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.hasFuckableNipples()) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (this.player.averageNipplesPerBreast() > 1) {
                    bonusChance++;
                    bonusDamage += 2;
                }
            }
            //PUSSY BONUSES
            if (vagina) {
                if (this.player.hasVagina() && this.player.wetness() >= 2) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.hasVagina() && this.player.wetness() >= 3) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.hasVagina() && this.player.wetness() >= 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.hasVagina() && this.player.wetness() >= 5) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.clitLength > 1.5) {
                    bonusChance += .5;
                    bonusDamage++;
                }
                if (this.player.clitLength > 3.5) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.clitLength > 7) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.clitLength > 12) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.vaginalCapacity() >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.vaginalCapacity() >= 70) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.vaginalCapacity() >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.vaginalCapacity() >= 200) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
            }
            //Penis bonuses!
            if (penis) {
                if (this.player.cockTotal() > 1) {
                    bonusChance += 1;
                    bonusDamage += 2;
                }
                if (this.player.biggestCockArea() >= 15) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.biggestCockArea() >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.biggestCockArea() >= 60) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.biggestCockArea() >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.cumQ() >= 50) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.cumQ() >= 150) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.cumQ() >= 300) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.cumQ() >= 1000) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (balls > 0) {
                    if (this.player.balls > 2) {
                        bonusChance += 1;
                        bonusDamage += 2;
                    }
                    if (this.player.ballSize > 3) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                    if (this.player.ballSize > 7) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                    if (this.player.ballSize > 12) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                }
                if (this.player.biggestCockArea() < 8) {
                    bonusChance--;
                    bonusDamage -= 2;
                    if (this.player.biggestCockArea() < 5) {
                        bonusChance--;
                        bonusDamage -= 2;
                    }
                }
            }
            if (ass) {
                if (this.player.buttRating >= 6) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.buttRating >= 10) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.buttRating >= 13) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.buttRating >= 16) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.buttRating >= 20) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.hipRating >= 6) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.hipRating >= 10) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.hipRating >= 13) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.hipRating >= 16) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.hipRating >= 20) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
            }
            if (anus) {
                if (this.player.ass.analLooseness == 0) {
                    bonusChance += 1.5;
                    bonusDamage += 3;
                }
                if (this.player.ass.analWetness > 0) {
                    bonusChance += 1;
                    bonusDamage += 2;
                }
                if (this.player.analCapacity() >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.analCapacity() >= 70) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.analCapacity() >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.analCapacity() >= 200) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.ass.analLooseness == 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (this.player.ass.analLooseness == 5) {
                    bonusChance += 1.5;
                    bonusDamage += 3;
                }
            }
            //Trim it down!
            if (bonusChance > 5) bonusChance = 5;
            if (bonusDamage > 10) bonusDamage = 10;
        }
        //Land the hit!
        if (this.rand(100) <= chance + this.rand(bonusChance)) {
            //NERF TEASE DAMAGE
            damage *= .7;
            bonusDamage *= .7;
            if (this.player.findPerk(PerkLib.HistoryWhore) >= 0) {
                damage *= 1.15;
                bonusDamage *= 1.15;
            }
            if (this.player.findPerk(PerkLib.ChiReflowLust) >= 0) damage *= UmasShop.NEEDLEWORK_LUST_TEASE_DAMAGE_MULTI;
            if (this.monster.plural) damage *= 1.3;
            damage = (damage + this.rand(bonusDamage)) * this.monster.lustVuln;

            if (this.monster instanceof JeanClaude) (this.monster as JeanClaude).handleTease(damage, true);
            else if (this.monster instanceof Doppleganger && this.monster.findStatusAffect(StatusAffects.Stunned) < 0) (this.monster as Doppleganger).mirrorTease(damage, true);
            else if (!justText) this.monster.teased(damage);

            if (this.flags[kFLAGS.PC_FETISH] >= 1 && !this.urtaQuest.isUrta()) {
                if (this.player.lust < 75) this.outputText("\nFlaunting your body in such a way gets you a little hot and bothered.", false);
                else this.outputText("\nIf you keep exposing yourself you're going to get too horny to fight back.  This exhibitionism fetish makes it hard to resist just stripping naked and giving up.", false);
                if (!justText) this.dynStats("lus", 2 + this.rand(3));
            }

            // Similar to fetish check, only add XP if the player IS the player...
            if (!justText && !this.urtaQuest.isUrta()) this.teaseXP(1);
        }
        //Nuttin honey
        else {
            if (!justText && !this.urtaQuest.isUrta()) this.teaseXP(5);

            if (this.monster instanceof JeanClaude) (this.monster as JeanClaude).handleTease(0, false);
            else if (this.monster instanceof Doppleganger) (this.monster as Doppleganger).mirrorTease(0, false);
            else if (!justText) this.outputText("\n" + this.monster.capitalA + this.monster.short + " seems unimpressed.", false);
        }
        this.outputText("\n\n", false);
    }

    public teaseXP(XP: number = 0): void {
        while (XP > 0) {
            XP--;
            this.player.teaseXP++;
            //Level dat shit up!
            if (this.player.teaseLevel < 5 && this.player.teaseXP >= 10 + (this.player.teaseLevel + 1) * 5 * (this.player.teaseLevel + 1)) {
                this.outputText("\n<b>Tease skill leveled up to " + (this.player.teaseLevel + 1) + "!</b>", false);
                this.player.teaseLevel++;
                this.player.teaseXP = 0;
            }
        }
    }

    //VICTORY OR DEATH?
    public combatRoundOver(): boolean { //Called after the monster's action
        this.statScreenRefresh();
        if (!this.inCombat) return false;
        if (this.monster.HP < 1) {
            this.doNext(this.endHpVictory);
            return true;
        }
        if (this.monster.lust > 99) {
            this.doNext(this.endLustVictory);
            return true;
        }
        if (this.monster.findStatusAffect(StatusAffects.Level) >= 0) {
            if ((this.monster as SandTrap).trapLevel() <= 1) {
                this.desert.sandTrapScene.sandtrapmentLoss();
                return true;
            }
        }
        if (this.monster.short == "basilisk" && this.player.spe <= 1) {
            this.doNext(this.endHpLoss);
            return true;
        }
        if (this.player.HP < 1) {
            this.doNext(this.endHpLoss);
            return true;
        }
        if (this.player.lust > 99) {
            this.doNext(this.endLustLoss);
            return true;
        }
        this.doNext(this.playerMenu); //This takes us back to the combatMenu and a new combat round
        return false;
    }

    public hasSpells(): boolean {
        return this.player.hasSpells();
    }
    public spellCount(): number {
        return this.player.spellCount();
    }

    public magicMenu(): void {
        //Pass false to combatMenu instead:	menuLoc = 3;
        if (this.inCombat && this.player.findStatusAffect(StatusAffects.Sealed) >= 0 && this.player.statusAffectv2(StatusAffects.Sealed) == 2) {
            this.clearOutput();
            this.outputText("You reach for your magic, but you just can't manage the focus necessary.  <b>Your ability to use magic was sealed, and now you've wasted a chance to attack!</b>\n\n");
            this.enemyAI();
            return;
        }
        this.menu();
        this.clearOutput();
        this.outputText("What spell will you use?\n\n");
        //WHITE SHITZ
        var whiteLustCap: number = 75;
        if (this.player.findPerk(PerkLib.Enlightened) >= 0 && this.player.cor < 10) whiteLustCap += 10;

        if (this.player.lust >= whiteLustCap)
            this.outputText("You are far too aroused to focus on white magic.\n\n");
        else {
            if (this.player.findStatusAffect(StatusAffects.KnowsCharge) >= 0) {
                if (this.player.findStatusAffect(StatusAffects.ChargeWeapon) < 0)
                    this.addButton(0, "Charge W.", this.spellChargeWeapon);
                else this.outputText("<b>Charge weapon is already active and cannot be cast again.</b>\n\n");
            }
            if (this.player.findStatusAffect(StatusAffects.KnowsBlind) >= 0) {
                if (this.monster.findStatusAffect(StatusAffects.Blind) < 0)
                    this.addButton(1, "Blind", this.spellBlind);
                else this.outputText("<b>" + this.monster.capitalA + this.monster.short + " is already affected by blind.</b>\n\n");
            }
            if (this.player.findStatusAffect(StatusAffects.KnowsWhitefire) >= 0) this.addButton(2, "Whitefire", this.spellWhitefire);
        }
        //BLACK MAGICSKS
        if (this.player.lust < 50)
            this.outputText("You aren't turned on enough to use any black magics.\n\n");
        else {
            if (this.player.findStatusAffect(StatusAffects.KnowsArouse) >= 0) this.addButton(5, "Arouse", this.spellArouse);
            if (this.player.findStatusAffect(StatusAffects.KnowsHeal) >= 0) this.addButton(6, "Heal", this.spellHeal);
            if (this.player.findStatusAffect(StatusAffects.KnowsMight) >= 0) {
                if (this.player.findStatusAffect(StatusAffects.Might) < 0)
                    this.addButton(7, "Might", this.spellMight);
                else this.outputText("<b>You are already under the effects of Might and cannot cast it again.</b>\n\n");
            }
        }
        // JOJO ABILITIES -- kind makes sense to stuff it in here along side the white magic shit (also because it can't fit into M. Specials :|
        if (this.player.findPerk(PerkLib.CleansingPalm) >= 0 && this.player.cor < 10) {
            this.addButton(3, "C.Palm", this.spellCleansingPalm);
        }
        this.addButton(9, "Back", this.combatMenu, false);
    }

    public spellMod(): number {
        var mod: number = 1;
        if (this.player.findPerk(PerkLib.Archmage) >= 0 && this.player.inte >= 75) mod += .5;
        if (this.player.findPerk(PerkLib.Channeling) >= 0 && this.player.inte >= 60) mod += .5;
        if (this.player.findPerk(PerkLib.Mage) >= 0 && this.player.inte >= 50) mod += .5;
        if (this.player.findPerk(PerkLib.Spellpower) >= 0 && this.player.inte >= 50) mod += .5;
        if (this.player.findPerk(PerkLib.WizardsFocus) >= 0) {
            mod += this.player.perkv1(PerkLib.WizardsFocus);
        }
        if (this.player.findPerk(PerkLib.ChiReflowMagic) >= 0) mod += UmasShop.NEEDLEWORK_MAGIC_SPELL_MULTI;
        return mod;
    }
    public spellArouse(): void {
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(15) > 100) {
            this.outputText("You are too tired to cast this spell.", true);
            this.doNext(this.magicMenu);
            return;
        }
        this.doNext(this.combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(15, 1);
        this.statScreenRefresh();
        if (this.monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            this.outputText("As soon as your magic touches the multicolored shell around " + this.monster.a + this.monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            this.flags[kFLAGS.SPELLS_CAST]++;
            this.spellPerkUnlock();
            this.enemyAI();
            return;
        }
        this.outputText("You make a series of arcane gestures, drawing on your own lust to inflict it upon your foe!\n", true);
        //Worms be immune
        if (this.monster.short == "worms") {
            this.outputText("The worms appear to be unaffected by your magic!", false);
            this.outputText("\n\n", false);
            this.flags[kFLAGS.SPELLS_CAST]++;
            this.spellPerkUnlock();
            this.doNext(this.playerMenu);
            if (this.monster.lust >= 100) this.doNext(this.endLustVictory);
            else this.enemyAI();
            return;
        }
        if (this.monster.lustVuln == 0) {
            this.outputText("It has no effect!  Your foe clearly does not experience lust in the same way as you.\n\n", false);
            this.flags[kFLAGS.SPELLS_CAST]++;
            this.spellPerkUnlock();
            this.enemyAI();
            return;
        }
        this.monster.lust += this.monster.lustVuln * (this.player.inte / 5 * this.spellMod() + this.rand(this.monster.lib - this.monster.inte * 2 + this.monster.cor) / 5);
        if (this.monster.lust < 30) this.outputText(this.monster.capitalA + this.monster.short + " squirms as the magic affects " + this.monster.pronoun2 + ".  ", false);
        if (this.monster.lust >= 30 && this.monster.lust < 60) {
            if (this.monster.plural) this.outputText(this.monster.capitalA + this.monster.short + " stagger, suddenly weak and having trouble focusing on staying upright.  ", false);
            else this.outputText(this.monster.capitalA + this.monster.short + " staggers, suddenly weak and having trouble focusing on staying upright.  ", false);
        }
        if (this.monster.lust >= 60) {
            this.outputText(this.monster.capitalA + this.monster.short + "'");
            if (!this.monster.plural) this.outputText("s");
            this.outputText(" eyes glaze over with desire for a moment.  ", false);
        }
        if (this.monster.cocks.length > 0) {
            if (this.monster.lust >= 60 && this.monster.cocks.length > 0) this.outputText("You see " + this.monster.pronoun3 + " " + this.monster.multiCockDescriptLight() + " dribble pre-cum.  ", false);
            if (this.monster.lust >= 30 && this.monster.lust < 60 && this.monster.cocks.length == 1) this.outputText(this.monster.capitalA + this.monster.short + "'s " + this.monster.cockDescriptShort(0) + " hardens, distracting " + this.monster.pronoun2 + " further.  ", false);
            if (this.monster.lust >= 30 && this.monster.lust < 60 && this.monster.cocks.length > 1) this.outputText("You see " + this.monster.pronoun3 + " " + this.monster.multiCockDescriptLight() + " harden uncomfortably.  ", false);
        }
        if (this.monster.vaginas.length > 0) {
            if (this.monster.plural) {
                if (this.monster.lust >= 60 && this.monster.vaginas[0].vaginalWetness == CoC.VAGINA_WETNESS_NORMAL) this.outputText(this.monster.capitalA + this.monster.short + "'s " + this.monster.vaginaDescript() + "s dampen perceptibly.  ", false);
                if (this.monster.lust >= 60 && this.monster.vaginas[0].vaginalWetness == CoC.VAGINA_WETNESS_WET) this.outputText(this.monster.capitalA + this.monster.short + "'s crotches become sticky with girl-lust.  ", false);
                if (this.monster.lust >= 60 && this.monster.vaginas[0].vaginalWetness == CoC.VAGINA_WETNESS_SLICK) this.outputText(this.monster.capitalA + this.monster.short + "'s " + this.monster.vaginaDescript() + "s become sloppy and wet.  ", false);
                if (this.monster.lust >= 60 && this.monster.vaginas[0].vaginalWetness == CoC.VAGINA_WETNESS_DROOLING) this.outputText("Thick runners of girl-lube stream down the insides of " + this.monster.a + this.monster.short + "'s thighs.  ", false);
                if (this.monster.lust >= 60 && this.monster.vaginas[0].vaginalWetness == CoC.VAGINA_WETNESS_SLAVERING) this.outputText(this.monster.capitalA + this.monster.short + "'s " + this.monster.vaginaDescript() + "s instantly soak " + this.monster.pronoun2 + " groin.  ", false);
            }
            else {
                if (this.monster.lust >= 60 && this.monster.vaginas[0].vaginalWetness == CoC.VAGINA_WETNESS_NORMAL) this.outputText(this.monster.capitalA + this.monster.short + "'s " + this.monster.vaginaDescript() + " dampens perceptibly.  ", false);
                if (this.monster.lust >= 60 && this.monster.vaginas[0].vaginalWetness == CoC.VAGINA_WETNESS_WET) this.outputText(this.monster.capitalA + this.monster.short + "'s crotch becomes sticky with girl-lust.  ", false);
                if (this.monster.lust >= 60 && this.monster.vaginas[0].vaginalWetness == CoC.VAGINA_WETNESS_SLICK) this.outputText(this.monster.capitalA + this.monster.short + "'s " + this.monster.vaginaDescript() + " becomes sloppy and wet.  ", false);
                if (this.monster.lust >= 60 && this.monster.vaginas[0].vaginalWetness == CoC.VAGINA_WETNESS_DROOLING) this.outputText("Thick runners of girl-lube stream down the insides of " + this.monster.a + this.monster.short + "'s thighs.  ", false);
                if (this.monster.lust >= 60 && this.monster.vaginas[0].vaginalWetness == CoC.VAGINA_WETNESS_SLAVERING) this.outputText(this.monster.capitalA + this.monster.short + "'s " + this.monster.vaginaDescript() + " instantly soaks her groin.  ", false);
            }
        }
        this.outputText("\n\n", false);
        this.doNext(this.playerMenu);
        this.flags[kFLAGS.SPELLS_CAST]++;
        this.spellPerkUnlock();
        if (this.monster.lust >= 100) this.doNext(this.endLustVictory);
        else this.enemyAI();
        return;
    }
    public spellHeal(): void {
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(20) > 100) {
            this.outputText("You are too tired to cast this spell.", true);
            this.doNext(this.magicMenu);
            return;
        }
        this.doNext(this.combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(20, 1);
        this.outputText("You focus on your body and its desire to end pain, trying to draw on your arousal without enhancing it.\n", true);
        //25% backfire!
        if (this.rand(4) == 0) {
            this.outputText("An errant sexual thought crosses your mind, and you lose control of the spell!  Your ", false);
            if (this.player.gender == 0) this.outputText(this.assholeDescript() + " tingles with a desire to be filled as your libido spins out of control.", false);
            if (this.player.gender == 1) {
                if (this.player.cockTotal() == 1) this.outputText(this.player.cockDescript(0) + " twitches obscenely and drips with pre-cum as your libido spins out of control.", false);
                else this.outputText(this.player.multiCockDescriptLight() + " twitch obscenely and drip with pre-cum as your libido spins out of control.", false);
            }
            if (this.player.gender == 2) this.outputText(this.vaginaDescript(0) + " becomes puffy, hot, and ready to be touched as the magic diverts into it.", false);
            if (this.player.gender == 3) this.outputText(this.vaginaDescript(0) + " and " + this.player.multiCockDescriptLight() + " overfill with blood, becoming puffy and incredibly sensitive as the magic focuses on them.", false);
            this.dynStats("lib", .25, "lus", 15);
        }
        else {
            temp = Math.floor((this.player.inte / (2 + this.rand(3)) * this.spellMod()) * (this.maxHP() / 150));
            if (this.player.armorName == "skimpy nurse's outfit") temp *= 1.2;
            this.outputText("You flush with success as your wounds begin to knit (+" + temp + ").", false);
            this.HPChange(temp, false);
        }
        this.outputText("\n\n", false);
        this.statScreenRefresh();
        this.flags[kFLAGS.SPELLS_CAST]++;
        this.spellPerkUnlock();
        if (this.player.lust >= 100) this.doNext(this.endLustLoss);
        else this.enemyAI();
        return;
    }

    //(25) Might – increases strength/toughness by 5 * spellMod, up to a 
    //maximum of 15, allows it to exceed the maximum.  Chance of backfiring 
    //and increasing lust by 15.
    public spellMight(): void {
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(25) > 100) {
            this.outputText("You are too tired to cast this spell.", true);
            this.doNext(this.magicMenu);
            return;
        }
        this.doNext(this.combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(25, 1);
        var tempStr: number = 0;
        var tempTou: number = 0;
        this.outputText("You flush, drawing on your body's desires to empower your muscles and toughen you up.\n\n", true);
        //25% backfire!
        if (this.rand(4) == 0) {
            this.outputText("An errant sexual thought crosses your mind, and you lose control of the spell!  Your ", false);
            if (this.player.gender == 0) this.outputText(this.assholeDescript() + " tingles with a desire to be filled as your libido spins out of control.", false);
            if (this.player.gender == 1) {
                if (this.player.cockTotal() == 1) this.outputText(this.player.cockDescript(0) + " twitches obscenely and drips with pre-cum as your libido spins out of control.", false);
                else this.outputText(this.player.multiCockDescriptLight() + " twitch obscenely and drip with pre-cum as your libido spins out of control.", false);
            }
            if (this.player.gender == 2) this.outputText(this.vaginaDescript(0) + " becomes puffy, hot, and ready to be touched as the magic diverts into it.", false);
            if (this.player.gender == 3) this.outputText(this.vaginaDescript(0) + " and " + this.player.multiCockDescriptLight() + " overfill with blood, becoming puffy and incredibly sensitive as the magic focuses on them.", false);
            this.dynStats("lib", .25, "lus", 15);
        }
        else {
            this.outputText("The rush of success and power flows through your body.  You feel like you can do anything!", false);
            this.player.createStatusAffect(StatusAffects.Might, 0, 0, 0, 0);
            temp = 5 * this.spellMod();
            tempStr = temp;
            tempTou = temp;
            if (this.player.str + temp > 100) tempStr = 100 - this.player.str;
            if (this.player.tou + temp > 100) tempTou = 100 - this.player.tou;
            this.player.changeStatusValue(StatusAffects.Might, 1, tempStr);
            this.player.changeStatusValue(StatusAffects.Might, 2, tempTou);
            if (this.player.str < 100) {
                this.mainView.statsView.showStatUp('str');
                // strUp.visible = true;
                // strDown.visible = false;
                this.mainView.statsView.showStatUp('tou');
                // touUp.visible = true;
                // touDown.visible = false;
            }
            this.player.str += this.player.statusAffectv1(StatusAffects.Might);
            this.player.tou += this.player.statusAffectv2(StatusAffects.Might);
        }
        this.outputText("\n\n", false);
        this.statScreenRefresh();
        this.flags[kFLAGS.SPELLS_CAST]++;
        this.spellPerkUnlock();
        if (this.player.lust >= 100) this.doNext(this.endLustLoss);
        else this.enemyAI();
        return;
    }

    //(15) Charge Weapon – boosts your weapon attack value by 10 * SpellMod till the end of combat.
    public spellChargeWeapon(): void {
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(15) > 100) {
            this.outputText("You are too tired to cast this spell.", true);
            this.doNext(this.magicMenu);
            return;
        }
        this.doNext(this.combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(15, 1);
        this.outputText("You utter words of power, summoning an electrical charge around your " + this.player.weaponName + ".  It crackles loudly, ensuring you'll do more damage with it for the rest of the fight.\n\n", true);
        this.player.createStatusAffect(StatusAffects.ChargeWeapon, 10 * this.spellMod(), 0, 0, 0);
        this.statScreenRefresh();
        this.flags[kFLAGS.SPELLS_CAST]++;
        this.spellPerkUnlock();
        this.enemyAI();
    }
    //(20) Blind – reduces your opponent's accuracy, giving an additional 50% miss chance to physical attacks.
    public spellBlind(): void {
        this.outputText("", true);
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(20) > 100) {
            this.outputText("You are too tired to cast this spell.", true);
            this.doNext(this.magicMenu);
            return;
        }
        this.doNext(this.combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(20, 1);
        if (this.monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            this.outputText("As soon as your magic touches the multicolored shell around " + this.monster.a + this.monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            this.flags[kFLAGS.SPELLS_CAST]++;
            this.spellPerkUnlock();
            this.enemyAI();
            return;
        }
        if (this.monster instanceof JeanClaude) {
            this.outputText("Jean-Claude howls, reeling backwards before turning back to you, rage clenching his dragon-like face and enflaming his eyes. Your spell seemed to cause him physical pain, but did nothing to blind his lidless sight.");

            this.outputText("\n\n“<i>You think your hedge magic will work on me, intrus?</i>” he snarls. “<i>Here- let me show you how it’s really done.</i>” The light of anger in his eyes intensifies, burning a retina-frying white as it demands you stare into it...");

            if (this.rand(this.player.spe) >= 50 || this.rand(this.player.inte) >= 50) {
                this.outputText("\n\nThe light sears into your eyes, but with the discipline of conscious effort you escape the hypnotic pull before it can mesmerize you, before Jean-Claude can blind you.");

                this.outputText("\n\n“<i>You fight dirty,</i>” the monster snaps. He sounds genuinely outraged. “<i>I was told the interloper was a dangerous warrior, not a little [boy] who accepts duels of honour and then throws sand into his opponent’s eyes. Look into my eyes, little [boy]. Fair is fair.</i>”");

                this.monster.HP -= Math.floor(10 + (this.player.inte / 3 + this.rand(this.player.inte / 2)) * this.spellMod());
            }
            else {
                this.outputText("\n\nThe light sears into your eyes and mind as you stare into it. It’s so powerful, so infinite, so exquisitely painful that you wonder why you’d ever want to look at anything else, at anything at- with a mighty effort, you tear yourself away from it, gasping. All you can see is the afterimages, blaring white and yellow across your vision. You swipe around you blindly as you hear Jean-Claude bark with laughter, trying to keep the monster at arm’s length.");

                this.outputText("\n\n“<i>The taste of your own medicine, it is not so nice, eh? I will show you much nicer things in there in time intrus, don’t worry. Once you have learnt your place.</i>”");

                this.player.createStatusAffect(StatusAffects.Blind, this.rand(4) + 1, 0, 0, 0);
            }

            this.flags[kFLAGS.SPELLS_CAST]++;
            this.spellPerkUnlock();
            if (this.monster.HP < 1) this.doNext(this.endHpVictory);
            else this.enemyAI();
            return;
        }
        this.outputText("You glare at " + this.monster.a + this.monster.short + " and point at " + this.monster.pronoun2 + ".  A bright flash erupts before " + this.monster.pronoun2 + "!\n", true);
        if (this.monster instanceof LivingStatue) {
            // noop
        }
        else if (this.rand(3) != 0) {
            this.outputText(" <b>" + this.monster.capitalA + this.monster.short + " ", false);
            if (this.monster.plural && this.monster.short != "imp horde") this.outputText("are blinded!</b>", false);
            else this.outputText("is blinded!</b>", false);
            this.monster.createStatusAffect(StatusAffects.Blind, 5 * this.spellMod(), 0, 0, 0);
            if (this.monster.short == "Isabella")
                if (this.isabellaFollowerScene.isabellaAccent()) this.outputText("\n\n\"<i>Nein! I cannot see!</i>\" cries Isabella.", false);
                else this.outputText("\n\n\"<i>No! I cannot see!</i>\" cries Isabella.", false);
            if (this.monster.short == "Kiha") this.outputText("\n\n\"<i>You think blindness will slow me down?  Attacks like that are only effective on those who don't know how to see with their other senses!</i>\" Kiha cries defiantly.", false);
            if (this.monster.short == "plain girl") {
                this.outputText("  Remarkably, it seems as if your spell has had no effect on her, and you nearly get clipped by a roundhouse as you stand, confused. The girl flashes a radiant smile at you, and the battle continues.", false);
                this.monster.removeStatusAffect(StatusAffects.Blind);
            }
        }
        else this.outputText(this.monster.capitalA + this.monster.short + " blinked!", false);
        this.outputText("\n\n", false);
        this.flags[kFLAGS.SPELLS_CAST]++;
        this.spellPerkUnlock();
        this.statScreenRefresh();
        this.enemyAI();
    }
    //(30) Whitefire – burns the enemy for 10 + int/3 + rand(int/2) * spellMod.
    public spellWhitefire(): void {
        this.outputText("", true);
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(30) > 100) {
            this.outputText("You are too tired to cast this spell.", true);
            this.doNext(this.magicMenu);
            return;
        }
        this.doNext(this.combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(30, 1);
        if (this.monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            this.outputText("As soon as your magic touches the multicolored shell around " + this.monster.a + this.monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            this.flags[kFLAGS.SPELLS_CAST]++;
            this.spellPerkUnlock();
            this.enemyAI();
            return;
        }
        if (this.monster instanceof Doppleganger) {
            (this.monster as Doppleganger).handleSpellResistance("whitefire");
            this.flags[kFLAGS.SPELLS_CAST]++;
            this.spellPerkUnlock();
            return;
        }
        this.outputText("You narrow your eyes, focusing your mind with deadly intent.  You snap your fingers and " + this.monster.a + this.monster.short + " is enveloped in a flash of white flames!\n", true);
        temp = Math.floor(10 + (this.player.inte / 3 + this.rand(this.player.inte / 2)) * this.spellMod());
        //High damage to goes.
        if (this.monster.short == "goo-girl") temp = Math.round(temp * 1.5);
        this.outputText(this.monster.capitalA + this.monster.short + " takes " + temp + " damage.", false);
        //Using fire attacks on the goo]
        if (this.monster.short == "goo-girl") {
            this.outputText("  Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + this.monster.skinTone + " skin has lost some of its shimmer.", false);
            if (this.monster.findPerk(PerkLib.Acid) < 0) this.monster.createPerk(PerkLib.Acid, 0, 0, 0, 0);
        }
        this.outputText("\n\n", false);
        this.flags[kFLAGS.SPELLS_CAST]++;
        this.spellPerkUnlock();
        this.monster.HP -= temp;
        this.statScreenRefresh();
        if (this.monster.HP < 1) this.doNext(this.endHpVictory);
        else this.enemyAI();
    }

    public spellCleansingPalm(): void {
        this.clearOutput();
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(30) > 100) {
            this.outputText("You are too tired to cast this spell.", true);
            this.doNext(this.magicMenu);
            return;
        }
        this.doNext(this.combatMenu);
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(30, 1);
        if (this.monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            this.outputText("As soon as your magic touches the multicolored shell around " + this.monster.a + this.monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            this.flags[kFLAGS.SPELLS_CAST]++;
            this.spellPerkUnlock();
            this.enemyAI();
            return;
        }

        if (this.monster.short == "Jojo") {
            // Not a completely corrupted monkmouse
            if (kGAMECLASS.monk < 2) {
                this.outputText("You thrust your palm forward, sending a blast of pure energy towards Jojo. At the last second he sends a blast of his own against yours canceling it out\n\n");
                this.flags[kFLAGS.SPELLS_CAST]++;
                this.spellPerkUnlock();
                this.enemyAI();
                return;
            }
        }

        if (this.monster instanceof LivingStatue) {
            this.outputText("You thrust your palm forward, causing a blast of pure energy to slam against the giant stone statue- to no effect!");
            this.flags[kFLAGS.SPELLS_CAST]++;
            this.spellPerkUnlock();
            this.enemyAI();
            return;
        }

        var corruptionMulti: number = (this.monster.cor - 20) / 25;
        if (corruptionMulti > 1.5) corruptionMulti = 1.5;

        temp = Math.floor((this.player.inte / 4 + this.rand(this.player.inte / 3)) * (this.spellMod() * corruptionMulti));

        if (temp > 0) {
            this.outputText("You thrust your palm forward, causing a blast of pure energy to slam against " + this.monster.a + this.monster.short + ", tossing");
            if ((this.monster as Monster).plural == true) this.outputText(" them");
            else this.outputText((this.monster as Monster).mfn(" him", " her", " it"));
            this.outputText(" back a few feet.\n\n");

            this.outputText(this.monster.capitalA + this.monster.short + " takes " + temp + " damage.\n\n");
        }
        else {
            temp = 0;
            this.outputText("You thrust your palm forward, causing a blast of pure energy to slam against " + this.monster.a + this.monster.short + ", which they ignore. It is probably best you don’t use this technique against the pure.\n\n");
        }

        this.flags[kFLAGS.SPELLS_CAST]++;
        this.spellPerkUnlock();
        this.monster.HP -= temp;
        this.statScreenRefresh();
        if (this.monster.HP < 1) this.doNext(this.endHpVictory);
        else this.enemyAI();
    }

    public spellPerkUnlock(): void {
        if (this.flags[kFLAGS.SPELLS_CAST] >= 5 && this.player.findPerk(PerkLib.SpellcastingAffinity) < 0) {
            this.outputText("<b>You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!</b>\n\n");
            this.player.createPerk(PerkLib.SpellcastingAffinity, 20, 0, 0, 0);
        }
        if (this.flags[kFLAGS.SPELLS_CAST] >= 15 && this.player.perkv1(PerkLib.SpellcastingAffinity) < 35) {
            this.outputText("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b>\n\n");
            this.player.setPerkValue(PerkLib.SpellcastingAffinity, 1, 35);
        }
        if (this.flags[kFLAGS.SPELLS_CAST] >= 45 && this.player.perkv1(PerkLib.SpellcastingAffinity) < 50) {
            this.outputText("<b>You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!</b>\n\n");
            this.player.setPerkValue(PerkLib.SpellcastingAffinity, 1, 50);
        }
    }

    //player gains hellfire perk.  
    //Hellfire deals physical damage to completely pure foes, 
    //lust damage to completely corrupt foes, and a mix for those in between.  Its power is based on the PC's corruption and level.  Appearance is slightly changed to mention that the PC's eyes and mouth occasionally show flicks of fire from within them, text could possibly vary based on corruption.
    public hellFire(): void {
        this.outputText("", true);
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(20) > 100) {
            this.outputText("You are too tired to breathe fire.\n", true);
            this.doNext(this.combatMenu);
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(20, 1);
        //Amily!
        if (this.monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            this.outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            this.enemyAI();
            return;
        }
        if (this.monster instanceof LivingStatue) {
            this.outputText("The fire courses over the stone behemoths skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            this.enemyAI();
            return;
        }
        var damage: number = (this.player.level * 8 + this.rand(10) + this.player.cor / 5);
        if (this.player.findStatusAffect(StatusAffects.GooArmorSilence) < 0) this.outputText("You take in a deep breath and unleash a wave of corrupt red flames from deep within.", false);

        if (this.player.findStatusAffect(StatusAffects.WebSilence) >= 0) {
            this.outputText("  <b>The fire burns through the webs blocking your mouth!</b>", false);
            this.player.removeStatusAffect(StatusAffects.WebSilence);
        }
        if (this.player.findStatusAffect(StatusAffects.GooArmorSilence) >= 0) {
            this.outputText("  <b>A growl rumbles from deep within as you charge the terrestrial fire, and you force it from your chest and into the slime.  The goop bubbles and steams as it evaporates, drawing a curious look from your foe, who pauses in her onslaught to lean in and watch.  While the tension around your mouth lessens and your opponent forgets herself more and more, you bide your time.  When you can finally work your jaw enough to open your mouth, you expel the lion's - or jaguar's? share of the flame, inflating an enormous bubble of fire and evaporated slime that thins and finally pops to release a superheated cloud.  The armored girl screams and recoils as she's enveloped, flailing her arms.</b>", false);
            this.player.removeStatusAffect(StatusAffects.GooArmorSilence);
            damage += 25;
        }
        if (this.monster.short == "Isabella") {
            this.outputText("  Isabella shoulders her shield into the path of the crimson flames.  They burst over the wall of steel, splitting around the impenetrable obstruction and washing out harmlessly to the sides.\n\n", false);
            if (this.isabellaFollowerScene.isabellaAccent()) this.outputText("\"<i>Is zat all you've got?  It'll take more than a flashy magic trick to beat Izabella!</i>\" taunts the cow-girl.\n\n", false);
            else this.outputText("\"<i>Is that all you've got?  It'll take more than a flashy magic trick to beat Isabella!</i>\" taunts the cow-girl.\n\n", false);
            this.enemyAI();
            return;
        }
        else if (this.monster.short == "Vala") {
            this.outputText("  Vala beats her wings with surprising strength, blowing the fireball back at you!  ", false);
            if (this.player.findPerk(PerkLib.Evade) >= 0 && this.rand(2) == 0) {
                this.outputText("You dive out of the way and evade it!", false);
            }
            else if (this.player.findPerk(PerkLib.Flexibility) >= 0 && this.rand(4) == 0) {
                this.outputText("You use your flexibility to barely fold your body out of the way!", false);
            }
            else {
                damage = Math.floor(damage / 6);
                this.outputText("Your own fire smacks into your face, arousing you!", false);
                this.dynStats("lus", damage);
            }
            this.outputText("\n", false);
        }
        else {
            if (this.monster.inte < 10) {
                this.outputText("  Your foe lets out a shriek as their form is engulfed in the blistering flames.", false);
                damage = Math.floor(damage);
                this.outputText("(" + damage + ")\n", false);
                this.monster.HP -= damage;
            }
            else {
                if (this.monster.lustVuln > 0) {
                    this.outputText("  Your foe cries out in surprise and then gives a sensual moan as the flames of your passion surround them and fill their body with unnatural lust.\n", false);
                    this.monster.lust += this.monster.lustVuln * damage / 6;
                }
                else {
                    this.outputText("  The corrupted fire doesn't seem to have affect on " + this.monster.a + this.monster.short + "!\n", false);
                }
            }
        }
        this.outputText("\n", false);
        if (this.monster.short == "Holli" && this.monster.findStatusAffect(StatusAffects.HolliBurning) < 0) (this.monster as Holli).lightHolliOnFireMagically();
        if (this.monster.HP < 1) {
            this.doNext(this.endHpVictory);
        }
        else if (this.monster.lust >= 99) {
            this.doNext(this.endLustVictory);
        }
        else this.enemyAI();
    }

    public kick(): void {
        this.outputText("", true);
        if (this.player.fatigue + this.physicalCost(15) > 100) {
            this.outputText("You're too fatigued to use a charge attack!", true);
            this.menu();
            this.addButton(0, "Next", this.combatMenu, false);
            return;
        }
        this.fatigue(15, 2);
        //Variant start messages!
        if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_KANGAROO) {
            //(tail)
            if (this.player.tailType == CoC.TAIL_TYPE_KANGAROO) this.outputText("You balance on your flexible kangaroo-tail, pulling both legs up before slamming them forward simultaneously in a brutal kick.  ", false);
            //(no tail) 
            else this.outputText("You balance on one leg and cock your powerful, kangaroo-like leg before you slam it forward in a kick.  ", false);
        }
        //(bunbun kick) 
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_BUNNY) this.outputText("You leap straight into the air and lash out with both your furred feet simultaneously, slamming forward in a strong kick.  ", false);
        //(centaur kick)
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_CENTAUR) this.outputText("You lurch up onto your backlegs, lifting your forelegs from the ground a split-second before you lash them out in a vicious kick.  ", false);
        //(bipedal hoof-kick) 
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_HOOFED) this.outputText("You twist and lurch as you raise a leg and slam your hoof forward in a kick.  ", false);

        if (this.flags[kFLAGS.PC_FETISH] >= 3) {
            this.outputText("You attempt to attack, but at the last moment your body wrenches away, preventing you from even coming close to landing a blow!  Ceraph's piercings have made normal attack impossible!  Maybe you could try something else?\n\n", false);
            this.enemyAI();
            return;
        }
        //Amily!
        if (this.monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            this.outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            this.enemyAI();
            return;
        }
        //Blind
        if (this.player.findStatusAffect(StatusAffects.Blind) >= 0) {
            this.outputText("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ", false);
        }
        //Worms are special
        if (this.monster.short == "worms") {
            //50% chance of hit (int boost)
            if (this.rand(100) + this.player.inte / 3 >= 50) {
                temp = Math.floor(this.player.str / 5 - this.rand(5));
                if (temp == 0) temp = 1;
                this.outputText("You strike at the amalgamation, crushing countless worms into goo, dealing " + temp + " damage.\n\n", false);
                this.monster.HP -= temp;
                if (this.monster.HP <= 0) {
                    this.doNext(this.endHpVictory);
                    return;
                }
            }
            //Fail
            else {
                this.outputText("You attempt to crush the worms with your reprisal, only to have the collective move its individual members, creating a void at the point of impact, leaving you to attack only empty air.\n\n", false);
            }
            this.enemyAI();
            return;
        }
        var damage: number;
        //Determine if dodged!
        if ((this.player.findStatusAffect(StatusAffects.Blind) >= 0 && this.rand(2) == 0) || (this.monster.spe - this.player.spe > 0 && Math.floor(Math.random() * (((this.monster.spe - this.player.spe) / 4) + 80)) > 80)) {
            //Akbal dodges special education
            if (this.monster.short == "Akbal") this.outputText("Akbal moves like lightning, weaving in and out of your furious attack with the speed and grace befitting his jaguar body.\n", false);
            else {
                this.outputText(this.monster.capitalA + this.monster.short + " manage", false);
                if (!this.monster.plural) this.outputText("s", false);
                this.outputText(" to dodge your kick!", false);
                this.outputText("\n\n", false);
            }
            this.enemyAI();
            return;
        }
        //Determine damage
        //Base:
        damage = this.player.str;
        //Leg bonus
        //Bunny - 20, Kangaroo - 35, 1 hoof = 30, 2 hooves = 40
        if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_CENTAUR) damage += 40;
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_HOOFED) damage += 30;
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_BUNNY) damage += 20;
        else if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_KANGAROO) damage += 35;
        //Start figuring enemy damage resistance
        var reduction: number = this.rand(this.monster.tou);
        //Add in enemy armor if needed
        reduction += this.monster.armorDef;
        //Apply AND DONE!
        damage -= reduction;
        //Damage post processing!
        if (this.player.findPerk(PerkLib.HistoryFighter) >= 0) damage *= 1.1;
        //(None yet!)
        if (damage > 0) damage = this.doDamage(damage);

        //BLOCKED
        if (damage <= 0) {
            damage = 0;
            this.outputText(this.monster.capitalA + this.monster.short, false);
            if (this.monster.plural) this.outputText("'", false);
            else this.outputText("s", false);
            this.outputText(" defenses are too tough for your kick to penetrate!", false);
        }
        //LAND A HIT!
        else {
            this.outputText(this.monster.capitalA + this.monster.short, false);
            if (!this.monster.plural) this.outputText(" reels from the damaging impact! (" + damage + ")", false);
            else this.outputText(" reel from the damaging impact! (" + damage + ")", false);
        }
        if (damage > 0) {
            //Lust raised by anemone contact!
            if (this.monster.short == "anemone") {
                this.outputText("\nThough you managed to hit the anemone, several of the tentacles surrounding her body sent home jolts of venom when your swing brushed past them.", false);
                //(gain lust, temp lose str/spd)
                (this.monster as Anemone).applyVenom((1 + this.rand(2)));
            }
        }
        this.outputText("\n\n", false);
        if (this.monster.HP < 1 || this.monster.lust > 99) this.combatRoundOver();
        else this.enemyAI();
    }

    public PCWebAttack(): void {
        this.outputText("", true);
        //Keep logic sane if this attack brings victory
        if (this.player.tailVenom < 33) {
            this.outputText("You do not have enough webbing to shoot right now!", true);
            this.doNext(this.physicalSpecials);
            return;
        }
        this.player.tailVenom -= 33;
        //Amily!
        if (this.monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            this.outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n", true);
            this.enemyAI();
            return;
        }
        //Blind
        if (this.player.findStatusAffect(StatusAffects.Blind) >= 0) {
            this.outputText("You attempt to attack, but as blinded as you are right now, you doubt you'll have much luck!  ", false);
        }
        else this.outputText("Turning and clenching muscles that no human should have, you expel a spray of sticky webs at " + this.monster.a + this.monster.short + "!  ", false);
        //Determine if dodged!
        if ((this.player.findStatusAffect(StatusAffects.Blind) >= 0 && this.rand(2) == 0) || (this.monster.spe - this.player.spe > 0 && Math.floor(Math.random() * (((this.monster.spe - this.player.spe) / 4) + 80)) > 80)) {
            this.outputText("You miss " + this.monster.a + this.monster.short + " completely - ", false);
            if (this.monster.plural) this.outputText("they", false);
            else this.outputText(this.monster.mf("he", "she") + " moved out of the way!\n\n", false);
            this.enemyAI();
            return;
        }
        //Over-webbed
        if (this.monster.spe < 1) {
            if (!this.monster.plural) this.outputText(this.monster.capitalA + this.monster.short + " is completely covered in webbing, but you hose " + this.monster.mf("him", "her") + " down again anyway.", false);
            else this.outputText(this.monster.capitalA + this.monster.short + " are completely covered in webbing, but you hose them down again anyway.", false);
        }
        //LAND A HIT!
        else {
            if (!this.monster.plural) this.outputText("The adhesive strands cover " + this.monster.a + this.monster.short + " with restrictive webbing, greatly slowing " + this.monster.mf("him", "her") + ".", false);
            else this.outputText("The adhesive strands cover " + this.monster.a + this.monster.short + " with restrictive webbing, greatly slowing " + this.monster.mf("him", "her") + ".", false);
            this.monster.spe -= 45;
            if (this.monster.spe < 0) this.monster.spe = 0;
        }
        this.outputText("\n\n", false);
        if (this.monster.HP < 1 || this.monster.lust > 99) this.combatRoundOver();
        else this.enemyAI();
    }
    public nagaBiteAttack(): void {
        this.outputText("", true);
        //FATIIIIGUE
        if (this.player.fatigue + this.physicalCost(10) > 100) {
            this.outputText("You just don't have the energy to bite something right now...", true);
            //Pass false to combatMenu instead:		menuLoc = 1;
            //		doNext(combatMenu);
            this.menu();
            this.addButton(0, "Next", this.combatMenu, false);
            return;
        }
        this.fatigue(10, 2);
        //Amily!
        if (this.monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            this.outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            this.enemyAI();
            return;
        }
        if (this.monster instanceof LivingStatue) {
            this.outputText("Your fangs can't even penetrate the giant's flesh.");
            this.enemyAI();
            return;
        }
        //Works similar to bee stinger, must be regenerated over time. Shares the same poison-meter
        if (this.rand(this.player.spe / 2 + 40) + 20 > this.monster.spe / 1.5) {
            //(if monster = demons)
            if (this.monster.short == "demons") this.outputText("You look at the crowd for a moment, wondering which of their number you should bite. Your glance lands upon the leader of the group, easily spotted due to his snakeskin cloak. You quickly dart through the demon crowd as it closes in around you and lunge towards the broad form of the leader. You catch the demon off guard and sink your needle-like fangs deep into his flesh. You quickly release your venom and retreat before he, or the rest of the group manage to react.", false);
            //(Otherwise) 
            else this.outputText("You lunge at the foe headfirst, fangs bared. You manage to catch " + this.monster.a + this.monster.short + " off guard, your needle-like fangs penetrating deep into " + this.monster.pronoun3 + " body. You quickly release your venom, and retreat before " + this.monster.pronoun1 + " manages to react.", false);
            //The following is how the enemy reacts over time to poison. It is displayed after the description paragraph,instead of lust
            this.monster.str -= 5 + this.rand(5);
            this.monster.spe -= 5 + this.rand(5);
            if (this.monster.str < 1) this.monster.str = 1;
            if (this.monster.spe < 1) this.monster.spe = 1;
            if (this.monster.findStatusAffect(StatusAffects.NagaVenom) >= 0) {
                this.monster.addStatusValue(StatusAffects.NagaVenom, 1, 1);
            }
            else this.monster.createStatusAffect(StatusAffects.NagaVenom, 1, 0, 0, 0);
        }
        else {
            this.outputText("You lunge headfirst, fangs bared. Your attempt fails horrendously, as " + this.monster.a + this.monster.short + " manages to counter your lunge, knocking your head away with enough force to make your ears ring.", false);
        }
        this.outputText("\n\n", false);
        if (this.monster.HP < 1 || this.monster.lust > 99) this.combatRoundOver();
        else this.enemyAI();
    }
    public spiderBiteAttack(): void {
        this.outputText("", true);
        //FATIIIIGUE
        if (this.player.fatigue + this.physicalCost(10) > 100) {
            this.outputText("You just don't have the energy to bite something right now...", true);
            //Pass false to combatMenu instead:		menuLoc = 1;
            //		doNext(combatMenu);
            this.menu();
            this.addButton(0, "Next", this.combatMenu, false);
            return;
        }
        this.fatigue(10, 2);
        //Amily!
        if (this.monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            this.outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            this.enemyAI();
            return;
        }
        if (this.monster instanceof LivingStatue) {
            this.outputText("Your fangs can't even penetrate the giant's flesh.");
            this.enemyAI();
            return;
        }
        //Works similar to bee stinger, must be regenerated over time. Shares the same poison-meter
        if (this.rand(this.player.spe / 2 + 40) + 20 > this.monster.spe / 1.5) {
            //(if monster = demons)
            if (this.monster.short == "demons") this.outputText("You look at the crowd for a moment, wondering which of their number you should bite. Your glance lands upon the leader of the group, easily spotted due to his snakeskin cloak. You quickly dart through the demon crowd as it closes in around you and lunge towards the broad form of the leader. You catch the demon off guard and sink your needle-like fangs deep into his flesh. You quickly release your venom and retreat before he, or the rest of the group manage to react.", false);
            //(Otherwise) 
            else {
                if (!this.monster.plural) this.outputText("You lunge at the foe headfirst, fangs bared. You manage to catch " + this.monster.a + this.monster.short + " off guard, your needle-like fangs penetrating deep into " + this.monster.pronoun3 + " body. You quickly release your venom, and retreat before " + this.monster.a + this.monster.pronoun1 + " manages to react.", false);
                else this.outputText("You lunge at the foes headfirst, fangs bared. You manage to catch one of " + this.monster.a + this.monster.short + " off guard, your needle-like fangs penetrating deep into " + this.monster.pronoun3 + " body. You quickly release your venom, and retreat before " + this.monster.a + this.monster.pronoun1 + " manage to react.", false);
            }
            //React
            if (this.monster.lustVuln == 0) this.outputText("  Your aphrodisiac toxin has no effect!", false);
            else {
                if (this.monster.plural) this.outputText("  The one you bit flushes hotly, though the entire group seems to become more aroused in sympathy to their now-lusty compatriot.", false);
                else this.outputText("  " + this.monster.mf("He", "She") + " flushes hotly and " + this.monster.mf("touches his suddenly-stiff member, moaning lewdly for a moment.", "touches a suddenly stiff nipple, moaning lewdly.  You can smell her arousal in the air."), false);
                this.monster.lust += 25 * this.monster.lustVuln;
                if (this.rand(5) == 0) this.monster.lust += 25 * this.monster.lustVuln;
            }
        }
        else {
            this.outputText("You lunge headfirst, fangs bared. Your attempt fails horrendously, as " + this.monster.a + this.monster.short + " manages to counter your lunge, pushing you back out of range.", false);
        }
        this.outputText("\n\n", false);
        if (this.monster.HP < 1 || this.monster.lust > 99) this.combatRoundOver();
        else this.enemyAI();
    }

    //New Abilities and Items
    //[Abilities]
    //Whisper 
    public superWhisperAttack(): void {
        this.outputText("", true);
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(10) > 100) {
            this.outputText("You are too tired to focus this ability.", true);
            this.doNext(this.combatMenu);
            return;
        }
        if (this.player.findStatusAffect(StatusAffects.ThroatPunch) >= 0 || this.player.findStatusAffect(StatusAffects.WebSilence) >= 0) {
            this.outputText("You cannot focus to reach the enemy's mind while you're having so much difficult breathing.", true);
            this.doNext(this.combatMenu);
            return;
        }
        if (this.monster.short == "pod" || this.monster.inte == 0) {
            this.outputText("You reach for the enemy's mind, but cannot find anything.  You frantically search around, but there is no consciousness as you know it in the room.\n\n", true);
            this.changeFatigue(1);
            this.enemyAI();
            return;
        }
        if (this.monster instanceof LivingStatue) {
            this.outputText("There is nothing inside the golem to whisper to.");
            this.changeFatigue(1);
            this.enemyAI();
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(10, 1);
        if (this.monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            this.outputText("As soon as your magic touches the multicolored shell around " + this.monster.a + this.monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            this.enemyAI();
            return;
        }
        if (this.monster.findPerk(PerkLib.Focused) >= 0) {
            if (!this.monster.plural) this.outputText(this.monster.capitalA + this.monster.short + " is too focused for your whispers to influence!\n\n");
            this.enemyAI();
            return;
        }
        //Enemy too strong or multiplesI think you 
        if (this.player.inte < this.monster.inte || this.monster.plural) {
            this.outputText("You reach for your enemy's mind, but can't break through.\n", false);
            this.changeFatigue(10);
            this.enemyAI();
            return;
        }
        //[Failure] 
        if (this.rand(10) == 0) {
            this.outputText("As you reach for your enemy's mind, you are distracted and the chorus of voices screams out all at once within your mind. You're forced to hastily silence the voices to protect yourself.", false);
            this.changeFatigue(10);
            this.enemyAI();
            return;
        }
        this.outputText("You reach for your enemy's mind, watching as its sudden fear petrifies your foe.\n\n", false);
        this.monster.createStatusAffect(StatusAffects.Fear, 1, 0, 0, 0);
        this.enemyAI();
    }

    //Attack used:
    //This attack has a cooldown and is more dramatic when used by the PC, it should be some sort of last ditch attack for emergencies. Don't count on using this whenever you want.
    //once a day or something
    //Effect of attack: Damages and stuns the enemy for the turn you used this attack on, plus 2 more turns. High chance of success.
    public dragonBreath(): void {
        this.clearOutput();
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(20) > 100) {
            this.outputText("You are too tired to breathe fire.", true);
            this.doNext(this.combatMenu);
            return;
        }
        //Not Ready Yet:
        if (this.player.findStatusAffect(StatusAffects.DragonBreathCooldown) >= 0) {
            this.outputText("You try to tap into the power within you, but your burning throat reminds you that you're not yet ready to unleash it again...");
            this.doNext(this.combatMenu);
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(20, 1);
        this.player.createStatusAffect(StatusAffects.DragonBreathCooldown, 0, 0, 0, 0);
        var damage: number = Math.floor(this.player.level * 8 + 25 + this.rand(10));
        if (this.player.findStatusAffect(StatusAffects.DragonBreathBoost) >= 0) {
            this.player.removeStatusAffect(StatusAffects.DragonBreathBoost);
            damage *= 1.5;
        }
        //Shell
        if (this.monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            this.outputText("As soon as your magic touches the multicolored shell around " + this.monster.a + this.monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            this.enemyAI();
            return;
        }
        //Amily!
        if (this.monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            this.outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            this.enemyAI();
            return;
        }
        if (this.monster instanceof LivingStatue) {
            this.outputText("The fire courses by the stone skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            this.enemyAI();
            return;
        }
        this.outputText("Tapping into the power deep within you, you let loose a bellowing roar at your enemy, so forceful that even the environs crumble around " + this.monster.pronoun2 + ".  " + this.monster.capitalA + this.monster.short + " does " + this.monster.pronoun3 + " best to avoid it, but the wave of force is too fast.");
        if (this.monster.findStatusAffect(StatusAffects.Sandstorm) >= 0) {
            this.outputText("  <b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>");
            damage = Math.round(0.2 * damage);
        }
        //Miss: 
        if ((this.player.findStatusAffect(StatusAffects.Blind) >= 0 && this.rand(2) == 0) || (this.monster.spe - this.player.spe > 0 && Math.floor(Math.random() * (((this.monster.spe - this.player.spe) / 4) + 80)) > 80)) {
            this.outputText("  Despite the heavy impact caused by your roar, " + this.monster.a + this.monster.short + " manages to take it at an angle and remain on " + this.monster.pronoun3 + " feet and focuses on you, ready to keep fighting.");
        }
        //Special enemy avoidances
        else if (this.monster.short == "Vala") {
            this.outputText("Vala beats her wings with surprising strength, blowing the fireball back at you! ", false);
            if (this.player.findPerk(PerkLib.Evade) >= 0 && this.rand(2) == 0) {
                this.outputText("You dive out of the way and evade it!", false);
            }
            else if (this.player.findPerk(PerkLib.Flexibility) >= 0 && this.rand(4) == 0) {
                this.outputText("You use your flexibility to barely fold your body out of the way!", false);
            }
            else {
                damage = this.takeDamage(damage);
                this.outputText("Your own fire smacks into your face! (" + damage + ")", false);
            }
            this.outputText("\n\n", false);
        }
        //Goos burn
        else if (this.monster.short == "goo-girl") {
            this.outputText(" Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + this.monster.skinTone + " skin has lost some of its shimmer. ", false);
            if (this.monster.findPerk(PerkLib.Acid) < 0) this.monster.createPerk(PerkLib.Acid, 0, 0, 0, 0);
            damage = Math.round(damage * 1.5);
            damage = this.doDamage(damage);
            this.monster.createStatusAffect(StatusAffects.Stunned, 0, 0, 0, 0);
            this.outputText("(" + damage + ")\n\n", false);
        }
        else {
            if (this.monster.findPerk(PerkLib.Resolute) < 0) {
                this.outputText("  " + this.monster.capitalA + this.monster.short + " reels as your wave of force slams into " + this.monster.pronoun2 + " like a ton of rock!  The impact sends " + this.monster.pronoun2 + " crashing to the ground, too dazed to strike back.");
                this.monster.createStatusAffect(StatusAffects.Stunned, 1, 0, 0, 0);
            }
            else {
                this.outputText("  " + this.monster.capitalA + this.monster.short + " reels as your wave of force slams into " + this.monster.pronoun2 + " like a ton of rock!  The impact sends " + this.monster.pronoun2 + " staggering back, but <b>" + this.monster.pronoun1 + " ");
                if (!this.monster.plural) this.outputText("is ");
                else this.outputText("are");
                this.outputText("too resolute to be stunned by your attack.</b>");
            }
            damage = this.doDamage(damage);
            this.outputText(" (" + damage + ")");
        }
        this.outputText("\n\n");
        if (this.monster.short == "Holli" && this.monster.findStatusAffect(StatusAffects.HolliBurning) < 0) (this.monster as Holli).lightHolliOnFireMagically();
        this.combatRoundOver();
    }

    //* Terrestrial Fire
    public fireballuuuuu(): void {
        this.outputText("", true);
        if (this.player.fatigue + 20 > 100) {
            this.outputText("You are too tired to breathe fire.", true);
            this.doNext(this.combatMenu);
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.changeFatigue(20);
        if (this.monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            this.outputText("As soon as your magic touches the multicolored shell around " + this.monster.a + this.monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            this.enemyAI();
            return;
        }
        //Amily!
        if (this.monster.findStatusAffect(StatusAffects.Concentration) >= 0) {
            this.outputText("Amily easily glides around your attack thanks to her complete concentration on your movements.", true);
            this.enemyAI();
            return;
        }
        if (this.monster instanceof LivingStatue) {
            this.outputText("The fire courses by the stone skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            this.enemyAI();
            return;
        }
        //[Failure]
        //(high damage to self, +20 fatigue)
        if (this.rand(5) == 0 || this.player.findStatusAffect(StatusAffects.WebSilence) >= 0) {
            if (this.player.findStatusAffect(StatusAffects.WebSilence) >= 0) this.outputText("You reach for the terrestrial fire, but as you ready to release a torrent of flame, it backs up in your throat, blocked by the webbing across your mouth.  It causes you to cry out as the sudden, heated force explodes in your own throat.\n\n", false);
            else if (this.player.findStatusAffect(StatusAffects.GooArmorSilence) >= 0) this.outputText("You reach for the terrestrial fire but as you ready the torrent, it erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.  The slime covering your mouth bubbles and pops, boiling away where the escaping flame opens small rents in it.  That wasn't as effective as you'd hoped, but you can at least speak now.");
            else this.outputText("You reach for the terrestrial fire, but as you ready to release a torrent of flame, the fire inside erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.\n\n", false);
            this.changeFatigue(10);
            this.takeDamage(10 + this.rand(20));
            this.enemyAI();
            return;
        }
        if (this.monster instanceof Doppleganger) {
            (this.monster as Doppleganger).handleSpellResistance("fireball");
            this.flags[kFLAGS.SPELLS_CAST]++;
            this.spellPerkUnlock();
            return;
        }
        var damage: number;
        damage = Math.floor(this.player.level * 10 + 45 + this.rand(10));
        if (this.player.findStatusAffect(StatusAffects.GooArmorSilence) >= 0) {
            this.outputText("<b>A growl rumbles from deep within as you charge the terrestrial fire, and you force it from your chest and into the slime.  The goop bubbles and steams as it evaporates, drawing a curious look from your foe, who pauses in her onslaught to lean in and watch.  While the tension around your mouth lessens and your opponent forgets herself more and more, you bide your time.  When you can finally work your jaw enough to open your mouth, you expel the lion's - or jaguar's? share of the flame, inflating an enormous bubble of fire and evaporated slime that thins and finally pops to release a superheated cloud.  The armored girl screams and recoils as she's enveloped, flailing her arms.</b> ", false);
            this.player.removeStatusAffect(StatusAffects.GooArmorSilence);
            damage += 25;
        }
        else this.outputText("A growl rumbles deep with your chest as you charge the terrestrial fire.  When you can hold it no longer, you release an ear splitting roar and hurl a giant green conflagration at your enemy. ", false);

        if (this.monster.short == "Isabella") {
            this.outputText("Isabella shoulders her shield into the path of the emerald flames.  They burst over the wall of steel, splitting around the impenetrable obstruction and washing out harmlessly to the sides.\n\n", false);
            if (this.isabellaFollowerScene.isabellaAccent()) this.outputText("\"<i>Is zat all you've got?  It'll take more than a flashy magic trick to beat Izabella!</i>\" taunts the cow-girl.\n\n", false);
            else this.outputText("\"<i>Is that all you've got?  It'll take more than a flashy magic trick to beat Isabella!</i>\" taunts the cow-girl.\n\n", false);
            this.enemyAI();
            return;
        }
        else if (this.monster.short == "Vala") {
            this.outputText("Vala beats her wings with surprising strength, blowing the fireball back at you! ", false);
            if (this.player.findPerk(PerkLib.Evade) >= 0 && this.rand(2) == 0) {
                this.outputText("You dive out of the way and evade it!", false);
            }
            else if (this.player.findPerk(PerkLib.Flexibility) >= 0 && this.rand(4) == 0) {
                this.outputText("You use your flexibility to barely fold your body out of the way!", false);
            }
            else {
                this.outputText("Your own fire smacks into your face! (" + damage + ")", false);
                this.takeDamage(damage);
            }
            this.outputText("\n\n", false);
        }
        else {
            //Using fire attacks on the goo]
            if (this.monster.short == "goo-girl") {
                this.outputText(" Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + this.monster.skinTone + " skin has lost some of its shimmer. ", false);
                if (this.monster.findPerk(PerkLib.Acid) < 0) this.monster.createPerk(PerkLib.Acid, 0, 0, 0, 0);
                damage = Math.round(damage * 1.5);
            }
            if (this.monster.findStatusAffect(StatusAffects.Sandstorm) >= 0) {
                this.outputText("<b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>  ");
                damage = Math.round(0.2 * damage);
            }
            this.outputText("(" + damage + ")\n\n", false);
            this.monster.HP -= damage;
            if (this.monster.short == "Holli" && this.monster.findStatusAffect(StatusAffects.HolliBurning) < 0) (this.monster as Holli).lightHolliOnFireMagically();
        }
        if (this.monster.HP < 1) {
            this.doNext(this.endHpVictory);
        }
        else this.enemyAI();
    }

    public kissAttack(): void {
        if (this.player.findStatusAffect(StatusAffects.Blind) >= 0) {
            this.outputText("There's no way you'd be able to find their lips while you're blind!", true);
            //Pass false to combatMenu instead:		menuLoc = 3;
            this.doNext(this.physicalSpecials);
            return;
        }
        this.outputText("", true);
        var attack: number = this.rand(6);
        switch (attack) {
            case 1:
                //Attack text 1:
                this.outputText("You hop up to " + this.monster.a + this.monster.short + " and attempt to plant a kiss on " + this.monster.pronoun3 + ".", false);
                break;
            //Attack text 2:
            case 2:
                this.outputText("You saunter up and dart forward, puckering your golden lips into a perfect kiss.", false);
                break;
            //Attack text 3: 
            case 3:
                this.outputText("Swaying sensually, you wiggle up to " + this.monster.a + this.monster.short + " and attempt to plant a nice wet kiss on " + this.monster.pronoun2 + ".", false);
                break;
            //Attack text 4:
            case 4:
                this.outputText("Lunging forward, you fly through the air at " + this.monster.a + this.monster.short + " with your lips puckered and ready to smear drugs all over " + this.monster.pronoun2 + ".", false);
                break;
            //Attack text 5:
            case 5:
                this.outputText("You lean over, your lips swollen with lust, wet with your wanting slobber as you close in on " + this.monster.a + this.monster.short + ".", false);
                break;
            //Attack text 6:
            default:
                this.outputText("Pursing your drug-laced lips, you close on " + this.monster.a + this.monster.short + " and try to plant a nice, wet kiss on " + this.monster.pronoun2 + ".", false);
                break;
        }
        //Dodged!
        if (this.monster.spe - this.player.spe > 0 && this.rand(((this.monster.spe - this.player.spe) / 4) + 80) > 80) {
            attack = this.rand(3);
            switch (attack) {
                //Dodge 1:
                case 1:
                    if (this.monster.plural) this.outputText("  " + this.monster.capitalA + this.monster.short + " sees it coming and moves out of the way in the nick of time!\n\n", false);
                    break;
                //Dodge 2:
                case 2:
                    if (this.monster.plural) this.outputText("  Unfortunately, you're too slow, and " + this.monster.a + this.monster.short + " slips out of the way before you can lay a wet one on one of them.\n\n", false);
                    else this.outputText("  Unfortunately, you're too slow, and " + this.monster.a + this.monster.short + " slips out of the way before you can lay a wet one on " + this.monster.pronoun2 + ".\n\n", false);
                    break;
                //Dodge 3:
                default:
                    if (this.monster.plural) this.outputText("  Sadly, " + this.monster.a + this.monster.short + " moves aside, denying you the chance to give one of them a smooch.\n\n", false);
                    else this.outputText("  Sadly, " + this.monster.a + this.monster.short + " moves aside, denying you the chance to give " + this.monster.pronoun2 + " a smooch.\n\n", false);
                    break;
            }
            this.enemyAI();
            return;
        }
        //Success but no effect:
        if (this.monster.lustVuln <= 0 || !this.monster.hasCock()) {
            if (this.monster.plural) this.outputText("  Mouth presses against mouth, and you allow your tongue to stick out to taste the saliva of one of their number, making sure to give them a big dose.  Pulling back, you look at " + this.monster.a + this.monster.short + " and immediately regret wasting the time on the kiss.  It had no effect!\n\n", false);
            else this.outputText("  Mouth presses against mouth, and you allow your tongue to stick to taste " + this.monster.pronoun3 + "'s saliva as you make sure to give them a big dose.  Pulling back, you look at " + this.monster.a + this.monster.short + " and immediately regret wasting the time on the kiss.  It had no effect!\n\n", false);
            this.enemyAI();
            return;
        }
        attack = this.rand(4);
        var damage: number = 0;
        switch (attack) {
            //Success 1:
            case 1:
                if (this.monster.plural) this.outputText("  Success!  A spit-soaked kiss lands right on one of their mouths.  The victim quickly melts into your embrace, allowing you to give them a nice, heavy dose of sloppy oral aphrodisiacs.\n\n", false);
                else this.outputText("  Success!  A spit-soaked kiss lands right on " + this.monster.a + this.monster.short + "'s mouth.  " + this.monster.mf("He", "She") + " quickly melts into your embrace, allowing you to give them a nice, heavy dose of sloppy oral aphrodisiacs.\n\n", false);
                damage = 15;
                break;
            //Success 2:
            case 2:
                if (this.monster.plural) this.outputText("  Gold-gilt lips press into one of their mouths, the victim's lips melding with yours.  You take your time with your suddenly cooperative captive and make sure to cover every bit of their mouth with your lipstick before you let them go.\n\n", false);
                else this.outputText("  Gold-gilt lips press into " + this.monster.a + this.monster.short + ", " + this.monster.pronoun3 + " mouth melding with yours.  You take your time with your suddenly cooperative captive and make sure to cover every inch of " + this.monster.pronoun3 + " with your lipstick before you let " + this.monster.pronoun2 + " go.\n\n", false);
                damage = 20;
                break;
            //CRITICAL SUCCESS (3)
            case 3:
                if (this.monster.plural) this.outputText("  You slip past " + this.monster.a + this.monster.short + "'s guard and press your lips against one of them.  " + this.monster.mf("He", "She") + " melts against you, " + this.monster.mf("his", "her") + " tongue sliding into your mouth as " + this.monster.mf("he", "she") + " quickly succumbs to the fiery, cock-swelling kiss.  It goes on for quite some time.  Once you're sure you've given a full dose to " + this.monster.mf("his", "her") + " mouth, you break back and observe your handwork.  One of " + this.monster.a + this.monster.short + " is still standing there, licking " + this.monster.mf("his", "her") + " his lips while " + this.monster.mf("his", "her") + " dick is standing out, iron hard.  You feel a little daring and give the swollen meat another moist peck, glossing the tip in gold.  There's no way " + this.monster.mf("he", "she") + " will go soft now.  Though you didn't drug the rest, they're probably a little 'heated up' from the show.\n\n", false);
                else this.outputText("  You slip past " + this.monster.a + this.monster.short + "'s guard and press your lips against " + this.monster.pronoun3 + ".  " + this.monster.mf("He", "She") + " melts against you, " + this.monster.pronoun3 + " tongue sliding into your mouth as " + this.monster.pronoun1 + " quickly succumbs to the fiery, cock-swelling kiss.  It goes on for quite some time.  Once you're sure you've given a full dose to " + this.monster.pronoun3 + " mouth, you break back and observe your handwork.  " + this.monster.capitalA + this.monster.short + " is still standing there, licking " + this.monster.pronoun3 + " lips while " + this.monster.pronoun3 + " dick is standing out, iron hard.  You feel a little daring and give the swollen meat another moist peck, glossing the tip in gold.  There's no way " + this.monster.pronoun1 + " will go soft now.\n\n", false);
                damage = 30;
                break;
            //Success 4:
            default:
                this.outputText("  With great effort, you slip through an opening and compress their lips against your own, lust seeping through the oral embrace along with a heavy dose of drugs.\n\n", false);
                damage = 12;
                break;
        }
        //Add status if not already drugged
        if (this.monster.findStatusAffect(StatusAffects.LustStick) < 0) this.monster.createStatusAffect(StatusAffects.LustStick, 0, 0, 0, 0);
        //Else add bonus to round damage
        else this.monster.addStatusValue(StatusAffects.LustStick, 2, Math.round(damage / 10));
        //Deal damage
        this.monster.lust += Math.round(this.monster.lustVuln * damage);
        //Sets up for end of combat, and if not, goes to AI.
        if (!this.combatRoundOver()) this.enemyAI();
    }
    public possess(): void {
        this.outputText("", true);
        if (this.monster.short == "plain girl" || this.monster.findPerk(PerkLib.Incorporeality) >= 0) {
            this.outputText("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself toward the opponent's frame.  Sadly, it was doomed to fail, as you bounce right off your foe's ghostly form.", false);
        }
        else if (this.monster instanceof LivingStatue) {
            this.outputText("There is nothing to possess inside the golem.");
        }
        //Sample possession text (>79 int, perhaps?):
        else if ((!this.monster.hasCock() && !this.monster.hasVagina()) || this.monster.lustVuln == 0 || this.monster.inte == 0 || this.monster.inte > 100) {
            this.outputText("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into the opponent's frame.  Unfortunately, it seems ", false);
            if (this.monster.inte > 100) this.outputText("they were FAR more mentally prepared than anything you can handle, and you're summarily thrown out of their body before you're even able to have fun with them.  Darn, you muse.\n\n", false);
            else this.outputText("they have a body that's incompatible with any kind of possession.\n\n", false);
        }
        //Success!
        else if (this.player.inte >= (this.monster.inte - 10) + this.rand(21)) {
            this.outputText("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into your opponent's frame. Before they can regain the initiative, you take control of one of their arms, vigorously masturbating for several seconds before you're finally thrown out. Recorporealizing, you notice your enemy's blush, and know your efforts were somewhat successful.\n\n", false);
            var damage: number = Math.round(this.player.inte / 5) + this.rand(this.player.level) + this.player.level;
            this.monster.lust += this.monster.lustVuln * damage;
        }
        //Fail
        else {
            this.outputText("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into the opponent's frame. Unfortunately, it seems they were more mentally prepared than you hoped, and you're summarily thrown out of their body before you're even able to have fun with them. Darn, you muse. Gotta get smarter.\n\n", false);
        }
        if (!this.combatRoundOver()) this.enemyAI();
    }

    public runAway(callHook: boolean = true): void {
        if (callHook && this.monster.onPcRunAttempt != undefined) {
            this.monster.onPcRunAttempt();
            return;
        }
        this.outputText("", true);
        if (this.inCombat && this.player.findStatusAffect(StatusAffects.Sealed) >= 0 && this.player.statusAffectv2(StatusAffects.Sealed) == 4) {
            this.clearOutput();
            this.outputText("You try to run, but you just can't seem to escape.  <b>Your ability to run was sealed, and now you've wasted a chance to attack!</b>\n\n");
            this.enemyAI();
            return;
        }
        //Rut doesnt let you run from dicks.
        if (this.player.inRut && this.monster.totalCocks() > 0) {
            this.outputText("The thought of another male in your area competing for all the pussy infuriates you!  No way will you run!", true);
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            this.menu();
            this.addButton(0, "Next", this.combatMenu, false);
            return;
        }
        if (this.monster.findStatusAffect(StatusAffects.Level) >= 0 && this.player.canFly()) {
            this.clearOutput();
            this.outputText("You flex the muscles in your back and, shaking clear of the sand, burst into the air!  Wasting no time you fly free of the sandtrap and its treacherous pit.  \"One day your wings will fall off, little ant,\" the snarling voice of the thwarted androgyne carries up to you as you make your escape.  \"And I will be waiting for you when they do!\"");
            this.inCombat = false;
            this.clearStatuses(false);
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        if (this.monster.findStatusAffect(StatusAffects.GenericRunDisabled) >= 0 || this.urtaQuest.isUrta()) {
            this.outputText("You can't escape from this fight!");
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            this.menu();
            this.addButton(0, "Next", this.combatMenu, false);
            return;
        }
        if (this.monster.findStatusAffect(StatusAffects.Level) >= 0 && this.monster.statusAffectv1(StatusAffects.Level) < 4) {
            this.outputText("You're too deeply mired to escape!  You'll have to <b>climb</b> some first!");
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            this.menu();
            this.addButton(0, "Next", this.combatMenu, false);
            return;
        }
        if (this.monster.findStatusAffect(StatusAffects.RunDisabled) >= 0) {
            this.outputText("You'd like to run, but you can't scale the walls of the pit with so many demonic hands pulling you down!");
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            this.menu();
            this.addButton(0, "Next", this.combatMenu, false);
            return;
        }
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00329] == 1 && (this.monster.short == "minotaur gang" || this.monster.short == "minotaur tribe")) {
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00329] = 0;
            //(Free run away) 
            this.outputText("You slink away while the pack of brutes is arguing.  Once they finish that argument, they'll be sorely disappointed!", true);
            this.inCombat = false;
            this.clearStatuses(false);
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        else if (this.monster.short == "minotaur tribe" && this.monster.HPRatio() >= 0.75) {
            this.outputText("There's too many of them surrounding you to run!", true);
            //Pass false to combatMenu instead:		menuLoc = 3;
            //		doNext(combatMenu);
            this.menu();
            this.addButton(0, "Next", this.combatMenu, false);
            return;
        }
        if (inDungeon || this.inRoomedDungeon) {
            this.outputText("You're trapped in your foe's home turf - there is nowhere to run!\n\n", true);
            this.enemyAI();
            return;
        }
        //Attempt texts!
        if (this.monster.short == "Ember") {
            this.outputText("You take off");
            if (!this.player.canFly()) this.outputText(" running");
            else this.outputText(", flapping as hard as you can");
            this.outputText(", and Ember, caught up in the moment, gives chase.  ");
        }
        else if (this.player.canFly()) this.outputText("Gritting your teeth with effort, you beat your wings quickly and lift off!  ", false);
        //Nonflying PCs
        else {
            //Stuck!
            if (this.player.findStatusAffect(StatusAffects.NoFlee) >= 0) {
                if (this.monster.short == "goblin") this.outputText("You try to flee but get stuck in the sticky white goop surrounding you.\n\n", true);
                else this.outputText("You put all your skills at running to work and make a supreme effort to escape, but are unable to get away!\n\n", true);
                this.enemyAI();
                return;
            }
            //Nonstuck!
            else this.outputText("You turn tail and attempt to flee!  ", false);
        }

        //Calculations
        var escapeMod: number = 20 + this.monster.level * 3;
        if (this.debug) escapeMod -= 300;
        if (this.player.canFly()) escapeMod -= 20;
        if (this.player.tailType == CoC.TAIL_TYPE_RACCOON && this.player.earType == CoC.EARS_RACCOON && this.player.findPerk(PerkLib.Runner) >= 0) escapeMod -= 25;

        //Big tits doesn't matter as much if ya can fly!
        else {
            if (this.player.biggestTitSize() >= 35) escapeMod += 5;
            if (this.player.biggestTitSize() >= 66) escapeMod += 10;
            if (this.player.hipRating >= 20) escapeMod += 5;
            if (this.player.buttRating >= 20) escapeMod += 5;
            if (this.player.ballSize >= 24 && this.player.balls > 0) escapeMod += 5;
            if (this.player.ballSize >= 48 && this.player.balls > 0) escapeMod += 10;
            if (this.player.ballSize >= 120 && this.player.balls > 0) escapeMod += 10;
        }
        //ANEMONE OVERRULES NORMAL RUN
        if (this.monster.short == "anemone") {
            //Autosuccess - less than 60 lust
            if (this.player.lust < 60) {
                this.outputText("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.", true);
                this.inCombat = false;
                this.clearStatuses(false);
                this.doNext(this.camp.returnToCampUseOneHour);
                return;
            }
            //Speed dependent
            else {
                //Success
                if (this.player.spe > this.rand(this.monster.spe + escapeMod)) {
                    this.inCombat = false;
                    this.clearStatuses(false);
                    this.outputText("Marshalling your thoughts, you frown at the strange girl and turn to march up the beach.  After twenty paces inshore you turn back to look at her again.  The anemone is clearly crestfallen by your departure, pouting heavily as she sinks beneath the water's surface.", true);
                    this.doNext(this.camp.returnToCampUseOneHour);
                    return;
                }
                //Run failed:
                else {
                    this.outputText("You try to shake off the fog and run but the anemone slinks over to you and her tentacles wrap around your waist.  <i>\"Stay?\"</i> she asks, pressing her small breasts into you as a tentacle slides inside your " + this.player.armorName + " and down to your nethers.  The combined stimulation of the rubbing and the tingling venom causes your knees to buckle, hampering your resolve and ending your escape attempt.", false);
                    //(gain lust, temp lose spd/str)
                    (this.monster as Anemone).applyVenom((4 + this.player.sens / 20));
                    this.combatRoundOver();
                    return;
                }
            }
        }
        //Ember is SPUCIAL
        if (this.monster.short == "Ember") {
            //GET AWAY
            if (this.player.spe > this.rand(this.monster.spe + escapeMod) || (this.player.findPerk(PerkLib.Runner) >= 0 && this.rand(100) < 50)) {
                if (this.player.findPerk(PerkLib.Runner) >= 0) this.outputText("Using your skill at running, y");
                else this.outputText("Y");
                this.outputText("ou easily outpace the dragon, who begins hurling imprecations at you.  \"What the hell, [name], you weenie; are you so scared that you can't even stick out your punishment?\"");
                this.outputText("\n\nNot to be outdone, you call back, \"Sucks to you!  If even the mighty Last Ember of Hope can't catch me, why do I need to train?  Later, little bird!\"");
                this.inCombat = false;
                this.clearStatuses(false);
                this.doNext(this.camp.returnToCampUseOneHour);
            }
            //Fail: 
            else {
                this.outputText("Despite some impressive jinking, " + this.emberScene.emberMF("he", "she") + " catches you, tackling you to the ground.\n\n");
                this.enemyAI();
            }
            return;
        }
        //SUCCESSFUL FLEE
        if (this.player.spe > this.rand(this.monster.spe + escapeMod)) {
            //Fliers flee!
            if (this.player.canFly()) this.outputText(this.monster.capitalA + this.monster.short + " can't catch you.", false);
            //sekrit benefit: if you have coon ears, coon tail, and Runner perk, change normal Runner escape to flight-type escape
            else if (this.player.tailType == CoC.TAIL_TYPE_RACCOON && this.player.earType == CoC.EARS_RACCOON && this.player.findPerk(PerkLib.Runner) >= 0) {
                this.outputText("Using your running skill, you build up a head of steam and jump, then spread your arms and flail your tail wildly; your opponent dogs you as best " + this.monster.pronoun1 + " can, but stops and stares dumbly as your spastic tail slowly propels you several meters into the air!  You leave " + this.monster.pronoun2 + " behind with your clumsy, jerky, short-range flight.");
            }
            //Non-fliers flee
            else this.outputText(this.monster.capitalA + this.monster.short + " rapidly disappears into the shifting landscape behind you.", false);
            if (this.monster.short == "Izma") {
                this.outputText("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.", false);
            }
            this.inCombat = false;
            this.clearStatuses(false);
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        //Runner perk chance
        else if (this.player.findPerk(PerkLib.Runner) >= 0 && this.rand(100) < 50) {
            this.inCombat = false;
            this.outputText("Thanks to your talent for running, you manage to escape.", false);
            if (this.monster.short == "Izma") {
                this.outputText("\n\nAs you leave the tigershark behind, her taunting voice rings out after you.  \"<i>Oooh, look at that fine backside!  Are you running or trying to entice me?  Haha, looks like we know who's the superior specimen now!  Remember: next time we meet, you owe me that ass!</i>\"  Your cheek tingles in shame at her catcalls.", false);
            }
            this.clearStatuses(false);
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        //FAIL FLEE
        else {
            if (this.monster.short == "Holli") {
                (this.monster as Holli).escapeFailWithHolli();
                return;
            }
            //Flyers get special failure message.
            if (this.player.canFly()) {
                if (this.monster.plural) this.outputText(this.monster.capitalA + this.monster.short + " manage to grab your " + this.player.legs() + " and drag you back to the ground before you can fly away!", false);
                else this.outputText(this.monster.capitalA + this.monster.short + " manages to grab your " + this.player.legs() + " and drag you back to the ground before you can fly away!", false);
            }
            //fail
            else if (this.player.tailType == CoC.TAIL_TYPE_RACCOON && this.player.earType == CoC.EARS_RACCOON && this.player.findPerk(PerkLib.Runner) >= 0) this.outputText("Using your running skill, you build up a head of steam and jump, but before you can clear the ground more than a foot, your opponent latches onto you and drags you back down with a thud!");
            //Nonflyer messages
            else {
                //Huge balls messages
                if (this.player.balls > 0 && this.player.ballSize >= 24) {
                    if (this.player.ballSize < 48) this.outputText("With your " + this.ballsDescriptLight() + " swinging ponderously beneath you, getting away is far harder than it should be.  ", false);
                    else this.outputText("With your " + this.ballsDescriptLight() + " dragging along the ground, getting away is far harder than it should be.  ", false);
                }
                //FATASS BODY MESSAGES
                if (this.player.biggestTitSize() >= 35 || this.player.buttRating >= 20 || this.player.hipRating >= 20) {
                    //FOR PLAYERS WITH GIANT BREASTS
                    if (this.player.biggestTitSize() >= 35 && this.player.biggestTitSize() < 66) {
                        if (this.player.hipRating >= 20) {
                            this.outputText("Your " + this.hipDescript() + " forces your gait to lurch slightly side to side, which causes the fat of your " + this.player.skinTone + " ", false);
                            if (this.player.buttRating >= 20) this.outputText(this.buttDescript() + " and ", false);
                            this.outputText(this.chestDesc() + " to wobble immensely, throwing you off balance and preventing you from moving quick enough to escape.", false);
                        }
                        else if (this.player.buttRating >= 20) this.outputText("Your " + this.player.skinTone + this.buttDescript() + " and " + this.chestDesc() + " wobble and bounce heavily, throwing you off balance and preventing you from moving quick enough to escape.", false);
                        else this.outputText("Your " + this.chestDesc() + " jiggle and wobble side to side like the " + this.player.skinTone + " sacks of milky fat they are, with such force as to constantly throw you off balance, preventing you from moving quick enough to escape.", false);
                    }
                    //FOR PLAYERS WITH MASSIVE BREASTS
                    else if (this.player.biggestTitSize() >= 66) {
                        if (this.player.hipRating >= 20) {
                            this.outputText("Your " + this.chestDesc() + " nearly drag along the ground while your " + this.hipDescript() + " swing side to side ", false);
                            if (this.player.buttRating >= 20) this.outputText("causing the fat of your " + this.player.skinTone + this.buttDescript() + " to wobble heavily, ", false);
                            this.outputText("forcing your body off balance and preventing you from moving quick enough to get escape.", false);
                        }
                        else if (this.player.buttRating >= 20) this.outputText("Your " + this.chestDesc() + " nearly drag along the ground while the fat of your " + this.player.skinTone + this.buttDescript() + " wobbles heavily from side to side, forcing your body off balance and preventing you from moving quick enough to escape.", false);
                        else this.outputText("Your " + this.chestDesc() + " nearly drag along the ground, preventing you from moving quick enough to get escape.", false);
                    }
                    //FOR PLAYERS WITH EITHER GIANT HIPS OR BUTT BUT NOT THE BREASTS
                    else if (this.player.hipRating >= 20) {
                        this.outputText("Your " + this.hipDescript() + " swing heavily from side to side ", false);
                        if (this.player.buttRating >= 20) this.outputText("causing your " + this.player.skinTone + this.buttDescript() + " to wobble obscenely ", false);
                        this.outputText("and forcing your body into an awkward gait that slows you down, preventing you from escaping.", false);
                    }
                    //JUST DA BOOTAH
                    else if (this.player.buttRating >= 20) this.outputText("Your " + this.player.skinTone + this.buttDescript() + " wobbles so heavily that you're unable to move quick enough to escape.", false);
                }
                //NORMAL RUN FAIL MESSAGES
                else if (this.monster.plural) this.outputText(this.monster.capitalA + this.monster.short + " stay hot on your heels, denying you a chance at escape!", false);
                else this.outputText(this.monster.capitalA + this.monster.short + " stays hot on your heels, denying you a chance at escape!", false);
            }
        }
        this.outputText("\n\n", false);
        this.enemyAI();
    }

    public anemoneSting(): void {
        this.outputText("", true);
        //-sting with hair (combines both bee-sting effects, but weaker than either one separately):
        //Fail!
        //25% base fail chance
        //Increased by 1% for every point over PC's speed
        //Decreased by 1% for every inch of hair the PC has
        var prob: number = 70;
        if (this.monster.spe > this.player.spe) prob -= this.monster.spe - this.player.spe;
        prob += this.player.hairLength;
        if (prob <= this.rand(101)) {
            //-miss a sting
            if (this.monster.plural) this.outputText("You rush " + this.monster.a + this.monster.short + ", whipping your hair around to catch them with your tentacles, but " + this.monster.pronoun1 + " easily dodge.  Oy, you hope you didn't just give yourself whiplash.", false);
            else this.outputText("You rush " + this.monster.a + this.monster.short + ", whipping your hair around to catch it with your tentacles, but " + this.monster.pronoun1 + " easily dodges.  Oy, you hope you didn't just give yourself whiplash.", false);
        }
        //Success!
        else {
            this.outputText("You rush " + this.monster.a + this.monster.short + ", whipping your hair around like a genie", false);
            this.outputText(", and manage to land a few swipes with your tentacles.  ", false);
            if (this.monster.plural) this.outputText("As the venom infiltrates " + this.monster.pronoun3 + " bodies, " + this.monster.pronoun1 + " twitch and begin to move more slowly, hampered half by paralysis and half by arousal.", false);
            else this.outputText("As the venom infiltrates " + this.monster.pronoun3 + " body, " + this.monster.pronoun1 + " twitches and begins to move more slowly, hampered half by paralysis and half by arousal.", false);
            //(decrease speed/str, increase lust)
            //-venom capacity determined by hair length, 2-3 stings per level of length
            //Each sting does 5-10 lust damage and 2.5-5 speed damage
            var damage: number = 0;
            temp = 1 + this.rand(2);
            if (this.player.hairLength >= 12) temp += 1 + this.rand(2);
            if (this.player.hairLength >= 24) temp += 1 + this.rand(2);
            if (this.player.hairLength >= 36) temp += 1;
            while (temp > 0) {
                temp--;
                damage += 5 + this.rand(6);
            }
            damage += this.player.level * 1.5;
            this.monster.spe -= damage / 2;
            damage = this.monster.lustVuln * damage;
            this.monster.lust += damage;
            //Clean up down to 1 decimal point
            damage = Math.round(damage * 10) / 10;
            this.outputText(" (" + damage + ")", false);
        }
        //New lines and moving on!
        this.outputText("\n\n", false);
        this.doNext(this.combatMenu);
        if (!this.combatRoundOver()) this.enemyAI();
    }

    public magicalSpecials(): void {
        if (this.inCombat && this.player.findStatusAffect(StatusAffects.Sealed) >= 0 && this.player.statusAffectv2(StatusAffects.Sealed) == 6) {
            this.clearOutput();
            this.outputText("You try to ready a special ability, but wind up stumbling dizzily instead.  <b>Your ability to use magical special attacks was sealed, and now you've wasted a chance to attack!</b>\n\n");
            this.enemyAI();
            return;
        }
        //Pass false to combatMenu instead:	menuLoc = 3;
        this.menu();

        //Berserk
        if (this.player.findPerk(PerkLib.Berzerker) >= 0) {
            this.addButton(0, "Berzerk", this.berzerk);
        }
        if (this.player.findPerk(PerkLib.Dragonfire) >= 0) {
            this.addButton(1, "DragonFire", this.dragonBreath);
        }
        if (this.player.findPerk(PerkLib.FireLord) >= 0) {
            this.addButton(2, "Fire Breath", this.fireballuuuuu);
        }
        if (this.player.findPerk(PerkLib.Hellfire) >= 0) {
            this.addButton(3, "Hellfire", this.hellFire);
        }
        //Possess ability.
        if (this.player.findPerk(PerkLib.Incorporeality) >= 0) {
            this.addButton(4, "Possess", this.possess);
        }
        if (this.player.findPerk(PerkLib.Whispered) >= 0) {
            this.addButton(5, "Whisper", this.superWhisperAttack);
        }
        if (this.player.findPerk(PerkLib.CorruptedNinetails) >= 0) {
            this.addButton(6, "C.FoxFire", this.corruptedFoxFire);
            this.addButton(7, "Terror", this.kitsuneTerror);
        }
        if (this.player.findPerk(PerkLib.EnlightenedNinetails) >= 0) {
            this.addButton(6, "FoxFire", this.foxFire);
            this.addButton(7, "Illusion", this.kitsuneIllusion);
        }
        if (this.player.findStatusAffect(StatusAffects.ShieldingSpell) >= 0) this.addButton(8, "Shielding", this.shieldingSpell);
        if (this.player.findStatusAffect(StatusAffects.ImmolationSpell) >= 0) this.addButton(8, "Immolation", this.immolationSpell);
        this.addButton(9, "Back", this.combatMenu, false);
    }

    public physicalSpecials(): void {
        if (this.urtaQuest.isUrta()) {
            this.urtaQuest.urtaSpecials();
            return;
        }
        //Pass false to combatMenu instead:	menuLoc = 3;
        if (this.inCombat && this.player.findStatusAffect(StatusAffects.Sealed) >= 0 && this.player.statusAffectv2(StatusAffects.Sealed) == 5) {
            this.clearOutput();
            this.outputText("You try to ready a special attack, but wind up stumbling dizzily instead.  <b>Your ability to use physical special attacks was sealed, and now you've wasted a chance to attack!</b>\n\n");
            this.enemyAI();
            return;
        }
        this.menu();
        if (this.player.hairType == 4) {
            this.addButton(0, "AnemoneSting", this.anemoneSting);
        }
        //Bitez
        if (this.player.faceType == CoC.FACE_SHARK_TEETH) {
            this.addButton(1, "Bite", this.bite);
        }
        else if (this.player.faceType == CoC.FACE_SNAKE_FANGS) {
            this.addButton(1, "Bite", this.nagaBiteAttack);
        }
        else if (this.player.faceType == CoC.FACE_SPIDER_FANGS) {
            this.addButton(1, "Bite", this.spiderBiteAttack);
        }
        //Bow attack
        if (this.player.hasKeyItem("Bow") >= 0) {
            this.addButton(2, "Bow", this.fireBow);
        }
        //Constrict
        if (this.player.lowerBody == CoC.LOWER_BODY_TYPE_NAGA) {
            this.addButton(3, "Constrict", this.desert.nagaScene.nagaPlayerConstrict);
        }
        //Kick attackuuuu
        else if (this.player.isTaur() || this.player.lowerBody == CoC.LOWER_BODY_TYPE_HOOFED || this.player.lowerBody == CoC.LOWER_BODY_TYPE_BUNNY || this.player.lowerBody == CoC.LOWER_BODY_TYPE_KANGAROO) {
            this.addButton(3, "Kick", this.kick);
        }
        //Gore if mino horns
        if (this.player.hornType == CoC.HORNS_COW_MINOTAUR && this.player.horns >= 6) {
            this.addButton(4, "Gore", this.goreAttack);
        }
        //Infest if infested
        if (this.player.findStatusAffect(StatusAffects.Infested) >= 0 && this.player.statusAffectv1(StatusAffects.Infested) == 5 && this.player.hasCock()) {
            this.addButton(5, "Infest", playerInfest);
        }
        //Kiss supercedes bite.
        if (this.player.findStatusAffect(StatusAffects.LustStickApplied) >= 0) {
            this.addButton(6, "Kiss", this.kissAttack);
        }
        switch (this.player.tailType) {
            case CoC.TAIL_TYPE_BEE_ABDOMEN:
                this.addButton(7, "Sting", this.playerStinger);
                break;
            case CoC.TAIL_TYPE_SPIDER_ADBOMEN:
                this.addButton(7, "Web", this.PCWebAttack);
                break;
            case CoC.TAIL_TYPE_SHARK:
            case CoC.TAIL_TYPE_LIZARD:
            case CoC.TAIL_TYPE_KANGAROO:
            case CoC.TAIL_TYPE_DRACONIC:
            case CoC.TAIL_TYPE_RACCOON:
                this.addButton(7, "Tail Whip", this.tailWhipAttack);
            default:
        }
        this.addButton(9, "Back", this.combatMenu, false);
    }

    public berzerk(): void {
        this.clearOutput();
        if (this.player.findStatusAffect(StatusAffects.Berzerking) >= 0) {
            this.outputText("You're already pretty goddamn mad!", true);
            this.doNext(this.magicalSpecials);
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.outputText("You roar and unleash your savage fury, forgetting about defense in order to destroy your foe!\n\n", true);
        this.player.createStatusAffect(StatusAffects.Berzerking, 0, 0, 0, 0);
        this.enemyAI();
    }

    //Corrupted Fox Fire
    public corruptedFoxFire(): void {
        this.clearOutput();
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(35) > 100) {
            this.outputText("You are too tired to use this ability.", true);
            this.doNext(this.magicalSpecials);
            return;
        }
        if (this.player.findStatusAffect(StatusAffects.ThroatPunch) >= 0 || this.player.findStatusAffect(StatusAffects.WebSilence) >= 0) {
            this.outputText("You cannot focus to use this ability while you're having so much difficult breathing.", true);
            this.doNext(this.magicalSpecials);
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(35, 1);
        //Deals direct damage and lust regardless of enemy defenses.  Especially effective against non-corrupted targets.
        this.outputText("Holding out your palm, you conjure corrupted purple flame that dances across your fingertips.  You launch it at " + this.monster.a + this.monster.short + " with a ferocious throw, and it bursts on impact, showering dazzling lavender sparks everywhere.");

        var dmg: number = Math.floor(10 + (this.player.inte / 3 + this.rand(this.player.inte / 2)) * this.spellMod());
        if (this.monster.cor >= 66) dmg = Math.round(dmg * .66);
        else if (this.monster.cor >= 50) dmg = Math.round(dmg * .8);
        //High damage to goes.
        if (this.monster.short == "goo-girl") temp = Math.round(temp * 1.5);
        //Using fire attacks on the goo]
        if (this.monster.short == "goo-girl") {
            this.outputText("  Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + this.monster.skinTone + " skin has lost some of its shimmer.", false);
            if (this.monster.findPerk(PerkLib.Acid) < 0) this.monster.createPerk(PerkLib.Acid, 0, 0, 0, 0);
        }
        dmg = this.doDamage(dmg);
        this.outputText("  (" + dmg + ")\n\n", false);
        this.statScreenRefresh();
        if (this.monster.HP < 1) this.doNext(this.endHpVictory);
        else this.enemyAI();
    }
    //Fox Fire
    public foxFire(): void {
        this.clearOutput();
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(35) > 100) {
            this.outputText("You are too tired to use this ability.", true);
            this.doNext(this.magicalSpecials);
            return;
        }
        if (this.player.findStatusAffect(StatusAffects.ThroatPunch) >= 0 || this.player.findStatusAffect(StatusAffects.WebSilence) >= 0) {
            this.outputText("You cannot focus to use this ability while you're having so much difficult breathing.", true);
            this.doNext(this.magicalSpecials);
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(35, 1);
        if (this.monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            this.outputText("As soon as your magic touches the multicolored shell around " + this.monster.a + this.monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            this.enemyAI();
            return;
        }
        //Deals direct damage and lust regardless of enemy defenses.  Especially effective against corrupted targets.
        this.outputText("Holding out your palm, you conjure an ethereal blue flame that dances across your fingertips.  You launch it at " + this.monster.a + this.monster.short + " with a ferocious throw, and it bursts on impact, showering dazzling azure sparks everywhere.");
        var dmg: number = Math.floor(10 + (this.player.inte / 3 + this.rand(this.player.inte / 2)) * this.spellMod());
        if (this.monster.cor < 33) dmg = Math.round(dmg * .66);
        else if (this.monster.cor < 50) dmg = Math.round(dmg * .8);
        //High damage to goes.
        if (this.monster.short == "goo-girl") temp = Math.round(temp * 1.5);
        //Using fire attacks on the goo]
        if (this.monster.short == "goo-girl") {
            this.outputText("  Your flames lick the girl's body and she opens her mouth in pained protest as you evaporate much of her moisture. When the fire passes, she seems a bit smaller and her slimy " + this.monster.skinTone + " skin has lost some of its shimmer.", false);
            if (this.monster.findPerk(PerkLib.Acid) < 0) this.monster.createPerk(PerkLib.Acid, 0, 0, 0, 0);
        }
        dmg = this.doDamage(dmg);
        this.outputText("  (" + dmg + ")\n\n", false);
        this.statScreenRefresh();
        if (this.monster.HP < 1) this.doNext(this.endHpVictory);
        else this.enemyAI();
    }

    //Terror
    public kitsuneTerror(): void {
        this.clearOutput();
        //Fatigue Cost: 25
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(20) > 100) {
            this.outputText("You are too tired to use this ability.", true);
            this.doNext(this.magicalSpecials);
            return;
        }
        if (this.monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            this.outputText("As soon as your magic touches the multicolored shell around " + this.monster.a + this.monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            this.enemyAI();
            return;
        }
        if (this.player.findStatusAffect(StatusAffects.ThroatPunch) >= 0 || this.player.findStatusAffect(StatusAffects.WebSilence) >= 0) {
            this.outputText("You cannot focus to reach the enemy's mind while you're having so much difficult breathing.", true);
            this.doNext(this.magicalSpecials);
            return;
        }
        if (this.monster.short == "pod" || this.monster.inte == 0) {
            this.outputText("You reach for the enemy's mind, but cannot find anything.  You frantically search around, but there is no consciousness as you know it in the room.\n\n", true);
            this.changeFatigue(1);
            this.enemyAI();
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(20, 1);
        //Inflicts fear and reduces enemy SPD.
        this.outputText("The world goes dark, an inky shadow blanketing everything in sight as you fill " + this.monster.a + this.monster.short + "'s mind with visions of otherworldly terror that defy description.");
        //(succeed)
        if (this.player.inte / 10 + this.rand(20) + 1 > this.monster.inte / 10 + 10) {
            this.outputText("  They cower in horror as they succumb to your illusion, believing themselves beset by eldritch horrors beyond their wildest nightmares.\n\n");
            this.monster.createStatusAffect(StatusAffects.Fear, 1, 0, 0, 0);
            this.monster.spe -= 5;
            if (this.monster.spe < 1) this.monster.spe = 1;
        }
        else this.outputText("  The dark fog recedes as quickly as it rolled in as they push back your illusions, resisting your hypnotic influence.\n\n");
        this.enemyAI();
    }

    //Illusion
    public kitsuneIllusion(): void {
        this.clearOutput();
        //Fatigue Cost: 25
        if (this.player.findPerk(PerkLib.BloodMage) < 0 && this.player.fatigue + this.spellCost(25) > 100) {
            this.outputText("You are too tired to use this ability.", true);
            this.doNext(this.magicalSpecials);
            return;
        }
        if (this.player.findStatusAffect(StatusAffects.ThroatPunch) >= 0 || this.player.findStatusAffect(StatusAffects.WebSilence) >= 0) {
            this.outputText("You cannot focus to use this ability while you're having so much difficult breathing.", true);
            this.doNext(this.magicalSpecials);
            return;
        }
        if (this.monster.short == "pod" || this.monster.inte == 0) {
            this.outputText("In the tight confines of this pod, there's no use making such an attack!\n\n", true);
            this.changeFatigue(1);
            this.enemyAI();
            return;
        }
        //This is now automatic - newRound arg defaults to true:	menuLoc = 0;
        this.fatigue(25, 1);
        if (this.monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            this.outputText("As soon as your magic touches the multicolored shell around " + this.monster.a + this.monster.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            this.enemyAI();
            return;
        }
        //Decrease enemy speed and increase their susceptibility to lust attacks if already 110% or more
        this.outputText("The world begins to twist and distort around you as reality bends to your will, " + this.monster.a + this.monster.short + "'s mind blanketed in the thick fog of your illusions.");
        //Check for success rate. Maximum 100% with over 90 Intelligence difference between PC and monster.
        if (this.player.inte / 10 + this.rand(20) > this.monster.inte / 10 + 9) {
            //Reduce speed down to -20. Um, are there many monsters with 110% lust vulnerability?
            this.outputText("  They stumble humorously to and fro, unable to keep pace with the shifting illusions that cloud their perceptions.\n\n");
            if (this.monster.spe >= 0) this.monster.spe -= 20;
            if (this.monster.lustVuln >= 1.1) this.monster.lustVuln += .1;
        }
        else this.outputText("  Like the snapping of a rubber band, reality falls back into its rightful place as they resist your illusory conjurations.\n\n");
        this.enemyAI();
    }

    //special attack: tail whip? could unlock button for use by dagrons too
    //tiny damage and lower monster armor by ~75% for one turn
    //hit
    public tailWhipAttack(): void {
        this.clearOutput();
        //miss
        if ((this.player.findStatusAffect(StatusAffects.Blind) >= 0 && this.rand(2) == 0) || (this.monster.spe - this.player.spe > 0 && Math.floor(Math.random() * (((this.monster.spe - this.player.spe) / 4) + 80)) > 80)) {
            this.outputText("Twirling like a top, you swing your tail, but connect with only empty air.");
        }
        else {
            if (!this.monster.plural) this.outputText("Twirling like a top, you bat your opponent with your tail.  For a moment, " + this.monster.pronoun1 + " looks disbelieving, as if " + this.monster.pronoun3 + " world turned upside down, but " + this.monster.pronoun1 + " soon becomes irate and redoubles " + this.monster.pronoun3 + " offense, leaving large holes in " + this.monster.pronoun3 + " guard.  If you're going to take advantage, it had better be right away; " + this.monster.pronoun1 + "'ll probably cool off very quickly.");
            else this.outputText("Twirling like a top, you bat your opponent with your tail.  For a moment, " + this.monster.pronoun1 + " look disbelieving, as if " + this.monster.pronoun3 + " world turned upside down, but " + this.monster.pronoun1 + " soon become irate and redouble " + this.monster.pronoun3 + " offense, leaving large holes in " + this.monster.pronoun3 + " guard.  If you're going to take advantage, it had better be right away; " + this.monster.pronoun1 + "'ll probably cool off very quickly.");
            if (this.monster.findStatusAffect(StatusAffects.CoonWhip) < 0) this.monster.createStatusAffect(StatusAffects.CoonWhip, 0, 0, 0, 0);
            temp = Math.round(this.monster.armorDef * .75);
            while (temp > 0 && this.monster.armorDef >= 1) {
                this.monster.armorDef--;
                this.monster.addStatusValue(StatusAffects.CoonWhip, 1, 1);
                temp--;
            }
            this.monster.addStatusValue(StatusAffects.CoonWhip, 2, 2);
            if (this.player.tailType == CoC.TAIL_TYPE_RACCOON) this.monster.addStatusValue(StatusAffects.CoonWhip, 2, 2);
        }
        this.outputText("\n\n");
        this.enemyAI();
    }

    //Arian's stuff
    //Using the Talisman in combat
    public immolationSpell(): void {
        this.clearOutput();
        this.outputText("You gather energy in your Talisman and unleash the spell contained within.  A wave of burning flames gathers around " + this.monster.a + this.monster.short + ", slowly burning " + this.monster.pronoun2 + ".");
        var temp: number = Math.floor(75 + (this.player.inte / 3 + this.rand(this.player.inte / 2)) * this.spellMod());
        temp = this.doDamage(temp);
        this.outputText(" (" + temp + ")\n\n");
        this.player.removeStatusAffect(StatusAffects.ImmolationSpell);
        this.arianScene.clearTalisman();
        this.enemyAI();
    }

    public shieldingSpell(): void {
        this.clearOutput();
        this.outputText("You gather energy in your Talisman and unleash the spell contained within.  A barrier of light engulfs you, before turning completely transparent.  Your defense has been increased.\n\n");
        this.player.createStatusAffect(StatusAffects.Shielding, 0, 0, 0, 0);
        this.player.removeStatusAffect(StatusAffects.ShieldingSpell);
        this.arianScene.clearTalisman();
        this.enemyAI();
    }

    // include "../../includes/eventParser.as";


    //Used to jump the fuck out of pregnancy scenarios for menus.
    //const EVENT_PARSER_ESCAPE: number = 800;
    //const PHYLLA_GEMS_HUNTED_TODAY: number = 893;

    public playerMenu(): void {
        if (!this.inCombat) this.spriteSelect(- 1);
        this.mainView.setMenuButton(MainView.MENU_NEW_MAIN, "New Game", this.charCreation.newGameGo);
        this.mainView.nameBox.visible = false;
        if (this.gameState == 1 || this.gameState == 2) {
            this.combatMenu();
            return;
        }
        //Clear restriction on item overlaps if not in combat
        this.plotFight = false;
        if (inDungeon) {
            dungeonMenu();
            return;
        }
        else if (this.inRoomedDungeon) {
            if (this.inRoomedDungeonResume != undefined) this.inRoomedDungeonResume();
            return;
        }
        this.flags[kFLAGS.PLAYER_PREGGO_WITH_WORMS] = 0;
        CoC.doCamp();
    }

    /* All calls replaced by calls to playerMenu
    public  eventParser(eventNo): void {
        //Clear banked buttons
    
        //trace("EVENT CODE: " + eventNo);
        if (eventNo is Function)
        {
            eventNo();
        }
        else if (eventNo is int)
        {
            //trace("Numeric eventNo "+eventNo+" replace it with function");
            //Clear sprite if not in combat
            if (!inCombat && eventNo != cleanupAfterCombat) spriteSelect(-1);
            //Clear pic if not in combat
            //if(!inCombat() && eventNo != cleanupAfterCombat) clearImages();
            //Reset newgame buttons till back at camp
            mainView.setMenuButton( MainView.MENU_NEW_MAIN, "New Game", charCreation.newGameGo );
            if (eventNo != 1) {
                hideMenus();
            }
    */
    /* Replaced by calls to gameOver()
    if (eventNo == 9999) // Game over event; overriding whatever the fuck has been done to the UI up to this point to force display of the data and new game buttons
    {
        mainView.showMenuButton( MainView.MENU_NEW_MAIN );
        mainView.showMenuButton( MainView.MENU_DATA );
        mainView.hideMenuButton( MainView.MENU_APPEARANCE );
        mainView.hideMenuButton( MainView.MENU_LEVEL );
        mainView.hideMenuButton( MainView.MENU_PERKS );
    }
    */
    /*if(eventNo == 1000 && gameState == 1 && menuLoc == 1) {
        menuLoc = 0;
        outputText("\n\n", false);
        if(!combatRoundOver()) enemyAI();
        else outputText(monster.capitalA + monster.short + " is defeated!");
        return;
    }*/

    /*
            if(eventNo < 1000) doSystem(eventNo);
            if(eventNo >=1000 && eventNo < 2000) errorPrint(eventNo); //No events should be in this range anymore. Previously called inventory.doItems(eventNo);
            if(eventNo >=2000 && eventNo < 5000) errorPrint(eventNo); //No events should be in this range anymore. Previously called doEvent(eventNo);
            if(eventNo >=5000 && eventNo < 7000) errorPrint(eventNo); //No events should be in this range anymore. Previously called doCombat(eventNo);
            if(eventNo >= 10000 && eventNo < 10999) errorPrint(eventNo); //No events should be in this range anymore. Previously called charCreation.doCreation(eventNo);
            if(eventNo >= 11000) errorPrint(eventNo); //No events should be in this range anymore. Previously called doDungeon(eventNo);
        }
    
        else
        {
            errorPrint(eventNo);		// Dump the system state to the window so the player can file a decent bug-report
        }
    }
    */

    public gameOver(clear: boolean = false): void { //Leaves text on screen unless clear is set to true
        if (this.testingBlockExiting) {
            this.doNext(this.camp.returnToCampUseOneHour); //Prevent ChaosMonkah instances from getting stuck
        }
        else {
            if (clear) this.clearOutput();
            this.outputText("\n\n<b>GAME OVER</b>");
            this.menu();
            this.addButton(0, "Game Over", this.gameOverMenuOverride);
            this.addButton(3, "NewGamePlus", this.charCreation.newGamePlus);
            if (this.flags[kFLAGS.EASY_MODE_ENABLE_FLAG] == 1 || this.debug) this.addButton(4, "Debug Cheat", this.playerMenu);
            this.gameOverMenuOverride();

        }
        this.inCombat = false;
        this.dungeonLoc = 0; //Replaces inDungeon = false;
    }

    private gameOverMenuOverride(): void { //Game over event; override whatever the fuck has been done to the UI up to this point to force display of the data and new game buttons
        this.mainView.showMenuButton(MainView.MENU_NEW_MAIN);
        this.mainView.showMenuButton(MainView.MENU_DATA);
        this.mainView.hideMenuButton(MainView.MENU_APPEARANCE);
        this.mainView.hideMenuButton(MainView.MENU_LEVEL);
        this.mainView.hideMenuButton(MainView.MENU_PERKS);
    }

    /*
    public  doSystem(eventNo: number): void {
        //@ camp
        //(clear data/appearance buttons if not at camp
        //trace("System Event", eventNo)
    
        if(eventNo != 1)
        {
            hideMenus();
        }
        switch (eventNo) {
            case 1:
                mainView.nameBox.visible = false;
                if (gameState == 1 || gameState == 2) {
    //This is now automatic - newRound arg defaults to true				menuLoc = 0;
                    combatMenu();
                    return;
                }
                //Clear restriction on item overlaps if not in combat
                plotFight = false;
                if (inDungeon) {
    //This is now automatic - newRound arg defaults to true				menuLoc = 0;
                    dungeonMenu();
                    return;
                }
                else if (inRoomedDungeon)
                {
    //This is now automatic - newRound arg defaults to true				menuLoc = 0;
                    if (inRoomedDungeonResume != undefined) inRoomedDungeonResume();
                    return;
                }
    //This is now automatic - newRound arg defaults to true			menuLoc = 0;
                flags[kFLAGS.PLAYER_PREGGO_WITH_WORMS] = 0;
                camp.doCamp();
                return;
    
    /* Now called directly
            case 2:
                exploration.doExplore();
                return;
    
    
            case 3:
                desert.exploreDesert();
                return;
    
    
            case 4:
                forest.exploreForest();
                return;
    
    
            case 5:
                lake.exploreLake();
                return;
    
    
            case 6:
                mountain.exploreMountain();
                return;
    
    
            case 10:
                masturbateGo(); //Masturbate
                return;
    
            case 11:
                //Rest
                camp.rest();
                return;
    
    
            case 12:
                //Explore new zones
                exploration.tryDiscover();
                return;
    */

    //		case 13:
    //			camp.returnToCampUseOneHour();
    /*			//Pass an hour
                outputText("An hour passes...\n", true);
                timeQ = 1;
                goNext(1, false); */
    //			return;


    //		case 14:
    //			camp.returnToCampUseTwoHours();
    /*			outputText("Two hours pass...\n", true);
                timeQ = 2;
                goNext(2, false); */
    //			return;


    //		case 15:
    //			camp.returnToCampUseFourHours();
    /*			outputText("Four hours pass...\n", true);
                timeQ = 4;
                goNext(4, false); */
    //			return;


    //		case 16:
    //			camp.returnToCampUseEightHours();
    /*			outputText("Eight hours pass...\n", true);
                timeQ = 8;
                goNext(8, false); */
    /*			return;
    
    
            case 17:
                outputText("", true);
                goNext(24, false);
                return;
    */

    /* Now called directly
            case 19:
                //Load menu
                saves.loadScreen();
                return;
    
    
            case 20:
                //Save Menu
                saves.saveScreen();
                return;
    
    
            case -20:
                saves.saveGameObject(undefined, true);
                return;
    
    
            case -21:
                saves.openSave();
                showStats();
                statScreenRefresh();
                return;
    
    
            case 30:
                //Was used in the save system to return to the menu // I have NO idea what could call this. I don't see anything that passes 30 as an event number anywhere
            var  f:MouseEvent;
                saves.saveLoad(f);
                return;
    
    
            case 40:
                //Use wait command
                //See camp.as
                camp.doWait();
                return;
    
    
            case 41:
                //Use sleep command
                //in camp.as
                camp.doSleep();
                return;
    
    
            case 42:
                //Choose masturbate options
                masturbateMenu();
                return;
    
    
            case 44:
                //Gain +5 Str due to level
                dynStats("str", 5);
                outputText("Your muscles feel significantly stronger from your time adventuring.", true);
                doNext(perkBuyMenu);
                return;
    
    
            case 45:
                //Gain +5 Toughness due to level
                dynStats("tou", 5);
                trace("HP: " + player.HP + " MAX HP: " + maxHP());
                statScreenRefresh();
                outputText("You feel tougher from all the fights you have endured.", true);
                doNext(perkBuyMenu);
                return;
    
    
            case 46:
                //Gain +5 Intelligence due to level
                dynStats("int", 5);
                outputText("Your time spent fighting the creatures of this realm has sharpened your wit.", true);
                doNext(perkBuyMenu);
                return;
    
    
            case 47:
                //Gain +5 speed due to level
                dynStats("spe", 5);
                outputText("Your time in combat has driven you to move faster.", true);
                doNext(perkBuyMenu);
                return;
    
    
            case 48:
                //Use Onahole
                onaholeUse();
                return;
    
    
            case 49:
                //Use Stimbelt
                stimBeltUse();
                return;
    
    
            case 50:
                deluxeOnaholeUse();
                return;
    
    
            case 51:
                allNaturalOnaholeUse();
                return;
    
    
            case 52:
                allNaturalStimBeltUse();
                return;
    
    
            case 65:
                //turn on/off autosave
            var  e:MouseEvent;
                player.autoSave = !player.autoSave;
                saves.saveLoad(e);
                return;
    
    
            case 71:
                //Places menu
                camp.places(true);
                return;
    
    
            case 74:
                //Camp followers screen
                doNext(1);
                camp.campFollowers();
                return;
    
    
            case 79:
                deluxeDildo();
                return;
    
    
            case 80:
                forest.exploreDeepwoods();
                return;
    
    
            case 82:
                saves.deleteScreen();
                return;
    
    
            case 94:
                exploration.debugOptions();
                return;
    
    
            case 95:
                highMountains.exploreHighMountain();
                return;
    
    
            case 97:
                plains.explorePlains();
                return;
    
    
            case 111:
                swamp.exploreSwamp();
                return;
    */
    /* Both moved to engineCore alongside the other perk selection code
            case 114:
                stage.focus = undefined;
                //mainView.aCb.visible = false;
                if (mainView.aCb.parent != undefined)
                {
                    mainView.removeChild(mainView.aCb);
                    applyPerk(tempPerk);
                }
                return;
    
            case 115:
                stage.focus = undefined;
                //mainView.aCb.visible = false;
                if (mainView.aCb.parent != undefined)
                {
                    mainView.removeChild(mainView.aCb);
                    eventParser(1);
                }
                return;
    */
    /* Now called directly
            case 116:
                perkBuyMenu();
                return;
    */
    /* Were never called
            case 118:
                if (!monster.hasVagina()) monster.createVagina();
                monster.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_GAPING;
                monster.ass.analLooseness = 3;
                outputText(mainView.eventTestInput.text, true, true);
                simpleChoices("Again", 117, "", 0, "", 0, "", 0, "Quit", mainMenu);
                mainView.eventTestInput.x = -10207.5;
                mainView.eventTestInput.y = -1055.1;
                return;
    
    
            case 119:
                mainView.eventTestInput.x = -10207.5;
                mainView.eventTestInput.y = -1055.1;
                mainMenu();
                return;
    */
    /*	}
    
        errorPrint(eventNo);		// Dump the system state to the window so the player can file a decent bug-report
    }
    */

    public getCurrentStackTrace(): string		// Fuck, stack-traces only work in the debug player.
    {
        var tempError: Error = new Error();
        var stackTrace: string = tempError.getStackTrace();
        return stackTrace;
    }

    public errorPrint(details: any = undefined): void {
        this.rawOutputText("<b>Congratulations, you've found a bug!</b>", true);
        this.rawOutputText("\nError: Unknown event!");
        this.rawOutputText("\n\nPlease report that you had an issue with code: \"" + details + "\" ");
        this.rawOutputText("\nGame version: \"" + this.ver + "\" (<b>THIS IS IMPORTANT! Please be sure you include it!</b>) ");

        var sTrace: string = this.getCurrentStackTrace();

        if (sTrace)	// Fuck, stack-traces only work in the debug player.
            this.rawOutputText("and stack-trace: \n <pre>" + sTrace + "</pre>\n");
        this.rawOutputText("to fake-name on the forums or better yet, file a bug report on github: ");
        this.rawOutputText("\nhttps://github.com/herp-a-derp/Corruption-of-Champions");

        this.rawOutputText("\nPlease try to include the details of what you were doing when you encountered this bug ");
        if (sTrace)
            this.rawOutputText(" (including the above stack trace copy&pasted into the details),");
        this.rawOutputText(" to make tracking the issue down easier. Thanks!");

        this.doNext(this.camp.returnToCampUseOneHour);
    }

    //Argument is time passed.  Pass to event parser if nothing happens.
    // The time argument is never actually used atm, everything is done with timeQ instead...
    public goNext(time: number, needNext: boolean): boolean {
        //Update system time
        //date = new Date();
        //trace ("MONTH: " + date.month + " DATE: " + date.date + " MINUTES: " + date.minutes);
        //outputText("", true);
        if (CoC.timeAwareLargeLastEntry >= 0) { //Finish calling timeChangeLarge before advancing the hour again
            for (; CoC.timeAwareLargeLastEntry < CoC._timeAwareClassList.length; CoC.timeAwareLargeLastEntry++) {
                if (CoC._timeAwareClassList[CoC.timeAwareLargeLastEntry].timeChangeLarge()) return true;
            }
            CoC.timeAwareLargeLastEntry = -1;
        }
        while (this.timeQ > 0) {
            this.timeQ--;
            this.model.time.hours++;
            this.genderCheck();
            this.regeneration(false);
            //Inform all time aware classes that a new hour has arrived
            for (var tac: number = 0; tac < CoC._timeAwareClassList.length; tac++) if (CoC._timeAwareClassList[tac].timeChange()) needNext = true;
            if (this.model.time.hours > 23) {
                this.model.time.hours = 0;
                this.model.time.days++;
            }
            else if (this.model.time.hours == 21) {
                this.outputText("\nThe sky darkens as a starless night falls.  The blood-red moon slowly rises up over the horizon.\n");
                needNext = true;
            }
            else if (this.model.time.hours == 6) {
                this.outputText("\nThe sky begins to grow brighter as the moon descends over distant mountains, casting a few last ominous shadows before they burn away in the light.\n");
                needNext = true;
            }
            //BIG EVENTS GO IN HERE
            //BIG EVENTS GO IN HERE
            //BIG EVENTS GO IN HERE
            //BIG EVENTS GO IN HERE

            /* Inform all time aware classes that it's time for large events to trigger. Note that timeChangeLarge could be called multiple times in a single tick
               of the clock, so any updates should happen in timeChange and any timeChangeLarge events need to make sure they cannot repeat within the same hour.
               In effect these are the same rules the existing code acted under. */
            for (CoC.timeAwareLargeLastEntry = 0; CoC.timeAwareLargeLastEntry < CoC._timeAwareClassList.length; CoC.timeAwareLargeLastEntry++) {
                if (CoC._timeAwareClassList[CoC.timeAwareLargeLastEntry].timeChangeLarge()) return true;
            }
            CoC.timeAwareLargeLastEntry = -1; //If this var is -1 then this function has called timeChangeLarge for all entries in the _timeAwareClassList

            //IMP GANGBAAAAANGA
            //The more imps you create, the more often you get gangraped.
            temp = this.player.statusAffectv1(StatusAffects.BirthedImps) * 2;
            if (temp > 7) temp = 7;
            if (this.player.findPerk(PerkLib.PiercedLethite) >= 0) temp += 4;
            if (this.player.inHeat) temp += 2;
            if (this.vapula.vapulaSlave()) temp += 7;
            if (this.model.time.hours == 2) {
                if (this.model.time.days % 30 == 0 && this.flags[kFLAGS.ANEMONE_KID] > 0 && this.player.hasCock() && this.flags[kFLAGS.ANEMONE_WATCH] > 0 && this.flags[kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] >= 40) {
                    this.anemoneScene.goblinNightAnemone();
                    needNext = true;
                }
                else if (temp > this.rand(100) && this.player.findStatusAffect(StatusAffects.DefenseCanopy) < 0) {
                    if (this.player.gender > 0 && (this.player.findStatusAffect(StatusAffects.JojoNightWatch) < 0 || this.player.findStatusAffect(StatusAffects.PureCampJojo) < 0) && (this.flags[kFLAGS.HEL_GUARDING] == 0 || !this.helFollower.followerHel()) && this.flags[kFLAGS.ANEMONE_WATCH] == 0 && (this.flags[kFLAGS.HOLLI_DEFENSE_ON] == 0 || this.flags[kFLAGS.FUCK_FLOWER_KILLED] > 0) && (this.flags[kFLAGS.KIHA_CAMP_WATCH] == 0 || !this.kihaFollower.followerKiha())) {
                        this.impScene.impGangabangaEXPLOSIONS();
                        this.doNext(this.playerMenu);
                        return true;
                    }
                    else if (this.flags[kFLAGS.KIHA_CAMP_WATCH] > 0 && this.kihaFollower.followerKiha()) {
                        this.outputText("\n<b>You find charred imp carcasses all around the camp once you wake.  It looks like Kiha repelled a swarm of the little bastards.</b>\n");
                        needNext = true;
                    }
                    else if (this.flags[kFLAGS.HEL_GUARDING] > 0 && this.helFollower.followerHel()) {
                        this.outputText("\n<b>Helia informs you over a mug of beer that she whupped some major imp asshole last night.  She wiggles her tail for emphasis.</b>\n");
                        needNext = true;
                    }
                    else if (this.player.gender > 0 && this.player.findStatusAffect(StatusAffects.JojoNightWatch) >= 0 && this.player.findStatusAffect(StatusAffects.PureCampJojo) >= 0) {
                        this.outputText("\n<b>Jojo informs you that he dispatched a crowd of imps as they tried to sneak into camp in the night.</b>\n");
                        needNext = true;
                    }
                    else if (this.flags[kFLAGS.HOLLI_DEFENSE_ON] > 0) {
                        this.outputText("\n<b>During the night, you hear distant screeches of surprise, followed by orgasmic moans.  It seems some imps found their way into Holli's canopy...</b>\n");
                        needNext = true;
                    }
                    else if (this.flags[kFLAGS.ANEMONE_WATCH] > 0) {
                        this.outputText("\n<b>Your sleep is momentarily disturbed by the sound of tiny clawed feet skittering away in all directions.  When you sit up, you can make out Kid A holding a struggling, concussed imp in a headlock and wearing a famished expression.  You catch her eye and she sheepishly retreats to a more urbane distance before beginning her noisy meal.</b>\n");
                        needNext = true;
                    }
                }
                //wormgasms
                else if (this.flags[kFLAGS.EVER_INFESTED] == 1 && this.rand(100) <= 4 && this.player.hasCock() && this.player.findStatusAffect(StatusAffects.Infested) < 0) {
                    if (this.player.hasCock() && (this.player.findStatusAffect(StatusAffects.JojoNightWatch) < 0 || this.player.findStatusAffect(StatusAffects.PureCampJojo) < 0) && (this.flags[kFLAGS.HEL_GUARDING] == 0 || !this.helFollower.followerHel()) && this.flags[kFLAGS.ANEMONE_WATCH] == 0) {
                        nightTimeInfestation();
                        return true;
                    }
                    else if (this.flags[kFLAGS.HEL_GUARDING] > 0 && this.helFollower.followerHel()) {
                        this.outputText("\n<b>Helia informs you over a mug of beer that she stomped a horde of gross worms into paste.  She shudders after at the memory.</b>\n");
                        needNext = true;
                    }
                    else if (this.player.gender > 0 && this.player.findStatusAffect(StatusAffects.JojoNightWatch) >= 0 && this.player.findStatusAffect(StatusAffects.PureCampJojo) >= 0) {
                        this.outputText("\n<b>Jojo informs you that he dispatched a horde of tiny, white worms as they tried to sneak into camp in the night.</b>\n");
                        needNext = true;
                    }
                    else if (this.flags[kFLAGS.ANEMONE_WATCH] > 0) {
                        this.outputText("\n<b>Kid A seems fairly well fed in the morning, and you note a trail of slime leading off in the direction of the lake.</b>\n"); // Yeah, blah blah travel weirdness. Quickfix so it seems logically correct.
                        needNext = true;
                    }
                }
            }
            //No diapause?  Normal!
            if (this.player.findPerk(PerkLib.Diapause) < 0) {
                if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                if (this.flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
                    this.flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                //DOUBLE PREGGERS SPEED
                if (this.player.findPerk(PerkLib.MaraesGiftFertility) >= 0) {
                    if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                //DOUBLE PREGGERS SPEED
                if (this.player.findPerk(PerkLib.MagicalFertility) >= 0) {
                    if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (this.flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
                    this.flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                if (this.player.findPerk(PerkLib.FerasBoonBreedingBitch) >= 0) {
                    if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (this.player.findPerk(PerkLib.FerasBoonWideOpen) >= 0 || this.player.findPerk(PerkLib.FerasBoonMilkingTwat) >= 0) {
                    if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (this.flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
                    this.flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                //DOUBLE PREGGERS SPEED
                if (this.player.findPerk(PerkLib.BroodMother) >= 0) {
                    if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (this.flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
                    this.flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
            }
            //Diapause!
            else if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00228] > 0 && (this.player.pregnancyIncubation > 0 || this.player.buttPregnancyIncubation > 0)) {
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00229] == 1) {
                    this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00229] = 0;
                    this.outputText("\n\nYour body reacts to the influx of nutrition, accelerating your pregnancy. Your belly bulges outward slightly.", false);
                    needNext = true;
                }
                if (this.flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
                    this.flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00228]--;
                if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                if (this.flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
                    this.flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                if (this.flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
                    this.flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                if (this.flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
                    this.flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                //DOUBLE PREGGERS SPEED
                if (this.player.findPerk(PerkLib.MaraesGiftFertility) >= 0) {
                    if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                //DOUBLE PREGGERS SPEED
                if (this.player.findPerk(PerkLib.MagicalFertility) >= 0) {
                    if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (this.flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
                    this.flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                if (this.player.findPerk(PerkLib.FerasBoonBreedingBitch) >= 0) {
                    if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (this.player.findPerk(PerkLib.FerasBoonWideOpen) >= 0 || this.player.findPerk(PerkLib.FerasBoonMilkingTwat) >= 0) {
                    if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (this.flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
                    this.flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
                //DOUBLE PREGGERS SPEED
                if (this.player.findPerk(PerkLib.BroodMother) >= 0) {
                    if (this.player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
                }
                if (this.flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
                    this.flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
                    return true;
                }
            }
            //Egg loot!
            if (this.player.findStatusAffect(StatusAffects.LootEgg) >= 0) {
                trace("EGG LOOT HAS");
                //default
                var itype: ItemType =
                    [
                        [this.consumables.BROWNEG, this.consumables.PURPLEG, this.consumables.BLUEEGG, this.consumables.PINKEGG, this.consumables.WHITEEG, this.consumables.BLACKEG],
                        [this.consumables.L_BRNEG, this.consumables.L_PRPEG, this.consumables.L_BLUEG, this.consumables.L_PNKEG, this.consumables.L_WHTEG, this.consumables.L_BLKEG]]
                    [this.player.statusAffect(this.player.findStatusAffect(StatusAffects.Eggs)).value2 || 0][this.player.statusAffect(this.player.findStatusAffect(StatusAffects.Eggs)).value1 || 0] ||
                    this.consumables.BROWNEG;
                this.player.removeStatusAffect(StatusAffects.LootEgg);
                this.player.removeStatusAffect(StatusAffects.Eggs);
                trace("TAKEY NAU");
                this.inventory.takeItem(itype, this.playerMenu);
                return true;
            }
            // Benoit preggers update
            if (this.flags[kFLAGS.FEMOIT_EGGS] > 0) this.flags[kFLAGS.FEMOIT_INCUBATION]--; // We're not capping it, we're going to use negative values to figure out diff events
        }

        // Hanging the Uma massage update here, I think it should work...
        this.telAdre.umasShop.updateBonusDuration(time);
        if (this.player.findStatusAffect(StatusAffects.UmasMassage) >= 0) {
            trace("Uma's massage bonus time remaining: " + this.player.statusAffectv3(StatusAffects.UmasMassage));
        }

        this.highMountains.izumiScenes.updateSmokeDuration(time);
        if (this.player.findStatusAffect(StatusAffects.IzumisPipeSmoke) >= 0) {
            trace("Izumis pipe smoke time remaining: " + this.player.statusAffectv1(StatusAffects.IzumisPipeSmoke));
        }

        //Drop axe if too short!
        if (this.player.tallness < 78 && this.player.weapon == this.weapons.L__AXE) {
            this.outputText("<b>\nThis axe is too large for someone of your stature to use, though you can keep it in your inventory until you are big enough.</b>\n");
            this.inventory.takeItem(this.player.setWeapon(WeaponLib.FISTS), this.playerMenu);
            return true;
        }
        if (this.player.weapon == this.weapons.L_HAMMR && this.player.tallness < 60) {
            this.outputText("<b>\nYou've become too short to use this hammer anymore.  You can still keep it in your inventory, but you'll need to be taller to effectively wield it.</b>\n");
            this.inventory.takeItem(this.player.setWeapon(WeaponLib.FISTS), this.playerMenu);
            return true;
        }
        if (this.player.weapon == this.weapons.CLAYMOR && this.player.str < 40) {
            this.outputText("\n<b>You aren't strong enough to handle the weight of your weapon any longer, and you're forced to stop using it.</b>\n");
            this.inventory.takeItem(this.player.setWeapon(WeaponLib.FISTS), this.playerMenu);
            return true;
        }
        if (this.player.weapon == this.weapons.WARHAMR && this.player.str < 80) {
            this.outputText("\n<b>You aren't strong enough to handle the weight of your weapon any longer!</b>\n");
            this.inventory.takeItem(this.player.setWeapon(WeaponLib.FISTS), this.playerMenu);
            return true;
        }
        //Drop beautiful sword if corrupted!
        if (this.player.weaponPerk == "holySword" && this.player.cor >= 35) {
            this.outputText("<b>\nThe <u>" + this.player.weaponName + "</u> grows hot in your hand, until you are forced to drop it.  Whatever power inhabits this blade appears to be unhappy with you.  Touching it gingerly, you realize it is no longer hot, but as soon as you go to grab the hilt, it nearly burns you.\n\nYou realize you won't be able to use it right now, but you could probably keep it in your inventory.</b>\n\n");
            this.inventory.takeItem(this.player.setWeapon(WeaponLib.FISTS), this.playerMenu);
            return true;
        }
        //Unequip Lusty maiden armor
        if (this.player.armorName == "lusty maiden's armor") {
            //Removal due to no longer fitting:
            //Grew Cock or Balls
            if (this.player.hasCock() || this.player.balls > 0) {
                this.outputText("\nYou fidget uncomfortably in the g-string of your lewd bikini - there simply isn't enough room for your ");
                if (this.player.hasCock()) this.outputText("maleness");
                else this.outputText("bulgy balls");
                this.outputText(" within the imprisoning leather, and it actually hurts to wear it.  <b>You'll have to find some other form of protection!</b>\n\n");
                this.inventory.takeItem(this.player.setArmor(ArmorLib.COMFORTABLE_UNDERCLOTHES), this.playerMenu);
                return true;
            }
            //Lost pussy
            else if (!this.player.hasVagina()) {
                this.outputText("\nYou fidget uncomfortably as the crease in the gusset of your lewd bikini digs into your sensitive, featureless loins.  There's simply no way you can continue to wear this outfit in comfort - it was expressly designed to press in on the female mons, and without a vagina, <b>you simply can't wear this exotic armor.</b>\n\n");
                this.inventory.takeItem(this.player.setArmor(ArmorLib.COMFORTABLE_UNDERCLOTHES), this.playerMenu);
                return true;
            }
            //Tits gone or too small
            else if (this.player.biggestTitSize() < 4) {
                this.outputText("\nThe fine chain that makes up your lewd bikini-top is dangling slack against your flattened chest.  Every movement and step sends it jangling noisily, slapping up against your [nipples], uncomfortably cold after being separated from your " + this.player.skinFurScales() + " for so long.  <b>There's no two ways about it - you'll need to find something else to wear.</b>\n\n");
                this.inventory.takeItem(this.player.setArmor(ArmorLib.COMFORTABLE_UNDERCLOTHES), this.playerMenu);
                return true;
            }
        }
        // update cock type as dog/fox depending on whether the player resembles one more than the other.
        // Previously used to be computed directly in cockNoun, but refactoring prevents access to the Player class when in cockNoun now.
        if (this.player.totalCocks() != 0) {
            var counter: number = this.player.totalCocks() - 1;
            while (counter >= 0) {
                if (this.player.cocks[counter].cockType == CockTypesEnum.DOG || this.player.cocks[counter].cockType == CockTypesEnum.FOX) {
                    if (this.player.dogScore() >= this.player.foxScore())
                        this.player.cocks[counter].cockType = CockTypesEnum.DOG;
                    else
                        this.player.cocks[counter].cockType = CockTypesEnum.FOX;
                }
                counter--;
                // trace("IMA LOOPIN", counter);
            }

        }
        this.statScreenRefresh();
        if (needNext) {
            this.doNext(this.playerMenu);
            return true;
        }
        this.playerMenu();
        return false;
    }

    public cheatTime(time: number): void {
        while (time > 0) {
            time--;
            this.model.time.hours++;
            if (this.model.time.hours > 23) {
                this.model.time.days++;
                this.model.time.hours = 0;
            }
        }
        this.statScreenRefresh();
    }

    public growHair(amount: number = .1): boolean {
        //Grow hair!
        temp = this.player.hairLength;
        this.player.hairLength += amount;
        if (this.player.hairLength > 0 && temp == 0) {
            this.outputText("\n<b>You are no longer bald.  You now have " + this.hairDescript() + " coating your head.\n</b>", false);
            return true;
        }
        else if (this.player.hairLength >= 1 && temp < 1) {
            this.outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + this.hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (this.player.hairLength >= 3 && temp < 3) {
            this.outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + this.hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (this.player.hairLength >= 6 && temp < 6) {
            this.outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + this.hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (this.player.hairLength >= 10 && temp < 10) {
            this.outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + this.hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (this.player.hairLength >= 16 && temp < 16) {
            this.outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + this.hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (this.player.hairLength >= 26 && temp < 26) {
            this.outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + this.hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (this.player.hairLength >= 40 && temp < 40) {
            this.outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + this.hairDescript() + ".\n</b>", false);
            return true;
        }
        else if (this.player.hairLength >= 40 && this.player.hairLength >= this.player.tallness && temp < this.player.tallness) {
            this.outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + this.hairDescript() + ".\n</b>", false);
            return true;
        }
        return false;
    }

    // include "../../includes/eventTest.as";



    public eventTestingPane(): void {


        this.outputText(`<![CDATA[
    
    
    
    [screen startup |
    
    ** This is the header of the first scene(in BOLD) **

            Content! This is the first paragraph of content.
As you can see, paragraphs are automatically reconstituted from
multiple lines.Proper paragraph breaks are demarcated by
two line breaks.

We can also do * italic * and ** bold ** text!
    
    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat undefineda pariatur.Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.

        If you want a hard line break, use two spaces("  ")
        at the end of a line before the \\ n character
        to tell the markdown parser to insert a
        hard line -break

        [button page_2 | Page 2]
        [if (hasCock = true) [button page_2 | HasCockBtn]]
        [if (hasVagina = true) [button page_2 | HasVagBtn]]
        [button last_page | Last Page]
        [button exit | Leave Early ]
    
    ]

        [screen page_2 |

            THIS IS THE SECOND SCREEN
    
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
    accusantium doloremque laudantium, totam rem aperiam,
            eaque ipsa quae ab illo inventore veritatis et quasi architecto
    beatae vitae dicta sunt explicabo.Nemo enim ipsam voluptatem
    quia voluptas sit aspernatur aut odit aut fugit, sed quia
    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut
    labore et dolore magnam aliquam quaerat voluptatem.Ut enim ad
    minima veniam, quis nostrum exercitationem ullam corporis
    suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur ?
                Quis autem vel eum iure reprehenderit qui in ea voluptate velit
    esse quam nihil molestiae consequatur, vel illum qui dolorem
    eum fugiat quo voluptas undefineda pariatur ?

                [button last_page | Last Page]
    ]
        [screen last_page |

            This is the last page

        At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos
        dolores et quas molestias excepturi sint occaecati cupiditate non
        provident, similique sunt in culpa qui officia deserunt mollitia
        animi, id est laborum et dolorum fuga.Et harum quidem rerum facilis
        est et expedita distinctio.Nam libero tempore, cum soluta nobis
        est eligendi optio cumque nihil impedit quo minus id quod maxime
        placeat facere possimus, omnis voluptas assumenda est, omnis dolor
        repellendus.Temporibus autem quibusdam et aut officiis debitis
        aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae
        sint et molestiae non recusandae.Itaque earum rerum hic tenetur
        a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
        consequatur aut perferendis doloribus asperiores repellat.
    
    
    [button exit | All Done! ]
    ]
    
    
    
    
        ]]>`, true, true);

        //trace("Maintext content @ eventTestingPane = ", mainText.htmlText.length)
        //menu();
        //addButton(9, "Back", debugPane)
    }

    /*
    
    
    
    
    
    */

    public eventTester(): void {
        this.outputText("", true);
        this.mainView.showTestInputPanel();
        this.mainView.eventTestInput.text = `<![CDATA[
            [screen startup |

                "Paste test event text here."
    
    [button urtaQuest.infertilityQuestions | infertilityQuestions]
    [button forest.kitsuneScene.enterTheTrickster | enterTheTrickster]
    [button forest.kitsuneScene.kitsuneShrine | kitsuneShrine]
    [button forest.kitsuneScene.defeatTheKitsunes | defeatTheKitsunes]
    [button exit | Exit]
            ]

        ]]>`;

        ;
        this.simpleChoices("Proceed", this.eventTesterGo, "", undefined, "", undefined, "", undefined, "Back", this.eventTesterExit);
    }

    public eventTesterGo(): void {
        this.mainView.hideTestInputPanel();

        var temp: string = this.mainView.eventTestInput.text

        trace("Temp = ", temp);

        this.menu();
        this.outputText(temp, true, true);

        this.addButton(9, "Back", this.eventTester)
        this.flushOutputTextToGUI();
        // simpleChoices("Change Text",eventTester,"",0,"",0,"",0,"Exit",eventTesterExit);
        return;
    }

    public eventTesterExit(): void {
        this.mainView.hideTestInputPanel();
        this.debugPane();

        return;
    }

    // include "../../includes/transform.as";

    //Updates the player's gender
    public genderCheck(): void {
        if (this.player.cocks.length > 0) {
            if (this.player.vaginas.length > 0) this.player.gender = 3;
            else this.player.gender = 1;
        }
        else if (this.player.vaginas.length > 0) this.player.gender = 2;
        else this.player.gender = 0;
        //Fertility fixing
        if (this.player.hasVagina() && this.player.fertility < 1) this.player.fertility = 1;
    }

    // include "../../includes/engineCore.as";

    // // import flash.events.MouseEvent;
    // 
    // //const DOUBLE_ATTACK_STYLE: number = 867;
    // //const SPELLS_CAST: number = 868;
    // 
    // //Fenoxo loves his temps
    // var temp: number = 0;
    // 
    // //Used to set what each action buttons displays and does.
    // var args: any[] = new Array();
    // var funcs: any[] = new Array();
    // 
    // //Used for stat tracking to keep up/down arrows correct.
    // var oldStats = {};
    // model.oldStats = oldStats;
    // oldStats.oldStr  = 0;
    // oldStats.oldTou  = 0;
    // oldStats.oldSpe  = 0;
    // oldStats.oldInte = 0;
    // oldStats.oldSens = 0;
    // oldStats.oldLib  = 0;
    // oldStats.oldCor  = 0;
    // oldStats.oldHP   = 0;
    // oldStats.oldLust = 0;
    // 
    // model.maxHP = maxHP;

    public maxHP(): number {
        return this.player.maxHP();
    }

    public silly(): boolean {
        return this.flags[kFLAGS.SILLY_MODE_ENABLE_FLAG] == 1;

    }

    /* Replaced by Utils.formatStringArray, which does almost the same thing in one function
    public  clearList(): void {
        list = [];
    }
    public  list: any[] = [];
    public  addToList(arg: any): void {
        list[list.length] = arg;
    }
    public  outputList(): string {
    var  stuff: string = "";
        for(var x: number = 0; x < list.length; x++) {
            stuff += list[x];
            if(list.length == 2 && x == 1) {
                stuff += " and ";
            }
            else if(x < list.length-2) {
                stuff += ", ";
            }
            else if(x < list.length-1) {
                stuff += ", and ";
            }
        }
        list = [];
        return stuff;        
    }
    */

    public HPChange(changeNum: number, display: boolean): void {
        if (changeNum == 0) return;
        if (changeNum > 0) {
            //Increase by 20%!
            if (this.player.findPerk(PerkLib.HistoryHealer) >= 0) changeNum *= 1.2;
            if (this.player.HP + Math.floor(changeNum) > this.maxHP()) {
                if (this.player.HP >= this.maxHP()) {
                    if (display) this.outputText("You're as healthy as you can be.\n", false);
                    return;
                }
                if (display) this.outputText("Your HP maxes out at " + this.maxHP() + ".\n", false);
                this.player.HP = this.maxHP();
            }
            else {
                if (display) this.outputText("You gain " + Math.floor(changeNum) + " HP.\n", false);
                this.player.HP += Math.floor(changeNum);
                this.mainView.statsView.showStatUp('hp');
                // hpUp.visible = true;
            }
        }
        //Negative HP
        else {
            if (this.player.HP + changeNum <= 0) {
                if (display) this.outputText("You take " + Math.floor(changeNum * -1) + " damage, dropping your HP to 0.\n", false);
                this.player.HP = 0;
            }
            else {
                if (display) this.outputText("You take " + Math.floor(changeNum * -1) + " damage.\n", false);
                this.player.HP += changeNum;
            }
        }
        this.statScreenRefresh();
    }

    public clone(source: Record<string, any>): any {
        var copier: ByteArray = new ByteArray();
        copier.writeObject(source);
        copier.position = 0;
        return (copier.readObject());
    }

    /* Was only used in two places at the start of the game
    public  speech(output: string, speaker: string): void {
    var  speech: string = "";
        speech = speaker + " says, \"<i>" + output + "</i>\"\n";
        outputText(speech, false);
    }
    */

    public clearOutput(): void {
        this.forceUpdate();
        this.currentText = "";
        this.mainView.clearOutputText();
        if (this.gameState != 3) this.mainView.hideMenuButton(MainView.MENU_DATA);
        this.mainView.hideMenuButton(MainView.MENU_APPEARANCE);
        this.mainView.hideMenuButton(MainView.MENU_LEVEL);
        this.mainView.hideMenuButton(MainView.MENU_PERKS);
        this.mainView.hideMenuButton(MainView.MENU_STATS);
    }

    public rawOutputText(output: string, purgeText: boolean = false): void {

        //OUTPUT!
        if (purgeText) {
            //if(!debug) mainText.htmlText = output;
            //trace("Purging and writing Text", output);
            this.clearOutput();
            this.currentText = output;
            this.mainView.setOutputText(output);
            // mainText.htmlText = output;
        }
        else {
            //trace("Adding Text");
            this.currentText += output;
            this.mainView.appendOutputText(output);
            // mainText.htmlText += output;
        }
        // trace(getCurrentStackTrace())
        // scrollBar.update();

    }

    public outputText(output: string,
        purgeText: boolean = false,
        parseAsMarkdown: boolean = false): void {
        // we have to purge the output text BEFORE calling parseText, because if there are scene commands in 
        // the parsed text, parseText() will write directly to the output


        // This is cleaup in case someone hits the Data or new-game button when the event-test window is shown. 
        // It's needed since those buttons are available even when in the event-tester
        this.mainView.hideTestInputPanel();

        if (purgeText) {
            this.clearOutput();
        }

        output = this.parser.recursiveParser(output, parseAsMarkdown);

        //OUTPUT!
        if (purgeText) {
            //if(!debug) mainText.htmlText = output;
            this.currentText = output;
        }
        else {
            this.currentText += output;
            //if(!debug) mainText.htmlText = currentText;
        }
        if (this.debug) {
            this.mainView.setOutputText(this.currentText);
        }

    }

    public flushOutputTextToGUI(): void {
        var fmt: TextFormat;
        if (this.flags[kFLAGS.CUSTOM_FONT_SIZE] != 0) {
            fmt = this.mainView.mainText.getTextFormat();
            fmt.size = this.flags[kFLAGS.CUSTOM_FONT_SIZE];
        }

        this.mainView.setOutputText(this.currentText);

        if (this.flags[kFLAGS.CUSTOM_FONT_SIZE] != 0) {
            this.mainView.mainText.setTextFormat(fmt);
        }
    }

    public displayPerks(e: MouseEvent = undefined): void {
        var temp: number = 0;
        this.outputText("", true);
        while (temp < this.player.perks.length) {
            this.outputText("<b>" + this.player.perk(temp).perkName + "</b> - " + this.player.perk(temp).perkDesc + "\n", false);
            temp++;
        }
        this.menu();
        if (this.player.perkPoints > 0) {
            this.outputText("\n<b>You have " + this.num2Text(this.player.perkPoints) + " perk point", false);
            if (this.player.perkPoints > 1) this.outputText("s", false);
            this.outputText(" to spend.</b>", false);
            this.addButton(1, "Perk Up", this.perkBuyMenu);
        }
        if (this.player.findPerk(PerkLib.DoubleAttack) >= 0) {
            this.outputText("\n<b>You can adjust your double attack settings.</b>");
            this.addButton(2, "Dbl Options", this.doubleAttackOptions);
        }
        this.addButton(0, "Next", this.playerMenu);
    }

    public doubleAttackOptions(): void {
        this.clearOutput();
        this.menu();
        if (this.flags[kFLAGS.DOUBLE_ATTACK_STYLE] == 0) {
            this.outputText("You will currently always double attack in combat.  If your strength exceeds sixty, your double-attacks will be done at sixty strength in order to double-attack.");
            this.outputText("\n\nYou can change it to double attack until sixty strength and then dynamicly switch to single attacks.");
            this.outputText("\nYou can change it to always single attack.");
            this.addButton(1, "Dynamic", this.doubleAttackDynamic);
            this.addButton(2, "Single", this.doubleAttackOff);
        }
        else if (this.flags[kFLAGS.DOUBLE_ATTACK_STYLE] == 1) {
            this.outputText("You will currently double attack until your strength exceeds sixty, and then single attack.");
            this.outputText("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
            this.outputText("\nYou can change it to always single attack.");
            this.addButton(0, "All Double", this.doubleAttackForce);
            this.addButton(2, "Single", this.doubleAttackOff);
        }
        else {
            this.outputText("You will always single attack your foes in combat.");
            this.outputText("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
            this.outputText("\nYou can change it to double attack until sixty strength and then switch to single attacks.");
            this.addButton(0, "All Double", this.doubleAttackForce);
            this.addButton(1, "Dynamic", this.doubleAttackDynamic);
        }
        var e: MouseEvent;
        this.addButton(4, "Back", this.displayPerks);
    }

    public doubleAttackForce(): void {
        this.flags[kFLAGS.DOUBLE_ATTACK_STYLE] = 0;
        this.doubleAttackOptions();
    }
    public doubleAttackDynamic(): void {
        this.flags[kFLAGS.DOUBLE_ATTACK_STYLE] = 1;
        this.doubleAttackOptions();
    }
    public doubleAttackOff(): void {
        this.flags[kFLAGS.DOUBLE_ATTACK_STYLE] = 2;
        this.doubleAttackOptions();
    }

    public levelUpGo(e: MouseEvent = undefined): void {
        this.clearOutput();
        this.hideMenus();
        this.mainView.hideMenuButton(MainView.MENU_NEW_MAIN);
        //Level up
        if (this.player.XP >= (this.player.level) * 100) {
            this.player.level++;
            this.player.perkPoints++;
            this.outputText("<b>You are now level " + this.player.level + "!</b>\n\nYou may now apply +5 to one attribute.  Which will you choose?");
            this.player.XP -= (this.player.level - 1) * 100;
            this.menu();
            this.addButton(0, "Strength", this.levelUpStatStrength);
            this.addButton(1, "Toughness", this.levelUpStatToughness);
            this.addButton(2, "Speed", this.levelUpStatSpeed);
            this.addButton(3, "Intelligence", this.levelUpStatIntelligence);
        }
        //Spend perk points
        else if (this.player.perkPoints > 0) {
            this.perkBuyMenu();
        }
        else {
            this.outputText("<b>ERROR.  LEVEL UP PUSHED WHEN PC CANNOT LEVEL OR GAIN PERKS.  PLEASE REPORT THE STEPS TO REPRODUCE THIS BUG TO FENOXO@GMAIL.COM OR THE FENOXO.COM BUG REPORT FORUM.</b>");
            this.doNext(this.playerMenu);
        }
    }

    private levelUpStatStrength(): void {
        this.dynStats("str", 5); //Gain +5 Str due to level
        this.clearOutput();
        this.outputText("Your muscles feel significantly stronger from your time adventuring.");
        this.doNext(this.perkBuyMenu);
    }

    private levelUpStatToughness(): void {
        this.dynStats("tou", 5); //Gain +5 Toughness due to level
        trace("HP: " + this.player.HP + " MAX HP: " + this.maxHP());
        this.statScreenRefresh();
        this.clearOutput();
        this.outputText("You feel tougher from all the fights you have endured.");
        this.doNext(this.perkBuyMenu);
    }

    private levelUpStatSpeed(): void {
        this.dynStats("spe", 5); //Gain +5 speed due to level
        this.clearOutput();
        this.outputText("Your time in combat has driven you to move faster.");
        this.doNext(this.perkBuyMenu);
    }

    private levelUpStatIntelligence(): void {
        this.dynStats("int", 5); //Gain +5 Intelligence due to level
        this.clearOutput();
        this.outputText("Your time spent fighting the creatures of this realm has sharpened your wit.");
        this.doNext(this.perkBuyMenu);
    }

    private perkBuyMenu(): void {
        this.clearOutput();
        var perkList: any[] = this.buildPerkList();

        if (perkList.length == 0) {
            this.outputText("<b>You do not qualify for any perks at present.  </b>In case you qualify for any in the future, you will keep your " + this.num2Text(this.player.perkPoints) + " perk point");
            if (this.player.perkPoints > 1) this.outputText("s");
            this.outputText(".");
            this.doNext(this.playerMenu);
            return;
        }
        if (this.testingBlockExiting) {
            this.menu();
            this.addButton(0, "Next", this.perkSelect, perkList[this.rand(perkList.length)].perk);
        }
        else {
            this.outputText("Please select a perk from the drop-down list, then click 'Okay'.  You can press 'Skip' to save your perk point for later.\n\n");
            this.mainView.aCb.x = 210;
            this.mainView.aCb.y = 112;

            if (this.mainView.aCb.parent == undefined) {
                this.mainView.addChild(this.mainView.aCb);
                this.mainView.aCb.visible = true;
            }

            this.mainView.hideMenuButton(MainView.MENU_NEW_MAIN);
            this.menu();
            this.addButton(1, "Skip", this.perkSkip);
        }
    }

    private perkSelect(selected: PerkClass): void {
        stage.focus = undefined;
        if (this.mainView.aCb.parent != undefined) {
            this.mainView.removeChild(this.mainView.aCb);
            this.applyPerk(selected);
        }
    }

    private perkSkip(): void {
        stage.focus = undefined;
        if (this.mainView.aCb.parent != undefined) {
            this.mainView.removeChild(this.mainView.aCb);
            this.playerMenu();
        }
    }

    private changeHandler(event: Event): void {
        //Store perk name for later addition
        this.clearOutput();
        var selected: PerkClass = ComboBox(event.target).selectedItem.perk;
        this.mainView.aCb.move(210, 85);
        this.outputText("You have selected the following perk:\n\n");
        this.outputText("<b>" + selected.perkName + ":</b> " + selected.perkLongDesc + "\n\nIf you would like to select this perk, click <b>Okay</b>.  Otherwise, select a new perk, or press <b>Skip</b> to make a decision later.");
        this.menu();
        this.addButton(0, "Okay", this.perkSelect, selected);
        this.addButton(1, "Skip", this.perkSkip);
    }

    public buildPerkList(): any[] {
        var perkList: any[] = [];
        function _add(p: PerkClass): void {
            perkList.push({ label: p.perkName, perk: p });
        }
        //STRENGTH PERKS
        if (this.player.str >= 25) {
            _add(new PerkClass(PerkLib.StrongBack));
        }
        if (this.player.findPerk(PerkLib.StrongBack) >= 0 && this.player.str >= 50) {
            _add(new PerkClass(PerkLib.StrongBack2));
        }
        //Tier 1 Strength Perks
        if (this.player.level >= 6) {
            //Thunderous Strikes - +20% basic attack damage while str > 80.
            if (this.player.str >= 80) {
                _add(new PerkClass(PerkLib.ThunderousStrikes));
            }
            //Weapon Mastery - Doubles weapon damage bonus of 'large' type weapons. (Minotaur Axe, M. Hammer, etc)
            if (this.player.str > 60) {
                _add(new PerkClass(PerkLib.WeaponMastery));
            }
            if (this.player.str >= 75)
                _add(new PerkClass(PerkLib.BrutalBlows));
        }
        //Tier 2 Strength Perks
        if (this.player.level >= 12) {
            if (this.player.str >= 75)
                _add(new PerkClass(PerkLib.Berzerker));
        }
        //slot 2 - toughness perk 1
        if (this.player.findPerk(PerkLib.Tank) < 0 && this.player.tou >= 25) {
            _add(new PerkClass(PerkLib.Tank));
        }
        //slot 2 - regeneration perk
        if (this.player.findPerk(PerkLib.Tank) >= 0 && this.player.tou >= 50) {
            _add(new PerkClass(PerkLib.Regeneration));
        }
        //Tier 1 Toughness Perks
        if (this.player.level >= 6) {
            if (this.player.findPerk(PerkLib.Tank) >= 0 && this.player.tou >= 60) {
                _add(new PerkClass(PerkLib.Tank2));
            }
            if (this.player.findPerk(PerkLib.Regeneration) >= 0 && this.player.tou >= 70) {
                _add(new PerkClass(PerkLib.Regeneration2));
            }
            if (this.player.tou >= 75) {
                _add(new PerkClass(PerkLib.ImmovableObject));
            }
        }
        //Tier 2 Toughness Perks
        if (this.player.level >= 12) {
            if (this.player.tou >= 75) {
                _add(new PerkClass(PerkLib.Resolute));
            }
            if (this.player.tou >= 60) {
                _add(new PerkClass(PerkLib.IronMan));
            }
        }
        //slot 3 - speed perk
        if (this.player.spe >= 25) {
            _add(new PerkClass(PerkLib.Evade));
        }
        //slot 3 - run perk
        if (this.player.spe >= 25) {
            _add(new PerkClass(PerkLib.Runner));
        }
        //slot 3 - Double Attack perk
        if (this.player.findPerk(PerkLib.Evade) >= 0 && this.player.findPerk(PerkLib.Runner) >= 0 && this.player.spe >= 50) {
            _add(new PerkClass(PerkLib.DoubleAttack));
        }
        //Tier 1 Speed Perks
        if (this.player.level >= 6) {
            //Speedy Recovery - Regain Fatigue 50% faster speed.
            if (this.player.findPerk(PerkLib.Evade) >= 0 && this.player.spe >= 60) {
                _add(new PerkClass(PerkLib.SpeedyRecovery));
            }
            //Agility - A small portion of your speed is applied to your defense rating when wearing light armors.
            if (this.player.spe > 75 && this.player.findPerk(PerkLib.Runner) >= 0 && (this.player.armorPerk == "Light" || this.player.armorPerk == "Medium")) {
                _add(new PerkClass(PerkLib.Agility));
            }
            if (this.player.spe >= 60) {
                _add(new PerkClass(PerkLib.LightningStrikes));
            }
        }
        //Tier 2 Speed Perks
        if (this.player.level >= 12) {
            if (this.player.spe >= 75) {
                _add(new PerkClass(PerkLib.LungingAttacks));
            }
        }
        //Slot 4 - precision - -10 enemy toughness for damage calc
        if (this.player.inte >= 25) {
            _add(new PerkClass(PerkLib.Precision));
        }
        //Spellpower - boosts spell power
        if (this.player.inte >= 50) {
            _add(new PerkClass(PerkLib.Spellpower));
        }
        if (this.player.findPerk(PerkLib.Spellpower) >= 0 && this.player.inte >= 50) {
            _add(new PerkClass(PerkLib.Mage));
        }
        //Tier 1 Intelligence Perks
        if (this.player.level >= 6) {
            if (this.player.inte >= 50)
                _add(new PerkClass(PerkLib.Tactician));
            if (this.spellCount() > 0 && this.player.findPerk(PerkLib.Spellpower) >= 0 && this.player.findPerk(PerkLib.Mage) >= 0 && this.player.inte >= 60) {
                _add(new PerkClass(PerkLib.Channeling));
            }
            if (this.player.inte >= 60) {
                _add(new PerkClass(PerkLib.Medicine));
            }
        }
        //Tier 2 Intelligence perks
        if (this.player.level >= 12) {
            if (this.player.findPerk(PerkLib.Mage) >= 0 && this.player.inte >= 75) {
                _add(new PerkClass(PerkLib.Archmage));
            }
        }
        //LIBIDO PERKZ
        //slot 5 - libido perks
        //Slot 5 - Fertile+ increases cum production and fertility (+15%)
        if (this.player.lib >= 25) {
            _add(new PerkClass(PerkLib.FertilityPlus, 15, 1.75, 0, 0));
        }
        //Slot 5 - minimum libido
        if (this.player.lib >= 50) {
            _add(new PerkClass(PerkLib.HotBlooded, 20, 0, 0, 0));
        }
        //Tier 1 Libido Perks
        if (this.player.level >= 6) {
            //Slot 5 - minimum libido
            if (this.player.lib >= 60) {
                _add(new PerkClass(PerkLib.WellAdjusted));
            }
            //Slot 5 - minimum libido
            if (this.player.lib >= 60 && this.player.cor >= 50) {
                _add(new PerkClass(PerkLib.Masochist));
            }
        }
        //Corruption Perks - slot 7
        //Slot 7 - Corrupted Libido - lust raises 10% slower.
        if (this.player.cor >= 25) {
            _add(new PerkClass(PerkLib.CorruptedLibido, 20, 0, 0, 0));
        }
        //Slot 7 - Seduction (Must have seduced Jojo
        if (this.player.findPerk(PerkLib.Seduction) < 0 && this.player.cor >= 50 && this.monk >= 5) {
            _add(new PerkClass(PerkLib.Seduction));
        }
        //Slot 7 - Nymphomania
        else if (this.player.findPerk(PerkLib.CorruptedLibido) >= 0 && this.player.cor >= 75) {
            _add(new PerkClass(PerkLib.Nymphomania));
        }
        //Slot 7 - UNFINISHED :3
        if (this.minLust() >= 20 && this.player.findPerk(PerkLib.CorruptedLibido) >= 0 && this.player.cor >= 50) {
            _add(new PerkClass(PerkLib.Acclimation));
        }
        //Tier 1 Corruption Perks - acclimation over-rides
        if (this.player.level >= 6) {
            if (this.player.cor >= 60 && this.player.findPerk(PerkLib.CorruptedLibido) >= 0) {
                _add(new PerkClass(PerkLib.Sadist));
            }
            if (this.player.findPerk(PerkLib.CorruptedLibido) >= 0 && this.player.cor >= 70) {
                _add(new PerkClass(PerkLib.ArousingAura));
            }
        }
        //Tier 1 Misc Perks
        if (this.player.level >= 6) {
            _add(new PerkClass(PerkLib.Resistance));
        }
        // FILTER PERKS
        perkList = perkList.filter(
            function (perk: any, idx: number, array: any[]): boolean {
                return player.findPerk(perk.perk.ptype) < 0;
            });
        this.mainView.aCb.dataProvider = new DataProvider(perkList);
        return perkList;
    }

    public applyPerk(perk: PerkClass): void {
        this.clearOutput();
        this.player.perkPoints--;
        //Apply perk here.
        this.outputText("<b>" + perk.perkName + "</b> gained!");
        this.player.createPerk(perk.ptype, perk.value1, perk.value2, perk.value3, perk.value4);
        if (perk.ptype == PerkLib.StrongBack2) this.player.itemSlot5.unlocked = true;
        if (perk.ptype == PerkLib.StrongBack) this.player.itemSlot4.unlocked = true;
        if (perk.ptype == PerkLib.Tank2) {
            this.HPChange(this.player.tou, false);
            this.statScreenRefresh();
        }
        this.doNext(this.playerMenu);
    }

    public buttonText(buttonName: string): string {
        var matches: any,
            buttonIndex: number;

        if (typeof buttonName == 'string') {
            if (/^buttons\[[0-9]\]/.test(buttonName)) {
                matches = /^buttons\[([0-9])\]/.exec(buttonName);
                buttonIndex = parseInt(matches[1], 10);
            }
            else if (/^b[0-9]Text$/.test(buttonName)) {
                matches = /^b([0-9])Text$/.exec(buttonName);
                buttonIndex = parseInt(matches[1], 10);

                buttonIndex = buttonIndex === 0 ? 9 : buttonIndex - 1;
            }
        }

        return (this.mainView.getButtonText(buttonIndex) || "NULL");
    }


    // Returns a string or undefined.
    public getButtonToolTipText(buttonText: string): string {
        var toolTipText: string;

        buttonText = buttonText || '';

        //Items
        //if (/^....... x\d+$/.test(buttonText)){
        //	buttonText = buttonText.substring(0,7);
        //}

        // Fuck your regex
        if (buttonText.indexOf(" x") != -1) {
            buttonText = buttonText.split(" x")[0];
        }

        var itype: ItemType = ItemType.lookupItem(buttonText);
        if (itype != undefined) toolTipText = itype.description;
        itype = ItemType.lookupItemByShort(buttonText);
        if (itype != undefined) toolTipText = itype.description;
        if (buttonText.indexOf("Tail Whip") != -1) {
            toolTipText = "Whip your foe with your tail to enrage them and lower their defense!";
        }
        if (buttonText.indexOf("Dual Belt") != -1) {
            toolTipText = "This is a strange masturbation device, meant to work every available avenue of stimulation.";
        }
        if (buttonText.indexOf("C. Pole") != -1) {
            toolTipText = "This 'centaur pole' as it's called appears to be a sex-toy designed for females of the equine persuasion.  Oddly, it's been sculpted to look like a giant imp, with an even bigger horse-cock.";
        }
        if (buttonText.indexOf("Fake Mare") != -1) {
            toolTipText = "This fake mare is made of metal and wood, but the anatomically correct vagina looks as soft and wet as any female centaur's.";
        }
        //Combat
        //COMBAT
        //combat
        //wombat
        if (buttonText == "Attack") {
            if (!this.inCombat) toolTipText = "";
            else toolTipText = "Attempt to attack the enemy with your " + this.player.weaponName + ".  Damage done is determined by your strength and weapon.";
        }
        if (buttonText == "Kiss") {
            toolTipText = "Attempt to kiss your foe on the lips with drugged lipstick.  It has no effect on those without a penis.";
        }
        if (buttonText == "Tease") {
            if (!this.inCombat) toolTipText = "";
            else toolTipText = "Attempt to make an enemy more aroused by striking a seductive pose and exposing parts of your body.";
        }
        if (buttonText == "Kick") {
            toolTipText = "Attempt to kick an enemy using your powerful lower body.";
        }
        if (buttonText == "Combo") {
            toolTipText = "Make a three-hit combo.  Each attack has an extra 33% chance to miss, unless the target is blind. (25 Fatigue)";
        }
        if (buttonText == "Vault") {
            toolTipText = "Make a vaulting attack for an extra 25% damage.  Automatically crits stunned foes.  (20 Fatigue)";
        }
        if (buttonText == "Sidewinder") {
            toolTipText = "An attack that hits for reduced damage but has a high chance of stunning. (10 Fatigue)";
        }
        if (buttonText == "Dirt Kick") {
            toolTipText = "Attempt to blind your foe with a spray of kicked dirt. (5 Fatigue)";
        }
        if (buttonText == "Metabolize") {
            toolTipText = "Convert 10% of your maximum HP into fatigue.";
        }
        if (buttonText == "SecondWind") {
            toolTipText = "Regain 50% of your HP, 50 fatigue, and reduce lust by 50 once per fight.";
        }
        if (buttonText.indexOf("AnemoneSting") != -1) {
            toolTipText = "Attempt to strike an opponent with the stinging tentacles growing from your scalp.  Reduces enemy speed and increases enemy lust.";
        }
        if (buttonText.indexOf("P. Specials") != -1) {
            toolTipText = "Physical special attack menu.";
        }
        if (buttonText.indexOf("M. Specials") != -1) {
            toolTipText = "Mental and supernatural special attack menu.";
        }
        if (buttonText == "Berzerk") {
            toolTipText = "Throw yourself into a rage!  Greatly increases the strength of your weapon and increases lust resistance, but your armor defense is reduced to zero!";
        }
        if (buttonText.indexOf("Possess") != -1) {
            toolTipText = "Attempt to temporarily possess a foe and force them to raise their own lusts.";
        }
        if (buttonText.indexOf("Constrict") != -1) {
            toolTipText = "Attempt to bind an enemy in your long snake-tail.";
        }
        if (buttonText.indexOf("Gore") != -1) {
            toolTipText = "Lower your head and charge your opponent, attempting to gore them on your horns.  This attack is stronger and easier to land with large horns.";
        }
        if (buttonText.indexOf("Fantasize") != -1) {
            toolTipText = "Fantasize about your opponent in a sexual way.  It's probably a pretty bad idea to do this unless you want to end up getting raped.";
        }
        if (buttonText.indexOf("Charge W.") != -1) {
            toolTipText = "The Charge Weapon spell will surround your weapon in electrical energy, causing it to do even more damage.  The effect lasts for the entire combat.  (Fatigue Cost: " + this.spellCost(15) + ")";
        }
        if (buttonText.indexOf("Blind") != -1) {
            toolTipText = "Blind is a fairly self-explanatory spell.  It will create a bright flash just in front of the victim's eyes, blinding them for a time.  However if they blink it will be wasted.  (Fatigue Cost: " + this.spellCost(20) + ")";
        }
        if (buttonText.indexOf("Whitefire") != -1) {
            toolTipText = "Whitefire is a potent fire based attack that will burn your foe with flickering white flames, ignoring their physical toughness and most armors.  (Fatigue Cost: " + this.spellCost(30) + ")";
        }
        if (buttonText.indexOf("Aroused") != -1) {
        }
        if (buttonText.indexOf("Arouse") != -1) {
            if (!this.inCombat) toolTipText = "";
            else toolTipText = "The arouse spell draws on your own inner lust in order to enflame the enemy's passions.  (Fatigue Cost: " + this.spellCost(15) + ")";
        }
        if (buttonText == "Heal") {
            toolTipText = "Heal will attempt to use black magic to close your wounds and restore your body, however like all black magic used on yourself, it has a chance of backfiring and greatly arousing you.  (Fatigue Cost: " + this.spellCost(20) + ")";
        }
        if (buttonText.indexOf("Might") != -1) {
            toolTipText = "The Might spell draws upon your lust and uses it to fuel a temporary increase in muscle size and power.  It does carry the risk of backfiring and raising lust, like all black magic used on oneself.  (Fatigue Cost: " + this.spellCost(25) + ")";
        }
        //Wait
        if (buttonText.indexOf("Wait") != -1 && this.inCombat) {
            toolTipText = "Take no action for this round.  Why would you do this?  This is a terrible idea.";
        }
        //Sting
        if (buttonText.length == 5 && buttonText.indexOf("Sting") != -1) {
            toolTipText = "Attempt to use your venomous bee stinger on an enemy.  Be aware it takes quite a while for your venom to build up, so depending on your abdomen's refractory period, you may have to wait quite a while between stings.  Venom: " + Math.floor(this.player.tailVenom) + "/100";
        }
        //Web
        if (buttonText.indexOf("Web") != -1) {
            toolTipText = "Attempt to use your abdomen to spray sticky webs at an enemy and greatly slow them down.  Be aware it takes a while for your webbing to build up.  Web Amount: " + Math.floor(this.player.tailVenom) + "/100";
        }
        if (buttonText.indexOf("Infest") != -1) {
            toolTipText = "The infest attack allows you to cum at will, launching a stream of semen and worms at your opponent in order to infest them.  Unless your foe is very aroused they are likely to simply avoid it.  Only works on males or herms.";
        }
        if (buttonText.indexOf("Spells") != -1) {
            toolTipText = "Opens your spells menu, where you can cast any spells you have learned.  Beware, casting spells increases your fatigue, and if you become exhausted you will be easier to defeat.";
        }
        if (buttonText.indexOf("Defend") != -1) {
            toolTipText = "Selecting defend will reduce the damage you take by 66 percent, but will not affect any lust incurred by your enemy's actions.";
        }
        if (buttonText == "Run") {
            toolTipText = "Choosing to run will let you try to escape from your enemy. However, it will be hard to escape enemies that are faster than you and if you fail, your enemy will get a free attack.";
        }
        if (buttonText.indexOf("Inventory") != -1) {
            toolTipText = "The inventory allows you to use an item.  Be careful as this leaves you open to a counterattack when in combat.";
        }
        if (buttonText.indexOf("AutoSav") != -1) {
            toolTipText = "When autosave is on the game will automatically save your character each night at midnight to the last slot it was saved in.";
            if (buttonText.indexOf("ON") != -1) toolTipText += " Autosave is currently enabled.  Your game will be saved at midnight.";
            if (buttonText.indexOf("OFF") != -1) toolTipText += " Autosave is currently off.  Your game will NOT be saved.";
        }
        if (buttonText.indexOf("Retrieve") != -1) {
            toolTipText = "Retrieve allows you to take an item from one of the reserve stacks in your camp's additional storage.";
        }
        if (buttonText.indexOf("Storage") != -1) {
            toolTipText = "Storage will allow you to dump a stack of items from your inventory into your storage chest.";
        }
        if (buttonText.indexOf("Sand Facial") != -1) {
            toolTipText = "The goblins promise this facial will give you a rough, handsome look thanks to their special, timeless sands.";
        }
        if (buttonText.indexOf("Mud Facial") != -1) {
            toolTipText = "This facial is supposed to enhance the softness of your face and enhance its femininity greatly.";
        }
        //Masturbation Toys
        if (buttonText == "Masturbate") {
            toolTipText = "Selecting this option will make you attempt to manually masturbate in order to relieve your lust buildup.";
        }
        if (buttonText == "Meditate") {
            toolTipText = "Selecting this option will make you attempt to meditate in order to reduce lust and corruption.";
        }
        if (buttonText.indexOf("AN Stim-Belt") != -1) {
            toolTipText = "This is an all-natural self-stimulation belt.  The methods used to create such a pleasure device are unknown.  It seems to be organic in nature.";
        }
        if (buttonText.indexOf("Stim-Belt") != -1) {
            toolTipText = "This is a self-stimulation belt.  Commonly referred to as stim-belts, these are clockwork devices designed to pleasure the female anatomy.";
        }
        if (buttonText.indexOf("AN Onahole") != -1) {
            toolTipText = "An all-natural onahole, this device looks more like a bulbous creature than a sex-toy.  Nevertheless, the slick orifice it presents looks very inviting.";
        }
        if (buttonText.indexOf("D Onahole") != -1) {
            toolTipText = "This is a deluxe onahole, made of exceptional materials and with the finest craftsmanship in order to bring its user to the height of pleasure.";
        }
        if (buttonText.indexOf("Onahole") != -1) {
            toolTipText = "This is what is called an 'onahole'.  This device is a simple textured sleeve designed to fit around the male anatomy in a pleasurable way.";
        }
        if (buttonText == "Jojo") {
            if (this.monk >= 5) toolTipText = "Call your corrupted pet into camp in order to relieve your desires in a variety of sexual positions?  He's ever so willing after your last encounter with him.";
            else toolTipText = "Go find Jojo around the edges of your camp and meditate with him or talk about watch duty.";
        }
        if (buttonText == "Marble") {
            toolTipText = "Go to Marble the cowgirl for talk and companionship.";
        }
        //Books
        if (buttonText.indexOf("Dangerous Plants") != -1) {
            toolTipText = "This is a book titled 'Dangerous Plants'.  As explained by the title, this tome is filled with information on all manner of dangerous plants from this realm.";
        }
        if (buttonText.indexOf("Traveler's Guide") != -1) {
            toolTipText = "This traveler's guide is more of a pamphlet than an actual book, but it still contains some useful information on avoiding local pitfalls.";
        }
        if (buttonText.indexOf("Yoga Guide") != -1) {
            toolTipText = "This leather-bound book is titled 'Yoga for Non-Humanoids.' It contains numerous illustrations of centaurs, nagas and various other oddly-shaped beings in a variety of poses.";
        }
        if (buttonText.indexOf("Hentai Comic") != -1) {
            toolTipText = "This oddly drawn comic book is filled with images of fornication, sex, and overly large eyeballs.";
        }
        //CAMP STUFF
        if (buttonText.indexOf("Followers") != -1) {
            toolTipText = "Check up on any followers or companions who are joining you in or around your camp.  You'll probably just end up sleeping with them.";
        }
        //Marble
        if (buttonText.indexOf("Marble (Sex)") != -1) {
            toolTipText = "Get with Marble for a quick cuddle and some sex.";
        }
        //Rathazul
        if (buttonText.indexOf("Rathazul") != -1) {
            toolTipText = "Visit with Rathazul to see what alchemical supplies and services he has available at the moment.";
        }
        //Title screen
        if (buttonText.indexOf("Toggle Debug") != -1) {
            toolTipText = "Turn on debug mode.  Debug mode is intended for testing purposes but can be thought of as a cheat mode.  Items are infinite and combat is easy to escape from.  Weirdness and bugs are to be expected.";
        }
        if (buttonText.indexOf("Credits") != -1) {
            toolTipText = "See a list of all the cool people who have contributed to content for this game!";
        }
        if (buttonText.indexOf("Instructions") != -1) {
            toolTipText = "How to play.  Starting tips.  And hotkeys for easy left-handed play...";
        }
        if (buttonText.indexOf("Settings") != -1) {
            toolTipText = "Configure game settings and enable cheats.";
        }
        if (buttonText.indexOf("ASPLODE") != -1) {
            toolTipText = "MAKE SHIT ASPLODE";
        }
        return toolTipText;
    }


    // Hah, finally a place where a dictionary is actually required!
    private funcLookups: Dictionary = undefined;


    //     private buildFuncLookupDict(object: any = undefined, prefix: string = ""): void {
    //         trace("Building function <-> function name mapping table for " + ((object == undefined) ? "CoC." : prefix));
    //         // get all methods contained
    //         if (object == undefined) object = this;
    //         var typeDesc: XML = describeType(object);
    //         //trace("TypeDesc - ", typeDesc)

    //         for (var node: XML in typeDesc..method)
    //         {
    //             // return the method name if the thisObject of f (t) 
    //             // has a property by that name 
    //             // that is not undefined (undefined = doesn't exist) and 
    //             // is strictly equal to the function we search the name of
    //             //trace("this[node.@name] = ", this[node.@name], " node.@name = ", node.@name)
    //             if (object[node.@name] != undefined)
    //             this.funcLookups[object[node.@name]] = prefix + node.@name;
    //         }
    //         for (node in typeDesc..variable)
    // 	{
    //                 if(node.@type.toString().indexOf("classes.Scenes.") == 0 ||
    //                     node.metadata.@name.contains("Scene")) {
    //             if (object[node.@name]!= undefined) {
    //                 buildFuncLookupDict(object[node.@name], node.@name+".");
    //             }
    //         }
    //     }
    // }

    public getFunctionName(f): string {
        // trace("Getting function name")
        // get the object that contains the function (this of f)
        //var t: Record<string, any> = flash.sampler.getSavedThis(f); 
        if (this.funcLookups == undefined) {
            trace("Rebuilding lookup object");
            this.funcLookups = new Dictionary();
            this.buildFuncLookupDict();
        }


        if (f in this.funcLookups)
            return (this.funcLookups[f]);

        // if we arrive here, we haven't found anything... 
        // maybe the function is declared in the private namespace?
        return undefined;
    }


    private logFunctionInfo(func: any, arg: any = undefined): void {
        var logStr: string = "";
        if (typeof arg == 'function') {
            logStr += "Calling = " + this.getFunctionName(func) + " Param = " + this.getFunctionName(arg);
        }
        else {
            logStr += "Calling = " + this.getFunctionName(func) + " Param = " + arg;
        }
        CoC_Settings.appendButtonEvent(logStr);
        trace(logStr)
    }


    // returns a function that takes no arguments, and executes function `func` with argument `arg`
    public createCallBackFunction(func: any, arg: any) {
        if (func == undefined) {
            CoC_Settings.error("createCallBackFunction(undefined," + arg + ")");
        }
        if (arg == -9000 || arg == undefined) {
            /*		if (func == eventParser){
                        CoC_Settings.error("createCallBackFunction(eventParser,"+arg+")");
                    } */
            return function (): any {
                if (CoC_Settings.haltOnErrors)
                    logFunctionInfo(func, arg);
                return func();
            };
        }
        else {
            return function (): any {
                if (CoC_Settings.haltOnErrors)
                    logFunctionInfo(func, arg);
                return func(arg);
            };
        }
    }
    public createCallBackFunction2(func: any, ...args: any[]) {
        if (func == undefined) {
            CoC_Settings.error("createCallBackFunction(undefined," + args + ")");
        }
        return function (): any {
            if (CoC_Settings.haltOnErrors) logFunctionInfo(func, args);
            return func.apply(undefined, args);
        }
    }


    public addButton(pos: number, text: string = "", func1: any = undefined, arg1: any = -9000): void {
        if (func1 == undefined) return;
        var callback;
        var toolTipText: string;
        /* Let the mainView decide if index is valid
            if(pos > 9) {
                trace("INVALID BUTTON");
                return;
            }
        */
        callback = this.createCallBackFunction(func1, arg1);


        toolTipText = this.getButtonToolTipText(text);
        this.mainView.showBottomButton(pos, text, callback, toolTipText);
        //mainView.setOutputText( currentText );
        this.flushOutputTextToGUI();
    }

    public hasButton(arg: any): boolean {
        if (typeof arg == 'string')
            return this.mainView.hasButton(arg as String);
        else
            return false;
    }

    public removeButton(arg: any): void {
        function _removeButtonAction(index: number): void	// Uh... should this function be empty?
        {
            // funcs[ index ] = undefined;
            // args[ index ] = -9000;
        }

        var buttonToRemove: number = 0;
        if (typeof arg == 'string') {
            buttonToRemove = this.mainView.indexOfButtonWithLabel(arg as String);
        }
        if (typeof arg == 'number') {
            if (arg < 0 || arg > 9) return;
            buttonToRemove = Math.round(arg);
        }

        // _removeButtonAction( buttonToRemove );
        this.mainView.hideBottomButton(buttonToRemove);
    }

    public menu(): void { //The newer, simpler menu - blanks all buttons so addButton can be used
        this.mainView.hideBottomButton(0);
        this.mainView.hideBottomButton(1);
        this.mainView.hideBottomButton(2);
        this.mainView.hideBottomButton(3);
        this.mainView.hideBottomButton(4);
        this.mainView.hideBottomButton(5);
        this.mainView.hideBottomButton(6);
        this.mainView.hideBottomButton(7);
        this.mainView.hideBottomButton(8);
        this.mainView.hideBottomButton(9);
        this.flushOutputTextToGUI();
    }

    /*
    // AFICT, menu() isn't called with arguments ANYWHERE in the codebase.
    // WHRYYYYYYY
    public  menu(text1: string = "", func1 = undefined, arg1: number = -9000, 
                        text2: string = undefined, func2 = undefined, arg2: number = -9000, 
                        text3: string = undefined, func3 = undefined, arg3: number = -9000, 
                        text4: string = undefined, func4 = undefined, arg4: number = -9000, 
                        text5: string = undefined, func5 = undefined, arg5: number = -9000, 
                        text6: string = undefined, func6 = undefined, arg6: number = -9000, 
                        text7: string = undefined, func7 = undefined, arg7: number = -9000, 
                        text8: string = undefined, func8 = undefined, arg8: number = -9000, 
                        text9: string = undefined, func9 = undefined, arg9: number = -9000, 
                        text0: string = undefined, func0 = undefined, arg0: number = -9000): void 
    {
    	
    function  _conditionallyShowButton( index : number, label : string, func , arg : number ) : void
        {
        var  callback , toolTipText : string;
    
        	
    
        	
            if( func != undefined )
            {
                callback = createCallBackFunction(func1, arg1);
    
                toolTipText = getButtonToolTipText( label );
                // This is a kind of messy hack because I want to log the button events, so I can do better debugging.
                // therefore, we wrap the callback function in a shim function that does event-logging, and
                // *then* calls the relevant callback.
    
            	
                mainView.showBottomButton( index, label, callback, toolTipText );
            	
            }
            else
            {
                mainView.hideBottomButton( index );
            }
        }
    
        //Clear funcs & args
        // funcs = new Array();
        // args = new Array();
    	
        _conditionallyShowButton( 0, text1, func1, arg1 );
        _conditionallyShowButton( 1, text2, func2, arg2 );
        _conditionallyShowButton( 2, text3, func3, arg3 );
        _conditionallyShowButton( 3, text4, func4, arg4 );
        _conditionallyShowButton( 4, text5, func5, arg5 );
        _conditionallyShowButton( 5, text6, func6, arg6 );
        _conditionallyShowButton( 6, text7, func7, arg7 );
        _conditionallyShowButton( 7, text8, func8, arg8 );
        _conditionallyShowButton( 8, text9, func9, arg9 );
        _conditionallyShowButton( 9, text0, func0, arg0 );
    
        //mainView.setOutputText( currentText );
        flushOutputTextToGUI();
    }
    */

    public choices(text1: string, butt1,
        text2: string, butt2,
        text3: string, butt3,
        text4: string, butt4,
        text5: string, butt5,
        text6: string, butt6,
        text7: string, butt7,
        text8: string, butt8,
        text9: string, butt9,
        text0: string, butt0): void { //New typesafe version

        this.menu();
        this.addButton(0, text1, butt1);
        this.addButton(1, text2, butt2);
        this.addButton(2, text3, butt3);
        this.addButton(3, text4, butt4);
        this.addButton(4, text5, butt5);
        this.addButton(5, text6, butt6);
        this.addButton(6, text7, butt7);
        this.addButton(7, text8, butt8);
        this.addButton(8, text9, butt9);
        this.addButton(9, text0, butt0);
        /*
        var  callback ;
        var  toolTipText : string;
        
        var  textLabels : any[];
        var  j : number;
        
            textLabels = [
                text1,
                text2,
                text3,
                text4,
                text5,
                text6,
                text7,
                text8,
                text9,
                text0
            ];
        
            //Transfer event code to storage
            buttonEvents[0] = butt1;
            buttonEvents[1] = butt2;
            buttonEvents[2] = butt3;
            buttonEvents[3] = butt4;
            buttonEvents[4] = butt5;
            buttonEvents[5] = butt6;
            buttonEvents[6] = butt7;
            buttonEvents[7] = butt8;
            buttonEvents[8] = butt9;
            buttonEvents[9] = butt0;
        
        var  tmpJ: number;
        
            // iterate over the button options, and only enable the ones which have a corresponding event number
        
            for (tmpJ = 0; tmpJ < 10; tmpJ += 1)
            {
                if(buttonEvents[tmpJ] == -9000 || buttonEvents[tmpJ] == 0 || buttonEvents[tmpJ] == undefined) {
                    mainView.hideBottomButton( tmpJ );
                }
                else {
                    if (buttonEvents[tmpJ] is Number) {
                        callback = createCallBackFunction(eventParser, buttonEvents[tmpJ] );
                    } else {
                        callback = createCallBackFunction(buttonEvents[tmpJ], undefined);
                    }
                    toolTipText = getButtonToolTipText( textLabels[ tmpJ ] );
        
                    mainView.showBottomButton( tmpJ, textLabels[ tmpJ ], callback, toolTipText );
                }
        
            }
        
            // funcs = new Array();
            // args = new Array();
            //mainView.setOutputText( currentText );
            flushOutputTextToGUI();
        */
    }

    /****
        This function is made for multipage menus of unpredictable length,
        say a collection of items or places or people that can change
        depending on certain events, past choices, the time of day, or whatever.
    
        This is not the best for general menu use.  Use choices() for that.
    
        This is a bit confusing, so here's usage instructions.
        Pay attention to all the braces.
    
        This is made to be used with an array that you create before calling it,
        so that you can push as many items on to that array as you like
        before passing that array off to this function.
    
        So you can do something like this:
        var  itemsInStorage : any[] = new Array();
    
            // The extra square braces are important.
            itemsInStorage.push( [ "Doohicky", useDoohickyFunc ] );
            itemsInStorage.push( [ "Whatsit", useWhatsitFunc ] );
            itemsInStorage.push( [ "BagOfDicks", eatBagOfDicks ] );
            ...
    
            // see notes about cancelFunc
            multipageChoices( cancelFunc, itemsInStorage );
    
        cancelfunc is a function (A button event function, specifically)
        that exits the menu.  Provide this if you want a Back button to appear
        in the bottom right.
    
        If you do not need a cancel function, perhaps because some or all
        of the choices will exit the menu, then you can
        pass undefined or 0 for the cancelFunction.
    
            // This menu shows no Back button.
            multipageChoices( undefined, itemsInStorage );
    
        You can call it directly if you want, but that's ridiculous.
            multipageChoices( justGoToCamp, [
                [ "Do this", doThisEvent ],
                [ "Do that", doThatEvent ],
                [ "Do something", doSomethingEvent ],
                [ "Fap", goFapEvent ],
                [ "Rape Jojo", jojoRape ],
                // ... more items here...
                [ "What", goWhat ],
                [ "Margle", gurgleFluidsInMouthEvent ] // no comma on last item.
            ]);
    ****/
    public multipageChoices(cancelFunction: any, menuItems: any[]): void {
        const itemsPerPage: number = 8;

        var currentPageIndex: number;
        var pageCount: number;

        function getPageOfItems(pageIndex: number): any[] {
            var startItemIndex: number = pageIndex * itemsPerPage;

            return menuItems.slice(startItemIndex, startItemIndex + itemsPerPage);
        }

        function flatten(pageItems: any[]): any[] {
            var i: number, l: number;
            var flattenedItems: any[] = [];

            for (i = 0, l = pageItems.length; i < l; ++i) {
                flattenedItems = flattenedItems.concat(pageItems[i]);
            }

            return flattenedItems;
        }

        function showNextPage(): void {
            showPage((currentPageIndex + 1) % pageCount);
        }

        function showPage(pageIndex: number): void {
            var currentPageItems: any[]; // holds the current page of items.

            if (pageIndex < 0)
                pageIndex = 0;
            if (pageIndex >= pageCount)
                pageIndex = pageCount - 1;

            currentPageIndex = pageIndex;
            currentPageItems = getPageOfItems(pageIndex);

            // I did it this way so as to use only one actual menu setting function.
            // I figured it was safer until the menu functions stabilize.

            // insert page functions.
            // First pad out the items so it's always in a predictable state.
            while (currentPageItems.length < 8) {
                currentPageItems.push(["", 0]);
            }

            // Insert next button.
            currentPageItems.splice(4, 0, [
                "See page " +
                String(((currentPageIndex + 1) % pageCount) + 1) + // A compelling argument for 1-indexing?
                '/' +
                String(pageCount),
                pageCount > 1 ? showNextPage : 0
                // "Next Page", pageCount > 1 ? showNextPage : 0
            ]);

            // Cancel/Back button always appears in bottom right, like in the inventory.
            currentPageItems.push([
                "Back", cancelFunction || 0
            ]);

            choices.apply(undefined, flatten(currentPageItems));
        }

        pageCount = Math.ceil(menuItems.length / itemsPerPage);

        if (typeof cancelFunction != 'function')
            cancelFunction = 0;

        showPage(0);
    }

    // simpleChoices and doYesNo are convenience functions. They shouldn't re-implement code from choices()
    public simpleChoices(text1: string, butt1,
        text2: string, butt2,
        text3: string, butt3,
        text4: string, butt4,
        text5: string, butt5): void { //New typesafe version

        //trace("SimpleChoices");
        /*	choices(text1,butt1,
                    text2,butt2,
                    text3,butt3,
                    text4,butt4,
                    text5,butt5,
                    "",0,
                    "",0,
                    "",0,
                    "",0,
                    "",0);*/
        this.menu();
        this.addButton(0, text1, butt1);
        this.addButton(1, text2, butt2);
        this.addButton(2, text3, butt3);
        this.addButton(3, text4, butt4);
        this.addButton(4, text5, butt5);
    }

    public doYesNo(eventYes, eventNo): void { //New typesafe version
        this.menu();
        this.addButton(0, "Yes", eventYes);
        this.addButton(1, "No", eventNo);
        /*
            //Make buttons 1-2 visible and hide the rest.
        
            //trace("doYesNo");
            choices("Yes",eventYes,
                    "No",eventNo,
                    "",0,
                    "",0,
                    "",0,
                    "",0,
                    "",0,
                    "",0,
                    "",0,
                    "",0);
        
        }
        */
    }

    public doNext(event): void { //Now typesafe
        //Prevent new events in combat from automatically overwriting a game over. 
        if (this.mainView.getButtonText(0).indexOf("Game Over") != -1) {
            trace("Do next setup cancelled by game over");
            return;
        }

        //trace("DoNext have item:", eventNo);
        //choices("Next", event, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0); 
        this.menu();
        this.addButton(0, "Next", event);
    }

    /* Was never called
    public  doNextClear(eventNo: any): void 
    {
        outputText("", true, true);
        //trace("DoNext Clearing display");
        //trace("DoNext have item:", eventNo);
        choices("Next", eventNo, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0, "", 0);
    }
    */

    public invertGo(): void {
        this.mainView.invert();
    }

    //Used to update the display of statistics
    public statScreenRefresh(): void {
        this.mainView.statsView.show(); // show() method refreshes.
    }

    public showStats(): void {
        this.mainView.statsView.show();
    }

    public hideStats(): void {
        this.mainView.statsView.hide();
    }

    public hideMenus(): void {
        this.mainView.hideAllMenuButtons();
    }

    //Hide the up/down indicators
    public hideUpDown(): void {
        this.mainView.statsView.hideUpDown();

        //Clear storage values so up/down arrows can be properly displayed
        this.oldStats.oldStr = 0;
        this.oldStats.oldTou = 0;
        this.oldStats.oldSpe = 0;
        this.oldStats.oldInte = 0;
        this.oldStats.oldLib = 0;
        this.oldStats.oldSens = 0;
        this.oldStats.oldLust = 0;
        this.oldStats.oldCor = 0;
    }

    public physicalCost(mod: number): number {
        var costPercent: number = 100;
        if (this.player.findPerk(PerkLib.IronMan) >= 0) costPercent -= 50;
        mod *= costPercent / 100;
        return mod;
    }

    public spellCost(mod: number): number {
        //Addiditive mods
        var costPercent: number = 100;
        if (this.player.findPerk(PerkLib.SpellcastingAffinity) >= 0) costPercent -= this.player.perkv1(PerkLib.SpellcastingAffinity);
        if (this.player.findPerk(PerkLib.WizardsEndurance) >= 0) costPercent -= this.player.perkv1(PerkLib.WizardsEndurance);

        //Limiting it and multiplicative mods
        if (this.player.findPerk(PerkLib.BloodMage) >= 0 && costPercent < 50) costPercent = 50;

        mod *= costPercent / 100;

        if (this.player.findPerk(PerkLib.HistoryScholar) >= 0) {
            if (mod > 2) mod *= .8;
        }
        if (this.player.findPerk(PerkLib.BloodMage) >= 0 && mod < 5) mod = 5;
        else if (mod < 2) mod = 2;

        mod = Math.round(mod * 100) / 100;
        return mod;
    }

    //Modify fatigue
    //types:
    //        0 - normal
    //        1 - magic
    public fatigue(mod: number, type: number = 0): void {
        //Spell reductions
        if (type == 1) {
            mod = this.spellCost(mod);

            //Blood mages use HP for spells
            if (this.player.findPerk(PerkLib.BloodMage) >= 0) {
                this.takeDamage(mod);
                this.statScreenRefresh();
                return;
            }
        }
        //Physical special reductions
        if (type == 2) {
            mod = this.physicalCost(mod);
        }
        if (this.player.fatigue >= 100 && mod > 0) return;
        if (this.player.fatigue <= 0 && mod < 0) return;
        //Fatigue restoration buffs!
        if (mod < 0) {
            var multi: number = 1;

            if (this.player.findPerk(PerkLib.HistorySlacker) >= 0) multi += 0.2;
            if (this.player.findPerk(PerkLib.ControlledBreath) >= 0 && this.player.cor < 30) multi += 0.1;

            mod *= multi;
        }
        this.player.fatigue += mod;
        if (mod > 0) {
            this.mainView.statsView.showStatUp('fatigue');
            // fatigueUp.visible = true;
            // fatigueDown.visible = false;
        }
        if (mod < 0) {
            this.mainView.statsView.showStatDown('fatigue');
            // fatigueDown.visible = true;
            // fatigueUp.visible = false;
        }
        if (this.player.fatigue > 100) this.player.fatigue = 100;
        if (this.player.fatigue < 0) this.player.fatigue = 0;
        this.statScreenRefresh();
    }
    //function changeFatigue
    public changeFatigue(changeF: number): void {
        this.fatigue(changeF);
    }
    public minLust(): number {
        return this.player.minLust();
    }

    public displayStats(e: MouseEvent = undefined): void {
        this.spriteSelect(- 1);
        this.outputText("", true);

        // Begin Combat Stats
        var combatStats: string = "";
        if (this.player.hasKeyItem("Bow") >= 0)
            combatStats += "<b>Bow Skill:</b> " + Math.round(this.player.statusAffectv1(StatusAffects.Kelt)) + "\n";

        combatStats += "<b>Lust Resistance:</b> " + (100 - Math.round(this.lustPercent())) + "% (Higher is better.)\n";

        combatStats += "<b>Spell Effect Multiplier:</b> " + (100 * this.spellMod()) + "%\n";

        combatStats += "<b>Spell Cost:</b> " + this.spellCost(100) + "%\n";

        if (this.flags[kFLAGS.RAPHAEL_RAPIER_TRANING] > 0)
            combatStats += "<b>Rapier Skill (Out of 4):</b> " + this.flags[kFLAGS.RAPHAEL_RAPIER_TRANING] + "\n";

        combatStats += "<b>Tease Skill (Out of 5):</b>  " + this.player.teaseLevel + "\n";

        if (combatStats != "")
            this.outputText("<b><u>Combat Stats</u></b>\n" + combatStats, false);
        // End Combat Stats

        // Begin Children Stats
        var childStats: string = "";

        if (this.player.statusAffectv1(StatusAffects.Birthed) > 0)
            childStats += "<b>Times Given Birth:</b> " + this.player.statusAffectv1(StatusAffects.Birthed) + "\n";

        if (this.flags[kFLAGS.AMILY_MET] > 0)
            childStats += "<b>Litters With Amily:</b> " + (this.flags[kFLAGS.AMILY_BIRTH_TOTAL] + this.flags[kFLAGS.PC_TIMES_BIRTHED_AMILYKIDS]) + "\n";

        if (this.flags[kFLAGS.BENOIT_EGGS] > 0)
            childStats += "<b>Benoit Eggs Laid:</b> " + this.flags[kFLAGS.BENOIT_EGGS] + "\n";

        if (this.flags[kFLAGS.COTTON_KID_COUNT] > 0)
            childStats += "<b>Children With Cotton:</b> " + this.flags[kFLAGS.COTTON_KID_COUNT] + "\n";

        if (this.flags[kFLAGS.EDRYN_NUMBER_OF_KIDS] > 0)
            childStats += "<b>Children With Edryn:</b> " + this.flags[kFLAGS.EDRYN_NUMBER_OF_KIDS] + "\n";

        if (this.flags[kFLAGS.EMBER_CHILDREN_MALES] > 0)
            childStats += "<b>Ember Offspring (Males):</b> " + this.flags[kFLAGS.EMBER_CHILDREN_MALES] + "\n";
        if (this.flags[kFLAGS.EMBER_CHILDREN_FEMALES] > 0)
            childStats += "<b>Ember Offspring (Females):</b> " + this.flags[kFLAGS.EMBER_CHILDREN_FEMALES] + "\n";
        if (this.flags[kFLAGS.EMBER_CHILDREN_HERMS] > 0)
            childStats += "<b>Ember Offspring (Herms):</b> " + this.flags[kFLAGS.EMBER_CHILDREN_HERMS] + "\n";

        if (this.flags[kFLAGS.EMBER_EGGS] > 0)
            childStats += "<b>Ember Eggs Produced:</b> " + this.flags[kFLAGS.EMBER_EGGS] + "\n";

        if (this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] > 0)
            childStats += "<b>Children With Izma (Sharkgirls):</b> " + this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] + "\n";

        if (this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] > 0)
            childStats += "<b>Children With Izma (Tigersharks):</b> " + this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] + "\n";

        if (this.flags[kFLAGS.KELLY_KIDS_MALE] > 0)
            childStats += "<b>Children With Kelly (Males):</b> " + this.flags[kFLAGS.KELLY_KIDS_MALE] + "\n";

        if (this.flags[kFLAGS.KELLY_KIDS] - this.flags[kFLAGS.KELLY_KIDS_MALE] > 0)
            childStats += "<b>Children With Kelly (Females):</b> " + (this.flags[kFLAGS.KELLY_KIDS] - this.flags[kFLAGS.KELLY_KIDS_MALE]) + "\n";

        if (this.mountain.salon.lynnetteApproval() != 0)
            childStats += "<b>Lynnette Children:</b> " + this.flags[kFLAGS.LYNNETTE_BABY_COUNT] + "\n";

        if (this.flags[kFLAGS.MARBLE_KIDS] > 0)
            childStats += "<b>Children With Marble:</b> " + this.flags[kFLAGS.MARBLE_KIDS] + "\n";

        if (this.flags[kFLAGS.ANT_KIDS] > 0)
            childStats += "<b>Ant Children With Phylla:</b> " + this.flags[kFLAGS.ANT_KIDS] + "\n";

        if (this.flags[kFLAGS.PHYLLA_DRIDER_BABIES_COUNT] > 0)
            childStats += "<b>Drider Children With Phylla:</b> " + this.flags[kFLAGS.PHYLLA_DRIDER_BABIES_COUNT] + "\n";

        if (this.flags[kFLAGS.SHEILA_JOEYS] > 0)
            childStats += "<b>Children With Sheila (Joeys):</b> " + this.flags[kFLAGS.SHEILA_JOEYS] + "\n";

        if (this.flags[kFLAGS.SHEILA_IMPS] > 0)
            childStats += "<b>Children With Sheila (Imps):</b> " + this.flags[kFLAGS.SHEILA_IMPS] + "\n";

        if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] > 0 || this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] > 0) {
            childStats += "<b>Children With Sophie:</b> ";
            var sophie: number = 0;
            if (this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] > 0) sophie++;
            sophie += this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT];
            if (this.flags[kFLAGS.SOPHIE_CAMP_EGG_COUNTDOWN] > 0) sophie++;
            childStats += sophie + "\n";
        }

        if (this.flags[kFLAGS.SOPHIE_EGGS_LAID] > 0)
            childStats += "<b>Eggs Fertilized For Sophie:</b> " + (this.flags[kFLAGS.SOPHIE_EGGS_LAID] + sophie) + "\n";

        if (this.flags[kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] > 0)
            childStats += "<b>Children With Tamani:</b> " + this.flags[kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] + " (after all forms of natural selection)\n";

        if (this.urtaPregs.urtaKids() > 0)
            childStats += "<b>Children With Urta:</b> " + this.urtaPregs.urtaKids() + "\n";

        //Mino sons
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] > 0)
            childStats += "<b>Number of Adult Minotaur Offspring:</b> " + this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] + "\n";

        if (childStats != "")
            this.outputText("\n<b><u>Children</u></b>\n" + childStats, false);
        // End Children Stats

        // Begin Body Stats
        var bodyStats: string = "";

        bodyStats += "<b>Anal Capacity:</b> " + Math.round(this.player.analCapacity()) + "\n";
        bodyStats += "<b>Anal Looseness:</b> " + Math.round(this.player.ass.analLooseness) + "\n";

        bodyStats += "<b>Fertility (Base) Rating:</b> " + Math.round(this.player.fertility) + "\n";
        bodyStats += "<b>Fertility (With Bonuses) Rating:</b> " + Math.round(this.player.totalFertility()) + "\n";

        if (this.player.cumQ() > 0)
            bodyStats += "<b>Cum Production:</b> " + Math.round(this.player.cumQ()) + "mL\n";
        if (this.player.lactationQ() > 0)
            bodyStats += "<b>Milk Production:</b> " + Math.round(this.player.lactationQ()) + "mL\n";

        if (this.player.findStatusAffect(StatusAffects.Feeder) >= 0) {
            bodyStats += "<b>Hours Since Last Time Breastfed Someone:</b>  " + this.player.statusAffectv2(StatusAffects.Feeder);
            if (this.player.statusAffectv2(StatusAffects.Feeder) >= 72)
                bodyStats += " (Too long! Sensitivity Increasing!)";

            bodyStats += "\n";
        }

        bodyStats += "<b>Pregnancy Speed Multiplier:</b> ";
        var preg: number = 1;
        if (this.player.findPerk(PerkLib.Diapause) >= 0)
            bodyStats += "? (Variable due to Diapause)\n";
        else {
            if (this.player.findPerk(PerkLib.MaraesGiftFertility) >= 0) preg++;
            if (this.player.findPerk(PerkLib.BroodMother) >= 0) preg++;
            if (this.player.findPerk(PerkLib.FerasBoonBreedingBitch) >= 0) preg++;
            if (this.player.findPerk(PerkLib.MagicalFertility) >= 0) preg++;
            if (this.player.findPerk(PerkLib.FerasBoonWideOpen) >= 0 || this.player.findPerk(PerkLib.FerasBoonMilkingTwat) >= 0) preg++;
            bodyStats += preg + "\n";
        }

        if (this.player.cocks.length > 0) {
            bodyStats += "<b>Total Cocks:</b> " + this.player.cocks.length + "\n";

            var totalCockLength: number = 0;
            var totalCockGirth: number = 0;

            for (var i: number = 0; i < this.player.cocks.length; i++) {
                totalCockLength += this.player.cocks[i].cockLength;
                totalCockGirth += this.player.cocks[i].cockThickness
            }

            bodyStats += "<b>Total Cock Length:</b> " + Math.round(totalCockLength) + " inches\n";
            bodyStats += "<b>Total Cock Girth:</b> " + Math.round(totalCockGirth) + " inches\n";

        }

        if (this.player.vaginas.length > 0)
            bodyStats += "<b>Vaginal Capacity:</b> " + Math.round(this.player.vaginalCapacity()) + "\n" + "<b>Vaginal Looseness:</b> " + Math.round(this.player.looseness()) + "\n";

        if (this.player.findPerk(PerkLib.SpiderOvipositor) >= 0 || this.player.findPerk(PerkLib.BeeOvipositor) >= 0)
            bodyStats += "<b>Ovipositor Total Egg Count: " + this.player.eggs() + "\nOvipositor Fertilized Egg Count: " + this.player.fertilizedEggs() + "</b>\n";

        if (this.player.findStatusAffect(StatusAffects.SlimeCraving) >= 0) {
            if (this.player.statusAffectv1(StatusAffects.SlimeCraving) >= 18)
                bodyStats += "<b>Slime Craving:</b> Active! You are currently losing strength and speed.  You should find fluids.\n";
            else {
                if (this.player.findPerk(PerkLib.SlimeCore) >= 0)
                    bodyStats += "<b>Slime Stored:</b> " + ((17 - this.player.statusAffectv1(StatusAffects.SlimeCraving)) * 2) + " hours until you start losing strength.\n";
                else
                    bodyStats += "<b>Slime Stored:</b> " + (17 - this.player.statusAffectv1(StatusAffects.SlimeCraving)) + " hours until you start losing strength.\n";
            }
        }

        if (bodyStats != "")
            this.outputText("\n<b><u>Body Stats</u></b>\n" + bodyStats, false);
        // End Body Stats

        // Begin Misc Stats
        var miscStats: string = "";

        if (this.flags[kFLAGS.EGGS_BOUGHT] > 0)
            miscStats += "<b>Eggs Traded For:</b> " + this.flags[kFLAGS.EGGS_BOUGHT] + "\n";

        if (this.flags[kFLAGS.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY] > 0)
            miscStats += "<b>Times Had Fun with Feline Flexibility:</b> " + this.flags[kFLAGS.TIMES_AUTOFELLATIO_DUE_TO_CAT_FLEXABILITY] + "\n";

        if (this.flags[kFLAGS.FAP_ARENA_SESSIONS] > 0)
            miscStats += "<b>Times Circle Jerked in the Arena:</b> " + this.flags[kFLAGS.FAP_ARENA_SESSIONS] + "\n<b>Victories in the Arena:</b> " + this.flags[kFLAGS.FAP_ARENA_VICTORIES] + "\n";

        if (this.flags[kFLAGS.SPELLS_CAST] > 0)
            miscStats += "<b>Spells Cast:</b> " + this.flags[kFLAGS.SPELLS_CAST] + "\n";

        if (miscStats != "")
            this.outputText("\n<b><u>Miscellaneous Stats</u></b>\n" + miscStats);
        // End Misc Stats

        // Begin Addition Stats
        var addictStats: string = "";
        //Marble Milk Addition
        if (this.player.statusAffectv3(StatusAffects.Marble) > 0) {
            addictStats += "<b>Marble Milk:</b> ";
            if (this.player.findPerk(PerkLib.MarbleResistant) < 0 && this.player.findPerk(PerkLib.MarblesMilk) < 0)
                addictStats += Math.round(this.player.statusAffectv2(StatusAffects.Marble)) + "%\n";
            else if (this.player.findPerk(PerkLib.MarbleResistant) >= 0)
                addictStats += "0%\n";
            else
                addictStats += "100%\n";
        }

        // Mino Cum Addiction
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00340] > 0 || this.flags[kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] > 0 || this.player.findPerk(PerkLib.MinotaurCumAddict) >= 0) {
            if (this.player.findPerk(PerkLib.MinotaurCumAddict) < 0)
                addictStats += "<b>Minotaur Cum:</b> " + Math.round(this.flags[kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] * 10) / 10 + "%\n";
            else
                addictStats += "<b>Minotaur Cum:</b> 100+%\n";
        }

        if (addictStats != "")
            this.outputText("\n<b><u>Addictions</u></b>\n" + addictStats, false);
        // End Addition Stats

        // Begin Interpersonal Stats
        var interpersonStats: string = "";

        if (this.flags[kFLAGS.ARIAN_PARK] > 0)
            interpersonStats += "<b>Arian's Health:</b> " + Math.round(this.arianScene.arianHealth()) + "\n";

        if (this.flags[kFLAGS.ARIAN_VIRGIN] > 0)
            interpersonStats += "<b>Arian Sex Counter:</b> " + Math.round(this.flags[kFLAGS.ARIAN_VIRGIN]) + "\n";

        if (this.bazaar.benoit.benoitAffection() > 0)
            interpersonStats += "<b>" + this.bazaar.benoit.benoitMF("Benoit", "Benoite") + " Affection:</b> " + Math.round(this.bazaar.benoit.benoitAffection()) + "%\n";

        if (this.flags[kFLAGS.BROOKE_MET] > 0)
            interpersonStats += "<b>Brooke Affection:</b> " + Math.round(this.telAdre.brooke.brookeAffection()) + "\n";

        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00218] + this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00219] + this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00220] > 0)
            interpersonStats += "<b>Body Parts Taken By Ceraph:</b> " + (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00218] + this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00219] + this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00220]) + "\n";

        if (this.emberScene.emberAffection() > 0)
            interpersonStats += "<b>Ember Affection:</b> " + Math.round(this.emberScene.emberAffection()) + "%\n";

        if (this.helFollower.helAffection() > 0)
            interpersonStats += "<b>Helia Affection:</b> " + Math.round(this.helFollower.helAffection()) + "%\n";
        if (this.helFollower.helAffection() >= 100)
            interpersonStats += "<b>Helia Bonus Points:</b> " + Math.round(this.flags[kFLAGS.HEL_BONUS_POINTS]) + "\n";

        if (this.flags[kFLAGS.ISABELLA_AFFECTION] > 0) {
            interpersonStats += "<b>Isabella Affection:</b> ";

            if (!this.isabellaFollowerScene.isabellaFollower())
                interpersonStats += Math.round(this.flags[kFLAGS.ISABELLA_AFFECTION]) + "%\n", false;
            else
                interpersonStats += "100%\n";
        }

        if (this.flags[kFLAGS.KATHERINE_UNLOCKED] >= 4) {
            interpersonStats += "<b>Katherine Submissiveness:</b> " + this.telAdre.katherine.submissiveness() + "\n";
        }

        if (this.player.findStatusAffect(StatusAffects.Kelt) >= 0 && this.flags[kFLAGS.KELT_BREAK_LEVEL] == 0) {
            if (this.player.statusAffectv2(StatusAffects.Kelt) >= 130)
                interpersonStats += "<b>Submissiveness To Kelt:</b> " + 100 + "%\n";
            else
                interpersonStats += "<b>Submissiveness To Kelt:</b> " + Math.round(this.player.statusAffectv2(StatusAffects.Kelt) / 130 * 100) + "%\n";
        }

        if (this.flags[kFLAGS.ANEMONE_KID] > 0)
            interpersonStats += "<b>Kid A's Confidence:</b> " + this.anemoneScene.kidAXP() + "%\n";

        if (this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] == 2) {
            if (this.kihaFollower.followerKiha())
                interpersonStats += "<b>Kiha Affection:</b> " + 100 + "%\n";
            else
                interpersonStats += "<b>Kiha Affection:</b> " + Math.round(this.flags[kFLAGS.KIHA_AFFECTION]) + "%\n";
        }
        //Lottie stuff
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00281] > 0)
            interpersonStats += "<b>Lottie's Encouragement:</b> " + this.telAdre.lottie.lottieMorale() + " (higher is better)\n" + "<b>Lottie's Figure:</b> " + this.telAdre.lottie.lottieTone() + " (higher is better)\n";

        if (this.mountain.salon.lynnetteApproval() != 0)
            interpersonStats += "<b>Lynnette's Approval:</b> " + this.mountain.salon.lynnetteApproval() + "\n";

        if (this.flags[kFLAGS.OWCAS_ATTITUDE] > 0)
            interpersonStats += "<b>Owca's Attitude:</b> " + this.flags[kFLAGS.OWCAS_ATTITUDE] + "\n";

        if (this.telAdre.rubi.rubiAffection() > 0)
            interpersonStats += "<b>Rubi's Affection:</b> " + Math.round(this.telAdre.rubi.rubiAffection()) + "%\n" + "<b>Rubi's Orifice Capacity:</b> " + Math.round(this.telAdre.rubi.rubiCapacity()) + "%\n";

        if (this.flags[kFLAGS.SHEILA_XP] != 0) {
            interpersonStats += "<b>Sheila's Corruption:</b> " + this.sheilaScene.sheilaCorruption();
            if (this.sheilaScene.sheilaCorruption() > 100)
                interpersonStats += " (Yes, it can go above 100)";
            interpersonStats += "\n";
        }

        if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] != 0) {
            if (this.urta.urtaLove())
                interpersonStats += "<b>Urta Status:</b> Lover\n";
            else if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] == -1)
                interpersonStats += "<b>Urta Status:</b> Ashamed\n";
            else if (this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] < 30)
                interpersonStats += "<b>Urta's Affection:</b> " + Math.round(this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] * 3.3333) + "%\n";
            else
                interpersonStats += "<b>Urta Status:</b> Ready To Confess Love\n";
        }

        if (interpersonStats != "")
            this.outputText("\n<b><u>Interpersonal Stats</u></b>\n" + interpersonStats, false);
        // End Interpersonal Stats

        // Begin Ongoing Stat Effects
        var statEffects: string = "";

        if (this.player.inHeat)
            statEffects += "Heat - " + Math.round(this.player.statusAffectv3(StatusAffects.Heat)) + " hours remaining\n";

        if (this.player.inRut)
            statEffects += "Rut - " + Math.round(this.player.statusAffectv3(StatusAffects.Rut)) + " hours remaining\n";

        if (this.player.statusAffectv1(StatusAffects.Luststick) > 0)
            statEffects += "Luststick - " + Math.round(this.player.statusAffectv1(StatusAffects.Luststick)) + " hours remaining\n";

        if (this.player.statusAffectv1(StatusAffects.BlackCatBeer) > 0)
            statEffects += "Black Cat Beer - " + this.player.statusAffectv1(StatusAffects.BlackCatBeer) + " hours remaining (Lust resistance 20% lower, physical resistance 25% higher.)\n";

        if (statEffects != "")
            this.outputText("\n<b><u>Ongoing Status Effects</u></b>\n" + statEffects, false);
        // End Ongoing Stat Effects

        this.doNext(this.playerMenu);
    }

    public lustPercent(): number {
        var lust: number = 100;
        //2.5% lust resistance per level - max 75.
        if (this.player.level < 21) lust -= (this.player.level - 1) * 3;
        else lust = 40;

        //++++++++++++++++++++++++++++++++++++++++++++++++++
        //ADDITIVE REDUCTIONS
        //THESE ARE FLAT BONUSES WITH LITTLE TO NO DOWNSIDE
        //TOTAL IS LIMITED TO 75%!
        //++++++++++++++++++++++++++++++++++++++++++++++++++
        //Corrupted Libido reduces lust gain by 10%!
        if (this.player.findPerk(PerkLib.CorruptedLibido) >= 0) lust -= 10;
        //Acclimation reduces by 15%
        if (this.player.findPerk(PerkLib.Acclimation) >= 0) lust -= 15;
        //Purity blessing reduces lust gain
        if (this.player.findPerk(PerkLib.PurityBlessing) >= 0) lust -= 5;
        //Resistance = 10%
        if (this.player.findPerk(PerkLib.Resistance) >= 0) lust -= 10;
        if (this.player.findPerk(PerkLib.ChiReflowLust) >= 0) lust -= UmasShop.NEEDLEWORK_LUST_LUST_RESIST;

        if (lust < 25) lust = 25;
        if (this.player.statusAffectv1(StatusAffects.BlackCatBeer) > 0) {
            if (lust >= 80) lust = 100;
            else lust += 20;
        }
        lust += Math.round(this.player.perkv1(PerkLib.PentUp) / 2);
        //++++++++++++++++++++++++++++++++++++++++++++++++++
        //MULTIPLICATIVE REDUCTIONS
        //THESE PERKS ALSO RAISE MINIMUM LUST OR HAVE OTHER
        //DRAWBACKS TO JUSTIFY IT.
        //++++++++++++++++++++++++++++++++++++++++++++++++++
        //Bimbo body slows lust gains!
        if ((this.player.findStatusAffect(StatusAffects.BimboChampagne) >= 0 || this.player.findPerk(PerkLib.BimboBody) >= 0) && lust > 0) lust *= .75;
        if (this.player.findPerk(PerkLib.BroBody) >= 0 && lust > 0) lust *= .75;
        if (this.player.findPerk(PerkLib.FutaForm) >= 0 && lust > 0) lust *= .75;
        //Omnibus' Gift reduces lust gain by 15%
        if (this.player.findPerk(PerkLib.OmnibusGift) >= 0) lust *= .85;
        //Luststick reduces lust gain by 10% to match increased min lust
        if (this.player.findPerk(PerkLib.LuststickAdapted) >= 0) lust *= 0.9;
        if (this.player.findStatusAffect(StatusAffects.Berzerking) >= 0) lust *= .6;
        if (this.player.findPerk(PerkLib.PureAndLoving) >= 0) lust *= 0.95;

        // Lust mods from Uma's content -- Given the short duration and the gem cost, I think them being multiplicative is justified.
        // Changing them to an additive bonus should be pretty simple (check the static values in UmasShop.as)
        var statIndex: number = this.player.findStatusAffect(StatusAffects.UmasMassage);
        if (statIndex >= 0) {
            if (this.player.statusAffect(statIndex).value1 == UmasShop.MASSAGE_RELIEF || this.player.statusAffect(statIndex).value1 == UmasShop.MASSAGE_LUST) {
                lust *= this.player.statusAffect(statIndex).value2;
            }
        }

        lust = Math.round(lust);
        return lust;
    }

    // returns OLD OP VAL
    public applyOperator(old: number, op: string, val: number): number {
        switch (op) {
            case "=":
                return val;
            case "+":
                return old + val;
            case "-":
                return old - val;
            case "*":
                return old * val;
            case "/":
                return old / val;
            default:
                trace("applyOperator(" + old + ",'" + op + "'," + val + ") unknown op");
                return old;
        }
    }

    public testDynStatsEvent(): void {
        this.outputText("Old: " + this.player.str + " " + this.player.tou + " " + this.player.spe + " " + this.player.inte + " " + this.player.lib + " " + this.player.sens + " " + this.player.lust + "\n", true);
        this.dynStats("tou", 1, "spe+", 2, "int-", 3, "lib*", 2, "sen=", 25, "lust/", 2);
        this.outputText("Mod: 0 1 +2 -3 *2 =25 /2\n");
        this.outputText("New: " + this.player.str + " " + this.player.tou + " " + this.player.spe + " " + this.player.inte + " " + this.player.lib + " " + this.player.sens + " " + this.player.lust + "\n");
        this.doNext(this.playerMenu);
    }

    /**
     * Modify stats.
     *
     * Arguments should come in pairs nameOp: string, value: number/Boolean <br/>
     * where nameOp is ( stat_name + [operator] ) and value is operator argument<br/>
     * valid operators are "=" (set), "+", "-", "*", "/", add is default.<br/>
     * valid stat_names are "str", "tou", "spe", "int", "lib", "sen", "lus", "cor" or their full names; also "resisted"/"res" (apply lust resistance, default true) and "noBimbo"/"bim" (do not apply bimbo int gain reduction, default false)
     */
    public dynStats(...args): void {
        // Check num of args, we should have a multiple of 2
        if ((args.length % 2) != 0) {
            trace("dynStats aborted. Keys->Arguments could not be matched");
            return;
        }

        var argNamesFull: any[] = ["strength", "toughness", "speed", "intellect", "libido", "sensitivity", "lust", "corruption", "resisted", "noBimbo"]; // In case somebody uses full arg names etc
        var argNamesShort: any[] = ["str", "tou", "spe", "int", "lib", "sen", "lus", "cor", "res", "bim"]; // Arg names
        var argVals: any[] = [0, 0, 0, 0, 0, 0, 0, 0, true, false]; // Default arg values
        var argOps: any[] = ["+", "+", "+", "+", "+", "+", "+", "+", "=", "="];   // Default operators

        for (var i: number = 0; i < args.length; i += 2) {
            if (typeof (args[i]) == "string") {
                // Make sure the next arg has the POSSIBILITY of being correct
                if ((typeof (args[i + 1]) != "number") && (typeof (args[i + 1]) != "boolean")) {
                    trace("dynStats aborted. Next argument after argName is invalid! arg is type " + typeof (args[i + 1]));
                    continue;
                }

                var argIndex: number = -1;

                // Figure out which array to search
                var argsi: string = (args[i] as String);
                if (argsi == "lust") argsi = "lus";
                if (argsi == "sens") argsi = "sen";
                if (argsi.length <= 4) // Short
                {
                    argIndex = argNamesShort.indexOf(argsi.slice(0, 3));
                    if (argsi.length == 4 && argIndex != -1) argOps[argIndex] = argsi.charAt(3);
                }
                else // Full
                {
                    if ("+-*/=".indexOf(argsi.charAt(argsi.length - 1)) != -1) {
                        argIndex = argNamesFull.indexOf(argsi.slice(0, argsi.length - 1));
                        if (argIndex != -1) argOps[argIndex] = argsi.charAt(argsi.length - 1);
                    } else {
                        argIndex = argNamesFull.indexOf(argsi);
                    }
                }

                if (argIndex == -1) // Shit fucked up, welp
                {
                    trace("Couldn't find the arg name " + argsi + " in the index arrays. Welp!");
                    continue;
                }
                else // Stuff the value into our "values" array
                {
                    argVals[argIndex] = args[i + 1];
                }
            }
            else {
                trace("dynStats aborted. Expected a key and got SHIT");
                return;
            }
        }
        // Got this far, we have values to statsify
        var newStr: number = this.applyOperator(this.player.str, argOps[0], argVals[0]);
        var newTou: number = this.applyOperator(this.player.tou, argOps[1], argVals[1]);
        var newSpe: number = this.applyOperator(this.player.spe, argOps[2], argVals[2]);
        var newInte: number = this.applyOperator(this.player.inte, argOps[3], argVals[3]);
        var newLib: number = this.applyOperator(this.player.lib, argOps[4], argVals[4]);
        var newSens: number = this.applyOperator(this.player.sens, argOps[5], argVals[5]);
        var newLust: number = this.applyOperator(this.player.lust, argOps[6], argVals[6]);
        var newCor: number = this.applyOperator(this.player.cor, argOps[7], argVals[7]);
        // Because lots of checks and mods are made in the stats(), calculate deltas and pass them. However, this means that the '=' operator could be resisted
        // In future (as I believe) stats() should be replaced with dynStats(), and checks and mods should be made here
        this.stats(newStr - this.player.str,
            newTou - this.player.tou,
            newSpe - this.player.spe,
            newInte - this.player.inte,
            newLib - this.player.lib,
            newSens - this.player.sens,
            newLust - this.player.lust,
            newCor - this.player.cor,
            argVals[8], argVals[9]);

    }

    public stats(stre: number, toug: number, spee: number, intel: number, libi: number, sens: number, lust2: number, corr: number, resisted: boolean = true, noBimbo: boolean = false): void {
        //Easy mode cuts lust gains!
        if (this.flags[kFLAGS.EASY_MODE_ENABLE_FLAG] == 1 && lust2 > 0 && resisted) lust2 /= 2;

        //Set original values to begin tracking for up/down values if
        //they aren't set yet.
        //These are reset when up/down arrows are hidden with 
        //hideUpDown();
        //Just check str because they are either all 0 or real values
        if (this.oldStats.oldStr == 0) {
            this.oldStats.oldStr = this.player.str;
            this.oldStats.oldTou = this.player.tou;
            this.oldStats.oldSpe = this.player.spe;
            this.oldStats.oldInte = this.player.inte;
            this.oldStats.oldLib = this.player.lib;
            this.oldStats.oldSens = this.player.sens;
            this.oldStats.oldLust = this.player.lust;
            this.oldStats.oldCor = this.player.cor;
        }
        //MOD CHANGES FOR PERKS
        //Bimbos learn slower
        if (!noBimbo) {
            if (this.player.findPerk(PerkLib.FutaFaculties) >= 0 || this.player.findPerk(PerkLib.BimboBrains) >= 0 || this.player.findPerk(PerkLib.BroBrains) >= 0) {
                if (intel > 0) intel /= 2;
                if (intel < 0) intel *= 2;
            }
            if (this.player.findPerk(PerkLib.FutaForm) >= 0 || this.player.findPerk(PerkLib.BimboBody) >= 0 || this.player.findPerk(PerkLib.BroBody) >= 0) {
                if (libi > 0) libi *= 2;
                if (libi < 0) libi /= 2;
            }
        }

        // Uma's Perkshit
        if (this.player.findPerk(PerkLib.ChiReflowSpeed) >= 0 && spee < 0) spee *= UmasShop.NEEDLEWORK_SPEED_SPEED_MULTI;
        if (this.player.findPerk(PerkLib.ChiReflowLust) >= 0 && libi > 0) libi *= UmasShop.NEEDLEWORK_LUST_LIBSENSE_MULTI;
        if (this.player.findPerk(PerkLib.ChiReflowLust) >= 0 && sens > 0) sens *= UmasShop.NEEDLEWORK_LUST_LIBSENSE_MULTI;

        //lust resistance
        if (lust2 > 0 && resisted) lust2 *= this.lustPercent() / 100;
        if (libi > 0 && this.player.findPerk(PerkLib.PurityBlessing) >= 0) libi *= 0.75;
        if (corr > 0 && this.player.findPerk(PerkLib.PurityBlessing) >= 0) corr *= 0.5;
        if (corr > 0 && this.player.findPerk(PerkLib.PureAndLoving) >= 0) corr *= 0.75;
        //Change original stats
        this.player.str += stre;
        this.player.tou += toug;
        this.player.spe += spee;
        this.player.inte += intel;
        this.player.lib += libi;

        if (this.player.sens > 50 && sens > 0) sens /= 2;
        if (this.player.sens > 75 && sens > 0) sens /= 2;
        if (this.player.sens > 90 && sens > 0) sens /= 2;
        if (this.player.sens > 50 && sens < 0) sens *= 2;
        if (this.player.sens > 75 && sens < 0) sens *= 2;
        if (this.player.sens > 90 && sens < 0) sens *= 2;

        this.player.sens += sens;
        this.player.lust += lust2;
        this.player.cor += corr;

        //Bonus gain for perks!
        if (this.player.findPerk(PerkLib.Strong) >= 0 && stre >= 0) this.player.str += stre * this.player.perk(this.player.findPerk(PerkLib.Strong)).value1;
        if (this.player.findPerk(PerkLib.Tough) >= 0 && toug >= 0) this.player.tou += toug * this.player.perk(this.player.findPerk(PerkLib.Tough)).value1;
        if (this.player.findPerk(PerkLib.Fast) >= 0 && spee >= 0) this.player.spe += spee * this.player.perk(this.player.findPerk(PerkLib.Fast)).value1;
        if (this.player.findPerk(PerkLib.Smart) >= 0 && intel >= 0) this.player.inte += intel * this.player.perk(this.player.findPerk(PerkLib.Smart)).value1;
        if (this.player.findPerk(PerkLib.Lusty) >= 0 && libi >= 0) this.player.lib += libi * this.player.perk(this.player.findPerk(PerkLib.Lusty)).value1;
        if (this.player.findPerk(PerkLib.Sensitive) >= 0 && sens >= 0) this.player.sens += sens * this.player.perk(this.player.findPerk(PerkLib.Sensitive)).value1;

        // Uma's Str Cap from Perks
        if (this.player.findPerk(PerkLib.ChiReflowSpeed) >= 0) {
            if (this.player.str > UmasShop.NEEDLEWORK_SPEED_STRENGTH_CAP) {
                this.player.str = UmasShop.NEEDLEWORK_SPEED_STRENGTH_CAP;
            }
        }
        if (this.player.findPerk(PerkLib.ChiReflowDefense) >= 0) {
            if (this.player.spe > UmasShop.NEEDLEWORK_DEFENSE_SPEED_CAP) {
                this.player.spe = UmasShop.NEEDLEWORK_DEFENSE_SPEED_CAP;
            }
        }

        //Keep stats in bounds
        if (this.player.cor < 0) this.player.cor = 0;
        if (this.player.cor > 100) this.player.cor = 100;
        if (this.player.str > 100) this.player.str = 100;
        if (this.player.str < 1) this.player.str = 1;
        if (this.player.tou > 100) this.player.tou = 100;
        if (this.player.tou < 1) this.player.tou = 1;
        if (this.player.spe > 100) this.player.spe = 100;
        if (this.player.spe < 1) this.player.spe = 1;
        if (this.player.inte > 100) this.player.inte = 100;
        if (this.player.inte < 1) this.player.inte = 1;
        if (this.player.lib > 100) this.player.lib = 100;
        //Minimum libido = 15.
        if (this.player.lib < 50 && this.player.armorName == "lusty maiden's armor") this.player.lib = 50;
        else if (this.player.lib < 15 && this.player.gender > 0) this.player.lib = 15;
        else if (this.player.lib < 10 && this.player.gender == 0) this.player.lib = 10;
        if (this.player.lib < this.minLust() * 2 / 3) this.player.lib = this.minLust() * 2 / 3;

        //Minimum sensitivity.
        if (this.player.sens > 100) this.player.sens = 100;
        if (this.player.sens < 10) this.player.sens = 10;

        //Add HP for toughness change.
        this.HPChange(toug * 2, false);
        //Reduce hp if over max
        if (this.player.HP > this.maxHP()) this.player.HP = this.maxHP();

        //Combat bounds
        if (this.player.lust > 99) this.player.lust = 100;
        //if(player.lust < player.lib) {
        //        player.lust=player.lib;
        //
        //Update to minimum lust if lust falls below it.
        if (this.player.lust < this.minLust()) this.player.lust = this.minLust();
        //worms raise min lust!
        if (this.player.findStatusAffect(StatusAffects.Infested) >= 0) {
            if (this.player.lust < 50) this.player.lust = 50;
        }
        if (this.player.lust > 100) this.player.lust = 100;
        if (this.player.lust < 0) this.player.lust = 0;

        //Refresh the stat pane with updated values
        this.mainView.statsView.showUpDown();
        this.statScreenRefresh();
    }
    public range(min: number, max: number, round: boolean = false): number {
        var num: number = (min + Math.random() * (max - min));

        if (round) return Math.round(num);
        return num;
    }

    public cuntChangeOld(cIndex: number, vIndex: number, display: boolean): void {
        //Virginity check
        if (this.player.vaginas[vIndex].virgin) {
            if (display) this.outputText("\nYour " + this.vaginaDescript(vIndex) + " loses its virginity!", false);
            this.player.vaginas[vIndex].virgin = false;
        }
        //If cock is bigger than unmodified vagina can hold - 100% stretch!
        if (this.player.vaginas[vIndex].capacity() <= this.monster.cocks[cIndex].cArea()) {
            if (this.player.vaginas[vIndex] < 5) {
                trace("CUNT STRETCHED: By cock larger than it's total capacity.");
                if (display) {
                    if (this.player.vaginas[vIndex].vaginalLooseness == CoC.VAGINA_LOOSENESS_GAPING_WIDE) this.outputText("<b>Your " + this.vaginaDescript(0) + " is stretched even further, capable of taking even the largest of demons and beasts.</b>  ", false);
                    if (this.player.vaginas[vIndex].vaginalLooseness == CoC.VAGINA_LOOSENESS_GAPING) this.outputText("<b>Your " + this.vaginaDescript(0) + " painfully stretches, gaping wide-open.</b>  ", false);
                    if (this.player.vaginas[vIndex].vaginalLooseness == CoC.VAGINA_LOOSENESS_LOOSE) this.outputText("<b>Your " + this.vaginaDescript(0) + " is now very loose.</b>  ", false);
                    if (this.player.vaginas[vIndex].vaginalLooseness == CoC.VAGINA_LOOSENESS_NORMAL) this.outputText("<b>Your " + this.vaginaDescript(0) + " is now loose.</b>  ", false);
                    if (this.player.vaginas[vIndex].vaginalLooseness == CoC.VAGINA_LOOSENESS_TIGHT) this.outputText("<b>Your " + this.vaginaDescript(0) + " loses its virgin-like tightness.</b>  ", false);
                }
                this.player.vaginas[vIndex].vaginalLooseness++;
            }
        }
        //If cock is within 75% of max, streeeeetch 33% of the time
        if (this.player.vaginas[vIndex].capacity() * .75 <= this.monster.cocks[cIndex].cArea()) {
            if (this.player.vaginas[vIndex] < 5) {
                trace("CUNT STRETCHED: By cock @ 75% of capacity.");
                if (display) {
                    if (this.player.vaginas[vIndex].vaginalLooseness == CoC.VAGINA_LOOSENESS_GAPING_WIDE) this.outputText("<b>Your " + this.vaginaDescript(0) + " is stretched even further, capable of taking even the largest of demons and beasts.</b>  ", false);
                    if (this.player.vaginas[vIndex].vaginalLooseness == CoC.VAGINA_LOOSENESS_GAPING) this.outputText("<b>Your " + this.vaginaDescript(0) + " painfully stretches, gaping wide-open.</b>  ", false);
                    if (this.player.vaginas[vIndex].vaginalLooseness == CoC.VAGINA_LOOSENESS_LOOSE) this.outputText("<b>Your " + this.vaginaDescript(0) + " is now very loose.</b>  ", false);
                    if (this.player.vaginas[vIndex].vaginalLooseness == CoC.VAGINA_LOOSENESS_NORMAL) this.outputText("<b>Your " + this.vaginaDescript(0) + " is now loose.</b>  ", false);
                    if (this.player.vaginas[vIndex].vaginalLooseness == CoC.VAGINA_LOOSENESS_TIGHT) this.outputText("<b>Your " + this.vaginaDescript(0) + " loses its virgin-like tightness.</b>  ", false);
                }
                this.player.vaginas[vIndex].vaginalLooseness++;
            }
        }
    }

    public spriteSelect(choice: number = 0): void {
        if (this.flags[kFLAGS.SHOW_SPRITES_FLAG] == 0) {
            this.mainView.selectSprite(choice);
        }
        else {
            if (choice >= 0) {
                trace("hiding sprite because flags");
                this.mainView.selectSprite(-1);
            }
        }
    }

    // include "../../includes/appearanceDefs.as";

    // The comment structure in the following section is very specific, as the comment contents
    // are actually parsed into regexes that are used by my refactoring tool to refactor
    // the relevant descriptions.

    // Description constants

    // gender
    public static GENDER_NONE: number = 0;
    public static GENDER_MALE: number = 1;
    public static GENDER_FEMALE: number = 2;
    public static GENDER_HERM: number = 3;

    // skinType
    public static SKIN_TYPE_PLAIN: number = 0;
    public static SKIN_TYPE_FUR: number = 1;
    public static SKIN_TYPE_SCALES: number = 2;
    public static SKIN_TYPE_GOO: number = 3;
    public static SKIN_TYPE_UNDEFINED: number = 4;

    // hairType
    public static HAIR_NORMAL: number = 0;
    public static HAIR_FEATHER: number = 1;
    public static HAIR_GHOST: number = 2;
    public static HAIR_GOO: number = 3;
    public static HAIR_ANEMONE: number = 4;

    // faceType
    public static FACE_HUMAN: number = 0;
    public static FACE_HORSE: number = 1;
    public static FACE_DOG: number = 2;
    public static FACE_COW_MINOTAUR: number = 3;
    public static FACE_SHARK_TEETH: number = 4;
    public static FACE_SNAKE_FANGS: number = 5;
    public static FACE_CAT: number = 6;
    public static FACE_LIZARD: number = 7;
    public static FACE_BUNNY: number = 8;
    public static FACE_KANGAROO: number = 9;
    public static FACE_SPIDER_FANGS: number = 10;
    public static FACE_FOX: number = 11;
    public static FACE_DRAGON: number = 12;
    public static FACE_RACCOON_MASK: number = 13;
    public static FACE_RACCOON: number = 14;
    public static FACE_BUCKTEETH: number = 15;
    public static FACE_MOUSE: number = 16;
    public static FACE_FERRET_MASK: number = 17;
    public static FACE_FERRET: number = 18;

    // tongueType
    public static TONUGE_HUMAN: number = 0;
    public static TONUGE_SNAKE: number = 1;
    public static TONUGE_DEMONIC: number = 2;
    public static TONUGE_DRACONIC: number = 3;

    // eyeType
    public static EYES_HUMAN: number = 0;
    public static EYES_FOUR_SPIDER_EYES: number = 1;
    public static EYES_BLACK_EYES_SAND_TRAP: number = 2;

    // earType
    public static EARS_HUMAN: number = 0;
    public static EARS_HORSE: number = 1;
    public static EARS_DOG: number = 2;
    public static EARS_COW: number = 3;
    public static EARS_ELFIN: number = 4;
    public static EARS_CAT: number = 5;
    public static EARS_LIZARD: number = 6;
    public static EARS_BUNNY: number = 7;
    public static EARS_KANGAROO: number = 8;
    public static EARS_FOX: number = 9;
    public static EARS_DRAGON: number = 10;
    public static EARS_RACCOON: number = 11;
    public static EARS_MOUSE: number = 12;
    public static EARS_FERRET: number = 13;

    // hornType
    public static HORNS_NONE: number = 0;
    public static HORNS_DEMON: number = 1;
    public static HORNS_COW_MINOTAUR: number = 2;
    public static HORNS_DRACONIC_X2: number = 3;
    public static HORNS_DRACONIC_X4_12_INCH_LONG: number = 4;
    public static HORNS_ANTLERS: number = 5;

    // antennae
    public static ANTENNAE_NONE: number = 0;
    public static ANTENNAE_BEE: number = 2;

    // armType
    public static ARM_TYPE_HUMAN: number = 0;
    public static ARM_TYPE_HARPY: number = 1;
    public static ARM_TYPE_SPIDER: number = 2;

    // tailType
    public static TAIL_TYPE_NONE: number = 0;
    public static TAIL_TYPE_HORSE: number = 1;
    public static TAIL_TYPE_DOG: number = 2;
    public static TAIL_TYPE_DEMONIC: number = 3;
    public static TAIL_TYPE_COW: number = 4;
    public static TAIL_TYPE_SPIDER_ADBOMEN: number = 5;
    public static TAIL_TYPE_BEE_ABDOMEN: number = 6;
    public static TAIL_TYPE_SHARK: number = 7;
    public static TAIL_TYPE_CAT: number = 8;
    public static TAIL_TYPE_LIZARD: number = 9;
    public static TAIL_TYPE_RABBIT: number = 10;
    public static TAIL_TYPE_HARPY: number = 11;
    public static TAIL_TYPE_KANGAROO: number = 12;
    public static TAIL_TYPE_FOX: number = 13;
    public static TAIL_TYPE_DRACONIC: number = 14;
    public static TAIL_TYPE_RACCOON: number = 15;
    public static TAIL_TYPE_MOUSE: number = 16;
    public static TAIL_TYPE_FERRET: number = 17;

    //breast size
    public static BREAST_CUP_FLAT: number = 0;
    public static BREAST_CUP_A: number = 1;
    public static BREAST_CUP_B: number = 2;
    public static BREAST_CUP_C: number = 3;
    public static BREAST_CUP_D: number = 4;
    public static BREAST_CUP_DD: number = 5;
    public static BREAST_CUP_DD_BIG: number = 6;
    public static BREAST_CUP_E: number = 7;
    public static BREAST_CUP_E_BIG: number = 8;
    public static BREAST_CUP_EE: number = 9;
    public static BREAST_CUP_EE_BIG: number = 10;
    public static BREAST_CUP_F: number = 11;
    public static BREAST_CUP_F_BIG: number = 12;
    public static BREAST_CUP_FF: number = 13;
    public static BREAST_CUP_FF_BIG: number = 14;
    public static BREAST_CUP_G: number = 15;
    public static BREAST_CUP_G_BIG: number = 16;
    public static BREAST_CUP_GG: number = 17;
    public static BREAST_CUP_GG_BIG: number = 18;
    public static BREAST_CUP_H: number = 19;
    public static BREAST_CUP_H_BIG: number = 20;
    public static BREAST_CUP_HH: number = 21;
    public static BREAST_CUP_HH_BIG: number = 22;
    public static BREAST_CUP_HHH: number = 23;
    public static BREAST_CUP_I: number = 24;
    public static BREAST_CUP_I_BIG: number = 25;
    public static BREAST_CUP_II: number = 26;
    public static BREAST_CUP_II_BIG: number = 27;
    public static BREAST_CUP_J: number = 28;
    public static BREAST_CUP_J_BIG: number = 29;
    public static BREAST_CUP_JJ: number = 30;
    public static BREAST_CUP_JJ_BIG: number = 31;
    public static BREAST_CUP_K: number = 32;
    public static BREAST_CUP_K_BIG: number = 33;
    public static BREAST_CUP_KK: number = 34;
    public static BREAST_CUP_KK_BIG: number = 35;
    public static BREAST_CUP_L: number = 36;
    public static BREAST_CUP_L_BIG: number = 37;
    public static BREAST_CUP_LL: number = 38;
    public static BREAST_CUP_LL_BIG: number = 39;
    public static BREAST_CUP_M: number = 40;
    public static BREAST_CUP_M_BIG: number = 41;
    public static BREAST_CUP_MM: number = 42;
    public static BREAST_CUP_MM_BIG: number = 43;
    public static BREAST_CUP_MMM: number = 44;
    public static BREAST_CUP_MMM_LARGE: number = 45;
    public static BREAST_CUP_N: number = 46;
    public static BREAST_CUP_N_LARGE: number = 47;
    public static BREAST_CUP_NN: number = 48;
    public static BREAST_CUP_NN_LARGE: number = 49;
    public static BREAST_CUP_O: number = 50;
    public static BREAST_CUP_O_LARGE: number = 51;
    public static BREAST_CUP_OO: number = 52;
    public static BREAST_CUP_OO_LARGE: number = 53;
    public static BREAST_CUP_P: number = 54;
    public static BREAST_CUP_P_LARGE: number = 55;
    public static BREAST_CUP_PP: number = 56;
    public static BREAST_CUP_PP_LARGE: number = 57;
    public static BREAST_CUP_Q: number = 58;
    public static BREAST_CUP_Q_LARGE: number = 59;
    public static BREAST_CUP_QQ: number = 60;
    public static BREAST_CUP_QQ_LARGE: number = 61;
    public static BREAST_CUP_R: number = 62;
    public static BREAST_CUP_R_LARGE: number = 63;
    public static BREAST_CUP_RR: number = 64;
    public static BREAST_CUP_RR_LARGE: number = 65;
    public static BREAST_CUP_S: number = 66;
    public static BREAST_CUP_S_LARGE: number = 67;
    public static BREAST_CUP_SS: number = 68;
    public static BREAST_CUP_SS_LARGE: number = 69;
    public static BREAST_CUP_T: number = 70;
    public static BREAST_CUP_T_LARGE: number = 71;
    public static BREAST_CUP_TT: number = 72;
    public static BREAST_CUP_TT_LARGE: number = 73;
    public static BREAST_CUP_U: number = 74;
    public static BREAST_CUP_U_LARGE: number = 75;
    public static BREAST_CUP_UU: number = 76;
    public static BREAST_CUP_UU_LARGE: number = 77;
    public static BREAST_CUP_V: number = 78;
    public static BREAST_CUP_V_LARGE: number = 79;
    public static BREAST_CUP_VV: number = 80;
    public static BREAST_CUP_VV_LARGE: number = 81;
    public static BREAST_CUP_W: number = 82;
    public static BREAST_CUP_W_LARGE: number = 83;
    public static BREAST_CUP_WW: number = 84;
    public static BREAST_CUP_WW_LARGE: number = 85;
    public static BREAST_CUP_X: number = 86;
    public static BREAST_CUP_X_LARGE: number = 87;
    public static BREAST_CUP_XX: number = 88;
    public static BREAST_CUP_XX_LARGE: number = 89;
    public static BREAST_CUP_Y: number = 90;
    public static BREAST_CUP_Y_LARGE: number = 91;
    public static BREAST_CUP_YY: number = 92;
    public static BREAST_CUP_YY_LARGE: number = 93;
    public static BREAST_CUP_Z: number = 94;
    public static BREAST_CUP_Z_LARGE: number = 95;
    public static BREAST_CUP_ZZ: number = 96;
    public static BREAST_CUP_ZZ_LARGE: number = 97;
    public static BREAST_CUP_ZZZ: number = 98;
    public static BREAST_CUP_ZZZ_LARGE: number = 99;

    // wingType
    public static WING_TYPE_NONE: number = 0;
    public static WING_TYPE_BEE_LIKE_SMALL: number = 1;
    public static WING_TYPE_BEE_LIKE_LARGE: number = 2;
    public static WING_TYPE_HARPY: number = 4;
    public static WING_TYPE_IMP: number = 5;
    public static WING_TYPE_BAT_LIKE_TINY: number = 6;
    public static WING_TYPE_BAT_LIKE_LARGE: number = 7;
    public static WING_TYPE_SHARK_FIN: number = 8;
    public static WING_TYPE_FEATHERED_LARGE: number = 9;
    public static WING_TYPE_DRACONIC_SMALL: number = 10;
    public static WING_TYPE_DRACONIC_LARGE: number = 11;
    public static WING_TYPE_GIANT_DRAGONFLY: number = 12;

    // lowerBody
    public static LOWER_BODY_TYPE_HUMAN: number = 0;
    public static LOWER_BODY_TYPE_HOOFED: number = 1;
    public static LOWER_BODY_TYPE_DOG: number = 2;
    public static LOWER_BODY_TYPE_NAGA: number = 3;
    public static LOWER_BODY_TYPE_CENTAUR: number = 4;
    public static LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS: number = 5;
    public static LOWER_BODY_TYPE_DEMONIC_CLAWS: number = 6;
    public static LOWER_BODY_TYPE_BEE: number = 7;
    public static LOWER_BODY_TYPE_GOO: number = 8;
    public static LOWER_BODY_TYPE_CAT: number = 9;
    public static LOWER_BODY_TYPE_LIZARD: number = 10;
    public static LOWER_BODY_TYPE_PONY: number = 11;
    public static LOWER_BODY_TYPE_BUNNY: number = 12;
    public static LOWER_BODY_TYPE_HARPY: number = 13;
    public static LOWER_BODY_TYPE_KANGAROO: number = 14;
    public static LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS: number = 15;
    public static LOWER_BODY_TYPE_DRIDER_LOWER_BODY: number = 16;
    public static LOWER_BODY_TYPE_FOX: number = 17;
    public static LOWER_BODY_TYPE_DRAGON: number = 18;
    public static LOWER_BODY_TYPE_RACCOON: number = 19;
    public static LOWER_BODY_FERRET: number = 20;

    // piercingtypesNOPEDISABLED
    public static PIERCING_TYPE_NONE: number = 0;
    public static PIERCING_TYPE_STUD: number = 1;
    public static PIERCING_TYPE_RING: number = 2;
    public static PIERCING_TYPE_LADDER: number = 3;
    public static PIERCING_TYPE_HOOP: number = 4;
    public static PIERCING_TYPE_CHAIN: number = 5;

    // vaginatypesNOPEDISABLED
    public static VAGINA_TYPE_HUMAN: number = 0;
    public static VAGINA_TYPE_BLACK_SAND_TRAP: number = 5;

    // vaginalWetness
    public static VAGINA_WETNESS_DRY: number = 0;
    public static VAGINA_WETNESS_NORMAL: number = 1;
    public static VAGINA_WETNESS_WET: number = 2;
    public static VAGINA_WETNESS_SLICK: number = 3;
    public static VAGINA_WETNESS_DROOLING: number = 4;
    public static VAGINA_WETNESS_SLAVERING: number = 5;

    // vaginalLooseness
    public static VAGINA_LOOSENESS_TIGHT: number = 0;
    public static VAGINA_LOOSENESS_NORMAL: number = 1;
    public static VAGINA_LOOSENESS_LOOSE: number = 2;
    public static VAGINA_LOOSENESS_GAPING: number = 3;
    public static VAGINA_LOOSENESS_GAPING_WIDE: number = 4;
    public static VAGINA_LOOSENESS_LEVEL_CLOWN_CAR: number = 5;

    // analwetnesslevelsNOPEDISABLED
    public static ANAL_WETNESS_DRY: number = 0;
    public static ANAL_WETNESS_NORMAL: number = 1;
    public static ANAL_WETNESS_MOIST: number = 2;
    public static ANAL_WETNESS_SLIMY: number = 3;
    public static ANAL_WETNESS_DROOLING: number = 4;
    public static ANAL_WETNESS_SLIME_DROOLING: number = 5;

    // analloosenesslevelsNOPEDISABLED
    public static ANAL_LOOSENESS_VIRGIN: number = 0;
    public static ANAL_LOOSENESS_TIGHT: number = 1;
    public static ANAL_LOOSENESS_NORMAL: number = 2;
    public static ANAL_LOOSENESS_LOOSE: number = 3;
    public static ANAL_LOOSENESS_STRETCHED: number = 4;
    public static ANAL_LOOSENESS_GAPING: number = 5;

    // hipRating
    public static HIP_RATING_BOYISH: number = 0;
    public static HIP_RATING_SLENDER: number = 2;
    public static HIP_RATING_AVERAGE: number = 4;
    public static HIP_RATING_AMPLE: number = 6;
    public static HIP_RATING_CURVY: number = 10;
    public static HIP_RATING_FERTILE: number = 15;
    public static HIP_RATING_INHUMANLY_WIDE: number = 20;

    // buttRating
    public static BUTT_RATING_BUTTLESS: number = 0;
    public static BUTT_RATING_TIGHT: number = 2;
    public static BUTT_RATING_AVERAGE: number = 4;
    public static BUTT_RATING_NOTICEABLE: number = 6;
    public static BUTT_RATING_LARGE: number = 8;
    public static BUTT_RATING_JIGGLY: number = 10;
    public static BUTT_RATING_EXPANSIVE: number = 13;
    public static BUTT_RATING_HUGE: number = 16;
    public static BUTT_RATING_INCONCEIVABLY_BIG: number = 20;

    // End Description constants


    // include "../../includes/april_fools.as";

    // include "../../includes/dreams.as";

    // include "../../includes/dungeon2Supplimental.as";

    // include "../../includes/dungeonCore.as";

    // include "../../includes/dungeonHelSupplimental.as";

    // include "../../includes/dungeonSandwitch.as";

    // include "../../includes/fera.as";

    // include "../../includes/pregnancy.as";

    // include "../../includes/runa.as";

    // include "../../includes/symGear.as";

    // include "../../includes/tamaniDildo.as";

    // include "../../includes/thanksgiving.as";

    // include "../../includes/valentines.as";

    // include "../../includes/worms.as";

    // include "../../includes/xmas_bitch.as";

    // include "../../includes/xmas_gats_not_an_angel.as";

    // include "../../includes/xmas_jack_frost.as";

    // include "../../includes/xmas_misc.as";

}

