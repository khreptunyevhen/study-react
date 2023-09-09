import { useState } from "react";
import CountSelect from "./CountSelect";
import UnitSelect from "./UnitSelect";

export default function Form({ onAddItems, errors, setErrors, units }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState(units.at(0));

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) {
      setErrors((currErrors) => ({
        ...currErrors,
        error: "Item cannot be empty!",
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
    };

    onAddItems(newItem);

    setUnit(units.at(0));
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want to buy? 💰</h3>
      {errors.error && <p>{errors.error}</p>}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <CountSelect value={quantity} setValue={setQuantity} />
      <UnitSelect value={unit} setValue={setUnit} units={units} />
      <button>Add</button>
    </form>
  );
}
