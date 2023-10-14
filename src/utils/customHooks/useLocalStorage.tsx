import { useEffect, useState } from 'react';

export function useLocalStorage(key: string, defaultValue: any, clearOnRefresh: boolean) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    if (clearOnRefresh) {
      localStorage.clear();
    }
  }, [key, value, clearOnRefresh]);

  return [value, setValue];
}