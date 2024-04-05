// NotificationsContainer.js

import React from "react";

const NotificationsContainer = () => {
  const notifications = [
    "Abhishek Sharma applied for Software Developer Software Developer",
    "Abhishek Sharma applied for Software Developer",
    "Abhishek Sharma applied for Software Developer",
    // Add your notifications here
  ];

  return (
    <div className="overflow-hidden absolute mt-16 w-80 bg-gray-100 rounded-md shadow-lg">
      <div className="p-4">
        <h2 className="px-2 text-lg font-bold fs-4">Notifications</h2>
      </div>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="px-2 py-2 border-b w-100 fs-6">
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsContainer;

