export const isWithinRange = (date, start, end) => {
  const startDate = start;
  const endDate = end;
  return date >= startDate && date <= endDate;
};
