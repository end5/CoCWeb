import { Stats, IStats } from 'Engine/Character/Stats/Stats';
import { Effect } from 'Engine/Effects/Effect';
import { ISerializable } from 'Engine/Utilities/ISerializable';

export class StatsWrapper implements ISerializable<IStats> {
    protected stats: Stats = new Stats();

    public get base(): Stats { return this.stats; }

    public get str(): number { return this.stats.str.value; }
    public set str(value: number) { this.stats.str.value = value; }

    public get tou(): number { return this.stats.tou.value; }
    public set tou(value: number) {
        this.stats.tou.value = value;

        // Add HP for toughness change.
        this.HP += value * 2;
    }

    public get spe(): number { return this.stats.spe.value; }
    public set spe(value: number) { this.stats.spe.value = value; }

    public get int(): number { return this.stats.int.value; }
    public set int(value: number) { this.stats.int.value = value; }

    public get lib(): number { return this.stats.lib.value; }
    public set lib(value: number) { this.stats.lib.value = value; }

    public get sens(): number { return this.stats.sens.value; }
    public set sens(value: number) { this.stats.sens.value = value; }

    public get cor(): number { return this.stats.cor.value; }
    public set cor(value: number) { this.stats.cor.value = value; }

    public get fatigue(): number { return this.stats.fatigue.value; }
    public set fatigue(value: number) { this.stats.fatigue.value = value; }
    public set fatiguePhysical(value: number) { this.stats.fatigue.value = value; }
    public set fatigueMagic(value: number) { this.stats.fatigue.value = value; }

    public get HP(): number { return this.stats.HP.value; }
    public set HP(value: number) { this.stats.HP.value = value; }

    public get lust(): number { return this.stats.lust.value; }
    public set lust(value: number) { this.stats.lust.value = value; }

    public set lustNoResist(value: number) { this.stats.lust.delta = value; }

    public lustPercent(): number { return this.stats.lustResist.value; }

    public set lustVuln(value: number) { this.stats.lustVuln = value; }
    public get lustVuln(): number { return this.stats.lustVuln; }

    public set XP(value: number) { this.stats.XP.raw = value; }
    public get XP(): number { return this.stats.XP.raw; }

    public set level(value: number) { this.stats.level.raw = value; }
    public get level(): number { return this.stats.level.raw; }

    public set perkPoints(value: number) { this.stats.perkPoints = value; }
    public get perkPoints(): number { return this.stats.perkPoints; }

    public set teaseLevel(value: number) { this.stats.teaseLevel = value; }
    public get teaseLevel(): number { return this.stats.teaseLevel; }

    public set teaseXP(value: number) { this.stats.teaseLevel = value; }
    public get teaseXP(): number { return this.stats.teaseLevel; }

    public addEffect(effect: Effect) {
        const values = effect.values;
        this.stats.str.addEffect(values.str);
        this.stats.tou.addEffect(values.tou);
        this.stats.spe.addEffect(values.spe);
        this.stats.int.addEffect(values.int);
        this.stats.lib.addEffect(values.lib);
        this.stats.sens.addEffect(values.sens);
        this.stats.cor.addEffect(values.cor);
        this.stats.fatigue.addEffect(values.fatigue);
        this.stats.HP.addEffect(values.hp);
        this.stats.lust.addEffect(values.lust);
    }

    public removeEffect(effect: Effect) {
        const values = effect.values;
        this.stats.str.removeEffect(values.str);
        this.stats.tou.removeEffect(values.tou);
        this.stats.spe.removeEffect(values.spe);
        this.stats.int.removeEffect(values.int);
        this.stats.lib.removeEffect(values.lib);
        this.stats.sens.removeEffect(values.sens);
        this.stats.cor.removeEffect(values.cor);
        this.stats.fatigue.removeEffect(values.fatigue);
        this.stats.HP.removeEffect(values.hp);
        this.stats.lust.removeEffect(values.lust);
    }

    public serialize(): IStats {
        return this.stats.serialize();
    }
    public deserialize(saveObject: IStats): void {
        this.stats.deserialize(saveObject);
    }
}
