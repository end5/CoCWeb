class SaveManager {
    private activatedSlot: number = -1;
    private saveSlots: (object | undefined)[];
    public autoSave: boolean;

    public constructor() {
        this.saveSlots = [];
        this.saveSlots.length = 20;
        this.autoSave = true;
        this.readSlots();
    }

    private writeSlots() {
        localStorage.setItem("CoCWeb", JSON.stringify(this.saveSlots));
    }

    private readSlots() {
        try {
            if (localStorage.getItem("CoCWeb"))
                this.saveSlots = JSON.parse(localStorage.getItem("CoCWeb")!);
        }
        catch (e) {
            console.error(e);
        }
    }

    public activeSlot(): number {
        return this.activatedSlot;
    }

    public has(slot: number): boolean {
        return !!this.saveSlots[slot];
    }

    public get(slot: number): object | undefined {
        return this.saveSlots[slot];
    }

    public delete(slot: number) {
        this.saveSlots[slot] = undefined;
        this.writeSlots();
    }

    public saveSlotCount(): number {
        return this.saveSlots.length;
    }

    public autosaveToggle() {
        this.autoSave = !this.autoSave;
    }

    public loadFromSlot(slotNumber: number) {
        this.readSlots();
        return this.saveSlots[slotNumber];
    }

    public loadFromFile(blob: Blob, callback: (obj: object) => void) {
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(blob);
        fileReader.addEventListener("loadend", () => {
            if (typeof fileReader.result === 'string')
                callback(JSON.parse(fileReader.result));
        });
    }

    public saveToSlot(slotNumber: number, save: object) {
        this.saveSlots[slotNumber] = save;
        this.writeSlots();
    }
}

const saveManager = new SaveManager();
export { saveManager as SaveManager };
