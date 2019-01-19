import { ScreenElement } from './ScreenElement';

export class UnorderedListElement extends ScreenElement<HTMLUListElement> {
    private list: ScreenElement<HTMLLIElement>[];

    public constructor(htmlElement?: HTMLUListElement) {
        super(htmlElement);
        this.list = [];
    }

    public appendChild(element: ScreenElement<HTMLLIElement>) {
        super.appendChild(element);
        this.list.push(element);
    }

    public get(index: number): ScreenElement<HTMLLIElement> | undefined {
        if (index >= this.list.length) return;
        return this.list[index];
    }

    public remove(index: number) {
        if (index > 0 && index < this.list.length) {
            this.removeChild(this.list.splice(index, 1)[0]);
        }
    }

    public count(): number {
        return this.list.length;
    }
}
