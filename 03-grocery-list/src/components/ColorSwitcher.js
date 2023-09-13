import { useGetCssValue } from "./useGetCssValue";
import { useLocalStorage } from "./useLocalStorage";

const colors = ["#5c148c", "#0003c7", "#bedb39", "#fa5b0f", "#ffe11a"];

function ColorSwitcher() {
  const [color, setColor] = useGetCssValue("--primary-color");

  function handleColor(color) {
    setColor(color);
  }

  useLocalStorage(color, setColor, "color");

  return (
    <ul className="color-switcher">
      {colors.map((color, index) => (
        <li
          className="color-switcher-item"
          key={`color-${index}`}
          style={{
            backgroundColor: color,
          }}
          onClick={() => {
            handleColor(color);
          }}
        ></li>
      ))}
    </ul>
  );
}

export default ColorSwitcher;
