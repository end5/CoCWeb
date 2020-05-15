import {
    EARS_BUNNY,
    EARS_CAT,
    EARS_COW,
    EARS_DOG,
    EARS_DRAGON,
    EARS_ELFIN,
    EARS_FERRET,
    EARS_FOX,
    EARS_HORSE,
    EARS_LIZARD,
    EARS_MOUSE,
    EARS_RACCOON,
} from "../../../../includes/appearanceDefs";
import { BreastRowClass } from "../../../BreastRowClass";
import { Cock } from "../../../Cock";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";
import { VaginaClass } from "../../../VaginaClass";

/**
 * ...
 *
 * @author Gedan
 */
export class Doppleganger extends Monster {
    private _roundCount = 0;

    public mirrorAttack(damage: number): void {
        this.createStatusAffect(StatusAffects.MirroredAttack, 0, 0, 0, 0);

        this.outx(
            `As you swing your [weapon] at the doppleganger, ${this.player.mf(
                "he",
                "she"
            )} smiles mockingly, and mirrors your move exactly, lunging forward with ${this.player.mf(
                "his",
                "her"
            )} duplicate ${this.weaponName}.`
        );

        // Cribbing from combat mechanics - if the number we got here is <= 0, it was deflected, blocked or otherwise missed.
        // We'll use this as our primary failure to hit, and then mix in a bit of random.
        // tl;dr this avoids a bunch of weapon effects and perks, but given the specific means of attack, I think it actually makes sense overall. (Basically having to pull back from what you would normally do mid-attack to successfully land any kind of hit).
        if (damage > 0 && Doppleganger.rand(8) < 6) {
            this.outx(
                `  At the very last moment, you twist downwards and strike into your opponent’s trunk, drawing a gasp of pain from ${this.player.mf(
                    "him",
                    "her"
                )} as ${this.player.mf("he", "she")} clumsily lashes ${this.player.mf(
                    "his",
                    "her"
                )} own ${this.weaponName} over you. It’s your turn to mirror ${this.player.mf(
                    "him",
                    "her"
                )}, smiling mockingly at ${this.player.mf(
                    "his",
                    "her"
                )} rabid snarls as ${this.player.mf("he", "she")} resets ${this.player.mf(
                    "him",
                    "her"
                )}self, ${this.player.mf(
                    "his",
                    "her"
                )} voice bubbling and flickering for a moment as ${this.player.mf(
                    "he",
                    "she"
                )} tries to maintain control. (${damage})`
            );
            this.HP -= damage;
        } else {
            this.outx("  Your");
            if (this.player.weaponName == "fists") this.outx(" [weapon]");
            else this.outx(" [weapon]s");
            this.outx(
                " meet with a bone-jarring impact, and you are sent staggering backwards by a force exactly equal to your own."
            );

            this.outx(
                "\n\n“<i>Try again, [name],</i>” the doppelganger sneers, derisively miming your falter. “<i>C’mon. Really test yourself.</i>”"
            );
        }
        this.addTalkShit();
    }

    public mirrorTease(damage: number, successful: boolean): void {
        this.clearOutput();
        this.outx(
            `You move your hands seductively over your body, and - you stop. The doppelganger stops too, staring at you with wicked coyness, ${this.player.mf(
                "his",
                "her"
            )} hands frozen on ${this.player.mf(
                "his",
                "her"
            )} form exactly where yours are. Glaring back, you begin your slow, lustful motions again, as your reflection does the exact same thing. It’s a lust off!`
        );

        if (damage > 0 && successful) {
            this.outx(
                `\n\nYou determinedly display and twist your carnality to what you know are its best advantages, ignoring what the doppelganger is doing- you’re extremely familiar with it, after all. After a few slow seconds crawl past a blush settles upon your reflection’s face, and ${this.player.mf(
                    "he",
                    "she"
                )} hands falter and stop being able to follow yours as ${this.player.mf(
                    "he",
                    "she"
                )} stares at what you’re doing.`
            );

            this.outx(
                `\n\n“<i>It’s- it’s been so long,</i>” ${this.player.mf(
                    "he",
                    "she"
                )} groans, managing to break away to stare into your smirking, smouldering eyes with lust-filled rage. “<i>But I’ll have that, I’ll have everything soon enough!</i>”`
            );

            this.applyTease(damage);
        } else {
            this.outx(
                `You keep moving and displaying your body as best you can, but an overwhelming amount of self-awareness creeps in as your doppelganger mockingly copies you. Is that really what you look like when you do this? It looks so cheap, so clumsy, so desperate. As a blush climbs onto your face you feel a vague sense of vertigo as control of the situation shifts- you copy the doppelganger as ${this.player.mf(
                    "he",
                    "she"
                )} cruelly continues to slide ${this.player.mf(
                    "his",
                    "her"
                )} hands over ${this.player.mf("his", "her")} body exaggeratedly.`
            );

            this.outx(
                `\n\n“<i>What’s the matter, [name]?</i>” ${this.player.mf(
                    "he",
                    "she"
                )} breathes, staring lustfully into your eyes as ${this.player.mf(
                    "he",
                    "she"
                )} sinks both hands into ${this.player.mf(
                    "his",
                    "her"
                )} crotch and bends forward, forcing you close to ${this.player.mf(
                    "his",
                    "her"
                )} face. “<i>Never tried it in front of a mirror? You were missing out on the nasty little tramp you are.</i>”`
            );

            this.game.dynStats("lus", damage + (Doppleganger.rand(7) - 3));
        }
        this.addTalkShit();
    }

