import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { StatWithEffects, IStatWithEffects } from './Stat/StatWithEffects';
import { RangedStatWithEffects, IRangedStatWithEffects } from './Stat/RangedStatWithEffects';

export interface IStats {
    str: IRangedStatWithEffects;
    tou: IRangedStatWithEffects;
    spe: IRangedStatWithEffects;
    int: IRangedStatWithEffects;
    lib: IRangedStatWithEffects;
    sens: IRangedStatWithEffects;
    cor: IRangedStatWithEffects;
    fatigue: IRangedStatWithEffects;
    HP: IRangedStatWithEffects;
    lust: IRangedStatWithEffects;
    lustVuln: number;
    XP: IStatWithEffects;
    level: IStatWithEffects;
    perkPoints: number;
    teaseXP: number;
    teaseLevel: number;
}

export class Stats implements ISerializable<IStats> {
    // Primary stats
    public str = new RangedStatWithEffects();
    public tou = new RangedStatWithEffects();
    public spe = new RangedStatWithEffects();
    public int = new RangedStatWithEffects();
    public lib = new RangedStatWithEffects();
    public sens = new RangedStatWithEffects();
    public cor = new RangedStatWithEffects();
    public fatigue = new RangedStatWithEffects();

    // Combat Stats
    public HP = new RangedStatWithEffects();
    public lust = new RangedStatWithEffects();
    public lustVuln: number = 0;

    // Level Stats
    public XP = new StatWithEffects();
    public level = new StatWithEffects();
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
