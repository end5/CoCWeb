import { CharDict } from 'Engine/CharDict';
import { MainScreen } from 'Engine/Display/MainScreen';
import { Time } from 'Engine/Utilities/Time';
import { DisplayUpdateEvents } from 'Engine/Display/ScreenDisplay';

DisplayUpdateEvents.push(updateTime);
DisplayUpdateEvents.push(updateMainPlayer);

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
        MainScreen.statsPanel.str.min = Math.floor(char.stats.base.str.min);
        MainScreen.statsPanel.str.max = Math.floor(char.stats.base.str.max);

        MainScreen.statsPanel.tou.value = Math.floor(char.stats.base.tou.value);
        MainScreen.statsPanel.tou.min = Math.floor(char.stats.base.tou.min);
        MainScreen.statsPanel.tou.max = Math.floor(char.stats.base.tou.max);

        MainScreen.statsPanel.spe.value = Math.floor(char.stats.base.spe.value);
        MainScreen.statsPanel.spe.min = Math.floor(char.stats.base.spe.min);
        MainScreen.statsPanel.spe.max = Math.floor(char.stats.base.spe.max);

        MainScreen.statsPanel.int.value = Math.floor(char.stats.base.int.value);
        MainScreen.statsPanel.int.min = Math.floor(char.stats.base.int.min);
        MainScreen.statsPanel.int.max = Math.floor(char.stats.base.int.max);

        MainScreen.statsPanel.lib.value = Math.floor(char.stats.base.lib.value);
        MainScreen.statsPanel.lib.min = Math.floor(char.stats.base.lib.min);
        MainScreen.statsPanel.lib.max = Math.floor(char.stats.base.lib.max);

        MainScreen.statsPanel.sens.value = Math.floor(char.stats.base.sens.value);
        MainScreen.statsPanel.sens.min = Math.floor(char.stats.base.sens.min);
        MainScreen.statsPanel.sens.max = Math.floor(char.stats.base.sens.max);

        MainScreen.statsPanel.cor.value = Math.floor(char.stats.base.cor.value);
        MainScreen.statsPanel.cor.min = Math.floor(char.stats.base.cor.min);
        MainScreen.statsPanel.cor.max = Math.floor(char.stats.base.cor.max);

        MainScreen.statsPanel.hp.value = Math.floor(char.stats.base.HP.value);
        MainScreen.statsPanel.hp.min = Math.floor(char.stats.base.HP.min);
        MainScreen.statsPanel.hp.max = Math.floor(char.stats.base.HP.max);

        MainScreen.statsPanel.lust.value = Math.floor(char.stats.base.lust.value);
        MainScreen.statsPanel.lust.min = Math.floor(char.stats.base.lust.min);
        MainScreen.statsPanel.lust.max = Math.floor(char.stats.base.lust.max);

        MainScreen.statsPanel.fatigue.value = Math.floor(char.stats.base.fatigue.value);
        MainScreen.statsPanel.fatigue.min = Math.floor(char.stats.base.fatigue.min);
        MainScreen.statsPanel.fatigue.max = Math.floor(char.stats.base.fatigue.max);

        MainScreen.statsPanel.level.value = Math.floor(char.stats.base.level.raw);

        MainScreen.statsPanel.xp.value = char.roundXPToLevel();
        if (char.canLevelUp())
            MainScreen.levelupIcon.show();

        MainScreen.statsPanel.gems.value = char.inventory.gemsStat.raw;

    }
}
