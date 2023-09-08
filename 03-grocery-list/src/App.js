import { useState } from "react";

import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

function App() {
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAddNewItem, setShowAddNewItem] = useState(false);

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
        error: `${capitalizeDescription} already exist! Please add another one!`,
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
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  function handleShowAddNewItem() {
    setShowAddNewItem(true);
  }

  return (
    <div className="app">
      <Logo />
      {showAddNewItem && (
        <Form
          onAddItems={handleAddItem}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      <PackingList
        items={items}
        showAddNewItem={showAddNewItem}
        onShowAddNewItem={handleShowAddNewItem}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
