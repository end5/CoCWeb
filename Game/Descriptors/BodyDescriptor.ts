import { BreastRow } from 'Game/Character/Body/BreastRow';
import * as RaceScore from 'Game/Character/RaceScore';
import { Character } from 'Game/Character/Character';
import { Gender } from 'Game/Character/Body/GenderIdentity';
import { mf } from './GenderDescriptor';
import { describeVagina } from './VaginaDescriptor';
import { describeButthole } from './ButtDescriptor';

export function describeBody(character: Character): string {
    let description: string = "";
    // OLD STUFF
    // SUPAH THIN
    if (character.body.thickness < 10) {
        // SUPAH BUFF
        if (character.body.tone > 90)
            description += "a lithe body covered in highly visible muscles";
        else if (character.body.tone > 75)
            description += "an incredibly thin, well-muscled frame";
        else if (character.body.tone > 50)
            description += "a very thin body that has a good bit of muscle definition";
        else if (character.body.tone > 25)
            description += "a lithe body and only a little bit of muscle definition";
        else
            description += "a waif-thin body, and soft, forgiving flesh";
    }
    // Pretty thin
    else if (character.body.thickness < 25) {
        if (character.body.tone > 90)
            description += "a thin body and incredible muscle definition";
        else if (character.body.tone > 75)
            description += "a narrow frame that shows off your muscles";
        else if (character.body.tone > 50)
            description += "a somewhat lithe body and a fair amount of definition";
        else if (character.body.tone > 25)
            description += "a narrow, soft body that still manages to show off a few muscles";
        else
            description += "a thin, soft body";
    }
    // Somewhat thin
    else if (character.body.thickness < 40) {
        if (character.body.tone > 90)
            description += "a fit, somewhat thin body and rippling muscles all over";
        else if (character.body.tone > 75)
            description += "a thinner-than-average frame and great muscle definition";
        else if (character.body.tone > 50)
            description += "a somewhat narrow body and a decent amount of visible muscle";
        else if (character.body.tone > 25)
            description += "a moderately thin body, soft curves, and only a little bit of muscle";
        else
            description += "a fairly thin form and soft, cuddle-able flesh";
    }
    // average
    else if (character.body.thickness < 60) {
        if (character.body.tone > 90)
            description += "average thickness and a bevy of perfectly defined muscles";
        else if (character.body.tone > 75)
            description += "an average-sized frame and great musculature";
        else if (character.body.tone > 50)
            description += "a normal waistline and decently visible muscles";
        else if (character.body.tone > 25)
            description += "an average body and soft, unremarkable flesh";
        else
            description += "an average frame and soft, untoned flesh with a tendency for jiggle";
    }
    else if (character.body.thickness < 75) {
        if (character.body.tone > 90)
            description += "a somewhat thick body that's covered in slabs of muscle";
        else if (character.body.tone > 75)
            description += "a body that's a little bit wide and has some highly-visible muscles";
        else if (character.body.tone > 50)
            description += "a solid build that displays a decent amount of muscle";
        else if (character.body.tone > 25)
            description += "a slightly wide frame that displays your curves and has hints of muscle underneath";
        else
            description += "a soft, plush body with plenty of jiggle";
    }
    else if (character.body.thickness < 90) {
        if (character.body.tone > 90)
            description += "a thickset frame that gives you the appearance of a wall of muscle";
        else if (character.body.tone > 75)
            description += "a burly form and plenty of muscle definition";
        else if (character.body.tone > 50)
            description += "a solid, thick frame and a decent amount of muscles";
        else if (character.body.tone > 25)
            description += "a wide-set body, some soft, forgiving flesh, and a hint of muscle underneath it";
        else {
            description += "a wide, cushiony body";
            if (character.gender >= 2 || character.body.chest.sort(BreastRow.Largest).get(0)!.rating > 3 || character.body.hips.rating > 7 || character.body.butt.rating > 7)
                description += " and plenty of jiggle on your curves";
        }
    }
    // Chunky monkey
    else {
        if (character.body.tone > 90)
            description += "an extremely thickset frame and so much muscle others would find you harder to move than a huge boulder";
        else if (character.body.tone > 75)
            description += "a very wide body and enough muscle to make you look like a tank";
        else if (character.body.tone > 50)
            description += "an extremely substantial frame packing a decent amount of muscle";
        else if (character.body.tone > 25) {
            description += "a very wide body";
            if (character.gender >= 2 || character.body.chest.sort(BreastRow.Largest).get(0)!.rating > 4 || character.body.hips.rating > 10 || character.body.butt.rating > 10)
                description += ", lots of curvy jiggles,";
            description += " and hints of muscle underneath";
        }
        else {
            description += "a thick";
            if (character.gender >= 2 || character.body.chest.sort(BreastRow.Largest).get(0)!.rating > 4 || character.body.hips.rating > 10 || character.body.butt.rating > 10)
                description += ", voluptuous";
            description += " body and plush, ";
            if (character.gender >= 2 || character.body.chest.sort(BreastRow.Largest).get(0)!.rating > 4 || character.body.hips.rating > 10 || character.body.butt.rating > 10)
                description += " jiggly curves";
            else
                description += " soft flesh";
        }
    }
    return description;
}

