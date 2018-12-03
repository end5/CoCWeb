import { Character } from './Character';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { mfn } from '../Descriptors/GenderDescriptor';

export interface ICharDesc {
    article: string;
    defaultShort: string;
    otherShort: string;
    longDesc: string;
    isPlural: boolean;
}

export class CharacterDescription implements ISerializable<ICharDesc> {
    protected character: Character;
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
        this.character = character;
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
        this.subjective = this.secondPerson ? "you" : this.plural ? "they" : mfn(this.character.genderPref, "he", "she", "it");
        this.objective = this.secondPerson ? "you" : this.plural ? "them" : mfn(this.character.genderPref, "him", "her", "it");
        this.possessive = this.secondPerson ? "your" : this.plural ? "their" : mfn(this.character.genderPref, "his", "her", "its");
        if (this.article === ("a" || "the"))
            this.article = this.plural ? "the" : "a";
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
