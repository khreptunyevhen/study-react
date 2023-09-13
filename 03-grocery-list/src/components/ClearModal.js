const ClearModal = ({ onClearList, setIsClearList }) => {
  return (
    <div onClick={() => setIsClearList(false)} className="overlay">
      <div onClick={(e) => e.stopPropagation()} className="clear">
        <h2>Are you sure you want to delete all products?</h2>
        <div className="buttons">
          <button
            className="control"
            onClick={() => {
              setIsClearList(false);
              onClearList();
            }}
          >
            Delete
          </button>
          <button className="control" onClick={() => setIsClearList(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearModal;
