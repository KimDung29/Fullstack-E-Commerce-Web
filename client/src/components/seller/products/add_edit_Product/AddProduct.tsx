import { ProductType } from "../Seller_Products";
import "./add_edit_Product.scss";
import { useState } from "react";
import { DebouncedFunc, debounce, throttle } from "lodash";
import { useNavigate } from "react-router-dom";
import newRequest from "../../../../utils/axiosInstance";

const initialValue: ProductType = {
  title: "",
  desc: "",
  brand: "",
  category: [""],
  totalStars: 0,
  starNumber: 0,
  coverImg: "",
  discount: 0,
  features: [""],
  images: [""],
  inStock: 0,
  longDesc: "",
  price: 0,
};
type DebouncedHandlers = {
  [key: string]: DebouncedFunc<(value: any) => void>;
};
export default function AddProduct() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");

  // send separate value to values after 500ms
  const debouncedHandlers: DebouncedHandlers = {
    title: debounce((value: string) => {
      setValues({ ...values, title: value });
    }, 500),
    brand: debounce((value: string) => {
      setValues({ ...values, brand: value });
    }, 500),
    desc: debounce((value: string) => {
      setValues({ ...values, desc: value });
    }, 500),
    longDesc: debounce((value: string) => {
      setValues({ ...values, longDesc: value });
    }, 500),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (debouncedHandlers[name]) {
      debouncedHandlers[name](value);
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (debouncedHandlers[name]) {
      debouncedHandlers[name](value);
    }
  };

  const throttledSubmitForm = throttle(async () => {
    //  console.log("Submitting form with data:", values);
    // Gửi yêu cầu submit form tới server
    // Thực hiện các xử lý liên quan đến dữ liệu form

    try {
      setLoading(true);
      const res = await newRequest.post("/products", { ...values });

      if (res.status === 200) {
        navigate("/products");
      }
    } catch (error: any) {
      console.log(error);
      setBackendError(error.response.data);
    }
  }, 1000);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    throttledSubmitForm();
  };
  return (
    <>
      <div className="addProduct">
        <form onSubmit={handleSubmit}>
          <div className="formAddProduct">
            <div className="leftForm">
              {/* TITLE */}
              <div className="inputFile">
                <label htmlFor=""> Title </label>
                <input name="title" type="text" onChange={handleInputChange} />
              </div>
              {/* BRAND */}
              <div className="inputFile">
                <label htmlFor=""> Brand </label>
                <input name="brand" type="text" onChange={handleInputChange} />
              </div>
              {/* CATEGORY */}
              <div className="inputFile">
                <label htmlFor=""> Category </label>
                <input
                  name="category"
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
              {/* SHORT DESC */}
              <div className="inputFile">
                <label htmlFor="">Short Description </label>
                <input name="desc" type="text" onChange={handleInputChange} />
              </div>
              {/* LONG DESC */}
              <div className="inputFile">
                <label htmlFor="">Long Description </label>
                <textarea
                  name="longDesc"
                  id=""
                  cols={20}
                  rows={3}
                  onChange={handleTextAreaChange}
                ></textarea>
              </div>
              {/* IMAGE */}
              <div className="inputFile">
                <label htmlFor="">Choose Image from your Device</label>
                <input name="image" type="file" onChange={handleInputChange} />
                <label htmlFor="">Image from url</label>

                <input type="url" name="image" id="" />
              </div>
            </div>
            {/* RIGHT FORM */}
            <div className="rightForm">
              {/* DISCOUNT */}
              <div className="inputFile">
                <label htmlFor=""> Discount </label>
                <input
                  name="discount"
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
              {/* INSTOCK */}
              <div className="inputFile">
                <label htmlFor=""> Instock </label>
                <input
                  name="inStock"
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
              {/* PRICE */}
              <div className="inputFile">
                <label htmlFor=""> Price </label>
                <input
                  name="price"
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
              {/*coverImg IMAGE */}
              <div className="inputFile">
                <label htmlFor="">Choose COVER Image from your Device</label>
                <input
                  name="coverImg"
                  type="file"
                  onChange={handleInputChange}
                />
                <label htmlFor="">Image from url</label>

                <input type="url" name="image" id="" />
              </div>
            </div>
          </div>
          {backendError ? (
            <div className="backendError">{backendError}</div>
          ) : null}
          <button className="submit" type="submit">
            {backendError !== "" ? "Loading" : loading ? "Loading" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
