export class ScreenElement<T extends HTMLElement> {
    private htmlElement?: T;

    public constructor(htmlElement?: T) {
        if (htmlElement)
            this.element = htmlElement;
    }

    public get element(): T {
        if (this.htmlElement)
            return this.htmlElement;
        throw new Error("No html element");
    }

    public set element(htmlElement: T) {
        this.htmlElement = htmlElement;
    }

    public hide() {
        this.element.style.visibility = "hidden";
    }

    public show() {
        this.element.style.visibility = "visible";
    }

    public appendChild(child: ScreenElement<HTMLElement>) {
        child.element = this.element.appendChild(child.element);
    }

    public removeChild(child: ScreenElement<HTMLElement>) {
        this.element.removeChild(child.element);
    }

    public get style(): CSSStyleDeclaration {
        return this.element.style;
    }

    public get computedStyle(): CSSStyleDeclaration {
        return window.getComputedStyle(this.element);
    }
}
