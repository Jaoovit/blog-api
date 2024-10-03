const { PrismaClient } = require("@prisma/client");
const { post } = require("../routes/postRoutes");

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

const updatePost = async (req, res) => {
  try {
    // Test postman url - /post/update/${postId}
    const postId = parseInt(req.params.id, 10);
    const { newTitle, newPostContent } = req.body;

    if (isNaN(postId)) {
      return res.status(400).send("Invalid post id");
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: newTitle,
        postContent: newPostContent,
      },
    });

    res.json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating post." });
  }
};

module.exports = { createPost, updatePost };
