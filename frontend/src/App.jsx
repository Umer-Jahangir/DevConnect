import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import PostDetails from "./pages/PostDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import TestAppwrite from "./pages/TestAppwrite";
import EditPost from "./components/EditPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LanguageSwitcher from "./components/LanguageSwitcher"; // import the toggle

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800">
              <Navbar />
              {/* Add the language switcher in the header */}
              <LanguageSwitcher />
            </header>

            <main className="pt-4">
              <Routes>
                <Route path="/test" element={<TestAppwrite />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/post/:id" element={<PostDetails />} />
                <Route path="/edit/:id" element={<EditPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
