# DevConnect

**DevConnect** is a full-stack developer networking platform where programmers can share posts, react, and comment — built to connect coders, inspire ideas, and grow together as a community.

---

## Features

**User Authentication** — Signup & Login via Appwrite  
**Create & Edit Posts** — Share your thoughts or project updates  
**Interactive Reactions** — Like, Love, or React with emojis 💡🔥❤️  
**Comment System** — Engage with other developers’ posts  
**Multilingual System** — Engage with Multiple Language for posts, comments, reply and static data etc Through Lingo.dev
**Theme Toggle** — Switch between Light and Dark mode  
**Responsive UI** — Works perfectly on desktop & mobile  
**Real-time Updates** — All data synced via Appwrite Database API  

---

##  Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS
- Context API for Auth & Theme

### **Backend / Services**
- [Appwrite](https://appwrite.io/) for Authentication & Database
- Cloud Deployed (GitHub + Appwrite Cloud)

---

## Folder Structure
```bash
DevConnect/
├── frontend/
│ ├── src/
│ │ ├── components/ # UI Components (Navbar, Footer, etc.)
│ │ ├── pages/ # Pages like Home, Login, Signup, etc.
│ │ ├── context/ # Auth & Theme Context
│ │ ├── appwrite/ # Appwrite configuration
│ │ └── assets/ # Static files
│ ├── package.json
│ ├── tailwind.config.js
│ └── vite.config.js
└── README.md
```
---

## Getting Started (Local Setup)

### 1️ Clone the Repository
```bash
git clone https://github.com/Umer-Jahangir/DevConnect.git
cd DevConnect/frontend
```
### 2 Install Dependencies
```bash
npm install
```
### 3️ Setup Environment Variables

Create a .env file in /frontend and add:
```bash
VITE_APPWRITE_URL=your-appwrite-endpoint
VITE_APPWRITE_PROJECT=your-project-id
VITE_APPWRITE_DATABASE=your-database-id
VITE_APPWRITE_POSTS_COLLECTION_ID=your-post-id
VITE_APPWRITE_COMMENTS_COLLECTION_ID=your-comment-id
VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID=your-notification-id
```
### 4️ Run the App
```bash
npm run dev
```
Then open http://localhost:5173

## Future Enhancements

- User Profiles & Follower System — Personalized profiles and user following  
- Dashboard System — View activity, insights, and analytics  
- Admin Panel — Manage users, posts, and reported content  
- Cloud Storage (Appwrite) — Store media files and profile images securely  
- Events & Community Creation — Build and join developer communities  
- Tag-based Post Filtering — Explore content by topic or language  
- Notifications & Activity Feed — Stay updated with real-time events  
- AI-Powered Post Recommendations — Discover relevant developer content  
- Multi-language Support — Global accessibility for developers worldwide  
- And Many More... — Continuous improvements and community feedback integration


## License

This project is licensed under the MIT License — feel free to use and modify with credit.
