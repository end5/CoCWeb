import { CleansingPalmPerk } from "./Perks/CleansingPalmPerk";
import { ControlledBreathPerk } from "./Perks/ControlledBreathPerk";
import { ElvenBountyPerk } from "./Perks/ElvenBountyPerk";
import { EnlightenedPerk } from "./Perks/EnlightenedPerk";
import { PentUpPerk } from "./Perks/PentUpPerk";
import { PiercedCrimstonePerk } from "./Perks/PiercedCrimstonePerk";
import { PiercedFertitePerk } from "./Perks/PiercedFertitePerk";
import { SluttySeductionPerk } from "./Perks/SluttySeductionPerk";
import { SpellcastingAffinityPerk } from "./Perks/SpellcastingAffinityPerk";
import { WizardsEndurancePerk } from "./Perks/WizardsEndurancePerk";
import { WizardsFocusPerk } from "./Perks/WizardsFocusPerk";
import { PerkType } from "./PerkType";

/**
 * Created by aimozg on 26.01.14.
 */

export class PerkLib {

    // UNSORTED perks TODO these are mostly incorrect perks: tested but never created
    public static Brawler: PerkType = PerkLib.mk("Brawler", "Brawler",
        "Brawling experience allows you to make two unarmed attacks in a turn.",
        "You choose the 'Brawler' perk, allowing you to make two unarmed attacks in a turn!");
    public static Buttslut: PerkType = PerkLib.mk("Buttslut", "Buttslut",
        "");
    public static Focused: PerkType = PerkLib.mk("Focused", "Focused",
        "");
    /* Never used, removed because it used a numbered event. Could be re-implemented differently if some new monster actually uses it
            public static  LastStrike:PerkType = mk("Last Strike", "Last Strike",
                    "");
    */

    // Player creation perks
    public static Fast: PerkType = PerkLib.mk("Fast", "Fast",
        "Gains speed 25% faster.");
    public static Lusty: PerkType = PerkLib.mk("Lusty", "Lusty",
        "Gains lust 25% faster.");
    public static Sensitive: PerkType = PerkLib.mk("Sensitive", "Sensitive",
        "Gains sensitivity 25% faster.");
    public static Smart: PerkType = PerkLib.mk("Smart", "Smart",
        "Gains intelligence 25% faster.");
    public static Strong: PerkType = PerkLib.mk("Strong", "Strong",
        "Gains strength 25% faster.");
    public static Tough: PerkType = PerkLib.mk("Tough", "Tough",
        "Gains toughness 25% faster.");
    // Female creation perks
    public static BigClit: PerkType = PerkLib.mk("Big Clit", "Big Clit",
        "Allows your clit to grow larger more easily and faster.");
    public static BigTits: PerkType = PerkLib.mk("Big Tits", "Big Tits",
        "Makes your tits grow larger more easily.");
    public static Fertile: PerkType = PerkLib.mk("Fertile", "Fertile",
        "Makes you 15% more likely to become pregnant.");
    public static WetPussy: PerkType = PerkLib.mk("Wet Pussy", "Wet Pussy",
        "Keeps your pussy wet and provides a bonus to capacity.");
    // Male creation perks
    public static BigCock: PerkType = PerkLib.mk("Big Cock", "Big Cock",
        "Gains cock size 25% faster and with less limitations.");
    public static MessyOrgasms: PerkType = PerkLib.mk("Messy Orgasms", "Messy Orgasms",
        "Produces 50% more cum volume.");

    // History perks
    public static HistoryAlchemist: PerkType = PerkLib.mk("History: Alchemist", "History: Alchemist",
        "Alchemical experience makes items more reactive to your body.");
    public static HistoryFighter: PerkType = PerkLib.mk("History: Fighter", "History: Fighter",
        "A Past full of conflict increases physical damage dealt by 10%.");
    public static HistoryHealer: PerkType = PerkLib.mk("History: Healer", "History: Healer",
        "Healing experience increases HP gains by 20%.");
    public static HistoryReligious: PerkType = PerkLib.mk("History: Religious", "History: Religious",
        "Replaces masturbate with meditate when corruption less than or equal to 66.");
    public static HistoryScholar: PerkType = PerkLib.mk("History: Scholar", "History: Scholar",
        "Time spent focusing your mind makes spellcasting 20% less fatiguing.");
    public static HistorySlacker: PerkType = PerkLib.mk("History: Slacker", "History: Slacker",
        "Regenerate fatigue 20% faster.");
    public static HistorySlut: PerkType = PerkLib.mk("History: Slut", "History: Slut",
        "Sexual experience has made you more able to handle large insertions and more resistant to stretching.");
    public static HistorySmith: PerkType = PerkLib.mk("History: Smith", "History: Smith",
        "Knowledge of armor and fitting increases armor effectiveness by roughly 10%.");
    public static HistoryWhore: PerkType = PerkLib.mk("History: Whore", "History: Whore",
        "Seductive experience causes your tease attacks to be 15% more effective.");

