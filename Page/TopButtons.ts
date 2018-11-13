import { ButtonElement } from "./ButtonElement";
import { loadFromId } from "../Engine/Utilities/Html";

export class TopButtons {
    public static readonly NUM_TOP_BUTTONS = 6;
    private topButtons: ButtonElement[] = [];

    public constructor() {
        for (let index = 0; index < TopButtons.NUM_TOP_BUTTONS; index++) {
            const newButton = new ButtonElement();
            newButton.setHTMLElement(loadFromId("buttontop" + index) as HTMLAnchorElement);
            this.topButtons.push(newButton);
        }
    }

    public get(buttonNumber: number): ButtonElement | undefined {
        return this.topButtons[buttonNumber];
    }

    public show() {
        for (let buttonNumber: number = 0; buttonNumber < TopButtons.NUM_TOP_BUTTONS; buttonNumber++) {
            this.topButtons[buttonNumber].show();
        }
    }

    public hide() {
        for (let buttonNumber: number = 0; buttonNumber < TopButtons.NUM_TOP_BUTTONS; buttonNumber++) {
            this.topButtons[buttonNumber].hide();
        }
    }

    public get mainMenu() {
        return this.topButtons[0];
    }

    public get data() {
        return this.topButtons[1];
    }

    public get stats() {
        return this.topButtons[2];
    }

    public get levelUp() {
        return this.topButtons[3];
    }

    public get perks() {
        return this.topButtons[4];
    }

    public get appearance() {
        return this.topButtons[5];
    }
}