    private addTalkShit(): void {
        this.statScreenRefresh();

        if (this.HP < 1) {
            this.doNext(this.game.endHpVictory);
            return;
        }

        if (this.lust > 99) {
            this.doNext(this.game.endLustVictory);
            return;
        }

        if (this.player.HP < 1) {
            this.doNext(this.game.endHpLoss);
            return;
        }

        if (this.player.lust > 99) {
            this.doNext(this.game.endLustLoss);
            return;
        }

        switch (this._roundCount) {
            case 0:
                this.outx(
                    "\n\n“<i>You feel it, don’t you?</i>” The doppelganger whispers, crooking your mouth into a vicious grin. “<i>The transfer. The mirror is a vacuum without a being inside it; it reaches out for someone to complete it. Your being, to be exact. Mine wants to be free a lot more than yours. Ten years more, to be exact.</i>”"
                );
                this.outx(
                    "\n\n[He] goes on in a dull croon as [he] continues to circle you, moving with the odd, syncopated jerks of a creature in a body that has only existed for a couple of minutes. “<i>Just let it happen, [name]. You can’t beat me. I am you, only with the knowledge and powers of a demon. Accept your fate.</i>”"
                );
                this.outx(
                    "\n\nA weird fluttering feeling runs up your arm, and with a cold chill you look down to see it shimmer slightly, as if you were looking at it through running water."
                );
                this.outx("\n\n<b>You need to finish this as fast as you can.</b>");
                break;

            case 1:
                this.outx(
                    "\n\n“<i>Do you know, I can’t even remember what gender I was before I got stuck in that mirror?</i>” the doppelganger says, as [he] slides a hand between your thighs’ mirror counterparts thoughtfully. “<i>I loved changing all the time. Being stuck as one gender seemed so boring when the tools to shift from one shape to the next were always there. That’s why this was my punishment. Forced to change all the time, at the unthinking behest of whoever happened to look into this cursed thing. You have to give Lethice credit, she’s not just cruel, she’s got imagination too. It’s a hell of a combination. I’d hate to see what she had in store for you.</i>”"
                );
                break;

            case 2:
                this.outx(
                    "\n\n“<i>This, though... this I like, [name].</i>” [He] closes [his] eyes and"
                );
                if (this.player.hasCock()) this.outx(" strokes [his] [cock]");
                else if (this.player.hasVagina())
                    this.outx(" slides two fingers into [his] [vagina] and gently frigs [himself]");
                else this.outx(" slips a hand ");
                this.outx(
                    ` underneath [his] ${this.armorName}. The sheer bizarreness of seeing yourself masturbate gives you pause; again the unreality intensifies, and you feel yourself shimmer uncertainly. “<i>Once I’m out of here, I’m going to hang onto this. Revel in not changing my form for once, as a tribute to the kind soul who gave me it!</i>”`
                );
                this.outx(
                    "\n\nIt’s getting harder to ignore the way your body shimmers and bleeds contrast at the edges, whilst your reflection only becomes more and more sharply defined."
                );
                this.outx(
                    "\n\n<b>This is something, you realize with a growing horror, which is really going to happen if you don’t stop it.</b>"
                );
                break;

            case 3:
                this.outx(
                    "\n\n“<i>Your memories flow to me [name], as you fade like a memory. I can taste them...</i>” You struggle to stay focused, try and force your body and mind not to blur like a fingerprint on a windowpane as the doppelganger sighs beatifically."
                );
                this.outx(
                    "\n\n“<i>Not bad, not bad. You led quite an interesting life for an Ingnam peasant, didn’t you? Got around. Not enough sex, though. Nowhere near enough sex. Don’t worry- I’ll correct that mistake, in due course.</i>”"
                );
                break;

            case 4:
                this.outx(
                    "\n\n“<i>Did you really think you could defeat Lethice, peasant?</i>” the doppelganger roars. [He] moves and speaks with confidence now, [his] old twitchiness gone, revelling and growing into [his] new form."
                );
                this.outx(
                    "\n\nYou don’t dare open your mouth to hear what pale imitation of that voice comes out. “<i>Oh, by grit, crook and luck you’ve gotten this far, but defeat the demon queen? You, who still cling onto your craven, simple soul and thus know nothing of demonhood, of its powers, of its sacrifices? I am doing you and the world a favor here, [name]-that-was, because I am not just taking this fine body but also the mantel it so clumsily carried. With my knowledge and your brute physicality, I will have my revenge on Lethice, and the world will be free of her and her cruelty!</i>” [He] screams with laughter. The ringing insanity of it sounds increasingly muffled to you, as if it were coming through a pane of glass."
                );
                this.outx("\n\n<b>You have time and strength for one last gambit...</b>");
                break;

            case 5:
                this.outx("\n\nThe shimmering intensifies for a moment as something... shifts....");

                this.game.dynStats("lus+", 1000);

                break;

            default:
                break;
        }

        this._roundCount++;
        this.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        this.game.d3.doppleganger.punchYourselfInTheBalls();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.d3.doppleganger.inSovietCoCSelfFucksYou();
    }

