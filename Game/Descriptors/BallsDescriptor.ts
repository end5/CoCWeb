import { randInt, randomChoice } from '../../Engine/Utilities/SMath';
import { Character } from '../Character/Character';
import { StatusEffectType } from '../Effects/StatusEffectType';

// ballsDescriptLight(forcedSize, true, this)
/**
 * Describe creatures balls.
 * @param    forceDisplaySize    Force a description of the size of the balls
 * @param    plural        Show plural forms
 * @param    creature        Monster, Player or NonPlayer
 * @param    withArticle    Show description with article in front
 * @return    Full description of balls
 */
export function describeBalls(forceDisplaySize: boolean, plural: boolean, character: Character, withArticle: boolean = false): string {
    if (character.body.balls.count === 0)
        return "prostate";

    let description: string = "";
    let options: string[] = [];

    if (plural && (!character.effects.has(StatusEffectType.Uniball))) {
        if (character.body.balls.count === 1) {
            if (withArticle) {
                options = ["a single",
                    "a solitary",
                    "a lone",
                    "an individual"];
            }
            else {
                options = ["single",
                    "solitary",
                    "lone",
                    "individual"];
            }
            description += randomChoice(options);
        }
        else if (character.body.balls.count === 2) {
            if (withArticle) {
                options = ["a pair of",
                    "two",
                    "a duo of"];
            }
            else {
                options = ["pair of",
                    "two",
                    "duo of"];
            }
            description += randomChoice(options);
        }
        else if (character.body.balls.count === 3) {
            options = ["three",
                "triple"];
            (withArticle) ? options.push("a trio of") : options.push("trio of");
            description += randomChoice(options);
        }
        else if (character.body.balls.count === 4) {
            options = ["four",
                "quadruple"];
            (withArticle) ? options.push("a quartette of") : options.push("quartette of");
            description += randomChoice(options);
        }
        else {
            if (withArticle) {
                options = ["a multitude of",
                    "many",
                    "a large handful of"];
            }
            else {
                options = ["multitude of",
                    "many",
                    "large handful of"];
            }
            description += randomChoice(options);
        }
    }
    // size!
    if (character.body.balls.size > 1 && (randInt(3) <= 1 || forceDisplaySize)) {
        if (description) description += " ";

        if (character.body.balls.size >= 18)
            description += "hideously swollen and oversized";
        else if (character.body.balls.size >= 15)
            description += "beachball-sized";
        else if (character.body.balls.size >= 12)
            description += "watermelon-sized";
        else if (character.body.balls.size >= 9)
            description += "basketball-sized";
        else if (character.body.balls.size >= 7)
            description += "soccerball-sized";
        else if (character.body.balls.size >= 5)
            description += "cantaloupe-sized";
        else if (character.body.balls.size >= 4)
            description += "grapefruit-sized";
        else if (character.body.balls.size >= 3)
            description += "apple-sized";
        else if (character.body.balls.size >= 2)
            description += "baseball-sized";
        else if (character.body.balls.size > 1)
            description += "large";

    }
    // UNIBALL
    if (character.effects.has(StatusEffectType.Uniball)) {
        if (description)
            description += " ";
        options = ["tightly-compressed",
            "snug",
            "cute",
            "pleasantly squeezed",
            "compressed-together"];
        description += randomChoice(options);

    }
    // Descriptive
    if (character.hoursSinceCum >= 48 && randInt(2) === 0 && !forceDisplaySize) {
        if (description)
            description += " ";
        options = ["overflowing",
            "swollen",
            "cum-engorged"];
        description += randomChoice(options);

    }
    // lusty
    if (character.stats.lust > 90 && (description === "") && randInt(2) === 0 && !forceDisplaySize) {
        options = ["eager",
            "full",
            "needy",
            "desperate",
            "throbbing",
            "heated",
            "trembling",
            "quivering",
            "quaking"];
        description += randomChoice(options);

    }
    // Slimy skin
    if (character.body.skin.type === 3) {
        if (description)
            description += " ";
        options = ["goopey",
            "gooey",
            "slimy"];
        description += randomChoice(options);

    }
    if (description)
        description += " ";

    options = ["nut",
        "gonad",
        "teste",
        "testicle",
        "testicle",
        "ball",
        "ball",
        "ball"];

    // I don't know how this was ever supposed to work.
    // if (i_creature.balls == 4 && i_plural) options.push("quads", "quads", "quads");

    description += randomChoice(options);
    if (plural)
        description += "s";

    if (character.effects.has(StatusEffectType.Uniball) && randInt(2) === 0) {
        if (randInt(3) === 0)
            description += " merged into a cute, spherical package";
        else if (randInt(2) === 0)
            description += " combined into a round, girlish shape";
        else
            description += " squeezed together into a perky, rounded form";
    }
    return description;
}

export function describeBallsShort(character: Character, forceDisplaySize: boolean = true): string {
    return describeBalls(forceDisplaySize, true, character);
}

// Returns random description of scrotum
export function describeSack(character: Character): string {
    if (character.body.balls.count === 0)
        return "prostate";

    let options: string[] = [];
    let description: string = "";

    options = ["scrotum",
        "sack",
        "nutsack",
        "ballsack",
        "beanbag",
        "pouch"];

    description += randomChoice(options);

    return description;
}
