export default function Logo() {
  return (
    <header>
      <div className="container">
        <img
          width={48}
          height={48}
          src={"./ingredients.svg"}
          alt="Ingredients"
        />
        <h1>My Grocery Checklist</h1>
        <img
          width={48}
          height={48}
          src={"./cart-shopping-list.svg"}
          alt="Shopping list"
        />
      </div>
    </header>
  );
}
