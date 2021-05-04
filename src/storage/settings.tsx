import React, { useContext } from 'react';
import { StorageContext } from './context';
import { LanguageName } from 'language';

import {
  Settings,
  ModifySettings,
} from './types';

import {
  settingsKey,
  settingsDefault
} from './constants';

/**
 * Hook returning the settings and functions to modify the settings.
 *
 * @example
 * ```
 * // Get stored settings and print them
 * const [settings, modifySettings] = Storage.useSettings();
 * console.log(settings);
 * ```
 *
 * @example
 * ```
 * // Turn on notifications
 * const [settings, modifySettings] = Storage.useSettings();
 * modifySettings.setNotifications(true);
 * ```
 */
export const useSettings = (): [Settings, ModifySettings] => {
  const { store, setStoreItem } = useContext(StorageContext);
  const settings: Settings = store[settingsKey];

  /**
   * Sets the notifications and updates the store.
   *
   * @param value - The value to set notifications to
   */
  const setNotifications = (value: boolean): void => {
    setStoreItem(settingsKey, { ...settings, notifications: value });
  }

  /**
   * Sets the language and updates the store.
   *
   * @param value - The two letter language code
   */
  const setLanguage = (value: LanguageName): void => {
      setStoreItem(settingsKey, { ...settings, language: value });
  }

  const modifySettings: ModifySettings = {
    setNotifications: setNotifications,
    setLanguage: setLanguage,
  };

  return [settings, modifySettings];
}
