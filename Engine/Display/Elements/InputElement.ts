import { ScreenElement } from './ScreenElement';

export class InputElement extends ScreenElement<HTMLInputElement> {
    public constructor(type: string, htmlElement?: HTMLInputElement) {
        super(htmlElement);
        this.element.type = type;
    }

    public get type(): string {
        return this.element.type;
    }

    public set type(type: string) {
        this.element.type = type;
    }

    public select() {
        this.element.select();
    }

    public get value(): string {
        return this.element.value;
    }

    public set value(value: string) {
        this.element.value = value;
    }
}
