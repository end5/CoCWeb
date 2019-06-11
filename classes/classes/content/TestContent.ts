import { BaseContent } from "../BaseContent";

import { trace } from "../../console";

/**
 * ...
 * @author Gedan
 */
export class TestContent extends BaseContent {


    public cheatSheet(): void {
        this.clearOutput();

        this.outputText("<b>Parser Cheet Sheet:</b>\n\n");
        this.outputText("Descriptor (descriptor.as) Functions:\n");

        this.outputText("\nsackDescript " + this.sackDescript());
        this.outputText("\ncockClit " + this.cockClit);
        //			outputText("\nballs " + balls(0, 0));
        this.outputText("\nsheathDesc " + this.player.sheathDescription());
        this.outputText("\nchestDesc " + this.chestDesc());
        this.outputText("\nallChestDesc " + this.allChestDesc());
        this.outputText("\nsMultiCockDesc " + this.player.sMultiCockDesc());
        this.outputText("\nSMultiCockDesc " + this.player.SMultiCockDesc());
        this.outputText("\noMultiCockDesc " + this.player.oMultiCockDesc());
        this.outputText("\nOMultiCockDesc " + this.player.OMultiCockDesc());
        this.outputText("\ntongueDescript " + this.tongueDescript());
        this.outputText("\nballsDescriptLight false " + this.ballsDescriptLight(false));
        this.outputText("\nballsDescriptLight true " + this.ballsDescriptLight(true));
        this.outputText("\nballDescript " + this.ballDescript());
        this.outputText("\nballsDescript " + this.ballsDescript());
        this.outputText("\nsimpleBallsDescript " + this.simpleBallsDescript());
        this.outputText("\nassholeDescript " + this.assholeDescript());
        this.outputText("\nhipDescript " + this.hipDescript());
        this.outputText("\nassDescript " + this.assDescript());
        this.outputText("\nbuttDescript " + this.buttDescript());
        this.outputText("\nnippleDescript " + this.nippleDescript(0));
        this.outputText("\nhairDescript " + this.hairDescript());
        this.outputText("\nhairOrFur " + this.hairOrFur());
        this.outputText("\nclitDescript " + this.clitDescript());
        this.outputText("\nvaginaDescript " + this.vaginaDescript());
        this.outputText("\nallVaginaDescript " + this.allVaginaDescript());
        this.outputText("\nmultiCockDescriptLight " + this.multiCockDescriptLight());
        this.outputText("\ncockAdjective " + this.player.cockAdjective());
        this.outputText("\ncockDescript " + this.cockDescript(0));
        this.outputText("\nbiggestBreastSizeDescript " + this.biggestBreastSizeDescript());
        this.outputText("\nbreaseSize 5" + this.breastSize(5));
        this.outputText("\nbreastDescript " + this.breastDescript(0));
        this.outputText("\ncockHead " + this.player.cockHead());
        this.outputText("\nbreastCup 5 " + this.player.breastCup(5));

        this.outputText("\n\nParser Tags (Single)L\n");
        this.outputText("\naagility [agility]");
        this.outputText("\narmor [armor]");
        this.outputText("\narmorname [armorname]");
        this.outputText("\nass [ass]");
        this.outputText("\nasshole [asshole]");
        this.outputText("\nballs [balls]");
        this.outputText("\nboyfriend [boyfriend]");
        this.outputText("\nbutt [butt]");
        this.outputText("\nbutthole [butthole]");
        this.outputText("\nchest [chest]");
        this.outputText("\nclit [clit]");
        this.outputText("\ncock [cock]");
        this.outputText("\ncockhead [cockhead]");
        this.outputText("\ncocks [cocks]");
        this.outputText("\ncunt [cunt]");
        this.outputText("\neachcock [eachCock]");
        this.outputText("\nevade [evade]");
        this.outputText("\nface [face]");
        this.outputText("\nfeet [feet]");
        this.outputText("\nfoot [foot]");
        this.outputText("\nfullchest [fullchest]");
        this.outputText("\nhair [hair]");
        this.outputText("\nhairorfur [hairorfur]");
        this.outputText("\nhe [he]");
        this.outputText("\nhim [him]");
        this.outputText("\nhips [hips]");
        this.outputText("\nhis [his]");
        this.outputText("\nleg [leg]");
        this.outputText("\nlegs [legs]");
        this.outputText("\nman [man]");
        this.outputText("\nmaster [master]");
        this.outputText("\nmisdirection [misdirection]");
        this.outputText("\nmulticockdescriptlight [multicockdescriptlight]");
        this.outputText("\nname [name]");
        this.outputText("\nnipple [nipple]");
        this.outputText("\nnipples [nipples]");
        this.outputText("\nonecock [onecock]");
        this.outputText("\npg [pg]");
        this.outputText("\npussy [pussy]");
        this.outputText("\nsack [sack]");
        this.outputText("\nsheath [sheath]");
        this.outputText("\nskin [skin]");
        this.outputText("\nskinfurscales [skinfurscales]");
        this.outputText("\ntongue [tongue]");
        this.outputText("\nvag [vag]");
        this.outputText("\nvagina [vagina]");
        this.outputText("\nvagorass [vagorass]");
        this.outputText("\nweapon [weapon]");
        this.outputText("\nweaponname [weaponname]");

        trace("Spammed!");
        this.doNext(this.camp.returnToCampUseOneHour);
    }

}

