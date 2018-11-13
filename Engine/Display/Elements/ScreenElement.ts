export abstract class ScreenElement<T extends HTMLElement> {
    protected htmlElement: T;

    public constructor(htmlElement: T) {
        this.htmlElement = htmlElement;
    }

    public setHTMLElement(element: T) {
        this.htmlElement = element;
    }

    public hide() {
        if (this.htmlElement)
            this.htmlElement.style.visibility = "hidden";
    }

    public show() {
        if (this.htmlElement)
            this.htmlElement.style.visibility = "visible";
    }

    public appendElement(element: ScreenElement<HTMLElement>) {
        if (this.htmlElement)
            element.htmlElement = this.htmlElement.appendChild(element.htmlElement);
    }

    public removeElement(element: ScreenElement<HTMLElement>) {
        if (this.htmlElement)
            this.htmlElement.removeChild(element.htmlElement);
    }

    public get style(): CSSStyleDeclaration {
        return this.htmlElement.style;
    }

    public get computedStyle(): CSSStyleDeclaration {
        return window.getComputedStyle(this.htmlElement);
    }
}
