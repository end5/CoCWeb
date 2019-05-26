/**
 * Defines a container to wrap a closure around a game function, associating the callable object
 * with a string name representation of the action undertaken, a description, and the associated
 * keyCodes that the action is triggered by.
 * The keyCodes are stored here primarily for ease of display, as we have a handy refernece for
 * a displayable function name AND the actual keyCodes the function uses. The actual interface used
 * for incoming key code -> do action is internal to the InputManager instance.
 * @author Gedan
 */
export class BoundControlMethod {
    private _funcToCall: any;
    private _shortName: string;
    private _descript: string;

    private _primaryKey: number;
    private _secondaryKey: number;

    private _index: number;

    /**
     * Define a new bindable control method with "Unbound" keys.
     * 	
     * @param	func			The function closure used by this BoundControlMethod
     * @param	name			The friendly name used for this BoundControlMethod
     * @param	desc			A Description of what the BoundControlMethod does
     * @param 	primaryKey		The primary bound key code
     * @param	secondarykey 	The secondary bound key code
     */
    public constructor(func: any, name: string, desc: string, index: number, primaryKey: number = -1, secondaryKey: number = -1) {
        this._funcToCall = func;
        this._shortName = name;
        this._descript = desc;
        this._index = index;

        this._primaryKey = primaryKey;
        this._secondaryKey = secondaryKey;
    }

    /**
     * Execute the wrapped BoundControlMethod. Uses an apply() call, so that arguments
     * can be passed to the wrapped function.
     * @param	... args	Args to pass to the wrapped function.
     */
    public ExecFunc(...args: any[]): void {
        this._funcToCall.apply(undefined, args);
    }

    public get Name(): string {
        return this._shortName;
    }

    public get Description(): string {
        return this._descript;
    }

    public get Func() {
        return this._funcToCall;
    }

    public get PrimaryKey(): number {
        return this._primaryKey;
    }

    public set PrimaryKey(keyCode: number) {
        this._primaryKey = keyCode;
    }

    public get SecondaryKey(): number {
        return this._secondaryKey;
    }

    public set SecondaryKey(keyCode: number) {
        this._secondaryKey = keyCode;
    }

    public get Index(): number {
        return this._index;
    }
}

