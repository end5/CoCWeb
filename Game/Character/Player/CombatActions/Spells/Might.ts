import { BlackMagic } from './BlackMagic';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { Character } from '../../../Character';
import { describeButthole } from '../../../../Descriptors/ButtDescriptor';
import { Gender } from '../../../../Body/GenderIdentity';
import { describeCock, describeCocksLight } from '../../../../Descriptors/CockDescriptor';
import { describeVagina } from '../../../../Descriptors/VaginaDescriptor';
import { CView } from '../../../../../Page/ContentView';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Might extends BlackMagic {
    public name: string = "Might";
    public readonly baseCost: number = 25;

    public isPossible(character: Character): boolean {
        return character.effects.has(StatusEffectType.KnowsMight);
    }

    public canUse(character: Character, monster: Character): boolean {
        if (character.combat.effects.has(CombatEffectType.Might)) {
            this.reasonCannotUse = "<b>You are already under the effects of Might and cannot cast it again.</b>\n\n";
            return false;
        }
        return super.canUse(character, monster);
    }

    public consumeComponents(character: Character, monster: Character): void {
        character.stats.fatigueMagic(this.baseCost);
    }

    public useAction(character: Character, monster: Character): void {
        CView.clear();
        CView.text("You flush, drawing on your body's desires to empower your muscles and toughen you up.\n\n");
    }

    public checkHit(character: Character, monster: Character): boolean {
        // 25% backfire!
        return randInt(4) === 0;
    }

    public missed(character: Character, monster: Character): void {
        CView.text("An errant sexual thought crosses your mind, and you lose control of the spell!  Your ");
        if (character.gender === Gender.NONE) CView.text(describeButthole(character.body.butt) + " tingles with a desire to be filled as your libido spins out of control.");
        if (character.gender === Gender.MALE) {
            if (character.body.cocks.length === 1) CView.text(describeCock(character, character.body.cocks.get(0)!) + " twitches obscenely and drips with pre-cum as your libido spins out of control.");
            else CView.text(describeCocksLight(character) + " twitch obscenely and drip with pre-cum as your libido spins out of control.");
        }
        if (character.gender === Gender.FEMALE) CView.text(describeVagina(character, character.body.vaginas.get(0)!) + " becomes puffy, hot, and ready to be touched as the magic diverts into it.");
        if (character.gender === Gender.HERM) CView.text(describeVagina(character, character.body.vaginas.get(0)!) + " and " + describeCocksLight(character) + " overfill with blood, becoming puffy and incredibly sensitive as the magic focuses on them.");
        character.stats.lib += .25;
        character.stats.lust += 15;
        CView.text("\n\n");
    }

    public applyDamage(character: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        CView.text("The rush of success and power flows through your body.  You feel like you can do anything!");
        const temp = 5 * character.combat.stats.spellMod();
        let tempStr = temp;
        let tempTou = temp;
        if (character.stats.str + temp > 100) tempStr = 100 - character.stats.str;
        if (character.stats.tou + temp > 100) tempTou = 100 - character.stats.tou;
        character.combat.effects.add(CombatEffectType.Might, character, {
            str: { value: { flat: tempStr } },
            tou: { value: { flat: tempTou } }
        });
        CView.text("\n\n");
    }
}
