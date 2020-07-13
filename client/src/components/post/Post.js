import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/spinner";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem.js";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return loading && post === null ? (
    <Spinner />
  ) : post === null ? (
    <p>Something went wrong or the post you are looking for does not exist</p>
  ) : (
    <>
      <PostItem post={post} showActions={false} />
      <CommentForm id={match.params.id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem
            key={comment._id}
            name={post.name}
            postId={post._id}
            comment={comment}
          />
        ))}
      </div>
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
