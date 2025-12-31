import { FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import "../style/footer.css";
import { useState } from "react";


export default function Footer() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <footer className="footer">
        <div className="footer-inner">
          <h3>ArtFeel</h3>
          <p>
            A safe space for artists to express their emotions through art and
            stories.
          </p>

          <div className="footer-links">
            <span>About</span>
            <span onClick={() => setShowContact(true)}>Contact</span>
            <span>Privacy</span>
          </div>

          <div className="footer-socials">
            <FaInstagram />
            <FaTwitter />
            <FaGithub />
          </div>

          <p className="footer-bottom">
            © {new Date().getFullYear()} ArtFeel — made with 🎨 & 💖
          </p>
        </div>
      </footer>

      {/* Contact Popup */}
      {showContact && (
        <div className="contact-overlay">
          <div className="contact-box">
            <h3>Contact ArtFeel</h3>
            <p>Email: support@artfeel.com</p>
            <p>Instagram: @artfeel</p>

            <button onClick={() => setShowContact(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
