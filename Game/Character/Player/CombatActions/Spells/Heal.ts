import { BlackMagic } from './BlackMagic';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { Character } from '../../../Character';
import { Gender } from '../../../../Body/GenderIdentity';
import { describeButthole } from '../../../../Descriptors/ButtDescriptor';
import { describeCock, describeCocksLight } from '../../../../Descriptors/CockDescriptor';
import { describeVagina } from '../../../../Descriptors/VaginaDescriptor';
import { CView } from '../../../../../Page/ContentView';
import { IActionDamage } from '../../../../Combat/Actions/CombatAction';

export class Heal extends BlackMagic {
    public name: string = "Heal";
    public readonly baseCost: number = 20;

    public isPossible(character: Character): boolean {
        return character.effects.has(StatusEffectType.KnowsHeal);
    }

    public consumeComponents(character: Character, monster: Character): void {
        character.stats.fatigueMagic(this.baseCost);
    }

    public useAction(character: Character, monster: Character): void {
        CView.clear();
        CView.text("You focus on your body and its desire to end pain, trying to draw on your arousal without enhancing it.\n");
    }

    public checkHit(character: Character, monster: Character): boolean {
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
    }

    public calcDamage(character: Character, monster: Character): void | IActionDamage {
        let damage = -Math.floor((character.stats.int / (2 + randInt(3)) * character.combat.stats.spellMod()) * (character.stats.maxHP() / 150));
        if (character.inventory.armor.displayName === "skimpy nurse's outfit")
            damage *= 1.2;
        return { damage };
    }

    public applyDamage(character: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        CView.text("You flush with success as your wounds begin to knit (+" + damage + ").");
        character.combat.stats.gainHP(damage);
        CView.text("\n\n");
    }
}
