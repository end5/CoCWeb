const contentElements: { [x: string]: any } = {};

export function createContentView(id: string): HTMLElement {
    const content = document.createElement("div");
    content.className = "content";
    content.id = id;
    contentElements[id] = content;
    return content;
}

export function postContent(id: string, text: string) {
    if (contentElements[id])
        contentElements[id].innerHTML = text;
}

export function createTabContent(id: string): HTMLElement {
    const content = document.createElement("div");
    content.className = "tabcontent";
    content.id = id;
    return content;
}

export function createTextInput(initialValue: string, className: string, changeFunc: () => void) {
    const textAreaEl = document.createElement("input");
    textAreaEl.type = "text";
    textAreaEl.className = className;
    textAreaEl.value = initialValue;
    if (changeFunc)
        textAreaEl.addEventListener("change", changeFunc);
    return textAreaEl;
}

export function createCheckBox(checked: boolean, className: string, changeFunc: () => void) {
    const checkBoxEl = document.createElement("input");
    checkBoxEl.className = className;
    checkBoxEl.checked = checked;
    checkBoxEl.type = "checkbox";
    if (changeFunc)
        checkBoxEl.addEventListener("change", changeFunc);
    return checkBoxEl;
}

export function createPanel() {
    const panel = document.createElement("div");
    panel.className = "panel";
    return panel;
}

export function createAccordButton(text: string, panelEl: HTMLElement, onClickFunc?: (panelEl: HTMLElement) => void, clearOtherTabs: boolean = false) {
    const accordButton = document.createElement("button");
    accordButton.textContent = text;
    accordButton.className = "accordion";
    accordButton.addEventListener("click", function accordClick() {
        if (this.className && clearOtherTabs && this.parentElement) {
            for (const tab of this.parentElement.children) {
                if (tab.classList.contains("tab"))
                    tab.className = tab.className.replace(" active", "");
            }
        }
        this.classList.toggle("active");
        if (panelEl && panelEl.parentElement) {
            for (const content of panelEl.parentElement.children) {
                if (content.classList.contains("tabcontent"))
                    content.className = content.className.replace(" active", "");
            }
            panelEl.classList.toggle("active");
        }
        if (onClickFunc)
            onClickFunc(panelEl);
    });
    return accordButton;
}
