import { ImageElement } from '../Engine/Display/Elements/ImageElement';
import { ParagraphElement } from '../Engine/Display/Elements/ParagraphElement';
import { StatsPanel } from './StatsPanel';
import { TopButtons } from './TopButtons';
import { BottomButtons } from './BottomButtons';

class MainScreenFacade {
    public readonly botButtons: BottomButtons;
    public readonly topButtons: TopButtons;
    public readonly nameDisplay: ParagraphElement;
    public readonly statsPanel: StatsPanel;
    public readonly levelupIcon: ImageElement;
    public readonly timeDayElement: ParagraphElement;
    public readonly timeHourElement: ParagraphElement;

    public constructor() {
        this.topButtons = new TopButtons();
        this.botButtons = new BottomButtons();

        this.statsPanel = new StatsPanel();
        this.nameDisplay = new ParagraphElement();

        this.levelupIcon = new ImageElement();
        this.timeDayElement = new ParagraphElement();
        this.timeHourElement = new ParagraphElement();
    }
}

export const MainScreen = new MainScreenFacade();
