import { Dictionary } from 'Engine/Utilities/Dictionary';
import { IEffectValues } from './EffectValues';
import { Effect } from './Effect';
import { EffectType } from './EffectType';
import { Blind } from './CombatEffects/Blind';
import { Disarmed } from './CombatEffects/Disarmed';
import { Heat } from './CombatEffects/Heat';
import { KissOfDeath } from './CombatEffects/KissOfDeath';
import { LustAura } from './CombatEffects/LustAura';
import { Poison } from './CombatEffects/Poison';
import { Rut } from './CombatEffects/Rut';
import { Stunned } from './CombatEffects/Stunned';

interface EffectConstructor {
    new(type: string, values?: IEffectValues): Effect;
}
export const EffectConstructorLib = new Dictionary<string, EffectConstructor>();

EffectConstructorLib.set(EffectType.Blind, Blind);
EffectConstructorLib.set(EffectType.Disarmed, Disarmed);
EffectConstructorLib.set(EffectType.Heat, Heat);
EffectConstructorLib.set(EffectType.KissOfDeath, KissOfDeath);
EffectConstructorLib.set(EffectType.LustAura, LustAura);
EffectConstructorLib.set(EffectType.Poison, Poison);
EffectConstructorLib.set(EffectType.Rut, Rut);
EffectConstructorLib.set(EffectType.Stunned, Stunned);
/*
export const AbilityFlagsLib = new Dictionary<CombatEffectType, CombatActionType>();
AbilityFlagsLib.set(CombatEffectType.IsabellaStunned, CombatActionType.Attack);
AbilityFlagsLib.set(CombatEffectType.Stunned, CombatActionType.Attack);
AbilityFlagsLib.set(CombatEffectType.Whispered, CombatActionType.Attack);
AbilityFlagsLib.set(CombatEffectType.Confusion, CombatActionType.Attack);
AbilityFlagsLib.set(CombatEffectType.HarpyBind, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.GooBind, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.TentacleBind, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.NagaBind, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.QueenBind, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.PCTailTangle, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.HolliConstrict, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.GooArmorBind, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.Constricted, CombatActionType.Attack | CombatActionType.Tease | CombatActionType.MoveAway);
AbilityFlagsLib.set(CombatEffectType.Bound, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.MinotaurEntangled, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.UBERWEB, CombatActionType.Attack | CombatActionType.MagicSpec);
AbilityFlagsLib.set(CombatEffectType.Chokeslam, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.Titsmother, CombatActionType.Attack | CombatActionType.Wait);
AbilityFlagsLib.set(CombatEffectType.Tentagrappled, CombatActionType.Attack | CombatActionType.Wait);
*/
