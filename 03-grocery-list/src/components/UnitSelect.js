const UnitSelect = ({ value, setValue, units }) => {
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      {units.map((unit, index) => (
        <option key={`unit-${index}`} value={unit}>
          {unit}
        </option>
      ))}
    </select>
  );
};

export default UnitSelect;
