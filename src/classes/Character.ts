import { trace } from "../console";
import { Appearance } from "./Appearance";
import { CockTypesEnum } from "./CockTypesEnum";
import { Creature } from "./Creature";
import { KeyItemClass } from "./KeyItemClass";
import { PerkLib } from "./PerkLib";
import { PregnancyStore } from "./PregnancyStore";
import { UmasShop } from "./Scenes/Places/TelAdre/UmasShop";
import { StatusAffects } from "./StatusAffects";

/**
 * Character class for player and NPCs. Has subclasses Player and NonPlayer.
 *
 * @author Yoffy
 */
export class Character extends Creature {
    private _femininity = 50;

    // This is the easiest way I could think of to apply "flat" bonuses to certain stats without having to write a whole shitload of crazyshit
    // I think a better long-term solution may be to hang function references off the end of the statusAffect class and move all of the value
    // calculation into methods of ContentClasses, so rather than having walls of logic, we just call the method reference with a value, and get back the modified value.
    // It's still shitty, but it would possibly be an improvement.
    public get femininity(): number {
        let fem: number = this._femininity;
        const statIndex: number = this.findStatusAffect(StatusAffects.UmasMassage);

        if (statIndex >= 0) {
            if (this.statusAffect(statIndex).value1 == UmasShop.MASSAGE_MODELLING_BONUS) {
                fem += this.statusAffect(statIndex).value2;
            }
        }

        if (fem > 100) {
            fem = 100;
        }

        return fem;
    }

    public set femininity(value: number) {
        if (value > 100) {
            value = 100;
        } else if (value < 0) {
            value = 0;
        }

        this._femininity = value;
    }

    // BEARDS! Not used anywhere right now but WHO WANTS A BEARD?
    public beardLength = 0;
    public beardStyle = 0;

    // Used for hip ratings
    public thickness = 0;

    // Body tone i.e. Lithe, stocky, etc
    public tone = 0;

    private _pregnancyType = 0;
    public get pregnancyType(): number {
        return this._pregnancyType;
    }

    private _pregnancyIncubation = 0;
    public get pregnancyIncubation(): number {
        return this._pregnancyIncubation;
    }

    private _buttPregnancyType = 0;
    public get buttPregnancyType(): number {
        return this._buttPregnancyType;
    }

    private _buttPregnancyIncubation = 0;
    public get buttPregnancyIncubation(): number {
        return this._buttPregnancyIncubation;
    }

    // Key items
    public keyItems: any[];

    public constructor() {
        super();
        this.keyItems = [];
    }

    // Return bonus fertility

    // return total fertility

    public faceDesc(): string {
        let faceo = "";
        // 0-10
        if (this.femininity < 10) {
            faceo = "a square chin";
            if (!this.hasBeard()) faceo += " and chiseled jawline";
            else faceo += `, chiseled jawline, and ${this.beard()}`;
        }
        // 10+ -20
        else if (this.femininity < 20) {
            faceo = `a rugged looking ${this.face()} `;
            if (this.hasBeard()) faceo += `and ${this.beard()}`;
            faceo += "that's surely handsome";
        }
        // 21-28
        else if (this.femininity < 28)
            faceo = "a well-defined jawline and a fairly masculine profile";
        // 28+-35
        else if (this.femininity < 35) faceo = "a somewhat masculine, angular jawline";
        // 35-45
        else if (this.femininity < 45) faceo = "the barest hint of masculinity on its features";
        // 45-55
        else if (this.femininity <= 55)
            faceo = "an androgynous set of features that would look normal on a male or female";
        // 55+-65
        else if (this.femininity <= 65)
            faceo = "a tiny touch of femininity to it, with gentle curves";
        // 65+-72
        else if (this.femininity <= 72)
            faceo = "a nice set of cheekbones and lips that have the barest hint of pout";
        // 72+-80
        else if (this.femininity <= 80)
            faceo = "a beautiful, feminine shapeliness that's sure to draw the attention of males";
        // 81-90
        else if (this.femininity <= 90)
            faceo = "a gorgeous profile with full lips, a button nose, and noticeable eyelashes";
        // 91-100
        else
            faceo =
                "a jaw-droppingly feminine shape with full, pouting lips, an adorable nose, and long, beautiful eyelashes";
        return faceo;
    }

