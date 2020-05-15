import { bindToClass } from "../ClassBinder";
import { MainView } from "../view/MainView";
import { BoundControlMethod } from "./BoundControlMethod";
import { BindingPane } from "./display/BindingPane";

/**
 * Generic input manager
 * I feel sick writing some of these control functors; rather than having some form of queryable game state
 * we're checking for the presence (and sometimes, the label contents) of UI elements to determine what state
 * the game is currently in.
 *
 * @author Gedan
 */
export class InputManager {
    // Declaring some consts for clarity when using some of the InputManager methods
    public static PRIMARYKEY = true;
    public static SECONDARYKEY = false;
    public static NORMALCONTROL = false;
    public static CHEATCONTROL = true;
    public static UNBOUNDKEY = -1;

    // private _stage: Stage;
    // private _debug: boolean;

    private _defaultControlMethods: Record<string, any> = new Object();
    private _defaultAvailableControlMethods = 0;
    private _defaultKeysToControlMethods: Record<string, any> = new Object();

    // Basically, an associative list of Names -> Control Methods
    private _controlMethods: Record<string, any> = new Object();
    private _availableControlMethods = 0;

    // A list of cheat control methods that we can throw incoming keycodes against at will
    private _cheatControlMethods: any[] = [];
    private _availableCheatControlMethods = 0;

    // The primary lookup method for finding what method an incoming keycode should belong too
    // Sparse array of keyCode -> BoundControlMethod.Name, used to look into _controlMethods
    private _keysToControlMethods: Record<string, any> = new Object();

    // Visual shit
    private _mainView: MainView;
    // private _mainText: TextField;
    // private _mainTextScollBar: UIScrollBar;

    // A new UI element that we can embed buttons into to facilitate key rebinding
    private _bindingPane: BindingPane;

    // A flag to determine if we're listening for keyCodes to execute, or keyCodes to bind a method against
    private _bindingMode: boolean;
    private _bindingFunc = "";
    private _bindingSlot = false;

    /**
     * Init the InputManager. Attach the keyboard event listener to the stage and prepare the subobjects for usage.
     *
     * @param stage Reference to core stage on which to add display objects
     * @param debug Emit debugging trace statements
     */
    public constructor(mainView: MainView) {
        bindToClass(this);

        this._bindingMode = false;
        // this._debug = debug;

        // this._stage = stage;
        this._mainView = mainView;
        this._availableControlMethods = 0;
        this._availableCheatControlMethods = 0;

        // this._stage.addEventListener(KeyboardEvent.KEY_DOWN, this.KeyHandler);
        document.body.addEventListener("keydown", this.KeyHandler);

        // this._mainView = mainView;
        // this._mainText = (this._stage.getChildByName("mainView") as MovieClip).mainText as TextField;
        // this._mainTextScollBar = (this._stage.getChildByName("mainView") as MovieClip).scrollBar as UIScrollBar;

        this._bindingPane = new BindingPane(this);
    }

    /**
     * Mode toggle - keyboard events recieved by the input manager will be used to associated the incoming keycode
     * with a new bound control method, removing the keycode from *other* bindings and updating data as appropriate.
     * Displays a message indicating the player should do the needful.
     *
     * @param funcName BoundControlMethod name that they key is going to be associated with. Set by a button
     *
//
//
// callback function generated in BindingPane
     * @param isPrimary Specifies if the incoming bind will replace/set the primary or secondary bind for a control.
     */
    public ListenForNewBind(funcName: string, isPrimary = true): void {
        // if (this._debug) {
        //     var slot: string = "";

        //     if (isPrimary) {
        //         slot = "Primary";
        //     }
        //     else {
        //         slot = "Secondary";
        //     }

        //     trace("Listening for a new " + slot + " bind for " + funcName);
        // }

        this._bindingMode = true;
        this._bindingFunc = funcName;
        this._bindingSlot = isPrimary;

        // this._mainText.htmlText = "<b>Hit the key that you want to bind " + funcName + " to!</b>";

        // hide some buttons that will fuck shit up
        this._mainView.hideCurrentBottomButtons();

        // this.HideBindingPane();

        this._mainView.mainText.innerHTML = `<b>Hit the key that you want to bind ${funcName} to!</b>`;
    }

    /**
     * Mode toggle - return to normal keyboard event listening mechanics. Shows the binding display again.
     */
    public StopListenForNewBind(): void {
        this._bindingMode = false;
        this._mainView.showCurrentBottomButtons();
        this.DisplayBindingPane();
    }

