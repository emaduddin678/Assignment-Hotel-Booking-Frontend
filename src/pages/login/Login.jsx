import React, { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/FirebaseAuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const { login } = useAuth();
  // const { login } = useAuth();
  // console.log(value);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(user)
    
    // dispatch({ type: "LOGIN_START" });
    try {
      login(credentials.email, credentials.password);
      //   const res = await axios.post(
      //     "http://localhost:8800/api/auth/login",
      //     credentials,
      //     { withCredentials: true }
      //   );
      //   dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      //   navigate("/");
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <>
      <Navbar />
      <div className="login">
        <div className="lContainer">
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <button
            disabled={loading || !credentials.email || !credentials.password}
            type="submit"
            onClick={handleClick}
            onChange={handleChange}
            className="lButton"
          >
            Login{" "}
          </button>
          <div className="text" style={{ textAlign: "center" }}>
            Already have an account?
            <Link
              to="/register"
              style={{ color: "blue", fontWeight: "bold", marginLeft: "10px" }}
            >
              Register Now
            </Link>
          </div>
          {error && <span> {error.message} </span>}
        </div>
      </div>
    </>
  );
};

export default Login;
