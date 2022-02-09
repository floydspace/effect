import { Tuple } from "../../../collection/immutable/Tuple"
import { IllegalArgumentException } from "../../Cause"
import { Effect } from "../../Effect"
import { Decision } from "../Decision"
import type { Schedule } from "../definition"
import { Interval } from "../Interval"
import { makeWithState } from "./_internal/makeWithState"
import { beginningOfMinute, endOfMinute, nextMinute } from "./_internal/time"

/**
 * Cron-like schedule that recurs every specified `minute` of each hour. It
 * triggers at zero second of the minute. Producing a count of repeats: 0, 1,
 * 2.
 *
 * NOTE: `minute` parameter is validated lazily. Must be in range 0...59.
 *
 * @tsplus static ets/Schedule minuteOfHour
 */
export function minuteOfHour(
  minute: number
): Schedule.WithState<number, unknown, unknown, number> {
  return makeWithState(0, (now, _, state) => {
    if (!Number.isInteger(minute) || minute < 0 || 59 < minute) {
      return Effect.die(
        new IllegalArgumentException(
          `Invalid argument in: minuteOfHour(${minute}). Must be in range 0...59`
        )
      )
    }
    const min = nextMinute(now, minute)
    const start = Math.max(beginningOfMinute(min), now)
    const end = endOfMinute(min)
    const interval = Interval(start, end)
    return Effect.succeedNow(Tuple(state + 1, state, Decision.Continue(interval)))
  })
}
