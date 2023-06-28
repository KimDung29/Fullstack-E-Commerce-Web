import "./add_edit_Product.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../../../../utils/axiosInstance";

export default function EditProduct() {
  const product = localStorage.getItem("currentProduct");
  const currentProduct =
    product && product.trim() !== "" ? JSON.parse(product) : null;

  const navigate = useNavigate();
  const [value, setValue] = useState({
    title: currentProduct?.title,
    desc: currentProduct?.desc,
    brand: currentProduct?.brand,
    category: currentProduct?.category,
    totalStars: currentProduct?.totalStars,
    starNumber: currentProduct?.starNumber,
    coverImg: currentProduct?.coverImg,
    discount: currentProduct?.discount,
    features: currentProduct.discount,
    images: currentProduct?.images,
    inStock: currentProduct?.inStock,
    longDesc: currentProduct?.longDesc,
    price: currentProduct?.price,
  });
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue({ ...value, longDesc: e.target.value });
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (currentProduct.userId) {
        const res = await newRequest.put(`/products/${currentProduct._id}`, {
          userId: currentProduct.userId,
          ...value,
        });
        if (res.status === 200) {
          navigate("/products");
        }
      }
    } catch (error: any) {
      console.log(error);
      setBackendError(error.response.data);
    }
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
                <input
                  name="title"
                  type="text"
                  value={value.title}
                  onChange={handleInputChange}
                />
              </div>
              {/* BRAND */}
              <div className="inputFile">
                <label htmlFor=""> Brand </label>
                <input
                  name="brand"
                  value={value.brand}
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
              {/* CATEGORY */}
              <div className="inputFile">
                <label htmlFor=""> Category </label>
                <input
                  name="category"
                  value={value.category}
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
              {/* SHORT DESC */}
              <div className="inputFile">
                <label htmlFor="">Short Description </label>
                <input
                  name="desc"
                  value={value.desc}
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
              {/* LONG DESC */}
              <div className="inputFile">
                <label htmlFor="">Long Description </label>
                <textarea
                  name="longDesc"
                  value={value.longDesc}
                  id=""
                  cols={20}
                  rows={3}
                  onChange={handleTextAreaChange}
                ></textarea>
              </div>
              {/* IMAGE */}
              <div className="inputFile">
                <label htmlFor="">Choose Image from your Device</label>
                <input
                  name="image"
                  value={value.images}
                  type="file"
                  onChange={handleInputChange}
                />
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
                  value={value.discount}
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
              {/* INSTOCK */}
              <div className="inputFile">
                <label htmlFor=""> Instock </label>
                <input
                  name="inStock"
                  value={value.inStock}
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
              {/* PRICE */}
              <div className="inputFile">
                <label htmlFor=""> Price </label>
                <input
                  name="price"
                  value={value.price}
                  type="number"
                  onChange={handleInputChange}
                />
              </div>
              {/*coverImg IMAGE */}
              <div className="inputFile">
                <label htmlFor="">Choose COVER Image from your Device</label>
                <input
                  name="coverImg"
                  value={value.coverImg}
                  type="file"
                  onChange={handleInputChange}
                />
                <label htmlFor="">Image from url</label>

                <input type="url" name="image" id="" />
              </div>
            </div>
          </div>
          {backendError ? <div>{backendError}</div> : null}
          <button className="submit" type="submit">
            {backendError !== "" ? "Loading" : loading ? "Loading" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
