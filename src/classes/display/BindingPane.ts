import { BoundControlMethod } from "../BoundControlMethod";
import { InputManager } from "../InputManager";
import { BindDisplay } from "./BindDisplay";

/**
 * Defines a new UI element, providing a scrollable container to be used for display of bound
 * keyboard controls.
 *
 * @author Gedan
 */
export class BindingPane {
    public element: HTMLElement;

    private _inputManager: InputManager;
    // private _stage: Stage;

    // A lookup for integer keyCodes -> string representations
    // private _keyDict: Record<string, any>;

    private _functions: BoundControlMethod[];
    // private _newFuncs: Array;

    // private _mainView: MainView;
    // private _content: MovieClip;
    // private _contentChildren: number;

    /**
     * Initiate the BindingPane, setting the stage positioning and reference back to the input manager
     * so we can generate function callbacks later.
     *
     * @param inputManager Reference to the game input manager for method access
     * @param xPos
//  X position on the stage for the top-left corner of the ScrollPane
     * @param yPos
//  Y position on the stage for the top-left corner of the ScrollPane
     * @param width
//  Fixed width of the containing ScrollPane
     * @param height
//  Fixed height of the containing ScrollPane
     */
    public constructor(inputManager: InputManager) {
        this._inputManager = inputManager;
        // this._mainView = mainView;

        this.element = document.createElement("div");

        this._functions = [];

        /* This is a super super fucking annoying fix. The TextField class, whilst it supports being bound to a
         *  doesn't include a scrollbar by default, it has to be attached as a sperate, distinct component. It's
         *  literally bolted onto the side, and isn't part of the sizing information of the TextField itself.
         *  ScrollPanes on the other hand, DO feature a scrollbar as a core part of their functionality. And
         *  for ScrollPanes, the UIScrollBar is included in the total sizing information. Whoever wrote this shit
         *  was literally on crack, I SWEAR TO GOD. */
        // this.width = width + uiscrollwidth + 3;
        // this.height = height - 3;

        // this.x = xPos - 1;
        // this.y = yPos;

        // Cheap hack to remove the stupid styling elements of the stock ScrollPane
        // var blank: MovieClip = new MovieClip();
        // this.setStyle("upSkin", blank);

        // Build the keyCode->string lookup object
        // this.PopulateKeyboardDict();

        // Initiate a new container for content that will be placed in the scroll pane
        // this._content = new MovieClip();
        // this._content.name = "controlContent";
        // this._contentChildren = 0;

        // Hook into some stuff so that we can fix some bugs that ScrollPane has
        // this.addEventListener(Event.ADDED_TO_STAGE, this.AddedToStage);
    }

    /**
     * Cleanly get us a reference to the stage to add/remove other event listeners
     *
     * @param e
     */
    // private AddedToStage(e: Event): void {
    //     this.removeEventListener(Event.ADDED_TO_STAGE, this.AddedToStage);
    //     this.addEventListener(Event.REMOVED_FROM_STAGE, this.RemovedFromStage);

    //     this._stage = this.stage;

    //     this._stage.addEventListener(MouseEvent.MOUSE_WHEEL, this.MouseScrollEvent);
    // }

    // private RemovedFromStage(e: Event): void {
    //     this.removeEventListener(Event.REMOVED_FROM_STAGE, this.RemovedFromStage);
    //     this.addEventListener(Event.ADDED_TO_STAGE, this.AddedToStage);

    //     this._stage.removeEventListener(MouseEvent.MOUSE_WHEEL, this.MouseScrollEvent);
    // }

    // private MouseScrollEvent(e: MouseEvent): void {
    //     this.verticalScrollPosition += -(e.delta * 8);
    // }

    public ListBindingOptions(): void {
        // if (this._contentChildren == 0) {
        this.InitContentObjects();
        // }
        // else {
        //     this.UpdateContentObjects();
        // }

        // this.source = this._content;
    }

