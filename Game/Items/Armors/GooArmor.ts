import { Armor } from './Armor';
import { ArmorName } from './ArmorName';
import { Character } from '../../Character/Character';
import { ItemDesc } from '../ItemDesc';
import { describeCocksLight } from '../../Descriptors/CockDescriptor';
import { Gender } from '../../Body/GenderIdentity';
import { CView } from '../../../Page/ContentView';
import { ValeriaFlags } from '../../Scenes/NPCs/Valeria';

export class GooArmor extends Armor {
    public constructor() {
        super(ArmorName.GooArmor, new ItemDesc("GooArmr", "Valeria, the goo-girl armor", "This shining suit of platemail is more than just platemail - it houses the goo-girl, Valeria!  Together, they provide one tough defense, but you had better be okay with having goo handling your junk while you fight if you wear this!"), "goo armor", 22, 1);
    }

    public useText(character: Character): void { // Produces any text seen when equipping the armor normally
        CView.text("With an ecstatic smile, the goo-armor jumps to her feet and throws her arms around your shoulders.  \"<i>Oh, this is going to be so much fun!  Thank you thank you thank you!  I promise I'll keep you nice and snug and safe, don't you worry.  Oooh, a real adventure again!  WHEEE!</i>\"");
        CView.text("\n\nBefore she can get too excited, you remind the goo that she's supposed to be your armor right about now.  Clasping her hands over her mouth in embarrassment, she utters a muted apology and urges you to just \"<i>put me on!</i>\"  Awkwardly, you strip out of your gear and open up the platemail armor and clamber in.  It's wet and squishy, making you shudder and squirm as you squash your new friend flat against the metal armor.");
        CView.text("\n\nEventually, the two of you get situated. The goo-girl slips around your body inside the heavy armor, maneuvering so that your face is unobstructed and your joints, not protected by the armor, are soundly clad in squishy goo.  She even forms a gooey beaver on your new helm, allowing you to open and close her like a visor in battle.  Eventually, her goo settles around your ");
        if (character.body.vaginas.length > 0)
            CView.text("[vagina]");
        if (character.body.vaginas.length > 0 && character.body.cocks.length > 0)
            CView.text(" and ");
        if (character.body.cocks.length > 0)
            CView.text(describeCocksLight(character));
        if (character.gender === Gender.NONE)
            CView.text("groin");
        CView.text(", encasing your loins in case you need a little mid-battle release, she says.");
        CView.text("\n\nAfter a few minutes, you and your armor-friend are settled and ready to go.");
        if (ValeriaFlags.MET_VALERIA) {
            CView.text("  As you ready yourself for the dungeon ahead, the goo giggles into your ear.  \"<i>Oh shit, silly me.  I forgot, my name's Valeria.  Ser Valeria, if you're feeling fancy.</i>\"  You introduce yourself, awkwardly shaking your own hand by way of pleasantries.");
            ValeriaFlags.MET_VALERIA++;
        }
        CView.text("\n\n\"<i>Well alright then, [name]!</i>\" Valeria says excitedly, \"<i>Let's go!</i>\"\n\n");
    }

    public unequipText(): void { // Produces any text seen when removing the armor normally
        CView.text("Valeria picks herself up and huffs, \"<i>Maybe we can adventure some more later on?</i>\" before undulating off towards your camp.\n\n(<b>Valeria now available in the followers tab!</b>)");
    }

    public onEquip(character: Character): void {
        ValeriaFlags.VALARIA_AT_CAMP = 0;
        super.onEquip(character);
    }

    public onUnequip(character: Character): void {
        ValeriaFlags.VALARIA_AT_CAMP = 1;
        super.onUnequip(character);
    }
}
