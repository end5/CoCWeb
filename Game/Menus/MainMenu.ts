import { MainScreen } from '../../Page/MainScreen';
import { clickFuncWrapper, NextScreenChoices } from '../ScreenDisplay';
import { isEaster, isValentine } from '../Utilities/Dates';
import { CView } from '../../Page/ContentView';
import { CharDict } from '../CharDict';
import { Settings } from '../Settings';
import { statsMenu } from './InGame/StatsMenu';
import { perkUpMenu } from './InGame/PerkUpMenu';
import { perksMenu } from './InGame/PerksMenu';
import { playerMenu } from './InGame/PlayerMenu';
import { dataMenu } from './DataMenu';
import { settingsMenu } from './SettingsMenu';
import { charCreationMenu } from './InGame/CharCreationMenu';

export function mainMenu(): NextScreenChoices {
    if (!CharDict.player)
        MainScreen.statsPanel.hide();

    MainScreen.topButtons.stats.modify("Stats", clickFuncWrapper(statsMenu));
    MainScreen.topButtons.levelUp.modify("Perk Up", clickFuncWrapper(perkUpMenu));
    MainScreen.topButtons.perks.modify("Perks", clickFuncWrapper(perksMenu));
    MainScreen.topButtons.appearance.modify("Appearance", undefined);
    MainScreen.topButtons.hide();
    MainScreen.topButtons.mainMenu.modify("New Game", clickFuncWrapper(charCreationMenu));
    MainScreen.topButtons.data.modify("Data", clickFuncWrapper(dataMenu));
    MainScreen.levelupIcon.hide();

    CView.clear();
    CView.text("<b>Corruption of Champions Web Edition Framework Test</b>\n");

    if (Settings.debug)
        CView.text("\n\n<b>DEBUG MODE ENABLED:  ITEMS WILL NOT BE CONSUMED BY USE.</b>");
    if (Settings.showSprites)
        CView.text("\n\n<b>Sprites disabled.</b>");
    if (Settings.easyMode)
        CView.text("\n\n<b>Easy Mode On:  Bad-ends can be ignored.</b>");
    if (Settings.sillyMode)
        CView.text("\n\n<b>SILLY MODE ENGAGED: Crazy, nonsensical, and possibly hilarious things may occur.</b>");
    if (isEaster())
        CView.text("\n\n<b>It's Easter!  Enjoy the eggs!</b>");
    if (isValentine())
        CView.text("\n\n<b>It's Valentine's!</b>");

    return {
        choices: [
            ["Settings", settingsMenu], ["Resume", CharDict.player ? playerMenu : undefined]
        ]
    };
}
