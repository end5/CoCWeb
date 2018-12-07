import { ScreenElement } from '../Engine/Display/Elements/ScreenElement';
import { randInt } from '../Engine/Utilities/SMath';

type EventFunction = (event: Event) => void;

export class ButtonElement extends ScreenElement<HTMLAnchorElement> {
    private static textColorActive = "Black";
    private static textColorInactive = "DarkRed";
    private clickFunc: EventFunction | undefined;
    private lock: boolean = false;

    public constructor() {
        super(document.createElement('a'));
        this.htmlElement.style.backgroundImage = "url('resource/ui/button" + randInt(10) + ".jpg')";
        this.htmlElement.className = "button";
    }

    /**
     * Modifies the text and click function in the button and shows the button.
     * @param text The text that appears on the button.
     * @param clickFunc The function that is called when clicked.
     * @param disable Whether or not the button should be clickable.
     */
    public modify(text: string, clickFunc?: EventFunction, disable: boolean = false) {
        this.htmlElement.textContent = text;
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
            this.htmlElement.addEventListener('click', this.clickFunc);
            this.htmlElement.style.color = ButtonElement.textColorActive;
        }
    }

    public disable() {
        if (this.lock && this.clickFunc) {
            this.lock = false;
            this.htmlElement.removeEventListener('click', this.clickFunc);
        }
        this.htmlElement.style.color = ButtonElement.textColorInactive;
    }
}
