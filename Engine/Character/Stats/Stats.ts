import { ISerializable } from 'Engine/Utilities/ISerializable';
import { RangedStat, IRangedStat } from 'Engine/Character/Stats/Stat/RangedStat';
import { IStat, Stat } from 'Engine/Character/Stats/Stat/Stat';

export interface IStats {
    str: IRangedStat;
    tou: IRangedStat;
    spe: IRangedStat;
    int: IRangedStat;
    lib: IRangedStat;
    sens: IRangedStat;
    cor: IRangedStat;
    fatigue: IRangedStat;
    HP: IRangedStat;
    lust: IRangedStat;
    lustVuln: number;
    XP: IStat;
    level: IStat;
    perkPoints: number;
    teaseXP: number;
    teaseLevel: number;
}

export class Stats implements ISerializable<IStats> {
    // Primary stats
    public str = new RangedStat(0, 15, 100);
    public tou = new RangedStat(0, 15, 100);
    public spe = new RangedStat(0, 15, 100);
    public int = new RangedStat(0, 15, 100);
    public lib = new RangedStat(0, 5, 100);
    public sens = new RangedStat(0, 5, 100);
    public cor = new RangedStat(0, 0, 100);
    public fatigue = new RangedStat(0, 100, 100);

    // Combat Stats
    public HP = new RangedStat(0, 0, 100);
    public lust = new RangedStat(0, 0, 100);
    public lustVuln: number = 0;

    // Level Stats
    public XP = new Stat(0);
    public level = new Stat(1);
    public perkPoints: number = 0;
    public teaseXP: number = 0;
    public teaseLevel: number = 0;

    public serialize(): IStats {
        return {
            str: this.str.serialize(),
            tou: this.tou.serialize(),
            spe: this.spe.serialize(),
            int: this.int.serialize(),
            lib: this.lib.serialize(),
            sens: this.sens.serialize(),
            cor: this.cor.serialize(),
            fatigue: this.fatigue.serialize(),

            HP: this.HP.serialize(),
            lust: this.lust.serialize(),
            lustVuln: this.lustVuln,

            XP: this.XP.serialize(),
            level: this.level.serialize(),
            perkPoints: this.perkPoints,
            teaseXP: this.teaseXP,
            teaseLevel: this.teaseLevel
        };
    }

    public deserialize(saveObject: IStats) {
        this.str.deserialize(saveObject.str);
        this.tou.deserialize(saveObject.tou);
        this.spe.deserialize(saveObject.spe);
        this.int.deserialize(saveObject.int);
        this.lib.deserialize(saveObject.lib);
        this.sens.deserialize(saveObject.sens);
        this.cor.deserialize(saveObject.cor);
        this.fatigue.deserialize(saveObject.fatigue);

        this.HP.deserialize(saveObject.HP);
        this.lust.deserialize(saveObject.lust);
        this.lustVuln = saveObject.lustVuln;

        this.XP.deserialize(saveObject.XP);
        this.level.deserialize(saveObject.level);
        this.perkPoints = saveObject.perkPoints;
        this.teaseXP = saveObject.teaseXP;
        this.teaseLevel = saveObject.teaseLevel;
    }
}
