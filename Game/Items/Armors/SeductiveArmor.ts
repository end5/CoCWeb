import { Armor } from './Armor';
import { ArmorName } from './ArmorName';
import { Character } from '../../Character/Character';
import { ItemDesc } from '../ItemDesc';
import { Piercing, PiercingType } from '../Misc/Piercing';
import { CView } from '../../../Page/ContentView';
import { ceraphIsFollower } from '../../Scenes/NPCs/CeraphFollowerScene';
import { mf } from '../../Descriptors/GenderDescriptor';
import { ArmorLib } from './ArmorLib';
import { CeraphFlags } from '../../Scenes/NPCs/Ceraph';

export class SeductiveArmor extends Armor {
    public constructor() {
        super(ArmorName.SeductiveArmor, new ItemDesc("SeductA", "a set of scandalously seductive armor", "A complete suit of scalemail shaped to hug tightly against every curve, it has a solid steel chest-plate with obscenely large nipples molded into it.  The armor does nothing to cover the backside, exposing the wearer's cheeks to the world."), "scandalously seductive armor", 0, 1);
    }

    public hasNipplePiercing(character: Character): boolean {
        for (const nipple of character.inventory.piercings.nipples)
            if (nipple.isEquipped())
                return true;
        return false;
    }

    public useText(character: Character): void {
        if (!ceraphIsFollower()) {
            CView.text("After struggling to get it on, you feel a sudden shift in your scandalous new armor.  To your horror, it begins folding into itself, revealing more and more of your " + character.body.skin.desc + " and the comfortable underclothes you had on underneath it.  The transforming armor gradually covers less and less of you until it's little more than a pair of huge nipple-coverings and a silver chain.  A loud KA-CHUNK startles you, and then you're screaming as you feel something stabbing through your nipples.  Goosebumps cover your flesh as you twist in unexpected agony.\n\n");
            CView.text("After you've had a chance to recover, you inspect your abused nipples and discover that your armor has totally disappeared.  The only thing left behind is a pair of seamless black nipple-studs, embedded into your vulnerable flesh.  There doesn't appear to be any way to remove them either.  Thankfully, your comfortable underclothes have been unaffected by the sudden disappearance of your armor.  The thought of having to run around naked stays stubbornly locked in your mind, and you mentally curse the demon for what she's done to you.\n\n");
            CView.text("As if summoned by your thoughts, you can hear her voice on the wind, taunting you again, \"<i>Enjoy your new bondage fetish, pet!  One more piercing and you'll be ready.  Don't have too much fun being tied down and fucked, ok?</i>\"\n\n");
            const hasNipplePiercing = character.inventory.piercings.nipples.find((equipSlot) => equipSlot.isEquipped());
            if (hasNipplePiercing)
                CView.text("You're left to wonder - where did the old piercings go?\n\n");
            for (const nipple of character.inventory.piercings.nipples)
                nipple.equip(new Piercing(PiercingType.Stud, "seamless black nipple-studs", "Seamless black nipple-studs"));
            CeraphFlags.PC_FETISH = 2;
        }
        else {
            CView.text("As you're trying to put on the armor, Ceraph appears from nowhere, apologizing profusely and stopping you before you can slide the last strap into place.  \"<i>Please don't put that on, " + mf(character, "Master", "Mistress") + ".  I trapped that armor to pierce new fetishes the unwary so that I could add them to my harem.  I'd hate to garner your anger.</i>\"  She wrings her hands nervously.  \"<i>If you'll hand it here, I'll get rid of it for you. Noone would buy it anyway.</i>\"");
            CView.text("\n\nYou shrug and toss her the armor, disappointed that you're down a potentially sexy outfit.");
            CView.text("\n\nCeraph bows gratefully and swiftly backpedals, offering, \"<i>And if you ever want me to stuff you full of magic fetishes, just ask, okay?</i>\"");
            CView.text("\n\nShe's gone before you can reply.  Sometimes she's more trouble than she's worth.");
        }
    }

    public onEquip(character: Character): Armor {
        const underClothes = ArmorLib.get(ArmorName.ComfortUndercloth);
        if (underClothes) {
            underClothes.onEquip(character);
            return underClothes;
        }
        throw new Error("Error: Underclothes not found.");
    }
}
