import { loadFromClassName } from 'Engine/Utilities/Html';
import { BlankElement } from './Elements/BlankElement';

export class StatPanel extends BlankElement {
    private statBarElement: HTMLElement | undefined;
    private statCurrentElement: HTMLElement | undefined;
    private statMaxElement: HTMLElement | undefined;
    private statValue: number = 0;
    private statMin: number = 0;
    private statMax: number = 100;

    public setHTMLElement(element: HTMLDivElement) {
        super.setHTMLElement(element);
        this.setStats();
    }

    private setStats() {
        this.statBarElement = this.htmlElement.getElementsByClassName("statsBar")[0] as HTMLElement;
        this.statCurrentElement = loadFromClassName("statsCurrent", this.htmlElement);
        this.statMaxElement = this.htmlElement.getElementsByClassName("statsMax")[0] as HTMLElement;
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
