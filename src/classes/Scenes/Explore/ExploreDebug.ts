import { BaseContent } from "../../BaseContent";
import { Monster } from "../../Monster";
import { ChameleonGirl } from "../Areas/Bog/ChameleonGirl";
import { CumWitch } from "../Areas/Desert/CumWitch";
import { DemonPack } from "../Areas/Desert/DemonPack";
import { Naga } from "../Areas/Desert/Naga";
import { SandTrap } from "../Areas/Desert/SandTrap";
import { SandWitch } from "../Areas/Desert/SandWitch";
import { Akbal } from "../Areas/Forest/Akbal";
import { BeeGirl } from "../Areas/Forest/BeeGirl";
import { Kitsune } from "../Areas/Forest/Kitsune";
import { Tamani } from "../Areas/Forest/Tamani";
import { TamanisDaughters } from "../Areas/Forest/TamanisDaughters";
import { TentacleBeast } from "../Areas/Forest/TentacleBeast";
import { Basilisk } from "../Areas/HighMountains/Basilisk";
import { Harpy } from "../Areas/HighMountains/Harpy";
import { Izumi } from "../Areas/HighMountains/Izumi";
import { Minerva } from "../Areas/HighMountains/Minerva";
import { MinotaurMob } from "../Areas/HighMountains/MinotaurMob";
import { FetishCultist } from "../Areas/Lake/FetishCultist";
import { FetishZealot } from "../Areas/Lake/FetishZealot";
import { GooGirl } from "../Areas/Lake/GooGirl";
import { GreenSlime } from "../Areas/Lake/GreenSlime";
import { HellHound } from "../Areas/Mountain/HellHound";
import { InfestedHellhound } from "../Areas/Mountain/InfestedHellhound";
import { Minotaur } from "../Areas/Mountain/Minotaur";
import { WormMass } from "../Areas/Mountain/WormMass";
import { Gnoll } from "../Areas/Plains/Gnoll";
import { GnollSpearThrower } from "../Areas/Plains/GnollSpearThrower";
import { Satyr } from "../Areas/Plains/Satyr";
import { CorruptedDrider } from "../Areas/Swamp/CorruptedDrider";
import { FemaleSpiderMorph } from "../Areas/Swamp/FemaleSpiderMorph";
import { MaleSpiderMorph } from "../Areas/Swamp/MaleSpiderMorph";
import { SpiderMorphMob } from "../Areas/Swamp/SpiderMorphMob";
import { EncapsulationPod } from "../Dungeons/DeepCave/EncapsulationPod";
import { ImpHorde } from "../Dungeons/DeepCave/ImpHorde";
import { Vala } from "../Dungeons/DeepCave/Vala";
import { Zetaz } from "../Dungeons/DeepCave/Zetaz";
import { SandMother } from "../Dungeons/DesertCave/SandMother";
import { SandWitchMob } from "../Dungeons/DesertCave/SandWitchMob";
import { IncubusMechanic } from "../Dungeons/Factory/IncubusMechanic";
import { OmnibusOverseer } from "../Dungeons/Factory/OmnibusOverseer";
import { SecretarialSuccubus } from "../Dungeons/Factory/SecretarialSuccubus";
import { Brigid } from "../Dungeons/HelDungeon/Brigid";
import { HarpyMob } from "../Dungeons/HelDungeon/HarpyMob";
import { HarpyQueen } from "../Dungeons/HelDungeon/HarpyQueen";
import { PhoenixPlatoon } from "../Dungeons/HelDungeon/PhoenixPlatoon";
import { Goblin } from "../Monsters/Goblin";
import { GoblinAssassin } from "../Monsters/GoblinAssassin";
import { Imp } from "../Monsters/Imp";
import { ImpLord } from "../Monsters/ImpLord";
import { Amily } from "../NPCs/Amily";
import { Anemone } from "../NPCs/Anemone";
import { Ceraph } from "../NPCs/Ceraph";
import { Ember } from "../NPCs/Ember";
import { GooArmor } from "../NPCs/GooArmor";
import { Hel } from "../NPCs/Hel";
import { Helspawn } from "../NPCs/Helspawn";
import { Holli } from "../NPCs/Holli";
import { Isabella } from "../NPCs/Isabella";
import { Izma } from "../NPCs/Izma";
import { Jojo } from "../NPCs/Jojo";
import { Kiha } from "../NPCs/Kiha";
import { Marble } from "../NPCs/Marble";
import { Sheila } from "../NPCs/Sheila";
import { Shouldra } from "../NPCs/Shouldra";
import { Sophie } from "../NPCs/Sophie";
import { SharkGirl } from "../Places/Boat/SharkGirl";
import { Kelt } from "../Places/Farm/Kelt";
import { Farmers } from "../Places/Owca/Farmers";
import { LustyDemons } from "../Places/Owca/LustyDemons";
import { GoblinBroodmother } from "../Quests/UrtaQuest/GoblinBroodmother";
import { MilkySuccubus } from "../Quests/UrtaQuest/MilkySuccubus";
import { MinotaurLord } from "../Quests/UrtaQuest/MinotaurLord";
import { Sirius } from "../Quests/UrtaQuest/Sirius";

