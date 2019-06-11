import { kGAMECLASS } from "../GlobalFlags/kGAMECLASS";

//Calls are now made through kGAMECLASS rather than thisPtr. This allows the compiler to detect if/when a function is inaccessible.



// Possible text arguments in the conditional of a if statement
// First, there is an attempt to cast the argument to a Number. If that fails,
// a dictionary lookup is performed to see if the argument is in the conditionalOptions[]
// object. If that fails, we just fall back to returning 0
export const conditionalOptions: Record<string, any> =
{
    "strength": function (): any { return kGAMECLASS.player.str; },
    "toughness": function (): any { return kGAMECLASS.player.tou; },
    "speed": function (): any { return kGAMECLASS.player.spe; },
    "intelligence": function (): any { return kGAMECLASS.player.inte; },
    "libido": function (): any { return kGAMECLASS.player.lib; },
    "sensitivity": function (): any { return kGAMECLASS.player.sens; },
    "corruption": function (): any { return kGAMECLASS.player.cor; },
    "fatigue": function (): any { return kGAMECLASS.player.fatigue; },
    "hp": function (): any { return kGAMECLASS.player.HP; },
    "hour": function (): any { return kGAMECLASS.model.time.hours; },
    "days": function (): any { return kGAMECLASS.model.time.days; },
    "tallness": function (): any { return kGAMECLASS.player.tallness; },
    "hairlength": function (): any { return kGAMECLASS.player.hairLength; },
    "femininity": function (): any { return kGAMECLASS.player.femininity; },
    "masculinity": function (): any { return 100 - kGAMECLASS.player.femininity; },
    "cocks": function (): any { return kGAMECLASS.player.cockTotal(); },
    "breastrows": function (): any { return kGAMECLASS.player.bRows(); },
    "biggesttitsize": function (): any { return kGAMECLASS.player.biggestTitSize(); },
    "vagcapacity": function (): any { return kGAMECLASS.player.vaginalCapacity(); },
    "analcapacity": function (): any { return kGAMECLASS.player.analCapacity(); },
    "balls": function (): any { return kGAMECLASS.player.balls; },
    "cumquantity": function (): any { return kGAMECLASS.player.cumQ(); },
    // "biggesttitsize": function (): any { return kGAMECLASS.player.biggestTitSize(); },
    "milkquantity": function (): any { return kGAMECLASS.player.lactationQ(); },
    "hasvagina": function (): any { return kGAMECLASS.player.hasVagina(); },
    "istaur": function (): any { return kGAMECLASS.player.isTaur(); },
    "isnaga": function (): any { return kGAMECLASS.player.isNaga(); },
    "isgoo": function (): any { return kGAMECLASS.player.isGoo(); },
    "isbiped": function (): any { return kGAMECLASS.player.isBiped(); },
    "hasbreasts": function (): any { return (kGAMECLASS.player.biggestTitSize() >= 1); },
    "hasballs": function (): any { return (kGAMECLASS.player.balls > 0); },
    "hascock": function (): any { return kGAMECLASS.player.hasCock(); },
    "isherm": function (): any { return (kGAMECLASS.player.gender == 3); },
    "cumnormal": function (): any { return (kGAMECLASS.player.cumQ() <= 150); },
    "cummedium": function (): any { return (kGAMECLASS.player.cumQ() > 150 && kGAMECLASS.player.cumQ() <= 350); },
    "cumhigh": function (): any { return (kGAMECLASS.player.cumQ() > 350 && kGAMECLASS.player.cumQ() <= 1000); },
    "cumveryhigh": function (): any { return (kGAMECLASS.player.cumQ() > 1000 && kGAMECLASS.player.cumQ() <= 2500); },
    "cumextreme": function (): any { return (kGAMECLASS.player.cumQ() > 2500); },
    "issquirter": function (): any { return (kGAMECLASS.player.wetness() >= 4); },
    "ispregnant": function (): any { return (kGAMECLASS.player.pregnancyIncubation > 0); },
    "isbuttpregnant": function (): any { return (kGAMECLASS.player.buttPregnancyIncubation > 0); },
    "hasnipplecunts": function (): any { return kGAMECLASS.player.hasFuckableNipples(); },
    "canfly": function (): any { return kGAMECLASS.player.canFly(); },
    "islactating": function (): any { return (kGAMECLASS.player.lactationQ() > 0); },
    "true": function (): any { return true; },
    "false": function (): any { return false; }
}
