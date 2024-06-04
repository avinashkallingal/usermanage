import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");

  const [passError, setPassError] = useState("");

  const checkpass=()=>{
    if(!password){
        setPassError("filed is empty")
        
    }else{
        setPassError("")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if password matches confirmPassword
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if(!password){
        setPassError("filed is empty")
        
    }
    // Add signup logic here (e.g., API call)
    // Reset form fields
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setProfileImage(null);
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const gotoSignin = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="form">
        
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            
          />
     
    
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
  
   
          <label htmlFor="password">Password:</label>
          <input onKeyUp={checkpass}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <div>{passError}</div>
      
     
          <label htmlFor="phone">Phone:</label>
          <input
            type="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            
          />
   
      
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            
          />
    {profileImage && <img style={{ height: '100px', width: '100px', marginLeft: '1%' }} src={URL.createObjectURL(profileImage)} alt='userProfile' />}
        <div className="inputGroup">
          <label htmlFor="profileImage">Profile Image:</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button">Signup</button>
      </form>
      <a className="gotoButton" onClick={gotoSignin}>Already have a account? Signin Here</a>
    </div>
  );
};

export default Signup;
