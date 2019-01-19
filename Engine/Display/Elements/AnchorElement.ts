import { ScreenElement } from './ScreenElement';

export class AnchorElement extends ScreenElement<HTMLAnchorElement> {
    public get href(): string {
        return this.element.href;
    }

    public set href(link: string) {
        this.element.href = link;
    }

    public get download(): string {
        return this.element.download;
    }

    public set download(name: string) {
        this.element.download = name;
    }

    public click() {
        this.element.click();
    }
}
