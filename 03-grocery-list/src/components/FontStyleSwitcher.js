import { useGetCssValue } from "./useGetCssValue";

const FontStyleSwitcher = () => {
  const [style, setStyle] = useGetCssValue("--font-style");

  function handleToggleFontStyle(e) {
    const style = e.target.value;

    setStyle(style === "normal" ? "italic" : "normal");
  }

  return (
    <input value={style} type="checkbox" onChange={handleToggleFontStyle} />
  );
};

export default FontStyleSwitcher;
