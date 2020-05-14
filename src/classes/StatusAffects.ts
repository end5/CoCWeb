import { StatusAffectType } from "./StatusAffectType";
import { CombatStatusAffect } from "./StatusAffects/CombatStatusAffect";

/**
 * IMPORTANT NOTE: any You can rename the constants BUT NOT the string ids (they are stored in saves).
 */
export class StatusAffects {
    // Non-combat player perks
    public static AllNaturalOnaholeUsed: StatusAffectType = StatusAffects.mk("all-natural onahole used");
    public static AteEgg: StatusAffectType = StatusAffects.mk("ateEgg");
    public static AnemoneArousal: StatusAffectType = StatusAffects.mk("Anemone Arousal");
    public static BimboChampagne: StatusAffectType = StatusAffects.mk("Bimbo Champagne");
    public static Birthed: StatusAffectType = StatusAffects.mk("Birthed");
    public static BirthedImps: StatusAffectType = StatusAffects.mk("Birthed Imps");
    public static BlackCatBeer: StatusAffectType = StatusAffects.mk("Black Cat Beer");
    public static BlackNipples: StatusAffectType = StatusAffects.mk("Black Nipples");
    public static BlowjobOn: StatusAffectType = StatusAffects.mk("BlowjobOn");
    public static BoatDiscovery: StatusAffectType = StatusAffects.mk("Boat Discovery");
    public static BonusACapacity: StatusAffectType = StatusAffects.mk("Bonus aCapacity");
    public static BonusVCapacity: StatusAffectType = StatusAffects.mk("Bonus vCapacity");
    public static BottledMilk: StatusAffectType = StatusAffects.mk("Bottled Milk");
    public static BreastsMilked: StatusAffectType = StatusAffects.mk("Breasts Milked");
    public static BSwordBroken: StatusAffectType = StatusAffects.mk("BSwordBroken");
    public static BuiltMilker: StatusAffectType = StatusAffects.mk("BUILT: Milker");
    public static BurpChanged: StatusAffectType = StatusAffects.mk("Burp Changed");
    public static ButtStretched: StatusAffectType = StatusAffects.mk("ButtStretched");
    public static CampAnemoneTrigger: StatusAffectType = StatusAffects.mk("Camp Anemone Trigger");
    public static CampMarble: StatusAffectType = StatusAffects.mk("Camp Marble");
    public static CampRathazul: StatusAffectType = StatusAffects.mk("Camp Rathazul");
    public static ClaraCombatRounds: StatusAffectType = StatusAffects.mk("Clara Combat Rounds");
    public static ClaraFoughtInCamp: StatusAffectType = StatusAffects.mk("Clara Fought In Camp");
    public static CockPumped: StatusAffectType = StatusAffects.mk("Cock Pumped");
    public static Contraceptives: StatusAffectType = StatusAffects.mk("Contraceptives");
    public static CuntStretched: StatusAffectType = StatusAffects.mk("CuntStretched");
    public static DefenseCanopy: StatusAffectType = StatusAffects.mk("Defense: Canopy");
    public static DeluxeOnaholeUsed: StatusAffectType = StatusAffects.mk("deluxe onahole used");
    public static DogWarning: StatusAffectType = StatusAffects.mk("dog warning");
    public static DragonBreathBoost: StatusAffectType = StatusAffects.mk("Dragon Breath Boost");
    public static DragonBreathCooldown: StatusAffectType = StatusAffects.mk("Dragon Breath Cooldown");
    public static DungeonShutDown: StatusAffectType = StatusAffects.mk("DungeonShutDown");
    public static Dysfunction: StatusAffectType = StatusAffects.mk("dysfunction");
    public static Edryn: StatusAffectType = StatusAffects.mk("Edryn");
    public static Eggchest: StatusAffectType = StatusAffects.mk("eggchest");
    public static Eggs: StatusAffectType = StatusAffects.mk("eggs");
    public static EmberFuckCooldown: StatusAffectType = StatusAffects.mk("ember fuck cooldown");
    public static EmberNapping: StatusAffectType = StatusAffects.mk("Ember Napping");
    public static EverRapedJojo: StatusAffectType = StatusAffects.mk("Ever Raped Jojo");
    public static Exgartuan: StatusAffectType = StatusAffects.mk("Exgartuan");
    public static ExploredDeepwoods: StatusAffectType = StatusAffects.mk("exploredDeepwoods");
    public static FactoryOmnibusDefeated: StatusAffectType = StatusAffects.mk("FactoryOmnibusDefeated");
    public static FactoryOverload: StatusAffectType = StatusAffects.mk("FactoryOverload");
    public static FactoryIncubusDefeated: StatusAffectType = StatusAffects.mk("FactoryIncubusDefeated");
    public static FactorySuccubusDefeated: StatusAffectType = StatusAffects.mk("FactorySuccubusDefeated");
    public static FaerieFemFuck: StatusAffectType = StatusAffects.mk("Faerie Fem Fuck");
    public static FaerieFucked: StatusAffectType = StatusAffects.mk("Faerie Fucked");
    public static FappedGenderless: StatusAffectType = StatusAffects.mk("fapped genderless");
    public static Feeder: StatusAffectType = StatusAffects.mk("Feeder");
    public static Fertilized: StatusAffectType = StatusAffects.mk("Fertilized");
    public static FetishOn: StatusAffectType = StatusAffects.mk("fetishON");
    public static FoundFactory: StatusAffectType = StatusAffects.mk("Found Factory");
    public static FuckedMarble: StatusAffectType = StatusAffects.mk("FuckedMarble");
    public static Goojob: StatusAffectType = StatusAffects.mk("GOOJOB");
    public static GooStuffed: StatusAffectType = StatusAffects.mk("gooStuffed");
    public static Groundpound: StatusAffectType = StatusAffects.mk("Groundpound");
    public static HairdresserMeeting: StatusAffectType = StatusAffects.mk("hairdresser meeting");
    public static Hangover: StatusAffectType = StatusAffects.mk("Hangover");
    public static Heat: StatusAffectType = StatusAffects.mk("heat");
    public static HorseWarning: StatusAffectType = StatusAffects.mk("horse warning");
    public static ImmolationSpell: StatusAffectType = StatusAffects.mk("Immolation Spell");
    public static ImpGangBang: StatusAffectType = StatusAffects.mk("Imp GangBang");
    public static IncubusBribed: StatusAffectType = StatusAffects.mk("IncubusBribed");
    public static Infested: StatusAffectType = StatusAffects.mk("infested");
    public static IzmaBlowing: StatusAffectType = StatusAffects.mk("IzmaBlowing");
    public static IzumisPipeSmoke: StatusAffectType = StatusAffects.mk("Izumis Pipe Smoke");
    public static JerkingIzma: StatusAffectType = StatusAffects.mk("JerkingIzma");
    public static Jizzpants: StatusAffectType = StatusAffects.mk("Jizzpants");
    public static JojoMeditationCount: StatusAffectType = StatusAffects.mk("Jojo Meditation Count");
    public static JojoNightWatch: StatusAffectType = StatusAffects.mk("JojoNightWatch");
    public static JojoTFOffer: StatusAffectType = StatusAffects.mk("JojoTFOffer");
    public static Kelt: StatusAffectType = StatusAffects.mk("Kelt");
    public static KeltBJ: StatusAffectType = StatusAffects.mk("KeltBJ");
    public static KeltBadEndWarning: StatusAffectType = StatusAffects.mk("Kelt Bad End Warning");
    public static KeltOff: StatusAffectType = StatusAffects.mk("KeltOff");
    public static KnowsArouse: StatusAffectType = StatusAffects.mk("Knows Arouse");
    public static KnowsBlind: StatusAffectType = StatusAffects.mk("Knows Blind");
    public static KnowsCharge: StatusAffectType = StatusAffects.mk("Knows Charge");
    public static KnowsHeal: StatusAffectType = StatusAffects.mk("Knows Heal");
    public static KnowsMight: StatusAffectType = StatusAffects.mk("Knows Might");
    public static KnowsWhitefire: StatusAffectType = StatusAffects.mk("Knows Whitefire");
    public static LactationEndurance: StatusAffectType = StatusAffects.mk("Lactation Endurance");
    public static LactationReduction: StatusAffectType = StatusAffects.mk("Lactation Reduction");
    public static LactationReduc0: StatusAffectType = StatusAffects.mk("Lactation Reduc0");
    public static LactationReduc1: StatusAffectType = StatusAffects.mk("Lactation Reduc1");
    public static LactationReduc2: StatusAffectType = StatusAffects.mk("Lactation Reduc2");
    public static LactationReduc3: StatusAffectType = StatusAffects.mk("Lactation Reduc3");
    public static LootEgg: StatusAffectType = StatusAffects.mk("lootEgg");
    public static LostVillagerSpecial: StatusAffectType = StatusAffects.mk("lostVillagerSpecial");
    public static Luststick: StatusAffectType = StatusAffects.mk("Luststick");
    public static LustStickApplied: StatusAffectType = StatusAffects.mk("Lust Stick Applied");
    public static LustyTongue: StatusAffectType = StatusAffects.mk("LustyTongue");
    public static MalonVisitedPostAddiction: StatusAffectType = StatusAffects.mk("Malon Visited Post Addiction");
    public static MaraeComplete: StatusAffectType = StatusAffects.mk("Marae Complete");
    public static MaraesLethicite: StatusAffectType = StatusAffects.mk("Marae's Lethicite");
    public static MaraesQuestStart: StatusAffectType = StatusAffects.mk("Marae's Quest Start");
    public static Marble: StatusAffectType = StatusAffects.mk("Marble");
    public static MarbleHasItem: StatusAffectType = StatusAffects.mk("MarbleHasItem");
    public static MarbleItemCooldown: StatusAffectType = StatusAffects.mk("MarbleItemCooldown");
    public static MarbleRapeAttempted: StatusAffectType = StatusAffects.mk("Marble Rape Attempted");
    public static MarblesMilk: StatusAffectType = StatusAffects.mk("Marbles Milk");
    public static MarbleSpecials: StatusAffectType = StatusAffects.mk("MarbleSpecials");
    public static MarbleWithdrawl: StatusAffectType = StatusAffects.mk("MarbleWithdrawl");
    public static Meditated: StatusAffectType = StatusAffects.mk("Meditated");
    public static MeanToNaga: StatusAffectType = StatusAffects.mk("MeanToNaga");
    public static MeetWanderer: StatusAffectType = StatusAffects.mk("meet wanderer");
    public static MetCorruptMarae: StatusAffectType = StatusAffects.mk("Met Corrupt Marae");
    public static MetMarae: StatusAffectType = StatusAffects.mk("Met Marae");
    public static MetRathazul: StatusAffectType = StatusAffects.mk("metRathazul");
    public static MetWorms: StatusAffectType = StatusAffects.mk("metWorms");
    public static MetWhitney: StatusAffectType = StatusAffects.mk("Met Whitney");
    public static Milked: StatusAffectType = StatusAffects.mk("Milked");
    public static MinoPlusCowgirl: StatusAffectType = StatusAffects.mk("Mino + Cowgirl");
    public static Naga: StatusAffectType = StatusAffects.mk("Naga");
    public static NakedOn: StatusAffectType = StatusAffects.mk("NakedOn");
    public static NoJojo: StatusAffectType = StatusAffects.mk("noJojo");
    public static NoMoreMarble: StatusAffectType = StatusAffects.mk("No More Marble");
    public static Oswald: StatusAffectType = StatusAffects.mk("Oswald");
    public static PlainOnaholeUsed: StatusAffectType = StatusAffects.mk("plain onahole used");
    public static PhoukaWhiskeyAffect: StatusAffectType = StatusAffects.mk("PhoukaWhiskeyAffect");
    public static PostAkbalSubmission: StatusAffectType = StatusAffects.mk("Post Akbal Submission");
    public static PostAnemoneBeatdown: StatusAffectType = StatusAffects.mk("Post Anemone Beatdown");
    public static PureCampJojo: StatusAffectType = StatusAffects.mk("PureCampJojo");
    public static RathazulArmor: StatusAffectType = StatusAffects.mk("RathazulArmor");
    public static RepeatSuccubi: StatusAffectType = StatusAffects.mk("repeatSuccubi");
    public static Rut: StatusAffectType = StatusAffects.mk("rut");
    public static SharkGirl: StatusAffectType = StatusAffects.mk("Shark-Girl");
    public static ShieldingSpell: StatusAffectType = StatusAffects.mk("Shielding Spell");
    public static SlimeCraving: StatusAffectType = StatusAffects.mk("Slime Craving");
    public static SlimeCravingFeed: StatusAffectType = StatusAffects.mk("Slime Craving Feed");
    public static SlimeCravingOutput: StatusAffectType = StatusAffects.mk("Slime Craving Output");
    public static SuccubiFirst: StatusAffectType = StatusAffects.mk("SuccubiFirst");
    public static SuccubiNight: StatusAffectType = StatusAffects.mk("succubiNight");
    public static TakenGroPlus: StatusAffectType = StatusAffects.mk("TakenGro+");
    public static TakenLactaid: StatusAffectType = StatusAffects.mk("TakenLactaid");
    public static Tamani: StatusAffectType = StatusAffects.mk("Tamani");									//Used only for compatibility with old save files, otherwise no longer in use
    public static TamaniFemaleEncounter: StatusAffectType = StatusAffects.mk("Tamani Female Encounter");	//Used only for compatibility with old save files, otherwise no longer in use
    public static TelAdre: StatusAffectType = StatusAffects.mk("Tel'Adre");
    public static TentacleBadEndCounter: StatusAffectType = StatusAffects.mk("TentacleBadEndCounter");
    public static TentacleJojo: StatusAffectType = StatusAffects.mk("Tentacle Jojo");
    public static TensionReleased: StatusAffectType = StatusAffects.mk("TensionReleased");
    public static TF2: StatusAffectType = StatusAffects.mk("TF2");
    public static TookBlessedSword: StatusAffectType = StatusAffects.mk("Took Blessed Sword");
    /**
     * v1 = bonus index
     * v2 = bonus value
     * v3 = remaining time
     */
    public static UmasMassage: StatusAffectType = StatusAffects.mk("Uma's Massage");
    public static Uniball: StatusAffectType = StatusAffects.mk("Uniball");
    public static UsedNaturalSelfStim: StatusAffectType = StatusAffects.mk("used natural self-stim");
    public static used_self_dash_stim: StatusAffectType = StatusAffects.mk("used self-stim");
    public static Victoria: StatusAffectType = StatusAffects.mk("Victoria");
    public static VoluntaryDemonpack: StatusAffectType = StatusAffects.mk("Voluntary Demonpack");
    public static WormOffer: StatusAffectType = StatusAffects.mk("WormOffer");
    public static WormPlugged: StatusAffectType = StatusAffects.mk("worm plugged");
    public static WormsHalf: StatusAffectType = StatusAffects.mk("wormsHalf");
    public static WormsOff: StatusAffectType = StatusAffects.mk("wormsOff");
    public static WormsOn: StatusAffectType = StatusAffects.mk("wormsOn");
    public static WandererDemon: StatusAffectType = StatusAffects.mk("wanderer demon");
    public static WandererHuman: StatusAffectType = StatusAffects.mk("wanderer human");
    public static Yara: StatusAffectType = StatusAffects.mk("Yara");

