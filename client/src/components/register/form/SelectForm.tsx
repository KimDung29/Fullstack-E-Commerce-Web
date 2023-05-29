import { useState } from "react";
import "./form.scss";

const SelectForm = ({
  label,
  name,
  onChange,
  errormessage,
  placeholder,
  options,
  ...inputProps
}: any) => {
  const [selected, setSelected] = useState(false);

  const handleFocused = () => {
    setSelected(true);
  };
  return (
    <>
      <div className="inputContainer">
        <label>{label}</label>
        <select
          {...inputProps}
          name={name}
          onChange={onChange}
          onBlur={handleFocused}
          focused={selected.toString()}
        >
          <option value="">{placeholder}</option>
          {options?.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="errorMessage">{errormessage}</span>
      </div>
    </>
  );
};

export default SelectForm;
