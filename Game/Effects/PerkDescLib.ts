import { PerkType } from './PerkType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { ControlledBreath } from './PerkDescs/ControlledBreath';
import { Archmage } from './PerkDescs/Archmage';
import { Berzerker } from './PerkDescs/Berzerker';
import { BrutalBlows } from './PerkDescs/BrutalBlows';
import { DoubleAttack } from './PerkDescs/DoubleAttack';
import { ImmovableObject } from './PerkDescs/ImmovableObject';
import { LightningStrikes } from './PerkDescs/LightningStrikes';
import { LungingAttacks } from './PerkDescs/LungingAttacks';
import { Resolute } from './PerkDescs/Resolute';
import { Tactician } from './PerkDescs/Tactician';
import { WeaponMastery } from './PerkDescs/WeaponMastery';
import { PiercedCrimstone } from './PerkDescs/PiercedCrimstone';
import { PiercedFertite } from './PerkDescs/PiercedFertite';
import { PentUp } from './PerkDescs/PentUp';
import { SluttySeduction } from './PerkDescs/SluttySeduction';
import { WizardsEndurance } from './PerkDescs/WizardsEndurance';
import { WizardsFocus } from './PerkDescs/WizardsFocus';
import { SpellcastingAffinity } from './PerkDescs/SpellcastingAffinity';
import { ElvenBounty } from './PerkDescs/ElvenBounty';
import { Enlightened } from './PerkDescs/Enlightened';
import { CleansingPalm } from './PerkDescs/CleansingPalm';
import { PerkDesc } from './PerkDesc';

export const PerkDescLib = new Dictionary<PerkType, PerkDesc>();
PerkDescLib.set(PerkType.Brawler, new PerkDesc(PerkType.Brawler, "Brawler",
    "Brawling experience allows you to make two unarmed attacks in a turn.",
    "You choose the 'Brawler' perk, allowing you to make two unarmed attacks in a turn!"));
PerkDescLib.set(PerkType.Buttslut, new PerkDesc(PerkType.Buttslut, "Buttslut", "Buttslut", ""));
PerkDescLib.set(PerkType.Focused, new PerkDesc(PerkType.Focused, "Focused", "Focused", ""));

// Player creation perks
PerkDescLib.set(PerkType.Fast, new PerkDesc(PerkType.Fast, "Fast", "Fast",
    "Gains speed 25% faster."));
PerkDescLib.set(PerkType.Lusty, new PerkDesc(PerkType.Lusty, "Lusty", "Lusty",
    "Gains lust 25% faster."));
PerkDescLib.set(PerkType.Sensitive, new PerkDesc(PerkType.Sensitive, "Sensitive", "Sensitive",
    "Gains sensitivity 25% faster."));
PerkDescLib.set(PerkType.Smart, new PerkDesc(PerkType.Smart, "Smart", "Smart",
    "Gains intelligence 25% faster."));
PerkDescLib.set(PerkType.Strong, new PerkDesc(PerkType.Strong, "Strong", "Strong",
    "Gains strength 25% faster."));
PerkDescLib.set(PerkType.Tough, new PerkDesc(PerkType.Tough, "Tough", "Tough",
    "Gains toughness 25% faster."));

// Female creation perks
PerkDescLib.set(PerkType.BigClit, new PerkDesc(PerkType.BigClit, "Big Clit", "Big Clit",
    "Allows your clit to grow larger more easily and faster."));
PerkDescLib.set(PerkType.BigTits, new PerkDesc(PerkType.BigTits, "Big Tits", "Big Tits",
    "Makes your tits grow larger more easily."));
PerkDescLib.set(PerkType.Fertile, new PerkDesc(PerkType.Fertile, "Fertile", "Fertile",
    "Makes you 15% more likely to become pregnant."));
PerkDescLib.set(PerkType.WetPussy, new PerkDesc(PerkType.WetPussy, "Wet Pussy", "Wet Pussy",
    "Keeps your pussy wet and provides a bonus to capacity."));

