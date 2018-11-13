import { TextElement } from './TextElement';

export class TextAreaElement extends TextElement<HTMLTextAreaElement> {
    public constructor() {
        super(document.createElement('textarea'));
    }

    public select() {
        this.htmlElement.select();
    }
}
