import { Character } from "../Character/Character";

export enum Gender {
    NONE, MALE, FEMALE, HERM
}

export class GenderIdentity {
    private sex: Gender = Gender.NONE;
    private forced: boolean = false;
    private preferredGender: Gender = Gender.NONE;
    private char: Character;
    public constructor(char: Character) {
        this.char = char;
    }

    private update() {
        if (this.char.body.cocks.length > 0 && this.char.body.vaginas.length > 0)
            this.sex = Gender.HERM;
        else if (this.char.body.cocks.length > 0)
            this.sex = Gender.MALE;
        else if (this.char.body.vaginas.length > 0)
            this.sex = Gender.FEMALE;
        else
            this.sex = Gender.NONE;
    }

    public get preference(): Gender {
        if (this.forced)
            return this.preferredGender;
        else {
            this.update();
            return this.preferredGender;
        }
    }

    public set preference(gender: Gender) {
        this.forced = gender === undefined ? false : true;
        this.preferredGender = gender;
    }

    public get gender(): Gender {
        this.update();
        return this.sex;
    }

    public reset() {
        this.forced = false;
    }
}
