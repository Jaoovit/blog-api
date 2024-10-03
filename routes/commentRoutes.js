const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router();
const verifyToken = require("../config/token");

router.get("/post/:id/comments", commentController.getPostComments);
router.post("/post/:id/create/comment", commentController.postComment);
router.delete(
  "/comment/delete/:id",
  verifyToken,
  commentController.deleteComment
);

module.exports = router;
