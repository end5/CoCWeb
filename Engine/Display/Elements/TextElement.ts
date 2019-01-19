import { ScreenElement } from './ScreenElement';

export class TextElement<T extends HTMLElement> extends ScreenElement<T> {
    public text(text: string) {
        this.element.innerHTML += text;
    }

    public clear() {
        while (this.element.lastChild) {
            this.element.removeChild(this.element.lastChild);
        }
        this.element.innerHTML = "";
    }
}
