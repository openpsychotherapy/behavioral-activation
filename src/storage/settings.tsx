import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Settings = {
    notifications: boolean;
    language: string;
};
type ModifySettings = {
    setNotifications: (value: boolean) => void;
    setLanguage: (value: string) => void;
};

export const settingsKey: string = "settings";
export const settingsDefault: Settings = {
    notifications: false,
    language: "sv",
};

export function useSettings(): [Settings, ModifySettings] {
    const [settings, setSettings] = useState<Settings>(settingsDefault);

    function setNotifications(value: boolean): void {
        let newSettings = { ...settings, notifications: value };
        AsyncStorage.setItem(settingsKey, JSON.stringify(newSettings))
            .then(() => setSettings(newSettings));
    }

    function setLanguage(value: string): void {
        let newSettings = { ...settings, language: value };
        AsyncStorage.setItem(settingsKey, JSON.stringify(newSettings))
            .then(() => setSettings(newSettings));
    }

    const modifySettings = {
        setNotifications: setNotifications,
        setLanguage: setLanguage,
    };

    useEffect(() => {
        AsyncStorage.getItem(settingsKey)
            .then(v => JSON.parse(v as string))
            .then(v => setSettings(v));
    } ,[]);

    return [settings, modifySettings];
}
