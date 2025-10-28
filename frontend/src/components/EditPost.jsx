import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { databases } from "../appwrite/appwriteConfig";
import { AuthContext } from "../context/AuthContextValue";
import { Loader2, PenSquare, ArrowLeft, Save } from "lucide-react";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    // image: null, // not needed for now
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch the existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await databases.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
          id
        );

        //  Prefill form fields
        setFormData({
          title: post.title || "",
          content: post.content || "",
          // image: post.image || null, //  commented
        });
      } catch (error) {
        console.error("Failed to load post:", error);
        alert(" Failed to load post for editing.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  //  Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //  Save changes to Appwrite
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      //  Only update title and content for now
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
        id,
        {
          title: formData.title,
          content: formData.content,
          // image: formData.image,  not needed for now
        }
      );

      alert(" Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Failed to update post:", error);
      alert(" Failed to update post. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <Loader2 className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          to={`/post/${id}`}
          className="inline-flex items-center mb-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Post
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                <PenSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Edit Post
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Make changes to your post
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                  focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                  focus:border-transparent transition-colors duration-200"
                placeholder="Enter post title"
                required
              />
            </div>

            {/* Content Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="12"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                  focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                  focus:border-transparent transition-colors duration-200 resize-y"
                placeholder="Write your post content here..."
                required
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => navigate(`/post/${id}`)}
                className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  text-gray-700 dark:text-gray-300 font-medium
                  hover:bg-gray-50 dark:hover:bg-gray-700/50
                  transition-all duration-200 order-2 sm:order-1 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
                  bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 
                  text-white font-medium transition-all duration-200
                  disabled:opacity-60 cursor-pointer order-1 sm:order-2"
              >
                {updating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
