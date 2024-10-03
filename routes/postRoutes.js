const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const verifyToken = require("../config/token");

router.get("/posts", postController.getAllPosts);
router.post("/post/create", verifyToken, postController.createPost);
router.post("/post/update/:id", verifyToken, postController.updatePost);
router.delete("/post/delete/:id", verifyToken, postController.deletePost);

module.exports = router;
