
type EventFunction = (event: Event) => void;

export class PreviewButton {
    public htmlElement: HTMLElement;
    private clickFunc?: EventFunction;

    public constructor() {
        this.htmlElement = document.createElement('button');
        this.htmlElement.className = "button";
    }

    public get text(): string {
        return this.htmlElement.textContent!;
    }

    public set text(str: string) {
        this.htmlElement.textContent = str;
    }

    public clear() {
        this.htmlElement.textContent = '';
        this.disable();
    }
    /**
     * Modifies the text and click function in the button and shows the button.
     * @param text The text that appears on the button.
     * @param clickFunc The function that is called when clicked.
     * @param disable Whether or not the button should be clickable.
     */
    public modify(text: string, clickFunc: EventFunction, disable: boolean = false) {
        this.htmlElement.textContent = text;
        this.disable();
        if (clickFunc) {
            this.clickFunc = clickFunc;
            if (!disable)
                this.enable();
        }
    }

    public enable() {
        if (this.clickFunc)
            this.htmlElement.addEventListener('click', this.clickFunc);
    }

    public disable() {
        if (this.clickFunc)
            this.htmlElement.removeEventListener('click', this.clickFunc);
    }
}
