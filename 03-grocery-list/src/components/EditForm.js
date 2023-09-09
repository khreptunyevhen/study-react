import { useState } from "react";
import CountSelect from "./CountSelect";
import UnitSelect from "./UnitSelect";

const EditForm = ({ item, setItems, onDeleteItem, onCloseEdit, units }) => {
  const [newDescription, setNewDescription] = useState(item.description);
  const [newQuantity, setNewQuantity] = useState(item.quantity);
  const [newUnit, setNewUnit] = useState(item.unit);

  function handleSubmitEditItem(e) {
    e.preventDefault();

    const newItem = {
      ...item,
      description: newDescription,
      quantity: newQuantity,
      unit: newUnit,
    };

    setItems((items) =>
      items.map((item) => (item.id === newItem.id ? newItem : item))
    );

    onCloseEdit();
  }

  return (
    <form onSubmit={handleSubmitEditItem}>
      <input
        type="text"
        defaultValue={item.description}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <CountSelect value={newQuantity} setValue={setNewQuantity} />
      <UnitSelect value={newUnit} setValue={setNewUnit} units={units} />
      <div className="edit-buttons">
        <button>Save</button>
        <button onClick={onCloseEdit}>Cancel</button>
        <button
          onClick={() => {
            onCloseEdit();
            onDeleteItem(item.id);
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default EditForm;
