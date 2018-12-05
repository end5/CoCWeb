import { ConsumableName } from './ConsumableName';
import { Dictionary } from 'Engine/Utilities/Dictionary';
import { Consumable } from './Consumable';
import { CaninePepperType, CaninePepper } from './CaninePepper';
import { EggType, Eggs } from './Eggs';
import { HairDyeType, HairDye } from './HairDye';
import { BeeHoney } from './BeeHoney';
import { BimboLiqueur } from './BimboLiqueur';
import { BlackCatBeer } from './BlackCatBeer';
import { BlackSpellbook } from './BlackSpellbook';
import { BroBrew } from './BroBrew';
import { CeruleanPotion } from './CeruleanPotion';
import { Coal } from './Coal';
import { DeBimbo } from './DeBimbo';
import { DragonEgg } from './DragonEgg';
import { Ectoplasm } from './Ectoplasm';
import { Equinum } from './Equinum';
import { FerretFruit } from './FerretFruit';
import { FishFillet } from './FishFillet';
import { FoxBerry } from './FoxBerry';
import { FoxJewel } from './FoxJewel';
import { GiantChocolateCupcake } from './GiantChocolateCupcake';
import { GoblinAle } from './GoblinAle';
import { GodsMead } from './GodsMead';
import { GoldenSeed } from './GoldenSeed';
import { GroPlus } from './GroPlus';
import { HairExtensionSerum } from './HairExtensionSerum';
import { HerbalContraceptive } from './HerbalContraceptive';
import { Hummus } from './Hummus';
import { ImpFood } from './ImpFood';
import { IncubusDraft } from './IncubusDraft';
import { IsabellaMilk } from './IsabellaMilk';
import { KangaFruit } from './KangaFruit';
import { KitsuneGift } from './KitsuneGift';
import { LaBova } from './LaBova';
import { Lactaid } from './Lactaid';
import { LustDraft } from './LustDraft';
import { LustStick } from './LustStick';
import { MarbleMilk } from './MarbleMilk';
import { MinotaurBlood } from './MinotaurBlood';
import { MinotaurCum } from './MinotaurCum';
import { MouseCocoa } from './MouseCocoa';
import { NeonPinkEgg } from './NeonPinkEgg';
import { NumbRock } from './NumbRock';
import { OvipositionElixir } from './OvipositionElixir';
import { PeppermintWhite } from './PeppermintWhite';
import { PhoukaWhiskey } from './PhoukaWhiskey';
import { PrincessPucker } from './PrincessPucker';
import { PurePearl } from './PurePearl';
import { PurityPeach } from './PurityPeach';
import { PurpleFruit } from './PurpleFruit';
import { Reducto } from './Reducto';
import { Reptilum } from './Reptilum';
import { RingtailFig } from './RingtailFig';
import { RizzaRoot } from './RizzaRoot';
import { ScholarsTea } from './ScholarsTea';
import { SensitivityDraft } from './SensitivityDraft';
import { SharkTooth } from './SharkTooth';
import { SheepMilk } from './SheepMilk';
import { ShriveledTentacle } from './ShriveledTentacle';
import { SnakeOil } from './SnakeOil';
import { SuccubiMilk } from './SuccubiMilk';
import { SuccubisDelight } from './SuccubisDelight';
import { SuccubisDream } from './SuccubisDream';
import { SweetGossamer } from './SweetGossamer';
import { TatteredScroll } from './TatteredScroll';
import { TrapOil } from './TrapOil';
import { VitalityTincture } from './VitalityTincture';
import { WetCloth } from './WetCloth';
import { WhiskerFruit } from './WhiskerFruit';
import { WhiteSpellbook } from './WhiteSpellbook';

export const ConsumableLib = new Dictionary<ConsumableName, Consumable>();

