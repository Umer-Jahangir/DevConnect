import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContextValue";
import { databases, client, ID, Query } from "../appwrite/appwriteConfig";
import { MessageSquare, Reply, MoreVertical } from "lucide-react";
import ReactionButtons from "../components/ReactionButtons";
import { translateText } from "../utils/geminiTranslate";

// 🔔 Create notification
const createNotification = async (targetUserId, type, message, link) => {
  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const NOTIFICATION_COLLECTION_ID =
    import.meta.env.VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID;

  try {
    await databases.createDocument(DATABASE_ID, NOTIFICATION_COLLECTION_ID, ID.unique(), {
      userId: targetUserId,
      type,
      message,
      link,
      createdAt: new Date().toISOString(),
      isRead: false,
    });
  } catch (err) {
    console.error("❌ Error creating notification:", err);
  }
};

// 🔤 Get translated text
const getTranslatedText = (commentDoc, selectedLang) => {
  if (!commentDoc) return "";
  switch (selectedLang) {
    case "ur":
      return commentDoc.comment_ur || commentDoc.comment_en || commentDoc.content;
    case "hi":
      return commentDoc.comment_hi || commentDoc.comment_en || commentDoc.content;
    case "es":
      return commentDoc.comment_es || commentDoc.comment_en || commentDoc.content;
    case "ar":
      return commentDoc.comment_ar || commentDoc.comment_en || commentDoc.content;
    default:
      return commentDoc.comment_en || commentDoc.content;
  }
};

