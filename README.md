# 🗞️ NHM - News Hunt Management System (MERN Stack)

NHM (News Hunt Management) is a full-stack web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** that allows users to view news updates, apply for job/interview-related news, and manage news submissions via a powerful admin panel. Inspired by modern platforms like **News Hunt**, the UI is sleek, responsive, and professional.

---

## 🚀 Features

### 👤 User Features
- 🔓 Public users can view basic news headlines on the home page
- 📚 Category-based filtering: *Sports, Politics, Cinema, World*
- 🔐 Logged-in users can:
  - View full news descriptions
  - Apply for interview/exam-related news
  - Bookmark news articles (saved in the database)
- 📰 “Read More” opens a detailed view (Image + 100-line description)

### 🧑‍💼 Admin Features
- 👨‍💻 Admin login with dashboard access
- 👥 Add employee users who can submit news
- 📝 News submission with:
  - Author’s name auto-attached
  - Rich image upload
  - Auto-publish to home page after approval
- 📂 News Management: View/Edit/Delete articles

---

## 🧱 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT-based Auth for users and admin
- **File Upload**: `multer` for image handling

---

## 🛠️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/nhm-news-management.git
cd nhm-news-management

2️⃣ Install Backend Dependencies
bash
Copy
Edit
cd backend
npm install
3️⃣ Install Frontend Dependencies
bash
Copy
Edit
cd ../frontend
npm install
4️⃣ Setup Environment Variables
Create .env files in the backend folder:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
▶️ Running the App
🖥️ Start Backend Server
bash
Copy
Edit
cd backend
npm start
🌐 Start Frontend React App
bash
Copy
Edit
cd frontend
npm start
App will be running at http://localhost:3000/
<img width="1894" height="905" alt="Screenshot 2025-03-05 115154" src="https://github.com/user-attachments/assets/64a63cc0-4fdb-49c7-a708-5facca69de29" />


📁 Project Structure
arduino
Copy
Edit
nhm-news-management/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── uploads/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── App.js
└── README.md