export function describeRace(character: Character): string {
    let race: string = "human";
    if (character.body.legs.type === 4)
        race = "centaur";
    if (character.body.legs.type === 11)
        race = "pony-kin";
    if (RaceScore.catRaceScore(character) >= 4)
        race = "cat-" + mf(character, "boy", "girl");
    if (RaceScore.lizardRaceScore(character) >= 4) {
        if (character.gender === Gender.NONE)
            race = "lizan";
        else if (character.gender === Gender.MALE)
            race = "male lizan";
        else if (character.gender === Gender.FEMALE)
            race = "female lizan";
        else
            race = "hermaphrodite lizan";
    }
    if (RaceScore.dragonRaceScore(character) >= 4) {
        race = "dragon-morph";
        if (character.body.face.type === 0)
            race = "dragon-" + mf(character, "man", "girl");
    }
    if (RaceScore.raccoonRaceScore(character) >= 4) {
        race = "raccoon-morph";
        if (character.body.balls.count > 0 && character.body.balls.size > 5)
            race = "tanuki-morph";
    }
    if (RaceScore.dogRaceScore(character) >= 4) {
        race = "dog-morph";
        if (character.body.face.type === 0)
            race = "dog-" + mf(character, "man", "girl");
    }
    if (RaceScore.foxRaceScore(character) >= 4) {
        if (character.body.skin.type === 1)
            race = "fox-morph";
        else
            race = "fox-" + mf(character, "morph", "girl");
    }
    if (RaceScore.ferretRaceScore(character) >= 4) {
        if (character.body.skin.type === 1)
            race = "ferret-morph";
        else
            race = "ferret-" + mf(character, "morph", "girl");
    }
    if (RaceScore.kitsuneRaceScore(character) >= 4) {
        race = "kitsune";
    }
    if (RaceScore.horseRaceScore(character) >= 3) {
        if (character.body.legs.type === 4)
            race = "centaur-morph";
        else
            race = "equine-morph";
    }
    if (RaceScore.mutantRaceScore(character) >= 5 && race === "human")
        race = "corrupted mutant";
    if (RaceScore.minotaurRaceScore(character) >= 4)
        race = "minotaur-morph";
    if (RaceScore.cowRaceScore(character) > 5) {
        race = "cow-";
        race += mf(character, "morph", "girl");
    }
    if (RaceScore.beeRaceScore(character) >= 5)
        race = "bee-morph";
    if (RaceScore.goblinRaceScore(character) >= 5)
        race = "goblin";
    if (RaceScore.humanRaceScore(character) >= 5 && race === "corrupted mutant")
        race = "somewhat human mutant";
    if (RaceScore.demonRaceScore(character) > 4)
        race = "demon-morph";
    if (RaceScore.sharkRaceScore(character) >= 3)
        race = "shark-morph";
    if (RaceScore.bunnyRaceScore(character) >= 4)
        race = "bunny-" + mf(character, "boy", "girl");
    if (RaceScore.harpyRaceScore(character) >= 4) {
        if (character.gender >= 2)
            race = "harpy";
        else
            race = "avian";
    }
    if (RaceScore.spiderRaceScore(character) >= 4) {
        race = "spider-morph";
        if (mf(character, "no", "yes") === "yes")
            race = "spider-girl";
        if (character.body.legs.type === 16)
            race = "drider";
    }
    if (RaceScore.kangaRaceScore(character) >= 4)
        race = "kangaroo-morph";
    if (RaceScore.mouseRaceScore(character) >= 3) {
        if (character.body.face.type !== 16)
            race = "mouse-" + mf(character, "boy", "girl");
        else
            race = "mouse-morph";
    }
    if (character.body.legs.type === 3)
        race = "naga";
    if (character.body.legs.type === 4)
        race = "centaur";

    if (RaceScore.gooRaceScore(character) >= 3) {
        race = "goo-";
        race += mf(character, "boi", "girl");
    }
    return race;
}

export function assholeOrPussy(character: Character): string {
    if (character.body.vaginas.length > 0)
        return describeVagina(character, character.body.vaginas.get(0)!);
    return describeButthole(character.body.butt);
}
