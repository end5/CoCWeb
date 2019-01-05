import { ImageElement } from './Elements/ImageElement';
import { ParagraphElement } from './Elements/ParagraphElement';
import { StatsPanel } from './StatsPanel';
import { TopButtons } from './TopButtons';
import { BottomButtons } from './BottomButtons';

class MainScreenFacade {
    public readonly botButtons = new BottomButtons();
    public readonly topButtons = new TopButtons();
    public readonly nameDisplay = new ParagraphElement();
    public readonly statsPanel = new StatsPanel();
    public readonly levelupIcon = new ImageElement();
    public readonly timeDayElement = new ParagraphElement();
    public readonly timeHourElement = new ParagraphElement();
    public readonly imageElement = new ImageElement();
    public readonly textElement = new ParagraphElement();
    public readonly spriteElement = new ImageElement();
}

export const MainScreen = new MainScreenFacade();
