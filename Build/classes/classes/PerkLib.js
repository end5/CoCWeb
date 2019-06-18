define(["require", "exports", "./PerkType", "./Perks/PiercedCrimstonePerk", "./Perks/PiercedFertitePerk", "./Perks/PentUpPerk", "./Perks/SluttySeductionPerk", "./Perks/WizardsEndurancePerk", "./Perks/WizardsFocusPerk", "./Perks/SpellcastingAffinityPerk", "./Perks/ElvenBountyPerk", "./Perks/ControlledBreathPerk", "./Perks/CleansingPalmPerk", "./Perks/EnlightenedPerk"], function (require, exports, PerkType_1, PiercedCrimstonePerk_1, PiercedFertitePerk_1, PentUpPerk_1, SluttySeductionPerk_1, WizardsEndurancePerk_1, WizardsFocusPerk_1, SpellcastingAffinityPerk_1, ElvenBountyPerk_1, ControlledBreathPerk_1, CleansingPalmPerk_1, EnlightenedPerk_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 26.01.14.
     */
    class PerkLib {
        static mk(id, name, desc, longDesc) {
            return new PerkType_1.PerkType(id, name, desc, longDesc);
        }
    }
    // UNSORTED perks TODO these are mostly incorrect perks: tested but never created
    PerkLib.Brawler = PerkLib.mk("Brawler", "Brawler", "Brawling experience allows you to make two unarmed attacks in a turn.", "You choose the 'Brawler' perk, allowing you to make two unarmed attacks in a turn!");
    PerkLib.Buttslut = PerkLib.mk("Buttslut", "Buttslut", "");
    PerkLib.Focused = PerkLib.mk("Focused", "Focused", "");
    /* Never used, removed because it used a numbered event. Could be re-implemented differently if some new monster actually uses it
            public static  LastStrike:PerkType = mk("Last Strike", "Last Strike",
                    "");
    */
    // Player creation perks
    PerkLib.Fast = PerkLib.mk("Fast", "Fast", "Gains speed 25% faster.");
    PerkLib.Lusty = PerkLib.mk("Lusty", "Lusty", "Gains lust 25% faster.");
    PerkLib.Sensitive = PerkLib.mk("Sensitive", "Sensitive", "Gains sensitivity 25% faster.");
    PerkLib.Smart = PerkLib.mk("Smart", "Smart", "Gains intelligence 25% faster.");
    PerkLib.Strong = PerkLib.mk("Strong", "Strong", "Gains strength 25% faster.");
    PerkLib.Tough = PerkLib.mk("Tough", "Tough", "Gains toughness 25% faster.");
    // Female creation perks
    PerkLib.BigClit = PerkLib.mk("Big Clit", "Big Clit", "Allows your clit to grow larger more easily and faster.");
    PerkLib.BigTits = PerkLib.mk("Big Tits", "Big Tits", "Makes your tits grow larger more easily.");
    PerkLib.Fertile = PerkLib.mk("Fertile", "Fertile", "Makes you 15% more likely to become pregnant.");
    PerkLib.WetPussy = PerkLib.mk("Wet Pussy", "Wet Pussy", "Keeps your pussy wet and provides a bonus to capacity.");
    // Male creation perks
    PerkLib.BigCock = PerkLib.mk("Big Cock", "Big Cock", "Gains cock size 25% faster and with less limitations.");
    PerkLib.MessyOrgasms = PerkLib.mk("Messy Orgasms", "Messy Orgasms", "Produces 50% more cum volume.");
    // History perks
    PerkLib.HistoryAlchemist = PerkLib.mk("History: Alchemist", "History: Alchemist", "Alchemical experience makes items more reactive to your body.");
    PerkLib.HistoryFighter = PerkLib.mk("History: Fighter", "History: Fighter", "A Past full of conflict increases physical damage dealt by 10%.");
    PerkLib.HistoryHealer = PerkLib.mk("History: Healer", "History: Healer", "Healing experience increases HP gains by 20%.");
    PerkLib.HistoryReligious = PerkLib.mk("History: Religious", "History: Religious", "Replaces masturbate with meditate when corruption less than or equal to 66.");
    PerkLib.HistoryScholar = PerkLib.mk("History: Scholar", "History: Scholar", "Time spent focusing your mind makes spellcasting 20% less fatiguing.");
    PerkLib.HistorySlacker = PerkLib.mk("History: Slacker", "History: Slacker", "Regenerate fatigue 20% faster.");
    PerkLib.HistorySlut = PerkLib.mk("History: Slut", "History: Slut", "Sexual experience has made you more able to handle large insertions and more resistant to stretching.");
    PerkLib.HistorySmith = PerkLib.mk("History: Smith", "History: Smith", "Knowledge of armor and fitting increases armor effectiveness by roughly 10%.");
    PerkLib.HistoryWhore = PerkLib.mk("History: Whore", "History: Whore", "Seductive experience causes your tease attacks to be 15% more effective.");
    // Ordinary (levelup) perks
    PerkLib.Acclimation = PerkLib.mk("Acclimation", "Acclimation", "Reduces lust gain by 15%.", "You choose the 'Acclimation' perk, making your body 15% more resistant to lust, up to a maximum of 75%.");
    PerkLib.Agility = PerkLib.mk("Agility", "Agility", "Boosts armor points by a portion of your speed on light/medium armors.", "You choose the 'Agility' perk, increasing the effectiveness of Light/Medium armors by a portion of your speed.");
    PerkLib.Archmage = PerkLib.mk("Archmage", "Archmage", "[if (player.inte>=75)" +
        "Increases base spell strength by 50%." +
        "|" +
        "<b>You are too dumb to gain benefit from this perk.</b>" +
        "]", "You choose the 'Archmage' perk, increasing base spell strength by 50%.");
    PerkLib.ArousingAura = PerkLib.mk("Arousing Aura", "Arousing Aura", "Exude a lust-inducing aura (Req's corruption of 70 or more)", "You choose the 'Arousing Aura' perk, causing you to radiate an aura of lust when your corruption is over 70.");
    PerkLib.Berzerker = PerkLib.mk("Berzerker", "Berzerker", "[if(player.str>=75)" +
        "Grants 'Berzerk' ability." +
        "|" +
        "<b>You aren't strong enough to benefit from this anymore.</b>" +
        "]", "You choose the 'Berzerker' perk, which unlocks the 'Berzerk' magical ability.  Berzerking increases attack and lust resistance but reduces physical defenses.");
    PerkLib.BrutalBlows = PerkLib.mk("Brutal Blows", "Brutal Blows", "[if(player.str>=75)" +
        "Reduces enemy armor with each hit." +
        "|" +
        "<b>You aren't strong enough to benefit from this anymore.</b>" +
        "]", "You choose the 'Brutal Blows' perk, which reduces enemy armor with each hit.");
    PerkLib.Channeling = PerkLib.mk("Channeling", "Channeling", "Increases base spell strength by 50%.", "You choose the 'Channeling' perk, boosting the strength of your spellcasting!");
    PerkLib.CorruptedLibido = PerkLib.mk("Corrupted Libido", "Corrupted Libido", "Reduces lust gain by 10%.", "You choose the 'Corrupted Libido' perk.  As a result of your body's corruption, you've become a bit harder to turn on. (Lust gain reduced by 10%!)");
    PerkLib.DoubleAttack = PerkLib.mk("Double Attack", "Double Attack", "[if (player.spe<50)" +
        "<b>You're too slow to double attack!</b>" +
        "|[if(player.str<61)" +
        "Allows you to perform two melee attacks per round." +
        "|" +
        "<b>You are stronger than double attack allows.  To choose between reduced strength double-attacks and a single strong attack, access \"Dbl Options\" in the perks menu.</b>" +
        "]]", "You choose the 'Double Attack' perk.  This allows you to make two attacks so long as your strength is at 60 or below.  By default your effective strength will be reduced to 60 if it is too high when double attacking.  <b>You can enter the perks menu at any time to toggle options as to how you will use this perk.</b>");
    PerkLib.Evade = PerkLib.mk("Evade", "Evade", "Increases chances of evading enemy attacks.", "You choose the 'Evade' perk, allowing you to avoid enemy attacks more often!");
    PerkLib.FertilityPlus = PerkLib.mk("Fertility+", "Fertility+", "Increases fertility rating by 15 and cum volume by up to 50%.", "You choose the 'Fertility+' perk, making it easier to get pregnant.  It also increases your cum volume by up to 50% (if appropriate)!");
    PerkLib.HotBlooded = PerkLib.mk("Hot Blooded", "Hot Blooded", "Raises minimum lust by up to 20.", "You choose the 'Hot Blooded' perk.  As a result of your enhanced libido, your lust no longer drops below 20! (If you already have some minimum lust, it will be increased by 10)");
    PerkLib.ImmovableObject = PerkLib.mk("Immovable Object", "Immovable Object", "[if(player.tou>=75)" +
        "Grants 20% physical damage reduction.</b>" +
        "|" +
        "<b>You aren't tough enough to benefit from this anymore.</b>" +
        "]", "You choose the 'Immovable Object' perk, granting 20% physical damage reduction.</b>");
    PerkLib.IronMan = PerkLib.mk("Iron Man", "Iron Man", "Reduces the fatigue cost of physical specials by 50%.", "You choose the 'Iron Man' perk, reducing the fatigue cost of physical special attacks by 50%");
    PerkLib.LightningStrikes = PerkLib.mk("Lightning Strikes", "Lightning Strikes", "[if(player.spe>=60)" +
        "Increases the attack damage for non-heavy weapons.</b>" +
        "|" +
        "<b>You are too slow to benefit from this perk.</b>" +
        "]", "You choose the 'Lightning Strikes' perk, increasing the attack damage for non-heavy weapons.</b>");
    PerkLib.LungingAttacks = PerkLib.mk("Lunging Attacks", "Lunging Attacks", "[if(player.spe>=75)" +
        "Grants 50% armor penetration for standard attacks." +
        "|" +
        "<b>You are too slow to benefit from this perk.</b>" +
        "]", "You choose the 'Lunging Attacks' perk, granting 50% armor penetration for standard attacks.");
    PerkLib.Mage = PerkLib.mk("Mage", "Mage", "Increases base spell strength by 50%.", "You choose the 'Mage' perk.  You are able to focus your magical abilities even more keenly, boosting your base spell effects by 50%.");
    PerkLib.Masochist = PerkLib.mk("Masochist", "Masochist", "Take 30% less physical damage but gain lust when damage.", "You choose the 'Masochist' perk, reducing the damage you take but raising your lust each time!  This perk only functions while your libido is at or above 60!");
    PerkLib.Medicine = PerkLib.mk("Medicine", "Medicine", "Grants 15% chance per round of cleansing poisons/drugs from your body.", "You choose the 'Medicine' perk, giving you a chance to remove debilitating poisons automatically!");
    PerkLib.Nymphomania = PerkLib.mk("Nymphomania", "Nymphomania", "Raises minimum lust by up to 30.", "You've chosen the 'Nymphomania' perk.  Due to the incredible amount of corruption you've been exposed to, you've begun to live in a state of minor constant arousal.  Your minimum lust will be increased by as much as 30 (If you already have minimum lust, the increase is 10-15).");
    PerkLib.Precision = PerkLib.mk("Precision", "Precision", "Reduces enemy armor by 10. (Req's 25+ Intelligence)", "You've chosen the 'Precision' perk.  Thanks to your intelligence, you're now more adept at finding and striking an enemy's weak points, reducing their damage resistance from armor by 10.  If your intelligence ever drops below 25 you'll no longer be smart enough to benefit from this perk.");
    PerkLib.Regeneration = PerkLib.mk("Regeneration", "Regeneration", "Regenerates 2% of max HP/hour and 1% of max HP/round.", "You choose the 'Regeneration' perk, allowing you to heal 2% of max HP every hour and 1% of max HP every round of combat!");
    PerkLib.Regeneration2 = PerkLib.mk("Regeneration 2", "Regeneration 2", "Gain 2% of max HP per round of combat and 4% of max HP per hour out of combat.", "You choose the 'Regeneration 2' perk, giving you an additional 2% of max HP per turn in combat and 4% of max HP per hour.");
    PerkLib.Resistance = PerkLib.mk("Resistance", "Resistance", "Reduces lust gain by 10%.", "You choose the 'Resistance' perk, reducing the rate at which your lust increases by 10%.");
    PerkLib.Resolute = PerkLib.mk("Resolute", "Resolute", "[if(player.tou>=75)" +
        "Grants immunity to stuns and some statuses.</b>" +
        "|" +
        "<b>You aren't tough enough to benefit from this anymore.</b>" +
        "]", "You choose the 'Resolute' perk, granting immunity to stuns and some statuses.</b>");
    PerkLib.Runner = PerkLib.mk("Runner", "Runner", "Increases chances of escaping combat.", "You choose the 'Runner' perk, increasing your chances to escape from your foes when fleeing!");
    PerkLib.Sadist = PerkLib.mk("Sadist", "Sadist", "Deal 20% more damage, but gain lust at the same time.", "You choose the 'Sadist' perk, increasing damage by 20 percent but causing you to gain lust from dealing damage.");
    PerkLib.Seduction = PerkLib.mk("Seduction", "Seduction", "Upgrades your tease attack, making it more effective.", "You choose the 'Seduction' perk, upgrading the 'tease' attack with a more powerful damage and a higher chance of success.");
    PerkLib.SpeedyRecovery = PerkLib.mk("Speedy Recovery", "Speedy Recovery", "Regain fatigue 50% faster.", "You choose the 'Speedy Recovery' perk, boosting your fatigue recovery rate!");
    PerkLib.Spellpower = PerkLib.mk("Spellpower", "Spellpower", "Increases base spell strength by 50%.", "You choose the 'Spellpower' perk.  Thanks to your sizeable intellect and willpower, you are able to more effectively use magic, boosting base spell effects by 50%.");
    PerkLib.StrongBack = PerkLib.mk("Strong Back", "Strong Back", "Enables fourth item slot.", "You choose the 'Strong Back' perk, enabling a fourth item slot.");
    PerkLib.StrongBack2 = PerkLib.mk("Strong Back 2: Strong Harder", "Strong Back 2: Strong Harder", "Enables fifth item slot.", "You choose the 'Strong Back 2: Strong Harder' perk, enabling a fifth item slot.");
    PerkLib.Tactician = PerkLib.mk("Tactician", "Tactician", "[if(player.inte>=50)" +
        "Increases critical hit chance by up to 10% (Intelligence-based)." +
        "|" +
        "<b>You are too dumb to gain benefit from this perk.</b>" +
        "]", "You choose the 'Tactician' perk, increasing critical hit chance by up to 10% (Intelligence-based).");
    PerkLib.Tank = PerkLib.mk("Tank", "Tank", "Raises max HP by 50.", "You choose the 'Tank' perk, giving you an additional 50 hp!");
    PerkLib.Tank2 = PerkLib.mk("Tank 2", "Tank 2", "+1 extra HP per point of toughness.", "You choose the 'Tank 2' perk, granting an extra maximum HP for each point of toughness.");
    PerkLib.ThunderousStrikes = PerkLib.mk("Thunderous Strikes", "Thunderous Strikes", "+20% 'Attack' damage while strength is at or above 80.", "You choose the 'Thunderous Strikes' perk, increasing normal damage by 20% while your strength is over 80.");
    PerkLib.WeaponMastery = PerkLib.mk("Weapon Mastery", "Weapon Mastery", "[if(player.str>60)" +
        "Doubles damage bonus of weapons classified as 'Large'." +
        "|" +
        "<b>You aren't strong enough to benefit from this anymore.</b>" +
        "]", "You choose the 'Weapon Mastery' perk, doubling the effectiveness of large weapons.");
    PerkLib.WellAdjusted = PerkLib.mk("Well Adjusted", "Well Adjusted", "You gain half as much lust as time passes in Mareth.", "You choose the 'Well Adjusted' perk, reducing the amount of lust you naturally gain over time while in this strange land!");
    // Needlework perks
    PerkLib.ChiReflowAttack = PerkLib.mk("Chi Reflow - Attack", "Chi Reflow - Attack", "Regular attacks boosted, but damage resistance decreased.");
    PerkLib.ChiReflowDefense = PerkLib.mk("Chi Reflow - Defense", "Chi Reflow - Defense", "Passive damage resistance, but caps speed");
    PerkLib.ChiReflowLust = PerkLib.mk("Chi Reflow - Lust", "Chi Reflow - Lust", "Lust resistance and Tease are enhanced, but Libido and Sensitivity gains increased.");
    PerkLib.ChiReflowMagic = PerkLib.mk("Chi Reflow - Magic", "Chi Reflow - Magic", "Magic attacks boosted, but regular attacks are weaker.");
    PerkLib.ChiReflowSpeed = PerkLib.mk("Chi Reflow - Speed", "Chi Reflow - Speed", "Speed reductions are halved but caps strength");
    // Piercing perks
    PerkLib.PiercedCrimstone = new PiercedCrimstonePerk_1.PiercedCrimstonePerk();
    PerkLib.PiercedFertite = new PiercedFertitePerk_1.PiercedFertitePerk();
    PerkLib.PiercedFurrite = PerkLib.mk("Pierced: Furrite", "Pierced: Furrite", "Increases chances of encountering 'furry' foes.");
    PerkLib.PiercedLethite = PerkLib.mk("Pierced: Lethite", "Pierced: Lethite", "Increases chances of encountering demonic foes.");
    // Cock sock perks
    PerkLib.LustyRegeneration = PerkLib.mk("Lusty Regeneration", "Lusty Regeneration", "Regenerates 1% of HP per round in combat and 2% of HP per hour.");
    PerkLib.MidasCock = PerkLib.mk("Midas Cock", "Midas Cock", "Increases the gems awarded from victory in battle.");
    PerkLib.PentUp = new PentUpPerk_1.PentUpPerk();
    PerkLib.PhallicPotential = PerkLib.mk("Phallic Potential", "Phallic Potential", "Increases the effects of penis-enlarging transformations.");
    PerkLib.PhallicRestraint = PerkLib.mk("Phallic Restraint", "Phallic Restraint", "Reduces the effects of penis-enlarging transformations.");
    // Armor perks
    PerkLib.BloodMage = PerkLib.mk("Blood Mage", "Blood Mage", "Spellcasting now consumes health instead of fatigue!");
    PerkLib.SluttySeduction = new SluttySeductionPerk_1.SluttySeductionPerk();
    PerkLib.WizardsEndurance = new WizardsEndurancePerk_1.WizardsEndurancePerk();
    // Weapon perks
    PerkLib.WizardsFocus = new WizardsFocusPerk_1.WizardsFocusPerk();
    // Achievement perks
    PerkLib.BroodMother = PerkLib.mk("Brood Mother", "Brood Mother", "Pregnancy moves twice as fast as a normal woman's.");
    PerkLib.SpellcastingAffinity = new SpellcastingAffinityPerk_1.SpellcastingAffinityPerk();
    // Mutation perks
    PerkLib.Androgyny = PerkLib.mk("Androgyny", "Androgyny", "No gender limits on facial masculinity or femininity.");
    PerkLib.BasiliskWomb = PerkLib.mk("Basilisk Womb", "Basilisk Womb", "Enables your eggs to be properly fertilized into basilisks of both genders!");
    PerkLib.BeeOvipositor = PerkLib.mk("Bee Ovipositor", "Bee Ovipositor", "Allows you to lay eggs through a special organ on your insect abdomen, though you need at least 10 eggs to lay.");
    PerkLib.BimboBody = PerkLib.mk("Bimbo Body", "Bimbo Body", "Gives the body of a bimbo.  Tits will never stay below a 'DD' cup, libido is raised, lust resistance is raised, and upgrades tease.");
    PerkLib.BimboBrains = PerkLib.mk("Bimbo Brains", "Bimbo Brains", "Now that you've drank bimbo liquer, you'll never, like, have the attention span and intelligence you once did!  But it's okay, 'cause you get to be so horny an' stuff!");
    PerkLib.BroBody = PerkLib.mk("Bro Body", "Bro Body", "Grants an ubermasculine body that's sure to impress.");
    PerkLib.BroBrains = PerkLib.mk("Bro Brains", "Bro Brains", "Makes thou... thin... fuck, that shit's for nerds.");
    PerkLib.BunnyEggs = PerkLib.mk("Bunny Eggs", "Bunny Eggs", "Laying eggs has become a normal part of your bunny-body's routine.");
    PerkLib.CorruptedNinetails = PerkLib.mk("Corrupted Nine-tails", "Corrupted Nine-tails", "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells, but your method of attaining it has corrupted the transformation, preventing you from achieving true enlightenment.");
    PerkLib.Diapause = PerkLib.mk("Diapause", "Diapause", "Pregnancy does not advance normally, but develops quickly after taking in fluids.");
    PerkLib.Dragonfire = PerkLib.mk("Dragonfire", "Dragonfire", "Allows access to a dragon breath attack.");
    PerkLib.EnlightenedNinetails = PerkLib.mk("Enlightened Nine-tails", "Enlightened Nine-tails", "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells.");
    PerkLib.Feeder = PerkLib.mk("Feeder", "Feeder", "Lactation does not decrease and gives a compulsion to breastfeed others.");
    PerkLib.Flexibility = PerkLib.mk("Flexibility", "Flexibility", "Grants cat-like flexibility.  Useful for dodging and 'fun'.");
    PerkLib.FutaFaculties = PerkLib.mk("Futa Faculties", "Futa Faculties", "It's super hard to think about stuff that like, isn't working out or fucking!");
    PerkLib.FutaForm = PerkLib.mk("Futa Form", "Futa Form", "Ensures that your body fits the Futa look (Tits DD+, Dick 8\"+, & Pussy).  Also keeps your lusts burning bright and improves the tease skill.");
    PerkLib.HarpyWomb = PerkLib.mk("Harpy Womb", "Harpy Womb", "Increases all laid eggs to large size so long as you have harpy legs and a harpy tail.");
    PerkLib.Incorporeality = PerkLib.mk("Incorporeality", "Incorporeality", "Allows you to fade into a ghost-like state and temporarily possess others.");
    PerkLib.MinotaurCumAddict = PerkLib.mk("Minotaur Cum Addict", "Minotaur Cum Addict", "Causes you to crave minotaur cum frequently.  You cannot shake this addiction.");
    PerkLib.Oviposition = PerkLib.mk("Oviposition", "Oviposition", "Causes you to regularly lay eggs when not otherwise pregnant.");
    PerkLib.PurityBlessing = PerkLib.mk("Purity Blessing", "Purity Blessing", "Reduces the rate at which your corruption, libido, and lust increase.");
    PerkLib.SlimeCore = PerkLib.mk("Slime Core", "Slime Core", "Grants more control over your slimy body, allowing you to go twice as long without fluids.");
    PerkLib.SpiderOvipositor = PerkLib.mk("Spider Ovipositor", "Spider Ovipositor", "Allows you to lay eggs through a special organ on your arachnid abdomen, though you need at least 10 eggs to lay.");
    PerkLib.ThickSkin = PerkLib.mk("Thick Skin", "Thick Skin", "Toughens your dermis to provide 2 points of armor.");
    // Quest, Event & NPC perks
    PerkLib.BulgeArmor = PerkLib.mk("Bulge Armor", "Bulge Armor", "Grants a 5 point damage bonus to dick-based tease attacks.");
    PerkLib.Cornucopia = PerkLib.mk("Cornucopia", "Cornucopia", "Vaginal and Anal capacities increased by 30.");
    PerkLib.ElvenBounty = new ElvenBountyPerk_1.ElvenBountyPerk();
    PerkLib.FerasBoonAlpha = PerkLib.mk("Fera's Boon - Alpha", "Fera's Boon - Alpha", "Increases the rate your cum builds up and cum production in general.");
    PerkLib.FerasBoonBreedingBitch = PerkLib.mk("Fera's Boon - Breeding Bitch", "Fera's Boon - Breeding Bitch", "Increases fertility and reduces the time it takes to birth young.");
    PerkLib.FerasBoonMilkingTwat = PerkLib.mk("Fera's Boon - Milking Twat", "Fera's Boon - Milking Twat", "Keeps your pussy from ever getting too loose and increases pregnancy speed.", "Keeps your pussy from ever getting too loose and increases pregnancy speed.");
    PerkLib.FerasBoonSeeder = PerkLib.mk("Fera's Boon - Seeder", "Fera's Boon - Seeder", "Increases cum output by 1,000 mLs.", "Increases cum output by 1,000 mLs.");
    PerkLib.FerasBoonWideOpen = PerkLib.mk("Fera's Boon - Wide Open", "Fera's Boon - Wide Open", "Keeps your pussy permanently gaped and increases pregnancy speed.", "Keeps your pussy permanently gaped and increases pregnancy speed.");
    PerkLib.FireLord = PerkLib.mk("Fire Lord", "Fire Lord", "Akbal's blessings grant the ability to breathe burning green flames.");
    PerkLib.Hellfire = PerkLib.mk("Hellfire", "Hellfire", "Grants a corrupted fire breath attack, like the hellhounds in the mountains.");
    PerkLib.LuststickAdapted = PerkLib.mk("Luststick Adapted", "Luststick Adapted", "Grants immunity to the lust-increasing effects of lust-stick and allows its use.");
    PerkLib.MagicalFertility = PerkLib.mk("Magical Fertility", "Magical Fertility", "10% higher chance of pregnancy and increased pregnancy speed.", "10% higher chance of pregnancy and increased pregnancy speed.");
    PerkLib.MagicalVirility = PerkLib.mk("Magical Virility", "Magical Virility", "200 mLs more cum per orgasm and enhanced virility.", "200 mLs more cum per orgasm and enhanced virility.");
    PerkLib.MaraesGiftButtslut = PerkLib.mk("Marae's Gift - Buttslut", "Marae's Gift - Buttslut", "Makes your anus provide lubrication when aroused.");
    PerkLib.MaraesGiftFertility = PerkLib.mk("Marae's Gift - Fertility", "Marae's Gift - Fertility", "Greatly increases fertility and halves base pregnancy speed.");
    PerkLib.MaraesGiftProfractory = PerkLib.mk("Marae's Gift - Profractory", "Marae's Gift - Profractory", "Causes your cum to build up at 3x the normal rate.");
    PerkLib.MaraesGiftStud = PerkLib.mk("Marae's Gift - Stud", "Marae's Gift - Stud", "Increases your cum production and potency greatly.");
    PerkLib.MarbleResistant = PerkLib.mk("Marble Resistant", "Marble Resistant", "Provides resistance to the addictive effects of bottled LaBova milk.");
    PerkLib.MarblesMilk = PerkLib.mk("Marble's Milk", "Marble's Milk", "Requires you to drink LaBova milk frequently or eventually die.  You cannot shake this addiction.");
    PerkLib.Misdirection = PerkLib.mk("Misdirection", "Misdirection", "Grants additional evasion chances while wearing Raphael's red bodysuit.");
    PerkLib.OmnibusGift = PerkLib.mk("Omnibus' Gift", "Omnibus' Gift", "Increases minimum lust but provides some lust resistance.");
    PerkLib.OneTrackMind = PerkLib.mk("One Track Mind", "One Track Mind", "Your constant desire for sex causes your sexual organs to be able to take larger insertions and disgorge greater amounts of fluid.");
    PerkLib.PilgrimsBounty = PerkLib.mk("Pilgrim's Bounty", "Pilgrim's Bounty", "Causes you to always cum as hard as if you had max lust.");
    PerkLib.PureAndLoving = PerkLib.mk("Pure and Loving", "Pure and Loving", "Your caring attitude towards love and romance makes you slightly more resistant to lust and corruption.");
    PerkLib.SensualLover = PerkLib.mk("Sensual Lover", "Sensual Lover", "Your sensual attitude towards love and romance makes your tease ability slightly more effective.");
    PerkLib.Whispered = PerkLib.mk("Whispered", "Whispered", "Akbal's blessings grant limited telepathy that can induce fear.");
    PerkLib.ControlledBreath = new ControlledBreathPerk_1.ControlledBreathPerk();
    PerkLib.CleansingPalm = new CleansingPalmPerk_1.CleansingPalmPerk();
    PerkLib.Enlightened = new EnlightenedPerk_1.EnlightenedPerk();
    // Monster perks
    PerkLib.Acid = PerkLib.mk("Acid", "Acid", "");
    exports.PerkLib = PerkLib;
});
//# sourceMappingURL=PerkLib.js.map