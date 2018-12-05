import { Weapon } from './Weapon';
import { WeaponName } from './WeaponName';
import { WeaponPerkType } from './WeaponPerk';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { ItemDesc } from '../ItemDesc';

export class Spellblade extends Weapon {
    public constructor() {
        super(WeaponName.Spellblade, new ItemDesc("S.Blade", "a spellblade", "Forged not by a swordsmith but a sorceress, this arcane-infused blade amplifies your magic.  Unlike the wizard staves it is based on, this weapon also has a sharp edge, a technological innovation which has proven historically useful in battle."), "inscribed spellblade", "slash", 8, 500, [WeaponPerkType.WizardsFocus]);
    }

    public onEquip(character: Character): void {
        while (character.effects.has(EffectType.WizardsFocus))
            character.effects.removeByName(EffectType.WizardsFocus);
        character.effects.create(EffectType.WizardsFocus, { spellCost: { multi: 0.5 } });
    }

    public onUnequip(character: Character): void {
        while (character.effects.has(EffectType.WizardsFocus))
            character.effects.removeByName(EffectType.WizardsFocus);
    }
}
