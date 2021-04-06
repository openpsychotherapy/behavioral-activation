import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type People = string[];
type ModifyPeople = {
  add: (person: string) => boolean;
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
export const usePeople = (): [People, ModifyPeople] => {
  const [people, setPeople] = useState<People>(peopleDefault);

  /**
   * Adds a person to the list of people and updates AsyncStorage.
   *
   * @param person - The person to be added to the list
   * @returns `true` if the person was added, `false` otherwise
   */
  const add = (person: string): boolean => {
    if (!people.includes(person)) {
      const newPeople = [...people, person];
      AsyncStorage.setItem(peopleKey, JSON.stringify(newPeople))
        .then(() => setPeople(newPeople));
      return true;
    }
    return false;
  }

  const modifyPeople: ModifyPeople = {
    add: add,
  };

  useEffect(() => {
    AsyncStorage.getItem(peopleKey)
    .then(value => value === null ? peopleDefault : JSON.parse(value))
    .then(value => setPeople(value));
  }, []);

  return [people, modifyPeople];
}
