const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getPostComments = async (req, res) => {
  try {
    const postId = parseInt(req.params.id, 10);

    if (!postId) {
      return res.status(400).json({ message: "Post not founded." });
    }

    if (isNaN(postId)) {
      return res.status(400).json({ message: "Invalid post ID." });
    }

    const postComments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });

    return res.status(201).json({
      message: "Get all post comments sucessfully",
      comments: postComments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting post comment." });
  }
};

// Test postman header - Content-Type: application/json

const postComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const postId = parseInt(req.params.id, 10);

    if (!comment) {
      return res.status(400).json({ message: "Comment content is required." });
    }

    if (isNaN(postId)) {
      return res.status(400).json({ message: "Invalid post ID." });
    }

    const postExists = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!postExists) {
      return res.status(404).json({ message: "Post not found." });
    }

    const newComment = await prisma.comment.create({
      data: {
        content: comment,
        post: {
          connect: { id: postId },
        },
      },
    });

    return res
      .status(201)
      .json({ message: "Comment created...", comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error post comment." });
  }
};

// Test postman header - Authorization: Bearer${token}

const deleteComment = async (req, res) => {
  try {
    const commentId = parseInt(req.params.id, 10);

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    res.json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error delete comment." });
  }
};

module.exports = { getPostComments, postComment, deleteComment };