// Male creation perks
PerkDescLib.set(PerkType.BigCock, new PerkDesc(PerkType.BigCock, "Big Cock", "Big Cock",
    "Gains cock size 25% faster and with less limitations."));
PerkDescLib.set(PerkType.MessyOrgasms, new PerkDesc(PerkType.MessyOrgasms, "Messy Orgasms", "Messy Orgasms",
    "Produces 50% more cum volume."));

// History perks
PerkDescLib.set(PerkType.HistoryAlchemist, new PerkDesc(PerkType.HistoryAlchemist, "History: Alchemist", "History: Alchemist",
    "Alchemical experience makes items more reactive to your body."));
PerkDescLib.set(PerkType.HistoryFighter, new PerkDesc(PerkType.HistoryFighter, "History: Fighter", "History: Fighter",
    "A Past full of conflict increases physical damage dealt by 10%."));
PerkDescLib.set(PerkType.HistoryHealer, new PerkDesc(PerkType.HistoryHealer, "History: Healer", "History: Healer",
    "Healing experience increases HP gains by 20%."));
PerkDescLib.set(PerkType.HistoryReligious, new PerkDesc(PerkType.HistoryReligious, "History: Religious", "History: Religious",
    "Replaces masturbate with meditate when corruption less than or equal to 66."));
PerkDescLib.set(PerkType.HistoryScholar, new PerkDesc(PerkType.HistoryScholar, "History: Scholar", "History: Scholar",
    "Time spent focusing your mind makes spellcasting 20% less fatiguing."));
PerkDescLib.set(PerkType.HistorySlacker, new PerkDesc(PerkType.HistorySlacker, "History: Slacker", "History: Slacker",
    "Regenerate fatigue 20% faster."));
PerkDescLib.set(PerkType.HistorySlut, new PerkDesc(PerkType.HistorySlut, "History: Slut", "History: Slut",
    "Sexual experience has made you more able to handle large insertions and more resistant to stretching."));
PerkDescLib.set(PerkType.HistorySmith, new PerkDesc(PerkType.HistorySmith, "History: Smith", "History: Smith",
    "Knowledge of armor and fitting increases armor effectiveness by roughly 10%."));
PerkDescLib.set(PerkType.HistoryWhore, new PerkDesc(PerkType.HistoryWhore, "History: Whore", "History: Whore",
    "Seductive experience causes your tease attacks to be 15% more effective."));

// Ordinary (levelup) perks
PerkDescLib.set(PerkType.Acclimation, new PerkDesc(PerkType.Acclimation, "Acclimation",
    "Reduces lust gain by 15%.",
    "You choose the 'Acclimation' perk, making your body 15% more resistant to lust, up to a maximum of 75%."));
PerkDescLib.set(PerkType.Agility, new PerkDesc(PerkType.Agility, "Agility",
    "Boosts armor points by a portion of your speed on light/medium armors.",
    "You choose the 'Agility' perk, increasing the effectiveness of Light/Medium armors by a portion of your speed."));
PerkDescLib.set(PerkType.Archmage, new Archmage());
PerkDescLib.set(PerkType.ArousingAura, new PerkDesc(PerkType.ArousingAura, "Arousing Aura",
    "Exude a lust-inducing aura (Req's corruption of 70 or more)",
    "You choose the 'Arousing Aura' perk, causing you to radiate an aura of lust when your corruption is over 70."));
PerkDescLib.set(PerkType.Berzerker, new Berzerker());
PerkDescLib.set(PerkType.BrutalBlows, new BrutalBlows());
PerkDescLib.set(PerkType.Channeling, new PerkDesc(PerkType.Channeling, "Channeling",
    "Increases base spell strength by 50%.",
    "You choose the 'Channeling' perk, boosting the strength of your spellcasting!"));
PerkDescLib.set(PerkType.CorruptedLibido, new PerkDesc(PerkType.CorruptedLibido, "Corrupted Libido",
    "Reduces lust gain by 10%.",
    "You choose the 'Corrupted Libido' perk.  As a result of your body's corruption, you've become a bit harder to turn on. (Lust gain reduced by 10%!)"));
