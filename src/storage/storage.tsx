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
export function initStorage(): void {
}

/**
 * Removes all data stored locally.
 *
 * @remarks
 * This should ONLY(!!!) be used for debugging purposes.
 */
export function clearStorage(): void {
  AsyncStorage.clear();
}

export {
  usePeople,
  useSettings,
  useIcons,
  useCalendar,
  useValues,
  useActivities,
};