    public handleSpellResistance(spell: string): void {
        this.outx(
            "The mirror demon barely even flinches as your fierce, puissant fire washes over [him]."
        );

        this.outx(
            "\n\n“<i>Picked up a few things since you’ve been here, then?</i>” [he] yawns. Flickers of flame cling to [his] fingers, its radiance sputtering and burning away, replaced by a livid black color. “<i>Serf magic. Easy to pick up, easy to use, difficult to impress with. Let me show you how it’s really done!</i>” [He] thrusts [his] hands out and hurls a pitiless black fireball straight at you, a negative replica of the one you just shot at [him]."
        );

        if (spell == "fireball") {
            this.outx(
                ` (${this.player.takeDamage(this.player.level * 10 + 45 + Doppleganger.rand(10))})`
            );
        } else if (spell == "whitefire") {
            this.outx(
                ` (${this.player.takeDamage(
                    10 + (this.player.inte / 3 + Doppleganger.rand(this.player.inte / 2))
                )})`
            );
        }

        this.addTalkShit();
    }

    public handlePlayerWait(): void {
        this.outx(
            "Your doppleganger similarly opts to take a momentary break from the ebb and flow of combat."
        );
        this.addTalkShit();
    }

    public doAI(): void {
        this.outx("Your duplicate chuckles in the face of your attacks.");
        this.addTalkShit();
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "doppleganger";
        // this.long = ""; // Needs to be set to supress validation errors, but is handled by an accessor override.
        this.imageName = "doppleganger";
        this.plural = false;

        this.tallness = this.player.tallness;

        if (this.player.balls > 0) {
            this.balls = this.player.balls;
            this.ballSize = this.player.ballSize;
        } else {
            this.balls = 0;
            this.ballSize = 0;
        }

        this.hoursSinceCum = this.player.hoursSinceCum;

        this.hipRating = this.player.hipRating;
        this.buttRating = this.player.buttRating;
        this.lowerBody = this.player.lowerBody;
        this.skinDesc = this.player.skinDesc;
        this.initStrTouSpeInte(this.player.str, this.player.tou, this.player.spe, this.player.inte);
        this.initLibSensCor(this.player.lib, this.player.sens, this.player.cor);
        this.faceType = this.player.faceType;
        this.skinType = this.player.skinType;

        this.bonusHP = 250;

        this.weaponName = this.player.weaponName;
        this.weaponAttack = this.player.weaponAttack;
        this.weaponVerb = this.player.weaponVerb;

        this.armorDef = this.player.armorDef;
        this.armorName = this.player.armorName;

        this.level = this.player.level;

        this.ass.analLooseness = this.player.ass.analLooseness;
        this.ass.analWetness = this.player.ass.analWetness;

        if (this.player.cocks.length > 0) {
            for (const cock of this.player.cocks as Cock[]) {
                this.createCock(cock.cockLength, cock.cockThickness, cock.cockType);
            }
        }

        if (this.player.vaginas.length > 0) {
            this.createVagina();
            (this
                .vaginas[0] as VaginaClass).vaginalLooseness = this.player.vaginas[0].vaginalLooseness;
            (this.vaginas[0] as VaginaClass).vaginalWetness = this.player.vaginas[0].vaginalWetness;
            (this.vaginas[0] as VaginaClass).virgin = this.player.vaginas[0].virgin;
        }
        // Genderless get forced to have a cunny
        if (this.player.vaginas.length == 0 && this.player.cocks.length == 0) {
            this.createVagina();
            (this.vaginas[0] as VaginaClass).vaginalLooseness = 2;
            (this.vaginas[0] as VaginaClass).vaginalWetness = 6;
            (this.vaginas[0] as VaginaClass).virgin = false;
        }
        this.breastRows = [];

        for (i = 0; i < this.player.breastRows.length; i++) {
            this.createBreastRow();
            const tbr: BreastRowClass = this.breastRows[i];
            const sbr: BreastRowClass = this.player.breastRows[i];

            tbr.breastRating = sbr.breastRating;
            tbr.breasts = sbr.breasts;
            tbr.fuckable = sbr.fuckable;
            tbr.lactationMultiplier = sbr.lactationMultiplier;
            tbr.milkFullness = sbr.milkFullness;
            tbr.nipplesPerBreast = sbr.nipplesPerBreast;
        }

        this.drop = this.NO_DROP;

        this.checkMonster();
    }

