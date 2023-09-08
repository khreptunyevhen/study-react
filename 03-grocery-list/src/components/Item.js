export default function Item({ item, onDeleteItem, onToggleItem }) {
  const capitalizeDescription =
    item.description.at(0).toUpperCase() +
    item.description.toLowerCase().slice(1);

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
    </li>
  );
}
