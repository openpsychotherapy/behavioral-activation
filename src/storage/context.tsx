import React, { useState, useMemo, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      /**
       * Returns a value from AsyncStorage if it exists, def(ault) otherwise.
       *
       * @param key - The key of the desired value in AsyncStorage
       * @param def - The object to use if no value is found
       * @returns A value from AsyncStorage if it exists, def otherwise.
       */
      const getFromStorage = async (key: string, def: any): Promise<any> => {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : def;
      }
      const newStore = {
        [activitiesKey]: await getFromStorage(activitiesKey, activitiesDefault),
        [calendarKey]: await getFromStorage(calendarKey, calendarDefault),
        [iconsKey]: await getFromStorage(iconsKey, iconsDefault),
        [peopleKey]: await getFromStorage(peopleKey, peopleDefault),
        [settingsKey]: await getFromStorage(settingsKey, settingsDefault),
        [valuesKey]: await getFromStorage(valuesKey, valuesDefault),
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