PerkDescLib.set(PerkType.DoubleAttack, new DoubleAttack());
PerkDescLib.set(PerkType.Evade, new PerkDesc(PerkType.Evade, "Evade",
    "Increases chances of evading enemy attacks.",
    "You choose the 'Evade' perk, allowing you to avoid enemy attacks more often!"));
PerkDescLib.set(PerkType.FertilityPlus, new PerkDesc(PerkType.FertilityPlus, "Fertility+",
    "Increases fertility rating by 15 and cum volume by up to 50%.",
    "You choose the 'Fertility+' perk, making it easier to get pregnant.  It also increases your cum volume by up to 50% (if appropriate)!"));
PerkDescLib.set(PerkType.HotBlooded, new PerkDesc(PerkType.HotBlooded, "Hot Blooded",
    "Raises minimum lust by up to 20.",
    "You choose the 'Hot Blooded' perk.  As a result of your enhanced libido, your lust no longer drops below 20! (If you already have some minimum lust, it will be increased by 10)"));
PerkDescLib.set(PerkType.ImmovableObject, new ImmovableObject());
PerkDescLib.set(PerkType.IronMan, new PerkDesc(PerkType.IronMan, "Iron Man",
    "Reduces the fatigue cost of physical specials by 50%.",
    "You choose the 'Iron Man' perk, reducing the fatigue cost of physical special attacks by 50%"));
PerkDescLib.set(PerkType.LightningStrikes, new LightningStrikes());
PerkDescLib.set(PerkType.LungingAttacks, new LungingAttacks());
PerkDescLib.set(PerkType.Mage, new PerkDesc(PerkType.Mage, "Mage",
    "Increases base spell strength by 50%.",
    "You choose the 'Mage' perk.  You are able to focus your magical abilities even more keenly, boosting your base spell effects by 50%."));
PerkDescLib.set(PerkType.Masochist, new PerkDesc(PerkType.Masochist, "Masochist",
    "Take 30% less physical damage but gain lust when damage.",
    "You choose the 'Masochist' perk, reducing the damage you take but raising your lust each time!  This perk only functions while your libido is at or above 60!"));
PerkDescLib.set(PerkType.Medicine, new PerkDesc(PerkType.Medicine, "Medicine",
    "Grants 15% chance per round of cleansing poisons/drugs from your body.",
    "You choose the 'Medicine' perk, giving you a chance to remove debilitating poisons automatically!"));
PerkDescLib.set(PerkType.Nymphomania, new PerkDesc(PerkType.Nymphomania, "Nymphomania",
    "Raises minimum lust by up to 30.",
    "You've chosen the 'Nymphomania' perk.  Due to the incredible amount of corruption you've been exposed to, you've begun to live in a state of minor constant arousal.  Your minimum lust will be increased by as much as 30 (If you already have minimum lust, the increase is 10-15)."));
PerkDescLib.set(PerkType.Precision, new PerkDesc(PerkType.Precision, "Precision",
    "Reduces enemy armor by 10. (Req's 25+ Intelligence)",
    "You've chosen the 'Precision' perk.  Thanks to your intelligence, you're now more adept at finding and striking an enemy's weak points, reducing their damage resistance from armor by 10.  If your intelligence ever drops below 25 you'll no longer be smart enough to benefit from this perk."));
PerkDescLib.set(PerkType.Regeneration, new PerkDesc(PerkType.Regeneration, "Regeneration",
    "Regenerates 2% of max HP/hour and 1% of max HP/round.",
    "You choose the 'Regeneration' perk, allowing you to heal 2% of max HP every hour and 1% of max HP every round of combat!"));
PerkDescLib.set(PerkType.Regeneration2, new PerkDesc(PerkType.Regeneration2, "Regeneration 2",
    "Gain 2% of max HP per round of combat and 4% of max HP per hour out of combat.",
    "You choose the 'Regeneration 2' perk, giving you an additional 2% of max HP per turn in combat and 4% of max HP per hour."));
