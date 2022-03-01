export const arrayFrom0To18 = Array.from({ length: 19 }, (_, index) => index);
export const arrayFrom1To19 = Array.from(
  { length: 19 },
  (_, index) => index + 1
);

export function newArray(array) {
  return JSON.parse(JSON.stringify(array));
}
