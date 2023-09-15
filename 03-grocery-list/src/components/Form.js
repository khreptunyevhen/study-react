import { useState } from "react";
import CountSelect from "./CountSelect";
import UnitSelect from "./UnitSelect";

import { CgDanger } from "react-icons/cg";

const minDescriptionLength = 3;
const maxDescriptionLength = 15;

export default function Form({
  onAddItems,
  errors,
  setErrors,
  units,
  showAddNewItem,
  windowWidth,
}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState(units.at(0));

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) {
      setErrors((currErrors) => ({
        ...currErrors,
        error: "Product cannot be empty!",
      }));
      return;
    } else {
      setErrors({});
    }

    if (description.length < minDescriptionLength) {
      setErrors((currErrors) => ({
        ...currErrors,
        error: `Has to be at least ${minDescriptionLength} chars!`,
      }));
      return;
    } else if (description.length >= maxDescriptionLength) {
      setErrors((currErrors) => ({
        ...currErrors,
        error: `Has to be less than ${maxDescriptionLength} chars!`,
      }));
      return;
    } else {
      setErrors({});
    }

    const newItem = {
      description: description.trim(),
      quantity,
      unit,
      packed: false,
      id: Date.now(),
      img: "./shopping-bag.svg",
    };

    onAddItems(newItem);

    setUnit(units.at(0));
    setDescription("");
    setQuantity(1);
  }

  const topPosition = windowWidth <= 640 ? "-210px" : "-110px";

  return (
    <form
      style={{
        top: showAddNewItem ? "40px" : topPosition,
        opacity: showAddNewItem ? 1 : 0,
      }}
      className="add-form"
      onSubmit={handleSubmit}
    >
      <h3>What do you want to buy?</h3>
      <div className="actions">
        {errors.error && (
          <p className="errors">
            <CgDanger />
            <span>{errors.error}</span>
          </p>
        )}
        <input
          type="text"
          placeholder="Product..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <div className="actions-control">
          <CountSelect value={quantity} setValue={setQuantity} />
          <UnitSelect value={unit} setValue={setUnit} units={units} />
          <button className="control">Add</button>
        </div>
      </div>
    </form>
  );
}
