export const localStorageSetItem = ({ key, value }: { key: string; value: any }) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
