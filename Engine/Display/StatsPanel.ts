import { StatPanel } from './StatPanel';
import { loadFromId } from 'Engine/Utilities/Html';
import { ScreenElement } from 'Engine/Display/Elements/ScreenElement';

export class StatsPanel extends ScreenElement<HTMLDivElement> {
    public str: StatPanel = new StatPanel();
    public tou: StatPanel = new StatPanel();
    public spe: StatPanel = new StatPanel();
    public int: StatPanel = new StatPanel();
    public lib: StatPanel = new StatPanel();
    public sens: StatPanel = new StatPanel();
    public cor: StatPanel = new StatPanel();
    public hp: StatPanel = new StatPanel();
    public lust: StatPanel = new StatPanel();
    public fatigue: StatPanel = new StatPanel();
    public level: StatPanel = new StatPanel();
    public xp: StatPanel = new StatPanel();
    public gems: StatPanel = new StatPanel();

    public get element(): HTMLDivElement {
        return super.element;
    }

    public set element(htmlElement: HTMLDivElement) {
        super.element = htmlElement;
        this.setStatPanels();
    }

    private setStatPanels() {
        this.str.element = loadFromId("strengthPanel");
        this.tou.element = loadFromId("toughnessPanel");
        this.spe.element = loadFromId("speedPanel");
        this.int.element = loadFromId("intelligencePanel");
        this.lib.element = loadFromId("libidoPanel");
        this.sens.element = loadFromId("sensitivityPanel");
        this.cor.element = loadFromId("corruptionPanel");
        this.hp.element = loadFromId("hpPanel");
        this.lust.element = loadFromId("lustPanel");
        this.fatigue.element = loadFromId("fatiguePanel");
        this.level.element = loadFromId("levelPanel");
        this.xp.element = loadFromId("xpPanel");
        this.gems.element = loadFromId("gemsPanel");
    }
}
