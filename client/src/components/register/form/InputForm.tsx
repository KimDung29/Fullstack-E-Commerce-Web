import React, { useState } from "react";

export interface InitialValueType {
  username: string;
  email: string;
  birthday: string;
  avatar: null;
  country: string;
  password: string;
  confirmPassword: string;
  isSeller: boolean;
}
interface InputType {
  label: string;
  name: string;
  type: string;
  pattern?: string | undefined;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> & {
      target: { name: keyof InitialValueType; value: string };
    }
  ) => void;
}

export default function InputForm({
  label,
  name,
  type,
  pattern,
  required,
  placeholder,
  errorMessage,
  onChange,
}: // onBlur,
InputType) {
  const [focus, setFocus] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleBlur = () => {
    setFocus(true);
  };
  const handleShowPassword = () => {
    setShowPassword((pre) => !pre);
  };
  return (
    <>
      <div className="inputContainer">
        <label>{label}</label>
        <div className="showHide">
          <input
            name={name}
            onChange={onChange}
            pattern={pattern}
            required={required}
            placeholder={placeholder}
            data-focus={focus.toString()}
            onBlur={handleBlur}
            type={
              type === "date"
                ? "date"
                : type === "email"
                ? "email"
                : type === "password" && !showPassword
                ? "password"
                : type === "password" && showPassword
                ? "text"
                : "text"
            }
            className={type === "password" ? "item1" : "input"}
            // onFocus={() => (name === "confirmPassword" ? setFocused(true) : "")}
          />
          {type === "password" ? (
            <div onClick={handleShowPassword} className="item2 btnShowHide">
              {" "}
              {showPassword ? "Hide" : "Show"}{" "}
            </div>
          ) : null}

          <span className="error-message item3">{errorMessage}</span>
        </div>
      </div>
    </>
  );
}
