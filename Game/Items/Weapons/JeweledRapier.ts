import { Weapon } from './Weapon';
import { WeaponName } from './WeaponName';
import { WeaponPerkType } from './WeaponPerk';
import { ItemDesc } from '../ItemDesc';
import { PlayerFlags } from '../../Character/Player/PlayerFlags';

export class JeweledRapier extends Weapon {
    public constructor() {
        super(WeaponName.JeweledRapier, new ItemDesc("JRapier", "a jeweled rapier", "This jeweled rapier is ancient but untarnished.  The hilt is wonderfully made, and fits your hand like a tailored glove.  The blade is shiny and perfectly designed for stabbing."), "jeweled rapier", "slash", 13, 1400, [WeaponPerkType.Penetrate]);
    }

    public get attack(): number {
        return (13 + PlayerFlags.RAPHAEL_RAPIER_TRANING * 2);
    }
}
