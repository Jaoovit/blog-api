const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

module.exports = { postComment };
