import { CharDict } from './CharDict';
import { MainScreen } from 'Page/MainScreen';
import { Time } from './Utilities/Time';

export function updateDisplay() {
    updateTime();
    updateMainPlayer();
}

function updateTime() {
    MainScreen.timeDayElement.clear();
    MainScreen.timeDayElement.text(Time.day.toString());
    MainScreen.timeHourElement.clear();
    MainScreen.timeHourElement.text(Time.hour.toString());
}

function updateMainPlayer() {
    const char = CharDict.player;
    if (char) {
        MainScreen.statsPanel.str.value = char.stats.base.str.value;
        MainScreen.statsPanel.str.min = char.stats.base.str.min;
        MainScreen.statsPanel.str.max = char.stats.base.str.max;

        MainScreen.statsPanel.tou.value = char.stats.base.tou.value;
        MainScreen.statsPanel.tou.min = char.stats.base.tou.min;
        MainScreen.statsPanel.tou.max = char.stats.base.tou.max;

        MainScreen.statsPanel.spe.value = char.stats.base.spe.value;
        MainScreen.statsPanel.spe.min = char.stats.base.spe.min;
        MainScreen.statsPanel.spe.max = char.stats.base.spe.max;

        MainScreen.statsPanel.int.value = char.stats.base.int.value;
        MainScreen.statsPanel.int.min = char.stats.base.int.min;
        MainScreen.statsPanel.int.max = char.stats.base.int.max;

        MainScreen.statsPanel.lib.value = char.stats.base.lib.value;
        MainScreen.statsPanel.lib.min = char.stats.base.lib.min;
        MainScreen.statsPanel.lib.max = char.stats.base.lib.max;

        MainScreen.statsPanel.sens.value = char.stats.base.sens.value;
        MainScreen.statsPanel.sens.min = char.stats.base.sens.min;
        MainScreen.statsPanel.sens.max = char.stats.base.sens.max;

        MainScreen.statsPanel.cor.value = char.stats.base.cor.value;
        MainScreen.statsPanel.cor.min = char.stats.base.cor.min;
        MainScreen.statsPanel.cor.max = char.stats.base.cor.max;

        MainScreen.statsPanel.hp.value = char.stats.base.HP.value;
        MainScreen.statsPanel.hp.min = char.stats.base.HP.min;
        MainScreen.statsPanel.hp.max = char.stats.base.HP.max;

        MainScreen.statsPanel.lust.value = char.stats.base.lust.value;
        MainScreen.statsPanel.lust.min = char.stats.base.lust.min;
        MainScreen.statsPanel.lust.max = char.stats.base.lust.max;

        MainScreen.statsPanel.fatigue.value = char.stats.base.fatigue.value;
        MainScreen.statsPanel.fatigue.min = char.stats.base.fatigue.min;
        MainScreen.statsPanel.fatigue.max = char.stats.base.fatigue.max;

        MainScreen.statsPanel.level.value = char.stats.base.level.value;

        MainScreen.statsPanel.xp.value = char.roundXPToLevel();
        if (char.canLevelUp())
            MainScreen.levelupIcon.show();

        MainScreen.statsPanel.gems.value = char.inventory.gemsStat.value;

    }
}
