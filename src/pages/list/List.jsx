import "./List.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";

const List = () => {
  const location = useLocation();
  // console.log(location.state);

  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined); 
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `https://assignment-hotel-booking-backend.vercel.app/api/hotels?city=${destination.toLowerCase()}&min=${
      min || 0
    }&max=${max || 10000}`
  );

  // console.log(data);
  
  const { dispatch } = useContext(SearchContext);

  const handleClick = () => {
    reFetch();
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>

            <div className="lsItem">
              <label>Destination</label>
              <input
                type="text"
                onChange={(e) => setDestination(e.target.value)}
                placeholder={destination}
              />
            </div>

            <div className="lsItem">
              <label>Check-in Date</label>
              {/* <br /> */}
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  // editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  // moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.adult}
                    min={1}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.children}
                    min={0}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.room}
                    min={1}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              data.map((item) => {
                return <SearchItem item={item} key={item._id} />;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
