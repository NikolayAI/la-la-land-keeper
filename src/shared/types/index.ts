export type KeyValueType<T> = {
  [K in keyof T]: { key: K, value: T[K] }
}[keyof T]