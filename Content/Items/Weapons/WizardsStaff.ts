import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from '../WeaponName';
import { WeaponPerkType } from 'Content/Items/WeaponPerks';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { ItemDesc } from 'Engine/Items/ItemDesc';

export class WizardsStaff extends Weapon {
    public constructor() {
        super(WeaponName.WizardsStaff, new ItemDesc("W. Staff", "a wizard's staff", "This staff is made of very old wood and seems to tingle to the touch.  The top has an odd zig-zag shape to it, and the wood is worn smooth from lots of use.  It probably belonged to a wizard at some point and would aid magic use."), "wizard's staff", "smack", 3, 350, [WeaponPerkType.WizardsFocus]);
    }

    public onEquip(character: Character): void {
        while (character.effects.has(EffectType.WizardsFocus))
            character.effects.removeByName(EffectType.WizardsFocus);
        character.effects.create(EffectType.WizardsFocus, { spellCost: { multi: 0.4 } });
    }

    public onUnequip(character: Character): void {
        while (character.effects.has(EffectType.WizardsFocus))
            character.effects.removeByName(EffectType.WizardsFocus);
    }
}
