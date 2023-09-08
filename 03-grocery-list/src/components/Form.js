import { useState } from "react";

const units = [
  "bag",
  "bottle",
  "box",
  "cup",
  "kg",
  "g",
  "ml",
  "l",
  "bunch",
  "small",
  "large",
  "pack",
  "jar",
  "can",
  "bag",
  "lbs",
  "amount",
];

const sortedUnits = units.sort();

export default function Form({ onAddItems, errors }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState(sortedUnits.at(0));

  function handleSubmit(event) {
    event.preventDefault();

    if (!description) return;

    const newItem = {
      description: description.trim(),
      quantity,
      unit,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItem);

    setUnit(sortedUnits.at(0));
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want to buy? 💰</h3>
      {errors.exist && <p>{errors.exist}</p>}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 10 }, (_, index) => index + 1).map(
          (num, index) => (
            <option key={`num-${index}`} value={num}>
              {num}
            </option>
          )
        )}
      </select>
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        {sortedUnits.map((unit, index) => (
          <option key={`unit-${index}`} value={unit}>
            {unit}
          </option>
        ))}
      </select>
      <button>Add</button>
    </form>
  );
}