    // Modify femininity!
    public modFem(goal: number, strength = 1): string {
        let output = "";
        const old: string = this.faceDesc();
        const oldN: number = this.femininity;
        let Changed = false;
        // If already perfect!
        if (goal == this.femininity) return "";
        // If turning MANLYMAN
        if (goal < this.femininity && goal <= 50) {
            this.femininity -= strength;
            // YOUVE GONE TOO FAR! TURN BACK!
            if (this.femininity < goal) this.femininity = goal;
            Changed = true;
        }
        // if turning GIRLGIRLY, like duh!
        if (goal > this.femininity && goal >= 50) {
            this.femininity += strength;
            // YOUVE GONE TOO FAR! TURN BACK!
            if (this.femininity > goal) this.femininity = goal;
            Changed = true;
        }
        // Fix if it went out of bounds!
        if (this.findPerk(PerkLib.Androgyny) < 0) this.fixFemininity();
        // Abort if nothing changed!
        if (!Changed) return "";
        // See if a change happened!
        if (old != this.faceDesc()) {
            // Gain fem?
            if (goal > oldN)
                output = `\n\n<b>Your facial features soften as your body becomes more feminine. (+${strength})</b>`;
            if (goal < oldN)
                output = `\n\n<b>Your facial features harden as your body becomes more masculine. (+${strength})</b>`;
        }
        // Barely noticable change!
        else {
            if (goal > oldN)
                output = `\n\nThere's a tingling in your ${this.face()} as it changes imperceptibly towards being more feminine. (+${strength})`;
            else if (goal < oldN)
                output = `\n\nThere's a tingling in your ${this.face()} as it changes imperciptibly towards being more masculine. (+${strength})`;
        }
        return output;
    }

    public modThickness(goal: number, strength = 1): string {
        if (goal == this.thickness) return "";
        // Lose weight fatty!
        if (goal < this.thickness && goal < 50) {
            this.thickness -= strength;
            // YOUVE GONE TOO FAR! TURN BACK!
            if (this.thickness < goal) this.thickness = goal;
        }
        // Sup tubby!
        if (goal > this.thickness && goal > 50) {
            this.thickness += strength;
            // YOUVE GONE TOO FAR! TURN BACK!
            if (this.thickness > goal) this.thickness = goal;
        }
        trace("MOD THICKNESS FIRE");
        // DIsplay 'U GOT FAT'
        if (goal >= this.thickness && goal >= 50)
            return `\n\nYour center of balance changes a little bit as your body noticeably widens. (+${strength} body thickness)`;
        // GET THIN BITCH
        else if (goal <= this.thickness && goal <= 50)
            return `\n\nEach movement feels a tiny bit easier than the last.  Did you just lose a little weight!? (+${strength} thin)`;
        return "";
    }

    public modTone(goal: number, strength = 1): string {
        if (goal == this.tone) return "";
        // Lose muscle visibility!
        if (goal < this.tone && goal < 50) {
            this.tone -= strength;
            // YOUVE GONE TOO FAR! TURN BACK!
            if (this.tone < goal) {
                this.tone = goal;
                return `\n\nYou've lost some tone, but can't lose any more this way. (-${strength} muscle tone)`;
            }
        }
        // MOAR hulkness
        if (goal > this.tone && goal > 50) {
            this.tone += strength;
            // YOUVE GONE TOO FAR! TURN BACK!
            if (this.tone > goal) {
                this.tone = goal;
                return `\n\nYou've gained some muscle tone, but can't gain any more this way. (+${strength} muscle tone)`;
            }
        }
        // DIsplay BITCH I WORK OUT
        if (goal >= this.tone && goal > 50)
            return `\n\nYour body feels a little more solid as you move, and your muscles look slightly more visible. (+${strength} muscle tone)`;
        // Display DERP I HAVE GIRL MUSCLES
        else if (goal <= this.tone && goal < 50)
            return `\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles look less visible. (-${strength} muscle tone)`;
        return "";
    }

