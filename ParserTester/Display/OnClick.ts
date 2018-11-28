export function clearElement(el: HTMLElement) {
    while (el.lastElementChild) {
        el.removeChild(el.lastElementChild);
    }
}
