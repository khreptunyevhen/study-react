import Settings from "./Settings";

export default function Logo() {
  return (
    <header>
      <div className="container">
        <h1>
          🍌 My Grocery Checklist ✅
          <Settings />
        </h1>
      </div>
    </header>
  );
}