    // Ordinary (levelup) perks
    public static Acclimation: PerkType = PerkLib.mk("Acclimation", "Acclimation",
        "Reduces lust gain by 15%.",
        "You choose the 'Acclimation' perk, making your body 15% more resistant to lust, up to a maximum of 75%.");
    public static Agility: PerkType = PerkLib.mk("Agility", "Agility",
        "Boosts armor points by a portion of your speed on light/medium armors.",
        "You choose the 'Agility' perk, increasing the effectiveness of Light/Medium armors by a portion of your speed.");
    public static Archmage: PerkType = PerkLib.mk("Archmage", "Archmage",
        "[if (player.inte>=75)" +
        "Increases base spell strength by 50%." +
        "|" +
        "<b>You are too dumb to gain benefit from this perk.</b>" +
        "]",
        "You choose the 'Archmage' perk, increasing base spell strength by 50%.");
    public static ArousingAura: PerkType = PerkLib.mk("Arousing Aura", "Arousing Aura",
        "Exude a lust-inducing aura (Req's corruption of 70 or more)",
        "You choose the 'Arousing Aura' perk, causing you to radiate an aura of lust when your corruption is over 70.");
    public static Berzerker: PerkType = PerkLib.mk("Berzerker", "Berzerker",
        "[if(player.str>=75)" +
        "Grants 'Berzerk' ability." +
        "|" +
        "<b>You aren't strong enough to benefit from this anymore.</b>" +
        "]",
        "You choose the 'Berzerker' perk, which unlocks the 'Berzerk' magical ability.  Berzerking increases attack and lust resistance but reduces physical defenses.");
    public static BrutalBlows: PerkType = PerkLib.mk("Brutal Blows", "Brutal Blows",
        "[if(player.str>=75)" +
        "Reduces enemy armor with each hit." +
        "|" +
        "<b>You aren't strong enough to benefit from this anymore.</b>" +
        "]",
        "You choose the 'Brutal Blows' perk, which reduces enemy armor with each hit.");
    public static Channeling: PerkType = PerkLib.mk("Channeling", "Channeling",
        "Increases base spell strength by 50%.",
        "You choose the 'Channeling' perk, boosting the strength of your spellcasting!");
    public static CorruptedLibido: PerkType = PerkLib.mk("Corrupted Libido", "Corrupted Libido",
        "Reduces lust gain by 10%.",
        "You choose the 'Corrupted Libido' perk.  As a result of your body's corruption, you've become a bit harder to turn on. (Lust gain reduced by 10%!)");
    public static DoubleAttack: PerkType = PerkLib.mk("Double Attack", "Double Attack",
        "[if (player.spe<50)" +
        "<b>You're too slow to double attack!</b>" +
        "|[if(player.str<61)" +
        "Allows you to perform two melee attacks per round." +
        "|" +
        "<b>You are stronger than double attack allows.  To choose between reduced strength double-attacks and a single strong attack, access \"Dbl Options\" in the perks menu.</b>" +
        "]]",
        "You choose the 'Double Attack' perk.  This allows you to make two attacks so long as your strength is at 60 or below.  By default your effective strength will be reduced to 60 if it is too high when double attacking.  <b>You can enter the perks menu at any time to toggle options as to how you will use this perk.</b>");
    public static Evade: PerkType = PerkLib.mk("Evade", "Evade",
        "Increases chances of evading enemy attacks.",
        "You choose the 'Evade' perk, allowing you to avoid enemy attacks more often!");
    public static FertilityPlus: PerkType = PerkLib.mk("Fertility+", "Fertility+",
        "Increases fertility rating by 15 and cum volume by up to 50%.",
        "You choose the 'Fertility+' perk, making it easier to get pregnant.  It also increases your cum volume by up to 50% (if appropriate)!");
    public static HotBlooded: PerkType = PerkLib.mk("Hot Blooded", "Hot Blooded",
        "Raises minimum lust by up to 20.",
        "You choose the 'Hot Blooded' perk.  As a result of your enhanced libido, your lust no longer drops below 20! (If you already have some minimum lust, it will be increased by 10)");
    public static ImmovableObject: PerkType = PerkLib.mk("Immovable Object", "Immovable Object",
        "[if(player.tou>=75)" +
        "Grants 20% physical damage reduction.</b>" +
        "|" +
        "<b>You aren't tough enough to benefit from this anymore.</b>" +
        "]",
        "You choose the 'Immovable Object' perk, granting 20% physical damage reduction.</b>");
    public static IronMan: PerkType = PerkLib.mk("Iron Man", "Iron Man",
        "Reduces the fatigue cost of physical specials by 50%.",
        "You choose the 'Iron Man' perk, reducing the fatigue cost of physical special attacks by 50%");
    public static LightningStrikes: PerkType = PerkLib.mk("Lightning Strikes", "Lightning Strikes",
        "[if(player.spe>=60)" +
        "Increases the attack damage for non-heavy weapons.</b>" +
        "|" +
        "<b>You are too slow to benefit from this perk.</b>" +
        "]",
        "You choose the 'Lightning Strikes' perk, increasing the attack damage for non-heavy weapons.</b>");
    public static LungingAttacks: PerkType = PerkLib.mk("Lunging Attacks", "Lunging Attacks",
        "[if(player.spe>=75)" +
        "Grants 50% armor penetration for standard attacks." +
        "|" +
        "<b>You are too slow to benefit from this perk.</b>" +
        "]",
        "You choose the 'Lunging Attacks' perk, granting 50% armor penetration for standard attacks.");
    public static Mage: PerkType = PerkLib.mk("Mage", "Mage",
        "Increases base spell strength by 50%.",
        "You choose the 'Mage' perk.  You are able to focus your magical abilities even more keenly, boosting your base spell effects by 50%.");
    public static Masochist: PerkType = PerkLib.mk("Masochist", "Masochist",
        "Take 30% less physical damage but gain lust when damage.",
        "You choose the 'Masochist' perk, reducing the damage you take but raising your lust each time!  This perk only functions while your libido is at or above 60!");
    public static Medicine: PerkType = PerkLib.mk("Medicine", "Medicine",
        "Grants 15% chance per round of cleansing poisons/drugs from your body.",
        "You choose the 'Medicine' perk, giving you a chance to remove debilitating poisons automatically!");
    public static Nymphomania: PerkType = PerkLib.mk("Nymphomania", "Nymphomania",
        "Raises minimum lust by up to 30.",
        "You've chosen the 'Nymphomania' perk.  Due to the incredible amount of corruption you've been exposed to, you've begun to live in a state of minor constant arousal.  Your minimum lust will be increased by as much as 30 (If you already have minimum lust, the increase is 10-15).");
    public static Precision: PerkType = PerkLib.mk("Precision", "Precision",
        "Reduces enemy armor by 10. (Req's 25+ Intelligence)",
        "You've chosen the 'Precision' perk.  Thanks to your intelligence, you're now more adept at finding and striking an enemy's weak points, reducing their damage resistance from armor by 10.  If your intelligence ever drops below 25 you'll no longer be smart enough to benefit from this perk.");
    public static Regeneration: PerkType = PerkLib.mk("Regeneration", "Regeneration",
        "Regenerates 2% of max HP/hour and 1% of max HP/round.",
        "You choose the 'Regeneration' perk, allowing you to heal 2% of max HP every hour and 1% of max HP every round of combat!");
    public static Regeneration2: PerkType = PerkLib.mk("Regeneration 2", "Regeneration 2",
        "Gain 2% of max HP per round of combat and 4% of max HP per hour out of combat.",
        "You choose the 'Regeneration 2' perk, giving you an additional 2% of max HP per turn in combat and 4% of max HP per hour.");
    public static Resistance: PerkType = PerkLib.mk("Resistance", "Resistance",
        "Reduces lust gain by 10%.",
        "You choose the 'Resistance' perk, reducing the rate at which your lust increases by 10%.");
    public static Resolute: PerkType = PerkLib.mk("Resolute", "Resolute",
        "[if(player.tou>=75)" +
        "Grants immunity to stuns and some statuses.</b>" +
        "|" +
        "<b>You aren't tough enough to benefit from this anymore.</b>" +
        "]",
        "You choose the 'Resolute' perk, granting immunity to stuns and some statuses.</b>");
    public static Runner: PerkType = PerkLib.mk("Runner", "Runner",
        "Increases chances of escaping combat.",
        "You choose the 'Runner' perk, increasing your chances to escape from your foes when fleeing!");
    public static Sadist: PerkType = PerkLib.mk("Sadist", "Sadist",
        "Deal 20% more damage, but gain lust at the same time.",
        "You choose the 'Sadist' perk, increasing damage by 20 percent but causing you to gain lust from dealing damage.");
    public static Seduction: PerkType = PerkLib.mk("Seduction", "Seduction",
        "Upgrades your tease attack, making it more effective.",
        "You choose the 'Seduction' perk, upgrading the 'tease' attack with a more powerful damage and a higher chance of success.");
    public static SpeedyRecovery: PerkType = PerkLib.mk("Speedy Recovery", "Speedy Recovery",
        "Regain fatigue 50% faster.",
        "You choose the 'Speedy Recovery' perk, boosting your fatigue recovery rate!");
    public static Spellpower: PerkType = PerkLib.mk("Spellpower", "Spellpower",
        "Increases base spell strength by 50%.",
        "You choose the 'Spellpower' perk.  Thanks to your sizeable intellect and willpower, you are able to more effectively use magic, boosting base spell effects by 50%.");
    public static StrongBack: PerkType = PerkLib.mk("Strong Back", "Strong Back",
        "Enables fourth item slot.",
        "You choose the 'Strong Back' perk, enabling a fourth item slot.");
    public static StrongBack2: PerkType = PerkLib.mk("Strong Back 2: Strong Harder", "Strong Back 2: Strong Harder",
        "Enables fifth item slot.",
        "You choose the 'Strong Back 2: Strong Harder' perk, enabling a fifth item slot.");
    public static Tactician: PerkType = PerkLib.mk("Tactician", "Tactician",
        "[if(player.inte>=50)" +
        "Increases critical hit chance by up to 10% (Intelligence-based)." +
        "|" +
        "<b>You are too dumb to gain benefit from this perk.</b>" +
        "]",
        "You choose the 'Tactician' perk, increasing critical hit chance by up to 10% (Intelligence-based).");
    public static Tank: PerkType = PerkLib.mk("Tank", "Tank",
        "Raises max HP by 50.",
        "You choose the 'Tank' perk, giving you an additional 50 hp!");
    public static Tank2: PerkType = PerkLib.mk("Tank 2", "Tank 2",
        "+1 extra HP per point of toughness.",
        "You choose the 'Tank 2' perk, granting an extra maximum HP for each point of toughness.");
    public static ThunderousStrikes: PerkType = PerkLib.mk("Thunderous Strikes", "Thunderous Strikes",
        "+20% 'Attack' damage while strength is at or above 80.",
        "You choose the 'Thunderous Strikes' perk, increasing normal damage by 20% while your strength is over 80.");
    public static WeaponMastery: PerkType = PerkLib.mk("Weapon Mastery", "Weapon Mastery",
        "[if(player.str>60)" +
        "Doubles damage bonus of weapons classified as 'Large'." +
        "|" +
        "<b>You aren't strong enough to benefit from this anymore.</b>" +
        "]",
        "You choose the 'Weapon Mastery' perk, doubling the effectiveness of large weapons.");
    public static WellAdjusted: PerkType = PerkLib.mk("Well Adjusted", "Well Adjusted",
        "You gain half as much lust as time passes in Mareth.",
        "You choose the 'Well Adjusted' perk, reducing the amount of lust you naturally gain over time while in this strange land!");