PerkDescLib.set(PerkType.Resistance, new PerkDesc(PerkType.Resistance, "Resistance",
    "Reduces lust gain by 10%.",
    "You choose the 'Resistance' perk, reducing the rate at which your lust increases by 10%."));
PerkDescLib.set(PerkType.Resolute, new Resolute());
PerkDescLib.set(PerkType.Runner, new PerkDesc(PerkType.Runner, "Runner",
    "Increases chances of escaping combat.",
    "You choose the 'Runner' perk, increasing your chances to escape from your foes when fleeing!"));
PerkDescLib.set(PerkType.Sadist, new PerkDesc(PerkType.Sadist, "Sadist",
    "Deal 20% more damage, but gain lust at the same time.",
    "You choose the 'Sadist' perk, increasing damage by 20 percent but causing you to gain lust from dealing damage."));
PerkDescLib.set(PerkType.Seduction, new PerkDesc(PerkType.Seduction, "Seduction",
    "Upgrades your tease attack, making it more effective.",
    "You choose the 'Seduction' perk, upgrading the 'tease' attack with a more powerful damage and a higher chance of success."));
PerkDescLib.set(PerkType.SpeedyRecovery, new PerkDesc(PerkType.SpeedyRecovery, "Speedy Recovery",
    "Regain fatigue 50% faster.",
    "You choose the 'Speedy Recovery' perk, boosting your fatigue recovery rate!"));
PerkDescLib.set(PerkType.Spellpower, new PerkDesc(PerkType.Spellpower, "Spellpower",
    "Increases base spell strength by 50%.",
    "You choose the 'Spellpower' perk.  Thanks to your sizeable intellect and willpower, you are able to more effectively use magic, boosting base spell effects by 50%."));
PerkDescLib.set(PerkType.StrongBack, new PerkDesc(PerkType.StrongBack, "Strong Back",
    "Enables fourth item slot.",
    "You choose the 'Strong Back' perk, enabling a fourth item slot."));
PerkDescLib.set(PerkType.StrongBack2, new PerkDesc(PerkType.StrongBack2, "Strong Back 2: Strong Harder",
    "Enables fifth item slot.",
    "You choose the 'Strong Back 2: Strong Harder' perk, enabling a fifth item slot."));
PerkDescLib.set(PerkType.Tactician, new Tactician());
PerkDescLib.set(PerkType.Tank, new PerkDesc(PerkType.Tank, "Tank",
    "Raises max HP by 50.",
    "You choose the 'Tank' perk, giving you an additional 50 hp!"));
PerkDescLib.set(PerkType.Tank2, new PerkDesc(PerkType.Tank2, "Tank 2",
    "+1 extra HP per point of toughness.",
    "You choose the 'Tank 2' perk, granting an extra maximum HP for each point of toughness."));
PerkDescLib.set(PerkType.ThunderousStrikes, new PerkDesc(PerkType.ThunderousStrikes, "Thunderous Strikes",
    "+20% 'Attack' damage while strength is at or above 80.",
    "You choose the 'Thunderous Strikes' perk, increasing normal damage by 20% while your strength is over 80."));
PerkDescLib.set(PerkType.WeaponMastery, new WeaponMastery());
PerkDescLib.set(PerkType.WellAdjusted, new PerkDesc(PerkType.WellAdjusted, "Well Adjusted",
    "You gain half as much lust as time passes in Mareth.",
    "You choose the 'Well Adjusted' perk, reducing the amount of lust you naturally gain over time while in this strange land!"));

// Needlework perks
PerkDescLib.set(PerkType.ChiReflowAttack, new PerkDesc(PerkType.ChiReflowAttack, "Chi Reflow - Attack", "Chi Reflow - Attack",
    "Regular attacks boosted, but damage resistance decreased."));
