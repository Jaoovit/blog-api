const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const verifyToken = require("../config/token");

router.post("/post", verifyToken, postController.createPost);
router.post("/post/update/:id", verifyToken, postController.updatePost);
router.delete("/post/delete/:id", verifyToken, postController.deletePost);

module.exports = router;
