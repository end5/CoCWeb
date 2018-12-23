import { EndScenes } from 'Game/Combat/EndScenes';
import { ButtLooseness, ButtWetness } from 'Game/Character/Body/Butt';
import { FaceType } from 'Game/Character/Body/Face';
import { SkinType } from 'Game/Character/Body/Skin';
import { TongueType } from 'Game/Character/Body/Tongue';
import { CombatContainer } from 'Game/Combat/CombatContainer';
import { Armor } from 'Game/Items/Armors/Armor';
import { ArmorName } from 'Game/Items/Armors/ArmorName';
import { Weapon } from 'Game/Items/Weapons/Weapon';
import { WeaponName } from 'Game/Items/Weapons/WeaponName';
import { Character } from '../Character';
import { CharacterType } from '../CharacterType';
import { WeaponLib } from 'Game/Items/Weapons/WeaponLib';
import { ArmorLib } from 'Game/Items/Armors/ArmorLib';
import { CharacterInventory } from 'Game/Inventory/CharacterInventory';
import { CharacterDescription } from '../CharacterDescription';
import { randInt } from 'Engine/Utilities/SMath';
import { PlayerResponses } from './PlayerResponses';
import { PlayerAction } from 'Game/Character/Player/CombatActions/PlayerActionPerform';

class BlankEndScenes extends EndScenes {}

export class Player extends Character {
    protected description: CharacterDescription = new CharacterDescription(this, "", "", "");
    public inventory: CharacterInventory;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.Player);
        this.desc.isPlayer = true;
        this.stats.core.str.base.raw = 15;
        this.stats.core.tou.base.raw = 15;
        this.stats.core.spe.base.raw = 15;
        this.stats.core.int.base.raw = 15;
        this.stats.core.sens.base.raw = 15;
        this.stats.core.lib.base.raw = 15;
        this.stats.core.cor.base.raw = 0;
        this.stats.core.lust.base.raw = 15;
        this.stats.core.fatigue.base.raw = 0;
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

        // Inventory
        this.inventory = new CharacterInventory(this, WeaponLib.get(WeaponName.Fists) as Weapon, ArmorLib.get(ArmorName.ComfortUndercloth) as Armor);
        this.inventory.items.unlock(6);

        // Combat
        this.combatContainer = new CombatContainer(this, { mainAction: new PlayerAction(this), reactions: PlayerResponses, endScenes: new BlankEndScenes(this), rewards: {
            gems: () => randInt(10)
        }});
        this.combatContainer.useAI = false;
    }
}