    public get long(): string {
        let str = "";

        str += `You are fighting the doppelganger. ${this.player.mf("He", "She")} is a `;
        str += String(
            `${Math.floor(this.player.tallness / 12)} foot ${this.player.tallness % 12} inch tall `
        );
        str += `${this.player.race()}, with ${this.player.bodyType()}. `;

        str += `${this.player.mf("His", "Her")} face is ${this.player.faceDesc()}.`;

        str += ` ${this.player.mf("His", "Her")} ${this.player.hairDescript()} is parted by`;

        switch (this.player.earType) {
            case EARS_HORSE:
                str += " a pair of horse-like ears";
                break;
            case EARS_FERRET:
                str += " a small pair of rounded ferret ears";
                break;
            case EARS_DOG:
                str += " a pair of dog ears";
                break;
            case EARS_COW:
                str += " a pair of round, floppy cow ears";
                break;
            case EARS_ELFIN:
                str += " a large pair of pointy ears";
                break;
            case EARS_CAT:
                str += " a pair of cute, fuzzy cat ears";
                break;
            case EARS_LIZARD:
            case EARS_DRAGON:
                str += " a pair of rounded protrusions with small holes";
                break;
            case EARS_BUNNY:
                str += " a pair of floppy rabbit ears";
                break;
            case EARS_FOX:
                str += " a pair of large, adept fox ears";
                break;
            case EARS_RACCOON:
                str += " a pair of vaugely egg-shaped, furry racoon ears";
                break;
            case EARS_MOUSE:
                str += " a pair of large, dish-shaped mouse ears";
                break;
            default:
                str += " a pair of non-descript ears";
                break;
        }

        str += `. ${this.player.mf("He", "She")} keeps exploring the area around ${this.player.mf(
            "his",
            "her"
        )} mouth with ${this.player.mf(
            "his",
            "her"
        )} tongue with a horribly acquisitive, sensual interest.`;
        str += ` ${this.player.mf("He", "She")} moves around on ${this.player.mf(
            "his",
            "her"
        )} ${this.player.legs()} with a twitchy jerkiness, ${this.player.mf(
            "his",
            "her"
        )} ${this.game.hipDescript()} swinging and tightening.`;
        if (this.player.tailType != 0)
            str += ` ${this.player.mf("His", "Her")} tail flicks this way and that.`;
        str += ` ${this.player.mf("He", "She")} wields the exact same ${
            this.player.weaponName
        } you do, and is dressed in the mirror image of your ${this.player.armorName}. `;
        if (this.player.biggestTitSize() >= 2)
            str += `It’s difficult not to notice the way the mirror image of your ${this.player.breastDescript(
                this.player.biggestTitRow()
            )} ebbs and heaves within it.`;

        return str;
    }
}
