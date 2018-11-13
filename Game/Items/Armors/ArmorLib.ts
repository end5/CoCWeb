import { Armor } from './Armor';
import { ArmorName } from './ArmorName';
import { Dictionary } from '../../../Engine/Utilities/Dictionary';

// key: string, shortName: string, displayname: string, longName: string, defense: number, value: number = 0, description: string = undefined, armorClass: ArmorClass = "Light", supportsBulge: boolean = false
export const ArmorLib = new Dictionary<ArmorName, Armor>();
