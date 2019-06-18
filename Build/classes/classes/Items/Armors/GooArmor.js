define(["require", "exports", "../Armor", "../../GlobalFlags/kFLAGS"], function (require, exports, Armor_1, kFLAGS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 16.01.14.
     */
    class GooArmor extends Armor_1.Armor {
        constructor() {
            super("GooArmr", "GooArmr", "goo armor", "Valeria, the goo-girl armor", 22, 1, "This shining suit of platemail is more than just platemail - it houses the goo-girl, Valeria!  Together, they provide one tough defense, but you had better be okay with having goo handling your junk while you fight if you wear this!");
        }
        useText() {
            this.outputText("With an ecstatic smile, the goo-armor jumps to her feet and throws her arms around your shoulders.  \"<i>Oh, this is going to be so much fun!  Thank you thank you thank you!  I promise I'll keep you nice and snug and safe, don't you worry.  Oooh, a real adventure again!  WHEEE!</i>\"");
            this.outputText("\n\nBefore she can get too excited, you remind the goo that she's supposed to be your armor right about now.  Clasping her hands over her mouth in embarrassment, she utters a muted apology and urges you to just \"<i>put me on!</i>\"  Awkwardly, you strip out of your gear and open up the platemail armor and clamber in.  It's wet and squishy, making you shudder and squirm as you squash your new friend flat against the metal armor.");
            this.outputText("\n\nEventually, the two of you get situated. The goo-girl slips around your body inside the heavy armor, maneuvering so that your face is unobstructed and your joints, not protected by the armor, are soundly clad in squishy goo.  She even forms a gooey beaver on your new helm, allowing you to open and close her like a visor in battle.  Eventually, her goo settles around your ");
            if (this.game.player.hasVagina())
                this.outputText("[vagina]");
            if (this.game.player.hasVagina() && this.game.player.hasCock())
                this.outputText(" and ");
            if (this.game.player.hasCock())
                this.outputText(this.game.player.multiCockDescriptLight());
            if (this.game.player.gender == 0)
                this.outputText("groin");
            this.outputText(", encasing your loins in case you need a little mid-battle release, she says.");
            this.outputText("\n\nAfter a few minutes, you and your armor-friend are settled and ready to go.");
            if (this.game.flags[kFLAGS_1.kFLAGS.MET_VALERIA] == 0) {
                this.outputText("  As you ready yourself for the dungeon ahead, the goo giggles into your ear.  \"<i>Oh shit, silly me.  I forgot, my name's Valeria.  Ser Valeria, if you're feeling fancy.</i>\"  You introduce yourself, awkwardly shaking your own hand by way of pleasantries.");
                this.game.flags[kFLAGS_1.kFLAGS.MET_VALERIA]++;
            }
            this.outputText("\n\n\"<i>Well alright then, [name]!</i>\" Valeria says excitedly, \"<i>Let's go!</i>\"\n\n");
        }
        removeText() {
            this.outputText("Valeria picks herself up and huffs, \"<i>Maybe we can adventure some more later on?</i>\" before undulating off towards your camp.\n\n(<b>Valeria now available in the followers tab!</b>)");
        }
        playerEquip() {
            this.game.flags[kFLAGS_1.kFLAGS.VALARIA_AT_CAMP] = 0;
            return super.playerEquip();
        }
        playerRemove() {
            this.game.flags[kFLAGS_1.kFLAGS.VALARIA_AT_CAMP] = 1;
            return; //Can't put Valaria in your inventory
        }
    }
    exports.GooArmor = GooArmor;
});
//# sourceMappingURL=GooArmor.js.map