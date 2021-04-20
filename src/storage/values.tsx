import React, { useContext } from 'react';
import { StorageContext } from './context';

import {
  ValuesEntry,
  ValuesTopic,
  Values,
  ModifyValues,
} from './types';

import {
  valuesKey,
  valuesDefault,
} from './constants';

/**
 * Compares two value entries and returns `true` if they are equal.
 *
 * @param a - The first value entry
 * @param b - The second value entry
 * @returns a === b
 */
const entryEq = (a: ValuesEntry, b: ValuesEntry): boolean => {
  return a.text === b.text
      && a.icon === b.icon;
}

/**
 * Hook returning the values object and functions to modify the object.
 *
 * @example
 * Get the values object and print it:
 * ```
 * const [values, modifyValues] = Storage.useValues();
 * // Prints a large object
 * console.log(values);
 * ```
 *
 * @example
 * Add a new value:
 * ```
 * const [values, modifyValues] = Storage.useValues();
 * modifyValues.addEntry("health", "working out", {
 *     icon: "pumpingiron", 
 *     text: "Go to gym",
 * });
 * ```
 */
export const useValues = (): [Values, ModifyValues] => {
  const { store, setStoreItem } = useContext(StorageContext);
  const values: Values = store[valuesKey];

  /**
   * Adds a topic to the values object and updates the store.
   *
   * @param category - The category where the topic should be added
   * @param topic - The name of the topic
   * @returns `true` if the topic was added, `false` otherwise
   */
  const addTopic = (category: string, topic: string): boolean => {
    if (values.hasOwnProperty(category)) {
      if (!values[category].some(t => t.name === topic)) {
        const newValues = JSON.parse(JSON.stringify(values));
        newValues[category].push({ name: topic, entries: [] });
        setStoreItem(valuesKey, newValues);
        return true;
      }
    }
    return false;
  }

  /**
   * Adds an entry to the values object and updates the store.
   *
   * @param category - The category where the topic should be added
   * @param topic - The topic in which the entry should be added
   * @returns `true` if the entry was added, `false` otherwise
   */
  const addEntry = (category: string, topic: string, entry: ValuesEntry): boolean => {
    if (values.hasOwnProperty(category)) {
      const index = values[category].findIndex(t => t.name === topic);
      if (index !== -1 && !values[category][index].entries.some(e => entryEq(entry, e))) {
        const newValues = JSON.parse(JSON.stringify(values));
        newValues[category][index].entries.push(entry);
        setStoreItem(valuesKey, newValues);
        return true;
      }
    }
    return false;
  }

  const modifyValues: ModifyValues = {
    addTopic: addTopic,
    addEntry: addEntry,
  };

  return [values, modifyValues];
}
