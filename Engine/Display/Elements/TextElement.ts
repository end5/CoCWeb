import { ScreenElement } from './ScreenElement';

export abstract class TextElement<T extends HTMLElement> extends ScreenElement<T> {
    public text(text: string) {
        this.htmlElement.innerHTML += text;
    }

    public clear() {
        if (this.htmlElement) {
            while (this.htmlElement.lastChild) {
                this.htmlElement.removeChild(this.htmlElement.lastChild);
            }
            this.htmlElement.innerHTML = "";
        }
    }
}