    /**
     * Add a new action that can be associated with incoming key codes.
     * This will mostly be static after first being initialized, this pattern was just easier to capture references
     * to the required game functions without having to make the InputManager truely global or doing any namespacing
     * shenanigans.
     * The closure can be declared with the rest of the game code, in the namespace where the functions are available,
     * and still work inside this object.
     *
     * @param name
// Name to associate the BoundControlMethod with
     * @param desc
// A description of the activity that the BoundControlMethod does. (Unused, but implemented)
     * @param func
// A function object that defines the BoundControlMethods action
     * @param isCheat
// Differentiates between a cheat method (not displayed in the UI) and normal controls.
     */
    public AddBindableControl(name: string, desc: string, func: any, isCheat = false): void {
        if (isCheat) {
            this._cheatControlMethods.push(
                new BoundControlMethod(func, name, desc, this._availableCheatControlMethods++)
            );
        } else {
            this._controlMethods[name] = new BoundControlMethod(
                func,
                name,
                desc,
                this._availableControlMethods++
            );
        }
    }

    /**
     * Set either the primary or secondary binding for a target control method to a given keycode.
     *
     * @param keyCode
// The keycode to bind the method to.
     * @param funcName The name of the associated BoundControlMethod
     * @param isPrimary Specifies the primary or secondary binding slot
     */
    public BindKeyToControl(keyCode: number, funcName: string, isPrimary = true): void {
        for (const key of Object.keys(this._controlMethods)) {
            // Find the method we want to bind the incoming key to
            if (funcName == key) {
                // Check if the incoming key is already bound to *something* and if it is, remove the bind.
                this.RemoveExistingKeyBind(keyCode);

                // If we're binding the primary key of the method...
                if (isPrimary) {
                    // If the primary key of the method is already bound, removing the existing bind
                    if (this._controlMethods[key].PrimaryKey != InputManager.UNBOUNDKEY) {
                        delete this._keysToControlMethods[this._controlMethods[key].PrimaryKey];
                    }

                    // Add the new bind
                    this._keysToControlMethods[keyCode] = key;
                    this._controlMethods[key].PrimaryKey = keyCode;
                    return;
                }
                // We're doing the secondary key of the method
                else {
                    // If the secondary key is already bound, remove the existing bind
                    if (this._controlMethods[key].SecondaryKey != InputManager.UNBOUNDKEY) {
                        delete this._keysToControlMethods[this._controlMethods[key].SecondaryKey];
                    }

                    // Add the new bind
                    this._keysToControlMethods[keyCode] = key;
                    this._controlMethods[key].SecondaryKey = keyCode;
                    return;
                }
            }
        }

        // if (this._debug) trace("Failed to bind control method [" + funcName + "] to keyCode [" + keyCode + "]");
    }

    /**
     * Remove an existing key from a BoundControlMethod, if present, and shuffle the remaining key as appropriate
     *
     * @param keyCode
// The keycode to remove.
     */
    public RemoveExistingKeyBind(keyCode: number): void {
        // If the key is already bound to a method, remove it from that method
        if (this._keysToControlMethods[keyCode] != undefined) {
            if (this._controlMethods[this._keysToControlMethods[keyCode]].PrimaryKey == keyCode) {
                this._controlMethods[
                    this._keysToControlMethods[keyCode]
                ].PrimaryKey = this._controlMethods[
                    this._keysToControlMethods[keyCode]
                ].SecondaryKey;
                this._controlMethods[this._keysToControlMethods[keyCode]].SecondaryKey =
                    InputManager.UNBOUNDKEY;
            } else if (
                this._controlMethods[this._keysToControlMethods[keyCode]].SecondaryKey == keyCode
            ) {
                this._controlMethods[this._keysToControlMethods[keyCode]].SecondaryKey =
                    InputManager.UNBOUNDKEY;
            }
        }
    }

    /**
     * The core event handler we attach to the stage to capture incoming keyboard events.
     *
     * @param e
// KeyboardEvent data
     */
    public KeyHandler(e: KeyboardEvent): void {
        // if (this._debug) trace("Got key input " + e.keyCode);

        // Ignore key input during certain phases of gamestate
        // if (this._mainView.eventTestInput.x == 207.5) {
        //     return;
        // }

        if (this._mainView.mainText.getElementsByTagName("input").length > 0) {
            return;
        }

        // If we're not in binding mode, listen for key inputs to act on
        if (this._bindingMode == false) {
            // Made it this far, process the key and call the relevant (if any) function
            this.ExecuteKeyCode(e.keyCode);
        }
        // Otherwise, we're listening for a new keycode from the player
        else {
            this.BindKeyToControl(e.keyCode, this._bindingFunc, this._bindingSlot);
            this.StopListenForNewBind();
        }
    }

