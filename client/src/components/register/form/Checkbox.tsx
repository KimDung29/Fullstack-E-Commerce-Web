import { useState } from "react";

const Checkbox = ({
  label,
  type,
  onChange,
  name,
  errorMessage,
  ...props
}: any) => {
  const [focused, setFocused] = useState(false);

  const handleFocused = () => {
    setFocused(true);
  };
  return (
    <>
      <div className="inputContainer checkbox">
        <input
          {...props}
          type={type}
          name={name}
          onChange={onChange}
          onBlur={handleFocused}
          focused={focused.toString()}
          onFocus={() => (name === "confirmPassword" ? setFocused(true) : "")}
        />
        <label>{label}</label>
        <span className="errorMessage">{errorMessage}</span>
      </div>
    </>
  );
};

export default Checkbox;
