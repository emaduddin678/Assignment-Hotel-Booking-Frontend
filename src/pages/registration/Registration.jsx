import "./Registration.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { userInputs } from "../../formSource";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/FirebaseAuthContext";

const Registration = () => {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({});
  const { signup } = useAuth();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("img", file);
      Object.entries(info).forEach(([key, value]) => {
        formData.append(key, value);
      });
      // signup()
      signup(info.email, info.password, info.username)

      // console.log(file);
      // const response = await axios.post(
      //   "http://localhost:8800/api/auth/register",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      {/* <Sidebar /> */}
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Register Now</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form encType="multipart/form-data">
              <div className="formInput">
                <label htmlFor="file">
                  {/* Image: <DriveFolderUploadOutlinedIcon className="icon" /> */}
                </label>
                <input
                  type="file"
                  id="file"
                  name="img"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
        <div className="text" style={{ textAlign: "center" }}>
          Already have an account?
          <Link
            to="/login"
            style={{ color: "blue", fontWeight: "bold", marginLeft: "10px" }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
