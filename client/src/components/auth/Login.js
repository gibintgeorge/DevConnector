import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Spinner from "../layout/spinner";

const Login = ({ login, isAuthenticated, loading }) => {
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

    try {
      login(email, password);
    } catch (err) {
      console.error(err.response.data);
    }
  };
  if (loading && !isAuthenticated) return <Spinner />;
  //redirect id logged in
  if (isAuthenticated) return <Redirect to="/dashboard" />;
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
Login.prototypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { login })(Login);
