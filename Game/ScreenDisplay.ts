import { MainScreen } from '../Page/MainScreen';
import { Character } from './Character/Character';
import { CharDict } from './CharDict';
import { BottomButtons } from '../Page/BottomButtons';
import { updateDisplay } from './UpdateDisplay';

export type ClickFunction = ((char: Character, event?: Event) => NextScreenChoices);
export interface ClickObject {
    func?: ClickFunction;
    tooltip: string;
}
export type ClickOption = ClickFunction | ClickObject | undefined;
export type ScreenChoice = [string, ClickOption];
export interface NextScreenChoices {
    yes?: ClickOption;
    no?: ClickOption;
    next?: ClickOption;
    choices?: ScreenChoice[];
    persistantChoices?: ScreenChoice[];
    needEvent?: boolean;
}

const previousScreens: string[] = [];
let nextScreens: string[] = [];

export function clickFuncWrapper(clickFunc: ClickOption, needEvent?: boolean): ((event: Event) => void) | undefined {
    if (typeof clickFunc === "function") {
        nextScreens.push(clickFunc.name);
        return (event) => {
            previousScreens.push(clickFunc.name);
            nextScreens = [];
            if (needEvent)
                displayNextScreenChoices(clickFunc(CharDict.player!, event));
            else
                displayNextScreenChoices(clickFunc(CharDict.player!));
        };
    }
    else if (typeof clickFunc === "object" && clickFunc.func) {
        nextScreens.push(clickFunc.func.name);
        return (event) => {
            if (clickFunc.func) {
                previousScreens.push(clickFunc.func.name);
                nextScreens = [];
                if (needEvent)
                    displayNextScreenChoices(clickFunc.func(CharDict.player!, event));
                else
                    displayNextScreenChoices(clickFunc.func(CharDict.player!));
            }
        };
    }
    return;
}

function displayChoices(choices?: ScreenChoice[], persistantChoices?: ScreenChoice[], needEvent?: boolean) {
    const fixedCount = persistantChoices ? persistantChoices.length : 0;
    if (choices && choices.length + fixedCount > BottomButtons.NUM_BOT_BUTTONS) {
        displayPage(0, choices, persistantChoices, needEvent);
    }
    else {
        if (choices) {
            MainScreen.botButtons.hide();
            for (let index = 0; index < choices.length; index++) {
                if (Array.isArray(choices[index])) {
                    MainScreen.botButtons.get(index)!.modify(choices[index][0], clickFuncWrapper(choices[index][1], needEvent));
                    if (choices[index][0] === "")
                        MainScreen.botButtons.get(index)!.hide();
                }
            }
        }
        if (persistantChoices && fixedCount > 0) {
            const startingIndex = BottomButtons.NUM_BOT_BUTTONS - fixedCount;
            for (let botButtonIndex = startingIndex; botButtonIndex < BottomButtons.NUM_BOT_BUTTONS; botButtonIndex++) {
                const fixedIndex = botButtonIndex - startingIndex;
                if (Array.isArray(persistantChoices[fixedIndex])) {
                    MainScreen.botButtons.get(botButtonIndex)!.modify(persistantChoices[fixedIndex][0], clickFuncWrapper(persistantChoices[fixedIndex][1], needEvent));
                    if (persistantChoices[fixedIndex][0] === "")
                        MainScreen.botButtons.get(botButtonIndex)!.hide();
                }
            }
        }
    }
}

function displayPage(startingIndex: number, choices: ScreenChoice[], persistantChoices?: ScreenChoice[], needEvent?: boolean) {
    MainScreen.botButtons.hide();
    const pageNavIndex = BottomButtons.NUM_BOT_BUTTONS - 2;
    const prevButtonIndex = pageNavIndex;
    const nextButtonIndex = pageNavIndex + 1;
    const fixedCount = persistantChoices ? persistantChoices.length : 0;
    const startingFixedIndex = pageNavIndex - fixedCount;
    for (let index = 0; index < startingFixedIndex && index + startingIndex < choices.length; index++) {
        MainScreen.botButtons.get(index)!.modify(choices[index + startingIndex][0], clickFuncWrapper(choices[index + startingIndex][1], needEvent));
        if (choices[index][0] === "")
            MainScreen.botButtons.get(index)!.hide();
    }
    if (persistantChoices && fixedCount > 0) {
        for (let botButtonIndex = startingFixedIndex; botButtonIndex < pageNavIndex; botButtonIndex++) {
            const fixedIndex = botButtonIndex - startingFixedIndex;
            MainScreen.botButtons.get(botButtonIndex)!.modify(persistantChoices[fixedIndex][0], clickFuncWrapper(persistantChoices[fixedIndex][1], needEvent));
            if (persistantChoices[fixedIndex][0] === "")
                MainScreen.botButtons.get(botButtonIndex)!.hide();
        }
    }

    const hasPrevPage = startingIndex - startingFixedIndex >= 0 ? true : false;
    if (hasPrevPage) {
        MainScreen.botButtons.get(prevButtonIndex)!.modify("Prev", () => {
            displayPage(startingIndex - startingFixedIndex, choices, persistantChoices, needEvent);
        });
    }
    else {
        MainScreen.botButtons.get(prevButtonIndex)!.modify("Prev", undefined, true);
    }

    const hasNextPage = startingIndex + startingFixedIndex < choices.length ? true : false;
    if (hasNextPage) {
        MainScreen.botButtons.get(nextButtonIndex)!.modify("Next", () => {
            displayPage(startingIndex + startingFixedIndex, choices, persistantChoices, needEvent);
        });
    }
    else {
        MainScreen.botButtons.get(nextButtonIndex)!.modify("Next", undefined, true);
    }
}

