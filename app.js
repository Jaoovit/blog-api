require("dotenv").config;
const express = require("express");

const app = express();

// Middleware to parte JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);

const PORT = process.env.PORT || 7500;
app.listen(PORT, () => {
  `The server is running in port ${PORT}`;
});
