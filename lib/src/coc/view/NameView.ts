export class NameView {
    public element: HTMLElement;
    public constructor(id: string) {
        let element = document.getElementById(id);
        if (!element)
            throw new Error('Could not load element with id: "' + id + '"');
        this.element = element;
    }

    public setText(text: string) {
        this.element.textContent = 'Name: ' + text;
    }
}
