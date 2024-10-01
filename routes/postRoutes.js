const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const verifyToken = require("../config/token");

router.post("/post", verifyToken, postController.createPost);

module.exports = router;
