import { useEffect, useState } from "react";

import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import ClearModal from "./components/ClearModal";
import Settings from "./components/Settings";

const myUnits = [
  "bag",
  "bottle",
  "box",
  "cup",
  "kg",
  "g",
  "ml",
  "l",
  "bunch",
  "small",
  "large",
  "pack",
  "jar",
  "can",
  "lbs",
  "am",
];

function App() {
  const sortedUnits = myUnits.sort();

  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAddNewItem, setShowAddNewItem] = useState(false);
  const [units] = useState(sortedUnits);
  const [isClearList, setIsClearList] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isItalic, setIsItalic] = useState(false);

  const topPosition = windowWidth <= 640 ? "206px" : "120px";

  function handleAddItem(item) {
    const capitalizeDescription =
      item.description.at(0).toUpperCase() +
      item.description.toLowerCase().slice(1);

    if (
      items.find(
        (currItem) =>
          currItem.description.toLowerCase() === item.description.toLowerCase()
      )
    ) {
      setErrors((currErrors) => ({
        ...currErrors,
        error: `${capitalizeDescription} already exist!`,
      }));
      return;
    } else {
      setErrors({});
    }

    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    if (isClearList) setItems([]);
  }

  function toggleShowAddNewItem() {
    setShowAddNewItem((isShow) => !isShow);
  }

  useEffect(() => {
    const receiveFont = window.localStorage.getItem("font-family");
    const receiveColor = window.localStorage.getItem("color");

    if (receiveColor !== null)
      document.documentElement.style.setProperty(
        "--primary-color",
        JSON.parse(receiveColor)
      );

    if (receiveColor === `""`)
      document.documentElement.style.setProperty("--primary-color", "#5c148c");

    if (receiveFont !== null)
      document.documentElement.style.setProperty(
        "--font-family",
        JSON.parse(receiveFont)
      );
  }, []);

  useEffect(() => {
    const receiveFontStyle = window.localStorage.getItem("font-style");

    const style = JSON.parse(receiveFontStyle) ? "italic" : "normal";

    document.documentElement.style.setProperty("--font-style", style);
  }, [isItalic]);

  useEffect(() => {
    function widthHandler() {
      let width = window.innerWidth;

      setWindowWidth(width);
    }

    window.addEventListener("resize", widthHandler);

    return () => window.removeEventListener("resize", widthHandler);
  }, [windowWidth]);

  return (
    <div className="app">
      <Logo isItalic={isItalic} setIsItalic={setIsItalic} />
      <div className="container">
        <main>
          <Form
            units={units}
            onAddItems={handleAddItem}
            showAddNewItem={showAddNewItem}
            errors={errors}
            setErrors={setErrors}
            windowWidth={windowWidth}
          />
          <PackingList
            units={units}
            items={items}
            setItems={setItems}
            showAddNewItem={showAddNewItem}
            onShowAddNewItem={toggleShowAddNewItem}
            onDeleteItem={handleDeleteItem}
            onToggleItem={handleToggleItem}
            setIsClearList={setIsClearList}
            windowWidth={windowWidth}
            setShowAddNewItem={setShowAddNewItem}
          />
          <ClearModal
            isClearList={isClearList}
            onClearList={handleClearList}
            setIsClearList={setIsClearList}
          />
          <Settings isItalic={isItalic} setIsItalic={setIsItalic} />
          {items.length === 0 && (
            <img
              className="empty-list"
              width={180}
              height={180}
              src={"./basket.svg"}
              alt="Empty list"
              style={{
                top: showAddNewItem ? topPosition : "0",
              }}
            />
          )}
        </main>
      </div>
      <Stats
        items={items}
        showAddNewItem={showAddNewItem}
        windowWidth={windowWidth}
      />
    </div>
  );
}

export default App;
