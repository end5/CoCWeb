import { Weapon } from './Weapon';
import { WeaponName } from './WeaponName';
import { WeaponPerkType } from './WeaponPerk';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { ItemDesc } from '../ItemDesc';

export class EldritchStaff extends Weapon {
    public constructor() {
        super(WeaponName.EldritchStaff, new ItemDesc("E.Staff", "an eldritch staff", "This eldritch staff once belonged to the Harpy Queen, who was killed after her defeat at your hands.  It fairly sizzles with magical power."), "eldritch staff", "thwack", 10, EldritchStaff.DefaultValue, [WeaponPerkType.WizardsFocus]);
    }

    public onEquip(character: Character): void {
        while (character.effects.has(EffectType.WizardsFocus))
            character.effects.removeByName(EffectType.WizardsFocus);
        character.effects.create(EffectType.WizardsFocus, { spellCost: { multi: 0.6 } });
    }

    public onUnequip(character: Character): void {
        while (character.effects.has(EffectType.WizardsFocus))
            character.effects.removeByName(EffectType.WizardsFocus);
    }
}
