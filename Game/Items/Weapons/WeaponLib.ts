import { Weapon } from './Weapon';
import { WeaponName } from './WeaponName';
import { Dictionary } from 'Engine/Utilities/Dictionary';
import { WeaponPerkType } from './WeaponPerk';
import { ItemDesc } from '../ItemDesc';
import { LargeClaymore } from './LargeClaymore';
import { DragonShellShield } from './DragonShellShield';
import { EldritchStaff } from './EldritchStaff';
import { JeweledRapier } from './JeweledRapier';
import { Katana } from './Katana';
import { LargeHammer } from './LargeHammer';
import { RaphaelsRapier } from './RaphaelsRapier';
import { Spellblade } from './Spellblade';
import { WizardsStaff } from './WizardsStaff';
import { HugeWarhammer } from './HugeWarhammer';
import { BeautifulSword } from './BeautifulSword';

// key: string, shortName: string, displayname: string, longName: string, verb: string, attack: number, value: number = 0, description: string = undefined, perk: string = ""
export const WeaponLib = new Dictionary<WeaponName, Weapon>();

WeaponLib.set(WeaponName.Fists, new Weapon(WeaponName.Fists, new ItemDesc("Fists", "fists"), "fists", "punch", 0));

WeaponLib.set(WeaponName.BeautifulSword, new BeautifulSword());
WeaponLib.set(WeaponName.LargeClaymore, new LargeClaymore());
WeaponLib.set(WeaponName.DragonShellShield, new DragonShellShield());
WeaponLib.set(WeaponName.EldritchStaff, new EldritchStaff());
WeaponLib.set(WeaponName.UrtaHalberd, new Weapon(WeaponName.UrtaHalberd, new ItemDesc("UrtaHlb", "a halberd"), "halberd", "slash", 11, 10, [WeaponPerkType.Large]));
WeaponLib.set(WeaponName.HookedGauntlet, new Weapon(WeaponName.HookedGauntlet, new ItemDesc("H.Gaunt", "a set of hooked gauntlets", "These metal gauntlets are covered in nasty looking hooks that are sure to tear at your foes flesh and cause them harm."), "hooked gauntlets", "clawing punch", 8, 300, [WeaponPerkType.Stunning, WeaponPerkType.Bleeding]));
WeaponLib.set(WeaponName.JeweledRapier, new JeweledRapier());
WeaponLib.set(WeaponName.Katana, new Katana());
WeaponLib.set(WeaponName.LargeAxe, new Weapon(WeaponName.LargeAxe, new ItemDesc("L. Axe ", "an axe large enough for a minotaur", "This massive axe once belonged to a minotaur.  It'd be hard for anyone smaller than a giant to wield effectively.  The axe is double-bladed and deadly-looking."), "large axe", "cleave", 15, 100, [WeaponPerkType.Large]));
WeaponLib.set(WeaponName.AphroDagger, new Weapon(WeaponName.AphroDagger, new ItemDesc("L.Daggr", "an aphrodisiac-coated dagger", "A dagger with a short blade in a wavy pattern.  Its edge seems to have been enchanted to always be covered in a light aphrodisiac to arouse anything cut with it."), "lust-enchanted dagger", "stab", 3, 150, [WeaponPerkType.Aphrodisiac]));
WeaponLib.set(WeaponName.LargeHammer, new LargeHammer());
WeaponLib.set(WeaponName.Pipe, new Weapon(WeaponName.Pipe, new ItemDesc("Pipe", "a pipe", "This is a simple rusted pipe of unknown origins.  It's hefty and could probably be used as an effective bludgeoning tool."), "pipe", "smash", 5, 25));
WeaponLib.set(WeaponName.RidingCrop, new Weapon(WeaponName.RidingCrop, new ItemDesc("RidingC", "a riding crop", "This riding crop appears to be made of black leather, and could be quite a painful (or exciting) weapon."), "riding crop", "whip-crack", 5, 50));
WeaponLib.set(WeaponName.RaphaelsRapier, new RaphaelsRapier());
WeaponLib.set(WeaponName.Spellblade, new Spellblade());
WeaponLib.set(WeaponName.SpikedGauntlet, new Weapon(WeaponName.SpikedGauntlet, new ItemDesc("S.Gauntlet", "a spiked gauntlet", "This single metal gauntlet has the knuckles tipped with metal spikes.  Though it lacks the damaging potential of other weapons, the sheer pain of its wounds has a chance of stunning your opponent."), "spiked gauntlet", "spiked punch", 5, 400, [WeaponPerkType.Stunning]));
WeaponLib.set(WeaponName.Spear, new Weapon(WeaponName.Spear, new ItemDesc("Spear", "a deadly spear", "A staff with a sharp blade at the tip designed to pierce through the toughest armor.  This would ignore most armors."), "deadly spear", "piercing stab", 8, 450, [WeaponPerkType.Penetrate]));
WeaponLib.set(WeaponName.SuccubiWhip, new Weapon(WeaponName.SuccubiWhip, new ItemDesc("SucWhip", "a succubi whip", "This coiled length of midnight-black leather practically exudes lust.  Though it looks like it could do a lot of damage, the feel of that slick leather impacting flesh is sure to inspire lust."), "succubi whip", "sexy whipping", 10, 400, [WeaponPerkType.SuccubiWhip]));
WeaponLib.set(WeaponName.WizardsStaff, new WizardsStaff());
WeaponLib.set(WeaponName.HugeWarhammer, new HugeWarhammer());
WeaponLib.set(WeaponName.Whip, new Weapon(WeaponName.Whip, new ItemDesc("Whip", "a coiled whip", "A coiled length of leather designed to lash your foes into submission.  There's a chance the bondage inclined might enjoy it!"), "coiled whip", "whip-crack", 5, 500, [WeaponPerkType.CoiledWhip]));
