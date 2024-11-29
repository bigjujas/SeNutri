/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Pratos from "./Pratos"
import IMC from "./IMC"

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
    </Router>
  );
}

// FAZER O HTML AQUI 
function AppContent() {
  return <h2>Bem-vindo! Este é o conteúdo principal do App.</h2>;
}