import { CockSockName } from './CockSockName';
import { PiercingType } from './Piercing';
import { Dictionary } from '../../../Engine/Utilities/Dictionary';
import { EquipableItem } from '../EquipableItem';

export type MiscName = CockSockName | PiercingType;

export const MiscLib = new Dictionary<MiscName, EquipableItem>();
