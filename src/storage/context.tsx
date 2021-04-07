import React, { useState, useMemo, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { activitiesKey, activitiesDefault, Activities } from './activities';

interface StorageContextType {
  store: {
    [index: string]: any,
  };
  setStoreItem: (key: string, value: any) => void;
}

const storageDefault: StorageContextType = {
  store: {
    [activitiesKey]: activitiesDefault,
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
      const newStore = {
        [activitiesKey]: activities ? JSON.parse(activities) : activitiesDefault,
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
