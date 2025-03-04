import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewsSubmission.css";

export default function NewsSubmission({ user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Sports");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("You must be logged in to submit news.");
      return;
    }

    const newArticle = {
      title,
      description,   // ✅ Added this to match the schema
      content,
      category,
      imageUrl,
      author: user.email,
      createdAt: new Date(),  // ✅ Explicitly setting createdAt
    };

    try {
      const response = await fetch("http://localhost:5000/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArticle),
      });

      if (response.ok) {
        alert("News submitted successfully!");
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting news:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Submit News</h2>
      <form onSubmit={handleSubmit} className="border p-6 rounded flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Full Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full"
          rows="5"
          required
        ></textarea>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 w-full">
          <option value="Sports">Sports</option>
          <option value="Politics">Politics</option>
          <option value="Cinema">Cinema</option>
          <option value="World">World</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">Submit News</button>
      </form>
    </div>
  );
}
