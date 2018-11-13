import { ImageElement } from '../Engine/Display/Elements/ImageElement';
import { ParagraphElement } from '../Engine/Display/Elements/ParagraphElement';
import { StatsPanel } from './StatsPanel';
import { loadFromId } from '../Engine/Utilities/Html';
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
        this.nameDisplay.setHTMLElement(loadFromId("nameDisplay") as HTMLParagraphElement);

        this.levelupIcon = new ImageElement();
        this.levelupIcon.setHTMLElement(loadFromId("levelupIcon") as HTMLImageElement);
        this.timeDayElement = new ParagraphElement();
        this.timeDayElement.setHTMLElement(loadFromId("timeDay") as HTMLParagraphElement);
        this.timeHourElement = new ParagraphElement();
        this.timeHourElement.setHTMLElement(loadFromId("timeHour") as HTMLParagraphElement);
    }
}

export const MainScreen = new MainScreenFacade();
