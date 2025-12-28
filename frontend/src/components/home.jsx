import "../style/Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <header className="home-header">
        <h1>ArtFeel 🎨</h1>
        <button onClick={() => navigate("/upload")}>Upload Art</button>
      </header>

      <div className="feed">
        <div className="art-card">
          <img src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b" />
          <h3>Silent Thoughts</h3>
          <p>
            "While painting this, I felt like my mind was finally quiet for the
            first time..."
          </p>
        </div>

        <div className="art-card">
          <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" />
          <h3>Healing Sky</h3>
          <p>
            "This painting helped me let go of pain I didn’t know I was holding."
          </p>
        </div>
      </div>
    </div>
  );
}