    // Needlework perks
    public static ChiReflowAttack: PerkType = PerkLib.mk("Chi Reflow - Attack", "Chi Reflow - Attack",
        "Regular attacks boosted, but damage resistance decreased.");
    public static ChiReflowDefense: PerkType = PerkLib.mk("Chi Reflow - Defense", "Chi Reflow - Defense",
        "Passive damage resistance, but caps speed");
    public static ChiReflowLust: PerkType = PerkLib.mk("Chi Reflow - Lust", "Chi Reflow - Lust",
        "Lust resistance and Tease are enhanced, but Libido and Sensitivity gains increased.");
    public static ChiReflowMagic: PerkType = PerkLib.mk("Chi Reflow - Magic", "Chi Reflow - Magic",
        "Magic attacks boosted, but regular attacks are weaker.");
    public static ChiReflowSpeed: PerkType = PerkLib.mk("Chi Reflow - Speed", "Chi Reflow - Speed",
        "Speed reductions are halved but caps strength");

    // Piercing perks
    public static PiercedCrimstone: PiercedCrimstonePerk = new PiercedCrimstonePerk();
    public static PiercedFertite: PiercedFertitePerk = new PiercedFertitePerk();
    public static PiercedFurrite: PerkType = PerkLib.mk("Pierced: Furrite", "Pierced: Furrite",
        "Increases chances of encountering 'furry' foes.");
    public static PiercedLethite: PerkType = PerkLib.mk("Pierced: Lethite", "Pierced: Lethite",
        "Increases chances of encountering demonic foes.");

