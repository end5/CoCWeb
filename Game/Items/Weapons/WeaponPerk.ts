import { Dictionary } from '../../../Engine/Utilities/Dictionary';
import { Character } from '../../Character/Character';

export enum WeaponPerkType {
    None = "None"
}
export type WeaponPerk = (self: Character, target: Character) => any;

export const WeaponPerkLib = new Dictionary<WeaponPerkType, WeaponPerk>();
