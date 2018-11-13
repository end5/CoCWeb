import { Character } from '../../Character/Character';
import { Womb } from './Womb';

export interface IPregnancyEvent {
    incubationDisplay(player: Character, womb: Womb): void;
    canBirth(player: Character, womb: Womb): boolean;
    birthScene(player: Character, womb: Womb): void;
}