    // monster
    public static Attacks: StatusAffectType = StatusAffects.mk("attacks");
    public static BimboBrawl: StatusAffectType = StatusAffects.mk("bimboBrawl");
    public static BowCooldown: StatusAffectType = StatusAffects.mk("Bow Cooldown");
    public static BowDisabled: StatusAffectType = StatusAffects.mk("Bow Disabled");
    public static Charged: StatusAffectType = StatusAffects.mk("Charged");
    public static Climbed: StatusAffectType = StatusAffects.mk("Climbed");
    public static Concentration: StatusAffectType = StatusAffects.mk("Concentration");
    public static Constricted: StatusAffectType = StatusAffects.mk("Constricted");
    public static CoonWhip: StatusAffectType = StatusAffects.mk("Coon Whip");
    public static Counter: StatusAffectType = StatusAffects.mk("Counter");
    public static DomFight: StatusAffectType = StatusAffects.mk("domfight");
    public static DrankMinoCum: StatusAffectType = StatusAffects.mk("drank mino cum");
    public static DrankMinoCum2: StatusAffectType = StatusAffects.mk("drank mino cum2")
    public static Earthshield: StatusAffectType = StatusAffects.mk("Earthshield");
    public static Fear: StatusAffectType = StatusAffects.mk("Fear");
    public static GenericRunDisabled: StatusAffectType = StatusAffects.mk("Generic Run Disabled");
    public static Gigafire: StatusAffectType = StatusAffects.mk("Gigafire");
    public static GottaOpenGift: StatusAffectType = StatusAffects.mk("Gotta Open Gift");
    public static HolliBurning: StatusAffectType = StatusAffects.mk("Holli Burning");
    public static Illusion: StatusAffectType = StatusAffects.mk("Illusion");
    public static ImpSkip: StatusAffectType = StatusAffects.mk("ImpSkip");
    public static ImpUber: StatusAffectType = StatusAffects.mk("ImpUber");
    public static JojoIsAssisting: StatusAffectType = StatusAffects.mk("Jojo Is Assisting");
    public static JojoPyre: StatusAffectType = StatusAffects.mk("Jojo Pyre");
    public static Keen: StatusAffectType = StatusAffects.mk("keen");
    public static Level: StatusAffectType = StatusAffects.mk("level");
    public static KitsuneFight: StatusAffectType = StatusAffects.mk("Kitsune Fight");
    public static LustAura: StatusAffectType = StatusAffects.mk("Lust Aura");
    public static LustStick: StatusAffectType = StatusAffects.mk("LustStick");
    public static Milk: StatusAffectType = StatusAffects.mk("milk");
    public static MilkyUrta: StatusAffectType = StatusAffects.mk("Milky Urta");
    public static MinoMilk: StatusAffectType = StatusAffects.mk("Mino Milk");
    public static MinotaurEntangled: StatusAffectType = StatusAffects.mk("Minotaur Entangled");
    public static MissFirstRound: StatusAffectType = StatusAffects.mk("miss first round");
    public static NoLoot: StatusAffectType = StatusAffects.mk("No Loot");
    public static PCTailTangle: StatusAffectType = StatusAffects.mk("PCTailTangle");
    public static PeachLootLoss: StatusAffectType = StatusAffects.mk("Peach Loot Loss");
    // @aimozg i don't know and do not fucking care if these two should be merged
    public static PhyllaFight: StatusAffectType = StatusAffects.mk("PhyllaFight");
    public static phyllafight: StatusAffectType = StatusAffects.mk("phyllafight");
    public static Platoon: StatusAffectType = StatusAffects.mk("platoon");
    public static QueenBind: StatusAffectType = StatusAffects.mk("QueenBind");
    // @aimozg HA HA HA
    public static Round: StatusAffectType = StatusAffects.mk("Round");
    public static round: StatusAffectType = StatusAffects.mk("round");
    public static RunDisabled: StatusAffectType = StatusAffects.mk("Run Disabled");
    public static Shell: StatusAffectType = StatusAffects.mk("Shell");
    public static SirenSong: StatusAffectType = StatusAffects.mk("Siren Song");
    public static Spar: StatusAffectType = StatusAffects.mk("spar");
    public static Sparring: StatusAffectType = StatusAffects.mk("sparring");
    public static spiderfight: StatusAffectType = StatusAffects.mk("spiderfight");
    public static StunCooldown: StatusAffectType = StatusAffects.mk("Stun Cooldown");
    public static TentacleCoolDown: StatusAffectType = StatusAffects.mk("TentacleCoolDown");
    public static Timer: StatusAffectType = StatusAffects.mk("Timer");
    public static Uber: StatusAffectType = StatusAffects.mk("Uber");
    public static UrtaSecondWinded: StatusAffectType = StatusAffects.mk("Urta Second Winded");
    public static UsedTitsmother: StatusAffectType = StatusAffects.mk("UsedTitsmother");
    public static Vala: StatusAffectType = StatusAffects.mk("vala");
    public static Vapula: StatusAffectType = StatusAffects.mk("Vapula");
    public static WhipReady: StatusAffectType = StatusAffects.mk("Whip Ready");

