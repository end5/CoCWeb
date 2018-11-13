export function loadFromId<K extends keyof HTMLElementTagNameMap>(id: string): HTMLElementTagNameMap[K] {
    const element = document.getElementById(id);
    if (!element)
        throw new Error("Could not find " + id + " on page");
    return element as HTMLElementTagNameMap[K];
}

export function loadFromClassName<K extends keyof HTMLElementTagNameMap>(classname: string, parentElement: HTMLElement): HTMLElementTagNameMap[K] {
    let element: HTMLElement;
    if (parentElement.getElementsByClassName(classname).length !== 0)
        element = parentElement.getElementsByClassName(classname)[0] as HTMLElement;
    else
        throw new Error(classname + " was not found on " + parentElement.title);
    return element as HTMLElementTagNameMap[K];
}
