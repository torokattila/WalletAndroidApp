export const splitPascalCase = (word: string): string => {
  const pattern = /($[a-z])|[A-Z][^A-Z]+/g;

  return word.match(pattern).join('_').toLocaleLowerCase();
};
