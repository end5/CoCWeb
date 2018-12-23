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
        MainScreen.statsPanel.str.value = char.stats.core.str.value;
        MainScreen.statsPanel.str.min = char.stats.core.str.min.raw;
        MainScreen.statsPanel.str.max = char.stats.core.str.max.raw;

        MainScreen.statsPanel.tou.value = char.stats.core.tou.value;
        MainScreen.statsPanel.tou.min = char.stats.core.tou.min.raw;
        MainScreen.statsPanel.tou.max = char.stats.core.tou.max.raw;

        MainScreen.statsPanel.spe.value = char.stats.core.spe.value;
        MainScreen.statsPanel.spe.min = char.stats.core.spe.min.raw;
        MainScreen.statsPanel.spe.max = char.stats.core.spe.max.raw;

        MainScreen.statsPanel.int.value = char.stats.core.int.value;
        MainScreen.statsPanel.int.min = char.stats.core.int.min.raw;
        MainScreen.statsPanel.int.max = char.stats.core.int.max.raw;

        MainScreen.statsPanel.lib.value = char.stats.core.lib.value;
        MainScreen.statsPanel.lib.min = char.stats.core.lib.min.raw;
        MainScreen.statsPanel.lib.max = char.stats.core.lib.max.raw;

        MainScreen.statsPanel.sens.value = char.stats.core.sens.value;
        MainScreen.statsPanel.sens.min = char.stats.core.sens.min.raw;
        MainScreen.statsPanel.sens.max = char.stats.core.sens.max.raw;

        MainScreen.statsPanel.cor.value = char.stats.core.cor.value;
        MainScreen.statsPanel.cor.min = char.stats.core.cor.min.raw;
        MainScreen.statsPanel.cor.max = char.stats.core.cor.max.raw;

        MainScreen.statsPanel.hp.value = char.stats.core.HP.value;
        MainScreen.statsPanel.hp.min = char.stats.core.HP.min.raw;
        MainScreen.statsPanel.hp.max = char.stats.core.HP.max.raw;

        MainScreen.statsPanel.lust.value = char.stats.core.lust.value;
        MainScreen.statsPanel.lust.min = char.stats.core.lust.min.raw;
        MainScreen.statsPanel.lust.max = char.stats.core.lust.max.raw;

        MainScreen.statsPanel.fatigue.value = char.stats.core.fatigue.value;
        MainScreen.statsPanel.fatigue.min = char.stats.core.fatigue.min.raw;
        MainScreen.statsPanel.fatigue.max = char.stats.core.fatigue.max.raw;

        MainScreen.statsPanel.level.value = char.stats.core.level.raw;

        MainScreen.statsPanel.xp.value = char.roundXPToLevel();
        if (char.canLevelUp())
            MainScreen.levelupIcon.show();

        MainScreen.statsPanel.gems.value = char.inventory.gemsStat.raw;

    }
}
