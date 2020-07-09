import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import DashboardActions from "./DashboardActions";
import Experiance from "./Experiance";
import Education from "./Education";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">Welcome {user && user.name}</p>
      {profile !== null ? (
        <>
          <DashboardActions />
          {profile.experience ? (
            <Experiance experiance={profile.experience} />
          ) : (
            ""
          )}
          {profile.education ? <Education education={profile.education} /> : ""}
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i>Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet set up your profile, please add some info</p>
          <Link to="/CreateProfile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};
const mapstateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapstateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
