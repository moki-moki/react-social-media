const Post = require("../models/Post");
const ErrorResponse = require("../utils/errorResponse");

// CREATE POST
exports.createPost = async (req, res, next) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    return next(new ErrorResponse("You can update only your post"), 500);
    // res.status(500).json(error);
  }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post had been updated");
    }
  } catch (error) {
    return next(new ErrorResponse("You can update only your post"), 403);
  }
};

// DELTE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post) {
      res.status(200).json({ msg: "deleted" });
    }
  } catch (err) {
    return next(new ErrorResponse("You can update only your post"), 500);
  }
};

// LIKE - DISLIKE a post
exports.likeDislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.dislikes.includes(req.body.userId)) {
      await post.updateOne({ $push: { dislikes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    } else {
      await post.updateOne({ $pull: { dislikes: req.body.userId } });
      res.status(200).json("The post has been disliked v2");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// GETTING A SINGLE POST
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.comment = async (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;
  try {
    let result = await Post.findByIdAndUpdate(
      req.body.postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL POSTS
exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.json(allPosts);
  } catch (error) {
    res.status(500).json(error);
  }
};
