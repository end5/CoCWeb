import { ScreenElement } from './ScreenElement';

export class BlankElement extends ScreenElement<HTMLDivElement> {
    public constructor() {
        super(document.createElement('div'));
    }
}
