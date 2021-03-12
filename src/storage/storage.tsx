import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { usePeople } from './people';
import { useSettings } from './settings';
import { useIcons } from './icons';
import { useCalendar } from './calendar';

export function initStorage() {
    // Nothing for now
}

export function clearStorage() {
    AsyncStorage.clear();
}

export {
    usePeople,
    useSettings,
    useIcons,
    useCalendar,
};
