import { useFormik } from "formik";
import { useState } from "react";
import "./login.scss";
import * as Yup from "yup";
import Nav from "../nav/Nav";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        const res = await newRequest.post("/auth/login", {
          username: values.username,
          password: values.password,
        });

        localStorage.setItem("currentUser", JSON.stringify(res.data));

        if (res.status === 200) {
          navigate("/");
        }
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
    setShowPassword((pre) => !pre);
  };

  return (
    <>
      <div className="loginContainer">
        <form onSubmit={handleSubmit} className="login-Form">
          <div className=" input-Form ">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
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
            <div className={` inputValidation`}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={`input-Field ${
                  touched.password && errors.password
                    ? " border-red"
                    : "border-gray"
                }`}
              />
              <div className="showHide" onClick={handleShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </div>

              {touched.password && errors.password ? (
                <div className="errors">{errors.password}</div>
              ) : null}

              {backendError !== "" ? (
                <div className="errors">{backendError}</div>
              ) : null}
            </div>
          </div>

          <button type="submit" className="loginBtn">
            {backendError !== "" ? "Login" : loading ? "Loading" : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
