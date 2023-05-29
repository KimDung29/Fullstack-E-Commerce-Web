import { useFormik } from "formik";
import { useState } from "react";
import "./login.scss";
import * as Yup from "yup";
import Nav from "../nav/Nav";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          "Must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
        ),
    }),
    onSubmit: async (values) => {
      try {
        const res = await newRequest.post("/auth/login", {
          username: values.username,
          password: values.password,
        });

        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/");
      } catch (error: any) {
        // formik can not catch the error from backend
        setBackendError(error.response.data);
      }
    },
  });
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    formik;

  const handleShowPassword = (e: any) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Nav />
      <div className="loginContainer">
        <form onSubmit={handleSubmit} className="login-Form">
          <div className=" input-Form ">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              className={` input-Field ${
                touched.username && errors.username
                  ? " border-red"
                  : "border-gray"
              }`}
            />
            {touched.username && errors.username ? (
              <div className="errors">{errors.username}</div>
            ) : null}
          </div>

          <div className="input-Form">
            <label>Password</label>
            <div
              className={` inputValidation ${
                touched.password && errors.password
                  ? " border-red"
                  : "border-gray"
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="input-Field showp"
              />
              <button className="showBtn" onClick={handleShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {touched.password && errors.password ? (
              <div className="errors">{errors.password}</div>
            ) : null}

            {backendError !== "" ? (
              <div className="errors">{backendError}</div>
            ) : null}
          </div>

          <button type="submit" className="loginBtn">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
