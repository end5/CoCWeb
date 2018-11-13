import { Weapon } from './Weapon';
import { WeaponName } from './WeaponName';
import { WeaponPerkType } from './WeaponPerk';
import { Character } from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import { ItemDesc } from '../ItemDesc';

export class WizardsStaff extends Weapon {
    public constructor() {
        super(WeaponName.WizardsStaff, new ItemDesc("W. Staff", "a wizard's staff", "This staff is made of very old wood and seems to tingle to the touch.  The top has an odd zig-zag shape to it, and the wood is worn smooth from lots of use.  It probably belonged to a wizard at some point and would aid magic use."), "wizard's staff", "smack", 3, 350, [WeaponPerkType.WizardsFocus]);
    }

    public onEquip(character: Character): void {
        while (character.perks.has(PerkType.WizardsFocus))
            character.perks.remove(PerkType.WizardsFocus);
        character.perks.add(PerkType.WizardsFocus, { spellCost: { multi: 0.4 } });
    }

    public onUnequip(character: Character): void {
        while (character.perks.has(PerkType.WizardsFocus))
            character.perks.remove(PerkType.WizardsFocus);
    }
}
