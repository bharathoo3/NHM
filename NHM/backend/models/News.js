const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // ✅ Ensure this exists
  content: { type: String, required: true },
  category: { type: String, required: true }, // ✅ Ensure this exists
  imageUrl: { type: String, required: true }, // ✅ Ensure this exists
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", newsSchema);
