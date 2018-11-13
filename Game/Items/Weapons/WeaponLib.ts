import { Weapon } from './Weapon';
import { WeaponName } from './WeaponName';
import { Dictionary } from '../../../Engine/Utilities/Dictionary';

// key: string, shortName: string, displayname: string, longName: string, verb: string, attack: number, value: number = 0, description: string = undefined, perk: string = ""
export const WeaponLib = new Dictionary<WeaponName, Weapon>();
