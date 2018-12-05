import { Weapon } from './Weapon';
import { WeaponName } from './WeaponName';
import { WeaponPerkType } from './WeaponPerk';
import { Character } from 'Game/Character/Character';
import { ItemDesc } from '../ItemDesc';
import { CView } from 'Page/ContentView';
import { Flags } from 'Game/Flags';

export const DragonShellShieldFlags = {
    TIMES_EQUIPPED_EMBER_SHIELD: 0,
};

Flags.set("Dragon-Shell Shield", DragonShellShieldFlags);

export class DragonShellShield extends Weapon {
    public constructor() {
        super(WeaponName.DragonShellShield, new ItemDesc("DrgnShl", "a dragon-shell shield", "A durable shield that has been forged from the remains of the dragon egg you found in the swamp.  Absorbs any fluid attacks you can catch, rendering them useless."), "dragon-shell shield", "smack", 0, 1500, [WeaponPerkType.Large]);
    }

    public useText(character: Character): void {
        if (DragonShellShieldFlags.TIMES_EQUIPPED_EMBER_SHIELD === 0) {
            CView.clear();
            CView.text("Turning the sturdy shield over in inspection, you satisfy yourself as to its craftsmanship and adjust the straps to fit your arm snugly.  You try a few practice swings, but find yourself overbalancing at each one due to the deceptive lightness of the material.  Eventually, though, you pick up the knack of putting enough weight behind it to speed it through the air while thrusting a leg forward to stabilize yourself, and try bashing a nearby rock with it.  You smile with glee as ");
            if (character.stats.str < 80)
                CView.text("bits and pieces from the surface of the");
            else
                CView.text("huge shards of the shattered");
            CView.text(" rock are sent flying in all directions.");
            CView.text("\n\nAfter a few more practice bashes and shifts to acquaint yourself with its weight, you think you're ready to try facing an enemy with your new protection.  One last thing... taking off the shield and turning it straps-down, you spit onto the surface.  Satisfyingly, the liquid disappears into the shell as soon as it touches.");
        }
        DragonShellShieldFlags.TIMES_EQUIPPED_EMBER_SHIELD++;
    }
}
