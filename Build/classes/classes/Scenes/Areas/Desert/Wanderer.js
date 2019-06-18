define(["require", "exports", "../../../BaseContent", "../../../StatusAffects"], function (require, exports, BaseContent_1, StatusAffects_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Wanderer extends BaseContent_1.BaseContent {
        wandererRouter() {
            this.spriteSelect(42);
            //First meeting...
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.MeetWanderer) < 0) {
                this.wandererFirstMeeting();
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.MeetWanderer, 0, 0, 0, 0);
            }
            //Repeat offense!
            else {
                //Chosen demon ending
                if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.WandererDemon) >= 0) {
                    this.wandererDemonEpilogue();
                    return;
                }
                //Chosen human ending
                if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.WandererHuman) >= 0) {
                    this.wandererEpilogueHuman();
                    return;
                }
                //No choose made repeat meeting
                this.wandererRepeatMeeting();
            }
        }
        //Encounter the wanderer for the first time
        wandererFirstMeeting() {
            //Each outputtext is a paragraph
            this.outputText("A small plume of dust rises in the distance, betraying the position of something else moving amongst the sandy dunes.   It grows larger as it approaches your position, revealing a bulky distorted shape lurking inside the cloud.  You cautiously approach, preparing to face some new demonic monstrosity.   As the sandy cloud parts, the blurred figure resolves itself into two distinct outlines.\n\n", true);
            this.outputText("On the left is a man carrying a heavily loaded wheelbarrow and struggling not to stumble in the sandy desert soil.  Slightly behind and to the right of the man is a shapely woman, her demonic origins plain to anyone who notices the spikes on her head.  As they near the man notices your presence and calls out, \"<i>Ho, traveler!  Fine day isn't it?</i>\"\n\n", false);
            this.outputText("The strange pair close the intervening distance, allowing you to make out more of their forms.  As expected, the succubus is quite a beauty, with curvy flesh in all the right places.  The man introduces himself as he struggles with his heavy load.  \"<i>I am Marcus,  former traveler of extraordinary places and seeker of forbidden knowledge!  Though all that was a long time ago; I'm retired, you see.  I've settled down with my new partner, Lucia.</i>\"  Marcus gestures, indicating the bored-looking succubus accompanying him.\n\n", false);
            this.outputText("You start to greet them, but nearly faint in shock – Marcus' wheelbarrow isn't full of cargo.  It's the only thing keeping his oversized balls from dragging in the sand!  He smiles at your reaction and winks lewdly, \"<i>Why do you think I have to keep a succubus around?  If I don't empty these puppies every hour or two I damn near explode!</i>\"  Looking thoughtful for a moment, Marcus nods to himself and asks, \"<i>I don't suppose you have a moment to help me with a quandary I've been having?</i>\"", false);
            this.simpleChoices("Help Him", this.wandererHelpHim, "", undefined, "", undefined, "", undefined, "Leave", this.wandererLeave);
        }
        //Leave
        wandererLeave() {
            this.spriteSelect(42);
            this.outputText("Marcus looks disappointed and sighs, hefting his wheelbarrow and waddling away.  Lucia bounces after him, looking like the cat that got the cream.  You wonder what all that was about.   What a strange land.", true);
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        //Repeated encounter if he left
        wandererRepeatMeeting() {
            this.spriteSelect(42);
            this.outputText("Marcus waves to you as he crests a nearby dune, yelling a greeting.  \"<i>Hey traveler!  Do you have a moment to help a man with a question of theological and moral imperatives?</i>\"\n\nHis succubus accomplice, Lucia, snorts in disdain.", true);
            this.simpleChoices("Yes", this.wandererHelpHim, "", undefined, "", undefined, "", undefined, "Leave", this.wandererLeave);
        }
        //Volunteer to help
        wandererHelpHim() {
            this.spriteSelect(42);
            this.outputText("\"<i>Oh good!</i>\" he exclaims as he begins elaborating.  \"<i>My dear succubus here is growing tired of our arrangement, and she wants me to give up the last of my humanity and become a demon like her.  I'm not really sure I want to lose my soul, but at the same time, I know enough about their kind to know I'd REALLY enjoy being an incubus, if you know what I mean.  Before I make the plunge, I'd like a second opinion – what do you think?</i>\"\n\nHe glances over his shoulder with almost a small measure of fear.", true);
            this.simpleChoices("Go Demon", this.wandererGoDemon, "Stay Human", this.wandererStayHuman, "", undefined, "", undefined, "", undefined);
        }
        //Ask marcus to stay human
        wandererStayHuman() {
            this.spriteSelect(42);
            this.outputText("\"<i>You little mortal fuckwit!</i>\" screams Lucia before turning to her human lover, \"<i>Don't listen to the foolish mortal, love; think of the fun we could have together!</i>\"\n\n", true);
            this.outputText("Marcus shakes his head sadly, \"<i>", false);
            if (this.player.gender <= 1)
                this.outputText("He", false);
            else
                this.outputText("She", false);
            this.outputText(" is right, my soul is immortal and not to be sacrificed so lightly.  Why don't we stick to our original agreement another decade and mull it over then?</i>\"\n\n", false);
            this.outputText("Lucia pouts, nearly on the verge of tears, \"<i>Fine!  But don't expect me to be happy about it.</i>\"  She pats his swollen balls roughly, smirking down at him, \"<i>and I'm going to let these swell up nice and tight before I take my next meal!</i>\"  ", false);
            this.outputText("Marcus sighs, though you think you spy the hint of a smile on his lips, \"<i>As you wish... thanks for your guidance traveler, and may you find what you seek in this strange land.</i>\"\n\nAs they turn to leave, Lucia scowls at you over her shoulder...", false);
            this.dynStats("lib", -1, "lus", 1, "cor", -5);
            this.player.createStatusAffect(StatusAffects_1.StatusAffects.WandererHuman, 0, 0, 0, 0);
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        //Ask marcus to go demon
        wandererGoDemon() {
            this.spriteSelect(42);
            this.outputText("Lucia breaks into a mischievious smile as you suggest taking her up on her offer.  She sashays over to you, flesh jiggling enticingly the whole way.  She leans close, sliding a slender finger down the center of your chest.  \"<i>Thank you for this.  Should we meet again, I promise rewards fit to make a whore faint.</i>\"\n\n", true);
            this.outputText("Marcus raises an eyebrow at the exchange, but smiles as his demonic lover returns to his side.  Lucia winks again, and huge wings explode from her back.  She grabs Marcus, who bleats in surprise, and lifts off, flying away with her prize to her lair.", false);
            this.dynStats("lus", 5, "cor", 1);
            this.player.createStatusAffect(StatusAffects_1.StatusAffects.WandererDemon, 0, 0, 0, 0);
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        //Demonic epilogue v1
        wandererDemonEpilogue() {
            this.spriteSelect(42);
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.WandererDemon) >= 0) {
                //First time...
                if (this.player.statusAffectv1(StatusAffects_1.StatusAffects.WandererDemon) == 0) {
                    this.outputText("A winged shadow flashes by.  You look up, but can't find its source in the searing desert sun.   A tap on your shoulder is all the warning you get before a curvy body is pressed against you, stroking and touching you in all the right ways.\n\n", true);
                    this.outputText("\"<i>I stopped by and I wanted to thank you for this,</i>\" Lucia purrs, balancing a purple crystal along her knuckles.  It sparkles and glitters with a light in the sunlight as she speaks, \"<i>You see, when a human or other mortal creature finally begins to desire corruption and pleasure more than everything else, they can become a demon.  The process leaves behind a single crystal of lethicite – this crystal.  It's a power source beyond anything you can comprehend, and I have you to thank for giving it to me.</i>\"\n\n", false);
                    this.outputText("Lucia places a small bottle in your hand.  \"<i>So thank you, and have this present.  Perhaps you can create some lethicite for us later... oh, and before I forget, Marcus is loving his new existence.</i>\"\n\n", false);
                    this.outputText("She steps away and blows a kiss as her wings unfurl.  With a powerful downstroke she scatters sand everywhere, forcing you to throw an arm in front of your eyes.  When the debris settles, she's gone.\n\n", false);
                    this.dynStats("lus", 5);
                    this.inventory.takeItem(this.consumables.SDELITE, this.camp.returnToCampUseOneHour);
                    this.player.statusAffect(this.player.findStatusAffect(StatusAffects_1.StatusAffects.WandererDemon)).value1 = 1;
                }
                //Second Encounter
                else if (this.player.statusAffectv1(StatusAffects_1.StatusAffects.WandererDemon) == 1) {
                    this.outputText("Lucia zips by overhead, spreading her legs and openly frigging her moist hairless slit and moaning lustily.  After a few moments she creams herself, dripping her juices over the dunes.  She licks her fingers and waves, unclipping an item from her belt and dropping it down towards you.\n\n", true);
                    //Catch it
                    if (50 < (this.player.spe + Wanderer.rand(60))) {
                        this.outputText("You handily catch a small potion vial.  When you look up, she's gone.\n\n", false);
                        this.inventory.takeItem(this.consumables.SDELITE, this.camp.returnToCampUseOneHour);
                    }
                    //Drop it
                    else {
                        this.outputText("You dive for the falling bottle, but miss, and it shatters into the sands, the fluids wicking away nearly instantaneously.", false);
                        this.doNext(this.camp.returnToCampUseOneHour);
                    }
                }
            }
        }
        //Human Epilogue 1
        wandererEpilogueHuman() {
            this.spriteSelect(42);
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.WandererHuman) >= 0) {
                //Human Epilogue 1
                if (this.player.statusAffectv1(StatusAffects_1.StatusAffects.WandererHuman) == 0) {
                    this.outputText("As you journey the desert, you see the twin figures of Marcus and his demonic companion, Lucia, in the distance.   Judging by the frantic bobbing of Lucia's head in Marcus's lap, she's just getting ready for a meal.  Closing the distance, you watch curiously as her throat bulges obscenely to keep up with the huge cum-load.  In time she flops back, a few huge globules of cum exploding onto her form like bursting water-balloons as Marcus' orgasm finishes, leaving her a cum-stained wreck.\n\n", true);
                    if (this.player.cor < 33)
                        this.outputText("You duck back behind a dune, blushing furiously.", false);
                    else if (this.player.cor < 66)
                        this.outputText("You blush crimson as you swear you see Lucia look right at you and wink.", false);
                    else
                        this.outputText("You openly leer at the crude display, whistling lewdly at the blissful couple.  Marcus looks up and gives a cocky smile, while Lucia licks her lips and gives you a predatory grin.", false);
                    this.dynStats("lus", 10);
                    //Value 1 is used to track the status of the end state.
                    this.player.statusAffect(this.player.findStatusAffect(StatusAffects_1.StatusAffects.WandererHuman)).value1 = 1;
                    this.doNext(this.camp.returnToCampUseOneHour);
                }
                //Human Epilogue 2
                else if (this.player.statusAffectv1(StatusAffects_1.StatusAffects.WandererHuman) == 1) {
                    this.outputText("While exploring the desert, you find a strange bottle half-buried in the sand.  A small note is tied to it:\n\n\"<i>I just knew you'd find this.  Try this a few times and I think you might change your mind about Marcus' situation.\n  -Lovely Lucia</i>\"\n\n", true);
                    this.inventory.takeItem(this.consumables.SDELITE, this.camp.returnToCampUseOneHour);
                }
            }
        }
    }
    exports.Wanderer = Wanderer;
});
//# sourceMappingURL=Wanderer.js.map