import { ScreenElement } from './ScreenElement';

export abstract class TextElement<T extends HTMLElement> extends ScreenElement<T> {
    private textBuffer: string = "";
    private bufferModified: boolean = false;

    // private store(addToStart: string, addToEnd: string) {
    //     this.bufferModified = true;
    //     const innerHTML = this.htmlElement.innerHTML.slice(0, this.htmlElement.innerHTML.length - this.textBuffer.length);
    //     this.textBuffer = addToStart + this.textBuffer + addToEnd;
    //     this.htmlElement.innerHTML = innerHTML + this.textBuffer;
    // }

    public getText(): string {
        return this.textBuffer;
    }

    public modified(): boolean {
        return this.bufferModified;
    }

    public text(text: string): TextElement<T> {
        this.bufferModified = true;
        this.textBuffer = text + "";
        this.htmlElement.innerHTML += text;
        return this;
    }

    // public newline(): TextElement<T> {
    //     this.store("<br>", "");
    //     return this;
    // }

    // public endline(): TextElement<T> {
    //     this.store("", "<br>");
    //     return this;
    // }

    // public newParagraph(): TextElement<T> {
    //     this.store("<br><br>", "");
    //     return this;
    // }

    // public bold(): TextElement<T> {
    //     this.store("<b>", "</b>");
    //     return this;
    // }

    // public italic(): TextElement<T> {
    //     this.store("<i>", "</i>");
    //     return this;
    // }

    // public underscore(): TextElement<T> {
    //     this.store("<u>", "</u>");
    //     return this;
    // }

    // public say(): TextElement<T> {
    //     this.store("<b>", "</b>");
    //     return this;
    // }

    // public describe(): TextElement<T> {
    //     this.store("<i>", "</i>");
    //     return this;
    // }

    // public link(link: string): TextElement<T> {
    //     this.store("<a href='" + link + "'>", "</a>");
    //     return this;
    // }

    public clear() {
        if (this.htmlElement) {
            while (this.htmlElement.lastChild) {
                this.htmlElement.removeChild(this.htmlElement.lastChild);
            }
            this.htmlElement.innerHTML = "";
        }
        this.textBuffer = "";
    }
}
