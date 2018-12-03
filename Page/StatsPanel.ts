import { StatPanel } from './StatPanel';
import { loadFromId } from '../Engine/Utilities/Html';
import { BlankElement } from '../Engine/Display/Elements/BlankElement';

export class StatsPanel extends BlankElement {
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

    public setHTMLElement(element: HTMLDivElement) {
        super.setHTMLElement(element);
        this.setStatPanels();
    }

    private setStatPanels() {
        this.str.setHTMLElement(loadFromId("strengthPanel") as HTMLDivElement);
        this.tou.setHTMLElement(loadFromId("toughnessPanel") as HTMLDivElement);
        this.spe.setHTMLElement(loadFromId("speedPanel") as HTMLDivElement);
        this.int.setHTMLElement(loadFromId("intelligencePanel") as HTMLDivElement);
        this.lib.setHTMLElement(loadFromId("libidoPanel") as HTMLDivElement);
        this.sens.setHTMLElement(loadFromId("sensitivityPanel") as HTMLDivElement);
        this.cor.setHTMLElement(loadFromId("corruptionPanel") as HTMLDivElement);
        this.hp.setHTMLElement(loadFromId("hpPanel") as HTMLDivElement);
        this.lust.setHTMLElement(loadFromId("lustPanel") as HTMLDivElement);
        this.fatigue.setHTMLElement(loadFromId("fatiguePanel") as HTMLDivElement);
        this.level.setHTMLElement(loadFromId("levelPanel") as HTMLDivElement);
        this.xp.setHTMLElement(loadFromId("xpPanel") as HTMLDivElement);
        this.gems.setHTMLElement(loadFromId("gemsPanel") as HTMLDivElement);
    }
}
