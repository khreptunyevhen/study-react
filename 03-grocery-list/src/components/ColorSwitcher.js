import React, { useEffect, useState } from "react";

const colors = ["#5c148c", "#0003c7", "#bedb39", "#fa5b0f", "#ffe11a"];

function ColorSwitcher() {
  const [color, setColor] = useState();

  function handleColor(color) {
    setColor(color);
  }

  useEffect(() => {
    const initColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--primary-color");

    setColor(initColor);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", color);
  }, [color]);

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
