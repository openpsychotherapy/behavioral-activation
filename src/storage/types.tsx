import { LanguageName } from 'language';

// Activities
export interface ActivitiesEntry {
  text: string;
  icon: string;
  person: string;
  importance: number;
  enjoyment: number;
}

export interface ActivitiesDay {
  date: string;
  score: number | null;
  entries: (ActivitiesEntry | null)[];
}

export type Activities = ActivitiesDay[];

export interface ModifyActivities {
  add: (date: string, hour: number, entry: ActivitiesEntry) => boolean;
  addInterval: (date: string, startIndex: number, endIndex: number, entry: ActivitiesEntry) => void;
  removeInterval: (date: string, startIndex: number, endIndex: number) => void;
  setRating: (date: string, score: number) => boolean;
  moveInterval: (fromStartIndex: number, fromEndIndex: number, toStartIndex: number, toEndIndex: number, fromDay: string, toDay: string, entry: ActivitiesEntry) => void;
}

// Calendar
export interface CalendarEntry {
  date: string;
  start: string;
  end: string;
  text: string;
  icon: string;
  person: string;
  isRegistered: boolean;
}

export type Calendar = CalendarEntry[];

export interface ModifyCalendar {
  add: (entry: CalendarEntry) => void;
  remove: (entry: CalendarEntry) => void;
  replace: (oldEntry: CalendarEntry, newEntry: CalendarEntry) => void;
}

// Icons
export type Icons = string[];

export type ModifyIcons = {
  add: (icon: string) => boolean;
  swap: (i1: number, i2: number) => boolean;
};

// People
export type People = string[];

export interface ModifyPeople {
  add: (person: string) => boolean;
  deletePerson: (person: string) => boolean;
}

// Settings
export interface Settings {
  notifications: boolean;
  language: LanguageName;
}

export interface ModifySettings {
  setNotifications: (value: boolean) => void;
  setLanguage: (value: LanguageName) => void;
}

// Values
export interface ValuesEntry {
  text: string;
  icon: string;
}

export interface ValuesTopic {
  name: string;
  entries: ValuesEntry[];
}

export interface Values {
  responsibilities: ValuesTopic[];
  relations: ValuesTopic[];
  enjoyment: ValuesTopic[];
  health: ValuesTopic[];
  work: ValuesTopic[];
  [index: string]: ValuesTopic[];
}

export interface ModifyValues {
  addTopic: (category: string, topic: string) => boolean;
  addEntry: (category: string, topic: string, entry: ValuesEntry) => boolean;
  deleteTopic: (category: string, topic: string) => boolean;
  deleteEntry: (category: string, topic: string, entry: ValuesEntry) => boolean;
}
