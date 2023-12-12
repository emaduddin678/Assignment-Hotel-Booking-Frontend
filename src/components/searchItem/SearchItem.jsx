import { Link } from "react-router-dom";
import "./SearchItem.css";

const SearchItem = ({ item }) => {
  // console.log(item);
  const photo = item.photos[0];
  return (
    <div className="searchItem">
      <img src={ photo?.contentType
                        ? `data:${photo.contentType};base64,${photo.data}`
                        : "https://thumbs.dreamstime.com/b/basic-rgb-136169634.jpg"} alt="Hotel Image" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance} from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apanrtment with Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so luck in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">BDT. {item.cheapestPrice}</span>
          <span className="siTaxOp">Inclues taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
