import * as CodeMirror from 'codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/lesser-dark.css';
import { cocMode } from '../../EditorModes';
import { Lex } from 'Content/Parser/Lexer';
import { Parser } from 'Content/Parser/Parser';
import { Interpret } from 'Content/Parser/Interpreter';
import { parserLog } from 'Content/Parser/Logger';
import { createTabContent, createAccordButton, createContentView } from '../Create';
import { CView } from 'Engine/Display/ContentView';

let errorContentEl: HTMLElement;
let debugContentEl: HTMLElement;

parserLog.on = true;

export function loadEditorContent(tabPane: HTMLElement) {
    const outputEl = document.createElement("div");
    outputEl.id = "outputPane";
    tabPane.appendChild(outputEl);

    const editorEl = document.createElement("div");
    editorEl.id = "editorPane";
    tabPane.appendChild(editorEl);

    const editorTextEl = document.createElement("textarea");
    editorEl.appendChild(editorTextEl);

    createOutput(outputEl);
    createEditor(editorTextEl);

    const errorEl = document.createElement("div");
    errorEl.id = "errorPane";

    editorEl.appendChild(errorEl);
    createError(errorEl);
}

function createOutput(parentEl: HTMLElement) {
    const tabs = document.createElement("div");
    tabs.id = "outputTabs";
    parentEl.appendChild(tabs);

    const content = document.createElement("div");
    content.id = "outputContent";
    parentEl.appendChild(content);

    loadPreviewTab(tabs, content);
    loadDebugTab(tabs, content);
}

function loadDebugTab(tabs: HTMLElement, content: HTMLElement) {
    const debugContent = createTabContent("debugContent");
    content.appendChild(debugContent);
    const debugTab = createAccordButton("Debug", debugContent, undefined, true);
    debugTab.className += " tab";
    tabs.appendChild(debugTab);
    debugContentEl = createContentView("debugContentView");
    debugContent.appendChild(debugContentEl);
    parserLog.registerOutput('debug', function logToEl(str) { debugContentEl.innerHTML = str; });
}

function loadPreviewTab(tabs: HTMLElement, content: HTMLElement) {
    const previewContent = createTabContent("previewContent");
    previewContent.className += " active";
    content.appendChild(previewContent);

    const previewTab = createAccordButton("Preview", previewContent, undefined, true);
    previewTab.className += " tab active";
    tabs.appendChild(previewTab);

    const textContent = createContentView("previewContentView");
    previewContent.appendChild(textContent);
    CView.textElement.setHTMLElement(textContent as HTMLParagraphElement);
}

function createError(parentEl: HTMLElement) {
    const content = document.createElement("div");
    content.className = "content";
    parentEl.appendChild(content);
    errorContentEl = content;
    parserLog.registerOutput('error', function displayError(str) { content.textContent += (str ? str : '') + '\n'; });
}

function createEditor(parentEl: HTMLElement) {
    CodeMirror.defineMode(cocMode.name, cocMode.factoryFunc as any);
    const editor = CodeMirror.fromTextArea(parentEl as HTMLTextAreaElement, {
        lineNumbers: true,
        mode: "CoC",
        theme: "lesser-dark",
        lineWrapping: true,
        indentWithTabs: true,
        value: {}
    });
    editor.on("change", (instance: CodeMirror.Editor) => {
        const tokens: CodeMirror.Token[] = [];
        const lineCount = instance.getDoc().lineCount();
        for (let linenum = 0; linenum < lineCount; linenum++) {
            for (const lineToken of editor.getLineTokens(linenum))
                tokens.push(lineToken);
            if (linenum < lineCount - 1)
                tokens.push({
                    type: "whitespace",
                    string: "\n",
                    start: editor.getDoc().getLine(linenum).length,
                    end: editor.getDoc().getLine(linenum).length + 1,
                    state: {}
                });
        }
        const text = editor.getValue();

        if (errorContentEl)
            errorContentEl.innerHTML = '';

        if (debugContentEl)
            debugContentEl.innerHTML = '';

        CView.clear();
        CView.text(text);

        parserLog.flush();
    });
}

const parser = new Parser();

CView.parsers.add((text) => {
    return Interpret(parser.parse(Lex(text)));
});
