import { ButtonElement } from "./ButtonElement";
import { loadFromId } from "../Engine/Utilities/Html";

export class BottomButtons {
    public static readonly NUM_BOT_BUTTONS = 10;
    public static readonly NEXT_BUTTON_ID = 0;
    public static readonly BACK_BUTTON_ID = BottomButtons.NUM_BOT_BUTTONS - 1;
    public static readonly YES_BUTTON_ID = 0;
    public static readonly NO_BUTTON_ID = 1;
    private botButtons: ButtonElement[] = [];

    public constructor() {
        for (let index = 0; index < BottomButtons.NUM_BOT_BUTTONS; index++) {
            const newButton = new ButtonElement();
            newButton.setHTMLElement(loadFromId("button" + index) as HTMLAnchorElement);
            this.botButtons.push(newButton);
        }
    }

    public get(buttonNumber: number): ButtonElement | undefined {
        return this.botButtons[buttonNumber];
    }

    public show() {
        for (let buttonNumber: number = 0; buttonNumber < BottomButtons.NUM_BOT_BUTTONS; buttonNumber++) {
            this.botButtons[buttonNumber].show();
        }
    }

    public hide() {
        for (let buttonNumber: number = 0; buttonNumber < BottomButtons.NUM_BOT_BUTTONS; buttonNumber++) {
            this.botButtons[buttonNumber].hide();
        }
    }
}
