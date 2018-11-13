import { TextElement } from './TextElement';

export class ListEntryElement extends TextElement<HTMLLIElement> {
    public constructor() {
        super(document.createElement('li'));
    }
}
