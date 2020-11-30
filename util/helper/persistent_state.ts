import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function usePersistentState(
  key: string,
  defaultValue: string,
): [string, (newValue: string) => void] {
  const [state, stateHandler] = useState(defaultValue);

  useEffect(() => {
    const getStateFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value != null) {
          stateHandler(value);
        }
      } catch {}
    };

    getStateFromStorage();
  }, [key]);

  const changeState = (newValue: string) => {
    AsyncStorage.setItem(key, newValue);
    stateHandler(newValue);
  };

  return [state, changeState];
}
