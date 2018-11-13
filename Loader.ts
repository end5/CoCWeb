import { displayNextScreenChoices } from './Game/ScreenDisplay';
import { mainMenu } from './Game/Menus/MainMenu';
import { CView } from './Page/ContentView';
import { parseCoC } from './Game/Parser';

CView.parsers.add(parseCoC);

displayNextScreenChoices(mainMenu());
