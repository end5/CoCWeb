export class CoCButton {

    protected _callback?: () => void;

    public constructor(
        protected button: HTMLElement,
        protected tooltip: HTMLElement
    ) {
        this.button.addEventListener('mouseover', this.hover);
        this.button.addEventListener('mouseleave', this.dim);
        this.button.addEventListener('click', this.click);
    };

    //////// Mouse Events... ////////

    public hover(event?: MouseEvent): void {
        this.button.style.opacity = '0.5';
        if (this.toolTipText)
            this.tooltip.classList.remove('hidden');
    };

    public dim(event?: MouseEvent): void {
        this.button.style.opacity = '1';
        this.tooltip.classList.add('hidden');
    };

    public click(event?: MouseEvent): void {
        this.tooltip.classList.add('hidden');
        if (this._callback)
            this._callback();
    };

    //////// Getters and Setters ////////

    public get toolTipText() {
        return this.tooltip.textContent || '';
    }

    public set toolTipText(text: string) {
        this.tooltip.textContent = text;
    }

    public get labelText(): string {
        return this.button.textContent || '';
    };

    public set labelText(value: string) {
        this.button.textContent = value;
    };

    public get callback() {
        return this._callback;
    };

    public set callback(value: any) {
        this._callback = value;
    };

    public get visible(): boolean {
        return !this.button.classList.contains('hidden');
    }

    public set visible(vis: boolean) {
        if (vis)
            this.button.classList.remove('hidden');
        else
            this.button.classList.add('hidden');
    }

}
