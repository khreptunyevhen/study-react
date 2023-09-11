export default function Stats({ items, showAddNewItem }) {
  if (!items.length)
    return (
      <footer className="stats">
        <p>Start edding some products to your grocery list! 📃</p>
      </footer>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer
      style={{
        top: showAddNewItem ? "120px" : "0",
      }}
      className="stats"
    >
      <div className="container">
        {percentage === 100 ? (
          <p>You got everything! Ready to go! 🚗</p>
        ) : (
          <p>
            👜 You have <span>{numItems}</span>{" "}
            {numItems === 1 ? "product" : "products"} on your list, and you
            already bought <span>{numPacked}</span>{" "}
            {numItems === 1 ? "product" : "products"}{" "}
            <span>({percentage}%)</span>.
          </p>
        )}
      </div>
    </footer>
  );
}
