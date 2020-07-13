import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const CommentItem = ({
  auth,
  deleteComment,
  comment: { _id, user, text, avatar, date },
  name,
  postId,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {!auth.loading && auth.user._id === user && (
          <button
            onClick={() => deleteComment(postId, _id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
