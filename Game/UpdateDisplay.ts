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
        MainScreen.statsPanel.str.value = Math.floor(char.stats.base.str.value);
        MainScreen.statsPanel.str.min = Math.floor(char.stats.base.str.min.raw);
        MainScreen.statsPanel.str.max = Math.floor(char.stats.base.str.max.raw);

        MainScreen.statsPanel.tou.value = Math.floor(char.stats.base.tou.value);
        MainScreen.statsPanel.tou.min = Math.floor(char.stats.base.tou.min.raw);
        MainScreen.statsPanel.tou.max = Math.floor(char.stats.base.tou.max.raw);

        MainScreen.statsPanel.spe.value = Math.floor(char.stats.base.spe.value);
        MainScreen.statsPanel.spe.min = Math.floor(char.stats.base.spe.min.raw);
        MainScreen.statsPanel.spe.max = Math.floor(char.stats.base.spe.max.raw);

        MainScreen.statsPanel.int.value = Math.floor(char.stats.base.int.value);
        MainScreen.statsPanel.int.min = Math.floor(char.stats.base.int.min.raw);
        MainScreen.statsPanel.int.max = Math.floor(char.stats.base.int.max.raw);

        MainScreen.statsPanel.lib.value = Math.floor(char.stats.base.lib.value);
        MainScreen.statsPanel.lib.min = Math.floor(char.stats.base.lib.min.raw);
        MainScreen.statsPanel.lib.max = Math.floor(char.stats.base.lib.max.raw);

        MainScreen.statsPanel.sens.value = Math.floor(char.stats.base.sens.value);
        MainScreen.statsPanel.sens.min = Math.floor(char.stats.base.sens.min.raw);
        MainScreen.statsPanel.sens.max = Math.floor(char.stats.base.sens.max.raw);

        MainScreen.statsPanel.cor.value = Math.floor(char.stats.base.cor.value);
        MainScreen.statsPanel.cor.min = Math.floor(char.stats.base.cor.min.raw);
        MainScreen.statsPanel.cor.max = Math.floor(char.stats.base.cor.max.raw);

        MainScreen.statsPanel.hp.value = Math.floor(char.stats.base.HP.value);
        MainScreen.statsPanel.hp.min = Math.floor(char.stats.base.HP.min.raw);
        MainScreen.statsPanel.hp.max = Math.floor(char.stats.base.HP.max.raw);

        MainScreen.statsPanel.lust.value = Math.floor(char.stats.base.lust.value);
        MainScreen.statsPanel.lust.min = Math.floor(char.stats.base.lust.min.raw);
        MainScreen.statsPanel.lust.max = Math.floor(char.stats.base.lust.max.raw);

        MainScreen.statsPanel.fatigue.value = Math.floor(char.stats.base.fatigue.value);
        MainScreen.statsPanel.fatigue.min = Math.floor(char.stats.base.fatigue.min.raw);
        MainScreen.statsPanel.fatigue.max = Math.floor(char.stats.base.fatigue.max.raw);

        MainScreen.statsPanel.level.value = Math.floor(char.stats.base.level.raw);

        MainScreen.statsPanel.xp.value = char.roundXPToLevel();
        if (char.canLevelUp())
            MainScreen.levelupIcon.show();

        MainScreen.statsPanel.gems.value = char.inventory.gemsStat.raw;

    }
}
