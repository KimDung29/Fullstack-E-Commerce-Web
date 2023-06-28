import { useEffect, useState } from "react";
import Nav from "../nav/Nav";
import "./product.scss";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/axiosInstance";
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
  ingredients?: string;
  howToUse?: string;
}
const title = "Skin care";
const subTitle =
  "Keep your skin looking and feeling its best with an all-natural, plant-based routine. ♡";

export default function UserProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([] as ProductType[]);

  const [selectFilter, setSelectFilter] = useState("");
  const [isDisplay, setIsDisplay] = useState(false);

  const [sortColum, setSortColum] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleFilter = (path: string) => {
    setSelectFilter(path);
  };
  const handleSort = (path: string) => {
    if (sortColum === path) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColum(path);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <Nav />
      <div className="product">
        {/* TITLE */}
        <div className="title">
          <h1>{title}</h1>
          <p>{subTitle}</p>
        </div>
        {/* FILTER - SORT */}
        <div className="filter_sort">
          {/* FILTER */}
          <div className="filter">
            <div>Filter: </div>
            {filterItem.map((item) => (
              <div
                className={`filter-item ${
                  selectFilter === item.path ? "active" : ""
                } `}
                onClick={() => handleFilter(item.path)}
                key={item.label}
              >
                {item.label}
              </div>
            ))}
          </div>
          {/* SORT */}
          <div className="sort">
            <div>Sort by:</div>
            {sortItem.map((item) => (
              <div
                className={` ${
                  sortColum === item.path ? "active" : ""
                } sort-item `}
                onClick={() => handleSort(item.path)}
                key={item.label}
              >
                {item.label}{" "}
                {sortColum === item.path && sortOrder === "asc" ? (
                  <i className="fas fa-sort-down"></i>
                ) : (
                  <i className="fas fa-sort-up"></i>
                )}
              </div>
            ))}
            <div>{1} products</div>
          </div>
        </div>

        {/* LIST - FILTER - SORT */}
        <div className="list-filter-sort">
          <div>{}</div>
        </div>
      </div>
    </>
  );
}
const sortItem = [
  { path: "price", label: "Price" },
  { path: "discount", label: "Discount" },
];

const filterItem = [
  { path: "all", label: "All" },
  { path: "brand", label: "Brand" },
  { path: "category", label: "Category" },
  { path: "discount", label: "Discount" },
];
