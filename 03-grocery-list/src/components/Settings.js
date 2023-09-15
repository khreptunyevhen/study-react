import { useEffect, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { MdOutlineDarkMode } from "react-icons/md";
import { BiSun } from "react-icons/bi";
import ColorSwitcher from "./ColorSwitcher";
import FontSwitcher from "./FontSwitcher";
import { useLocalStorage } from "./useLocalStorage";

const Settings = ({ isItalic, setIsItalic }) => {
  const [showPanel, setShowPanel] = useState(false);
  const [theme, setTheme] = useState(() => {
    const receiveItems = window.localStorage.getItem("color-theme");

    if (receiveItems !== null) {
      return JSON.parse(receiveItems);
    } else {
      return "light";
    }
  });

  const visibleStyles = {
    visibility: showPanel ? "visible" : "hidden",
    transform: showPanel ? "scale(1)" : "scale(0)",
  };

  useEffect(() => {
    document.body.setAttribute("color-theme", theme);
  }, [theme]);

  useLocalStorage(theme, setTheme, "color-theme");

  function handleShowPanel() {
    setShowPanel((isShow) => !isShow);
  }

  function toggleThemeColor() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className="settings">
      <button onClick={handleShowPanel} className="edit-btn">
        <AiFillSetting />
      </button>
      <div
        style={visibleStyles}
        onClick={() => setShowPanel(false)}
        className="overlay overlay--less"
      >
        <div onClick={(e) => e.stopPropagation()} className="panel">
          <button onClick={toggleThemeColor} className="edit-btn">
            {theme === "light" ? <MdOutlineDarkMode /> : <BiSun />}
          </button>
          <ColorSwitcher />
          <FontSwitcher isItalic={isItalic} setIsItalic={setIsItalic} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
