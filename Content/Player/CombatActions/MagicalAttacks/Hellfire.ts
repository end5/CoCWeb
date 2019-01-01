import { randInt } from 'Engine/Utilities/SMath';
import { EffectType } from 'Content/Effects/EffectType';
import { NextScreenChoices } from 'Engine/ScreenDisplay';
import { Character } from 'Content/Character/GameCharacter';
import { CharacterType } from 'Engine/Character/CharacterType';
import { PlayerSpellAction } from '../PlayerSpellAction';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';
import { CanUseResult } from 'Engine/Combat/Actions/CombatAction';
import { CView } from 'Page/ContentView';

export class Hellfire extends PlayerSpellAction {
    public name = "Hellfire";
    public flags = CombatActionType.MagicSpec;
    public readonly baseCost: number = 20;

    public canUse(character: Character, monster: Character): CanUseResult {
        const result = super.canUse(character, monster);
        return { canUse: result.canUse, reasonCannotUse: "You are too tired to breathe fire.\n" + result.reasonCannotUse };
    }

    public isPossible(character: Character): boolean {
        return character.effects.has(EffectType.Hellfire);
    }

    public use(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        character.stats.fatigueMagic(this.baseCost);
        // Amily!
        if (monster.effects.has(EffectType.Concentration)) {
            CView.text("Amily easily glides around your attack thanks to her complete concentration on your movements.\n\n");
            return;
        }
        if (monster.charType === CharacterType.LivingStatue) {
            CView.text("The fire courses over the stone behemoths skin harmlessly. It does leave the surface of the statue glossier in its wake.");
            return;
        }
        let damage: number = (character.stats.level * 8 + randInt(10) + character.stats.cor / 5);
        if (!character.effects.has(EffectType.GooArmorSilence)) CView.text("You take in a deep breath and unleash a wave of corrupt red flames from deep within.");

        if (character.effects.has(EffectType.WebSilence)) {
            CView.text("  <b>The fire burns through the webs blocking your mouth!</b>");
            character.effects.remove(EffectType.WebSilence);
        }
        if (character.effects.has(EffectType.GooArmorSilence)) {
            CView.text("  <b>A growl rumbles from deep within as you charge the terrestrial fire, and you force it from your chest and into the slime.  The goop bubbles and steams as it evaporates, drawing a curious look from your foe, who pauses in her onslaught to lean in and watch.  While the tension around your mouth lessens and your opponent forgets herself more and more, you bide your time.  When you can finally work your jaw enough to open your mouth, you expel the lion's - or jaguar's? share of the flame, inflating an enormous bubble of fire and evaporated slime that thins and finally pops to release a superheated cloud.  The armored girl screams and recoils as she's enveloped, flailing her arms.</b>");
            character.effects.remove(EffectType.GooArmorSilence);
            damage += 25;
        }
        if (monster.desc.short === "Isabella") {
            // CView.text("  Isabella shoulders her shield into the path of the crimson flames.  They burst over the wall of steel, splitting around the impenetrable obstruction and washing out harmlessly to the sides.\n\n");
            // if (isabellaFollowerScene.isabellaAccent()) CView.text("\"<i>Is zat all you've got?  It'll take more than a flashy magic trick to beat Izabella!</i>\" taunts the cow-girl.\n\n");
            // else CView.text("\"<i>Is that all you've got?  It'll take more than a flashy magic trick to beat Isabella!</i>\" taunts the cow-girl.\n\n");

            return;
        }
        else if (monster.desc.short === "Vala") {
            CView.text("  Vala beats her wings with surprising strength, blowing the fireball back at you!  ");
            if (character.effects.has(EffectType.Evade) && randInt(2) === 0) {
                CView.text("You dive out of the way and evade it!");
            }
            else if (character.effects.has(EffectType.Flexibility) && randInt(4) === 0) {
                CView.text("You use your flexibility to barely fold your body out of the way!");
            }
            else {
                damage = Math.floor(damage / 6);
                CView.text("Your own fire smacks into your face, arousing you!");
                character.stats.lust += damage;
            }
            CView.text("\n");
        }
        else {
            if (monster.stats.int < 10) {
                CView.text("  Your foe lets out a shriek as their form is engulfed in the blistering flames.");
                damage = Math.floor(damage);
                damage = monster.combat.loseHP(damage, character);
                CView.text("(" + damage + ")\n");
            }
            else {
                if (monster.stats.lustVuln > 0) {
                    CView.text("  Your foe cries out in surprise and then gives a sensual moan as the flames of your passion surround them and fill their body with unnatural lust.\n");
                    monster.stats.lust += monster.stats.lustVuln * damage / 6;
                }
                else {
                    CView.text("  The corrupted fire doesn't seem to have affect on " + monster.desc.a + monster.desc.short + "!\n");
                }
            }
        }
        CView.text("\n");
        // if (monster.desc.short === "Holli" && !monster.statusAffects.has(StatusAffectType.HolliBurning))
        //     monster.lightHolliOnFireMagically() as Holli;
    }
}
