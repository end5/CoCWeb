import { EventEmitter } from 'Engine/Utilities/EventEmitter';

export type TextBufferEvents = 'add' | 'modified' | 'clear';

export class TextBuffer {
    private textBuffer: string = "";
    public readonly emitter = new EventEmitter<TextBufferEvents, string>();

    public getBuffer(): string {
        return this.textBuffer;
    }

    public text(text: string): TextBuffer {
        this.emitter.dispatch('add', text);
        this.textBuffer = text + "";
        this.emitter.dispatch('modified', this.textBuffer);
        return this;
    }

    public clear() {
        this.emitter.dispatch('clear', this.textBuffer);
        this.textBuffer = "";
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
}