    // Run this every hour to 'fix' femininity.
    public fixFemininity(): string {
        let output = "";
        // Genderless/herms share the same bounds
        if (this.gender == 0 || this.gender == 3) {
            if (this.femininity < 20) {
                output +=
                    "\n<b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
                if (this.hasBeard()) {
                    output += `  As if that wasn't bad enough, your ${this.beard()} falls out too!`;
                    this.beardLength = 0;
                    this.beardStyle = 0;
                }
                output += "</b>\n";
                this.femininity = 20;
            } else if (this.femininity > 85) {
                output +=
                    "\n<b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b>\n";
                this.femininity = 85;
            }
        }
        // GURLS!
        else if (this.gender == 2) {
            if (this.femininity < 30) {
                output +=
                    "\n<b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
                if (this.hasBeard()) {
                    output += `  As if that wasn't bad enough, your ${this.beard()} falls out too!`;
                    this.beardLength = 0;
                    this.beardStyle = 0;
                }
                output += "</b>\n";
                this.femininity = 30;
            }
        }
        // BOIZ!
        else if (this.gender == 1) {
            if (this.femininity > 70) {
                output +=
                    "\n<b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b>\n";
                this.femininity = 70;
            }
            if (this.femininity > 40 && this.hasBeard()) {
                output += `\n<b>Your beard falls out, leaving you with ${this.faceDesc()}.</b>\n`;
                this.beardLength = 0;
                this.beardStyle = 0;
            }
        }
        if (this.gender != 1 && this.hasBeard()) {
            output += `\n<b>Your beard falls out, leaving you with ${this.faceDesc()}.</b>\n`;
            this.beardLength = 0;
            this.beardStyle = 0;
        }
        return output;
    }

    public hasBeard(): boolean {
        return this.beardLength > 0;
    }

    public beard(): string {
        if (this.hasBeard()) return "beard";
        else {
            // CoC_Settings.error("");
            return "ERROR: NO BEARD! <b>YOU ARE NOT A VIKING AND SHOULD TELL FEN IMMEDIATELY.</b>";
        }
    }

    public skin(noAdj = false, noTone = false): string {
        let skinzilla = "";
        // Only show stuff other than skinDesc if justSkin is false
        if (!noAdj) {
            // Adjectives first!
            if (this.skinAdj != "" && !noTone && this.skinTone != "rough gray") {
                skinzilla += this.skinAdj;
                if (noTone) skinzilla += " ";
                else skinzilla += ", ";
            }
        }
        if (!noTone) skinzilla += `${this.skinTone} `;
        // Fur handled a little differently since it uses
        // haircolor
        if (this.skinType == 1) skinzilla += "skin";
        else skinzilla += this.skinDesc;
        return skinzilla;
    }

    public hasMuzzle(): boolean {
        if (
            this.faceType == 1 ||
            this.faceType == 2 ||
            this.faceType == 6 ||
            this.faceType == 7 ||
            this.faceType == 9 ||
            this.faceType == 11 ||
            this.faceType == 12
        )
            return true;
        return false;
    }

