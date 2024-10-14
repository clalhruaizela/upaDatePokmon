export const convertToFeet = (decimeters: number): string => {
  const totalFeet = decimeters * 0.328084;
  const feet = Math.floor(totalFeet);
  const inches = Math.round((totalFeet - feet) * 12);
  return `${feet}' ${inches}"`;
};
