import { Pregnancy } from './Pregnancy';
import { Womb } from './Womb';
import { randInt } from 'Engine/Utilities/SMath';
import { IPregnancyEvent } from './IPregnancyEvent';

export class ButtWomb extends Womb {
    public knockUp(pregnancy: Pregnancy, event: IPregnancyEvent, virility: number = 100, guarantee?: boolean): void {
        if (!this.pregnancy && (guarantee || this.body.fertility > randInt(virility))) {
            this.currentPregnancy = pregnancy;
            this.pregEvent = event;
        }
    }
}