    /**
     * Execute the BoundControlMethod's wrapped function associated with the given KeyCode
     *
     * @param keyCode
// The KeyCode for which we wish to execute the BoundControlMethod for.
     */
    private ExecuteKeyCode(keyCode: number): void {
        if (this._keysToControlMethods[keyCode] != undefined) {
            // if (this._debug) trace("Attempting to exec func [" + this._controlMethods[this._keysToControlMethods[keyCode]].Name + "]");

            this._controlMethods[this._keysToControlMethods[keyCode]].ExecFunc();
        }

        for (const method of this._cheatControlMethods) {
            method.ExecFunc(keyCode);
        }
    }

    /**
     * Hide the mainText object and scrollbar, ensure the binding ScrollPane is up to date with the latest
     * data and then show the binding scrollpane.
     */
    public DisplayBindingPane(): void {
        // this._mainText.visible = false;
        // this._mainTextScollBar.visible = false;

        this._bindingPane.functions = this.GetAvailableFunctions();
        this._bindingPane.ListBindingOptions();

        // this._stage.addChild(this._bindingPane);
        this._mainView.mainText.appendChild(this._bindingPane.element);
    }

    /**
     * Hide the binding ScrollPane, and re-display the mainText object + Scrollbar.
     */
    public HideBindingPane(): void {
        // this._mainText.visible = true;
        // this._mainTextScollBar.visible = true;
        // this._stage.removeChild(this._bindingPane);
        // this._mainView.mainText.innerHTML = '';
    }

    /**
     * Register the current methods, and their associated bindings, as the defaults.
     * TODO: Finish this shit off
     */
    public RegisterDefaults(): void {
        for (const key of Object.keys(this._controlMethods)) {
            this._defaultControlMethods[key] = new BoundControlMethod(
                this._controlMethods[key].Func,
                this._controlMethods[key].Name,
                this._controlMethods[key].Description,
                this._controlMethods[key].Index,
                this._controlMethods[key].PrimaryKey,
                this._controlMethods[key].SecondaryKey
            );
        }

        // Elbullshito mode -- 126 is the maximum keycode in as3 we're likely to see
        for (let i = 0; i <= 126; i++) {
            if (this._keysToControlMethods[i] != undefined) {
                this._defaultKeysToControlMethods[i] = this._keysToControlMethods[i];
            }
        }
    }

    /**
     * Reset the bound keys to the defaults previously registered.
     */
    public ResetToDefaults(): void {
        for (const key of Object.keys(this._controlMethods)) {
            this._controlMethods[key] = new BoundControlMethod(
                this._defaultControlMethods[key].Func,
                this._defaultControlMethods[key].Name,
                this._defaultControlMethods[key].Description,
                this._defaultControlMethods[key].Index,
                this._defaultControlMethods[key].PrimaryKey,
                this._defaultControlMethods[key].SecondaryKey
            );
        }

        // Elbullshito mode -- 126 is the maximum keycode in as3 we're likely to see
        for (let i = 0; i <= 126; i++) {
            if (this._defaultKeysToControlMethods[i] != undefined) {
                this._keysToControlMethods[i] = this._defaultKeysToControlMethods[i];
            }
        }
    }

    /**
     * Get an array of the available functions.
     *
     * @return Array of available BoundControlMethods.
     */
    public GetAvailableFunctions(): BoundControlMethod[] {
        // var funcs: any[] = new Array();

        // for (var key of Object.keys(this._controlMethods)) {
        //     // if (this._debug) trace(key);
        //     funcs.push(this._controlMethods[key]);
        // }
        // funcs.sortOn(["Index"], [Array.NUMERIC]);

        return Object.keys(this._controlMethods).map((key) => this._controlMethods[key]);
    }

    /**
     * Get an array of the currently active keyCodes.
     *
     * @return Array of active keycodes.
     */
    public GetControlMethods(): any[] {
        const buttons: any[] = [];
        for (const key of Object.keys(this._keysToControlMethods)) {
            buttons.push(key);
        }

        return buttons;
    }

    /**
     * Clear all currently bound keys.
     */
    public ClearAllBinds(): void {
        for (const key of Object.keys(this._controlMethods)) {
            this._controlMethods[key].PrimaryKey = InputManager.UNBOUNDKEY;
            this._controlMethods[key].SecondaryKey = InputManager.UNBOUNDKEY;
        }

        this._keysToControlMethods = new Object();
    }

