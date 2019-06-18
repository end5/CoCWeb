define(["require", "exports", "../../BaseContent", "../NPCs/Anemone", "../Areas/HighMountains/Basilisk", "../Areas/Forest/BeeGirl", "../Areas/Bog/ChameleonGirl", "../Areas/Swamp/CorruptedDrider", "../Areas/Desert/CumWitch", "../Areas/Desert/DemonPack", "../Areas/Swamp/FemaleSpiderMorph", "../Areas/Lake/FetishCultist", "../Areas/Lake/FetishZealot", "../Areas/Plains/Gnoll", "../Areas/Plains/GnollSpearThrower", "../Monsters/Goblin", "../Monsters/GoblinAssassin", "../Areas/Lake/GooGirl", "../Areas/Lake/GreenSlime", "../Areas/HighMountains/Harpy", "../Areas/Mountain/HellHound", "../Monsters/Imp", "../Dungeons/DeepCave/ImpHorde", "../Monsters/ImpLord", "../Areas/Mountain/InfestedHellhound", "../Areas/Forest/Kitsune", "../Areas/Swamp/MaleSpiderMorph", "../Areas/Mountain/Minotaur", "../Areas/HighMountains/MinotaurMob", "../Areas/Desert/Naga", "../Areas/Desert/SandTrap", "../Areas/Desert/SandWitch", "../Areas/Plains/Satyr", "../Places/Boat/SharkGirl", "../Areas/Forest/TentacleBeast", "../Areas/Mountain/WormMass", "../Areas/Forest/Akbal", "../NPCs/Amily", "../Dungeons/HelDungeon/Brigid", "../NPCs/Ceraph", "../NPCs/GooArmor", "../Places/Owca/Farmers", "../Quests/UrtaQuest/GoblinBroodmother", "../Dungeons/HelDungeon/HarpyMob", "../Dungeons/HelDungeon/HarpyQueen", "../NPCs/Hel", "../Dungeons/Factory/IncubusMechanic", "../NPCs/Isabella", "../NPCs/Izma", "../Areas/HighMountains/Izumi", "../NPCs/Jojo", "../Places/Farm/Kelt", "../NPCs/Kiha", "../Places/Owca/LustyDemons", "../NPCs/Marble", "../Quests/UrtaQuest/MilkySuccubus", "../Areas/HighMountains/Minerva", "../Quests/UrtaQuest/MinotaurLord", "../Dungeons/Factory/OmnibusOverseer", "../Dungeons/HelDungeon/PhoenixPlatoon", "../Dungeons/DesertCave/SandMother", "../Dungeons/DesertCave/SandWitchMob", "../Dungeons/Factory/SecretarialSuccubus", "../NPCs/Shouldra", "../Quests/UrtaQuest/Sirius", "../NPCs/Sophie", "../Areas/Swamp/SpiderMorphMob", "../Areas/Forest/Tamani", "../Areas/Forest/TamanisDaughters", "../Dungeons/DeepCave/Vala", "../Dungeons/DeepCave/Zetaz", "../Dungeons/DeepCave/EncapsulationPod", "../NPCs/Sheila", "../NPCs/Holli", "../NPCs/Helspawn", "../NPCs/Ember"], function (require, exports, BaseContent_1, Anemone_1, Basilisk_1, BeeGirl_1, ChameleonGirl_1, CorruptedDrider_1, CumWitch_1, DemonPack_1, FemaleSpiderMorph_1, FetishCultist_1, FetishZealot_1, Gnoll_1, GnollSpearThrower_1, Goblin_1, GoblinAssassin_1, GooGirl_1, GreenSlime_1, Harpy_1, HellHound_1, Imp_1, ImpHorde_1, ImpLord_1, InfestedHellhound_1, Kitsune_1, MaleSpiderMorph_1, Minotaur_1, MinotaurMob_1, Naga_1, SandTrap_1, SandWitch_1, Satyr_1, SharkGirl_1, TentacleBeast_1, WormMass_1, Akbal_1, Amily_1, Brigid_1, Ceraph_1, GooArmor_1, Farmers_1, GoblinBroodmother_1, HarpyMob_1, HarpyQueen_1, Hel_1, IncubusMechanic_1, Isabella_1, Izma_1, Izumi_1, Jojo_1, Kelt_1, Kiha_1, LustyDemons_1, Marble_1, MilkySuccubus_1, Minerva_1, MinotaurLord_1, OmnibusOverseer_1, PhoenixPlatoon_1, SandMother_1, SandWitchMob_1, SecretarialSuccubus_1, Shouldra_1, Sirius_1, Sophie_1, SpiderMorphMob_1, Tamani_1, TamanisDaughters_1, Vala_1, Zetaz_1, EncapsulationPod_1, Sheila_1, Holli_1, Helspawn_1, Ember_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 20.02.14.
     */
    class ExploreDebug extends BaseContent_1.BaseContent {
        constructor() {
            super(...arguments);
            // array of lazy monster creators
            // 1) first go simple monsters that do not depend on/change game state
            // 2) then NPCs and quest monsters that might depend on/change game state
            // but still fightable without special initialization
            // 3) finally very special monsters, which rely on some kind of game state initialization (such as Ember)
            // and may crash or break something very heavily on attempt to fight
            this.allMonsters = [
                // Generic monsters first...
                function () { return new Anemone_1.Anemone(); },
                function () { return new Basilisk_1.Basilisk(); },
                function () { return new BeeGirl_1.BeeGirl(); },
                function () { return new ChameleonGirl_1.ChameleonGirl(); },
                function () { return new CorruptedDrider_1.CorruptedDrider(); },
                function () { return new CumWitch_1.CumWitch(); },
                function () { return new DemonPack_1.DemonPack(); },
                function () { return new FemaleSpiderMorph_1.FemaleSpiderMorph(); },
                function () { return new FetishCultist_1.FetishCultist(); },
                function () { return new FetishZealot_1.FetishZealot(); },
                function () { return new Gnoll_1.Gnoll(); },
                function () { return new GnollSpearThrower_1.GnollSpearThrower(); },
                function () { return new Goblin_1.Goblin(); },
                function () { return new GoblinAssassin_1.GoblinAssassin(); },
                function () { return new GooGirl_1.GooGirl(); },
                function () { return new GreenSlime_1.GreenSlime(); },
                function () { return new Harpy_1.Harpy(); },
                function () { return new HellHound_1.HellHound(); },
                function () { return new Imp_1.Imp(); },
                function () { return new ImpHorde_1.ImpHorde(); },
                function () { return new ImpLord_1.ImpLord(); },
                function () { return new InfestedHellhound_1.InfestedHellhound(); },
                function () { return new Kitsune_1.Kitsune("black"); },
                function () { return new Kitsune_1.Kitsune("blonde"); },
                function () { return new Kitsune_1.Kitsune("red"); },
                function () { return new MaleSpiderMorph_1.MaleSpiderMorph(); },
                function () { return new Minotaur_1.Minotaur(true); },
                function () { return new Minotaur_1.Minotaur(false); },
                function () { return new MinotaurMob_1.MinotaurMob(); },
                function () { return new Naga_1.Naga(); },
                function () { return new SandTrap_1.SandTrap(); },
                function () { return new SandWitch_1.SandWitch(); },
                function () { return new Satyr_1.Satyr(); },
                function () { return new SharkGirl_1.SharkGirl(); },
                function () { return new TentacleBeast_1.TentacleBeast(); },
                function () { return new WormMass_1.WormMass(); },
                // ...NPCs, quest, and named monsters second, ...
                function () { return new Akbal_1.Akbal(); },
                function () { return new Amily_1.Amily(); },
                function () { return new Brigid_1.Brigid(); },
                function () { return new Ceraph_1.Ceraph(); },
                function () { return new GooArmor_1.GooArmor(); },
                function () { return new Farmers_1.Farmers(); },
                function () { return new GoblinBroodmother_1.GoblinBroodmother(); },
                function () { return new HarpyMob_1.HarpyMob(); },
                function () { return new HarpyQueen_1.HarpyQueen(); },
                function () { return new Hel_1.Hel(); },
                function () { return new IncubusMechanic_1.IncubusMechanic(); },
                function () { return new Isabella_1.Isabella(); },
                function () { return new Izma_1.Izma(); },
                function () { return new Izumi_1.Izumi(); },
                function () { return new Jojo_1.Jojo(); },
                function () { return new Kelt_1.Kelt(); },
                function () { return new Kiha_1.Kiha(); },
                function () { return new LustyDemons_1.LustyDemons(); },
                function () { return new Marble_1.Marble(); },
                function () { return new MilkySuccubus_1.MilkySuccubus(); },
                function () { return new Minerva_1.Minerva(); },
                function () { return new MinotaurLord_1.MinotaurLord(); },
                function () { return new OmnibusOverseer_1.OmnibusOverseer(); },
                function () { return new PhoenixPlatoon_1.PhoenixPlatoon(); },
                function () { return new SandMother_1.SandMother(); },
                function () { return new SandWitchMob_1.SandWitchMob(); },
                function () { return new SecretarialSuccubus_1.SecretarialSuccubus(); },
                function () { return new Shouldra_1.Shouldra(); },
                function () { return new Sirius_1.Sirius(); },
                function () { return new Sophie_1.Sophie(); },
                function () { return new SpiderMorphMob_1.SpiderMorphMob(); },
                function () { return new Tamani_1.Tamani(); },
                function () { return new TamanisDaughters_1.TamanisDaughters(); },
                function () { return new Vala_1.Vala(); },
                function () { return new Zetaz_1.Zetaz(); },
                // ...VERY special monsters third.
                function () { return new EncapsulationPod_1.EncapsulationPod(); },
                function () { return new Sheila_1.Sheila(); },
                function () { return new Holli_1.Holli(); },
                function () { return new Helspawn_1.Helspawn(); },
                function () { return new Ember_1.Ember(); }
            ];
        }
        doExploreDebug() {
            this.clearOutput();
            this.menu();
            this.outputText("<b>Monsters</b> &nbsp; combat each monster.\n\n");
            this.addButton(0, "Monsters", this.exploreDebugMonsters);
        }
        exploreDebugMonsters(monsterIdx = 0) {
            this.clearOutput();
            this.menu();
            if (monsterIdx == 0) {
                this.outputText("<b>WARNING.</b> You are going to fight (probably) all the monsters. " +
                    "You won't be penalized for defeat or awarded for victory. " +
                    "Even though the monsters' victory and defeat events are removed, " +
                    "fighting certain quest monsters/NPCs through this debug scene " +
                    "may put their scenes into inconsistent state. \n\n");
            }
            if (monsterIdx >= this.allMonsters.length) {
                this.outputText("You have fought every monster.");
            }
            else {
                var m = this.allMonsters[monsterIdx]();
                m.onDefeated = (hpVictory) => {
                    this.getGame().inCombat = false;
                    this.getGame().clearStatuses(false);
                    this.statScreenRefresh();
                    this.exploreDebugMonsters(monsterIdx + 1);
                };
                m.onWon = (hpVictory, pcCameWorms) => {
                    this.getGame().inCombat = false;
                    this.getGame().clearStatuses(false);
                    this.statScreenRefresh();
                    this.exploreDebugMonsters(monsterIdx + 1);
                };
                m.onPcRunAttempt = () => {
                    this.getGame().inCombat = false;
                    this.getGame().clearStatuses(false);
                    this.statScreenRefresh();
                    this.exploreDebugMonsters(monsterIdx + 1);
                };
                this.outputText("You are going to fight " + m.a + " " + m.short + ".");
                this.addButton(0, "Fight", () => {
                    this.outputText("\n\nStarting combat...");
                    this.startCombat(m);
                });
                this.addButton(1, "Skip", this.exploreDebugMonsters, monsterIdx + 1);
                this.addButton(2, "Heal", () => {
                    this.player.HP = this.player.maxHP();
                    this.player.lust = 0;
                    this.statScreenRefresh();
                });
            }
            if (monsterIdx > 1)
                this.addButton(6, "Go Back", this.exploreDebugMonsters, monsterIdx - 1);
            this.addButton(9, "Enough", this.playerMenu);
        }
        ExploreDebug() {
        }
    }
    exports.ExploreDebug = ExploreDebug;
});
//# sourceMappingURL=ExploreDebug.js.map