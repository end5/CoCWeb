import { BlackMagic } from './BlackMagic';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { Vagina, VaginaWetness } from '../../../../Body/Vagina';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { Character } from '../../../Character';
import { CView } from '../../../../../Page/ContentView';
import { describeCockShort, describeCocksLight } from '../../../../Descriptors/CockDescriptor';
import { describeVagina } from '../../../../Descriptors/VaginaDescriptor';
import { IActionDamage } from '../../../../Combat/Actions/CombatAction';

export class Arouse extends BlackMagic {
    public name: string = "Arouse";
    public readonly baseCost: number = 15;

    public isPossible(character: Character): boolean {
        return character.effects.has(StatusEffectType.KnowsArouse);
    }

    public consumeComponents(character: Character, monster: Character): void {
        character.stats.fatigueMagic(this.baseCost);
    }

    public useAction(character: Character, monster: Character): void {
        CView.clear();
        CView.text("You make a series of arcane gestures, drawing on your own lust to inflict it upon your foe!\n");
    }

    public checkHit(character: Character, monster: Character): boolean {
        return true;
    }

    public calcDamage(character: Character, monster: Character): void | IActionDamage {
        return { lust: monster.stats.lustVuln * (character.stats.int / 5 * character.combat.stats.spellMod() + randInt(monster.stats.lib - monster.stats.int * 2 + monster.stats.cor) / 5) };
    }

    public applyDamage(character: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        monster.stats.lust += lust;
        if (monster.stats.lust < 30)
            CView.text(monster.desc.capitalA + monster.desc.short + " squirms as the magic affects " + monster.desc.objectivePronoun + ".  ");
        if (monster.stats.lust >= 30 && monster.stats.lust < 60) {
            if (monster.desc.plural)
                CView.text(monster.desc.capitalA + monster.desc.short + " stagger, suddenly weak and having trouble focusing on staying upright.  ");
            else
                CView.text(monster.desc.capitalA + monster.desc.short + " staggers, suddenly weak and having trouble focusing on staying upright.  ");
        }
        if (monster.stats.lust >= 60) {
            CView.text(monster.desc.capitalA + monster.desc.short + "'");
            if (!monster.desc.plural) CView.text("s");
            CView.text(" eyes glaze over with desire for a moment.  ");
        }
        if (monster.body.cocks.length > 0) {
            if (monster.stats.lust >= 60 && monster.body.cocks.length > 0)
                CView.text("You see " + monster.desc.possessivePronoun + " " + describeCocksLight(character) + " dribble pre-cum.  ");
            if (monster.stats.lust >= 30 && monster.stats.lust < 60 && monster.body.cocks.length === 1)
                CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeCockShort(character.body.cocks.get(0)!) + " hardens, distracting " + monster.desc.objectivePronoun + " further.  ");
            if (monster.stats.lust >= 30 && monster.stats.lust < 60 && monster.body.cocks.length > 1)
                CView.text("You see " + monster.desc.possessivePronoun + " " + describeCocksLight(character) + " harden uncomfortably.  ");
        }
        if (monster.body.vaginas.length > 0) {
            const firstVagina: Vagina = character.body.vaginas.get(0)!;
            if (monster.desc.plural) {
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.NORMAL)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeVagina(character, firstVagina) + "s dampen perceptibly.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.WET)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s crotches become sticky with girl-lust.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.SLICK)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeVagina(character, firstVagina) + "s become sloppy and wet.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.DROOLING)
                    CView.text("Thick runners of girl-lube stream down the insides of " + monster.desc.a + monster.desc.short + "'s thighs.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.SLAVERING)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeVagina(character, firstVagina) + "s instantly soak " + monster.desc.objectivePronoun + " groin.  ");
            }
            else {
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.NORMAL)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeVagina(character, firstVagina) + " dampens perceptibly.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.WET)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s crotch becomes sticky with girl-lust.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.SLICK)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeVagina(character, firstVagina) + " becomes sloppy and wet.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.DROOLING)
                    CView.text("Thick runners of girl-lube stream down the insides of " + monster.desc.a + monster.desc.short + "'s thighs.  ");
                if (monster.stats.lust >= 60 && firstVagina.wetness === VaginaWetness.SLAVERING)
                    CView.text(monster.desc.capitalA + monster.desc.short + "'s " + describeVagina(character, firstVagina) + " instantly soaks her groin.  ");
            }
        }
        CView.text("\n\n");
    }
}
