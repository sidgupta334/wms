import { useState } from 'react';

type StoredStateValue = string | boolean | number | object | null | undefined;

// Sync component state with local storage
// Handles non-string values and prevents re-fetching on re-render
const useLocalStorage = (key: string, defaultValue?: StoredStateValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(`wms-${key}`);
    if (storedValue === null) {
      return defaultValue;
    }
    try {
      // Non-string values
      return JSON.parse(storedValue);
    } catch (e) {
      // String values
      return storedValue;
    }
  });

  const setItemValue = (newValue: StoredStateValue) => {
    if (newValue === undefined || newValue === null) {
      localStorage.removeItem(`wms-${key}`);
    } else {
      const storedValue = typeof newValue !== 'string' ? JSON.stringify(newValue) : newValue;
      localStorage.setItem(`wms-${key}`, storedValue);
    }
    setValue(newValue);
  };

  return { value, setItemValue };
};

export default useLocalStorage;
