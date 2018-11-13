import { ISerializable } from "../Engine/Utilities/ISerializable";
import { Character } from "./Character/Character";
import { NextScreenChoices } from "./ScreenDisplay";

// Call CoC.timeAwareClassAdd if you want a class that implements this interface to receive time changes
export interface ITimeAware extends ISerializable<ITimeAware> {
    /*	Called for every Class in the _timeAwareClassList each time the game time advances.
        Should be used for code with no screen output and short text output which can be bundled with
        other game text. Larger scenes which require an immediate pause should go in timeChangeLarge instead.
        Returning true indicates that you want the game to pause and display a set of screen output.
        Returning false indicates the function has produced no screen output.

        Note that all timeChanges are called first. All their text (if any) is displayed on one screen.
        Then, afterward, each timeChangeLarge is called and stops immediately if there is any screen output.
        Once the player presses [Next] the code will continue and display the next screen of text or
        (once all time changes are complete) finally get to the next screen of the game */
    /*
        The text above has been changed. If you need time to stop, pause it from the TimeManager.
        Rememeber to unpause it.
    */
    timeChange(player: Character): boolean;

    /*	Called for every Class in the _timeAwareClassList each time the game time advances.
        Should be used only for large scenes that need their own next button before proceeding with
        other time based events. This function is always called after the timeChange function and
        may be called multiple times on a single tick of the hour, so updates should go in timeChange()
        and any scene that triggers on timeChangeLarge must make sure it cannot be triggered twice.
        Returning true indicates that you want the game to pause and display your screen output.
        When this function returns true it is responsible for calling DisplayText.doNext, menu, choices, etc.
        Returning false indicates the function has produced no screen output. */
    /*
        The text above has been changed. If you need time to stop, pause it from the TimeManager.
        Rememeber to unpause it.
    */
    timeChangeLarge(player: Character): NextScreenChoices | void;
}