    /**
     * Load bindings from a source "Object" retrieved from a game save file.
     *
     * @param source Source object to enumerate for binding data.
     */
    public LoadBindsFromObj(source: Record<string, any>): void {
        this.ClearAllBinds();

        for (const key of Object.keys(source)) {
            const pKeyCode: number = source[key].PrimaryKey;
            const sKeyCode: number = source[key].SecondaryKey;

            if (pKeyCode != InputManager.UNBOUNDKEY) {
                this.BindKeyToControl(pKeyCode, key, InputManager.PRIMARYKEY);
            }

            if (sKeyCode != InputManager.UNBOUNDKEY) {
                this.BindKeyToControl(sKeyCode, key, InputManager.SECONDARYKEY);
            }
        }
    }

    /**
     * Create an associative object that can serialise the bindings to the users save file.
     *
     * @return Dynamic object of control bindings.
     */
    public SaveBindsToObj(): Record<string, any> {
        const controls: Record<string, any> = new Object();

        for (const key of Object.keys(this._controlMethods)) {
            // if (this._debug) trace(key);
            const ctrlObj: any = new Object();
            ctrlObj.PrimaryKey = this._controlMethods[key].PrimaryKey;
            ctrlObj.SecondaryKey = this._controlMethods[key].SecondaryKey;

            controls[key] = ctrlObj;
        }

        return controls;
    }
}

/**
 * List of known bound keyboard methods
 *
 * Some of the methods use an undefined "Event" parameter to pass into the actual UI components...
 * ... strip this out and instead modify the handlers on the execution end to have a default undefined parameter?
 *
 * ** Bypass handler if mainView.eventTestInput.x == 270.5
 * ** Bypass handler if mainView.nameBox.visible && stage.focus == mainView.nameBox
 *
 * 38 -- UpArrow
//  -- Cheat code for Humus stage 1
 * 40 -- DownArrow
// -- Cheat code for Humus stage 2
 * 37  -- LeftArrow
// -- Cheat code for Humus stage 3
 * 39 -- RightArrow
// -- Cheat code for Humus stage 4 IF str > 0, not gameover, give humus
 *
 * 83 -- s
//
// -- Display stats if main menu button displayed
 * 76 -- l
//
// -- Level up if level up button displayed
 * 112 -- F1
//
// -- Quicksave to slot 1 if menu_data displayed
 * 113 -- F2
//
// -- Quicksave slot 2
 * 114 -- F3
//
// -- Quicksave slot 3
 * 115 -- F4
//
// -- Quicksave slot 4
 * 116 -- F5
//
// -- Quicksave slot 5
 *
 * 117 -- F6
//
// -- Quickload slot 1
 * 118 -- F7
//
// -- Quickload slot 2
 * 119 -- F8
//
// -- Quickload slot 3
 * 120 -- F9
//
// -- Quickload slot 4
 * 121 -- F10
//
// -- Quickload slot 5
 *
 * 8 -- Backspace
// -- Go to "Main" menu if in game
 * 68 -- d
//
// -- Open saveload if in game
 * 65 -- a
//
// -- Open apperance if in game
 * 78 -- n
//
// -- "no" if button index 1 displays no
// <--
 * 89 -- y
//
// -- "yes" if button index 0 displays yes
// <-- These two seem akward
 * 80 -- p
//
// -- display perks if in game
 *
 * 13/32 -- Enter/Space
// -- if button index 0,4,5 or 9 has text of (nevermind, abandon, next, return, back, leave, resume) execute it
 *
 * 36 -- Home
//
// -- Cycle the background of the maintext area
 *
 * 49 -- 1
//
// -- Execute button index 0 if visisble
 * 50 -- 2
//
// -- ^ index 1
 * 51 -- 3
//
// -- ^ index 2
 * 52 -- 4
//
// -- ^ index 3
 * 53 -- 5
//
// -- ^ index 4
 * 54/81-- 6/q
//
// -- ^ index 5
 * 55/87-- 7/w
//
// -- ^ index 6
 * 56/69-- 8/e
//
// -- ^ index 7
 * 57/82-- 9/r
//
// -- ^ index 8
 * 48/84-- 0/t
//
// -- ^ index 9
 *
 * 68 -- ???
//
// -- ??? Unknown, theres a conditional check for the button, but no code is ever executed
 */
