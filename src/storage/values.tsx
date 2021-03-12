import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ValuesEntry = {
    text: string;
    icon: string;
};
type ValuesTopic = {
    name: string;
    entries: ValuesEntry[];
};
type Values = {
    responsibilities: ValuesTopic[];
    relations: ValuesTopic[];
    enjoyment: ValuesTopic[];
    health: ValuesTopic[];
    work: ValuesTopic[];
};
type ModifyValues = {
    add: (entry: ValuesEntry) => boolean;
};

export const valuesKey: string = "values";
export const valuesDefault: Values = {
    responsibilities: [],
    relations: [],
    enjoyment: [],
    health: [],
    work: [],
};

function entryEq(a: ValuesEntry, b: ValuesEntry) {
    return a.text === b.text
        && a.icon === b.icon;
}

export function useValues(): [Values, ModifyValues] {
    const [calendar, setCalendar] = useState<Values>([]);

    function add(entry: ValuesEntry): boolean {
        if (!calendar.some(elem => entryEq(elem, entry))) {
            const newCalendar = [...calendar, entry];
            AsyncStorage.setItem(valuesKey, JSON.stringify(newCalendar))
                .then(() => setCalendar(newCalendar));
            return true;
        }
        return false;
    }

    const modifyCalendar = {
        add: add,
    };

    useEffect(() => {
        AsyncStorage.getItem(valuesKey)
            .then(v => v === null ? valuesDefault : JSON.parse(v))
            .then(v => setCalendar(v));
    } ,[]);

    return [calendar, modifyCalendar];
}
