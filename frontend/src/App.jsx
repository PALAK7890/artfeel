import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./components/login";
import Home from "./components/home";
import SignIn from './components/signin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
    <Route path="/signin" element={<SignIn />} />

        <Route path="/" element={<Home />} />


      </Routes>
    </BrowserRouter>
  );
}