function doNext(func: ClickOption, needEvent?: boolean) {
    MainScreen.botButtons.hide();
    MainScreen.botButtons.get(BottomButtons.NEXT_BUTTON_ID)!.modify("Next", clickFuncWrapper(func, needEvent));
}

function doYesNo(yesFunc: ClickOption, noFunc: ClickOption, needEvents?: boolean) {
    MainScreen.botButtons.hide();
    MainScreen.botButtons.get(BottomButtons.YES_BUTTON_ID)!.modify("Yes", clickFuncWrapper(yesFunc, needEvents));
    MainScreen.botButtons.get(BottomButtons.NO_BUTTON_ID)!.modify("No", clickFuncWrapper(noFunc, needEvents));
}

export function displayNextScreenChoices(nextScreen: void | NextScreenChoices) {
    if (nextScreen) {
        updateDisplay();
        if (nextScreen.yes && nextScreen.no) {
            doYesNo(nextScreen.yes, nextScreen.no, nextScreen.needEvent);
        }
        else if (nextScreen.next) {
            doNext(nextScreen.next, nextScreen.needEvent);
        }
        else if (nextScreen.choices && nextScreen.choices.length > 0 || (nextScreen.persistantChoices && nextScreen.persistantChoices.length > 0)) {
            displayChoices(nextScreen.choices, nextScreen.persistantChoices, nextScreen.needEvent);
        }
    }
    else {
        alert("No Next Screen could be found");
        console.trace("No Next Screen found.");
        console.log("Prev Screens: " + previousScreens);
        console.log("Next Screens: " + nextScreens);
    }
}

type Function0 = (char: Character) => NextScreenChoices;
type Function1<T1> = (char: Character, t1: T1) => NextScreenChoices;
type Function2<T1, T2> = (char: Character, t1: T1, t2: T2) => NextScreenChoices;
type Function3<T1, T2, T3> = (char: Character, t1: T1, t2: T2, t3: T3) => NextScreenChoices;
type Function4<T1, T2, T3, T4> = (char: Character, t1: T1, t2: T2, t3: T3, t4: T4) => NextScreenChoices;
type Function5<T1, T2, T3, T4, T5> = (char: Character, t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => NextScreenChoices;

/**
 * Wrapper function for choices. Returns a ClickFunction.
 * @param func The function to be wrapped
 * @param argsBound Everything other than a character
 */
export function choiceWrap(func: Function0): ClickFunction;
export function choiceWrap<T1>(func: Function1<T1>, arg1: T1): ClickFunction;
export function choiceWrap<T1, T2>(func: Function2<T1, T2>, arg1: T1, arg2: T2): ClickFunction;
export function choiceWrap<T1, T2, T3>(func: Function3<T1, T2, T3>, arg1: T1, arg2: T2, arg3: T3): ClickFunction;
export function choiceWrap<T1, T2, T3, T4>(func: Function4<T1, T2, T3, T4>, arg1: T1, arg2: T2, arg3: T3, arg4: T4): ClickFunction;
export function choiceWrap<T1, T2, T3, T4, T5>(func: Function5<T1, T2, T3, T4, T5>, arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): ClickFunction;
export function choiceWrap(func: (char: Character, ...args: any[]) => NextScreenChoices, ...argsBound: any[]): ClickFunction {
    const wrapper: ClickFunction = (character: Character, event?: Event): NextScreenChoices => {
        const args = argsBound;
        return func(character, ...args);
    };
    Object.defineProperty(wrapper, "name", { value: func.name });
    return wrapper;
}

/**
 * Wrapper function for choices. Returns a ClickFunction.
 * @param func The function to be wrapped
 * @param char The character that will be used instead of the one passed from the display
 * @param argsBound Everything other than a character
 */
export function choiceWrapWithChar(func: Function0, char: Character): ClickFunction;
export function choiceWrapWithChar<T1>(func: Function1<T1>, char: Character, arg1: T1): ClickFunction;
export function choiceWrapWithChar<T1, T2>(func: Function2<T1, T2>, char: Character, arg1: T1, arg2: T2): ClickFunction;
export function choiceWrapWithChar<T1, T2, T3>(func: Function3<T1, T2, T3>, char: Character, arg1: T1, arg2: T2, arg3: T3): ClickFunction;
export function choiceWrapWithChar<T1, T2, T3, T4>(func: Function4<T1, T2, T3, T4>, char: Character, arg1: T1, arg2: T2, arg3: T3, arg4: T4): ClickFunction;
export function choiceWrapWithChar<T1, T2, T3, T4, T5>(func: Function5<T1, T2, T3, T4, T5>, char: Character, arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5): ClickFunction;
export function choiceWrapWithChar(func: (char: Character, ...args: any[]) => NextScreenChoices, char: Character, ...argsBound: any[]): ClickFunction {
    const wrapper: ClickFunction = (character: Character, event?: Event): NextScreenChoices => {
        const args = argsBound;
        return func(char, ...args);
    };
    Object.defineProperty(wrapper, "name", { value: func.name });
    return wrapper;
}
