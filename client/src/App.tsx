import { Route, Routes } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./components/Home";
import AddProduct from "./components/seller/products/add_edit_Product/AddProduct";
import EditProduct from "./components/seller/products/add_edit_Product/EditProduct";
import Nav from "./components/nav/Nav";
import SellerProducts from "./components/seller/products/Seller_Products";
import UserProducts from "./components/user/Product";
import Cart from "./components/cart/Cart";
import Product from "./components/user/Product";

function App() {
  return (
    <>
      <div style={{ backgroundColor: " #f0f2ea" }}>
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seller_products" element={<SellerProducts />} />
          <Route path="/user_products" element={<UserProducts />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit" element={<EditProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/skin-care" element={<Product />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
