export function loadFromId<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id) as T;
    if (!element)
        throw new Error("Could not find " + id + " on page");
    return element as T;
}

export function loadFromClassName<T extends HTMLElement>(classname: string, parentElement: HTMLElement): T {
    let element;
    if (parentElement.getElementsByClassName(classname).length !== 0)
        element = parentElement.getElementsByClassName(classname)[0] as T;
    else
        throw new Error(classname + " was not found on " + parentElement.title);
    return element;
}
