import { CockSock } from './CockSock';
import { CockSockName } from './CockSockName';
import { Piercing, PiercingType } from './Piercing';
import { Dictionary } from '../../../Engine/Utilities/Dictionary';
import { EquipableItem } from '../EquipableItem';

export type MiscName = CockSockName | PiercingType;

export const MiscLib = new Dictionary<MiscName, EquipableItem>();

MiscLib.set(CockSockName.Alabaster, new CockSock(CockSockName.Alabaster));
MiscLib.set(CockSockName.Cobalt, new CockSock(CockSockName.Cobalt));
MiscLib.set(CockSockName.Cockring, new CockSock(CockSockName.Cockring));
MiscLib.set(CockSockName.Gilded, new CockSock(CockSockName.Gilded));
MiscLib.set(CockSockName.Purple, new CockSock(CockSockName.Purple));
MiscLib.set(CockSockName.Scarlet, new CockSock(CockSockName.Scarlet));
MiscLib.set(CockSockName.Viridian, new CockSock(CockSockName.Viridian));
MiscLib.set(CockSockName.Wool, new CockSock(CockSockName.Wool));
MiscLib.set(PiercingType.Chain, new Piercing(PiercingType.Chain));
MiscLib.set(PiercingType.Hoop, new Piercing(PiercingType.Hoop));
MiscLib.set(PiercingType.Ladder, new Piercing(PiercingType.Ladder));
MiscLib.set(PiercingType.Ring, new Piercing(PiercingType.Ring));
MiscLib.set(PiercingType.Stud, new Piercing(PiercingType.Stud));
