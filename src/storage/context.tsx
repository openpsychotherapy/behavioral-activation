import React, { useState, useMemo, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { migrations, storeVersion } from 'storage/migration';
import {
  activitiesKey,
  activitiesDefault,
  calendarKey,
  calendarDefault,
  iconsKey,
  iconsDefault,
  peopleKey,
  peopleDefault,
  settingsKey,
  settingsDefault,
  valuesKey,
  valuesDefault,
  storeVersionKey,
} from './constants';

interface StorageContextType {
  store: {
    [index: string]: any,
  };
  setStoreItem: (key: string, value: any) => void;
}

const contextDefault: StorageContextType = {
  store: {
    [activitiesKey]: activitiesDefault,
    [calendarKey]: calendarDefault,
    [iconsKey]: iconsDefault,
    [peopleKey]: peopleDefault,
    [settingsKey]: settingsDefault,
    [valuesKey]: valuesDefault,
  },
  setStoreItem: (key: string, value: any) => {},
};

/**
 * The context where data is kept at runtime. All data in this context has
 * a duplicate in AsyncStorage which is loaded when creating the provider.
 *
 * @remarks
 * This context should not be used directly. Use the provided hooks
 * useActivities, usePeople and so on instead.
 */
export const StorageContext = createContext<StorageContextType>(contextDefault);

/**
 * A context provider which wraps StorageContext.Provider with additional
 * functionality.
 *
 * @remarks
 * It is undefined behaviour to have more than one of these in the application.
 *
 * @example
 * ```
 * // Wrap a component with the provider
 * import { Provider as StorageProvider } from 'storage/context';
 *
 * ...
 *
 * <StorageProvider>
 *   <RootNavigator />
 * </StorageProvider>
 * ```
 */
export const Provider = (props: any) => {
  const [store, setStore] = useState(contextDefault.store);

  /**
   * Inserts key-value pairs into both AsyncStorage and the store kept in the
   * context.
   *
   * @param key - The key in both AsyncStorage and the store to be updated
   * @param value - The object to set as the value
   */
  const setStoreItem = (key: string, value: any) => {
    AsyncStorage.setItem(key, JSON.stringify(value));
    setStore({ ...store, [key]: value });
  }

  useEffect(() => {
    (async () => {
      let version = parseInt(await AsyncStorage.getItem(storeVersionKey) ?? "0");
      while (version != storeVersion) {
        version = await migrations[version]()
        await AsyncStorage.setItem(storeVersionKey, version.toString());
      }

      const getFromStorage = async (key: string): Promise<any> => {
        return JSON.parse(await AsyncStorage.getItem(key) as string);
      }

      const newStore = {
        [activitiesKey]: await getFromStorage(activitiesKey),
        [calendarKey]: await getFromStorage(calendarKey),
        [iconsKey]: await getFromStorage(iconsKey),
        [peopleKey]: await getFromStorage(peopleKey),
        [settingsKey]: await getFromStorage(settingsKey),
        [valuesKey]: await getFromStorage(valuesKey),
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
