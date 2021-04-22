import React, { useContext } from 'react';
import { StorageContext } from './context';

import {
  Icons,
  ModifyIcons,
} from './types';

import {
  iconsKey,
  iconsDefault,
} from './constants';

/**
 * Hook returning a list of icons and functions to modify the list.
 *
 * @example
 * ```
 * // Get stored icons and print them
 * const [icons, modifyIcons] = Storage.useIcons();
 * console.log(icons);
 * ```
 *
 * @example
 * ```
 * // Swap two icons in the list
 * const [icons, modifyIcons] = Storage.useIcons();
 * modifyIcons.swap(0, 1);
 * ```
 */
export const useIcons = (): [Icons, ModifyIcons] => {
  const { store, setStoreItem } = useContext(StorageContext);
  const icons: Icons = store[iconsKey];

  /**
   * Adds an icon to the list of icons and updates the store.
   *
   * @param icon - The icon to be added to the list
   * @returns `true` if the icon was added, `false` otherwise
   */
  const add = (icon: string): boolean => {
    if (!icons.includes(icon)) {
      setStoreItem(iconsKey, [...icons, icon]);
      return true;
    }
    return false;
  }

  /**
   * Swaps two icons in the list and updates the store.
   *
   * @remark
   * Swapping the same index will return `false`.
   *
   * @param i1 - The index of the first icon
   * @param i2 - The index of the second icon
   * @returns `true` if the icons were swapped, `false` otherwise
   */
  const swap = (i1: number, i2: number): boolean => {
    if (i1 !== i2 && 0 <= i1 && i1 < icons.length && 0 <= i2 && i2 < icons.length) {
      let newIcons = [...icons];
      const temp = newIcons[i1];
      newIcons[i1] = newIcons[i2];
      newIcons[i2] = temp;
      setStoreItem(iconsKey, newIcons);
      return true;
    }
    return false;
  }

  const modifyIcons: ModifyIcons = {
    add: add,
    swap: swap,
  };

  return [icons, modifyIcons];
}
