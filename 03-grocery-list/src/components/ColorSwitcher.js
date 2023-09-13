import React from "react";

const colors = ["orange", "green", "pink"];

function ColorSwitcher() {
  return (
    <ul className="color-switcher">
      {colors.map((color, index) => (
        <li
          className="color-switcher-item"
          key={`color-${index}`}
          style={{
            backgroundColor: color,
            height: "15px",
            width: "15px",
            borderRadius: "50%",
            cursor: "pointer",
            padding: "0px",
          }}
        ></li>
      ))}
    </ul>
  );
}

export default ColorSwitcher;
