import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ActivitiesEntry = {
    text: string;
    icon: string;
    person: string;
    meaningful: number;
    entertaining: number;
};
type ActivitiesDay = {
    date: string;
    score: number | null;
    entries: (ActivitiesEntry | null)[];
};
type Activities = ActivitiesDay[];
type ModifyActivities = {
    add: (date: string, hour: number, entry: ActivitiesEntry) => boolean;
};

export const activitiesKey: string = "activities";
export const activitiesDefault: Activities = [];

export function useActivities(): [Activities, ModifyActivities] {
    const [activities, setActivities] = useState<Activities>(activitiesDefault);

    function _insertDay(date: string): Activities {
        const newActivities = JSON.parse(JSON.stringify(activities));
        if (!activities.some(a => a.date === date)) {
            newActivities.push({
                date: date,
                score: null,
                entries: [null, null, null, null, null, null,
                          null, null, null, null, null, null,
                          null, null, null, null, null, null,
                          null, null, null, null, null, null],
            });
        }
        return newActivities;
    }

    function add(date: string, hour: number, entry: ActivitiesEntry): boolean {
        if (0 <= hour && hour < 24) {
            const newActivities = _insertDay(date);
            const index = newActivities.findIndex(a => a.date === date);
            newActivities[index].entries[hour] = entry;
            AsyncStorage.setItem(activitiesKey, JSON.stringify(newActivities))
                .then(() => setActivities(newActivities));
            return true;
        }
        return false;
    }

    const modifyActivities = {
        add: add,
    };

    useEffect(() => {
        AsyncStorage.getItem(activitiesKey)
            .then(v => v === null ? activitiesDefault : JSON.parse(v))
            .then(v => setActivities(v));
    }, []);

    return [activities, modifyActivities];
}
