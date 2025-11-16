import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { databases, ID } from "../appwrite/appwriteConfig";
import { AuthContext } from "../context/AuthContextValue";
import { Clock, User, Edit, Trash2 } from "lucide-react";
import Comments from '../components/Comments';
import ReactionButtons from '../components/ReactionButtons';

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState("en");

  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const POSTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID;
  const NOTIFICATION_COLLECTION_ID = import.meta.env.VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await databases.getDocument(DATABASE_ID, POSTS_COLLECTION_ID, id);
        setPost(response);
      } catch (error) {
        console.error("Failed to load post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await databases.deleteDocument(DATABASE_ID, POSTS_COLLECTION_ID, id);
      navigate("/");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete post");
    }
  };

  const handleReaction = async (updatedReactions) => {
    try {
      const emojiArray = Object.entries(updatedReactions)
        .flatMap(([emoji, count]) => Array(count).fill(emoji));

      setPost({ ...post, reactions: emojiArray });

      await databases.updateDocument(DATABASE_ID, POSTS_COLLECTION_ID, id, { reactions: emojiArray });

      if (user && post.authorId && user.$id !== post.authorId) {
        await databases.createDocument(
          DATABASE_ID,
          NOTIFICATION_COLLECTION_ID,
          ID.unique(),
          {
            userId: post.authorId,
            type: "reaction",
            message: `${user.email} reacted to your post "${post.title}".`,
            link: `/post/${post.$id}`,
            createdAt: new Date().toISOString(),
            isRead: false,
          }
        );
      }
    } catch (error) {
      console.error("Failed to react:", error);
    }
  };

  const getTitle = () => {
    switch (selectedLang) {
      case "ur": return post.title_ur || post.title;
      case "hi": return post.title_hi || post.title;
      case "es": return post.title_es || post.title;
      case "ar": return post.title_ar || post.title;
      default: return post.title;
    }
  };

  const getContent = () => {
    switch (selectedLang) {
      case "ur": return post.content_ur || post.content;
      case "hi": return post.content_hi || post.content;
      case "es": return post.content_es || post.content;
      case "ar": return post.content_ar || post.content;
      default: return post.content;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="max-w-3xl mx-auto text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Post Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-6 sm:p-8">
            {/* Title + Edit/Delete */}
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {getTitle()}
              </h1>
              {user && user.$id === post.authorId && (
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/edit/${post.$id}`)}
                    className="p-2 text-gray-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-400 transition-colors cursor-pointer"
                    title="Edit Post"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors cursor-pointer"
                    title="Delete Post"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Author and Date */}
            <div className="mb-4 flex flex-wrap gap-4 items-center text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>
                  {new Date(post.$createdAt).toLocaleDateString()}
                  {post.$updatedAt !== post.$createdAt && (
                    <span className="italic text-blue-500 ml-1">
                      • Edited {new Date(post.$updatedAt).toLocaleTimeString()}
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Language Selector */}
            <div className="mb-6 flex gap-3">
              {["en","ur","hi","es","ar"].map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-3 py-1 rounded-lg font-medium border ${
                    selectedLang === lang
                      ? "bg-gray-600 text-white border-gray-600"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 cursor-pointer"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Reactions */}
            <ReactionButtons
              reactions={(() => {
                try {
                  if (!post.reactions) return {};
                  const reactionsData = Array.isArray(post.reactions) ? post.reactions : JSON.parse(post.reactions);
                  return reactionsData.reduce((acc, emoji) => {
                    acc[emoji] = (acc[emoji] || 0) + 1;
                    return acc;
                  }, {});
                } catch {
                  return {};
                }
              })()}
              onReact={handleReaction}
            />

            {/* Content */}
            <div className="prose dark:prose-invert max-w-none mt-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {getContent()}
              </p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-6 sm:p-8 border-t border-gray-200 dark:border-gray-700">
          <Comments postId={post.$id} />
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
