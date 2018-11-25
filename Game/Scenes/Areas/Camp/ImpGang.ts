import { Character } from "../../../Character/Character";
import { CharacterType } from "../../../Character/CharacterType";
import { Cock, CockType } from "../../../Body/Cock";
import { CharacterInventory } from "../../../Inventory/CharacterInventory";
import { CharacterDescription } from "../../../Character/CharacterDescription";
import { CombatContainer } from "../../../Combat/CombatContainer";
import { Weapon } from "../../../Items/Weapons/Weapon";
import { ItemDesc } from "../../../Items/ItemDesc";
import { Armor } from "../../../Items/Armors/Armor";
import { ArmorName } from "../../../Items/Armors/ArmorName";
import { WeaponName } from "../../../Items/Weapons/WeaponName";
import { EndScenes } from "../../../Combat/EndScenes";

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
