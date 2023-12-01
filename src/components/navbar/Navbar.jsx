import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from "../../context/FirebaseAuthContext";

const Navbar = () => {
  // const [thisUser, setThisUser] = useState();
  // const { user } = useContext(AuthContext);
  const { currentUser } = useAuth();
  // console.log(currentUser)
  // useEffect(() => {
  //   if (user) {
  //     setThisUser(user);
  //   }
  // }, []);

  // console.log(thisUser);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">BD Hotels</span>
        </Link>

        {/* My booking */}
        {currentUser ? (
          <div style={{display:"flex", alignItems: "center"  }}>
            <button className="mybook">My Bookings</button>
            <p>{currentUser.displayName}</p>
          </div>
        ) : (
          <div className="navItems">
            <button className="mybook">My Bookings</button>
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
