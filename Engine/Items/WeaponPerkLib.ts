import { Dictionary } from 'Engine/Utilities/Dictionary';
import { Character } from 'Engine/Character/Character';

export type WeaponPerk = (self: Character, target: Character) => any;

export const WeaponPerkLib = new Dictionary<string, WeaponPerk>();
