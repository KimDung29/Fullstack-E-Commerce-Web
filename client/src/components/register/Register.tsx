import { useState } from "react";
import InputForm from "./form/InputForm";
import "./form/form.scss";
import SelectForm from "./form/SelectForm";
import axios from "axios";
import newRequest from "../../utils/axiosInstance";
import FileInput from "./form/FileInput";
import Nav from "../nav/Nav";
import { useNavigate } from "react-router-dom";
import Checkbox from "./form/Checkbox";

const upload = async (file: any) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "ShoppingWeb");

  try {
    const res = await axios.post(import.meta.env.VITE_UPLOAD_LINK, data);
    const { url } = res.data;
    return url;
  } catch (err) {
    // console.log(err);
  }
};
export interface InitialValueType {
  username: string;
  email: string;
  birthday: string;
  avatar: File | null;
  country: string;
  password: string;
  confirmPassword: string;
  isSeller: boolean;
  [key: string]: any;
}
const initialValue = {
  username: "",
  email: "",
  birthday: "",
  avatar: null,
  country: "",
  password: "",
  confirmPassword: "",
  isSeller: false,
};

export default function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [values, setValues] = useState<InitialValueType>(initialValue);
  const [loading, setLoading] = useState(false);

  const inputs = [
    {
      id: 1,
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Enter your name",
      errorMessage:
        "Username should be 3-16 characters and should not includes any special characters.",
      required: true,
      pattern: "^[A-Za-z0-9]{3,16}$",
    },
    {
      id: 2,
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      errorMessage: "Email should be valid.",
      required: true,
      pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
    },
    {
      id: 3,
      label: "Birthday",
      name: "birthday",
      type: "date",
      placeholder: "",
      errorMessage: "Please choose your birthday.",
      required: true,
      pattern: "",
    },
    {
      id: 4,
      label: "Avatar",
      name: "avatar",
      type: "file",
      placeholder: "",
      errorMessage: "Choose your avatar",
      required: false,
      pattern: "",
    },
    {
      id: 5,
      label: "Country",
      name: "country",
      type: "select",
      placeholder: "Select your country",
      errorMessage: "Choose your country",
      required: true,
      options: [
        { value: "usa", label: "USA" },
        { value: "canada", label: "Canada" },
        { value: "uk", label: "UK" },
        { value: "australia", label: "Australia" },
      ],
      pattern: "",
    },
    {
      id: 6,
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      errorMessage:
        "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 characters",
      required: true,
      pattern: "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
    },
    {
      id: 7,
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Enter your confirm password",
      errorMessage: "It should be same with your password.",
      required: true,
      pattern: values.password,
    },
    {
      id: 8,
      type: "checkbox",
      name: "isSeller",
      label: "Are you a seller ?",
      placeholder: "",
      errorMessage: "",
      required: false,
      pattern: "",
    },
  ];

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement> & {
      target: { name: keyof InitialValueType; value: string };
    }
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectFile = e.target.files?.[0] || null;
    setFile(selectFile);
  };

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, isSeller: e.target.checked });
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...values,
        avatar: url,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="container">
        <div className="form_validate">
          <form onSubmit={onSubmit}>
            <h2>Register</h2>

            {inputs.map((input) =>
              input.type === "file" ? (
                <FileInput
                  key={input.id}
                  label={input.label}
                  name={input.name}
                  pattern={input.pattern}
                  required={input.required}
                  errorMessage={input.errorMessage}
                  onChange={onFileChange}
                />
              ) : input.type === "select" ? (
                <SelectForm
                  key={input.id}
                  label={input.label}
                  name={input.name}
                  placeholder={input.placeholder}
                  required={input.required}
                  options={input.options}
                  errorMessage={input.errorMessage}
                  onChange={onSelectChange}
                />
              ) : input.type === "checkbox" ? (
                <Checkbox
                  key={input.id}
                  label={input.label}
                  type={input.type}
                  name={input.name}
                  errorMessage={input.errorMessage}
                  onChange={onCheckboxChange}
                />
              ) : (
                <InputForm
                  key={input.id}
                  label={input.label}
                  name={input.name}
                  type={input.type}
                  placeholder={input.placeholder}
                  pattern={input.pattern}
                  required={input.required}
                  errorMessage={input.errorMessage}
                  onChange={onInputChange}
                />
              )
            )}

            <button className="submit" type="submit">
              {loading ? "Loading" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
