import { ListEntryElement } from './ListEntryElement';
import { ScreenElement } from './ScreenElement';

export class UnorderedListElement extends ScreenElement<HTMLUListElement> {
    private list: ListEntryElement[];

    public constructor() {
        super(document.createElement('ul'));
        this.list = [];
    }

    public appendElement(element: ListEntryElement) {
        super.appendElement(element);
        this.list.push(element);
    }

    public get(index: number): ListEntryElement | undefined {
        if (index >= this.list.length) return;
        return this.list[index];
    }

    public remove(index: number) {
        if (index > 0 && index < this.list.length) {
            this.removeElement(this.list.splice(index, 1)[0]);
        }
    }

    public count(): number {
        return this.list.length;
    }
}
