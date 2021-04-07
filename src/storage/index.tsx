import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { usePeople } from './people';
import { useSettings } from './settings';
import { useIcons } from './icons';
import { useCalendar } from './calendar';
import { useValues } from './values';
import { useActivities } from './activities';

/**
 * May be used for initializing the database in the future.
 */
export const initStorage = (): void => {
}

/**
 * Removes all data stored locally.
 *
 * @remarks
 * This should ONLY(!!!) be used for debugging purposes.
 */
export const clearStorage = (): void => {
  AsyncStorage.clear();
}

const Storage = {
  usePeople,
  useSettings,
  useIcons,
  useCalendar,
  useValues,
  useActivities,
};

export default Storage;
