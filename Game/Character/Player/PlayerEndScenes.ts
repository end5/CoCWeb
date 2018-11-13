import { randInt } from '../../../Engine/Utilities/SMath';
import { DefeatType } from '../../Combat/DefeatEvent';
import { EndScenes } from '../../Combat/EndScenes';
import { NextScreenChoices } from '../../ScreenDisplay';
import { Character } from '../Character';
import { CView } from '../../../Page/ContentView';
import { passTime } from '../../Menus/InGame/PlayerMenu';

export class PlayerEndScenes extends EndScenes {
    public hasEscaped(enemy: Character): boolean {
        return false;
    }

    public hasDefeated(enemy: Character): boolean {
        return false;
    }

    public claimsVictory(howYouWon: DefeatType, enemy: Character): void {
        if (howYouWon === DefeatType.HP) {
            CView.clear();
            CView.text("You defeat " + enemy.desc.a + enemy.desc.short + ".\n");
        }
        else if (howYouWon === DefeatType.Lust) {
            CView.clear();
            CView.text("You smile as " + enemy.desc.a + enemy.desc.short + " collapses and begins masturbating feverishly.");
        }
    }

    public criesInDefeat(howYouLost: DefeatType, enemy: Character): void {
        if (howYouLost === DefeatType.HP) {
            CView.clear();
            CView.text("Your wounds are too great to bear, and you fall unconscious.");
        }
        else if (howYouLost === DefeatType.Lust) {
            CView.clear();
            CView.text("Your desire reaches uncontrollable levels, and you end up openly masturbating.\n\nThe lust and pleasure cause you to black out for hours on end.");
        }
    }

    protected victoryScene(howYouWon: DefeatType, enemy: Character): NextScreenChoices {
        return { next: passTime(1) };
    }

    protected defeatScene(howYouLost: DefeatType, enemy: Character): NextScreenChoices {
        let lostGems: number = randInt(10) + 1;
        if (lostGems > this.char.inventory.gems) lostGems = this.char.inventory.gems;
        CView.text("\n\nYou'll probably wake up in eight hours or so, missing " + lostGems + " gems.");
        this.char.inventory.gems -= lostGems;

        let temp = randInt(10) + 1 + Math.round(enemy.stats.level / 2);
        if (temp > this.char.inventory.gems) temp = this.char.inventory.gems;

        const gemsLost = randInt(20);

        CView.text("\n\nYou'll probably come to your senses in eight hours or so");
        if (this.char.inventory.gems > 1)
            CView.text(", missing " + gemsLost + " gems.");
        else if (this.char.inventory.gems === 1)
            CView.text(", missing your only gem.");
        else CView.text(".");

        this.char.inventory.gems -= temp;

        return { next: passTime(8) };
    }
}
