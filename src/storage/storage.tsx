import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const peopleKey = "people";
const peopleDefault = [];

function insertIfNull(key, value) {
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
}

export function clearStorage() {
    AsyncStorage.clear();
}

export function usePeople() {
    const [people, setPeople] = useState([]);
    const modifyPeople = {
        add: p => {
            if (!people.includes(p)) {
                const newPeople = [...people, p];
                AsyncStorage.setItem(peopleKey, JSON.stringify(newPeople))
                    .then(() => setPeople(newPeople));
                return true;
            }
            return false;
        },
    };

    useEffect(() => {
        AsyncStorage.getItem(peopleKey)
            .then(JSON.parse)
            .then(v => setPeople(v));
    } ,[]);

    return [people, modifyPeople];
}

function getValue(key: string, callback: (value: string) => void) {
    AsyncStorage.getItem(key)
    .then(v => v !== null ? callback(v) : undefined);
}

function useCounter(): [number, () => void] {
    const [counter, setCounter] = React.useState(0);

    React.useEffect(() => {
        AsyncStorage.getItem("counter")
            .then(item => setCounter(Number(item)));
    }, []);

    const inc = () => {
        const newValue = counter + 1;
        AsyncStorage.setItem("counter", newValue.toString())
        .then(() => setCounter(newValue))
        .catch(err => console.log(err));
    }

    return [counter, inc];
}
