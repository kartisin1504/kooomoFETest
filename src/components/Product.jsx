import React from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import useFetchProductAPI from "../hooks/useFetchProductAPI";

const Product = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { searchitem } = useParams(); // Assuming 'searchItem' is the parameter name

  // Fetch data based on searchItem if it exists, otherwise fetch all products
  const { data, loading, error } = useFetchProductAPI(
    searchitem ? `${baseUrl}?search=${searchitem}` : baseUrl
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const cardItem = (item) => {
    return (
      <div className="card my-5 py-4" key={item.id} style={{ width: "18rem" }}>
        {item.sticker && <div className="sticker">{item.sticker}</div>}
        <img src={item.image} class="card-img-top" alt={item.name} />
        <div className="card-body text-center">
          <h5 className="card-title">{item.name}</h5>
          <p className="lead">
            {" "}
            {item.strike && (
              <span className=" strike">
                {item.currency}
                {item.strike}
              </span>
            )}
            {item.currency}
            {item.price}
          </p>

          <NavLink
            to={`/products/${item.name}`}
            className="btn btn-outline-primary"
          >
            Buy Now
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Product</h1>
            <hr />
          </div>
        </div>
      </div>
      <div className="container">
        {data.length ? (
          <div className="row justify-content-around">{data.map(cardItem)}</div>
        ) : (
          <div> Product Not Available </div>
        )}
      </div>
    </div>
  );
};

export default Product;
