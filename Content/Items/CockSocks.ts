import { CockSockName } from 'Content/Items/CockSockName';
import { CockSock } from 'Engine/Items/CockSock';
import { ItemDict } from 'Engine/Items/ItemDict';
import { CockRing } from 'Content/Items/CockSocks/CockRing';
import { Viridian as ViridianCockSock } from 'Content/Items/CockSocks/ViridianCockSock';

ItemDict.add(new CockSock(CockSockName.Alabaster));
ItemDict.add(new CockSock(CockSockName.Cobalt));
ItemDict.add(new CockRing());
ItemDict.add(new CockSock(CockSockName.Gilded));
ItemDict.add(new CockSock(CockSockName.Purple));
ItemDict.add(new CockSock(CockSockName.Scarlet));
ItemDict.add(new ViridianCockSock());
ItemDict.add(new CockSock(CockSockName.Wool));
