import { useEffect, useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "../style/inbox.css"

dayjs.extend(relativeTime);

export default function Inbox() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/notifications`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})

      .then(res => res.json())
      .then(data => setNotifications(data));
  }, [])

  return (
    <div className="inbox-wrapper">
      <h2>Inbox</h2>

      <div className="notification-list">
        {notifications.map((n) => (
          <div className="notification-card" key={n._id}>
            <div className="notif-left">
              {n.type === "like" ? "❤️" : "💬"}
            </div>

            <div className="notif-content">
              <p>
 <p>
  <b>{n.sender}</b>{" "}
  {n.type === "like" ? "liked" : "commented"} on your post
  <b>{n.post?.title}</b>

  {n.type === "comment" && (
    <span className="notif-comment"> — {n.message}</span>
  )}
</p>

</p>
              <span>{dayjs(n.createdAt).fromNow()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
