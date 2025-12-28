import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./components/login";
import Home from "./components/home";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
    

        <Route path="/" element={<Home />} />


      </Routes>
    </BrowserRouter>
  );
}


