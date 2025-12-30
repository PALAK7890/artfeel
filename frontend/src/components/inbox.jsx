import "../style/inbox.css";

const notifications = [
  {
    id: 1,
    type: "like",
    user: "Aarav",
    post: "Dream Girl Artwork",
    time: "2 min ago",
  },
  {
    id: 2,
    type: "comment",
    user: "Meera",
    post: "Soft Pastel Portrait",
    time: "10 min ago",
  },
];

export default function Inbox() {
  return (
    <div className="inbox-wrapper">
      <h2>Inbox</h2>

      <div className="notification-list">
        {notifications.map((n) => (
          <div className="notification-card" key={n.id}>
            <div className="notif-left">
              {n.type === "like" ? "❤️" : "💬"}
            </div>

            <div className="notif-content">
              <p>
                <b>{n.user}</b>{" "}
                {n.type === "like" ? "liked" : "commented on"} your post
                <b> "{n.post}"</b>
              </p>
              <span>{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
