import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { useLocation } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import SignIn from './components/signin'
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import UploadBlog from "./components/upload";
import Explore from "./components/explorePage";
import Inbox from "./components/inbox";
function Layout() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signin";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadBlog />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}


