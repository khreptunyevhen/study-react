import { useState } from "react";
import EditForm from "./EditForm";

export default function Item({
  item,
  items,
  setItems,
  onDeleteItem,
  onToggleItem,
}) {
  const [showEdit, setShowEdit] = useState(false);

  const capitalizeDescription =
    item.description.at(0).toUpperCase() +
    item.description.toLowerCase().slice(1);

  function handleShowEdit() {
    setShowEdit(true);
  }

  function handleCloseEdit() {
    setShowEdit(false);
  }

  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
        checked={item.packed ? true : false}
      />
      <span
        style={
          item.packed
            ? {
                textDecoration: "line-through",
              }
            : {}
        }
      >
        {item.quantity} {item.unit} {capitalizeDescription}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
      <button onClick={handleShowEdit}>🚫</button>
      {showEdit && (
        <EditForm
          item={item}
          items={items}
          setItems={setItems}
          onDeleteItem={onDeleteItem}
          onCloseEdit={handleCloseEdit}
        />
      )}
    </li>
  );
}
