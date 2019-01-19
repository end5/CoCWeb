import { loadFromClassName } from 'Engine/Utilities/Html';
import { ScreenElement } from 'Engine/Display/Elements/ScreenElement';

export class StatPanel extends ScreenElement<HTMLDivElement> {
    private statBarElement?: HTMLElement;
    private statCurrentElement?: HTMLElement;
    private statMaxElement?: HTMLElement;
    private statValue: number = 0;
    private statMin: number = 0;
    private statMax: number = 100;

    public get element(): HTMLDivElement {
        return super.element;
    }

    public set element(htmlElement: HTMLDivElement) {
        super.element = htmlElement;
        this.setStats();
    }

    private setStats() {
        this.statBarElement = this.element.getElementsByClassName("statsBar")[0] as HTMLElement;
        this.statCurrentElement = loadFromClassName("statsCurrent", this.element);
        this.statMaxElement = this.element.getElementsByClassName("statsMax")[0] as HTMLElement;
        this.statValue = 0;
        this.statMin = 0;
        this.statMax = 100;
    }

    public get value() {
        return this.statValue;
    }
    public set value(num: number) {
        this.statValue = num;
        this.update();
    }

    public get min() {
        return this.statMin;
    }
    public set min(num: number) {
        this.statMin = num;
        this.update();
    }

    public get max() {
        return this.statMax;
    }
    public set max(num: number) {
        this.statMax = num;
        this.update();
    }

    private update() {
        if (this.statCurrentElement) {
            this.statCurrentElement.innerHTML = this.statValue.toString();
            if (this.statBarElement) {
                if (this.statMaxElement && this.statMax >= 0) {
                    this.statMaxElement.innerHTML = this.statMax.toString();
                }
                if (this.statMax <= 0 || this.statValue <= 0)
                    this.statBarElement.style.width = "0%";
                else
                    this.statBarElement.style.width = (this.statValue / this.statMax * 100).toString() + "%";
            }
        }
    }
}
