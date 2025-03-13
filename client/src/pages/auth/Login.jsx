import React, { useState } from "react";
import style from "./Login.module.css";
import { profile } from "../../assets/data";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from '../../context/UserProvider.jsx';

export default function Login({ setShowLogin }) {
  const getRandomNumber = () => Math.floor(Math.random() * 9) + 1;
  const [currState, setCurrState] = useState("Login");
  const url = "http://localhost:3000";
  const navigate = useNavigate(); 
  const { setUser } = useUser();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const { name, password } = data; 
      const response = await axios.post(`${url}/api/auth/signin`, { name, password }, { withCredentials: true });
  
      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.user.id);
        sessionStorage.setItem('userName',response.data.user.name);
        setUser(response.data.user);
        toast.success("Login Success");
        navigate("/home");
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error, please try again.");
    }
  };

  const onSignUp = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post(`${url}/api/auth/signup`, data, { withCredentials: true });

        if (response.data.success) {
          sessionStorage.setItem("token", response.data.token); // Store the token
          sessionStorage.setItem("userId", response.data.user.id); // Store the token
          setUser(response.data.user);
          toast.success("Sign Up Success");
          navigate("/home");
        } else {
          toast.error(response.data.message || "Something went wrong!");
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Server error, please try again.");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.login}>
        <div className={style.title}>
          <h3>Random Chat</h3>
        </div>
        {currState == "Login"? <h2>Login</h2>:<h2>SignUp</h2>}
        <div className={style.profile_img}>
          <img src={profile[`img${getRandomNumber()}`]} alt="Random Profile" />
        </div>

        <form onSubmit={currState === "Login" ? onLogin : onSignUp}>
          <div className={style.content}>
            {currState !== "Login" && (
              <>
                <label>Enter Email</label>
                <input name="email" type="email" placeholder="Your email"  onChange={onChangeHandler} value={data.email} required />
              </>
            )}
            <label>Enter Name</label>
            <input  type="text"  placeholder="Enter Name.."  name="name"  onChange={onChangeHandler}  value={data.name}  required />

            <label>Enter Password</label>
            <input  type="password" placeholder="Enter Password..." name="password"  onChange={onChangeHandler} value={data.password}  required />
            <button type="submit">{currState === "Login" ? "Login" : "Sign Up"}</button>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click here</span>{" "}
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>{" "}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}