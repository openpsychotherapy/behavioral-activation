/**
 * Returns the date in ISO format. Normal programming languages use something
 * like date.strftime("%Y-%m-%d").
 *
 * @returns A ISO-formatted date
 */
export const ISODate = (date: Date): string => {
  const year = date.getFullYear();
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

/**
 * Returns the time in ISO format. Normal programming languages use something
 * like date.strftime("%h:%M").
 *
 * @returns A ISO-formatted date
 */
export const ISOTime = (date: Date): string => {
  let hour = '' + date.getHours();
  let minute = '' + date.getMinutes();

  if (hour.length < 2) {
    hour = '0' + hour;
  }
  if (minute.length < 2) {
    minute = '0' + minute;
  }

  return hour + ':' + minute;
}
