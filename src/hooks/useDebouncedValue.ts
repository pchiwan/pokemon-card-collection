import { useEffect, useState } from "react";

export const useDebouncedValue = (inputValue: string, delayMs: number) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delayMs]);

  return debouncedValue;
};
