import { ButtonElement } from './ButtonElement';

export class TopButtons {
    public static readonly NUM_TOP_BUTTONS = 6;
    public readonly buttons: ButtonElement[] = [];

    public constructor() {
    }

    public get(buttonNumber: number): ButtonElement | undefined {
        return this.buttons[buttonNumber];
    }

    public show() {
        for (let buttonNumber: number = 0; buttonNumber < TopButtons.NUM_TOP_BUTTONS; buttonNumber++) {
            this.buttons[buttonNumber].show();
        }
    }

    public hide() {
        for (let buttonNumber: number = 0; buttonNumber < TopButtons.NUM_TOP_BUTTONS; buttonNumber++) {
            this.buttons[buttonNumber].hide();
        }
    }

    public get mainMenu() {
        return this.buttons[0];
    }

    public get data() {
        return this.buttons[1];
    }

    public get stats() {
        return this.buttons[2];
    }

    public get levelUp() {
        return this.buttons[3];
    }

    public get perks() {
        return this.buttons[4];
    }

    public get appearance() {
        return this.buttons[5];
    }
}
