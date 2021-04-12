import React, { useContext } from 'react';
import { StorageContext } from './context';

interface Settings {
  notifications: boolean;
  language: string;
}

interface ModifySettings {
  setNotifications: (value: boolean) => void;
  setLanguage: (value: string) => void;
}

export const settingsKey: string = "settings";
export const settingsDefault: Settings = {
  notifications: false,
  language: "sv",
};

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
  const setLanguage = (value: string): void => {
      setStoreItem(settingsKey, { ...settings, language: value });
  }

  const modifySettings: ModifySettings = {
    setNotifications: setNotifications,
    setLanguage: setLanguage,
  };

  return [settings, modifySettings];
}
