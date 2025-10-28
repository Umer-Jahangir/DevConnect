import React, { useState, useContext } from "react";
import { databases, ID } from "../appwrite/appwriteConfig";
import { AuthContext } from "../context/AuthContextValue";
import { useNavigate } from "react-router-dom";
import { Loader, PenSquare } from "lucide-react";

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const COLLECTION_ID = import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (!user) {
      alert("You must be logged in to create a post.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const postId = ID.unique(); // unique ID for postId
      const authorId = user.$id || user.id; // get logged-in user ID
      const authorEmail = user.email; //
      const createdAt = new Date().toISOString(); // current timestamp

      await databases.createDocument(DATABASE_ID, COLLECTION_ID, postId, {
        postId, // required field
        authorId, // required field
        author: authorEmail,
        title,
        content,
        createdAt,
        isPublished: true, 
      });

      alert("Post created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to create post:", error);
      alert(`Something went wrong! ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-2xl transition-all duration-300 mt-10">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-gray-100 dark:bg-gray-900/30 mb-4">
            <PenSquare className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create a New Post
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Share your thoughts with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
              placeholder="Give your post a title"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 resize-y"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                text-gray-700 dark:text-gray-300 font-medium
                hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
                font-semibold 
                ${loading 
                  ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" 
                  : "bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600"
                } text-white`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Creating Post...</span>
                </>
              ) : (
                "Publish Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
