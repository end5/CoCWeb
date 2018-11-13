import { PlayerAction } from './CombatActions/PlayerActionPerform';
import { PlayerEndScenes } from './PlayerEndScenes';
import { ButtLooseness, ButtWetness } from '../../Body/Butt';
import { FaceType } from '../../Body/Face';
import { SkinType } from '../../Body/Skin';
import { TongueType } from '../../Body/Tongue';
import { CombatContainer } from '../../Combat/CombatContainer';
import { Armor } from '../../Items/Armors/Armor';
import { ArmorName } from '../../Items/Armors/ArmorName';
import { Weapon } from '../../Items/Weapons/Weapon';
import { WeaponName } from '../../Items/Weapons/WeaponName';
import { Character } from '../Character';
import { CharacterType } from '../CharacterType';
import { WeaponLib } from '../../Items/Weapons/WeaponLib';
import { ArmorLib } from '../../Items/Armors/ArmorLib';
import { CharacterInventory } from '../../Inventory/CharacterInventory';
import { CharacterDescription } from '../CharacterDescription';
import { randInt } from '../../../Engine/Utilities/SMath';
import { PlayerResponses } from './PlayerResponses';

export class Player extends Character {
    protected description: CharacterDescription = new CharacterDescription(this, "", "", "");
    public inventory: CharacterInventory;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.Player);
        this.desc.isPlayer = true;
        this.baseStats.str.value = 15;
        this.baseStats.tou.value = 15;
        this.baseStats.spe.value = 15;
        this.baseStats.int.value = 15;
        this.baseStats.sens.value = 15;
        this.baseStats.lib.value = 15;
        this.baseStats.cor.value = 0;
        this.baseStats.lust.value = 15;

        this.stats.level = 1;
        this.stats.HP = this.stats.maxHP();
        this.body.skin.type = SkinType.PLAIN;
        this.body.skin.desc = "skin";
        this.body.face.type = FaceType.HUMAN;
        this.body.tongue.type = TongueType.HUMAN;
        this.body.cumMultiplier = 1;
        this.hoursSinceCum = 0;
        this.body.butt.looseness = ButtLooseness.VIRGIN;
        this.body.butt.wetness = ButtWetness.DRY;
        this.body.butt.fullness = 0;
        this.baseStats.fatigue.value = 0;

        // Inventory
        this.inventory = new CharacterInventory(this, WeaponLib.get(WeaponName.Fists) as Weapon, ArmorLib.get(ArmorName.ComfortUndercloth) as Armor);
        this.inventory.items.unlock(6);

        // Combat
        this.combatContainer = new CombatContainer(this, new PlayerAction(), PlayerResponses, new PlayerEndScenes(this), {
            gems: () => randInt(10)
        });
        this.combatContainer.useAI = false;
    }
}
