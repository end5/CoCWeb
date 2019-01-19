import { TextElement } from './TextElement';

export class TextAreaElement extends TextElement<HTMLTextAreaElement> {
    public select() {
        this.element.select();
    }
}
