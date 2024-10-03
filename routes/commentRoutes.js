const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router();

router.post("/post/:id/create/comment", commentController.postComment);

module.exports = router;