    public face(): string {
        let stringo = "";
        // 0 - human
        // 5 - Human w/Naga fangz
        // 8 - bunnah faceahhh bunbun
        // 10 - spidah-face (humanish)
        if (this.faceType == 0) return "face";
        // 1 - horse
        // 2 - dogface
        // 6 - kittah face
        // 9 - kangaface
        if (
            this.faceType == 9 ||
            this.faceType == 6 ||
            this.faceType == 2 ||
            this.faceType == 1 ||
            this.faceType == 11
        ) {
            if (Math.floor(Math.random() * 2) == 0) return "muzzle";
            if (Math.floor(Math.random() * 3) == 0 && this.faceType == 1) stringo = "long ";
            if (Math.floor(Math.random() * 3) == 0 && this.faceType == 6) stringo = "feline ";
            return `${stringo}face`;
        }
        // 3 - cowface
        if (this.faceType == 3) {
            if (Math.floor(Math.random() * 4) == 0) stringo = "bovine ";
            if (Math.floor(Math.random() * 2) == 0) return "muzzle";
            return `${stringo}face`;
        }
        // 4 - sharkface-teeth
        if (this.faceType == 4) {
            if (Math.floor(Math.random() * 4) == 0) stringo = "angular ";
            return `${stringo}face`;
        }
        // 7 - lizard face (durned argonians!)
        if (this.faceType == 7 || this.faceType == 12) {
            if (Math.floor(Math.random() * 4) == 0) stringo = "reptilian ";
            if (Math.floor(Math.random() * 4) == 0) return `${stringo}muzzle`;
            if (Math.floor(Math.random() * 4) == 0) return `${stringo}snout`;
            return `${stringo}face`;
        }
        return "face";
    }

    public hasLongTail(): boolean {
        // 7 - shark tail!
        // 8 - catTAIIIIIL
        // 9 - lizard tail
        // 10 - bunbuntail
        // 11 - harpybutt
        // 12 - rootail
        // 13 - foxtail
        // 14 - dagron tail
        if (this.isNaga()) return true;
        if (
            this.tailType == 2 ||
            this.tailType == 3 ||
            this.tailType == 4 ||
            this.tailType == 7 ||
            this.tailType == 8 ||
            this.tailType == 9 ||
            this.tailType == 12 ||
            this.tailType == 13 ||
            this.tailType == 14
        )
            return true;
        return false;
    }

    public isPregnant(): boolean {
        return this._pregnancyType != 0;
    }

    public isButtPregnant(): boolean {
        return this._buttPregnancyType != 0;
    }

    // fertility must be >= random(0-beat)
    // If arg == 1 then override any contraceptives and guarantee fertilization
    public knockUp(type = 0, incubation = 0, beat = 100, arg = 0): void {
        // Contraceptives cancel!
        if (this.findStatusAffect(StatusAffects.Contraceptives) >= 0 && arg < 1) return;
        //
        //  if (findStatusAffect(StatusAffects.GooStuffed) >= 0) return; //No longer needed thanks to PREGNANCY_GOO_STUFFED being used as a blocking value
        let bonus = 0;
        // If arg = 1 (always pregnant), bonus = 9000
        if (arg >= 1) bonus = 9000;
        if (arg <= -1) bonus = -9000;
        // If unpregnant and fertility wins out:
        if (
            this.pregnancyIncubation == 0 &&
            this.totalFertility() + bonus > Math.floor(Math.random() * beat) &&
            this.hasVagina()
        ) {
            this.knockUpForce(type, incubation);
            trace(`PC Knocked up with pregnancy type: ${type} for ${incubation} incubation.`);
        }
        // Chance for eggs fertilization - ovi elixir and imps excluded!
        if (
            type != PregnancyStore.PREGNANCY_IMP &&
            type != PregnancyStore.PREGNANCY_OVIELIXIR_EGGS &&
            type != PregnancyStore.PREGNANCY_ANEMONE
        ) {
            if (
                this.findPerk(PerkLib.SpiderOvipositor) >= 0 ||
                this.findPerk(PerkLib.BeeOvipositor) >= 0
            ) {
                if (this.totalFertility() + bonus > Math.floor(Math.random() * beat)) {
                    this.fertilizeEggs();
                }
            }
        }
    }

