import React, { useContext } from 'react';
import { StorageContext } from './context';
import { isDate } from './utils';

import {
  ActivitiesEntry,
  ActivitiesDay,
  Activities,
  ModifyActivities,
} from './types';

import {
  activitiesKey,
  activitiesDefault,
} from './constants';

/**
 * Hook returning a object with recorded activities and functions to modify the
 * object.
 *
 * @example
 * ```
 * // Get stored activities and print them
 * const [activities, modifyActivities] = Storage.useActivities();
 * // Prints a large object
 * console.log(activities);
 * ```
 *
 * @example
 * ```
 * // Add a new activity
 * const [activities, modifyActivities] = Storage.useActivities();
 * modifyActivities.add("2021-03-15", 17, {
 *     text: "Went out walking",
 *     icon: "tree",
 *     person: "Erik",
 *     meaningful: 9,
 *     entertaining: 4,
 * });
 * ```
 */
export const useActivities = (): [Activities, ModifyActivities] => {
  const { store, setStoreItem } = useContext(StorageContext);
  const activities: Activities = store[activitiesKey];

  /**
   * Returns a copy of the activities object with specified date inserted.
   *
   * @remarks
   * A date will not be inserted if already present.
   *
   * @param date - The date to be inserted (YYYY-mm-dd)
   * @returns The activities object with specified date inserted
   */
  const _insertDay = (date: string): Activities => {
    const newActivities = [ ...activities ];
    if (!activities.some(a => a.date === date)) {
      newActivities.push({
        date: date,
        score: null,
        entries: [null, null, null, null, null, null,
                  null, null, null, null, null, null,
                  null, null, null, null, null, null,
                  null, null, null, null, null, null],
      });
    }
    return newActivities;
  }

  /**
   * Inserts an entry into the activities object and updates the store.
   *
   * @remarks
   * This function will add the date if not present.
   *
   * @param date - The date on which the entry will be inserted (YYYY-mm-dd)
   * @param hour - The hour on which the entry will be inserted [0, 23]
   * @param entry - The entry to be inserted
   * @returns `true` if the entry was inserted, `false` otherwise
   */
  const add = (date: string, hour: number, entry: ActivitiesEntry): boolean => {
    if (isDate(date) && 0 <= hour && hour < 24) {
      const newActivities = _insertDay(date);
      const index = newActivities.findIndex(a => a.date === date);
      newActivities[index].entries[hour] = entry;
      setStoreItem(activitiesKey, newActivities);
      return true;
    }
    return false;
  }

  const modifyActivities: ModifyActivities = {
    add: add,
  };

  return [activities, modifyActivities];
}
