import { useState } from "react";
import CountSelect from "./CountSelect";
import UnitSelect from "./UnitSelect";

const EditForm = ({
  item,
  setItems,
  onDeleteItem,
  onCloseEdit,
  units,
  showEdit,
}) => {
  const [newDescription, setNewDescription] = useState(item.description);
  const [newQuantity, setNewQuantity] = useState(item.quantity);
  const [newUnit, setNewUnit] = useState(item.unit);

  const visibleStyles = {
    visibility: showEdit ? "visible" : "hidden",
    transform: showEdit ? "scale(1)" : "scale(0)",
  };

  const capitalizeDescription =
    newDescription.at(0).toUpperCase() + newDescription.toLowerCase().slice(1);

  function handleSubmitEditItem(e) {
    e.preventDefault();

    const newItem = {
      ...item,
      description: capitalizeDescription,
      quantity: newQuantity,
      unit: newUnit,
    };

    setItems((items) =>
      items.map((item) => (item.id === newItem.id ? newItem : item))
    );

    onCloseEdit();
  }

  return (
    <div onClick={onCloseEdit} className="overlay" style={visibleStyles}>
      <form
        className="edit-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmitEditItem}
      >
        <div className="edit-info">
          <input
            type="text"
            defaultValue={item.description}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <div className="selection">
            <CountSelect value={newQuantity} setValue={setNewQuantity} />
            <UnitSelect value={newUnit} setValue={setNewUnit} units={units} />
          </div>
        </div>
        <div className="edit-buttons">
          <button className="control">Save</button>
          <button className="control" onClick={onCloseEdit}>
            Cancel
          </button>
          <button
            className="control"
            onClick={() => {
              onCloseEdit();
              onDeleteItem(item.id);
            }}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
