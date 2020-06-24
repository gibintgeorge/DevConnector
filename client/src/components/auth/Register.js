import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  //Set the state when the input field is changed
  const handleChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  //on submit event handler ofr the form
  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) {
      console.log("Passwords does not match");
      return;
    }
    const newUser = {
      name,
      email,
      password,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newUser);
      const res = await axios.post("api/users", body, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(event) => onSubmit(event)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(event) => handleChange(event)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(event) => handleChange(event)}
            placeholder="Email Address"
            required
            name="email"
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className="form-group">
          <input
            type="password"
            value={password2}
            onChange={(event) => handleChange(event)}
            placeholder="Confirm Password"
            name="password2"
            required
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </>
  );
};

export default Register;
