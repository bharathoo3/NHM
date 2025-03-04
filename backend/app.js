require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes"); // ✅ Added Bookmark Routes

const app = express();

// 🔥 Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/newsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors()); // Allow frontend requests
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

// ✅ Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/news", newsRoutes);
app.use("/bookmarks", bookmarkRoutes); // ✅ Added bookmark routes

// ✅ Handle 404 Errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Global Error Handler (returns JSON instead of rendering HTML)
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err.stack); // Log error for debugging
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

module.exports = app;
