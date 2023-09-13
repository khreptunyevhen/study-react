import { useEffect, useState } from "react";

export function useGetCssValue(variable) {
  const [value, setValue] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(variable)
  );

  useEffect(() => {
    document.documentElement.style.setProperty(variable, value);
  }, [value, variable]);

  return [value, setValue];
}
