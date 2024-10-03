const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const verifyToken = require("../config/token");

router.post("/post", verifyToken, postController.createPost);
router.post("/post/update/:id", verifyToken, postController.updatePost);

module.exports = router;
