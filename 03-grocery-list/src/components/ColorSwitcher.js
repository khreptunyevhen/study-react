import { useGetCssValue } from "./useGetCssValue";

const colors = ["#5c148c", "#0003c7", "#bedb39", "#fa5b0f", "#ffe11a"];

function ColorSwitcher() {
  // const [color, setColor] = useState();
  const [color, setColor] = useGetCssValue("--primary-color");

  function handleColor(color) {
    setColor(color);
  }

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
