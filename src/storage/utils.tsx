/**
 * Test whether a string is a date of the form YYYY-mm-dd.
 *
 * @param date - The string to be tested
 * @returns `true` if the date is of the form YYYY-mm-dd, `false` otherwise
 */
export const isDate = (date: string): boolean => {
  const dateRe = /^\d{4}-\d{2}-\d{2}$/;
  return dateRe.test(date);
}

/**
 * Test whether a string is a time of the form HH:MM.
 *
 * @param time - The string to be tested
 * @returns `true` if the time is of the form HH:MM, `false` otherwise
 */
export const isTime = (time: string): boolean => {
  const timeRe = /^\d{2}:\d{2}$/;
  return timeRe.test(time);
}
