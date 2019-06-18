define(["require", "exports", "./Weapons/Fists", "./Weapon", "./Weapons/BeautifulSword", "./Weapons/LargeClaymore", "./Weapons/DragonShellShield", "./Weapons/EldritchStaff", "./Weapons/JeweledRapier", "./Weapons/LargeHammer", "./Weapons/RaphaelsRapier", "./Weapons/Spellblade", "./Weapons/WizardsStaff", "./Weapons/HugeWarhammer"], function (require, exports, Fists_1, Weapon_1, BeautifulSword_1, LargeClaymore_1, DragonShellShield_1, EldritchStaff_1, JeweledRapier_1, LargeHammer_1, RaphaelsRapier_1, Spellblade_1, WizardsStaff_1, HugeWarhammer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 09.01.14.
     */
    class WeaponLib {
        constructor() {
            this.B_SWORD = new BeautifulSword_1.BeautifulSword();
            this.CLAYMOR = new LargeClaymore_1.LargeClaymore();
            this.DRGNSHL = new DragonShellShield_1.DragonShellShield();
            this.E_STAFF = new EldritchStaff_1.EldritchStaff();
            this.URTAHLB = new Weapon_1.Weapon("UrtaHlb", "UrtaHlb", "halberd", "a halberd", "slash", 11, 10, undefined, "Large");
            this.H_GAUNT = new Weapon_1.Weapon("H.Gaunt", "H.Gaunt", "hooked gauntlets", "a set of hooked gauntlets", "clawing punch", 8, 300, "These metal gauntlets are covered in nasty looking hooks that are sure to tear at your foes flesh and cause them harm.");
            this.JRAPIER = new JeweledRapier_1.JeweledRapier();
            this.KATANA = new Weapon_1.Weapon("Katana ", "Katana", "katana", "a katana", "keen cut", 10, 500, "A curved bladed weapon that cuts through flesh with the greatest of ease. (ATK: 10) (Cost: 500)");
            this.L__AXE = new Weapon_1.Weapon("L. Axe ", "L. Axe ", "large axe", "an axe large enough for a minotaur", "cleave", 15, 100, "This massive axe once belonged to a minotaur.  It'd be hard for anyone smaller than a giant to wield effectively.  The axe is double-bladed and deadly-looking.  (ATK: +15) (Cost: 100)", "Large");
            this.L_DAGGR = new Weapon_1.Weapon("L.Daggr", "L.Daggr", "lust-enchanted dagger", "an aphrodisiac-coated dagger", "stab", 3, 150, "A dagger with a short blade in a wavy pattern.  Its edge seems to have been enchanted to always be covered in a light aphrodisiac to arouse anything cut with it.", "Aphrodisiac Weapon");
            this.L_HAMMR = new LargeHammer_1.LargeHammer();
            this.PIPE = new Weapon_1.Weapon("Pipe   ", "Pipe   ", "pipe", "a pipe", "smash", 5, 25, "This is a simple rusted pipe of unknown origins.  It's hefty and could probably be used as an effective bludgeoning tool. (ATK: +5) (Cost: 25)");
            this.RIDINGC = new Weapon_1.Weapon("RidingC", "RidingC", "riding crop", "a riding crop", "whip-crack", 5, 50, "This riding crop appears to be made of black leather, and could be quite a painful (or exciting) weapon.  (ATK: +5) (Cost: 50)");
            this.RRAPIER = new RaphaelsRapier_1.RaphaelsRapier();
            this.S_BLADE = new Spellblade_1.Spellblade();
            this.S_GAUNT = new Weapon_1.Weapon("S.Gaunt", "S.Gauntlet", "spiked gauntlet", "a spiked gauntlet", "spiked punch", 5, 400, "This single metal gauntlet has the knuckles tipped with metal spikes.  Though it lacks the damaging potential of other weapons, the sheer pain of its wounds has a chance of stunning your opponent. (ATK: 5) (Cost: 400)");
            this.SPEAR = new Weapon_1.Weapon("Spear  ", "Spear", "deadly spear", "a deadly spear", "piercing stab", 8, 450, "A staff with a sharp blade at the tip designed to pierce through the toughest armor.  This would ignore most armors.  (ATK: 8) (Cost: 450)");
            this.SUCWHIP = new Weapon_1.Weapon("SucWhip", "SucWhip", "succubi whip", "a succubi whip", "sexy whipping", 10, 400, "This coiled length of midnight-black leather practically exudes lust.  Though it looks like it could do a lot of damage, the feel of that slick leather impacting flesh is sure to inspire lust.");
            this.W_STAFF = new WizardsStaff_1.WizardsStaff();
            this.WARHAMR = new HugeWarhammer_1.HugeWarhammer();
            this.WHIP = new Weapon_1.Weapon("Whip   ", "Whip", "coiled whip", "a coiled whip", "whip-crack", 5, 500, "A coiled length of leather designed to lash your foes into submission.  There's a chance the bondage inclined might enjoy it! (ATK: 5) (Cost: 500)");
            /*
            private static  mk(id: string,shortName: string,name: string,longName: string,verb: string,attack: number,value: number,description: string,perk: string=""):Weapon {
                return new Weapon(id,shortName,name,longName,verb,attack,value,description,perk);
            }
            */
        }
    }
    WeaponLib.DEFAULT_VALUE = 6;
    WeaponLib.FISTS = new Fists_1.Fists();
    exports.WeaponLib = WeaponLib;
});
//# sourceMappingURL=WeaponLib.js.map