    // Cock sock perks
    public static LustyRegeneration: PerkType = PerkLib.mk("Lusty Regeneration", "Lusty Regeneration",
        "Regenerates 1% of HP per round in combat and 2% of HP per hour.");
    public static MidasCock: PerkType = PerkLib.mk("Midas Cock", "Midas Cock",
        "Increases the gems awarded from victory in battle.");
    public static PentUp: PentUpPerk = new PentUpPerk();
    public static PhallicPotential: PerkType = PerkLib.mk("Phallic Potential", "Phallic Potential",
        "Increases the effects of penis-enlarging transformations.");
    public static PhallicRestraint: PerkType = PerkLib.mk("Phallic Restraint", "Phallic Restraint",
        "Reduces the effects of penis-enlarging transformations.");

    // Armor perks
    public static BloodMage: PerkType = PerkLib.mk("Blood Mage", "Blood Mage",
        "Spellcasting now consumes health instead of fatigue!");
    public static SluttySeduction: SluttySeductionPerk = new SluttySeductionPerk();
    public static WizardsEndurance: WizardsEndurancePerk = new WizardsEndurancePerk();

    // Weapon perks
    public static WizardsFocus: WizardsFocusPerk = new WizardsFocusPerk();

    // Achievement perks
    public static BroodMother: PerkType = PerkLib.mk("Brood Mother", "Brood Mother",
        "Pregnancy moves twice as fast as a normal woman's.");
    public static SpellcastingAffinity: SpellcastingAffinityPerk = new SpellcastingAffinityPerk();

