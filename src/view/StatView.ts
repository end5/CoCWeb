import { loadClass, loadId } from "./LoadUtils";

export class StatView {
    public element: HTMLElement;
    protected info: HTMLElement;
    protected name: HTMLElement;
    protected numbers: HTMLElement;
    protected currNumber: HTMLElement;

    protected arrowUp: HTMLElement;
    protected arrowDown: HTMLElement;

    public constructor(id: string, name: string) {
        this.element = loadId(id);

        this.info = loadClass("statInfo", this.element);
        this.name = loadClass("statName", this.element);
        this.name.textContent = name;

        this.numbers = loadClass("statNumbers", this.element);

        this.currNumber = loadClass("statCurrent", this.element);
        this.currNumber.textContent = "0";

        this.arrowUp = loadClass("arrowUp", this.element);
        this.arrowDown = loadClass("arrowDown", this.element);
    }

    protected loadClass(className: string) {
        const element = this.element.getElementsByClassName(className)[0];
        if (!element) throw new Error(`Could not load "${className}" element`);
        return element as HTMLElement;
    }

    public setNumber(num: number) {
        this.currNumber.textContent = `${Math.round(num)}`;
    }

    public showUp() {
        this.arrowUp.classList.remove("hidden");
        this.arrowDown.classList.add("hidden");
    }

    public showDown() {
        this.arrowUp.classList.add("hidden");
        this.arrowDown.classList.remove("hidden");
    }

    public hideArrows() {
        this.arrowUp.classList.add("hidden");
        this.arrowDown.classList.add("hidden");
    }
}

export class StatViewWithBar extends StatView {
    private bar: HTMLElement;

    public constructor(id: string, name: string) {
        super(id, name);

        this.bar = this.loadClass("statBar");
        this.bar.style.width = "0%";
    }

    public setBar(percent: number) {
        this.bar.style.width = `${percent * 100}%`;
    }
}
