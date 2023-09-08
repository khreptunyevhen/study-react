import { useState } from "react";

const EditForm = ({ item, items, setItems, onDeleteItem, onCloseEdit }) => {
  const [newDescription, setNewDescription] = useState(item.description);

  function handleSubmitEditItem(e) {
    e.preventDefault();

    const newItem = { ...item, description: newDescription };

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
    </form>
  );
};

export default EditForm;
