import { useCallback, useEffect, useRef } from 'react';

export function useDebounce(fn, delay = 300) {
  const ref = useRef<number>();

  useEffect(() => clearTimeout(ref.current));

  return useCallback(
    (...args) => {
      clearTimeout(ref.current);
      ref.current = window.setTimeout(fn, delay, ...args);
    },
    [fn, delay]
  );
}
