import { useState } from "react";

interface CheckboxType {
  label: string;
  type: string;
  name: string;
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  label,
  type,
  onChange,
  name,
  errorMessage,
}: CheckboxType) {
  const [focus, setFocus] = useState(false);

  const handleFocused = () => {
    setFocus(true);
  };
  return (
    <>
      <div className=" checkboxLabel">
        <input
          type={type}
          name={name}
          onChange={onChange}
          onBlur={handleFocused}
          data-focus={focus.toString()}
        />
        <label className="">{label}</label>
      </div>
    </>
  );
}
