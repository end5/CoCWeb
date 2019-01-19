import { ScreenElement } from './Elements/ScreenElement';
import { randInt } from 'Engine/Utilities/SMath';

type EventFunction = (event: Event) => void;

export class ButtonElement extends ScreenElement<HTMLAnchorElement> {
    public readonly elementType = 'a';
    private static textColorActive = "Black";
    private static textColorInactive = "DarkRed";
    private clickFunc: EventFunction | undefined;
    private lock: boolean = false;

    public constructor() {
        super();
    }

    public get element(): HTMLAnchorElement {
        return super.element;
    }

    public set element(htmlElement: HTMLAnchorElement) {
        super.element = htmlElement;
        super.element.style.backgroundImage = "url('resource/ui/button" + randInt(10) + ".jpg')";
        super.element.className = "button";
    }

    /**
     * Modifies the text and click function in the button and shows the button.
     * @param text The text that appears on the button.
     * @param clickFunc The function that is called when clicked.
     * @param disable Whether or not the button should be clickable.
     */
    public modify(text: string, clickFunc?: EventFunction, disable: boolean = false) {
        this.element.textContent = text;
        this.disable();
        if (clickFunc) {
            this.clickFunc = clickFunc;
            if (!disable)
                this.enable();
        }
        this.show();
    }

    public enable() {
        if (!this.lock && this.clickFunc) {
            this.lock = true;
            this.element.addEventListener('click', this.clickFunc);
            this.element.style.color = ButtonElement.textColorActive;
        }
    }

    public disable() {
        if (this.lock && this.clickFunc) {
            this.lock = false;
            this.element.removeEventListener('click', this.clickFunc);
        }
        this.element.style.color = ButtonElement.textColorInactive;
    }
}
