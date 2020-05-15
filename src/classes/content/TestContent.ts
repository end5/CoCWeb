import { trace } from "../../console";
import { BaseContent } from "../BaseContent";

/**
 * ...
 *
 * @author Gedan
 */
export class TestContent extends BaseContent {
    public cheatSheet(): void {
        this.clearOutput();

        this.outx("<b>Parser Cheet Sheet:</b>\n\n");
        this.outx("Descriptor (descriptor.as) Functions:\n");

        this.outx(`\nsackDescript ${this.sackDescript()}`);
        this.outx(`\ncockClit ${this.cockClit}`);
        //
        //  outx("\nballs " + balls(0, 0));
        this.outx(`\nsheathDesc ${this.player.sheathDescription()}`);
        this.outx(`\nchestDesc ${this.chestDesc()}`);
        this.outx(`\nallChestDesc ${this.allChestDesc()}`);
        this.outx(`\nsMultiCockDesc ${this.player.sMultiCockDesc()}`);
        this.outx(`\nSMultiCockDesc ${this.player.SMultiCockDesc()}`);
        this.outx(`\noMultiCockDesc ${this.player.oMultiCockDesc()}`);
        this.outx(`\nOMultiCockDesc ${this.player.OMultiCockDesc()}`);
        this.outx(`\ntongueDescript ${this.tongueDescript()}`);
        this.outx(`\nballsDescriptLight false ${this.ballsDescriptLight(false)}`);
        this.outx(`\nballsDescriptLight true ${this.ballsDescriptLight(true)}`);
        this.outx(`\nballDescript ${this.ballDescript()}`);
        this.outx(`\nballsDescript ${this.ballsDescript()}`);
        this.outx(`\nsimpleBallsDescript ${this.simpleBallsDescript()}`);
        this.outx(`\nassholeDescript ${this.assholeDescript()}`);
        this.outx(`\nhipDescript ${this.hipDescript()}`);
        this.outx(`\nassDescript ${this.assDescript()}`);
        this.outx(`\nbuttDescript ${this.buttDescript()}`);
        this.outx(`\nnippleDescript ${this.nippleDescript(0)}`);
        this.outx(`\nhairDescript ${this.hairDescript()}`);
        this.outx(`\nhairOrFur ${this.hairOrFur()}`);
        this.outx(`\nclitDescript ${this.clitDescript()}`);
        this.outx(`\nvaginaDescript ${this.vaginaDescript()}`);
        this.outx(`\nallVaginaDescript ${this.allVaginaDescript()}`);
        this.outx(`\nmultiCockDescriptLight ${this.multiCockDescriptLight()}`);
        this.outx(`\ncockAdjective ${this.player.cockAdjective()}`);
        this.outx(`\ncockDescript ${this.cockDescript(0)}`);
        this.outx(`\nbiggestBreastSizeDescript ${this.biggestBreastSizeDescript()}`);
        this.outx(`\nbreaseSize 5${this.breastSize(5)}`);
        this.outx(`\nbreastDescript ${this.breastDescript(0)}`);
        this.outx(`\ncockHead ${this.player.cockHead()}`);
        this.outx(`\nbreastCup 5 ${this.player.breastCup(5)}`);

        this.outx("\n\nParser Tags (Single)L\n");
        this.outx("\naagility [agility]");
        this.outx("\narmor [armor]");
        this.outx("\narmorname [armorname]");
        this.outx("\nass [ass]");
        this.outx("\nasshole [asshole]");
        this.outx("\nballs [balls]");
        this.outx("\nboyfriend [boyfriend]");
        this.outx("\nbutt [butt]");
        this.outx("\nbutthole [butthole]");
        this.outx("\nchest [chest]");
        this.outx("\nclit [clit]");
        this.outx("\ncock [cock]");
        this.outx("\ncockhead [cockhead]");
        this.outx("\ncocks [cocks]");
        this.outx("\ncunt [cunt]");
        this.outx("\neachcock [eachCock]");
        this.outx("\nevade [evade]");
        this.outx("\nface [face]");
        this.outx("\nfeet [feet]");
        this.outx("\nfoot [foot]");
        this.outx("\nfullchest [fullchest]");
        this.outx("\nhair [hair]");
        this.outx("\nhairorfur [hairorfur]");
        this.outx("\nhe [he]");
        this.outx("\nhim [him]");
        this.outx("\nhips [hips]");
        this.outx("\nhis [his]");
        this.outx("\nleg [leg]");
        this.outx("\nlegs [legs]");
        this.outx("\nman [man]");
        this.outx("\nmaster [master]");
        this.outx("\nmisdirection [misdirection]");
        this.outx("\nmulticockdescriptlight [multicockdescriptlight]");
        this.outx("\nname [name]");
        this.outx("\nnipple [nipple]");
        this.outx("\nnipples [nipples]");
        this.outx("\nonecock [onecock]");
        this.outx("\npg [pg]");
        this.outx("\npussy [pussy]");
        this.outx("\nsack [sack]");
        this.outx("\nsheath [sheath]");
        this.outx("\nskin [skin]");
        this.outx("\nskinfurscales [skinfurscales]");
        this.outx("\ntongue [tongue]");
        this.outx("\nvag [vag]");
        this.outx("\nvagina [vagina]");
        this.outx("\nvagorass [vagorass]");
        this.outx("\nweapon [weapon]");
        this.outx("\nweaponname [weaponname]");

        trace("Spammed!");
        this.doNext(this.camp.returnToCampUseOneHour);
    }
}
