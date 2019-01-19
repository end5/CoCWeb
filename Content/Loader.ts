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
    newButton.element = loadFromId("buttontop" + index);
    MainScreen.topButtons.buttons.push(newButton);
}

for (let index = 0; index < BottomButtons.NUM_BOT_BUTTONS; index++) {
    const newButton = new ButtonElement();
    newButton.element = loadFromId("button" + index);
    MainScreen.botButtons.buttons.push(newButton);
}

MainScreen.nameDisplay.element = loadFromId("nameDisplay");
MainScreen.levelupIcon.element = loadFromId("levelupIcon");
MainScreen.timeDayElement.element = loadFromId("timeDay");
MainScreen.timeHourElement.element = loadFromId("timeHour");

MainScreen.statsPanel.element = loadFromId("statsPanel");

MainScreen.textElement.element = loadFromId("mainTextDisplay");
MainScreen.imageElement.element = loadFromId("mainImageDisplay");
MainScreen.spriteElement.element = loadFromId("mainSpriteDisplay");

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

import { CharDict } from 'Engine/CharDict';
// tslint:disable-next-line:no-string-literal
(window as any)["chars"] = CharDict;
