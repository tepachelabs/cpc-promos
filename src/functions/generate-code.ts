export const generateCode = (min = 10000, max = 99999): string => {
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
};
