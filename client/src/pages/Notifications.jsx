
import React, {
  useEffect,
  useState,
} from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load notifications"
        );
      }

      setNotifications(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/notifications/${id}/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update notification"
        );
      }

      setNotifications((previous) =>
        previous.map((notification) =>
          notification._id === id
            ? {
                ...notification,
                isRead: true,
              }
            : notification
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/notifications/read-all",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to mark notifications as read"
        );
      }

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/notifications/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete notification"
        );
      }

      setNotifications((previous) =>
        previous.filter(
          (notification) =>
            notification._id !== id
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const unreadCount = notifications.filter(
    (notification) =>
      !notification.isRead
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-gray-600">
          Loading notifications...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              🔔 Notifications
            </h1>

            <p className="text-gray-500 mt-2">
              {unreadCount} unread notifications
            </p>
          </div>

          {notifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Mark All Read
            </button>
          )}

        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">

            <div className="text-5xl mb-4">
              🔔
            </div>

            <h2 className="text-xl font-semibold text-gray-700">
              No notifications
            </h2>

            <p className="text-gray-500 mt-2">
              You are all caught up!
            </p>

          </div>
        ) : (
          <div className="space-y-4">

            {notifications.map(
              (notification) => (
                <div
                  key={notification._id}
                  className={`bg-white rounded-xl shadow-sm p-5 flex justify-between gap-4 ${
                    !notification.isRead
                      ? "border-l-4 border-blue-600"
                      : ""
                  }`}
                >

                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => {
                      if (!notification.isRead) {
                        markAsRead(
                          notification._id
                        );
                      }
                    }}
                  >

                    <p
                      className={`text-gray-800 ${
                        !notification.isRead
                          ? "font-semibold"
                          : ""
                      }`}
                    >
                      {notification.message}
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(
                        notification.createdAt
                      ).toLocaleString("en-IN")}
                    </p>

                    <span className="inline-block mt-2 text-xs bg-gray-100 px-3 py-1 rounded-full">
                      {notification.type}
                    </span>

                  </div>

                  <button
                    onClick={() =>
                      deleteNotification(
                        notification._id
                      )
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>

                </div>
              )
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default Notifications;
