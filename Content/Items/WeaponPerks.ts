import { Character } from 'Engine/Character/Character';
import { randInt } from 'Engine/Utilities/SMath';
import { EffectType } from 'Content/Effects/EffectType';
import { CView } from 'Engine/Display/ContentView';
import { WeaponPerkLib } from 'Engine/Items/WeaponPerkLib';

export enum WeaponPerkType {
    Penetrate = "Penetrate",
    Aphrodisiac = "Aphrodisiac",
    CoiledWhip = "CoiledWhip",
    SuccubiWhip = "SuccubiWhip",
    Stunning = "Stunning",
    Bleeding = "Bleeding",
    Large = "Large",
    WizardsFocus = "Wizard's Focus",
    HolySword = "Holy Sword"
}

WeaponPerkLib.set(WeaponPerkType.Penetrate, Penetrate);
WeaponPerkLib.set(WeaponPerkType.Aphrodisiac, Aphrodisiac);
WeaponPerkLib.set(WeaponPerkType.CoiledWhip, CoiledWhip);
WeaponPerkLib.set(WeaponPerkType.SuccubiWhip, SuccubiWhip);
WeaponPerkLib.set(WeaponPerkType.Stunning, Stunning);
WeaponPerkLib.set(WeaponPerkType.Bleeding, Bleeding);
// WeaponPerkLib.set(WeaponPerkType.Large, undefined);

export function Penetrate(self: Character, target: Character) {
    return target.combat.defense();
}

export function Aphrodisiac(self: Character, target: Character) {
    target.stats.lust += target.stats.lustVuln * (5 + self.stats.cor / 10);
    CView.text("\n" + target.desc.capitalA + target.desc.short + " shivers as your weapon's 'poison' goes to work.");
}

export function CoiledWhip(self: Character, target: Character) {
    if (randInt(2) === 0) {
        target.stats.lust += target.stats.lustVuln * (5 + self.stats.cor / 12);
        if (!target.desc.plural)
            CView.text("\n" + target.desc.capitalA + target.desc.short + " shivers and gets turned on from the whipping.");
        else
            CView.text("\n" + target.desc.capitalA + target.desc.short + " shiver and get turned on from the whipping.");
    }
}

export function SuccubiWhip(self: Character, target: Character) {
    target.stats.lust += target.stats.lustVuln * (20 + self.stats.cor / 15);
    if (self.stats.cor < 90) self.stats.cor += 0.3;
    if (!target.desc.plural)
        CView.text("\n" + target.desc.capitalA + target.desc.short + " shivers and moans involuntarily from the whip's touches.");
    else
        CView.text("\n" + target.desc.capitalA + target.desc.short + " shiver and moan involuntarily from the whip's touches.");
    if (randInt(2) === 0) {
        CView.text("  You get a sexual thrill from it.");
        self.stats.lust += 1;
    }
}

// Warhammer, Gauntlets
export function Stunning(self: Character, target: Character) {
    if (randInt(10) === 0 && !target.effects.has(EffectType.Resolute)) {
        CView.text("\n" + target.desc.capitalA + target.desc.short + " reels from the brutal blow, stunned.");
        target.effects.create(EffectType.Stunned);
    }
}

// Hooked Gauntlets
export function Bleeding(self: Character, target: Character) {
    if (randInt(2) === 0 && target.combat.defense() < 10 && !target.effects.has(EffectType.IzmaBleed)) {
        target.effects.create(EffectType.IzmaBleed);
        if (target.desc.plural)
            CView.text("\n" + target.desc.capitalA + target.desc.short + " bleed profusely from the many bloody gashes your hooked gauntlets leave behind.");
        else
            CView.text("\n" + target.desc.capitalA + target.desc.short + " bleeds profusely from the many bloody gashes your hooked gauntlets leave behind.");
    }
}