    // combat
    public static AcidSlap: CombatStatusAffect = StatusAffects.mk2("Acid Slap");
    public static AkbalSpeed: CombatStatusAffect = StatusAffects.mk2("Akbal Speed");
    public static AmilyVenom: CombatStatusAffect = StatusAffects.mk2("Amily Venom");
    public static AnemoneVenom: CombatStatusAffect = StatusAffects.mk2("Anemone Venom");
    public static AttackDisabled: CombatStatusAffect = StatusAffects.mk2("Attack Disabled");
    public static BasiliskCompulsion: CombatStatusAffect = StatusAffects.mk2("Basilisk Compulsion");
    public static BasiliskSlow: CombatStatusAffect = StatusAffects.mk2("BasiliskSlow");
    public static Berzerking: CombatStatusAffect = StatusAffects.mk2("Berzerking");
    public static Blind: CombatStatusAffect = StatusAffects.mk2("Blind");
    public static Bound: CombatStatusAffect = StatusAffects.mk2("Bound");
    public static CalledShot: CombatStatusAffect = StatusAffects.mk2("Called Shot");
    public static ChargeWeapon: CombatStatusAffect = StatusAffects.mk2("Charge Weapon");
    public static Chokeslam: CombatStatusAffect = StatusAffects.mk2("Chokeslam");
    public static Confusion: CombatStatusAffect = StatusAffects.mk2("Confusion");
    public static DemonSeed: CombatStatusAffect = StatusAffects.mk2("DemonSeed");
    public static Disarmed: CombatStatusAffect = StatusAffects.mk2("Disarmed");
    public static DriderKiss: CombatStatusAffect = StatusAffects.mk2("Drider Kiss");
    public static FirstAttack: CombatStatusAffect = StatusAffects.mk2("FirstAttack");
    public static GnollSpear: CombatStatusAffect = StatusAffects.mk2("Gnoll Spear");
    public static GooArmorBind: CombatStatusAffect = StatusAffects.mk2("GooArmorBind");
    public static GooArmorSilence: CombatStatusAffect = StatusAffects.mk2("GooArmorSilence");
    public static GooBind: CombatStatusAffect = StatusAffects.mk2("GooBind");
    public static HarpyBind: CombatStatusAffect = StatusAffects.mk2("HarpyBind");
    public static HolliConstrict: CombatStatusAffect = StatusAffects.mk2("Holli Constrict");
    public static InfestAttempted: CombatStatusAffect = StatusAffects.mk2("infestAttempted");
    public static IsabellaStunned: CombatStatusAffect = StatusAffects.mk2("Isabella Stunned");
    public static IzmaBleed: CombatStatusAffect = StatusAffects.mk2("Izma Bleed");
    public static KissOfDeath: CombatStatusAffect = StatusAffects.mk2("Kiss of Death");
    public static LustStones: CombatStatusAffect = StatusAffects.mk2("lust stones");
    public static lustvenom: CombatStatusAffect = StatusAffects.mk2("lust venom");
    public static Might: CombatStatusAffect = StatusAffects.mk2("Might");
    public static NagaBind: CombatStatusAffect = StatusAffects.mk2("Naga Bind");
    public static NagaVenom: CombatStatusAffect = StatusAffects.mk2("Naga Venom");
    public static NoFlee: CombatStatusAffect = StatusAffects.mk2("NoFlee");
    public static ParalyzeVenom: CombatStatusAffect = StatusAffects.mk2("paralyze venom");
    public static PhysicalDisabled: CombatStatusAffect = StatusAffects.mk2("Physical Disabled");
    public static Poison: CombatStatusAffect = StatusAffects.mk2("Poison");
    public static Sandstorm: CombatStatusAffect = StatusAffects.mk2("sandstorm");
    public static Sealed: CombatStatusAffect = StatusAffects.mk2("Sealed");
    public static SheilaOil: CombatStatusAffect = StatusAffects.mk2("Sheila Oil");
    public static Shielding: CombatStatusAffect = StatusAffects.mk2("Sheilding");
    public static StoneLust: CombatStatusAffect = StatusAffects.mk2("Stone Lust");
    public static Stunned: CombatStatusAffect = StatusAffects.mk2("Stunned");
    public static TailWhip: CombatStatusAffect = StatusAffects.mk2("Tail Whip");
    public static TemporaryHeat: CombatStatusAffect = StatusAffects.mk2("Temporary Heat");
    public static TentacleBind: CombatStatusAffect = StatusAffects.mk2("TentacleBind");
    public static ThroatPunch: CombatStatusAffect = StatusAffects.mk2("Throat Punch");
    public static Titsmother: CombatStatusAffect = StatusAffects.mk2("Titsmother");
    public static TwuWuv: CombatStatusAffect = StatusAffects.mk2("Twu Wuv");
    public static UBERWEB: CombatStatusAffect = StatusAffects.mk2("UBERWEB");
    public static Web: CombatStatusAffect = StatusAffects.mk2("Web");
    public static WebSilence: CombatStatusAffect = StatusAffects.mk2("Web-Silence");
    public static Whispered: CombatStatusAffect = StatusAffects.mk2("Whispered");

