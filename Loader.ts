import { displayNextScreenChoices } from './Game/ScreenDisplay';
import { mainMenu } from './Game/Menus/MainMenu';
import { CView } from './Page/ContentView';
import { Parser } from './Game/Parser/Parser';
import { Interpret } from './Game/Parser/Interpreter';
import { Lex } from './Game/Parser/Lexer';

const parser = new Parser();
CView.parsers.add((text: string) => Interpret(parser.parse(Lex(text))));

displayNextScreenChoices(mainMenu());
