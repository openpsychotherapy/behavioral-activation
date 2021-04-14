import React, { useContext } from 'react';
import { StorageContext } from './context';
import { isDate, isTime } from './utils';

import {
  CalendarEntry,
  Calendar,
  ModifyCalendar,
} from './types';

import {
  calendarKey,
  calendarDefault,
} from './constants';

/**
 * Compares two calendar entries and returns `true` if they are equal.
 *
 * @param a - The first calendar entry
 * @param b - The second calendar entry
 * @returns a === b
 */
const entryEq = (a: CalendarEntry, b: CalendarEntry): boolean => {
  return a.date === b.date
      && a.start === b.start
      && a.end === b.end
      && a.text === b.text
      && a.icon === b.icon
      && a.person === b.person;
}

/**
 * Hook returning the calendar and functions to modify the calendar.
 *
 * @example
 * ```
 * // Get the calendar and print it
 * const [calendar, modifyCalendar] = Storage.useCalendar();
 * // Prints a large object
 * console.log(calendar);
 * ```
 *
 * @example
 * ```
 * // Add an event to the calendar
 * const [calendar, modifyCalendar] = Storage.useCalendar();
 * modifyCalendar.add({
 *     date: "2021-03-12",
 *     start: "15:00",
 *     end: "16:00",
 *     text: "Game night",
 *     icon: "pawn",
 *     person: "Erik",
 * });
 * ```
 */
export const useCalendar = (): [Calendar, ModifyCalendar] => {
  const { store, setStoreItem } = useContext(StorageContext);
  const calendar: Calendar = store[calendarKey];

  /**
   * Adds an entry to the calendar and updates the store.
   *
   * @param entry - The entry to be added
   * @returns `true` if the entry was added, `false` otherwise
   */
  const add = (entry: CalendarEntry): boolean => {
    const isValidEntry = isDate(entry.date)
                       && isTime(entry.start)
                       && isTime(entry.end)
                       && !calendar.some(elem => entryEq(elem, entry));
    if (isValidEntry) {
      setStoreItem(calendarKey, [...calendar, entry]);
      return true;
    }
    return false;
  }

  const modifyCalendar: ModifyCalendar = {
    add: add,
  };

  return [calendar, modifyCalendar];
}
