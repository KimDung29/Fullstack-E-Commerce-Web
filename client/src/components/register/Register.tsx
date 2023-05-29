import { useState } from "react";
import InputForm from "./form/InputForm";
import "./form/form.scss";
import SelectForm from "./form/SelectForm";
import axios from "axios";
import newRequest from "../../utils/newRequest";
import FileInput from "./form/FileInput";
import Nav from "../nav/Nav";
import { useNavigate } from "react-router-dom";
import Checkbox from "./form/Checkbox";

interface ValueType {
  id: number;
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
const initialValue = {
  id: 0,
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
  const [file, setFile] = useState<File | null>(null);
  const [values, setValues] = useState<ValueType>(initialValue);

  const navigate = useNavigate();
  const inputs = [
    {
      id: 1,
      type: "text",
      name: "username",
      label: "Username",
      placeholder: "Enter your name",
      errorMessage:
        "Username should be 3-16 characters and should not includes any special characters.",
      required: true,
      pattern: "^[A-Za-z0-9]{3,16}$",
    },
    {
      id: 2,
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      errorMessage: "Email should be valid.",
      required: true,
    },
    {
      id: 3,
      type: "date",
      name: "birthday",
      label: "Birthday",
      errorMessage: "Please choose your birthday.",
      required: true,
    },
    {
      id: 4,
      type: "file",
      name: "avatar",
      label: "Avatar",
      errormessage: "Choose your avatar",
    },
    {
      id: 5,
      type: "select",
      name: "country",
      label: "Country",
      placeholder: "Select your country",
      errormessage: "Choose your country",
      required: true,
      options: [
        { value: "usa", label: "USA" },
        { value: "canada", label: "Canada" },
        { value: "uk", label: "UK" },
        { value: "australia", label: "Australia" },
      ],
    },
    {
      id: 6,
      type: "password",
      name: "password",
      label: "Password",
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
      required: false,
    },
  ];
  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement> & {
      target: { name: keyof ValueType; value: string };
    }
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, isSeller: e.target.checked });
  };
  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValues({ ...values, avatar: file });

    const url = await upload(file);
    // console.log(url);
    try {
      await newRequest.post("/auth/register", {
        ...values,
        avatar: url,
      });
      navigate("/login");
    } catch (err) {
      // console.log(err);
    }
  };
  return (
    <>
      <Nav />
      <div className="form_validate">
        <form onSubmit={onSubmit}>
          <h2>Register</h2>
          {inputs.map((input) =>
            input.type === "file" ? (
              <FileInput
                key={input.id}
                {...input}
                onChange={onFileChange}
                value={values[input.name]}
                name={input.name}
              />
            ) : input.type === "select" ? (
              <SelectForm
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onSelectChange}
                options={input.options}
                name={input.name}
              />
            ) : input.type === "checkbox" ? (
              <Checkbox
                key={input.id}
                {...input}
                onChange={onCheckboxChange}
                name={input.name}
              />
            ) : (
              <InputForm
                key={input.id}
                {...input}
                onChange={onInputChange}
                value={values[input.name]}
                name={input.name}
              />
            )
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
