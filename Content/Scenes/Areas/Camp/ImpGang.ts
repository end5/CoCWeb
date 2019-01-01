import { Character } from 'Engine/Character/Character';
import { CharacterType } from 'Content/Character/CharacterType';
import { Cock, CockType } from 'Engine/Body/Cock';
import { CharacterInventory } from 'Engine/Inventory/CharacterInventory';
import { CharacterDescription } from 'Engine/Character/CharacterDescription';
import { CombatContainer } from 'Engine/Combat/CombatContainer';
import { Weapon } from 'Engine/Items/Weapon';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { Armor } from 'Engine/Items/Armor';
import { ArmorName } from 'Content/Items/ArmorName';
import { WeaponName } from 'Content/Items/WeaponName';
import { EndScenes } from 'Engine/Combat/EndScenes';
import { MainAction } from 'Content/Combat/Actions/MainAction';

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
            mainAction: new MainAction(),
            endScenes: new ImpGangEndScenes(this),
            rewards: {}
        });
    }
}
