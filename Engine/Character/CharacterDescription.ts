import { Character } from './Character';
import { ISerializable } from 'Engine/Utilities/ISerializable';
import { Gender } from 'Engine/Body/GenderIdentity';

export interface ICharDesc {
    article: string;
    defaultShort: string;
    otherShort: string;
    longDesc: string;
    isPlural: boolean;
}

export class CharacterDescription implements ISerializable<ICharDesc> {
    protected char: Character;
    private subjective: string = "";
    private objective: string = "";
    private possessive: string = "";
    private article: string;
    private defaultShort: string;
    private otherShort: string;
    private longDesc: string;
    private isPlural: boolean;
    private secondPerson: boolean = false;

    public constructor(character: Character, article: string, short: string, long: string, plural: boolean = false) {
        this.char = character;
        this.article = article;
        this.defaultShort = short;
        this.otherShort = "";
        this.longDesc = long;
        this.isPlural = plural;
        this.update();
    }

    public set isPlayer(value: boolean) {
        this.secondPerson = value;
        this.update();
    }

    public update() {
        this.subjective = this.determinePronoun("you", "they", "he", "she", "it");
        this.objective = this.determinePronoun("you", "them", "him", "her", "it");
        this.possessive = this.determinePronoun("your", "their", "his", "her", "its");
        if (this.article === ("a" || "the"))
            this.article = this.plural ? "the" : "a";
    }

    private determinePronoun(second: string, plural: string, male: string, female: string, other: string) {
        if (this.secondPerson) return second;
        if (this.plural) return plural;
        if (this.char.genderPref === Gender.MALE) return male;
        if (this.char.genderPref === Gender.FEMALE) return female;
        return other;
    }

    public get name(): string {
        return this.otherShort !== "" ? this.otherShort : this.defaultShort;
    }

    public set name(value: string) {
        this.otherShort = value;
    }

    public get short(): string {
        return this.otherShort !== "" ? this.otherShort : this.defaultShort;
    }

    public get long(): string {
        return this.longDesc;
    }

    public set long(value: string) {
        this.longDesc = value;
    }

    public get plural(): boolean {
        return this.isPlural;
    }

    /**
     * Returns subjective pronoun. (ie. you/he/she/it/they) - pronoun1
     */
    public get subjectivePronoun(): string {
        return this.subjective;
    }

    /**
     * Returns objective pronoun. (ie. you/him/her/it/them) - pronoun2
     */
    public get objectivePronoun(): string {
        return this.objective;
    }

    /**
     * Returns possessive pronoun. (ie. your/his/her/its/their) - pronoun3
     */
    public get possessivePronoun(): string {
        return this.possessive;
    }

    /**
     * Returns "a" if singular, "the" if plural.
     */
    public get a(): string {
        return this.article;
    }

    /**
     * Returns "A" if singular, "The" if plural.
     */
    public get capitalA(): string {
        if (this.article.length === 0) return "";
        return this.article.charAt(0).toUpperCase() + this.article.substr(1);
    }

    public serialize(): ICharDesc {
        return {
            article: this.article,
            defaultShort: this.short,
            otherShort: this.otherShort,
            longDesc: this.long,
            isPlural: this.plural
        };
    }

    public deserialize(saveObject: ICharDesc) {
        this.article = saveObject.article;
        this.defaultShort = saveObject.defaultShort;
        this.otherShort = saveObject.otherShort;
        this.longDesc = saveObject.longDesc;
        this.isPlural = saveObject.isPlural;
    }
}
