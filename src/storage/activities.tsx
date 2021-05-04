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
 * Compares two activity days and returns if a comes after b.
 *
 * @param a - The first activity day
 * @param b - The second activity day
 * @returns a.date > b.date
 */
export const activityDayGt = (a: ActivitiesDay, b: ActivitiesDay): boolean => {
  return a.date > b.date;
}

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
 * modifyActivities.add('2021-03-15', 17, {
 *     text: 'Went out walking',
 *     icon: 'tree',
 *     person: 'Erik',
 *     importance: 9,
 *     enjoyment: 4,
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
    
    if (!activities.some(a => a.date === date)) {
      const newActivityDay = {
        date: date,
        score: null,
        entries: [null, null, null, null, null, null,
                  null, null, null, null, null, null,
                  null, null, null, null, null, null,
                  null, null, null, null, null, null],
      };

      const index = activities.findIndex(elem => activityDayGt(elem, newActivityDay));

      if (index === -1) {
        return [ ...activities, newActivityDay ];
      } else {
        return [
          ...activities.slice(0, index),
          newActivityDay,
          ...activities.slice(index)
        ];
      }
    }
    return [ ...activities ];
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
  };

  /**
   * Inserts multiple entries into the activities object and updates the store.
   *
   * @remarks
   * This function will add the date if not present.
   *
   * @param date - The date on which the entry will be inserted (YYYY-mm-dd)
   * @param startHour - The start hour on which the entries will be inserted [0, 22]
   * @param endHour - The end hour on which the entries will be inserted [1, 23]
   * @param entry - The entry to be inserted
   * @returns `true` if the entry was inserted, `false` otherwise
   */
  const addInterval = (date: string, startHour: number, endHour: number, entry: ActivitiesEntry): boolean => {
    if (isDate(date) && 0 <= startHour && startHour < endHour && endHour <= 24) {
      const newActivities = _insertDay(date);
      const index = newActivities.findIndex(a => a.date === date);
      for (let hour = startHour; hour < endHour; ++hour) {
        newActivities[index].entries[hour] = entry;
      }
      setStoreItem(activitiesKey, newActivities);
      return true;
    }
    return false;
  };

  /**
   * Modifies the score of a given date.
   *
   * @remarks
   * Requires date to exist.
   *
   * @param date - The date on which the entry will be inserted (YYYY-mm-dd)
   * @param score - The score of the day will be inserted [0-10]
   * @returns `true` if the entry was inserted, `false` otherwise
   */
  const setRating = (date: string, score: number): boolean => {
    if (isDate(date) && 0 <= score && score <= 10) {
      const newActivities = [ ...activities ];
      const index = newActivities.findIndex(a => a.date === date);
      if (index === -1) return false; // If date not found
      newActivities[index].score = score;
      setStoreItem(activitiesKey, newActivities);
      return true;
    }
    return false;
  };

  const modifyActivities: ModifyActivities = {
    add: add,
    addInterval: addInterval,
    setRating: setRating
  };

  return [activities, modifyActivities];
}
