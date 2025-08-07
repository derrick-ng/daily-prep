export function convertDateToString(date: string[]) {
  const [year, month, day] = date

  return `${year}/${month}/${day}`
}
