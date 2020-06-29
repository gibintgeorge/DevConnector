import React, { useState } from "react";
//import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";

const Register = ({ setAlert, register, isAuthenticated }) => {
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
      setAlert("Passwords does not match", "danger");
    } else {
      register({ name, email, password });
    }
  };
  //redirect id logged in
  if (isAuthenticated) return <Redirect to="/dashboard" />;
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
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
