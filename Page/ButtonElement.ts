import { ScreenElement } from '../Engine/Display/Elements/ScreenElement';
import { randomChoice } from '../Engine/Utilities/SMath';
import button0Image from '../resource/ui/button0.jpg';
import button1Image from '../resource/ui/button1.jpg';
import button2Image from '../resource/ui/button2.jpg';
import button3Image from '../resource/ui/button3.jpg';
import button4Image from '../resource/ui/button4.jpg';
import button5Image from '../resource/ui/button5.jpg';
import button6Image from '../resource/ui/button6.jpg';
import button7Image from '../resource/ui/button7.jpg';
import button8Image from '../resource/ui/button8.jpg';
import button9Image from '../resource/ui/button9.jpg';

type EventFunction = (event: Event) => void;

export class ButtonElement extends ScreenElement<HTMLAnchorElement> {
    private static textColorActive = "Black";
    private static textColorInactive = "DarkRed";
    private clickFunc: EventFunction | undefined;
    private lock: boolean = false;

    public constructor() {
        super(document.createElement('a'));
        // this.htmlElement.style.backgroundImage = "url('resource/ui/button" + randInt(10) + ".jpg')";
        this.htmlElement.style.backgroundImage = "url('" + randomChoice(button0Image, button1Image, button2Image, button3Image, button4Image, button5Image, button6Image, button7Image, button8Image, button9Image) + "')";
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