    // Mutation perks
    public static Androgyny: PerkType = PerkLib.mk("Androgyny", "Androgyny",
        "No gender limits on facial masculinity or femininity.");
    public static BasiliskWomb: PerkType = PerkLib.mk("Basilisk Womb", "Basilisk Womb",
        "Enables your eggs to be properly fertilized into basilisks of both genders!");
    public static BeeOvipositor: PerkType = PerkLib.mk("Bee Ovipositor", "Bee Ovipositor",
        "Allows you to lay eggs through a special organ on your insect abdomen, though you need at least 10 eggs to lay.");
    public static BimboBody: PerkType = PerkLib.mk("Bimbo Body", "Bimbo Body",
        "Gives the body of a bimbo.  Tits will never stay below a 'DD' cup, libido is raised, lust resistance is raised, and upgrades tease.");
    public static BimboBrains: PerkType = PerkLib.mk("Bimbo Brains", "Bimbo Brains",
        "Now that you've drank bimbo liquer, you'll never, like, have the attention span and intelligence you once did!  But it's okay, 'cause you get to be so horny an' stuff!");
    public static BroBody: PerkType = PerkLib.mk("Bro Body", "Bro Body",
        "Grants an ubermasculine body that's sure to impress.");
    public static BroBrains: PerkType = PerkLib.mk("Bro Brains", "Bro Brains",
        "Makes thou... thin... fuck, that shit's for nerds.");
    public static BunnyEggs: PerkType = PerkLib.mk("Bunny Eggs", "Bunny Eggs",
        "Laying eggs has become a normal part of your bunny-body's routine.");
    public static CorruptedNinetails: PerkType = PerkLib.mk("Corrupted Nine-tails", "Corrupted Nine-tails",
        "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells, but your method of attaining it has corrupted the transformation, preventing you from achieving true enlightenment.");
    public static Diapause: PerkType = PerkLib.mk("Diapause", "Diapause",
        "Pregnancy does not advance normally, but develops quickly after taking in fluids.");
    public static Dragonfire: PerkType = PerkLib.mk("Dragonfire", "Dragonfire",
        "Allows access to a dragon breath attack.");
    public static EnlightenedNinetails: PerkType = PerkLib.mk("Enlightened Nine-tails", "Enlightened Nine-tails",
        "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells.");
    public static Feeder: PerkType = PerkLib.mk("Feeder", "Feeder",
        "Lactation does not decrease and gives a compulsion to breastfeed others.");
    public static Flexibility: PerkType = PerkLib.mk("Flexibility", "Flexibility",
        "Grants cat-like flexibility.  Useful for dodging and 'fun'.");
    public static FutaFaculties: PerkType = PerkLib.mk("Futa Faculties", "Futa Faculties",
        "It's super hard to think about stuff that like, isn't working out or fucking!");
    public static FutaForm: PerkType = PerkLib.mk("Futa Form", "Futa Form",
        "Ensures that your body fits the Futa look (Tits DD+, Dick 8\"+, & Pussy).  Also keeps your lusts burning bright and improves the tease skill.");
    public static HarpyWomb: PerkType = PerkLib.mk("Harpy Womb", "Harpy Womb",
        "Increases all laid eggs to large size so long as you have harpy legs and a harpy tail.");
    public static Incorporeality: PerkType = PerkLib.mk("Incorporeality", "Incorporeality",
        "Allows you to fade into a ghost-like state and temporarily possess others.");
    public static MinotaurCumAddict: PerkType = PerkLib.mk("Minotaur Cum Addict", "Minotaur Cum Addict",
        "Causes you to crave minotaur cum frequently.  You cannot shake this addiction.");
    public static Oviposition: PerkType = PerkLib.mk("Oviposition", "Oviposition",
        "Causes you to regularly lay eggs when not otherwise pregnant.");
    public static PurityBlessing: PerkType = PerkLib.mk("Purity Blessing", "Purity Blessing",
        "Reduces the rate at which your corruption, libido, and lust increase.");
    public static SlimeCore: PerkType = PerkLib.mk("Slime Core", "Slime Core",
        "Grants more control over your slimy body, allowing you to go twice as long without fluids.");
    public static SpiderOvipositor: PerkType = PerkLib.mk("Spider Ovipositor", "Spider Ovipositor",
        "Allows you to lay eggs through a special organ on your arachnid abdomen, though you need at least 10 eggs to lay.");
    public static ThickSkin: PerkType = PerkLib.mk("Thick Skin", "Thick Skin",
        "Toughens your dermis to provide 2 points of armor.");

