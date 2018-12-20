# Corruption of Champions Web Edition
 
 Here lies the web edition of Corruption of Champions.

For Devs:
Game setup instructions:
1. Clone this repo branch.
2. Download and install Node.js https://nodejs.org/
3. Open a console in the folder of the repo.
4. Type "npm i -g typescript" to install Typescript.
5. Once Typescript is installed, type "tsc" to compile the code.
6. Download RequireJS https://requirejs.org and move the file to the "Build" folder.
To run: Open index.html in a browser

Parser Tester setup instructions:
1. If you haven't done them already, do steps 1-6 from above.
2. Type "npm i @types/codemirror" to install typings for CodeMirror.
3. Type "tsc -b ParserTester" to compile the code. 
4. Download CodeMirror https://codemirror.net/. Extract it. Rename "codemirror-X.XX.X" to "codemirror" and move it to the "Build" folder.
To run: Open ParserTester/ParserTester.html in a browser

Linting:
1. Open a console in the folder of the repo.
2. Type "npm install -g tslint" to install TSLint
3. Once installed, type "tslint -p . --fix" to run the linter and have the linter fix most problems.
4. Fix any remaining errors that appear.
