import { Fists } from "./Weapons/Fists";
import { Weapon } from "./Weapon";
import { BeautifulSword } from "./Weapons/BeautifulSword";
import { LargeClaymore } from "./Weapons/LargeClaymore";
import { DragonShellShield } from "./Weapons/DragonShellShield";
import { EldritchStaff } from "./Weapons/EldritchStaff";
import { JeweledRapier } from "./Weapons/JeweledRapier";
import { LargeHammer } from "./Weapons/LargeHammer";
import { RaphaelsRapier } from "./Weapons/RaphaelsRapier";
import { Spellblade } from "./Weapons/Spellblade";
import { WizardsStaff } from "./Weapons/WizardsStaff";
import { HugeWarhammer } from "./Weapons/HugeWarhammer";

/**
 * Created by aimozg on 09.01.14.
 */

export class WeaponLib {
    public static DEFAULT_VALUE: number = 6;

    public static FISTS: Fists = new Fists();

    public B_SWORD: Weapon = new BeautifulSword();
    public CLAYMOR: Weapon = new LargeClaymore();
    public DRGNSHL: DragonShellShield = new DragonShellShield();
    public E_STAFF: EldritchStaff = new EldritchStaff();
    public URTAHLB: Weapon = new Weapon("UrtaHlb", "UrtaHlb", "halberd", "a halberd", "slash", 11, 10, undefined, "Large");
    public H_GAUNT: Weapon = new Weapon("H.Gaunt", "H.Gaunt", "hooked gauntlets", "a set of hooked gauntlets", "clawing punch", 8, 300, "These metal gauntlets are covered in nasty looking hooks that are sure to tear at your foes flesh and cause them harm.");
    public JRAPIER: JeweledRapier = new JeweledRapier();
    public KATANA: Weapon = new Weapon("Katana ", "Katana", "katana", "a katana", "keen cut", 10, 500, "A curved bladed weapon that cuts through flesh with the greatest of ease. (ATK: 10) (Cost: 500)");
    public L__AXE: Weapon = new Weapon("L. Axe ", "L. Axe ", "large axe", "an axe large enough for a minotaur", "cleave", 15, 100, "This massive axe once belonged to a minotaur.  It'd be hard for anyone smaller than a giant to wield effectively.  The axe is double-bladed and deadly-looking.  (ATK: +15) (Cost: 100)", "Large");
    public L_DAGGR: Weapon = new Weapon("L.Daggr", "L.Daggr", "lust-enchanted dagger", "an aphrodisiac-coated dagger", "stab", 3, 150, "A dagger with a short blade in a wavy pattern.  Its edge seems to have been enchanted to always be covered in a light aphrodisiac to arouse anything cut with it.", "Aphrodisiac Weapon");
    public L_HAMMR: LargeHammer = new LargeHammer();
    public PIPE: Weapon = new Weapon("Pipe   ", "Pipe   ", "pipe", "a pipe", "smash", 5, 25, "This is a simple rusted pipe of unknown origins.  It's hefty and could probably be used as an effective bludgeoning tool. (ATK: +5) (Cost: 25)");
    public RIDINGC: Weapon = new Weapon("RidingC", "RidingC", "riding crop", "a riding crop", "whip-crack", 5, 50, "This riding crop appears to be made of black leather, and could be quite a painful (or exciting) weapon.  (ATK: +5) (Cost: 50)");
    public RRAPIER: RaphaelsRapier = new RaphaelsRapier();
    public S_BLADE: Spellblade = new Spellblade();
    public S_GAUNT: Weapon = new Weapon("S.Gaunt", "S.Gauntlet", "spiked gauntlet", "a spiked gauntlet", "spiked punch", 5, 400, "This single metal gauntlet has the knuckles tipped with metal spikes.  Though it lacks the damaging potential of other weapons, the sheer pain of its wounds has a chance of stunning your opponent. (ATK: 5) (Cost: 400)");
    public SPEAR: Weapon = new Weapon("Spear  ", "Spear", "deadly spear", "a deadly spear", "piercing stab", 8, 450, "A staff with a sharp blade at the tip designed to pierce through the toughest armor.  This would ignore most armors.  (ATK: 8) (Cost: 450)");
    public SUCWHIP: Weapon = new Weapon("SucWhip", "SucWhip", "succubi whip", "a succubi whip", "sexy whipping", 10, 400, "This coiled length of midnight-black leather practically exudes lust.  Though it looks like it could do a lot of damage, the feel of that slick leather impacting flesh is sure to inspire lust.");
    public W_STAFF: WizardsStaff = new WizardsStaff();
    public WARHAMR: HugeWarhammer = new HugeWarhammer();
    public WHIP: Weapon = new Weapon("Whip   ", "Whip", "coiled whip", "a coiled whip", "whip-crack", 5, 500, "A coiled length of leather designed to lash your foes into submission.  There's a chance the bondage inclined might enjoy it! (ATK: 5) (Cost: 500)");

    /*
    private static  mk(id: string,shortName: string,name: string,longName: string,verb: string,attack: number,value: number,description: string,perk: string=""):Weapon {
        return new Weapon(id,shortName,name,longName,verb,attack,value,description,perk);
    }
    */
}