/**
 * Created by aimozg on 20.02.14.
 */

export class ExploreDebug extends BaseContent {
    public doExploreDebug(): void {
        this.clearOutput();
        this.menu();

        this.outx("<b>Monsters</b> &nbsp; combat each monster.\n\n");
        this.addButton(0, "Monsters", this.exploreDebugMonsters);
    }

    // array of lazy monster creators
    // 1) first go simple monsters that do not depend on/change game state
    // 2) then NPCs and quest monsters that might depend on/change game state
    // but still fightable without special initialization
    // 3) finally very special monsters, which rely on some kind of game state initialization (such as Ember)
    // and may crash or break something very heavily on attempt to fight
    private allMonsters: any[] = [
        // Generic monsters first...
        function (): Monster {
            return new Anemone();
        },
        function (): Monster {
            return new Basilisk();
        },
        function (): Monster {
            return new BeeGirl();
        },
        function (): Monster {
            return new ChameleonGirl();
        },
        function (): Monster {
            return new CorruptedDrider();
        },
        function (): Monster {
            return new CumWitch();
        },
        function (): Monster {
            return new DemonPack();
        },
        function (): Monster {
            return new FemaleSpiderMorph();
        },
        function (): Monster {
            return new FetishCultist();
        },
        function (): Monster {
            return new FetishZealot();
        },
        function (): Monster {
            return new Gnoll();
        },
        function (): Monster {
            return new GnollSpearThrower();
        },
        function (): Monster {
            return new Goblin();
        },
        function (): Monster {
            return new GoblinAssassin();
        },
        function (): Monster {
            return new GooGirl();
        },
        function (): Monster {
            return new GreenSlime();
        },
        function (): Monster {
            return new Harpy();
        },
        function (): Monster {
            return new HellHound();
        },
        function (): Monster {
            return new Imp();
        },
        function (): Monster {
            return new ImpHorde();
        },
        function (): Monster {
            return new ImpLord();
        },
        function (): Monster {
            return new InfestedHellhound();
        },
        function (): Monster {
            return new Kitsune("black");
        },
        function (): Monster {
            return new Kitsune("blonde");
        },
        function (): Monster {
            return new Kitsune("red");
        },
        function (): Monster {
            return new MaleSpiderMorph();
        },
        function (): Monster {
            return new Minotaur(true);
        },
        function (): Monster {
            return new Minotaur(false);
        },
        function (): Monster {
            return new MinotaurMob();
        },
        function (): Monster {
            return new Naga();
        },
        function (): Monster {
            return new SandTrap();
        },
        function (): Monster {
            return new SandWitch();
        },
        function (): Monster {
            return new Satyr();
        },
        function (): Monster {
            return new SharkGirl();
        },
        function (): Monster {
            return new TentacleBeast();
        },
        function (): Monster {
            return new WormMass();
        },
        // ...NPCs, quest, and named monsters second, ...
        function (): Monster {
            return new Akbal();
        },
        function (): Monster {
            return new Amily();
        },
        function (): Monster {
            return new Brigid();
        },
        function (): Monster {
            return new Ceraph();
        },
        function (): Monster {
            return new GooArmor();
        },
        function (): Monster {
            return new Farmers();
        },
        function (): Monster {
            return new GoblinBroodmother();
        },
        function (): Monster {
            return new HarpyMob();
        },
        function (): Monster {
            return new HarpyQueen();
        },
        function (): Monster {
            return new Hel();
        },
        function (): Monster {
            return new IncubusMechanic();
        },
        function (): Monster {
            return new Isabella();
        },
        function (): Monster {
            return new Izma();
        },
        function (): Monster {
            return new Izumi();
        },
        function (): Monster {
            return new Jojo();
        },
        function (): Monster {
            return new Kelt();
        },
        function (): Monster {
            return new Kiha();
        },
        function (): Monster {
            return new LustyDemons();
        },
        function (): Monster {
            return new Marble();
        },
        function (): Monster {
            return new MilkySuccubus();
        },
        function (): Monster {
            return new Minerva();
        },
        function (): Monster {
            return new MinotaurLord();
        },
        function (): Monster {
            return new OmnibusOverseer();
        },
        function (): Monster {
            return new PhoenixPlatoon();
        },
        function (): Monster {
            return new SandMother();
        },
        function (): Monster {
            return new SandWitchMob();
        },
        function (): Monster {
            return new SecretarialSuccubus();
        },
        function (): Monster {
            return new Shouldra();
        },
        function (): Monster {
            return new Sirius();
        },
        function (): Monster {
            return new Sophie();
        },
        function (): Monster {
            return new SpiderMorphMob();
        },
        function (): Monster {
            return new Tamani();
        },
        function (): Monster {
            return new TamanisDaughters();
        },
        function (): Monster {
            return new Vala();
        },
        function (): Monster {
            return new Zetaz();
        },
        // ...VERY special monsters third.
        function (): Monster {
            return new EncapsulationPod();
        },
        function (): Monster {
            return new Sheila();
        },
        function (): Monster {
            return new Holli();
        },
        function (): Monster {
            return new Helspawn();
        },
        function (): Monster {
            return new Ember();
        },
    ];

