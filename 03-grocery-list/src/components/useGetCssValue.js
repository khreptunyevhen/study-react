import { useEffect, useState } from "react";

export function useGetCssValue(variable) {
  const [value, setValue] = useState();

  useEffect(() => {
    const initColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue(variable);

    setValue(initColor);
  }, [variable]);

  useEffect(() => {
    document.documentElement.style.setProperty(variable, value);
  }, [value, variable]);

  return [value, setValue];
}
