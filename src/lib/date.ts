const CENTURY_YEARS = 100;
const YEAR_END = 2;
const MONTH_END = 4;
const DAY_END = 6;

const createDate = (year: number, month: number, day: number): Date | null => {
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() + 1 !== month ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
};

export const readBirthDate = (
  id: string,
  currentDate = new Date()
): Date | null => {
  const shortYear = Number(id.slice(0, YEAR_END));
  const month = Number(id.slice(YEAR_END, MONTH_END));
  const day = Number(id.slice(MONTH_END, DAY_END));

  if (![shortYear, month, day].every(Number.isInteger)) {
    return null;
  }

  const currentYear = currentDate.getUTCFullYear();
  const currentCentury = currentYear - (currentYear % CENTURY_YEARS);
  const recentDate = createDate(currentCentury + shortYear, month, day);

  if (recentDate && recentDate <= currentDate) {
    return recentDate;
  }

  return createDate(currentCentury + shortYear - CENTURY_YEARS, month, day);
};
