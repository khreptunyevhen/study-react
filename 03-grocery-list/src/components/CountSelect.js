const CountSelect = ({ value, setValue }) => {
  return (
    <select
      value={value}
      onChange={(event) => setValue(Number(event.target.value))}
    >
      {Array.from({ length: 10 }, (_, index) => index + 1).map((num, index) => (
        <option key={`num-${index}`} value={num}>
          {num}
        </option>
      ))}
    </select>
  );
};

export default CountSelect;
