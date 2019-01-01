import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { SkinType } from 'Engine/Body/Skin';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { describeOneOfYourCocks } from 'Content/Descriptors/CockDescriptor';
import { describeVagina } from 'Content/Descriptors/VaginaDescriptor';
import { describeButthole } from 'Content/Descriptors/ButtDescriptor';
import { CView } from 'Engine/Display/ContentView';

export class NumbRock extends Consumable {
    public constructor() {
        super(ConsumableName.NumbRock, new ItemDesc("Numb Rox", "a strange packet of candy called 'Numb Rocks'", "This packet of innocuous looking 'candy' guarantees to reduce troublesome sensations and taste delicious."), 15);
    }

    public use(character: Character) {
        CView.clear();
        // Numb rocks lower lust significantly but have a chance of inducing the masturbation preventing effect from minotaur.
        CView.text("You pop open the package of numb rocks and dump it into your waiting mouth.  The strange candy fizzes and pops, leaving the nerves on your tongue feeling a bit deadened as you swallow the sweet mess.");

        if (character.stats.lust >= 33) {
            CView.text("\n\nThe numbness spreads through your body, bringing with it a sense of calm that seems to muffle your sexual urges.");
            character.stats.lust -= 20 + randInt(40);
        }
        if (randInt(5) === 0) {
            if (!character.effects.has(EffectType.Dysfunction)) {
                CView.text("\n\nUnfortunately, the skin of ");
                if (character.body.cocks.length > 0) {
                    CView.text(describeOneOfYourCocks(character));
                    if (character.body.vaginas.length > 0) CView.text(" and");
                    CView.text(" ");
                }
                if (character.body.vaginas.length > 0) {
                    if (character.body.cocks.length <= 0) CView.text("your ");
                    CView.text(describeVagina(character, character.body.vaginas.get(0)) + " ");
                }
                if (!(character.body.cocks.length > 0 || character.body.vaginas.length > 0)) CView.text(describeButthole(character.body.butt) + " ");
                CView.text(" numbs up too.  You give yourself a gentle touch, but are quite disturbed when you realize you can barely feel it.  You can probably still fuck something to get off, but regular masturbation is out of the question...");
                character.effects.create(EffectType.Dysfunction, { expireCountdown: 50 + randInt(100) });
            }
            else {
                CView.text("\n\nSadly your groin becomes even more deadened to sensation.  You wonder how much longer you'll have to wait until you can please yourself again.");
                character.effects.getByName(EffectType.Dysfunction)!.values.expireCountdown = 50 + randInt(100);
            }
        }
        else if (randInt(4) === 0 && character.stats.int > 15) {
            CView.text("\n\nNumbness clouds your mind, making you feel slow witted and dull.  Maybe these candies weren't such a exceptio... fantas... good idea.");
            character.stats.int -= 1 + randInt(5);
        }
        if (!character.effects.has(EffectType.ThickSkin) && character.stats.sens < 30 && randInt(4) === 0) {
            CView.text("Slowly, ");
            if (character.body.skin.type === SkinType.PLAIN) CView.text("your skin");
            else CView.text("the skin under your " + character.body.skin.desc);
            CView.text(" begins to feel duller, almost... thicker.  You pinch yourself and find that your epidermis feels more resistant to damage, almost like natural armor!\n<b>(Thick Skin - Perk Gained!)</b>");
            character.effects.create(EffectType.ThickSkin);
        }
        CView.text("\n\nAfter the sensations pass, your " + character.body.skin.desc + " feels a little less receptive to touch.");
        character.stats.sens += -3;
        if (character.stats.sens < 1) character.stats.sens = 1;
    }
}