// 📝 Comment Item
const CommentItem = ({
  comment,
  replies,
  onReply,
  onDelete,
  onReact,
  commentLangs,
  onSelectLang,
}) => {
  const { user } = useContext(AuthContext);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const selectedLang = commentLangs[comment.$id] || "en";

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    onReply(comment.$id, replyContent);
    setReplyContent("");
    setShowReplyForm(false);
  };

  return (
    <div className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 mb-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          {/* Author Info */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900/30 flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                {comment.authorEmail?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{comment.authorEmail}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(comment.$createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex gap-2 mb-2">
            {["en", "ur", "hi", "es", "ar"].map((lang) => (
              <button
                key={lang}
                onClick={() => onSelectLang(comment.$id, lang)}
                className={`px-2 py-1 text-xs rounded border ${
                  selectedLang === lang
                    ? "bg-gray-600 text-white border-gray-600"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 cursor-pointer"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Comment Text */}
          <p className="text-gray-700 dark:text-gray-300 mb-2 whitespace-pre-wrap">
            {getTranslatedText(comment, selectedLang)}
          </p>

          {/* Reactions & Reply */}
          <div className="flex items-center gap-4">
            <ReactionButtons
              reactions={(() => {
                try {
                  if (!comment.reactions) return {};
                  const reactionsData = Array.isArray(comment.reactions)
                    ? comment.reactions
                    : JSON.parse(comment.reactions);
                  return reactionsData.reduce((acc, emoji) => {
                    acc[emoji] = (acc[emoji] || 0) + 1;
                    return acc;
                  }, {});
                } catch {
                  return {};
                }
              })()}
              onReact={(updatedReactions) => onReact(comment.$id, updatedReactions)}
            />

            <button
              onClick={() => setShowReplyForm((s) => !s)}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1 cursor-pointer"
            >
              <Reply size={14} />
              Reply
            </button>
          </div>
        </div>

        {/* Delete Options */}
        {user && user.$id === comment.authorId && (
          <div className="relative">
            <button
              onClick={() => setShowOptions((s) => !s)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <MoreVertical size={16} />
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                <button
                  onClick={() => onDelete(comment.$id)}
                  className="w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-left cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mt-2">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
            rows="2"
          />
          <div className="flex justify-end gap-2 mt-1">
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            >
              Reply
            </button>
          </div>
        </form>
      )}

      {/* Nested Replies */}
      {replies?.map((reply) => (
        <CommentItem
          key={reply.$id}
          comment={reply}
          replies={reply.replies}
          commentLangs={commentLangs} // pass the shared lang state
          onSelectLang={onSelectLang}
          onReply={onReply}
          onDelete={onDelete}
          onReact={onReact}
        />
      ))}
    </div>
  );
};

// 🗨️ Comments component
const Comments = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [postOwnerId, setPostOwnerId] = useState(null);

  // { commentId: lang }
  const [commentLangs, setCommentLangs] = useState({});

  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const COMMENTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID;

  const handleCommentLangChange = (commentId, lang) => {
    setCommentLangs((prev) => ({ ...prev, [commentId]: lang }));
  };

  // Fetch post owner
  useEffect(() => {
    const fetchPostOwner = async () => {
      try {
        const post = await databases.getDocument(
          DATABASE_ID,
          import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
          postId
        );
        setPostOwnerId(post.authorId);
      } catch (error) {
        console.error("❌ Error fetching post owner:", error);
      }
    };
    if (postId) fetchPostOwner();
  }, [postId, DATABASE_ID]);

  // Group comments into tree
  const groupComments = (docs) => {
    const map = {};
    const roots = [];
    docs.forEach((doc) => (map[doc.$id] = { ...doc, replies: [] }));
    docs.forEach((doc) => {
      if (doc.parentId) map[doc.parentId]?.replies.push(map[doc.$id]);
      else roots.push(map[doc.$id]);
    });
    return roots;
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        COMMENTS_COLLECTION_ID,
        [Query.equal("postId", postId), Query.orderAsc("$createdAt")]
      );
      setComments(groupComments(res.documents));
    } catch (err) {
      console.error("❌ Error fetching comments:", err);
    }
  };

  useEffect(() => {
    if (!postId) return;
    fetchComments();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COMMENTS_COLLECTION_ID}.documents`,
      (response) => {
        if (
          response.events.some((e) => e.includes("create")) ||
          response.events.some((e) => e.includes("update")) ||
          response.events.some((e) => e.includes("delete"))
        ) {
          fetchComments();
        }
      }
    );

    return () => unsubscribe();
  }, [postId, DATABASE_ID, COMMENTS_COLLECTION_ID]);

  // Add new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;
    setLoading(true);

    try {
      const commentId = ID.unique();
      const createdAt = new Date().toISOString();

      const [comment_ur, comment_hi, comment_es, comment_ar] = await Promise.all([
        translateText(newComment, "Urdu"),
        translateText(newComment, "Hindi"),
        translateText(newComment, "Spanish"),
        translateText(newComment, "Arabic"),
      ]).catch(() => [null, null, null, null]);

      await databases.createDocument(DATABASE_ID, COMMENTS_COLLECTION_ID, commentId, {
        postId,
        content: newComment,
        comment_en: newComment,
        comment_ur: comment_ur || "",
        comment_hi: comment_hi || "",
        comment_es: comment_es || "",
        comment_ar: comment_ar || "",
        authorId: user.$id,
        authorEmail: user.email,
        parentId: null,
        reactions: [],
        $createdAt: createdAt,
      });

      if (postOwnerId && postOwnerId !== user.$id) {
        await createNotification(
          postOwnerId,
          "comment",
          `${user.email} commented on your post.`,
          `/post/${postId}`
        );
      }

      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("❌ Error adding comment:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reply
  const handleReply = async (parentId, content) => {
    if (!user || !content.trim()) return;
    setLoading(true);

    try {
      const parentComment = await databases.getDocument(DATABASE_ID, COMMENTS_COLLECTION_ID, parentId);
      const replyId = ID.unique();

      const [comment_ur, comment_hi, comment_es, comment_ar] = await Promise.all([
        translateText(content, "Urdu"),
        translateText(content, "Hindi"),
        translateText(content, "Spanish"),
        translateText(content, "Arabic"),
      ]).catch(() => [null, null, null, null]);

      await databases.createDocument(DATABASE_ID, COMMENTS_COLLECTION_ID, replyId, {
        postId,
        content,
        comment_en: content,
        comment_ur: comment_ur || "",
        comment_hi: comment_hi || "",
        comment_es: comment_es || "",
        comment_ar: comment_ar || "",
        authorId: user.$id,
        authorEmail: user.email,
        parentId,
        reactions: [],
        $createdAt: new Date().toISOString(),
      });

      if (parentComment.authorId && parentComment.authorId !== user.$id) {
        await createNotification(
          parentComment.authorId,
          "reply",
          `${user.email} replied to your comment.`,
          `/post/${postId}`
        );
      }

      fetchComments();
    } catch (err) {
      console.error("❌ Error adding reply:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      await databases.deleteDocument(DATABASE_ID, COMMENTS_COLLECTION_ID, id);
      fetchComments();
    } catch (err) {
      console.error("❌ Error deleting comment:", err);
    }
  };

  const handleReact = async (id, updatedReactions) => {
    try {
      const emojiArray = Object.entries(updatedReactions).flatMap(
        ([emoji, count]) => Array(count).fill(emoji)
      );

      await databases.updateDocument(DATABASE_ID, COMMENTS_COLLECTION_ID, id, { reactions: emojiArray });
      const reactedComment = await databases.getDocument(DATABASE_ID, COMMENTS_COLLECTION_ID, id);

      if (reactedComment.authorId && reactedComment.authorId !== user.$id) {
        await createNotification(
          reactedComment.authorId,
          "reaction",
          `${user.email} reacted to your comment.`,
          `/post/${postId}`
        );
      }

      fetchComments();
    } catch (err) {
      console.error("❌ Failed to update reaction:", err);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <MessageSquare size={20} /> Comments
      </h3>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
            rows="3"
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 mb-6">Please log in to comment.</p>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.$id}
            comment={comment}
            replies={comment.replies}
            commentLangs={commentLangs} // shared lang state
            onSelectLang={handleCommentLangChange}
            onReply={handleReply}
            onDelete={handleDelete}
            onReact={handleReact}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
