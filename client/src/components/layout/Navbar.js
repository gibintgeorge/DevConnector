import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authenticatedLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li>
        <a href="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm"> Logout</span>
        </a>
      </li>{" "}
    </ul>
  );

  const guestlinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link className="fas fa-code" to="/">
          Dev Connector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authenticatedLinks : guestlinks}</Fragment>
      )}
    </nav>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { logout })(Navbar);
