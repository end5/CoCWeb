import { ScreenElement } from './ScreenElement';

export class InputFileElement extends ScreenElement<HTMLInputElement> {
    public constructor() {
        super(document.createElement('input'));
        this.htmlElement.type = "file";
    }

    public getFile(): string {
        return this.htmlElement.value;
    }

    public select() {
        this.htmlElement.select();
    }
}
