export const capitalizeWord = (str: string): string =>
  str.charAt(0).toLocaleUpperCase() + str.substring(1).toLocaleLowerCase();

export const unslugify = (str: string): string =>
  str
    .split('-')
    .map((word) => capitalizeWord(word))
    .join(' ');
