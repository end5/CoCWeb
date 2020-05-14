import { PerkLib } from "../PerkLib";
import { Armor } from "./Armor";
import { ArmorWithPerk } from "./Armors/ArmorWithPerk";
import { ComfortableClothes } from "./Armors/ComfortableClothes";
import { ComfortableUnderclothes } from "./Armors/ComfortableUnderclothes";
import { GooArmor } from "./Armors/GooArmor";
import { InquisitorsCorset } from "./Armors/InquisitorsCorset";
import { InquisitorsRobes } from "./Armors/InquisitorsRobes";
import { LeatherArmorSegments } from "./Armors/LeatherArmorSegments";
import { LustyMaidensArmor } from "./Armors/LustyMaidensArmor";
import { SeductiveArmor } from "./Armors/SeductiveArmor";
import { SluttySwimwear } from "./Armors/SluttySwimwear";

/**
 * Created by aimozg on 10.01.14.
 */

export class ArmorLib {
    public static COMFORTABLE_UNDERCLOTHES: Armor = new ComfortableUnderclothes();

    public ADVCLTH: Armor = new Armor(
        "AdvClth",
        "G. Clothes",
        "green adventurer's clothes",
        "a green adventurer's outfit, complete with pointed cap",
        2,
        200,
        "A set of comfortable green adventurer's clothes.  It even comes complete with a pointy hat!",
        "Light",
        true
    );
    public B_DRESS: Armor = new Armor(
        "B.Dress",
        "Long Dress",
        "long ballroom dress patterned with sequins",
        "a ballroom dress patterned with sequins",
        0,
        1200,
        "A long ballroom dress patterned with sequins.  Perfect for important occassions.",
        "Medium"
    );
    public BEEARMR: Armor = new Armor(
        "BeeArmr",
        "BeeArmr",
        "sexy black chitin armor-plating",
        "a set of chitinous armor",
        18,
        200,
        "A suit of armor cleverly fashioned from giant bee chitin.",
        "",
        true
    );
    public BIMBOSK: ArmorWithPerk = new ArmorWithPerk(
        "BimboSk",
        "BimboSk",
        "bimbo skirt",
        "a skirt that looks like it belongs on a bimbo",
        1,
        50,
        "A tight, cleavage-inducing halter top and an extremely short miniskirt.  The sexual allure of this item is undoubtable.",
        "Light",
        PerkLib.SluttySeduction,
        10,
        0,
        0,
        0,
        "Your delightfully slutty yet upbeat garb helps you seduce your foes!"
    );
    public BONSTRP: ArmorWithPerk = new ArmorWithPerk(
        "BonStrp",
        "BonStrp",
        "barely-decent bondage straps",
        "a set of bondage straps",
        0,
        600,
        "These leather straps and well-placed hooks are actually designed in such a way as to be worn as clothing.  While they technically would cover your naughty bits, virtually every other inch of your body would be exposed.",
        "Light",
        PerkLib.SluttySeduction,
        10,
        0,
        0,
        0,
        "Your fetishy bondage outfit allows you access to an improved form of 'Tease'."
    );
    public C_CLOTH: ComfortableClothes = new ComfortableClothes();
    public CHBIKNI: ArmorWithPerk = new ArmorWithPerk(
        "ChBikni",
        "Chn Bikini",
        "revealing chainmail bikini",
        "a chainmail bikini",
        2,
        700,
        "A revealing chainmail bikini that barely covers anything.  The bottom half is little more than a triangle of metal and a leather thong.",
        "Light",
        PerkLib.SluttySeduction,
        5,
        0,
        0,
        0,
        "Your revealing chain bikini allows you access to 'Seduce', an improved form of 'Tease'.",
        true
    );
    public CLSSYCL: Armor = new Armor(
        "ClssyCl",
        "Suitclothes",
        "classy suitclothes",
        "a set of classy suit-clothes",
        1,
        400,
        "A set of classy suitclothes.",
        "Light"
    );
    public FULLCHN: Armor = new Armor(
        "FullChn",
        "Full Chain",
        "full-body chainmail",
        "a full suit of chainmail armor",
        8,
        150,
        "This full suit of chainmail armor covers its wearer from head to toe in protective steel rings.",
        "Medium",
        true
    );
    public FULLPLT: Armor = new Armor(
        "FullPlt",
        "Full Plate",
        "full platemail",
        "a suit of full-plate armor",
        21,
        250,
        "A highly protective suit of steel platemail.  It would be hard to find better physical protection than this.",
        "",
        true
    );
    //Not used in game:		public const FURLOIN:Armor = new FurLoincloth();
    public GELARMR: Armor = new Armor(
        "GelArmr",
        "GelArmr",
        "glistening gel-armor plates",
        "a suit of gel armor",
        10,
        150,
        "This suit of interlocking plates is made from a strange green material.  It feels spongy to the touch but is amazingly resiliant.  (DEF: +10) (Cost: 150)",
        "",
        true
    );
    public GOOARMR: GooArmor = new GooArmor();
    public I_CORST: InquisitorsCorset = new InquisitorsCorset();
    public I_ROBES: InquisitorsRobes = new InquisitorsRobes();
    public INDECST: ArmorWithPerk = new ArmorWithPerk(
        "IndecSt",
        "Indec StAr",
        "practically indecent steel armor",
        "a suit of practically indecent steel armor",
        5,
        800,
        "This suit of steel 'armor' has two round disks that barely cover the nipples, a tight chainmail bikini, and circular butt-plates.",
        "Medium",
        PerkLib.SluttySeduction,
        6,
        0,
        0,
        0,
        "Your incredibly revealing steel armor allows you access to 'Seduce', an improved form of 'Tease'.",
        true
    );
    public LEATHRA: Armor = new Armor(
        "LeathrA",
        "LeathrA",
        "leather armor segments",
        "a set of leather armor",
        5,
        76,
        "This is a suit of well-made leather armor.  It looks fairly rugged. (+5 Defense)",
        "Light"
    );
    public URTALTA: LeatherArmorSegments = new LeatherArmorSegments();
    public LMARMOR: LustyMaidensArmor = new LustyMaidensArmor();
    public LTHRPNT: Armor = new Armor(
        "LthrPnt",
        "T.Lthr Pants",
        "white silk shirt and tight leather pants",
        "a pair of leather pants and a white silk shirt",
        0,
        450,
        "A flowing silk shirt and tight black leather pants.  Suave!",
        "Light"
    );
    public LTHRROB: Armor = new Armor(
        "LthrRob",
        "Lthr Robes",
        "black leather armor surrounded by voluminous robes",
        "a suit of black leather armor with voluminous robes",
        6,
        100,
        "This is a suit of flexible leather armor with a voluminous set of concealing black robes.",
        "Light",
        true
    );
    public M_ROBES: Armor = new Armor(
        "M.Robes",
        "Robes",
        "modest robes",
        "a set of modest robes",
        0,
        120,
        "A set of modest robes, not dissimilar from what the monks back home would wear.",
        "Light"
    );
    public NURSECL: ArmorWithPerk = new ArmorWithPerk(
        "NurseCl",
        "NurseCl",
        "skimpy nurse's outfit",
        "a nurse's outfit",
        0,
        800,
        "This borderline obscene nurse's outfit would barely cover your hips and crotch.  The midriff is totally exposed, and the white top leaves plenty of room for cleavage.  A tiny white hat tops off the whole ensemble.",
        "Light",
        PerkLib.SluttySeduction,
        8,
        0,
        0,
        0,
        "Your fetishy nurse outfit allows you access to an improved form of 'Tease'."
    );
    public OVERALL: Armor = new Armor(
        "Overall",
        "Overalls",
        "white shirt and overalls",
        "a white shirt and overalls",
        0,
        60,
        "A simple white shirt and overalls.",
        "Light",
        true
    );
    public R_BDYST: Armor = new Armor(
        "R.BdySt",
        "R.BdySt",
        "red, high-society bodysuit",
        "a red bodysuit for high society",
        1,
        1200,
        "A high society bodysuit. It is as easy to mistake it for ballroom apparel as it is for boudoir lingerie. The thin transparent fabric is so light and airy that it makes avoiding blows a second nature.",
        "Light",
        true
    );
    public RBBRCLT: ArmorWithPerk = new ArmorWithPerk(
        "RbbrClt",
        "Rbbr Fetish",
        "rubber fetish clothes",
        "a set of revealing rubber fetish clothes",
        3,
        1000,
        'A revealing set of fetish-wear.  Upgrades your tease attack with the "Slutty Seduction" perk.',
        "Light",
        PerkLib.SluttySeduction,
        8,
        0,
        0,
        0,
        "Your fetishy rubberwear allows you access to 'Seduce', an improved form of 'Tease'.",
        true
    );
    public S_SWMWR: SluttySwimwear = new SluttySwimwear();
    public SCALEML: Armor = new Armor(
        "ScaleMl",
        "Scale Mail",
        "scale-mail armor",
        "a set of scale-mail armor",
        12,
        170,
        "This suit of scale-mail covers the entire body with layered steel scales, providing flexibility and protection.",
        "",
        true
    );
    public SEDUCTA: SeductiveArmor = new SeductiveArmor();
    public SS_ROBE: ArmorWithPerk = new ArmorWithPerk(
        "SS.Robe",
        "SS.Robe",
        "spider-silk robes",
        "a spider-silk robes",
        6,
        950,
        "This robe looks incredibly comfortable.  It's made from alchemically enhanced spider-silk, and embroidered with what looks like magical glyphs around the sleeves and hood.",
        "Light",
        PerkLib.WizardsEndurance,
        30,
        0,
        0,
        0
    );
    public SSARMOR: Armor = new Armor(
        "SSArmor",
        "SSArmor",
        "spider-silk armor",
        "a suit of spider-silk armor",
        25,
        950,
        "This armor is as white as the driven snow.  It's crafted out of thousands of strands of spider-silk into an impenetrable protective suit.  The surface is slightly spongy, but so tough you wager most blows would bounce right off.",
        "",
        true
    );
    public T_BSUIT: ArmorWithPerk = new ArmorWithPerk(
        "T.BSuit",
        "Bodysuit",
        "semi-transparent bodysuit",
        "a semi-transparent, curve-hugging bodysuit",
        0,
        1300,
        "A semi-transparent bodysuit.",
        "Light",
        PerkLib.SluttySeduction,
        7,
        0,
        0,
        0,
        "Your clingy transparent bodysuit allows you access to 'Seduce', an improved form of 'Tease'."
    );
    public TUBETOP: Armor = new Armor(
        "TubeTop",
        "Tube Top",
        "tube top and short shorts",
        "a snug tube top and VERY short shorts",
        0,
        80,
        "A clingy tube top and VERY short shorts.",
        "Light"
    );
    public W_ROBES: ArmorWithPerk = new ArmorWithPerk(
        "W.Robes",
        "W.Robes",
        "wizard's robes",
        "a wizard's robes",
        1,
        50,
        "These robes appear to have once belonged to a female wizard.  They're long with a slit up the side and full billowing sleeves.  The top is surprisingly low cut.  Somehow you know wearing it would aid your spellcasting.",
        "Light",
        PerkLib.WizardsEndurance,
        25,
        0,
        0,
        0
    );

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
