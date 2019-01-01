import { Character } from 'Engine/Character/Character';
import { ClickFunction } from 'Engine/Display/ScreenDisplay';
import { Time } from 'Engine/Utilities/Time';
import { TimeEvents } from 'Engine/TimeEvents';
import { playerMenu } from 'Content/Menus/InGame/PlayerMenu';
import { CView } from 'Engine/Display/ContentView';
import { numToCardinalCapText } from 'Content/Utilities/NumToText';

export function passTime(num: number): ClickFunction {
    return function passHour(char: Character) {
        CView.clear();
        if (num === 1)
            CView.text("An hour passes...\n");
        else CView.text(numToCardinalCapText(num) + " hours pass...\n");

        Time.hour += num;
        TimeEvents.update(num);

        return playerMenu(char);
    };
}
