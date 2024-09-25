const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  try {
    const { username, email, password, confPassword, firstName, lastName } =
      req.body;

    if (!username || !email || !password || !confPassword) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (password !== confPassword) {
      throw new Error("Password must match password confirmation");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        firstName,
        lastName,
      },
    });
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(req.body);
    res
      .status(500)
      .json({ error: "Error registering user", details: error.message });
  }
};

module.exports = { registerUser };
