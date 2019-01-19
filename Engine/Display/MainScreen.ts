import { ImageElement } from './Elements/ImageElement';
import { StatsPanel } from './StatsPanel';
import { TopButtons } from './TopButtons';
import { BottomButtons } from './BottomButtons';
import { TextElement } from 'Engine/Display/Elements/TextElement';

class MainScreenFacade {
    public readonly botButtons = new BottomButtons();
    public readonly topButtons = new TopButtons();
    public readonly nameDisplay = new TextElement<HTMLParagraphElement>();
    public readonly statsPanel = new StatsPanel();
    public readonly levelupIcon = new ImageElement();
    public readonly timeDayElement = new TextElement<HTMLParagraphElement>();
    public readonly timeHourElement = new TextElement<HTMLParagraphElement>();
    public readonly imageElement = new ImageElement();
    public readonly textElement = new TextElement<HTMLParagraphElement>();
    public readonly spriteElement = new ImageElement();
}

export const MainScreen = new MainScreenFacade();
