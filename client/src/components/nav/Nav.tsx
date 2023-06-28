import { NavLink, useNavigate } from "react-router-dom";
import newRequest from "../../utils/axiosInstance";
import "./nav.scss";
import noUser from "../../assets/noUser.png";
import { useState } from "react";
import Search from "../../util/Search";
import React from "react";

export default function Nav() {
  const navigate = useNavigate();
  const [isDisplay, setIsDisplay] = useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  const user = localStorage.getItem("currentUser");
  const currentUser = user && user.trim() !== "" ? JSON.parse(user) : null; // neu muon lay array thi thay null = [] tai day

  // Search
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDisplay(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", "");
      navigate("/");
    } catch (error) {
      // console.log(error);
    }
  };

  const handleAddToCart = () => {
    navigate("/cart");
  };
  const handleOpenSearch = () => {
    setIsDisplay(true);
  };
  const handleCloseSearch = () => {
    setIsDisplay(false);
  };
  const discount = 15;
  const orderOver = 50;
  const code = "15OFF";

  return (
    <>
      <div className="navbar">
        <p className="banner">
          Save {discount}% on orders over ${orderOver} ♡ Use code {code} at
          checkout
        </p>
        <div className="nav">
          <i onClick={handleOpenSearch} className="fas fa-search"></i>
          <NavLink to="/" className="fas">
            SENSE
          </NavLink>

          <div className={`${!currentUser ? "register_login" : "d-none"}`}>
            {currentUser ? null : (
              <NavLink to="/register" className={` fas navLink`}>
                Register
              </NavLink>
            )}
            {currentUser ? null : (
              <NavLink to="/login" className="fas navLink">
                Login
              </NavLink>
            )}
          </div>

          {currentUser ? (
            !currentUser?.isSeller ? (
              <div className="login_done">
                <i onClick={handleAddToCart} className="fas fa-shopping-cart">
                  <sup>0</sup>
                </i>

                {/* <p className="username">{currentUser?.username}</p> */}

                <div className="loginSuccess">
                  <div className="avatarImg">
                    <img src={currentUser?.avatar || noUser} alt="" />
                    <div className="order_logout" onClick={handleLogout}>
                      <span> Log out</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="login_done">
                <NavLink to="/seller_products" className="nav-link">
                  Products
                </NavLink>
                <NavLink to="/add-product" className="nav-link">
                  Add Products
                </NavLink>
                <p className="username">{currentUser?.username}</p>

                <div className="loginSuccess">
                  <div className="avatarImg">
                    <img src={currentUser?.avatar || noUser} alt="" />
                    <div className="order_logout" onClick={handleLogout}>
                      <span> Log out</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : null}
        </div>
        {/* SEARCH */}
        <Search
          isDisplay={isDisplay}
          searchRef={searchRef}
          onClose={handleCloseSearch}
        />

        {/* LIST ITEM */}

        <div className="listItem">
          {normalScreen.map((item) => (
            <NavLink
              to={`/${item.path}`}
              key={item.label}
              className={`navList`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

const normalScreen = [
  { path: "skin-care", label: "Skin Care" },
  { path: "hair-care", label: "Hair Care" },
  { path: "body-care", label: "Body Care" },
  { path: "nail", label: "Nail" },
  { path: "polish", label: "Polish" },
  { path: "blog", label: "Blog" },
  { path: "about-us", label: "About Us" },
];
const userScreen = [
  { path: "skin-care", label: "Skin Care" },
  { path: "hair-care", label: "Hair Care" },
  { path: "body-care", label: "Body Care" },
  { path: "nail", label: "Nail" },
  { path: "polish", label: "Polish" },
  { path: "blog", label: "Blog" },
  { path: "about-us", label: "About Us" },
];
const sellerScreen = [
  { path: "skin-care", label: "Skin Care" },
  { path: "hair-care", label: "Hair Care" },
  { path: "body-care", label: "Body Care" },
  { path: "nail", label: "Nail" },
  { path: "polish", label: "Polish" },
  { path: "blog", label: "Blog" },
  { path: "about-us", label: "About Us" },
];
