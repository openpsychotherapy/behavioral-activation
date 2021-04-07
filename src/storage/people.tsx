import React, { useContext } from 'react';
import { StorageContext } from './context';

type People = string[];

interface ModifyPeople {
  add: (person: string) => boolean;
}

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
  const { store, setStoreItem } = useContext(StorageContext);
  const people: People = store[peopleKey];

  /**
   * Adds a person to the list of people and updates the store.
   *
   * @param person - The person to be added to the list
   * @returns `true` if the person was added, `false` otherwise
   */
  const add = (person: string): boolean => {
    if (!people.includes(person)) {
      setStoreItem(peopleKey, [...people, person]);
      return true;
    }
    return false;
  }

  const modifyPeople: ModifyPeople = {
    add: add,
  };

  return [people, modifyPeople];
}
