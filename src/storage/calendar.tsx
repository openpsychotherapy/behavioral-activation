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
 * Compares two calendar entries and returns if a comes after b.
 *
 * @param a - The first calendar entry
 * @param b - The second calendar entry
 * @returns a.date > b.date || (a.date == b.date && a.start > b.start)
 */
export const entryGt = (a: CalendarEntry, b: CalendarEntry): boolean => {
  return a.date > b.date || (a.date == b.date && a.start > b.start);
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
 *     date: '2021-03-12',
 *     start: '15:00',
 *     end: '16:00',
 *     text: 'Game night',
 *     icon: 'pawn',
 *     person: 'Erik',
 * });
 * ```
 */
export const useCalendar = (): [Calendar, ModifyCalendar] => {
  const { store, setStoreItem } = useContext(StorageContext);
  const calendar: Calendar = store[calendarKey];

  /**
   * Adds an entry to the specified calendar. The entry is inserted in
   * chronological order.
   *
   * @param entry - The entry to be added
   * @returns A new calendar with the entry added
   */
  const add = (calendar: Calendar, entry: CalendarEntry): Calendar => {
    const isValidEntry = isDate(entry.date)
                       && isTime(entry.start)
                       && isTime(entry.end)
                       && !calendar.some(elem => entryEq(elem, entry));
    if (isValidEntry) {
      const index = calendar.findIndex(elem => entryGt(elem, entry));
      let newCalendar = [];
      if (index === -1) {
        newCalendar = [...calendar, entry];
      } else {
        newCalendar = [
          ...calendar.slice(0, index),
          entry,
          ...calendar.slice(index)
        ];
      }
      return newCalendar;
    }
    return [...calendar];
  }

  /**
   * Removes an entry from the specified calendar.
   *
   * @param entry - The entry to be removed
   * @returns A new calendar with the entry removed
   */
  const remove = (calendar: Calendar, entry: CalendarEntry): Calendar => {
    const index = calendar.findIndex(elem => entryEq(elem, entry));
    if (index !== -1) {
      const newCalendar = [
        ...calendar.slice(0, index),
        ...calendar.slice(index + 1)
      ];
      return newCalendar;
    }
    return [...calendar];
  }

  const modifyCalendar: ModifyCalendar = {
    add: entry => setStoreItem(calendarKey, add(calendar, entry)),
    remove: entry => setStoreItem(calendarKey, remove(calendar, entry)),
    replace: (oldEntry, newEntry) =>
      setStoreItem(calendarKey, add(remove(calendar, oldEntry), newEntry)),
  };

  return [calendar, modifyCalendar];
}
