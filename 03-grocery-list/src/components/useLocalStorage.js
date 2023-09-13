import { useEffect } from "react";

export function useLocalStorage(value, setValue, data) {
  useEffect(() => {
    const receiveItems = window.localStorage.getItem(data);

    if (receiveItems !== null) setValue(JSON.parse(receiveItems));
  }, [setValue, data]);

  useEffect(() => {
    window.localStorage.setItem(data, JSON.stringify(value));
  }, [value, data]);

  return [value, setValue];
}
