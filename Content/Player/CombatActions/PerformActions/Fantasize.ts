import { randInt } from 'Engine/Utilities/SMath';
import { BreastRow } from 'Engine/Body/BreastRow';
import { Character } from 'Engine/Character/Character';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { CView } from 'Engine/Display/ContentView';
import { describeBalls } from 'Content/Descriptors/BallsDescriptor';
import { describeNipple } from 'Content/Descriptors/BreastDescriptor';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export class Fantasize extends CombatAction {
    public name = "Fantasize";
    public type = CombatActionType.Fantasize;

    public useAction(character: Character, target: Character): void {
        let lustChange: number = 0;
        CView.clear();
        if (character.inventory.armor.displayName === "goo armor") {
            CView.text("As you fantasize, you feel Valeria rubbing her gooey body all across your sensitive skin");
            if (character.gender > 0) CView.text(" and genitals");
            CView.text(", arousing you even further.\n");
            lustChange = 25 + randInt(character.stats.lib / 8 + character.stats.cor / 8);
        }
        else if (character.body.balls.count > 0 && character.body.balls.size >= 10 && randInt(2) === 0) {
            CView.text("You daydream about fucking " + target.desc.a + target.desc.short + ", feeling your balls swell with seed as you prepare to fuck " + target.desc.objectivePronoun + " full of cum.\n");
            lustChange = 5 + randInt(character.stats.lib / 8 + character.stats.cor / 8);
            CView.text("You aren't sure if it's just the fantasy, but your " + describeBalls(true, true, character) + " do feel fuller than before...\n");
            character.hoursSinceCum += 50;
        }
        else if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 6 && randInt(2) === 0) {
            CView.text("You fantasize about grabbing " + target.desc.a + target.desc.short + " and shoving " + target.desc.objectivePronoun + " in between your jiggling mammaries, nearly suffocating " + target.desc.objectivePronoun + " as you have your way.\n");
            lustChange = 5 + randInt(character.stats.lib / 8 + character.stats.cor / 8);
        }
        else if (character.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 6 && randInt(2) === 0) {
            CView.text("You fantasize about grabbing " + target.desc.a + target.desc.short + " and forcing " + target.desc.objectivePronoun + " against a " + describeNipple(character, character.body.chest.firstRow!) + ", and feeling your milk let down.  The desire to forcefeed SOMETHING makes your nipples hard and moist with milk.\n");
            lustChange = 5 + randInt(character.stats.lib / 8 + character.stats.cor / 8);
        }
        else {
            CView.text("You fill your mind with perverted thoughts about " + target.desc.a + target.desc.short + ", picturing " + target.desc.objectivePronoun + " in all kinds of perverse situations with you.\n");
            lustChange = 10 + randInt(character.stats.lib / 5 + character.stats.cor / 8);
        }
        if (lustChange >= 20) CView.text("The fantasy is so vivid and pleasurable you wish it was happening now.  You wonder if " + target.desc.a + target.desc.short + " can tell what you were thinking.\n\n");
        else CView.text("\n");
        character.stats.lustNoResist += lustChange;
    }
}