    /**
     * Initiate the container used to display all of the available functions that can be bound,
     * along with a pair of buttons representing primary and secondary keys.
     * The buttons call back into the input manager to trigger the key binding mode, display object
     * switches, and set state so the input manager knows what function to bind an incoming keyCode
     * to.
     * TODO: Shoot self in face.
     */
    private InitContentObjects(): void {
        // Add a nice little instructional field at the top of the display.
        // var _textFormatLabel: TextFormat = new TextFormat();
        // _textFormatLabel.size = 20;

        // var helpLabel: TextField = new TextField();
        // helpLabel.name = "helpLabel";
        // helpLabel.x = 10;
        // helpLabel.width = this.width - 40;
        // helpLabel.defaultTextFormat = _textFormatLabel;
        // helpLabel.multiline = true;
        // helpLabel.wordWrap = true;
        // helpLabel.autoSize = TextFieldAutoSize.LEFT; // With multiline enabled, this SHOULD force the textfield to resize itself vertically dependent on content.
        // helpLabel.htmlText = "<b>Keyboard Control Bindings:</b>\n\n";
        // helpLabel.htmlText += "Click a button next to the action you wish to bind to a new key, then hit the key you want to bind the selected action to.\n\n"
        // helpLabel.htmlText += "Custom bindings are stored inside your save game files.\n\n";
        // helpLabel.htmlText += "Duplicate keys are automatically unbound from their old control action.\n\n";
        // helpLabel.htmlText += "<b>Reset Ctrls</b> will reset all of the control bindings to their defaults.\n\n";
        // helpLabel.htmlText += "<b>Clear Ctrls</b> will remove all of the current control bindings, leaving everything Unbound.\n\n";
        let helpLabel = "<b>Keyboard Control Bindings:</b>\n\n";
        helpLabel +=
            "Click a button next to the action you wish to bind to a new key, then hit the key you want to bind the selected action to.\n\n";
        helpLabel += "Custom bindings are stored inside your save game files.\n\n";
        helpLabel += "Duplicate keys are automatically unbound from their old control action.\n\n";
        helpLabel +=
            "<b>Reset Ctrls</b> will reset all of the control bindings to their defaults.\n\n";
        helpLabel +=
            "<b>Clear Ctrls</b> will remove all of the current control bindings, leaving everything Unbound.\n\n";

        this.element.innerHTML = helpLabel;

        const table = document.createElement("table");

        // helpLabel.height *= 2;

        // this._contentChildren++;
        // this._content.addChild(helpLabel);

        for (const func of this._functions) {
            // this._contentChildren++;

            const newLabel = new BindDisplay();
            // newLabel.name = func.Name;
            // newLabel.x = 2;
            // newLabel.y = (BindDisplay.BUTTON_Y_DELTA * i) + (7 + helpLabel.textHeight);
            newLabel.htmlText = `<b>${func.Name}:</b>`;
            newLabel.button1Text = String.fromCharCode(func.PrimaryKey);
            newLabel.button2Text = String.fromCharCode(func.SecondaryKey);

            // This is going to look crazy...
            const genPrimaryCallback = function (funcName: string, inMan: InputManager) {
                return () => {
                    inMan.ListenForNewBind(funcName, InputManager.PRIMARYKEY);
                    // _stage.focus = _stage;
                };
            };

            const genSecondaryCallback = function (funcName: string, inMan: InputManager) {
                return () => {
                    inMan.ListenForNewBind(funcName, InputManager.SECONDARYKEY);
                    // _stage.focus = _stage;
                };
            };
            // ... Warned you.

            newLabel.button1Callback = genPrimaryCallback(func.Name, this._inputManager);
            newLabel.button2Callback = genSecondaryCallback(func.Name, this._inputManager);

            // this._content.addChild(newLabel);
            table.appendChild(newLabel.element);
        }
        this.element.appendChild(table);
    }

    /**
     * Operating under the assumption that new control cannot be added once the game is running,
     * ie we will never see new controls in the incoming function list versus what it contained
     * when we initially created the display objects in the _content container.
     */
    // private UpdateContentObjects(): void {
    //     for (var i: number = 0; i < this._functions.length; i++) {
    //         var currLabel: BindDisplay = this._content.getChildByName(this._functions[i].Name) as BindDisplay;

    //         currLabel.button1Text = this._keyDict[this._functions[i].PrimaryKey];
    //         currLabel.button2Text = this._keyDict[this._functions[i].SecondaryKey];
    //     }
    // }

    /**
     * Builds a dictionary to lookup keyCode values -> string representations of key names.
     * Handles things like turning keyCode = 8 into "BACKSPACE" rather than an undisplayable
     * character.
     * TODO: Probably work out a good way of shortening some possibly long key names.
     */
    // private PopulateKeyboardDict(): void {

    // var keyDescriptions: XML = describeType(Keyboard);
    // var keyNames: XMLList = keyDescriptions..constant.@name;

    // this._keyDict = new Dictionary();

    // for (var i: number = 0; i < keyNames.length(); i++) {
    //     this._keyDict[Keyboard[keyNames[i]]] = keyNames[i];
    // }

    // this._keyDict[-1] = "Unbound";
    // }

    public set functions(funcs: BoundControlMethod[]) {
        this._functions = funcs;
    }

    public get functions(): BoundControlMethod[] {
        return this._functions;
    }
}
