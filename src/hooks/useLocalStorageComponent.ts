import { useState, useEffect } from "react";

export function useLocalStorageState(key: string, defaultValue: any) {
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      const cachedValue = localStorage.getItem(key);
      return cachedValue ? JSON.parse(cachedValue) : defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}
