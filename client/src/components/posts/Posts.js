import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/spinner";
import PostItem from "./PostItem";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <>
      {loading && posts === null ? (
        <Spinner />
      ) : !loading && posts === null && posts.length < 1 ? (
        <h4>Posts are not yet created</h4>
      ) : (
        <>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i>
            Welcome to the community
          </p>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </>
      )}
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
