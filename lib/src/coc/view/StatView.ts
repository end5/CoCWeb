export class StatView {
    public element: HTMLElement;
    protected info: HTMLElement;
    protected name: HTMLElement;
    protected numbers: HTMLElement;
    protected currNumber: HTMLElement;

    protected arrowUp: HTMLElement;
    protected arrowDown: HTMLElement;

    public constructor(id: string, name: string) {
        let element = document.getElementById(id);
        if (!element)
            throw new Error('Could not load element with id: "' + id + '"');
        this.element = element;

        this.info = this.loadClass('statInfo');
        this.name = this.loadClass('statName');
        this.name.textContent = name;

        this.numbers = this.loadClass('statNumbers');

        this.currNumber = this.loadClass('statCurrent');
        this.currNumber.textContent = '0';

        this.arrowUp = this.loadClass('arrowUp');
        this.arrowDown = this.loadClass('arrowDown');
    }

    protected loadClass(className: string) {
        const element = this.element.getElementsByClassName(className)[0];
        if (!element)
            throw new Error('Could not load "' + className + '" element');
        return element as HTMLElement;
    }

    public setNumber(num: number) {
        this.currNumber.textContent = num + '';
    }

    public showUp() {
        this.arrowUp.classList.remove('hidden');
        this.arrowDown.classList.add('hidden');
    }

    public showDown() {
        this.arrowUp.classList.add('hidden');
        this.arrowDown.classList.remove('hidden');
    }

    public hideArrows() {
        this.arrowUp.classList.add('hidden');
        this.arrowDown.classList.add('hidden');
    }
}

export class StatViewWithBar extends StatView {
    private bar: HTMLElement;

    public constructor(id: string, name: string) {
        super(id, name);

        this.bar = this.loadClass('statBar');
        this.bar.style.width = '0%';
    }

    public setBar(percent: number) {
        this.bar.style.width = percent + '%';
    }
}