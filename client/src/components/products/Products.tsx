import { useEffect, useState } from "react";
import Nav from "../nav/Nav";
import "./product.scss";

interface ProductType {
  _id: string;
  title: string;
  desc: string;
  brand: string;
  category: [string];
  totalStars: number;
  starNumber: number;
  coverImg: string;
  discount: number;
  features: [string];
  images: [string];
  inStock: number;
  longDesc: string;
  price: number;
}

export default function Products() {
  const [products, setProducts] = useState([] as ProductType[]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <Nav />
      <table id="products">
        <thead>
          <tr>
            <th>Title</th>
            <th>Brand</th>
            <th>Discount</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
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
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
