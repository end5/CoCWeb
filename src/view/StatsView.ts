import { Player } from "../classes/Player";
import { GameModel } from "../model/GameModel";
import { loadId } from "./LoadUtils";
import { NameView } from "./NameView";
import { StatView, StatViewWithBar } from "./StatView";
import { TimeView } from "./TimeView";

export type StatKeys =
    | "str"
    | "tou"
    | "spe"
    | "inte"
    | "lib"
    | "sens"
    | "cor"
    | "hp"
    | "lust"
    | "fatigue";
export type OtherKeys = "level" | "xp" | "gems";

export class StatsView {
    private model: GameModel;
    private element: HTMLElement;
    private name: NameView;

    private stats = {} as Record<StatKeys, StatViewWithBar> & Record<OtherKeys, StatView>;

    private time: TimeView;

    public constructor(model: GameModel) {
        this.model = model;

        this.element = loadId("statsPanel");

        this.name = new NameView("nameDisplay");

        this.stats.str = new StatViewWithBar("strengthPanel", "Strength");
        this.stats.tou = new StatViewWithBar("toughnessPanel", "Toughness");
        this.stats.spe = new StatViewWithBar("speedPanel", "Speed");
        this.stats.inte = new StatViewWithBar("intelligencePanel", "Intelligence");
        this.stats.lib = new StatViewWithBar("libidoPanel", "Libido");
        this.stats.sens = new StatViewWithBar("sensitivityPanel", "Sensitivity");
        this.stats.cor = new StatViewWithBar("corruptionPanel", "Corruption");

        this.stats.hp = new StatViewWithBar("hpPanel", "HP");
        this.stats.lust = new StatViewWithBar("lustPanel", "Lust");
        this.stats.fatigue = new StatViewWithBar("fatiguePanel", "Fatigue");

        this.stats.level = new StatView("levelPanel", "Level");
        this.stats.xp = new StatView("xpPanel", "Experience");
        this.stats.gems = new StatView("gemsPanel", "Gems");

        this.time = new TimeView();
    }

    public setName(name: string) {
        this.name.setText(name);
    }

    // <- statsScreenRefresh
    public refresh(): void {
        this.name.setText(this.model.player.short);

        this.stats.str.setNumber(this.model.player.str);
        this.stats.tou.setNumber(this.model.player.tou);
        this.stats.spe.setNumber(this.model.player.spe);
        this.stats.inte.setNumber(this.model.player.inte);
        this.stats.lib.setNumber(this.model.player.lib);
        this.stats.sens.setNumber(this.model.player.sens);
        this.stats.cor.setNumber(this.model.player.cor);
        this.stats.fatigue.setNumber(this.model.player.fatigue);
        this.stats.hp.setNumber(this.model.player.HP);
        this.stats.lust.setNumber(this.model.player.lust);

        this.stats.str.setBar(this.model.player.str / 100);
        this.stats.tou.setBar(this.model.player.tou / 100);
        this.stats.spe.setBar(this.model.player.spe / 100);
        this.stats.inte.setBar(this.model.player.inte / 100);
        this.stats.lib.setBar(this.model.player.lib / 100);
        this.stats.sens.setBar(this.model.player.sens / 100);
        this.stats.cor.setBar(this.model.player.cor / 100);
        this.stats.fatigue.setBar(this.model.player.fatigue / 100);
        this.stats.hp.setBar(this.model.player.HP / this.model.maxHP());
        this.stats.lust.setBar(this.model.player.lust / 100);

        this.stats.level.setNumber(this.model.player.level);
        this.stats.xp.setNumber(this.model.player.XP);
        this.stats.gems.setNumber(this.model.player.gems);

        this.time.setDay(this.model.time.days);
        this.time.setHour(this.model.time.hours);
    }

    // <- showStats
    public show() {
        // make all the stats DOs visible.
        this.refresh();
        this.element.classList.remove("hidden");
    }

    // <- hideStats
    public hide() {
        // body...
        this.element.classList.add("hidden");
    }

    // <- hideUpDown
    public hideUpDown() {
        for (const key of Object.keys(this.stats) as (StatKeys | OtherKeys)[]) {
            this.stats[key].hideArrows();
        }

        this.hideLevelUp();
    }

    public showUpDown() {
        const allStats = ["str", "tou", "spe", "inte", "lib", "sens", "cor", "lust"] as Extract<
            StatKeys,
            keyof Player
        >[];

        for (const statName of allStats) {
            const oldStatName = `old${statName.charAt(0).toUpperCase()}${statName.substr(
                1
            )}` as keyof Player;

            if (this.model.player[statName] > this.model.oldStats[oldStatName]) {
                this.showStatUp(statName);
            }
            if (this.model.player[statName] < this.model.oldStats[oldStatName]) {
                this.showStatDown(statName);
            }
        }
    }

    public showLevelUp(): void {
        this.stats.level.showUp();
    }

    public hideLevelUp(): void {
        this.stats.level.hideArrows();
    }

    public showStatUp(statName: StatKeys | OtherKeys): void {
        this.stats[statName].showUp();
    }

    public showStatDown(statName: StatKeys | OtherKeys): void {
        this.stats[statName].showDown();
    }
}
