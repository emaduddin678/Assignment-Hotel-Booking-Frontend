import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [thisUser, setThisUser] = useState();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      setThisUser(user);
    }
  }, []);

  // console.log(thisUser);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">BD Hotels</span>
        </Link>
        {thisUser ? (
          thisUser.username
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
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
