import React, { useContext } from 'react';
import { StorageContext } from './context';

import {
  People,
  ModifyPeople,
} from './types';

import {
  peopleKey,
  peopleDefault,
} from './constants';

/**
 * Hook returning a list of people and functions to modify the list.
 *
 * @example
 * ```
 * // Get stored people and print them
 * const [people, modifyPeople] = Storage.usePeople();
 * console.log(people);
 * ```
 *
 * @example
 * ```
 * // Add a new person to the list
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

  /**
   * Deletes a person from the list of people and updates the store.
   *
   * @param person - The person to be deleted from the list
   * @returns `true` if the person was deleted, `false` otherwise
   */
  const deletePerson = (person: string) : boolean=>{
    if (people.includes(person)){
      for (var i=0; i < people.length; i++){
        if (people[i] == person){
          people.splice(i, 1)
          setStoreItem(peopleKey, people)
          return true
        }

      }
      
    }return false
    
  }

  const modifyPeople: ModifyPeople = {
    add: add,
    deletePerson: deletePerson,
  };

  return [people, modifyPeople];
}
