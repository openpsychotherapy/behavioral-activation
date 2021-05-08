import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const storeVersion = 1;

export const migrations = [
  async () => {
    /**
     * Returns a value from AsyncStorage if it exists, def(ault) otherwise.
     *
     * @param key - The key of the desired value in AsyncStorage
     * @param def - The object to use if no value is found
     * @returns A value from AsyncStorage if it exists, def otherwise.
     */
    const insertDefault = async (key: string, def: any) => {
      await AsyncStorage.setItem(key, JSON.stringify(def));
    }
    await insertDefault(activitiesKey, activitiesDefault);
    await insertDefault(calendarKey, calendarDefault);
    await insertDefault(iconsKey, iconsDefault);
    await insertDefault(peopleKey, peopleDefault);
    await insertDefault(settingsKey, settingsDefault);
    await insertDefault(valuesKey, valuesDefault);

    return storeVersion
  },
];
