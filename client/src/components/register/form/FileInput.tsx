import { useState } from "react";
import "./form.scss";

interface FileInputProps {
  label: string;
  name: string;
  value: File | null;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FileInput = ({
  name,
  label,
  value,
  errorMessage,
  onChange,
  ...props
}: any) => {
  const [focused, setFocused] = useState(false);

  const handleFocused = () => {
    setFocused(true);
  };
  return (
    <>
      <div className="inputContainer test avatar">
        <label>{label}</label>
        <input
          {...props}
          type="file"
          name={name}
          onChange={onChange}
          onBlur={handleFocused}
          focused={focused.toString()}
          onFocus={() => (name === "confirmPassword" ? setFocused(true) : "")}
        />
        <span className="errorMessage">{errorMessage}</span>
      </div>
    </>
  );
};
export default FileInput;
