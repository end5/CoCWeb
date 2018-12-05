import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { ArmType } from 'Game/Character/Body/Arms';
import { BreastRow } from 'Game/Character/Body/BreastRow';
import { Cock } from 'Game/Character/Body/Cock';
import { EyeType } from 'Game/Character/Body/Eyes';
import { FaceType } from 'Game/Character/Body/Face';
import { AntennaeType } from 'Game/Character/Body/Antennae';
import { HornType } from 'Game/Character/Body/Horns';
import { LegType } from 'Game/Character/Body/Legs';
import { SkinType } from 'Game/Character/Body/Skin';
import { TongueType } from 'Game/Character/Body/Tongue';
import { Vagina, VaginaType } from 'Game/Character/Body/Vagina';
import { WingType } from 'Game/Character/Body/Wings';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { ItemDesc } from '../ItemDesc';
import { Gender } from 'Game/Character/Body/GenderIdentity';
import { CView } from 'Page/ContentView';
import { humanRaceScore } from 'Game/Character/RaceScore';

export class Hummus extends Consumable {
    public constructor() {
        super(ConsumableName.Hummus, new ItemDesc("Hummus ", "a blob of cheesy-looking hummus", "This pile of hummus doesn't look that clean, and you really don't remember where you got it from.  It looks bland.  So bland that you feel blander just by looking at it."));
    }

    public use(character: Character) {
        CView.clear();
        /*if (Game.debug) {
            CView.text("You're about to eat the humus when you see it has bugs in it. Not wanting to eat bugged humus or try to debug it you throw it into the portal and find something else to eat.");
            character.inventory.items.destroyItems(consumables.HUMMUS_, 1);
            return;
        }*/
        CView.text("You shovel the stuff into your face, not sure WHY you're eating it, but once you start, you just can't stop.  It tastes incredibly bland, and with a slight hint of cheese.");
        character.stats.str = 30;
        character.stats.spe = 30;
        character.stats.tou = 30;
        character.stats.int = 30;
        character.stats.sens = 20;
        character.stats.lib = 25;
        character.stats.cor = 5;
        character.stats.lust = 10;
        character.body.hair.type = 0;
        if (humanRaceScore(character) > 4) {
            CView.text("\n\nYou blink and the world twists around you.  You feel more like yourself than you have in a while, but exactly how isn't immediately apparent.  Maybe you should take a look at yourself?");
        }
        else {
            CView.text("\n\nYou cry out as the world spins around you.  You're aware of your entire body sliding and slipping, changing and morphing, but in the sea of sensation you have no idea exactly what's changing.  You nearly black out, and then it's over.  Maybe you had best have a look at yourself and see what changed?");
        }
        character.body.arms.type = ArmType.HUMAN;
        character.body.eyes.type = EyeType.HUMAN;
        character.body.tongue.type = TongueType.HUMAN;
        character.body.face.type = FaceType.HUMAN;
        character.body.horns.count = 0;
        character.body.horns.type = HornType.NONE;
        character.body.antennae.type = AntennaeType.NONE;
        character.body.legs.type = LegType.HUMAN;
        character.body.wings.type = WingType.NONE;
        character.body.wings.desc = "non-existant";
        character.body.tails.clear();
        character.body.skin.type = SkinType.PLAIN;
        character.body.skin.desc = "skin";
        character.body.skin.adj = "";
        if (character.body.fertility > 15) character.body.fertility = 15;
        if (character.body.cumMultiplier > 50) character.body.cumMultiplier = 50;
        // Clear cocks
        character.body.cocks.clear();
        // Reset dongs!
        if (character.gender === Gender.MALE || character.gender === Gender.HERM) {
            character.body.cocks.add(new Cock(6, 1));
            character.body.balls.size = 2;
            if (character.body.balls.count > 2) character.body.balls.count = 2;
        }
        // Non duders lose any nuts
        else {
            character.body.balls.count = 0;
            character.body.balls.size = 2;
        }
        // Clear vaginas
        let virgin: boolean = false;
        for (const vagina of character.body.vaginas) {
            if (vagina.virgin) {
                virgin = true;
                break;
            }
        }
        character.body.vaginas.clear();
        // Reset vaginal virginity to correct state
        if (character.gender >= 2) {
            const newVagina = new Vagina();
            newVagina.virgin = virgin;
            newVagina.type = VaginaType.HUMAN;
            character.body.vaginas.add(newVagina);
        }
        character.body.clit.length = .25;
        // Tighten butt!
        character.body.butt.rating = 2;
        character.body.hips.rating = 2;
        if (character.body.butt.looseness > 1) character.body.butt.looseness = 1;
        if (character.body.butt.wetness > 1) character.body.butt.wetness = 1;
        // Clear breasts
        character.body.chest.clear();
        const newBreastRow = new BreastRow();
        newBreastRow.nipples.length = .25;
        character.body.chest.add(newBreastRow);
        // Girls and herms get bewbs back
        if (character.gender > 2) {
            character.body.chest.firstRow.rating = 2;
        }
        else character.body.chest.firstRow.rating = 0;
        character.body.neck.gills = false;
        character.effects.removeByName(EffectType.Uniball);
        character.effects.removeByName(EffectType.BlackNipples);
    }
}
