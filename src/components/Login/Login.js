import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/Login/Login.css";


import Spinner from "../Spinner/Spinner";
import { AuthUserContext } from "../../authentication/logged";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import signup from "../../pages/Signup";

const Login = () => {
  const navigate = useNavigate();

  const auth = useSelector((state) => {
    return state.isAuth;
  });

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    // dispatch({type:"initial",playload:null})
    const userData = localStorage.getItem("user");
      const isLocalToken = localStorage.getItem("jwttoken");
      console.log(isLocalToken,"this is the already saved local token")

      //IF TOKEN IS PRESENT THEN VERYFYING TOKEN FROM BACKEND USING API CALL
      if (isLocalToken!=null) {
        console.log(isLocalToken,"hiii2 this is the already saved local token")
        axios.defaults.headers.common["Authorization"] = `Bearer ${isLocalToken}`;
    axios.post("http://localhost:3000/checkAuth").then((response) => {
      
        if (response.data.auth == true) {
          console.log(userData, "localstorage user data");
          dispatch({
            type: "login",
            playload: userData,
          });
          navigate("/");
          console.log("successfully got homedata");
        }else{
          setError('Error logging in. Please try again.');
        }
      
    });
  }else{
    
    setError('');
  }
   
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    axios
      .post("http://localhost:3000/userLogin", {
        username: username,
        password: password,
      })
      .then((response) => {
        // Signed in
        const user = response.data.userData;
        const userPlayload=response.data.userData.username
        console.log(user, response.data, " this is response data from backend");
        console.log(response.data.userData,"response data from backend")
        console.log(response.data.userData,"hii2 response data from backend")
        localStorage.setItem("jwttoken", `${response.data.token}`);
        localStorage.setItem("user", `${response.data.userData.username}`);
        dispatch({
          type:"login",
          playload:userPlayload
        })
      
        setSpinner(false);

        navigate("/");
      })
      .catch((error) => {
        setSpinner(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        const message = errorMessage;
        // const message = errorMessage.split("(auth/")[1].split(")")[0];
        // setError(message);
        setError('Error logging in. Please try again.');
      });
  };

  const gotoSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      {spinner ? (
        <Spinner />
      ) : (
        /////////////////////

        <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form">
         
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          
          
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        
          <div className="inputGroup">
          {error && <p className="error">{error}</p>}
          <button type="submit" className="button">Login</button>
          </div>
        </form>
        <h4 onClick={gotoSignup}>No account? Signup Here</h4>
      </div>

        //////////////
      )}
    </div>
  );
};

export default Login;
