import { Character } from 'Game/Character/Character';
import { CharacterType } from 'Game/Character/CharacterType';
import { Cock, CockType } from 'Game/Character/Body/Cock';
import { CharacterInventory } from 'Game/Inventory/CharacterInventory';
import { CharacterDescription } from 'Game/Character/CharacterDescription';
import { CombatContainer } from 'Game/Combat/CombatContainer';
import { Weapon } from 'Game/Items/Weapons/Weapon';
import { ItemDesc } from 'Game/Items/ItemDesc';
import { Armor } from 'Game/Items/Armors/Armor';
import { ArmorName } from 'Game/Items/Armors/ArmorName';
import { WeaponName } from 'Game/Items/Weapons/WeaponName';
import { EndScenes } from 'Game/Combat/EndScenes';

class ImpGangDesc extends CharacterDescription {
    public get capitalA(): string {
        return "gang of imps";
    }
}

class ImpGangEndScenes extends EndScenes {}

export class ImpGang extends Character {
    public inventory: CharacterInventory;
    protected description: CharacterDescription;
    protected combatContainer: CombatContainer;
    public constructor() {
        super(CharacterType.ImpGang);
        this.description = new ImpGangDesc(this, "a mob of imps", "imp gang", "");
        this.body.cocks.add(new Cock(12, 1.5));
        this.body.cocks.add(new Cock(25, 2.5));
        this.body.cocks.add(new Cock(25, 2.5, CockType.DOG, 2));
        this.body.balls.count = 2;
        this.body.balls.size = 3;
        this.body.skin.tone = "imp mob";

        this.inventory = new CharacterInventory(this,
            new Weapon("" as WeaponName, new ItemDesc(""), "", "", 0),
            new Armor("" as ArmorName, new ItemDesc(""), "", 0)
        );

        this.combatContainer = new CombatContainer(this, {
            endScenes: new ImpGangEndScenes(this),
            rewards: {}
        });
    }
}
