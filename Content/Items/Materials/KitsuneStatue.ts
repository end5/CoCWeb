import { Material } from 'Engine/Items/Material';
import { MaterialName } from '../MaterialName';
import { Character } from 'Engine/Character/Character';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { CView } from 'Engine/Display/ContentView';

export class KitsuneStatue extends Material {
    public constructor() {
        super(
            MaterialName.GoldenStatue,
            new ItemDesc("GldStat", "a golden statue",
                "An intricate golden idol of an androgynous humanoid figure with nine long tails.  It probably had some spiritual significance to its owner."),
            undefined,
            600
        );
    }

    public useText(character: Character) {
        CView.text("You pull out the gold statue and turn it around in your hands a few times, carefully examining the intricate filigree and inscriptions covering the masterfully crafted idol.  Whoever made this certainly put a lot of time and love into their craft." + ((character.stats.cor < 50) ? "  Examining the painstaking detail that went into it, you feel a slight pang of guilt for having stolen it from its rightful place.  You push the thoughts away, reasoning that it won't be missed - after all, the owner was long gone before you arrived." : "") + "\n\n");
        CView.text("It's not much use to you other than decoration, but based on the craftsmanship alone you judge that you could get a fair price for it if you pawned it off.");
    }
}
