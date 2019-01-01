import { randInt } from 'Engine/Utilities/SMath';
import { EffectType } from 'Content/Effects/EffectType';
import { Character } from 'Content/Character/GameCharacter';
import { IActionDamage, CombatAction, CanUseResult } from 'Engine/Combat/Actions/CombatAction';
import { CView } from 'Page/ContentView';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export class Fireball extends CombatAction {
    public name = "Fire Breath";
    public type = CombatActionType.MagicSpec;
    public readonly fatigueCost: number = 20;

    public isPossible(character: Character): boolean {
        return character.effects.has(EffectType.FireLord);
    }

    public canUse(character: Character, monster: Character): CanUseResult {
        return { canUse: character.stats.fatigue + this.fatigueCost <= 100, reasonCannotUse: "You are too tired to breathe fire." };
    }

    public consumeComponentss(character: Character, monster: Character): void {
        character.stats.fatigue += this.fatigueCost;
    }

    public checkMiss(character: Character, monster: Character): boolean {
        return randInt(5) === 0 || character.effects.has(EffectType.WebSilence);
    }

    public missed(character: Character, monster: Character): void {
        // [Failure]
        // (high damage to self, +20 fatigue)
        CView.clear();
        if (character.effects.has(EffectType.WebSilence)) CView.text("You reach for the terrestrial fire, but as you ready to release a torrent of flame, it backs up in your throat, blocked by the webbing across your mouth.  It causes you to cry out as the sudden, heated force explodes in your own throat.\n\n");
        else if (character.effects.has(EffectType.GooArmorSilence)) CView.text("You reach for the terrestrial fire but as you ready the torrent, it erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.  The slime covering your mouth bubbles and pops, boiling away where the escaping flame opens small rents in it.  That wasn't as effective as you'd hoped, but you can at least speak now.");
        else CView.text("You reach for the terrestrial fire, but as you ready to release a torrent of flame, the fire inside erupts prematurely, causing you to cry out as the sudden heated force explodes in your own throat.\n\n");
        character.stats.fatigue += 10;
        character.combat.loseHP(10 + randInt(20));
    }

    public calcDamage(character: Character, monster: Character): IActionDamage {
        let damage: number;
        damage = Math.floor(character.stats.level * 10 + 45 + randInt(10));
        if (character.effects.has(EffectType.GooArmorSilence)) {
            CView.text("<b>A growl rumbles from deep within as you charge the terrestrial fire, and you force it from your chest and into the slime.  The goop bubbles and steams as it evaporates, drawing a curious look from your foe, who pauses in her onslaught to lean in and watch.  While the tension around your mouth lessens and your opponent forgets herself more and more, you bide your time.  When you can finally work your jaw enough to open your mouth, you expel the lion's - or jaguar's? share of the flame, inflating an enormous bubble of fire and evaporated slime that thins and finally pops to release a superheated cloud.  The armored girl screams and recoils as she's enveloped, flailing her arms.</b> ");
            character.effects.removeByName(EffectType.GooArmorSilence);
            damage += 25;
        }
        else CView.text("A growl rumbles deep with your chest as you charge the terrestrial fire.  When you can hold it no longer, you release an ear splitting roar and hurl a giant green conflagration at your enemy. ");
        return { damage };
    }

    public applyDamage(character: Character, monster: Character, damage?: number, lust?: number, crit?: boolean): void {
        if (damage) {
            damage = monster.combat.loseHP(damage);
            CView.text("(" + damage + ")\n\n");
        }
    }
}
