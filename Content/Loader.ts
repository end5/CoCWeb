import { displayNextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { mainMenu } from './Menus/MainMenu';
import { CView } from 'Engine/Display/ContentView';
import { Parser } from './Parser/Parser';
import { Interpret } from './Parser/Interpreter';
import { Lex } from './Parser/Lexer';
import { loadFromId } from 'Engine/Utilities/Html';
import { MainScreen } from 'Engine/Display/MainScreen';
import { BottomButtons } from 'Engine/Display/BottomButtons';
import { ButtonElement } from 'Engine/Display/ButtonElement';
import { TopButtons } from 'Engine/Display/TopButtons';

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

MainScreen.textElement.setHTMLElement(loadFromId("mainTextDisplay") as HTMLParagraphElement);
MainScreen.imageElement.setHTMLElement(loadFromId("mainImageDisplay") as HTMLImageElement);
MainScreen.spriteElement.setHTMLElement(loadFromId("mainSpriteDisplay") as HTMLImageElement);

CView.imageElement = MainScreen.imageElement;
CView.spriteElement = MainScreen.spriteElement;

const parser = new Parser();
CView.textBuffer.emitter.on('modified', (text) => {
    MainScreen.textElement.text(Interpret(parser.parse(Lex(text))));
});

// CView.parsers.add((text: string) => text.replace('\n', '<br>'));

import './Character/CharConstructors';
import './Display/Images';
import './Display/Sprites';
import './Display/DisplayUpdateEvents';
import './Items/Armors';
import './Items/CockSocks';
import './Items/Consumables';
import './Items/Materials';
import './Items/Piercings';
import './Items/Weapons';
import './Effects/EffectConstructors';
import './Effects/EffectDescriptions';

displayNextScreenChoices(mainMenu());
