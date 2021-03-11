import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type People = string[];
type ModifyPeople = {
    add: (p: string) => boolean;
};

export const peopleKey: string = "people";
export const peopleDefault: People = [];

export function usePeople(): [People, ModifyPeople] {
    const [people, setPeople] = useState<People>([]);

    function add(p: string): boolean {
        if (!people.includes(p)) {
            const newPeople = [...people, p];
            AsyncStorage.setItem(peopleKey, JSON.stringify(newPeople))
                .then(() => setPeople(newPeople));
            return true;
        }
        return false;
    }

    const modifyPeople = {
        add: add,
    };

    useEffect(() => {
        AsyncStorage.getItem(peopleKey)
            .then(v => JSON.parse(v as string))
            .then(v => setPeople(v));
    } ,[]);

    return [people, modifyPeople];
}
