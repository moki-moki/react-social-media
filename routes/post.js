const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  likeDislikePost,
  getPost,
  getAllPosts,
  dislikePost,
  comment,
} = require("../controller/post");

// GET ALL POSTS
router.get("/", getAllPosts);

// DELTE POST
router.delete("/:id", deletePost);

// CREATE A POST
router.post("/create", createPost);

// UPDATE POST
router.put("/:id", updatePost);

// LIKE-DISLIKE POST
router.put("/:id/like", likeDislikePost);
router.put("/:id/dislike", dislikePost);

// GET A SINGLE POST
router.get("/:id", getPost);

// comment
router.put("/comment", comment);

module.exports = router;
