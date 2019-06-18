define(["require", "exports", "./Armor", "./Armors/ComfortableUnderclothes", "./Armors/ArmorWithPerk", "../PerkLib", "./Armors/ComfortableClothes", "./Armors/GooArmor", "./Armors/InquisitorsCorset", "./Armors/InquisitorsRobes", "./Armors/LeatherArmorSegments", "./Armors/LustyMaidensArmor", "./Armors/SluttySwimwear", "./Armors/SeductiveArmor"], function (require, exports, Armor_1, ComfortableUnderclothes_1, ArmorWithPerk_1, PerkLib_1, ComfortableClothes_1, GooArmor_1, InquisitorsCorset_1, InquisitorsRobes_1, LeatherArmorSegments_1, LustyMaidensArmor_1, SluttySwimwear_1, SeductiveArmor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class ArmorLib {
        constructor() {
            this.ADVCLTH = new Armor_1.Armor("AdvClth", "G. Clothes", "green adventurer's clothes", "a green adventurer's outfit, complete with pointed cap", 2, 200, "A set of comfortable green adventurer's clothes.  It even comes complete with a pointy hat!", "Light", true);
            this.B_DRESS = new Armor_1.Armor("B.Dress", "Long Dress", "long ballroom dress patterned with sequins", "a ballroom dress patterned with sequins", 0, 1200, "A long ballroom dress patterned with sequins.  Perfect for important occassions.", "Medium");
            this.BEEARMR = new Armor_1.Armor("BeeArmr", "BeeArmr", "sexy black chitin armor-plating", "a set of chitinous armor", 18, 200, "A suit of armor cleverly fashioned from giant bee chitin.", "", true);
            this.BIMBOSK = new ArmorWithPerk_1.ArmorWithPerk("BimboSk", "BimboSk", "bimbo skirt", "a skirt that looks like it belongs on a bimbo", 1, 50, "A tight, cleavage-inducing halter top and an extremely short miniskirt.  The sexual allure of this item is undoubtable.", "Light", PerkLib_1.PerkLib.SluttySeduction, 10, 0, 0, 0, "Your delightfully slutty yet upbeat garb helps you seduce your foes!");
            this.BONSTRP = new ArmorWithPerk_1.ArmorWithPerk("BonStrp", "BonStrp", "barely-decent bondage straps", "a set of bondage straps", 0, 600, "These leather straps and well-placed hooks are actually designed in such a way as to be worn as clothing.  While they technically would cover your naughty bits, virtually every other inch of your body would be exposed.", "Light", PerkLib_1.PerkLib.SluttySeduction, 10, 0, 0, 0, "Your fetishy bondage outfit allows you access to an improved form of 'Tease'.");
            this.C_CLOTH = new ComfortableClothes_1.ComfortableClothes();
            this.CHBIKNI = new ArmorWithPerk_1.ArmorWithPerk("ChBikni", "Chn Bikini", "revealing chainmail bikini", "a chainmail bikini", 2, 700, "A revealing chainmail bikini that barely covers anything.  The bottom half is little more than a triangle of metal and a leather thong.", "Light", PerkLib_1.PerkLib.SluttySeduction, 5, 0, 0, 0, "Your revealing chain bikini allows you access to 'Seduce', an improved form of 'Tease'.", true);
            this.CLSSYCL = new Armor_1.Armor("ClssyCl", "Suitclothes", "classy suitclothes", "a set of classy suit-clothes", 1, 400, "A set of classy suitclothes.", "Light");
            this.FULLCHN = new Armor_1.Armor("FullChn", "Full Chain", "full-body chainmail", "a full suit of chainmail armor", 8, 150, "This full suit of chainmail armor covers its wearer from head to toe in protective steel rings.", "Medium", true);
            this.FULLPLT = new Armor_1.Armor("FullPlt", "Full Plate", "full platemail", "a suit of full-plate armor", 21, 250, "A highly protective suit of steel platemail.  It would be hard to find better physical protection than this.", "", true);
            //Not used in game:		public const FURLOIN:Armor = new FurLoincloth();
            this.GELARMR = new Armor_1.Armor("GelArmr", "GelArmr", "glistening gel-armor plates", "a suit of gel armor", 10, 150, "This suit of interlocking plates is made from a strange green material.  It feels spongy to the touch but is amazingly resiliant.  (DEF: +10) (Cost: 150)", "", true);
            this.GOOARMR = new GooArmor_1.GooArmor();
            this.I_CORST = new InquisitorsCorset_1.InquisitorsCorset();
            this.I_ROBES = new InquisitorsRobes_1.InquisitorsRobes();
            this.INDECST = new ArmorWithPerk_1.ArmorWithPerk("IndecSt", "Indec StAr", "practically indecent steel armor", "a suit of practically indecent steel armor", 5, 800, "This suit of steel 'armor' has two round disks that barely cover the nipples, a tight chainmail bikini, and circular butt-plates.", "Medium", PerkLib_1.PerkLib.SluttySeduction, 6, 0, 0, 0, "Your incredibly revealing steel armor allows you access to 'Seduce', an improved form of 'Tease'.", true);
            this.LEATHRA = new Armor_1.Armor("LeathrA", "LeathrA", "leather armor segments", "a set of leather armor", 5, 76, "This is a suit of well-made leather armor.  It looks fairly rugged. (+5 Defense)", "Light");
            this.URTALTA = new LeatherArmorSegments_1.LeatherArmorSegments();
            this.LMARMOR = new LustyMaidensArmor_1.LustyMaidensArmor();
            this.LTHRPNT = new Armor_1.Armor("LthrPnt", "T.Lthr Pants", "white silk shirt and tight leather pants", "a pair of leather pants and a white silk shirt", 0, 450, "A flowing silk shirt and tight black leather pants.  Suave!", "Light");
            this.LTHRROB = new Armor_1.Armor("LthrRob", "Lthr Robes", "black leather armor surrounded by voluminous robes", "a suit of black leather armor with voluminous robes", 6, 100, "This is a suit of flexible leather armor with a voluminous set of concealing black robes.", "Light", true);
            this.M_ROBES = new Armor_1.Armor("M.Robes", "Robes", "modest robes", "a set of modest robes", 0, 120, "A set of modest robes, not dissimilar from what the monks back home would wear.", "Light");
            this.NURSECL = new ArmorWithPerk_1.ArmorWithPerk("NurseCl", "NurseCl", "skimpy nurse's outfit", "a nurse's outfit", 0, 800, "This borderline obscene nurse's outfit would barely cover your hips and crotch.  The midriff is totally exposed, and the white top leaves plenty of room for cleavage.  A tiny white hat tops off the whole ensemble.", "Light", PerkLib_1.PerkLib.SluttySeduction, 8, 0, 0, 0, "Your fetishy nurse outfit allows you access to an improved form of 'Tease'.");
            this.OVERALL = new Armor_1.Armor("Overall", "Overalls", "white shirt and overalls", "a white shirt and overalls", 0, 60, "A simple white shirt and overalls.", "Light", true);
            this.R_BDYST = new Armor_1.Armor("R.BdySt", "R.BdySt", "red, high-society bodysuit", "a red bodysuit for high society", 1, 1200, "A high society bodysuit. It is as easy to mistake it for ballroom apparel as it is for boudoir lingerie. The thin transparent fabric is so light and airy that it makes avoiding blows a second nature.", "Light", true);
            this.RBBRCLT = new ArmorWithPerk_1.ArmorWithPerk("RbbrClt", "Rbbr Fetish", "rubber fetish clothes", "a set of revealing rubber fetish clothes", 3, 1000, "A revealing set of fetish-wear.  Upgrades your tease attack with the \"Slutty Seduction\" perk.", "Light", PerkLib_1.PerkLib.SluttySeduction, 8, 0, 0, 0, "Your fetishy rubberwear allows you access to 'Seduce', an improved form of 'Tease'.", true);
            this.S_SWMWR = new SluttySwimwear_1.SluttySwimwear();
            this.SCALEML = new Armor_1.Armor("ScaleMl", "Scale Mail", "scale-mail armor", "a set of scale-mail armor", 12, 170, "This suit of scale-mail covers the entire body with layered steel scales, providing flexibility and protection.", "", true);
            this.SEDUCTA = new SeductiveArmor_1.SeductiveArmor();
            this.SS_ROBE = new ArmorWithPerk_1.ArmorWithPerk("SS.Robe", "SS.Robe", "spider-silk robes", "a spider-silk robes", 6, 950, "This robe looks incredibly comfortable.  It's made from alchemically enhanced spider-silk, and embroidered with what looks like magical glyphs around the sleeves and hood.", "Light", PerkLib_1.PerkLib.WizardsEndurance, 30, 0, 0, 0);
            this.SSARMOR = new Armor_1.Armor("SSArmor", "SSArmor", "spider-silk armor", "a suit of spider-silk armor", 25, 950, "This armor is as white as the driven snow.  It's crafted out of thousands of strands of spider-silk into an impenetrable protective suit.  The surface is slightly spongy, but so tough you wager most blows would bounce right off.", "", true);
            this.T_BSUIT = new ArmorWithPerk_1.ArmorWithPerk("T.BSuit", "Bodysuit", "semi-transparent bodysuit", "a semi-transparent, curve-hugging bodysuit", 0, 1300, "A semi-transparent bodysuit.", "Light", PerkLib_1.PerkLib.SluttySeduction, 7, 0, 0, 0, "Your clingy transparent bodysuit allows you access to 'Seduce', an improved form of 'Tease'.");
            this.TUBETOP = new Armor_1.Armor("TubeTop", "Tube Top", "tube top and short shorts", "a snug tube top and VERY short shorts", 0, 80, "A clingy tube top and VERY short shorts.", "Light");
            this.W_ROBES = new ArmorWithPerk_1.ArmorWithPerk("W.Robes", "W.Robes", "wizard's robes", "a wizard's robes", 1, 50, "These robes appear to have once belonged to a female wizard.  They're long with a slit up the side and full billowing sleeves.  The top is surprisingly low cut.  Somehow you know wearing it would aid your spellcasting.", "Light", PerkLib_1.PerkLib.WizardsEndurance, 25, 0, 0, 0);
            /*
            private static  mk(id: string,shortName: string,name: string,longName: string,def: number,value: number,description: string,perk: string=""):Armor {
                return new Armor(id,shortName,name,longName,def,value,description,perk);
            }
            private static  mk2(id: string,shortName: string,name: string,longName: string,def: number,value: number,description: string,perk: string,
                    playerPerk:PerkType,playerPerkV1: number,playerPerkV2: number,playerPerkV3: number,playerPerkV4: number,playerPerkDesc: string=undefined):ArmorWithPerk{
                return new ArmorWithPerk(id,shortName,name,longName,def,value,description,perk,
                        playerPerk,playerPerkV1,playerPerkV2,playerPerkV3,playerPerkV4);
            }
            */
        }
    }
    ArmorLib.COMFORTABLE_UNDERCLOTHES = new ComfortableUnderclothes_1.ComfortableUnderclothes();
    exports.ArmorLib = ArmorLib;
});
//# sourceMappingURL=ArmorLib.js.map