import { createTextInput, createAccordButton, EventFunc, createCheckBox } from './Create';
import { IDictionary } from 'Engine/Utilities/Dictionary';

export function fieldTitle(key: string) {
    const title = document.createElement("div");
    title.className = "fieldTitle";
    title.textContent = key;
    return title;
}

function fieldLabel(key: string) {
    const entry = document.createElement("label");
    entry.className = "accordion fieldEntry";
    const title = fieldTitle(key);
    entry.appendChild(title);
    return entry;
}

export function objectField(text: string, panel: HTMLElement) {
    const accordButton = createAccordButton("", panel);
    const closed = "⬥ ";
    const open = "⬦ ";
    accordButton.className += " fieldTitle";
    accordButton.innerText = closed + text;
    accordButton.addEventListener("click", function nameChanger() {
        this.innerText = this.innerText.startsWith(closed) ? this.innerText.replace(closed, open) : this.innerText.replace(open, closed);
    });
    return accordButton;
}

export function stringField(name: string, initialValue: string, changeFunc: EventFunc) {
    const div = fieldLabel(name);
    const input = createTextInput(initialValue, "", changeFunc);
    div.appendChild(input);
    return div;
}

export function booleanField(name: string, initialValue: boolean, changeFunc: EventFunc) {
    const div = fieldLabel(name);
    const input = createCheckBox(initialValue, "", changeFunc);
    div.appendChild(input);
    return div;
}

export function selectField(name: string, initialValue: string | number, options: IDictionary<any> | any[], changeFunc: EventFunc) {
    const div = fieldLabel(name);
    const selector = document.createElement("select");
    if (!Array.isArray(options)) options = Object.keys(options).map((key: string) => (options as IDictionary<any>)[key]);
    // Incase of enums, filter out number values
    if (options.find((value: any) => isNaN(value)) && options.find((value: any) => !isNaN(value)))
        options = options.filter((value: any) => !isNaN(value));
    options.forEach((value: any, index: number) => {
        const option = document.createElement("option");
        option.value = '' + index;
        option.innerText = value;
        option.selected = initialValue === index || initialValue === value;
        selector.appendChild(option);
    });
    selector.addEventListener("change", changeFunc);
    div.appendChild(selector);
    return div;
}

export function setNumberCallback(obj: IDictionary<any>, key: string) {
    return (evnt: Event) => {
        if (evnt.target)
            obj[key] = +(evnt.target as HTMLInputElement).value;
    };
}

export function setStringCallback(obj: IDictionary<any>, key: string) {
    return (evnt: Event) => {
        if (evnt.target)
            obj[key] = (evnt.target as HTMLInputElement).value;
    };
}

export function setSelectorStringCallback(obj: IDictionary<any>, key: string) {
    return (evnt: Event) => {
        if (evnt.target) {
            const target = evnt.target as (IDictionary<any> & HTMLElement);
            obj[key] =
                target[+target.value].innerText === "None" ?
                    undefined :
                    target[+target.value].innerText;
        }
    };
}

export function setBooleanCallback(obj: IDictionary<any>, key: string) {
    return (evnt: Event) => {
        if (evnt.target)
            obj[key] = (evnt.target as HTMLInputElement).checked;
    };
}
