import { BaseContent } from "../../../BaseContent";
import { LivingStatue } from "./LivingStatue";

/**
 * ...
 *
 * @author Gedan
 */
export class LivingStatueScenes extends BaseContent {
    public encounter(): void {
        this.clearOutput();
        this.outx(
            "The immense statue gives a mighty groan as you near and shudders, shaking loose years of dust and grime. A few ravens cry in distress as they're shaken loose from their roosts. Taking a step back, you watch as the mammoth figure pushes itself up to a standing position. It towers above, at least thirty feet tall, and easily lifts a hammer carved from the same marble as its gleaming muscles."
        );
        if (this.silly())
            this.outx(
                " On the plus side, it seems to lack knees. That should make dodging its attacks a bit easier."
            );
        this.outx(
            'Moss clings to its chin an age-gifted beard. Bits of it shake loose as it speaks. <i>"Tresspasser!"</i>'
        );

        this.outx(
            "\n\nStriding towards you, the behemoth raises its hammer overhead. Dust cascades from its seamless joints, and it's only as it closes distance that you spot a pockmarks and near-invisible surface cracks, the hallmarks of its age. You'll have to fight this alabaster destroyer if you want to live!"
        );

        this.startCombat(new LivingStatue());
    }

    public beatUpDaStatue(hpVictory: boolean): void {
        this.clearOutput();
        this.outx(
            "Cracks spiderweb out from the point of your last strike, spreading like wildfire across the surface of the stone giant. It groans in pain as its face slowly freezes, locked in a grimace of inhuman suffering before the whole of it comes apart. Chunks of marble fall, kicking up a cloud of white dust and dirt. When it clears, there's nothing left but two marble feet, amputated at the ankle, standing amidst a field of rubble."
        );
        this.outx("\n\nA gleaming, purple stone in the center catches your eye.");

        this.menu();
        this.addButton(0, "Take Stone", this.takeTheStone);
    }

    private takeTheStone(): void {
        this.clearOutput();

        this.outx(
            "You carefully step through the cratered rubble to claim your prize. It's a chunk of lethicite,"
        );

        // 9999 dis shit.
        if (this.player.hasKeyItem("Marae's Lethicite")) this.outx(" easily as big as Marae's.");
        else
            this.outx(
                " like the purple crystals in the factory, only this one is three times as big."
            );
        this.outx("\n\n<b>Lethicite acquired!</b>");

        this.player.createKeyItem("Stone Statue Lethicite", 0, 0, 0, 0);

        this.cleanupAfterCombat(this.getGame().d3.resumeFromFight);
    }

    public fuckinMarbleOP(hpVictory: boolean, pcCameWorms: boolean): void {
        this.clearOutput();
        this.outx(
            "You slump to your knees, overwhelmed and unable to see the shadow of the falling hammer. Your last thoughts are of regret."
        );

        this.getGame().gameOver();
    }
}
