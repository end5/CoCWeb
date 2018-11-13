import { ScreenElement } from './ScreenElement';

export class InputTextElement extends ScreenElement<HTMLInputElement> {
    public constructor() {
        super(document.createElement('input'));
        this.htmlElement.type = "text";
    }

    public get text(): string {
        return this.htmlElement.value;
    }

    public set text(text: string) {
        this.htmlElement.value = text;
    }

    public select() {
        this.htmlElement.select();
    }
}
