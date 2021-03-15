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
    [index: string]: ValuesTopic[];
};
type ModifyValues = {
    addTopic: (category: string, topic: string) => boolean;
    addEntry: (category: string, topic: string, entry: ValuesEntry) => boolean;
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
    const [values, setValues] = useState<Values>(valuesDefault);

    function addTopic(category: string, topic: string): boolean {
        if (values.hasOwnProperty(category)) {
            if (!values[category].some(t => t.name === topic)) {
                const newValues = JSON.parse(JSON.stringify(values));
                newValues[category].push({ name: topic, entries: [] });
                AsyncStorage.setItem(valuesKey, JSON.stringify(newValues))
                    .then(() => setValues(newValues));
                return true;
            }
        }
        return false;
    }

    function addEntry(category: string, topic: string, entry: ValuesEntry): boolean {
        if (values.hasOwnProperty(category)) {
            const index = values[category].findIndex(t => t.name === topic);
            if (index !== -1 && !values[category][index].entries.some(e => entryEq(entry, e))) {
                const newValues = JSON.parse(JSON.stringify(values));
                newValues[category][index].entries.push(entry);
                AsyncStorage.setItem(valuesKey, JSON.stringify(newValues))
                    .then(() => setValues(newValues));
                return true;
            }
        }
        return false;
    }

    const modifyValues = {
        addTopic: addTopic,
        addEntry: addEntry,
    };

    useEffect(() => {
        AsyncStorage.getItem(valuesKey)
            .then(v => v === null ? valuesDefault : JSON.parse(v))
            .then(v => setValues(v));
    }, []);

    return [values, modifyValues];
}
