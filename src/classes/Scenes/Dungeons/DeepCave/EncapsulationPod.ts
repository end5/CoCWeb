import {
    BUTT_RATING_BUTTLESS,
    HIP_RATING_SLENDER,
    SKIN_TYPE_FUR,
    SKIN_TYPE_PLAIN,
    SKIN_TYPE_SCALES,
} from "../../../../includes/appearanceDefs";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

/**
 * ...
 *
 * @author Fake-Name
 */

// This doesn't work, because there is some obnoxious issues with the fact that we only have one instance of monster at any time, and static evaluation
// of the game leads the compiler to not know if setDescriptionForPlantPot() is available, therefore resulting in an error

export class EncapsulationPod extends Monster {
    protected performCombatAction(): void {
        this.game.encapsulationPodAI();
    }

    public defeated(hpVictory: boolean): void {
        this.game.encapsulationVictory();
    }

    public get long(): string {
        // [Round 1 Description]
        let _long: string;
        if (this.findStatusAffect(StatusAffects.Round) < 0)
            _long = `You're totally trapped inside a pod!  The walls are slimy and oozing moisture that makes the air sickeningly sweet.  It makes you feel a little dizzy.  Tentacles are climbing up your ${this.game.player.legs()} towards your crotch, doing their best to get under you ${
                this.game.player.armorName
            }.  There's too many to try to pull away.  Your only chance of escape is to create a way out!`;
        // [Round 2 Description]
        else if (this.statusAffectv1(StatusAffects.Round) == 2) {
            _long =
                "You're still trapped inside the pod!  By now the walls are totally soaked with some kind of viscous slime.  The smell of it is unbearably sweet and you have to put a hand against the wall to steady yourself.  Warm tentacles are curling and twisting underneath your armor, caressing every ";
            if (this.player.skinType == SKIN_TYPE_FUR) _long += "furry ";
            if (this.player.skinType == SKIN_TYPE_SCALES) _long += "scaley ";
            _long += `inch of your ${this.player.legs()}, crotch, and ${this.game.assDescript()}.`;
        }
        // [Round 3 Description]
        else if (this.statusAffectv1(StatusAffects.Round) == 3) {
            _long =
                "You're trapped inside the pod and being raped by its many tentacles!   The pooling slime is constantly rising, and in a few moments it will have reached your groin.  The viscous sludge makes it hard to move and the smell of it is making it even harder to think or stand up.  The tentacles assaulting your groin don't stop moving for an instant, and in spite of yourself, some part of you wants them to make you cum quite badly.";
        }
        // [Round 4 Description]
        else {
            _long =
                "You're trapped inside the pod and being violated by tentacles from the shoulders down!  The slime around your waist is rising even faster now.  It will probably reach ";
            if (this.player.biggestTitSize() >= 1)
                _long += `the underside of your ${this.game.allBreastsDescript()}`;
            else _long += "your chest";
            _long +=
                " in moments.  You're being fucked by a bevy of tentacles while your nipples are ";
            if (!this.player.hasFuckableNipples()) _long += "fondled ";
            else _long += "fucked ";
            _long +=
                "by more of the slippery fungal protrusions.  It would be so easy to just relax back in the fluid and let it cradle you while you're pleasured.  You barely even smell the sweet, thought-killing scent from before, but your hips are rocking on their own and you stumble every time you try to move.  Your resistance is about to give out!";
        }
        // [DAMAGE DESCRIPTS – Used All Rounds]
        // [Greater than 80% Life]
        if (this.HPRatio() > 0.8) {
            _long +=
                "  The pulsing luminescence continues to oscillate in a regular rhythm.  You haven't done enough damage to the thing to affect it in the slightest.";
        }
        // [Greater than 60% Life]
        else if (this.HPRatio() > 0.6) {
            _long +=
                "  Your attacks have turned a part of the wall a sickly black color, and it no longer glows along with the rest of your chamber.";
        }
        // [Greater than 40% Life]
        else if (this.HPRatio() > 0.4) {
            _long +=
                "  You've dented the wall with your attacks.  It's permanently deformed and bruised solid black from your struggles.  Underneath the spongy surface you can feel a rock-solid core that's beginning to give.";
        }
        // Greater than 20% Life]
        else if (this.HPRatio() > 0.2) {
            _long +=
                "  You have to blink your eyes constantly because the capsule's bio-luminescent lighting is going nuts.  The part of the wall you're going after is clearly dead, but the rest of your fungal prison is flashing in a crazy, panicked fashion.";
        }
        // [Greater than 0% Life]
        else {
            _long +=
                "  You can see light through the fractured wall in front of you!  One more solid strike should let you escape!";
        }
        return _long;
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "pod";
        this.imageName = "pod";
        // this.long = "";
        // this.plural = false;
        this.initGenderless();
        this.createBreastRow(0, 0);
        this.tallness = 120;
        this.hipRating = HIP_RATING_SLENDER;
        this.buttRating = BUTT_RATING_BUTTLESS;
        this.skinTone = "purple";
        this.skinType = SKIN_TYPE_PLAIN;
        this.skinDesc = "covering";
        this.hairColor = "black";
        this.hairLength = 0;
        this.initStrTouSpeInte(90, 1, 1, 1);
        this.initLibSensCor(1, 1, 100);
        this.weaponName = "pod";
        this.weaponVerb = "pod";
        this.armorName = "pod";
        this.bonusHP = 450;
        this.lust = 10;
        this.lustVuln = 0;
        this.temperment = EncapsulationPod.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 12;
        this.gems = 1;
        this.additionalXP = 80;
        this.drop = new WeightedDrop(this.weapons.JRAPIER, 1);
        this.special1 = this.special1;
        this.special2 = this.special2;
        this.special3 = this.special3;
        this.checkMonster();
    }
}
