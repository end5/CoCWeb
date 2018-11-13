import { ScreenElement } from './ScreenElement';

export class AnchorElement extends ScreenElement<HTMLAnchorElement> {
    public constructor() {
        super(document.createElement('a'));
    }

    public get href(): string {
        return this.htmlElement.href;
    }

    public set href(link: string) {
        this.htmlElement.href = link;
    }

    public get download(): string {
        return this.htmlElement.download;
    }

    public set download(name: string) {
        this.htmlElement.download = name;
    }

    public click() {
        this.htmlElement.click();
    }
}
