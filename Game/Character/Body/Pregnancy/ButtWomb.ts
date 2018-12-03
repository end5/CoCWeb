import { PregnancyType, IncubationTime, Pregnancy } from './Pregnancy';
import { Womb } from './Womb';
import { randInt } from 'Engine/Utilities/SMath';
import { IPregnancyEvent } from './IPregnancyEvent';

export class ButtWomb extends Womb {
    public canKnockUp(): boolean {
        return !this.pregnancy;
    }

    public knockUp(type: PregnancyType, time: IncubationTime, event: IPregnancyEvent, virility: number = 100, guarantee: boolean = false): void {
        if (guarantee || this.canKnockUp()) {
            if (guarantee || this.body.fertility > randInt(virility)) {
                this.currentPregnancy = new Pregnancy(type, time);
                this.pregEvent = event;
            }
        }
    }
}
