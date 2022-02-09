import type { Tuple } from "../../collection/immutable/Tuple"
import type { Effect } from "../Effect"
import type { Decision } from "./Decision"

export const ScheduleSym = Symbol.for("@effect-ts/system/io/Schedule")
export type ScheduleSym = typeof ScheduleSym

export const _Env = Symbol.for("@effect-ts/system/io/Schedule/_Env")
export type _Env = typeof _Env

export const _In = Symbol.for("@effect-ts/system/io/Schedule/_In")
export type _In = typeof _In

export const _Out = Symbol.for("@effect-ts/system/io/Schedule/_Out")
export type _Out = typeof _Out

export const _State = Symbol.for("@effect-ts/system/io/Schedule/_State")
export type _State = typeof _State

/**
 * A `Schedule<Env, In, Out>` defines a recurring schedule, which consumes
 * values of type `In`, and which returns values of type `Out`.
 *
 * Schedules are defined as a possibly infinite set of intervals spread out over
 * time. Each interval defines a window in which recurrence is possible.
 *
 * When schedules are used to repeat or retry effects, the starting boundary of
 * each interval produced by a schedule is used as the moment when the effect
 * will be executed again.
 *
 * Schedules compose in the following primary ways:
 *
 * - Union: performs the union of the intervals of two schedules
 * - Intersection: performs the intersection of the intervals of two schedules
 * - Sequence: concatenates the intervals of one schedule onto another
 *
 * In addition, schedule inputs and outputs can be transformed, filtered (to
 * terminate a schedule early in response to some input or output), and so
 * forth.
 *
 * A variety of other operators exist for transforming and combining schedules,
 * and the companion object for `Schedule` contains all common types of
 * schedules, both for performing retrying, as well as performing repetition.
 *
 * @tsplus type ets/Schedule
 */
export interface Schedule<Env, In, Out> {
  readonly [ScheduleSym]: ScheduleSym
  readonly [_Env]: (_: Env) => void
  readonly [_In]: (_: In) => void
  readonly [_Out]: () => Out
  readonly [_State]: unknown

  readonly _initial: this[_State]

  readonly _step: (
    _now: number,
    _in: In,
    _state: this[_State],
    _trace?: string
  ) => Effect<Env, never, Tuple<[this[_State], Out, Decision]>>
}

export declare namespace Schedule {
  /**
   * @tsplus type ets/ScheduleWithState
   */
  export interface WithState<State, Env, In, Out> extends Schedule<Env, In, Out> {
    readonly [_State]: State
  }
}

/**
 * @tsplus type ets/ScheduleOps
 */
export interface ScheduleOps {}
export const Schedule: ScheduleOps = {}
