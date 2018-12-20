import { Character } from 'Game/Character/Character';
import { ClickFunction } from 'Game/ScreenDisplay';
import { Time } from 'Game/Utilities/Time';
import { TimeEvents } from 'Game/TimeEvents';
import { playerMenu } from '../Menus/InGame/PlayerMenu';
import { CView } from 'Page/ContentView';
import { numToCardinalCapText } from 'Game/Utilities/NumToText';

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
