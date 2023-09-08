import { useState } from "react";

import Item from "./Item";

export default function PackingList({
  items,
  showAddNewItem,
  onDeleteItem,
  onToggleItem,
  onClearList,
  onShowAddNewItem,
}) {
  const [sortBy, setSortBy] = useState("input");

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

  return (
    <div className="list">
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
          <option value="quantity">Sort by quantity</option>
          <option value="unit">Sort by unit</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
        {!showAddNewItem && (
          <button onClick={onShowAddNewItem}>New Item</button>
        )}
      </div>
      <ul>
        {sortedItems.map((item, index) => (
          <Item
            key={`item-${index}`}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
}
