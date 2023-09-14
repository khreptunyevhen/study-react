import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

import Item from "./Item";

export default function PackingList({
  items,
  units,
  setItems,
  showAddNewItem,
  onDeleteItem,
  onToggleItem,
  setIsClearList,
  onShowAddNewItem,
  windowWidth,
  setShowAddNewItem,
}) {
  const [sortBy, setSortBy] = useState("input");

  useLocalStorage(sortBy, setSortBy, "sort-type");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  if (sortBy === "quantity")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.quantity) - Number(b.quantity));

  if (sortBy === "unit")
    sortedItems = items.slice().sort((a, b) => a.unit.localeCompare(b.unit));

  useLocalStorage(sortedItems, setItems, "list");

  const topPosition = windowWidth <= 640 ? "206px" : "120px";

  return (
    <div
      style={{
        top: showAddNewItem ? topPosition : "0",
      }}
      className="list"
    >
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
          <option value="quantity">Sort by quantity</option>
          <option value="unit">Sort by unit</option>
        </select>
        <div className="actions-control">
          <button className="control" onClick={() => setIsClearList(true)}>
            Clear list
          </button>
          <button className="control" onClick={onShowAddNewItem}>
            {showAddNewItem ? "Done" : "New Item"}
          </button>
        </div>
      </div>
      <ul>
        {sortedItems.map((item, index) => (
          <Item
            key={`item-${index}`}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            item={item}
            items={items}
            units={units}
            setItems={setItems}
            setShowAddNewItem={setShowAddNewItem}
          />
        ))}
      </ul>
    </div>
  );
}
