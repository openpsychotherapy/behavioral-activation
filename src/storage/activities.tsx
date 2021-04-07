import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isDate } from './utils';

type ActivitiesEntry = {
  text: string;
  icon: string;
  person: string;
  meaningful: number;
  entertaining: number;
};
type ActivitiesDay = {
  date: string;
  score: number | null;
  entries: (ActivitiesEntry | null)[];
};
type Activities = ActivitiesDay[];
type ModifyActivities = {
  add: (date: number, hour: number, entry: ActivitiesEntry) => boolean;
};

export const activitiesKey: string = "activities";
export const activitiesDefault: Activities = [];

/**
 * Hook returning a object with recorded activities and functions to modify the
 * object.
 *
 * @example
 * Get stored activities and print them:
 * ```
 * const [activities, modifyActivities] = Storage.useActivities();
 * // Prints a large object
 * console.log(activities);
 * ```
 *
 * @example
 * Add a new activity:
 * ```
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
  const [activities, setActivities] = useState<Activities>(activitiesDefault);

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
    const newActivities = JSON.parse(JSON.stringify(activities));
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
   * Inserts an entry into the activities object and updates AsyncStorage.
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
      AsyncStorage.setItem(activitiesKey, JSON.stringify(newActivities))
        .then(() => setActivities(newActivities));
      return true;
    }
    return false;
  }

  const modifyActivities: ModifyActivities = {
    add: add,
  };

  useEffect(() => {
    AsyncStorage.getItem(activitiesKey)
    .then(value => value === null ? activitiesDefault : JSON.parse(value))
    .then(value => setActivities(value));
  }, []);

  return [activities, modifyActivities];
}
