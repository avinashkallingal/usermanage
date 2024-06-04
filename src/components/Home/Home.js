import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import "../Home/Home.css"

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.user);  
  console.log(user, "hiii this is user from redux store");

 
  const token = localStorage.getItem("jwttoken");
  console.log(token, "in authcheck local storage token");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  useEffect(() => {
    console.log("hiii iam,use effect");
    if(token!=null){
    axios.post("http://localhost:3000/checkAuth").then((response) => {
      if (response.data.auth != true) {
        console.log("failed to authenticate");
        navigate("/login");
      } else {
        const userData = localStorage.getItem("user");
        console.log(userData, "localstorage user data");
        dispatch({
          type: "login",
          playload: userData,
        });


        console.log("successfully got homedata");
      }
    });}
    else{
      navigate("/login");
    }
  });

  // if(!user){
  //   return
  //   dispatch({
  //     type:"login",
  //     playload:user
  //   })
  //   navigate("/login")
  // }

  const logoutFunction = () => {
    console.log("logout clicked");
    dispatch({
      type: "logout",
      playload: null,
    });
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="homepage-container">
      <div className="card">
        <header className="header">
          <h1>Welcome, {user || "Guest"}</h1>
          <button onClick={logoutFunction}>Logout</button>
        </header>
        <main className="main-content">
          <section className="section user-profile">
            <h2>User Profile</h2>
            <img src={user?.profileImage} alt="Profile" className="profile-image" />
            {/* Additional user profile details can be added here */}
          </section>
          <section className="section recommended-content">
            <h2>Recommended Content</h2>
            {/* Display recommended content here */}
          </section>
          <section className="section upcoming-events">
            <h2>Upcoming Events</h2>
            {/* Display upcoming events here */}
          </section>
        </main>
        <footer className="footer">
          <p>© 2024 Your App</p>
        </footer>
      </div>
    </div>
  );
  
  
};

export default Home;
