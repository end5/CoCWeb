import { CombatActionFlags } from './CombatActionFlag';
import { CombatEffect } from './CombatEffect';
import { CombatEffectType } from './CombatEffectType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { Character } from '../Character/Character';
import { Blind } from './CombatEffects/Blind';
import { Disarmed } from './CombatEffects/Disarmed';
import { Heat } from './CombatEffects/Heat';
import { KissOfDeath } from './CombatEffects/KissOfDeath';
import { LustAura } from './CombatEffects/LustAura';
import { Poison } from './CombatEffects/Poison';
import { Rut } from './CombatEffects/Rut';
import { Stunned } from './CombatEffects/Stunned';
import { Might } from './CombatEffects/Might';
import { IEffectValues } from './EffectValues';

interface CombatEffectConstructor {
    new(type: CombatEffectType,
        inabilityFlag: CombatActionFlags,
        inflictedBy: Character,
        values?: IEffectValues
    ): CombatEffect;
}
export const CombatEffectConstructorLib = new Dictionary<CombatEffectType, CombatEffectConstructor>();
CombatEffectConstructorLib.set(CombatEffectType.Blind, Blind);
CombatEffectConstructorLib.set(CombatEffectType.Disarmed, Disarmed);
CombatEffectConstructorLib.set(CombatEffectType.Heat, Heat);
CombatEffectConstructorLib.set(CombatEffectType.KissOfDeath, KissOfDeath);
CombatEffectConstructorLib.set(CombatEffectType.LustAura, LustAura);
CombatEffectConstructorLib.set(CombatEffectType.Might, Might);
CombatEffectConstructorLib.set(CombatEffectType.Poison, Poison);
CombatEffectConstructorLib.set(CombatEffectType.Rut, Rut);
CombatEffectConstructorLib.set(CombatEffectType.Stunned, Stunned);

export const AbilityFlagsLib = new Dictionary<CombatEffectType, CombatActionFlags>();
AbilityFlagsLib.set(CombatEffectType.IsabellaStunned, CombatActionFlags.Attack);
AbilityFlagsLib.set(CombatEffectType.Stunned, CombatActionFlags.Attack);
AbilityFlagsLib.set(CombatEffectType.Whispered, CombatActionFlags.Attack);
AbilityFlagsLib.set(CombatEffectType.Confusion, CombatActionFlags.Attack);
AbilityFlagsLib.set(CombatEffectType.HarpyBind, CombatActionFlags.Attack | CombatActionFlags.Wait);
AbilityFlagsLib.set(CombatEffectType.GooBind, CombatActionFlags.Attack | CombatActionFlags.Wait);
AbilityFlagsLib.set(CombatEffectType.TentacleBind, CombatActionFlags.Attack | CombatActionFlags.Wait);
AbilityFlagsLib.set(CombatEffectType.NagaBind, CombatActionFlags.Attack | CombatActionFlags.Wait);
AbilityFlagsLib.set(CombatEffectType.QueenBind, CombatActionFlags.Attack | CombatActionFlags.Wait);
AbilityFlagsLib.set(CombatEffectType.PCTailTangle, CombatActionFlags.Attack | CombatActionFlags.Wait);
AbilityFlagsLib.set(CombatEffectType.HolliConstrict, CombatActionFlags.Attack | CombatActionFlags.Wait);
AbilityFlagsLib.set(CombatEffectType.GooArmorBind, CombatActionFlags.Attack | CombatActionFlags.Wait);
AbilityFlagsLib.set(CombatEffectType.Constricted, CombatActionFlags.Attack | CombatActionFlags.Tease | CombatActionFlags.MoveAway);
AbilityFlagsLib.set(CombatEffectType.Bound, CombatActionFlags.Attack | CombatActionFlags.Wait);
AbilityFlagsLib.set(CombatEffectType.MinotaurEntangled, CombatActionFlags.Attack | CombatActionFlags.Wait);
AbilityFlagsLib.set(CombatEffectType.UBERWEB, CombatActionFlags.Attack | CombatActionFlags.MagicSpec);
AbilityFlagsLib.set(CombatEffectType.Chokeslam, CombatActionFlags.Attack | CombatActionFlags.Wait);
AbilityFlagsLib.set(CombatEffectType.Titsmother, CombatActionFlags.Attack | CombatActionFlags.Wait);
AbilityFlagsLib.set(CombatEffectType.Tentagrappled, CombatActionFlags.Attack | CombatActionFlags.Wait);
