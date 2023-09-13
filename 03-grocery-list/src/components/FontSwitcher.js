import { useGetCssValue } from "./useGetCssValue";
import FontStyleSwitcher from "./FontStyleSwitcher";

const fonts = [
  { id: "ff3", name: "Poppins", property: "'Poppins', sans-serif" },
  { id: "ff1", name: "Lato", property: "'Lato', sans-serif" },
  { id: "ff2", name: "Mali", property: "'Mali', cursive" },
  { id: "ff4", name: "Raleway", property: "'Raleway', sans-serif" },
];

const FontSwitcher = () => {
  const [font, setFont] = useGetCssValue("--font-family");

  function handleFont(e) {
    setFont(e.target.value);
  }

  return (
    <div>
      <select value={font} onChange={handleFont}>
        {fonts.map((font) => (
          <option key={font.id} value={font.property}>
            {font.name}
          </option>
        ))}
      </select>
      <FontStyleSwitcher />
    </div>
  );
};

export default FontSwitcher;
