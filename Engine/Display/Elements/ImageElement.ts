import { ScreenElement } from './ScreenElement';

export class ImageElement extends ScreenElement<HTMLImageElement> {
    public constructor() {
        super(document.createElement('img'));
    }

    public load(location: string) {
        this.htmlElement.src = location;
    }
}
