import { useState, useEffect } from "react";
import EditForm from "./EditForm";

import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const KEY = "0e47f7bd22d04f10b6bd33a582126f5d";
// const KEY = "2f10251fb4964c52b310b7fc9ed2e501";
// const KEY = "8364ef4400ff41f5af7ee6ad1f192333";

export default function Item({
  item,
  units,
  items,
  setItems,
  onDeleteItem,
  onToggleItem,
  setShowAddNewItem,
}) {
  const [showEdit, setShowEdit] = useState(false);

  const capitalizeDescription =
    item.description.at(0).toUpperCase() +
    item.description.toLowerCase().slice(1);

  function handleShowEdit() {
    setShowEdit(true);
  }

  function handleCloseEdit() {
    setShowEdit(false);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function getImage() {
      try {
        const receiveData = await fetch(
          `https://api.spoonacular.com/food/ingredients/search?apiKey=${KEY}&query=${item.description.toLowerCase()}`,
          {
            signal: controller.signal,
          }
        );

        if (receiveData?.ok) {
          const data = await receiveData.json();

          const isNotImage =
            data.code === 402 ||
            data.code === 404 ||
            receiveData.status !== 200 ||
            !data?.results[0]?.image;

          const image = isNotImage
            ? "./shopping-bag.svg"
            : `https://spoonacular.com/cdn/ingredients_100x100/${data?.results[0]?.image}`;

          const newItem = {
            ...item,
            img: image,
          };

          const newItems = items.map((item) =>
            item.id === newItem.id ? newItem : item
          );

          console.log(receiveData?.status);

          setItems(newItems);
        } else {
          console.log(`HTTP Response Code: ${receiveData?.status}`);
          const newItem = {
            ...item,
            img: "./shopping-bag.svg",
          };

          const newItems = items.map((item) =>
            item.id === newItem.id ? newItem : item
          );

          setItems(newItems);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getImage();

    return function () {
      controller.abort();
    };
  }, [item.description]);

  return (
    <li className={item.packed ? "active" : ""}>
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
                fontStyle: "italic",
              }
            : {}
        }
      >
        {item.quantity} {item.unit} {capitalizeDescription}
      </span>
      <div className="img-block">
        <img
          src={item.packed ? "./bag-check.svg" : item.img}
          alt={item.description}
        />
      </div>
      <div className="buttons">
        <button className="delete-btn" onClick={() => onDeleteItem(item.id)}>
          <MdDelete />
        </button>
        <button
          className="edit-btn"
          onClick={() => {
            setShowAddNewItem(false);
            handleShowEdit();
          }}
        >
          <AiFillEdit />
        </button>
      </div>
      <EditForm
        item={item}
        units={units}
        items={items}
        setItems={setItems}
        onDeleteItem={onDeleteItem}
        onCloseEdit={handleCloseEdit}
        showEdit={showEdit}
      />
    </li>
  );
}
