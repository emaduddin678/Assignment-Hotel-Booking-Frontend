import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 1000 });
  const { data, loading, error, reFetch } = useFetch(
    `https://assignment-hotel-booking-backend.vercel.app/api/rooms`
  );

  useEffect(() => {
    setRooms(data);
  }, [data]);
  console.log(rooms);

  const handleFilterChange = (min, max) => {
    setPriceFilter({ min, max });
  };

  const filteredRooms = rooms.filter(
    (room) => room.price >= priceFilter.min && room.price <= priceFilter.max
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Available Rooms</h1>
      <div style={styles.roomList}>
        {rooms.map((room) => (
          <div key={room._id} style={styles.roomCard}>
            <img
              src="https://via.placeholder.com/300"
              alt={room.title}
              style={styles.roomImage}
            />
            <div style={styles.roomDetails}>
              <h2 style={styles.roomTitle}>{room.title}</h2>
              <p style={styles.roomDesc}>{room.desc}</p>
              <p style={styles.roomPrice}>Price: ${room.price}</p>
              <Link to={`/room/${room._id}`} style={styles.viewDetailsLink}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    textAlign: "center",
  },
  roomList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  roomCard: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  roomImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  roomDetails: {
    padding: "15px",
  },
  roomTitle: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  roomDesc: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  roomPrice: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  viewDetailsLink: {
    display: "block",
    fontSize: "16px",
    textDecoration: "none",
    color: "#3498db",
    marginTop: "10px",
  },
};

export default Room;
