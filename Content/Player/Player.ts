import { EndScenes } from 'Engine/Combat/EndScenes';
import { ButtLooseness, ButtWetness } from 'Engine/Body/Butt';
import { FaceType } from 'Engine/Body/Face';
import { SkinType } from 'Engine/Body/Skin';
import { TongueType } from 'Engine/Body/Tongue';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from 'Content/Items/WeaponName';
import { Character } from 'Engine/Character/Character';
import { CharacterType } from 'Content/Character/CharacterType';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { randInt } from 'Engine/Utilities/SMath';
import { PlayerResponses } from './PlayerResponses';
import { PlayerAction } from './CombatActions/PlayerActionPerform';
import { ItemDict } from 'Engine/Items/ItemDict';
import { Settings } from 'Content/Settings';

class BlankEndScenes extends EndScenes { }

export class Player extends Character {
    protected description: CharacterDescription = new CharacterDescription(this, "", "", "");
    public inventory: CharacterInventory;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.Player);
        this.desc.isPlayer = true;
        this.stats.base.str.raw = 15;
        this.stats.base.tou.raw = 15;
        this.stats.base.spe.raw = 15;
        this.stats.base.int.raw = 15;
        this.stats.base.sens.raw = 15;
        this.stats.base.lib.raw = 15;
        this.stats.base.cor.raw = 0;
        this.stats.base.lust.raw = 15;
        this.stats.base.fatigue.raw = 0;
        this.stats.level = 1;

        this.body.skin.type = SkinType.PLAIN;
        this.body.skin.desc = "skin";
        this.body.face.type = FaceType.HUMAN;
        this.body.tongue.type = TongueType.HUMAN;
        this.body.cumMultiplier = 1;
        this.hoursSinceCum = 0;
        this.body.butt.looseness = ButtLooseness.VIRGIN;
        this.body.butt.wetness = ButtWetness.DRY;

        // Inventory
        this.inventory = new CharacterInventory(this, ItemDict.getByName(WeaponName.Fists) as Weapon, ItemDict.getByName(ArmorName.ComfortUndercloth) as Armor);
        this.inventory.items.unlock(6);

        // Combat
        this.combatContainer = new CombatContainer(this, {
            mainAction: new PlayerAction(this),
            reactions: PlayerResponses,
            endScenes: new BlankEndScenes(this),
            rewards: {
                gems: () => randInt(10)
            }
        });
        this.combatContainer.useAI = false;

        this.effects.create("Easy Mode", { lust: { delta: { multi: () => Settings.easyMode && this.stats.base.lust.delta > 0 ? 0.5 : 1 } } });
        this.effects.create("Lust Resistance", { lust: { delta: { multi: (val) => val > 0 ? this.stats.lustPercent() / 100 : 1 } } });
        this.effects.create("Sensitivity", {
            sens: {
                delta: {
                    multi: (val) => {
                        if (this.stats.sens > 50 && val > 0) return 0.5;
                        if (this.stats.sens > 75 && val > 0) return 0.5;
                        if (this.stats.sens > 90 && val > 0) return 0.5;
                        if (this.stats.sens > 50 && val < 0) return 2;
                        if (this.stats.sens > 75 && val < 0) return 2;
                        if (this.stats.sens > 90 && val < 0) return 2;
                        return 1;
                    }
                }
            }
        });
        this.effects.create("Gender", {
            lib: {
                min: {
                    flat: () => {
                        if (this.stats.lib < 15 && this.gender > 0)
                            return 15;
                        if (this.stats.lib < 10 && this.gender === 0)
                            return 10;
                        return 0;
                    }
                }
            }
        });
        this.effects.create("Lust", { lib: { min: { flat: () => this.stats.lib < this.stats.base.lust.min * 2 / 3 ? this.stats.base.lust.min * 2 / 3 : 0 } } });
        this.effects.create("Level", {
            lustResist: {
                total: {
                    flat: (val) => {
                        if (this.stats.level < 21) return val - (this.stats.level - 1) * 3;
                        else return 40;
                    }
                }
            }
        });
    }
}
