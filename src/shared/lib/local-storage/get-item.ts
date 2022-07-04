export const localStorageGetItem = ({ key }: { key: string }) => {
  try {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
