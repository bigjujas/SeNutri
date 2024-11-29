/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Pratos from "./Pratos"
import IMC from "./IMC"
import "./App.css"

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AppContent />} />
        {/* Outras rotas */}
        <Route path="/pratos" element={<Pratos />} />
        <Route path="/IMC" element={<IMC />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// FAZER O HTML AQUI 
function AppContent() {
  return (
    <>
    <div className="home_tab">
      <h1>Aqui é a home fml</h1>
    </div>
    </>
  )
}