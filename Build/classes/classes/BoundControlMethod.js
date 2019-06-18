define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Defines a container to wrap a closure around a game function, associating the callable object
     * with a string name representation of the action undertaken, a description, and the associated
     * keyCodes that the action is triggered by.
     * The keyCodes are stored here primarily for ease of display, as we have a handy refernece for
     * a displayable function name AND the actual keyCodes the function uses. The actual interface used
     * for incoming key code -> do action is internal to the InputManager instance.
     * @author Gedan
     */
    class BoundControlMethod {
        /**
         * Define a new bindable control method with "Unbound" keys.
         *
         * @param	func			The function closure used by this BoundControlMethod
         * @param	name			The friendly name used for this BoundControlMethod
         * @param	desc			A Description of what the BoundControlMethod does
         * @param 	primaryKey		The primary bound key code
         * @param	secondarykey 	The secondary bound key code
         */
        constructor(func, name, desc, index, primaryKey = -1, secondaryKey = -1) {
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
        ExecFunc(...args) {
            this._funcToCall.apply(undefined, args);
        }
        get Name() {
            return this._shortName;
        }
        get Description() {
            return this._descript;
        }
        get Func() {
            return this._funcToCall;
        }
        get PrimaryKey() {
            return this._primaryKey;
        }
        set PrimaryKey(keyCode) {
            this._primaryKey = keyCode;
        }
        get SecondaryKey() {
            return this._secondaryKey;
        }
        set SecondaryKey(keyCode) {
            this._secondaryKey = keyCode;
        }
        get Index() {
            return this._index;
        }
    }
    exports.BoundControlMethod = BoundControlMethod;
});
//# sourceMappingURL=BoundControlMethod.js.map