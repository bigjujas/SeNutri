/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
      <section className="banner_principal">
        <div className="texto__banner">
          <p className="paragrafo__banner">Bem-vindo à SeNutri! Somos apaixonados por saúde e bem-estar. Nosso objetivo é simplificar sua jornada rumo a uma vida mais saudável, conectando você a soluções personalizadas e práticas que fazem a diferença no seu dia a dia.
          </p>
          <h1 className="conhecer__button"><Link draggable="false" to="/pratos">Conhecer pratos</Link></h1>
        </div>
        <img src="./imagem.png" alt="" />
      </section>
      <section className="main__container">
        <div className="texto__main">
          <h1 className="titulo__main">Casos de Sucesso</h1>
          <p>Conheça nossos casos de sucesso! Aqui, você confere histórias inspiradoras de pessoas que transformaram suas rotinas e alcançaram suas metas de saúde com a ajuda da SeNutri. São relatos reais que mostram como nossa plataforma pode fazer a diferença na sua jornada!
          </p>
        </div>
        <div className="card__pessoa">
          <img src="./pessoa.png" alt="" />
          <p>Marcelo Moreno transformou sua alimentação e atingiu um peso saudável com os planos personalizados da SeNutri. Hoje, vive com mais equilíbrio e disposição!</p>

          <h3 className="nome__card">Marcelo Moreno - 34 Anos</h3>
        </div>
      </section>
    </>
  )
}