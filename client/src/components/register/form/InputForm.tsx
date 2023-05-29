import { useState } from "react";
import "./form.scss";

const InputForm = ({
  name,
  label,
  onChange,
  errorMessage,
  type,
  ...inputProps
}: any) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFocused = () => {
    setFocused(true);
  };
  const handleShowPassword = (e: any) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = (e: any) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <>
      <div className="inputContainer test">
        <label>{label}</label>
        <input
          {...inputProps}
          type={`${
            name === "birthday"
              ? "date"
              : (name === "confirmPassword" && !showConfirmPassword) ||
                (name === "password" && !showPassword)
              ? "password"
              : "text"
          }`}
          name={name}
          onChange={onChange}
          onBlur={handleFocused}
          focused={focused.toString()}
          onFocus={() => (name === "confirmPassword" ? setFocused(true) : "")}
        />
        {name === "password" ? (
          <button className="showHideBtn" onClick={handleShowPassword}>
            {showPassword ? "Hide" : "Show"}
          </button>
        ) : null}
        {name === "confirmPassword" ? (
          <button className="showHideBtn" onClick={handleShowConfirmPassword}>
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        ) : null}
        <span className="errorMessage">{errorMessage}</span>
      </div>
    </>
  );
};
export default InputForm;
