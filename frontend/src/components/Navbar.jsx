import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextValue";
import NotificationDropdown from "./NotificationDropdown";
import SearchBar from "./SearchBar";
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Search, 
  Settings, 
  LogOut, 
  User,
  Edit,
  LayoutDashboard
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  //  Load and save dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  //  Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 fixed w-full z-50 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/*  Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-600 dark:text-gray-400 flex items-center cursor-pointer"
          >
            DevConnect
          </Link>

          {/*  Search Bar (only for logged-in users, medium+ screens) */}
            {user && (
              <div className="hidden md:block flex-1 max-w-2xl mx-4">
                <SearchBar
                  databaseId={import.meta.env.VITE_APPWRITE_DATABASE_ID}
                  collectionId={import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID}
                  onSelect={(post) => {
                    console.log("Selected post:", post);
                    // Optional: navigate to post details page
                    navigate(`/post/${post.$id}`);
                  }}
                />
              </div>
            )}

          {/*  Create Post Button (Desktop) */}
          {user && (
            <Link
              to="/create"
              className="hidden md:flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer"
            >
              <Edit size={18} className="mr-2" />
              Create Post
            </Link>
          )}

          {/*  Right Section */}
          <div className="flex items-center space-x-4">
            {/*  Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <>
                {/* Real-Time Notification Dropdown */}
                <NotificationDropdown user={user} />

                {/*  Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">
                        {user.name ? user.name[0].toUpperCase() : "U"}
                      </span>
                    </div>
                  </button>

                  {/*  Dropdown Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-200 dark:border-gray-700">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <User size={16} className="mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <LayoutDashboard size={16} className="mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <Settings size={16} className="mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
              >
                Login
              </Link>
            )}

            {/*  Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/90 dark:bg-gray-900/90 border-t border-gray-200 dark:border-gray-800 backdrop-blur-md">
          <div className="px-4 py-3 space-y-3">
            {user && (
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                    bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            )}

            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            {user && (
              <>
                <Link
                  to="/create"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Create Post
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
