


// Remove dynamic once you've added all the DOs as instance properties.
export class StatsView {
    // add things from main view here?
    // yes because we'll need to update all the TFs and progress bars.
    public upDownsContainer: Sprite;
    public levelUp: Sprite;

    protected model: GameModel;

    public constructor(mainView: MovieClip, model: any) {

        this.model = model;

        var statsThingsNames: any[] = [
            "strBar", "strText", "strNum",      // "strUp",      "strDown",
            "touBar", "touText", "touNum",      // "touUp",      "touDown",
            "speBar", "speText", "speNum",      // "speUp",      "speDown",
            "inteBar", "inteText", "inteNum",     // "inteUp",     "inteDown",
            "libBar", "libText", "libNum",      // "libUp",      "libDown",
            "sensBar", "senText", "senNum",      // "sensUp",     "sensDown",
            "corBar", "corText", "corNum",      // "corUp",      "corDown",
            "lustBar", "lustText", "lustNum",     // "lustUp",     "lustDown",
            "fatigueBar", "fatigueText", "fatigueNum",  // "fatigueUp",  "fatigueDown",
            "HPBar", "HPText", "HPNum",       // "hpUp",       "hpDown",
            "levelText", "levelNum",    // "levelUp",
            "xpText", "xpNum",       // "xpUp",       "xpDown",
            "coreStatsText",
            "advancementText",
            "combatStatsText",
            "gemsText", "gemsNum",
            "timeText",
            "timeBG",
            "sideBarBG"
        ];

        var statsUpDownsNames: any[] = [
            "strUp", "strDown",
            "touUp", "touDown",
            "speUp", "speDown",
            "inteUp", "inteDown",
            "libUp", "libDown",
            "sensUp", "sensDown",
            "corUp", "corDown",
            "fatigueUp", "fatigueDown",
            "hpUp", "hpDown",
            "lustUp", "lustDown",
            // "levelUp",
            "xpUp", "xpDown"
        ];

        for (var statsDOName of statsThingsNames) {
            // adding at 0 because BG is at the end.
            this.addChildAt(mainView.getChildByName(statsDOName), 0);
        }

        this.upDownsContainer = new Sprite();
        this.addChild(this.upDownsContainer);

        for (var statsUpDownDOName of statsUpDownsNames) {
            this.upDownsContainer.addChild(mainView.getChildByName(statsUpDownDOName));
        }

        this.levelUp = mainView.getChildByName('levelUp') as Sprite;
        this.addChild(this.levelUp);
    };

    protected setStatText(name: string, value: any) {
        if (/Num$/.test(name)) {
            var fVal: any = Math.floor(value);
            var dispText: string;

            if (fVal >= 10000) {
                dispText = "++++";
            }
            else {
                dispText = String(fVal);
            }

            (this.getChildByName(name) as TextField).htmlText = dispText
        }
        else
            (this.getChildByName(name) as TextField).htmlText = value;
    };

    protected setStatBar(name: string, progress: number) {
        this.getChildByName(name).width = Math.round(progress * 115);
    };

    // <- statsScreenRefresh
    public refresh(): void {
        // this.show();
        // this.visible = true;

        this.setStatText("coreStatsText",
            "<b><u>Name : {NAME}</u>\nCore Stats</b>"
                .replace("{NAME}", this.model.player.short));

        this.setStatText("strNum", this.model.player.str);
        this.setStatText("touNum", this.model.player.tou);
        this.setStatText("speNum", this.model.player.spe);
        this.setStatText("inteNum", this.model.player.inte);
        this.setStatText("libNum", this.model.player.lib);
        this.setStatText("senNum", this.model.player.sens);
        this.setStatText("corNum", this.model.player.cor);
        this.setStatText("fatigueNum", this.model.player.fatigue);
        this.setStatText("HPNum", this.model.player.HP);
        this.setStatText("lustNum", this.model.player.lust);
        this.setStatText("levelNum", this.model.player.level);
        this.setStatText("xpNum", this.model.player.XP);

        this.setStatText("timeText",
            "<b><u>Day #: {DAYS}</u></b>\n<b>Time : {HOURS}:00</b>"
                .replace("{DAYS}", this.model.time.days)
                .replace("{HOURS}", this.model.time.hours));

        this.setStatBar("strBar", this.model.player.str / 100);
        this.setStatBar("touBar", this.model.player.tou / 100);
        this.setStatBar("speBar", this.model.player.spe / 100);
        this.setStatBar("inteBar", this.model.player.inte / 100);
        this.setStatBar("libBar", this.model.player.lib / 100);
        this.setStatBar("sensBar", this.model.player.sens / 100);
        this.setStatBar("corBar", this.model.player.cor / 100);
        this.setStatBar("fatigueBar", this.model.player.fatigue / 100);
        this.setStatBar("HPBar", this.model.player.HP / this.model.maxHP());
        this.setStatBar("lustBar", this.model.player.lust / 100);
        this.setStatText("gemsNum", this.model.player.gems);
    };

    // <- showStats
    public show() {
        // make all the stats DOs visible.
        this.refresh();
        this.visible = true;
    };

    // <- hideStats
    public hide() {
        // body...
        this.visible = false;
    };

    // <- hideUpDown
    public hideUpDown() {
        var ci,
            cc = this.upDownsContainer.numChildren;

        this.upDownsContainer.visible = false;

        // children also need to be hidden because they're selectively shown on change.
        for (ci = 0; ci < cc; ++ci) {
            this.upDownsContainer.getChildAt(ci).visible = false;
        }

        this.hideLevelUp();
    };

    public showUpDown() {
        function _oldStatNameFor(statName: string) {
            return 'old' + statName.charAt(0).toUpperCase() + statName.substr(1);
        }

        var statName: string,
            oldStatName: string,
            allStats: any[];

        this.upDownsContainer.visible = true;

        allStats = ["str", "tou", "spe", "inte", "lib", "sens", "cor", "lust"];

        for (statName of allStats) {
            oldStatName = _oldStatNameFor(statName);

            if (this.model.player[statName] > this.model.oldStats[oldStatName]) {
                this.showStatUp(statName);
            }
            if (this.model.player[statName] < this.model.oldStats[oldStatName]) {
                this.showStatDown(statName);
            }
        }
    };

    public showLevelUp(): void {
        this.levelUp.visible = true;
    };

    public hideLevelUp(): void {
        this.levelUp.visible = false;
    };

    public showStatUp(statName: string): void {
        var statUp: DisplayObject,
            statDown: DisplayObject;

        statUp = this.upDownsContainer.getChildByName(statName + 'Up');
        statDown = this.upDownsContainer.getChildByName(statName + 'Down');

        statUp.visible = true;
        statDown.visible = false;
    };

    public showStatDown(statName: string): void {
        var statUp: DisplayObject,
            statDown: DisplayObject;

        statUp = this.upDownsContainer.getChildByName(statName + 'Up');
        statDown = this.upDownsContainer.getChildByName(statName + 'Down');

        statUp.visible = false;
        statDown.visible = true;
    };
}
