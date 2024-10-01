require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const prisma = new PrismaClient();

const createPost = (req, res) => {
  jwt.verify(req.token, JWT_SECRET, async (err) => {
    if (err) {
      res
        .sendStatus(403)
        .json({ message: "Without autorization to create posts" });
    } else {
      const { title, postContent } = req.body;

      const userId = req.session.passport.user;

      if (!title || !postContent) {
        return res
          .status(400)
          .json({ message: "Title and content are required." });
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
    }
  });
};

module.exports = { createPost };