PerkDescLib.set(PerkType.ChiReflowDefense, new PerkDesc(PerkType.ChiReflowDefense, "Chi Reflow - Defense", "Chi Reflow - Defense",
    "Passive damage resistance, but caps speed"));
PerkDescLib.set(PerkType.ChiReflowLust, new PerkDesc(PerkType.ChiReflowLust, "Chi Reflow - Lust", "Chi Reflow - Lust",
    "Lust resistance and Tease are enhanced, but Libido and Sensitivity gains increased."));
PerkDescLib.set(PerkType.ChiReflowMagic, new PerkDesc(PerkType.ChiReflowMagic, "Chi Reflow - Magic", "Chi Reflow - Magic",
    "Magic attacks boosted, but regular attacks are weaker."));
PerkDescLib.set(PerkType.ChiReflowSpeed, new PerkDesc(PerkType.ChiReflowSpeed, "Chi Reflow - Speed", "Chi Reflow - Speed",
    "Speed reductions are halved but caps strength"));

// Piercing perks
PerkDescLib.set(PerkType.PiercedCrimstone, new PiercedCrimstone());
PerkDescLib.set(PerkType.PiercedFertite, new PiercedFertite());
PerkDescLib.set(PerkType.PiercedFurrite, new PerkDesc(PerkType.PiercedFurrite, "Pierced: Furrite", "Pierced: Furrite",
    "Increases chances of encountering 'furry' foes."));
PerkDescLib.set(PerkType.PiercedLethite, new PerkDesc(PerkType.PiercedLethite, "Pierced: Lethite", "Pierced: Lethite",
    "Increases chances of encountering demonic foes."));

// Cock sock perks
PerkDescLib.set(PerkType.LustyRegeneration, new PerkDesc(PerkType.LustyRegeneration, "Lusty Regeneration", "Lusty Regeneration",
    "Regenerates 1% of HP per round in combat and 2% of HP per hour."));
PerkDescLib.set(PerkType.MidasCock, new PerkDesc(PerkType.MidasCock, "Midas Cock", "Midas Cock",
    "Increases the gems awarded from victory in battle."));
PerkDescLib.set(PerkType.PentUp, new PentUp());
PerkDescLib.set(PerkType.PhallicPotential, new PerkDesc(PerkType.PhallicPotential, "Phallic Potential", "Phallic Potential",
    "Increases the effects of penis-enlarging transformations."));
PerkDescLib.set(PerkType.PhallicRestraint, new PerkDesc(PerkType.PhallicRestraint, "Phallic Restraint", "Phallic Restraint",
    "Reduces the effects of penis-enlarging transformations."));

// Armor perks
PerkDescLib.set(PerkType.BloodMage, new PerkDesc(PerkType.BloodMage, "Blood Mage", "Blood Mage",
    "Spellcasting now consumes health instead of fatigue!"));
PerkDescLib.set(PerkType.SluttySeduction, new SluttySeduction());
PerkDescLib.set(PerkType.WizardsEndurance, new WizardsEndurance());

// Weapon perks
PerkDescLib.set(PerkType.WizardsFocus, new WizardsFocus());

// Achievement perks
PerkDescLib.set(PerkType.BroodMother, new PerkDesc(PerkType.BroodMother, "Brood Mother", "Brood Mother",
    "Pregnancy moves twice as fast as a normal woman's."));
PerkDescLib.set(PerkType.SpellcastingAffinity, new SpellcastingAffinity());

// Mutation perks
PerkDescLib.set(PerkType.Androgyny, new PerkDesc(PerkType.Androgyny, "Androgyny", "Androgyny",
    "No gender limits on facial masculinity or femininity."));
PerkDescLib.set(PerkType.BasiliskWomb, new PerkDesc(PerkType.BasiliskWomb, "Basilisk Womb", "Basilisk Womb",
    "Enables your eggs to be properly fertilized into basilisks of both genders!"));
PerkDescLib.set(PerkType.BeeOvipositor, new PerkDesc(PerkType.BeeOvipositor, "Bee Ovipositor", "Bee Ovipositor",
    "Allows you to lay eggs through a special organ on your insect abdomen, though you need at least 10 eggs to lay."));
