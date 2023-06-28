import { useEffect, useState } from "react";
import Nav from "../../nav/Nav";
import "./product.scss";
import { useNavigate } from "react-router-dom";
import newRequest from "../../../utils/axiosInstance";
import { debounce } from "lodash";

export interface ProductType {
  _id?: string;
  title?: string;
  desc?: string;
  brand?: string;
  category?: [string];
  totalStars?: number;
  starNumber?: number;
  coverImg?: string;
  discount?: number;
  features?: [string];
  images?: [string];
  inStock?: number;
  longDesc?: string;
  price?: number;
}

export default function SellerProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([] as ProductType[]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleEditProduct = (product: ProductType) => {
    localStorage.setItem("currentProduct", JSON.stringify(product));
    navigate("/edit");
  };

  const debounceHandle = debounce((value) => {
    setQuery(value);
  }, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debounceHandle(value);
  };

  const data = query
    ? products.filter((p) =>
        p.title?.toLowerCase().includes(query.toLowerCase())
      )
    : products;
  return (
    <>
      <Nav />
      <div className="product">
        <form className="search">
          <label htmlFor="">Search</label>
          <input type="text" onChange={handleSearch} />
        </form>
        <table id="products">
          <thead>
            <tr>
              <th>Title</th>
              <th>Brand</th>
              <th>Discount</th>
              <th>Image</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((product) => (
                <tr key={product._id}>
                  <td>{product?.title}</td>
                  <td>{product?.brand}</td>
                  <td>{product?.discount}%</td>
                  <td>
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={product?.coverImg}
                    />
                  </td>
                  <td onClick={() => handleEditProduct(product)}>
                    <i className="far fa-edit"></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
