import { createAccordButton, createTabContent } from './Create';
import { loadEditorContent } from './Tabs/Editor';
import { loadCharContent } from './Tabs/Chars';
import { loadFlagContent } from './Tabs/Flags';
import { loadHelpContent } from './Tabs/Help';

while (document.body.lastChild) {
    document.body.removeChild(document.body.lastChild);
}

const tabs = document.createElement("div");
tabs.id = "mainTabs";
document.body.appendChild(tabs);

const content = document.createElement("div");
content.id = "mainContent";
document.body.appendChild(content);

const editorContent = createTabContent("editorContent");
editorContent.className += " active";
content.appendChild(editorContent);
const editorTab = createAccordButton("Editor", editorContent, undefined, true);
editorTab.className += " tab active";
tabs.appendChild(editorTab);

loadEditorContent(editorContent);

const charContent = createTabContent("charContent");
content.appendChild(charContent);
const charTab = createAccordButton("Characters", charContent, undefined, true);
charTab.className += " tab";
tabs.appendChild(charTab);

loadCharContent(charContent);

const flagContent = createTabContent("flagContent");
content.appendChild(flagContent);
const flagTab = createAccordButton("Flags", flagContent, undefined, true);
flagTab.className += " tab";
tabs.appendChild(flagTab);

loadFlagContent(flagContent);

const helpContent = createTabContent("helpContent");
content.appendChild(helpContent);
const helpTab = createAccordButton("Help", helpContent, undefined, true);
helpTab.className += " tab";
tabs.appendChild(helpTab);

loadHelpContent(helpContent);