    public static RemovedArmor: CombatStatusAffect = StatusAffects.mk2("Removed Armor");
    public static JCLustLevel: CombatStatusAffect = StatusAffects.mk2("JC Lust Level");
    public static MirroredAttack: CombatStatusAffect = StatusAffects.mk2("Mirrored Attack");
    public static KnockedBack: CombatStatusAffect = StatusAffects.mk2("Knocked Back");
    public static Tentagrappled: CombatStatusAffect = StatusAffects.mk2("Tentagrappled");
    public static TentagrappleCooldown: CombatStatusAffect = StatusAffects.mk2("Tentagrapple Cooldown");
    public static ShowerDotEffect: CombatStatusAffect = StatusAffects.mk2("Shower Dot Effect");
    public static GardenerSapSpeed: CombatStatusAffect = StatusAffects.mk2("Sap Speed");
    public static VineHealUsed: CombatStatusAffect = StatusAffects.mk2("Vine Heal Used");
    public static DriderIncubusVenom: CombatStatusAffect = StatusAffects.mk2("Drider Incubus Venom");
    public static TaintedMind: CombatStatusAffect = StatusAffects.mk2("Tainted Mind");
    public static PurpleHaze: CombatStatusAffect = StatusAffects.mk2("Purple Haze");
    public static MinotaurKingMusk: CombatStatusAffect = StatusAffects.mk2("Minotaur King Musk");
    public static MinotaurKingsTouch: CombatStatusAffect = StatusAffects.mk2("Minotaur Kings Touch");
    public static LethicesRapeTentacles: CombatStatusAffect = StatusAffects.mk2("Lethices Rape Tentacles");
    public static OnFire: CombatStatusAffect = StatusAffects.mk2("On Fire");
    public static LethicesShell: CombatStatusAffect = StatusAffects.mk2("Lethices Magic Shell");
    public static WhipSilence: CombatStatusAffect = StatusAffects.mk2("Whip Silence");
    public static PigbysHands: CombatStatusAffect = StatusAffects.mk2("Pigbys Hands");

    /**
     * Creates non-combat status affect
     */
    private static mk(id: string): StatusAffectType {
        return new StatusAffectType(id);
    }

    /**
     * Creates combat status affect
     */
    private static mk2(id: string): CombatStatusAffect {
        return new CombatStatusAffect(id);
    }
}

