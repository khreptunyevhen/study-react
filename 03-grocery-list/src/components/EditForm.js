import { useState } from "react";
import CountSelect from "./CountSelect";
import UnitSelect from "./UnitSelect";
import { CgDanger } from "react-icons/cg";

const minDescriptionLength = 3;
const maxDescriptionLength = 15;

const EditForm = ({
  item,
  setItems,
  onDeleteItem,
  onCloseEdit,
  units,
  showEdit,
}) => {
  const [newDescription, setNewDescription] = useState(item.description);
  const [error, setError] = useState("");
  const [newQuantity, setNewQuantity] = useState(item.quantity);
  const [newUnit, setNewUnit] = useState(item.unit);

  const visibleStyles = {
    visibility: showEdit ? "visible" : "hidden",
    transform: showEdit ? "scale(1)" : "scale(0)",
  };

  const capitalizeDescription =
    newDescription?.at(0)?.toUpperCase() +
    newDescription?.toLowerCase().slice(1);

  function handleSubmitEditItem(e) {
    e.preventDefault();

    if (!newDescription) {
      setError(`Product cannot be empty!`);
      return;
    } else if (newDescription.length < minDescriptionLength) {
      setError(`Has to be at least ${minDescriptionLength} chars!`);
      return;
    } else if (newDescription.length >= maxDescriptionLength) {
      setError(`Has to be less than ${maxDescriptionLength} chars!`);
      return;
    } else {
      setError("");
    }

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
          {error.length > 0 && (
            <p className="errors">
              <CgDanger />
              <span>{error}</span>
            </p>
          )}
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
          <button type="button" className="control" onClick={onCloseEdit}>
            Cancel
          </button>
          <button
            className="control"
            type="button"
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
