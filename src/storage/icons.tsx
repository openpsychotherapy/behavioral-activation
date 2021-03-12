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

export function useIcons(): [Icons, ModifyIcons] {
    const [icons, setIcons] = useState<Icons>([]);

    function add(p: string): boolean {
        if (!icons.includes(p)) {
            const newIcons = [...icons, p];
            AsyncStorage.setItem(iconsKey, JSON.stringify(newIcons))
                .then(() => setIcons(newIcons));
            return true;
        }
        return false;
    }

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
    } ,[]);

    return [icons, modifyIcons];
}
