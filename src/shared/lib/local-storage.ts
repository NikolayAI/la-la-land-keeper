interface IGetLocalStorageParams {
  key: string;
}

interface ISetLocalStorageParams {
  key: string;
  value: string;
}

export const getLocalStorage = ({ key }: IGetLocalStorageParams) =>
  JSON.parse(window.localStorage.getItem(key) ?? '');

export const setLocalStorage = ({ key, value }: ISetLocalStorageParams) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