PerkDescLib.set(PerkType.BimboBody, new PerkDesc(PerkType.BimboBody, "Bimbo Body", "Bimbo Body",
    "Gives the body of a bimbo.  Tits will never stay below a 'DD' cup, libido is raised, lust resistance is raised, and upgrades tease."));
PerkDescLib.set(PerkType.BimboBrains, new PerkDesc(PerkType.BimboBrains, "Bimbo Brains", "Bimbo Brains",
    "Now that you've drank bimbo liquer, you'll never, like, have the attention span and intelligence you once did!  But it's okay, 'cause you get to be so horny an' stuff!"));
PerkDescLib.set(PerkType.BroBody, new PerkDesc(PerkType.BroBody, "Bro Body", "Bro Body",
    "Grants an ubermasculine body that's sure to impress."));
PerkDescLib.set(PerkType.BroBrains, new PerkDesc(PerkType.BroBrains, "Bro Brains", "Bro Brains",
    "Makes thou... thin... fuck, that shit's for nerds."));
PerkDescLib.set(PerkType.BunnyEggs, new PerkDesc(PerkType.BunnyEggs, "Bunny Eggs", "Bunny Eggs",
    "Laying eggs has become a normal part of your bunny-body's routine."));
PerkDescLib.set(PerkType.CorruptedNinetails, new PerkDesc(PerkType.CorruptedNinetails, "Corrupted Nine-tails", "Corrupted Nine-tails",
    "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells, but your method of attaining it has corrupted the transformation, preventing you from achieving true enlightenment."));
PerkDescLib.set(PerkType.Diapause, new PerkDesc(PerkType.Diapause, "Diapause", "Diapause",
    "Pregnancy does not advance normally, but develops quickly after taking in fluids."));
PerkDescLib.set(PerkType.Dragonfire, new PerkDesc(PerkType.Dragonfire, "Dragonfire", "Dragonfire",
    "Allows access to a dragon breath attack."));
PerkDescLib.set(PerkType.EnlightenedNinetails, new PerkDesc(PerkType.EnlightenedNinetails, "Enlightened Nine-tails", "Enlightened Nine-tails",
    "The mystical energy of the nine-tails surges through you, filling you with phenomenal cosmic power!  Your boundless magic allows you to recover quickly after casting spells."));
PerkDescLib.set(PerkType.Feeder, new PerkDesc(PerkType.Feeder, "Feeder", "Feeder",
    "Lactation does not decrease and gives a compulsion to breastfeed others."));
PerkDescLib.set(PerkType.Flexibility, new PerkDesc(PerkType.Flexibility, "Flexibility", "Flexibility",
    "Grants cat-like flexibility.  Useful for dodging and 'fun'."));
PerkDescLib.set(PerkType.FutaFaculties, new PerkDesc(PerkType.FutaFaculties, "Futa Faculties", "Futa Faculties",
    "It's super hard to think about stuff that like, isn't working out or fucking!"));
PerkDescLib.set(PerkType.FutaForm, new PerkDesc(PerkType.FutaForm, "Futa Form", "Futa Form",
    "Ensures that your body fits the Futa look (Tits DD+, Dick 8\"+, & Pussy).  Also keeps your lusts burning bright and improves the tease skill."));
PerkDescLib.set(PerkType.HarpyWomb, new PerkDesc(PerkType.HarpyWomb, "Harpy Womb", "Harpy Womb",
    "Increases all laid eggs to large size so long as you have harpy legs and a harpy tail."));
PerkDescLib.set(PerkType.Incorporeality, new PerkDesc(PerkType.Incorporeality, "Incorporeality", "Incorporeality",
    "Allows you to fade into a ghost-like state and temporarily possess others."));
PerkDescLib.set(PerkType.MinotaurCumAddict, new PerkDesc(PerkType.MinotaurCumAddict, "Minotaur Cum Addict", "Minotaur Cum Addict",
    "Causes you to crave minotaur cum frequently.  You cannot shake this addiction."));
