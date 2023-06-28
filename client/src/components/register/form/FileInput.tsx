import { useState } from "react";

interface FileInputProps {
  label: string;
  name: string;
  pattern: string;
  required: boolean;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function FileInput({
  label,
  name,
  pattern,
  required,

  errorMessage,
  onChange,
}: FileInputProps) {
  const [focus, setFocus] = useState<boolean>(false);
  const handleBlur = () => {
    setFocus(true);
  };
  return (
    <>
      <div className="inputContainer fileInput">
        <label>{label}</label>
        <input
          type="file"
          name={name}
          pattern={pattern}
          required={required}
          onChange={onChange}
          onBlur={handleBlur}
          data-focus={focus.toString()}
          className="input"
        />
        <span className="error-message">{errorMessage}</span>
      </div>
    </>
  );
}
