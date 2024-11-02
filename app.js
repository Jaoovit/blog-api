const express = require("express");
const initializeSession = require("./config/session");
require("dotenv").config;

const app = express();

const cors = require("cors");

/*
Cors options example

const corsOptions = {
  origin: "https://your-allowed-domain.com",
  methods: "GET,POST, PUT, DELETE, PATCH",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
*/

app.use(cors(/*corsOptions*/));

// Middleware to parte JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Prisma session configuration
initializeSession(app);

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
