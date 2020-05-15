export function loadClass(className: string, element: HTMLElement) {
    const sub = element.getElementsByClassName(className)[0];
    if (!sub) throw new Error(`Could not load child with class: "${className}"`);
    return sub as HTMLElement;
}

export function loadId(id: string) {
    const element = document.getElementById(id);
    if (!element) throw new Error(`Could not load element with id: "${id}"`);
    return element;
}
