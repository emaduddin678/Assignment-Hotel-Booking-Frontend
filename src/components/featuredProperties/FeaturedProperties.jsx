import React from "react";

import useFetch from "../../hooks/useFetch";
import "./FeaturedProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "https://assignment-hotel-booking-backend.vercel.app/api/hotels?featured=true&limit=4"
  );
  return (
    <div className="fp">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        data.map((value) => {
          return (
            <div className="fpItem" key={value._id}>
              <img
                src={`data:${value.photos[0].contentType};base64,${value.photos[0].data}`}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{value.name}</span>
              <span className="fpCity">{value.city}</span>
              <span className="fpPrice">
                Starting from BDT{value.cheapestPrice}
              </span>
              {value.rating && (
                <div className="fpRating">
                  <button>{value.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default FeaturedProperties;