    // The more complex knockUp function used by the player is defined above
    // The player doesn't need to be told of the last event triggered, so the code here is quite a bit simpler than that in PregnancyStore
    public knockUpForce(type = 0, incubation = 0): void {
        this._pregnancyType = type;
        this._pregnancyIncubation = type == 0 ? 0 : incubation; // Won't allow incubation time without pregnancy type
    }

    // fertility must be >= random(0-beat)
    public buttKnockUp(type = 0, incubation = 0, beat = 100, arg = 0): void {
        // Contraceptives cancel!
        if (this.findStatusAffect(StatusAffects.Contraceptives) >= 0 && arg < 1) return;
        let bonus = 0;
        // If arg = 1 (always pregnant), bonus = 9000
        if (arg >= 1) bonus = 9000;
        if (arg <= -1) bonus = -9000;
        // If unpregnant and fertility wins out:
        if (
            this.buttPregnancyIncubation == 0 &&
            this.totalFertility() + bonus > Math.floor(Math.random() * beat)
        ) {
            this.buttKnockUpForce(type, incubation);
            trace(`PC Butt Knocked up with pregnancy type: ${type} for ${incubation} incubation.`);
        }
    }

    // The more complex buttKnockUp function used by the player is defined in Character.as
    public buttKnockUpForce(type = 0, incubation = 0): void {
        this._buttPregnancyType = type;
        this._buttPregnancyIncubation = type == 0 ? 0 : incubation; // Won't allow incubation time without pregnancy type
    }

    public pregnancyAdvance(): boolean {
        if (this._pregnancyIncubation > 0) this._pregnancyIncubation--;
        if (this._pregnancyIncubation < 0) this._pregnancyIncubation = 0;
        if (this._buttPregnancyIncubation > 0) this._buttPregnancyIncubation--;
        if (this._buttPregnancyIncubation < 0) this._buttPregnancyIncubation = 0;
        return this.pregnancyUpdate();
    }

    public pregnancyUpdate(): boolean {
        return false;
    }

    // Create a keyItem
    public createKeyItem(
        keyName: string,
        value1: number,
        value2: number,
        value3: number,
        value4: number
    ): void {
        const newKeyItem: KeyItemClass = new KeyItemClass();
        // used to denote that the array has already had its new spot pushed on.
        let arrayed = false;
        // used to store where the array goes
        let keySlot = 0;
        let counter = 0;
        // Start the array if its the first bit
        if (this.keyItems.length == 0) {
            // trace("New Key Item Started Array! " + keyName);
            this.keyItems.push(newKeyItem);
            arrayed = true;
            keySlot = 0;
        }
        // If it belongs at the end, push it on
        if (this.keyItems[this.keyItems.length - 1].keyName < keyName && !arrayed) {
            // trace("New Key Item Belongs at the end!! " + keyName);
            this.keyItems.push(newKeyItem);
            arrayed = true;
            keySlot = this.keyItems.length - 1;
        }
        // If it belongs in the beginning, splice it in
        if (this.keyItems[0].keyName > keyName && !arrayed) {
            // trace("New Key Item Belongs at the beginning! " + keyName);
            this.keyItems.splice(0, 0, newKeyItem);
            arrayed = true;
            keySlot = 0;
        }
        // Find the spot it needs to go in and splice it in.
        if (!arrayed) {
            // trace("New Key Item using alphabetizer! " + keyName);
            counter = this.keyItems.length;
            while (counter > 0 && !arrayed) {
                counter--;
                // If the current slot is later than new key
                if (this.keyItems[counter].keyName > keyName) {
                    // If the earlier slot is earlier than new key && a real spot
                    if (counter - 1 >= 0) {
                        // If the earlier slot is earlier slot in!
                        if (this.keyItems[counter - 1].keyName <= keyName) {
                            arrayed = true;
                            this.keyItems.splice(counter, 0, newKeyItem);
                            keySlot = counter;
                        }
                    }
                    // If the item after 0 slot is later put here!
                    else {
                        // If the next slot is later we are go
                        if (this.keyItems[counter].keyName <= keyName) {
                            arrayed = true;
                            this.keyItems.splice(counter, 0, newKeyItem);
                            keySlot = counter;
                        }
                    }
                }
            }
        }
        // Fallback
        if (!arrayed) {
            // trace("New Key Item Belongs at the end!! " + keyName);
            this.keyItems.push(newKeyItem);
            keySlot = this.keyItems.length - 1;
        }

        this.keyItems[keySlot].keyName = keyName;
        this.keyItems[keySlot].value1 = value1;
        this.keyItems[keySlot].value2 = value2;
        this.keyItems[keySlot].value3 = value3;
        this.keyItems[keySlot].value4 = value4;
        // trace("NEW KEYITEM FOR PLAYER in slot " + keySlot + ": " + keyItems[keySlot].keyName);
    }

