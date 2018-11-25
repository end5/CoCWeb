import { CombatEffect } from './CombatEffect';
import { CombatEffectType } from './CombatEffectType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { Character } from '../Character/Character';
import { ICombatEffectValues } from './CombatEffectValues';
import { Blind } from './CombatEffects/Blind';
import { Disarmed } from './CombatEffects/Disarmed';
import { Heat } from './CombatEffects/Heat';
import { KissOfDeath } from './CombatEffects/KissOfDeath';
import { LustAura } from './CombatEffects/LustAura';
import { Might } from './CombatEffects/Might';
import { Poison } from './CombatEffects/Poison';
import { Rut } from './CombatEffects/Rut';
import { Stunned } from './CombatEffects/Stunned';

interface CombatEffectConstructor {
    new(type: CombatEffectType,
        inflictedBy: Character,
        values?: ICombatEffectValues
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
