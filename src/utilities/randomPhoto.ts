export const getRandomUrl = (): string => {
  const randomId = Math.floor(Math.random() * 2000);
  return `https://picsum.photos/id/${randomId}/300/300`;
};
