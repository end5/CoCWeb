import { ScreenElement } from '../Engine/Display/Elements/ScreenElement';
import { StatPanel } from './StatPanel';
import { loadFromId } from '../Engine/Utilities/Html';

export class StatsPanel extends ScreenElement<HTMLElement> {
    public str: StatPanel;
    public tou: StatPanel;
    public spe: StatPanel;
    public int: StatPanel;
    public lib: StatPanel;
    public sens: StatPanel;
    public cor: StatPanel;
    public hp: StatPanel;
    public lust: StatPanel;
    public fatigue: StatPanel;
    public level: StatPanel;
    public xp: StatPanel;
    public gems: StatPanel;

    public constructor() {
        super(loadFromId("statsPanel"));
        this.str = new StatPanel(loadFromId("strengthPanel"));
        this.tou = new StatPanel(loadFromId("toughnessPanel"));
        this.spe = new StatPanel(loadFromId("speedPanel"));
        this.int = new StatPanel(loadFromId("intelligencePanel"));
        this.lib = new StatPanel(loadFromId("libidoPanel"));
        this.sens = new StatPanel(loadFromId("sensitivityPanel"));
        this.cor = new StatPanel(loadFromId("corruptionPanel"));
        this.hp = new StatPanel(loadFromId("hpPanel"));
        this.lust = new StatPanel(loadFromId("lustPanel"));
        this.fatigue = new StatPanel(loadFromId("fatiguePanel"));
        this.level = new StatPanel(loadFromId("levelPanel"));
        this.xp = new StatPanel(loadFromId("xpPanel"));
        this.gems = new StatPanel(loadFromId("gemsPanel"));
    }

    public setHTMLElement(element: HTMLElement) {
        super.setHTMLElement(element);
        this.setStatPanels();
    }

    private setStatPanels() {
        this.str = new StatPanel(loadFromId("strengthPanel"));
        this.tou = new StatPanel(loadFromId("toughnessPanel"));
        this.spe = new StatPanel(loadFromId("speedPanel"));
        this.int = new StatPanel(loadFromId("intelligencePanel"));
        this.lib = new StatPanel(loadFromId("libidoPanel"));
        this.sens = new StatPanel(loadFromId("sensitivityPanel"));
        this.cor = new StatPanel(loadFromId("corruptionPanel"));
        this.hp = new StatPanel(loadFromId("hpPanel"));
        this.lust = new StatPanel(loadFromId("lustPanel"));
        this.fatigue = new StatPanel(loadFromId("fatiguePanel"));
        this.level = new StatPanel(loadFromId("levelPanel"));
        this.xp = new StatPanel(loadFromId("xpPanel"));
        this.gems = new StatPanel(loadFromId("gemsPanel"));
    }
}
