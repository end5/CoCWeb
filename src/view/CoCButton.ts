import { loadClass } from "./LoadUtils";

export class CoCButton {
    private button: HTMLElement;
    private tooltip?: HTMLElement;

    protected _callback?: () => void;

    public constructor(protected element: HTMLElement) {
        this.button = loadClass("button", element);
        this.tooltip = element.getElementsByClassName("tooltip")[0] as HTMLElement;

        this.button.addEventListener("mouseover", () => {
            if (this.toolTipText && this.tooltip) this.tooltip.classList.remove("hidden");
        });
        this.button.addEventListener("mouseleave", () => {
            if (this.tooltip) this.tooltip.classList.add("hidden");
        });
        this.button.addEventListener("click", () => {
            if (this.tooltip) this.tooltip.classList.add("hidden");
            if (this._callback) this._callback();
        });
    }

    public click() {
        this.button.click();
    }

    /// ///// Getters and Setters ////////

    public get toolTipText() {
        if (this.tooltip) return this.tooltip.innerHTML || "";
        else return "";
    }

    public set toolTipText(text) {
        if (this.tooltip) this.tooltip.innerHTML = text;
    }

    public get labelText() {
        return this.button.innerHTML || "";
    }

    public set labelText(value) {
        this.button.innerHTML = value;
    }

    public get callback() {
        return this._callback;
    }

    public set callback(value) {
        this._callback = value;
    }

    public get visible() {
        return !this.button.classList.contains("hidden");
    }

    public set visible(vis) {
        if (vis && this.labelText !== "" && this._callback !== undefined)
            this.button.classList.remove("hidden");
        else this.button.classList.add("hidden");
    }
}
