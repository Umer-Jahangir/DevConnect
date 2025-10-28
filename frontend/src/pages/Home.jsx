import React, { useEffect, useState, useContext } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { AuthContext } from "../context/AuthContextValue";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const COLLECTION_ID = import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        setPosts(response.documents);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 pt-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-600 dark:text-gray-400 mb-4 leading-tight">
            Welcome to DevConnect
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            A community where developers share their latest thoughts, ideas, and projects.
          </p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.$id}
                to={`/post/${post.$id}`}
                className="block group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md 
                  hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <article>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3 
                    group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900/30 
                        flex items-center justify-center">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          {(post.author || "A")[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {post.author || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(post.$createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="flex items-center text-sm text-gray-500 dark:text-gray-400 
                      group-hover:translate-x-1 transition-transform">
                      Read more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto shadow-md">
                <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  No posts found. Be the first to share something!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
