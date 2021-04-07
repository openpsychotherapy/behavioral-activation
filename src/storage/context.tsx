import React, { useState, useMemo, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { activitiesKey, activitiesDefault } from './activities';
import { calendarKey, calendarDefault } from './calendar';
import { iconsKey, iconsDefault } from './icons';

interface StorageContextType {
  store: {
    [index: string]: any,
  };
  setStoreItem: (key: string, value: any) => void;
}

const storageDefault: StorageContextType = {
  store: {
    [activitiesKey]: activitiesDefault,
    [calendarKey]: calendarDefault,
    [iconsKey]: iconsDefault,
  },
  setStoreItem: (key: string, value: any) => {},
};

export const StorageContext = createContext<StorageContextType>(storageDefault);

export const Provider = (props: any) => {
  const [store, setStore] = useState(storageDefault.store);

  const setStoreItem = (key: string, value: any) => {
    AsyncStorage.setItem(key, JSON.stringify(value));
    setStore({ ...store, [key]: value });
  }

  // Load data from AsyncStorage
  useEffect(() => {
    (async () => {
      const activities = await AsyncStorage.getItem(activitiesKey);
      const calendar = await AsyncStorage.getItem(calendarKey);
      const icons = await AsyncStorage.getItem(iconsKey);
      const newStore = {
        [activitiesKey]: activities ? JSON.parse(activities) : activitiesDefault,
        [calendarKey]: calendar ? JSON.parse(calendar) : calendarDefault,
        [iconsKey]: icons ? JSON.parse(icons) : iconsDefault,
      };
      setStore(newStore);
    })()
  }, []);

  const value = useMemo(() => ({store, setStoreItem}), [store, setStoreItem]);

  return (
    <StorageContext.Provider value={value}>
      {props.children}
    </StorageContext.Provider>
  );
}
