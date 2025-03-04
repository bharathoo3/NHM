import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [bookmarkedNews, setBookmarkedNews] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Retrieve userId from state or local storage
  const userId = location.state?.userId || localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("Error: userId is undefined");
      setLoading(false);
      return;
    }

    // Save userId for persistence
    localStorage.setItem("userId", userId);

    const fetchData = async () => {
      try {
        console.log("Fetching data for user:", userId);

        // Fetch Bookmarks
        const bookmarksRes = await fetch(`http://localhost:5000/bookmarks/${userId}`);
        if (!bookmarksRes.ok) throw new Error(`Failed to fetch bookmarks. Status: ${bookmarksRes.status}`);
        const bookmarks = await bookmarksRes.json();
        console.log("📌 Bookmarks Data:", bookmarks);

        // Fetch All News
        const newsRes = await fetch("http://localhost:5000/news");
        if (!newsRes.ok) throw new Error(`Failed to fetch news. Status: ${newsRes.status}`);
        const news = await newsRes.json();
        console.log("📰 News Data:", news);

        setBookmarkedNews(bookmarks);
        setNewsData(news);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // 🗑 Delete Bookmark Function
  const deleteBookmark = async (bookmarkId) => {
    try {
      const response = await fetch(`http://localhost:5000/bookmarks/${bookmarkId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(`Failed to delete bookmark. Status: ${response.status}`);

      console.log(`✅ Bookmark ${bookmarkId} deleted successfully`);
      
      // 🔄 Update UI after deletion
      setBookmarkedNews((prev) => prev.filter((bookmark) => bookmark._id !== bookmarkId));
    } catch (error) {
      console.error("Error deleting bookmark:", error.message);
    }
  };

  return (
    <div className="user-dashboard-container">
      <h1>📌 Your Bookmarked News</h1>
      {loading ? (
        <p>Loading bookmarks...</p>
      ) : bookmarkedNews.length === 0 ? (
        <p>No bookmarks yet! ⭐ Start saving your favorite news.</p>
      ) : (
        <div className="bookmarked-news-grid">
          {bookmarkedNews.map((bookmark) => (
            <div key={bookmark._id} className="bookmarked-news-card">
              <img src={bookmark.url} alt={bookmark.title} />
              <div className="news-content">
                <h2>{bookmark.title}</h2>
                <Link to={`/news/${bookmark._id}`} className="read-more">
                  Read More →
                </Link>
                <button 
                  className="delete-btn" 
                  onClick={() => deleteBookmark(bookmark._id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <h1>📰 All News</h1>
      {loading ? (
        <p>Loading news...</p>
      ) : newsData.length === 0 ? (
        <p>No news articles available.</p>
      ) : (
        <div className="news-grid">
          {newsData.map((news) => (
            <div key={news._id} className="news-card">
              <img src={news.imageUrl} alt={news.title} />
              <div className="news-content">
                <h2>{news.title}</h2>
                <p>{news.description.slice(0, 100)}...</p>
                <Link to={`/news/${news._id}`} className="read-more">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}
