import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Icons = string[];
type ModifyIcons = {
  add: (p: string) => boolean;
  swap: (a: number, b: number) => boolean;
};

export const iconsKey: string = "icons";
export const iconsDefault: Icons = [
  "folder",
  "person",
];

/**
 * Hook returning a list of icons and functions to modify the list.
 *
 * @example
 * Get stored icons and print them:
 * ```
 * const [icons, modifyIcons] = Storage.useIcons();
 * console.log(icons);
 * ```
 *
 * @example
 * Swap two icons in the list:
 * ```
 * const [icons, modifyIcons] = Storage.useIcons();
 * modifyIcons.swap(0, 1);
 * ```
 */
export function useIcons(): [Icons, ModifyIcons] {
  const [icons, setIcons] = useState<Icons>([]);

  /**
   * Adds an icon to the list of icons and updates AsyncStorage.
   *
   * @param icon - The icon to be added to the list
   * @returns `true` if the icon was added, `false` otherwise
   */
  function add(p: string): boolean {
    if (!icons.includes(p)) {
      const newIcons = [...icons, p];
      AsyncStorage.setItem(iconsKey, JSON.stringify(newIcons))
        .then(() => setIcons(newIcons));
      return true;
    }
    return false;
  }

  /**
   * Swaps two icons in the list and updates AsyncStorage.
   *
   * @remark
   * Swapping the same index will return `false`.
   *
   * @param a - The index of the first icon
   * @param b - The index of the second icon
   * @returns `true` if the icons were swapped, `false` otherwise
   */
  function swap(a: number, b: number): boolean {
    if (a !== b && 0 <= a && a < icons.length && 0 <= b && b < icons.length) {
      let newIcons = [...icons];
      const temp = newIcons[a];
      newIcons[a] = newIcons[b];
      newIcons[b] = temp;
      AsyncStorage.setItem(iconsKey, JSON.stringify(newIcons))
        .then(() => setIcons(newIcons));
      return true;
    }
    return false;
  }

  const modifyIcons = {
    add: add,
    swap: swap,
  };

  useEffect(() => {
    AsyncStorage.getItem(iconsKey)
    .then(v => v === null ? iconsDefault : JSON.parse(v))
    .then(v => setIcons(v));
  }, []);

  return [icons, modifyIcons];
}
