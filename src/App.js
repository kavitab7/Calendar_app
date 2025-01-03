import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import UserPage from "./pages/UserPage";
import Home from "./pages/Home";
import './App.css'
function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
