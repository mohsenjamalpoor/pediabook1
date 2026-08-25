"use client";

import { useState } from "react";

/**
 * useResetOnChange(watchedValue, computeNextState)
 *
 * Returns [state, setState] like useState, but whenever `watchedValue`
 * changes between renders, `state` is recomputed via
 * `computeNextState(watchedValue, currentState)` *during render* rather
 * than in a useEffect — this is the pattern React's docs recommend for
 * "reset/sync state when a prop changes" to avoid an extra render pass
 * and the react-hooks/set-state-in-effect lint rule.
 * https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
 */
export function useResetOnChange(watchedValue, computeNextState) {
  const [prevWatched, setPrevWatched] = useState(watchedValue);
  const [state, setState] = useState(() => computeNextState(watchedValue, undefined));

  if (watchedValue !== prevWatched) {
    setPrevWatched(watchedValue);
    setState((current) => computeNextState(watchedValue, current));
  }

  return [state, setState];
}
