import { useState } from "react";
import EditForm from "./EditForm";

import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

export default function Item({
  item,
  units,
  items,
  setItems,
  onDeleteItem,
  onToggleItem,
  setShowAddNewItem,
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
    <li className={item.packed ? "active" : ""}>
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
                fontStyle: "italic",
              }
            : {}
        }
      >
        {item.quantity} {item.unit} {capitalizeDescription}
      </span>
      <div className="buttons">
        <button className="delete-btn" onClick={() => onDeleteItem(item.id)}>
          <MdDelete />
        </button>
        <button
          className="edit-btn"
          onClick={() => {
            setShowAddNewItem(false);
            handleShowEdit();
          }}
        >
          <AiFillEdit />
        </button>
      </div>
      <EditForm
        item={item}
        units={units}
        items={items}
        setItems={setItems}
        onDeleteItem={onDeleteItem}
        onCloseEdit={handleCloseEdit}
        showEdit={showEdit}
      />
    </li>
  );
}
