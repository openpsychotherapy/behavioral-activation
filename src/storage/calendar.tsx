import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CalendarEntry = {
    date: string;
    start: string;
    end: string;
    text: string;
    icon: string;
    person: string;
};
type Calendar = CalendarEntry[];
type ModifyCalendar = {
    add: (entry: CalendarEntry) => boolean;
};

export const calendarKey: string = "calendar";
export const calendarDefault: Calendar = [];

function entryEq(a: CalendarEntry, b: CalendarEntry) {
    return a.date === b.date
        && a.start === b.start
        && a.end === b.end
        && a.text === b.text
        && a.icon === b.icon
        && a.person === b.person;
}

export function useCalendar(): [Calendar, ModifyCalendar] {
    const [calendar, setCalendar] = useState<Calendar>(calendarDefault);

    function add(entry: CalendarEntry): boolean {
        if (!calendar.some(elem => entryEq(elem, entry))) {
            const newCalendar = [...calendar, entry];
            AsyncStorage.setItem(calendarKey, JSON.stringify(newCalendar))
                .then(() => setCalendar(newCalendar));
            return true;
        }
        return false;
    }

    const modifyCalendar = {
        add: add,
    };

    useEffect(() => {
        AsyncStorage.getItem(calendarKey)
            .then(v => v === null ? calendarDefault : JSON.parse(v))
            .then(v => setCalendar(v));
    }, []);

    return [calendar, modifyCalendar];
}