PerkDescLib.set(PerkType.Oviposition, new PerkDesc(PerkType.Oviposition, "Oviposition", "Oviposition",
    "Causes you to regularly lay eggs when not otherwise pregnant."));
PerkDescLib.set(PerkType.PurityBlessing, new PerkDesc(PerkType.PurityBlessing, "Purity Blessing", "Purity Blessing",
    "Reduces the rate at which your corruption, libido, and lust increase."));
PerkDescLib.set(PerkType.SlimeCore, new PerkDesc(PerkType.SlimeCore, "Slime Core", "Slime Core",
    "Grants more control over your slimy body, allowing you to go twice as long without fluids."));
PerkDescLib.set(PerkType.SpiderOvipositor, new PerkDesc(PerkType.SpiderOvipositor, "Spider Ovipositor", "Spider Ovipositor",
    "Allows you to lay eggs through a special organ on your arachnid abdomen, though you need at least 10 eggs to lay."));
PerkDescLib.set(PerkType.ThickSkin, new PerkDesc(PerkType.ThickSkin, "Thick Skin", "Thick Skin",
    "Toughens your dermis to provide 2 points of armor."));

// Quest, Event & NPC perks
PerkDescLib.set(PerkType.BulgeArmor, new PerkDesc(PerkType.BulgeArmor, "Bulge Armor", "Bulge Armor",
    "Grants a 5 point damage bonus to dick-based tease attacks."));
PerkDescLib.set(PerkType.Cornucopia, new PerkDesc(PerkType.Cornucopia, "Cornucopia", "Cornucopia",
    "Vaginal and Anal capacities increased by 30."));
PerkDescLib.set(PerkType.ElvenBounty, new ElvenBounty());
PerkDescLib.set(PerkType.FerasBoonAlpha, new PerkDesc(PerkType.FerasBoonAlpha, "Fera's Boon - Alpha", "Fera's Boon - Alpha",
    "Increases the rate your cum builds up and cum production in general."));
PerkDescLib.set(PerkType.FerasBoonBreedingBitch, new PerkDesc(PerkType.FerasBoonBreedingBitch, "Fera's Boon - Breeding Bitch", "Fera's Boon - Breeding Bitch",
    "Increases fertility and reduces the time it takes to birth young."));
PerkDescLib.set(PerkType.FerasBoonMilkingTwat, new PerkDesc(PerkType.FerasBoonMilkingTwat, "Fera's Boon - Milking Twat",
    "Keeps your pussy from ever getting too loose and increases pregnancy speed.",
    "Keeps your pussy from ever getting too loose and increases pregnancy speed."));
PerkDescLib.set(PerkType.FerasBoonSeeder, new PerkDesc(PerkType.FerasBoonSeeder, "Fera's Boon - Seeder",
    "Increases cum output by 1,000 mLs.",
    "Increases cum output by 1,000 mLs."));
PerkDescLib.set(PerkType.FerasBoonWideOpen, new PerkDesc(PerkType.FerasBoonWideOpen, "Fera's Boon - Wide Open",
    "Keeps your pussy permanently gaped and increases pregnancy speed.",
    "Keeps your pussy permanently gaped and increases pregnancy speed."));
PerkDescLib.set(PerkType.FireLord, new PerkDesc(PerkType.FireLord, "Fire Lord", "Fire Lord",
    "Akbal's blessings grant the ability to breathe burning green flames."));
PerkDescLib.set(PerkType.Hellfire, new PerkDesc(PerkType.Hellfire, "Hellfire", "Hellfire",
    "Grants a corrupted fire breath attack, like the hellhounds in the mountains."));
PerkDescLib.set(PerkType.LuststickAdapted, new PerkDesc(PerkType.LuststickAdapted, "Luststick Adapted", "Luststick Adapted",
    "Grants immunity to the lust-increasing effects of lust-stick and allows its use."));
