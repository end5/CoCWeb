import { IPregnancyEvent } from './IPregnancyEvent';
import { Pregnancy, IPregnancy } from './Pregnancy';
import { ISerializable } from 'Engine/Utilities/ISerializable';
import { SortOption, FilterOption } from 'Engine/Utilities/List';
import { randInt } from 'Engine/Utilities/SMath';
import { Body } from '../Body';
import { CView } from 'Engine/Display/ContentView';

export interface IWomb {
    pregnancy: IPregnancy;
}

export class Womb implements ISerializable<IWomb> {
    public static readonly LargestPregnancy: SortOption<Womb> = (a: Womb, b: Womb) => {
        return (a.pregnancy ? a.pregnancy.incubation : 0) - (b.pregnancy ? b.pregnancy.incubation : 0);
    }

    public static readonly SmallestPregnancy: SortOption<Womb> = (a: Womb, b: Womb) => {
        return (b.pregnancy ? b.pregnancy.incubation : 0) - (a.pregnancy ? a.pregnancy.incubation : 0);
    }

    public static readonly Pregnant: FilterOption<Womb> = (a: Womb) => {
        return a.isPregnant();
    }

    public static readonly NotPregnant: FilterOption<Womb> = (a: Womb) => {
        return !a.isPregnant();
    }

    public static PregnantWithType(type: string): FilterOption<Womb> {
        return (a: Womb) => {
            return !!a.pregnancy && a.pregnancy.type === type;
        };
    }

    protected currentPregnancy?: Pregnancy;
    protected pregEvent?: IPregnancyEvent;
    protected body: Body;
    public constructor(body: Body) {
        this.body = body;
    }

    public get pregnancy(): Pregnancy | undefined {
        return this.currentPregnancy;
    }

    public isPregnant(): boolean {
        return !!this.pregnancy;
    }

    private removeHeat() {
        CView.text("\nYou calm down a bit and realize you no longer fantasize about getting fucked constantly.  It seems your heat has ended.\n");
    }

    /**
     * Knocks up a womb.
     * If it guaranteed or the fertility score is greater than the virility,
     * the womb is fertilized and a pregnancy is added.
     * @param pregnancy The pregnancy
     * @param event An event that happens as the pregnancy progresses
     * @param virility A number, default 100
     * @param guarantee If true, guarantees pregnancy
     */
    public knockUp(pregnancy: Pregnancy, event: IPregnancyEvent, virility: number = 100, guarantee?: boolean): void {
        if (!this.pregnancy && (guarantee || this.body.fertility > randInt(virility))) {
            this.removeHeat();
            this.currentPregnancy = pregnancy;
            this.pregEvent = event;
        }
    }

    public clear() {
        this.currentPregnancy = undefined;
    }

    public update() {
        if (this.currentPregnancy) {
            this.currentPregnancy.incubation -= this.currentPregnancy.incubation === 0 ? 0 : 1;
        }
    }

    public serialize(): IWomb | void {
        if (this.currentPregnancy)
            return {
                pregnancy: this.currentPregnancy
            };
    }

    public deserialize(saveObject: IWomb | undefined) {
        if (saveObject) {
            this.currentPregnancy = new Pregnancy('', 0);
            this.currentPregnancy.deserialize(saveObject.pregnancy);
        }
    }
}
