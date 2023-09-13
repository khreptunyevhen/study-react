import { useEffect, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { MdOutlineDarkMode } from "react-icons/md";
import { BiSun } from "react-icons/bi";
import ColorSwitcher from "./ColorSwitcher";
import FontSwitcher from "./FontSwitcher";

const Settings = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("color-theme", theme);
  }, [theme]);

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
      {showPanel && (
        <div className="panel">
          <button onClick={toggleThemeColor} className="edit-btn">
            {theme === "light" ? <MdOutlineDarkMode /> : <BiSun />}
          </button>
          <ColorSwitcher />
          <FontSwitcher />
        </div>
      )}
    </div>
  );
};

export default Settings;
