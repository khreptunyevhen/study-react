import { useLocalStorage } from "./useLocalStorage";

const FontStyleSwitcher = ({ isItalic, setIsItalic }) => {
  useLocalStorage(isItalic, setIsItalic, "font-style");

  function handleToggleFontStyle() {
    setIsItalic((isCurr) => !isCurr);
  }

  return (
    <div className="font-style">
      <label htmlFor="style">
        <span>Italic</span>
        <input
          id="style"
          value={isItalic}
          type="checkbox"
          onChange={handleToggleFontStyle}
          checked={isItalic ? true : false}
        />
      </label>
    </div>
  );
};

export default FontStyleSwitcher;
