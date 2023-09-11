import { useEffect, useState } from "react";

import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import ClearModal from "./components/ClearModal";

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

  useEffect(() => {
    function widthHandler() {
      let width = window.innerWidth;

      setWindowWidth(width);
    }

    window.addEventListener("resize", widthHandler);

    return () => window.removeEventListener("resize", widthHandler);
  }, [windowWidth]);

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

  return (
    <div className="app">
      <Logo />
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
          {isClearList && (
            <ClearModal
              onClearList={handleClearList}
              setIsClearList={setIsClearList}
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
