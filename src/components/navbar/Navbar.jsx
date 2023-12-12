import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../context/FirebaseAuthContext";

const Navbar = () => {
  // const [thisUser, setThisUser] = useState();
  // const { user } = useContext(AuthContext);
  const { currentUser, logout } = useAuth();
  // console.log(logout)
  // useEffect(() => {
  //   if (user) {
  //     setThisUser(user);
  //   }
  // }, []);

  // console.log(thisUser);

  const handleLogout = () =>{
    logout()
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">BD Hotels</span>
        </Link>

        {/* My booking */}
        {currentUser ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-betwesen",
            }}
          >
            <Link to={"/room"} className="mybook">
              Rooms
            </Link>
            <Link to={"/mybooking"} className="mybook">
              My Bookings
            </Link>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
            <p>{currentUser.displayName}</p>
          </div>
        ) : (
          <div className="navItems">
            <Link to={"/room"} className="mybook">
              Rooms
            </Link>
            <Link to={"/mybooking"} className="mybook">
              My Bookings
            </Link>
            <button className="navButton">
              <Link to={"/register"}>Register</Link>
            </button>

            <button className="navButton">
              <Link to="/login">Login</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
