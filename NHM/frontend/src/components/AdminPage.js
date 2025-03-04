import { useEffect, useState } from "react";
import "./AdminPage.css";

export default function AdminPage() {
  const [news, setNews] = useState([]);
  const API_URL = "http://localhost:5000/news"; // ✅ Base API URL

  // ✅ Fetch all news from API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched News:", data); // Debugging
        setNews(Array.isArray(data) ? data : []); // Ensure it's an array
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  // ✅ Add News
  const addNews = async () => {
    const title = prompt("Enter News Title:");
    const content = prompt("Enter News Content:");
    const author = prompt("Enter Author Name:");
    const category = prompt("Enter Category:");
    const imageUrl = prompt("Enter Image URL:");

    if (!title || !content || !author) return alert("Title, content, and author are required!");

    const newNews = { title, content, author, category, imageUrl };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNews),
      });
      const data = await response.json();
      setNews([...news, data.news]); // Add new item to state
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  // ✅ Edit News
  const editNews = async (id) => {
    const newTitle = prompt("Enter new title:");
    const newContent = prompt("Enter new content:");
    const newAuthor = prompt("Enter new author:");

    if (!newTitle || !newContent || !newAuthor) return alert("All fields are required!");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, content: newContent, author: newAuthor }),
      });

      const data = await response.json();
      setNews(news.map((item) => (item._id === id ? data.updatedNews : item)));
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  // ✅ Delete News
  const deleteNews = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setNews(news.filter((item) => item._id !== id)); // Remove from state
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1>🛠️ Admin Dashboard</h1>

      {/* 🌟 Manage News */}
      <section>
        <h2>📰 Manage News</h2>
        <button className="add-btn" onClick={addNews}>➕ Add News</button>
        <div className="news-list">
          {news.length > 0 ? (
            news.map((item) => (
              <div key={item._id} className="news-item">
                <h3>{item.title}</h3>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Author:</strong> {item.author}</p>
                <p>{item.content}</p>
                {item.imageUrl && <img src={item.imageUrl} alt={item.title} width="100" />}
                <button className="edit-btn" onClick={() => editNews(item._id)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => deleteNews(item._id)}>🗑️ Delete</button>
              </div>
            ))
          ) : (
            <p>No news available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
