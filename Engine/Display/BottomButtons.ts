import { ButtonElement } from './ButtonElement';

export class BottomButtons {
    public static readonly NUM_BOT_BUTTONS = 10;
    public static readonly NEXT_BUTTON_ID = 0;
    public static readonly BACK_BUTTON_ID = BottomButtons.NUM_BOT_BUTTONS - 1;
    public static readonly YES_BUTTON_ID = 0;
    public static readonly NO_BUTTON_ID = 1;
    public readonly buttons: ButtonElement[] = [];

    public get(buttonNumber: number): ButtonElement | undefined {
        return this.buttons[buttonNumber];
    }

    public show() {
        for (let buttonNumber: number = 0; buttonNumber < BottomButtons.NUM_BOT_BUTTONS; buttonNumber++) {
            this.buttons[buttonNumber].show();
        }
    }

    public hide() {
        for (let buttonNumber: number = 0; buttonNumber < BottomButtons.NUM_BOT_BUTTONS; buttonNumber++) {
            this.buttons[buttonNumber].hide();
        }
    }
}
