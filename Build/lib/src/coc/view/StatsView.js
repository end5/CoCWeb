define(["require", "exports", "./StatView", "./TimeView", "./NameView", "./LoadUtils"], function (require, exports, StatView_1, TimeView_1, NameView_1, LoadUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StatsView {
        constructor(model) {
            this.stats = {};
            this.model = model;
            this.element = LoadUtils_1.loadId('statsPanel');
            this.name = new NameView_1.NameView('nameDisplay');
            this.stats.str = new StatView_1.StatViewWithBar('strengthPanel', 'Strength');
            this.stats.tou = new StatView_1.StatViewWithBar('toughnessPanel', 'Toughness');
            this.stats.spe = new StatView_1.StatViewWithBar('speedPanel', 'Speed');
            this.stats.inte = new StatView_1.StatViewWithBar('intelligencePanel', 'Intelligence');
            this.stats.lib = new StatView_1.StatViewWithBar('libidoPanel', 'Libido');
            this.stats.sens = new StatView_1.StatViewWithBar('sensitivityPanel', 'Sensitivity');
            this.stats.cor = new StatView_1.StatViewWithBar('corruptionPanel', 'Corruption');
            this.stats.hp = new StatView_1.StatViewWithBar('hpPanel', 'HP');
            this.stats.lust = new StatView_1.StatViewWithBar('lustPanel', 'Lust');
            this.stats.fatigue = new StatView_1.StatViewWithBar('fatiguePanel', 'Fatigue');
            this.stats.level = new StatView_1.StatView('levelPanel', 'Level');
            this.stats.xp = new StatView_1.StatView('xpPanel', 'Experience');
            this.stats.gems = new StatView_1.StatView('gemsPanel', 'Gems');
            this.time = new TimeView_1.TimeView();
        }
        ;
        setName(name) {
            this.name.setText(name);
        }
        // <- statsScreenRefresh
        refresh() {
            this.name.setText(this.model.player.short);
            this.stats.str.setNumber(this.model.player.str);
            this.stats.tou.setNumber(this.model.player.tou);
            this.stats.spe.setNumber(this.model.player.spe);
            this.stats.inte.setNumber(this.model.player.inte);
            this.stats.lib.setNumber(this.model.player.lib);
            this.stats.sens.setNumber(this.model.player.sens);
            this.stats.cor.setNumber(this.model.player.cor);
            this.stats.fatigue.setNumber(this.model.player.fatigue);
            this.stats.hp.setNumber(this.model.player.HP);
            this.stats.lust.setNumber(this.model.player.lust);
            this.stats.str.setBar(this.model.player.str / 100);
            this.stats.tou.setBar(this.model.player.tou / 100);
            this.stats.spe.setBar(this.model.player.spe / 100);
            this.stats.inte.setBar(this.model.player.inte / 100);
            this.stats.lib.setBar(this.model.player.lib / 100);
            this.stats.sens.setBar(this.model.player.sens / 100);
            this.stats.cor.setBar(this.model.player.cor / 100);
            this.stats.fatigue.setBar(this.model.player.fatigue / 100);
            this.stats.hp.setBar(this.model.player.HP / this.model.maxHP());
            this.stats.lust.setBar(this.model.player.lust / 100);
            this.stats.level.setNumber(this.model.player.level);
            this.stats.xp.setNumber(this.model.player.XP);
            this.stats.gems.setNumber(this.model.player.gems);
            this.time.setDay(this.model.time.days);
            this.time.setHour(this.model.time.hours);
        }
        ;
        // <- showStats
        show() {
            // make all the stats DOs visible.
            this.refresh();
            this.element.classList.remove('hidden');
        }
        ;
        // <- hideStats
        hide() {
            // body...
            this.element.classList.add('hidden');
        }
        ;
        // <- hideUpDown
        hideUpDown() {
            for (const key of Object.keys(this.stats)) {
                this.stats[key].hideArrows();
            }
            this.hideLevelUp();
        }
        ;
        showUpDown() {
            const allStats = ["str", "tou", "spe", "inte", "lib", "sens", "cor", "lust"];
            for (const statName of allStats) {
                const oldStatName = 'old' + statName.charAt(0).toUpperCase() + statName.substr(1);
                if (this.model.player[statName] > this.model.oldStats[oldStatName]) {
                    this.showStatUp(statName);
                }
                if (this.model.player[statName] < this.model.oldStats[oldStatName]) {
                    this.showStatDown(statName);
                }
            }
        }
        ;
        showLevelUp() {
            this.stats.level.showUp();
        }
        ;
        hideLevelUp() {
            this.stats.level.hideArrows();
        }
        ;
        showStatUp(statName) {
            this.stats[statName].showUp();
        }
        ;
        showStatDown(statName) {
            this.stats[statName].showDown();
        }
        ;
    }
    exports.StatsView = StatsView;
});
//# sourceMappingURL=StatsView.js.map