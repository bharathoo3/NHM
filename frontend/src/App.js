import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import NewsSubmission from "./components/NewsSubmission";
import Navbar from "./components/Navbar";
import NewsDetail from "./components/NewsDetail";
import UserDashboard from "./components/UserDashboard"; // ✅ Import UserDashboard
import { useState } from "react";
import AdminPage from "./components/AdminPage";
function App() {
  const [user, setUser] = useState(null);
  const [bookmarkedNews, setBookmarkedNews] = useState([]); // ✅ Store bookmarks globally

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              user={user}
              setUser={setUser}
              bookmarkedNews={bookmarkedNews}
              setBookmarkedNews={setBookmarkedNews}
            />
          }
        />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/submit-news" element={<NewsSubmission user={user} />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/user-dashboard"
          element={<UserDashboard bookmarkedNews={bookmarkedNews} user={user}/>}
        /> {/* ✅ New route */}
      </Routes>
    </div>
  );
}

export default App;
