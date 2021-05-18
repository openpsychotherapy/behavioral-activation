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
  /**
   * Initialize the store
   */
  async () => {
    const insertDefault = async (key: string, def: any) => {
      return AsyncStorage.setItem(key, JSON.stringify(def));
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
