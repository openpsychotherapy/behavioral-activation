import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ValuesEntry = {
  text: string;
  icon: string;
};
type ValuesTopic = {
  name: string;
  entries: ValuesEntry[];
};
type Values = {
  responsibilities: ValuesTopic[];
  relations: ValuesTopic[];
  enjoyment: ValuesTopic[];
  health: ValuesTopic[];
  work: ValuesTopic[];
  [index: string]: ValuesTopic[];
};
type ModifyValues = {
  addTopic: (category: string, topic: string) => boolean;
  addEntry: (category: string, topic: string, entry: ValuesEntry) => boolean;
};

export const valuesKey: string = "values";
export const valuesDefault: Values = {
  responsibilities: [],
  relations: [],
  enjoyment: [],
  health: [],
  work: [],
};

/**
 * Compares two value entries and returns `true` if they are equal.
 *
 * @param a - The first value entry
 * @param b - The second value entry
 * @returns a === b
 */
const entryEq = (a: ValuesEntry, b: ValuesEntry) => {
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
  const [values, setValues] = useState<Values>(valuesDefault);

  /**
   * Adds a topic to the values object and updates AsyncStorage.
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
        AsyncStorage.setItem(valuesKey, JSON.stringify(newValues))
          .then(() => setValues(newValues));
        return true;
      }
    }
    return false;
  }

  /**
   * Adds an entry to the values object and updates AsyncStorage.
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
        AsyncStorage.setItem(valuesKey, JSON.stringify(newValues))
          .then(() => setValues(newValues));
        return true;
      }
    }
    return false;
  }

  const modifyValues = {
    addTopic: addTopic,
    addEntry: addEntry,
  };

  useEffect(() => {
    AsyncStorage.getItem(valuesKey)
    .then(v => v === null ? valuesDefault : JSON.parse(v))
    .then(v => setValues(v));
  }, []);

  return [values, modifyValues];
}
