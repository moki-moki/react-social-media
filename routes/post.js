const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  likeDislikePost,
  getPost,
  getAllPosts,
  dislikePost,
} = require("../controller/post");

// GET ALL POSTS
router.get("/", getAllPosts);

// CREATE A POST
router.post("/create", createPost);

// UPDATE POST
router.put("/:id", updatePost);

// DELTE POST
router.delete("/:id", deletePost);

// LIKE-DISLIKE POST
router.put("/:id/like", likeDislikePost);
router.put("/:id/dislike", dislikePost);

// GET A SINGLE POST
router.get("/:id", getPost);

module.exports = router;
