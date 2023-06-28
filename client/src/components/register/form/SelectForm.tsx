import { useState } from "react";

export interface OptionType {
  value: string;
  label: string;
}
export interface SelectFormType {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  options: OptionType[] | undefined;
  required: boolean;
  errorMessage: string;
}

export default function SelectForm({
  label,
  name,
  onChange,
  placeholder,
  options,
  required,
  errorMessage,
}: SelectFormType) {
  const [focus, setFocus] = useState<boolean>(false);
  const handleBlur = () => {
    setFocus(true);
  };
  return (
    <>
      <div className="inputContainer">
        <label>{label}</label>
        <select
          name={name}
          onChange={onChange}
          onBlur={handleBlur}
          required={required}
          data-focus={focus.toString()}
          className="input"
        >
          <option className="option" value="">
            {placeholder}
          </option>
          {options?.map((option: OptionType) => (
            <option className="option" key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="error-message">{errorMessage}</span>
      </div>
    </>
  );
}
