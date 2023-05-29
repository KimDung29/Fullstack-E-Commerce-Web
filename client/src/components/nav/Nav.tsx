import { NavLink, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./nav.scss";
import noUser from "../../assets/noUser.png";

export default function Nav() {
  const user = localStorage.getItem("currentUser");
  // const currentUser = user !== null ? JSON.parse(user) : "";
  let currentUser;

  if (user && user.trim() !== "") {
    try {
      currentUser = JSON.parse(user);
    } catch (error) {
      console.error("Error parsing currentUser from localStorage:", error);
      currentUser = null;
    }
  } else {
    currentUser = null;
  }

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", "");
      navigate("/");
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <div className="nav">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        {currentUser ? null : (
          <NavLink to="/register" className="nav-link">
            Register
          </NavLink>
        )}
        {currentUser ? null : (
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        )}

        {currentUser ? (
          !currentUser?.isSeller ? (
            <div className="login_done">
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
              <p className="username">{currentUser?.username}</p>

              <div className="loginSuccess">
                <div className="avatarImg">
                  <img src={currentUser?.avatar || noUser} alt="" />
                </div>
                <div className="order_logout">
                  <div>Order </div>
                  <div onClick={handleLogout}>Logout </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="login_done">
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
              <NavLink to="/add-product" className="nav-link">
                Add Products
              </NavLink>
              <p className="username">{currentUser?.username}</p>

              <div className="loginSuccess">
                <div className="avatarImg">
                  <img src={currentUser?.avatar || noUser} alt="" />
                </div>
                <div className="order_logout">
                  <div>Order </div>
                  <div onClick={handleLogout}>Logout </div>
                </div>
              </div>
            </div>
          )
        ) : null}
      </div>
    </>
  );
}