ConsumableLib.set(ConsumableName.BeeHoney, new BeeHoney(false, false));
ConsumableLib.set(ConsumableName.BeeHoneyPure, new BeeHoney(true, false));
ConsumableLib.set(ConsumableName.BeeHoneySpecial, new BeeHoney(false, true));
ConsumableLib.set(ConsumableName.BimboLiqueur, new BimboLiqueur());
ConsumableLib.set(ConsumableName.BlackCatBeer, new BlackCatBeer());
ConsumableLib.set(ConsumableName.BlackSpellbook, new BlackSpellbook());
ConsumableLib.set(ConsumableName.BroBrew, new BroBrew());
ConsumableLib.set(ConsumableName.CaninePepper, new CaninePepper(CaninePepperType.Normal));
ConsumableLib.set(ConsumableName.CaninePepperLarge, new CaninePepper(CaninePepperType.Oversized));
ConsumableLib.set(ConsumableName.CaninePepperDouble, new CaninePepper(CaninePepperType.Double));
ConsumableLib.set(ConsumableName.CaninePepperBlack, new CaninePepper(CaninePepperType.Black));
ConsumableLib.set(ConsumableName.CaninePepperKnotty, new CaninePepper(CaninePepperType.Knotty));
ConsumableLib.set(ConsumableName.CaninePepperBulbous, new CaninePepper(CaninePepperType.Bulbous));
ConsumableLib.set(ConsumableName.CeruleanPotion, new CeruleanPotion());
ConsumableLib.set(ConsumableName.Coal, new Coal());
ConsumableLib.set(ConsumableName.DeBimbo, new DeBimbo());
ConsumableLib.set(ConsumableName.DragonEgg, new DragonEgg());
ConsumableLib.set(ConsumableName.Ectoplasm, new Ectoplasm());
ConsumableLib.set(ConsumableName.EggBlack, new Eggs(EggType.Black, false));
ConsumableLib.set(ConsumableName.EggBlue, new Eggs(EggType.Blue, false));
ConsumableLib.set(ConsumableName.EggBrown, new Eggs(EggType.Brown, false));
ConsumableLib.set(ConsumableName.EggPink, new Eggs(EggType.Pink, false));
ConsumableLib.set(ConsumableName.EggPurple, new Eggs(EggType.Purple, false));
ConsumableLib.set(ConsumableName.EggWhite, new Eggs(EggType.White, false));
ConsumableLib.set(ConsumableName.LargeEggBlack, new Eggs(EggType.Black, true));
ConsumableLib.set(ConsumableName.LargeEggBlue, new Eggs(EggType.Blue, true));
ConsumableLib.set(ConsumableName.LargeEggBrown, new Eggs(EggType.Brown, true));
ConsumableLib.set(ConsumableName.LargeEggPink, new Eggs(EggType.Pink, true));
ConsumableLib.set(ConsumableName.LargeEggPurple, new Eggs(EggType.Purple, true));
ConsumableLib.set(ConsumableName.LargeEggWhite, new Eggs(EggType.White, true));
ConsumableLib.set(ConsumableName.Equinum, new Equinum());
ConsumableLib.set(ConsumableName.FerretFruit, new FerretFruit());
ConsumableLib.set(ConsumableName.FishFillet, new FishFillet());
ConsumableLib.set(ConsumableName.FoxBerry, new FoxBerry(false));
ConsumableLib.set(ConsumableName.FoxBerryEnhanced, new FoxBerry(true));
ConsumableLib.set(ConsumableName.FoxJewel, new FoxJewel(false));
ConsumableLib.set(ConsumableName.FoxJewelEnhanced, new FoxJewel(true));
ConsumableLib.set(ConsumableName.GiantChocolateCupcake, new GiantChocolateCupcake());
ConsumableLib.set(ConsumableName.GoblinAle, new GoblinAle());
ConsumableLib.set(ConsumableName.GodsMead, new GodsMead());
ConsumableLib.set(ConsumableName.GoldenSeed, new GoldenSeed(false));
ConsumableLib.set(ConsumableName.GoldenSeedEnhanced, new GoldenSeed(true));
ConsumableLib.set(ConsumableName.GroPlus, new GroPlus());
ConsumableLib.set(ConsumableName.HairDyeAuburn, new HairDye(HairDyeType.Auburn));
ConsumableLib.set(ConsumableName.HairDyeBlack, new HairDye(HairDyeType.Black));
ConsumableLib.set(ConsumableName.HairDyeBlonde, new HairDye(HairDyeType.Blonde));
ConsumableLib.set(ConsumableName.HairDyeBrightOrange, new HairDye(HairDyeType.BrightOrange));
ConsumableLib.set(ConsumableName.HairDyeBrown, new HairDye(HairDyeType.Brown));
ConsumableLib.set(ConsumableName.HairDyeDarkBlue, new HairDye(HairDyeType.DarkBlue));
ConsumableLib.set(ConsumableName.HairDyeGray, new HairDye(HairDyeType.Gray));
ConsumableLib.set(ConsumableName.HairDyeGreen, new HairDye(HairDyeType.Green));
ConsumableLib.set(ConsumableName.HairDyeNeonPink, new HairDye(HairDyeType.NeonPink));
ConsumableLib.set(ConsumableName.HairDyePurple, new HairDye(HairDyeType.Purple));
ConsumableLib.set(ConsumableName.HairDyeRed, new HairDye(HairDyeType.Red));
ConsumableLib.set(ConsumableName.HairDyeWhite, new HairDye(HairDyeType.White));
ConsumableLib.set(ConsumableName.HairExtensionSerum, new HairExtensionSerum());
ConsumableLib.set(ConsumableName.HerbalContraceptive, new HerbalContraceptive());
ConsumableLib.set(ConsumableName.Hummus, new Hummus());
ConsumableLib.set(ConsumableName.ImpFood, new ImpFood());
ConsumableLib.set(ConsumableName.IncubusDraftPure, new IncubusDraft(false));
ConsumableLib.set(ConsumableName.IncubusDraft, new IncubusDraft(true));
ConsumableLib.set(ConsumableName.IsabellaMilk, new IsabellaMilk());
ConsumableLib.set(ConsumableName.KangaFruit, new KangaFruit(false));
ConsumableLib.set(ConsumableName.KangaFruitEnhanced, new KangaFruit(true));
ConsumableLib.set(ConsumableName.KitsuneGift, new KitsuneGift());
ConsumableLib.set(ConsumableName.LaBovaPure, new LaBova(false, false));
ConsumableLib.set(ConsumableName.LaBovaEnhanced, new LaBova(true, false));
ConsumableLib.set(ConsumableName.LaBova, new LaBova(false, true));
ConsumableLib.set(ConsumableName.Lactaid, new Lactaid());
ConsumableLib.set(ConsumableName.LustDraft, new LustDraft(false));
ConsumableLib.set(ConsumableName.LustDraftEnhanced, new LustDraft(true));
ConsumableLib.set(ConsumableName.LustStick, new LustStick());
ConsumableLib.set(ConsumableName.MarbleMilk, new MarbleMilk());
ConsumableLib.set(ConsumableName.MinotaurBlood, new MinotaurBlood());
ConsumableLib.set(ConsumableName.MinotaurCum, new MinotaurCum());
ConsumableLib.set(ConsumableName.MouseCocoa, new MouseCocoa());
ConsumableLib.set(ConsumableName.NeonPinkEgg, new NeonPinkEgg(false));
ConsumableLib.set(ConsumableName.NeonPinkEggPreg, new NeonPinkEgg(true));
ConsumableLib.set(ConsumableName.NumbRock, new NumbRock());
ConsumableLib.set(ConsumableName.OvipositionElixir, new OvipositionElixir());
ConsumableLib.set(ConsumableName.PeppermintWhite, new PeppermintWhite());
ConsumableLib.set(ConsumableName.PhoukaWhiskey, new PhoukaWhiskey());
ConsumableLib.set(ConsumableName.PrincessPucker, new PrincessPucker());
ConsumableLib.set(ConsumableName.PurePearl, new PurePearl());
ConsumableLib.set(ConsumableName.PurityPeach, new PurityPeach());
ConsumableLib.set(ConsumableName.PurpleFruit, new PurpleFruit());
ConsumableLib.set(ConsumableName.Reducto, new Reducto());
ConsumableLib.set(ConsumableName.Reptilum, new Reptilum());
ConsumableLib.set(ConsumableName.RingtailFig, new RingtailFig());
ConsumableLib.set(ConsumableName.RizzaRoot, new RizzaRoot());
ConsumableLib.set(ConsumableName.ScholarsTea, new ScholarsTea());
ConsumableLib.set(ConsumableName.SensitivityDraft, new SensitivityDraft());
ConsumableLib.set(ConsumableName.SharkTooth, new SharkTooth(false));
ConsumableLib.set(ConsumableName.SharkToothEnhanced, new SharkTooth(true));
ConsumableLib.set(ConsumableName.SheepMilk, new SheepMilk());
ConsumableLib.set(ConsumableName.ShriveledTentacle, new ShriveledTentacle());
ConsumableLib.set(ConsumableName.SnakeOil, new SnakeOil());
ConsumableLib.set(ConsumableName.SuccubiMilkPure, new SuccubiMilk(false));
ConsumableLib.set(ConsumableName.SuccubiMilk, new SuccubiMilk(true));
ConsumableLib.set(ConsumableName.SuccubisDelightPure, new SuccubisDelight(false));
ConsumableLib.set(ConsumableName.SuccubisDelight, new SuccubisDelight(true));
ConsumableLib.set(ConsumableName.SuccubisDream, new SuccubisDream());
ConsumableLib.set(ConsumableName.BlackGossamer, new SweetGossamer(false));
ConsumableLib.set(ConsumableName.SweetGossamer, new SweetGossamer(true));
ConsumableLib.set(ConsumableName.TatteredScroll, new TatteredScroll());
ConsumableLib.set(ConsumableName.TrapOil, new TrapOil());
ConsumableLib.set(ConsumableName.VitalityTincture, new VitalityTincture());
ConsumableLib.set(ConsumableName.WetCloth, new WetCloth());
ConsumableLib.set(ConsumableName.WhiskerFruit, new WhiskerFruit());
ConsumableLib.set(ConsumableName.WhiteSpellbook, new WhiteSpellbook());
        // ConsumableLib.set(ConsumableName.WingStick, new WingStick());
