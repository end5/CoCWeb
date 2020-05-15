import { kGAMECLASS } from "../GlobalFlags/kGAMECLASS";

// Calls are now made through kGAMECLASS rather than thisPtr. This allows the compiler to detect if/when a function is inaccessible.

// Possible text arguments in the conditional of a if statement
// First, there is an attempt to cast the argument to a Number. If that fails,
// a dictionary lookup is performed to see if the argument is in the conditionalOptions[]
// object. If that fails, we just fall back to returning 0
export const conditionalOptions: Record<string, any> = {
    strength(): any {
        return kGAMECLASS.player.str;
    },
    toughness(): any {
        return kGAMECLASS.player.tou;
    },
    speed(): any {
        return kGAMECLASS.player.spe;
    },
    intelligence(): any {
        return kGAMECLASS.player.inte;
    },
    libido(): any {
        return kGAMECLASS.player.lib;
    },
    sensitivity(): any {
        return kGAMECLASS.player.sens;
    },
    corruption(): any {
        return kGAMECLASS.player.cor;
    },
    fatigue(): any {
        return kGAMECLASS.player.fatigue;
    },
    hp(): any {
        return kGAMECLASS.player.HP;
    },
    hour(): any {
        return kGAMECLASS.model.time.hours;
    },
    days(): any {
        return kGAMECLASS.model.time.days;
    },
    tallness(): any {
        return kGAMECLASS.player.tallness;
    },
    hairlength(): any {
        return kGAMECLASS.player.hairLength;
    },
    femininity(): any {
        return kGAMECLASS.player.femininity;
    },
    masculinity(): any {
        return 100 - kGAMECLASS.player.femininity;
    },
    cocks(): any {
        return kGAMECLASS.player.cockTotal();
    },
    breastrows(): any {
        return kGAMECLASS.player.bRows();
    },
    biggesttitsize(): any {
        return kGAMECLASS.player.biggestTitSize();
    },
    vagcapacity(): any {
        return kGAMECLASS.player.vaginalCapacity();
    },
    analcapacity(): any {
        return kGAMECLASS.player.analCapacity();
    },
    balls(): any {
        return kGAMECLASS.player.balls;
    },
    cumquantity(): any {
        return kGAMECLASS.player.cumQ();
    },
    // "biggesttitsize": function (): any { return kGAMECLASS.player.biggestTitSize(); },
    milkquantity(): any {
        return kGAMECLASS.player.lactationQ();
    },
    hasvagina(): any {
        return kGAMECLASS.player.hasVagina();
    },
    istaur(): any {
        return kGAMECLASS.player.isTaur();
    },
    isnaga(): any {
        return kGAMECLASS.player.isNaga();
    },
    isgoo(): any {
        return kGAMECLASS.player.isGoo();
    },
    isbiped(): any {
        return kGAMECLASS.player.isBiped();
    },
    hasbreasts(): any {
        return kGAMECLASS.player.biggestTitSize() >= 1;
    },
    hasballs(): any {
        return kGAMECLASS.player.balls > 0;
    },
    hascock(): any {
        return kGAMECLASS.player.hasCock();
    },
    isherm(): any {
        return kGAMECLASS.player.gender == 3;
    },
    cumnormal(): any {
        return kGAMECLASS.player.cumQ() <= 150;
    },
    cummedium(): any {
        return kGAMECLASS.player.cumQ() > 150 && kGAMECLASS.player.cumQ() <= 350;
    },
    cumhigh(): any {
        return kGAMECLASS.player.cumQ() > 350 && kGAMECLASS.player.cumQ() <= 1000;
    },
    cumveryhigh(): any {
        return kGAMECLASS.player.cumQ() > 1000 && kGAMECLASS.player.cumQ() <= 2500;
    },
    cumextreme(): any {
        return kGAMECLASS.player.cumQ() > 2500;
    },
    issquirter(): any {
        return kGAMECLASS.player.wetness() >= 4;
    },
    ispregnant(): any {
        return kGAMECLASS.player.pregnancyIncubation > 0;
    },
    isbuttpregnant(): any {
        return kGAMECLASS.player.buttPregnancyIncubation > 0;
    },
    hasnipplecunts(): any {
        return kGAMECLASS.player.hasFuckableNipples();
    },
    canfly(): any {
        return kGAMECLASS.player.canFly();
    },
    islactating(): any {
        return kGAMECLASS.player.lactationQ() > 0;
    },
    true(): any {
        return true;
    },
    false(): any {
        return false;
    },
};
