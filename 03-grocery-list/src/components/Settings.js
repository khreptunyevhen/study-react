import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { MdOutlineDarkMode } from "react-icons/md";
import ColorSwitcher from "./ColorSwitcher";

const Settings = () => {
  const [showPanel, setShowPanel] = useState(false);

  function handleShowPanel() {
    setShowPanel((isShow) => !isShow);
  }

  return (
    <div className="settings">
      <button onClick={handleShowPanel} className="edit-btn">
        <AiFillSetting />
      </button>
      {showPanel && (
        <div className="panel">
          <button className="edit-btn">
            <MdOutlineDarkMode />
          </button>
          <ColorSwitcher />
        </div>
      )}
    </div>
  );
};

export default Settings;