    private exploreDebugMonsters(monsterIdx = 0): void {
        this.clearOutput();
        this.menu();

        if (monsterIdx == 0) {
            this.outx(
                "<b>WARNING.</b> You are going to fight (probably) all the monsters. " +
                    "You won't be penalized for defeat or awarded for victory. " +
                    "Even though the monsters' victory and defeat events are removed, " +
                    "fighting certain quest monsters/NPCs through this debug scene " +
                    "may put their scenes into inconsistent state. \n\n"
            );
        }

        if (monsterIdx >= this.allMonsters.length) {
            this.outx("You have fought every monster.");
        } else {
            const m: Monster = this.allMonsters[monsterIdx]();
            m.onDefeated = (hpVictory: boolean): void => {
                this.getGame().inCombat = false;
                this.getGame().clearStatuses(false);
                this.statScreenRefresh();
                this.exploreDebugMonsters(monsterIdx + 1);
            };
            m.onWon = (hpVictory: boolean, pcCameWorms: boolean): void => {
                this.getGame().inCombat = false;
                this.getGame().clearStatuses(false);
                this.statScreenRefresh();
                this.exploreDebugMonsters(monsterIdx + 1);
            };
            m.onPcRunAttempt = (): void => {
                this.getGame().inCombat = false;
                this.getGame().clearStatuses(false);
                this.statScreenRefresh();
                this.exploreDebugMonsters(monsterIdx + 1);
            };
            this.outx(`You are going to fight ${m.a} ${m.short}.`);
            this.addButton(0, "Fight", (): void => {
                this.outx("\n\nStarting combat...");
                this.startCombat(m);
            });
            this.addButton(1, "Skip", this.exploreDebugMonsters, monsterIdx + 1);
            this.addButton(2, "Heal", (): void => {
                this.player.HP = this.player.maxHP();
                this.player.lust = 0;
                this.statScreenRefresh();
            });
        }
        if (monsterIdx > 1) this.addButton(6, "Go Back", this.exploreDebugMonsters, monsterIdx - 1);
        this.addButton(9, "Enough", this.playerMenu);
    }

    public ExploreDebug() {}
}
