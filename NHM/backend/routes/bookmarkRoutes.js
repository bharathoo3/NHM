const express = require("express");
const Bookmark = require("../models/Bookmark");
const User = require("../models/User");
const router = express.Router();

// ✅ Add Bookmark
router.post("/", async (req, res) => {
  try {
    const { userId, title, url } = req.body;
    if (!userId || !title || !url) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBookmark = new Bookmark({ user: userId, title, url });
    await newBookmark.save();
    await User.findByIdAndUpdate(userId, { $push: { bookmarks: newBookmark._id } });

    res.status(201).json({ message: "Bookmark added successfully", bookmark: newBookmark });
  } catch (error) {
    console.error("❌ Error adding bookmark:", error);
    res.status(500).json({ error: "Error adding bookmark" });
  }
});

// ✅ Get All Bookmarks for a User
router.get("/:userId", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.params.userId });
    res.status(200).json(bookmarks);
  } catch (error) {
    console.error("❌ Error fetching bookmarks:", error);
    res.status(500).json({ error: "Error fetching bookmarks" });
  }
});

// ✅ Delete a Bookmark
router.delete("/:id", async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndDelete(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ error: "Bookmark not found" });
    }
    res.status(200).json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting bookmark:", error);
    res.status(500).json({ error: "Error deleting bookmark" });
  }
});

module.exports = router;
