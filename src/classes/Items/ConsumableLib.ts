import { BaseContent } from "../BaseContent";
import { SimpleConsumable } from "./Consumables/SimpleConsumable";
import { Player } from "../Player";
import { Consumable } from "./Consumable";
import { BeeHoney } from "./Consumables/BeeHoney";
import { BimboLiqueur } from "./Consumables/BimboLiqueur";
import { DeBimbo } from "./Consumables/DeBimbo";
import { HairExtensionSerum } from "./Consumables/HairExtensionSerum";
import { GroPlus } from "./Consumables/GroPlus";
import { KitsuneGift } from "./Consumables/KitsuneGift";
import { LustStick } from "./Consumables/LustStick";
import { OvipositionElixir } from "./Consumables/OvipositionElixir";
import { PhoukaWhiskey } from "./Consumables/PhoukaWhiskey";
import { Reducto } from "./Consumables/Reducto";
import { RizzaRoot } from "./Consumables/RizzaRoot";
import { WingStick } from "./Consumables/WingStick";
import { Mutations } from "./Mutations";

/**
 * Created by aimozg on 10.01.14.
 */

export class ConsumableLib extends BaseContent {
    public static DEFAULT_VALUE: number = 6;
    public AUBURND: SimpleConsumable = ConsumableLib.mk("AuburnD", "AuburnD", "a vial of auburn hair dye", ConsumableLib.curry(this.m.hairDye, "auburn"), "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
    public B__BOOK: SimpleConsumable = ConsumableLib.mk("B. Book", "B. Book", "a small book with a midnight-black cover", this.m.blackSpellbook, "This solid black book is totally unmarked, saved for a blood red clasp that holds the covers closed until you are ready to read it.  The pages are edged with gold, like some of the fancy books in the monastary back home.", 40);
    public B_GOSSR: SimpleConsumable = ConsumableLib.mk("B.Gossr", "B.Gossr", "a bundle of black, gossamer webbing", ConsumableLib.curry(this.m.sweetGossamer, 1), "These strands of gooey black gossamer seem quite unlike the normal silk that driders produce.  It smells sweet and is clearly edible, but who knows what it might do to you?");
    public BC_BEER: SimpleConsumable = ConsumableLib.mk("BC Beer", "BC Beer", "a mug of Black Cat Beer", (player: Player) => { this.getGame().telAdre.niamh.blackCatBeerEffects(player) }, "A capped mug containing an alcoholic drink secreted from the breasts of Niamh.  It smells tasty.", 1);
    public BEEHONY: Consumable = new BeeHoney(false, false);
    public BIMBOCH: SimpleConsumable = ConsumableLib.mk("BimboCh", "BimboCh", "a bottle of bimbo champagne", ConsumableLib.curry((player: Player) => { this.getGame().telAdre.niamh.bimboChampagne(player, true, true) }), '', 1);
    public BIMBOLQ: BimboLiqueur = new BimboLiqueur();
    public BLACK_D: SimpleConsumable = ConsumableLib.mk("Black D", "Black D", "a vial of black hair dye", ConsumableLib.curry(this.m.hairDye, "black"), "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
    public BLACKEG: SimpleConsumable = ConsumableLib.mk("BlackEg", "BlackEg", "a rubbery black egg", ConsumableLib.curry(this.m.blackRubberEgg, false), "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.");
    public BLACKPP: SimpleConsumable = ConsumableLib.mk("BlackPp", "BlackPp", "a solid black canine pepper", ConsumableLib.curry(this.m.caninePepper, 3), "This solid black canine pepper is smooth and shiny, but something about it doesn't seem quite right...", 10);
    public BLOND_D: SimpleConsumable = ConsumableLib.mk("Blond D", "Blond D", "a vial of blonde hair dye", ConsumableLib.curry(this.m.hairDye, "blonde"), "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
    public BLUEDYE: SimpleConsumable = ConsumableLib.mk("BlueDye", "BlueDye", "a vial of blue hair dye", ConsumableLib.curry(this.m.hairDye, "dark blue"), "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
    public BLUEEGG: SimpleConsumable = ConsumableLib.mk("BlueEgg", "BlueEgg", "a blue and white mottled egg", ConsumableLib.curry(this.m.blueEgg, false), "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.");
    public BROBREW: SimpleConsumable = ConsumableLib.mk("BroBrew", "BroBrew", "a can of Bro Brew", this.m.broBrew, "This aluminum can is labelled as 'Bro Brew'.  It even has a picture of a muscly, bare-chested man flexing on it.  A small label in the corner displays: \"Demon General's Warning: Bro Brew's effects are as potent (and irreversible) as they are refreshing.\"");
    public BROWN_D: SimpleConsumable = ConsumableLib.mk("Brown D", "Brown D", "a vial of brown hair dye", ConsumableLib.curry(this.m.hairDye, "brown"), "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
    public BROWNEG: SimpleConsumable = ConsumableLib.mk("BrownEg", "BrownEg", "a brown and white mottled egg", ConsumableLib.curry(this.m.brownEgg, false), "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.");
    public BULBYPP: SimpleConsumable = ConsumableLib.mk("BulbyPp", "BulbyPp", "a bulbous pepper", ConsumableLib.curry(this.m.caninePepper, 5), "This bulbous pepper has a slightly different shape than the other canine peppers, with two large orb-like protrusions at the base.", 10);
    public CANINEP: SimpleConsumable = ConsumableLib.mk("CanineP", "CanineP", "a Canine pepper", ConsumableLib.curry(this.m.caninePepper, 0), "The pepper is shiny and red, bulbous at the base but long and narrow at the tip.  It smells spicy.");
    public CCUPCAK: SimpleConsumable = ConsumableLib.mk("CCupcak", "CCupcak", "a gigantic, chocolate cupcake", this.m.giantChocolateCupcake, '', 250);
    public CERUL_P: SimpleConsumable = ConsumableLib.mk("Cerul P", "Cerulean P.", "a cerulean-tinted potion", this.m.ceruleanPotion, "This is a mysterious bottle filled with a sky-blue liquid that sloshes gently inside.  Supposedly it will make you irresistible, though to what or who you cannot say.");
    public COAL___: SimpleConsumable = ConsumableLib.mk("Coal   ", "Coal   ", "two pieces of coal", this.m.coal, '');
    public DBLPEPP: SimpleConsumable = ConsumableLib.mk("DblPepp", "DblPepp", "a double canine pepper", ConsumableLib.curry(this.m.caninePepper, 2), "This canine pepper is actually two that have grown together due to some freak coincidence.", 10);
    public DEBIMBO: DeBimbo = new DeBimbo();
    public DRGNEGG: SimpleConsumable = ConsumableLib.mk("DrgnEgg", "DrgnEgg", "an unfertilized dragon egg", this.m.eatEmberEgg, "A large, solid egg, easily the size of your clenched fist.  Its shell color is reddish-white, with blue splotches.");
    public DRYTENT: SimpleConsumable = ConsumableLib.mk("DryTent", "DryTent", "a shriveled tentacle", this.m.shriveledTentacle, "A dried tentacle from one of the lake anemones.  It's probably edible, but the stingers are still a little active.");
    public ECTOPLS: SimpleConsumable = ConsumableLib.mk("EctoPls", "EctoPls", "a bottle of ectoplasm", this.m.ectoplasm, "The green-tinted, hardly corporeal substance flows like a liquid inside its container. It makes you feel... uncomfortable, as you observe it.");
    public EQUINUM: SimpleConsumable = ConsumableLib.mk("Equinum", "Equinum", "a vial of Equinum", this.m.equinum, "This is a long flared vial with a small label that reads, \"<i>Equinum</i>\".  It is likely this potion is tied to horses in some way.");
    public EXTSERM: Consumable = new HairExtensionSerum();
    public F_DRAFT: SimpleConsumable = ConsumableLib.mk("F.Draft", "F.Draft", "a vial of roiling red fluid labeled \"Fuck Draft\"", ConsumableLib.curry(this.m.lustDraft, true), "This vial of red fluid bubbles constantly inside the glass, as if eager to escape.  It smells very strongly, though its odor is difficult to identify.  The word \"Fuck\" is inscribed on the side of the vial.");
    public FISHFIL: SimpleConsumable = ConsumableLib.mk("FishFil", "FishFil", "a fish fillet", this.m.fishFillet, "A perfectly cooked piece of fish.  You're not sure what type of fish is, since you're fairly certain \"delicious\" is not a valid species.");
    public FOXBERY: SimpleConsumable = ConsumableLib.mk("FoxBery", "Fox Berry", "a fox berry", ConsumableLib.curry(this.m.foxTF, false), "This large orange berry is heavy in your hands.  It may have gotten its name from its bright orange coloration.  You're certain it is no mere fruit.");
    public FRRTFRT: SimpleConsumable = ConsumableLib.mk("Frrtfrt", "Frrtfrt", "a ferret fruit", this.m.ferretTF, "This fruit is curved oddly, just like the tree it came from.  The skin is fuzzy and brown, like the skin of a peach.");
    public FOXJEWL: SimpleConsumable = ConsumableLib.mk("FoxJewl", "Fox Jewel", "a fox jewel", ConsumableLib.curry(this.m.foxJewel, false), "A shining teardrop-shaped jewel.  An eerie blue flame dances beneath the surface.");
    public GLDSEED: SimpleConsumable = ConsumableLib.mk("GldSeed", "GoldenSeed", "a golden seed", ConsumableLib.curry(this.m.goldenSeed, 0), "This seed looks and smells absolutely delicious.  Though it has an unusual color, the harpies prize these nuts as delicious treats.  Eating one might induce some physical transformations.");
    public GODMEAD: SimpleConsumable = ConsumableLib.mk("GodMead", "GodMead", "a pint of god's mead", this.m.godMead, '');
    public PROMEAD: SimpleConsumable = ConsumableLib.mk("ProMead", "ProMead", "a pint of premium god's mead", this.m.proMead, '');
    public GOB_ALE: SimpleConsumable = ConsumableLib.mk("Gob.Ale", "Gob.Ale", "a flagon of potent goblin ale", this.m.goblinAle, "This sealed flagon of 'Goblin Ale' sloshes noisily with alcoholic brew.  Judging by the markings on the flagon, it's a VERY strong drink, and not to be trifled with.");
    public GRAYDYE: SimpleConsumable = ConsumableLib.mk("GrayDye", "GrayDye", "a vial of gray hair dye", ConsumableLib.curry(this.m.hairDye, "gray"), "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
    public GREEN_D: SimpleConsumable = ConsumableLib.mk("Green D", "Green D", "a vial of green hair dye", ConsumableLib.curry(this.m.hairDye, "green"), "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
    public GROPLUS: Consumable = new GroPlus();
    public HUMMUS_: SimpleConsumable = ConsumableLib.mk("Hummus ", "Hummus ", "a blob of cheesy-looking hummus", this.m.Hummus, "This pile of hummus doesn't look that clean, and you really don't remember where you got it from.  It looks bland.  So bland that you feel blander just by looking at it.");
    public IMPFOOD: SimpleConsumable = ConsumableLib.mk("ImpFood", "ImpFood", "a parcel of imp food", this.m.impFood, "This is a small parcel of reddish-brown bread stuffed with some kind of meat.  It smells delicious.");
    public INCUBID: SimpleConsumable = ConsumableLib.mk("IncubiD", "IncubiD", "an Incubi draft", ConsumableLib.curry(this.m.incubiDraft, true), "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers.  A stylized picture of a humanoid with a huge penis is etched into the glass.");
    public IZYMILK: SimpleConsumable = ConsumableLib.mk("IzyMilk", "IzyMilk", "a bottle of Isabella's milk", this.m.isabellaMilk, "This is a bottle of Isabella's milk.  Isabella seems fairly certain it will invigorate you.");
    public KANGAFT: SimpleConsumable = ConsumableLib.mk("KangaFt", "KangaFruit", "a piece of kanga fruit", ConsumableLib.curry(this.m.kangaFruit, 0), "A yellow, fibrous, tubular pod.  A split in the end reveals many lumpy, small seeds inside.  The smell of mild fermentation wafts from them.");
    public KITGIFT: KitsuneGift = new KitsuneGift();
    //		public const KITGIFT:SimpleConsumable = mk("KitGift","KitGift", "a kitsune's gift", m.kitsunesGift, "A small square package given to you by a forest kitsune.  It is wrapped up in plain white paper and tied with a string.  Who knows what's inside?", 0);
    public KNOTTYP: SimpleConsumable = ConsumableLib.mk("KnottyP", "KnottyP", "a knotty canine pepper", ConsumableLib.curry(this.m.caninePepper, 4), "This knotted pepper is very swollen, with a massive, distended knot near the base.", 10);
    public L_DRAFT: SimpleConsumable = ConsumableLib.mk("L.Draft", "LustDraft", "a vial of roiling bubble-gum pink fluid", ConsumableLib.curry(this.m.lustDraft, false), "This vial of bright pink fluid bubbles constantly inside the glass, as if eager to escape.  It smells very sweet, and has \"Lust\" inscribed on the side of the vial.", 20);
    public L_BLKEG: SimpleConsumable = ConsumableLib.mk("L.BlkEg", "L.BlkEg", "a large rubbery black egg", ConsumableLib.curry(this.m.blackRubberEgg, true), "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.  For all you know, it could turn you into rubber!");
    public L_BLUEG: SimpleConsumable = ConsumableLib.mk("L.BluEg", "L.BluEg", "a large blue and white mottled egg", ConsumableLib.curry(this.m.blueEgg, true), "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.");
    public L_BRNEG: SimpleConsumable = ConsumableLib.mk("L.BrnEg", "L.BrnEg", "a large brown and white mottled egg", ConsumableLib.curry(this.m.brownEgg, true), "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.");
    public L_PNKEG: SimpleConsumable = ConsumableLib.mk("L.PnkEg", "L.PnkEg", "a large pink and white mottled egg", ConsumableLib.curry(this.m.pinkEgg, true), "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.");
    public L_PRPEG: SimpleConsumable = ConsumableLib.mk("L.PrpEg", "L.PrpEg", "a large purple and white mottled egg", ConsumableLib.curry(this.m.purpleEgg, true), "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.");
    public L_WHTEG: SimpleConsumable = ConsumableLib.mk("L.WhtEg", "L.WhtEg", "a large white egg", ConsumableLib.curry(this.m.whiteEgg, true), "This is an oblong egg, not much different from an ostrich egg in appearance.  Something tells you it's more than just food.");
    public LABOVA_: SimpleConsumable = ConsumableLib.mk("LaBova ", "La Bova", "a bottle containing a misty fluid labeled \"LaBova\"", ConsumableLib.curry(this.m.laBova, true, false), "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off.");
    public LACTAID: SimpleConsumable = ConsumableLib.mk("Lactaid", "Lactaid", "a pink bottle labelled \"Lactaid\"", this.m.lactaid, "Judging by the name printed on this bottle, 'Lactaid' probably has an effect on the ability to lactate, and you doubt that effect is a reduction.");
    public LARGEPP: SimpleConsumable = ConsumableLib.mk("LargePp", "LargePp", "an overly large canine pepper", ConsumableLib.curry(this.m.caninePepper, 1), "This large canine pepper is much bigger than any normal peppers you've seen.", 10);
    public LUSTSTK: LustStick = new LustStick();
    public M__MILK: SimpleConsumable = ConsumableLib.mk("M. Milk", "M. Milk", "a clear bottle of milk from Marble", this.m.useMarbleMilk, "A clear bottle of milk from Marble's breasts. It smells delicious.");
    public MAGSEED: SimpleConsumable = ConsumableLib.mk("MagSeed", "MagSeed", "a magically-enhanced golden seed", ConsumableLib.curry(this.m.goldenSeed, 1), "This seed glows with power.  It's been enhanced by Lumi to unlock its full potential, allowing it to transform you more easily.");
    public MGHTYVG: SimpleConsumable = ConsumableLib.mk("MghtyVg", "MghtyVg", "a mightily enhanced piece of kanga fruit", ConsumableLib.curry(this.m.kangaFruit, 1), "A yellow, fibrous, tubular pod.  A split in the end reveals many lumpy, small seeds inside.  The smell of mild fermentation wafts from them.  It glows slightly from Lumi's enhancements.");
    public MOUSECO: SimpleConsumable = ConsumableLib.mk("MouseCo", "MouseCo", "a handful of mouse cocoa", this.m.mouseCocoa, "A handful of rare aromatic beans with sharp creases in the middle, making them look like small mouse ears.  Allegedly very popular and plentiful before the mice-folk were wiped out.");
    public MINOBLO: SimpleConsumable = ConsumableLib.mk("MinoBlo", "MinoBlo", "a vial of Minotaur blood", this.m.minotaurBlood, "You've got a scratched up looking vial full of bright red minotaur blood.  Any time you move it around it seems to froth up, as if eager to escape.");
    public MINOCUM: SimpleConsumable = ConsumableLib.mk("MinoCum", "MinoCum", "a sealed bottle of minotaur cum", this.m.minotaurCum, "This bottle of minotaur cum looks thick and viscous.  You know it has narcotic properties, but aside from that its effects are relatively unknown.", 60);
    public MYSTJWL: SimpleConsumable = ConsumableLib.mk("MystJwl", "MystJwl", "a mystic jewel", ConsumableLib.curry(this.m.foxJewel, true), "The flames within this jewel glow brighter than before, and have taken on a sinister purple hue.  It has been enhanced to increase its potency, allowing it to transform you more easily, but may have odd side-effects...", 20);
    public NUMBROX: SimpleConsumable = ConsumableLib.mk("NumbRox", "Numb Rox", "a strange packet of candy called 'Numb Rocks'", this.m.numbRocks, "This packet of innocuous looking 'candy' guarantees to reduce troublesome sensations and taste delicious.", 15);
    public NPNKEGG: SimpleConsumable = ConsumableLib.mk("NPnkEgg", "NPnkEgg", "a neon pink egg", ConsumableLib.curry(this.m.neonPinkEgg, false), "This is an oblong egg with an unnatural neon pink coloration.  It tingles in your hand with odd energies that make you feel as if you could jump straight into the sky.");
    public ORANGDY: SimpleConsumable = ConsumableLib.mk("OrangDy", "OrangDy", "a vial of brilliant orange hair dye", ConsumableLib.curry(this.m.hairDye, "bright orange"), "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
    public OVIELIX: Consumable = new OvipositionElixir();
    public P_DRAFT: SimpleConsumable = ConsumableLib.mk("P.Draft", "P.Draft", "an untainted Incubi draft", ConsumableLib.curry(this.m.incubiDraft, false), "The cork-topped flask swishes with a slimy looking off-white fluid, purported to give incubi-like powers.  A stylized picture of a humanoid with a huge penis is etched into the glass. Rathazul has purified this to prevent corruption upon use.", 20);
    public P_LBOVA: SimpleConsumable = ConsumableLib.mk("P.LBova", "P.LBova", "a bottle containing a white fluid labeled \"Pure LaBova\"", ConsumableLib.curry(this.m.laBova, false, false), "A bottle containing a misty fluid with a grainy texture; it has a long neck and a ball-like base.  The label has a stylized picture of a well-endowed cow-girl nursing two guys while they jerk themselves off. It has been purified by Rathazul.");
    public P_PEARL: SimpleConsumable = ConsumableLib.mk("P.Pearl", "P.Pearl", "a pure pearl", this.m.purePearl, '', 1000);
    public P_S_MLK: SimpleConsumable = ConsumableLib.mk("P.S.Mlk", "P.S.Mlk", "an untainted bottle of Succubi milk", ConsumableLib.curry(this.m.succubiMilk, false), "This milk-bottle is filled to the brim with a creamy white milk of dubious origin.  A pink label proudly labels it as \"<i>Succubi Milk</i>\".  In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\"  Purified by Rathazul to prevent corruption.", 20);
    public P_WHSKY: PhoukaWhiskey = new PhoukaWhiskey();
    public PEPPWHT: SimpleConsumable = ConsumableLib.mk("PeppWht", "PeppWht", "a vial of peppermint white", (player: Player) => { this.getGame().peppermintWhite(player) }, "This tightly corked glass bottle gives off a pepperminty smell and reminds you of the winter holidays.  How odd.", 120);
    public PINKDYE: SimpleConsumable = ConsumableLib.mk("PinkDye", "PinkDye", "a vial of bright pink hair dye", ConsumableLib.curry(this.m.hairDye, "neon pink"), "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
    public PINKEGG: SimpleConsumable = ConsumableLib.mk("PinkEgg", "PinkEgg", "a pink and white mottled egg", ConsumableLib.curry(this.m.pinkEgg, false), "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.");
    public PRFRUIT: SimpleConsumable = ConsumableLib.mk("PrFruit", "PrFruit", "a purple fruit", this.m.purpleFruitEssrayle, "This sweet-smelling produce looks like an eggplant, but feels almost squishy, and rubbery to the touch. Holding it to your ear, you think you can hear some fluid sloshing around inside.");
    public PROBOVA: SimpleConsumable = ConsumableLib.mk("ProBova", "ProBova", "a bottle containing a misty fluid labeled \"ProBova\"", ConsumableLib.curry(this.m.laBova, true, true), "This cloudy potion has been enhanced by the alchemist Lumi to imbue its drinker with cow-like attributes.");
    public PSDELIT: SimpleConsumable = ConsumableLib.mk("PSDelit", "PSDelit", "an untainted bottle of \"Succubi's Delight\"", ConsumableLib.curry(this.m.succubisDelight, false), "This precious fluid is often given to men a succubus intends to play with for a long time.  It has been partially purified by Rathazul to prevent corruption.", 20);
    public PURHONY: Consumable = new BeeHoney(true, false);
    public PURPDYE: SimpleConsumable = ConsumableLib.mk("PurpDye", "PurpDye", "a vial of purple hair dye", ConsumableLib.curry(this.m.hairDye, "purple"), "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
    public PURPEAC: SimpleConsumable = ConsumableLib.mk("PurPeac", "PurPeac", "a pure peach", this.m.purityPeach, "This is a peach from Minerva's spring, yellowy-orange with red stripes all over it.", 10);
    public PURPLEG: SimpleConsumable = ConsumableLib.mk("PurplEg", "PurplEg", "a purple and white mottled egg", ConsumableLib.curry(this.m.purpleEgg, false), "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.");
    public RED_DYE: SimpleConsumable = ConsumableLib.mk("Red Dye", "Red Dye", "a vial of red hair dye", ConsumableLib.curry(this.m.hairDye, "red"), "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
    public REPTLUM: SimpleConsumable = ConsumableLib.mk("Reptlum", "Reptlum", "a vial of Reptilum", this.m.reptilum, "This is a rounded bottle with a small label that reads, \"<i>Reptilum</i>\".  It is likely this potion is tied to reptiles in some way.");
    public REDUCTO: Consumable = new Reducto();
    public RINGFIG: SimpleConsumable = ConsumableLib.mk("RingFig", "RingFig", "a ringtail fig", this.m.ringtailFig, "A dried fig with two lobes and thin dark rings just below its stem.  The skin is wrinkly and it looks vaguely like a bulging scrotum.");
    public RIZZART: RizzaRoot = new RizzaRoot();
    public S_DREAM: SimpleConsumable = ConsumableLib.mk("S.Dream", "S.Dream", "a bottle of 'Succubus' Dream'", this.m.succubisDream, "This precious fluid is often given to men a succubus intends to play with for a long time, though this batch has been enhanced by Lumi to have even greater potency.");
    public S_GOSSR: SimpleConsumable = ConsumableLib.mk("S.Gossr", "S.Gossr", "a bundle of pink, gossamer webbing", ConsumableLib.curry(this.m.sweetGossamer, 0), "These strands of gooey pink gossamer seem quite unlike the normal silk that spider-morphs produce.  It smells sweet and is clearly edible, but who knows what it might do to you?");
    public SDELITE: SimpleConsumable = ConsumableLib.mk("SDelite", "Sucb.Delite", "a bottle of 'Succubi's Delight'", ConsumableLib.curry(this.m.succubisDelight, true), "This precious fluid is often given to men a succubus intends to play with for a long time.");
    public SENSDRF: SimpleConsumable = ConsumableLib.mk("SensDrf", "Sens. Draft", "a bottle of sensitivity draft", this.m.sensitivityDraft, "This carefully labelled potion is a 'Sensitivity Draft', and if the diagrams are any indication, it will make your body more sensitive.", 15);
    public SHARK_T: SimpleConsumable = ConsumableLib.mk("Shark.T", "Shark.T", "a sharp shark tooth", ConsumableLib.curry(this.m.sharkTooth, 0), "A glinting white tooth, very sharp and intimidating.");
    public SHEEPMK: SimpleConsumable = ConsumableLib.mk("SheepMk", "SheepMk", "a bottle of sheep milk", this.m.sheepMilk, "This bottle of sheep milk is said to have corruption-fighting properties.  It may be useful.");
    public SMART_T: SimpleConsumable = ConsumableLib.mk("Smart T", "Scholars T.", "a cup of scholar's tea", this.m.scholarsTea, "This powerful brew supposedly has mind-strengthening effects.");
    public SNAKOIL: SimpleConsumable = ConsumableLib.mk("SnakOil", "SnakOil", "a vial of snake oil", this.m.snakeOil, "A vial the size of your fist made of dark brown glass. It contains what appears to be an oily, yellowish liquid. The odor is abominable.");
    public SPHONEY: Consumable = new BeeHoney(false, true);
    public SUCMILK: SimpleConsumable = ConsumableLib.mk("SucMilk", "SucMilk", "a bottle of Succubi milk", ConsumableLib.curry(this.m.succubiMilk, true), "This milk-bottle is filled to the brim with a creamy white milk of dubious origin.  A pink label proudly labels it as \"<i>Succubi Milk</i>\".  In small text at the bottom of the label it reads: \"<i>To bring out the succubus in YOU!</i>\"");
    public TRAPOIL: SimpleConsumable = ConsumableLib.mk("TrapOil", "TrapOil", "a vial of trap oil", this.m.trapOil, "A round, opaque glass vial filled with a clear, viscous fluid.  It has a symbol inscribed on it, a circle with a cross and arrow pointing out of it in opposite directions.  It looks and smells entirely innocuous.");
    public TSCROLL: SimpleConsumable = ConsumableLib.mk("TScroll", "TScroll", "a tattered scroll", this.m.tatteredScroll, "This tattered scroll is written in strange symbols, yet you have the feeling that if you tried to, you could decipher it.");
    public TSTOOTH: SimpleConsumable = ConsumableLib.mk("TSTooth", "TSTooth", "a glowing tiger shark tooth", ConsumableLib.curry(this.m.sharkTooth, 1), "This looks like a normal shark tooth, though with an odd purple glow.");
    public VITAL_T: SimpleConsumable = ConsumableLib.mk("Vital T", "Vitality T.", "a vitality tincture", this.m.vitalityTincture, "This potent tea is supposedly good for strengthening the body.");
    public VIXVIGR: SimpleConsumable = ConsumableLib.mk("VixVigr", "VixVigr", "a bottle labelled \"Vixen's Vigor\"", ConsumableLib.curry(this.m.foxTF, true), "This small medicine bottle contains something called \"Vixen's Vigor\", supposedly distilled from common fox-berries.  It is supposed to be a great deal more potent, and a small warning label warns of \"extra boobs\", whatever that means.", 30);
    public W__BOOK: SimpleConsumable = ConsumableLib.mk("W. Book", "W. Book", "a small book with a pristine white cover", this.m.whiteSpellbook, "This white book is totally unmarked, and the cover is devoid of any lettering or title.  A shiny brass clasp keeps the covers closed until you are ready to read it.", 40);
    public W_FRUIT: SimpleConsumable = ConsumableLib.mk("W.Fruit", "W.Fruit", "a piece of whisker-fruit", this.m.catTransformation, "This small, peach-sized fruit has tiny whisker-like protrusions growing from the sides.");
    public W_STICK: WingStick = new WingStick();
    public WETCLTH: SimpleConsumable = ConsumableLib.mk("WetClth", "WetClth", "a wet cloth dripping with slippery slime", this.m.gooGasmic, "Dripping with a viscous slime, you've no doubt rubbing this cloth on your body would have some kind of strange effect.");
    public WHITEDY: SimpleConsumable = ConsumableLib.mk("WhiteDy", "WhiteDy", "a vial of white hair dye", ConsumableLib.curry(this.m.hairDye, "white"), "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste.");
    public WHITEEG: SimpleConsumable = ConsumableLib.mk("WhiteEg", "WhiteEg", "a milky-white egg", ConsumableLib.curry(this.m.whiteEgg, false), "This is an oblong egg, not much different from a chicken egg in appearance.  Something tells you it's more than just food.");

    public PRNPKR: SimpleConsumable = ConsumableLib.mk("PrnsPkr", "PrnsPkr", "a vial of pinkish fluid", this.m.princessPucker, "A vial filled with a viscous pink liquid.");

    public HRBCNT: SimpleConsumable = ConsumableLib.mk("HrblCnt", "HrblCnt", "a bundle of verdant green leaves", this.m.herbalContraceptive, "A small bundle of verdant green leaves.");

    public LARGE_EGGS: any[] = [this.L_BLKEG, this.L_BLUEG, this.L_BRNEG, this.L_PNKEG, this.L_PRPEG, this.L_WHTEG];
    public SMALL_EGGS: any[] = [this.BLACKEG, this.BLUEEGG, this.BROWNEG, this.PINKEGG, this.PURPLEG, this.WHITEEG];
    private mutations?: Mutations;

    /**
     * A handy function to create SimpleConsumables (useable by any player, effect is a function accepting player:Player,
     * shortName, longName, description and value are const)
     * @param id id. Must be String 7 chars long
     * @param shortName shortName, undefined to use id as shortName
     * @param longName undefined to use shortName as longName
     * @param effect function(player:Player) called to produce effect
     * @param description undefined to use longName as description
     */
    private static mk(id: string, shortName: string, longName: string, effect: any, description: string, value: number = ConsumableLib.DEFAULT_VALUE): SimpleConsumable {
        return new SimpleConsumable(id, shortName, longName, effect, value, description);
    }
    private get m(): Mutations {
        if (this.mutations == undefined) {
            this.mutations = new Mutations();
        }
        return this.mutations;
    }
}

