import { Pregnancy, IPregnancy } from 'Engine/Body/Pregnancy/Pregnancy';
import { IncubationTime } from './IncubationTime';
import { PregnancyType } from './PregnancyType';
import { EggType } from 'Content/Items/Consumables/Eggs';

export interface IEggPregnancy extends IPregnancy {
    eggType: EggType;
    large: boolean;
    amount: number;
}

export class EggPregnancy extends Pregnancy {
    public eggType: EggType = EggType.Black;
    public large: boolean = false;
    public amount: number = 0;

    public constructor(eggType: EggType, large: boolean, amount: number) {
        super(PregnancyType.OVIELIXIR_EGGS, IncubationTime.OVIELIXIR_EGGS);
        this.eggType = eggType;
        this.large = large;
        this.amount = amount;
    }

    public serialize(): IEggPregnancy {
        return Object.assign({
            eggType: this.eggType,
            large: this.large,
            amount: this.amount
        }, super.serialize());
    }

    public deserialize(saveObject: IEggPregnancy) {
        this.eggType = saveObject.eggType;
        this.large = saveObject.large;
        this.amount = saveObject.amount;
        super.deserialize(saveObject);
    }
}
