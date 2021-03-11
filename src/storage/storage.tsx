import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { peopleKey, peopleDefault, usePeople } from './people';
import { settingsKey, settingsDefault, useSettings } from './settings';

function insertIfNull(key: string, value: any) {
    AsyncStorage.getItem(key)
        .then(async v => {
            if (v === null) {
                await AsyncStorage.setItem(key, JSON.stringify(value))
            }
        })
        .catch(e => console.log(e));
}

export function initStorage() {
    insertIfNull(peopleKey, peopleDefault);
    insertIfNull(settingsKey, settingsDefault);
}

export function clearStorage() {
    AsyncStorage.clear();
}

export {
    usePeople,
    useSettings,
};
