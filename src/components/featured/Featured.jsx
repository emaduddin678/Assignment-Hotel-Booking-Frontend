import React from "react";
import "./Featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels/countByCity?cities=dhaka,sylhet,chattogram"
  );

  return (
    <div className="featured">
      {loading ? (
        <h1>Loading please wait...</h1>
      ) : (
        <>
          <div className="featuredItem">
            <img
              className="featuredImg"
              src="https://th.bing.com/th/id/OIP.WInshPq08jGxQY-k5vZpvQHaEK?w=285&h=180&c=7&r=0&o=5&pid=1.7"
              alt=""
            />
            <div className="featuredTitles">
              <h1>Dhaka</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              className="featuredImg"
              src="https://th.bing.com/th/id/OIP.JzGaM2rLgg3SVRgXj98KxQHaE8?w=273&h=182&c=7&r=0&o=5&pid=1.7"
              alt=""
            />
            <div className="featuredTitles">
              <h1>Sylhet</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              className="featuredImg"
              src="https://th.bing.com/th/id/OIP.pr9QWqv-S-1Sdu7Bg56PdgHaFk?w=231&h=180&c=7&r=0&o=5&pid=1.7"
              alt=""
            />
            <div className="featuredTitles">
              <h1>Chattogram</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
