import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CalendarEntry = {
  date: string;
  start: string;
  end: string;
  text: string;
  icon: string;
  person: string;
};
type Calendar = CalendarEntry[];
type ModifyCalendar = {
  add: (entry: CalendarEntry) => boolean;
};

export const calendarKey: string = "calendar";
export const calendarDefault: Calendar = [];

/**
 * Compares two calendar entries and returns `true` if they are equal.
 *
 * @param a - The first calendar entry
 * @param b - The second calendar entry
 * @returns a === b
 */
function entryEq(a: CalendarEntry, b: CalendarEntry) {
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
 * Get the calendar and print it:
 * ```
 * const [calendar, modifyCalendar] = Storage.useCalendar();
 * // Prints a large object
 * console.log(calendar);
 * ```
 *
 * @example
 * Add an event to the calendar:
 * ```
 * const [calendar, modifyCalendar] = Storage.useCalendar();
 * modifyCalendar.add({
 *     date: "2021-03-12",
 *     start: "15.00",
 *     end: "16.00",
 *     text: "Game night",
 *     icon: "pawn",
 *     person: "Erik",
 * });
 * ```
 */
export function useCalendar(): [Calendar, ModifyCalendar] {
  const [calendar, setCalendar] = useState<Calendar>(calendarDefault);

  /**
   * Adds an entry to the calendar and updates AsyncStorage.
   *
   * @param entry - The entry to be added
   * @returns `true` if the entry was added, `false` otherwise
   */
  function add(entry: CalendarEntry): boolean {
    if (!calendar.some(elem => entryEq(elem, entry))) {
      const newCalendar = [...calendar, entry];
      AsyncStorage.setItem(calendarKey, JSON.stringify(newCalendar))
        .then(() => setCalendar(newCalendar));
      return true;
    }
    return false;
  }

  const modifyCalendar = {
    add: add,
  };

  useEffect(() => {
    AsyncStorage.getItem(calendarKey)
    .then(v => v === null ? calendarDefault : JSON.parse(v))
    .then(v => setCalendar(v));
  }, []);

  return [calendar, modifyCalendar];
}