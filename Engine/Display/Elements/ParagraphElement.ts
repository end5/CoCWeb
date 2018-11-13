import { TextElement } from './TextElement';

export class ParagraphElement extends TextElement<HTMLParagraphElement> {
    public constructor() {
        super(document.createElement('p'));
    }
}
