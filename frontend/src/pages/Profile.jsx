import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContextValue";
import { databases } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { LogOut, Edit, Clock, Plus } from "lucide-react";
import { Query } from "appwrite"; 

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user's posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;

      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
          [Query.equal("authorId", user.$id)] 
        );
        setPosts(response.documents);
      } catch (error) {
        console.error("Failed to load user's posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user]);

  // If not logged in, show message
  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Required
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Please log in to view your profile and manage your posts.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 font-medium"
          >
            Go to Login
          </button>
        </div>
      </div>
    );

  // Main profile view
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* User Info Section */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 mb-8 transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-gray-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {user.name || "Anonymous User"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {user.email}
              </p>
              <div className="flex items-center justify-center sm:justify-start text-sm text-gray-500 dark:text-gray-400">
                <Clock size={16} className="mr-2" />
                <span>
                  Joined {new Date(user.$createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Posts
          </h3>
          <button
            onClick={() => navigate("/create")}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <Plus size={18} className="mr-2" />
            New Post
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Posts Yet
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start sharing your thoughts with the community!
            </p>
            <button
              onClick={() => navigate("/create")}
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
            >
              <Plus size={18} className="mr-2" />
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <div
                key={post.$id}
                onClick={() => navigate(`/post/${post.$id}`)}
                className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-400">
                  {post.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock size={14} className="mr-1" />
                    {new Date(post.$createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit/${post.$id}`);
                    }}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
