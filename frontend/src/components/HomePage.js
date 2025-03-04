import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage({ user }) {
  const [news, setNews] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [visibleNews, setVisibleNews] = useState(6);
  const navigate = useNavigate();

  // ✅ Fetch News & Bookmarks from API
  useEffect(() => {
    fetch("http://localhost:5000/news")
      .then((res) => res.json())
      .then((data) => setNews(data || []))
      .catch((error) => console.error("Error fetching news:", error));

    if (user) {
      fetch(`http://localhost:5000/bookmarks/${user._id}`)
        .then((res) => res.json())
        .then((data) => setBookmarked(data?.map((item) => item.imageUrl) || []))
        .catch((error) => console.error("Error fetching bookmarks:", error));
    }
  }, [user]);

  // ✅ Toggle Bookmark & Update in Database
  const toggleBookmark = async (newsItem) => {
    if (!newsItem?.imageUrl) return;

    const isBookmarked = bookmarked.includes(newsItem.imageUrl);
    try {
      if (isBookmarked) {
        await fetch(`http://localhost:5000/bookmarks/${newsItem._id}`, {
          method: "DELETE",
        });
        setBookmarked((prev) => prev.filter((url) => url !== newsItem.imageUrl));
      } else {
        await fetch("http://localhost:5000/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            title: newsItem.title || "No Title",
            url: newsItem.imageUrl,
          }),
        });
        setBookmarked((prev) => [...prev, newsItem.imageUrl]);
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  // ✅ Dark Mode Toggle & Save Preference
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // ✅ Filter News Based on Search & Category
  const filteredNews = news.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCategory === "All" || article.category === filterCategory)
  );

  // ✅ Navigate to User Dashboard
  const handleViewBookmarks = () => {
    if (user) {
      navigate("/user-dashboard", { state: { userId: user._id } });
    } else {
      console.error("Error: user is undefined");
    }
  };

  return (
    <div className="home-container">
      {/* 🔥 News Ticker */}
      <div className="news-ticker">
        <marquee behavior="scroll" direction="left">
          🚀 Trending: AI is revolutionizing industries! | 🌍 Climate crisis intensifies! | 🎬 Upcoming movies break records!
        </marquee>
      </div>

      {/* 🌙 Dark Mode Toggle & Filters */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Sports">Sports</option>
          <option value="Politics">Politics</option>
          <option value="Cinema">Cinema</option>
          <option value="World">World</option>
        </select>

        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* ✅ Show Bookmark Section If Logged In */}
      {user && (
        <div className="user-dashboard">
          <h2>Your Bookmarks</h2>
          <button className="view-bookmarks" onClick={handleViewBookmarks}>
            View Bookmarks →
          </button>
        </div>
      )}

      {/* 📰 Latest News */}
      <h1 className="home-title">Latest News</h1>
      <div className="news-grid">
        {filteredNews.slice(0, visibleNews).map((article, index) => (
          <div
            key={article._id}
            className={`news-card ${
              index % 5 === 0 ? "news-large" : index % 3 === 0 ? "news-wide" : ""
            }`}
          >
            <img src={article.imageUrl || "/placeholder.jpg"} alt="No Image" />
            <div className="news-content">
              <h2 style={{ color: darkMode ? "#fff" : "#222" }}>{article.title || "Untitled"}</h2>
              <p>{article.description?.slice(0, 100) || "No description available"}...</p>
              <div className="news-actions">
                {/* ⭐ Bookmark Button */}
                <button
  className="bookmark"
  onClick={() => toggleBookmark(article)}
>
  {bookmarked.includes(article.imageUrl) ? "⭐" : "🔴"}
</button>
                <button onClick={() => navigate(`/news/${article._id}`)} className="read-more">
  Read More →
</button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📌 Load More Button */}
      {visibleNews < filteredNews.length && (
        <button className="load-more" onClick={() => setVisibleNews((prev) => prev + 6)}>
          Load More News
        </button>
      )}
    </div>
  );
}
