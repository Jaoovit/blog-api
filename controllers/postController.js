const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Test postman header - Authorization: Bearer${token}

const createPost = async (req, res) => {
  const { title, postContent } = req.body;

  const userId = req.session.passport.user;

  if (!title || !postContent) {
    return res.status(400).json({ message: "Title and content are required." });
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        title: title,
        content: postContent,
        user: {
          connect: { id: userId },
        },
      },
    });
    res.json({
      message: "Post created...",
      post: newPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating post." });
  }
};

module.exports = { createPost };
