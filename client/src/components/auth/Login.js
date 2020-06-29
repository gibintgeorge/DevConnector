import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  //Set the state when the input field is changed
  const handleChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  //on submit event handler ofr the form
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      console.log("Email shold not be empty");
    }
    if (!password) {
      console.log("Password shold not be empty");
    }

    const newUser = {
      email,
      password,
    };
    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
      // const body = JSON.stringify(newUser);
      // const res = await axios.post("api/users", body, config);
      // console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign in to Your Account
      </p>
      <form className="form" onSubmit={(event) => onSubmit(event)}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(event) => handleChange(event)}
            placeholder="Email Address"
            required
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(event) => handleChange(event)}
            placeholder="Password"
            name="password"
            required
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Does not have an account?
        <Link to="/register"> Register</Link>
      </p>
    </>
  );
};

export default Login;
