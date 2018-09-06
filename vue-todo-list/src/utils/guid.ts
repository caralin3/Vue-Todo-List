export const uid = (length: number) =>
  Array.from(
    {length},
    () => String.fromCharCode(
      Math.floor(
        Math.random() * 26,
      ) + 97,
    ),
  ).join('');
