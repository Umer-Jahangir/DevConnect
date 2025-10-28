import React, { useState, useEffect, useRef } from "react";
import { Bell, CheckCircle } from "lucide-react";
import { databases, client } from "../appwrite/appwriteConfig"; 
import { Query } from "appwrite";

const NotificationDropdown = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const COLLECTION_ID = import.meta.env.VITE_APPWRITE_NOTIFICATIONS_COLLECTION_ID;

  // 🔹 Fetch notifications for this user
  const fetchNotifications = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("userId", user?.$id), Query.orderDesc("createdAt")]
      );
      setNotifications(response.documents);
    } catch (error) {
      console.error(" Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchNotifications();

    // Real-time listener for live updates
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
      (res) => {
        if (res.events.includes("databases.*.collections.*.documents.*.create")) {
          const newNotification = res.payload;
          if (newNotification.userId === user.$id) {
            setNotifications((prev) => [newNotification, ...prev]);
          }
        }
      }
    );

    return () => unsubscribe();
  }, [user]);

  //  Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //  Mark all as read (updates Appwrite)
  const markAllAsRead = async () => {
    try {
      const unread = notifications.filter((n) => !n.isRead);
      await Promise.all(
        unread.map((n) =>
          databases.updateDocument(DATABASE_ID, COLLECTION_ID, n.$id, {
            isRead: true,
          })
        )
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error(" Error marking notifications as read:", error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/*  Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative cursor-pointer"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="flex justify-between items-center px-4 py-2 border-b dark:border-gray-700">
            <h3 className="font-medium text-gray-700 dark:text-gray-200">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <a
                  key={n.$id}
                  href={n.link || "#"}
                  className={`block px-4 py-3 text-sm border-b dark:border-gray-700 transition ${
                    n.isRead
                      ? "bg-transparent text-gray-500 dark:text-gray-400"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  <span className="font-medium capitalize">{n.type}:</span>{" "}
                  {n.message}
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </a>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                No notifications
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="text-center py-2 text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700">
              <CheckCircle className="inline mr-1 text-gray-400" size={14} />
              All caught up!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
