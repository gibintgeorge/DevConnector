import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperiance } from "../../actions/profile";
const Experiance = ({ experiance, deleteExperiance }) => {
  const experiances = experiance.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment>-
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment format="DD/MM/YYYY">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteExperiance(exp._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Experiance Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiances}</tbody>
      </table>
    </>
  );
};

Experiance.propTypes = {
  experiance: PropTypes.array.isRequired,
  deleteExperiance: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperiance })(Experiance);
