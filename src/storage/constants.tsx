import {
  Activities,
  Calendar,
  Icons,
  People,
  Settings,
  Values,
} from './types';

export const activitiesKey: string = 'activities';
export const activitiesDefault: Activities = [];

export const calendarKey: string = 'calendar';
export const calendarDefault: Calendar = [];

export const iconsKey: string = 'icons';
export const iconsDefault: Icons = [
  // Default front side
  'format-text',
  'bed-empty',
  'brush',
  'dumbbell',

  'food-fork-drink',
  'account-supervisor',
  'tree',
  'music',

  'run',
  'gamepad-variant',
  'chat',
  'car-hatchback',

  // More icons
  // Sports
  'basketball',
  'bowling',

  // Transport
  'bike',
  'bus',
  'airplane',
  'anchor',
  'walk',
  'tractor',
  'subway-variant',

  // Food and drinks
  'beer',
  'coffee',
  'glass-cocktail',
  'grill',
  'candycane',
  'cake-layered',

  // Activities
  'book-open-variant',
  'laptop',
  'monitor',
  'cellphone',
  'phone',
  'microphone',
  'speaker',
  'television-classic',
  'movie',
  'cards',

  // Work
  'desk-lamp',
  'file-document-edit',
  'email',
  'calendar-blank',
  'console-line',
  'presentation',
  'school',

  // WC
  'shower-head',
  'toilet',
  'washing-machine',

  // Tools
  'hammer',
  'axe',

  // Shopping
  'cart',
  'shopping',
  'briefcase',
  'shoe-heel',

  // Nature
  'cloud',
  'cactus',
  'flower',
  'fire',
  'compass',
  'map',
  'web',
  'bug',

  // Family
  'cat',
  'dog-side',
  'heart',
  'baby-buggy',

  // Services
  'hospital',

  // Home
  'key-variant',
  'home',
  'home-city',

  // People
  'human-female-female',
  'human-male-female',
  'human-female-girl',
  'human-male-boy',

  // Religion
  'islam',
  'judaism',
  'christianity',
  'buddhism',
  'hinduism'
];

export const peopleKey: string = 'people';
export const peopleDefault: People = [];

export const settingsKey: string = 'settings';
export const settingsDefault: Settings = {
  notifications: false,
  language: 'sv',
};

export const valuesKey: string = 'values';
export const valuesDefault: Values = {
  responsibilities: [],
  relations: [],
  enjoyment: [],
  health: [],
  work: [],
};
