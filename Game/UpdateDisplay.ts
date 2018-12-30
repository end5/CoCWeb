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
        MainScreen.statsPanel.str.value = Math.floor(char.stats.core.str.value);
        MainScreen.statsPanel.str.min = Math.floor(char.stats.core.str.min.raw);
        MainScreen.statsPanel.str.max = Math.floor(char.stats.core.str.max.raw);

        MainScreen.statsPanel.tou.value = Math.floor(char.stats.core.tou.value);
        MainScreen.statsPanel.tou.min = Math.floor(char.stats.core.tou.min.raw);
        MainScreen.statsPanel.tou.max = Math.floor(char.stats.core.tou.max.raw);

        MainScreen.statsPanel.spe.value = Math.floor(char.stats.core.spe.value);
        MainScreen.statsPanel.spe.min = Math.floor(char.stats.core.spe.min.raw);
        MainScreen.statsPanel.spe.max = Math.floor(char.stats.core.spe.max.raw);

        MainScreen.statsPanel.int.value = Math.floor(char.stats.core.int.value);
        MainScreen.statsPanel.int.min = Math.floor(char.stats.core.int.min.raw);
        MainScreen.statsPanel.int.max = Math.floor(char.stats.core.int.max.raw);

        MainScreen.statsPanel.lib.value = Math.floor(char.stats.core.lib.value);
        MainScreen.statsPanel.lib.min = Math.floor(char.stats.core.lib.min.raw);
        MainScreen.statsPanel.lib.max = Math.floor(char.stats.core.lib.max.raw);

        MainScreen.statsPanel.sens.value = Math.floor(char.stats.core.sens.value);
        MainScreen.statsPanel.sens.min = Math.floor(char.stats.core.sens.min.raw);
        MainScreen.statsPanel.sens.max = Math.floor(char.stats.core.sens.max.raw);

        MainScreen.statsPanel.cor.value = Math.floor(char.stats.core.cor.value);
        MainScreen.statsPanel.cor.min = Math.floor(char.stats.core.cor.min.raw);
        MainScreen.statsPanel.cor.max = Math.floor(char.stats.core.cor.max.raw);

        MainScreen.statsPanel.hp.value = Math.floor(char.stats.core.HP.value);
        MainScreen.statsPanel.hp.min = Math.floor(char.stats.core.HP.min.raw);
        MainScreen.statsPanel.hp.max = Math.floor(char.stats.core.HP.max.raw);

        MainScreen.statsPanel.lust.value = Math.floor(char.stats.core.lust.value);
        MainScreen.statsPanel.lust.min = Math.floor(char.stats.core.lust.min.raw);
        MainScreen.statsPanel.lust.max = Math.floor(char.stats.core.lust.max.raw);

        MainScreen.statsPanel.fatigue.value = Math.floor(char.stats.core.fatigue.value);
        MainScreen.statsPanel.fatigue.min = Math.floor(char.stats.core.fatigue.min.raw);
        MainScreen.statsPanel.fatigue.max = Math.floor(char.stats.core.fatigue.max.raw);

        MainScreen.statsPanel.level.value = Math.floor(char.stats.core.level.raw);

        MainScreen.statsPanel.xp.value = char.roundXPToLevel();
        if (char.canLevelUp())
            MainScreen.levelupIcon.show();

        MainScreen.statsPanel.gems.value = char.inventory.gemsStat.raw;

    }
}