    // Remove a key item
    public removeKeyItem(itemName: string): void {
        let counter: number = this.keyItems.length;
        // Various Errors preventing action
        if (this.keyItems.length <= 0) {
            // trace("ERROR: KeyItem could not be removed because player has no key items.");
            return;
        }
        while (counter > 0) {
            counter--;
            if (this.keyItems[counter].keyName == itemName) {
                this.keyItems.splice(counter, 1);
                trace(`Attempted to remove "${itemName}" keyItem.`);
                counter = 0;
            }
        }
    }

    public addKeyValue(statusName: string, statusValueNum = 1, newNum = 0): void {
        let counter: number = this.keyItems.length;
        // Various Errors preventing action
        if (this.keyItems.length <= 0) {
            return;
            // trace("ERROR: Looking for keyitem '" + statusName + "' to change value " + statusValueNum + ", and player has no key items.");
        }
        while (counter > 0) {
            counter--;
            // Find it, change it, quit out
            if (this.keyItems[counter].keyName == statusName) {
                if (statusValueNum < 1 || statusValueNum > 4) {
                    // trace("ERROR: AddKeyValue called with invalid key value number.");
                    return;
                }
                if (statusValueNum == 1) this.keyItems[counter].value1 += newNum;
                if (statusValueNum == 2) this.keyItems[counter].value2 += newNum;
                if (statusValueNum == 3) this.keyItems[counter].value3 += newNum;
                if (statusValueNum == 4) this.keyItems[counter].value4 += newNum;
                return;
            }
        }
        // trace("ERROR: Looking for keyitem '" + statusName + "' to change value " + statusValueNum + ", and player does not have the key item.");
    }

    public keyItemv1(statusName: string): number {
        let counter: number = this.keyItems.length;
        // Various Errors preventing action
        if (this.keyItems.length <= 0) {
            return 0;
            // trace("ERROR: Looking for keyItem '" + statusName + "', and player has no key items.");
        }
        while (counter > 0) {
            counter--;
            if (this.keyItems[counter].keyName == statusName) return this.keyItems[counter].value1;
        }
        // trace("ERROR: Looking for key item '" + statusName + "', but player does not have it.");
        return 0;
    }

    public keyItemv2(statusName: string): number {
        let counter: number = this.keyItems.length;
        // Various Errors preventing action
        if (this.keyItems.length <= 0) {
            return 0;
            // trace("ERROR: Looking for keyItem '" + statusName + "', and player has no key items.");
        }
        while (counter > 0) {
            counter--;
            if (this.keyItems[counter].keyName == statusName) return this.keyItems[counter].value2;
        }
        // trace("ERROR: Looking for key item '" + statusName + "', but player does not have it.");
        return 0;
    }

