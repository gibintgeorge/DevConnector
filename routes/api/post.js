const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const { check, validationResult } = require("express-validator");
const request = require("request");
const Post = require("../../models/Post");
const User = require("../../models/User");

//@route    GET api/posts
//@desc     create a post
//@access   private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      //get the user details from user collection
      const user = await User.findById(req.user.id).select("-password");

      //if user does not exist
      if (!user) return res.status(500).send("Server Error");

      //create new post
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      //save the post to collection
      const post = await newPost.save();

      //return the post that is newly added
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//@route    GET api/posts
//@desc     Get all posts
//@access   private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/posts/:post_id
//@desc     Get post by id
//@access   private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id).sort({ date: -1 });
    //if post id is invalid
    if (!post) return res.status(401).json({ msg: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    //if post id is invalid
    if (err.kind === "ObjectId") {
      return res.status(401).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/posts/:post_id
//@desc     Delete post by id
//@access   private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //if post dos not exist
    if (!post) return res.status(401).json({ msg: "Post not found" });

    //check the autor of user is same as person who deletes
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "User is not authorised to delete the post" });
    }
    //post is removed
    await post.remove();
    res.json({ msg: "post removed" });
  } catch (err) {
    console.error(err.message);
    //if post id is invalid
    if (err.kind === "ObjectId") {
      return res.status(401).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route    PUT api/posts/like/:id
//@desc     like a post
//@access   private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //if post dos not exist
    if (!post) return res.status(401).json({ msg: "Post not found" });

    //check if the post is already liked by the user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    //if post id is invalid
    if (err.kind === "ObjectId") {
      return res.status(401).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route    PUT api/posts/unlike/:id
//@desc     unlike a post
//@access   private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //if post dos not exist
    if (!post) return res.status(401).json({ msg: "Post not found" });

    //check if the post is already liked by the user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    //get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    if (removeIndex < 0)
      return res.status(400).json({ msg: "Like information not found" });

    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    //if post id is invalid
    if (err.kind === "ObjectId") {
      return res.status(401).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route    PUT api/posts/comment/:id
//@desc     comment a post
//@access   private
router.put(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ error: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.id);
      //if post dos not exist
      if (!post) return res.status(401).json({ msg: "Post not found" });
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      // if post id is invalid
      if (err.kind === "ObjectId") {
        return res.status(401).json({ msg: "Post not found" });
      }
      res.status(500).send("Server Error");
    }
  }
);

//@route    DELETE api/post/:postid/comment/:id
//@desc     Delete a comment on post
//@access   private
router.delete("/:id/comment/:comment_id", auth, async (req, res) => {
  try {
    //const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.id);
    //if post dos not exist
    if (!post) return res.status(401).json({ msg: "Post not found" });

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //if comment does not exist
    if (!comment) return res.status(401).json({ msg: "Comment not found" });

    //check user
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ msg: "User is not authorised to delte the comment" });
    }
    post.comments.remove(comment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    // if post id is invalid
    if (err.kind === "ObjectId") {
      return res.status(401).json({ msg: "Comment not found" });
    }
    res.status(500).send("Server Error");
  }
});
module.exports = router;
