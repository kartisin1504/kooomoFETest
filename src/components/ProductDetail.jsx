import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addItem, delItem } from "../redux/actions/index";
import useFetchProductAPI from "../hooks/useFetchProductAPI";

const ProductDetail = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [cartBtn, setCartBtn] = useState("Add to Cart");
  const [product, setProduct] = useState(null); // State to hold the product data
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch product data from the API
  const { data, loading, error } = useFetchProductAPI(baseUrl);

  // Update the product state when data changes
  useEffect(() => {
    if (data) {
      const proDetail = data.filter((x) => x.name === id);
      if (proDetail.length > 0) {
        setProduct(proDetail[0]);
      }
    }
  }, [data, id]);

  // Handle adding/removing items from the cart
  const handleCart = () => {
    if (cartBtn === "Add to Cart") {
      dispatch(addItem(product));
      setCartBtn("Remove from Cart");
    } else {
      dispatch(delItem(product));
      setCartBtn("Add to Cart");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <>
      <div className="container my-5 py-3">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center mx-auto product">
            <img src={product.image} alt={product.name} height="400px" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1 className="display-5 fw-bold">{product.name}</h1>
            <hr />
            <h2 className="my-4">${product.price}</h2>
            <p className="lead">{product.desc}</p>
            <button
              onClick={handleCart}
              className="btn btn-outline-primary my-5"
            >
              {cartBtn}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
