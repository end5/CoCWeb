import { Character } from '../Character/Character';

export class ItemDesc {
    public readonly shortName: string;  // Short name to be displayed on buttons
    public readonly longName: string;   // A full name of the item, to be described in text
    private readonly detailedDesc: string;      // Detailed description to use on tooltips

    public constructor(shortName: string, longName?: string, detailedDesc?: string) {
        this.shortName = shortName;
        this.longName = longName || this.shortName;
        this.detailedDesc = detailedDesc || this.longName;
    }

    public description(character?: Character): string {
        return this.detailedDesc;
    }
}
