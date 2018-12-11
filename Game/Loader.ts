import { displayNextScreenChoices } from './ScreenDisplay';
import { mainMenu } from './Menus/MainMenu';
import { CView } from '../Page/ContentView';
import { loadFromId } from '../Engine/Utilities/Html';
import { MainScreen } from '../Page/MainScreen';
import { BottomButtons } from '../Page/BottomButtons';
import { ButtonElement } from '../Page/ButtonElement';
import { TopButtons } from '../Page/TopButtons';

for (let index = 0; index < TopButtons.NUM_TOP_BUTTONS; index++) {
    const newButton = new ButtonElement();
    newButton.setHTMLElement(loadFromId("buttontop" + index) as HTMLAnchorElement);
    MainScreen.topButtons.buttons.push(newButton);
}

for (let index = 0; index < BottomButtons.NUM_BOT_BUTTONS; index++) {
    const newButton = new ButtonElement();
    newButton.setHTMLElement(loadFromId("button" + index) as HTMLAnchorElement);
    MainScreen.botButtons.buttons.push(newButton);
}

MainScreen.nameDisplay.setHTMLElement(loadFromId("nameDisplay") as HTMLParagraphElement);
MainScreen.levelupIcon.setHTMLElement(loadFromId("levelupIcon") as HTMLImageElement);
MainScreen.timeDayElement.setHTMLElement(loadFromId("timeDay") as HTMLParagraphElement);
MainScreen.timeHourElement.setHTMLElement(loadFromId("timeHour") as HTMLParagraphElement);

MainScreen.statsPanel.setHTMLElement(loadFromId("statsPanel") as HTMLDivElement);

CView.textElement.setHTMLElement(loadFromId("mainTextDisplay") as HTMLParagraphElement);
CView.imageElement.setHTMLElement(loadFromId("mainImageDisplay") as HTMLImageElement);
CView.spriteElement.setHTMLElement(loadFromId("mainSpriteDisplay") as HTMLImageElement);

displayNextScreenChoices(mainMenu());
