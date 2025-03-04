import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NewsDetail.css";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/news/${id}`) // ✅ Uses RESTful API endpoint
      .then((res) => {
        if (!res.ok) {
          throw new Error(`News not found (ID: ${id})`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error(`No news article found for ID: ${id}`);
        }
        setNews(data); // ✅ Directly setting news object
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="news-detail-container">
      <Link to="/" className="back-button">← Back to Home</Link>
      <h1 className="news-title">{news.title}</h1>
      <img src={news.imageUrl} alt={news.title} className="news-image" />
      <p className="news-content">{news.content}</p> 
      <p className="news-author">By {news.author}</p>
      <p className="news-date">Published on: {news.publishedDate}</p>
    </div>
  );
}