    public keyItemv3(statusName: string): number {
        let counter: number = this.keyItems.length;
        // Various Errors preventing action
        if (this.keyItems.length <= 0) {
            return 0;
            // trace("ERROR: Looking for keyItem '" + statusName + "', and player has no key items.");
        }
        while (counter > 0) {
            counter--;
            if (this.keyItems[counter].keyName == statusName) return this.keyItems[counter].value3;
        }
        // trace("ERROR: Looking for key item '" + statusName + "', but player does not have it.");
        return 0;
    }

    public keyItemv4(statusName: string): number {
        let counter: number = this.keyItems.length;
        // Various Errors preventing action
        if (this.keyItems.length <= 0) {
            return 0;
            // trace("ERROR: Looking for keyItem '" + statusName + "', and player has no key items.");
        }
        while (counter > 0) {
            counter--;
            if (this.keyItems[counter].keyName == statusName) return this.keyItems[counter].value4;
        }
        // trace("ERROR: Looking for key item '" + statusName + "', but player does not have it.");
        return 0;
    }

    public removeKeyItems(): void {
        let counter: number = this.keyItems.length;
        while (counter > 0) {
            counter--;
            this.keyItems.splice(counter, 1);
        }
    }

    public hasKeyItem(keyName: string): number {
        let counter: number = this.keyItems.length;
        // Various Errors preventing action
        if (this.keyItems.length <= 0) return -2;
        while (counter > 0) {
            counter--;
            if (this.keyItems[counter].keyName == keyName) return counter;
        }
        return -1;
    }

    // Grow

    // BreastCup

    /* OLD AND UNUSED
       public  breastCupS(rowNum: number): string {
       if(breastRows[rowNum].breastRating < 1) return "tiny";
       else if(breastRows[rowNum].breastRating < 2) return "A";
       else if(breastRows[rowNum].breastRating < 3) return "B";
       else if(breastRows[rowNum].breastRating < 4) return "C";
       else if(breastRows[rowNum].breastRating < 5) return "D";
       else if(breastRows[rowNum].breastRating < 6) return "DD";
       else if(breastRows[rowNum].breastRating < 7) return "E";
       else if(breastRows[rowNum].breastRating < 8) return "F";
       else if(breastRows[rowNum].breastRating < 9) return "G";
       else if(breastRows[rowNum].breastRating < 10) return "GG";
       else if(breastRows[rowNum].breastRating < 11) return "H";
       else if(breastRows[rowNum].breastRating < 12) return "HH";
       else if(breastRows[rowNum].breastRating < 13) return "HHH";
       return "massive custom-made";
     }*/
    public viridianChange(): boolean {
        let count: number = this.cockTotal();
        if (count == 0) return false;
        while (count > 0) {
            count--;
            if (
                this.cocks[count].sock == "amaranthine" &&
                this.cocks[count].cockType != CockTypesEnum.DISPLACER
            )
                return true;
        }
        return false;
    }

    public hasKnot(arg = 0): boolean {
        if (arg > this.cockTotal() - 1 || arg < 0) return false;
        return (
            this.cocks[arg].cockType == CockTypesEnum.DOG ||
            this.cocks[arg].cockType == CockTypesEnum.FOX ||
            this.cocks[arg].cockType == CockTypesEnum.DISPLACER
        );
    }

    public maxHP(): number {
        let max = 0;
        max += Math.floor(this.tou * 2 + 50);
        if (this.findPerk(PerkLib.Tank) >= 0) max += 50;
        if (this.findPerk(PerkLib.Tank2) >= 0) max += Math.round(this.tou);
        if (this.findPerk(PerkLib.ChiReflowDefense) >= 0)
            max += UmasShop.NEEDLEWORK_DEFENSE_EXTRA_HP;
        if (this.level <= 20) max += this.level * 15;
        else max += 20 * 15;
        max = Math.round(max);
        if (max > 999) max = 999;
        return max;
    }

    public buttDescript(): string {
        return Appearance.buttDescription(this);
    }
}
