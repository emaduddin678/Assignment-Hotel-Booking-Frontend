import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./Reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/room/${hotelId}`
  );
  const { dates } = useContext(SearchContext);
  console.log(dates);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    // const isFound = roomNumber.unavailbaleDates.some(
    //   (date) => alldates.includes(new Date(date).getTime())

    //   // new Date(alldates).includes(new Date(date))
    //   // console.log(alldates,new Date(date).getTime())
    // );

    for (let i = 0; i < roomNumber.unavailbaleDates.length; i++) {
      // console.log(i + 1, new Date(roomNumber.unavailbaleDates[i]));
      // console.log(new Date(alldates[0]));
      // console.log(new Date(alldates[1]));
      // console.log(
      //   new Date(roomNumber.unavailbaleDates[i]).getDay() ===
      //     new Date(alldates[0]).getDay()
      // );
      // console.log(
      //   new Date(roomNumber.unavailbaleDates[i]).getDay(),
      //   new Date(alldates[0]).getDay()
      // );
      if (
        new Date(roomNumber.unavailbaleDates[i]).getDay() ===
        new Date(alldates[0]).getDay()
      ) {
        return false;
      } else if (
        new Date(roomNumber.unavailbaleDates[i]).getDay() ===
        new Date(alldates[1]).getDay()
      ) {
        return false;
      } else {
        return true;
      }
    }
    // console.log(
    //   isFound,
    //   alldates,
    //   new Date(roomNumber.unavailbaleDates[0]).getTime()
    // );
    // console.log(
    //   isFound,
    //   alldates,
    //   new Date(roomNumber.unavailbaleDates[1]).getTime()
    // );
    // console.log(
    //   isFound,
    //   alldates,
    //   new Date(roomNumber.unavailbaleDates[2]).getTime()
    // );
    // console.log(
    //   isFound,
    //   alldates,
    //   new Date(roomNumber.unavailbaleDates[3]).getTime()
    // );
    // console.log(
    //   isFound,
    //   alldates,
    //   new Date(roomNumber.unavailbaleDates[4]).getTime()
    // );
    // console.log(
    //   isFound,
    //   alldates,
    //   new Date(roomNumber.unavailbaleDates[5]).getTime()
    // );

    // return !isFound;
  };

  // console.log(isAvailable())

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://localhost:8800/api/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="reserve">
      {console.log("HEllo")}
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {console.log(data)}
        {loading
          ? "Loading.."
          : data.map((item) => (
              <div className="rItem" key={item._id}>
                {/* {console.log(item)} */}
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div>
                    Price: BDT <p className="rPrice">{item.price}</p> Taka
                  </div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber) => (
                    <div className="room" key={roomNumber._id}>
                      {/* {console.log(roomNumber)} */}
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                      {/* {console.log(isAvailable(roomNumber))} */}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
