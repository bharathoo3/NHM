const express = require("express");
const News = require("../models/News");
const router = express.Router();

// ✅ Create a news article
router.post("/", async (req, res) => {
  try {
    const { title, description, content, category, imageUrl, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ error: "Title, content, and author are required" });
    }

    const news = new News({
      title,
      description,  // ✅ Ensure this is included
      content,
      category,     // ✅ Ensure this is included
      imageUrl,     // ✅ Ensure this is included
      author,
      createdAt: new Date(),  // ✅ Explicitly setting createdAt
    });

    await news.save();
    res.status(201).json({ message: "News created successfully", news });
  } catch (error) {
    console.error("❌ Error saving news:", error);
    res.status(500).json({ error: "Error saving news" });
  }
});


// ✅ Get all news articles
router.get("/", async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    res.status(500).json({ error: "Error fetching news" });
  }
});

// ✅ Get a single news article by ID
router.get("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    res.status(200).json(news);
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    res.status(500).json({ error: "Error fetching news" });
  }
});

// ✅ Update a news article by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true, runValidators: true }
    );
    
    if (!updatedNews) {
      return res.status(404).json({ error: "News not found" });
    }
    res.status(200).json({ message: "News updated successfully", updatedNews });
  } catch (error) {
    console.error("❌ Error updating news:", error);
    res.status(500).json({ error: "Error updating news" });
  }
});

// ✅ Delete a news article by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) {
      return res.status(404).json({ error: "News not found" });
    }
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting news:", error);
    res.status(500).json({ error: "Error deleting news" });
  }
});

module.exports = router;
