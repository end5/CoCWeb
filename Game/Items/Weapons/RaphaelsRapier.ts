import { Weapon } from './Weapon';
import { WeaponName } from './WeaponName';
import { ItemDesc } from '../ItemDesc';
import { RaphaelFlags } from '../../Scenes/NPCs/Raphael';

export class RaphaelsRapier extends Weapon {
    public constructor() {
        super(WeaponName.RaphaelsRapier, new ItemDesc("RRapier", "Raphael's vulpine rapier", "He's bound it with his red sash around the length like a ribbon, as though he has now gifted it to you.  Perhaps it is his way of congratulating you."), "vulpine rapier", "slash", 8, 1000);
    }

    public get attack(): number {
        return 8 + RaphaelFlags.RAPHAEL_RAPIER_TRANING * 2;
    }
}
