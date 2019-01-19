import { ScreenElement } from './ScreenElement';

export class ImageElement extends ScreenElement<HTMLImageElement> {
    public load(location: string) {
        this.element.src = location;
    }
}
