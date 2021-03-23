import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type People = string[];
type ModifyPeople = {
  add: (p: string) => boolean;
};

export const peopleKey: string = "people";
export const peopleDefault: People = [];

/**
 * Hook returning a list of people and functions to modify the list.
 *
 * @example
 * Get stored people and print them:
 * ```
 * const [people, modifyPeople] = Storage.usePeople();
 * console.log(people);
 * ```
 *
 * @example
 * Add a new person to the list:
 * ```
 * const [people, modifyPeople] = Storage.usePeople();
 * modifyPeople.add("Erik");
 * ```
 */
export function usePeople(): [People, ModifyPeople] {
  const [people, setPeople] = useState<People>(peopleDefault);

  /**
   * Adds a person to the list of people and updates AsyncStorage.
   *
   * @param person - The person to be added to the list
   * @returns `true` if the person was added, `false` otherwise
   */
  function add(person: string): boolean {
    if (!people.includes(person)) {
      const newPeople = [...people, person];
      AsyncStorage.setItem(peopleKey, JSON.stringify(newPeople))
        .then(() => setPeople(newPeople));
      return true;
    }
    return false;
  }

  const modifyPeople = {
    add: add,
  };

  useEffect(() => {
    AsyncStorage.getItem(peopleKey)
    .then(v => v === null ? peopleDefault : JSON.parse(v))
    .then(v => setPeople(v));
  }, []);

  return [people, modifyPeople];
}
