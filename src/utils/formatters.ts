export const normalizeZero = (value: number): number => {
  return value === 0 ? 0 : value;
};

export const getValueColorClass = (value: number): string => {
  if (value < 0) return "text-red-600";
  if (value > 0) return "text-gray-900";
  return "text-gray-900";
};
