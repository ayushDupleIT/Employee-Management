// NotificationsContainer.js

import React, { FC } from "react";

// Define the notification type
type Notification = {
  jobTitle: string;
  userName: string;
};

type Props = {
  notifications: Notification[]; // Accept notifications as a prop
};

const NotificationsContainer: FC<Props> = ({ notifications }) => {
  return (
    <div className="overflow-hidden absolute mt-16 w-80 bg-gray-100 rounded-md shadow-lg">
      <div className="p-4">
        <h2 className="px-2 text-lg font-bold fs-4">Notifications</h2>
      </div>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="px-2 py-2 border-b w-100 fs-6">
            <span className="font-bold">{notification.userName}</span> applied
            for the job{" "}
            <span className="font-bold">{notification.jobTitle}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsContainer;