    // Quest, Event & NPC perks
    public static BulgeArmor: PerkType = PerkLib.mk("Bulge Armor", "Bulge Armor",
        "Grants a 5 point damage bonus to dick-based tease attacks.");
    public static Cornucopia: PerkType = PerkLib.mk("Cornucopia", "Cornucopia",
        "Vaginal and Anal capacities increased by 30.");
    public static ElvenBounty: ElvenBountyPerk = new ElvenBountyPerk();
    public static FerasBoonAlpha: PerkType = PerkLib.mk("Fera's Boon - Alpha", "Fera's Boon - Alpha",
        "Increases the rate your cum builds up and cum production in general.");
    public static FerasBoonBreedingBitch: PerkType = PerkLib.mk("Fera's Boon - Breeding Bitch", "Fera's Boon - Breeding Bitch",
        "Increases fertility and reduces the time it takes to birth young.");
    public static FerasBoonMilkingTwat: PerkType = PerkLib.mk("Fera's Boon - Milking Twat", "Fera's Boon - Milking Twat",
        "Keeps your pussy from ever getting too loose and increases pregnancy speed.",
        "Keeps your pussy from ever getting too loose and increases pregnancy speed.");
    public static FerasBoonSeeder: PerkType = PerkLib.mk("Fera's Boon - Seeder", "Fera's Boon - Seeder",
        "Increases cum output by 1,000 mLs.",
        "Increases cum output by 1,000 mLs.");
    public static FerasBoonWideOpen: PerkType = PerkLib.mk("Fera's Boon - Wide Open", "Fera's Boon - Wide Open",
        "Keeps your pussy permanently gaped and increases pregnancy speed.",
        "Keeps your pussy permanently gaped and increases pregnancy speed.");
    public static FireLord: PerkType = PerkLib.mk("Fire Lord", "Fire Lord",
        "Akbal's blessings grant the ability to breathe burning green flames.");
    public static Hellfire: PerkType = PerkLib.mk("Hellfire", "Hellfire",
        "Grants a corrupted fire breath attack, like the hellhounds in the mountains.");
    public static LuststickAdapted: PerkType = PerkLib.mk("Luststick Adapted", "Luststick Adapted",
        "Grants immunity to the lust-increasing effects of lust-stick and allows its use.");
    public static MagicalFertility: PerkType = PerkLib.mk("Magical Fertility", "Magical Fertility",
        "10% higher chance of pregnancy and increased pregnancy speed.",
        "10% higher chance of pregnancy and increased pregnancy speed.");
    public static MagicalVirility: PerkType = PerkLib.mk("Magical Virility", "Magical Virility",
        "200 mLs more cum per orgasm and enhanced virility.",
        "200 mLs more cum per orgasm and enhanced virility.");
    public static MaraesGiftButtslut: PerkType = PerkLib.mk("Marae's Gift - Buttslut", "Marae's Gift - Buttslut",
        "Makes your anus provide lubrication when aroused.");
    public static MaraesGiftFertility: PerkType = PerkLib.mk("Marae's Gift - Fertility", "Marae's Gift - Fertility",
        "Greatly increases fertility and halves base pregnancy speed.");
    public static MaraesGiftProfractory: PerkType = PerkLib.mk("Marae's Gift - Profractory", "Marae's Gift - Profractory",
        "Causes your cum to build up at 3x the normal rate.");
    public static MaraesGiftStud: PerkType = PerkLib.mk("Marae's Gift - Stud", "Marae's Gift - Stud",
        "Increases your cum production and potency greatly.");
    public static MarbleResistant: PerkType = PerkLib.mk("Marble Resistant", "Marble Resistant",
        "Provides resistance to the addictive effects of bottled LaBova milk.");
    public static MarblesMilk: PerkType = PerkLib.mk("Marble's Milk", "Marble's Milk",
        "Requires you to drink LaBova milk frequently or eventually die.  You cannot shake this addiction.");
    public static Misdirection: PerkType = PerkLib.mk("Misdirection", "Misdirection",
        "Grants additional evasion chances while wearing Raphael's red bodysuit.");
    public static OmnibusGift: PerkType = PerkLib.mk("Omnibus' Gift", "Omnibus' Gift",
        "Increases minimum lust but provides some lust resistance.");
    public static OneTrackMind: PerkType = PerkLib.mk("One Track Mind", "One Track Mind",
        "Your constant desire for sex causes your sexual organs to be able to take larger insertions and disgorge greater amounts of fluid.");
    public static PilgrimsBounty: PerkType = PerkLib.mk("Pilgrim's Bounty", "Pilgrim's Bounty",
        "Causes you to always cum as hard as if you had max lust.");
    public static PureAndLoving: PerkType = PerkLib.mk("Pure and Loving", "Pure and Loving",
        "Your caring attitude towards love and romance makes you slightly more resistant to lust and corruption.");
    public static SensualLover: PerkType = PerkLib.mk("Sensual Lover", "Sensual Lover",
        "Your sensual attitude towards love and romance makes your tease ability slightly more effective.");
    public static Whispered: PerkType = PerkLib.mk("Whispered", "Whispered",
        "Akbal's blessings grant limited telepathy that can induce fear.");

    public static ControlledBreath: ControlledBreathPerk = new ControlledBreathPerk();
    public static CleansingPalm: CleansingPalmPerk = new CleansingPalmPerk();
    public static Enlightened: EnlightenedPerk = new EnlightenedPerk();


    // Monster perks
    public static Acid: PerkType = PerkLib.mk("Acid", "Acid", "");

    private static mk(id: string, name: string, desc: string, longDesc?: string): PerkType {
        return new PerkType(id, name, desc, longDesc);
    }
}
