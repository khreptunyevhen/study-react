const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Add friend</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

export default App;

function FriendsList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend, index) => (
        <Friend key={`friend-${index}${friend.id}`} friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && (
        <p>You and your friend {friend.name} are even</p>
      )}
      <Button>Select</Button>
    </li>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label htmlFor="name">👩🏼‍🤝‍🧑🏼 Friend name</label>
      <input id="name" type="text" />

      <label htmlFor="image">📷 Image URL</label>
      <input id="image" type="text" />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label htmlFor="money">💰 Bill money</label>
      <input id="money" type="text" />

      <label htmlFor="your-expense">🤗 Your expense</label>
      <input id="your-expense" type="text" />

      <label htmlFor="friend-expense">😏 X's expense</label>
      <input id="friend-expense" type="text" disabled />

      <label htmlFor="select">🤑 Who is paying the bill?</label>
      <select id="select">
        <option value="you">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