PerkDescLib.set(PerkType.MagicalFertility, new PerkDesc(PerkType.MagicalFertility, "Magical Fertility",
    "10% higher chance of pregnancy and increased pregnancy speed.",
    "10% higher chance of pregnancy and increased pregnancy speed."));
PerkDescLib.set(PerkType.MagicalVirility, new PerkDesc(PerkType.MagicalVirility, "Magical Virility",
    "200 mLs more cum per orgasm and enhanced virility.",
    "200 mLs more cum per orgasm and enhanced virility."));
PerkDescLib.set(PerkType.MaraesGiftButtslut, new PerkDesc(PerkType.MaraesGiftButtslut, "Marae's Gift - Buttslut", "Marae's Gift - Buttslut",
    "Makes your anus provide lubrication when aroused."));
PerkDescLib.set(PerkType.MaraesGiftFertility, new PerkDesc(PerkType.MaraesGiftFertility, "Marae's Gift - Fertility", "Marae's Gift - Fertility",
    "Greatly increases fertility and halves base pregnancy speed."));
PerkDescLib.set(PerkType.MaraesGiftProfractory, new PerkDesc(PerkType.MaraesGiftProfractory, "Marae's Gift - Profractory", "Marae's Gift - Profractory",
    "Causes your cum to build up at 3x the normal rate."));
PerkDescLib.set(PerkType.MaraesGiftStud, new PerkDesc(PerkType.MaraesGiftStud, "Marae's Gift - Stud", "Marae's Gift - Stud",
    "Increases your cum production and potency greatly."));
PerkDescLib.set(PerkType.MarbleResistant, new PerkDesc(PerkType.MarbleResistant, "Marble Resistant", "Marble Resistant",
    "Provides resistance to the addictive effects of bottled LaBova milk."));
PerkDescLib.set(PerkType.MarblesMilk, new PerkDesc(PerkType.MarblesMilk, "Marble's Milk", "Marble's Milk",
    "Requires you to drink LaBova milk frequently or eventually die.  You cannot shake this addiction."));
PerkDescLib.set(PerkType.Misdirection, new PerkDesc(PerkType.Misdirection, "Misdirection", "Misdirection",
    "Grants additional evasion chances while wearing Raphael's red bodysuit."));
PerkDescLib.set(PerkType.OmnibusGift, new PerkDesc(PerkType.OmnibusGift, "Omnibus' Gift", "Omnibus' Gift",
    "Increases minimum lust but provides some lust resistance."));
PerkDescLib.set(PerkType.OneTrackMind, new PerkDesc(PerkType.OneTrackMind, "One Track Mind", "One Track Mind",
    "Your constant desire for sex causes your sexual organs to be able to take larger insertions and disgorge greater amounts of fluid."));
PerkDescLib.set(PerkType.PilgrimsBounty, new PerkDesc(PerkType.PilgrimsBounty, "Pilgrim's Bounty", "Pilgrim's Bounty",
    "Causes you to always cum as hard as if you had max lust."));
PerkDescLib.set(PerkType.PureAndLoving, new PerkDesc(PerkType.PureAndLoving, "Pure and Loving", "Pure and Loving",
    "Your caring attitude towards love and romance makes you slightly more resistant to lust and corruption."));
PerkDescLib.set(PerkType.SensualLover, new PerkDesc(PerkType.SensualLover, "Sensual Lover", "Sensual Lover",
    "Your sensual attitude towards love and romance makes your tease ability slightly more effective."));
PerkDescLib.set(PerkType.Whispered, new PerkDesc(PerkType.Whispered, "Whispered", "Whispered",
    "Akbal's blessings grant limited telepathy that can induce fear."));

PerkDescLib.set(PerkType.ControlledBreath, new ControlledBreath());
PerkDescLib.set(PerkType.CleansingPalm, new CleansingPalm());
PerkDescLib.set(PerkType.Enlightened, new Enlightened());

// Monster perks
PerkDescLib.set(PerkType.Acid, new PerkDesc(PerkType.Acid, "Acid", "Acid", ""));
