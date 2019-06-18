define(["require", "exports", "../GlobalFlags/kGAMECLASS"], function (require, exports, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //Calls are now made through kGAMECLASS rather than thisPtr. This allows the compiler to detect if/when a function is inaccessible.
    // Possible text arguments in the conditional of a if statement
    // First, there is an attempt to cast the argument to a Number. If that fails,
    // a dictionary lookup is performed to see if the argument is in the conditionalOptions[]
    // object. If that fails, we just fall back to returning 0
    exports.conditionalOptions = {
        "strength": function () { return kGAMECLASS_1.kGAMECLASS.player.str; },
        "toughness": function () { return kGAMECLASS_1.kGAMECLASS.player.tou; },
        "speed": function () { return kGAMECLASS_1.kGAMECLASS.player.spe; },
        "intelligence": function () { return kGAMECLASS_1.kGAMECLASS.player.inte; },
        "libido": function () { return kGAMECLASS_1.kGAMECLASS.player.lib; },
        "sensitivity": function () { return kGAMECLASS_1.kGAMECLASS.player.sens; },
        "corruption": function () { return kGAMECLASS_1.kGAMECLASS.player.cor; },
        "fatigue": function () { return kGAMECLASS_1.kGAMECLASS.player.fatigue; },
        "hp": function () { return kGAMECLASS_1.kGAMECLASS.player.HP; },
        "hour": function () { return kGAMECLASS_1.kGAMECLASS.model.time.hours; },
        "days": function () { return kGAMECLASS_1.kGAMECLASS.model.time.days; },
        "tallness": function () { return kGAMECLASS_1.kGAMECLASS.player.tallness; },
        "hairlength": function () { return kGAMECLASS_1.kGAMECLASS.player.hairLength; },
        "femininity": function () { return kGAMECLASS_1.kGAMECLASS.player.femininity; },
        "masculinity": function () { return 100 - kGAMECLASS_1.kGAMECLASS.player.femininity; },
        "cocks": function () { return kGAMECLASS_1.kGAMECLASS.player.cockTotal(); },
        "breastrows": function () { return kGAMECLASS_1.kGAMECLASS.player.bRows(); },
        "biggesttitsize": function () { return kGAMECLASS_1.kGAMECLASS.player.biggestTitSize(); },
        "vagcapacity": function () { return kGAMECLASS_1.kGAMECLASS.player.vaginalCapacity(); },
        "analcapacity": function () { return kGAMECLASS_1.kGAMECLASS.player.analCapacity(); },
        "balls": function () { return kGAMECLASS_1.kGAMECLASS.player.balls; },
        "cumquantity": function () { return kGAMECLASS_1.kGAMECLASS.player.cumQ(); },
        // "biggesttitsize": function (): any { return kGAMECLASS.player.biggestTitSize(); },
        "milkquantity": function () { return kGAMECLASS_1.kGAMECLASS.player.lactationQ(); },
        "hasvagina": function () { return kGAMECLASS_1.kGAMECLASS.player.hasVagina(); },
        "istaur": function () { return kGAMECLASS_1.kGAMECLASS.player.isTaur(); },
        "isnaga": function () { return kGAMECLASS_1.kGAMECLASS.player.isNaga(); },
        "isgoo": function () { return kGAMECLASS_1.kGAMECLASS.player.isGoo(); },
        "isbiped": function () { return kGAMECLASS_1.kGAMECLASS.player.isBiped(); },
        "hasbreasts": function () { return (kGAMECLASS_1.kGAMECLASS.player.biggestTitSize() >= 1); },
        "hasballs": function () { return (kGAMECLASS_1.kGAMECLASS.player.balls > 0); },
        "hascock": function () { return kGAMECLASS_1.kGAMECLASS.player.hasCock(); },
        "isherm": function () { return (kGAMECLASS_1.kGAMECLASS.player.gender == 3); },
        "cumnormal": function () { return (kGAMECLASS_1.kGAMECLASS.player.cumQ() <= 150); },
        "cummedium": function () { return (kGAMECLASS_1.kGAMECLASS.player.cumQ() > 150 && kGAMECLASS_1.kGAMECLASS.player.cumQ() <= 350); },
        "cumhigh": function () { return (kGAMECLASS_1.kGAMECLASS.player.cumQ() > 350 && kGAMECLASS_1.kGAMECLASS.player.cumQ() <= 1000); },
        "cumveryhigh": function () { return (kGAMECLASS_1.kGAMECLASS.player.cumQ() > 1000 && kGAMECLASS_1.kGAMECLASS.player.cumQ() <= 2500); },
        "cumextreme": function () { return (kGAMECLASS_1.kGAMECLASS.player.cumQ() > 2500); },
        "issquirter": function () { return (kGAMECLASS_1.kGAMECLASS.player.wetness() >= 4); },
        "ispregnant": function () { return (kGAMECLASS_1.kGAMECLASS.player.pregnancyIncubation > 0); },
        "isbuttpregnant": function () { return (kGAMECLASS_1.kGAMECLASS.player.buttPregnancyIncubation > 0); },
        "hasnipplecunts": function () { return kGAMECLASS_1.kGAMECLASS.player.hasFuckableNipples(); },
        "canfly": function () { return kGAMECLASS_1.kGAMECLASS.player.canFly(); },
        "islactating": function () { return (kGAMECLASS_1.kGAMECLASS.player.lactationQ() > 0); },
        "true": function () { return true; },
        "false": function () { return false; }
    };
});
//# sourceMappingURL=conditionalConverters.js.map