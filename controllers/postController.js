const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany();

    res
      .status(201)
      .json({ message: "Posts getted successfully", posts: allPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting posts." });
  }
};

const getPost = async (req, res) => {
  try {
    // Test postman url - /post/${postId}
    const postId = parseInt(req.params.id, 10);

    if (isNaN(postId)) {
      return res.status(400).send("Invalid post id");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).send("Post not found");
    }

    return res
      .status(201)
      .json({ message: "Post getted sucessfully", post: post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting post." });
  }
};

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

const deletePost = async (req, res) => {
  try {
    // Test postman url - /post/delete/${postId}
    const postId = parseInt(req.params.id, 10);

    await prisma.$transaction(async (prisma) => {
      await prisma.comment.deleteMany({
        where: {
          postId: postId,
        },
      });

      await prisma.post.delete({
        where: {
          id: postId,
        },
      });
    });

    res.json({
      message: "Post delited successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting post." });
  }
};

module.exports = { getAllPosts, getPost, createPost, updatePost, deletePost };
