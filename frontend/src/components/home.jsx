import "../style/Home.css";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import { useEffect, useState } from "react";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/blog/featured`)
    .then(res => res.json())
    .then(data => setFeatured(data));
}, []);

  return (
    <>
    <div className="home-container">

 
<section className="screen hero">
  <div className="hero-magazine">

    <div className="hero-dark">
      <p>
        ArtFeel is a quiet place where your emotions can breathe.
        Paint what hurts. Write what heals.
        Let your art hold the feelings you cannot.
      </p>
    </div>

    <div className="hero-light">
      <h1>ArtFeel</h1>
      <span>Where emotions become art</span>

      {user && (
        <button onClick={() => navigate("/upload")}>
          Create Your Art 🎨
        </button>
      )}
    </div>

  </div>
</section>



  
<section className="screen split">
  <div className="split-left">
    <h2>What will you express today?</h2>
    <p>
      Every emotion is a story waiting to be painted.
      Choose a feeling and let it guide your art.
    </p>
  </div>

  <div className="split-right">
    <div className="mood-cloud">
      <span>Calm</span>
      <span>Healing</span>
      <span>Lonely</span>
      <span>Hope</span>
      <span>Chaos</span>
      <span>Love</span>
      <span>Grief</span>
    </div>
  </div>
</section>
 
   <section className="screen featured">
  <h2>Featured Creations</h2>
  <p className="quote">“Art is how we speak when words fail.”</p>

  <div className="featured-row">
    <div className="featured-track">
  {featured.map((post) => (
    <div className="art-card" key={post._id}>
      <img src={post.image} />

      <div className="art-info">
        <p>{post.desc}</p>
        <span>❤️ {post.likeCount}</span>
      </div>
    </div>
  ))}
</div>

    <div
      className="explore-arrow"
      onClick={() => navigate("/explore")}
    >
      →
    </div>
  </div>
</section>

     
      <section className="screen final">
        <h2>Every feeling deserves to be seen</h2>
        <p>Start your art journal today.</p>
        {user && (
          <button onClick={() => navigate("/upload")}>
            Create Your First Art 🎨
          </button>
        )}
      </section>

    </div>
    <Footer/>
    </>
  );
}
